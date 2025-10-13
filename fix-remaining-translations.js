#!/usr/bin/env node

/**
 * Script to fix remaining translation issues
 * 1. Fix KASKO calculator in English
 * 2. Add missing fuel calculator translations
 */

const fs = require('fs');
const path = require('path');

/**
 * KASKO English translations
 */
const kaskoEnglishFixes = {
	'Калькулятор КАСКО': 'KASKO Calculator',
	'Calculate стоимость полиса КАСКО с учётом стоимости автомобиля, возраста водителя, региона и других факторов':
		'Calculate KASKO policy cost considering car value, driver age, region and other factors',
	'Калькулятор КАСКО: расчёт стоимости полного автострахования':
		'KASKO Calculator: comprehensive auto insurance cost calculation',
	'Калькулятор КАСКО для расчёта стоимости полиса':
		'KASKO Calculator for policy cost calculation',
	'Калькулятор КАСКО — это профессиональный инструмент для расчёта стоимости полиса полного автострахования. С помощью нашего калькулятора вы сможете рассчитать точную стоимость КАСКО с учётом всех коэффициентов: стоимости автомобиля, возраста и стажа водителя, региона, наличия противоугонной системы и франшизы.':
		'KASKO Calculator is a professional tool for calculating comprehensive auto insurance policy cost. With our calculator you can calculate exact KASKO cost considering all coefficients: car value, driver age and experience, region, anti-theft system presence and deductible.',
	'Коэффициенты расчёта КАСКО': 'KASKO Calculation Coefficients',
	'Стоимость КАСКО рассчитывается по формуле: (Стоимость автомобиля × Базовая ставка) × Крегион × Квозраст × Кстаж × Ксигнализация × Кфраншиза':
		'KASKO cost is calculated by formula: (Car Value × Base Rate) × Kregion × Kage × Kexperience × Kalarm × Kdeductible',
	'Крегион: Москва = 1.2, СПб = 1.1, другие регионы = 1.0':
		'Kregion: Moscow = 1.2, St. Petersburg = 1.1, other regions = 1.0',
	'Квозраст: до 22 лет = 1.5, 22-30 лет = 1.2, старше 30 лет = 1.0':
		'Kage: under 22 years = 1.5, 22-30 years = 1.2, over 30 years = 1.0',
	'Кстаж: до 3 лет = 1.3, 3-10 лет = 1.1, более 10 лет = 1.0':
		'Kexperience: under 3 years = 1.3, 3-10 years = 1.1, over 10 years = 1.0',
	'Ксигнализация: есть сигнализация = 0.9, нет = 1.0':
		'Kalarm: has alarm = 0.9, no alarm = 1.0',
	'Кфраншиза: без франшизы = 1.0, 10 000 руб. = 0.9, 20 000 руб. = 0.8':
		'Kdeductible: no deductible = 1.0, $100 = 0.9, $200 = 0.8',
	'Преимущества использования калькулятора КАСКО':
		'Benefits of using KASKO Calculator',
	'Калькулятор КАСКО предоставляет множество преимуществ для планирования автострахования:':
		'KASKO Calculator provides many benefits for auto insurance planning:',
	'Быстрый расчёт стоимости полиса за несколько минут':
		'Quick policy cost calculation in minutes',
	'Точный расчёт с учётом всех актуальных коэффициентов':
		'Accurate calculation considering all current coefficients',
	'Возможность сравнения стоимости в разных страховых компаниях':
		'Ability to compare costs at different insurance companies',
	'Экономия времени и денег при выборе оптимального полиса':
		'Time and money savings when choosing optimal policy',
	'Советы по выбору КАСКО': 'Tips for choosing KASKO',
	'Для выбора оптимального полиса КАСКО:': 'To choose optimal KASKO policy:',
	'Сравнивайте предложения разных страховых компаний':
		'Compare offers from different insurance companies',
	'Поддерживайте хороший коэффициент бонус-малус безаварийным вождением':
		'Maintain good bonus-malus coefficient with accident-free driving',
	'Продлевайте полис заранее для сохранения скидок':
		'Renew policy in advance to maintain discounts',
	'Подготавливайте все необходимые документы заранее':
		'Prepare all necessary documents in advance',
	'Параметры расчёта КАСКО': 'KASKO Calculation Parameters',
	'Стоимость автомобиля (₽)': 'Car Value ($)',
	'Возраст водителя (лет)': 'Driver Age (years)',
	'Стаж вождения (лет)': 'Driving Experience (years)',
	Регион: 'Region',
	'Выберите регион': 'Select Region',
	'Противоугонная система': 'Anti-theft System',
	Есть: 'Yes',
	Нет: 'No',
	Франшиза: 'Deductible',
	'Без франшизы': 'No Deductible',
	'10 000 руб.': '$100',
	'20 000 руб.': '$200',
	'Стоимость полиса': 'Policy Cost',
	'Рассчитать стоимость': 'Calculate Cost',
};

/**
 * Missing fuel calculator translations for Spanish
 */
const fuelSpanishTranslations = {
	fuel: {
		title: 'Calculadora de Consumo de Combustible',
		description:
			'Calcular el consumo de combustible, distancia de viaje y costos de combustible para planificación de viajes',
		seo: {
			title: 'Calculadora de Consumo de Combustible: Calcular Distancia y Costos',
			overview: {
				title: 'Calculadora de Consumo de Combustible',
				content:
					'La calculadora de consumo de combustible es una herramienta profesional para calcular el consumo de combustible, distancia de viaje y costos. Con nuestra calculadora puedes calcular cuánto combustible necesitas para un viaje, qué distancia puedes recorrer con el combustible disponible y planificar tus gastos de combustible.',
			},
			modes: {
				title: 'Modos de Cálculo',
				content:
					'Nuestra calculadora de consumo de combustible proporciona dos modos de cálculo:',
				distance:
					'Cálculo de distancia basado en cantidad de combustible y consumo',
				fuel: 'Cálculo de requisitos de combustible para un viaje',
				planning: 'Planificación de viajes y rutas',
				economy: 'Monitoreo de ahorro de combustible',
			},
			advantages: {
				title: 'Beneficios de Usar la Calculadora',
				content:
					'La calculadora de consumo de combustible ofrece muchos beneficios:',
				accurate: 'Cálculos precisos basados en datos reales',
				planning: 'Planificación eficiente de viajes',
				savings: 'Ahorro en costos de combustible',
				environmental: 'Reducción del impacto ambiental',
			},
			tips: {
				title: 'Consejos para Reducir el Consumo',
				content: 'Para reducir el consumo de combustible:',
				driving: 'Conduce de manera eficiente y suave',
				maintenance: 'Mantén tu vehículo en buen estado',
				route: 'Planifica rutas eficientes',
				load: 'Reduce el peso innecesario del vehículo',
			},
		},
		form: {
			title: 'Parámetros de Cálculo',
			mode: 'Modo de Cálculo',
			modes: {
				distance: 'Calcular Distancia',
				distanceDesc: 'Qué tan lejos puede viajar',
				fuel: 'Calcular Combustible',
				fuelDesc: 'Cuánto combustible necesita',
			},
			consumption: 'Consumo de Combustible (L/100 km)',
			fuelAmount: 'Cantidad de Combustible en Tanque (L)',
			distance: 'Distancia Deseada (km)',
			fuelPrice: 'Precio del Combustible (€/L)',
			calculate: 'Calcular',
			errors: {
				title: 'Errores en los Datos',
			},
		},
		results: {
			title: 'Resultados del Cálculo',
			placeholder: "Ingrese los parámetros y haga clic en 'Calcular'",
			distance: 'Distancia Posible',
			fuelNeeded: 'Combustible Necesario',
			totalCost: 'Costo Total',
			km: 'km',
			liters: 'litros',
			euros: '€',
		},
	},
};

/**
 * Missing fuel calculator translations for German
 */
const fuelGermanTranslations = {
	fuel: {
		title: 'Kraftstoffverbrauch Rechner',
		description:
			'Kraftstoffverbrauch, Reisedistanz und Kraftstoffkosten für Reiseplanung berechnen',
		seo: {
			title: 'Kraftstoffverbrauch Rechner: Distanz und Kosten berechnen',
			overview: {
				title: 'Kraftstoffverbrauch Rechner',
				content:
					'Der Kraftstoffverbrauch Rechner ist ein professionelles Tool zur Berechnung von Kraftstoffverbrauch, Reisedistanz und Kosten. Mit unserem Rechner können Sie berechnen, wie viel Kraftstoff Sie für eine Reise benötigen, welche Distanz Sie mit dem verfügbaren Kraftstoff zurücklegen können und Ihre Kraftstoffkosten planen.',
			},
			modes: {
				title: 'Berechnungsmodi',
				content:
					'Unser Kraftstoffverbrauch Rechner bietet zwei Berechnungsmodi:',
				distance:
					'Distanzberechnung basierend auf Kraftstoffmenge und Verbrauch',
				fuel: 'Berechnung des Kraftstoffbedarfs für eine Reise',
				planning: 'Reise- und Routenplanung',
				economy: 'Kraftstoffeinsparung überwachen',
			},
			advantages: {
				title: 'Vorteile der Verwendung des Rechners',
				content:
					'Der Kraftstoffverbrauch Rechner bietet viele Vorteile:',
				accurate: 'Präzise Berechnungen basierend auf realen Daten',
				planning: 'Effiziente Reiseplanung',
				savings: 'Einsparungen bei Kraftstoffkosten',
				environmental: 'Reduzierung der Umweltauswirkungen',
			},
			tips: {
				title: 'Tipps zur Verbrauchsreduzierung',
				content: 'Um den Kraftstoffverbrauch zu reduzieren:',
				driving: 'Fahren Sie effizient und sanft',
				maintenance: 'Halten Sie Ihr Fahrzeug in gutem Zustand',
				route: 'Planen Sie effiziente Routen',
				load: 'Reduzieren Sie unnötiges Fahrzeuggewicht',
			},
		},
		form: {
			title: 'Berechnungsparameter',
			mode: 'Berechnungsmodus',
			modes: {
				distance: 'Distanz berechnen',
				distanceDesc: 'Wie weit Sie fahren können',
				fuel: 'Kraftstoff berechnen',
				fuelDesc: 'Wie viel Kraftstoff Sie benötigen',
			},
			consumption: 'Kraftstoffverbrauch (L/100 km)',
			fuelAmount: 'Kraftstoffmenge im Tank (L)',
			distance: 'Gewünschte Distanz (km)',
			fuelPrice: 'Kraftstoffpreis (€/L)',
			calculate: 'Berechnen',
			errors: {
				title: 'Datenfehler',
			},
		},
		results: {
			title: 'Berechnungsergebnisse',
			placeholder:
				"Geben Sie die Parameter ein und klicken Sie auf 'Berechnen'",
			distance: 'Mögliche Distanz',
			fuelNeeded: 'Benötigter Kraftstoff',
			totalCost: 'Gesamtkosten',
			km: 'km',
			liters: 'Liter',
			euros: '€',
		},
	},
};

/**
 * Fix KASKO translations in English file
 * @param {string} filePath - Path to the English translation file
 */
function fixKaskoEnglish(filePath) {
	console.log(`Fixing KASKO English translations in ${filePath}...`);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Create backup
	const backupPath = filePath + '.kasko.backup';
	fs.writeFileSync(backupPath, content);

	// Apply fixes
	Object.entries(kaskoEnglishFixes).forEach(([russianText, englishText]) => {
		// Escape special regex characters in the Russian text
		const escapedRussian = russianText.replace(
			/[.*+?^${}()|[\]\\]/g,
			'\\$&'
		);
		const regex = new RegExp(escapedRussian, 'g');

		if (content.match(regex)) {
			content = content.replace(regex, englishText);
			modified = true;
			console.log(
				`  Fixed: ${russianText.substring(
					0,
					40
				)}... → ${englishText.substring(0, 40)}...`
			);
		}
	});

	// Write the fixed file
	if (modified) {
		fs.writeFileSync(filePath, content);
		console.log(`  ✅ Fixed ${filePath}`);
	} else {
		console.log(`  No changes needed for ${filePath}`);
	}
}

/**
 * Add missing fuel calculator translations
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 * @param {object} translations - Translations to add
 */
function addFuelTranslations(filePath, language, translations) {
	console.log(
		`Adding fuel calculator translations to ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.fuel.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Add fuel translations to calculators section
	if (!data.calculators) {
		data.calculators = {};
	}

	data.calculators.fuel = translations.fuel;

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Added fuel translations to ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing remaining translation issues...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix KASKO in English
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixKaskoEnglish(enFile);
	}

	// Add fuel translations to Spanish
	const esFile = path.join(messagesDir, 'es.json');
	if (fs.existsSync(esFile)) {
		addFuelTranslations(esFile, 'es', fuelSpanishTranslations);
	}

	// Add fuel translations to German
	const deFile = path.join(messagesDir, 'de.json');
	if (fs.existsSync(deFile)) {
		addFuelTranslations(deFile, 'de', fuelGermanTranslations);
	}

	console.log('\n✅ Remaining translation issues fix completed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed KASKO calculator translations in English');
	console.log('  - Added missing fuel calculator translations to Spanish');
	console.log('  - Added missing fuel calculator translations to German');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the KASKO calculator in English');
	console.log('  2. Test the fuel calculator in Spanish and German');
	console.log(
		"  3. Remove backup files once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixKaskoEnglish,
	addFuelTranslations,
	kaskoEnglishFixes,
	fuelSpanishTranslations,
	fuelGermanTranslations,
};
