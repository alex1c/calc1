/**
 * Volume Calculator Logic
 * Handles calculations for sphere, cube, and cylinder volumes
 */

export type ShapeType = 'sphere' | 'cube' | 'cylinder';

export interface VolumeInput {
	shapeType: ShapeType;
	radius?: number; // for sphere and cylinder
	side?: number; // for cube
	height?: number; // for cylinder
}

export interface VolumeResult {
	volume: number;
	formula: string;
	shapeType: ShapeType;
	parameters: {
		radius?: number;
		side?: number;
		height?: number;
	};
}

/**
 * Calculate volume based on shape type and parameters
 */
export function calculateVolume(input: VolumeInput): VolumeResult {
	const { shapeType } = input;

	switch (shapeType) {
		case 'sphere': {
			const radius = input.radius || 0;
			if (radius <= 0) {
				throw new Error('Radius must be positive');
			}
			const volume = (4 / 3) * Math.PI * radius * radius * radius;
			return {
				volume: Math.round(volume * 100) / 100,
				formula: 'V = (4/3) × π × r³',
				shapeType: 'sphere',
				parameters: { radius },
			};
		}

		case 'cube': {
			const side = input.side || 0;
			if (side <= 0) {
				throw new Error('Side must be positive');
			}
			const volume = side * side * side;
			return {
				volume: Math.round(volume * 100) / 100,
				formula: 'V = a³',
				shapeType: 'cube',
				parameters: { side },
			};
		}

		case 'cylinder': {
			const radius = input.radius || 0;
			const height = input.height || 0;
			if (radius <= 0 || height <= 0) {
				throw new Error('Radius and height must be positive');
			}
			const volume = Math.PI * radius * radius * height;
			return {
				volume: Math.round(volume * 100) / 100,
				formula: 'V = π × r² × h',
				shapeType: 'cylinder',
				parameters: { radius, height },
			};
		}

		default:
			throw new Error('Invalid shape type');
	}
}

/**
 * Validate input parameters
 */
export function validateVolumeInput(input: VolumeInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.shapeType) {
		errors.push('Shape type is required');
		return { isValid: false, errors };
	}

	switch (input.shapeType) {
		case 'sphere':
			if (!input.radius || input.radius <= 0) {
				errors.push('Radius must be positive');
			}
			break;

		case 'cube':
			if (!input.side || input.side <= 0) {
				errors.push('Side must be positive');
			}
			break;

		case 'cylinder':
			if (!input.radius || input.radius <= 0) {
				errors.push('Radius must be positive');
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
 * Get required parameters for a shape type
 */
export function getRequiredParameters(shapeType: ShapeType): string[] {
	switch (shapeType) {
		case 'sphere':
			return ['radius'];
		case 'cube':
			return ['side'];
		case 'cylinder':
			return ['radius', 'height'];
		default:
			return [];
	}
}

/**
 * Format volume result for display
 */
export function formatVolumeResult(result: VolumeResult): string {
	const { volume, shapeType, parameters } = result;

	switch (shapeType) {
		case 'sphere':
			return `V = ${volume} (r = ${parameters.radius})`;
		case 'cube':
			return `V = ${volume} (a = ${parameters.side})`;
		case 'cylinder':
			return `V = ${volume} (r = ${parameters.radius}, h = ${parameters.height})`;
		default:
			return `V = ${volume}`;
	}
}
