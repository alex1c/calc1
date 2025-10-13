/**
 * Basic Math Calculator Utility
 *
 * This module provides functions for performing basic arithmetic operations
 * including addition, subtraction, multiplication, and division with proper
 * error handling and result formatting.
 */

export type MathOperation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface BasicMathResult {
	result: number | null;
	error: string | null;
	formattedResult: string;
}

export interface BasicMathInput {
	number1: number;
	number2: number;
	operation: MathOperation;
}

/**
 * Validates input numbers for basic math operations
 * @param number1 - First number
 * @param number2 - Second number
 * @returns Object with validation result and error message
 */
export function validateInputs(
	number1: number,
	number2: number
): { isValid: boolean; error: string | null } {
	// Check if inputs are valid numbers
	if (isNaN(number1) || isNaN(number2)) {
		return { isValid: false, error: 'Please enter valid numbers' };
	}

	// Check if inputs are finite numbers
	if (!isFinite(number1) || !isFinite(number2)) {
		return { isValid: false, error: 'Numbers must be finite' };
	}

	return { isValid: true, error: null };
}

/**
 * Performs basic arithmetic operations with error handling
 * @param input - Object containing numbers and operation
 * @returns Object with result, error, and formatted result
 */
export function calculateBasicMath(input: BasicMathInput): BasicMathResult {
	const { number1, number2, operation } = input;

	// Validate inputs
	const validation = validateInputs(number1, number2);
	if (!validation.isValid) {
		return {
			result: null,
			error: validation.error,
			formattedResult: '',
		};
	}

	let result: number;
	let error: string | null = null;

	try {
		switch (operation) {
			case 'add':
				result = number1 + number2;
				break;
			case 'subtract':
				result = number1 - number2;
				break;
			case 'multiply':
				result = number1 * number2;
				break;
			case 'divide':
				// Check for division by zero
				if (number2 === 0) {
					return {
						result: null,
						error: 'Division by zero is not allowed',
						formattedResult: '',
					};
				}
				result = number1 / number2;
				break;
			default:
				return {
					result: null,
					error: 'Invalid operation',
					formattedResult: '',
				};
		}

		// Check if result is finite
		if (!isFinite(result)) {
			return {
				result: null,
				error: 'Result is not a finite number',
				formattedResult: '',
			};
		}

		// Format result with proper rounding
		const formattedResult = formatResult(result);

		return {
			result,
			error: null,
			formattedResult,
		};
	} catch (err) {
		return {
			result: null,
			error: 'Calculation error occurred',
			formattedResult: '',
		};
	}
}

/**
 * Formats the calculation result with proper rounding
 * @param result - The calculation result
 * @returns Formatted result string
 */
export function formatResult(result: number): string {
	// Round to 4 decimal places to avoid floating point precision issues
	const rounded = Math.round(result * 10000) / 10000;

	// Remove trailing zeros and unnecessary decimal point
	return rounded.toString().replace(/\.?0+$/, '');
}

/**
 * Gets the operation symbol for display
 * @param operation - The math operation
 * @returns The symbol for the operation
 */
export function getOperationSymbol(operation: MathOperation): string {
	switch (operation) {
		case 'add':
			return '+';
		case 'subtract':
			return '−';
		case 'multiply':
			return '×';
		case 'divide':
			return '÷';
		default:
			return '?';
	}
}

/**
 * Gets the operation name for display
 * @param operation - The math operation
 * @returns The name of the operation
 */
export function getOperationName(operation: MathOperation): string {
	switch (operation) {
		case 'add':
			return 'Addition';
		case 'subtract':
			return 'Subtraction';
		case 'multiply':
			return 'Multiplication';
		case 'divide':
			return 'Division';
		default:
			return 'Unknown';
	}
}

/**
 * Creates a calculation expression string for display
 * @param number1 - First number
 * @param number2 - Second number
 * @param operation - The math operation
 * @returns Formatted expression string
 */
export function createExpressionString(
	number1: number,
	number2: number,
	operation: MathOperation
): string {
	const symbol = getOperationSymbol(operation);
	return `${number1} ${symbol} ${number2}`;
}
