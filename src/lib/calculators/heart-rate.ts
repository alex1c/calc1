/**
 * Heart Rate Calculator Library
 * Calculates heart rate zones and training recommendations
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
 * @param age - Age in years
 * @returns Maximum heart rate (220 - age)
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
 * @param maxHR - Maximum heart rate
 * @param minPercent - Minimum percentage of max HR
 * @param maxPercent - Maximum percentage of max HR
 * @returns Zone boundaries
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
 * @param currentHR - Current heart rate
 * @param maxHR - Maximum heart rate
 * @returns Zone name or null if outside normal range
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
 * @param maxHR - Maximum heart rate
 * @returns Array of heart rate zones with boundaries
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
 * @param input - Age and optional current heart rate
 * @returns Complete heart rate analysis
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
 * Validate input values
 * @param age - Age in years
 * @param currentHR - Optional current heart rate
 * @returns Validation result with error message if invalid
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
 * @param currentHR - Current heart rate
 * @param result - Heart rate calculation result
 * @returns Training recommendation
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
