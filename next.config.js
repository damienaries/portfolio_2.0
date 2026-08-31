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

	images: {
		// The optimizer's default TTL is short, so /_next/image responses were
		// being revalidated far more often than the source images change. These
		// are committed files — a year is honest.
		minimumCacheTTL: 31536000,
		// Only sizes the layout can actually request. Fewer variants means fewer
		// cold optimizations on first hit.
		deviceSizes: [640, 828, 1080, 1200, 1920, 2560],
		imageSizes: [96, 144, 176, 384],
	},
};

module.exports = nextConfig;
