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
