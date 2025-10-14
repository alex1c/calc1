#!/usr/bin/env node

/**
 * Script to add customs calculator translations to all language files
 */

const fs = require('fs');
const path = require('path');

/**
 * Customs translations for Russian
 */
const customsRussianTranslations = {
	customs: {
		title: 'Калькулятор таможенных пошлин',
		description: 'Расчёт таможенных пошлин и сборов при ввозе автомобиля',
		breadcrumbs: {
			auto: 'Авто',
		},
		form: {
			title: 'Параметры расчёта',
			carValue: 'Стоимость автомобиля (₽)',
			engineVolume: 'Объём двигателя (л)',
			carAge: 'Возраст автомобиля (лет)',
			calculate: 'Рассчитать',
			errors: {
				title: 'Ошибки в данных',
			},
		},
		results: {
			title: 'Результаты расчёта',
			customsDuty: 'Таможенная пошлина',
			customsFee: 'Таможенный сбор',
			totalCost: 'Общая стоимость',
			details: 'Детали расчёта',
			placeholder: 'Введите данные для расчёта',
		},
		seo: {
			title: 'Калькулятор таможенных пошлин онлайн',
			overview: {
				title: 'О калькуляторе таможенных пошлин',
				content:
					'Онлайн калькулятор таможенных пошлин поможет рассчитать размер пошлин и сборов при ввозе автомобиля в Россию. Удобный инструмент для оценки стоимости растаможки.',
			},
			calculation: {
				title: 'Как рассчитываются таможенные пошлины',
				content:
					'Таможенные пошлины рассчитываются на основе стоимости автомобиля, объёма двигателя и возраста автомобиля согласно действующим тарифам.',
				duty: 'Пошлина рассчитывается по ставкам в зависимости от объёма двигателя',
				fee: 'Таможенный сбор составляет фиксированную сумму',
				total: 'Общая стоимость = Пошлина + Сбор',
			},
			advantages: {
				title: 'Преимущества калькулятора',
				content:
					'Наш калькулятор таможенных пошлин поможет вам оценить стоимость растаможки автомобиля.',
				quick: 'Быстрый расчёт за несколько секунд',
				accurate: 'Точные расчёты по актуальным тарифам',
				comparison: 'Сравнение с покупкой в России',
			},
		},
	},
};

/**
 * Customs translations for English
 */
const customsEnglishTranslations = {
	customs: {
		title: 'Customs Duty Calculator',
		description: 'Calculate customs duties and fees for car import',
		breadcrumbs: {
			auto: 'Auto',
		},
		form: {
			title: 'Calculation Parameters',
			carValue: 'Car Value ($)',
			engineVolume: 'Engine Volume (L)',
			carAge: 'Car Age (years)',
			calculate: 'Calculate',
			errors: {
				title: 'Data Errors',
			},
		},
		results: {
			title: 'Calculation Results',
			customsDuty: 'Customs Duty',
			customsFee: 'Customs Fee',
			totalCost: 'Total Cost',
			details: 'Calculation Details',
			placeholder: 'Enter data for calculation',
		},
		seo: {
			title: 'Online Customs Duty Calculator',
			overview: {
				title: 'About Customs Duty Calculator',
				content:
					'Online customs duty calculator helps calculate duties and fees for car import. Convenient tool for estimating customs clearance costs.',
			},
			calculation: {
				title: 'How Customs Duties are Calculated',
				content:
					'Customs duties are calculated based on car value, engine volume and car age according to current tariffs.',
				duty: 'Duty is calculated by rates depending on engine volume',
				fee: 'Customs fee is a fixed amount',
				total: 'Total Cost = Duty + Fee',
			},
			advantages: {
				title: 'Calculator Benefits',
				content:
					'Our customs duty calculator helps you estimate car customs clearance costs.',
				quick: 'Quick calculation in seconds',
				accurate: 'Accurate calculations using current tariffs',
				comparison: 'Comparison with domestic purchase',
			},
		},
	},
};

/**
 * Customs translations for Spanish
 */
const customsSpanishTranslations = {
	customs: {
		title: 'Calculadora de Aranceles Aduaneros',
		description:
			'Calcular aranceles aduaneros y tasas para importación de autos',
		breadcrumbs: {
			auto: 'Auto',
		},
		form: {
			title: 'Parámetros de Cálculo',
			carValue: 'Valor del Auto (€)',
			engineVolume: 'Volumen del Motor (L)',
			carAge: 'Edad del Auto (años)',
			calculate: 'Calcular',
			errors: {
				title: 'Errores en los Datos',
			},
		},
		results: {
			title: 'Resultados del Cálculo',
			customsDuty: 'Arancel Aduanero',
			customsFee: 'Tasa Aduanera',
			totalCost: 'Costo Total',
			details: 'Detalles del Cálculo',
			placeholder: 'Ingrese datos para el cálculo',
		},
		seo: {
			title: 'Calculadora de Aranceles Aduaneros Online',
			overview: {
				title: 'Sobre la Calculadora de Aranceles Aduaneros',
				content:
					'La calculadora de aranceles aduaneros online ayuda a calcular aranceles y tasas para importación de autos. Herramienta conveniente para estimar costos de despacho aduanero.',
			},
			calculation: {
				title: 'Cómo se Calculan los Aranceles Aduaneros',
				content:
					'Los aranceles aduaneros se calculan basándose en el valor del auto, volumen del motor y edad del auto según las tarifas vigentes.',
				duty: 'El arancel se calcula por tasas dependiendo del volumen del motor',
				fee: 'La tasa aduanera es un monto fijo',
				total: 'Costo Total = Arancel + Tasa',
			},
			advantages: {
				title: 'Beneficios de la Calculadora',
				content:
					'Nuestra calculadora de aranceles aduaneros le ayuda a estimar los costos de despacho aduanero de autos.',
				quick: 'Cálculo rápido en segundos',
				accurate: 'Cálculos precisos usando tarifas actuales',
				comparison: 'Comparación con compra doméstica',
			},
		},
	},
};

/**
 * Customs translations for German
 */
const customsGermanTranslations = {
	customs: {
		title: 'Zollrechner',
		description: 'Zollgebühren und Abgaben für Autoimport berechnen',
		breadcrumbs: {
			auto: 'Auto',
		},
		form: {
			title: 'Berechnungsparameter',
			carValue: 'Auto Wert (€)',
			engineVolume: 'Motorvolumen (L)',
			carAge: 'Auto Alter (Jahre)',
			calculate: 'Berechnen',
			errors: {
				title: 'Datenfehler',
			},
		},
		results: {
			title: 'Berechnungsergebnisse',
			customsDuty: 'Zollgebühr',
			customsFee: 'Zollabgabe',
			totalCost: 'Gesamtkosten',
			details: 'Berechnungsdetails',
			placeholder: 'Daten für Berechnung eingeben',
		},
		seo: {
			title: 'Online Zollrechner',
			overview: {
				title: 'Über den Zollrechner',
				content:
					'Der Online Zollrechner hilft bei der Berechnung von Zollgebühren und Abgaben für Autoimport. Praktisches Tool zur Schätzung der Zollabfertigungskosten.',
			},
			calculation: {
				title: 'Wie Zollgebühren Berechnet Werden',
				content:
					'Zollgebühren werden basierend auf Auto-Wert, Motorvolumen und Auto-Alter nach aktuellen Tarifen berechnet.',
				duty: 'Zollgebühr wird nach Sätzen abhängig vom Motorvolumen berechnet',
				fee: 'Zollabgabe ist ein fester Betrag',
				total: 'Gesamtkosten = Zollgebühr + Abgabe',
			},
			advantages: {
				title: 'Rechner Vorteile',
				content:
					'Unser Zollrechner hilft Ihnen, die Zollabfertigungskosten für Autos zu schätzen.',
				quick: 'Schnelle Berechnung in Sekunden',
				accurate: 'Präzise Berechnungen mit aktuellen Tarifen',
				comparison: 'Vergleich mit Inlandskauf',
			},
		},
	},
};

/**
 * Add customs translations to a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 * @param {object} translations - Translations to add
 */
function addCustomsTranslations(filePath, language, translations) {
	console.log(
		`Adding customs translations to ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.customs.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Ensure calculators section exists
	if (!data.calculators) {
		data.calculators = {};
	}

	// Add customs translations
	data.calculators.customs = translations.customs;

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Added customs translations to ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log(
		'🔧 Adding customs calculator translations to all language files...\n'
	);

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Add customs translations to all languages
	const ruFile = path.join(messagesDir, 'ru.json');
	if (fs.existsSync(ruFile)) {
		addCustomsTranslations(ruFile, 'ru', customsRussianTranslations);
	}

	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		addCustomsTranslations(enFile, 'en', customsEnglishTranslations);
	}

	const esFile = path.join(messagesDir, 'es.json');
	if (fs.existsSync(esFile)) {
		addCustomsTranslations(esFile, 'es', customsSpanishTranslations);
	}

	const deFile = path.join(messagesDir, 'de.json');
	if (fs.existsSync(deFile)) {
		addCustomsTranslations(deFile, 'de', customsGermanTranslations);
	}

	console.log(
		'\n✅ Customs calculator translations added to all language files!'
	);
	console.log('\n📋 Summary:');
	console.log('  - Added customs translations to Russian');
	console.log('  - Added customs translations to English');
	console.log('  - Added customs translations to Spanish');
	console.log('  - Added customs translations to German');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the customs calculator in all languages');
	console.log(
		"  2. Remove backup files once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	addCustomsTranslations,
	customsRussianTranslations,
	customsEnglishTranslations,
	customsSpanishTranslations,
	customsGermanTranslations,
};
