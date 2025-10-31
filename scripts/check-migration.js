// Script to verify complete migration of calculator translations
const fs = require('fs')
const path = require('path')

const oldFile = path.join(__dirname, '../messages/ru.json')
const newFile = path.join(__dirname, '../messages/ru/calculators/auto.json')

const old = JSON.parse(fs.readFileSync(oldFile, 'utf8'))
const new_ = JSON.parse(fs.readFileSync(newFile, 'utf8'))

const calculators = ['osago', 'kasko', 'fuel-consumption', 'car-depreciation', 'car-ownership']

console.log('🔍 Checking migration completeness...\n')

let hasErrors = false

calculators.forEach((calcName) => {
	console.log(`\n📊 ${calcName}:`)
	const oldCalc = old.calculators?.[calcName]
	const newCalc = new_.calculators?.[calcName]

	if (!oldCalc) {
		console.log(`  ℹ️  Already migrated (not in old file)`)
		if (!newCalc) {
			console.log(`  ❌ NOT FOUND in new file either!`)
			hasErrors = true
		}
		return
	}

	if (!newCalc) {
		console.log(`  ❌ NOT FOUND in new file`)
		hasErrors = true
		return
	}

	// Check FAQ items
	const oldFaq = oldCalc.seo?.faq?.faqItems?.length || 0
	const newFaq = newCalc.seo?.faq?.faqItems?.length || 0
	const faqMatch = oldFaq === newFaq
	console.log(`  FAQ items: old=${oldFaq}, new=${newFaq}, ${faqMatch ? '✅' : '❌'}`)
	if (!faqMatch) {
		hasErrors = true
	}

	// Check calculation examples
	const oldExamples = oldCalc.seo?.overview?.calculationExamples
	const newExamples = newCalc.seo?.overview?.calculationExamples
	const exampleCount = (obj) => {
		if (!obj) return 0
		let count = 0
		for (const key in obj) {
			if (key.startsWith('example') && typeof obj[key] === 'object') count++
		}
		return count
	}
	const oldExCount = exampleCount(oldExamples)
	const newExCount = exampleCount(newExamples)
	const exMatch = oldExCount === newExCount
	console.log(`  Calculation examples: old=${oldExCount}, new=${newExCount}, ${exMatch ? '✅' : '❌'}`)
	if (!exMatch) {
		hasErrors = true
	}

	// Check top-level keys
	const oldKeys = Object.keys(oldCalc).sort()
	const newKeys = Object.keys(newCalc).sort()
	const keysMatch = JSON.stringify(oldKeys) === JSON.stringify(newKeys)
	console.log(`  Top-level keys: ${keysMatch ? '✅' : '❌'}`)
	if (!keysMatch) {
		console.log(`    Missing in new: ${oldKeys.filter(k => !newKeys.includes(k)).join(', ') || 'none'}`)
		console.log(`    Extra in new: ${newKeys.filter(k => !oldKeys.includes(k)).join(', ') || 'none'}`)
		hasErrors = true
	}
})

console.log(`\n${hasErrors ? '❌ Migration has errors!' : '✅ All calculators migrated correctly!'}`)

process.exit(hasErrors ? 1 : 0)

