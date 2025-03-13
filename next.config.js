const nextConfig = {
	images: {
		domains: ['cdn.sanity.io'],
	},
	target: 'serverless',
	experimental: {
		outputFileTracing: true,
	},
};

module.exports = nextConfig;
