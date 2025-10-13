#!/usr/bin/env node

/**
 * Script to fix breadcrumbs href paths that include locale duplication
 * Removes ${locale} from href paths since Next.js with next-intl handles locales automatically
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix breadcrumbs href in a single file
 * @param {string} filePath - Path to the file to fix
 */
function fixBreadcrumbsInFile(filePath) {
	console.log(`Fixing ${filePath}...`);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Create backup
	const backupPath = filePath + '.breadcrumbs.backup';
	fs.writeFileSync(backupPath, content);

	// Fix href patterns
	const patterns = [
		// Fix href: `/${locale}/path` to href: '/path'
		{
			regex: /href:\s*`\/\$\{locale\}\/([^`]+)`/g,
			replacement: "href: '/$1'",
		},
		// Fix href: `/${locale}` to href: '/'
		{
			regex: /href:\s*`\/\$\{locale\}`/g,
			replacement: "href: '/'",
		},
	];

	patterns.forEach((pattern) => {
		if (content.match(pattern.regex)) {
			content = content.replace(pattern.regex, pattern.replacement);
			modified = true;
			console.log(`  Fixed href pattern: ${pattern.regex}`);
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
 * Find all page.tsx files in the calc directory
 * @param {string} dir - Directory to search
 */
function findPageFiles(dir) {
	const files = [];
	const items = fs.readdirSync(dir);

	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			files.push(...findPageFiles(fullPath));
		} else if (item === 'page.tsx' && !item.includes('.backup')) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing breadcrumbs href paths...\n');

	const calcDir = path.join(__dirname, 'src', 'app', '[locale]', 'calc');

	// Check if directory exists
	if (!fs.existsSync(calcDir)) {
		console.error(`❌ Calc directory not found: ${calcDir}`);
		process.exit(1);
	}

	// Find all page.tsx files
	const pageFiles = findPageFiles(calcDir);

	console.log(`Found ${pageFiles.length} page.tsx files:`);
	pageFiles.forEach((file) => console.log(`  - ${path.basename(file)}`));
	console.log();

	// Fix each file
	pageFiles.forEach(fixBreadcrumbsInFile);

	console.log('\n✅ Breadcrumbs fix completed!');
	console.log('\n📋 Summary:');
	console.log('  - Removed ${locale} from href paths in breadcrumbs');
	console.log(
		'  - Next.js with next-intl will handle locale routing automatically'
	);
	console.log('  - Created backup files (*.breadcrumbs.backup)');
	console.log('\n⚠️  Next steps:');
	console.log(
		'  1. Test the application to ensure breadcrumbs work correctly'
	);
	console.log(
		"  2. Remove backup files once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixBreadcrumbsInFile,
	findPageFiles,
};
