import { keyframes, css } from '@emotion/react';

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

// Theme-aware breathing animation generator
const createBreathingKeyframes = (isDark) => keyframes`
	0%, 100% {
		box-shadow: ${
			isDark
				? '0 4px 6px -1px rgba(255, 255, 255, 0.05), 0 2px 4px -1px rgba(255, 255, 255, 0.03)'
				: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
		};
	}
	50% {
		box-shadow: ${
			isDark
				? '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)'
				: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
		};
	}
`;

// Reusable breathing card effect
export const breathingCardEffect = (props) => {
	const isDark = props.theme.background !== 'var(--color-white)';
	const breathing = createBreathingKeyframes(isDark);

	return css`
		animation: ${breathing} 4s ease-in-out infinite;

		&:hover {
			box-shadow: ${isDark
				? '0 20px 25px -5px rgba(255, 255, 255, 0.15), 0 10px 10px -5px rgba(255, 255, 255, 0.08)'
				: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'};
		}

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	`;
};

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
