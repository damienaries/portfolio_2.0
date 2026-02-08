import { css } from '@emotion/react';

// typography scale
export const typographyScale = {
	xs: '0.875rem', // 14px
	sm: '1rem', // 16px (base)
	md: '1.25rem', // 20px
	lg: '1.5625rem', // 25px
	xl: '1.953rem', // 31.25px
	xxl: '2.5rem', // 40px
};

// font weights
export const fontWeights = {
	thin: 300,
	normal: 400,
	bold: 700,
};

// line heights
export const lineHeights = {
	normal: 1.5,
	relaxed: 1.625,
};

// letter spacing
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
		--font-weight-thin: ${fontWeights.thin};
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
		--text-md: var(--font-size-md);
		--text-xs: var(--font-size-xs);
		--text-xxl: var(--font-size-xxl);

		/* Font Family */
		--font-family: 'Mulish', sans-serif;
	}

	/* Mobile responsive typography */
	@media (max-width: 768px) {
		:root {
			--text-h1: var(--font-size-lg);
			--text-xs: var(--font-size-xs);
			--text-xxl: var(--font-size-xl);
		}
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
		font-size: var(--text-body);
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

	/* Resume-specific section heading styles */
	.resume-content h3 {
		color: var(--color-gray-dark);
		border-bottom: 1px solid var(--color-gray-dark);
		margin-bottom: 0.5rem;
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
`;
