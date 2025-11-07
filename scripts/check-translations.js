/**
 * Script to check translation synchronization across all locales
 * Ensures all translation keys are present in all language files
 */
const fs = require('fs')
const path = require('path')

const messagesDir = path.join(__dirname, '../messages')
const locales = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR']

/**
 * Get all keys from a nested object
 */
function getAllKeys(obj, prefix = '') {
	const keys = []
	for (const key in obj) {
		const fullKey = prefix ? `${prefix}.${key}` : key
		if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
			keys.push(...getAllKeys(obj[key], fullKey))
		} else {
			keys.push(fullKey)
		}
	}
	return keys
}

/**
 * Get nested value from object by dot notation key
 */
function getNestedValue(obj, key) {
	const parts = key.split('.')
	let value = obj
	for (const part of parts) {
		if (value && typeof value === 'object' && part in value) {
			value = value[part]
		} else {
			return undefined
		}
	}
	return value
}

/**
 * Check translations synchronization
 */
function checkTranslations() {
	console.log('🔍 Checking translation synchronization...\n')

	// Load all translation files
	const translations = {}
	for (const locale of locales) {
		const filePath = path.join(messagesDir, `${locale}.json`)
		if (!fs.existsSync(filePath)) {
			console.error(`❌ File not found: ${filePath}`)
			process.exit(1)
		}
		try {
			translations[locale] = JSON.parse(
				fs.readFileSync(filePath, 'utf8')
			)
		} catch (error) {
			console.error(`❌ Error parsing ${locale}.json:`, error.message)
			process.exit(1)
		}
	}

	// Use Russian as base (most complete)
	const baseLocale = 'ru'
	const baseKeys = new Set(getAllKeys(translations[baseLocale]))
	const allErrors = []

	console.log(`📊 Base locale: ${baseLocale} (${baseKeys.size} keys)\n`)

	// Check each locale against base
	for (const locale of locales) {
		if (locale === baseLocale) continue

		const keys = new Set(getAllKeys(translations[locale]))
		const errors = []

		// Check for missing keys
		baseKeys.forEach(key => {
			if (!keys.has(key)) {
				errors.push({
					type: 'missing',
					key,
				})
			}
		})

		// Check for extra keys (warn only)
		keys.forEach(key => {
			if (!baseKeys.has(key)) {
				errors.push({
					type: 'extra',
					key,
				})
			}
		})

		if (errors.length > 0) {
			allErrors.push({ locale, errors })
		}
	}

	// Report results
	if (allErrors.length === 0) {
		console.log('✅ All translations are synchronized!\n')
		return true
	}

	console.log('❌ Translation synchronization issues found:\n')

	for (const { locale, errors } of allErrors) {
		const missing = errors.filter(e => e.type === 'missing')
		const extra = errors.filter(e => e.type === 'extra')

		console.log(`📁 ${locale}.json:`)
		if (missing.length > 0) {
			console.log(`   ❌ Missing ${missing.length} keys:`)
			missing.slice(0, 10).forEach(({ key }) => {
				console.log(`      - ${key}`)
			})
			if (missing.length > 10) {
				console.log(`      ... and ${missing.length - 10} more`)
			}
		}
		if (extra.length > 0) {
			console.log(`   ⚠️  Extra ${extra.length} keys (not in base):`)
			extra.slice(0, 10).forEach(({ key }) => {
				console.log(`      - ${key}`)
			})
			if (extra.length > 10) {
				console.log(`      ... and ${extra.length - 10} more`)
			}
		}
		console.log()
	}

	return false
}

// Run check
if (require.main === module) {
	const isSynchronized = checkTranslations()
	process.exit(isSynchronized ? 0 : 1)
}

module.exports = { checkTranslations }

