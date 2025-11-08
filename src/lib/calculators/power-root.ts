/**
 * Power and Root Calculator Library
 *
 * Provides functionality for calculating powers and roots of any degree.
 *
 * Features:
 * - Power calculation (base^exponent)
 * - Root calculation (nth root of base)
 * - Input validation
 * - Formula generation for display
 * - Result formatting with appropriate precision
 * - Perfect power detection
 * - Root simplification
 *
 * Calculation modes:
 * - Power: Calculates base raised to exponent (base^exponent)
 * - Root: Calculates nth root of base (base^(1/exponent))
 *
 * Validation:
 * - Power: Cannot raise 0 to negative power
 * - Root: Cannot take even root of negative number, cannot take 0th root
 *
 * Result precision: Rounded to 6 decimal places
 */

export type CalculationMode = 'power' | 'root';

export interface PowerRootInput {
	mode: CalculationMode;
	base: number; // For power: base, for root: number under root
	exponent: number; // For power: exponent, for root: root degree
}

export interface PowerRootResult {
	result: number;
	formula: string;
	mode: CalculationMode;
	base: number;
	exponent: number;
	displayFormula: string; // Human-readable formula
}

/**
 * Calculate power or root based on mode and parameters
 *
 * Calculates either:
 * - Power: base^exponent using Math.pow(base, exponent)
 * - Root: nth root of base using Math.pow(base, 1/exponent)
 *
 * Algorithm:
 * 1. Validates input based on mode
 * 2. Calculates result using appropriate formula
 * 3. Generates formula string for display
 * 4. Rounds result to 6 decimal places
 *
 * @param input - Power-root input with mode, base, and exponent
 * @returns Power-root result with value, formula, and display formula
 * @throws Error if validation fails (0 to negative power, even root of negative, 0th root)
 */
export function calculatePowerRoot(input: PowerRootInput): PowerRootResult {
	const { mode, base, exponent } = input;

	if (mode === 'power') {
		// Power calculation: base^exponent
		if (base === 0 && exponent < 0) {
			throw new Error('Cannot raise 0 to a negative power');
		}

		const result = Math.pow(base, exponent);
		const formula = `${base}^${exponent}`;
		const displayFormula = `${base} в степени ${exponent}`;

		return {
			result: Math.round(result * 1000000) / 1000000, // Round to 6 decimal places
			formula,
			mode: 'power',
			base,
			exponent,
			displayFormula,
		};
	} else {
		// Root calculation: nth root of base
		if (base < 0 && exponent % 2 === 0) {
			throw new Error('Cannot take even root of negative number');
		}

		if (exponent === 0) {
			throw new Error('Cannot take 0th root');
		}

		// For root: base^(1/exponent)
		const result = Math.pow(base, 1 / exponent);
		const formula = `${exponent}√${base}`;
		const displayFormula = `Корень ${exponent}-й степени из ${base}`;

		return {
			result: Math.round(result * 1000000) / 1000000, // Round to 6 decimal places
			formula,
			mode: 'root',
			base,
			exponent,
			displayFormula,
		};
	}
}

/**
 * Validate power-root input parameters
 *
 * Performs validation checks:
 * - Mode is specified
 * - Base and exponent are valid numbers
 * - Power mode: Cannot raise 0 to negative power
 * - Root mode: Cannot take even root of negative number, cannot take 0th root
 *
 * @param input - Power-root input to validate
 * @returns Validation result with boolean status and array of error messages
 */
export function validatePowerRootInput(input: PowerRootInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.mode) {
		errors.push('Calculation mode is required');
		return { isValid: false, errors };
	}

	if (typeof input.base !== 'number' || isNaN(input.base)) {
		errors.push('Base must be a valid number');
	}

	if (typeof input.exponent !== 'number' || isNaN(input.exponent)) {
		errors.push('Exponent must be a valid number');
	}

	// Additional validation based on mode
	if (input.mode === 'power') {
		if (input.base === 0 && input.exponent < 0) {
			errors.push('Cannot raise 0 to a negative power');
		}
	} else if (input.mode === 'root') {
		if (input.base < 0 && input.exponent % 2 === 0) {
			errors.push('Cannot take even root of negative number');
		}
		if (input.exponent === 0) {
			errors.push('Cannot take 0th root');
		}
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Get required parameters for a calculation mode
 *
 * Returns the list of required parameter names for the specified mode.
 * Both power and root modes require 'base' and 'exponent'.
 *
 * @param mode - Calculation mode ('power' or 'root')
 * @returns Array of required parameter names
 */
export function getRequiredParameters(mode: CalculationMode): string[] {
	return ['base', 'exponent'];
}

/**
 * Format power-root result for display
 *
 * Formats the result as a mathematical equation string:
 * - Power: "base^exponent = value"
 * - Root: "exponent√base = value"
 *
 * @param result - Power-root result to format
 * @returns Formatted string representation
 */
export function formatPowerRootResult(result: PowerRootResult): string {
	const { result: value, mode, base, exponent } = result;

	if (mode === 'power') {
		return `${base}^${exponent} = ${value}`;
	} else {
		return `${exponent}√${base} = ${value}`;
	}
}

/**
 * Get common examples for the calculator
 *
 * Returns predefined examples for the specified mode:
 * - Power: Common power calculations (2^3, 5^2, etc.)
 * - Root: Common root calculations (cube root of 8, square root of 16, etc.)
 *
 * @param mode - Calculation mode ('power' or 'root')
 * @returns Array of example objects with base, exponent, and description
 */
export function getCommonExamples(mode: CalculationMode): Array<{
	base: number;
	exponent: number;
	description: string;
}> {
	if (mode === 'power') {
		return [
			{ base: 2, exponent: 3, description: '2 в кубе' },
			{ base: 5, exponent: 2, description: '5 в квадрате' },
			{ base: 10, exponent: 3, description: '10 в кубе' },
			{ base: 2, exponent: 10, description: '2 в 10-й степени' },
		];
	} else {
		return [
			{ base: 8, exponent: 3, description: 'Кубический корень из 8' },
			{ base: 16, exponent: 2, description: 'Квадратный корень из 16' },
			{ base: 27, exponent: 3, description: 'Кубический корень из 27' },
			{ base: 100, exponent: 2, description: 'Квадратный корень из 100' },
		];
	}
}

/**
 * Check if a number is a perfect power
 *
 * Determines if base is a perfect nth power (where n = exponent).
 * A perfect power means the nth root of base is an integer.
 *
 * Example: 8 is a perfect cube (2^3), 16 is a perfect square (4^2)
 *
 * @param base - Number to check
 * @param exponent - Root degree
 * @returns True if base is a perfect power, false otherwise
 */
export function isPerfectPower(base: number, exponent: number): boolean {
	if (exponent === 0) return false;

	const result = Math.pow(base, 1 / exponent);
	return Math.abs(result - Math.round(result)) < 1e-10;
}

/**
 * Get the simplified form of a root
 *
 * Attempts to simplify a root by extracting perfect powers.
 * Finds the largest perfect power that divides the base and extracts it.
 *
 * Example: √72 = 6√2 (extracts 36 = 6^2)
 *
 * @param base - Number under the root (radicand)
 * @param exponent - Root degree
 * @returns Simplified root object with coefficient, radicand, and exponent, or null if cannot simplify
 */
export function simplifyRoot(
	base: number,
	exponent: number
): {
	coefficient: number;
	radicand: number;
	exponent: number;
} | null {
	if (exponent === 0) return null;

	// Find the largest perfect power that divides the base
	let coefficient = 1;
	let radicand = base;

	for (let i = 2; i <= Math.sqrt(Math.abs(base)); i++) {
		const power = Math.pow(i, exponent);
		if (base % power === 0) {
			coefficient *= i;
			radicand = base / power;
		}
	}

	return {
		coefficient,
		radicand,
		exponent,
	};
}
