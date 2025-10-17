export interface WeightInput {
	value: number;
	fromUnit: WeightUnit;
	toUnit: WeightUnit;
}

export interface WeightResult {
	value: number;
	unit: WeightUnit;
	formattedValue: string;
}

export type WeightUnit = 'g' | 'kg' | 'lb';

export interface WeightValidation {
	isValid: boolean;
	error?: string;
}

// Conversion factors to grams
export const WEIGHT_TO_GRAMS: Record<WeightUnit, number> = {
	g: 1,
	kg: 1000,
	lb: 453.592,
};

export const WEIGHT_UNITS: WeightUnit[] = ['g', 'kg', 'lb'];

export function validateWeightInput(input: WeightInput): WeightValidation {
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

	if (!WEIGHT_UNITS.includes(fromUnit) || !WEIGHT_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

export function convertWeight(input: WeightInput): WeightResult {
	const validation = validateWeightInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	// Convert to grams first, then to target unit
	const grams = value * WEIGHT_TO_GRAMS[fromUnit];
	const result = grams / WEIGHT_TO_GRAMS[toUnit];

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatWeightValue(result, toUnit),
	};
}

export function formatWeightValue(value: number, unit: WeightUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'g':
			decimalPlaces = value < 1 ? 3 : 1;
			break;
		case 'kg':
			decimalPlaces = value < 1 ? 3 : 2;
			break;
		case 'lb':
			decimalPlaces = value < 1 ? 3 : 2;
			break;
		default:
			decimalPlaces = 2;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: WeightUnit, locale: string): string {
	const unitNames: Record<string, Record<WeightUnit, string>> = {
		ru: {
			g: 'г',
			kg: 'кг',
			lb: 'фунты',
		},
		en: {
			g: 'g',
			kg: 'kg',
			lb: 'lb',
		},
		de: {
			g: 'g',
			kg: 'kg',
			lb: 'lb',
		},
		es: {
			g: 'g',
			kg: 'kg',
			lb: 'libra',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getConversionFactor(
	fromUnit: WeightUnit,
	toUnit: WeightUnit
): number {
	return WEIGHT_TO_GRAMS[fromUnit] / WEIGHT_TO_GRAMS[toUnit];
}

export function getCommonConversions(
	value: number,
	unit: WeightUnit
): Array<{
	unit: WeightUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: WeightUnit;
		value: number;
		formatted: string;
	}> = [];

	WEIGHT_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertWeight({
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

export function getUnitDescription(unit: WeightUnit, locale: string): string {
	const descriptions: Record<string, Record<WeightUnit, string>> = {
		ru: {
			g: 'Грамм - 1/1000 килограмма',
			kg: 'Килограмм - 1000 граммов',
			lb: 'Фунт - 453.592 грамма',
		},
		en: {
			g: 'Gram - 1/1000 of a kilogram',
			kg: 'Kilogram - 1000 grams',
			lb: 'Pound - 453.592 grams',
		},
		de: {
			g: 'Gramm - 1/1000 eines Kilogramms',
			kg: 'Kilogramm - 1000 Gramm',
			lb: 'Pfund - 453,592 Gramm',
		},
		es: {
			g: 'Gramo - 1/1000 de un kilogramo',
			kg: 'Kilogramo - 1000 gramos',
			lb: 'Libra - 453,592 gramos',
		},
	};

	return descriptions[locale]?.[unit] || '';
}
