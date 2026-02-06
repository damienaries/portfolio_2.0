/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		emotion: {
			sourceMap: true,
			autoLabel: 'dev-only',
			labelFormat: '[local]',
		},
	},
};

module.exports = nextConfig;
