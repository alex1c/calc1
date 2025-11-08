import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Supported locales
const locales = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'] as const;
type Locale = (typeof locales)[number];

/**
 * Detect locale from browser Accept-Language header
 * Returns the best matching locale or default 'ru'
 */
function detectLocaleFromHeader(request: NextRequest): Locale {
	const acceptLanguage = request.headers.get('accept-language');
	if (!acceptLanguage) return 'ru';

	// Locale mapping for browser language codes
	const localeMap: Record<string, Locale> = {
		ru: 'ru',
		'ru-ru': 'ru',
		'ru-by': 'ru',
		'ru-kz': 'ru',
		en: 'en',
		'en-us': 'en',
		'en-gb': 'en',
		'en-ca': 'en',
		'en-au': 'en',
		de: 'de',
		'de-de': 'de',
		'de-at': 'de',
		'de-ch': 'de',
		es: 'es',
		'es-es': 'es',
		'es-mx': 'es',
		'es-ar': 'es',
		'es-co': 'es',
		'es-cl': 'es',
		'es-pe': 'es',
		'es-ve': 'es',
		fr: 'fr',
		'fr-fr': 'fr',
		'fr-be': 'fr',
		'fr-ch': 'fr',
		'fr-ca': 'fr',
		it: 'it',
		'it-it': 'it',
		'it-ch': 'it',
		pl: 'pl',
		'pl-pl': 'pl',
		tr: 'tr',
		'tr-tr': 'tr',
		pt: 'pt-BR',
		'pt-br': 'pt-BR',
		'pt-pt': 'pt-BR',
		'pt-ao': 'pt-BR',
	};

	// Parse Accept-Language header with quality values
	const languages = acceptLanguage
		.split(',')
		.map((lang) => {
			const parts = lang.trim().split(';');
			const locale = parts[0].toLowerCase().trim();
			const quality = parts[1]
				? parseFloat(parts[1].replace('q=', '').trim())
				: 1.0;
			return { locale, quality };
		})
		.sort((a, b) => b.quality - a.quality);

	// Try to match supported locales
	for (const { locale } of languages) {
		// Check exact match (e.g., 'ru-ru', 'en-us')
		if (localeMap[locale]) {
			return localeMap[locale];
		}

		// Check language code only (e.g., 'ru' from 'ru-BY')
		const langCode = locale.split('-')[0];
		if (localeMap[langCode]) {
			return localeMap[langCode];
		}

		// Direct match with supported locales
		if (locales.includes(locale as Locale)) {
			return locale as Locale;
		}
	}

	return 'ru'; // Default fallback
}

/**
 * Get locale preference from cookie
 */
function getLocaleFromCookie(request: NextRequest): Locale | null {
	const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
	if (cookieLocale && locales.includes(cookieLocale as Locale)) {
		return cookieLocale as Locale;
	}
	return null;
}

// Create next-intl middleware with locale detection
const intlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: locales,

	// Used when no locale matches
	defaultLocale: 'ru',

	// Disable automatic locale detection - we use custom logic instead
	// Custom logic handles Accept-Language header and cookie preferences
	localeDetection: false,

	// Always show locale prefix for consistency
	// This ensures all routes have locale in URL
	localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Skip middleware for API routes, Next.js internals, and static files
	if (
		pathname.startsWith('/api/') ||
		pathname.startsWith('/_next/') ||
		pathname.startsWith('/_vercel/') ||
		pathname.includes('.')
	) {
		return NextResponse.next();
	}

	// Check if path already has a locale
	const pathnameHasLocale = locales.some(
		(locale) =>
			pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
	);

	// If root path without locale, detect locale and redirect
	if (!pathnameHasLocale && (pathname === '/' || pathname === '')) {
		// First check cookie preference (user's saved choice)
		let detectedLocale = getLocaleFromCookie(request);

		// If no cookie, detect from browser Accept-Language header
		if (!detectedLocale) {
			detectedLocale = detectLocaleFromHeader(request);
		}

		// Build redirect URL with detected locale
		const url = request.nextUrl.clone();
		url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;

		// Create response and set cookie to remember preference
		const response = NextResponse.redirect(url);
		response.cookies.set('NEXT_LOCALE', detectedLocale, {
			path: '/',
			maxAge: 365 * 24 * 60 * 60, // 1 year
			sameSite: 'lax',
			httpOnly: false, // Allow client-side access for JavaScript
			secure: process.env.NODE_ENV === 'production', // Secure in production
		});

		return response;
	}

	// For paths with locale, let next-intl handle routing
	const response = intlMiddleware(request);

	// Update cookie if locale changed
	if (pathnameHasLocale) {
		const currentLocale = pathname.split('/')[1] as Locale;
		if (locales.includes(currentLocale)) {
			const currentCookie = request.cookies.get('NEXT_LOCALE')?.value;
			if (currentCookie !== currentLocale) {
				response.cookies.set('NEXT_LOCALE', currentLocale, {
					path: '/',
					maxAge: 365 * 24 * 60 * 60,
					sameSite: 'lax',
					httpOnly: false,
					secure: process.env.NODE_ENV === 'production',
				});
			}
		}
	}

	return response;
}

export const config = {
	// Match only internationalized pathnames
	matcher: [
		// Match all pathnames except for
		// - api routes
		// - _next (Next.js internals)
		// - static files (images, fonts, etc.)
		'/((?!api|_next|_vercel|.*\\..*).*)',
	],
};






















