const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const lifePath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'life.json');

// Получаем список калькуляторов из page.tsx
// В монолите ключи: bmi, calories, foodRation, pregnancy, babyGrowth, bloodAlcohol, size-converter, ringSize, electricityCost, paper-weight, waterUsage, electricityUsage, gasUsage, heatingCost
// В page.tsx используются с дефисами: water-usage, electricity-usage, gas-usage, heating-cost
// Нужно перенести из монолита и сохранить с ключами, как в page.tsx
const lifeCalcs = [
	{ monolithKey: 'bmi', targetKey: 'bmi' },
	{ monolithKey: 'calories', targetKey: 'calories' },
	{ monolithKey: 'foodRation', targetKey: 'foodRation' },
	{ monolithKey: 'pregnancy', targetKey: 'pregnancy' },
	{ monolithKey: 'babyGrowth', targetKey: 'babyGrowth' },
	{ monolithKey: 'bloodAlcohol', targetKey: 'bloodAlcohol' },
	{ monolithKey: 'size-converter', targetKey: 'size-converter' },
	{ monolithKey: 'ringSize', targetKey: 'ringSize' },
	{ monolithKey: 'electricityCost', targetKey: 'electricityCost' },
	{ monolithKey: 'paper-weight', targetKey: 'paper-weight' },
	{ monolithKey: 'waterUsage', targetKey: 'water-usage' },
	{ monolithKey: 'electricityUsage', targetKey: 'electricity-usage' },
	{ monolithKey: 'gasUsage', targetKey: 'gas-usage' },
	{ monolithKey: 'heatingCost', targetKey: 'heating-cost' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const lifeData = JSON.parse(fs.readFileSync(lifePath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

lifeCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Жизнь"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Жизнь';
		
		lifeData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю life.json...`);
fs.writeFileSync(lifePath, JSON.stringify(lifeData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(lifePath, 'utf8'));
	console.log('✅ life.json валиден');
} catch (e) {
	console.error('❌ life.json невалиден:', e.message);
	process.exit(1);
}

