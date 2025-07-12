import { motion } from 'motion/react';
import styled from '@emotion/styled';

const Underline = styled(motion.div)`
	position: absolute;
	left: 0;
	bottom: -2px;
	height: 2px;
	background: ${(props) => props.color || 'var(--color-blue-gray, #345)'};
	border-radius: 2px;
`;

const AnimatedUnderline = ({
	className = '',
	layoutId = 'animated-underline',
	initial = { width: 0 },
	animate = { width: '100%' },
	exit = { width: 0 },
	transition = { duration: 0.3, ease: [0.7, 0, 1, 1] },
	style = {},
	color,
}) => (
	<Underline
		className={className}
		layoutId={layoutId}
		initial={initial}
		animate={animate}
		exit={exit}
		transition={transition}
		style={style}
		color={color}
	/>
);

export default AnimatedUnderline;
