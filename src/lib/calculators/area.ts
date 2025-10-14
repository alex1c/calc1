/**
 * Area Calculator Logic
 * Calculates area for different geometric shapes: circle, square, triangle
 */

export type FigureType = 'circle' | 'square' | 'triangle';

export interface AreaInput {
	figureType: FigureType;
	radius?: number; // for circle
	side?: number; // for square
	base?: number; // for triangle
	height?: number; // for triangle
}

export interface AreaResult {
	area: number;
	formula: string;
	figureType: FigureType;
	parameters: {
		radius?: number;
		side?: number;
		base?: number;
		height?: number;
	};
}

/**
 * Calculate area based on figure type and parameters
 * @param input - Input parameters for area calculation
 * @returns Area calculation result
 */
export function calculateArea(input: AreaInput): AreaResult {
	const { figureType } = input;

	switch (figureType) {
		case 'circle': {
			const radius = input.radius || 0;
			if (radius <= 0) {
				throw new Error('Radius must be positive');
			}
			const area = Math.PI * radius * radius;
			return {
				area: Math.round(area * 100) / 100, // Round to 2 decimal places
				formula: 'S = π × r²',
				figureType: 'circle',
				parameters: { radius },
			};
		}

		case 'square': {
			const side = input.side || 0;
			if (side <= 0) {
				throw new Error('Side must be positive');
			}
			const area = side * side;
			return {
				area: Math.round(area * 100) / 100,
				formula: 'S = a²',
				figureType: 'square',
				parameters: { side },
			};
		}

		case 'triangle': {
			const base = input.base || 0;
			const height = input.height || 0;
			if (base <= 0 || height <= 0) {
				throw new Error('Base and height must be positive');
			}
			const area = (base * height) / 2;
			return {
				area: Math.round(area * 100) / 100,
				formula: 'S = ½ × a × h',
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
 * @param input - Input parameters to validate
 * @returns Validation result with errors if any
 */
export function validateAreaInput(input: AreaInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.figureType) {
		errors.push('Figure type is required');
		return { isValid: false, errors };
	}

	switch (input.figureType) {
		case 'circle':
			if (!input.radius || input.radius <= 0) {
				errors.push('Radius must be positive');
			}
			break;

		case 'square':
			if (!input.side || input.side <= 0) {
				errors.push('Side must be positive');
			}
			break;

		case 'triangle':
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
 * @param figureType - Type of figure
 * @returns Array of required parameter names
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
 * @param result - Area calculation result
 * @returns Formatted string for display
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
