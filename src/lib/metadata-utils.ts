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

