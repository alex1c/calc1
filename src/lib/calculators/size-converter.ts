export interface SizeInput {
	category: SizeCategory;
	gender: SizeGender;
	country: SizeCountry;
	size: string | number;
}

export interface SizeResult {
	country: SizeCountry;
	size: string | number;
}

export type SizeCategory = 'clothing' | 'jeans' | 'shoes';
export type SizeGender = 'male' | 'female' | 'child';
export type SizeCountry = 'RU' | 'EU' | 'US' | 'UK' | 'JP' | 'CN';

export interface SizeValidation {
	isValid: boolean;
	error?: string;
}

export const SIZE_CATEGORIES: SizeCategory[] = ['clothing', 'jeans', 'shoes'];
export const SIZE_GENDERS: SizeGender[] = ['male', 'female', 'child'];
export const SIZE_COUNTRIES: SizeCountry[] = [
	'RU',
	'EU',
	'US',
	'UK',
	'JP',
	'CN',
];

export function validateSizeInput(input: SizeInput): SizeValidation {
	const { category, gender, country, size } = input;

	if (!category || !SIZE_CATEGORIES.includes(category)) {
		return { isValid: false, error: 'invalidCategory' };
	}

	if (!gender || !SIZE_GENDERS.includes(gender)) {
		return { isValid: false, error: 'invalidGender' };
	}

	if (!country || !SIZE_COUNTRIES.includes(country)) {
		return { isValid: false, error: 'invalidCountry' };
	}

	if (!size || (typeof size === 'string' && size.trim() === '')) {
		return { isValid: false, error: 'sizeRequired' };
	}

	// Special validation for jeans category - no child gender
	if (category === 'jeans' && gender === 'child') {
		return { isValid: false, error: 'jeansNoChild' };
	}

	return { isValid: true };
}

export function convertSize(input: SizeInput, sizeData: any): SizeResult[] {
	const validation = validateSizeInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { category, gender, country, size } = input;

	// Get the size data for the specific category and gender
	const categoryData = sizeData[category];
	if (!categoryData || !categoryData[gender]) {
		throw new Error('No data available for this category and gender');
	}

	const genderData = categoryData[gender];

	// Find the index of the input size in the source country
	const sourceSizes = genderData[country];
	if (!sourceSizes) {
		throw new Error('No data available for this country');
	}

	const sizeIndex = sourceSizes.findIndex(
		(s: any) => s === size || s.toString() === size.toString()
	);

	if (sizeIndex === -1) {
		throw new Error('Size not found in source country data');
	}

	// Convert to all other countries
	const results: SizeResult[] = [];

	SIZE_COUNTRIES.forEach((targetCountry) => {
		if (targetCountry !== country) {
			const targetSizes = genderData[targetCountry];
			if (targetSizes && targetSizes[sizeIndex] !== undefined) {
				results.push({
					country: targetCountry,
					size: targetSizes[sizeIndex],
				});
			}
		}
	});

	return results;
}

export function getAvailableSizes(
	category: SizeCategory,
	gender: SizeGender,
	country: SizeCountry,
	sizeData: any
): (string | number)[] {
	const categoryData = sizeData[category];
	if (!categoryData || !categoryData[gender]) {
		return [];
	}

	const genderData = categoryData[gender];
	return genderData[country] || [];
}

export function getCountryName(country: SizeCountry, locale: string): string {
	const countryNames: Record<string, Record<SizeCountry, string>> = {
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

export function getCategoryName(
	category: SizeCategory,
	locale: string
): string {
	const categoryNames: Record<string, Record<SizeCategory, string>> = {
		ru: {
			clothing: 'Одежда',
			jeans: 'Джинсы',
			shoes: 'Обувь',
		},
		en: {
			clothing: 'Clothing',
			jeans: 'Jeans',
			shoes: 'Shoes',
		},
		de: {
			clothing: 'Kleidung',
			jeans: 'Jeans',
			shoes: 'Schuhe',
		},
		es: {
			clothing: 'Ropa',
			jeans: 'Jeans',
			shoes: 'Zapatos',
		},
	};

	return categoryNames[locale]?.[category] || category;
}

export function getGenderName(gender: SizeGender, locale: string): string {
	const genderNames: Record<string, Record<SizeGender, string>> = {
		ru: {
			male: 'Мужской',
			female: 'Женский',
			child: 'Детский',
		},
		en: {
			male: 'Male',
			female: 'Female',
			child: 'Child',
		},
		de: {
			male: 'Männlich',
			female: 'Weiblich',
			child: 'Kind',
		},
		es: {
			male: 'Masculino',
			female: 'Femenino',
			child: 'Infantil',
		},
	};

	return genderNames[locale]?.[gender] || gender;
}

export function getSizeDescription(
	category: SizeCategory,
	gender: SizeGender,
	locale: string
): string {
	const descriptions: Record<
		string,
		Record<SizeCategory, Record<SizeGender, string>>
	> = {
		ru: {
			clothing: {
				male: 'Мужская одежда - размеры по обхвату груди',
				female: 'Женская одежда - размеры по обхвату груди',
				child: 'Детская одежда - размеры по росту',
			},
			jeans: {
				male: 'Мужские джинсы - размеры по обхвату талии',
				female: 'Женские джинсы - размеры по обхвату талии',
				child: 'Детские джинсы не поддерживаются',
			},
			shoes: {
				male: 'Мужская обувь - размеры по длине стопы',
				female: 'Женская обувь - размеры по длине стопы',
				child: 'Детская обувь - размеры по длине стопы',
			},
		},
		en: {
			clothing: {
				male: "Men's clothing - sizes by chest circumference",
				female: "Women's clothing - sizes by chest circumference",
				child: "Children's clothing - sizes by height",
			},
			jeans: {
				male: "Men's jeans - sizes by waist circumference",
				female: "Women's jeans - sizes by waist circumference",
				child: "Children's jeans not supported",
			},
			shoes: {
				male: "Men's shoes - sizes by foot length",
				female: "Women's shoes - sizes by foot length",
				child: "Children's shoes - sizes by foot length",
			},
		},
		de: {
			clothing: {
				male: 'Herrenkleidung - Größen nach Brustumfang',
				female: 'Damenkleidung - Größen nach Brustumfang',
				child: 'Kinderkleidung - Größen nach Körpergröße',
			},
			jeans: {
				male: 'Herrenjeans - Größen nach Taillenumfang',
				female: 'Damenjeans - Größen nach Taillenumfang',
				child: 'Kinderjeans nicht unterstützt',
			},
			shoes: {
				male: 'Herrenschuhe - Größen nach Fußlänge',
				female: 'Damenschuhe - Größen nach Fußlänge',
				child: 'Kinderschuhe - Größen nach Fußlänge',
			},
		},
		es: {
			clothing: {
				male: 'Ropa masculina - tallas por contorno de pecho',
				female: 'Ropa femenina - tallas por contorno de pecho',
				child: 'Ropa infantil - tallas por altura',
			},
			jeans: {
				male: 'Jeans masculinos - tallas por contorno de cintura',
				female: 'Jeans femeninos - tallas por contorno de cintura',
				child: 'Jeans infantiles no soportados',
			},
			shoes: {
				male: 'Zapatos masculinos - tallas por longitud del pie',
				female: 'Zapatos femeninos - tallas por longitud del pie',
				child: 'Zapatos infantiles - tallas por longitud del pie',
			},
		},
	};

	return descriptions[locale]?.[category]?.[gender] || '';
}

export function getSizeChartData(
	category: SizeCategory,
	gender: SizeGender,
	sizeData: any
): Record<SizeCountry, (string | number)[]> {
	const categoryData = sizeData[category];
	if (!categoryData || !categoryData[gender]) {
		return {} as Record<SizeCountry, (string | number)[]>;
	}

	return categoryData[gender];
}

export function formatSizeValue(size: string | number): string {
	if (typeof size === 'number') {
		return size.toString();
	}
	return size;
}

export function getSizeRange(
	category: SizeCategory,
	gender: SizeGender,
	country: SizeCountry,
	sizeData: any
): { min: string | number; max: string | number } {
	const sizes = getAvailableSizes(category, gender, country, sizeData);
	if (sizes.length === 0) {
		return { min: 0, max: 0 };
	}

	return {
		min: sizes[0],
		max: sizes[sizes.length - 1],
	};
}
