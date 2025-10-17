export interface DoseInput {
	weight: number;
	dosage: number;
	frequency: number;
	maxDailyDose?: number;
	unit: 'kg' | 'lbs';
}

export interface DoseResult {
	dosePerIntake: number;
	dailyDose: number;
	isExceeded: boolean;
	warning?: string;
	unit: 'mg';
}

export interface DoseValidation {
	isValid: boolean;
	error?: string;
}

export const FREQUENCY_OPTIONS = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
];

export const UNIT_CONVERSION = {
	kgToLbs: 2.20462,
	lbsToKg: 0.453592,
};

export function validateDoseInput(input: DoseInput): DoseValidation {
	const { weight, dosage, frequency, maxDailyDose } = input;

	if (weight <= 0) {
		return { isValid: false, error: 'weightMustBePositive' };
	}

	if (dosage <= 0) {
		return { isValid: false, error: 'dosageMustBePositive' };
	}

	if (frequency < 1 || frequency > 4) {
		return { isValid: false, error: 'frequencyRange' };
	}

	if (maxDailyDose !== undefined && maxDailyDose <= 0) {
		return { isValid: false, error: 'maxDoseMustBePositive' };
	}

	// Check for reasonable weight limits
	const weightInKg =
		input.unit === 'kg' ? weight : weight * UNIT_CONVERSION.lbsToKg;
	if (weightInKg < 1 || weightInKg > 500) {
		return { isValid: false, error: 'weightRange' };
	}

	return { isValid: true };
}

export function calculateDose(input: DoseInput): DoseResult {
	const validation = validateDoseInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { weight, dosage, frequency, maxDailyDose, unit } = input;

	// Convert weight to kg if needed
	const weightInKg =
		unit === 'kg' ? weight : weight * UNIT_CONVERSION.lbsToKg;

	// Calculate dose per intake (mg)
	const dosePerIntake = weightInKg * dosage;

	// Calculate daily dose (mg)
	const dailyDose = dosePerIntake * frequency;

	// Check if daily dose exceeds maximum
	const isExceeded = maxDailyDose !== undefined && dailyDose > maxDailyDose;

	let warning: string | undefined;
	if (isExceeded && maxDailyDose) {
		warning = `dailyDoseExceeded:${maxDailyDose}`;
	}

	return {
		dosePerIntake: Math.round(dosePerIntake * 100) / 100, // Round to 2 decimal places
		dailyDose: Math.round(dailyDose * 100) / 100,
		isExceeded,
		warning,
		unit: 'mg',
	};
}

export function convertWeight(
	weight: number,
	fromUnit: 'kg' | 'lbs',
	toUnit: 'kg' | 'lbs'
): number {
	if (fromUnit === toUnit) {
		return weight;
	}

	if (fromUnit === 'kg' && toUnit === 'lbs') {
		return Math.round(weight * UNIT_CONVERSION.kgToLbs * 100) / 100;
	}

	if (fromUnit === 'lbs' && toUnit === 'kg') {
		return Math.round(weight * UNIT_CONVERSION.lbsToKg * 100) / 100;
	}

	return weight;
}

export function getDosageUnit(weightUnit: 'kg' | 'lbs'): string {
	return weightUnit === 'kg' ? 'mg/kg' : 'mg/lb';
}

export function formatDose(dose: number, unit: string): string {
	if (dose >= 1000) {
		return `${(dose / 1000).toFixed(2)} g`;
	}
	return `${dose.toFixed(2)} ${unit}`;
}

export function getDoseColor(isExceeded: boolean): string {
	return isExceeded ? 'text-red-600' : 'text-green-600';
}

export function getDoseBgColor(isExceeded: boolean): string {
	return isExceeded ? 'bg-red-50' : 'bg-green-50';
}

export function getDoseBorderColor(isExceeded: boolean): string {
	return isExceeded ? 'border-red-200' : 'border-green-200';
}

export function getWarningIcon(isExceeded: boolean): string {
	return isExceeded ? '⚠️' : '✅';
}

export function getWarningMessage(
	isExceeded: boolean,
	maxDose?: number
): string {
	if (isExceeded && maxDose) {
		return `warning.exceeded:${maxDose}`;
	}
	return 'warning.safe';
}
