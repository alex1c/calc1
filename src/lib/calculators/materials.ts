/**
 * Materials Calculator Library
 * 
 * Provides universal functionality for calculating building materials needed for construction.
 * 
 * Features:
 * - Multiple material types (paint, plaster, primer, putty, tile glue)
 * - Room dimensions input
 * - Doors and windows area deduction
 * - Multiple layers support
 * - Consumption rate calculation
 * - Reserve percentage calculation
 * - Package size calculation
 * 
 * Material types:
 * - Paint: Liquid material (liters)
 * - Plaster: Powder material (kg)
 * - Primer: Liquid material (liters)
 * - Putty: Powder material (kg)
 * - Tile glue: Powder material (kg)
 * 
 * Calculation method:
 * - Calculates total wall area
 * - Deducts doors and windows area
 * - Calculates material needed per layer
 * - Multiplies by number of layers
 * - Applies reserve percentage
 * - Calculates number of packages needed
 */

/**
 * Input interface for material calculation
 * Contains room dimensions, openings area, layers, consumption rate, and package size
 */
export interface MaterialInput {
	// Room dimensions
	roomLength: number;
	roomWidth: number;
	wallHeight: number;
	floorArea?: number; // For tile glue

	// Openings
	doorsWindowsArea: number;

	// Material specific
	layers: number;
	consumptionRate: number; // per m²
	reservePercentage: number;
	packageSize: number; // liters/kg/bags

	// Additional for tile glue
	tileSize?: number; // tile area in m²
	groutWidth?: number; // grout width in mm
}

export interface MaterialResult {
	// Room calculations
	totalWallArea: number;
	doorsWindowsArea: number;
	usefulArea: number;
	floorArea?: number;

	// Material calculations
	layers: number;
	consumptionPerLayer: number;
	totalMaterial: number;
	packageSize: number;
	packagesNeeded: number;

	// Additional info
	materialType: string;
	unit: string;
}

export interface MaterialConfig {
	name: string;
	unit: string;
	inputs: string[];
	formula: (input: MaterialInput) => MaterialResult;
	defaultConsumption: number;
	defaultPackageSize: number;
	description: string;
}

// Material configurations
export const MATERIALS: Record<string, MaterialConfig> = {
	paint: {
		name: 'Краска',
		unit: 'L',
		inputs: [
			'roomLength',
			'roomWidth',
			'wallHeight',
			'doorsWindowsArea',
			'layers',
			'consumptionRate',
			'reservePercentage',
			'packageSize',
		],
		formula: calculatePaint,
		defaultConsumption: 0.12, // liters per m²
		defaultPackageSize: 2.5, // liters
		description: 'Расчёт количества краски для стен',
	},
	putty: {
		name: 'Шпатлёвка',
		unit: 'kg',
		inputs: [
			'roomLength',
			'roomWidth',
			'wallHeight',
			'doorsWindowsArea',
			'layers',
			'consumptionRate',
			'reservePercentage',
			'packageSize',
		],
		formula: calculatePutty,
		defaultConsumption: 1.2, // kg per m²
		defaultPackageSize: 25, // kg
		description: 'Расчёт количества шпатлёвки для стен',
	},
	primer: {
		name: 'Грунтовка',
		unit: 'L',
		inputs: [
			'roomLength',
			'roomWidth',
			'wallHeight',
			'doorsWindowsArea',
			'consumptionRate',
			'reservePercentage',
			'packageSize',
		],
		formula: calculatePrimer,
		defaultConsumption: 0.1, // liters per m²
		defaultPackageSize: 1, // liters
		description: 'Расчёт количества грунтовки для стен',
	},
	tileGlue: {
		name: 'Плиточный клей',
		unit: 'kg',
		inputs: [
			'floorArea',
			'doorsWindowsArea',
			'consumptionRate',
			'reservePercentage',
			'packageSize',
			'tileSize',
			'groutWidth',
		],
		formula: calculateTileGlue,
		defaultConsumption: 4, // kg per m²
		defaultPackageSize: 25, // kg
		description: 'Расчёт количества плиточного клея',
	},
	plaster: {
		name: 'Штукатурка',
		unit: 'kg',
		inputs: [
			'roomLength',
			'roomWidth',
			'wallHeight',
			'doorsWindowsArea',
			'layers',
			'consumptionRate',
			'reservePercentage',
			'packageSize',
		],
		formula: calculatePlaster,
		defaultConsumption: 9, // kg per m² (for 10mm layer thickness, 9 kg/m² per 1mm)
		defaultPackageSize: 30, // kg
		description: 'Расчёт количества штукатурки для стен',
	},
};

/**
 * Calculate paint quantity needed for walls
 * 
 * Calculates paint needed based on:
 * - Total wall area (2 × (length + width) × height)
 * - Doors and windows area deduction
 * - Number of layers
 * - Consumption rate (liters per m²)
 * - Reserve percentage
 * 
 * @param input - Material input parameters
 * @returns Material result with paint quantity and package count
 */
function calculatePaint(input: MaterialInput): MaterialResult {
	const {
		roomLength,
		roomWidth,
		wallHeight,
		doorsWindowsArea,
		layers,
		consumptionRate,
		reservePercentage,
		packageSize,
	} = input;

	// Calculate wall area
	const totalWallArea = 2 * (roomLength + roomWidth) * wallHeight;
	const usefulArea = totalWallArea - doorsWindowsArea;

	// Calculate material needed
	const consumptionPerLayer = usefulArea * consumptionRate;
	const totalMaterial =
		consumptionPerLayer * layers * (1 + reservePercentage / 100);
	const packagesNeeded = Math.ceil(totalMaterial / packageSize);

	return {
		totalWallArea: Math.round(totalWallArea * 100) / 100,
		doorsWindowsArea: Math.round(doorsWindowsArea * 100) / 100,
		usefulArea: Math.round(usefulArea * 100) / 100,
		layers,
		consumptionPerLayer: Math.round(consumptionPerLayer * 100) / 100,
		totalMaterial: Math.round(totalMaterial * 100) / 100,
		packageSize,
		packagesNeeded,
		materialType: 'paint',
		unit: 'L',
	};
}

/**
 * Calculate putty quantity needed for walls
 * 
 * Calculates putty needed based on:
 * - Total wall area (2 × (length + width) × height)
 * - Doors and windows area deduction
 * - Number of layers
 * - Consumption rate (kg per m²)
 * - Reserve percentage
 * 
 * @param input - Material input parameters
 * @returns Material result with putty quantity and package count
 */
function calculatePutty(input: MaterialInput): MaterialResult {
	const {
		roomLength,
		roomWidth,
		wallHeight,
		doorsWindowsArea,
		layers,
		consumptionRate,
		reservePercentage,
		packageSize,
	} = input;

	const totalWallArea = 2 * (roomLength + roomWidth) * wallHeight;
	const usefulArea = totalWallArea - doorsWindowsArea;

	const consumptionPerLayer = usefulArea * consumptionRate;
	const totalMaterial =
		consumptionPerLayer * layers * (1 + reservePercentage / 100);
	const packagesNeeded = Math.ceil(totalMaterial / packageSize);

	return {
		totalWallArea: Math.round(totalWallArea * 100) / 100,
		doorsWindowsArea: Math.round(doorsWindowsArea * 100) / 100,
		usefulArea: Math.round(usefulArea * 100) / 100,
		layers,
		consumptionPerLayer: Math.round(consumptionPerLayer * 100) / 100,
		totalMaterial: Math.round(totalMaterial * 100) / 100,
		packageSize,
		packagesNeeded,
		materialType: 'putty',
		unit: 'kg',
	};
}

/**
 * Calculate primer quantity needed for walls
 * 
 * Calculates primer needed based on:
 * - Total wall area (2 × (length + width) × height)
 * - Doors and windows area deduction
 * - Single layer application (primer is always single layer)
 * - Consumption rate (liters per m²)
 * - Reserve percentage
 * 
 * @param input - Material input parameters
 * @returns Material result with primer quantity and package count
 */
function calculatePrimer(input: MaterialInput): MaterialResult {
	const {
		roomLength,
		roomWidth,
		wallHeight,
		doorsWindowsArea,
		consumptionRate,
		reservePercentage,
		packageSize,
	} = input;

	const totalWallArea = 2 * (roomLength + roomWidth) * wallHeight;
	const usefulArea = totalWallArea - doorsWindowsArea;

	const consumptionPerLayer = usefulArea * consumptionRate;
	const totalMaterial = consumptionPerLayer * (1 + reservePercentage / 100);
	const packagesNeeded = Math.ceil(totalMaterial / packageSize);

	return {
		totalWallArea: Math.round(totalWallArea * 100) / 100,
		doorsWindowsArea: Math.round(doorsWindowsArea * 100) / 100,
		usefulArea: Math.round(usefulArea * 100) / 100,
		layers: 1,
		consumptionPerLayer: Math.round(consumptionPerLayer * 100) / 100,
		totalMaterial: Math.round(totalMaterial * 100) / 100,
		packageSize,
		packagesNeeded,
		materialType: 'primer',
		unit: 'L',
	};
}

/**
 * Calculate tile glue quantity needed for floor tiling
 * 
 * Calculates tile glue needed based on:
 * - Floor area
 * - Doors and windows area deduction (if applicable)
 * - Consumption rate (kg per m²)
 * - Tile size and grout width (affects consumption)
 * - Reserve percentage
 * 
 * Note: Consumption rate is adjusted based on grout width.
 * 
 * @param input - Material input parameters
 * @returns Material result with tile glue quantity and package count
 */
function calculateTileGlue(input: MaterialInput): MaterialResult {
	const {
		floorArea = 0,
		doorsWindowsArea,
		consumptionRate,
		reservePercentage,
		packageSize,
		tileSize = 0,
		groutWidth = 2,
	} = input;

	// For tile glue, we use floor area instead of wall area
	const usefulArea = (floorArea || 0) - doorsWindowsArea;

	// Adjust consumption based on tile size and grout width
	const adjustedConsumption = consumptionRate * (1 + groutWidth / 10 / 100); // Slight increase for grout

	const consumptionPerLayer = usefulArea * adjustedConsumption;
	const totalMaterial = consumptionPerLayer * (1 + reservePercentage / 100);
	const packagesNeeded = Math.ceil(totalMaterial / packageSize);

	return {
		totalWallArea: 0, // Not applicable for floor
		doorsWindowsArea: Math.round(doorsWindowsArea * 100) / 100,
		usefulArea: Math.round(usefulArea * 100) / 100,
		floorArea: Math.round((floorArea || 0) * 100) / 100,
		layers: 1,
		consumptionPerLayer: Math.round(consumptionPerLayer * 100) / 100,
		totalMaterial: Math.round(totalMaterial * 100) / 100,
		packageSize,
		packagesNeeded,
		materialType: 'tileGlue',
		unit: 'kg',
	};
}

/**
 * Calculate plaster quantity needed for walls
 * 
 * Calculates plaster needed based on:
 * - Total wall area (2 × (length + width) × height)
 * - Doors and windows area deduction
 * - Number of layers
 * - Consumption rate (kg per m², accounts for layer thickness)
 * - Reserve percentage
 * 
 * @param input - Material input parameters
 * @returns Material result with plaster quantity and package count
 */
function calculatePlaster(input: MaterialInput): MaterialResult {
	const {
		roomLength,
		roomWidth,
		wallHeight,
		doorsWindowsArea,
		layers,
		consumptionRate,
		reservePercentage,
		packageSize,
	} = input;

	const totalWallArea = 2 * (roomLength + roomWidth) * wallHeight;
	const usefulArea = totalWallArea - doorsWindowsArea;

	// Consumption rate already accounts for layer thickness (kg/m²)
	const consumptionPerLayer = usefulArea * consumptionRate;
	const totalMaterial =
		consumptionPerLayer * layers * (1 + reservePercentage / 100);
	const packagesNeeded = Math.ceil(totalMaterial / packageSize);

	return {
		totalWallArea: Math.round(totalWallArea * 100) / 100,
		doorsWindowsArea: Math.round(doorsWindowsArea * 100) / 100,
		usefulArea: Math.round(usefulArea * 100) / 100,
		layers,
		consumptionPerLayer: Math.round(consumptionPerLayer * 100) / 100,
		totalMaterial: Math.round(totalMaterial * 100) / 100,
		packageSize,
		packagesNeeded,
		materialType: 'plaster',
		unit: 'kg',
	};
}

/**
 * Calculate material quantity for specified material type
 * 
 * Main entry point for material calculations. Routes to appropriate
 * calculation function based on material type.
 * 
 * @param materialType - Material type (paint, plaster, primer, putty, tileGlue)
 * @param input - Material input parameters
 * @returns Material result with quantity and package count, or null if material type is unsupported
 */
export function calculateMaterial(
	materialType: string,
	input: MaterialInput
): MaterialResult | null {
	const material = MATERIALS[materialType];
	if (!material) {
		return null;
	}

	return material.formula(input);
}

/**
 * Validate material calculation input
 * 
 * Performs validation checks:
 * - Reserve percentage is between 0 and 100
 * - Consumption rate is positive
 * - Package size is positive
 * - Material-specific validations (floor area for tile glue, room dimensions for others)
 * 
 * @param input - Partial material input to validate
 * @param materialType - Material type for material-specific validation
 * @returns Array of error messages (empty if valid)
 */
export function validateMaterialInput(
	input: Partial<MaterialInput>,
	materialType: string
): string[] {
	const errors: string[] = [];

	// Common validations
	if (
		input.reservePercentage === undefined ||
		input.reservePercentage < 0 ||
		input.reservePercentage > 100
	) {
		errors.push('Запас должен быть от 0 до 100%');
	}

	if (input.consumptionRate === undefined || input.consumptionRate <= 0) {
		errors.push('Норма расхода должна быть больше 0');
	}

	if (input.packageSize === undefined || input.packageSize <= 0) {
		errors.push('Размер упаковки должен быть больше 0');
	}

	// Material-specific validations
	if (materialType === 'tileGlue') {
		if (!input.floorArea || input.floorArea <= 0) {
			errors.push('Площадь пола должна быть больше 0');
		}
	} else {
		if (!input.roomLength || input.roomLength <= 0) {
			errors.push('Длина комнаты должна быть больше 0');
		}
		if (!input.roomWidth || input.roomWidth <= 0) {
			errors.push('Ширина комнаты должна быть больше 0');
		}
		if (!input.wallHeight || input.wallHeight <= 0) {
			errors.push('Высота стен должна быть больше 0');
		}
	}

	if (input.doorsWindowsArea === undefined || input.doorsWindowsArea < 0) {
		errors.push('Площадь дверей и окон не может быть отрицательной');
	}

	if (materialType !== 'primer' && materialType !== 'tileGlue') {
		if (!input.layers || input.layers <= 0) {
			errors.push('Количество слоёв должно быть больше 0');
		}
	}

	// Specific validation for plaster
	if (materialType === 'plaster') {
		if (input.consumptionRate && input.consumptionRate < 5) {
			errors.push(
				'Норма расхода штукатурки слишком низкая (минимум 5 кг/м²)'
			);
		}
		if (input.consumptionRate && input.consumptionRate > 50) {
			errors.push(
				'Норма расхода штукатурки слишком высокая (максимум 50 кг/м²)'
			);
		}
	}

	return errors;
}

// Get material options
export function getMaterialOptions(t?: (key: string) => string): Array<{
	value: string;
	label: string;
	description: string;
}> {
	return Object.entries(MATERIALS).map(([key, config]) => ({
		value: key,
		label: t ? t(`seo.options.materials.${key}`) : config.name,
		description: t
			? t(`seo.options.materialDescriptions.${key}`)
			: config.description,
	}));
}

// Format currency/units
export function formatMaterialAmount(amount: number, unit: string): string {
	return `${Math.round(amount * 100) / 100} ${unit}`;
}
