/**
 * Percentage Calculator Library
 * 
 * Provides comprehensive percentage calculation functionality for various use cases.
 * Supports four main calculation types:
 * 
 * 1. Find percentage of a number: What is X% of Y?
 * 2. Find what percentage: What percentage is X of Y?
 * 3. Find number from percentage: X is Y% of what number?
 * 4. Increase/decrease by percentage: Increase/decrease X by Y%
 * 
 * All functions include:
 * - Input validation
 * - Formula generation for display
 * - Localized description keys for i18n
 * - Result formatting
 */

/**
 * Result interface for percentage calculations
 * Contains the calculated result and metadata for display
 */
export interface PercentCalculationResult {
	result: number; // Calculated numeric result
	formula: string; // Human-readable formula string
	descriptionKey: string; // Translation key for result description
	descriptionParams: Record<string, number>; // Parameters for description interpolation
}

/**
 * Calculate what percentage a number represents of another number
 * Formula: (number × percentage) / 100
 */
export function getPercentOfNumber(
	number: number,
	percentage: number
): PercentCalculationResult {
	if (number < 0 || percentage < 0) {
		throw new Error('Numbers and percentages must be non-negative');
	}

	const result = (number * percentage) / 100;
	const formula = `(${number} × ${percentage}) ÷ 100 = ${result.toFixed(2)}`;

	return {
		result,
		formula,
		descriptionKey: 'results.percent_of_number',
		descriptionParams: { percentage, number, result },
	};
}

/**
 * Find what percentage one number is of another number
 * Formula: (number1 / number2) × 100
 */
export function getWhatPercent(
	number1: number,
	number2: number
): PercentCalculationResult {
	if (number2 === 0) {
		throw new Error('Second number cannot be zero');
	}
	if (number1 < 0 || number2 < 0) {
		throw new Error('Numbers must be non-negative');
	}

	const result = (number1 / number2) * 100;
	const formula = `(${number1} ÷ ${number2}) × 100 = ${result.toFixed(2)}%`;

	return {
		result,
		formula,
		descriptionKey: 'results.what_percent',
		descriptionParams: { number1, number2, result },
	};
}

/**
 * Find the original number when given a percentage and the resulting value
 * Formula: (part × 100) / percentage
 */
export function getNumberFromPercent(
	percentage: number,
	part: number
): PercentCalculationResult {
	if (percentage <= 0) {
		throw new Error('Percentage must be greater than zero');
	}
	if (part < 0) {
		throw new Error('Part value must be non-negative');
	}

	const result = (part * 100) / percentage;
	const formula = `(${part} × 100) ÷ ${percentage} = ${result.toFixed(2)}`;

	return {
		result,
		formula,
		descriptionKey: 'results.number_from_percent',
		descriptionParams: { part, percentage, result },
	};
}

/**
 * Increase or decrease a number by a percentage
 * Formula: number × (1 ± percentage / 100)
 */
export function changeByPercent(
	number: number,
	percentage: number,
	operation: 'increase' | 'decrease'
): PercentCalculationResult {
	if (number < 0 || percentage < 0) {
		throw new Error('Numbers and percentages must be non-negative');
	}

	const multiplier =
		operation === 'increase' ? 1 + percentage / 100 : 1 - percentage / 100;

	const result = number * multiplier;
	const sign = operation === 'increase' ? '+' : '-';
	const formula = `${number} × (1 ${sign} ${percentage} ÷ 100) = ${result.toFixed(
		2
	)}`;

	return {
		result,
		formula,
		descriptionKey:
			operation === 'increase'
				? 'results.increase_by_percent'
				: 'results.decrease_by_percent',
		descriptionParams: { number, percentage, result },
	};
}

/**
 * Calculator operation types for the UI
 */
export type CalculatorOperation =
	| 'percent_of_number'
	| 'what_percent'
	| 'number_from_percent'
	| 'change_by_percent';

/**
 * Configuration for calculator operations
 */
export interface CalculatorOperationConfig {
	id: CalculatorOperation;
	titleKey: string;
	descriptionKey: string;
	inputs: Array<{
		name: string;
		labelKey: string;
		type: 'number' | 'select';
		options?: Array<{ value: string; labelKey: string }>;
		required: boolean;
		placeholder?: string;
	}>;
}

export const calculatorOperations: CalculatorOperationConfig[] = [
	{
		id: 'percent_of_number',
		titleKey: 'find_percent_of_number',
		descriptionKey: 'find_percent_of_number_desc',
		inputs: [
			{
				name: 'number',
				labelKey: 'number',
				type: 'number',
				required: true,
				placeholder: '100',
			},
			{
				name: 'percentage',
				labelKey: 'percentage',
				type: 'number',
				required: true,
				placeholder: '25',
			},
		],
	},
	{
		id: 'what_percent',
		titleKey: 'what_percent_is',
		descriptionKey: 'what_percent_is_desc',
		inputs: [
			{
				name: 'number1',
				labelKey: 'first_number',
				type: 'number',
				required: true,
				placeholder: '25',
			},
			{
				name: 'number2',
				labelKey: 'second_number',
				type: 'number',
				required: true,
				placeholder: '100',
			},
		],
	},
	{
		id: 'number_from_percent',
		titleKey: 'find_number_from_percent',
		descriptionKey: 'find_number_from_percent_desc',
		inputs: [
			{
				name: 'percentage',
				labelKey: 'percentage',
				type: 'number',
				required: true,
				placeholder: '25',
			},
			{
				name: 'part',
				labelKey: 'part_value',
				type: 'number',
				required: true,
				placeholder: '25',
			},
		],
	},
	{
		id: 'change_by_percent',
		titleKey: 'increase_or_decrease',
		descriptionKey: 'increase_or_decrease_desc',
		inputs: [
			{
				name: 'number',
				labelKey: 'number',
				type: 'number',
				required: true,
				placeholder: '100',
			},
			{
				name: 'percentage',
				labelKey: 'percentage',
				type: 'number',
				required: true,
				placeholder: '10',
			},
			{
				name: 'operation',
				labelKey: 'operation',
				type: 'select',
				required: true,
				options: [
					{ value: 'increase', labelKey: 'increase' },
					{ value: 'decrease', labelKey: 'decrease' },
				],
			},
		],
	},
];
