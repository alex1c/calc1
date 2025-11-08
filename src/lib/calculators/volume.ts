/**
 * Volume Converter Library
 * 
 * Provides functionality for converting volumes between different units:
 * - Liters (metric system)
 * - Gallons (US customary system)
 * - Cubic meters (SI system)
 * 
 * Uses a two-step conversion approach: convert to liters first,
 * then convert to the target unit for accuracy and maintainability.
 */

/**
 * Input interface for volume conversion
 * Contains the value to convert and source/target units
 */
export interface VolumeInput {
	value: number; // Volume value to convert
	fromUnit: VolumeUnit; // Source unit
	toUnit: VolumeUnit; // Target unit
}

/**
 * Result interface for volume conversion
 * Contains the converted value and formatted string for display
 */
export interface VolumeResult {
	value: number; // Converted numeric value
	unit: VolumeUnit; // Target unit
	formattedValue: string; // Formatted string for display
}

/**
 * Supported volume unit types
 * - liters: Metric system unit (1 liter = 1000 ml)
 * - gallons: US customary unit (1 gallon = 3.78541 liters)
 * - m3: SI system unit (1 m³ = 1000 liters)
 */
export type VolumeUnit = 'liters' | 'gallons' | 'm3';

/**
 * Validation result interface
 * Used to return validation status and error messages
 */
export interface VolumeValidation {
	isValid: boolean; // Whether input is valid
	error?: string; // Error message key if invalid
}

/**
 * Array of all supported volume units
 * Used for iteration and validation
 */
export const VOLUME_UNITS: VolumeUnit[] = ['liters', 'gallons', 'm3'];

/**
 * Validate volume conversion input parameters
 * 
 * Checks:
 * - Value is non-negative
 * - Value is within reasonable range (< 1e12)
 * - Both units are specified
 * - Units are valid (exist in VOLUME_UNITS)
 * 
 * @param input - Volume input to validate
 * @returns Validation result with error message if invalid
 */
export function validateVolumeInput(input: VolumeInput): VolumeValidation {
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

	if (!VOLUME_UNITS.includes(fromUnit) || !VOLUME_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

/**
 * Convert volume from one unit to another
 * 
 * Uses a two-step conversion process:
 * 1. Convert source unit to liters (intermediate unit)
 * 2. Convert liters to target unit
 * 
 * This approach ensures accuracy and makes it easy to add new units
 * by only defining their relationship to liters.
 * 
 * Conversion factors:
 * - 1 gallon = 3.78541 liters (US liquid gallon)
 * - 1 m³ = 1000 liters
 * 
 * @param input - Volume input with value and units
 * @returns Converted volume result with formatted value
 * @throws Error if input validation fails or unit is invalid
 */
export function convertVolume(input: VolumeInput): VolumeResult {
	// Validate input before conversion
	const validation = validateVolumeInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Step 1: Convert source unit to liters (intermediate unit)
	// This allows us to convert between any units by converting
	// through liters as a common base
	let liters: number;
	switch (fromUnit) {
		case 'liters':
			liters = value; // Already in liters
			break;
		case 'gallons':
			// US liquid gallon conversion factor
			liters = value * 3.78541;
			break;
		case 'm3':
			// Cubic meter to liters (1 m³ = 1000 L)
			liters = value * 1000;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Step 2: Convert from liters to target unit
	switch (toUnit) {
		case 'liters':
			result = liters; // Already in liters
			break;
		case 'gallons':
			// Reverse of gallon to liter conversion
			result = liters / 3.78541;
			break;
		case 'm3':
			// Reverse of m³ to liter conversion
			result = liters / 1000;
			break;
		default:
			throw new Error('Invalid to unit');
	}

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatVolumeValue(result, toUnit),
	};
}

/**
 * Format volume value for display
 * 
 * Applies unit-specific formatting rules:
 * - Large values: fewer decimal places for readability
 * - Small values: more decimal places for precision
 * - Removes trailing zeros for cleaner display
 * 
 * Formatting rules:
 * - Liters: 0 decimals if >= 1000, 2 if >= 1, 4 if < 1
 * - Gallons: 4 decimals if < 1, 2 if >= 1
 * - Cubic meters: 6 decimals if < 1, 3 if >= 1
 * 
 * @param value - Numeric value to format
 * @param unit - Unit type (affects decimal places)
 * @returns Formatted string without trailing zeros
 */
export function formatVolumeValue(value: number, unit: VolumeUnit): string {
	// Determine appropriate decimal places based on unit and value magnitude
	let decimalPlaces: number;

	switch (unit) {
		case 'liters':
			// For liters, show fewer decimal places for large numbers
			// Large volumes don't need high precision
			if (Math.abs(value) >= 1000) {
				decimalPlaces = 0; // Whole numbers for large volumes
			} else if (Math.abs(value) >= 1) {
				decimalPlaces = 2; // Standard precision for normal volumes
			} else {
				decimalPlaces = 4; // Higher precision for small volumes (ml range)
			}
			break;
		case 'gallons':
			// For gallons, show appropriate precision
			// Small values need more precision (fractions of gallons)
			decimalPlaces = Math.abs(value) < 1 ? 4 : 2;
			break;
		case 'm3':
			// For cubic meters, show more precision for small values
			// Small m³ values represent significant volumes in liters
			decimalPlaces = Math.abs(value) < 1 ? 6 : 3;
			break;
		default:
			decimalPlaces = 2; // Default fallback
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);
	
	// Remove trailing zeros for cleaner display
	// e.g., "1.20" becomes "1.2", "1.00" becomes "1"
	return parseFloat(formatted).toString();
}

/**
 * Get localized unit name
 * 
 * Returns the translated name of a volume unit for the specified locale.
 * Falls back to the unit code if translation is not available.
 * 
 * Supported locales:
 * - ru: Russian
 * - en: English
 * - de: German
 * - es: Spanish
 * 
 * @param unit - Volume unit to get name for
 * @param locale - Locale code (ru, en, de, es)
 * @returns Localized unit name or unit code if not found
 */
export function getUnitName(unit: VolumeUnit, locale: string): string {
	const unitNames: Record<string, Record<VolumeUnit, string>> = {
		ru: {
			liters: 'литры',
			gallons: 'галлоны',
			m3: 'м³',
		},
		en: {
			liters: 'liters',
			gallons: 'gallons',
			m3: 'm³',
		},
		de: {
			liters: 'Liter',
			gallons: 'Gallonen',
			m3: 'm³',
		},
		es: {
			liters: 'litros',
			gallons: 'galones',
			m3: 'm³',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

/**
 * Get common conversions for a given volume value
 * 
 * Converts the input value to all other supported units.
 * Useful for displaying a quick reference table showing
 * the same volume in different units.
 * 
 * Example: If input is 1 liter, returns conversions to gallons and m³
 * 
 * @param value - Volume value to convert
 * @param unit - Source unit of the value
 * @returns Array of conversions to all other units
 */
export function getCommonConversions(
	value: number,
	unit: VolumeUnit
): Array<{
	unit: VolumeUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: VolumeUnit;
		value: number;
		formatted: string;
	}> = [];

	// Convert to all units except the source unit
	VOLUME_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertVolume({
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
 * Returns a brief educational description of the unit in the specified locale.
 * Helps users understand what each unit represents and its relationship
 * to other units.
 * 
 * @param unit - Volume unit to get description for
 * @param locale - Locale code for translation
 * @returns Localized description string or empty string if not found
 */
export function getUnitDescription(unit: VolumeUnit, locale: string): string {
	const descriptions: Record<string, Record<VolumeUnit, string>> = {
		ru: {
			liters: 'Литр - основная единица объёма в метрической системе',
			gallons: 'Галлон - единица объёма, равная 3.78541 литра',
			m3: 'Кубический метр - единица объёма в системе СИ',
		},
		en: {
			liters: 'Liter - main volume unit in metric system',
			gallons: 'Gallon - volume unit equal to 3.78541 liters',
			m3: 'Cubic meter - volume unit in SI system',
		},
		de: {
			liters: 'Liter - Hauptvolumeneinheit im metrischen System',
			gallons: 'Gallone - Volumeneinheit gleich 3,78541 Liter',
			m3: 'Kubikmeter - Volumeneinheit im SI-System',
		},
		es: {
			liters: 'Litro - unidad principal de volumen en el sistema métrico',
			gallons: 'Galón - unidad de volumen igual a 3,78541 litros',
			m3: 'Metro cúbico - unidad de volumen en el sistema SI',
		},
	};

	return descriptions[locale]?.[unit] || '';
}

/**
 * Get volume scale information for a unit
 * 
 * Provides metadata about typical usage ranges and context for each unit.
 * Useful for UI components that need to set appropriate input ranges
 * or provide context to users.
 * 
 * @param unit - Volume unit to get scale info for
 * @returns Scale information including name, typical range, and description
 */
export function getVolumeScale(unit: VolumeUnit): {
	name: string;
	typicalRange: { min: number; max: number };
	description: string;
} {
	const scales = {
		liters: {
			name: 'Liter',
			typicalRange: { min: 0, max: 10000 }, // Common range for everyday use
			description: 'Common for liquids and containers',
		},
		gallons: {
			name: 'Gallon',
			typicalRange: { min: 0, max: 1000 }, // Typical range for US measurements
			description: 'Used in US and some other countries',
		},
		m3: {
			name: 'Cubic meter',
			typicalRange: { min: 0, max: 100 }, // Large volumes, scientific use
			description: 'Scientific and large-scale applications',
		},
	};

	return scales[unit];
}

/**
 * Get conversion formula as a human-readable string
 * 
 * Returns the mathematical formula used for conversion between two units.
 * Useful for educational purposes and showing users how calculations work.
 * 
 * Formulas show the direct conversion relationship:
 * - liters ↔ gallons: multiply/divide by 3.78541
 * - liters ↔ m³: multiply/divide by 1000
 * - gallons ↔ m³: convert through liters
 * 
 * @param fromUnit - Source unit
 * @param toUnit - Target unit
 * @returns Human-readable formula string or empty string if same unit
 */
export function getConversionFormula(fromUnit: VolumeUnit, toUnit: VolumeUnit): string {
	const formulas: Record<string, string> = {
		'liters-gallons': 'gallons = liters ÷ 3.78541',
		'liters-m3': 'm³ = liters ÷ 1000',
		'gallons-liters': 'liters = gallons × 3.78541',
		'gallons-m3': 'm³ = gallons × 3.78541 ÷ 1000',
		'm3-liters': 'liters = m³ × 1000',
		'm3-gallons': 'gallons = m³ × 1000 ÷ 3.78541',
	};

	return formulas[`${fromUnit}-${toUnit}`] || '';
}

/**
 * Get standard volume reference objects
 * 
 * Provides real-world examples of volumes in all units.
 * Useful for helping users understand scale and providing
 * quick reference values for common objects.
 * 
 * Examples include:
 * - Water bottles (small and large)
 * - Car gasoline tanks
 * - Swimming pools
 * 
 * @returns Array of reference objects with volumes in all units
 */
export function getStandardVolumeReferences(): {
	name: string;
	liters: number;
	gallons: number;
	m3: number;
}[] {
	return [
		{
			name: 'Standard water bottle',
			liters: 0.5,
			gallons: 0.132,
			m3: 0.0005,
		},
		{
			name: 'Large water bottle',
			liters: 1.5,
			gallons: 0.396,
			m3: 0.0015,
		},
		{
			name: 'Gasoline tank (car)',
			liters: 50,
			gallons: 13.2,
			m3: 0.05,
		},
		{
			name: 'Swimming pool (small)',
			liters: 50000,
			gallons: 13209,
			m3: 50,
		},
	];
}