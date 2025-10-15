/**
 * Statistics calculator library
 * Calculates various statistical measures from a dataset
 */

/**
 * Represents the result of statistical calculations
 */
export interface StatisticsResult {
	mean: number;
	median: number;
	mode: number[];
	variance: number;
	standardDeviation: number;
	min: number;
	max: number;
	count: number;
	sum: number;
}

/**
 * Parse input string and extract numbers
 * @param input - Input string with numbers separated by commas or spaces
 * @returns Array of parsed numbers
 */
export function parseNumbers(input: string): number[] {
	if (!input.trim()) {
		return [];
	}

	// Split by commas, spaces, or both
	const parts = input.split(/[,\s]+/).filter((part) => part.trim() !== '');

	// Parse each part as a number
	const numbers: number[] = [];

	for (const part of parts) {
		const num = parseFloat(part.trim());
		if (!isNaN(num) && isFinite(num)) {
			numbers.push(num);
		}
	}

	return numbers;
}

/**
 * Calculate mean (average) of numbers
 * @param numbers - Array of numbers
 * @returns Mean value
 */
export function calculateMean(numbers: number[]): number {
	if (numbers.length === 0) return 0;
	return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculate median of numbers
 * @param numbers - Array of numbers
 * @returns Median value
 */
export function calculateMedian(numbers: number[]): number {
	if (numbers.length === 0) return 0;

	const sorted = [...numbers].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);

	if (sorted.length % 2 === 0) {
		return (sorted[mid - 1] + sorted[mid]) / 2;
	} else {
		return sorted[mid];
	}
}

/**
 * Calculate mode (most frequent values) of numbers
 * @param numbers - Array of numbers
 * @returns Array of mode values (can be multiple if tied)
 */
export function calculateMode(numbers: number[]): number[] {
	if (numbers.length === 0) return [];

	// Count frequency of each number
	const frequency: { [key: number]: number } = {};

	for (const num of numbers) {
		frequency[num] = (frequency[num] || 0) + 1;
	}

	// Find maximum frequency
	const maxFrequency = Math.max(...Object.values(frequency));

	// Find all numbers with maximum frequency
	const modes: number[] = [];
	for (const [num, freq] of Object.entries(frequency)) {
		if (freq === maxFrequency) {
			modes.push(parseFloat(num));
		}
	}

	// If all numbers have frequency 1, there's no mode
	if (maxFrequency === 1 && modes.length === numbers.length) {
		return [];
	}

	return modes.sort((a, b) => a - b);
}

/**
 * Calculate variance of numbers
 * @param numbers - Array of numbers
 * @returns Variance value
 */
export function calculateVariance(numbers: number[]): number {
	if (numbers.length === 0) return 0;

	const mean = calculateMean(numbers);
	const squaredDiffs = numbers.map((num) => Math.pow(num - mean, 2));
	return calculateMean(squaredDiffs);
}

/**
 * Calculate standard deviation of numbers
 * @param numbers - Array of numbers
 * @returns Standard deviation value
 */
export function calculateStandardDeviation(numbers: number[]): number {
	return Math.sqrt(calculateVariance(numbers));
}

/**
 * Calculate all statistics for a dataset
 * @param numbers - Array of numbers
 * @returns Complete statistics result
 */
export function calculateStatistics(numbers: number[]): StatisticsResult {
	if (numbers.length === 0) {
		return {
			mean: 0,
			median: 0,
			mode: [],
			variance: 0,
			standardDeviation: 0,
			min: 0,
			max: 0,
			count: 0,
			sum: 0,
		};
	}

	const sorted = [...numbers].sort((a, b) => a - b);

	return {
		mean: calculateMean(numbers),
		median: calculateMedian(numbers),
		mode: calculateMode(numbers),
		variance: calculateVariance(numbers),
		standardDeviation: calculateStandardDeviation(numbers),
		min: sorted[0],
		max: sorted[sorted.length - 1],
		count: numbers.length,
		sum: numbers.reduce((sum, num) => sum + num, 0),
	};
}

/**
 * Format number for display
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string
 */
export function formatNumber(num: number, decimals: number = 2): string {
	return num.toFixed(decimals);
}

/**
 * Validate input string
 * @param input - Input string to validate
 * @returns Object with validation result and error message
 */
export function validateInput(input: string): {
	isValid: boolean;
	error?: string;
} {
	if (!input.trim()) {
		return { isValid: false, error: 'Input is required' };
	}

	const numbers = parseNumbers(input);

	if (numbers.length === 0) {
		return { isValid: false, error: 'No valid numbers found' };
	}

	if (numbers.length < 2) {
		return {
			isValid: false,
			error: 'At least 2 numbers are required for meaningful statistics',
		};
	}

	return { isValid: true };
}
