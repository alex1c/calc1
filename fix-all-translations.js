#!/usr/bin/env node

/**
 * Script to fix translations that contain Russian text in all language files
 * Replaces Russian text with proper translations for each language
 */

const fs = require('fs');
const path = require('path');

/**
 * Translation fixes for each language
 */
const translationFixes = {
	es: {
		// Spanish translations
		Рефинансирование: 'Refinanciación',
		'Объединение нескольких кредитов в один с более выгодными условиями':
			'Combinar varios préstamos en uno con condiciones más favorables',
		'Экстренный кредит': 'Préstamo de emergencia',
		'Быстрое получение денежных средств на неотложные нужды':
			'Obtención rápida de fondos para necesidades urgentes',
		'Первоначальный взнос (₽)': 'Pago inicial (€)',
		'Сравнительно низкие процентные ставки':
			'Tasas de interés relativamente bajas',
		'Возможность досрочного погашения': 'Posibilidad de pago anticipado',
		'Рассматривайте страхование автомобиля':
			'Considere el seguro del automóvil',
		'Рассматривайте досрочное погашение': 'Considere el pago anticipado',
		'Консультируйтесь с автосалонами':
			'Consulte con concesionarios de automóviles',
		'Требования к заёмщику': 'Requisitos del prestatario',
		'Для получения автокредита необходимо соответствовать определённым требованиям:':
			'Para obtener un préstamo de auto, debe cumplir ciertos requisitos:',
		'Возраст от 21 до 65 лет': 'Edad de 21 a 65 años',
		'Стабильный доход, подтверждённый справками':
			'Ingresos estables confirmados por certificados',
		'Положительная кредитная история': 'Historial crediticio positivo',
		'Полный пакет документов': 'Conjunto completo de documentos',
		'Программы автокредитования': 'Programas de préstamos para automóviles',
		'Банки предлагают различные программы автокредитования:':
			'Los bancos ofrecen varios programas de préstamos para automóviles:',
		'Кредит на новый автомобиль': 'Préstamo para automóvil nuevo',
		'Специальные условия для покупки новых автомобилей':
			'Condiciones especiales para la compra de automóviles nuevos',
		'Кредит на подержанный автомобиль': 'Préstamo para automóvil usado',
		'Условия для покупки автомобилей с пробегом':
			'Condiciones para la compra de automóviles usados',
		'Долгосрочное финансирование до 30 лет':
			'Financiamiento a largo plazo hasta 30 años',
		'Возможность стать владельцем недвижимости':
			'Oportunidad de convertirse en propietario de bienes raíces',
		'Оценивайте необходимость страхования': 'Evalúe la necesidad de seguro',
		'Консультируйтесь с ипотечными брокерами':
			'Consulte con corredores hipotecarios',
		'Для получения ипотечного кредита необходимо соответствовать определённым требованиям:':
			'Para obtener un préstamo hipotecario, debe cumplir ciertos requisitos:',
		'Первоначальный взнос от 10-20%': 'Pago inicial del 10-20%',
		'Страхование недвижимости и жизни': 'Seguro de propiedad y vida',
		'Государственные программы': 'Programas gubernamentales',
		'В России действуют различные программы поддержки ипотечного кредитования:':
			'Existen varios programas de apoyo al crédito hipotecario:',
		Господдержка: 'Apoyo gubernamental',
		'Субсидирование процентной ставки для молодых семей и многодетных':
			'Subsidio de tasa de interés para familias jóvenes y numerosas',
		'Коммерческая ипотека': 'Hipoteca comercial',
		'Стандартные условия банков с рыночными ставками':
			'Condiciones estándar de bancos con tasas de mercado',
		'Стоимость недвижимости (₽)': 'Valor de la propiedad (€)',
	},
	de: {
		// German translations
		Рефинансирование: 'Refinanzierung',
		'Объединение нескольких кредитов в один с более выгодными условиями':
			'Kombinierung mehrerer Kredite zu einem mit günstigeren Bedingungen',
		'Экстренный кредит': 'Notfallkredit',
		'Быстрое получение денежных средств на неотложные нужды':
			'Schnelle Beschaffung von Mitteln für dringende Bedürfnisse',
		'Гибкие условия погашения': 'Flexible Rückzahlungsbedingungen',
		'Возможность досрочного погашения':
			'Möglichkeit der vorzeitigen Rückzahlung',
		'Рассматривайте досрочное погашение':
			'Erwägen Sie eine vorzeitige Rückzahlung',
		'Консультируйтесь с финансовыми экспертами':
			'Konsultieren Sie Finanzexperten',
		'Требования к заёмщику': 'Anforderungen an den Kreditnehmer',
		'Для получения потребительского кредита необходимо соответствовать определённым требованиям:':
			'Um einen Verbraucherkredit zu erhalten, müssen bestimmte Anforderungen erfüllt werden:',
		'Возраст от 18 до 70 лет': 'Alter von 18 bis 70 Jahren',
		'Стабильный доход, подтверждённый справками':
			'Stabiles Einkommen durch Bescheinigungen bestätigt',
		'Положительная кредитная история': 'Positive Kreditgeschichte',
		'Минимальный пакет документов': 'Minimaler Dokumentensatz',
		'Первоначальный взнос (₽)': 'Anzahlung (€)',
		'Сравнительно низкие процентные ставки':
			'Vergleichsweise niedrige Zinssätze',
		'Рассматривайте страхование автомобиля':
			'Erwägen Sie eine Kfz-Versicherung',
		'Консультируйтесь с автосалонами': 'Konsultieren Sie Autohäuser',
		'Для получения автокредита необходимо соответствовать определённым требованиям:':
			'Um einen Autokredit zu erhalten, müssen bestimmte Anforderungen erfüllt werden:',
		'Возраст от 21 до 65 лет': 'Alter von 21 bis 65 Jahren',
		'Полный пакет документов': 'Vollständiger Dokumentensatz',
		'Программы автокредитования': 'Autokreditprogramme',
		'Банки предлагают различные программы автокредитования:':
			'Banken bieten verschiedene Autokreditprogramme an:',
		'Кредит на новый автомобиль': 'Kredit für neues Auto',
		'Специальные условия для покупки новых автомобилей':
			'Spezielle Bedingungen für den Kauf neuer Autos',
		'Кредит на подержанный автомобиль': 'Kredit für gebrauchtes Auto',
		'Условия для покупки автомобилей с пробегом':
			'Bedingungen für den Kauf von Gebrauchtwagen',
		'Долгосрочное финансирование до 30 лет':
			'Langfristige Finanzierung bis zu 30 Jahren',
		'Возможность стать владельцем недвижимости':
			'Möglichkeit, Immobilienbesitzer zu werden',
		'Оценивайте необходимость страхования':
			'Bewerten Sie die Notwendigkeit einer Versicherung',
		'Консультируйтесь с ипотечными брокерами':
			'Konsultieren Sie Hypothekenmakler',
		'Для получения ипотечного кредита необходимо соответствовать определённым требованиям:':
			'Um einen Hypothekenkredit zu erhalten, müssen bestimmte Anforderungen erfüllt werden:',
		'Первоначальный взнос от 10-20%': 'Anzahlung von 10-20%',
		'Страхование недвижимости и жизни':
			'Immobilien- und Lebensversicherung',
		'Государственные программы': 'Staatliche Programme',
		'В России действуют различные программы поддержки ипотечного кредитования:':
			'Es gibt verschiedene Programme zur Unterstützung der Hypothekenkreditvergabe:',
		Господдержка: 'Staatsunterstützung',
		'Субсидирование процентной ставки для молодых семей и многодетных':
			'Zinssubventionen für junge Familien und kinderreiche Familien',
		'Коммерческая ипотека': 'Kommerzielle Hypothek',
		'Стандартные условия банков с рыночными ставками':
			'Standard-Bankbedingungen mit Marktzinsen',
		'Стоимость недвижимости (₽)': 'Immobilienwert (€)',
	},
};

/**
 * Fix translations in a specific language file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code (es, de)
 */
function fixTranslationsInFile(filePath, language) {
	console.log(
		`Fixing ${language.toUpperCase()} translations in ${filePath}...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Create backup
	const backupPath = filePath + `.${language}.translation.backup`;
	fs.writeFileSync(backupPath, content);

	// Get fixes for this language
	const fixes = translationFixes[language];
	if (!fixes) {
		console.log(`  No fixes defined for language: ${language}`);
		return;
	}

	// Apply fixes
	Object.entries(fixes).forEach(([russianText, translatedText]) => {
		// Escape special regex characters in the Russian text
		const escapedRussian = russianText.replace(
			/[.*+?^${}()|[\]\\]/g,
			'\\$&'
		);
		const regex = new RegExp(escapedRussian, 'g');

		if (content.match(regex)) {
			content = content.replace(regex, translatedText);
			modified = true;
			console.log(
				`  Fixed: ${russianText.substring(
					0,
					30
				)}... → ${translatedText.substring(0, 30)}...`
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
 * Main function
 */
function main() {
	console.log('🔧 Fixing translations in all language files...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix each language file
	Object.keys(translationFixes).forEach((language) => {
		const filePath = path.join(messagesDir, `${language}.json`);

		if (fs.existsSync(filePath)) {
			fixTranslationsInFile(filePath, language);
		} else {
			console.log(`❌ File not found: ${filePath}`);
		}
	});

	console.log('\n✅ All translations fix completed!');
	console.log('\n📋 Summary:');
	console.log(
		'  - Replaced Russian text with proper translations in Spanish and German'
	);
	console.log(
		'  - Fixed mortgage, auto-loan, and consumer-loan calculator translations'
	);
	console.log('  - Created backup files (*.translation.backup)');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the Spanish and German versions of the calculators');
	console.log('  2. Check other calculators for similar issues');
	console.log(
		"  3. Remove backup files once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixTranslationsInFile,
	translationFixes,
};
