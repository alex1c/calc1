#!/usr/bin/env node

/**
 * Script to fix kasko translations in English file
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix kasko translations in a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function fixKaskoTranslations(filePath, language) {
	console.log(
		`Fixing kasko translations in ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.kasko.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Fix kasko section
	if (data.calculators && data.calculators['kasko']) {
		const kaskoSection = data.calculators['kasko'];

		// Fix SEO section
		if (kaskoSection.seo) {
			kaskoSection.seo.title =
				'KASKO Calculator: Calculate Full Auto Insurance Cost';
			kaskoSection.seo.overview.title =
				'KASKO Calculator for Policy Cost Calculation';
			kaskoSection.seo.overview.content =
				'KASKO Calculator is a professional tool for calculating full auto insurance policy cost. With our calculator you can calculate the exact KASKO cost taking into account all coefficients: car value, driver age and experience, region, anti-theft system presence and deductible.';

			// Fix coefficients section
			if (kaskoSection.seo.coefficients) {
				kaskoSection.seo.coefficients.title =
					'KASKO Calculation Coefficients';
				kaskoSection.seo.coefficients.content =
					'KASKO cost calculation takes into account various coefficients:';
				kaskoSection.seo.coefficients.carValue =
					'Car value coefficient';
				kaskoSection.seo.coefficients.driverAge =
					'Driver age and experience coefficient';
				kaskoSection.seo.coefficients.region = 'Regional coefficient';
				kaskoSection.seo.coefficients.antiTheft =
					'Anti-theft system coefficient';
				kaskoSection.seo.coefficients.deductible =
					'Deductible coefficient';
			}

			// Fix advantages section
			if (kaskoSection.seo.advantages) {
				kaskoSection.seo.advantages.title =
					'Benefits of using KASKO Calculator';
				kaskoSection.seo.advantages.content =
					'KASKO calculator provides many benefits for insurance planning:';
				kaskoSection.seo.advantages.quick =
					'Quick calculation in seconds';
				kaskoSection.seo.advantages.accurate =
					'Accurate calculations based on real data';
				kaskoSection.seo.advantages.planning =
					'Insurance budget planning';
				kaskoSection.seo.advantages.savings =
					'Money savings on insurance';
			}

			// Fix tips section
			if (kaskoSection.seo.tips) {
				kaskoSection.seo.tips.title = 'KASKO Insurance Tips';
				kaskoSection.seo.tips.content =
					'To get the best KASKO insurance terms:';
				kaskoSection.seo.tips.antiTheft =
					'Install certified anti-theft system';
				kaskoSection.seo.tips.deductible =
					'Consider choosing a deductible';
				kaskoSection.seo.tips.comparison =
					'Compare offers from different insurers';
				kaskoSection.seo.tips.driver =
					'Add experienced drivers to the policy';
			}
		}

		// Fix form section
		if (kaskoSection.form) {
			kaskoSection.form.title = 'Calculation Parameters';
			kaskoSection.form.carValue = 'Car Value ($)';
			kaskoSection.form.driverAge = 'Driver Age';
			kaskoSection.form.driverExperience = 'Driver Experience (years)';
			kaskoSection.form.region = 'Region';
			kaskoSection.form.antiTheft = 'Anti-theft System';
			kaskoSection.form.deductible = 'Deductible ($)';
			kaskoSection.form.calculate = 'Calculate';
			if (kaskoSection.form.errors) {
				kaskoSection.form.errors.title = 'Input Errors';
			}
		}

		// Fix results section
		if (kaskoSection.results) {
			kaskoSection.results.title = 'Calculation Results';
			kaskoSection.results.premium = 'Insurance Premium';
			kaskoSection.results.coefficients = 'Applied Coefficients';
			kaskoSection.results.details = 'Calculation Details';
			kaskoSection.results.placeholder =
				"Enter parameters and click 'Calculate'";
		}
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Fixed kasko translations in ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing kasko translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixKaskoTranslations(enFile, 'en');
	}

	console.log('\n✅ Kasko translations fixed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed kasko translations in English');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the kasko calculator in English');
	console.log('  2. Check if there are similar issues in other languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixKaskoTranslations,
};
