#!/usr/bin/env node

/**
 * Script to fix leasing calculator translations
 * 1. Fix Russian text in English leasing translations
 * 2. Add missing leasing translations to other languages
 */

const fs = require('fs');
const path = require('path');

/**
 * Leasing English translations fixes
 */
const leasingEnglishFixes = {
	'Калькулятор автолизинга': 'Auto Leasing Calculator',
	'Расчёт ежемесячных платежей и общей стоимости лизинга автомобиля':
		'Calculate monthly payments and total cost of auto leasing',
	'Параметры лизинга': 'Leasing Parameters',
	'Первоначальный взнос': 'Down Payment',
	'Срок лизинга (мес)': 'Lease Term (months)',
	'Ставка удорожания (%)': 'Interest Rate (%)',
	'Выкупная стоимость': 'Buyout Value',
	'Ошибки в данных': 'Data Errors',
	'Сумма к уплате каждый месяц': 'Amount to pay each month',
	'Общая сумма платежей': 'Total Payments',
	'Общая стоимость': 'Total Cost',
	'Сумма финансирования': 'Financing Amount',
	'Первоначальный взнос': 'Down Payment',
	'Выкупная стоимость': 'Buyout Value',
	'Детали расчёта': 'Calculation Details',
	'Введите данные для расчёта': 'Enter data for calculation',
	'Калькулятор автолизинга онлайн': 'Online Auto Leasing Calculator',
	'О калькуляторе автолизинга': 'About Auto Leasing Calculator',
	'Онлайн калькулятор автолизинга поможет рассчитать ежемесячные платежи, переплату и общую сумму выплат по договору лизинга. Удобный инструмент для оценки выгодности лизинга автомобиля.':
		'Online auto leasing calculator helps calculate monthly payments, overpayment and total payments under leasing agreement. Convenient tool for evaluating auto leasing profitability.',
	'Как рассчитывается лизинг': 'How Leasing is Calculated',
	'Лизинг рассчитывается по формуле аннуитетных платежей с учётом первоначального взноса, срока договора, ставки удорожания и выкупной стоимости.':
		'Leasing is calculated using annuity payment formula considering down payment, contract term, interest rate and buyout value.',
	'Сумма финансирования = Стоимость авто - Первоначальный взнос - Выкупная стоимость':
		'Financing Amount = Car Value - Down Payment - Buyout Value',
	'Monthly Payment рассчитывается по формуле аннуитета':
		'Monthly Payment is calculated using annuity formula',
	'Общая сумма = Monthly Payment × Срок + Первоначальный взнос + Выкупная стоимость':
		'Total Amount = Monthly Payment × Term + Down Payment + Buyout Value',
	'Total Interest = Общая сумма - Стоимость автомобиля':
		'Total Interest = Total Amount - Car Value',
	'Преимущества калькулятора': 'Calculator Benefits',
	'Наш калькулятор автолизинга поможет вам принять обоснованное решение о выгодности лизинга автомобиля.':
		'Our auto leasing calculator helps you make an informed decision about auto leasing profitability.',
	'Быстрый расчёт за несколько секунд': 'Quick calculation in seconds',
	'Точные расчёты по актуальным формулам':
		'Accurate calculations using current formulas',
	'Сравнение с покупкой в кредит': 'Comparison with credit purchase',
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
 * Fix leasing translations in English file
 * @param {string} filePath - Path to the English translation file
 */
function fixLeasingEnglish(filePath) {
	console.log(`Fixing leasing English translations in ${filePath}...`);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Create backup
	const backupPath = filePath + '.leasing.backup';
	fs.writeFileSync(backupPath, content);

	// Apply fixes
	Object.entries(leasingEnglishFixes).forEach(
		([russianText, englishText]) => {
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
		}
	);

	// Write the fixed file
	if (modified) {
		fs.writeFileSync(filePath, content);
		console.log(`  ✅ Fixed ${filePath}`);
	} else {
		console.log(`  No changes needed for ${filePath}`);
	}
}

/**
 * Add leasing translations to other languages
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
	console.log('🔧 Fixing leasing calculator translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix leasing in English
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixLeasingEnglish(enFile);
	}

	// Add leasing translations to Spanish
	const esFile = path.join(messagesDir, 'es.json');
	if (fs.existsSync(esFile)) {
		addLeasingTranslations(esFile, 'es', leasingSpanishTranslations);
	}

	// Add leasing translations to German
	const deFile = path.join(messagesDir, 'de.json');
	if (fs.existsSync(deFile)) {
		addLeasingTranslations(deFile, 'de', leasingGermanTranslations);
	}

	console.log('\n✅ Leasing calculator translations fix completed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed leasing calculator translations in English');
	console.log('  - Added leasing calculator translations to Spanish');
	console.log('  - Added leasing calculator translations to German');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the leasing calculator in all languages');
	console.log(
		"  2. Remove backup files once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixLeasingEnglish,
	addLeasingTranslations,
	leasingEnglishFixes,
	leasingSpanishTranslations,
	leasingGermanTranslations,
};
