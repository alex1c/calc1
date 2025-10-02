// Universal building materials calculator
// Extensible architecture for different materials

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
		unit: 'л',
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
		unit: 'кг',
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
		unit: 'л',
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
		unit: 'кг',
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
};

// Paint calculation
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
		unit: 'л',
	};
}

// Putty calculation (same as paint)
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
		unit: 'кг',
	};
}

// Primer calculation (single layer)
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
		unit: 'л',
	};
}

// Tile glue calculation
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
		unit: 'кг',
	};
}

// Main calculation function
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

// Validation
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

	return errors;
}

// Get material options
export function getMaterialOptions(): Array<{
	value: string;
	label: string;
	description: string;
}> {
	return Object.entries(MATERIALS).map(([key, config]) => ({
		value: key,
		label: config.name,
		description: config.description,
	}));
}

// Format currency/units
export function formatMaterialAmount(amount: number, unit: string): string {
	return `${Math.round(amount * 100) / 100} ${unit}`;
}
