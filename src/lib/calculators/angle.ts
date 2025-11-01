export interface AngleInput {
	value: number;
	fromUnit: AngleUnit;
	toUnit: AngleUnit;
}

export interface AngleResult {
	value: number;
	unit: AngleUnit;
	formattedValue: string;
}

export type AngleUnit = 'deg' | 'rad' | 'rev';

export interface AngleValidation {
	isValid: boolean;
	error?: string;
}

// Conversion factors to radians (base unit)
const PI = Math.PI;
export const ANGLE_TO_RADIANS: Record<AngleUnit, number> = {
	deg: PI / 180, // 1 degree = π/180 radians
	rad: 1, // 1 radian = 1 radian (base unit)
	rev: 2 * PI, // 1 revolution = 2π radians
};

export const ANGLE_UNITS: AngleUnit[] = ['deg', 'rad', 'rev'];

export function validateAngleInput(input: AngleInput): AngleValidation {
	const { value, fromUnit, toUnit } = input;

	// Allow negative angles (for direction indication)
	if (!isFinite(value)) {
		return { isValid: false, error: 'valueMustBeFinite' };
	}

	if (!fromUnit || !toUnit) {
		return { isValid: false, error: 'unitsRequired' };
	}

	if (!ANGLE_UNITS.includes(fromUnit) || !ANGLE_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

export function convertAngle(input: AngleInput): AngleResult {
	const validation = validateAngleInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	// Convert to radians first, then to target unit
	const radians = value * ANGLE_TO_RADIANS[fromUnit];
	const result = radians / ANGLE_TO_RADIANS[toUnit];

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatAngleValue(result, toUnit),
	};
}

export function formatAngleValue(value: number, unit: AngleUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'deg':
			// For degrees, use 2-6 decimal places depending on magnitude
			if (Math.abs(value) < 0.01) {
				decimalPlaces = 6;
			} else if (Math.abs(value) < 1) {
				decimalPlaces = 4;
			} else {
				decimalPlaces = 2;
			}
			break;
		case 'rad':
			// For radians, use 4-8 decimal places
			if (Math.abs(value) < 0.001) {
				decimalPlaces = 8;
			} else if (Math.abs(value) < 0.01) {
				decimalPlaces = 6;
			} else {
				decimalPlaces = 4;
			}
			break;
		case 'rev':
			// For revolutions, use 3-6 decimal places
			if (Math.abs(value) < 0.001) {
				decimalPlaces = 6;
			} else if (Math.abs(value) < 0.01) {
				decimalPlaces = 5;
			} else {
				decimalPlaces = 3;
			}
			break;
		default:
			decimalPlaces = 4;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros but keep at least one digit after decimal
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: AngleUnit, t: (key: string) => string): string {
	return t(`units.${unit}`);
}

export function getCommonConversions(
	value: number,
	fromUnit: AngleUnit,
	t: (key: string) => string
): Array<{ unit: AngleUnit; value: number; formattedValue: string }> {
	const conversions: Array<{
		unit: AngleUnit;
		value: number;
		formattedValue: string;
	}> = [];

	// Get conversions to all other units
	for (const unit of ANGLE_UNITS) {
		if (unit !== fromUnit) {
			try {
				const result = convertAngle({ value, fromUnit, toUnit: unit });
				conversions.push({
					unit,
					value: result.value,
					formattedValue: result.formattedValue,
				});
			} catch (error) {
				// Skip invalid conversions
			}
		}
	}

	return conversions;
}

