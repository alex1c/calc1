#!/usr/bin/env node

/**
 * Script to add fuel section to English and Russian translation files
 */

const fs = require('fs');
const path = require('path');

/**
 * Add fuel section to a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function addFuelSection(filePath, language) {
	console.log(`Adding fuel section to ${language.toUpperCase()} file...`);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.fuel.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Add fuel section based on language
	if (language === 'en') {
		data.fuel = {
			title: 'Fuel Consumption Calculator',
			description:
				'Calculate fuel consumption, travel distance and fuel costs for trip planning',
			seo: {
				title: 'Fuel Consumption Calculator: Calculate Distance and Costs',
				overview: {
					title: 'Fuel Consumption Calculator',
					content:
						'Fuel consumption calculator is a professional tool for calculating fuel consumption, travel distance and costs. With our calculator you can calculate how much fuel you need for a trip, what distance you can cover with available fuel and plan your fuel costs.',
				},
				modes: {
					title: 'Calculation Modes',
					content:
						'Our fuel consumption calculator provides two calculation modes:',
					distance:
						'Distance calculation by fuel amount and consumption',
					fuel: 'Calculation of required fuel amount for trip',
				},
				advantages: {
					title: 'Calculator Benefits',
					content:
						'Fuel consumption calculator provides many benefits for trip planning:',
					quick: 'Quick calculation in seconds',
					accurate: 'Accurate calculations based on real data',
					planning: 'Trip and fuel budget planning',
					savings: 'Money savings on fuel',
				},
				tips: {
					title: 'Fuel Economy Tips',
					content: 'To reduce fuel consumption:',
					measure: "Regularly measure your car's fuel consumption",
					driving: 'Follow economical driving style',
					maintenance: 'Keep your car in good technical condition',
					planning: 'Plan routes in advance to avoid traffic jams',
				},
			},
			form: {
				title: 'Calculation Parameters',
				mode: 'Calculation Mode',
				modes: {
					distance: 'Calculate Distance',
					distanceDesc: 'How far you can drive',
					fuel: 'Calculate Fuel',
					fuelDesc: 'How much fuel you need',
				},
				consumption: 'Fuel Consumption (L/100 km)',
				fuelAmount: 'Fuel Amount in Tank (L)',
				distance: 'Desired Distance (km)',
				calculate: 'Calculate',
				errors: {
					title: 'Input Errors',
				},
			},
			results: {
				title: 'Calculation Results',
				result: 'Result',
				km: 'km',
				liters: 'L',
				distanceResult: 'You can drive',
				fuelResult: 'For the trip you need',
				details: 'Calculation Details',
				consumption: 'Fuel Consumption',
				fuelAmount: 'Fuel Amount',
				distance: 'Distance',
				calculatedDistance: 'Calculated Distance',
				calculatedFuel: 'Calculated Fuel',
				placeholder: "Enter parameters and click 'Calculate'",
			},
		};
	} else if (language === 'ru') {
		data.fuel = {
			title: 'Калькулятор расхода топлива',
			description:
				'Расчёт расхода топлива, дистанции поездки и стоимости топлива для планирования поездок',
			seo: {
				title: 'Калькулятор расхода топлива: расчёт дистанции и стоимости',
				overview: {
					title: 'Калькулятор расхода топлива',
					content:
						'Калькулятор расхода топлива — это профессиональный инструмент для расчёта расхода топлива, дистанции поездки и стоимости. С помощью нашего калькулятора вы сможете рассчитать, сколько топлива нужно для поездки, какую дистанцию можно проехать на имеющемся топливе и спланировать расходы на топливо.',
				},
				modes: {
					title: 'Режимы расчёта',
					content:
						'Наш калькулятор расхода топлива предоставляет два режима расчёта:',
					distance:
						'Расчёт дистанции по количеству топлива и расходу',
					fuel: 'Расчёт необходимого количества топлива для поездки',
				},
				advantages: {
					title: 'Преимущества калькулятора',
					content:
						'Калькулятор расхода топлива предоставляет множество преимуществ для планирования поездок:',
					quick: 'Быстрый расчёт за секунды',
					accurate: 'Точные расчёты на основе реальных данных',
					planning: 'Планирование поездок и бюджета на топливо',
					savings: 'Экономия денег на топливе',
				},
				tips: {
					title: 'Советы по экономии топлива',
					content: 'Для снижения расхода топлива:',
					measure:
						'Регулярно измеряйте расход топлива вашего автомобиля',
					driving: 'Соблюдайте экономичный стиль вождения',
					maintenance: 'Следите за техническим состоянием автомобиля',
					planning:
						'Планируйте маршруты заранее для избежания пробок',
				},
			},
			form: {
				title: 'Параметры расчёта',
				mode: 'Режим расчёта',
				modes: {
					distance: 'Рассчитать дистанцию',
					distanceDesc: 'Сколько можно проехать',
					fuel: 'Рассчитать топливо',
					fuelDesc: 'Сколько нужно топлива',
				},
				consumption: 'Расход топлива (л/100 км)',
				fuelAmount: 'Количество топлива в баке (л)',
				distance: 'Желаемая дистанция (км)',
				calculate: 'Рассчитать',
				errors: {
					title: 'Ошибки в данных',
				},
			},
			results: {
				title: 'Результаты расчёта',
				result: 'Результат',
				km: 'км',
				liters: 'л',
				distanceResult: 'Вы сможете проехать',
				fuelResult: 'Для поездки потребуется',
				details: 'Детали расчёта',
				consumption: 'Расход топлива',
				fuelAmount: 'Количество топлива',
				distance: 'Дистанция',
				calculatedDistance: 'Рассчитанная дистанция',
				calculatedFuel: 'Рассчитанное топливо',
				placeholder: "Введите параметры и нажмите 'Рассчитать'",
			},
		};
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Added fuel section to ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Adding fuel section to translation files...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Add fuel section to English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		addFuelSection(enFile, 'en');
	}

	// Add fuel section to Russian file
	const ruFile = path.join(messagesDir, 'ru.json');
	if (fs.existsSync(ruFile)) {
		addFuelSection(ruFile, 'ru');
	}

	console.log('\n✅ Fuel section added to translation files!');
	console.log('\n📋 Summary:');
	console.log('  - Added fuel section to English');
	console.log('  - Added fuel section to Russian');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the fuel-consumption calculator in all languages');
	console.log('  2. Check if the MISSING_MESSAGE errors are resolved');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	addFuelSection,
};
