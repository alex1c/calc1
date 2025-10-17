export interface LengthInput {
	value: number;
	fromUnit: LengthUnit;
	toUnit: LengthUnit;
}

export interface LengthResult {
	value: number;
	unit: LengthUnit;
	formattedValue: string;
}

export type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'mi';

export interface LengthValidation {
	isValid: boolean;
	error?: string;
}

// Conversion factors to meters
export const LENGTH_TO_METERS: Record<LengthUnit, number> = {
	mm: 0.001,
	cm: 0.01,
	m: 1,
	km: 1000,
	mi: 1609.34,
};

export const LENGTH_UNITS: LengthUnit[] = ['mm', 'cm', 'm', 'km', 'mi'];

export function validateLengthInput(input: LengthInput): LengthValidation {
	const { value, fromUnit, toUnit } = input;

	if (value < 0) {
		return { isValid: false, error: 'valueMustBePositive' };
	}

	if (value > 1e12) {
		return { isValid: false, error: 'valueTooLarge' };
	}

	if (!fromUnit || !toUnit) {
		return { isValid: false, error: 'unitsRequired' };
	}

	if (!LENGTH_UNITS.includes(fromUnit) || !LENGTH_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

export function convertLength(input: LengthInput): LengthResult {
	const validation = validateLengthInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	// Convert to meters first, then to target unit
	const meters = value * LENGTH_TO_METERS[fromUnit];
	const result = meters / LENGTH_TO_METERS[toUnit];

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatLengthValue(result, toUnit),
	};
}

export function formatLengthValue(value: number, unit: LengthUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'mm':
			decimalPlaces = value < 1 ? 3 : 1;
			break;
		case 'cm':
			decimalPlaces = value < 1 ? 2 : 1;
			break;
		case 'm':
			decimalPlaces = value < 1 ? 3 : 2;
			break;
		case 'km':
			decimalPlaces = value < 1 ? 4 : 2;
			break;
		case 'mi':
			decimalPlaces = value < 1 ? 4 : 2;
			break;
		default:
			decimalPlaces = 2;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: LengthUnit, locale: string): string {
	const unitNames: Record<string, Record<LengthUnit, string>> = {
		ru: {
			mm: 'мм',
			cm: 'см',
			m: 'м',
			km: 'км',
			mi: 'мили',
		},
		en: {
			mm: 'mm',
			cm: 'cm',
			m: 'm',
			km: 'km',
			mi: 'miles',
		},
		de: {
			mm: 'mm',
			cm: 'cm',
			m: 'm',
			km: 'km',
			mi: 'Meilen',
		},
		es: {
			mm: 'mm',
			cm: 'cm',
			m: 'm',
			km: 'km',
			mi: 'millas',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getConversionFactor(
	fromUnit: LengthUnit,
	toUnit: LengthUnit
): number {
	return LENGTH_TO_METERS[fromUnit] / LENGTH_TO_METERS[toUnit];
}

export function getCommonConversions(
	value: number,
	unit: LengthUnit
): Array<{
	unit: LengthUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: LengthUnit;
		value: number;
		formatted: string;
	}> = [];

	LENGTH_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertLength({
				value,
				fromUnit: unit,
				toUnit: targetUnit,
			});
			conversions.push({
				unit: targetUnit,
				value: result.value,
				formatted: result.formattedValue,
			});
		}
	});

	return conversions;
}

export function getUnitDescription(unit: LengthUnit, locale: string): string {
	const descriptions: Record<string, Record<LengthUnit, string>> = {
		ru: {
			mm: 'Миллиметр - 1/1000 метра',
			cm: 'Сантиметр - 1/100 метра',
			m: 'Метр - основная единица длины',
			km: 'Километр - 1000 метров',
			mi: 'Мили - 1609.34 метра',
		},
		en: {
			mm: 'Millimeter - 1/1000 of a meter',
			cm: 'Centimeter - 1/100 of a meter',
			m: 'Meter - base unit of length',
			km: 'Kilometer - 1000 meters',
			mi: 'Miles - 1609.34 meters',
		},
		de: {
			mm: 'Millimeter - 1/1000 eines Meters',
			cm: 'Zentimeter - 1/100 eines Meters',
			m: 'Meter - Basiseinheit der Länge',
			km: 'Kilometer - 1000 Meter',
			mi: 'Meilen - 1609,34 Meter',
		},
		es: {
			mm: 'Milímetro - 1/1000 de un metro',
			cm: 'Centímetro - 1/100 de un metro',
			m: 'Metro - unidad base de longitud',
			km: 'Kilómetro - 1000 metros',
			mi: 'Millas - 1609,34 metros',
		},
	};

	return descriptions[locale]?.[unit] || '';
}
