// Concrete calculator
// Extensible architecture for different concrete grades

export interface ConcreteInput {
	// Volume
	volume: number; // in cubic meters
	volumeUnit: 'm3' | 'liters';

	// Concrete grade
	grade: string; // e.g., 'M100', 'M150', 'M200', etc.

	// Proportions (cement : sand : gravel)
	cementProportion: number;
	sandProportion: number;
	gravelProportion: number;

	// Water-cement ratio
	waterCementRatio: number; // default 0.5

	// Output units
	outputUnits: {
		cement: 'kg' | 'tons';
		sand: 'kg' | 'tons';
		gravel: 'kg' | 'tons';
		water: 'liters' | 'm3';
	};
}

export interface ConcreteResult {
	// Input data
	volume: number;
	volumeUnit: string;
	grade: string;

	// Calculated amounts
	cement: {
		amount: number;
		unit: string;
		bags: number; // 50kg bags
	};

	sand: {
		amount: number;
		unit: string;
	};

	gravel: {
		amount: number;
		unit: string;
	};

	water: {
		amount: number;
		unit: string;
	};

	// Proportions
	proportions: {
		cement: number;
		sand: number;
		gravel: number;
		water: number;
	};

	// Water-cement ratio
	waterCementRatio: number;
}

export interface ConcreteGrade {
	name: string;
	cement: number; // kg per m³
	sand: number; // kg per m³
	gravel: number; // kg per m³
	waterCementRatio: number;
	description: string;
}

// Concrete grades configuration
export const CONCRETE_GRADES: Record<string, ConcreteGrade> = {
	M100: {
		name: 'М100',
		cement: 220,
		sand: 780,
		gravel: 1080,
		waterCementRatio: 0.68,
		description: 'Бетон для ненагруженных конструкций',
	},
	M150: {
		name: 'М150',
		cement: 260,
		sand: 740,
		gravel: 1080,
		waterCementRatio: 0.66,
		description: 'Бетон для малонагруженных конструкций',
	},
	M200: {
		name: 'М200',
		cement: 280,
		sand: 730,
		gravel: 1250,
		waterCementRatio: 0.63,
		description: 'Бетон для фундаментов и стен',
	},
	M250: {
		name: 'М250',
		cement: 330,
		sand: 720,
		gravel: 1250,
		waterCementRatio: 0.58,
		description: 'Бетон для нагруженных конструкций',
	},
	M300: {
		name: 'М300',
		cement: 380,
		sand: 700,
		gravel: 1250,
		waterCementRatio: 0.55,
		description: 'Бетон для высоконагруженных конструкций',
	},
	M400: {
		name: 'М400',
		cement: 440,
		sand: 670,
		gravel: 1250,
		waterCementRatio: 0.5,
		description: 'Бетон для особо ответственных конструкций',
	},
};

/**
 * Convert volume from liters to cubic meters
 */
export function convertLitersToM3(liters: number): number {
	return liters / 1000;
}

/**
 * Convert volume from cubic meters to liters
 */
export function convertM3ToLiters(m3: number): number {
	return m3 * 1000;
}

/**
 * Convert weight from kg to tons
 */
export function convertKgToTons(kg: number): number {
	return kg / 1000;
}

/**
 * Convert weight from tons to kg
 */
export function convertTonsToKg(tons: number): number {
	return tons * 1000;
}

/**
 * Calculate concrete components
 */
export function calculateConcrete(input: ConcreteInput): ConcreteResult {
	const {
		volume,
		volumeUnit,
		grade,
		cementProportion,
		sandProportion,
		gravelProportion,
		waterCementRatio,
		outputUnits,
	} = input;

	// Convert volume to cubic meters
	const volumeM3 =
		volumeUnit === 'liters' ? convertLitersToM3(volume) : volume;

	// Get concrete grade data
	const gradeData = CONCRETE_GRADES[grade];
	if (!gradeData) {
		throw new Error(`Unsupported concrete grade: ${grade}`);
	}

	// Calculate total proportion
	const totalProportion =
		cementProportion + sandProportion + gravelProportion;

	// Calculate amounts per m³
	const cementPerM3 = (gradeData.cement * cementProportion) / totalProportion;
	const sandPerM3 = (gradeData.sand * sandProportion) / totalProportion;
	const gravelPerM3 = (gradeData.gravel * gravelProportion) / totalProportion;
	const waterPerM3 = cementPerM3 * waterCementRatio;

	// Calculate total amounts
	const totalCement = cementPerM3 * volumeM3;
	const totalSand = sandPerM3 * volumeM3;
	const totalGravel = gravelPerM3 * volumeM3;
	const totalWater = waterPerM3 * volumeM3;

	// Convert to output units
	const cementAmount =
		outputUnits.cement === 'tons'
			? convertKgToTons(totalCement)
			: totalCement;
	const sandAmount =
		outputUnits.sand === 'tons' ? convertKgToTons(totalSand) : totalSand;
	const gravelAmount =
		outputUnits.gravel === 'tons'
			? convertKgToTons(totalGravel)
			: totalGravel;
	const waterAmount =
		outputUnits.water === 'm3' ? convertLitersToM3(totalWater) : totalWater;

	// Calculate bags (50kg each)
	const cementBags = Math.ceil(totalCement / 50);

	return {
		volume: volumeM3,
		volumeUnit: 'м³',
		grade: gradeData.name,
		cement: {
			amount: Math.round(cementAmount * 100) / 100,
			unit: outputUnits.cement === 'tons' ? 'т' : 'кг',
			bags: cementBags,
		},
		sand: {
			amount: Math.round(sandAmount * 100) / 100,
			unit: outputUnits.sand === 'tons' ? 'т' : 'кг',
		},
		gravel: {
			amount: Math.round(gravelAmount * 100) / 100,
			unit: outputUnits.gravel === 'tons' ? 'т' : 'кг',
		},
		water: {
			amount: Math.round(waterAmount * 100) / 100,
			unit: outputUnits.water === 'm3' ? 'м³' : 'л',
		},
		proportions: {
			cement: cementProportion,
			sand: sandProportion,
			gravel: gravelProportion,
			water: waterCementRatio,
		},
		waterCementRatio,
	};
}

/**
 * Validate input data
 */
export function validateConcreteInput(input: Partial<ConcreteInput>): string[] {
	const errors: string[] = [];

	// Volume validation
	if (!input.volume || input.volume <= 0) {
		errors.push('Объём бетона должен быть больше 0');
	}

	// Grade validation
	if (!input.grade) {
		errors.push('Выберите марку бетона');
	}

	// Proportions validation
	if (!input.cementProportion || input.cementProportion <= 0) {
		errors.push('Пропорция цемента должна быть больше 0');
	}
	if (!input.sandProportion || input.sandProportion <= 0) {
		errors.push('Пропорция песка должна быть больше 0');
	}
	if (!input.gravelProportion || input.gravelProportion <= 0) {
		errors.push('Пропорция щебня должна быть больше 0');
	}

	// Water-cement ratio validation
	if (input.waterCementRatio === undefined || input.waterCementRatio <= 0) {
		errors.push('Водоцементное соотношение должно быть больше 0');
	}
	if (input.waterCementRatio && input.waterCementRatio > 1) {
		errors.push('Водоцементное соотношение не может быть больше 1');
	}

	return errors;
}

/**
 * Get concrete grade options
 */
export function getConcreteGradeOptions(): Array<{
	value: string;
	label: string;
	description: string;
	cement: number;
	sand: number;
	gravel: number;
	waterCementRatio: number;
}> {
	return Object.entries(CONCRETE_GRADES).map(([key, grade]) => ({
		value: key,
		label: grade.name,
		description: grade.description,
		cement: grade.cement,
		sand: grade.sand,
		gravel: grade.gravel,
		waterCementRatio: grade.waterCementRatio,
	}));
}

/**
 * Get default proportions for a concrete grade
 */
export function getDefaultProportions(grade: string): {
	cement: number;
	sand: number;
	gravel: number;
	waterCementRatio: number;
} {
	const gradeData = CONCRETE_GRADES[grade];
	if (!gradeData) {
		return { cement: 1, sand: 3, gravel: 5, waterCementRatio: 0.5 };
	}

	// Calculate proportions based on grade data
	const total = gradeData.cement + gradeData.sand + gradeData.gravel;
	const cement = Math.round((gradeData.cement / total) * 10) / 10;
	const sand = Math.round((gradeData.sand / total) * 10) / 10;
	const gravel = Math.round((gradeData.gravel / total) * 10) / 10;

	return {
		cement,
		sand,
		gravel,
		waterCementRatio: gradeData.waterCementRatio,
	};
}

/**
 * Format number for display
 */
export function formatConcreteNumber(
	value: number,
	decimals: number = 2
): string {
	return value.toFixed(decimals);
}
