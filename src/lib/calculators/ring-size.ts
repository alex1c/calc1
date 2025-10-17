export interface RingInput {
	measurementType: 'size' | 'diameter';
	country: RingCountry;
	value: number;
}

export interface RingResult {
	country: RingCountry;
	size: string | number;
	diameter: number;
}

export type RingCountry = 'RU' | 'EU' | 'US' | 'UK' | 'JP' | 'CN';

export interface RingValidation {
	isValid: boolean;
	error?: string;
}

export interface RingData {
	size: string | number;
	diameter: number;
}

export const RING_COUNTRIES: RingCountry[] = [
	'RU',
	'EU',
	'US',
	'UK',
	'JP',
	'CN',
];

export function validateRingInput(input: RingInput): RingValidation {
	const { measurementType, country, value } = input;

	if (!measurementType || !['size', 'diameter'].includes(measurementType)) {
		return { isValid: false, error: 'invalidMeasurementType' };
	}

	if (!country || !RING_COUNTRIES.includes(country)) {
		return { isValid: false, error: 'invalidCountry' };
	}

	if (!value || value <= 0) {
		return { isValid: false, error: 'invalidValue' };
	}

	// Validate diameter range (typical ring diameters are 14-24mm)
	if (measurementType === 'diameter' && (value < 14 || value > 24)) {
		return { isValid: false, error: 'diameterOutOfRange' };
	}

	return { isValid: true };
}

export function convertRingSize(input: RingInput, ringData: any): RingResult[] {
	const validation = validateRingInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { measurementType, country, value } = input;
	const results: RingResult[] = [];

	// Find the target diameter
	let targetDiameter: number;

	if (measurementType === 'diameter') {
		targetDiameter = value;
	} else {
		// Find diameter by size in the source country
		const countryData = ringData[country];
		if (!countryData) {
			throw new Error('No data available for this country');
		}

		const ringEntry = countryData.find(
			(ring: RingData) =>
				ring.size === value || ring.size.toString() === value.toString()
		);

		if (!ringEntry) {
			throw new Error('Size not found in source country data');
		}

		targetDiameter = ringEntry.diameter;
	}

	// Convert to all countries
	RING_COUNTRIES.forEach((targetCountry) => {
		if (targetCountry !== country || measurementType === 'diameter') {
			const countryData = ringData[targetCountry];
			if (!countryData) return;

			// Find the closest size for this diameter
			const closestRing = findClosestRingByDiameter(
				countryData,
				targetDiameter
			);
			if (closestRing) {
				results.push({
					country: targetCountry,
					size: closestRing.size,
					diameter: closestRing.diameter,
				});
			}
		}
	});

	return results;
}

function findClosestRingByDiameter(
	ringData: RingData[],
	targetDiameter: number
): RingData | null {
	if (ringData.length === 0) return null;

	// Find exact match first
	const exactMatch = ringData.find(
		(ring) => Math.abs(ring.diameter - targetDiameter) < 0.01
	);
	if (exactMatch) return exactMatch;

	// Find closest match
	let closest = ringData[0];
	let minDifference = Math.abs(closest.diameter - targetDiameter);

	for (const ring of ringData) {
		const difference = Math.abs(ring.diameter - targetDiameter);
		if (difference < minDifference) {
			minDifference = difference;
			closest = ring;
		}
	}

	return closest;
}

export function getAvailableSizes(
	country: RingCountry,
	ringData: any
): RingData[] {
	return ringData[country] || [];
}

export function getCountryName(country: RingCountry, locale: string): string {
	const countryNames: Record<string, Record<RingCountry, string>> = {
		ru: {
			RU: '🇷🇺 Россия',
			EU: '🇪🇺 Европа',
			US: '🇺🇸 США',
			UK: '🇬🇧 Великобритания',
			JP: '🇯🇵 Япония',
			CN: '🇨🇳 Китай',
		},
		en: {
			RU: '🇷🇺 Russia',
			EU: '🇪🇺 Europe',
			US: '🇺🇸 USA',
			UK: '🇬🇧 UK',
			JP: '🇯🇵 Japan',
			CN: '🇨🇳 China',
		},
		de: {
			RU: '🇷🇺 Russland',
			EU: '🇪🇺 Europa',
			US: '🇺🇸 USA',
			UK: '🇬🇧 Großbritannien',
			JP: '🇯🇵 Japan',
			CN: '🇨🇳 China',
		},
		es: {
			RU: '🇷🇺 Rusia',
			EU: '🇪🇺 Europa',
			US: '🇺🇸 EE.UU.',
			UK: '🇬🇧 Reino Unido',
			JP: '🇯🇵 Japón',
			CN: '🇨🇳 China',
		},
	};

	return countryNames[locale]?.[country] || country;
}

export function getMeasurementTypeName(
	measurementType: 'size' | 'diameter',
	locale: string
): string {
	const typeNames: Record<string, Record<'size' | 'diameter', string>> = {
		ru: {
			size: 'Размер кольца',
			diameter: 'Внутренний диаметр (мм)',
		},
		en: {
			size: 'Ring size',
			diameter: 'Inner diameter (mm)',
		},
		de: {
			size: 'Ringgröße',
			diameter: 'Innendurchmesser (mm)',
		},
		es: {
			size: 'Talla del anillo',
			diameter: 'Diámetro interior (mm)',
		},
	};

	return typeNames[locale]?.[measurementType] || measurementType;
}

export function formatRingSize(size: string | number): string {
	if (typeof size === 'number') {
		return size.toString();
	}
	return size;
}

export function formatDiameter(diameter: number): string {
	return diameter.toFixed(1);
}

export function getRingSizeDescription(
	country: RingCountry,
	locale: string
): string {
	const descriptions: Record<string, Record<RingCountry, string>> = {
		ru: {
			RU: 'Российские размеры колец (14-24)',
			EU: 'Европейские размеры колец (44-64)',
			US: 'Американские размеры колец (3-8)',
			UK: 'Британские размеры колец (F-P)',
			JP: 'Японские размеры колец (1-21)',
			CN: 'Китайские размеры колец (4-24)',
		},
		en: {
			RU: 'Russian ring sizes (14-24)',
			EU: 'European ring sizes (44-64)',
			US: 'American ring sizes (3-8)',
			UK: 'British ring sizes (F-P)',
			JP: 'Japanese ring sizes (1-21)',
			CN: 'Chinese ring sizes (4-24)',
		},
		de: {
			RU: 'Russische Ringgrößen (14-24)',
			EU: 'Europäische Ringgrößen (44-64)',
			US: 'Amerikanische Ringgrößen (3-8)',
			UK: 'Britische Ringgrößen (F-P)',
			JP: 'Japanische Ringgrößen (1-21)',
			CN: 'Chinesische Ringgrößen (4-24)',
		},
		es: {
			RU: 'Tallas de anillos rusas (14-24)',
			EU: 'Tallas de anillos europeas (44-64)',
			US: 'Tallas de anillos americanas (3-8)',
			UK: 'Tallas de anillos británicas (F-P)',
			JP: 'Tallas de anillos japonesas (1-21)',
			CN: 'Tallas de anillos chinas (4-24)',
		},
	};

	return descriptions[locale]?.[country] || '';
}

export function getRingSizeRange(
	country: RingCountry,
	ringData: any
): { min: string | number; max: string | number } {
	const sizes = getAvailableSizes(country, ringData);
	if (sizes.length === 0) {
		return { min: 0, max: 0 };
	}

	return {
		min: sizes[0].size,
		max: sizes[sizes.length - 1].size,
	};
}

export function getDiameterRange(): { min: number; max: number } {
	return { min: 14.0, max: 24.0 };
}

export function getRingSizeChartData(
	ringData: any
): Record<RingCountry, RingData[]> {
	const chartData: Record<RingCountry, RingData[]> = {} as Record<
		RingCountry,
		RingData[]
	>;

	RING_COUNTRIES.forEach((country) => {
		chartData[country] = getAvailableSizes(country, ringData);
	});

	return chartData;
}

export function calculateCircumference(diameter: number): number {
	return Math.PI * diameter;
}

export function calculateDiameterFromCircumference(
	circumference: number
): number {
	return circumference / Math.PI;
}
