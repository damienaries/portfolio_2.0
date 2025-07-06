/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['cdn.sanity.io'],
	},
	compiler: {
		emotion: {
			sourceMap: true,
			autoLabel: 'dev-only',
			labelFormat: '[local]',
		},
	},
};

module.exports = nextConfig;
