import { css } from '@emotion/react';

export const GlobalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200;400;700&family=Titillium+Web:wght@200;400;600;700&display=swap');

    /* font-family: 'Mulish', sans-serif; */
    /* font-family: 'Titillium Web', sans-serif; */

    * {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

:root {
	/* Fonts */
	--ff-body: 'Mulish', sans-serif;
	--ff-title: 'Titillium Web', sans-serif;
	/* Typography */
	--weight-thin: 200;
	--weight-bold: 600;
	--size-body: 1.6rem;
	--size-title-main: 6rem;
	--size-title-section: 3rem;
	--size-subtitle: 1.8rem;

	/* Colors */
	/* Dark blue theme */
	--color-blue: rgba(0, 15, 85, 0.8);
	--color-blue-light: rgba(62, 107, 158, 0.4);
	--color-blue-dark: rgba(0, 30, 64, 0.8);
	--color-white: rgb(253, 253, 253);
	--color-accent: #d29700;
	--color-black: #222;
	/* Colors no transparency */
	--color-blue-opaque: rgb(0, 15, 85);
	--color-blue-light-opaque: rgb(62, 107, 158);
	--color-blue-dark-opaque: rgb(0, 30, 64);
	/* Opposite Light theme TBD */

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
	font-family: var(--ff-body);
	color: var(--color-white);
	line-height: 1.4;
}

a,
a:visited {
	color: inherit;
	text-decoration: none;
}

ul {
	list-style-type: none;
}

/* Change rem size for better text fit */
/* Mobile */
@media screen and (max-width: 600px) {
	html,
	body {
		font-size: 70%;
	}
}

/* large screen and hi-resolution */
@media screen and (min-width: 1500px) {
	html,
	body {
		font-size: 80%;
	}
}

`