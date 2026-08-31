import type { DeepDive } from './types';

export const habitTracker: DeepDive = {
	slug: 'habit-tracker',

	intro:
		'A small offline-first PWA built entirely around my own requirements — and an exercise in not adding infrastructure until the product actually needed it.',

	sections: [
		{
			heading: 'Where it started',
			body: [
				'I wanted a habit tracker that matched how I actually think about routines. Some things happen daily, others weekly or every few days, and I wanted one simple view that told me what needed doing without turning it into another productivity system to manage.',
				'It also gave me a good excuse to build a small product entirely around my own requirements and see how far I could take a browser-based app.',
			],
		},
		{
			heading: 'What I wanted to build',
			body: [
				'The goal was a fast, installable app that felt closer to a native utility than a website. I settled on a seven-day view with flexible schedules, quick completion and streaks, with as little friction between opening the app and checking something off as possible.',
			],
		},
		{
			heading: 'How I built it',
			body: [
				'I made it a React PWA and kept the core data local with IndexedDB rather than requiring accounts and a backend. That made the app fast, usable offline and considerably simpler for something designed primarily as a personal tool.',
				'Notifications complicated that decision. Browser push can\'t live entirely on-device, so I added a small serverless backend only for the part that needed it rather than moving the whole application online.',
			],
		},
		{
			heading: 'Where it led',
			body: [
				'The result is a small but complete PWA I still use as a test bed for ideas around recurring schedules, notifications and offline-first interfaces. More importantly, it was a useful exercise in **not** building infrastructure until the product actually required it.',
			],
		},
	],
};
