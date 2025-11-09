/**
 * Application Constants
 *
 * Centralized constants used throughout the application.
 */

/**
 * Supported locales in the application
 * Used for validation, metadata generation, and routing
 */
export const SUPPORTED_LOCALES = [
	'ru',
	'en',
	'de',
	'es',
	'fr',
	'it',
	'pl',
	'tr',
	'pt-BR',
] as const;

/**
 * Type for supported locale
 */
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Default locale (fallback)
 */
export const DEFAULT_LOCALE: SupportedLocale = 'ru';

/**
 * Check if a string is a supported locale
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
	return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

