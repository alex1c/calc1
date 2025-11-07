/**
 * Simple test runner script
 * Run with: node scripts/run-tests.js
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🧪 Running tests...\n')

const testSuites = [
	{
		name: 'Unit Tests - BMI',
		command: 'npx jest src/lib/calculators/__tests__/bmi.test.ts --no-coverage --silent',
	},
	{
		name: 'Unit Tests - Percent',
		command: 'npx jest src/lib/calculators/__tests__/percent.test.ts --no-coverage --silent',
	},
	{
		name: 'Unit Tests - Loan',
		command: 'npx jest src/lib/calculators/__tests__/loan.test.ts --no-coverage --silent',
	},
	{
		name: 'Unit Tests - Area',
		command: 'npx jest src/lib/calculators/__tests__/area.test.ts --no-coverage --silent',
	},
	{
		name: 'Unit Tests - Volume',
		command: 'npx jest src/lib/calculators/__tests__/volume.test.ts --no-coverage --silent',
	},
]

let passed = 0
let failed = 0

for (const suite of testSuites) {
	try {
		console.log(`Running: ${suite.name}...`)
		execSync(suite.command, { stdio: 'inherit', cwd: process.cwd() })
		console.log(`✅ ${suite.name} - PASSED\n`)
		passed++
	} catch (error) {
		console.log(`❌ ${suite.name} - FAILED\n`)
		failed++
	}
}

console.log(`\n📊 Summary:`)
console.log(`✅ Passed: ${passed}`)
console.log(`❌ Failed: ${failed}`)
console.log(`Total: ${passed + failed}`)

process.exit(failed > 0 ? 1 : 0)

