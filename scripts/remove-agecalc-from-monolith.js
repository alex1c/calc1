const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');

try {
	let monolithContent = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
	const initialCount = Object.keys(monolithContent.calculators || {}).length;

	console.log('📖 Читаю монолитный файл...');
	console.log(`📊 Всего калькуляторов до удаления: ${initialCount}`);

	if (monolithContent.calculators && monolithContent.calculators['agecalc']) {
		delete monolithContent.calculators['agecalc'];
		console.log(`✅ Удален: agecalc`);
		
		// Если это был последний калькулятор, можно удалить секцию calculators
		if (Object.keys(monolithContent.calculators).length === 0) {
			console.log('📝 Секция calculators пуста, удаляю её...');
			delete monolithContent.calculators;
		}
	} else {
		console.log(`⚠️ agecalc не найден в монолите (возможно, уже удален)`);
	}

	fs.writeFileSync(monolithPath, JSON.stringify(monolithContent, null, 2), 'utf8');
	console.log('\n📝 Сохраняю обновленный файл...');

	const finalCount = Object.keys(monolithContent.calculators || {}).length;
	console.log(`\n✅ Удален калькулятор: agecalc`);
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
		process.exit(1);
	}

	console.log('\n✅ Калькулятор agecalc успешно удален из монолита!');
	console.log('🎉 Монолит полностью очищен от калькуляторов!');

} catch (error) {
	console.error('❌ Произошла ошибка при удалении калькулятора из монолита:', error);
	process.exit(1);
}

