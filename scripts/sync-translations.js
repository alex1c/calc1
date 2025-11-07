/**
 * Script to synchronize translation structure across all locales
 * Converts string overview to object format for consistency
 */
const fs = require('fs')
const path = require('path')

const messagesDir = path.join(__dirname, '../messages')
const locales = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR']

/**
 * Convert string overview to object format
 */
function convertOverviewToString(obj, categoryKey) {
	if (typeof obj === 'string') {
		return {
			title: categoryKey,
			content: obj,
			additionalContent: '',
		}
	}
	return obj
}

/**
 * Synchronize translation structure
 */
function synchronizeTranslations() {
	console.log('🔄 Synchronizing translation structure...\n')

	// Load all translation files
	const translations = {}
	for (const locale of locales) {
		const filePath = path.join(messagesDir, `${locale}.json`)
		if (!fs.existsSync(filePath)) {
			console.error(`❌ File not found: ${filePath}`)
			continue
		}
		try {
			translations[locale] = JSON.parse(
				fs.readFileSync(filePath, 'utf8')
			)
		} catch (error) {
			console.error(`❌ Error parsing ${locale}.json:`, error.message)
			continue
		}
	}

	// Use Russian as base
	const baseLocale = 'ru'
	const base = translations[baseLocale]

	if (!base || !base.categories) {
		console.error('❌ Base locale structure not found')
		return false
	}

	let changed = false

	// Process each locale
	for (const locale of locales) {
		if (locale === baseLocale) continue

		const translation = translations[locale]
		if (!translation || !translation.categories) continue

		// Process each category
		for (const categoryKey in base.categories) {
			if (
				!base.categories[categoryKey]?.seo?.overview ||
				!translation.categories[categoryKey]?.seo
			)
				continue

			const baseOverview = base.categories[categoryKey].seo.overview
			const targetOverview = translation.categories[categoryKey].seo.overview

			// If base has object format but target has string, convert it
			if (typeof baseOverview === 'object' && typeof targetOverview === 'string') {
				console.log(
					`  📝 Converting ${locale}.categories.${categoryKey}.seo.overview from string to object`
				)
				translation.categories[categoryKey].seo.overview = {
					title: base.categories[categoryKey].title || categoryKey,
					content: targetOverview,
					additionalContent: '',
				}
				changed = true
			}
			// If base has string but target has object, convert to string
			else if (
				typeof baseOverview === 'string' &&
				typeof targetOverview === 'object'
			) {
				console.log(
					`  📝 Converting ${locale}.categories.${categoryKey}.seo.overview from object to string`
				)
				translation.categories[categoryKey].seo.overview =
					targetOverview.content || targetOverview.title || ''
				changed = true
			}
		}

		// Save if changed
		if (changed) {
			const filePath = path.join(messagesDir, `${locale}.json`)
			fs.writeFileSync(
				filePath,
				JSON.stringify(translation, null, 2) + '\n',
				'utf8'
			)
			console.log(`  ✅ Updated ${locale}.json\n`)
			changed = false
		}
	}

	console.log('✅ Synchronization complete!\n')
	return true
}

// Run synchronization
if (require.main === module) {
	const success = synchronizeTranslations()
	process.exit(success ? 0 : 1)
}

module.exports = { synchronizeTranslations }

