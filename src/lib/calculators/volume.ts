export interface VolumeInput {
	value: number;
	fromUnit: VolumeUnit;
	toUnit: VolumeUnit;
}

export interface VolumeResult {
	value: number;
	unit: VolumeUnit;
	formattedValue: string;
}

export type VolumeUnit = 'liters' | 'gallons' | 'm3';

export interface VolumeValidation {
	isValid: boolean;
	error?: string;
}

export const VOLUME_UNITS: VolumeUnit[] = ['liters', 'gallons', 'm3'];

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

export function convertVolume(input: VolumeInput): VolumeResult {
	const validation = validateVolumeInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Convert to liters first, then to target unit
	let liters: number;
	switch (fromUnit) {
		case 'liters':
			liters = value;
			break;
		case 'gallons':
			liters = value * 3.78541;
			break;
		case 'm3':
			liters = value * 1000;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Convert from liters to target unit
	switch (toUnit) {
		case 'liters':
			result = liters;
			break;
		case 'gallons':
			result = liters / 3.78541;
			break;
		case 'm3':
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

export function formatVolumeValue(value: number, unit: VolumeUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'liters':
			// For liters, show fewer decimal places for large numbers
			if (Math.abs(value) >= 1000) {
				decimalPlaces = 0;
			} else if (Math.abs(value) >= 1) {
				decimalPlaces = 2;
			} else {
				decimalPlaces = 4;
			}
			break;
		case 'gallons':
			// For gallons, show appropriate precision
			decimalPlaces = Math.abs(value) < 1 ? 4 : 2;
			break;
		case 'm3':
			// For cubic meters, show more precision for small values
			decimalPlaces = Math.abs(value) < 1 ? 6 : 3;
			break;
		default:
			decimalPlaces = 2;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);
	
	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

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

export function getVolumeScale(unit: VolumeUnit): {
	name: string;
	typicalRange: { min: number; max: number };
	description: string;
} {
	const scales = {
		liters: {
			name: 'Liter',
			typicalRange: { min: 0, max: 10000 },
			description: 'Common for liquids and containers',
		},
		gallons: {
			name: 'Gallon',
			typicalRange: { min: 0, max: 1000 },
			description: 'Used in US and some other countries',
		},
		m3: {
			name: 'Cubic meter',
			typicalRange: { min: 0, max: 100 },
			description: 'Scientific and large-scale applications',
		},
	};

	return scales[unit];
}

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