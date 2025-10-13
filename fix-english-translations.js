#!/usr/bin/env node

/**
 * Script to fix English translations that contain Russian text
 * Replaces Russian text with proper English translations
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix English translations in mortgage section
 * @param {string} filePath - Path to the English translation file
 */
function fixEnglishTranslations(filePath) {
	console.log(`Fixing English translations in ${filePath}...`);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Create backup
	const backupPath = filePath + '.translation.backup';
	fs.writeFileSync(backupPath, content);

	// Fix Russian text in English translations
	const fixes = [
		// advantages section
		{
			from: '"longTerm": "Долгосрочное финансирование до 30 лет"',
			to: '"longTerm": "Long-term financing up to 30 years"',
		},
		{
			from: '"lowRate": "Сравнительно низкие процентные ставки"',
			to: '"lowRate": "Relatively low interest rates"',
		},
		{
			from: '"propertyOwnership": "Возможность стать владельцем недвижимости"',
			to: '"propertyOwnership": "Opportunity to become a property owner"',
		},

		// tips section
		{
			from: '"early": "Рассматривайте досрочное погашение"',
			to: '"early": "Consider early repayment"',
		},
		{
			from: '"insurance": "Оценивайте необходимость страхования"',
			to: '"insurance": "Evaluate the need for insurance"',
		},
		{
			from: '"consult": "Консультируйтесь с ипотечными брокерами"',
			to: '"consult": "Consult with mortgage brokers"',
		},

		// requirements section
		{
			from: '"title": "Требования к заёмщику"',
			to: '"title": "Borrower Requirements"',
		},
		{
			from: '"content": "Для получения ипотечного кредита необходимо соответствовать определённым требованиям:"',
			to: '"content": "To obtain a mortgage loan, you must meet certain requirements:"',
		},
		{
			from: '"income": "Стабильный доход, подтверждённый справками"',
			to: '"income": "Stable income confirmed by certificates"',
		},
		{
			from: '"creditHistory": "Положительная кредитная история"',
			to: '"creditHistory": "Positive credit history"',
		},
		{
			from: '"downPayment": "Первоначальный взнос от 10-20%"',
			to: '"downPayment": "Down payment from 10-20%"',
		},
		{
			from: '"insurance": "Страхование недвижимости и жизни"',
			to: '"insurance": "Property and life insurance"',
		},
		{
			from: '"documents": "Полный пакет документов"',
			to: '"documents": "Complete set of documents"',
		},

		// programs section
		{
			from: '"title": "Государственные программы"',
			to: '"title": "Government Programs"',
		},
		{
			from: '"content": "В России действуют различные программы поддержки ипотечного кредитования:"',
			to: '"content": "Various mortgage support programs are available:"',
		},
		{
			from: '"title": "Господдержка"',
			to: '"title": "Government Support"',
		},
		{
			from: '"desc": "Субсидирование процентной ставки для молодых семей и многодетных"',
			to: '"desc": "Interest rate subsidies for young families and large families"',
		},
		{
			from: '"title": "Коммерческая ипотека"',
			to: '"title": "Commercial Mortgage"',
		},
		{
			from: '"desc": "Стандартные условия банков с рыночными ставками"',
			to: '"desc": "Standard bank conditions with market rates"',
		},

		// form section
		{
			from: '"propertyValue": "Стоимость недвижимости (₽)"',
			to: '"propertyValue": "Property Value ($)"',
		},
	];

	// Apply fixes
	fixes.forEach((fix) => {
		if (content.includes(fix.from)) {
			content = content.replace(fix.from, fix.to);
			modified = true;
			console.log(`  Fixed: ${fix.from.substring(0, 50)}...`);
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
	console.log('🔧 Fixing English translations...\n');

	const enFile = path.join(__dirname, 'messages', 'en.json');

	// Check if file exists
	if (!fs.existsSync(enFile)) {
		console.error(`❌ English translation file not found: ${enFile}`);
		process.exit(1);
	}

	// Fix translations
	fixEnglishTranslations(enFile);

	console.log('\n✅ English translations fix completed!');
	console.log('\n📋 Summary:');
	console.log('  - Replaced Russian text with proper English translations');
	console.log('  - Fixed mortgage calculator translations');
	console.log('  - Created backup file (*.translation.backup)');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the English version of the mortgage calculator');
	console.log('  2. Check other calculators for similar issues');
	console.log(
		"  3. Remove backup file once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixEnglishTranslations,
};
