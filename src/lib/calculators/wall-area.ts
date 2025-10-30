// Wall area calculator for finishing
// Calculates wall area for different room configurations

export interface WallAreaInput {
	// Room dimensions
	roomLength: number; // meters
	roomWidth: number; // meters
	wallHeight: number; // meters

	// Openings (windows and doors)
	windowsArea: number; // m²
	doorsArea: number; // m²

	// Additional walls (optional - for rooms with fewer walls)
	wallsCount?: number; // default 4 for rectangular room

	// Reserve percentage
	reservePercentage: number; // percentage reserve
}

export interface WallAreaResult {
	// Input dimensions
	roomLength: number;
	roomWidth: number;
	wallHeight: number;
	windowsArea: number;
	doorsArea: number;
	totalOpeningsArea: number;
	wallsCount: number;

	// Calculations
	perimeter: number; // meters
	totalWallsArea: number; // m² (without openings)
	usefulArea: number; // m² (with openings subtracted)
	usefulAreaWithReserve: number; // m² (with reserve)

	// Per wall breakdown (for 4-wall rooms)
	wall1Area?: number; // front wall
	wall2Area?: number; // right wall
	wall3Area?: number; // back wall
	wall4Area?: number; // left wall

	// Reserve
	reservePercentage: number;
	reserveArea: number; // m²
}

/**
 * Calculate perimeter of rectangular room
 */
function calculatePerimeter(length: number, width: number): number {
	return 2 * (length + width);
}

/**
 * Calculate total wall area for rectangular room
 */
function calculateTotalWallArea(
	length: number,
	width: number,
	height: number,
	wallsCount: number = 4
): number {
	if (wallsCount === 4) {
		// Standard rectangular room: 2 walls of length × height, 2 walls of width × height
		return 2 * (length + width) * height;
	} else if (wallsCount === 3) {
		// L-shaped or triangular room (approximation)
		return (
			(length + width + Math.sqrt(length * length + width * width)) *
			height
		);
	} else if (wallsCount === 2) {
		// Open room or hallway (two parallel walls)
		return 2 * Math.max(length, width) * height;
	} else {
		// Default to perimeter calculation
		return calculatePerimeter(length, width) * height;
	}
}

/**
 * Calculate area per wall for 4-wall room
 */
function calculatePerWallAreas(
	length: number,
	width: number,
	height: number
): {
	wall1: number; // front (length)
	wall2: number; // right (width)
	wall3: number; // back (length)
	wall4: number; // left (width)
} {
	return {
		wall1: length * height, // front wall
		wall2: width * height, // right wall
		wall3: length * height, // back wall
		wall4: width * height, // left wall
	};
}

/**
 * Main calculation function
 */
export function calculateWallArea(input: WallAreaInput): WallAreaResult {
	const {
		roomLength,
		roomWidth,
		wallHeight,
		windowsArea,
		doorsArea,
		wallsCount = 4,
		reservePercentage,
	} = input;

	// Calculate perimeter
	const perimeter = calculatePerimeter(roomLength, roomWidth);

	// Calculate total wall area
	const totalWallsArea = calculateTotalWallArea(
		roomLength,
		roomWidth,
		wallHeight,
		wallsCount
	);

	// Calculate total openings area
	const totalOpeningsArea = windowsArea + doorsArea;

	// Calculate useful area (after subtracting openings)
	const usefulArea = Math.max(0, totalWallsArea - totalOpeningsArea);

	// Calculate reserve area
	const reserveArea = (usefulArea * reservePercentage) / 100;

	// Calculate useful area with reserve
	const usefulAreaWithReserve = usefulArea + reserveArea;

	// Calculate per-wall areas (only for 4-wall rooms)
	let perWallAreas:
		| {
				wall1Area?: number;
				wall2Area?: number;
				wall3Area?: number;
				wall4Area?: number;
		  }
		| undefined;

	if (wallsCount === 4) {
		const walls = calculatePerWallAreas(roomLength, roomWidth, wallHeight);
		// Distribute openings proportionally (simplified approach)
		const averageOpeningPerWall = totalOpeningsArea / 4;
		perWallAreas = {
			wall1Area: Math.max(0, walls.wall1 - averageOpeningPerWall),
			wall2Area: Math.max(0, walls.wall2 - averageOpeningPerWall),
			wall3Area: Math.max(0, walls.wall3 - averageOpeningPerWall),
			wall4Area: Math.max(0, walls.wall4 - averageOpeningPerWall),
		};
	}

	return {
		roomLength: Math.round(roomLength * 100) / 100,
		roomWidth: Math.round(roomWidth * 100) / 100,
		wallHeight: Math.round(wallHeight * 100) / 100,
		windowsArea: Math.round(windowsArea * 100) / 100,
		doorsArea: Math.round(doorsArea * 100) / 100,
		totalOpeningsArea: Math.round(totalOpeningsArea * 100) / 100,
		wallsCount,
		perimeter: Math.round(perimeter * 100) / 100,
		totalWallsArea: Math.round(totalWallsArea * 100) / 100,
		usefulArea: Math.round(usefulArea * 100) / 100,
		usefulAreaWithReserve: Math.round(usefulAreaWithReserve * 100) / 100,
		reservePercentage,
		reserveArea: Math.round(reserveArea * 100) / 100,
		...perWallAreas,
	};
}

/**
 * Validate input data
 */
export function validateWallAreaInput(input: Partial<WallAreaInput>): string[] {
	const errors: string[] = [];

	if (!input.roomLength || input.roomLength <= 0) {
		errors.push('Длина комнаты должна быть больше 0');
	}

	if (!input.roomWidth || input.roomWidth <= 0) {
		errors.push('Ширина комнаты должна быть больше 0');
	}

	if (!input.wallHeight || input.wallHeight <= 0) {
		errors.push('Высота стен должна быть больше 0');
	}

	if (input.windowsArea === undefined || input.windowsArea < 0) {
		errors.push('Площадь окон не может быть отрицательной');
	}

	if (input.doorsArea === undefined || input.doorsArea < 0) {
		errors.push('Площадь дверей не может быть отрицательной');
	}

	if (
		input.reservePercentage === undefined ||
		input.reservePercentage < 0 ||
		input.reservePercentage > 100
	) {
		errors.push('Запас должен быть от 0 до 100%');
	}

	if (input.wallsCount !== undefined) {
		if (input.wallsCount < 2 || input.wallsCount > 4) {
			errors.push('Количество стен должно быть от 2 до 4');
		}
	}

	// Check if openings area is not greater than wall area
	if (
		input.roomLength &&
		input.roomWidth &&
		input.wallHeight &&
		input.windowsArea !== undefined &&
		input.doorsArea !== undefined
	) {
		const perimeter = calculatePerimeter(input.roomLength, input.roomWidth);
		const totalArea = perimeter * input.wallHeight;
		const totalOpenings = (input.windowsArea || 0) + (input.doorsArea || 0);
		if (totalOpenings > totalArea) {
			errors.push(
				'Площадь окон и дверей не может превышать общую площадь стен'
			);
		}
	}

	return errors;
}

/**
 * Get default walls count options
 */
export function getWallsCountOptions(): Array<{
	value: number;
	label: string;
}> {
	return [
		{ value: 4, label: '4 стены (стандартная комната)' },
		{ value: 3, label: '3 стены (угловая комната)' },
		{ value: 2, label: '2 стены (открытое пространство)' },
	];
}
