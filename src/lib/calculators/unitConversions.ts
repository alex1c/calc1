/**
 * Unit Conversion Library
 *
 * Provides conversion rates and functions for various measurement units.
 *
 * Features:
 * - Multiple unit types (length, mass, time, volume)
 * - Conversion between units of the same type
 * - Conversion factor calculation
 * - Unit validation
 * - Unit type detection
 * - Formatted result output
 *
 * Unit types:
 * - Length: m, km, cm, mm, inch, foot, yard, mile
 * - Mass: kg, g, mg, tonne, lb, oz
 * - Time: second, minute, hour, day, week
 * - Volume: l, ml, m³, cm³, gallon, pint
 *
 * Conversion method:
 * - All conversions use a base unit (marked with rate 1)
 * - Converts source unit to base unit, then to target unit
 * - Conversion factor = source_rate / target_rate
 */

/**
 * Conversion rates for different unit types
 *
 * All rates are relative to the base unit (marked with rate 1).
 * To convert from unit A to unit B: value × (rate_A / rate_B)
 *
 * Base units:
 * - Length: meter (m)
 * - Mass: kilogram (kg)
 * - Time: second
 * - Volume: liter (l)
 */
export const conversionRates = {
	length: {
		m: 1, // meter (base unit)
		km: 1000,
		cm: 0.01,
		mm: 0.001,
		inch: 0.0254,
		foot: 0.3048,
		yard: 0.9144,
		mile: 1609.34,
	},
	mass: {
		kg: 1, // kilogram (base unit)
		g: 0.001,
		mg: 0.000001,
		tonne: 1000,
		lb: 0.453592,
		oz: 0.0283495,
	},
	time: {
		second: 1, // second (base unit)
		minute: 60,
		hour: 3600,
		day: 86400,
		week: 604800,
	},
	volume: {
		l: 1, // liter (base unit)
		ml: 0.001,
		m3: 1000,
		cm3: 0.001,
		gallon: 3.78541,
		pint: 0.473176,
	},
};

/**
 * Available unit types
 */
export type UnitType = keyof typeof conversionRates;

/**
 * Available units for each type
 */
export type LengthUnit = keyof typeof conversionRates.length;
export type MassUnit = keyof typeof conversionRates.mass;
export type TimeUnit = keyof typeof conversionRates.time;
export type VolumeUnit = keyof typeof conversionRates.volume;

/**
 * Union type for all units
 */
export type Unit = LengthUnit | MassUnit | TimeUnit | VolumeUnit;

/**
 * Conversion result interface
 */
export interface ConversionResult {
	value: number;
	fromUnit: string;
	toUnit: string;
	fromValue: number;
	toValue: number;
	unitType: UnitType;
}

/**
 * Get all available units for a given type
 * @param type - The unit type
 * @returns Array of unit names
 */
export function getUnitsForType(type: UnitType): string[] {
	return Object.keys(conversionRates[type]);
}

/**
 * Convert a value from one unit to another
 *
 * Conversion process:
 * 1. Converts source unit to base unit: baseValue = value × source_rate
 * 2. Converts base unit to target unit: result = baseValue / target_rate
 *
 * Formula: result = value × (source_rate / target_rate)
 *
 * @param value - The value to convert
 * @param fromUnit - The source unit name
 * @param toUnit - The target unit name
 * @param unitType - The type of units being converted
 * @returns Conversion result with value, units, and unit type
 * @throws Error if units are invalid for the specified type
 */
export function convertUnit(
	value: number,
	fromUnit: string,
	toUnit: string,
	unitType: UnitType
): ConversionResult {
	const rates = conversionRates[unitType];

	// Validate units exist
	if (!(fromUnit in rates) || !(toUnit in rates)) {
		throw new Error(`Invalid units for type ${unitType}`);
	}

	// Convert to base unit first, then to target unit
	const baseValue = value * rates[fromUnit as keyof typeof rates];
	const convertedValue = baseValue / rates[toUnit as keyof typeof rates];

	return {
		value: convertedValue,
		fromUnit,
		toUnit,
		fromValue: value,
		toValue: convertedValue,
		unitType,
	};
}

/**
 * Format number for display
 *
 * Formats number with specified decimal places and removes trailing zeros.
 *
 * @param num - Number to format
 * @param decimals - Number of decimal places (default 6)
 * @returns Formatted number string without trailing zeros
 */
export function formatConversionResult(
	num: number,
	decimals: number = 6
): string {
	// Remove trailing zeros
	const formatted = num.toFixed(decimals);
	return parseFloat(formatted).toString();
}

/**
 * Get conversion factor between two units
 *
 * Returns the factor to multiply source value by to get target value.
 * Formula: factor = source_rate / target_rate
 *
 * @param fromUnit - Source unit name
 * @param toUnit - Target unit name
 * @param unitType - Unit type
 * @returns Conversion factor (multiply source value by this to get target value)
 * @throws Error if units are invalid for the specified type
 */
export function getConversionFactor(
	fromUnit: string,
	toUnit: string,
	unitType: UnitType
): number {
	const rates = conversionRates[unitType];

	if (!(fromUnit in rates) || !(toUnit in rates)) {
		throw new Error(`Invalid units for type ${unitType}`);
	}

	return (
		rates[fromUnit as keyof typeof rates] /
		rates[toUnit as keyof typeof rates]
	);
}

/**
 * Validate if a unit exists for a given type
 *
 * Checks if the unit name exists in the conversion rates for the specified type.
 *
 * @param unit - Unit name to validate
 * @param unitType - Unit type to check against
 * @returns True if unit exists for the type, false otherwise
 */
export function isValidUnit(unit: string, unitType: UnitType): boolean {
	return unit in conversionRates[unitType];
}

/**
 * Get unit type from unit name
 *
 * Searches all unit types to find which one contains the specified unit name.
 * Returns null if unit is not found in any type (ambiguous or invalid).
 *
 * @param unit - Unit name to look up
 * @returns Unit type if found, null if ambiguous or not found
 */
export function getUnitType(unit: string): UnitType | null {
	for (const [type, rates] of Object.entries(conversionRates)) {
		if (unit in rates) {
			return type as UnitType;
		}
	}
	return null;
}

/**
 * Get all available unit types
 * @returns Array of unit types
 */
export function getAvailableUnitTypes(): UnitType[] {
	return Object.keys(conversionRates) as UnitType[];
}

/**
 * Get conversion example for tooltips
 *
 * Generates an example conversion string showing how 1 unit of source
 * converts to target unit.
 *
 * Example: "1 m = 100 cm"
 *
 * @param fromUnit - Source unit name
 * @param toUnit - Target unit name
 * @param unitType - Unit type
 * @returns Example conversion string
 */
export function getConversionExample(
	fromUnit: string,
	toUnit: string,
	unitType: UnitType
): string {
	const factor = getConversionFactor(fromUnit, toUnit, unitType);

	// Use 1 as example value
	const exampleValue = 1;
	const convertedValue = exampleValue * factor;

	return `1 ${fromUnit} = ${formatConversionResult(
		convertedValue
	)} ${toUnit}`;
}

/**
 * Validate conversion input
 *
 * Performs validation checks:
 * - Value is a valid finite number
 * - Value is non-negative
 * - Source unit is valid for the type
 * - Target unit is valid for the type
 * - Source and target units are different
 *
 * @param value - Input value to convert
 * @param fromUnit - Source unit name
 * @param toUnit - Target unit name
 * @param unitType - Unit type
 * @returns Validation result with boolean status and optional error message
 */
export function validateConversionInput(
	value: number,
	fromUnit: string,
	toUnit: string,
	unitType: UnitType
): { isValid: boolean; error?: string } {
	if (isNaN(value) || !isFinite(value)) {
		return { isValid: false, error: 'Invalid number' };
	}

	if (value < 0) {
		return { isValid: false, error: 'Value must be positive' };
	}

	if (!isValidUnit(fromUnit, unitType)) {
		return { isValid: false, error: `Invalid source unit: ${fromUnit}` };
	}

	if (!isValidUnit(toUnit, unitType)) {
		return { isValid: false, error: `Invalid target unit: ${toUnit}` };
	}

	if (fromUnit === toUnit) {
		return {
			isValid: false,
			error: 'Source and target units are the same',
		};
	}

	return { isValid: true };
}
