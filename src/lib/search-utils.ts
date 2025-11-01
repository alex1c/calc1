/**
 * Search utilities for finding calculators across all categories
 * Supports multiple locales and extensible for future locales
 */

export interface CalculatorSearchResult {
	id: string;
	title: string;
	description: string;
	category: string;
	categorySlug: string;
	href: string;
	locale: string;
	matchScore: number;
}

export interface SearchIndex {
	calculators: CalculatorSearchResult[];
	categories: Array<{
		id: string;
		title: string;
		slug: string;
		locale: string;
	}>;
}

/**
 * Normalize search query - remove accents, lowercase, trim
 */
function normalizeQuery(query: string): string {
	return query
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, ''); // Remove accents
}

/**
 * Calculate match score for a search result
 * Higher score = better match
 */
function calculateMatchScore(
	query: string,
	text: string,
	isTitle: boolean = false
): number {
	const normalizedQuery = normalizeQuery(query);
	const normalizedText = normalizeQuery(text);

	if (normalizedText === normalizedQuery) {
		return isTitle ? 100 : 50; // Exact match
	}

	if (normalizedText.startsWith(normalizedQuery)) {
		return isTitle ? 90 : 45; // Starts with query
	}

	if (normalizedText.includes(normalizedQuery)) {
		const words = normalizedQuery.split(/\s+/).filter(Boolean);
		const textWords = normalizedText.split(/\s+/).filter(Boolean);

		// Check if all words are present
		const allWordsPresent = words.every((word) =>
			textWords.some((textWord) => textWord.includes(word))
		);

		if (allWordsPresent) {
			// Calculate score based on word positions and match quality
			let score = 30;
			words.forEach((word, index) => {
				const wordIndex = textWords.findIndex((tw) =>
					tw.includes(word)
				);
				if (wordIndex !== -1) {
					// Prefer matches at the beginning
					score += 10 / (wordIndex + 1);
				}
			});
			return isTitle ? score * 1.5 : score;
		}

		return isTitle ? 20 : 10; // Partial match
	}

	// Check for fuzzy matching (common typos, similar words)
	const similarity = calculateSimilarity(normalizedQuery, normalizedText);
	if (similarity > 0.7) {
		return isTitle ? similarity * 40 : similarity * 20;
	}

	return 0;
}

/**
 * Simple similarity calculation using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
	const longer = str1.length > str2.length ? str1 : str2;
	const shorter = str1.length > str2.length ? str2 : str1;

	if (longer.length === 0) return 1.0;

	const distance = levenshteinDistance(longer, shorter);
	return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
	const matrix: number[][] = [];

	for (let i = 0; i <= str2.length; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= str1.length; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= str2.length; i++) {
		for (let j = 1; j <= str1.length; j++) {
			if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					matrix[i][j - 1] + 1, // insertion
					matrix[i - 1][j] + 1 // deletion
				);
			}
		}
	}

	return matrix[str2.length][str1.length];
}

/**
 * Search calculators across all categories
 * This function will be called from the client side with loaded calculator data
 */
export function searchCalculators(
	query: string,
	calculators: CalculatorSearchResult[]
): CalculatorSearchResult[] {
	if (!query || query.trim().length === 0) {
		return [];
	}

	const normalizedQuery = normalizeQuery(query);

	// Score each calculator
	const scored = calculators.map((calc) => {
		const titleScore = calculateMatchScore(query, calc.title, true);
		const descriptionScore = calculateMatchScore(query, calc.description);
		const categoryScore = calculateMatchScore(query, calc.category);

		const totalScore =
			titleScore * 2 + descriptionScore * 1.5 + categoryScore * 0.5;

		return {
			...calc,
			matchScore: totalScore,
		};
	});

	// Filter out zero-score results and sort by score
	return scored
		.filter((calc) => calc.matchScore > 0)
		.sort((a, b) => b.matchScore - a.matchScore)
		.slice(0, 20); // Limit to top 20 results
}

/**
 * Build search index from calculator data
 * This will be used to populate the searchable calculators list
 * Works both on server and client side
 */
export async function buildSearchIndex(
	locale: string
): Promise<CalculatorSearchResult[]> {
	const results: CalculatorSearchResult[] = [];

	// Category slugs mapping
	const categoryMap: Record<string, { slug: string; titleKey: string }> = {
		auto: { slug: 'auto', titleKey: 'categories.auto.title' },
		finance: { slug: 'finance', titleKey: 'categories.finance.title' },
		life: { slug: 'life', titleKey: 'categories.life.title' },
		math: { slug: 'math', titleKey: 'categories.math.title' },
		construction: {
			slug: 'construction',
			titleKey: 'categories.construction.title',
		},
		time: { slug: 'time', titleKey: 'categories.time.title' },
		health: { slug: 'health', titleKey: 'categories.health.title' },
		converter: {
			slug: 'converter',
			titleKey: 'categories.converter.title',
		},
		fun: { slug: 'fun', titleKey: 'categories.fun.title' },
		it: { slug: 'it', titleKey: 'categories.it.title' },
		science: { slug: 'science', titleKey: 'categories.science.title' },
	};

	// Load category translations
	let messages: any = {};
	try {
		messages = (await import(`../../messages/${locale}.json`)).default;
	} catch (error) {
		console.warn(`Failed to load base messages for locale ${locale}`);
	}

	const getCategoryTitle = (key: string) => {
		const parts = key.split('.');
		let value = messages;
		for (const part of parts) {
			value = value?.[part];
			if (!value) break;
		}
		return value || key.replace('categories.', '').replace('.title', '');
	};

	// Load calculator data from category files
	const categories = Object.keys(categoryMap);
	for (const category of categories) {
		try {
			let categoryMessages: any = {};
			try {
				categoryMessages = (
					await import(
						`../../messages/${locale}/calculators/${category}.json`
					)
				).default;
			} catch (importError) {
				// Try alternative path for client-side
				try {
					categoryMessages = (
						await import(
							`../../../messages/${locale}/calculators/${category}.json`
						)
					).default;
				} catch {
					// Skip if both paths fail
					continue;
				}
			}

			const calculators = categoryMessages?.calculators || {};
			const categoryInfo = categoryMap[category];

			for (const [calcId, calcData] of Object.entries(calculators) as [
				string,
				any
			][]) {
				if (calcData?.title && calcData?.description) {
					// Normalize calc ID: convert camelCase/kebab-case to kebab-case
					let normalizedId = calcId
						.replace(/_/g, '-') // Replace underscores with hyphens
						.replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
						.toLowerCase();

					// Special cases for known calculator IDs that don't match the pattern
					const specialCases: Record<string, Record<string, string>> = {
						auto: {
							carDepreciation: 'car-depreciation',
							carOwnership: 'car-ownership',
							trafficFines: 'traffic-fines',
							vehicleTax: 'vehicle-tax',
							fuelConsumption: 'fuel-consumption',
							carLoan: 'car-loan',
							lpgPayback: 'lpg-payback',
						},
						it: {
							ipCalculator: 'ip-calculator',
							qrGenerator: 'qr-generator',
						},
						health: {
							bmiHealth: 'bmihealth', // Special case
						},
						science: {
							gradeCalculator: 'grade-calculator',
						},
					};

					if (specialCases[category]?.[calcId]) {
						normalizedId = specialCases[category][calcId];
					}

					results.push({
						id: `${category}-${calcId}`,
						title: calcData.title,
						description: calcData.description,
						category: getCategoryTitle(categoryInfo.titleKey),
						categorySlug: categoryInfo.slug,
						href: `/${categoryInfo.slug}/${normalizedId}`,
						locale,
						matchScore: 0,
					});
				}
			}
		} catch (error) {
			// Category file doesn't exist or error loading, skip silently
			console.debug(
				`Category ${category} not found or error loading for locale ${locale}`,
				error
			);
		}
	}

	return results;
}

