const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const healthPath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'health.json');

// Получаем список калькуляторов из page.tsx
const healthCalcs = [
	{ monolithKey: 'bmiHealth', targetKey: 'bmiHealth' },
	{ monolithKey: 'heartRate', targetKey: 'heartRate' },
	{ monolithKey: 'bloodPressure', targetKey: 'bloodPressure' },
	{ monolithKey: 'ovulation', targetKey: 'ovulation' },
	{ monolithKey: 'vitamins', targetKey: 'vitamins' },
	{ monolithKey: 'stress', targetKey: 'stress' },
	{ monolithKey: 'dose', targetKey: 'dose' }
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const healthData = JSON.parse(fs.readFileSync(healthPath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

healthCalcs.forEach(({ monolithKey, targetKey }) => {
	if (monolithData.calculators[monolithKey]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[monolithKey]));
		
		// Ensure category is "Здоровье"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Здоровье';
		
		healthData.calculators[targetKey] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${monolithKey} -> ${targetKey}`);
	} else {
		notFound.push(`${monolithKey} (-> ${targetKey})`);
		console.log(`⚠️  Не найден в монолите: ${monolithKey}`);
	}
});

console.log(`\n📝 Сохраняю health.json...`);
fs.writeFileSync(healthPath, JSON.stringify(healthData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(healthPath, 'utf8'));
	console.log('✅ health.json валиден');
} catch (e) {
	console.error('❌ health.json невалиден:', e.message);
	process.exit(1);
}

