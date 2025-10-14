#!/usr/bin/env node

/**
 * Script to add fuel section to all translation files
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
	} else if (language === 'es') {
		data.fuel = {
			title: 'Calculadora de Consumo de Combustible',
			description:
				'Calcula el consumo de combustible, distancia de viaje y costos de combustible para planificar viajes',
			seo: {
				title: 'Calculadora de Consumo de Combustible: Calcula Distancia y Costos',
				overview: {
					title: 'Calculadora de Consumo de Combustible',
					content:
						'La calculadora de consumo de combustible es una herramienta profesional para calcular el consumo de combustible, distancia de viaje y costos. Con nuestra calculadora puedes calcular cuánto combustible necesitas para un viaje, qué distancia puedes cubrir con el combustible disponible y planificar tus costos de combustible.',
				},
				modes: {
					title: 'Modos de Cálculo',
					content:
						'Nuestra calculadora de consumo de combustible proporciona dos modos de cálculo:',
					distance:
						'Cálculo de distancia por cantidad de combustible y consumo',
					fuel: 'Cálculo de la cantidad de combustible requerida para el viaje',
				},
				advantages: {
					title: 'Beneficios de la Calculadora',
					content:
						'La calculadora de consumo de combustible proporciona muchos beneficios para la planificación de viajes:',
					quick: 'Cálculo rápido en segundos',
					accurate: 'Cálculos precisos basados en datos reales',
					planning:
						'Planificación de viajes y presupuesto de combustible',
					savings: 'Ahorro de dinero en combustible',
				},
				tips: {
					title: 'Consejos de Economía de Combustible',
					content: 'Para reducir el consumo de combustible:',
					measure:
						'Mide regularmente el consumo de combustible de tu coche',
					driving: 'Sigue un estilo de conducción económico',
					maintenance: 'Mantén tu coche en buen estado técnico',
					planning:
						'Planifica rutas con anticipación para evitar atascos',
				},
			},
			form: {
				title: 'Parámetros de Cálculo',
				mode: 'Modo de Cálculo',
				modes: {
					distance: 'Calcular Distancia',
					distanceDesc: 'Qué tan lejos puedes conducir',
					fuel: 'Calcular Combustible',
					fuelDesc: 'Cuánto combustible necesitas',
				},
				consumption: 'Consumo de Combustible (L/100 km)',
				fuelAmount: 'Cantidad de Combustible en el Tanque (L)',
				distance: 'Distancia Deseada (km)',
				calculate: 'Calcular',
				errors: {
					title: 'Errores de Entrada',
				},
			},
			results: {
				title: 'Resultados del Cálculo',
				result: 'Resultado',
				km: 'km',
				liters: 'L',
				distanceResult: 'Puedes conducir',
				fuelResult: 'Para el viaje necesitas',
				details: 'Detalles del Cálculo',
				consumption: 'Consumo de Combustible',
				fuelAmount: 'Cantidad de Combustible',
				distance: 'Distancia',
				calculatedDistance: 'Distancia Calculada',
				calculatedFuel: 'Combustible Calculado',
				placeholder: "Ingresa los parámetros y haz clic en 'Calcular'",
			},
		};
	} else if (language === 'de') {
		data.fuel = {
			title: 'Kraftstoffverbrauch-Rechner',
			description:
				'Berechnen Sie Kraftstoffverbrauch, Reisedistanz und Kraftstoffkosten für die Reiseplanung',
			seo: {
				title: 'Kraftstoffverbrauch-Rechner: Berechnen Sie Distanz und Kosten',
				overview: {
					title: 'Kraftstoffverbrauch-Rechner',
					content:
						'Der Kraftstoffverbrauch-Rechner ist ein professionelles Tool zur Berechnung von Kraftstoffverbrauch, Reisedistanz und Kosten. Mit unserem Rechner können Sie berechnen, wie viel Kraftstoff Sie für eine Reise benötigen, welche Distanz Sie mit verfügbarem Kraftstoff zurücklegen können und Ihre Kraftstoffkosten planen.',
				},
				modes: {
					title: 'Berechnungsmodi',
					content:
						'Unser Kraftstoffverbrauch-Rechner bietet zwei Berechnungsmodi:',
					distance:
						'Distanzberechnung nach Kraftstoffmenge und Verbrauch',
					fuel: 'Berechnung der benötigten Kraftstoffmenge für die Reise',
				},
				advantages: {
					title: 'Rechner-Vorteile',
					content:
						'Der Kraftstoffverbrauch-Rechner bietet viele Vorteile für die Reiseplanung:',
					quick: 'Schnelle Berechnung in Sekunden',
					accurate: 'Präzise Berechnungen basierend auf realen Daten',
					planning: 'Reise- und Kraftstoffbudget-Planung',
					savings: 'Geld sparen beim Kraftstoff',
				},
				tips: {
					title: 'Kraftstoffspar-Tipps',
					content: 'Um den Kraftstoffverbrauch zu reduzieren:',
					measure:
						'Messen Sie regelmäßig den Kraftstoffverbrauch Ihres Autos',
					driving: 'Folgen Sie einem sparsamen Fahrstil',
					maintenance:
						'Halten Sie Ihr Auto in gutem technischen Zustand',
					planning:
						'Planen Sie Routen im Voraus, um Staus zu vermeiden',
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
				calculate: 'Berechnen',
				errors: {
					title: 'Eingabefehler',
				},
			},
			results: {
				title: 'Berechnungsergebnisse',
				result: 'Ergebnis',
				km: 'km',
				liters: 'L',
				distanceResult: 'Sie können fahren',
				fuelResult: 'Für die Reise benötigen Sie',
				details: 'Berechnungsdetails',
				consumption: 'Kraftstoffverbrauch',
				fuelAmount: 'Kraftstoffmenge',
				distance: 'Distanz',
				calculatedDistance: 'Berechnete Distanz',
				calculatedFuel: 'Berechneter Kraftstoff',
				placeholder:
					"Geben Sie Parameter ein und klicken Sie auf 'Berechnen'",
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
	console.log('🔧 Adding fuel section to all translation files...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Add fuel section to all files
	const languages = ['en', 'ru', 'es', 'de'];

	for (const lang of languages) {
		const filePath = path.join(messagesDir, `${lang}.json`);
		if (fs.existsSync(filePath)) {
			addFuelSection(filePath, lang);
		}
	}

	console.log('\n✅ Fuel section added to all translation files!');
	console.log('\n📋 Summary:');
	console.log('  - Added fuel section to English');
	console.log('  - Added fuel section to Russian');
	console.log('  - Added fuel section to Spanish');
	console.log('  - Added fuel section to German');
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
