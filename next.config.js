/** @type {import('next').NextConfig} */
const nextConfig = {
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
