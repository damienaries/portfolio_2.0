import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

// Page transition animations
export const pageTransition = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			opacity: { duration: 0.3 },
			y: { duration: 0.2 },
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			opacity: { duration: 0.2 },
			y: { duration: 0.15 },
		},
	},
};

// Tab transition animations
export const tabTransition = {
	initial: { opacity: 0, scale: 0.95 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			opacity: { duration: 0.25 },
			scale: { duration: 0.2 },
		},
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		transition: {
			opacity: { duration: 0.15 },
			scale: { duration: 0.1 },
		},
	},
};
