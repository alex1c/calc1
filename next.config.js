const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost'],
	},
	env: {
		_next_intl_trailing_slash: 'false',
	},
	trailingSlash: false,
	// Ensure all translation files are included in the output file tracing
	experimental: {
		outputFileTracingIncludes: {
			'/**': [
				'./messages/**/*.json',
			],
		},
	},
};

module.exports = withNextIntl(nextConfig);
