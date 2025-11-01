/**
 * Utility functions for loading merged translations in generateMetadata
 * Works the same way as i18n.ts but for use in page metadata generation
 */

/**
 * Deep merge function (same as in i18n.ts)
 * Arrays are replaced, objects are merged
 */
function deepMerge(a: any, b: any): any {
	if (Array.isArray(a) || Array.isArray(b)) return b;
	if (a && typeof a === 'object' && b && typeof b === 'object') {
		const out: any = { ...a };
		for (const k of Object.keys(b)) {
			out[k] = k in a ? deepMerge(a[k], b[k]) : b[k];
		}
		return out;
	}
	return b;
}

/**
 * Load merged translations for category calculators
 * Merges base messages with category-specific JSON translations
 */
export async function loadMergedCategoryTranslations(
	locale: string,
	category: 'auto' | 'finance' | 'life' | 'math' | 'construction' | 'time' | 'health' | 'converter' | 'fun' | 'it' | 'science'
) {
	// Load base monolith
	const messages = (await import(`../../messages/${locale}.json`)).default;

	// Load category translations
	let categoryMessages: any = {};
	try {
		categoryMessages = (await import(
			`../../messages/${locale}/calculators/${category}.json`
		)).default;
	} catch {
		// If category.json doesn't exist, use empty object
		categoryMessages = {};
	}

	// Normalize category.json structure if needed
	// Support both { calculators: { ... } } and { ... }
	const normalized = categoryMessages?.calculators
		? categoryMessages
		: { calculators: categoryMessages };

	// Deep merge
	return deepMerge(messages, normalized);
}

/**
 * Load merged translations for auto calculators
 * Merges base messages with auto.json category translations
 * @deprecated Use loadMergedCategoryTranslations(locale, 'auto') instead
 */
export async function loadMergedAutoTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'auto');
}

/**
 * Load merged translations for finance calculators
 * Merges base messages with finance.json category translations
 */
export async function loadMergedFinanceTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'finance');
}

/**
 * Load merged translations for life calculators
 * Merges base messages with life.json category translations
 */
export async function loadMergedLifeTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'life');
}

/**
 * Load merged translations for math calculators
 * Merges base messages with math.json category translations
 */
export async function loadMergedMathTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'math');
}

/**
 * Load merged translations for construction calculators
 * Merges base messages with construction.json category translations
 */
export async function loadMergedConstructionTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'construction');
}

/**
 * Load merged translations for time calculators
 * Merges base messages with time.json category translations
 */
export async function loadMergedTimeTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'time');
}

/**
 * Load merged translations for health calculators
 * Merges base messages with health.json category translations
 */
export async function loadMergedHealthTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'health');
}

/**
 * Load merged translations for converter calculators
 * Merges base messages with converter.json category translations
 */
export async function loadMergedConverterTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'converter');
}

/**
 * Load merged translations for fun calculators
 * Merges base messages with fun.json category translations
 */
export async function loadMergedFunTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'fun');
}

/**
 * Load merged translations for IT calculators
 * Merges base messages with it.json category translations
 */
export async function loadMergedItTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'it');
}

/**
 * Load merged translations for science calculators
 * Merges base messages with science.json category translations
 */
export async function loadMergedScienceTranslations(locale: string) {
	return loadMergedCategoryTranslations(locale, 'science');
}

