#!/usr/bin/env node

/**
 * Script to fix fuel-consumption translations in English file
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix fuel-consumption translations in a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 */
function fixFuelConsumptionTranslations(filePath, language) {
	console.log(
		`Fixing fuel-consumption translations in ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.fuel-consumption.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Fix fuel-consumption section
	if (data.calculators && data.calculators['fuel-consumption']) {
		const fuelSection = data.calculators['fuel-consumption'];

		// Fix title and description
		fuelSection.title = 'Fuel Consumption Calculator';
		fuelSection.description =
			'Calculate how many kilometers you can drive on a given amount of fuel or how much fuel you need for a trip';

		// Fix SEO section
		if (fuelSection.seo) {
			fuelSection.seo.title =
				'Fuel Consumption Calculator: Distance and Fuel Consumption Calculation';
			fuelSection.seo.overview.title =
				'Fuel Consumption Calculator for Trip Planning';
			fuelSection.seo.overview.content =
				'Online fuel consumption calculator helps calculate how many kilometers you can drive on a given amount of fuel, or how many liters of fuel you need for a trip at a known car consumption.';

			// Fix features section
			if (fuelSection.seo.features) {
				fuelSection.seo.features.title = 'Calculator Features';
				fuelSection.seo.features.content =
					'Our fuel consumption calculator provides two calculation modes:';
				fuelSection.seo.features.distance =
					'Distance calculation by fuel amount and consumption';
				fuelSection.seo.features.fuel =
					'Calculation of required fuel amount for trip';
				fuelSection.seo.features.planning = 'Trip and route planning';
				fuelSection.seo.features.economy = 'Fuel economy control';
			}

			// Fix advantages section
			if (fuelSection.seo.advantages) {
				fuelSection.seo.advantages.title =
					'Benefits of Using the Calculator';
				fuelSection.seo.advantages.content =
					'Fuel consumption calculator provides many benefits:';
				fuelSection.seo.advantages.quick =
					'Quick calculation in seconds';
				fuelSection.seo.advantages.accurate =
					'Accurate calculations based on real data';
				fuelSection.seo.advantages.planning =
					'Trip and fuel budget planning';
				fuelSection.seo.advantages.savings = 'Money savings on fuel';
			}

			// Fix tips section
			if (fuelSection.seo.tips) {
				fuelSection.seo.tips.title = 'Fuel Economy Tips';
				fuelSection.seo.tips.content = 'To reduce fuel consumption:';
				fuelSection.seo.tips.measure =
					"Regularly measure your car's fuel consumption";
				fuelSection.seo.tips.driving =
					'Follow economical driving style';
				fuelSection.seo.tips.maintenance =
					'Keep your car in good technical condition';
				fuelSection.seo.tips.planning =
					'Plan routes in advance to avoid traffic jams';
			}
		}

		// Fix form section
		if (fuelSection.form) {
			fuelSection.form.title = 'Calculation Parameters';
			fuelSection.form.mode = 'Calculation Mode';
			if (fuelSection.form.modes) {
				fuelSection.form.modes.distance = 'Calculate Distance';
				fuelSection.form.modes.distanceDesc = 'How far you can drive';
				fuelSection.form.modes.fuel = 'Calculate Fuel';
				fuelSection.form.modes.fuelDesc = 'How much fuel you need';
			}
			fuelSection.form.consumption = 'Fuel Consumption (L/100 km)';
			fuelSection.form.fuelAmount = 'Fuel Amount in Tank (L)';
			fuelSection.form.distance = 'Desired Distance (km)';
		}

		// Fix results section
		if (fuelSection.results) {
			fuelSection.results.title = 'Calculation Results';
			fuelSection.results.result = 'Result';
			fuelSection.results.km = 'km';
			fuelSection.results.liters = 'L';
			fuelSection.results.distanceResult = 'You can drive';
			fuelSection.results.fuelResult = 'For the trip you need';
			fuelSection.results.details = 'Calculation Details';
			fuelSection.results.consumption = 'Fuel Consumption';
			fuelSection.results.fuelAmount = 'Fuel Amount';
			fuelSection.results.distance = 'Distance';
			fuelSection.results.calculatedDistance = 'Calculated Distance';
			fuelSection.results.calculatedFuel = 'Calculated Fuel';
			fuelSection.results.placeholder =
				"Enter parameters and click 'Calculate'";
		}
	}

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Fixed fuel-consumption translations in ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing fuel-consumption translations...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Fix English file
	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		fixFuelConsumptionTranslations(enFile, 'en');
	}

	console.log('\n✅ Fuel-consumption translations fixed!');
	console.log('\n📋 Summary:');
	console.log('  - Fixed fuel-consumption translations in English');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the fuel-consumption calculator in English');
	console.log('  2. Check if there are similar issues in other languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixFuelConsumptionTranslations,
};
