import type { DeepDive } from './types';

export const ivisa: DeepDive = {
	slug: 'ivisa',

	intro:
		"iVisa was my first full-time engineering role after changing careers. I joined with plenty still to learn, including Laravel and PHP, and one of my first assignments was building out an end-to-end test suite the application didn't really have yet.",

	sections: [
		{
			heading: 'Learning the codebase',
			body: [
				'What started as Dusk tests for a handful of high-volume application flows gradually became reusable testing infrastructure that let us cover more products, faster, as well as important workflows on the admin side. It was a good introduction to a large production codebase: learn how it works, find the patterns, and make the next problem easier to solve than the last one.',
			],
		},
		{
			heading: 'Working across the product',
			body: [
				"Five years later, my work touches most of that codebase. I still spend a lot of time in Vue and TypeScript, but regularly move through PHP, Laravel and the database depending on the problem. CSS and SEO-heavy work are two areas I've particularly become someone the team can rely on.",
				"I've implemented projects like our redesigned checkout, consolidating a multi-step payment flow into a single screen while keeping the legacy experience running alongside it as an A/B test. The winning version improved conversion by 15% and reduced abandonment by 30%.",
				"I also worked on a larger rebrand that meant rethinking how we used Tailwind across the site, moving to v4 and building a theming setup that could support both designs during another A/B test. And I've worked through four generations of our document-upload experience as we've changed how customers provide the files required for their applications.",
			],
		},
		{
			heading: 'Five years in',
			body: [
				'The biggest change over those five years is how I approach the work. I know the product and codebase well enough to work independently, move between layers when I need to, and fix things I find without every improvement needing to become a process first.',
			],
		},
	],
};
