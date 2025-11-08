/**
 * Laminate Calculator Library
 * 
 * Provides functionality for calculating laminate flooring materials needed for a room.
 * 
 * Features:
 * - Room dimensions input
 * - Laminate board dimensions input
 * - Reserve percentage calculation
 * - Package quantity calculation
 * - Area calculation
 * - Number of boards calculation
 * - Number of packages calculation
 * 
 * Calculation method:
 * - Calculates room area
 * - Calculates laminate board area
 * - Calculates total boards needed with reserve
 * - Calculates number of packages needed
 */

/**
 * Input interface for laminate calculation
 * Contains room dimensions, laminate dimensions, and package information
 */
export interface LaminateInput {
	// Room dimensions
	roomLength: number; // in meters
	roomWidth: number; // in meters

	// Laminate dimensions (in cm)
	laminateLength: number;
	laminateWidth: number;

	// Package info
	packageQuantity: number; // pieces per package

	// Reserve
	reservePercentage: number; // default 10%
}

export interface LaminateResult {
	// Room calculations
	roomArea: number; // in m²

	// Laminate calculations
	laminateArea: number; // in m²
	laminateSize: string; // formatted size

	// Quantity calculations
	totalPieces: number; // pieces needed
	packagesNeeded: number; // packages needed
	reservePercentage: number;

	// Additional info
	unit: string;
}

/**
 * Calculate laminate quantity needed for room
 * 
 * Calculates the number of laminate boards and packages needed based on:
 * - Room area (length × width)
 * - Laminate board area (length × width)
 * - Reserve percentage for waste
 * - Package quantity (boards per package)
 * 
 * Algorithm:
 * 1. Calculate room area in m²
 * 2. Calculate laminate board area in m² (convert cm² to m²)
 * 3. Calculate total boards needed = (room area / board area) × (1 + reserve%)
 * 4. Calculate packages needed = ceil(total boards / package quantity)
 * 
 * @param input - Laminate input parameters
 * @returns Laminate result with area calculations and quantities
 */
export function calculateLaminate(input: LaminateInput): LaminateResult {
	const {
		roomLength,
		roomWidth,
		laminateLength,
		laminateWidth,
		packageQuantity,
		reservePercentage,
	} = input;

	// Room area
	const roomArea = roomLength * roomWidth;

	// Laminate area (convert cm² to m²)
	const laminateArea = (laminateLength * laminateWidth) / 10000;

	// Total pieces needed (with reserve)
	const totalPieces = Math.ceil(
		(roomArea / laminateArea) * (1 + reservePercentage / 100)
	);

	// Packages needed
	const packagesNeeded = Math.ceil(totalPieces / packageQuantity);

	return {
		roomArea: Math.round(roomArea * 100) / 100,
		laminateArea: Math.round(laminateArea * 10000) / 10000,
		laminateSize: `${laminateLength} × ${laminateWidth} см`,
		totalPieces,
		packagesNeeded,
		reservePercentage,
		unit: 'шт',
	};
}

/**
 * Validate input data
 */
export function validateLaminateInput(input: Partial<LaminateInput>): string[] {
	const errors: string[] = [];

	// Room dimensions
	if (!input.roomLength || input.roomLength <= 0) {
		errors.push('Длина комнаты должна быть больше 0');
	}
	if (!input.roomWidth || input.roomWidth <= 0) {
		errors.push('Ширина комнаты должна быть больше 0');
	}

	// Laminate dimensions
	if (!input.laminateLength || input.laminateLength <= 0) {
		errors.push('Длина ламината должна быть больше 0');
	}
	if (!input.laminateWidth || input.laminateWidth <= 0) {
		errors.push('Ширина ламината должна быть больше 0');
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

	return errors;
}
