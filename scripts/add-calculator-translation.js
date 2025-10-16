const fs = require('fs');
const path = require('path');

// Категории калькуляторов
const CALCULATOR_CATEGORIES = {
	math: [
		'area',
		'volume',
		'powerRoot',
		'equations',
		'statistics',
		'converter',
	],
	finance: [
		'investment',
		'savings',
		'creditLoan',
		'consumerLoan',
		'mortgage',
	],
	auto: [
		'customs',
		'fuelConsumption',
		'carDepreciation',
		'carLoan',
		'carOwnership',
		'kasko',
		'osago',
		'trafficFines',
		'vehicleTax',
	],
	life: [
		'calories',
		'bmi',
		'bloodAlcohol',
		'foodRation',
		'pregnancy',
		'babyGrowth',
	],
	construction: [
		'concrete',
		'wall',
		'wallpaper',
		'roofing',
		'tileLaminate',
		'flooring',
		'paint',
		'paperWeight',
	],
};

// Шаблон для нового калькулятора
const CALCULATOR_TEMPLATE = {
	title: '{{TITLE}}',
	description: '{{DESCRIPTION}}',
	breadcrumbs: {
		category: '{{CATEGORY}}',
	},
	form: {
		title: '{{FORM_TITLE}}',
		errors: {
			title: '{{ERRORS_TITLE}}',
		},
	},
	results: {
		title: '{{RESULTS_TITLE}}',
	},
	seo: {
		title: '{{SEO_TITLE}}',
		description: '{{SEO_DESCRIPTION}}',
	},
};

function getCategoryForCalculator(calculatorKey) {
	for (const [category, calculators] of Object.entries(
		CALCULATOR_CATEGORIES
	)) {
		if (calculators.includes(calculatorKey)) {
			return category;
		}
	}
	return 'life'; // По умолчанию
}

function addCalculatorTranslation(calculatorKey, translations) {
	const locales = ['ru', 'en', 'de', 'es'];
	const category = getCategoryForCalculator(calculatorKey);

	console.log(`📦 Adding ${calculatorKey} to ${category} category`);

	locales.forEach((locale) => {
		const categoryFile = path.join(
			__dirname,
			'..',
			'messages',
			locale,
			`${category}.json`
		);

		if (!fs.existsSync(categoryFile)) {
			console.error(`❌ Category file ${categoryFile} not found`);
			return;
		}

		const content = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));

		// Добавляем перевод
		if (translations[locale]) {
			content[calculatorKey] = translations[locale];

			// Сохраняем с правильным форматированием
			fs.writeFileSync(categoryFile, JSON.stringify(content, null, 2));
			console.log(
				`✅ Added ${calculatorKey} to ${locale}/${category}.json`
			);
		} else {
			console.warn(`⚠️  No translation found for ${locale}`);
		}
	});
}

function createCalculatorTemplate(calculatorKey, category = 'life') {
	const template = JSON.parse(JSON.stringify(CALCULATOR_TEMPLATE));

	// Заменяем плейсхолдеры
	const replacements = {
		'{{TITLE}}': `Calculator Title for ${calculatorKey}`,
		'{{DESCRIPTION}}': `Description for ${calculatorKey}`,
		'{{CATEGORY}}': category.charAt(0).toUpperCase() + category.slice(1),
		'{{FORM_TITLE}}': 'Calculation Parameters',
		'{{ERRORS_TITLE}}': 'Data Errors',
		'{{RESULTS_TITLE}}': 'Calculation Results',
		'{{SEO_TITLE}}': `SEO Title for ${calculatorKey}`,
		'{{SEO_DESCRIPTION}}': `SEO Description for ${calculatorKey}`,
	};

	function replaceInObject(obj) {
		for (const key in obj) {
			if (typeof obj[key] === 'string') {
				for (const [placeholder, value] of Object.entries(
					replacements
				)) {
					obj[key] = obj[key].replace(placeholder, value);
				}
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				replaceInObject(obj[key]);
			}
		}
	}

	replaceInObject(template);
	return template;
}

// Функция для создания переводов для всех языков
function createTranslationsForAllLocales(calculatorKey, category = 'life') {
	const translations = {
		ru: createCalculatorTemplate(calculatorKey, category),
		en: createCalculatorTemplate(calculatorKey, category),
		de: createCalculatorTemplate(calculatorKey, category),
		es: createCalculatorTemplate(calculatorKey, category),
	};

	// Настраиваем переводы для каждого языка
	translations.ru.title = `Калькулятор ${calculatorKey}`;
	translations.ru.description = `Описание калькулятора ${calculatorKey}`;
	translations.ru.breadcrumbs.category = getCategoryName('ru', category);

	translations.en.title = `${calculatorKey} Calculator`;
	translations.en.description = `Description for ${calculatorKey} calculator`;
	translations.en.breadcrumbs.category = getCategoryName('en', category);

	translations.de.title = `${calculatorKey} Rechner`;
	translations.de.description = `Beschreibung für ${calculatorKey} Rechner`;
	translations.de.breadcrumbs.category = getCategoryName('de', category);

	translations.es.title = `Calculadora de ${calculatorKey}`;
	translations.es.description = `Descripción de la calculadora de ${calculatorKey}`;
	translations.es.breadcrumbs.category = getCategoryName('es', category);

	return translations;
}

function getCategoryName(locale, category) {
	const categoryNames = {
		ru: {
			math: 'Математика',
			finance: 'Финансы',
			auto: 'Авто',
			life: 'Жизнь',
			construction: 'Строительство',
		},
		en: {
			math: 'Math',
			finance: 'Finance',
			auto: 'Auto',
			life: 'Life',
			construction: 'Construction',
		},
		de: {
			math: 'Mathematik',
			finance: 'Finanzen',
			auto: 'Auto',
			life: 'Leben',
			construction: 'Bauwesen',
		},
		es: {
			math: 'Matemáticas',
			finance: 'Finanzas',
			auto: 'Auto',
			life: 'Vida',
			construction: 'Construcción',
		},
	};

	return categoryNames[locale]?.[category] || category;
}

// Основная функция
function main() {
	const args = process.argv.slice(2);

	if (args.length < 1) {
		console.log(
			'Usage: node add-calculator-translation.js <calculatorKey> [category]'
		);
		console.log(
			'Example: node add-calculator-translation.js newCalculator life'
		);
		console.log(
			'Available categories:',
			Object.keys(CALCULATOR_CATEGORIES).join(', ')
		);
		return;
	}

	const calculatorKey = args[0];
	const category = args[1] || getCategoryForCalculator(calculatorKey);

	console.log(
		`🚀 Adding calculator: ${calculatorKey} to category: ${category}`
	);

	// Создаем переводы
	const translations = createTranslationsForAllLocales(
		calculatorKey,
		category
	);

	// Добавляем в файлы
	addCalculatorTranslation(calculatorKey, translations);

	console.log('🎉 Calculator translation added successfully!');
}

// Запускаем скрипт
if (require.main === module) {
	main();
}

module.exports = {
	addCalculatorTranslation,
	createCalculatorTemplate,
	createTranslationsForAllLocales,
	getCategoryForCalculator,
};
