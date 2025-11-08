/**
 * Data Converter Library
 * 
 * Provides functionality for converting between different data storage units.
 * 
 * Features:
 * - Supports multiple data units: B, KB, MB, GB, TB
 * - Binary conversion (1024-based)
 * - Input validation
 * - Formatted value output
 * 
 * Conversion method:
 * - Uses binary (1024-based) conversion:
 *   - 1 KB = 1024 B
 *   - 1 MB = 1024 KB
 *   - 1 GB = 1024 MB
 *   - 1 TB = 1024 GB
 * 
 * Note: This uses binary conversion (1024) rather than decimal (1000),
 * which is standard for data storage units.
 */

/**
 * Input interface for data conversion
 * Contains data value and source/target units
 */
export interface DataInput {
	value: number;
	fromUnit: DataUnit;
	toUnit: DataUnit;
}

export interface DataResult {
	value: number;
	unit: DataUnit;
	formattedValue: string;
}

export type DataUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

export interface DataValidation {
	isValid: boolean;
	error?: string;
}

export const DATA_UNITS: DataUnit[] = ['B', 'KB', 'MB', 'GB', 'TB'];

/**
 * Validate data conversion input
 * 
 * Checks that:
 * - Value is non-negative
 * - Value is not too large (max 1e15)
 * - Source and target units are specified
 * - Units are valid data units
 * 
 * @param input - Data input to validate
 * @returns Validation result with boolean status and optional error message
 */
export function validateDataInput(input: DataInput): DataValidation {
	const { value, fromUnit, toUnit } = input;

	if (value < 0) {
		return { isValid: false, error: 'negativeValue' };
	}

	if (value > 1e15) {
		return { isValid: false, error: 'valueTooLarge' };
	}

	if (!fromUnit || !toUnit) {
		return { isValid: false, error: 'unitsRequired' };
	}

	if (!DATA_UNITS.includes(fromUnit) || !DATA_UNITS.includes(toUnit)) {
		return { isValid: false, error: 'invalidUnits' };
	}

	return { isValid: true };
}

/**
 * Convert data from one unit to another
 * 
 * Conversion process:
 * 1. Convert source unit to bytes (base unit)
 * 2. Convert bytes to target unit
 * 
 * Uses binary conversion (1024-based) for all conversions.
 * 
 * @param input - Data input with value, source unit, and target unit
 * @returns Conversion result with value, unit, and formatted value string
 * @throws Error if input validation fails
 */
export function convertData(input: DataInput): DataResult {
	const validation = validateDataInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { value, fromUnit, toUnit } = input;

	let result: number;

	// Convert to bytes first, then to target unit
	let bytes: number;
	switch (fromUnit) {
		case 'B':
			bytes = value;
			break;
		case 'KB':
			bytes = value * 1024;
			break;
		case 'MB':
			bytes = value * 1024 * 1024;
			break;
		case 'GB':
			bytes = value * 1024 * 1024 * 1024;
			break;
		case 'TB':
			bytes = value * 1024 * 1024 * 1024 * 1024;
			break;
		default:
			throw new Error('Invalid from unit');
	}

	// Convert from bytes to target unit
	switch (toUnit) {
		case 'B':
			result = bytes;
			break;
		case 'KB':
			result = bytes / 1024;
			break;
		case 'MB':
			result = bytes / (1024 * 1024);
			break;
		case 'GB':
			result = bytes / (1024 * 1024 * 1024);
			break;
		case 'TB':
			result = bytes / (1024 * 1024 * 1024 * 1024);
			break;
		default:
			throw new Error('Invalid to unit');
	}

	return {
		value: result,
		unit: toUnit,
		formattedValue: formatDataValue(result, toUnit),
	};
}

export function formatDataValue(value: number, unit: DataUnit): string {
	// Round to appropriate decimal places based on unit and value size
	let decimalPlaces: number;

	if (Math.abs(value) >= 1000) {
		decimalPlaces = 0;
	} else if (Math.abs(value) >= 1) {
		decimalPlaces = 2;
	} else {
		decimalPlaces = 4;
	}

	// Format with appropriate decimal places
	const formatted = value.toFixed(decimalPlaces);

	// Remove trailing zeros
	return parseFloat(formatted).toString();
}

export function getUnitName(unit: DataUnit, locale: string): string {
	const unitNames: Record<string, Record<DataUnit, string>> = {
		ru: {
			B: 'Байт (B)',
			KB: 'Килобайт (KB)',
			MB: 'Мегабайт (MB)',
			GB: 'Гигабайт (GB)',
			TB: 'Терабайт (TB)',
		},
		en: {
			B: 'Byte (B)',
			KB: 'Kilobyte (KB)',
			MB: 'Megabyte (MB)',
			GB: 'Gigabyte (GB)',
			TB: 'Terabyte (TB)',
		},
		de: {
			B: 'Byte (B)',
			KB: 'Kilobyte (KB)',
			MB: 'Megabyte (MB)',
			GB: 'Gigabyte (GB)',
			TB: 'Terabyte (TB)',
		},
		es: {
			B: 'Byte (B)',
			KB: 'Kilobyte (KB)',
			MB: 'Megabyte (MB)',
			GB: 'Gigabyte (GB)',
			TB: 'Terabyte (TB)',
		},
	};

	return unitNames[locale]?.[unit] || unit;
}

export function getCommonConversions(
	value: number,
	unit: DataUnit
): Array<{
	unit: DataUnit;
	value: number;
	formatted: string;
}> {
	const conversions: Array<{
		unit: DataUnit;
		value: number;
		formatted: string;
	}> = [];

	DATA_UNITS.forEach((targetUnit) => {
		if (targetUnit !== unit) {
			const result = convertData({
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

export function getUnitDescription(unit: DataUnit, locale: string): string {
	const descriptions: Record<string, Record<DataUnit, string>> = {
		ru: {
			B: 'Байт - основная единица измерения данных в компьютерах',
			KB: 'Килобайт - 1024 байта, используется для небольших файлов',
			MB: 'Мегабайт - 1024 килобайта, используется для изображений и документов',
			GB: 'Гигабайт - 1024 мегабайта, используется для видео и программ',
			TB: 'Терабайт - 1024 гигабайта, используется для больших хранилищ данных',
		},
		en: {
			B: 'Byte - basic unit of data measurement in computers',
			KB: 'Kilobyte - 1024 bytes, used for small files',
			MB: 'Megabyte - 1024 kilobytes, used for images and documents',
			GB: 'Gigabyte - 1024 megabytes, used for videos and programs',
			TB: 'Terabyte - 1024 gigabytes, used for large data storage',
		},
		de: {
			B: 'Byte - Grundeinheit der Datenmessung in Computern',
			KB: 'Kilobyte - 1024 Byte, für kleine Dateien verwendet',
			MB: 'Megabyte - 1024 Kilobyte, für Bilder und Dokumente verwendet',
			GB: 'Gigabyte - 1024 Megabyte, für Videos und Programme verwendet',
			TB: 'Terabyte - 1024 Gigabyte, für große Datenspeicher verwendet',
		},
		es: {
			B: 'Byte - unidad básica de medición de datos en computadoras',
			KB: 'Kilobyte - 1024 bytes, usado para archivos pequeños',
			MB: 'Megabyte - 1024 kilobytes, usado para imágenes y documentos',
			GB: 'Gigabyte - 1024 megabytes, usado para videos y programas',
			TB: 'Terabyte - 1024 gigabytes, usado para grandes almacenamientos de datos',
		},
	};

	return descriptions[locale]?.[unit] || '';
}

export function getDataScale(unit: DataUnit): {
	name: string;
	typicalRange: { min: number; max: number };
	description: string;
} {
	const scales = {
		B: {
			name: 'Byte',
			typicalRange: { min: 0, max: 1024 },
			description: 'Small text files, single characters',
		},
		KB: {
			name: 'Kilobyte',
			typicalRange: { min: 0, max: 1024 },
			description: 'Small images, short documents',
		},
		MB: {
			name: 'Megabyte',
			typicalRange: { min: 0, max: 1024 },
			description: 'Photos, music files, documents',
		},
		GB: {
			name: 'Gigabyte',
			typicalRange: { min: 0, max: 1024 },
			description: 'Videos, software, large files',
		},
		TB: {
			name: 'Terabyte',
			typicalRange: { min: 0, max: 100 },
			description: 'Large databases, video collections',
		},
	};

	return scales[unit];
}

export function getConversionFormula(
	fromUnit: DataUnit,
	toUnit: DataUnit
): string {
	const formulas: Record<string, string> = {
		'B-KB': 'KB = B ÷ 1024',
		'B-MB': 'MB = B ÷ (1024²)',
		'B-GB': 'GB = B ÷ (1024³)',
		'B-TB': 'TB = B ÷ (1024⁴)',
		'KB-B': 'B = KB × 1024',
		'KB-MB': 'MB = KB ÷ 1024',
		'KB-GB': 'GB = KB ÷ (1024²)',
		'KB-TB': 'TB = KB ÷ (1024³)',
		'MB-B': 'B = MB × (1024²)',
		'MB-KB': 'KB = MB × 1024',
		'MB-GB': 'GB = MB ÷ 1024',
		'MB-TB': 'TB = MB ÷ (1024²)',
		'GB-B': 'B = GB × (1024³)',
		'GB-KB': 'KB = GB × (1024²)',
		'GB-MB': 'MB = GB × 1024',
		'GB-TB': 'TB = GB ÷ 1024',
		'TB-B': 'B = TB × (1024⁴)',
		'TB-KB': 'KB = TB × (1024³)',
		'TB-MB': 'MB = TB × (1024²)',
		'TB-GB': 'GB = TB × 1024',
	};

	return formulas[`${fromUnit}-${toUnit}`] || '';
}

export function getStandardDataReferences(): {
	name: string;
	B: number;
	KB: number;
	MB: number;
	GB: number;
	TB: number;
}[] {
	return [
		{
			name: 'Text file (1 page)',
			B: 2048,
			KB: 2,
			MB: 0.002,
			GB: 0.000002,
			TB: 0.000000002,
		},
		{
			name: 'Photo (JPEG)',
			B: 2097152,
			KB: 2048,
			MB: 2,
			GB: 0.002,
			TB: 0.000002,
		},
		{
			name: 'Music file (MP3)',
			B: 4194304,
			KB: 4096,
			MB: 4,
			GB: 0.004,
			TB: 0.000004,
		},
		{
			name: 'Video (HD)',
			B: 1073741824,
			KB: 1048576,
			MB: 1024,
			GB: 1,
			TB: 0.001,
		},
		{
			name: 'Operating System',
			B: 10737418240,
			KB: 10485760,
			MB: 10240,
			GB: 10,
			TB: 0.01,
		},
	];
}
