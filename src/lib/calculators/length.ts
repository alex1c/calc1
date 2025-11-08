/**
 * Length Converter Library
 * 
 * Provides functionality for converting between different length units.
 * 
 * Features:
 * - Supports multiple length units: mm, cm, m, km, mi
 * - Input validation
 * - Formatted value output
 * - Common conversions display
 * 
 * Conversion method:
 * - Uses meters as base unit
 * - Converts source unit to meters, then to target unit
 * 
 * Supported units:
 * - mm: millimeters
 * - cm: centimeters
 * - m: meters (base unit)
 * - km: kilometers
 * - mi: miles
 */

/**
 * Input interface for length conversion
 * Contains length value and source/target units
 */
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

/**
 * Validate length conversion input
 * 
 * Checks that:
 * - Value is non-negative
 * - Value is not too large (max 1e12)
 * - Source and target units are specified
 * - Units are valid length units
 * 
 * @param input - Length input to validate
 * @returns Validation result with boolean status and optional error message
 */
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

/**
 * Convert length from one unit to another
 * 
 * Conversion process:
 * 1. Convert source unit to meters (base unit)
 * 2. Convert meters to target unit
 * 
 * @param input - Length input with value, source unit, and target unit
 * @returns Conversion result with value, unit, and formatted value string
 * @throws Error if input validation fails
 */
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

/**
 * Format length value for display based on unit
 * 
 * Uses different decimal precision based on unit and magnitude:
 * - mm: 1-3 decimal places depending on magnitude
 * - cm: 1-2 decimal places depending on magnitude
 * - m: 2-3 decimal places depending on magnitude
 * - km: 2-4 decimal places depending on magnitude
 * - mi: 2-4 decimal places depending on magnitude
 * 
 * @param value - Length value to format
 * @param unit - Length unit (mm, cm, m, km, mi)
 * @returns Formatted length value string
 */
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

/**
 * Get localized unit name
 * 
 * @param unit - Length unit (mm, cm, m, km, mi)
 * @param locale - Locale code (ru, en, es, de)
 * @returns Localized unit name string
 */
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

/**
 * Get conversion factor between two length units
 * 
 * @param fromUnit - Source length unit
 * @param toUnit - Target length unit
 * @returns Conversion factor (multiply source value by this to get target value)
 */
export function getConversionFactor(
	fromUnit: LengthUnit,
	toUnit: LengthUnit
): number {
	return LENGTH_TO_METERS[fromUnit] / LENGTH_TO_METERS[toUnit];
}

/**
 * Get common conversions for a length value
 * 
 * Converts the input value to all other length units and returns
 * an array of conversion results with formatted values.
 * 
 * @param value - Length value to convert
 * @param unit - Source length unit
 * @returns Array of conversion results for all other units
 */
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

/**
 * Get localized unit description
 * 
 * @param unit - Length unit (mm, cm, m, km, mi)
 * @param locale - Locale code (ru, en, es, de)
 * @returns Localized unit description string
 */
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
