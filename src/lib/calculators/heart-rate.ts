/**
 * Heart Rate Calculator Library
 *
 * Provides functionality for calculating heart rate zones and training recommendations.
 *
 * Features:
 * - Maximum heart rate calculation (220 - age formula)
 * - Heart rate zones calculation (resting, fat burning, aerobic, anaerobic, maximum)
 * - Zone boundaries calculation
 * - Current heart rate zone detection
 * - Training recommendations based on heart rate zone
 * - Input validation
 *
 * Heart rate zones:
 * - Resting: 50-60% of max HR (recovery and warm-up)
 * - Fat Burning: 60-70% of max HR (fat burning zone)
 * - Aerobic: 70-80% of max HR (cardio fitness)
 * - Anaerobic: 80-90% of max HR (high intensity)
 * - Maximum: 90-100% of max HR (maximum effort)
 *
 * Calculation method:
 * - Uses standard formula: HRmax = 220 - age
 * - Calculates zone boundaries as percentages of max HR
 * - Determines current zone based on heart rate percentage
 */

export interface HeartRateResult {
	maxHR: number;
	restingZone: { min: number; max: number };
	fatBurningZone: { min: number; max: number };
	aerobicZone: { min: number; max: number };
	anaerobicZone: { min: number; max: number };
	maximumZone: { min: number; max: number };
	zones: HeartRateZone[];
}

export interface HeartRateZone {
	name: string;
	percentage: string;
	min: number;
	max: number;
	color: string;
	description: string;
	benefits: string;
}

export interface HeartRateInput {
	age: number;
	currentHR?: number; // optional current heart rate
}

/**
 * Heart rate zones configuration
 */
export const HEART_RATE_ZONES = {
	resting: {
		name: 'resting',
		minPercent: 50,
		maxPercent: 60,
		color: 'blue',
		description: 'resting',
		benefits: 'restingBenefits',
	},
	fatBurning: {
		name: 'fatBurning',
		minPercent: 60,
		maxPercent: 70,
		color: 'green',
		description: 'fatBurning',
		benefits: 'fatBurningBenefits',
	},
	aerobic: {
		name: 'aerobic',
		minPercent: 70,
		maxPercent: 80,
		color: 'yellow',
		description: 'aerobic',
		benefits: 'aerobicBenefits',
	},
	anaerobic: {
		name: 'anaerobic',
		minPercent: 80,
		maxPercent: 90,
		color: 'orange',
		description: 'anaerobic',
		benefits: 'anaerobicBenefits',
	},
	maximum: {
		name: 'maximum',
		minPercent: 90,
		maxPercent: 100,
		color: 'red',
		description: 'maximum',
		benefits: 'maximumBenefits',
	},
} as const;

/**
 * Calculate maximum heart rate using the standard formula
 *
 * Uses the widely accepted formula: HRmax = 220 - age
 * This is a general estimation and may vary for individuals.
 *
 * @param age - Age in years (must be between 1 and 120)
 * @returns Maximum heart rate in beats per minute
 * @throws Error if age is out of valid range
 */
export function calculateMaxHeartRate(age: number): number {
	if (age <= 0 || age > 120) {
		throw new Error('Age must be between 1 and 120 years');
	}

	// Standard formula: HRmax = 220 - age
	return 220 - age;
}

/**
 * Calculate heart rate zone boundaries
 *
 * Calculates the minimum and maximum heart rate values for a zone
 * based on percentages of maximum heart rate.
 *
 * Formula:
 * - min = maxHR × (minPercent / 100)
 * - max = maxHR × (maxPercent / 100)
 *
 * @param maxHR - Maximum heart rate in beats per minute
 * @param minPercent - Minimum percentage of max HR (0-100)
 * @param maxPercent - Maximum percentage of max HR (0-100)
 * @returns Object with min and max heart rate values (rounded)
 */
export function calculateZoneBoundaries(
	maxHR: number,
	minPercent: number,
	maxPercent: number
): { min: number; max: number } {
	return {
		min: Math.round((maxHR * minPercent) / 100),
		max: Math.round((maxHR * maxPercent) / 100),
	};
}

/**
 * Determine which zone a given heart rate falls into
 *
 * Calculates the percentage of max HR and determines which zone
 * the current heart rate belongs to.
 *
 * Zone ranges:
 * - Below 50%: 'below'
 * - 50-60%: 'resting'
 * - 60-70%: 'fatBurning'
 * - 70-80%: 'aerobic'
 * - 80-90%: 'anaerobic'
 * - 90-100%: 'maximum'
 * - Above 100%: 'above'
 *
 * @param currentHR - Current heart rate in beats per minute
 * @param maxHR - Maximum heart rate in beats per minute
 * @returns Zone name string ('resting', 'fatBurning', etc.) or null if invalid
 */
export function getHeartRateZone(
	currentHR: number,
	maxHR: number
): string | null {
	const percentage = (currentHR / maxHR) * 100;

	if (percentage < 50) return 'below';
	if (percentage <= 60) return 'resting';
	if (percentage <= 70) return 'fatBurning';
	if (percentage <= 80) return 'aerobic';
	if (percentage <= 90) return 'anaerobic';
	if (percentage <= 100) return 'maximum';
	return 'above';
}

/**
 * Calculate all heart rate zones
 *
 * Generates an array of all heart rate zones with their boundaries,
 * colors, descriptions, and benefits.
 *
 * @param maxHR - Maximum heart rate in beats per minute
 * @returns Array of HeartRateZone objects with all zone information
 */
export function calculateAllZones(maxHR: number): HeartRateZone[] {
	return Object.values(HEART_RATE_ZONES).map((zone) => ({
		name: zone.name,
		percentage: `${zone.minPercent}–${zone.maxPercent}%`,
		min: Math.round((maxHR * zone.minPercent) / 100),
		max: Math.round((maxHR * zone.maxPercent) / 100),
		color: zone.color,
		description: zone.description,
		benefits: zone.benefits,
	}));
}

/**
 * Main function to calculate heart rate zones and recommendations
 *
 * Orchestrates the complete heart rate calculation process:
 * 1. Calculates maximum heart rate from age
 * 2. Calculates all heart rate zones
 * 3. Calculates individual zone boundaries
 * 4. Returns comprehensive result with all zones
 *
 * @param input - Heart rate input with age and optional current heart rate
 * @returns Complete heart rate analysis with all zones and boundaries
 */
export function calculateHeartRate(input: HeartRateInput): HeartRateResult {
	const maxHR = calculateMaxHeartRate(input.age);
	const zones = calculateAllZones(maxHR);

	return {
		maxHR,
		restingZone: calculateZoneBoundaries(maxHR, 50, 60),
		fatBurningZone: calculateZoneBoundaries(maxHR, 60, 70),
		aerobicZone: calculateZoneBoundaries(maxHR, 70, 80),
		anaerobicZone: calculateZoneBoundaries(maxHR, 80, 90),
		maximumZone: calculateZoneBoundaries(maxHR, 90, 100),
		zones,
	};
}

/**
 * Validate heart rate input values
 *
 * Performs validation checks:
 * - Age is between 1 and 120 years
 * - Current heart rate (if provided) is between 30 and 250 bpm
 *
 * @param age - Age in years
 * @param currentHR - Optional current heart rate in beats per minute
 * @returns Validation result with boolean status and optional error message key
 */
export function validateHeartRateInput(
	age: number,
	currentHR?: number
): { isValid: boolean; error?: string } {
	if (!age || age <= 0) {
		return { isValid: false, error: 'ageRequired' };
	}

	if (age < 1 || age > 120) {
		return { isValid: false, error: 'ageRange' };
	}

	if (currentHR !== undefined) {
		if (currentHR <= 0) {
			return { isValid: false, error: 'heartRateRequired' };
		}

		if (currentHR < 30 || currentHR > 250) {
			return { isValid: false, error: 'heartRateRange' };
		}
	}

	return { isValid: true };
}

/**
 * Get training recommendations based on current heart rate
 *
 * Determines which zone the current heart rate is in and returns
 * an appropriate training recommendation key for translation.
 *
 * @param currentHR - Current heart rate in beats per minute
 * @param result - Heart rate calculation result with max HR
 * @returns Training recommendation key string for translation
 */
export function getTrainingRecommendation(
	currentHR: number,
	result: HeartRateResult
): string {
	const zone = getHeartRateZone(currentHR, result.maxHR);

	switch (zone) {
		case 'below':
			return 'belowZone';
		case 'resting':
			return 'restingRecommendation';
		case 'fatBurning':
			return 'fatBurningRecommendation';
		case 'aerobic':
			return 'aerobicRecommendation';
		case 'anaerobic':
			return 'anaerobicRecommendation';
		case 'maximum':
			return 'maximumRecommendation';
		case 'above':
			return 'aboveZone';
		default:
			return 'unknownZone';
	}
}
