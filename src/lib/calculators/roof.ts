// Roof calculator
// Extensible architecture for different roof types and materials

export interface RoofInput {
	// House dimensions
	houseLength: number; // in meters
	houseWidth: number; // in meters

	// Roof type
	roofType: 'single' | 'gable' | 'hip' | 'mansard';

	// Roof parameters
	roofAngle: number; // in degrees
	overhang: number; // in meters (optional, default 0.5)

	// Material
	material: 'metal-tile' | 'corrugated' | 'soft-tile';
	materialLength: number; // in meters
	materialWidth: number; // in meters

	// Reserve
	reservePercentage: number; // default 10%

	// Units
	units: 'meters' | 'centimeters';
}

export interface RoofResult {
	// Input data
	roofType: string;
	material: string;
	houseLength: number;
	houseWidth: number;
	roofAngle: number;
	overhang: number;

	// Calculated areas
	roofArea: number; // total roof area
	effectiveArea: number; // area without overhangs
	overhangArea: number; // overhang area

	// Material calculations
	materialCount: number; // number of sheets/packages
	materialArea: number; // area of one sheet/package
	totalMaterialArea: number; // total material area needed

	// Weight calculations
	materialWeight: number; // weight per m²
	totalWeight: number; // total weight

	// Reserve
	reservePercentage: number;
	reserveArea: number; // additional area for reserve
	recommendedCount: number; // recommended number of sheets/packages

	// Units
	areaUnit: string;
	weightUnit: string;
	lengthUnit: string;
}

export interface RoofType {
	name: string;
	description: string;
	coefficient: number; // area coefficient for roof type
}

export interface RoofMaterial {
	name: string;
	width: number; // standard width in meters
	maxLength: number; // maximum length in meters
	weightPerM2: number; // kg per m²
	description: string;
	unit: 'sheets' | 'packages';
}

// Roof types configuration
export const ROOF_TYPES: Record<string, RoofType> = {
	single: {
		name: 'Односкатная',
		description: 'Крыша с одним скатом',
		coefficient: 1.0,
	},
	gable: {
		name: 'Двускатная',
		description: 'Крыша с двумя скатами',
		coefficient: 2.0,
	},
	hip: {
		name: 'Вальмовая',
		description: 'Крыша с четырьмя скатами',
		coefficient: 1.2,
	},
	mansard: {
		name: 'Мансардная',
		description: 'Крыша с ломаными скатами',
		coefficient: 1.3,
	},
};

// Roof materials configuration
export const ROOF_MATERIALS: Record<string, RoofMaterial> = {
	'metal-tile': {
		name: 'Металлочерепица',
		width: 1.1,
		maxLength: 6,
		weightPerM2: 4.5,
		description: 'Металлическая черепица с полимерным покрытием',
		unit: 'sheets',
	},
	corrugated: {
		name: 'Профнастил',
		width: 1.1,
		maxLength: 12,
		weightPerM2: 4.8,
		description: 'Профилированный лист из оцинкованной стали',
		unit: 'sheets',
	},
	'soft-tile': {
		name: 'Мягкая черепица',
		width: 1.0,
		maxLength: 0.34,
		weightPerM2: 8.0,
		description: 'Битумная черепица в рулонах',
		unit: 'packages',
	},
};

/**
 * Convert meters to centimeters
 */
export function convertMetersToCentimeters(meters: number): number {
	return meters * 100;
}

/**
 * Convert centimeters to meters
 */
export function convertCentimetersToMeters(centimeters: number): number {
	return centimeters / 100;
}

/**
 * Calculate roof area based on type and angle
 */
export function calculateRoofArea(
	houseLength: number,
	houseWidth: number,
	roofAngle: number,
	roofType: string,
	overhang: number = 0.5
): {
	roofArea: number;
	effectiveArea: number;
	overhangArea: number;
} {
	const roofTypeData = ROOF_TYPES[roofType];
	if (!roofTypeData) {
		throw new Error(`Unsupported roof type: ${roofType}`);
	}

	// Convert angle to radians
	const angleRad = (roofAngle * Math.PI) / 180;

	// Calculate roof slope factor
	const slopeFactor = 1 / Math.cos(angleRad);

	// Calculate base area
	const baseArea = houseLength * houseWidth;

	// Calculate effective area (without overhangs)
	const effectiveLength = houseLength + 2 * overhang;
	const effectiveWidth = houseWidth + 2 * overhang;
	const effectiveArea =
		effectiveLength *
		effectiveWidth *
		roofTypeData.coefficient *
		slopeFactor;

	// Calculate overhang area
	const overhangArea =
		effectiveArea - baseArea * roofTypeData.coefficient * slopeFactor;

	// Calculate total roof area
	const roofArea = effectiveArea;

	return {
		roofArea: Math.round(roofArea * 100) / 100,
		effectiveArea: Math.round(effectiveArea * 100) / 100,
		overhangArea: Math.round(overhangArea * 100) / 100,
	};
}

/**
 * Calculate material requirements
 */
export function calculateMaterialRequirements(
	roofArea: number,
	material: string,
	materialLength: number,
	materialWidth: number,
	reservePercentage: number,
	units: 'meters' | 'centimeters' = 'meters'
): {
	materialCount: number;
	materialArea: number;
	totalMaterialArea: number;
	reserveArea: number;
	recommendedCount: number;
} {
	const materialData = ROOF_MATERIALS[material];
	if (!materialData) {
		throw new Error(`Unsupported material: ${material}`);
	}

	// Convert material dimensions to meters if needed
	const lengthInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(materialLength)
			: materialLength;
	const widthInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(materialWidth)
			: materialWidth;

	// Calculate area of one sheet/package
	const materialArea = lengthInMeters * widthInMeters;

	// Calculate required material area with reserve
	const reserveArea = (roofArea * reservePercentage) / 100;
	const totalMaterialArea = roofArea + reserveArea;

	// Calculate number of sheets/packages needed
	const materialCount = Math.ceil(roofArea / materialArea);
	const recommendedCount = Math.ceil(totalMaterialArea / materialArea);

	return {
		materialCount,
		materialArea: Math.round(materialArea * 100) / 100,
		totalMaterialArea: Math.round(totalMaterialArea * 100) / 100,
		reserveArea: Math.round(reserveArea * 100) / 100,
		recommendedCount,
	};
}

/**
 * Calculate roof weight
 */
export function calculateRoofWeight(
	roofArea: number,
	material: string
): {
	materialWeight: number;
	totalWeight: number;
} {
	const materialData = ROOF_MATERIALS[material];
	if (!materialData) {
		throw new Error(`Unsupported material: ${material}`);
	}

	const materialWeight = materialData.weightPerM2;
	const totalWeight = roofArea * materialWeight;

	return {
		materialWeight,
		totalWeight: Math.round(totalWeight * 100) / 100,
	};
}

/**
 * Main calculation function
 */
export function calculateRoof(input: RoofInput): RoofResult {
	const {
		houseLength,
		houseWidth,
		roofType,
		roofAngle,
		overhang,
		material,
		materialLength,
		materialWidth,
		reservePercentage,
		units,
	} = input;

	// Convert units if needed
	const lengthInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(houseLength)
			: houseLength;
	const widthInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(houseWidth)
			: houseWidth;
	const overhangInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(overhang)
			: overhang;

	// Calculate roof areas
	const areas = calculateRoofArea(
		lengthInMeters,
		widthInMeters,
		roofAngle,
		roofType,
		overhangInMeters
	);

	// Calculate material requirements
	const materialReqs = calculateMaterialRequirements(
		areas.roofArea,
		material,
		materialLength,
		materialWidth,
		reservePercentage,
		units
	);

	// Calculate weight
	const weight = calculateRoofWeight(areas.roofArea, material);

	// Get material and roof type data
	const materialData = ROOF_MATERIALS[material];
	const roofTypeData = ROOF_TYPES[roofType];

	return {
		roofType: roofTypeData.name,
		material: materialData.name,
		houseLength: lengthInMeters,
		houseWidth: widthInMeters,
		roofAngle,
		overhang: overhangInMeters,
		roofArea: areas.roofArea,
		effectiveArea: areas.effectiveArea,
		overhangArea: areas.overhangArea,
		materialCount: materialReqs.materialCount,
		materialArea: materialReqs.materialArea,
		totalMaterialArea: materialReqs.totalMaterialArea,
		materialWeight: weight.materialWeight,
		totalWeight: weight.totalWeight,
		reservePercentage,
		reserveArea: materialReqs.reserveArea,
		recommendedCount: materialReqs.recommendedCount,
		areaUnit: 'м²',
		weightUnit: 'кг',
		lengthUnit: units === 'centimeters' ? 'см' : 'м',
	};
}

/**
 * Validate input data
 */
export function validateRoofInput(input: Partial<RoofInput>): string[] {
	const errors: string[] = [];

	// House dimensions validation
	if (!input.houseLength || input.houseLength <= 0) {
		errors.push('Длина дома должна быть больше 0');
	}
	if (!input.houseWidth || input.houseWidth <= 0) {
		errors.push('Ширина дома должна быть больше 0');
	}

	// Roof type validation
	if (!input.roofType) {
		errors.push('Выберите тип крыши');
	}

	// Roof angle validation
	if (input.roofAngle === undefined || input.roofAngle <= 0) {
		errors.push('Угол наклона крыши должен быть больше 0°');
	}
	if (input.roofAngle && input.roofAngle > 60) {
		errors.push('Угол наклона крыши не может быть больше 60°');
	}

	// Overhang validation
	if (input.overhang !== undefined && input.overhang < 0) {
		errors.push('Свес не может быть отрицательным');
	}

	// Material validation
	if (!input.material) {
		errors.push('Выберите материал кровли');
	}

	// Material dimensions validation
	if (!input.materialLength || input.materialLength <= 0) {
		errors.push('Длина листа материала должна быть больше 0');
	}
	if (!input.materialWidth || input.materialWidth <= 0) {
		errors.push('Ширина листа материала должна быть больше 0');
	}

	// Reserve percentage validation
	if (input.reservePercentage === undefined || input.reservePercentage < 0) {
		errors.push('Запас материала должен быть неотрицательным');
	}
	if (input.reservePercentage && input.reservePercentage > 50) {
		errors.push('Запас материала не может быть больше 50%');
	}

	return errors;
}

/**
 * Get roof type options
 */
export function getRoofTypeOptions(t?: (key: string) => string): Array<{
	value: string;
	label: string;
	description: string;
	coefficient: number;
}> {
	return Object.entries(ROOF_TYPES).map(([key, type]) => ({
		value: key,
		label: t ? t(`options.roofTypes.${key}`) : type.name,
		description: t
			? t(`options.roofTypeDescriptions.${key}`)
			: type.description,
		coefficient: type.coefficient,
	}));
}

/**
 * Get roof material options
 */
export function getRoofMaterialOptions(t?: (key: string) => string): Array<{
	value: string;
	label: string;
	description: string;
	width: number;
	maxLength: number;
	weightPerM2: number;
	unit: string;
}> {
	return Object.entries(ROOF_MATERIALS).map(([key, material]) => ({
		value: key,
		label: t ? t(`options.materials.${key}`) : material.name,
		description: t
			? t(`options.materialDescriptions.${key}`)
			: material.description,
		width: material.width,
		maxLength: material.maxLength,
		weightPerM2: material.weightPerM2,
		unit: material.unit,
	}));
}

/**
 * Get default material dimensions
 */
export function getDefaultMaterialDimensions(
	material: string,
	units: 'meters' | 'centimeters' = 'meters'
): {
	length: number;
	width: number;
} {
	const materialData = ROOF_MATERIALS[material];
	if (!materialData) {
		return { length: 2, width: 1 };
	}

	// Convert to centimeters if needed
	if (units === 'centimeters') {
		return {
			length: convertMetersToCentimeters(materialData.maxLength),
			width: convertMetersToCentimeters(materialData.width),
		};
	}

	return {
		length: materialData.maxLength,
		width: materialData.width,
	};
}

/**
 * Format number for display
 */
export function formatRoofNumber(value: number, decimals: number = 2): string {
	return value.toFixed(decimals);
}
