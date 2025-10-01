import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	// A list of all locales that are supported
	locales: ['ru', 'en', 'de', 'es'],

	// Used when no locale matches
	defaultLocale: 'ru',
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(ru|en|de|es)/:path*'],
};





