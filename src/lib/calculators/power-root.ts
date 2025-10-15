/**
 * Power and Root Calculator Logic
 * Handles calculations for powers and roots of any degree
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
 * Validate input parameters
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
 */
export function getRequiredParameters(mode: CalculationMode): string[] {
	return ['base', 'exponent'];
}

/**
 * Format result for display
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
 */
export function isPerfectPower(base: number, exponent: number): boolean {
	if (exponent === 0) return false;

	const result = Math.pow(base, 1 / exponent);
	return Math.abs(result - Math.round(result)) < 1e-10;
}

/**
 * Get the simplified form of a root
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
