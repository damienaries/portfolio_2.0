import type { DeepDive } from './types';

export const swizzle: DeepDive = {
	slug: 'swizzle',

	intro:
		'The tool I would have wanted as a bartender and manager: a curated place to concentrate cocktail knowledge and make it easy to use.',

	sections: [
		{
			heading: 'Where it started',
			body: [
				'I spent years managing bars and training bartenders before moving into software. One thing I carried with me was the classics list we used for training: the drinks I expected someone behind the bar to know and be able to make well. Building something around that knowledge had been in the back of my mind since I became a developer.',
				'There are already enormous cocktail databases online, but volume isn\'t necessarily useful. Good recipes can get buried among thousands of variations, and even the definition of a "classic" can be loose.',
			],
		},
		{
			heading: 'What I wanted to build',
			body: [
				'I imagined Swizzle as the tool I would have wanted as a bartender and manager: a curated place to concentrate that knowledge and make it easy to use.',
				'The library grew from two main sources: the classics list we used at ECC and training material attributed to Sam Ross and Milk & Honey. Where provenance is known, I cite it; where cocktail history is disputed, I don\'t pretend otherwise.',
			],
		},
		{
			heading: 'How I built it',
			body: [
				'Rather than treating each drink as an article, I structured methods, families, ingredients, glassware, garnish and other characteristics as data. It took more work upfront, but gave search, collections and menus a common foundation.',
				'The scope also grew quickly: personal collections, custom menus, technical guides, community recipes, team tools and back-bar planning. Instead of waiting to build all of it, I focused the first release on the reference library and initial personalization features.',
			],
		},
		{
			heading: 'Where it led',
			body: [
				'Swizzle launched publicly in 2026 and is now gathering usage, feedback and suggestions. What began as a way to share knowledge from my previous career has become a product I can keep building around how people actually use it.',
				'The next decisions are less about what I can add and more about what users find useful enough to build next.',
			],
		},
	],
};
