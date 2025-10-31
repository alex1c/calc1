const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const constructionPath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'construction.json');

// Получаем список калькуляторов из page.tsx
// В монолите ключи могут отличаться от тех, что используются в page.tsx
const constructionCalcs = [
	{ monolithKey: 'wallpaper', targetKey: 'wallpaper' },
	{ monolithKey: 'paint', targetKey: 'paint' },
	{ monolithKey: 'tileGlue', targetKey: 'tileGlue' },
	{ monolithKey: 'putty', targetKey: 'putty' },
	{ monolithKey: 'primer', targetKey: 'primer' },
	{ monolithKey: 'plaster', targetKey: 'plaster' },
	{ monolithKey: 'foundation', targetKey: 'foundation' },
	{ monolithKey: 'wallArea', targetKey: 'wallArea' },
	{ monolithKey: 'ventilation', targetKey: 'ventilation' },
	{ monolithKey: 'tile', targetKey: 'tile' },
	{ monolithKey: 'laminate', targetKey: 'laminate' },
	{ monolithKey: 'concrete', targetKey: 'concrete' },
	{ monolithKey: 'roof', targetKey: 'roof' },
	{ monolithKey: 'wall', targetKey: 'wall' },
	{ monolithKey: 'floorHeating', targetKey: 'floorHeating' },
	{ monolithKey: 'rebarCalculator', targetKey: 'rebarCalculator' },
	{ monolithKey: 'cableSectionCalculator', targetKey: 'cableSectionCalculator' },
	{ monolithKey: 'stairsCalculator', targetKey: 'stairsCalculator' },
	{ monolithKey: 'waterPipeCalculator', targetKey: 'waterPipeCalculator' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const constructionData = JSON.parse(fs.readFileSync(constructionPath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

constructionCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Строительство"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Строительство';
		
		constructionData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю construction.json...`);
fs.writeFileSync(constructionPath, JSON.stringify(constructionData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(constructionPath, 'utf8'));
	console.log('✅ construction.json валиден');
} catch (e) {
	console.error('❌ construction.json невалиден:', e.message);
	process.exit(1);
}

