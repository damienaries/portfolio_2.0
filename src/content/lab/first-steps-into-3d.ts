import type { Post } from './types';

export const firstStepsInto3d: Post = {
	slug: 'first-steps-into-3d',
	title: 'First steps into 3D',
	publishedAt: '2026-09-23',

	standfirst:
		"Learning Blender well enough to build software around it — starting with a rocky river, and a render that took 37 minutes a frame.",

	tags: ['Blender', 'Cycles', 'Learning'],

	blocks: [
		{
			kind: 'text',
			body: [
				"I've been wanting to understand 3D better for a while, partly because it's fun and partly because I'm trying to move my engineering career closer to games, entertainment and media. I'm not trying to become a 3D artist. I want to understand the tools and workflows well enough to work with them, know what's happening under the hood, and eventually build software around them rather than treating 3D assets as a black box.",
				"It also ties into a bigger project I want to build next: a cloud-based storyboard and pre-production tool. Spending time inside Blender and animation workflows gives me a much better idea of the files, references, iterations and visual assets a tool like that will eventually need to organize and move through a production pipeline.",
			],
		},
		{
			kind: 'text',
			body: [
				"I started with a couple of guided Blender projects, including this rocky river scene from a **Ryan King Art** tutorial on YouTube. It took me through modeling and displacement, materials and procedural textures, Geometry Nodes, lighting, camera movement and a simple water animation.",
			],
		},
		/* No `loop`: that autoplays, and 10MB shouldn't load until someone asks. */
		{
			kind: 'video',
			src: '/media/lab/first-steps-into-3d/river.mp4',
			poster: '/media/lab/first-steps-into-3d/river-poster.webp',
			caption: 'Rocky river scene — 10s, Cycles',
		},
		{
			kind: 'text',
			body: [
				"Rendering turned into a useful lesson of its own. On my aging Intel MacBook, my first Cycles settings were taking around 37 minutes per frame. Some profiling and fairly aggressive compromises got that down to about 4 minutes. Not exactly fast, but enough to turn a week-long render into something I could finish overnight. It was a good reminder of a familiar engineering problem: figure out where the cost is coming from, decide what actually matters to the end result, and make the right tradeoffs.",
			],
		},
		{
			kind: 'image',
			src: '/media/lab/first-steps-into-3d/sheep-pen.webp',
			alt: 'A low-poly sheep in a small wooden pen on a round patch of grass, ringed by three blocky trees with striped green canopies.',
			caption: 'Sheep pen — from a second tutorial',
		},
		{
			kind: 'text',
			body: [
				"Next I want to move away from tutorials and realism and start building something of my own. I'm leaning toward a stylized, slightly cel-shaded direction with much lighter geometry, starting with a small animated 3D scene for this portfolio and eventually bringing those assets into Three.js.",
				"From there, the interesting part for me is where 3D and software start meeting: interaction, performance, asset pipelines and creative tools. That's the direction I want to keep exploring.",
			],
		},
	],
};
