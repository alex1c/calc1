const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const converterPath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'converter.json');

// Получаем список калькуляторов из page.tsx
const converterCalcs = [
	{ monolithKey: 'length', targetKey: 'length' },
	{ monolithKey: 'weight', targetKey: 'weight' },
	{ monolithKey: 'temperature', targetKey: 'temperature' },
	{ monolithKey: 'speed', targetKey: 'speed' },
	{ monolithKey: 'pressure', targetKey: 'pressure' },
	{ monolithKey: 'volume-converter', targetKey: 'volume-converter' },
	{ monolithKey: 'energy-converter', targetKey: 'energy-converter' },
	{ monolithKey: 'data-converter', targetKey: 'data-converter' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const converterData = JSON.parse(fs.readFileSync(converterPath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

converterCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Конвертеры"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Конвертеры';
		
		converterData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю converter.json...`);
fs.writeFileSync(converterPath, JSON.stringify(converterData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(converterPath, 'utf8'));
	console.log('✅ converter.json валиден');
} catch (e) {
	console.error('❌ converter.json невалиден:', e.message);
	process.exit(1);
}

