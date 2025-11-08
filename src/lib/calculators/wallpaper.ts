// Wallpaper calculation logic and interfaces

export interface WallpaperInput {
	roomLength: number; // Room length in meters
	roomWidth: number; // Room width in meters
	wallHeight: number; // Wall height in meters
	rollWidth: number; // Roll width in meters
	rollLength: number; // Roll length in meters
	doors: DoorWindow[]; // Array of doors
	windows: DoorWindow[]; // Array of windows
	reservePercentage: number; // Reserve percentage (default 10%)
}

export interface DoorWindow {
	width: number; // Width in meters
	height: number; // Height in meters
}

export interface WallpaperResult {
	// Room dimensions
	roomLength: number;
	roomWidth: number;
	wallHeight: number;

	// Wall area calculations
	totalWallArea: number;
	doorsArea: number;
	windowsArea: number;
	openingsArea: number;
	usefulWallArea: number;

	// Roll calculations
	rollWidth: number;
	rollLength: number;
	rollArea: number;

	// Reserve and final calculations
	reservePercentage: number;
	reserveArea: number;
	totalAreaNeeded: number;
	rollsNeeded: number;
	recommendedRolls: number;

	// Additional info
	doorsCount: number;
	windowsCount: number;
}

/**
 * Calculate wallpaper quantity needed for a room
 * 
 * Calculates number of wallpaper rolls needed based on:
 * - Room dimensions (length, width, height)
 * - Roll dimensions (width, length)
 * - Doors and windows area (deducted from total wall area)
 * - Reserve percentage for waste
 * 
 * Algorithm:
 * 1. Calculate total wall area: 2 × (Length + Width) × Height
 * 2. Calculate doors and windows area
 * 3. Calculate useful wall area (total - openings)
 * 4. Calculate roll area (width × length)
 * 5. Calculate rolls needed with reserve
 * 6. Round up to recommended rolls
 * 
 * @param input - Wallpaper input parameters
 * @returns Wallpaper calculation result with quantities and areas
 */
export function calculateWallpaper(input: WallpaperInput): WallpaperResult {
	const {
		roomLength,
		roomWidth,
		wallHeight,
		rollWidth,
		rollLength,
		doors,
		windows,
		reservePercentage,
	} = input;

	// Calculate total wall area
	// Formula: 2 × (Length + Width) × Height
	const totalWallArea = 2 * (roomLength + roomWidth) * wallHeight;

	// Calculate doors area
	const doorsArea = doors.reduce((total, door) => {
		return total + door.width * door.height;
	}, 0);

	// Calculate windows area
	const windowsArea = windows.reduce((total, window) => {
		return total + window.width * window.height;
	}, 0);

	// Total openings area
	const openingsArea = doorsArea + windowsArea;

	// Useful wall area (after subtracting openings)
	const usefulWallArea = Math.max(0, totalWallArea - openingsArea);

	// Calculate roll area
	const rollArea = rollWidth * rollLength;

	// Calculate reserve area
	const reserveArea = usefulWallArea * (reservePercentage / 100);

	// Total area needed (useful area + reserve)
	const totalAreaNeeded = usefulWallArea + reserveArea;

	// Calculate number of rolls needed
	const rollsNeeded = Math.ceil(totalAreaNeeded / rollArea);

	// Recommended rolls (add 1 extra for pattern matching and future repairs)
	// Only add extra roll for very large projects (more than 10 rolls) or when reserve is very low
	const shouldAddExtra = rollsNeeded > 10 || reservePercentage < 5;
	const recommendedRolls = shouldAddExtra ? rollsNeeded + 1 : rollsNeeded;

	return {
		// Room dimensions
		roomLength: Math.round(roomLength * 100) / 100,
		roomWidth: Math.round(roomWidth * 100) / 100,
		wallHeight: Math.round(wallHeight * 100) / 100,

		// Wall area calculations
		totalWallArea: Math.round(totalWallArea * 100) / 100,
		doorsArea: Math.round(doorsArea * 100) / 100,
		windowsArea: Math.round(windowsArea * 100) / 100,
		openingsArea: Math.round(openingsArea * 100) / 100,
		usefulWallArea: Math.round(usefulWallArea * 100) / 100,

		// Roll calculations
		rollWidth: Math.round(rollWidth * 100) / 100,
		rollLength: Math.round(rollLength * 100) / 100,
		rollArea: Math.round(rollArea * 100) / 100,

		// Reserve and final calculations
		reservePercentage: Math.round(reservePercentage * 100) / 100,
		reserveArea: Math.round(reserveArea * 100) / 100,
		totalAreaNeeded: Math.round(totalAreaNeeded * 100) / 100,
		rollsNeeded: Math.round(rollsNeeded),
		recommendedRolls: Math.round(recommendedRolls),

		// Additional info
		doorsCount: doors.length,
		windowsCount: windows.length,
	};
}

/**
 * Validate wallpaper calculation input
 * 
 * Performs validation checks:
 * - Room dimensions are positive
 * - Roll dimensions are positive
 * - Reserve percentage is between 0 and 100
 * - Doors and windows have valid dimensions
 * 
 * @param input - Partial wallpaper input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateWallpaperInput(
	input: Partial<WallpaperInput>
): string[] {
	const errors: string[] = [];

	// Room dimensions validation
	if (!input.roomLength || input.roomLength <= 0) {
		errors.push('Длина комнаты должна быть больше 0');
	}

	if (input.roomLength && input.roomLength > 100) {
		errors.push('Длина комнаты не может быть больше 100 метров');
	}

	if (!input.roomWidth || input.roomWidth <= 0) {
		errors.push('Ширина комнаты должна быть больше 0');
	}

	if (input.roomWidth && input.roomWidth > 100) {
		errors.push('Ширина комнаты не может быть больше 100 метров');
	}

	if (!input.wallHeight || input.wallHeight <= 0) {
		errors.push('Высота стен должна быть больше 0');
	}

	if (input.wallHeight && input.wallHeight > 10) {
		errors.push('Высота стен не может быть больше 10 метров');
	}

	// Roll dimensions validation
	if (!input.rollWidth || input.rollWidth <= 0) {
		errors.push('Ширина рулона должна быть больше 0');
	}

	if (input.rollWidth && input.rollWidth > 5) {
		errors.push('Ширина рулона не может быть больше 5 метров');
	}

	if (!input.rollLength || input.rollLength <= 0) {
		errors.push('Длина рулона должна быть больше 0');
	}

	if (input.rollLength && input.rollLength > 50) {
		errors.push('Длина рулона не может быть больше 50 метров');
	}

	// Reserve percentage validation
	if (input.reservePercentage !== undefined && input.reservePercentage < 0) {
		errors.push('Запас не может быть отрицательным');
	}

	if (input.reservePercentage && input.reservePercentage > 100) {
		errors.push('Запас не может быть больше 100%');
	}

	// Doors and windows validation
	if (input.doors) {
		for (let i = 0; i < input.doors.length; i++) {
			const door = input.doors[i];
			if (door.width <= 0 || door.height <= 0) {
				errors.push(`Дверь ${i + 1}: размеры должны быть больше 0`);
			}
			if (door.width > 5 || door.height > 5) {
				errors.push(
					`Дверь ${i + 1}: размеры не могут быть больше 5 метров`
				);
			}
		}
	}

	if (input.windows) {
		for (let i = 0; i < input.windows.length; i++) {
			const window = input.windows[i];
			if (window.width <= 0 || window.height <= 0) {
				errors.push(`Окно ${i + 1}: размеры должны быть больше 0`);
			}
			if (window.width > 10 || window.height > 10) {
				errors.push(
					`Окно ${i + 1}: размеры не могут быть больше 10 метров`
				);
			}
		}
	}

	return errors;
}

export function formatWallpaperArea(area: number): string {
	return (
		new Intl.NumberFormat('ru-RU', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(area) + ' м²'
	);
}

export function formatWallpaperNumber(value: number): string {
	return new Intl.NumberFormat('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
}

export function getStandardRollSizes(t?: (key: string) => string): Array<{
	width: number;
	length: number;
	label: string;
	description: string;
}> {
	return [
		{
			width: 0.53,
			length: 10.05,
			label: t ? t('options.rollSizes.standard.label') : '0.53 × 10.05 м',
			description: t
				? t('options.rollSizes.standard.description')
				: 'Стандартный размер (европейский)',
		},
		{
			width: 0.7,
			length: 10.05,
			label: t ? t('options.rollSizes.wide.label') : '0.7 × 10.05 м',
			description: t
				? t('options.rollSizes.wide.description')
				: 'Широкий рулон',
		},
		{
			width: 1.06,
			length: 10.05,
			label: t ? t('options.rollSizes.veryWide.label') : '1.06 × 10.05 м',
			description: t
				? t('options.rollSizes.veryWide.description')
				: 'Очень широкий рулон',
		},
		{
			width: 0.53,
			length: 15.0,
			label: t ? t('options.rollSizes.long.label') : '0.53 × 15.0 м',
			description: t
				? t('options.rollSizes.long.description')
				: 'Длинный рулон',
		},
		{
			width: 0.7,
			length: 15.0,
			label: t ? t('options.rollSizes.wideLong.label') : '0.7 × 15.0 м',
			description: t
				? t('options.rollSizes.wideLong.description')
				: 'Широкий длинный рулон',
		},
	];
}

export function getStandardReservePercentages(
	t?: (key: string) => string
): Array<{
	value: number;
	label: string;
	description: string;
}> {
	return [
		{
			value: 5,
			label: '5%',
			description: t
				? t('options.reservePercentages.minimal')
				: 'Минимальный запас',
		},
		{
			value: 10,
			label: '10%',
			description: t
				? t('options.reservePercentages.standard')
				: 'Стандартный запас',
		},
		{
			value: 15,
			label: '15%',
			description: t
				? t('options.reservePercentages.increased')
				: 'Увеличенный запас',
		},
		{
			value: 20,
			label: '20%',
			description: t
				? t('options.reservePercentages.large')
				: 'Большой запас',
		},
	];
}

export function addDoor(input: WallpaperInput): WallpaperInput {
	return {
		...input,
		doors: [...input.doors, { width: 0.8, height: 2.1 }], // Standard door size
	};
}

export function addWindow(input: WallpaperInput): WallpaperInput {
	return {
		...input,
		windows: [...input.windows, { width: 1.2, height: 1.5 }], // Standard window size
	};
}

export function removeDoor(
	input: WallpaperInput,
	index: number
): WallpaperInput {
	const newDoors = input.doors.filter((_, i) => i !== index);
	return {
		...input,
		doors: newDoors,
	};
}

export function removeWindow(
	input: WallpaperInput,
	index: number
): WallpaperInput {
	const newWindows = input.windows.filter((_, i) => i !== index);
	return {
		...input,
		windows: newWindows,
	};
}

export function updateDoor(
	input: WallpaperInput,
	index: number,
	door: DoorWindow
): WallpaperInput {
	const newDoors = [...input.doors];
	newDoors[index] = door;
	return {
		...input,
		doors: newDoors,
	};
}

export function updateWindow(
	input: WallpaperInput,
	index: number,
	window: DoorWindow
): WallpaperInput {
	const newWindows = [...input.windows];
	newWindows[index] = window;
	return {
		...input,
		windows: newWindows,
	};
}
