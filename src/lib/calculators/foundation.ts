// Foundation calculator
// Calculates materials for different foundation types

export type FoundationType = 'strip' | 'slab' | 'columnar';

export interface FoundationInput {
	// Foundation type
	foundationType: FoundationType;

	// Dimensions (for strip foundation)
	length?: number; // meters
	width?: number; // meters
	height?: number; // meters
	wallThickness?: number; // meters (for strip foundation)

	// Dimensions (for slab foundation)
	slabLength?: number; // meters
	slabWidth?: number; // meters
	slabThickness?: number; // meters

	// Dimensions (for columnar foundation)
	columnCount?: number;
	columnLength?: number; // meters
	columnWidth?: number; // meters
	columnHeight?: number; // meters

	// Concrete grade
	concreteGrade: string; // e.g., 'M200', 'M250', 'M300'

	// Reinforcement
	rebarDiameter: number; // millimeters
	rebarSpacing: number; // centimeters
	rebarLayers: number; // number of reinforcement layers

	// Reserve
	reservePercentage: number; // percentage reserve for materials
}

export interface FoundationResult {
	// Foundation type
	foundationType: FoundationType;

	// Dimensions
	length?: number;
	width?: number;
	height?: number;
	wallThickness?: number;
	slabLength?: number;
	slabWidth?: number;
	slabThickness?: number;
	columnCount?: number;
	columnLength?: number;
	columnWidth?: number;
	columnHeight?: number;

	// Volume calculations
	totalVolume: number; // m³
	concreteVolume: number; // m³
	concreteVolumeWithReserve: number; // m³

	// Reinforcement calculations
	rebarLength: number; // meters
	rebarWeight: number; // kg
	rebarWeightWithReserve: number; // kg
	rebarCount: number; // pieces

	// Formwork calculations
	formworkArea: number; // m²

	// Material amounts (based on concrete grade)
	cement: {
		amount: number; // kg
		bags: number; // 50kg bags
	};
	sand: {
		amount: number; // kg
	};
	gravel: {
		amount: number; // kg
	};
	water: {
		amount: number; // liters
	};

	// Concrete grade
	concreteGrade: string;
}

// Concrete grade data (from concrete.ts)
const CONCRETE_GRADES: Record<
	string,
	{
		cement: number; // kg per m³
		sand: number; // kg per m³
		gravel: number; // kg per m³
		waterCementRatio: number;
	}
> = {
	M200: {
		cement: 280,
		sand: 730,
		gravel: 1250,
		waterCementRatio: 0.63,
	},
	M250: {
		cement: 330,
		sand: 720,
		gravel: 1250,
		waterCementRatio: 0.58,
	},
	M300: {
		cement: 380,
		sand: 700,
		gravel: 1250,
		waterCementRatio: 0.55,
	},
};

// Rebar weight per meter (kg/m) for different diameters
const REBAR_WEIGHT: Record<number, number> = {
	6: 0.222,
	8: 0.395,
	10: 0.617,
	12: 0.888,
	14: 1.21,
	16: 1.58,
	18: 2.0,
	20: 2.47,
	22: 2.98,
	25: 3.85,
};

/**
 * Calculate strip foundation volume
 */
function calculateStripVolume(
	length: number,
	width: number,
	height: number,
	wallThickness: number
): number {
	// Outer dimensions
	const outerVolume = length * width * height;
	// Inner dimensions (subtract wall thickness)
	const innerLength = length - 2 * wallThickness;
	const innerWidth = width - 2 * wallThickness;
	const innerVolume = innerLength * innerWidth * height;
	// Total volume is outer volume minus inner volume
	return outerVolume - innerVolume;
}

/**
 * Calculate slab foundation volume
 */
function calculateSlabVolume(
	length: number,
	width: number,
	thickness: number
): number {
	return length * width * thickness;
}

/**
 * Calculate columnar foundation volume
 */
function calculateColumnarVolume(
	count: number,
	length: number,
	width: number,
	height: number
): number {
	const singleColumnVolume = length * width * height;
	return singleColumnVolume * count;
}

/**
 * Calculate reinforcement for foundation
 */
function calculateReinforcement(
	volume: number,
	diameter: number,
	spacing: number,
	layers: number
): {
	length: number;
	weight: number;
	count: number;
} {
	// Approximate calculation: rebar length per m³ of concrete
	// Based on typical reinforcement density
	const rebarDensity = 100; // meters per m³ (approximate)
	const totalLength = volume * rebarDensity * layers;

	// Get weight per meter
	const weightPerMeter = REBAR_WEIGHT[diameter] || 0.617; // default to 10mm
	const totalWeight = totalLength * weightPerMeter;

	// Calculate number of bars (assume 12m standard length)
	const standardLength = 12; // meters
	const count = Math.ceil(totalLength / standardLength);

	return {
		length: Math.round(totalLength * 100) / 100,
		weight: Math.round(totalWeight * 100) / 100,
		count,
	};
}

/**
 * Calculate formwork area
 */
function calculateFormworkArea(
	foundationType: FoundationType,
	input: FoundationInput
): number {
	if (foundationType === 'strip') {
		const { length = 0, width = 0, height = 0 } = input;
		// Calculate perimeter × height
		const perimeter = 2 * (length + width);
		return perimeter * height * 2; // both sides (inner and outer)
	} else if (foundationType === 'slab') {
		const { slabLength = 0, slabWidth = 0, slabThickness = 0 } = input;
		// Side walls area
		const perimeter = 2 * (slabLength + slabWidth);
		return perimeter * slabThickness;
	} else {
		// Columnar
		const {
			columnCount = 0,
			columnLength = 0,
			columnWidth = 0,
			columnHeight = 0,
		} = input;
		// Perimeter of one column × height × count
		const perimeter = 2 * (columnLength + columnWidth);
		return perimeter * columnHeight * columnCount;
	}
}

/**
 * Calculate materials from concrete volume
 */
function calculateMaterials(
	volume: number,
	grade: string
): {
	cement: number;
	sand: number;
	gravel: number;
	water: number;
} {
	const gradeData = CONCRETE_GRADES[grade] || CONCRETE_GRADES.M200;

	return {
		cement: volume * gradeData.cement,
		sand: volume * gradeData.sand,
		gravel: volume * gradeData.gravel,
		water: volume * gradeData.cement * gradeData.waterCementRatio * 1000, // convert to liters
	};
}

/**
 * Main calculation function
 */
export function calculateFoundation(input: FoundationInput): FoundationResult {
	const {
		foundationType,
		concreteGrade,
		rebarDiameter,
		rebarSpacing,
		rebarLayers,
		reservePercentage,
	} = input;

	let concreteVolume = 0;

	// Calculate volume based on foundation type
	if (foundationType === 'strip') {
		const { length = 0, width = 0, height = 0, wallThickness = 0 } = input;
		concreteVolume = calculateStripVolume(
			length,
			width,
			height,
			wallThickness
		);
	} else if (foundationType === 'slab') {
		const { slabLength = 0, slabWidth = 0, slabThickness = 0 } = input;
		concreteVolume = calculateSlabVolume(
			slabLength,
			slabWidth,
			slabThickness
		);
	} else {
		// Columnar
		const {
			columnCount = 0,
			columnLength = 0,
			columnWidth = 0,
			columnHeight = 0,
		} = input;
		concreteVolume = calculateColumnarVolume(
			columnCount,
			columnLength,
			columnWidth,
			columnHeight
		);
	}

	// Add reserve
	const concreteVolumeWithReserve =
		concreteVolume * (1 + reservePercentage / 100);

	// Calculate reinforcement
	const reinforcement = calculateReinforcement(
		concreteVolumeWithReserve,
		rebarDiameter,
		rebarSpacing,
		rebarLayers
	);

	// Calculate formwork
	const formworkArea = calculateFormworkArea(foundationType, input);

	// Calculate materials
	const materials = calculateMaterials(
		concreteVolumeWithReserve,
		concreteGrade
	);

	// Calculate cement bags
	const cementBags = Math.ceil(materials.cement / 50);

	return {
		foundationType,
		length: input.length,
		width: input.width,
		height: input.height,
		wallThickness: input.wallThickness,
		slabLength: input.slabLength,
		slabWidth: input.slabWidth,
		slabThickness: input.slabThickness,
		columnCount: input.columnCount,
		columnLength: input.columnLength,
		columnWidth: input.columnWidth,
		columnHeight: input.columnHeight,
		totalVolume: Math.round(concreteVolume * 100) / 100,
		concreteVolume: Math.round(concreteVolume * 100) / 100,
		concreteVolumeWithReserve:
			Math.round(concreteVolumeWithReserve * 100) / 100,
		rebarLength: reinforcement.length,
		rebarWeight: Math.round(reinforcement.weight * 100) / 100,
		rebarWeightWithReserve: Math.round(reinforcement.weight * 100) / 100,
		rebarCount: reinforcement.count,
		formworkArea: Math.round(formworkArea * 100) / 100,
		cement: {
			amount: Math.round(materials.cement * 100) / 100,
			bags: cementBags,
		},
		sand: {
			amount: Math.round(materials.sand * 100) / 100,
		},
		gravel: {
			amount: Math.round(materials.gravel * 100) / 100,
		},
		water: {
			amount: Math.round(materials.water * 100) / 100,
		},
		concreteGrade,
	};
}

/**
 * Validate input data
 */
export function validateFoundationInput(
	input: Partial<FoundationInput>
): string[] {
	const errors: string[] = [];

	if (!input.foundationType) {
		errors.push('Выберите тип фундамента');
		return errors;
	}

	if (input.foundationType === 'strip') {
		if (!input.length || input.length <= 0) {
			errors.push('Длина фундамента должна быть больше 0');
		}
		if (!input.width || input.width <= 0) {
			errors.push('Ширина фундамента должна быть больше 0');
		}
		if (!input.height || input.height <= 0) {
			errors.push('Высота фундамента должна быть больше 0');
		}
		if (!input.wallThickness || input.wallThickness <= 0) {
			errors.push('Толщина стены должна быть больше 0');
		}
	} else if (input.foundationType === 'slab') {
		if (!input.slabLength || input.slabLength <= 0) {
			errors.push('Длина плиты должна быть больше 0');
		}
		if (!input.slabWidth || input.slabWidth <= 0) {
			errors.push('Ширина плиты должна быть больше 0');
		}
		if (!input.slabThickness || input.slabThickness <= 0) {
			errors.push('Толщина плиты должна быть больше 0');
		}
	} else if (input.foundationType === 'columnar') {
		if (!input.columnCount || input.columnCount <= 0) {
			errors.push('Количество столбов должно быть больше 0');
		}
		if (!input.columnLength || input.columnLength <= 0) {
			errors.push('Длина столба должна быть больше 0');
		}
		if (!input.columnWidth || input.columnWidth <= 0) {
			errors.push('Ширина столба должна быть больше 0');
		}
		if (!input.columnHeight || input.columnHeight <= 0) {
			errors.push('Высота столба должна быть больше 0');
		}
	}

	if (!input.concreteGrade) {
		errors.push('Выберите марку бетона');
	}

	if (!input.rebarDiameter || input.rebarDiameter <= 0) {
		errors.push('Диаметр арматуры должен быть больше 0');
	}

	if (!input.rebarSpacing || input.rebarSpacing <= 0) {
		errors.push('Шаг арматуры должен быть больше 0');
	}

	if (!input.rebarLayers || input.rebarLayers <= 0) {
		errors.push('Количество слоёв арматуры должно быть больше 0');
	}

	if (
		input.reservePercentage === undefined ||
		input.reservePercentage < 0 ||
		input.reservePercentage > 100
	) {
		errors.push('Запас должен быть от 0 до 100%');
	}

	return errors;
}

/**
 * Get foundation type options
 */
export function getFoundationTypeOptions(): Array<{
	value: FoundationType;
	label: string;
}> {
	return [
		{ value: 'strip', label: 'Ленточный' },
		{ value: 'slab', label: 'Плитный' },
		{ value: 'columnar', label: 'Столбчатый' },
	];
}

/**
 * Get concrete grade options
 */
export function getFoundationConcreteGrades(): Array<{
	value: string;
	label: string;
}> {
	return [
		{ value: 'M200', label: 'М200' },
		{ value: 'M250', label: 'М250' },
		{ value: 'M300', label: 'М300' },
	];
}

/**
 * Get rebar diameter options
 */
export function getRebarDiameterOptions(): Array<{
	value: number;
	label: string;
}> {
	return [
		{ value: 8, label: '8 мм' },
		{ value: 10, label: '10 мм' },
		{ value: 12, label: '12 мм' },
		{ value: 14, label: '14 мм' },
		{ value: 16, label: '16 мм' },
		{ value: 18, label: '18 мм' },
		{ value: 20, label: '20 мм' },
	];
}
