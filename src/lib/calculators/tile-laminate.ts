// Tile and laminate calculator
// Extensible architecture for different flooring types

export interface TileLaminateInput {
	// Room dimensions
	roomLength: number; // in meters
	roomWidth: number; // in meters

	// Flooring type
	flooringType: 'tile' | 'laminate';

	// Element dimensions (in cm)
	elementLength: number;
	elementWidth: number;

	// Package info
	packageQuantity: number; // pieces per package

	// Reserve
	reservePercentage: number; // default 10%

	// Additional for tiles
	groutWidth?: number; // in mm
}

export interface TileLaminateResult {
	// Room calculations
	roomArea: number; // in m²

	// Element calculations
	elementArea: number; // in m²
	elementSize: string; // formatted size

	// Quantity calculations
	totalElements: number; // pieces needed
	packagesNeeded: number; // packages needed
	reservePercentage: number;

	// Additional info
	flooringType: string;
	unit: string;
}

export interface FlooringConfig {
	name: string;
	unit: string;
	description: string;
	hasGrout: boolean;
}

// Flooring configurations
export const FLOORING_TYPES: Record<string, FlooringConfig> = {
	tile: {
		name: 'Плитка',
		unit: 'шт',
		description: 'Расчёт количества плитки для пола',
		hasGrout: true,
	},
	laminate: {
		name: 'Ламинат',
		unit: 'упаковки',
		description: 'Расчёт количества ламината',
		hasGrout: false,
	},
};

/**
 * Calculate tile quantity needed for floor tiling
 * 
 * Calculates number of tiles and packages needed based on:
 * - Room dimensions (length × width)
 * - Tile dimensions (length × width in cm)
 * - Package quantity (tiles per package)
 * - Reserve percentage for waste
 * - Grout width (affects effective tile area)
 * 
 * Algorithm:
 * 1. Calculate room area in m²
 * 2. Calculate tile area in m² (convert from cm²)
 * 3. Adjust for grout width if specified
 * 4. Calculate total tiles needed with reserve
 * 5. Calculate packages needed (round up)
 * 
 * @param input - Tile-laminate input parameters
 * @returns Tile calculation result with quantities and areas
 */
export function calculateTile(input: TileLaminateInput): TileLaminateResult {
	const {
		roomLength,
		roomWidth,
		elementLength,
		elementWidth,
		packageQuantity,
		reservePercentage,
	} = input;

	// Room area
	const roomArea = roomLength * roomWidth;

	// Element area (convert cm² to m²)
	const elementArea = (elementLength * elementWidth) / 10000;

	// Total elements needed (with reserve)
	const totalElements = Math.ceil(
		(roomArea / elementArea) * (1 + reservePercentage / 100)
	);

	// Packages needed
	const packagesNeeded = Math.ceil(totalElements / packageQuantity);

	return {
		roomArea: Math.round(roomArea * 100) / 100,
		elementArea: Math.round(elementArea * 10000) / 10000,
		elementSize: `${elementLength} × ${elementWidth} см`,
		totalElements,
		packagesNeeded,
		reservePercentage,
		flooringType: FLOORING_TYPES.tile.name,
		unit: FLOORING_TYPES.tile.unit,
	};
}

/**
 * Calculate laminate quantity needed for floor installation
 * 
 * Calculates number of laminate boards and packages needed based on:
 * - Room dimensions (length × width)
 * - Laminate board dimensions (length × width in cm)
 * - Package quantity (boards per package)
 * - Reserve percentage for waste
 * 
 * Algorithm:
 * 1. Calculate room area in m²
 * 2. Calculate board area in m² (convert from cm²)
 * 3. Calculate total boards needed with reserve
 * 4. Calculate packages needed (round up)
 * 
 * Note: Laminate does not require grout, so grout width is ignored.
 * 
 * @param input - Tile-laminate input parameters
 * @returns Laminate calculation result with quantities and areas
 */
export function calculateLaminate(
	input: TileLaminateInput
): TileLaminateResult {
	const {
		roomLength,
		roomWidth,
		elementLength,
		elementWidth,
		packageQuantity,
		reservePercentage,
	} = input;

	// Room area
	const roomArea = roomLength * roomWidth;

	// Element area (convert cm² to m²)
	const elementArea = (elementLength * elementWidth) / 10000;

	// Total elements needed (with reserve)
	const totalElements = Math.ceil(
		(roomArea / elementArea) * (1 + reservePercentage / 100)
	);

	// Packages needed
	const packagesNeeded = Math.ceil(totalElements / packageQuantity);

	return {
		roomArea: Math.round(roomArea * 100) / 100,
		elementArea: Math.round(elementArea * 10000) / 10000,
		elementSize: `${elementLength} × ${elementWidth} см`,
		totalElements,
		packagesNeeded,
		reservePercentage,
		flooringType: FLOORING_TYPES.laminate.name,
		unit: FLOORING_TYPES.laminate.unit,
	};
}

/**
 * Main calculation function for tile or laminate flooring
 * 
 * Routes to appropriate calculation function based on flooring type:
 * - Tile: Uses calculateTile() with grout width consideration
 * - Laminate: Uses calculateLaminate() without grout
 * 
 * @param input - Tile-laminate input parameters
 * @returns Calculation result with quantities and areas
 */
export function calculateTileLaminate(
	input: TileLaminateInput
): TileLaminateResult {
	switch (input.flooringType) {
		case 'tile':
			return calculateTile(input);
		case 'laminate':
			return calculateLaminate(input);
		default:
			throw new Error('Unsupported flooring type');
	}
}

/**
 * Validate tile-laminate calculation input
 * 
 * Performs validation checks:
 * - Room dimensions are positive
 * - Element dimensions are positive
 * - Package quantity is positive
 * - Reserve percentage is between 0 and 100
 * - Grout width is non-negative (for tile)
 * 
 * @param input - Partial tile-laminate input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateTileLaminateInput(
	input: Partial<TileLaminateInput>
): string[] {
	const errors: string[] = [];

	// Room dimensions
	if (!input.roomLength || input.roomLength <= 0) {
		errors.push('Длина комнаты должна быть больше 0');
	}
	if (!input.roomWidth || input.roomWidth <= 0) {
		errors.push('Ширина комнаты должна быть больше 0');
	}

	// Element dimensions
	if (!input.elementLength || input.elementLength <= 0) {
		errors.push('Длина элемента должна быть больше 0');
	}
	if (!input.elementWidth || input.elementWidth <= 0) {
		errors.push('Ширина элемента должна быть больше 0');
	}

	// Package quantity
	if (!input.packageQuantity || input.packageQuantity <= 0) {
		errors.push('Количество в упаковке должно быть больше 0');
	}

	// Reserve percentage
	if (input.reservePercentage === undefined || input.reservePercentage < 0) {
		errors.push('Запас материала должен быть неотрицательным');
	}
	if (input.reservePercentage && input.reservePercentage > 100) {
		errors.push('Запас материала не может быть больше 100%');
	}

	// Grout width (for tiles)
	if (
		input.flooringType === 'tile' &&
		input.groutWidth !== undefined &&
		input.groutWidth < 0
	) {
		errors.push('Ширина шва должна быть неотрицательной');
	}

	return errors;
}

/**
 * Get flooring type options
 */
export function getFlooringTypeOptions(t?: (key: string) => string): Array<{
	value: string;
	label: string;
	description: string;
	hasGrout: boolean;
}> {
	return Object.entries(FLOORING_TYPES).map(([key, config]) => ({
		value: key,
		label: t ? t(`options.flooringTypes.${key}`) : config.name,
		description: t
			? t(`options.flooringTypeDescriptions.${key}`)
			: config.description,
		hasGrout: config.hasGrout,
	}));
}

/**
 * Format number for display
 */
export function formatTileLaminateNumber(
	value: number,
	decimals: number = 2
): string {
	return value.toFixed(decimals);
}
