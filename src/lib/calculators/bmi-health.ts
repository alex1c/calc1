/**
 * BMI Health Calculator Library
 * Calculates Body Mass Index and provides health recommendations
 */

export interface BMIResult {
	bmi: number;
	category: string;
	description: string;
	recommendation: string;
	color: string;
	normalWeightRange: {
		min: number;
		max: number;
	};
}

export interface BMIInput {
	weight: number; // in kg
	height: number; // in cm
}

/**
 * BMI categories according to WHO standards
 */
export const BMI_CATEGORIES = {
	underweight: {
		label: 'underweight',
		min: 0,
		max: 18.4,
		color: 'blue',
		description: 'underweight',
		recommendation: 'weightGain',
	},
	normal: {
		label: 'normal',
		min: 18.5,
		max: 24.9,
		color: 'green',
		description: 'normal',
		recommendation: 'maintain',
	},
	overweight: {
		label: 'overweight',
		min: 25.0,
		max: 29.9,
		color: 'yellow',
		description: 'overweight',
		recommendation: 'weightLoss',
	},
	obese1: {
		label: 'obese1',
		min: 30.0,
		max: 34.9,
		color: 'orange',
		description: 'obese1',
		recommendation: 'weightLoss',
	},
	obese2: {
		label: 'obese2',
		min: 35.0,
		max: 39.9,
		color: 'red',
		description: 'obese2',
		recommendation: 'weightLoss',
	},
	obese3: {
		label: 'obese3',
		min: 40.0,
		max: Infinity,
		color: 'red',
		description: 'obese3',
		recommendation: 'weightLoss',
	},
} as const;

/**
 * Calculate BMI from weight and height
 * @param weight - Weight in kilograms
 * @param height - Height in centimeters
 * @returns BMI value rounded to 1 decimal place
 */
export function calculateBMI(weight: number, height: number): number {
	if (weight <= 0 || height <= 0) {
		throw new Error('Weight and height must be positive numbers');
	}

	// Convert height from cm to meters
	const heightInMeters = height / 100;

	// Calculate BMI: weight(kg) / height(m)²
	const bmi = weight / (heightInMeters * heightInMeters);

	// Round to 1 decimal place
	return Math.round(bmi * 10) / 10;
}

/**
 * Determine BMI category and get related information
 * @param bmi - BMI value
 * @returns BMI category information
 */
export function getBMICategory(
	bmi: number
): (typeof BMI_CATEGORIES)[keyof typeof BMI_CATEGORIES] {
	if (bmi < BMI_CATEGORIES.normal.min) {
		return BMI_CATEGORIES.underweight;
	} else if (bmi <= BMI_CATEGORIES.normal.max) {
		return BMI_CATEGORIES.normal;
	} else if (bmi <= BMI_CATEGORIES.overweight.max) {
		return BMI_CATEGORIES.overweight;
	} else if (bmi <= BMI_CATEGORIES.obese1.max) {
		return BMI_CATEGORIES.obese1;
	} else if (bmi <= BMI_CATEGORIES.obese2.max) {
		return BMI_CATEGORIES.obese2;
	} else {
		return BMI_CATEGORIES.obese3;
	}
}

/**
 * Calculate normal weight range for given height
 * @param height - Height in centimeters
 * @returns Normal weight range in kg
 */
export function getNormalWeightRange(height: number): {
	min: number;
	max: number;
} {
	const heightInMeters = height / 100;
	const minWeight =
		BMI_CATEGORIES.normal.min * heightInMeters * heightInMeters;
	const maxWeight =
		BMI_CATEGORIES.normal.max * heightInMeters * heightInMeters;

	return {
		min: Math.round(minWeight * 10) / 10,
		max: Math.round(maxWeight * 10) / 10,
	};
}

/**
 * Main function to calculate BMI and get complete result
 * @param input - Weight and height input
 * @returns Complete BMI result with category and recommendations
 */
export function calculateBMIHealth(input: BMIInput): BMIResult {
	const bmi = calculateBMI(input.weight, input.height);
	const category = getBMICategory(bmi);
	const normalWeightRange = getNormalWeightRange(input.height);

	return {
		bmi,
		category: category.label,
		description: category.description,
		recommendation: category.recommendation,
		color: category.color,
		normalWeightRange,
	};
}

/**
 * Validate input values
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @returns Validation result with error message if invalid
 */
export function validateBMIInput(
	weight: number,
	height: number
): { isValid: boolean; error?: string } {
	if (!weight || weight <= 0) {
		return { isValid: false, error: 'weightRequired' };
	}

	if (!height || height <= 0) {
		return { isValid: false, error: 'heightRequired' };
	}

	if (weight < 20 || weight > 300) {
		return { isValid: false, error: 'weightRange' };
	}

	if (height < 100 || height > 250) {
		return { isValid: false, error: 'heightRange' };
	}

	return { isValid: true };
}
