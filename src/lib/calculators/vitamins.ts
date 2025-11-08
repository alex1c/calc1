/**
 * Vitamins and Minerals Calculator
 * Calculates daily vitamin and mineral requirements based on age, gender, and activity level
 */

export interface VitaminInput {
	gender: 'male' | 'female';
	age: number;
	activityLevel: 'low' | 'medium' | 'high';
}

export interface VitaminData {
	name: string;
	unit: string;
	normalValue: number;
	role: string;
	increasedNeed: string;
	category: 'vitamin' | 'mineral';
}

export interface VitaminResult {
	vitamins: VitaminData[];
	minerals: VitaminData[];
	recommendations: string[];
	activityMultiplier: number;
}

/**
 * Base vitamin and mineral values (mg/day) for males and females
 */
const BASE_VALUES = {
	male: {
		// Vitamins
		vitaminA: 0.9,
		vitaminC: 90,
		vitaminD: 10,
		vitaminE: 15,
		vitaminB1: 1.2,
		vitaminB2: 1.3,
		vitaminB3: 16,
		vitaminB6: 1.3,
		vitaminB12: 2.4,
		folate: 400,
		// Minerals
		calcium: 1000,
		magnesium: 400,
		zinc: 11,
		iron: 8,
		potassium: 3500,
		iodine: 150,
		selenium: 55,
		phosphorus: 700,
	},
	female: {
		// Vitamins
		vitaminA: 0.7,
		vitaminC: 75,
		vitaminD: 10,
		vitaminE: 15,
		vitaminB1: 1.1,
		vitaminB2: 1.1,
		vitaminB3: 14,
		vitaminB6: 1.3,
		vitaminB12: 2.4,
		folate: 400,
		// Minerals
		calcium: 1000,
		magnesium: 310,
		zinc: 8,
		iron: 18,
		potassium: 2600,
		iodine: 150,
		selenium: 55,
		phosphorus: 700,
	},
};

/**
 * Activity level multipliers
 */
const ACTIVITY_MULTIPLIERS = {
	low: 1.0,
	medium: 1.1,
	high: 1.2,
};

/**
 * Vitamin and mineral information
 */
const VITAMIN_INFO = {
	vitaminA: {
		name: 'vitaminA',
		unit: 'mg',
		role: 'visionImmunity',
		increasedNeed: 'computerWork',
		category: 'vitamin' as const,
	},
	vitaminC: {
		name: 'vitaminC',
		unit: 'mg',
		role: 'immunityVessels',
		increasedNeed: 'stressColds',
		category: 'vitamin' as const,
	},
	vitaminD: {
		name: 'vitaminD',
		unit: 'mcg',
		role: 'bonesCalcium',
		increasedNeed: 'winterSun',
		category: 'vitamin' as const,
	},
	vitaminE: {
		name: 'vitaminE',
		unit: 'mg',
		role: 'antioxidantSkin',
		increasedNeed: 'sports',
		category: 'vitamin' as const,
	},
	vitaminB1: {
		name: 'vitaminB1',
		unit: 'mg',
		role: 'nervousSystem',
		increasedNeed: 'loads',
		category: 'vitamin' as const,
	},
	vitaminB2: {
		name: 'vitaminB2',
		unit: 'mg',
		role: 'energyMetabolism',
		increasedNeed: 'sports',
		category: 'vitamin' as const,
	},
	vitaminB3: {
		name: 'vitaminB3',
		unit: 'mg',
		role: 'energyProduction',
		increasedNeed: 'highActivity',
		category: 'vitamin' as const,
	},
	vitaminB6: {
		name: 'vitaminB6',
		unit: 'mg',
		role: 'proteinMetabolism',
		increasedNeed: 'proteinDiet',
		category: 'vitamin' as const,
	},
	vitaminB12: {
		name: 'vitaminB12',
		unit: 'mcg',
		role: 'bloodFormation',
		increasedNeed: 'vegetarianism',
		category: 'vitamin' as const,
	},
	folate: {
		name: 'folate',
		unit: 'mcg',
		role: 'cellDivision',
		increasedNeed: 'pregnancy',
		category: 'vitamin' as const,
	},
	calcium: {
		name: 'calcium',
		unit: 'mg',
		role: 'bonesTeeth',
		increasedNeed: 'pregnancy',
		category: 'mineral' as const,
	},
	magnesium: {
		name: 'magnesium',
		unit: 'mg',
		role: 'heartMuscles',
		increasedNeed: 'stress',
		category: 'mineral' as const,
	},
	zinc: {
		name: 'zinc',
		unit: 'mg',
		role: 'immunity',
		increasedNeed: 'activeTraining',
		category: 'mineral' as const,
	},
	iron: {
		name: 'iron',
		unit: 'mg',
		role: 'hemoglobin',
		increasedNeed: 'women',
		category: 'mineral' as const,
	},
	potassium: {
		name: 'potassium',
		unit: 'mg',
		role: 'heartPressure',
		increasedNeed: 'sweating',
		category: 'mineral' as const,
	},
	iodine: {
		name: 'iodine',
		unit: 'mcg',
		role: 'thyroid',
		increasedNeed: 'iodineDeficiency',
		category: 'mineral' as const,
	},
	selenium: {
		name: 'selenium',
		unit: 'mcg',
		role: 'antioxidant',
		increasedNeed: 'environmentalStress',
		category: 'mineral' as const,
	},
	phosphorus: {
		name: 'phosphorus',
		unit: 'mg',
		role: 'bonesEnergy',
		increasedNeed: 'highActivity',
		category: 'mineral' as const,
	},
};

/**
 * Validate input parameters for vitamin calculation
 */
/**
 * Validate vitamin calculation input
 * 
 * Checks that:
 * - Gender is specified (male or female)
 * - Age is between 1 and 120 years
 * - Activity level is specified (low, medium, or high)
 * 
 * @param input - Vitamin input to validate
 * @returns Validation result with boolean status and optional error message
 */
export function validateVitaminInput(input: VitaminInput): {
	isValid: boolean;
	error?: string;
} {
	const { gender, age, activityLevel } = input;

	// Check if gender is provided
	if (!gender) {
		return { isValid: false, error: 'genderRequired' };
	}

	// Check age range (1-120 years)
	if (age < 1 || age > 120) {
		return { isValid: false, error: 'ageRange' };
	}

	// Check if activity level is provided
	if (!activityLevel) {
		return { isValid: false, error: 'activityRequired' };
	}

	return { isValid: true };
}

/**
 * Calculate daily vitamin and mineral requirements
 * 
 * Calculates adjusted vitamin and mineral values based on:
 * - Gender (male/female) - affects base values
 * - Activity level (low/medium/high) - affects multiplier
 * - Age - affects recommendations
 * 
 * Algorithm:
 * 1. Get base values for gender
 * 2. Apply activity level multiplier
 * 3. Create vitamin and mineral data arrays
 * 4. Generate recommendations based on gender, age, and activity level
 * 
 * @param input - Vitamin input parameters (gender, age, activity level)
 * @returns Vitamin result with vitamins, minerals, recommendations, and multiplier
 */
export function calculateVitamins(input: VitaminInput): VitaminResult {
	const { gender, age, activityLevel } = input;

	// Get base values for gender
	const baseValues = BASE_VALUES[gender];
	const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];

	// Calculate adjusted values
	const adjustedValues = { ...baseValues };
	Object.keys(adjustedValues).forEach((key) => {
		adjustedValues[key as keyof typeof adjustedValues] *= multiplier;
	});

	// Create vitamin data
	const vitamins: VitaminData[] = [];
	const minerals: VitaminData[] = [];

	Object.entries(VITAMIN_INFO).forEach(([key, info]) => {
		const value = adjustedValues[key as keyof typeof adjustedValues];
		const vitaminData: VitaminData = {
			name: info.name,
			unit: info.unit,
			normalValue: Math.round(value * 100) / 100,
			role: info.role,
			increasedNeed: info.increasedNeed,
			category: info.category,
		};

		if (info.category === 'vitamin') {
			vitamins.push(vitaminData);
		} else {
			minerals.push(vitaminData);
		}
	});

	// Generate recommendations based on activity level and gender
	const recommendations: string[] = [];

	if (activityLevel === 'high') {
		recommendations.push('highActivityRecommendation');
	}

	if (gender === 'female') {
		recommendations.push('womenRecommendation');
	}

	if (age > 50) {
		recommendations.push('ageRecommendation');
	}

	if (activityLevel === 'low') {
		recommendations.push('lowActivityRecommendation');
	}

	return {
		vitamins,
		minerals,
		recommendations,
		activityMultiplier: multiplier,
	};
}

/**
 * Get color class for vitamin/mineral level
 */
export function getVitaminLevelColor(
	value: number,
	baseValue: number,
	multiplier: number
): 'normal' | 'increased' | 'deficient' {
	const adjustedBase = baseValue * multiplier;

	if (value >= adjustedBase * 0.9) {
		return 'normal';
	} else if (value >= adjustedBase * 0.7) {
		return 'increased';
	} else {
		return 'deficient';
	}
}

/**
 * Get Tailwind CSS color classes for vitamin/mineral level
 * 
 * Returns color classes for background, text, and border based on level:
 * - Normal: Green colors
 * - Increased: Yellow colors
 * - Deficient: Red colors
 * 
 * @param level - Vitamin/mineral level (normal, increased, deficient)
 * @returns Tailwind CSS color classes string
 */
export function getColorClasses(
	level: 'normal' | 'increased' | 'deficient'
): string {
	switch (level) {
		case 'normal':
			return 'bg-green-100 text-green-800 border-green-200';
		case 'increased':
			return 'bg-yellow-100 text-yellow-800 border-yellow-200';
		case 'deficient':
			return 'bg-red-100 text-red-800 border-red-200';
		default:
			return 'bg-gray-100 text-gray-800 border-gray-200';
	}
}

/**
 * Format vitamin/mineral value with unit for display
 * 
 * Formats value with appropriate unit (mcg, mg, etc.) in Russian locale.
 * 
 * @param value - Vitamin/mineral value
 * @param unit - Unit abbreviation (mcg, mg, etc.)
 * @returns Formatted string with value and unit
 */
export function formatVitaminValue(value: number, unit: string): string {
	if (unit === 'mcg') {
		return `${value} мкг`;
	} else if (unit === 'mg') {
		return `${value} мг`;
	}
	return `${value} ${unit}`;
}

/**
 * Get age-specific vitamin recommendations
 * 
 * Returns recommendation keys based on age ranges:
 * - < 18: Teenage recommendations
 * - 18-29: Young adult recommendations
 * - 30-49: Adult recommendations
 * - 50-64: Middle age recommendations
 * - ≥ 65: Elderly recommendations
 * 
 * @param age - Age in years
 * @returns Array of recommendation keys
 */
export function getAgeRecommendations(age: number): string[] {
	const recommendations: string[] = [];

	if (age < 18) {
		recommendations.push('teenageRecommendation');
	} else if (age >= 18 && age < 30) {
		recommendations.push('youngAdultRecommendation');
	} else if (age >= 30 && age < 50) {
		recommendations.push('adultRecommendation');
	} else if (age >= 50 && age < 65) {
		recommendations.push('middleAgeRecommendation');
	} else {
		recommendations.push('elderlyRecommendation');
	}

	return recommendations;
}

/**
 * Get activity-specific vitamin recommendations
 * 
 * Returns recommendation keys based on activity level:
 * - Low: Low activity tips
 * - Medium: Medium activity tips
 * - High: High activity tips
 * 
 * @param activityLevel - Activity level (low, medium, high)
 * @returns Array of recommendation keys
 */
export function getActivityRecommendations(activityLevel: string): string[] {
	const recommendations: string[] = [];

	switch (activityLevel) {
		case 'low':
			recommendations.push('lowActivityTips');
			break;
		case 'medium':
			recommendations.push('mediumActivityTips');
			break;
		case 'high':
			recommendations.push('highActivityTips');
			break;
	}

	return recommendations;
}
