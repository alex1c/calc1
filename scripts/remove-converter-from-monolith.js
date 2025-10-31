const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');

// Ключи в монолите
const converterCalculators = [
	'length',
	'weight',
	'temperature',
	'speed',
	'pressure',
	'volume-converter',
	'energy-converter',
	'data-converter'
];

try {
	let monolithContent = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
	const initialCount = Object.keys(monolithContent.calculators || {}).length;

	console.log('📖 Читаю монолитный файл...');
	console.log(`📊 Всего калькуляторов до удаления: ${initialCount}`);

	let deletedCount = 0;
	for (const key of converterCalculators) {
		if (monolithContent.calculators && monolithContent.calculators[key]) {
			delete monolithContent.calculators[key];
			console.log(`✅ Удален: ${key}`);
			deletedCount++;
		} else {
			console.log(`⚠️ ${key} не найден в монолите (возможно, уже удален)`);
		}
	}

	fs.writeFileSync(monolithPath, JSON.stringify(monolithContent, null, 2), 'utf8');
	console.log('\n📝 Сохраняю обновленный файл...');

	const finalCount = Object.keys(monolithContent.calculators || {}).length;
	console.log(`\n✅ Удалено калькуляторов: ${deletedCount}`);
	console.log(`📊 Всего калькуляторов после удаления: ${finalCount}`);

	// Final validation
	const isValid = (jsonString) => {
		try {
			JSON.parse(jsonString);
			return true;
		} catch (e) {
			return false;
		}
	};

	if (isValid(fs.readFileSync(monolithPath, 'utf8'))) {
		console.log('✅ JSON файл валиден');
	} else {
		console.error('❌ Ошибка: JSON файл невалиден после удаления!');
	}

	console.log('\n✅ Все калькуляторы Конвертеры успешно удалены из монолита!');

} catch (error) {
	console.error('❌ Произошла ошибка при удалении калькуляторов Конвертеры из монолита:', error);
}

