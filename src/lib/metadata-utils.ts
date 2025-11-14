/**
 * Metadata Utilities
 *
 * Utility functions for generating metadata with proper locale support.
 */

import { SUPPORTED_LOCALES } from './constants';

/**
 * Generate alternates.languages object for metadata
 * Creates language alternates for all supported locales
 *
 * @param path - Path without locale prefix (e.g., '/construction/floor-heating')
 * @returns Object with language alternates
 */
export function generateLanguageAlternates(path: string): Record<string, string> {
	const baseUrl = 'https://calc1.ru';
	const alternates: Record<string, string> = {};

	for (const locale of SUPPORTED_LOCALES) {
		alternates[locale] = `${baseUrl}/${locale}${path}`;
	}

	return alternates;
}

/**
 * Safely get title with fallback and ensure it includes site name
 * @param titleValue - Title value from translations (can be undefined or empty)
 * @param fallbackTitle - Fallback title if translation is missing
 * @returns Safe title string with "| Calc1.ru" suffix
 */
export function getSafeTitle(
	titleValue: string | undefined,
	fallbackTitle: string = 'Калькулятор'
): string {
	const title = titleValue || fallbackTitle;
	// Ensure title includes site name, but avoid duplication
	if (title.includes('Calc1.ru') || title.includes('|')) {
		return title;
	}
	return `${title} | Calc1.ru`;
}

/**
 * Safely get description with fallback
 * @param descriptionValue - Description value from translations (can be undefined or empty)
 * @param fallbackDescription - Fallback description if translation is missing
 * @returns Safe description string
 */
export function getSafeDescription(
	descriptionValue: string | undefined,
	fallbackDescription: string = 'Онлайн калькулятор на Calc1.ru'
): string {
	return descriptionValue || fallbackDescription;
}

