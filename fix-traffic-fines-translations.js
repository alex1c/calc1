#!/usr/bin/env node

/**
 * Script to fix traffic-fines translations in English file
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix traffic-fines translations in a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function fixTrafficFinesTranslations(filePath, language) {
	console.log(
		`Fixing traffic-fines translations in ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.traffic-fines.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Fix traffic-fines section
	if (data.calculators && data.calculators['traffic-fines']) {
		const trafficFinesSection = data.calculators['traffic-fines'];

		// Fix title and description
		trafficFinesSection.title = 'Traffic Fines Calculator';
		trafficFinesSection.description =
			'Calculate traffic fines for traffic violations with early payment discount';

		// Fix breadcrumbs
		if (trafficFinesSection.breadcrumbs) {
			trafficFinesSection.breadcrumbs.auto = 'Auto';
		}

		// Fix form section
		if (trafficFinesSection.form) {
			trafficFinesSection.form.title = 'Select Violations';
			trafficFinesSection.form.selectViolations = 'Traffic Violations';
			trafficFinesSection.form.calculate = 'Calculate Fine';
			if (trafficFinesSection.form.errors) {
				trafficFinesSection.form.errors.title = 'Input Errors';
			}
		}

		// Fix results section
		if (trafficFinesSection.results) {
			trafficFinesSection.results.title = 'Calculation Results';
			trafficFinesSection.results.totalFine = 'Total Fine';
			trafficFinesSection.results.discount = 'Early Payment Discount';
			trafficFinesSection.results.finalAmount = 'Final Amount';
			trafficFinesSection.results.details = 'Fine Details';
			trafficFinesSection.results.placeholder =
				"Select violations and click 'Calculate'";
		}

		// Fix SEO section
		if (trafficFinesSection.seo) {
			trafficFinesSection.seo.title =
				'Traffic Fines Calculator: Calculate Traffic Violation Fines';
			trafficFinesSection.seo.overview.title =
				'Traffic Fines Calculator for Drivers';
			trafficFinesSection.seo.overview.content =
				'Online traffic fines calculator helps calculate fines for traffic violations with consideration of early payment discount. Find out the exact amount of fine for various traffic violations quickly and conveniently.';

			// Fix calculation section
			if (trafficFinesSection.seo.calculation) {
				trafficFinesSection.seo.calculation.title =
					'How Traffic Fines are Calculated';
				trafficFinesSection.seo.calculation.content =
					'Traffic fines calculation takes into account several factors:';
				trafficFinesSection.seo.calculation.violation =
					'Type of traffic violation';
				trafficFinesSection.seo.calculation.amount =
					'Base fine amount for violation';
				trafficFinesSection.seo.calculation.discount =
					'Early payment discount (up to 50%)';
				trafficFinesSection.seo.calculation.deadline =
					'Payment deadline (20 days from violation date)';
			}

			// Fix advantages section
			if (trafficFinesSection.seo.advantages) {
				trafficFinesSection.seo.advantages.title =
					'Benefits of using Traffic Fines Calculator';
				trafficFinesSection.seo.advantages.content =
					'Traffic fines calculator provides many benefits for drivers:';
				trafficFinesSection.seo.advantages.quick =
					'Quick calculation in seconds';
				trafficFinesSection.seo.advantages.accurate =
					'Accurate calculations based on current rates';
				trafficFinesSection.seo.advantages.planning =
					'Fine budget planning';
				trafficFinesSection.seo.advantages.savings =
					'Money savings with early payment discount';
			}

			// Fix tips section
			if (trafficFinesSection.seo.tips) {
				trafficFinesSection.seo.tips.title = 'Traffic Fines Tips';
				trafficFinesSection.seo.tips.content =
					'To minimize traffic fines:';
				trafficFinesSection.seo.tips.early =
					'Pay fines within 20 days for 50% discount';
				trafficFinesSection.seo.tips.avoid =
					'Follow traffic rules to avoid violations';
				trafficFinesSection.seo.tips.check =
					'Regularly check for unpaid fines';
				trafficFinesSection.seo.tips.appeal =
					'Appeal unjust fines if necessary';
			}
		}
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Fixed traffic-fines translations in ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing traffic-fines translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixTrafficFinesTranslations(enFile, 'en');
	}

	console.log('\n✅ Traffic-fines translations fixed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed traffic-fines translations in English');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the traffic-fines calculator in English');
	console.log('  2. Check if there are similar issues in other languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixTrafficFinesTranslations,
};
