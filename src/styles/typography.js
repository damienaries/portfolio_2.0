import { css } from '@emotion/react';

// Simplified typography scale - 4 most used sizes
export const typographyScale = {
	xs: '1.28rem', // 12.8px
	sm: '1.6rem', // 16px (base)
	md: '2rem', // 20px
	lg: '2.5rem', // 25px
	xl: '3.125rem', // 31.25px
	xxl: '4rem', // 40px
};

// Simplified font weights - 2 most used
export const fontWeights = {
	normal: 400,
	bold: 700,
};

// Simplified line heights - 2 most used
export const lineHeights = {
	normal: 1.5,
	relaxed: 1.625,
};

// Simplified letter spacing - 2 most used
export const letterSpacing = {
	normal: '0em',
	tight: '-0.025em',
};

export const TypographyStyles = css`
	:root {
		/* Typography Scale */
		--font-size-xs: ${typographyScale.xs};
		--font-size-sm: ${typographyScale.sm};
		--font-size-md: ${typographyScale.md};
		--font-size-lg: ${typographyScale.lg};
		--font-size-xl: ${typographyScale.xl};
		--font-size-xxl: ${typographyScale.xxl};

		/* Font Weights */
		--font-weight-normal: ${fontWeights.normal};
		--font-weight-bold: ${fontWeights.bold};

		/* Line Heights */
		--line-height-normal: ${lineHeights.normal};
		--line-height-relaxed: ${lineHeights.relaxed};

		/* Letter Spacing */
		--letter-spacing-normal: ${letterSpacing.normal};
		--letter-spacing-tight: ${letterSpacing.tight};

		/* Semantic Typography Classes */
		--text-h1: var(--font-size-xl);
		--text-h2: var(--font-size-lg);
		--text-h3: var(--font-size-md);
		--text-body: var(--font-size-sm);
		--text-xs: var(--font-size-xs);
		--text-xxl: var(--font-size-xxl);

		/* Font Family */
		--font-family: 'Mulish', sans-serif;
	}

	/* Default typography for HTML elements */
	h1 {
		font-size: var(--text-h1);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-tight);
	}

	h2 {
		font-size: var(--text-h2);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-tight);
	}

	h3 {
		font-size: var(--text-h3);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);
	}

	h4,
	h5,
	h6 {
		font-size: var(--text-body);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);
	}

	p {
		font-size: var(--text-xs);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-relaxed);
		letter-spacing: var(--letter-spacing-normal);
		margin: 0;
	}

	small {
		font-size: var(--text-xs);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);
	}

	label {
		font-size: var(--text-body);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-normal);
	}
`;
