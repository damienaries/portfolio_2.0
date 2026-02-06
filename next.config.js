/** @type {import('next').NextConfig} */
const nextConfig = {
	// Explicitly use webpack instead of Turbopack
	webpack: (config, { isServer }) => {
		return config;
	},
	// Add empty turbopack config to silence the warning
	turbopack: {},
	compiler: {
		emotion: {
			sourceMap: true,
			autoLabel: 'dev-only',
			labelFormat: '[local]',
		},
	},
};

module.exports = nextConfig;
