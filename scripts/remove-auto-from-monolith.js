const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const autoCalcs = [
	'car-ownership',
	'osago',
	'kasko',
	'fuel-consumption',
	'customs',
	'traffic-fines',
	'leasing',
	'car-loan',
	'vehicle-tax'
];

console.log('📖 Читаю монолитный файл...');
const data = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));

console.log(`📊 Всего калькуляторов до удаления: ${Object.keys(data.calculators).length}`);

let removed = 0;
let notFound = [];

autoCalcs.forEach(key => {
	if (data.calculators[key]) {
		delete data.calculators[key];
		removed++;
		console.log(`✅ Удален: ${key}`);
	} else {
		notFound.push(key);
		console.log(`⚠️  Не найден (уже удален): ${key}`);
	}
});

console.log(`\n📝 Сохраняю обновленный файл...`);
fs.writeFileSync(monolithPath, JSON.stringify(data, null, '\t'), 'utf8');

console.log(`\n✅ Удалено калькуляторов: ${removed}`);
console.log(`📊 Всего калькуляторов после удаления: ${Object.keys(data.calculators).length}`);

// Проверка
const stillExists = autoCalcs.filter(k => data.calculators[k]);
if (stillExists.length === 0) {
	console.log('\n✅ Все калькуляторы Авто успешно удалены из монолита!');
} else {
	console.log(`\n⚠️  Остались в монолите: ${stillExists.join(', ')}`);
}

// Валидация JSON
try {
	JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
	console.log('✅ JSON файл валиден');
} catch (e) {
	console.error('❌ JSON файл невалиден:', e.message);
	process.exit(1);
}

