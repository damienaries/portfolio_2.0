import { css } from '@emotion/react';

export const lightTheme = {
	background: 'rgb(253, 253, 253)',
	text: '#222',
	iconHover: 'rgba(0, 30, 64, 0.9)',
	cardBackground: 'var(--color-gray-light)',
	buttonBg: 'rgba(69, 90, 100, .7)',
	buttonText: '#fafafa',
	buttonBgHover: 'rgba(69, 90, 100, 1)',
	borderColor: 'var(--color-gray-dark)',
	overlay: 'var(--color-gray-dark)',
	backgroundGradient: 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4))'
};

export const darkTheme = {
	background: 'rgb(0, 30, 64)',
	text: 'rgb(253, 253, 253)',
	iconHover: 'var(--color-blue-light-opaque)',
	cardBackground: 'var(--color-blue-light)',
	buttonBg: 'var(--color-blue-light)',
	buttonText: '#fafafa',
	buttonBgHover: 'var(--color-blue-dark)',
	borderColor: 'rgb(253, 253, 253)',
	overlay: 'var(--color-gray-light)',
	backgroundGradient: 'linear-gradient(to right bottom, var(--color-blue-dark), var(--color-blue-light))'
};

export const GlobalStyles = (theme) => css`
	@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;400;700&family=Titillium+Web:wght@200;400;600;700&display=swap');

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	:root {
		/* Fonts */
		--ff-main: 'Mulish', sans-serif;
		
		/* Typography */
		--weight-thin: 200;
		--weight-bold: 500;
		--size-body: 1.6rem;
		--size-title-main: 4rem;
		--size-title-section: 2rem;
		--size-subtitle: 1.8rem;

		/* Colors */

		/* Dark Theme */
		--color-blue-light: rgba(62, 107, 158, 0.3);
		--color-blue-dark: rgba(0, 30, 64, 0.9);

		/* Light theme */
		--color-gray-light: rgba(207, 216, 220, 0.4);
		--color-gray-dark: rgba(69, 90, 100, 0.5);

		/* Colors no transparency */
		--color-blue-opaque: rgb(0, 15, 85);
		--color-blue-light-opaque: rgb(62, 107, 158);
		--color-blue-dark-opaque: rgb(0, 30, 64);

		/* Shadows and border radius */
		--radius: 8px;
		--shadow-low: 0px 2px 10px 0px rgba(34, 34, 34, 0.5);
		--shadow-high: 0px 5px 10px 0px rgba(34, 34, 34, 0.55);
		--shadow-light: 0px 2px 10px 0px rgba(253, 253, 253, 0.8);
	}

	html,
	body {
		font-size: 62.5%; /* make 1rem = 10px */
		scroll-behavior: smooth;
		font-family: var(--ff-main);
		color: ${theme.text};
		background-color: ${theme.background};
		line-height: 1.4;
		transition: all 0.3s linear;
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

	svg:hover {
		fill: ${theme.iconHover};
	}
`;
