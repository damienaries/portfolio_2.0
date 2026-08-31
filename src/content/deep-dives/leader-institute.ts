import type { DeepDive } from './types';

export const leaderInstitute: DeepDive = {
	slug: 'leader-institute',

	intro:
		'A freelance build for CWC\'s leadership program — a large amount of program information made clear and approachable.',

	sections: [
		{
			heading: 'The project',
			body: [
				'CWC needed a new site for its leadership program that could clearly explain the program, handle interest and application flows, and be straightforward for prospective participants to use across devices.',
			],
		},
		{
			heading: 'What I did',
			body: [
				'I designed and built the site as a freelance project, including the information architecture, responsive interface, application-related flows, contact and interest forms, analytics and accessibility work.',
				'The project was less about technical complexity than making a fairly large amount of program information feel clear and approachable. I used Nuxt and Vue, keeping the site lightweight and largely static while connecting the few pieces that actually needed to accept or manage data.',
			],
		},
		{
			heading: 'The result',
			body: [
				'The finished site gave CWC a dedicated home for the program and a foundation they could continue using as it evolved. For me, it was also a good example of owning the whole path from a client\'s requirements to design decisions, implementation and deployment.',
			],
		},
	],
};
