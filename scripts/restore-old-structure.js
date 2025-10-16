const fs = require('fs');
const path = require('path');

// Функция для восстановления старой структуры
function restoreOldStructure(locale) {
	console.log(`🔄 Restoring old structure for ${locale}...`);

	const localeDir = path.join(__dirname, '..', 'messages', locale);
	const outputFile = path.join(__dirname, '..', 'messages', `${locale}.json`);

	if (!fs.existsSync(localeDir)) {
		console.error(`❌ Directory ${localeDir} not found`);
		return;
	}

	try {
		// Загружаем index.json
		const indexPath = path.join(localeDir, 'index.json');
		const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

		// Загружаем все секции
		const messages = {};

		for (const [key, filePath] of Object.entries(indexData)) {
			try {
				const filePathFull = path.join(localeDir, filePath);
				const content = JSON.parse(
					fs.readFileSync(filePathFull, 'utf8')
				);
				messages[key] = content;
				console.log(`  ✅ Loaded ${filePath}`);
			} catch (error) {
				console.error(
					`  ❌ Failed to load ${filePath}:`,
					error.message
				);
			}
		}

		// Объединяем все калькуляторы в одну секцию calculators
		const calculators = {};
		Object.keys(messages).forEach((category) => {
			if (category !== 'common' && messages[category]) {
				Object.keys(messages[category]).forEach((calcKey) => {
					calculators[calcKey] = messages[category][calcKey];
				});
			}
		});

		// Создаем финальную структуру сообщений
		const finalMessages = {
			...messages.common,
			calculators,
		};

		// Сохраняем в старый формат
		fs.writeFileSync(outputFile, JSON.stringify(finalMessages, null, 2));
		console.log(
			`✅ Created ${locale}.json with ${
				Object.keys(calculators).length
			} calculators`
		);
	} catch (error) {
		console.error(`❌ Failed to restore ${locale}:`, error.message);
	}
}

// Основная функция
function main() {
	console.log('🚀 Restoring old translation structure...');

	const locales = ['ru', 'en', 'de', 'es'];

	// Восстанавливаем каждый язык
	locales.forEach(restoreOldStructure);

	console.log('🎉 Old structure restored!');
	console.log('\n📁 Structure:');
	console.log('messages/');
	locales.forEach((locale) => {
		console.log(`├── ${locale}.json (restored)`);
	});
}

// Запускаем скрипт
if (require.main === module) {
	main();
}

module.exports = { restoreOldStructure };
