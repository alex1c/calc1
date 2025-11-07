export type Locale = 'ru' | 'en' | 'de' | 'es' | 'fr' | 'it' | 'pl' | 'tr' | 'pt-BR'

export interface SoftwareApplicationSchema {
	'@context': string
	'@type': 'SoftwareApplication'
	name: string
	description: string
	url: string
	applicationCategory: string
	operatingSystem: string
	offers: {
		'@type': 'Offer'
		price: string
		priceCurrency: string
		availability: string
	}
	aggregateRating?: {
		'@type': 'AggregateRating'
		ratingValue: string
		ratingCount: string
		bestRating: string
		worstRating: string
	}
	featureList: string[]
	screenshot?: string
	softwareVersion: string
	datePublished: string
	dateModified: string
	inLanguage: string[]
	author: {
		'@type': 'Organization'
		name: string
		url: string
	}
}

// Application categories by calculator type
const applicationCategories: Record<string, string> = {
	finance: 'FinanceApplication',
	math: 'MathApplication',
	life: 'LifestyleApplication',
	construction: 'BusinessApplication',
	auto: 'AutomotiveApplication',
	time: 'UtilityApplication',
	health: 'HealthApplication',
	fun: 'EntertainmentApplication',
	converter: 'UtilityApplication',
	it: 'DeveloperApplication',
	science: 'EducationApplication',
}

// Currency by locale
const currencies: Record<Locale, string> = {
	ru: 'RUB',
	en: 'USD',
	de: 'EUR',
	es: 'EUR',
	fr: 'EUR',
	it: 'EUR',
	pl: 'PLN',
	tr: 'TRY',
	'pt-BR': 'BRL',
}

export function generateSoftwareApplicationSchema({
	category,
	calculatorId,
	locale,
	name,
	description,
	featureList,
	ratingValue = '4.9',
	ratingCount = '100',
	screenshot,
}: {
	category: string
	calculatorId: string
	locale: Locale
	name: string
	description: string
	featureList: string[]
	ratingValue?: string
	ratingCount?: string
	screenshot?: string
}): SoftwareApplicationSchema {
	const baseUrl = 'https://calc1.ru'
	const url = `${baseUrl}/${locale}/${category}/${calculatorId}`
	const applicationCategory =
		applicationCategories[category] || 'UtilityApplication'
	const priceCurrency = currencies[locale] || 'USD'

	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name,
		description,
		url,
		applicationCategory,
		operatingSystem: 'Web Browser',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency,
			availability: 'https://schema.org/InStock',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue,
			ratingCount,
			bestRating: '5',
			worstRating: '1',
		},
		featureList,
		...(screenshot && { screenshot }),
		softwareVersion: '1.0',
		datePublished: '2024-01-01',
		dateModified: new Date().toISOString(),
		inLanguage: [
			'ru',
			'en',
			'de',
			'es',
			'fr',
			'it',
			'pl',
			'tr',
			'pt-BR',
		],
		author: {
			'@type': 'Organization',
			name: 'Calc1.ru',
			url: baseUrl,
		},
	}
}

