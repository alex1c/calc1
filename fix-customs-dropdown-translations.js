#!/usr/bin/env node

/**
 * Script to add dropdown translations for customs calculator
 */

const fs = require('fs');
const path = require('path');

/**
 * Add dropdown translations to a file
 * @param {string} filePath - Path to the translation file
 * @param {string} language - Language code
 * @param {object} dropdownTranslations - Dropdown translations to add
 */
function addDropdownTranslations(filePath, language, dropdownTranslations) {
	console.log(
		`Adding dropdown translations to ${language.toUpperCase()} file...`
	);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');

	// Create backup
	const backupPath = filePath + `.customs.dropdown.${language}.backup`;
	fs.writeFileSync(backupPath, content);

	// Parse JSON
	let data = JSON.parse(content);

	// Ensure calculators.customs.form.fuelTypes section exists
	if (!data.calculators) {
		data.calculators = {};
	}
	if (!data.calculators.customs) {
		data.calculators.customs = {};
	}
	if (!data.calculators.customs.form) {
		data.calculators.customs.form = {};
	}

	// Add dropdown translations
	data.calculators.customs.form.fuelTypes = dropdownTranslations;

	// Write back to file
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
	console.log(`  ✅ Added dropdown translations to ${filePath}`);
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Adding dropdown translations for customs calculator...\n');

	const messagesDir = path.join(__dirname, 'messages');

	// Check if directory exists
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	// Russian dropdown translations
	const ruDropdownTranslations = {
		gasoline: 'Бензин',
		diesel: 'Дизель',
		electric: 'Электрический',
	};

	// English dropdown translations
	const enDropdownTranslations = {
		gasoline: 'Gasoline',
		diesel: 'Diesel',
		electric: 'Electric',
	};

	// Spanish dropdown translations
	const esDropdownTranslations = {
		gasoline: 'Gasolina',
		diesel: 'Diésel',
		electric: 'Eléctrico',
	};

	// German dropdown translations
	const deDropdownTranslations = {
		gasoline: 'Benzin',
		diesel: 'Diesel',
		electric: 'Elektrisch',
	};

	// Add dropdown translations to all languages
	const ruFile = path.join(messagesDir, 'ru.json');
	if (fs.existsSync(ruFile)) {
		addDropdownTranslations(ruFile, 'ru', ruDropdownTranslations);
	}

	const enFile = path.join(messagesDir, 'en.json');
	if (fs.existsSync(enFile)) {
		addDropdownTranslations(enFile, 'en', enDropdownTranslations);
	}

	const esFile = path.join(messagesDir, 'es.json');
	if (fs.existsSync(esFile)) {
		addDropdownTranslations(esFile, 'es', esDropdownTranslations);
	}

	const deFile = path.join(messagesDir, 'de.json');
	if (fs.existsSync(deFile)) {
		addDropdownTranslations(deFile, 'de', deDropdownTranslations);
	}

	console.log('\n✅ Dropdown translations added to all language files!');
	console.log('\n📋 Summary:');
	console.log('  - Added fuel type dropdown translations to Russian');
	console.log('  - Added fuel type dropdown translations to English');
	console.log('  - Added fuel type dropdown translations to Spanish');
	console.log('  - Added fuel type dropdown translations to German');
	console.log('  - Created backup files for all changes');
	console.log('\n⚠️  Next steps:');
	console.log(
		'  1. Update the getFuelTypeOptions function to use translations'
	);
	console.log('  2. Test the customs calculator dropdown in all languages');
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	addDropdownTranslations,
};
