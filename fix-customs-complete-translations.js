#!/usr/bin/env node

/**
 * Script to add complete customs calculator translations to all language files
 */

const fs = require('fs');
const path = require('path');

/**
 * Complete customs translations for Russian
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
			fuelType: 'Тип топлива',
			carAge: 'Возраст автомобиля (лет)',
			enginePower: 'Мощность двигателя (л.с.)',
			calculate: 'Рассчитать',
			errors: {
				title: 'Ошибки в данных',
			},
		},
		results: {
			title: 'Результаты расчёта',
			total: 'Общая стоимость',
			totalDescription: 'Итоговая сумма к уплате',
			details: 'Детали расчёта',
			carValue: 'Стоимость автомобиля',
			duty: 'Таможенная пошлина',
			excise: 'Акциз',
			vat: 'НДС',
			recyclingFee: 'Утилизационный сбор',
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
				excise: 'Акциз взимается с автомобилей мощностью свыше 90 л.с.',
				vat: 'НДС рассчитывается от суммы: стоимость + пошлина + акциз',
				recycling:
					'Утилизационный сбор зависит от типа и возраста автомобиля',
			},
			advantages: {
				title: 'Преимущества калькулятора',
				content:
					'Наш калькулятор таможенных пошлин поможет вам оценить стоимость растаможки автомобиля.',
				quick: 'Быстрый расчёт за несколько секунд',
				accurate: 'Точные расчёты по актуальным тарифам',
				planning: 'Помощь в планировании бюджета',
				comparison: 'Сравнение с покупкой в России',
			},
			tips: {
				title: 'Полезные советы',
				content:
					'При расчёте таможенных пошлин учитывайте следующие факторы:',
				age: 'Возраст автомобиля влияет на размер пошлины',
				volume: 'Объём двигателя определяет ставку пошлины',
				documentation: 'Подготовьте все необходимые документы',
				consultation: 'При сомнениях обратитесь к специалистам',
			},
		},
	},
};

/**
 * Complete customs translations for English
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
			fuelType: 'Fuel Type',
			carAge: 'Car Age (years)',
			enginePower: 'Engine Power (hp)',
			calculate: 'Calculate',
			errors: {
				title: 'Data Errors',
			},
		},
		results: {
			title: 'Calculation Results',
			total: 'Total Cost',
			totalDescription: 'Final amount to pay',
			details: 'Calculation Details',
			carValue: 'Car Value',
			duty: 'Customs Duty',
			excise: 'Excise Tax',
			vat: 'VAT',
			recyclingFee: 'Recycling Fee',
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
				excise: 'Excise tax is charged on cars with power over 90 hp',
				vat: 'VAT is calculated from: value + duty + excise',
				recycling: 'Recycling fee depends on car type and age',
			},
			advantages: {
				title: 'Calculator Benefits',
				content:
					'Our customs duty calculator helps you estimate car customs clearance costs.',
				quick: 'Quick calculation in seconds',
				accurate: 'Accurate calculations using current tariffs',
				planning: 'Help in budget planning',
				comparison: 'Comparison with domestic purchase',
			},
			tips: {
				title: 'Useful Tips',
				content:
					'When calculating customs duties, consider the following factors:',
				age: 'Car age affects duty amount',
				volume: 'Engine volume determines duty rate',
				documentation: 'Prepare all necessary documents',
				consultation: 'Consult specialists if in doubt',
			},
		},
	},
};

/**
 * Complete customs translations for Spanish
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
			fuelType: 'Tipo de Combustible',
			carAge: 'Edad del Auto (años)',
			enginePower: 'Potencia del Motor (hp)',
			calculate: 'Calcular',
			errors: {
				title: 'Errores en los Datos',
			},
		},
		results: {
			title: 'Resultados del Cálculo',
			total: 'Costo Total',
			totalDescription: 'Monto final a pagar',
			details: 'Detalles del Cálculo',
			carValue: 'Valor del Auto',
			duty: 'Arancel Aduanero',
			excise: 'Impuesto de Consumo',
			vat: 'IVA',
			recyclingFee: 'Tasa de Reciclaje',
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
				excise: 'El impuesto de consumo se cobra en autos con potencia superior a 90 hp',
				vat: 'El IVA se calcula de: valor + arancel + impuesto de consumo',
				recycling:
					'La tasa de reciclaje depende del tipo y edad del auto',
			},
			advantages: {
				title: 'Beneficios de la Calculadora',
				content:
					'Nuestra calculadora de aranceles aduaneros le ayuda a estimar los costos de despacho aduanero de autos.',
				quick: 'Cálculo rápido en segundos',
				accurate: 'Cálculos precisos usando tarifas actuales',
				planning: 'Ayuda en la planificación del presupuesto',
				comparison: 'Comparación con compra doméstica',
			},
			tips: {
				title: 'Consejos Útiles',
				content:
					'Al calcular aranceles aduaneros, considere los siguientes factores:',
				age: 'La edad del auto afecta el monto del arancel',
				volume: 'El volumen del motor determina la tasa del arancel',
				documentation: 'Prepare todos los documentos necesarios',
				consultation: 'Consulte a especialistas si tiene dudas',
			},
		},
	},
};

/**
 * Complete customs translations for German
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
			fuelType: 'Kraftstoffart',
			carAge: 'Auto Alter (Jahre)',
			enginePower: 'Motorleistung (PS)',
			calculate: 'Berechnen',
			errors: {
				title: 'Datenfehler',
			},
		},
		results: {
			title: 'Berechnungsergebnisse',
			total: 'Gesamtkosten',
			totalDescription: 'Endbetrag zu zahlen',
			details: 'Berechnungsdetails',
			carValue: 'Auto Wert',
			duty: 'Zollgebühr',
			excise: 'Verbrauchsteuer',
			vat: 'MwSt',
			recyclingFee: 'Recyclinggebühr',
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
				excise: 'Verbrauchsteuer wird bei Autos mit über 90 PS erhoben',
				vat: 'MwSt wird berechnet von: Wert + Zollgebühr + Verbrauchsteuer',
				recycling: 'Recyclinggebühr hängt von Auto-Typ und Alter ab',
			},
			advantages: {
				title: 'Rechner Vorteile',
				content:
					'Unser Zollrechner hilft Ihnen, die Zollabfertigungskosten für Autos zu schätzen.',
				quick: 'Schnelle Berechnung in Sekunden',
				accurate: 'Präzise Berechnungen mit aktuellen Tarifen',
				planning: 'Hilfe bei der Budgetplanung',
				comparison: 'Vergleich mit Inlandskauf',
			},
			tips: {
				title: 'Nützliche Tipps',
				content:
					'Bei der Berechnung von Zollgebühren beachten Sie folgende Faktoren:',
				age: 'Auto-Alter beeinflusst Zollgebührenhöhe',
				volume: 'Motorvolumen bestimmt Zollgebührensatz',
				documentation: 'Bereiten Sie alle notwendigen Dokumente vor',
				consultation: 'Konsultieren Sie bei Zweifeln Spezialisten',
			},
		},
	},
};

/**
 * Add complete customs translations to a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 * @param {object} translations - Translations to add
 */
function addCompleteCustomsTranslations(filePath, language, translations) {
	console.log(
		`Adding complete customs translations to ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.customs.complete.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Ensure calculators section exists
	if (!data.calculators) {
		data.calculators = {};
	}

	// Replace customs translations completely
	data.calculators.customs = translations.customs;

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Added complete customs translations to ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log(
		'🔧 Adding complete customs calculator translations to all language files...\n'
	);

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Add complete customs translations to all languages
	const ruFile = path.join(messagesDir, 'ru.json');
	if (fs.existsSync(ruFile)) {
		addCompleteCustomsTranslations(
			ruFile,
			'ru',
			customsRussianTranslations
		);
	}

	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		addCompleteCustomsTranslations(
			enFile,
			'en',
			customsEnglishTranslations
		);
	}

	const esFile = path.join(messagesDir, 'es.json');
	if (fs.existsSync(esFile)) {
		addCompleteCustomsTranslations(
			esFile,
			'es',
			customsSpanishTranslations
		);
	}

	const deFile = path.join(messagesDir, 'de.json');
	if (fs.existsSync(deFile)) {
		addCompleteCustomsTranslations(deFile, 'de', customsGermanTranslations);
	}

	console.log(
		'\n✅ Complete customs calculator translations added to all language files!'
	);
	console.log('\n📋 Summary:');
	console.log('  - Added complete customs translations to Russian');
	console.log('  - Added complete customs translations to English');
	console.log('  - Added complete customs translations to Spanish');
	console.log('  - Added complete customs translations to German');
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
	addCompleteCustomsTranslations,
	customsRussianTranslations,
	customsEnglishTranslations,
	customsSpanishTranslations,
	customsGermanTranslations,
};
