// Простой тест для проверки загрузки переводов
const fs = require('fs');
const path = require('path');

async function testI18n() {
	console.log('🧪 Testing i18n loading...');

	const locale = 'ru';

	try {
		// Загружаем index.json
		const indexPath = path.join(
			__dirname,
			'messages',
			locale,
			'index.json'
		);
		const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
		console.log('✅ index.json loaded:', Object.keys(indexData));

		// Загружаем все секции
		const messages = {};

		for (const [key, filePath] of Object.entries(indexData)) {
			try {
				const filePathFull = path.join(
					__dirname,
					'messages',
					locale,
					filePath
				);
				const content = JSON.parse(
					fs.readFileSync(filePathFull, 'utf8')
				);
				messages[key] = content;
				console.log(
					`✅ ${filePath} loaded with keys:`,
					Object.keys(content)
				);
			} catch (error) {
				console.error(`❌ Failed to load ${filePath}:`, error.message);
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

		console.log('📋 Available calculators:', Object.keys(calculators));

		// Создаем финальную структуру сообщений
		const finalMessages = {
			...messages.common,
			calculators,
		};

		// Проверяем, что babyGrowth есть в calculators
		if (finalMessages.calculators && finalMessages.calculators.babyGrowth) {
			console.log('✅ babyGrowth found in calculators');
			console.log(
				'📝 Title:',
				finalMessages.calculators.babyGrowth.title
			);
			console.log(
				'📝 Description:',
				finalMessages.calculators.babyGrowth.description
			);
		} else {
			console.log('❌ babyGrowth not found in calculators');
		}
	} catch (error) {
		console.error('❌ Test failed:', error);
	}
}

testI18n();
