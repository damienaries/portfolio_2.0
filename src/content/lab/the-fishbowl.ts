import type { Post } from './types';

export const theFishbowl: Post = {
	slug: 'the-fishbowl',
	title: 'The Fishbowl',
	publishedAt: '2026-10-31',

	standfirst:
		'A beginner sculpting exercise that got out of hand and turned into my first animated scene in Blender.',

	tags: ['Blender', 'Modeling', 'Sculpting', 'Animation'],

	blocks: [
		{
			kind: 'video',
			src: '/media/lab/the-fishbowl/fishbowl.mp4',
			poster: '/media/lab/the-fishbowl/fishbowl-poster.webp',
			caption: 'The Fishbowl — 8s loop',
			loop: true,
		},
		{
			kind: 'text',
			body: [
				'After finishing my first landscape in Blender, I wanted to try something more ambitious: creating a stylized 3D character based on myself for my portfolio, as the next step to recreate a small 3D scene for my hqome page.',
				'Surprising nobody, character modeling and sculpting is a very complicated. Hair alone was enough to send this rookie back to the drawing board.',
				"So I took a step back and followed a beginner sculpting tutorial to make a little fish. Once I had the fish, I figured I'd try building something around it on my own.",
			],
		},
		{
			kind: 'image',
			src: '/media/lab/the-fishbowl/fish-sculpt.webp',
			alt: 'A chubby orange cartoon fish with big round googly eyes, a small pouty mouth and pale orange fins, shown on its own against a dark grey background.',
			caption: 'Where it started',
		},
		{
			kind: 'text',
			body: [
				'A glass bowl with water, a simple sand mesh, a plant and a few pebbles, and eventually an animated swimming path. One thing led to another, and my little sculpting exercise became an eight-second aquarium animation.',
				'I learned quite a bit along the way, particularly about materials, lighting, animation, and how surprisingly difficult it is to make glass and water look right.',
				"It's not perfect, but it's my first animated scene built in Blender, and I'm pretty happy with how it turned out. Onwards!",
				'**Tutorial credit:** the fish started as [Sculpting for Complete Beginners!](https://www.youtube.com/watch?v=Lxem4yMs5Dg) by **Ryan King Art** on YouTube.',
			],
		},
	],
};
