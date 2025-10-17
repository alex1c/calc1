/**
 * Blood Pressure Calculator Library
 * Calculates blood pressure categories and provides health recommendations
 */

export interface BloodPressureResult {
	category: string;
	description: string;
	recommendation: string;
	color: string;
	riskLevel: string;
	normalRange: {
		systolic: { min: number; max: number };
		diastolic: { min: number; max: number };
	};
}

export interface BloodPressureInput {
	age: number;
	systolic: number; // upper pressure
	diastolic: number; // lower pressure
}

export interface AgeRange {
	min: number;
	max: number;
	normalSystolic: { min: number; max: number };
	normalDiastolic: { min: number; max: number };
	comment: string;
}

/**
 * Blood pressure categories configuration
 */
export const BLOOD_PRESSURE_CATEGORIES = {
	hypotension: {
		name: 'hypotension',
		color: 'blue',
		description: 'hypotension',
		recommendation: 'hypotensionRecommendation',
		riskLevel: 'low',
	},
	normal: {
		name: 'normal',
		color: 'green',
		description: 'normal',
		recommendation: 'normalRecommendation',
		riskLevel: 'low',
	},
	prehypertension: {
		name: 'prehypertension',
		color: 'yellow',
		description: 'prehypertension',
		recommendation: 'prehypertensionRecommendation',
		riskLevel: 'moderate',
	},
	hypertension1: {
		name: 'hypertension1',
		color: 'orange',
		description: 'hypertension1',
		recommendation: 'hypertension1Recommendation',
		riskLevel: 'high',
	},
	hypertension2: {
		name: 'hypertension2',
		color: 'red',
		description: 'hypertension2',
		recommendation: 'hypertension2Recommendation',
		riskLevel: 'veryHigh',
	},
	hypertension3: {
		name: 'hypertension3',
		color: 'red',
		description: 'hypertension3',
		recommendation: 'hypertension3Recommendation',
		riskLevel: 'critical',
	},
} as const;

/**
 * Age-based normal blood pressure ranges
 */
export const AGE_RANGES: AgeRange[] = [
	{
		min: 20,
		max: 30,
		normalSystolic: { min: 110, max: 125 },
		normalDiastolic: { min: 70, max: 80 },
		comment: 'excellent',
	},
	{
		min: 30,
		max: 40,
		normalSystolic: { min: 120, max: 130 },
		normalDiastolic: { min: 75, max: 85 },
		comment: 'normal',
	},
	{
		min: 40,
		max: 50,
		normalSystolic: { min: 125, max: 135 },
		normalDiastolic: { min: 80, max: 88 },
		comment: 'slightIncrease',
	},
	{
		min: 50,
		max: 60,
		normalSystolic: { min: 130, max: 140 },
		normalDiastolic: { min: 80, max: 90 },
		comment: 'monitor',
	},
	{
		min: 60,
		max: 120,
		normalSystolic: { min: 135, max: 145 },
		normalDiastolic: { min: 85, max: 90 },
		comment: 'moderateIncrease',
	},
];

/**
 * Determine blood pressure category based on systolic and diastolic values
 * @param systolic - Systolic blood pressure
 * @param diastolic - Diastolic blood pressure
 * @returns Blood pressure category
 */
export function getBloodPressureCategory(
	systolic: number,
	diastolic: number
): string {
	// Check for hypotension
	if (systolic < 100 || diastolic < 60) {
		return 'hypotension';
	}

	// Check for normal pressure
	if (systolic <= 130 && diastolic <= 85) {
		return 'normal';
	}

	// Check for prehypertension
	if (systolic <= 140 && diastolic <= 90) {
		return 'prehypertension';
	}

	// Check for hypertension grade 1
	if (systolic <= 160 && diastolic <= 100) {
		return 'hypertension1';
	}

	// Check for hypertension grade 2
	if (systolic <= 180 && diastolic <= 110) {
		return 'hypertension2';
	}

	// Hypertension grade 3
	return 'hypertension3';
}

/**
 * Get normal blood pressure range for specific age
 * @param age - Age in years
 * @returns Normal blood pressure range for the age
 */
export function getNormalRangeForAge(age: number): {
	systolic: { min: number; max: number };
	diastolic: { min: number; max: number };
} {
	const ageRange = AGE_RANGES.find(
		(range) => age >= range.min && age <= range.max
	);

	if (ageRange) {
		return {
			systolic: ageRange.normalSystolic,
			diastolic: ageRange.normalDiastolic,
		};
	}

	// Default range for ages not covered
	return {
		systolic: { min: 120, max: 140 },
		diastolic: { min: 80, max: 90 },
	};
}

/**
 * Get age range information for display
 * @param age - Age in years
 * @returns Age range information
 */
export function getAgeRangeInfo(age: number): AgeRange | null {
	return (
		AGE_RANGES.find((range) => age >= range.min && age <= range.max) || null
	);
}

/**
 * Calculate blood pressure analysis
 * @param input - Age, systolic and diastolic blood pressure
 * @returns Complete blood pressure analysis
 */
export function calculateBloodPressure(
	input: BloodPressureInput
): BloodPressureResult {
	const category = getBloodPressureCategory(input.systolic, input.diastolic);
	const categoryInfo =
		BLOOD_PRESSURE_CATEGORIES[
			category as keyof typeof BLOOD_PRESSURE_CATEGORIES
		];
	const normalRange = getNormalRangeForAge(input.age);

	return {
		category: categoryInfo.name,
		description: categoryInfo.description,
		recommendation: categoryInfo.recommendation,
		color: categoryInfo.color,
		riskLevel: categoryInfo.riskLevel,
		normalRange,
	};
}

/**
 * Validate input values
 * @param age - Age in years
 * @param systolic - Systolic blood pressure
 * @param diastolic - Diastolic blood pressure
 * @returns Validation result with error message if invalid
 */
export function validateBloodPressureInput(
	age: number,
	systolic: number,
	diastolic: number
): { isValid: boolean; error?: string } {
	if (!age || age <= 0) {
		return { isValid: false, error: 'ageRequired' };
	}

	if (age < 1 || age > 120) {
		return { isValid: false, error: 'ageRange' };
	}

	if (!systolic || systolic <= 0) {
		return { isValid: false, error: 'systolicRequired' };
	}

	if (systolic < 50 || systolic > 300) {
		return { isValid: false, error: 'systolicRange' };
	}

	if (!diastolic || diastolic <= 0) {
		return { isValid: false, error: 'diastolicRequired' };
	}

	if (diastolic < 30 || diastolic > 200) {
		return { isValid: false, error: 'diastolicRange' };
	}

	if (systolic <= diastolic) {
		return { isValid: false, error: 'systolicMustBeHigher' };
	}

	return { isValid: true };
}

/**
 * Get risk level description
 * @param riskLevel - Risk level string
 * @returns Risk level description
 */
export function getRiskLevelDescription(riskLevel: string): string {
	switch (riskLevel) {
		case 'low':
			return 'lowRisk';
		case 'moderate':
			return 'moderateRisk';
		case 'high':
			return 'highRisk';
		case 'veryHigh':
			return 'veryHighRisk';
		case 'critical':
			return 'criticalRisk';
		default:
			return 'unknownRisk';
	}
}
