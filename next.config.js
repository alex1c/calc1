const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost'],
	},
	env: {
		_next_intl_trailing_slash: 'false',
	},
};

module.exports = withNextIntl(nextConfig);
