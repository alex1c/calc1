const fs = require('fs');
const path = require('path');

/**
 * Script to automatically fix HowTo structured data in page.tsx files
 * 
 * Steps:
 * 1. Find all page.tsx files with hardcoded HowTo Russian text
 * 2. Extract the HowTo structure (name, description, steps)
 * 3. Determine calculator name from file path
 * 4. Determine category from file path
 * 5. Add howTo structure to translation files (ru and it)
 * 6. Update page.tsx to use translations instead of hardcoded text
 */

// Find all page.tsx files recursively
function findPageFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);
	
	files.forEach(file => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		
		if (stat.isDirectory()) {
			findPageFiles(filePath, fileList);
		} else if (file === 'page.tsx') {
			fileList.push(filePath);
		}
	});
	
	return fileList;
}

// Extract calculator name from file path
function getCalculatorName(filePath) {
	// Examples:
	// src/app/[locale]/time/timer/page.tsx -> timer
	// src/app/[locale]/construction/putty/page.tsx -> putty
	// src/app/[locale]/auto/vehicle-tax/page.tsx -> vehicle-tax
	
	const parts = filePath.split(path.sep);
	const localeIndex = parts.indexOf('[locale]');
	if (localeIndex === -1) return null;
	
	// Get the part after [locale] and before 'page.tsx'
	const pageIndex = parts.indexOf('page.tsx');
	if (pageIndex === -1) return null;
	
	// Get calculator name (last directory before page.tsx)
	return parts[pageIndex - 1];
}

// Extract category from file path
function getCategory(filePath) {
	const parts = filePath.split(path.sep);
	const localeIndex = parts.indexOf('[locale]');
	if (localeIndex === -1) return null;
	
	// Get category (first directory after [locale])
	if (parts.length > localeIndex + 1) {
		return parts[localeIndex + 1];
	}
	return null;
}

// Map categories to translation file paths
const categoryTranslationMap = {
	'auto': 'messages/ru/calculators/auto.json',
	'construction': 'messages/ru/calculators/construction.json',
	'finance': 'messages/ru/calculators/finance.json',
	'life': 'messages/ru/calculators/life.json',
	'math': 'messages/ru/calculators/math.json',
	'time': 'messages/ru/calculators/time.json',
	'health': 'messages/ru/calculators/health.json',
	'fun': 'messages/ru/calculators/fun.json',
	'it': 'messages/ru/calculators/it.json',
	'converter': 'messages/ru/calculators/converter.json',
};

// Parse HowTo from page.tsx file
function extractHowTo(filePath) {
	const content = fs.readFileSync(filePath, 'utf8');
	
	// Check if file has hardcoded Russian HowTo
	if (!content.includes("'@type': 'HowTo'") || !content.includes("name: 'Как")) {
		return null;
	}
	
	// Extract HowTo structure - find the JSON.stringify block
	const howToBlockMatch = content.match(/JSON\.stringify\(\{[\s\S]*?'@type':\s*'HowTo'[\s\S]*?\}\)/);
	if (!howToBlockMatch) return null;
	
	const howToBlock = howToBlockMatch[0];
	
	// Extract name
	const nameMatch = howToBlock.match(/name:\s*['"]([^'"]+)['"]/);
	if (!nameMatch) return null;
	const name = nameMatch[1];
	
	// Extract description (can be on multiple lines)
	const descMatch = howToBlock.match(/description:\s*['"]([^'"]+)['"]/);
	if (!descMatch) {
		// Try multiline description
		const descMultilineMatch = howToBlock.match(/description:\s*['"]([^'"]*(?:\n[^'"]*)*?)['"]/);
		if (descMultilineMatch) {
			var description = descMultilineMatch[1].replace(/\s+/g, ' ').trim();
		} else {
			return null;
		}
	} else {
		var description = descMatch[1];
	}
	
	// Extract steps array
	const stepsArrayMatch = howToBlock.match(/step:\s*\[([\s\S]*?)\]/);
	if (!stepsArrayMatch) return null;
	const stepsText = stepsArrayMatch[1];
	
	// Extract individual steps - handle multiline
	const steps = [];
	// Match step objects - more flexible regex
	const stepRegex = /\{\s*'@type':\s*'HowToStep',\s*name:\s*['"]([^'"]+)['"],\s*text:\s*['"]([^'"]+(?:\s+[^'"]*)*?)['"]\s*\}/g;
	let stepMatch;
	
	while ((stepMatch = stepRegex.exec(stepsText)) !== null) {
		steps.push({
			name: stepMatch[1],
			text: stepMatch[2].replace(/\s+/g, ' ').trim()
		});
	}
	
	if (steps.length === 0) {
		// Try alternative format with escaped quotes
		const stepRegex2 = /\{\s*'@type':\s*'HowToStep',\s*name:\s*['"]([^'"]+)['"],\s*text:\s*['"]((?:[^'"]|\\')+)['"]\s*\}/g;
		while ((stepMatch = stepRegex2.exec(stepsText)) !== null) {
			steps.push({
				name: stepMatch[1],
				text: stepMatch[2].replace(/\\'/g, "'").replace(/\s+/g, ' ').trim()
			});
		}
	}
	
	return {
		name,
		description,
		steps
	};
}

// Add howTo to translation file
function addHowToToTranslations(ruFilePath, itFilePath, calculatorName, howTo) {
	// Read existing translation files
	let ruContent = {};
	let itContent = {};
	
	if (fs.existsSync(ruFilePath)) {
		ruContent = JSON.parse(fs.readFileSync(ruFilePath, 'utf8'));
	}
	
	if (fs.existsSync(itFilePath)) {
		itContent = JSON.parse(fs.readFileSync(itFilePath, 'utf8'));
	}
	
	// Ensure calculators structure exists
	if (!ruContent.calculators) {
		ruContent.calculators = {};
	}
	if (!itContent.calculators) {
		itContent.calculators = {};
	}
	
	// Ensure calculator exists
	if (!ruContent.calculators[calculatorName]) {
		ruContent.calculators[calculatorName] = {};
	}
	if (!itContent.calculators[calculatorName]) {
		itContent.calculators[calculatorName] = {};
	}
	
	// Ensure seo exists
	if (!ruContent.calculators[calculatorName].seo) {
		ruContent.calculators[calculatorName].seo = {};
	}
	if (!itContent.calculators[calculatorName].seo) {
		itContent.calculators[calculatorName].seo = {};
	}
	
	// Add howTo structure to ru
	ruContent.calculators[calculatorName].seo.howTo = {
		title: howTo.name,
		description: howTo.description,
		steps: howTo.steps.map((step, idx) => ({
			[`step${idx + 1}`]: {
				name: step.name,
				text: step.text
			}
		})).reduce((acc, step) => ({ ...acc, ...step }), {})
	};
	
	// Add howTo structure to it (with Italian placeholders - needs manual translation)
	itContent.calculators[calculatorName].seo.howTo = {
		title: `[IT] ${howTo.name}`,
		description: `[IT] ${howTo.description}`,
		steps: howTo.steps.map((step, idx) => ({
			[`step${idx + 1}`]: {
				name: `[IT] ${step.name}`,
				text: `[IT] ${step.text}`
			}
		})).reduce((acc, step) => ({ ...acc, ...step }), {})
	};
	
	// Write back to files
	fs.writeFileSync(ruFilePath, JSON.stringify(ruContent, null, '\t'), 'utf8');
	fs.writeFileSync(itFilePath, JSON.stringify(itContent, null, '\t'), 'utf8');
	
	console.log(`Added howTo to ${calculatorName} in ${ruFilePath} and ${itFilePath}`);
}

// Update page.tsx to use translations
function updatePageTsx(filePath, calculatorName, category) {
	let content = fs.readFileSync(filePath, 'utf8');
	
	// Check if already using translations (like world-time)
	if (content.includes('messages.calculators') && content.includes('howTo')) {
		console.log(`Skipping ${filePath} - already using translations`);
		return false;
	}
	
	// Find the HowTo section
	const howToRegex = /(\{?\/\* HowTo Structured Data \*\/\s*<script\s+type=['"]application\/ld\+json['"]\s+dangerouslySetInnerHTML=\{\s*\{\s*__html:\s*JSON\.stringify\(\{\s*'@context':\s*'https:\/\/schema\.org',\s*'@type':\s*'HowTo',\s*name:\s*['"][^'"]+['"],\s*description:\s*['"][^'"]+['"],\s*step:\s*\[[\s\S]*?\]\s*\}\)\s*\}\s*\}\s*\/>)/;
	
	const match = content.match(howToRegex);
	if (!match) {
		console.log(`Could not find HowTo section in ${filePath}`);
		return false;
	}
	
	// Determine the load function name based on category
	const loadFunctionMap = {
		'auto': 'loadMergedAutoTranslations',
		'construction': 'loadMergedConstructionTranslations',
		'finance': 'loadMergedFinanceTranslations',
		'life': 'loadMergedLifeTranslations',
		'math': 'loadMergedMathTranslations',
		'time': 'loadMergedTimeTranslations',
		'health': 'loadMergedHealthTranslations',
		'fun': 'loadMergedFunTranslations',
		'it': 'loadMergedItTranslations',
		'converter': 'loadMergedConverterTranslations',
	};
	
	const loadFunction = loadFunctionMap[category];
	if (!loadFunction) {
		console.log(`Unknown category: ${category} for ${filePath}`);
		return false;
	}
	
	// Check if messages is already loaded
	const hasMessagesLoad = content.includes(loadFunction) || content.includes('const messages = await');
	
	// Add messages loading if needed
	if (!hasMessagesLoad) {
		// Find tCategories or similar to insert after
		const tCategoriesMatch = content.match(/const tCategories = await getTranslations\([\s\S]*?\);/);
		if (tCategoriesMatch) {
			const insertPoint = tCategoriesMatch[0];
			const insertCode = `\n\n\tconst { ${loadFunction} } = await import(\n\t\t'@/lib/i18n-utils'\n\t);\n\tconst messages = await ${loadFunction}(locale);`;
			content = content.replace(insertPoint, insertPoint + insertCode);
		} else {
			console.log(`Could not find insertion point for messages in ${filePath}`);
			return false;
		}
	}
	
	// Replace HowTo section with translation-based version
	const stepCount = howTo.steps.length;
	const stepsCode = howTo.steps.map((_, idx) => {
		return `\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t'@type': 'HowToStep',\n\t\t\t\t\t\t\t\t\t\t\tname: howTo.step${idx + 1}?.name,\n\t\t\t\t\t\t\t\t\t\t\ttext: howTo.step${idx + 1}?.text,\n\t\t\t\t\t\t\t\t\t\t}`;
	}).join(',\n');
	
	const newHowToSection = `{/* HowTo Structured Data */}
\t\t\t{howTo && (
\t\t\t\t<script
\t\t\t\t\ttype='application/ld+json'
\t\t\t\t\tdangerouslySetInnerHTML={{
\t\t\t\t\t\t__html: JSON.stringify({
\t\t\t\t\t\t\t'@context': 'https://schema.org',
\t\t\t\t\t\t\t'@type': 'HowTo',
\t\t\t\t\t\t\tname: howTo.title,
\t\t\t\t\t\t\tdescription: howTo.description,
\t\t\t\t\t\t\tstep: [
${stepsCode}
\t\t\t\t\t\t\t],
\t\t\t\t\t\t}),
\t\t\t\t\t}}
\t\t\t\t/>
\t\t\t)}`;
	
	// Find the HowTo script section more precisely
	const howToScriptRegex = /(\{?\/\* HowTo Structured Data \*\/\s*<script[\s\S]*?\/>)/;
	const scriptMatch = content.match(howToScriptRegex);
	
	if (!scriptMatch) {
		console.log(`Could not find HowTo script section in ${filePath}`);
		return false;
	}
	
	// Also need to add howTo extraction before return
	const returnMatch = content.match(/(\treturn\s+\()/);
	if (returnMatch) {
		const insertBeforeReturn = `\t// Get HowTo for structured data\n\tconst howToRaw = messages.calculators?.${calculatorName}?.seo?.howTo;\n\tconst howTo = howToRaw || null;\n\n\t`;
		content = content.replace(returnMatch[0], insertBeforeReturn + returnMatch[0]);
	} else {
		// Try without tab
		const returnMatch2 = content.match(/(return\s+\()/);
		if (returnMatch2) {
			const insertBeforeReturn = `\t// Get HowTo for structured data\n\tconst howToRaw = messages.calculators?.${calculatorName}?.seo?.howTo;\n\tconst howTo = howToRaw || null;\n\n\t`;
			content = content.replace(returnMatch2[0], insertBeforeReturn + returnMatch2[0]);
		}
	}
	
	content = content.replace(scriptMatch[0], newHowToSection);
	
	// Write back
	fs.writeFileSync(filePath, content, 'utf8');
	console.log(`Updated ${filePath} to use translations`);
	
	return true;
}

// Main function
function main() {
	const pageFiles = findPageFiles('src/app/[locale]');
	const fixes = [];
	
	console.log(`Found ${pageFiles.length} page.tsx files\n`);
	
	pageFiles.forEach(filePath => {
		const howTo = extractHowTo(filePath);
		if (!howTo) return;
		
		const calculatorName = getCalculatorName(filePath);
		const category = getCategory(filePath);
		
		if (!calculatorName || !category) {
			console.log(`Could not determine calculator/category for ${filePath}`);
			return;
		}
		
		const ruFilePath = categoryTranslationMap[category];
		if (!ruFilePath) {
			console.log(`No translation file mapping for category: ${category}`);
			return;
		}
		
		const itFilePath = ruFilePath.replace('/ru/', '/it/');
		
		fixes.push({
			filePath,
			calculatorName,
			category,
			howTo,
			ruFilePath,
			itFilePath
		});
	});
	
	console.log(`Found ${fixes.length} files with hardcoded HowTo\n`);
	
	// Process fixes
	fixes.forEach(fix => {
		console.log(`\nProcessing: ${fix.filePath}`);
		console.log(`  Calculator: ${fix.calculatorName}`);
		console.log(`  Category: ${fix.category}`);
		console.log(`  Steps: ${fix.howTo.steps.length}`);
		
		try {
			// Add howTo to translations
			addHowToToTranslations(fix.ruFilePath, fix.itFilePath, fix.calculatorName, fix.howTo);
			
			// Update page.tsx
			updatePageTsx(fix.filePath, fix.calculatorName, fix.category);
		} catch (error) {
			console.error(`Error processing ${fix.filePath}:`, error.message);
		}
	});
	
	console.log(`\n\nDone! Processed ${fixes.length} files.`);
	console.log(`\nNOTE: Italian translations have [IT] placeholders and need manual translation.`);
}

// Run
main();

