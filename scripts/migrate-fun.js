const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const funPath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'fun.json');

// Получаем список калькуляторов из page.tsx
const funCalcs = [
	{ monolithKey: 'planetWeight', targetKey: 'planetWeight' },
	{ monolithKey: 'loveCompatibility', targetKey: 'loveCompatibility' },
	{ monolithKey: 'nicknameGenerator', targetKey: 'nicknameGenerator' },
	{ monolithKey: 'randomNumberGenerator', targetKey: 'randomNumberGenerator' },
	{ monolithKey: 'lotteryGenerator', targetKey: 'lotteryGenerator' },
	{ monolithKey: 'passwordGenerator', targetKey: 'passwordGenerator' },
	{ monolithKey: 'diceRoller', targetKey: 'diceRoller' },
	{ monolithKey: 'coinFlipper', targetKey: 'coinFlipper' },
	{ monolithKey: 'zodiacCalculator', targetKey: 'zodiacCalculator' },
	{ monolithKey: 'nameGenerator', targetKey: 'nameGenerator' },
	{ monolithKey: 'characterTraits', targetKey: 'characterTraits' },
	{ monolithKey: 'fantasyWorld', targetKey: 'fantasyWorld' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const funData = JSON.parse(fs.readFileSync(funPath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

funCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Развлечения"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Развлечения';
		
		funData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю fun.json...`);
fs.writeFileSync(funPath, JSON.stringify(funData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(funPath, 'utf8'));
	console.log('✅ fun.json валиден');
} catch (e) {
	console.error('❌ fun.json невалиден:', e.message);
	process.exit(1);
}

