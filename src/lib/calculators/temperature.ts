/**
 * Temperature Converter Library
 * 
 * Provides functionality for converting between different temperature units:
 * - Celsius (°C)
 * - Fahrenheit (°F)
 * - Kelvin (K)
 * 
 * Features:
 * - Unit conversion between temperature units
 * - Input validation (absolute zero checks)
 * - Formatted value output
 * - Common conversions display
 * 
 * Conversion formulas:
 * - Celsius to Fahrenheit: F = C × (9/5) + 32
 * - Fahrenheit to Celsius: C = (F - 32) × (5/9)
 * - Celsius to Kelvin: K = C + 273.15
 * - Kelvin to Celsius: C = K - 273.15
 * 
 * All conversions use Celsius as the intermediate unit.
 */

export interface TemperatureInput {
	value: number;
	fromUnit: TemperatureUnit;
	toUnit: TemperatureUnit;
}

export interface TemperatureResult {
	value: number;
	unit: TemperatureUnit;
	formattedValue: string;
}

export type TemperatureUnit = 'C' | 'F' | 'K';

export interface TemperatureValidation {
	isValid: boolean;
	error?: string;
}

export const TEMPERATURE_UNITS: TemperatureUnit[] = ['C', 'F', 'K'];

/**
 * Validate temperature conversion input
 * 
 * Checks that:
 * - Value is not below absolute zero for the source unit
 * - Value is not too large
 * - Source and target units are specified
 * - Units are valid temperature units
 * 
 * Absolute zero limits:
 * - Celsius: -273.15°C
 * - Fahrenheit: -459.67°F
 * - Kelvin: 0K
 * 
 * @param input - Temperature input to validate
 * @returns Validation result with boolean status and optional error message
 */
export function validateTemperatureInput(
	input: TemperatureInput
): TemperatureValidation {
	const { value, fromUnit, toUnit } = input;

	if (value < -273.15 && fromUnit === 'C') {
		return { isValid: false, error: 'celsiusBelowAbsoluteZero' };
	}

	if (value < -459.67 && fromUnit === 'F') {
		return { isValid: false, error: 'fahrenheitBelowAbsoluteZero' };
	}

	if (value < 0 && fromUnit === 'K') {
		return { isValid: false, error: 'kelvinBelowAbsoluteZero' };
	}

	if (value > 1e6) {
		return { isValid: false, error: 'valueTooLarge' };
	}

	if (!fromUnit || !toUnit) {
		return { isValid: false, error: 'unitsRequired' };
	}

	if (
		!TEMPERATURE_UNITS.includes(fromUnit) ||
		!TEMPERATURE_UNITS.includes(toUnit)
	) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

/**
 * Convert temperature from one unit to another
 * 
 * Conversion process:
 * 1. Convert source unit to Celsius (intermediate unit)
 * 2. Convert Celsius to target unit
 * 
 * @param input - Temperature input with value, source unit, and target unit
 * @returns Conversion result with value, unit, and formatted value string
 * @throws Error if input validation fails
 */
export function convertTemperature(input: TemperatureInput): TemperatureResult {
	const validation = validateTemperatureInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Convert to Celsius first, then to target unit
	let celsius: number;
	switch (fromUnit) {
		case 'C':
			celsius = value;
			break;
		case 'F':
			celsius = (value - 32) * (5 / 9);
			break;
		case 'K':
			celsius = value - 273.15;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Convert from Celsius to target unit
	switch (toUnit) {
		case 'C':
			result = celsius;
			break;
		case 'F':
			result = celsius * (9 / 5) + 32;
			break;
		case 'K':
			result = celsius + 273.15;
			break;
		default:
			throw new Error('Invalid to unit');
	}

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatTemperatureValue(result, toUnit),
	};
}

export function formatTemperatureValue(
	value: number,
	unit: TemperatureUnit
): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'C':
			decimalPlaces = Math.abs(value) < 1 ? 2 : 1;
			break;
		case 'F':
			decimalPlaces = Math.abs(value) < 1 ? 2 : 1;
			break;
		case 'K':
			decimalPlaces = Math.abs(value) < 1 ? 2 : 1;
			break;
		default:
			decimalPlaces = 1;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: TemperatureUnit, locale: string): string {
	const unitNames: Record<string, Record<TemperatureUnit, string>> = {
		ru: {
			C: '°C',
			F: '°F',
			K: 'K',
		},
		en: {
			C: '°C',
			F: '°F',
			K: 'K',
		},
		de: {
			C: '°C',
			F: '°F',
			K: 'K',
		},
		es: {
			C: '°C',
			F: '°F',
			K: 'K',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getCommonConversions(
	value: number,
	unit: TemperatureUnit
): Array<{
	unit: TemperatureUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: TemperatureUnit;
		value: number;
		formatted: string;
	}> = [];

	TEMPERATURE_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertTemperature({
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

export function getUnitDescription(
	unit: TemperatureUnit,
	locale: string
): string {
	const descriptions: Record<string, Record<TemperatureUnit, string>> = {
		ru: {
			C: 'Цельсий - 0°C = точка замерзания воды',
			F: 'Фаренгейт - 32°F = точка замерзания воды',
			K: 'Кельвин - 0K = абсолютный ноль',
		},
		en: {
			C: 'Celsius - 0°C = freezing point of water',
			F: 'Fahrenheit - 32°F = freezing point of water',
			K: 'Kelvin - 0K = absolute zero',
		},
		de: {
			C: 'Celsius - 0°C = Gefrierpunkt von Wasser',
			F: 'Fahrenheit - 32°F = Gefrierpunkt von Wasser',
			K: 'Kelvin - 0K = absoluter Nullpunkt',
		},
		es: {
			C: 'Celsius - 0°C = punto de congelación del agua',
			F: 'Fahrenheit - 32°F = punto de congelación del agua',
			K: 'Kelvin - 0K = cero absoluto',
		},
	};

	return descriptions[locale]?.[unit] || '';
}

export function getTemperatureScale(unit: TemperatureUnit): {
	name: string;
	freezingPoint: number;
	boilingPoint: number;
	absoluteZero: number;
} {
	const scales = {
		C: {
			name: 'Celsius',
			freezingPoint: 0,
			boilingPoint: 100,
			absoluteZero: -273.15,
		},
		F: {
			name: 'Fahrenheit',
			freezingPoint: 32,
			boilingPoint: 212,
			absoluteZero: -459.67,
		},
		K: {
			name: 'Kelvin',
			freezingPoint: 273.15,
			boilingPoint: 373.15,
			absoluteZero: 0,
		},
	};

	return scales[unit];
}
