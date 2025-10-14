#!/usr/bin/env node

/**
 * Script to fix car-loan translations in English file
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix car-loan translations in a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function fixCarLoanTranslations(filePath, language) {
	console.log(
		`Fixing car-loan translations in ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.car-loan.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Fix car-loan section
	if (data.calculators && data.calculators['car-loan']) {
		const carLoanSection = data.calculators['car-loan'];

		// Fix SEO section
		if (carLoanSection.seo) {
			carLoanSection.seo.title =
				'Auto Loan Calculator: Calculate Payments, Rates and Car Loan Terms';
			carLoanSection.seo.overview.title =
				'Auto Loan Calculator for Car Loan Calculation';
			carLoanSection.seo.overview.content =
				'Auto Loan Calculator is a professional tool for calculating car loans, monthly payments, total payments and overpayment. With our calculator you can calculate optimal car loan terms, compare different bank offers and choose the most profitable financing option for car purchase.';

			// Fix advantages section
			if (carLoanSection.seo.advantages) {
				carLoanSection.seo.advantages.title =
					'Benefits of using Auto Loan Calculator';
				carLoanSection.seo.advantages.content =
					'Auto loan calculator provides many benefits for car purchase planning:';
				carLoanSection.seo.advantages.quick =
					'Quick calculation in seconds';
				carLoanSection.seo.advantages.accurate =
					'Accurate calculations based on real data';
				carLoanSection.seo.advantages.planning =
					'Car purchase and loan budget planning';
				carLoanSection.seo.advantages.savings =
					'Money savings on car financing';
			}

			// Fix tips section
			if (carLoanSection.seo.tips) {
				carLoanSection.seo.tips.title = 'Car Loan Tips';
				carLoanSection.seo.tips.content =
					'To get the best car loan terms:';
				carLoanSection.seo.tips.credit =
					'Check and improve your credit score';
				carLoanSection.seo.tips.comparison =
					'Compare offers from different banks';
				carLoanSection.seo.tips.downPayment =
					'Consider making a larger down payment';
				carLoanSection.seo.tips.term = 'Choose the optimal loan term';
			}
		}

		// Fix form section
		if (carLoanSection.form) {
			carLoanSection.form.title = 'Calculation Parameters';
			carLoanSection.form.carPrice = 'Car Price ($)';
			carLoanSection.form.downPayment = 'Down Payment ($)';
			carLoanSection.form.loanAmount = 'Loan Amount ($)';
			carLoanSection.form.interestRate = 'Interest Rate (%)';
			carLoanSection.form.loanTerm = 'Loan Term (months)';
			carLoanSection.form.calculate = 'Calculate';
			if (carLoanSection.form.errors) {
				carLoanSection.form.errors.title = 'Input Errors';
			}
		}

		// Fix results section
		if (carLoanSection.results) {
			carLoanSection.results.title = 'Calculation Results';
			carLoanSection.results.monthlyPayment = 'Monthly Payment';
			carLoanSection.results.totalPayment = 'Total Payment';
			carLoanSection.results.totalInterest = 'Total Interest';
			carLoanSection.results.effectiveRate = 'Effective Rate';
			carLoanSection.results.details = 'Payment Details';
			carLoanSection.results.placeholder =
				"Enter parameters and click 'Calculate'";
		}
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Fixed car-loan translations in ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing car-loan translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixCarLoanTranslations(enFile, 'en');
	}

	console.log('\n✅ Car-loan translations fixed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed car-loan translations in English');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the car-loan calculator in English');
	console.log('  2. Check if there are similar issues in other languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixCarLoanTranslations,
};
