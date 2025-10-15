/**
 * Calories calculator library
 * Calculates BMR, TDEE, and food calories
 */

import foodsData from '@/data/foods.json';

/**
 * Activity level multipliers for TDEE calculation
 */
export const activityMultipliers = {
	minimal: 1.2, // Sedentary (little or no exercise)
	light: 1.375, // Light activity (light exercise 1-3 days/week)
	moderate: 1.55, // Moderate activity (moderate exercise 3-5 days/week)
	high: 1.725, // High activity (hard exercise 6-7 days/week)
	extreme: 1.9, // Very high activity (very hard exercise, physical job)
};

/**
 * Activity level types
 */
export type ActivityLevel = keyof typeof activityMultipliers;

/**
 * Gender types
 */
export type Gender = 'male' | 'female';

/**
 * Food data interface
 */
export interface FoodData {
	name: string | { ru: string; en: string; es: string; de: string };
	kcal: number;
	protein: number;
	fat: number;
	carbs: number;
}

/**
 * BMR calculation result
 */
export interface BMRResult {
	bmr: number;
	tdee: number;
	weightLoss: number; // -15% of TDEE
	weightMaintenance: number; // TDEE
	weightGain: number; // +15% of TDEE
}

/**
 * Food calculation result
 */
export interface FoodResult {
	food: FoodData;
	weight: number;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
}

/**
 * Calculate BMR using Harris-Benedict revised formula
 * @param gender - Male or female
 * @param age - Age in years
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @returns BMR in calories per day
 */
export function calculateBMR(
	gender: Gender,
	age: number,
	weight: number,
	height: number
): number {
	if (gender === 'male') {
		// Men: BMR = 88.36 + (13.4 × weight) + (4.8 × height) − (5.7 × age)
		return 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
	} else {
		// Women: BMR = 447.6 + (9.2 × weight) + (3.1 × height) − (4.3 × age)
		return 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
	}
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * @param bmr - Basal Metabolic Rate
 * @param activityLevel - Activity level multiplier
 * @returns TDEE in calories per day
 */
export function calculateTDEE(
	bmr: number,
	activityLevel: ActivityLevel
): number {
	return bmr * activityMultipliers[activityLevel];
}

/**
 * Calculate complete calorie needs
 * @param gender - Male or female
 * @param age - Age in years
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @param activityLevel - Activity level
 * @returns Complete BMR result with recommendations
 */
export function calculateCalorieNeeds(
	gender: Gender,
	age: number,
	weight: number,
	height: number,
	activityLevel: ActivityLevel
): BMRResult {
	const bmr = calculateBMR(gender, age, weight, height);
	const tdee = calculateTDEE(bmr, activityLevel);

	return {
		bmr: Math.round(bmr),
		tdee: Math.round(tdee),
		weightLoss: Math.round(tdee * 0.85), // -15%
		weightMaintenance: Math.round(tdee),
		weightGain: Math.round(tdee * 1.15), // +15%
	};
}

/**
 * Get all available foods
 * @returns Object with all food data
 */
export function getAllFoods(): Record<string, FoodData> {
	return foodsData as Record<string, FoodData>;
}

/**
 * Search foods by name
 * @param query - Search query
 * @param locale - Locale for search
 * @returns Array of matching foods
 */
export function searchFoods(
	query: string,
	locale: string = 'ru'
): Array<{ key: string; data: FoodData }> {
	if (!query.trim()) return [];

	const foods = getAllFoods();
	const lowercaseQuery = query.toLowerCase();

	return Object.entries(foods)
		.filter(([key, data]) => {
			const localizedName = getLocalizedFoodName(data, locale);
			return (
				localizedName.toLowerCase().includes(lowercaseQuery) ||
				key.toLowerCase().includes(lowercaseQuery)
			);
		})
		.map(([key, data]) => ({ key, data }))
		.slice(0, 10); // Limit to 10 results
}

/**
 * Get food by key
 * @param key - Food key
 * @returns Food data or null if not found
 */
export function getFoodByKey(key: string): FoodData | null {
	const foods = getAllFoods();
	return foods[key] || null;
}

/**
 * Calculate food calories and macronutrients
 * @param foodKey - Food key
 * @param weight - Weight in grams
 * @returns Food calculation result
 */
export function calculateFoodCalories(
	foodKey: string,
	weight: number
): FoodResult | null {
	const food = getFoodByKey(foodKey);
	if (!food) return null;

	// Calculate per gram values
	const caloriesPerGram = food.kcal / 100;
	const proteinPerGram = food.protein / 100;
	const fatPerGram = food.fat / 100;
	const carbsPerGram = food.carbs / 100;

	return {
		food,
		weight,
		calories: Math.round(caloriesPerGram * weight * 10) / 10,
		protein: Math.round(proteinPerGram * weight * 10) / 10,
		fat: Math.round(fatPerGram * weight * 10) / 10,
		carbs: Math.round(carbsPerGram * weight * 10) / 10,
	};
}

/**
 * Validate BMR calculation input
 * @param gender - Gender
 * @param age - Age
 * @param weight - Weight
 * @param height - Height
 * @param activityLevel - Activity level
 * @returns Validation result
 */
export function validateBMRInput(
	gender: Gender,
	age: number,
	weight: number,
	height: number,
	activityLevel: ActivityLevel
): { isValid: boolean; error?: string } {
	if (age < 1 || age > 120) {
		return { isValid: false, error: 'Age must be between 1 and 120 years' };
	}

	if (weight < 20 || weight > 300) {
		return {
			isValid: false,
			error: 'Weight must be between 20 and 300 kg',
		};
	}

	if (height < 50 || height > 250) {
		return {
			isValid: false,
			error: 'Height must be between 50 and 250 cm',
		};
	}

	if (!Object.keys(activityMultipliers).includes(activityLevel)) {
		return { isValid: false, error: 'Invalid activity level' };
	}

	return { isValid: true };
}

/**
 * Validate food calculation input
 * @param foodKey - Food key
 * @param weight - Weight in grams
 * @returns Validation result
 */
export function validateFoodInput(
	foodKey: string,
	weight: number
): { isValid: boolean; error?: string } {
	if (!foodKey.trim()) {
		return { isValid: false, error: 'Please select a food' };
	}

	if (!getFoodByKey(foodKey)) {
		return { isValid: false, error: 'Food not found' };
	}

	if (weight <= 0 || weight > 10000) {
		return {
			isValid: false,
			error: 'Weight must be between 1 and 10000 grams',
		};
	}

	return { isValid: true };
}

/**
 * Format number for display
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string
 */
export function formatCalorieNumber(num: number, decimals: number = 1): string {
	return num.toFixed(decimals);
}

/**
 * Get activity level description
 * @param level - Activity level
 * @returns Description string
 */
export function getActivityDescription(level: ActivityLevel): string {
	const descriptions = {
		minimal: 'Sedentary (little or no exercise)',
		light: 'Light activity (light exercise 1-3 days/week)',
		moderate: 'Moderate activity (moderate exercise 3-5 days/week)',
		high: 'High activity (hard exercise 6-7 days/week)',
		extreme: 'Very high activity (very hard exercise, physical job)',
	};
	return descriptions[level];
}

/**
 * Get localized food name
 * @param food - Food data
 * @param locale - Locale code
 * @returns Localized food name
 */
export function getLocalizedFoodName(
	food: FoodData,
	locale: string = 'ru'
): string {
	if (typeof food.name === 'string') {
		return food.name;
	}
	return food.name[locale as keyof typeof food.name] || food.name.ru;
}

/**
 * Get popular foods for quick selection
 * @returns Array of popular food keys
 */
export function getPopularFoods(): string[] {
	return [
		'apple',
		'banana',
		'chicken_breast',
		'rice',
		'egg',
		'bread',
		'potato',
		'milk',
		'cheese',
		'olive_oil',
	];
}
