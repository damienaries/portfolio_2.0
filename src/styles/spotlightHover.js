import { keyframes } from '@emotion/react';

/** Match `animation` duration wherever hover UI should wait for one full pass (e.g. tooltip). */
export const SPOTLIGHT_DURATION = '0.85s';

/** Slow in / slow out over the full orbit (shared by pill + button). */
export const SPOTLIGHT_EASING = 'cubic-bezier(0.7, 0, 0.3, 1)';

/** One orbit of a tight highlight; ends held at bottom (positive Y). */
export const spotlightSweep = (baseShadow) => keyframes`
	0% {
		box-shadow: ${baseShadow}, 4px 0 8px rgba(255, 255, 255, 0);
	}
	7% {
		box-shadow: ${baseShadow}, 4px 0 8px rgba(255, 255, 255, 0.48);
	}
	12.5% {
		box-shadow: ${baseShadow}, 3px 3px 8px rgba(255, 255, 255, 0.48);
	}
	25% {
		box-shadow: ${baseShadow}, 0 4px 8px rgba(255, 255, 255, 0.48);
	}
	37.5% {
		box-shadow: ${baseShadow}, -3px 3px 8px rgba(255, 255, 255, 0.48);
	}
	50% {
		box-shadow: ${baseShadow}, -4px 0 8px rgba(255, 255, 255, 0.48);
	}
	62.5% {
		box-shadow: ${baseShadow}, -3px -3px 8px rgba(255, 255, 255, 0.48);
	}
	75% {
		box-shadow: ${baseShadow}, 0 -4px 8px rgba(255, 255, 255, 0.48);
	}
	87.5% {
		box-shadow: ${baseShadow}, 3px -3px 8px rgba(255, 255, 255, 0.48);
	}
	91.666% {
		box-shadow: ${baseShadow}, 4px 0 8px rgba(255, 255, 255, 0.48);
	}
	95.833% {
		box-shadow: ${baseShadow}, 3px 3px 8px rgba(255, 255, 255, 0.48);
	}
	98.5% {
		box-shadow: ${baseShadow}, 1.5px 3.75px 8px rgba(255, 255, 255, 0.4);
	}
	100% {
		box-shadow: ${baseShadow}, 0 4px 8px rgba(255, 255, 255, 0.48);
	}
`;
