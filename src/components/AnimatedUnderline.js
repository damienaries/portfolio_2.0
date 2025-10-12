import React, { useState } from 'react';
import { motion } from 'motion/react';
import styled from '@emotion/styled';

const LinkWrapper = styled(motion.a)`
	position: relative;
	display: inline-block;
	text-decoration: none;
	color: inherit;
`;

const Underline = styled(motion.div)`
	position: absolute;
	bottom: ${(props) => props.bottom || 0}px;
	left: 0;
	right: 0;
	height: ${(props) => props.thickness || 2}px;
	background: ${(props) => props.color || 'var(--color-blue-gray, #345)'};
	border-radius: 1px;
	transform-origin: left;
	will-change: transform;
`;

/**
 * AnimatedUnderline - Versatile animated underline component
 *
 * Can be used in two ways:
 * 1. As a standalone underline element (pass layoutId for shared layout animations)
 * 2. As a link with animated underline on hover (pass children and href)
 *
 * @param {React.ReactNode} children - Link text/content (for link mode)
 * @param {string} href - Link destination (for link mode)
 * @param {string} layoutId - Layout ID for shared layout animations (for standalone mode)
 * @param {string} color - Underline color (default: theme blue-gray)
 * @param {number} thickness - Underline thickness in pixels (default: 2)
 * @param {number} bottom - Bottom position offset (default: 0, use -2 for legacy positioning)
 * @param {string} className - CSS classes
 * @param {object} style - Additional inline styles
 */
const AnimatedUnderline = ({
	children,
	href,
	layoutId,
	color,
	thickness = 2,
	bottom,
	className = '',
	style = {},
	initial,
	animate,
	exit,
	transition,
	...props
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	// Standalone underline mode (like navbar indicators)
	if (layoutId && !children) {
		return (
			<Underline
				className={className}
				layoutId={layoutId}
				color={color}
				thickness={thickness}
				bottom={bottom || -2}
				initial={initial || { width: 0 }}
				animate={animate || { width: '100%' }}
				exit={exit || { width: 0 }}
				transition={transition || { duration: 0.3, ease: [0.7, 0, 1, 1] }}
				style={style}
				{...props}
			/>
		);
	}

	// Link mode with hover underline
	return (
		<LinkWrapper
			href={href || '#'}
			className={className}
			style={style}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			{...props}
		>
			{children}
			<Underline
				color={color}
				thickness={thickness}
				bottom={bottom || 0}
				initial={{ scaleX: 0 }}
				animate={{
					scaleX: isHovered && !prefersReducedMotion ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: [0.22, 1, 0.36, 1],
				}}
			/>
		</LinkWrapper>
	);
};

export default AnimatedUnderline;
