export interface EnergyInput {
	value: number;
	fromUnit: EnergyUnit;
	toUnit: EnergyUnit;
}

export interface EnergyResult {
	value: number;
	unit: EnergyUnit;
	formattedValue: string;
}

export type EnergyUnit = 'J' | 'cal' | 'Wh';

export interface EnergyValidation {
	isValid: boolean;
	error?: string;
}

export const ENERGY_UNITS: EnergyUnit[] = ['J', 'cal', 'Wh'];

export function validateEnergyInput(input: EnergyInput): EnergyValidation {
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

	if (!ENERGY_UNITS.includes(fromUnit) || !ENERGY_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

export function convertEnergy(input: EnergyInput): EnergyResult {
	const validation = validateEnergyInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Convert to Joules first, then to target unit
	let joules: number;
	switch (fromUnit) {
		case 'J':
			joules = value;
			break;
		case 'cal':
			joules = value * 4.184;
			break;
		case 'Wh':
			joules = value * 3600;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Convert from Joules to target unit
	switch (toUnit) {
		case 'J':
			result = joules;
			break;
		case 'cal':
			result = joules / 4.184;
			break;
		case 'Wh':
			result = joules / 3600;
			break;
		default:
			throw new Error('Invalid to unit');
	}

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatEnergyValue(result, toUnit),
	};
}

export function formatEnergyValue(value: number, unit: EnergyUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'J':
			// For Joules, show fewer decimal places for large numbers
			if (Math.abs(value) >= 1000) {
				decimalPlaces = 0;
			} else if (Math.abs(value) >= 1) {
				decimalPlaces = 2;
			} else {
				decimalPlaces = 4;
			}
			break;
		case 'cal':
			// For calories, show appropriate precision
			decimalPlaces = Math.abs(value) < 1 ? 4 : 2;
			break;
		case 'Wh':
			// For watt-hours, show more precision for small values
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

export function getUnitName(unit: EnergyUnit, locale: string): string {
	const unitNames: Record<string, Record<EnergyUnit, string>> = {
		ru: {
			J: 'Дж',
			cal: 'кал',
			Wh: 'Вт⋅ч',
		},
		en: {
			J: 'J',
			cal: 'cal',
			Wh: 'Wh',
		},
		de: {
			J: 'J',
			cal: 'cal',
			Wh: 'Wh',
		},
		es: {
			J: 'J',
			cal: 'cal',
			Wh: 'Wh',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getCommonConversions(
	value: number,
	unit: EnergyUnit
): Array<{
	unit: EnergyUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: EnergyUnit;
		value: number;
		formatted: string;
	}> = [];

	ENERGY_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertEnergy({
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

export function getUnitDescription(unit: EnergyUnit, locale: string): string {
	const descriptions: Record<string, Record<EnergyUnit, string>> = {
		ru: {
			J: 'Джоуль - единица энергии в системе СИ',
			cal: 'Калория - единица энергии, используемая в термодинамике',
			Wh: 'Ватт-час - единица энергии, равная энергии, потребляемой устройством мощностью 1 ватт в течение 1 часа',
		},
		en: {
			J: 'Joule - energy unit in SI system',
			cal: 'Calorie - energy unit used in thermodynamics',
			Wh: 'Watt-hour - energy unit equal to energy consumed by a 1 watt device for 1 hour',
		},
		de: {
			J: 'Joule - Energieeinheit im SI-System',
			cal: 'Kalorie - Energieeinheit in der Thermodynamik',
			Wh: 'Wattstunde - Energieeinheit gleich der Energie, die ein 1-Watt-Gerät für 1 Stunde verbraucht',
		},
		es: {
			J: 'Joule - unidad de energía en el sistema SI',
			cal: 'Caloría - unidad de energía usada en termodinámica',
			Wh: 'Vatio-hora - unidad de energía igual a la energía consumida por un dispositivo de 1 vatio durante 1 hora',
		},
	};

	return descriptions[locale]?.[unit] || '';
}

export function getEnergyScale(unit: EnergyUnit): {
	name: string;
	typicalRange: { min: number; max: number };
	description: string;
} {
	const scales = {
		J: {
			name: 'Joule',
			typicalRange: { min: 0, max: 1000000 },
			description: 'Scientific and engineering applications',
		},
		cal: {
			name: 'Calorie',
			typicalRange: { min: 0, max: 100000 },
			description: 'Nutrition and thermodynamics',
		},
		Wh: {
			name: 'Watt-hour',
			typicalRange: { min: 0, max: 10000 },
			description: 'Electrical energy and power consumption',
		},
	};

	return scales[unit];
}

export function getConversionFormula(
	fromUnit: EnergyUnit,
	toUnit: EnergyUnit
): string {
	const formulas: Record<string, string> = {
		'J-cal': 'cal = J ÷ 4.184',
		'J-Wh': 'Wh = J ÷ 3600',
		'cal-J': 'J = cal × 4.184',
		'cal-Wh': 'Wh = cal × 4.184 ÷ 3600',
		'Wh-J': 'J = Wh × 3600',
		'Wh-cal': 'cal = Wh × 3600 ÷ 4.184',
	};

	return formulas[`${fromUnit}-${toUnit}`] || '';
}

export function getStandardEnergyReferences(): {
	name: string;
	J: number;
	cal: number;
	Wh: number;
}[] {
	return [
		{
			name: 'Small battery (AA)',
			J: 10800,
			cal: 2581,
			Wh: 3,
		},
		{
			name: 'Smartphone battery',
			J: 14400,
			cal: 3442,
			Wh: 4,
		},
		{
			name: 'Laptop battery',
			J: 180000,
			cal: 43021,
			Wh: 50,
		},
		{
			name: 'Human daily energy intake',
			J: 8400000,
			cal: 2000000,
			Wh: 2333,
		},
	];
}
