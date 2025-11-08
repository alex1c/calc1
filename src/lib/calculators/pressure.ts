/**
 * Pressure Converter Library
 * 
 * Provides functionality for converting between different pressure units.
 * 
 * Features:
 * - Supports three pressure units: Pascals (Pa), atmospheres (atm), millimeters of mercury (mmHg)
 * - Input validation
 * - Formatted value output
 * 
 * Conversion formulas:
 * - Pascals to atmospheres: atm = Pa / 101325
 * - Atmospheres to Pascals: Pa = atm × 101325
 * - Pascals to mmHg: mmHg = Pa / 133.322
 * - mmHg to Pascals: Pa = mmHg × 133.322
 * 
 * All conversions use Pascals as the base unit.
 */

/**
 * Input interface for pressure conversion
 * Contains pressure value and source/target units
 */
export interface PressureInput {
	value: number;
	fromUnit: PressureUnit;
	toUnit: PressureUnit;
}

export interface PressureResult {
	value: number;
	unit: PressureUnit;
	formattedValue: string;
}

export type PressureUnit = 'Pa' | 'atm' | 'mmHg';

export interface PressureValidation {
	isValid: boolean;
	error?: string;
}

export const PRESSURE_UNITS: PressureUnit[] = ['Pa', 'atm', 'mmHg'];

/**
 * Validate pressure conversion input
 * 
 * Checks that:
 * - Value is non-negative
 * - Value is not too large (max 1e12)
 * - Source and target units are specified
 * - Units are valid pressure units
 * 
 * @param input - Pressure input to validate
 * @returns Validation result with boolean status and optional error message
 */
export function validatePressureInput(
	input: PressureInput
): PressureValidation {
	const { value, fromUnit, toUnit } = input;

	if (value < 0) {
		return { isValid: false, error: 'negativeValue' };
	}

	if (value > 1e12) {
		return { isValid: false, error: 'valueTooLarge' };
	}

	if (!fromUnit || !toUnit) {
		return { isValid: false, error: 'unitsRequired' };
	}

	if (
		!PRESSURE_UNITS.includes(fromUnit) ||
		!PRESSURE_UNITS.includes(toUnit)
	) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

/**
 * Convert pressure from one unit to another
 * 
 * Conversion process:
 * 1. Convert source unit to Pascals (base unit)
 * 2. Convert Pascals to target unit
 * 
 * @param input - Pressure input with value, source unit, and target unit
 * @returns Conversion result with value, unit, and formatted value string
 * @throws Error if input validation fails
 */
export function convertPressure(input: PressureInput): PressureResult {
	const validation = validatePressureInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Convert to Pascals first, then to target unit
	let pascals: number;
	switch (fromUnit) {
		case 'Pa':
			pascals = value;
			break;
		case 'atm':
			pascals = value * 101325;
			break;
		case 'mmHg':
			pascals = value * 133.322;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Convert from Pascals to target unit
	switch (toUnit) {
		case 'Pa':
			result = pascals;
			break;
		case 'atm':
			result = pascals / 101325;
			break;
		case 'mmHg':
			result = pascals / 133.322;
			break;
		default:
			throw new Error('Invalid to unit');
	}

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatPressureValue(result, toUnit),
	};
}

export function formatPressureValue(value: number, unit: PressureUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'Pa':
			// For Pascals, show fewer decimal places for large numbers
			if (Math.abs(value) >= 1000) {
				decimalPlaces = 0;
			} else if (Math.abs(value) >= 1) {
				decimalPlaces = 2;
			} else {
				decimalPlaces = 4;
			}
			break;
		case 'atm':
			// For atmospheres, show more precision
			decimalPlaces = Math.abs(value) < 1 ? 6 : 4;
			break;
		case 'mmHg':
			// For mmHg, show appropriate precision
			decimalPlaces = Math.abs(value) < 1 ? 4 : 2;
			break;
		default:
			decimalPlaces = 2;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: PressureUnit, locale: string): string {
	const unitNames: Record<string, Record<PressureUnit, string>> = {
		ru: {
			Pa: 'Па',
			atm: 'атм',
			mmHg: 'мм рт. ст.',
		},
		en: {
			Pa: 'Pa',
			atm: 'atm',
			mmHg: 'mmHg',
		},
		de: {
			Pa: 'Pa',
			atm: 'atm',
			mmHg: 'mmHg',
		},
		es: {
			Pa: 'Pa',
			atm: 'atm',
			mmHg: 'mmHg',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getCommonConversions(
	value: number,
	unit: PressureUnit
): Array<{
	unit: PressureUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: PressureUnit;
		value: number;
		formatted: string;
	}> = [];

	PRESSURE_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertPressure({
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

export function getUnitDescription(unit: PressureUnit, locale: string): string {
	const descriptions: Record<string, Record<PressureUnit, string>> = {
		ru: {
			Pa: 'Паскаль - единица давления в системе СИ',
			atm: 'Атмосфера - давление, равное атмосферному давлению на уровне моря',
			mmHg: 'Миллиметр ртутного столба - единица давления, используемая в медицине',
		},
		en: {
			Pa: 'Pascal - pressure unit in SI system',
			atm: 'Atmosphere - pressure equal to atmospheric pressure at sea level',
			mmHg: 'Millimeter of mercury - pressure unit used in medicine',
		},
		de: {
			Pa: 'Pascal - Druckeinheit im SI-System',
			atm: 'Atmosphäre - Druck gleich dem atmosphärischen Druck auf Meereshöhe',
			mmHg: 'Millimeter Quecksilbersäule - Druckeinheit in der Medizin',
		},
		es: {
			Pa: 'Pascal - unidad de presión en el sistema SI',
			atm: 'Atmósfera - presión igual a la presión atmosférica al nivel del mar',
			mmHg: 'Milímetro de mercurio - unidad de presión usada en medicina',
		},
	};

	return descriptions[locale]?.[unit] || '';
}

export function getPressureScale(unit: PressureUnit): {
	name: string;
	typicalRange: { min: number; max: number };
	description: string;
} {
	const scales = {
		Pa: {
			name: 'Pascal',
			typicalRange: { min: 0, max: 1000000 },
			description: 'Scientific and engineering applications',
		},
		atm: {
			name: 'Atmosphere',
			typicalRange: { min: 0, max: 10 },
			description: 'Meteorological and industrial applications',
		},
		mmHg: {
			name: 'Millimeter of mercury',
			typicalRange: { min: 0, max: 1000 },
			description: 'Medical and barometric applications',
		},
	};

	return scales[unit];
}

export function getConversionFormula(
	fromUnit: PressureUnit,
	toUnit: PressureUnit
): string {
	const formulas: Record<string, string> = {
		'Pa-atm': 'atm = Pa ÷ 101325',
		'Pa-mmHg': 'mmHg = Pa ÷ 133.322',
		'atm-Pa': 'Pa = atm × 101325',
		'atm-mmHg': 'mmHg = atm × 760',
		'mmHg-Pa': 'Pa = mmHg × 133.322',
		'mmHg-atm': 'atm = mmHg ÷ 760',
	};

	return formulas[`${fromUnit}-${toUnit}`] || '';
}

export function getStandardAtmosphericPressure(): {
	Pa: number;
	atm: number;
	mmHg: number;
} {
	return {
		Pa: 101325,
		atm: 1,
		mmHg: 760,
	};
}
