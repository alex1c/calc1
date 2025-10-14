#!/usr/bin/env node

/**
 * Script to fix vehicle-tax translations in English file
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix vehicle-tax translations in a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function fixVehicleTaxTranslations(filePath, language) {
	console.log(
		`Fixing vehicle-tax translations in ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.vehicle-tax.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Fix vehicle-tax section
	if (data.calculators && data.calculators['vehicle-tax']) {
		const vehicleTaxSection = data.calculators['vehicle-tax'];

		// Fix title and description
		vehicleTaxSection.title = 'Vehicle Tax Calculator';
		vehicleTaxSection.description =
			'Calculate vehicle tax based on engine power, region and ownership period';

		// Fix SEO section
		if (vehicleTaxSection.seo) {
			vehicleTaxSection.seo.title =
				'Vehicle Tax Calculator: Calculate Car Tax';
			vehicleTaxSection.seo.overview.title =
				'Vehicle Tax Calculator for Car Owners';
			vehicleTaxSection.seo.overview.content =
				'Online vehicle tax calculator helps calculate how much you need to pay for your car based on engine power, registration region and ownership period. Find out your tax burden quickly and conveniently.';

			// Fix calculation section
			if (vehicleTaxSection.seo.calculation) {
				vehicleTaxSection.seo.calculation.title =
					'How Vehicle Tax is Calculated';
				vehicleTaxSection.seo.calculation.content =
					'Vehicle tax calculation takes into account several factors:';
				vehicleTaxSection.seo.calculation.enginePower =
					'Engine power in horsepower';
				vehicleTaxSection.seo.calculation.region =
					'Registration region with different tax rates';
				vehicleTaxSection.seo.calculation.ownership =
					'Ownership period (full year or partial)';
				vehicleTaxSection.seo.calculation.rate =
					'Tax rate per horsepower set by region';
			}

			// Fix advantages section
			if (vehicleTaxSection.seo.advantages) {
				vehicleTaxSection.seo.advantages.title =
					'Benefits of using Vehicle Tax Calculator';
				vehicleTaxSection.seo.advantages.content =
					'Vehicle tax calculator provides many benefits for tax planning:';
				vehicleTaxSection.seo.advantages.quick =
					'Quick calculation in seconds';
				vehicleTaxSection.seo.advantages.accurate =
					'Accurate calculations based on current rates';
				vehicleTaxSection.seo.advantages.planning =
					'Tax budget planning';
				vehicleTaxSection.seo.advantages.savings =
					'Time savings on tax calculations';
			}

			// Fix tips section
			if (vehicleTaxSection.seo.tips) {
				vehicleTaxSection.seo.tips.title = 'Vehicle Tax Tips';
				vehicleTaxSection.seo.tips.content =
					'To optimize your vehicle tax:';
				vehicleTaxSection.seo.tips.engine =
					'Consider engine power when buying a car';
				vehicleTaxSection.seo.tips.region =
					'Check tax rates in different regions';
				vehicleTaxSection.seo.tips.ownership =
					'Plan ownership period for tax optimization';
				vehicleTaxSection.seo.tips.payment =
					'Pay taxes on time to avoid penalties';
			}
		}

		// Fix form section
		if (vehicleTaxSection.form) {
			vehicleTaxSection.form.title = 'Calculation Parameters';
			vehicleTaxSection.form.enginePower = 'Engine Power (hp)';
			vehicleTaxSection.form.region = 'Region';
			vehicleTaxSection.form.selectRegion = 'Select Region';
			vehicleTaxSection.form.ownershipPeriod = 'Ownership Period';
			vehicleTaxSection.form.fullYear = 'Full Year';
			vehicleTaxSection.form.partialYear = 'Partial Year';
			vehicleTaxSection.form.months = 'Months';
			vehicleTaxSection.form.calculate = 'Calculate';
			if (vehicleTaxSection.form.errors) {
				vehicleTaxSection.form.errors.title = 'Input Errors';
			}
		}

		// Fix results section
		if (vehicleTaxSection.results) {
			vehicleTaxSection.results.title = 'Calculation Results';
			vehicleTaxSection.results.taxAmount = 'Tax Amount';
			vehicleTaxSection.results.ratePerHp = 'Rate per HP';
			vehicleTaxSection.results.totalHp = 'Total HP';
			vehicleTaxSection.results.ownershipMonths = 'Ownership Months';
			vehicleTaxSection.results.details = 'Calculation Details';
			vehicleTaxSection.results.placeholder =
				"Enter parameters and click 'Calculate'";
		}
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Fixed vehicle-tax translations in ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing vehicle-tax translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixVehicleTaxTranslations(enFile, 'en');
	}

	console.log('\n✅ Vehicle-tax translations fixed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed vehicle-tax translations in English');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the vehicle-tax calculator in English');
	console.log('  2. Check if there are similar issues in other languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixVehicleTaxTranslations,
};
