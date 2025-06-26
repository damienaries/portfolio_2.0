import { css } from '@emotion/react';
import { TypographyStyles } from './typography';

export const lightTheme = {
	background: 'var(--color-white)',
	text: 'var(--color-gray-dark)',
	cardBackground: 'var(--color-white-dark)',
	buttonBg: 'var(--color-gray-dark)',
	buttonText: 'var(--color-white)',
	buttonBgHover: 'var(--color-gray-light)',
	borderColor: 'var(--color-gray-light)',
	overlay: 'var(--color-gray-dark)',
	backgroundGradient:
		'linear-gradient(to right, var(--color-white), var(--color-white-dark))',
	techPillGradient:
		'linear-gradient(to bottom right, var(--color-accent-2), var(--color-accent-2), var(--color-gray-light))',
	boxShadow: 'var(--shadow-low)',
};

export const darkTheme = {
	background: 'var(--color-gray-dark)',
	text: 'var(--color-white)',
	cardBackground: 'var(--color-gray-light)',
	buttonBg: 'var(--color-white-dark)',
	buttonText: 'var(--color-gray-dark)',
	buttonBgHover: 'var(--color-white)',
	borderColor: 'var(--color-white-dark)',
	overlay: 'var(--color-gray-light)',
	backgroundGradient:
		'linear-gradient(to right bottom, var(--color-gray-dark), var(--color-gray-light))',
	techPillGradient:
		'linear-gradient(to bottom right, var(--color-gray-light), var(--color-gray-light), var(--color-white-dark))',
	boxShadow: 'var(--shadow-light)',
};

export const GlobalStyles = (theme) => css`
	@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800&display=swap');

	${TypographyStyles}

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	:root {
		/* Colors */
		--color-gray-dark: rgba(30, 35, 41, 1);
		--color-gray-light: rgba(115, 121, 128, 0.3);

		--color-white: rgba(251, 252, 253, 1);
		--color-white-dark: rgba(226, 232, 240, 1);

		--color-accent: rgba(59, 130, 246, 1);
		--color-accent-2: rgba(203, 213, 225, 1);

		/* Shadows and border radius */
		--radius: 8px;
		--shadow-low: 0px 2px 10px 0px rgba(34, 34, 34, 0.5);
		--shadow-light: 0px 2px 6px 0px rgba(253, 253, 253, 0.5);
	}

	html,
	body {
		font-size: 62.5%; /* make 1rem = 10px */
		scroll-behavior: smooth;
		font-family: var(--font-family);
		color: ${theme.text};
		background-color: ${theme.background};
		line-height: var(--line-height-normal);
	}

	body::-webkit-scrollbar {
		display: none;
	}

	a,
	a:visited {
		color: inherit;
		text-decoration: none;
	}

	ul {
		list-style-type: none;
	}
`;
