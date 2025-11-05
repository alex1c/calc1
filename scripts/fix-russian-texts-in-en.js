#!/usr/bin/env node

/**
 * Script to find and report Russian texts in English translation files
 * Helps identify untranslated content in en/calculators/*.json files
 */

const fs = require('fs')
const path = require('path')

// Cyrillic pattern
const cyrillicPattern = /[а-яА-ЯёЁ]/

/**
 * Recursively find all strings with Cyrillic characters in an object
 */
function findRussianTexts(obj, path = '') {
	const results = []
	
	for (const [key, value] of Object.entries(obj)) {
		const currentPath = path ? `${path}.${key}` : key
		
		if (typeof value === 'string' && cyrillicPattern.test(value)) {
			results.push({
				path: currentPath,
				value: value.substring(0, 100) // Limit length for display
			})
		} else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			results.push(...findRussianTexts(value, currentPath))
		}
	}
	
	return results
}

/**
 * Main function to check all calculator files
 */
function main() {
	const calculatorsDir = path.join(__dirname, '../messages/en/calculators')
	const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'))
	
	console.log('Checking English translation files for Russian texts...\n')
	
	let totalIssues = 0
	
	for (const file of files) {
		const filePath = path.join(calculatorsDir, file)
		const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
		
		const russianTexts = findRussianTexts(content)
		
		if (russianTexts.length > 0) {
			console.log(`\n📄 ${file}: ${russianTexts.length} Russian text(s) found`)
			totalIssues += russianTexts.length
			
			// Show first 10 examples
			russianTexts.slice(0, 10).forEach(({ path, value }) => {
				console.log(`  - ${path}`)
				console.log(`    "${value}..."`)
			})
			
			if (russianTexts.length > 10) {
				console.log(`  ... and ${russianTexts.length - 10} more`)
			}
		}
	}
	
	console.log(`\n✅ Total Russian texts found: ${totalIssues}`)
	
	if (totalIssues === 0) {
		console.log('🎉 All English translations are clean!')
	}
}

if (require.main === module) {
	main()
}

module.exports = { findRussianTexts }





