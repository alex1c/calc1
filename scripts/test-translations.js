const fs = require('fs');
const path = require('path');

// Функция для тестирования загрузки переводов
async function testTranslations() {
	console.log('🧪 Testing translation loading...');

	const locales = ['ru', 'en', 'de', 'es'];

	for (const locale of locales) {
		console.log(`\n📁 Testing ${locale}:`);

		try {
			// Загружаем index.json
			const indexPath = path.join(
				__dirname,
				'..',
				'messages',
				locale,
				'index.json'
			);
			const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
			console.log(`  ✅ index.json loaded`);

			// Загружаем все секции
			const messages = {};

			for (const [key, filePath] of Object.entries(indexData)) {
				try {
					const filePathFull = path.join(
						__dirname,
						'..',
						'messages',
						locale,
						filePath
					);
					const content = JSON.parse(
						fs.readFileSync(filePathFull, 'utf8')
					);
					messages[key] = content;
					console.log(`  ✅ ${filePath} loaded`);
				} catch (error) {
					console.error(
						`  ❌ Failed to load ${filePath}:`,
						error.message
					);
				}
			}

			// Объединяем все калькуляторы в одну секцию calculators для совместимости
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

			// Проверяем, что babyGrowth есть в calculators
			if (
				finalMessages.calculators &&
				finalMessages.calculators.babyGrowth
			) {
				console.log(`  ✅ babyGrowth found in calculators`);
				console.log(
					`  📝 Title: ${finalMessages.calculators.babyGrowth.title}`
				);
			} else {
				console.log(`  ❌ babyGrowth not found in calculators`);
				console.log(
					`  📋 Available calculators:`,
					Object.keys(finalMessages.calculators || {})
				);
			}
		} catch (error) {
			console.error(`  ❌ Failed to load ${locale}:`, error.message);
		}
	}
}

// Запускаем тест
testTranslations()
	.then(() => {
		console.log('\n🎉 Translation test completed!');
	})
	.catch((error) => {
		console.error('❌ Test failed:', error);
	});
