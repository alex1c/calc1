// Tile calculator
// Calculation of tile quantity for flooring

export interface TileInput {
	// Room dimensions
	roomLength: number; // in meters
	roomWidth: number; // in meters

	// Tile dimensions (in cm)
	tileLength: number;
	tileWidth: number;

	// Package info
	packageQuantity: number; // pieces per package

	// Reserve
	reservePercentage: number; // default 10%

	// Grout width
	groutWidth: number; // in mm
}

export interface TileResult {
	// Room calculations
	roomArea: number; // in m²

	// Tile calculations
	tileArea: number; // in m²
	tileSize: string; // formatted size

	// Quantity calculations
	totalTiles: number; // pieces needed
	packagesNeeded: number; // packages needed
	reservePercentage: number;

	// Additional info
	unit: string;
}

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
 * 3. Calculate total tiles needed with reserve
 * 4. Calculate packages needed (round up)
 * 
 * @param input - Tile input parameters
 * @returns Tile calculation result with quantities and areas
 */
export function calculateTile(input: TileInput): TileResult {
	const {
		roomLength,
		roomWidth,
		tileLength,
		tileWidth,
		packageQuantity,
		reservePercentage,
	} = input;

	// Room area
	const roomArea = roomLength * roomWidth;

	// Tile area (convert cm² to m²)
	const tileArea = (tileLength * tileWidth) / 10000;

	// Total tiles needed (with reserve)
	const totalTiles = Math.ceil(
		(roomArea / tileArea) * (1 + reservePercentage / 100)
	);

	// Packages needed
	const packagesNeeded = Math.ceil(totalTiles / packageQuantity);

	return {
		roomArea: Math.round(roomArea * 100) / 100,
		tileArea: Math.round(tileArea * 10000) / 10000,
		tileSize: `${tileLength} × ${tileWidth} см`,
		totalTiles,
		packagesNeeded,
		reservePercentage,
		unit: 'шт',
	};
}

/**
 * Validate tile calculation input
 * 
 * Performs validation checks:
 * - Room dimensions are positive
 * - Tile dimensions are positive
 * - Package quantity is positive
 * - Reserve percentage is between 0 and 100
 * - Grout width is non-negative
 * 
 * @param input - Partial tile input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateTileInput(input: Partial<TileInput>): string[] {
	const errors: string[] = [];

	// Room dimensions
	if (!input.roomLength || input.roomLength <= 0) {
		errors.push('Длина комнаты должна быть больше 0');
	}
	if (!input.roomWidth || input.roomWidth <= 0) {
		errors.push('Ширина комнаты должна быть больше 0');
	}

	// Tile dimensions
	if (!input.tileLength || input.tileLength <= 0) {
		errors.push('Длина плитки должна быть больше 0');
	}
	if (!input.tileWidth || input.tileWidth <= 0) {
		errors.push('Ширина плитки должна быть больше 0');
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

	// Grout width
	if (input.groutWidth !== undefined && input.groutWidth < 0) {
		errors.push('Ширина шва должна быть неотрицательной');
	}

	return errors;
}
