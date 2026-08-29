import type { DeepDive } from './types';

/**
 * DRAFT SCAFFOLD.
 *
 * Every sentence below is drawn from what's already written in
 * portfolio_data_copy.json, the resume, or the Swizzle repo itself. Anything
 * only Damien knows is marked TODO rather than guessed at — the point of this
 * page is that it survives an interviewer following up on it.
 */
export const swizzle: DeepDive = {
	slug: 'swizzle',

	intro:
		'A cocktail compendium and custom CMS built for the bartender and manager I used to be — drawn from more than a decade behind the bar.',

	sections: [
		{
			heading: 'Context',
			body: [
				'Before I wrote software I spent more than a decade behind bars, most of it running programs rather than just working them. Swizzle started as the reference I kept wishing existed: a compendium of bespoke drinks that a working bar team could actually use during service.',
				'TODO — what specifically pushed you to start building it, and when. A bad shift, a lost notebook, a menu rewrite? The concrete origin is what makes this section land.',
			],
		},
		{
			heading: 'The problem',
			body: [
				'TODO — how bar teams manage recipes and menus today, in your experience: shared docs, printed sheets, someone\'s notebook. Name the specific failure that costs a shift time or consistency.',
				'TODO — why existing recipe apps do not solve it. They are built for home drinkers, not for a team running a menu under pressure. Be specific about what they get wrong.',
			],
		},
		{
			heading: 'What I owned',
			body: [
				'Everything. Product decisions, interface design, data model, the CMS, the deploy pipeline. No designer, no second engineer, no brief but my own.',
				'That is the honest appeal of the project: it is the clearest evidence I have that I can take something from a vague instinct to a deployed product without anyone handing me a spec.',
			],
		},
		{
			heading: 'Decisions that mattered',
			body: [
				'**Building a CMS rather than adopting one.** Off-the-shelf headless CMSs model blog posts. A cocktail is a structured object — ingredients with quantities and units, a technique, glassware, garnish, provenance — and menus are ordered collections of those objects with their own rules. Bending a generic content model into that shape would have cost more than building the editor I actually wanted, and it would have left the writing experience wrong for the people using it.',
				'**Firebase over a backend I maintain.** Firestore plus its security rules covers auth, persistence and per-user data isolation without a server to keep alive. For a solo side project the operational cost of anything else is the thing that kills it in month four.',
				'**TypeScript from the start.** Recipes are deeply nested and shared across the editor, the menu builder and the reader view. TODO — a specific bug or refactor the types caught or made safe.',
				'**A token-driven design system.** The whole palette and type scale live in one Tailwind v4 `@theme` block, so the light and dark themes stay in sync and the visual language can be retuned in one file.',
			],
		},
		{
			heading: 'Tradeoffs',
			body: [
				'TODO — the honest cost of the Firebase decision: vendor lock-in, query limits, what happens if this ever needs full-text search across a large corpus.',
				'TODO — what you deliberately left out of v1 and why.',
			],
		},
		{
			heading: 'Where it stands',
			body: [
				'The app is live, and users can create their own recipes and curate full menus inside a platform tailored to how bar teams actually work.',
				'A glossary of terms, ingredients and techniques is next — the kind of reference I hope will help train a future generation of barkeeps.',
			],
		},
	],

	outcomes: [
		'TODO — real numbers if you have them: users, recipes created, menus built, anyone using it in a working bar.',
		'TODO — if there are no numbers yet, say so plainly and describe what you learned instead. That reads better than silence.',
	],

	wouldChange: [
		'TODO — the thing you would rebuild. Interviewers ask this and most portfolios dodge it, so a real answer here is worth more than the rest of the page.',
	],
};
