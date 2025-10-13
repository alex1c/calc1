#!/usr/bin/env node

/**
 * Script to add leasing translations to all language files
 */

const fs = require('fs');
const path = require('path');

/**
 * Leasing translations for Russian
 */
const leasingRussianTranslations = {
	leasing: {
		title: 'Калькулятор автолизинга',
		description:
			'Расчёт ежемесячных платежей и общей стоимости лизинга автомобиля',
		breadcrumbs: {
			auto: 'Авто',
		},
		form: {
			title: 'Параметры лизинга',
			carValue: 'Стоимость автомобиля (₽)',
			downPayment: 'Первоначальный взнос',
			leaseTerm: 'Срок лизинга (мес)',
			interestRate: 'Ставка удорожания (%)',
			buyoutValue: 'Выкупная стоимость',
			calculate: 'Рассчитать',
			errors: {
				title: 'Ошибки в данных',
			},
		},
		results: {
			title: 'Результаты расчёта',
			monthlyPayment: 'Ежемесячный платёж',
			monthlyPaymentDescription: 'Сумма к уплате каждый месяц',
			totalPayments: 'Общая сумма платежей',
			totalCost: 'Общая стоимость',
			overpayment: 'Переплата',
			financingAmount: 'Сумма финансирования',
			downPaymentAmount: 'Первоначальный взнос',
			buyoutAmount: 'Выкупная стоимость',
			details: 'Детали расчёта',
			placeholder: 'Введите данные для расчёта',
		},
		seo: {
			title: 'Калькулятор автолизинга онлайн',
			overview: {
				title: 'О калькуляторе автолизинга',
				content:
					'Онлайн калькулятор автолизинга поможет рассчитать ежемесячные платежи, переплату и общую сумму выплат по договору лизинга. Удобный инструмент для оценки выгодности лизинга автомобиля.',
			},
			calculation: {
				title: 'Как рассчитывается лизинг',
				content:
					'Лизинг рассчитывается по формуле аннуитетных платежей с учётом первоначального взноса, срока договора, ставки удорожания и выкупной стоимости.',
				financing:
					'Сумма финансирования = Стоимость авто - Первоначальный взнос - Выкупная стоимость',
				payment:
					'Ежемесячный платёж рассчитывается по формуле аннуитета',
				total: 'Общая сумма = Ежемесячный платёж × Срок + Первоначальный взнос + Выкупная стоимость',
				overpayment: 'Переплата = Общая сумма - Стоимость автомобиля',
			},
			advantages: {
				title: 'Преимущества калькулятора',
				content:
					'Наш калькулятор автолизинга поможет вам принять обоснованное решение о выгодности лизинга автомобиля.',
				quick: 'Быстрый расчёт за несколько секунд',
				accurate: 'Точные расчёты по актуальным формулам',
				comparison: 'Сравнение с покупкой в кредит',
			},
		},
	},
};

/**
 * Leasing translations for English
 */
const leasingEnglishTranslations = {
	leasing: {
		title: 'Auto Leasing Calculator',
		description:
			'Calculate monthly payments and total cost of auto leasing',
		breadcrumbs: {
			auto: 'Auto',
		},
		form: {
			title: 'Leasing Parameters',
			carValue: 'Car Value ($)',
			downPayment: 'Down Payment',
			leaseTerm: 'Lease Term (months)',
			interestRate: 'Interest Rate (%)',
			buyoutValue: 'Buyout Value',
			calculate: 'Calculate',
			errors: {
				title: 'Data Errors',
			},
		},
		results: {
			title: 'Calculation Results',
			monthlyPayment: 'Monthly Payment',
			monthlyPaymentDescription: 'Amount to pay each month',
			totalPayments: 'Total Payments',
			totalCost: 'Total Cost',
			overpayment: 'Total Interest',
			financingAmount: 'Financing Amount',
			downPaymentAmount: 'Down Payment',
			buyoutAmount: 'Buyout Value',
			details: 'Calculation Details',
			placeholder: 'Enter data for calculation',
		},
		seo: {
			title: 'Online Auto Leasing Calculator',
			overview: {
				title: 'About Auto Leasing Calculator',
				content:
					'Online auto leasing calculator helps calculate monthly payments, overpayment and total payments under leasing agreement. Convenient tool for evaluating auto leasing profitability.',
			},
			calculation: {
				title: 'How Leasing is Calculated',
				content:
					'Leasing is calculated using annuity payment formula considering down payment, contract term, interest rate and buyout value.',
				financing:
					'Financing Amount = Car Value - Down Payment - Buyout Value',
				payment: 'Monthly Payment is calculated using annuity formula',
				total: 'Total Amount = Monthly Payment × Term + Down Payment + Buyout Value',
				overpayment: 'Total Interest = Total Amount - Car Value',
			},
			advantages: {
				title: 'Calculator Benefits',
				content:
					'Our auto leasing calculator helps you make an informed decision about auto leasing profitability.',
				quick: 'Quick calculation in seconds',
				accurate: 'Accurate calculations using current formulas',
				comparison: 'Comparison with credit purchase',
			},
		},
	},
};

/**
 * Leasing translations for Spanish
 */
const leasingSpanishTranslations = {
	leasing: {
		title: 'Calculadora de Arrendamiento de Autos',
		description:
			'Calcular pagos mensuales y costo total del arrendamiento de autos',
		breadcrumbs: {
			auto: 'Auto',
		},
		form: {
			title: 'Parámetros de Arrendamiento',
			carValue: 'Valor del Auto (€)',
			downPayment: 'Pago Inicial',
			leaseTerm: 'Plazo de Arrendamiento (meses)',
			interestRate: 'Tasa de Interés (%)',
			buyoutValue: 'Valor de Compra',
			calculate: 'Calcular',
			errors: {
				title: 'Errores en los Datos',
			},
		},
		results: {
			title: 'Resultados del Cálculo',
			monthlyPayment: 'Pago Mensual',
			monthlyPaymentDescription: 'Cantidad a pagar cada mes',
			totalPayments: 'Total de Pagos',
			totalCost: 'Costo Total',
			overpayment: 'Interés Total',
			financingAmount: 'Monto de Financiamiento',
			downPaymentAmount: 'Pago Inicial',
			buyoutAmount: 'Valor de Compra',
			details: 'Detalles del Cálculo',
			placeholder: 'Ingrese datos para el cálculo',
		},
		seo: {
			title: 'Calculadora de Arrendamiento de Autos Online',
			overview: {
				title: 'Sobre la Calculadora de Arrendamiento',
				content:
					'La calculadora de arrendamiento de autos online ayuda a calcular pagos mensuales, sobrepago y total de pagos bajo contrato de arrendamiento. Herramienta conveniente para evaluar la rentabilidad del arrendamiento de autos.',
			},
			calculation: {
				title: 'Cómo se Calcula el Arrendamiento',
				content:
					'El arrendamiento se calcula usando la fórmula de pagos de anualidad considerando pago inicial, plazo del contrato, tasa de interés y valor de compra.',
				financing:
					'Monto de Financiamiento = Valor del Auto - Pago Inicial - Valor de Compra',
				payment:
					'Pago Mensual se calcula usando la fórmula de anualidad',
				total: 'Monto Total = Pago Mensual × Plazo + Pago Inicial + Valor de Compra',
				overpayment: 'Interés Total = Monto Total - Valor del Auto',
			},
			advantages: {
				title: 'Beneficios de la Calculadora',
				content:
					'Nuestra calculadora de arrendamiento de autos le ayuda a tomar una decisión informada sobre la rentabilidad del arrendamiento de autos.',
				quick: 'Cálculo rápido en segundos',
				accurate: 'Cálculos precisos usando fórmulas actuales',
				comparison: 'Comparación con compra a crédito',
			},
		},
	},
};

/**
 * Leasing translations for German
 */
const leasingGermanTranslations = {
	leasing: {
		title: 'Auto Leasing Rechner',
		description:
			'Monatliche Zahlungen und Gesamtkosten des Auto Leasings berechnen',
		breadcrumbs: {
			auto: 'Auto',
		},
		form: {
			title: 'Leasing Parameter',
			carValue: 'Auto Wert (€)',
			downPayment: 'Anzahlung',
			leaseTerm: 'Leasing Laufzeit (Monate)',
			interestRate: 'Zinssatz (%)',
			buyoutValue: 'Kaufpreis',
			calculate: 'Berechnen',
			errors: {
				title: 'Datenfehler',
			},
		},
		results: {
			title: 'Berechnungsergebnisse',
			monthlyPayment: 'Monatliche Zahlung',
			monthlyPaymentDescription: 'Zu zahlender Betrag jeden Monat',
			totalPayments: 'Gesamtzahlungen',
			totalCost: 'Gesamtkosten',
			overpayment: 'Gesamtzinsen',
			financingAmount: 'Finanzierungsbetrag',
			downPaymentAmount: 'Anzahlung',
			buyoutAmount: 'Kaufpreis',
			details: 'Berechnungsdetails',
			placeholder: 'Daten für Berechnung eingeben',
		},
		seo: {
			title: 'Online Auto Leasing Rechner',
			overview: {
				title: 'Über den Auto Leasing Rechner',
				content:
					'Der Online Auto Leasing Rechner hilft bei der Berechnung monatlicher Zahlungen, Überzahlung und Gesamtzahlungen unter Leasingvertrag. Praktisches Tool zur Bewertung der Rentabilität des Auto Leasings.',
			},
			calculation: {
				title: 'Wie Leasing Berechnet Wird',
				content:
					'Leasing wird mit der Annuitätenformel berechnet unter Berücksichtigung von Anzahlung, Vertragslaufzeit, Zinssatz und Kaufpreis.',
				financing:
					'Finanzierungsbetrag = Auto Wert - Anzahlung - Kaufpreis',
				payment:
					'Monatliche Zahlung wird mit der Annuitätenformel berechnet',
				total: 'Gesamtbetrag = Monatliche Zahlung × Laufzeit + Anzahlung + Kaufpreis',
				overpayment: 'Gesamtzinsen = Gesamtbetrag - Auto Wert',
			},
			advantages: {
				title: 'Rechner Vorteile',
				content:
					'Unser Auto Leasing Rechner hilft Ihnen, eine fundierte Entscheidung über die Rentabilität des Auto Leasings zu treffen.',
				quick: 'Schnelle Berechnung in Sekunden',
				accurate: 'Präzise Berechnungen mit aktuellen Formeln',
				comparison: 'Vergleich mit Kreditkauf',
			},
		},
	},
};

/**
 * Add leasing translations to a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 * @param {object} translations - Translations to add
 */
function addLeasingTranslations(filePath, language, translations) {
	console.log(
		`Adding leasing translations to ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.leasing.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Add leasing translations
	data.leasing = translations.leasing;

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Added leasing translations to ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Adding leasing translations to all language files...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Add leasing translations to all languages
	const ruFile = path.join(messagesDir, 'ru.json');
	if (fs.existsSync(ruFile)) {
		addLeasingTranslations(ruFile, 'ru', leasingRussianTranslations);
	}

	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		addLeasingTranslations(enFile, 'en', leasingEnglishTranslations);
	}

	const esFile = path.join(messagesDir, 'es.json');
	if (fs.existsSync(esFile)) {
		addLeasingTranslations(esFile, 'es', leasingSpanishTranslations);
	}

	const deFile = path.join(messagesDir, 'de.json');
	if (fs.existsSync(deFile)) {
		addLeasingTranslations(deFile, 'de', leasingGermanTranslations);
	}

	console.log('\n✅ Leasing translations added to all language files!');
	console.log('\n📋 Summary:');
	console.log('  - Added leasing translations to Russian');
	console.log('  - Added leasing translations to English');
	console.log('  - Added leasing translations to Spanish');
	console.log('  - Added leasing translations to German');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Restart the development server');
	console.log('  2. Test the leasing calculator in all languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	addLeasingTranslations,
	leasingRussianTranslations,
	leasingEnglishTranslations,
	leasingSpanishTranslations,
	leasingGermanTranslations,
};
