import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MotionLink = motion(Link);

/**
 * MagneticLink - Link that reacts to pointer movement with magnetic effect
 *
 * @param {string} href - Link destination
 * @param {string} target - Link target (e.g., "_blank")
 * @param {string} rel - Link rel attribute
 * @param {string} label - Aria label for accessibility
 * @param {number} strength - Magnetic pull strength (default: 0.25)
 * @param {React.ReactNode} children - Link content
 */
const MagneticLink = ({
	href,
	target,
	rel,
	label,
	strength = 0.25,
	children,
	...props
}) => {
	const ref = useRef(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping: 15, stiffness: 150 };
	const xSpring = useSpring(x, springConfig);
	const ySpring = useSpring(y, springConfig);

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	const handleMouseMove = (e) => {
		if (prefersReducedMotion || !ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		x.set(deltaX);
		y.set(deltaY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<MotionLink
			href={href}
			target={target}
			rel={rel}
			aria-label={label}
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				x: xSpring,
				y: ySpring,
				display: 'inline-block',
			}}
			{...props}
		>
			{children}
		</MotionLink>
	);
};

export default MagneticLink;
