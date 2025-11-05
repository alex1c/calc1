const fs = require('fs');
const path = require('path');

/**
 * Script to clean monolithic translation files
 * Removes calculators from categories.* and keeps only SEO info
 * Removes old calculators from root level
 */

const messagesDir = path.join(__dirname, '..', 'messages');

// List of monolithic files (excluding backup and temp files)
const monolithFiles = ['ru.json', 'en.json', 'fr.json', 'it.json', 'pl.json', 'tr.json', 'pt-BR.json', 'es.json', 'de.json'];

function cleanCategories(data) {
	if (!data.categories) return data;

	const cleaned = { ...data.categories };

	// For each category, remove calculators but keep SEO
	for (const categoryKey in cleaned) {
		if (cleaned[categoryKey] && typeof cleaned[categoryKey] === 'object') {
			const category = { ...cleaned[categoryKey] };
			
			// Remove calculators if exists
			if ('calculators' in category) {
				delete category.calculators;
			}

			// Keep only: title, description, subtitle, seo
			const allowedKeys = ['title', 'description', 'subtitle', 'seo'];
			const cleanedCategory = {};
			
			for (const key of allowedKeys) {
				if (key in category) {
					cleanedCategory[key] = category[key];
				}
			}

			cleaned[categoryKey] = cleanedCategory;
		}
	}

	return cleaned;
}

function cleanMonolithFile(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		const data = JSON.parse(content);

		// Clean categories
		data.categories = cleanCategories(data);

		// Remove old calculators from root level
		// All calculators should be in messages/{locale}/calculators/*.json
		if (data.calculators) {
			delete data.calculators;
		}

		// Write back
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
		console.log(`✓ Cleaned: ${path.basename(filePath)}`);
		return true;
	} catch (error) {
		console.error(`✗ Error cleaning ${filePath}:`, error.message);
		return false;
	}
}

// Process all monolith files
console.log('Cleaning monolithic translation files...\n');

let successCount = 0;
for (const fileName of monolithFiles) {
	const filePath = path.join(messagesDir, fileName);
	if (fs.existsSync(filePath)) {
		if (cleanMonolithFile(filePath)) {
			successCount++;
		}
	} else {
		console.log(`⚠ Skipped (not found): ${fileName}`);
	}
}

console.log(`\n✓ Successfully cleaned ${successCount}/${monolithFiles.length} files`);

