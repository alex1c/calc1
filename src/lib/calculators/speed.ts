export interface SpeedInput {
	value: number;
	fromUnit: SpeedUnit;
	toUnit: SpeedUnit;
}

export interface SpeedResult {
	value: number;
	unit: SpeedUnit;
	formattedValue: string;
}

export type SpeedUnit = 'kmh' | 'ms' | 'knots';

export interface SpeedValidation {
	isValid: boolean;
	error?: string;
}

export const SPEED_UNITS: SpeedUnit[] = ['kmh', 'ms', 'knots'];

export function validateSpeedInput(input: SpeedInput): SpeedValidation {
	const { value, fromUnit, toUnit } = input;

	if (value < 0) {
		return { isValid: false, error: 'negativeValue' };
	}

	if (value > 1e6) {
		return { isValid: false, error: 'valueTooLarge' };
	}

	if (!fromUnit || !toUnit) {
		return { isValid: false, error: 'unitsRequired' };
	}

	if (!SPEED_UNITS.includes(fromUnit) || !SPEED_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

export function convertSpeed(input: SpeedInput): SpeedResult {
	const validation = validateSpeedInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Convert to m/s first, then to target unit
	let metersPerSecond: number;
	switch (fromUnit) {
		case 'kmh':
			metersPerSecond = value / 3.6;
			break;
		case 'ms':
			metersPerSecond = value;
			break;
		case 'knots':
			metersPerSecond = value * 0.514444;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Convert from m/s to target unit
	switch (toUnit) {
		case 'kmh':
			result = metersPerSecond * 3.6;
			break;
		case 'ms':
			result = metersPerSecond;
			break;
		case 'knots':
			result = metersPerSecond * 1.94384;
			break;
		default:
			throw new Error('Invalid to unit');
	}

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatSpeedValue(result, toUnit),
	};
}

export function formatSpeedValue(value: number, unit: SpeedUnit): string {
	// Round to appropriate decimal places based on unit
	let decimalPlaces: number;

	switch (unit) {
		case 'kmh':
			decimalPlaces = Math.abs(value) < 1 ? 3 : 2;
			break;
		case 'ms':
			decimalPlaces = Math.abs(value) < 1 ? 3 : 2;
			break;
		case 'knots':
			decimalPlaces = Math.abs(value) < 1 ? 3 : 2;
			break;
		default:
			decimalPlaces = 2;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: SpeedUnit, locale: string): string {
	const unitNames: Record<string, Record<SpeedUnit, string>> = {
		ru: {
			kmh: 'км/ч',
			ms: 'м/с',
			knots: 'узлы',
		},
		en: {
			kmh: 'km/h',
			ms: 'm/s',
			knots: 'knots',
		},
		de: {
			kmh: 'km/h',
			ms: 'm/s',
			knots: 'Knoten',
		},
		es: {
			kmh: 'km/h',
			ms: 'm/s',
			knots: 'nudos',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getCommonConversions(
	value: number,
	unit: SpeedUnit
): Array<{
	unit: SpeedUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: SpeedUnit;
		value: number;
		formatted: string;
	}> = [];

	SPEED_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertSpeed({
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

export function getUnitDescription(unit: SpeedUnit, locale: string): string {
	const descriptions: Record<string, Record<SpeedUnit, string>> = {
		ru: {
			kmh: 'Километры в час - основная единица скорости на дорогах',
			ms: 'Метры в секунду - базовая единица скорости в СИ',
			knots: 'Узлы - морские мили в час, используется в навигации',
		},
		en: {
			kmh: 'Kilometers per hour - main speed unit on roads',
			ms: 'Meters per second - base speed unit in SI system',
			knots: 'Knots - nautical miles per hour, used in navigation',
		},
		de: {
			kmh: 'Kilometer pro Stunde - Hauptgeschwindigkeitseinheit auf Straßen',
			ms: 'Meter pro Sekunde - Basiseinheit der Geschwindigkeit im SI-System',
			knots: 'Knoten - Seemeilen pro Stunde, in der Navigation verwendet',
		},
		es: {
			kmh: 'Kilómetros por hora - unidad principal de velocidad en carreteras',
			ms: 'Metros por segundo - unidad base de velocidad en el sistema SI',
			knots: 'Nudos - millas náuticas por hora, usado en navegación',
		},
	};

	return descriptions[locale]?.[unit] || '';
}

export function getSpeedScale(unit: SpeedUnit): {
	name: string;
	typicalRange: { min: number; max: number };
	description: string;
} {
	const scales = {
		kmh: {
			name: 'Kilometers per hour',
			typicalRange: { min: 0, max: 200 },
			description: 'Common for road vehicles',
		},
		ms: {
			name: 'Meters per second',
			typicalRange: { min: 0, max: 50 },
			description: 'Scientific and engineering applications',
		},
		knots: {
			name: 'Knots',
			typicalRange: { min: 0, max: 100 },
			description: 'Maritime and aviation navigation',
		},
	};

	return scales[unit];
}

export function getConversionFormula(
	fromUnit: SpeedUnit,
	toUnit: SpeedUnit
): string {
	const formulas: Record<string, string> = {
		'kmh-ms': 'm/s = km/h ÷ 3.6',
		'kmh-knots': 'knots = km/h ÷ 1.852',
		'ms-kmh': 'km/h = m/s × 3.6',
		'ms-knots': 'knots = m/s × 1.94384',
		'knots-kmh': 'km/h = knots × 1.852',
		'knots-ms': 'm/s = knots × 0.514444',
	};

	return formulas[`${fromUnit}-${toUnit}`] || '';
}
