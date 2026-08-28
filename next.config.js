/** @type {import('next').NextConfig} */
const nextConfig = {
	// Turbopack is the default bundler in Next 16. The project previously pinned
	// webpack because of the Emotion SWC transform; the redesign is on Tailwind,
	// and the remaining Emotion pages build correctly under Turbopack.
	compiler: {
		emotion: {
			sourceMap: true,
			autoLabel: 'dev-only',
			labelFormat: '[local]',
		},
	},
};

module.exports = nextConfig;
