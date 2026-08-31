import type { DeepDive } from './types';

export const careyCorea: DeepDive = {
	slug: 'carey-corea',

	intro:
		'A mobile-first artist portfolio where the technology stays out of sight and the artwork leads.',

	sections: [
		{
			heading: 'The project',
			body: [
				'Carey Corea needed an online portfolio that put the artwork first and worked well across devices without becoming visually complicated.',
			],
		},
		{
			heading: 'What I did',
			body: [
				'I built a mobile-first portfolio using Vue and a Sanity-backed content setup, giving the site owner a practical way to manage work without tying the presentation to a hard-coded collection.',
				'Accessibility, responsive image presentation and SEO were part of the implementation rather than additions at the end.',
			],
		},
		{
			heading: 'The result',
			body: [
				'The finished site is intentionally simple: the technology stays mostly out of sight and gives the work room to be the focus. It was a useful exercise in treating restraint as part of the engineering and design work.',
			],
		},
	],
};
