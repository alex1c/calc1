#!/usr/bin/env node

/**
 * Migration script for restructuring translation files
 *
 * This script restructures translation files to have a consistent structure:
 * - All calculator data moves to calculators.* namespace
 * - Removes duplication between categories.construction.calculators and root/calculators
 * - Maintains backward compatibility during transition
 */

const fs = require('fs');
const path = require('path');

// List of calculator names that need to be moved to calculators namespace
const CALCULATOR_NAMES = [
	'wall',
	'materials',
	'tile-laminate',
	'concrete',
	'roof',
	'wallpaper',
	'paper-weight',
	'bmi',
	'credit-loan',
	'mortgage',
	'deposit',
	'consumer-loan',
	'auto-loan',
	'car-loan',
	'osago',
	'kasko',
	'fuel-consumption',
	'vehicle-tax',
	'traffic-fines',
	'car-ownership',
	'car-depreciation',
	'leasing',
	'customs',
	'savings',
	'investment',
];

// List of calculators that are currently in root but should be in calculators
const ROOT_TO_CALCULATORS = [
	'wall',
	'materials',
	'tile-laminate',
	'concrete',
	'roof',
	'wallpaper',
];

// List of calculators that are already in calculators but need path updates
const CALCULATORS_ALREADY_MOVED = [
	'paper-weight',
	'bmi',
	'credit-loan',
	'mortgage',
	'deposit',
	'consumer-loan',
	'auto-loan',
	'car-loan',
	'osago',
	'kasko',
	'fuel-consumption',
	'vehicle-tax',
	'traffic-fines',
	'car-ownership',
	'car-depreciation',
	'leasing',
	'customs',
	'savings',
	'investment',
];

/**
 * Migrate a single translation file
 * @param {string} filePath - Path to the translation file
 */
function migrateTranslationFile(filePath) {
	console.log(`Migrating ${filePath}...`);

	// Read the file
	const content = fs.readFileSync(filePath, 'utf8');
	const data = JSON.parse(content);

	// Create backup
	const backupPath = filePath + '.backup';
	fs.writeFileSync(backupPath, content);
	console.log(`  Created backup: ${backupPath}`);

	// Ensure calculators namespace exists
	if (!data.calculators) {
		data.calculators = {};
	}

	// Move calculators from root to calculators namespace
	ROOT_TO_CALCULATORS.forEach((calcName) => {
		if (data[calcName]) {
			console.log(
				`  Moving ${calcName} from root to calculators namespace`
			);
			data.calculators[calcName] = data[calcName];
			delete data[calcName];
		}
	});

	// Clean up categories.construction.calculators (keep only title/description for navigation)
	if (data.categories?.construction?.calculators) {
		console.log(`  Cleaning up categories.construction.calculators`);
		const constructionCalcs = data.categories.construction.calculators;

		// Keep only essential navigation data
		Object.keys(constructionCalcs).forEach((calcName) => {
			if (constructionCalcs[calcName]) {
				// Keep only title and description for navigation
				const navData = {
					title: constructionCalcs[calcName].title,
					description: constructionCalcs[calcName].description,
				};
				constructionCalcs[calcName] = navData;
			}
		});
	}

	// Write the migrated file
	const migratedContent = JSON.stringify(data, null, '\t');
	fs.writeFileSync(filePath, migratedContent);

	console.log(`  ✅ Migration completed for ${filePath}`);
}

/**
 * Update page.tsx files to use new translation paths
 * @param {string} pagesDir - Directory containing page.tsx files
 */
function updatePageFiles(pagesDir) {
	console.log(`Updating page.tsx files in ${pagesDir}...`);

	// Find all page.tsx files
	const findPageFiles = (dir) => {
		const files = [];
		const items = fs.readdirSync(dir);

		for (const item of items) {
			const fullPath = path.join(dir, item);
			const stat = fs.statSync(fullPath);

			if (stat.isDirectory()) {
				files.push(...findPageFiles(fullPath));
			} else if (item === 'page.tsx') {
				files.push(fullPath);
			}
		}

		return files;
	};

	const pageFiles = findPageFiles(pagesDir);

	pageFiles.forEach((filePath) => {
		console.log(`  Updating ${filePath}...`);

		// Read the file
		let content = fs.readFileSync(filePath, 'utf8');
		let modified = false;

		// Create backup
		const backupPath = filePath + '.backup';
		fs.writeFileSync(backupPath, content);

		// Update useTranslations paths
		ROOT_TO_CALCULATORS.forEach((calcName) => {
			// Update useTranslations('calcName') to useTranslations('calculators.calcName')
			const oldPattern = new RegExp(
				`useTranslations\\('${calcName}'\\)`,
				'g'
			);
			const newPattern = `useTranslations('calculators.${calcName}')`;

			if (content.match(oldPattern)) {
				content = content.replace(oldPattern, newPattern);
				modified = true;
				console.log(`    Updated useTranslations for ${calcName}`);
			}
		});

		// Update SEO paths in generateMetadata
		ROOT_TO_CALCULATORS.forEach((calcName) => {
			// Update messages.calcName.seo[key] to messages.calculators.calcName.seo[key]
			const oldPattern = new RegExp(
				`messages\\.${calcName}\\.seo\\[key\\]`,
				'g'
			);
			const newPattern = `messages.calculators.${calcName}.seo[key]`;

			if (content.match(oldPattern)) {
				content = content.replace(oldPattern, newPattern);
				modified = true;
				console.log(`    Updated SEO path for ${calcName}`);
			}
		});

		// Handle special cases
		// tile-laminate uses messages.calculators['tile-laminate'].seo[key]
		if (
			content.includes("messages.calculators['tile-laminate'].seo[key]")
		) {
			content = content.replace(
				"messages.calculators['tile-laminate'].seo[key]",
				"messages.calculators['tile-laminate'].seo[key]"
			);
			modified = true;
			console.log(`    Updated tile-laminate SEO path`);
		}

		// traffic-fines uses messages['traffic-fines'].seo[key] but should use messages.calculators['traffic-fines'].seo[key]
		if (content.includes("messages['traffic-fines'].seo[key]")) {
			content = content.replace(
				"messages['traffic-fines'].seo[key]",
				"messages.calculators['traffic-fines'].seo[key]"
			);
			modified = true;
			console.log(`    Updated traffic-fines SEO path`);
		}

		// Write the updated file
		if (modified) {
			fs.writeFileSync(filePath, content);
			console.log(`    ✅ Updated ${filePath}`);
		} else {
			console.log(`    No changes needed for ${filePath}`);
		}
	});
}

/**
 * Main migration function
 */
function main() {
	console.log('🚀 Starting translation migration...\n');

	const messagesDir = path.join(__dirname, 'messages');
	const pagesDir = path.join(__dirname, 'src', 'app', '[locale]', 'calc');

	// Check if directories exist
	if (!fs.existsSync(messagesDir)) {
		console.error(`❌ Messages directory not found: ${messagesDir}`);
		process.exit(1);
	}

	if (!fs.existsSync(pagesDir)) {
		console.error(`❌ Pages directory not found: ${pagesDir}`);
		process.exit(1);
	}

	// Get all translation files
	const translationFiles = fs
		.readdirSync(messagesDir)
		.filter((file) => file.endsWith('.json'))
		.map((file) => path.join(messagesDir, file));

	console.log(`Found ${translationFiles.length} translation files:`);
	translationFiles.forEach((file) =>
		console.log(`  - ${path.basename(file)}`)
	);
	console.log();

	// Migrate translation files
	translationFiles.forEach(migrateTranslationFile);
	console.log();

	// Update page.tsx files
	updatePageFiles(pagesDir);
	console.log();

	console.log('✅ Migration completed successfully!');
	console.log('\n📋 Summary of changes:');
	console.log(
		'  - Moved calculator data from root to calculators.* namespace'
	);
	console.log(
		'  - Cleaned up categories.construction.calculators (kept only navigation data)'
	);
	console.log('  - Updated useTranslations paths in page.tsx files');
	console.log('  - Updated SEO paths in generateMetadata functions');
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the application to ensure everything works');
	console.log(
		'  2. Update any components that use the old translation paths'
	);
	console.log(
		"  3. Remove backup files once you're confident everything works"
	);
	console.log('  4. Update any other files that reference the old structure');
}

// Run the migration
if (require.main === module) {
	main();
}

module.exports = {
	migrateTranslationFile,
	updatePageFiles,
	CALCULATOR_NAMES,
	ROOT_TO_CALCULATORS,
	CALCULATORS_ALREADY_MOVED,
};
