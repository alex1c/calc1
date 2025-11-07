import { MetadataRoute } from 'next'

const baseUrl = 'https://calc1.ru'
const locales = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR']

// All calculator routes organized by category
const calculatorRoutes = {
	finance: [
		'alimony',
		'mortgage',
		'credit-loan',
		'auto-loan',
		'consumer-loan',
		'loan-overpayment',
		'investment',
		'savings',
		'compound-interest',
		'pension',
		'tax-calculator',
		'profit-margin',
		'vehicle-tax',
		'traffic-fines',
		'leasing',
	],
	math: [
		'basic',
		'percent',
		'area',
		'volume',
		'power-root',
		'equations',
		'statistics',
		'converter',
	],
	life: [
		'bmi',
		'calories',
		'pregnancy',
		'blood-alcohol',
		'water-usage',
		'size-converter',
		'ring-size',
		'paper-weight',
		'heating-cost',
		'gas-usage',
		'food-ration',
		'electricity-usage',
		'electricity-cost',
		'baby-growth',
	],
	construction: [
		'wallpaper',
		'paint',
		'tile',
		'laminate',
		'concrete',
		'roofing',
		'wall',
		'floor-heating',
		'rebar-calculator',
		'cable-section',
		'stairs',
		'water-pipe',
		'gravel',
		'electrical',
		'foundation',
		'plaster',
		'primer',
		'putty',
		'ventilation',
		'tile-glue',
		'tile-laminate',
		'wall-area',
	],
	auto: [
		'fuel-consumption',
		'car-loan',
		'car-depreciation',
		'customs',
		'kasko',
		'osago',
		'leasing',
		'lpg-payback',
		'traffic-fines',
		'vehicle-tax',
		'car-ownership',
	],
	time: [
		'age',
		'days-between',
		'add-time',
		'countdown',
		'timer',
		'deadline',
		'calendar',
		'world-time',
	],
	health: [
		'bmihealth',
		'heart-rate',
		'blood-pressure',
		'ovulation',
		'ideal-weight',
		'dose',
		'stress',
		'vitamins',
	],
	fun: [
		'love',
		'dice',
		'coin',
		'lottery',
		'random',
		'password',
		'zodiac',
		'nickname',
		'name-generator',
		'character-traits',
		'fantasy-world',
		'planet-weight',
	],
	converter: [
		'length',
		'weight',
		'temperature',
		'volume',
		'speed',
		'pressure',
		'energy',
		'data',
		'angle',
	],
	it: ['qr-generator', 'ip-calculator', 'hashrate'],
	science: ['grade-calculator'],
}

// Static pages
const staticPages = ['about', 'contact', 'privacy', 'terms', 'cookies']

export default function sitemap(): MetadataRoute.Sitemap {
	const routes: MetadataRoute.Sitemap = []

	// Homepage for all locales
	locales.forEach((locale) => {
		routes.push({
			url: locale === 'ru' ? baseUrl : `${baseUrl}/${locale}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
			alternates: {
				languages: Object.fromEntries(
					locales.map((l) => [
						l,
						l === 'ru' ? baseUrl : `${baseUrl}/${l}`,
					])
				),
			},
		})
	})

	// Category pages
	Object.keys(calculatorRoutes).forEach((category) => {
		locales.forEach((locale) => {
			routes.push({
				url: `${baseUrl}/${locale}/${category}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 0.9,
				alternates: {
					languages: Object.fromEntries(
						locales.map((l) => [
							l,
							`${baseUrl}/${l}/${category}`,
						])
					),
				},
			})
		})
	})

	// Calculator pages
	Object.entries(calculatorRoutes).forEach(([category, calculators]) => {
		calculators.forEach((calculator) => {
			locales.forEach((locale) => {
				routes.push({
					url: `${baseUrl}/${locale}/${category}/${calculator}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.8,
					alternates: {
						languages: Object.fromEntries(
							locales.map((l) => [
								l,
								`${baseUrl}/${l}/${category}/${calculator}`,
							])
						),
					},
				})
			})
		})
	})

	// Static pages
	staticPages.forEach((page) => {
		locales.forEach((locale) => {
			routes.push({
				url: `${baseUrl}/${locale}/${page}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.5,
				alternates: {
					languages: Object.fromEntries(
						locales.map((l) => [
							l,
							`${baseUrl}/${l}/${page}`,
						])
					),
				},
			})
		})
	})

	return routes
}

