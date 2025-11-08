/**
 * Area Calculator Library
 * 
 * Provides functionality for calculating the area of various geometric shapes.
 * Supports three basic shapes: circle, square, and triangle.
 * 
 * Each shape requires different input parameters:
 * - Circle: radius
 * - Square: side length
 * - Triangle: base and height
 * 
 * All calculations use standard geometric formulas and return results
 * rounded to 2 decimal places for readability.
 */

/**
 * Supported geometric figure types
 * Each type corresponds to a specific area calculation formula
 */
export type FigureType = 'circle' | 'square' | 'triangle';

/**
 * Input interface for area calculation
 * Contains figure type and shape-specific parameters
 * Only parameters relevant to the selected figure type are required
 */
export interface AreaInput {
	figureType: FigureType; // Type of geometric figure
	radius?: number; // For circle: radius in any unit
	side?: number; // For square: side length in any unit
	base?: number; // For triangle: base length in any unit
	height?: number; // For triangle: height in any unit
}

/**
 * Result interface for area calculation
 * Contains calculated area, formula used, and input parameters
 */
export interface AreaResult {
	area: number; // Calculated area (rounded to 2 decimal places)
	formula: string; // Mathematical formula used (e.g., "S = π × r²")
	figureType: FigureType; // Type of figure calculated
	parameters: {
		// Input parameters used in calculation
		radius?: number;
		side?: number;
		base?: number;
		height?: number;
	};
}

/**
 * Calculate area based on figure type and parameters
 * 
 * Implements area formulas for different geometric shapes:
 * - Circle: S = π × r² (where r is radius)
 * - Square: S = a² (where a is side length)
 * - Triangle: S = ½ × a × h (where a is base, h is height)
 * 
 * All results are rounded to 2 decimal places for display.
 * Input validation ensures all parameters are positive numbers.
 * 
 * @param input - Input parameters containing figure type and dimensions
 * @returns Area calculation result with formula and parameters
 * @throws Error if parameters are invalid or figure type is unsupported
 */
export function calculateArea(input: AreaInput): AreaResult {
	const { figureType } = input;

	switch (figureType) {
		case 'circle': {
			// Circle area calculation: S = π × r²
			const radius = input.radius || 0;
			if (radius <= 0) {
				throw new Error('Radius must be positive');
			}
			// Calculate area using π constant
			const area = Math.PI * radius * radius;
			return {
				area: Math.round(area * 100) / 100, // Round to 2 decimal places
				formula: 'S = π × r²', // Standard circle area formula
				figureType: 'circle',
				parameters: { radius },
			};
		}

		case 'square': {
			// Square area calculation: S = a²
			const side = input.side || 0;
			if (side <= 0) {
				throw new Error('Side must be positive');
			}
			// Square area is side squared
			const area = side * side;
			return {
				area: Math.round(area * 100) / 100,
				formula: 'S = a²', // Standard square area formula
				figureType: 'square',
				parameters: { side },
			};
		}

		case 'triangle': {
			// Triangle area calculation: S = ½ × base × height
			const base = input.base || 0;
			const height = input.height || 0;
			if (base <= 0 || height <= 0) {
				throw new Error('Base and height must be positive');
			}
			// Triangle area is half of base times height
			const area = (base * height) / 2;
			return {
				area: Math.round(area * 100) / 100,
				formula: 'S = ½ × a × h', // Standard triangle area formula
				figureType: 'triangle',
				parameters: { base, height },
			};
		}

		default:
			throw new Error('Invalid figure type');
	}
}

/**
 * Validate input parameters for area calculation
 * 
 * Performs comprehensive validation based on figure type:
 * - Checks that figure type is specified
 * - Validates that required parameters are present
 * - Ensures all numeric values are positive
 * - Returns detailed error messages for each validation failure
 * 
 * Validation rules:
 * - Circle: requires radius > 0
 * - Square: requires side > 0
 * - Triangle: requires base > 0 and height > 0
 * 
 * @param input - Input parameters to validate
 * @returns Validation result with boolean status and array of error messages
 */
export function validateAreaInput(input: AreaInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	// Check that figure type is specified
	if (!input.figureType) {
		errors.push('Figure type is required');
		return { isValid: false, errors };
	}

	// Validate parameters based on figure type
	switch (input.figureType) {
		case 'circle':
			// Circle requires positive radius
			if (!input.radius || input.radius <= 0) {
				errors.push('Radius must be positive');
			}
			break;

		case 'square':
			// Square requires positive side length
			if (!input.side || input.side <= 0) {
				errors.push('Side must be positive');
			}
			break;

		case 'triangle':
			// Triangle requires both positive base and height
			if (!input.base || input.base <= 0) {
				errors.push('Base must be positive');
			}
			if (!input.height || input.height <= 0) {
				errors.push('Height must be positive');
			}
			break;
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Get required parameters for a specific figure type
 * 
 * Returns an array of parameter names that are required for calculating
 * the area of the specified figure type. Useful for dynamic form generation
 * and validation logic.
 * 
 * Parameter requirements:
 * - Circle: ['radius']
 * - Square: ['side']
 * - Triangle: ['base', 'height']
 * 
 * @param figureType - Type of geometric figure
 * @returns Array of required parameter names (empty if invalid type)
 */
export function getRequiredParameters(figureType: FigureType): string[] {
	switch (figureType) {
		case 'circle':
			return ['radius'];
		case 'square':
			return ['side'];
		case 'triangle':
			return ['base', 'height'];
		default:
			return [];
	}
}

/**
 * Format area result for display
 * 
 * Creates a human-readable string representation of the area calculation,
 * including the calculated value and the formula with actual parameter values.
 * 
 * Format examples:
 * - Circle: "Area = 78.54 (π × 5²)"
 * - Square: "Area = 25 (5²)"
 * - Triangle: "Area = 10 (½ × 4 × 5)"
 * 
 * @param result - Area calculation result containing area, formula, and parameters
 * @returns Formatted string showing area value and calculation breakdown
 */
export function formatAreaResult(result: AreaResult): string {
	const { area, figureType, parameters } = result;

	switch (figureType) {
		case 'circle':
			return `Area = ${area} (π × ${parameters.radius}²)`;
		case 'square':
			return `Area = ${area} (${parameters.side}²)`;
		case 'triangle':
			return `Area = ${area} (½ × ${parameters.base} × ${parameters.height})`;
		default:
			return `Area = ${area}`;
	}
}
