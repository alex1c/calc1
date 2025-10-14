#!/usr/bin/env node

/**
 * Script to fix leasing translations in English file
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix leasing translations in a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function fixLeasingTranslations(filePath, language) {
	console.log(
		`Fixing leasing translations in ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.leasing.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Fix leasing section
	if (data.calculators && data.calculators['leasing']) {
		const leasingSection = data.calculators['leasing'];

		// Fix breadcrumbs
		if (leasingSection.breadcrumbs) {
			leasingSection.breadcrumbs.auto = 'Auto';
		}

		// Fix SEO section
		if (leasingSection.seo) {
			leasingSection.seo.title = 'Auto Leasing Calculator Online';
			leasingSection.seo.overview.title = 'About Auto Leasing Calculator';
			leasingSection.seo.overview.content =
				'Online auto leasing calculator helps calculate monthly payments, overpayment and total payments under leasing agreement. Convenient tool for evaluating auto leasing profitability.';

			// Fix calculation section
			if (leasingSection.seo.calculation) {
				leasingSection.seo.calculation.title =
					'How Leasing is Calculated';
				leasingSection.seo.calculation.content =
					'Leasing is calculated using annuity payment formula considering down payment, contract term, interest rate and buyout value.';
				leasingSection.seo.calculation.financing =
					'Financing Amount = Car Value - Down Payment - Buyout Value';
				leasingSection.seo.calculation.payment =
					'Monthly Payment is calculated using annuity formula';
				leasingSection.seo.calculation.total =
					'Total Amount = Monthly Payment × Term + Down Payment + Buyout Value';
				leasingSection.seo.calculation.overpayment =
					'Total Interest = Total Amount - Car Value';
			}

			// Fix advantages section
			if (leasingSection.seo.advantages) {
				leasingSection.seo.advantages.title = 'Calculator Benefits';
				leasingSection.seo.advantages.content =
					'Our auto leasing calculator helps you make an informed decision about auto leasing profitability.';
				leasingSection.seo.advantages.quick =
					'Quick calculation in seconds';
				leasingSection.seo.advantages.accurate =
					'Accurate calculations using current formulas';
				leasingSection.seo.advantages.comparison =
					'Ability to compare different leasing options';
				leasingSection.seo.advantages.planning =
					'Financial planning and budgeting';
			}

			// Fix tips section
			if (leasingSection.seo.tips) {
				leasingSection.seo.tips.title = 'Leasing Tips';
				leasingSection.seo.tips.content =
					'To get the best leasing terms:';
				leasingSection.seo.tips.compare =
					'Compare offers from different leasing companies';
				leasingSection.seo.tips.downPayment =
					'Consider making a larger down payment';
				leasingSection.seo.tips.term = 'Choose the optimal lease term';
				leasingSection.seo.tips.buyout =
					'Negotiate buyout value in advance';
				leasingSection.seo.tips.consultation =
					'Consult with leasing specialists';
			}
		}
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Fixed leasing translations in ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing leasing translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixLeasingTranslations(enFile, 'en');
	}

	console.log('\n✅ Leasing translations fixed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed leasing translations in English');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the leasing calculator in English');
	console.log('  2. Check if there are similar issues in other languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixLeasingTranslations,
};
