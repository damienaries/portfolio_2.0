import type { DeepDive } from './types';

export const coreaCreative: DeepDive = {
	slug: 'corea-creative',

	intro:
		'A video-led portfolio built so embedded work from Vimeo and YouTube stays central without making the site feel slow.',

	sections: [
		{
			heading: 'The project',
			body: [
				'Corea Creative needed a portfolio built around video, where embedded work from Vimeo and YouTube could remain central without making the site feel slow or cumbersome.',
			],
		},
		{
			heading: 'What I did',
			body: [
				'I built the site in Next.js and React, concentrating much of the implementation work on media integration and frontend performance. With a video-heavy portfolio, that meant paying particular attention to loading behavior and Core Web Vitals rather than treating embeds as an afterthought.',
			],
		},
		{
			heading: 'The result',
			body: [
				'The project became a good example of a recurring theme in my freelance work: taking something visually rich and finding the simplest technical implementation that lets the content remain the focus.',
			],
		},
	],
};
