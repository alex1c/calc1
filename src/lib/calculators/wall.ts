/**
 * Wall Calculator Library
 * 
 * Provides functionality for calculating brick and block quantities for walls.
 * 
 * Features:
 * - Multiple material types (single/double/triple brick, gas block, foam block)
 * - Wall dimensions input (length, height, thickness)
 * - Material dimensions input
 * - Joint thickness consideration
 * - Reserve percentage calculation
 * - Mortar/glue volume calculation
 * - Cost calculation (optional)
 * - Unit conversion (meters/centimeters)
 * 
 * Calculation method:
 * - Calculates wall area and volume
 * - Calculates material volume per piece
 * - Calculates number of pieces needed (with joint thickness adjustment)
 * - Applies reserve percentage
 * - Calculates mortar/glue volume
 * - Calculates costs if price provided
 */

export interface WallInput {
	// Wall dimensions
	wallLength: number; // in meters
	wallHeight: number; // in meters
	wallThickness: number; // in bricks/blocks (0.5, 1, 1.5, 2)

	// Material
	materialType:
		| 'single-brick'
		| 'double-brick'
		| 'triple-brick'
		| 'gas-block'
		| 'foam-block';
	materialLength: number; // in mm
	materialWidth: number; // in mm
	materialHeight: number; // in mm

	// Mortar/glue
	jointThickness: number; // in mm, default 10

	// Reserve and pricing
	reservePercentage: number; // default 5%
	pricePerUnit?: number; // optional price per piece

	// Units
	units: 'meters' | 'centimeters';
}

export interface WallResult {
	// Input data
	wallLength: number;
	wallHeight: number;
	wallThickness: number;
	materialType: string;
	materialDimensions: string;

	// Calculated areas and volumes
	wallArea: number; // total wall area in m²
	wallVolume: number; // wall volume in m³
	materialVolume: number; // volume of one piece in m³
	totalMaterialVolume: number; // total material volume in m³

	// Material quantities
	materialCount: number; // pieces needed without reserve
	materialCountWithReserve: number; // pieces needed with reserve
	reserveCount: number; // additional pieces for reserve

	// Mortar/glue calculations
	mortarVolume: number; // mortar/glue volume in m³
	mortarVolumeLiters: number; // mortar/glue volume in liters

	// Cost calculations
	totalCost?: number; // total cost if price provided
	costPerSquareMeter?: number; // cost per m² if price provided

	// Units
	areaUnit: string;
	volumeUnit: string;
	lengthUnit: string;
}

export interface WallMaterial {
	name: string;
	length: number; // in mm
	width: number; // in mm
	height: number; // in mm
	piecesPerM2: number; // pieces per m² for 1 brick thickness
	description: string;
	category: 'brick' | 'block';
}

// Wall materials configuration
export const WALL_MATERIALS: Record<string, WallMaterial> = {
	'single-brick': {
		name: 'Кирпич одинарный',
		length: 250,
		width: 120,
		height: 65,
		piecesPerM2: 51,
		description: 'Стандартный одинарный кирпич',
		category: 'brick',
	},
	'double-brick': {
		name: 'Кирпич полуторный',
		length: 250,
		width: 120,
		height: 88,
		piecesPerM2: 39,
		description: 'Полуторный кирпич увеличенной высоты',
		category: 'brick',
	},
	'triple-brick': {
		name: 'Кирпич двойной',
		length: 250,
		width: 120,
		height: 138,
		piecesPerM2: 26,
		description: 'Двойной кирпич для быстрой кладки',
		category: 'brick',
	},
	'gas-block': {
		name: 'Газоблок 600×200×300',
		length: 600,
		width: 200,
		height: 300,
		piecesPerM2: 16.7,
		description: 'Газобетонный блок для стен',
		category: 'block',
	},
	'foam-block': {
		name: 'Пеноблок 600×300×200',
		length: 600,
		width: 300,
		height: 200,
		piecesPerM2: 8.3,
		description: 'Пенобетонный блок для стен',
		category: 'block',
	},
};

/**
 * Convert millimeters to meters
 */
export function convertMmToMeters(mm: number): number {
	return mm / 1000;
}

/**
 * Convert meters to millimeters
 */
export function convertMetersToMm(meters: number): number {
	return meters * 1000;
}

/**
 * Convert centimeters to meters
 */
export function convertCentimetersToMeters(cm: number): number {
	return cm / 100;
}

/**
 * Convert meters to centimeters
 */
export function convertMetersToCentimeters(meters: number): number {
	return meters * 100;
}

/**
 * Calculate wall area
 */
export function calculateWallArea(length: number, height: number): number {
	return length * height;
}

/**
 * Calculate wall volume
 */
export function calculateWallVolume(
	length: number,
	height: number,
	thickness: number,
	materialHeight: number
): number {
	// Convert thickness from bricks/blocks to meters
	const thicknessInMeters = thickness * (materialHeight / 1000);
	return length * height * thicknessInMeters;
}

/**
 * Calculate material volume per piece
 * 
 * Calculates volume of one brick/block piece.
 * Converts dimensions from mm to meters.
 * 
 * Formula: Volume = Length × Width × Height (in meters)
 * 
 * @param length - Material length in mm
 * @param width - Material width in mm
 * @param height - Material height in mm
 * @returns Material volume in m³
 */
export function calculateMaterialVolume(
	length: number,
	width: number,
	height: number
): number {
	// Convert mm to meters
	const lengthM = length / 1000;
	const widthM = width / 1000;
	const heightM = height / 1000;
	return lengthM * widthM * heightM;
}

/**
 * Calculate number of material pieces needed for wall
 * 
 * Calculates pieces needed based on:
 * - Wall area
 * - Wall thickness (in bricks/blocks)
 * - Material pieces per m² (for 1 brick thickness)
 * - Joint thickness adjustment
 * 
 * Formula: Count = Wall Area × Pieces per m² × Thickness × Joint Factor
 * 
 * @param wallArea - Wall area in m²
 * @param wallThickness - Wall thickness in bricks/blocks
 * @param material - Material data with piecesPerM2
 * @param jointThickness - Joint thickness in mm
 * @returns Number of material pieces needed (rounded up)
 */
export function calculateMaterialCount(
	wallArea: number,
	wallThickness: number,
	material: WallMaterial,
	jointThickness: number
): number {
	// Calculate pieces per m² for given thickness
	const piecesPerM2 = material.piecesPerM2 * wallThickness;

	// Adjust for joint thickness (simplified calculation)
	const jointFactor = 1 + jointThickness / 1000 / (material.height / 1000);

	return Math.ceil(wallArea * piecesPerM2 * jointFactor);
}

/**
 * Calculate mortar/glue volume needed
 * 
 * Calculates mortar volume as the difference between wall volume
 * and total material volume.
 * 
 * Formula: Mortar Volume = Wall Volume - (Material Volume × Piece Count)
 * 
 * @param wallVolume - Total wall volume in m³
 * @param materialVolume - Volume of one material piece in m³
 * @param materialCount - Number of material pieces
 * @returns Mortar/glue volume in m³
 */
export function calculateMortarVolume(
	wallVolume: number,
	materialVolume: number,
	materialCount: number
): number {
	// Mortar volume = wall volume - material volume
	const totalMaterialVolume = materialVolume * materialCount;
	return Math.max(0, wallVolume - totalMaterialVolume);
}

/**
 * Calculate wall materials and costs
 * 
 * Orchestrates the complete wall calculation process:
 * 1. Converts units if needed (centimeters to meters)
 * 2. Calculates wall area and volume
 * 3. Calculates material volume per piece
 * 4. Calculates number of pieces needed (with joint thickness adjustment)
 * 5. Applies reserve percentage
 * 6. Calculates mortar/glue volume
 * 7. Calculates costs if price provided
 * 
 * @param input - Wall input parameters including dimensions, material, and units
 * @returns Complete wall calculation result with quantities, volumes, and costs
 */
export function calculateWall(input: WallInput): WallResult {
	const {
		wallLength,
		wallHeight,
		wallThickness,
		materialType,
		materialLength,
		materialWidth,
		materialHeight,
		jointThickness,
		reservePercentage,
		pricePerUnit,
		units,
	} = input;

	// Convert units if needed
	const lengthInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(wallLength)
			: wallLength;
	const heightInMeters =
		units === 'centimeters'
			? convertCentimetersToMeters(wallHeight)
			: wallHeight;

	// Get material data
	const materialData = WALL_MATERIALS[materialType];
	if (!materialData) {
		throw new Error(`Unsupported material type: ${materialType}`);
	}

	// Calculate areas and volumes
	const wallArea = calculateWallArea(lengthInMeters, heightInMeters);
	const wallVolume = calculateWallVolume(
		lengthInMeters,
		heightInMeters,
		wallThickness,
		materialHeight
	);
	const materialVolume = calculateMaterialVolume(
		materialLength,
		materialWidth,
		materialHeight
	);

	// Calculate material count
	const materialCount = calculateMaterialCount(
		wallArea,
		wallThickness,
		materialData,
		jointThickness
	);
	const reserveCount = Math.ceil((materialCount * reservePercentage) / 100);
	const materialCountWithReserve = materialCount + reserveCount;

	// Calculate total material volume
	const totalMaterialVolume = materialVolume * materialCount;

	// Calculate mortar volume
	const mortarVolume = calculateMortarVolume(
		wallVolume,
		materialVolume,
		materialCount
	);
	const mortarVolumeLiters = mortarVolume * 1000; // Convert m³ to liters

	// Calculate costs if price provided
	let totalCost: number | undefined;
	let costPerSquareMeter: number | undefined;

	if (pricePerUnit) {
		totalCost = materialCountWithReserve * pricePerUnit;
		costPerSquareMeter = totalCost / wallArea;
	}

	return {
		wallLength: lengthInMeters,
		wallHeight: heightInMeters,
		wallThickness,
		materialType: materialData.name,
		materialDimensions: `${materialLength}×${materialWidth}×${materialHeight} мм`,
		wallArea: Math.round(wallArea * 100) / 100,
		wallVolume: Math.round(wallVolume * 1000) / 1000,
		materialVolume: Math.round(materialVolume * 1000000) / 1000000,
		totalMaterialVolume: Math.round(totalMaterialVolume * 1000) / 1000,
		materialCount,
		materialCountWithReserve,
		reserveCount,
		mortarVolume: Math.round(mortarVolume * 1000) / 1000,
		mortarVolumeLiters: Math.round(mortarVolumeLiters),
		totalCost: totalCost ? Math.round(totalCost * 100) / 100 : undefined,
		costPerSquareMeter: costPerSquareMeter
			? Math.round(costPerSquareMeter * 100) / 100
			: undefined,
		areaUnit: 'м²',
		volumeUnit: 'м³',
		lengthUnit: units === 'centimeters' ? 'см' : 'м',
	};
}

/**
 * Validate wall calculation input
 * 
 * Performs validation checks:
 * - Wall dimensions are positive
 * - Wall thickness is between 0 and 3 bricks/blocks
 * - Material type is specified
 * - Material dimensions are positive
 * - Joint thickness is non-negative and not too large (max 50mm)
 * - Reserve percentage is between 0 and 50
 * 
 * @param input - Partial wall input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateWallInput(input: Partial<WallInput>): string[] {
	const errors: string[] = [];

	// Wall dimensions validation
	if (!input.wallLength || input.wallLength <= 0) {
		errors.push('Длина стены должна быть больше 0');
	}
	if (!input.wallHeight || input.wallHeight <= 0) {
		errors.push('Высота стены должна быть больше 0');
	}

	// Wall thickness validation
	if (input.wallThickness === undefined || input.wallThickness <= 0) {
		errors.push('Толщина стены должна быть больше 0');
	}
	if (input.wallThickness && input.wallThickness > 3) {
		errors.push('Толщина стены не может быть больше 3 кирпичей/блоков');
	}

	// Material type validation
	if (!input.materialType) {
		errors.push('Выберите тип материала');
	}

	// Material dimensions validation
	if (!input.materialLength || input.materialLength <= 0) {
		errors.push('Длина материала должна быть больше 0');
	}
	if (!input.materialWidth || input.materialWidth <= 0) {
		errors.push('Ширина материала должна быть больше 0');
	}
	if (!input.materialHeight || input.materialHeight <= 0) {
		errors.push('Высота материала должна быть больше 0');
	}

	// Joint thickness validation
	if (input.jointThickness === undefined || input.jointThickness < 0) {
		errors.push('Толщина шва должна быть неотрицательной');
	}
	if (input.jointThickness && input.jointThickness > 50) {
		errors.push('Толщина шва не может быть больше 50 мм');
	}

	// Reserve percentage validation
	if (input.reservePercentage === undefined || input.reservePercentage < 0) {
		errors.push('Запас материала должен быть неотрицательным');
	}
	if (input.reservePercentage && input.reservePercentage > 50) {
		errors.push('Запас материала не может быть больше 50%');
	}

	// Price validation
	if (input.pricePerUnit !== undefined && input.pricePerUnit < 0) {
		errors.push('Цена за единицу не может быть отрицательной');
	}

	return errors;
}

/**
 * Get wall material options
 */
export function getWallMaterialOptions(t?: (key: string) => string): Array<{
	value: string;
	label: string;
	description: string;
	length: number;
	width: number;
	height: number;
	category: string;
}> {
	return Object.entries(WALL_MATERIALS).map(([key, material]) => ({
		value: key,
		label: t ? t(`options.materials.${key}`) : material.name,
		description: t
			? t(`options.materialDescriptions.${key}`)
			: material.description,
		length: material.length,
		width: material.width,
		height: material.height,
		category: material.category,
	}));
}

/**
 * Get default material dimensions
 */
export function getDefaultMaterialDimensions(materialType: string): {
	length: number;
	width: number;
	height: number;
} {
	const materialData = WALL_MATERIALS[materialType];
	if (!materialData) {
		return { length: 250, width: 120, height: 65 };
	}

	return {
		length: materialData.length,
		width: materialData.width,
		height: materialData.height,
	};
}

/**
 * Get wall thickness options
 */
export function getWallThicknessOptions(t?: (key: string) => string): Array<{
	value: number;
	label: string;
	description: string;
}> {
	return [
		{
			value: 0.5,
			label: t ? t('options.thickness.half') : '0.5 кирпича',
			description: t
				? t('options.thicknessDescriptions.half')
				: 'В полкирпича',
		},
		{
			value: 1,
			label: t ? t('options.thickness.single') : '1 кирпич',
			description: t
				? t('options.thicknessDescriptions.single')
				: 'В кирпич',
		},
		{
			value: 1.5,
			label: t ? t('options.thickness.onehalf') : '1.5 кирпича',
			description: t
				? t('options.thicknessDescriptions.onehalf')
				: 'В полтора кирпича',
		},
		{
			value: 2,
			label: t ? t('options.thickness.double') : '2 кирпича',
			description: t
				? t('options.thicknessDescriptions.double')
				: 'В два кирпича',
		},
	];
}

/**
 * Format number for display
 */
export function formatWallNumber(value: number, decimals: number = 2): string {
	return value.toFixed(decimals);
}
