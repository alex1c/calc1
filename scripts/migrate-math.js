const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const mathPath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'math.json');

// Получаем список калькуляторов из page.tsx
// basic, math_percent, area, volume, powerRoot, equations, statistics, converter
const mathCalcs = [
	{ monolithKey: 'basic', targetKey: 'basic' },
	{ monolithKey: 'math_percent', targetKey: 'math_percent' },
	{ monolithKey: 'area', targetKey: 'area' },
	{ monolithKey: 'volume', targetKey: 'volume' },
	{ monolithKey: 'powerRoot', targetKey: 'powerRoot' },
	{ monolithKey: 'equations', targetKey: 'equations' },
	{ monolithKey: 'statistics', targetKey: 'statistics' },
	{ monolithKey: 'converter', targetKey: 'converter' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const mathData = JSON.parse(fs.readFileSync(mathPath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

mathCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Математика"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Математика';
		
		mathData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю math.json...`);
fs.writeFileSync(mathPath, JSON.stringify(mathData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(mathPath, 'utf8'));
	console.log('✅ math.json валиден');
} catch (e) {
	console.error('❌ math.json невалиден:', e.message);
	process.exit(1);
}

