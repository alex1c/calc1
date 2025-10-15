/**
 * Food Ration Calculator Library
 * Calculates daily macronutrient needs (proteins, fats, carbohydrates)
 * Based on Harris-Benedict formula and activity level
 */

export interface BJUInput {
	gender: 'male' | 'female';
	age: number;
	weight: number;
	height: number;
	activityLevel: ActivityLevel;
	goal: Goal;
}

export type ActivityLevel =
	| 'minimal'
	| 'light'
	| 'moderate'
	| 'high'
	| 'extreme';

export type Goal = 'lose' | 'maintain' | 'gain';

export interface BJUResult {
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	bmr: number;
	tdee: number;
	goalMultiplier: number;
}

// Activity level multipliers
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
	minimal: 1.2, // Sedentary
	light: 1.375, // Light activity 1-3 times per week
	moderate: 1.55, // Moderate activity 3-5 times per week
	high: 1.725, // High activity 6-7 times per week
	extreme: 1.9, // Extreme activity daily
};

// Goal multipliers
const GOAL_MULTIPLIERS: Record<Goal, number> = {
	lose: 0.85, // Weight loss (15% deficit)
	maintain: 1.0, // Maintenance
	gain: 1.15, // Weight gain (15% surplus)
};

/**
 * Calculate Basal Metabolic Rate using Harris-Benedict formula (revised)
 */
export function calculateBMR(input: BJUInput): number {
	const { gender, weight, height, age } = input;

	if (gender === 'male') {
		return 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
	} else {
		return 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
	}
}

/**
 * Calculate Total Daily Energy Expenditure
 */
export function calculateTDEE(
	bmr: number,
	activityLevel: ActivityLevel
): number {
	return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
}

/**
 * Calculate macronutrient distribution
 */
export function calculateMacronutrients(
	weight: number,
	calories: number
): { protein: number; fat: number; carbs: number } {
	// Protein: 1.8g per kg of body weight
	const protein = 1.8 * weight;

	// Fat: 0.9g per kg of body weight
	const fat = 0.9 * weight;

	// Carbohydrates: remaining calories
	// Protein: 4 kcal/g, Fat: 9 kcal/g, Carbs: 4 kcal/g
	const proteinCalories = protein * 4;
	const fatCalories = fat * 9;
	const remainingCalories = calories - proteinCalories - fatCalories;
	const carbs = Math.max(0, remainingCalories / 4);

	return { protein, fat, carbs };
}

/**
 * Main function to calculate BJU needs
 */
export function calculateBJU(input: BJUInput): BJUResult {
	// Validate input
	const validation = validateBJUInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	// Calculate BMR
	const bmr = calculateBMR(input);

	// Calculate TDEE
	const tdee = calculateTDEE(bmr, input.activityLevel);

	// Apply goal multiplier
	const goalMultiplier = GOAL_MULTIPLIERS[input.goal];
	const calories = Math.round(tdee * goalMultiplier);

	// Calculate macronutrients
	const { protein, fat, carbs } = calculateMacronutrients(
		input.weight,
		calories
	);

	return {
		calories,
		protein: Math.round(protein * 10) / 10,
		fat: Math.round(fat * 10) / 10,
		carbs: Math.round(carbs * 10) / 10,
		bmr: Math.round(bmr),
		tdee: Math.round(tdee),
		goalMultiplier,
	};
}

/**
 * Validate input parameters
 */
export function validateBJUInput(input: BJUInput): {
	isValid: boolean;
	error?: string;
} {
	if (!input.gender || !['male', 'female'].includes(input.gender)) {
		return { isValid: false, error: 'Invalid gender' };
	}

	if (!input.age || input.age < 1 || input.age > 120) {
		return { isValid: false, error: 'Age must be between 1 and 120 years' };
	}

	if (!input.weight || input.weight < 20 || input.weight > 300) {
		return {
			isValid: false,
			error: 'Weight must be between 20 and 300 kg',
		};
	}

	if (!input.height || input.height < 100 || input.height > 250) {
		return {
			isValid: false,
			error: 'Height must be between 100 and 250 cm',
		};
	}

	if (
		!input.activityLevel ||
		!Object.keys(ACTIVITY_MULTIPLIERS).includes(input.activityLevel)
	) {
		return { isValid: false, error: 'Invalid activity level' };
	}

	if (!input.goal || !Object.keys(GOAL_MULTIPLIERS).includes(input.goal)) {
		return { isValid: false, error: 'Invalid goal' };
	}

	return { isValid: true };
}

/**
 * Get activity level description
 */
export function getActivityDescription(level: ActivityLevel): string {
	const descriptions = {
		minimal: 'Sedentary lifestyle',
		light: 'Light activity 1-3 times per week',
		moderate: 'Moderate activity 3-5 times per week',
		high: 'High activity 6-7 times per week',
		extreme: 'Extreme activity daily',
	};
	return descriptions[level];
}

/**
 * Get goal description
 */
export function getGoalDescription(goal: Goal): string {
	const descriptions = {
		lose: 'Weight loss (15% calorie deficit)',
		maintain: 'Weight maintenance',
		gain: 'Weight gain (15% calorie surplus)',
	};
	return descriptions[goal];
}

/**
 * Format number with proper decimal places
 */
export function formatBJUNumber(value: number, decimals: number = 1): string {
	return value.toFixed(decimals);
}

/**
 * Get macronutrient color for charts
 */
export function getMacronutrientColor(
	macro: 'protein' | 'fat' | 'carbs'
): string {
	const colors = {
		protein: '#3B82F6', // Blue
		fat: '#EF4444', // Red
		carbs: '#10B981', // Green
	};
	return colors[macro];
}
