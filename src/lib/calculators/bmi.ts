/**
 * BMI Calculator Library
 * 
 * Provides comprehensive Body Mass Index (BMI) calculation functionality.
 * BMI is a measure of body fat based on height and weight that applies
 * to adult men and women.
 * 
 * Formula: BMI = weight (kg) / height (m)²
 * 
 * Features:
 * - BMI calculation with validation
 * - WHO standard category classification
 * - Normal weight range calculation
 * - Visual scale generation for UI
 * - Color-coded categories for display
 * - Interpretation text generation
 * 
 * Categories follow WHO (World Health Organization) standards:
 * - Underweight: BMI < 18.5
 * - Normal: BMI 18.5-24.9
 * - Overweight: BMI 25-29.9
 * - Obesity Class I: BMI 30-34.9
 * - Obesity Class II: BMI 35-39.9
 * - Obesity Class III: BMI ≥ 40
 */

/**
 * BMI categories according to WHO standards
 * 
 * Defines the ranges and colors for each BMI category.
 * Used for classification and UI display purposes.
 */
export const bmiCategories = {
	underweight: { min: 0, max: 18.4, color: 'blue' },
	normal: { min: 18.5, max: 24.9, color: 'green' },
	overweight: { min: 25, max: 29.9, color: 'yellow' },
	obese1: { min: 30, max: 34.9, color: 'orange' },
	obese2: { min: 35, max: 39.9, color: 'red' },
	obese3: { min: 40, max: 999, color: 'red' },
} as const;

/**
 * BMI category types
 */
export type BMICategory = keyof typeof bmiCategories;

/**
 * Gender types
 */
export type Gender = 'male' | 'female';

/**
 * BMI calculation result
 */
export interface BMIResult {
	bmi: number;
	category: BMICategory;
	normalWeightRange: {
		min: number;
		max: number;
	};
	color: string;
}

/**
 * Calculate BMI (Body Mass Index)
 * 
 * Calculates BMI using the standard formula: BMI = weight (kg) / height (m)²
 * 
 * Input requirements:
 * - Weight: in kilograms (kg)
 * - Height: in centimeters (cm) - converted to meters internally
 * 
 * The result is rounded to 1 decimal place for readability.
 * 
 * @param weight - Weight in kilograms (must be positive)
 * @param height - Height in centimeters (must be positive)
 * @returns BMI value rounded to 1 decimal place
 * @throws Error if height or weight is not positive
 */
export function calculateBMI(weight: number, height: number): number {
	if (height <= 0 || weight <= 0) {
		throw new Error('Height and weight must be positive numbers');
	}

	// Convert height from cm to meters for calculation
	const heightInMeters = height / 100;

	// BMI formula: weight divided by height squared
	const bmi = weight / (heightInMeters * heightInMeters);

	// Round to 1 decimal place for display
	return Math.round(bmi * 10) / 10;
}

/**
 * Determine BMI category
 * @param bmi - BMI value
 * @returns BMI category
 */
export function getBMICategory(bmi: number): BMICategory {
	if (bmi < 18.5) return 'underweight';
	if (bmi < 25) return 'normal';
	if (bmi < 30) return 'overweight';
	if (bmi < 35) return 'obese1';
	if (bmi < 40) return 'obese2';
	return 'obese3';
}

/**
 * Get normal weight range for given height
 * @param height - Height in cm
 * @returns Normal weight range in kg
 */
export function getNormalWeightRange(height: number): {
	min: number;
	max: number;
} {
	if (height <= 0) {
		throw new Error('Height must be a positive number');
	}

	// Convert height from cm to meters
	const heightInMeters = height / 100;

	// Normal BMI range is 18.5 - 24.9
	const minWeight = 18.5 * (heightInMeters * heightInMeters);
	const maxWeight = 24.9 * (heightInMeters * heightInMeters);

	return {
		min: Math.round(minWeight * 10) / 10,
		max: Math.round(maxWeight * 10) / 10,
	};
}

/**
 * Calculate complete BMI result
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @param gender - Gender (optional, for future use)
 * @returns Complete BMI result with category and normal range
 */
export function calculateBMIResult(
	weight: number,
	height: number,
	gender?: Gender
): BMIResult {
	const bmi = calculateBMI(weight, height);
	const category = getBMICategory(bmi);
	const normalWeightRange = getNormalWeightRange(height);
	const color = bmiCategories[category].color;

	return {
		bmi,
		category,
		normalWeightRange,
		color,
	};
}

/**
 * Validate BMI calculation input
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @returns Validation result
 */
export function validateBMIInput(
	weight: number,
	height: number
): { isValid: boolean; error?: string } {
	if (isNaN(weight) || !isFinite(weight)) {
		return { isValid: false, error: 'Weight must be a valid number' };
	}

	if (isNaN(height) || !isFinite(height)) {
		return { isValid: false, error: 'Height must be a valid number' };
	}

	if (weight <= 0) {
		return { isValid: false, error: 'Weight must be greater than 0' };
	}

	if (height <= 0) {
		return { isValid: false, error: 'Height must be greater than 0' };
	}

	if (weight > 300) {
		return { isValid: false, error: 'Weight must be less than 300 kg' };
	}

	if (height > 250) {
		return { isValid: false, error: 'Height must be less than 250 cm' };
	}

	return { isValid: true };
}

/**
 * Get BMI category color for UI
 * @param category - BMI category
 * @returns Color class for Tailwind CSS
 */
export function getBMICategoryColor(category: BMICategory): string {
	const colors = {
		underweight: 'text-blue-600 bg-blue-50 border-blue-200',
		normal: 'text-green-600 bg-green-50 border-green-200',
		overweight: 'text-yellow-600 bg-yellow-50 border-yellow-200',
		obese1: 'text-orange-600 bg-orange-50 border-orange-200',
		obese2: 'text-red-600 bg-red-50 border-red-200',
		obese3: 'text-red-700 bg-red-100 border-red-300',
	};

	return colors[category];
}

/**
 * Get BMI category color for dark mode
 * @param category - BMI category
 * @returns Color class for Tailwind CSS (dark mode)
 */
export function getBMICategoryColorDark(category: BMICategory): string {
	const colors = {
		underweight: 'text-blue-400 bg-blue-900/20 border-blue-800',
		normal: 'text-green-400 bg-green-900/20 border-green-800',
		overweight: 'text-yellow-400 bg-yellow-900/20 border-yellow-800',
		obese1: 'text-orange-400 bg-orange-900/20 border-orange-800',
		obese2: 'text-red-400 bg-red-900/20 border-red-800',
		obese3: 'text-red-300 bg-red-900/30 border-red-700',
	};

	return colors[category];
}

/**
 * Get BMI scale data for visualization
 * @returns Array of scale segments with colors and ranges
 */
export function getBMIScale(): Array<{
	label: string;
	min: number;
	max: number;
	color: string;
	width: number;
}> {
	return [
		{
			label: '< 18.5',
			min: 0,
			max: 18.4,
			color: 'bg-blue-500',
			width: 18.5,
		},
		{
			label: '18.5-24.9',
			min: 18.5,
			max: 24.9,
			color: 'bg-green-500',
			width: 6.5,
		},
		{
			label: '25-29.9',
			min: 25,
			max: 29.9,
			color: 'bg-yellow-500',
			width: 5,
		},
		{
			label: '30-34.9',
			min: 30,
			max: 34.9,
			color: 'bg-orange-500',
			width: 5,
		},
		{
			label: '35-39.9',
			min: 35,
			max: 39.9,
			color: 'bg-red-500',
			width: 5,
		},
		{
			label: '40+',
			min: 40,
			max: 50,
			color: 'bg-red-600',
			width: 10,
		},
	];
}

/**
 * Get BMI interpretation text
 * @param category - BMI category
 * @param bmi - BMI value
 * @returns Interpretation text
 */
export function getBMIInterpretation(
	category: BMICategory,
	bmi: number
): string {
	const interpretations = {
		underweight: `Your BMI of ${bmi} indicates you are underweight. Consider consulting a healthcare provider for guidance on healthy weight gain.`,
		normal: `Your BMI of ${bmi} is within the normal range. This is associated with good health outcomes.`,
		overweight: `Your BMI of ${bmi} indicates you are overweight. Consider lifestyle changes to achieve a healthier weight.`,
		obese1: `Your BMI of ${bmi} indicates Class I obesity. Consider consulting a healthcare provider for weight management strategies.`,
		obese2: `Your BMI of ${bmi} indicates Class II obesity. It's recommended to consult a healthcare provider for comprehensive weight management.`,
		obese3: `Your BMI of ${bmi} indicates Class III obesity. It's strongly recommended to consult a healthcare provider for medical supervision.`,
	};

	return interpretations[category];
}

/**
 * Format BMI value for display
 * @param bmi - BMI value
 * @returns Formatted BMI string
 */
export function formatBMI(bmi: number): string {
	return bmi.toFixed(1);
}

/**
 * Get BMI category description
 * @param category - BMI category
 * @returns Category description
 */
export function getBMICategoryDescription(category: BMICategory): string {
	const descriptions = {
		underweight: 'Underweight',
		normal: 'Normal weight',
		overweight: 'Overweight',
		obese1: 'Obesity Class I',
		obese2: 'Obesity Class II',
		obese3: 'Obesity Class III',
	};

	return descriptions[category];
}
