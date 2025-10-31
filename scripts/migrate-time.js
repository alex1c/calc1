const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const timePath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'time.json');

// Получаем список калькуляторов из page.tsx
const timeCalcs = [
	{ monolithKey: 'daysBetween', targetKey: 'daysBetween' },
	{ monolithKey: 'addTime', targetKey: 'addTime' },
	{ monolithKey: 'age', targetKey: 'age' },
	{ monolithKey: 'deadline', targetKey: 'deadline' },
	{ monolithKey: 'calendar', targetKey: 'calendar' },
	{ monolithKey: 'timer', targetKey: 'timer' },
	{ monolithKey: 'countdown', targetKey: 'countdown' },
	{ monolithKey: 'worldTime', targetKey: 'worldTime' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const timeData = JSON.parse(fs.readFileSync(timePath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

timeCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Время"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Время';
		
		timeData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю time.json...`);
fs.writeFileSync(timePath, JSON.stringify(timeData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(timePath, 'utf8'));
	console.log('✅ time.json валиден');
} catch (e) {
	console.error('❌ time.json невалиден:', e.message);
	process.exit(1);
}

