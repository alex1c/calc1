const fs = require('fs');
const path = require('path');

const monolithPath = path.join(__dirname, '..', 'messages', 'ru.json');
const financePath = path.join(__dirname, '..', 'messages', 'ru', 'calculators', 'finance.json');

const financeCalcs = [
	'credit-loan',
	'mortgage',
	'auto-loan',
	'consumer-loan',
	'loan-overpayment',
	'investment',
	'savings',
	'compound-interest',
	'tax-calculator'
];

console.log('📖 Читаю файлы...');
const monolithData = JSON.parse(fs.readFileSync(monolithPath, 'utf8'));
const financeData = JSON.parse(fs.readFileSync(financePath, 'utf8'));

console.log(`📊 Найдено калькуляторов в монолите: ${Object.keys(monolithData.calculators).length}`);

let migrated = 0;
let notFound = [];

financeCalcs.forEach(key => {
	if (monolithData.calculators[key]) {
		const calc = JSON.parse(JSON.stringify(monolithData.calculators[key]));
		
		// Ensure category is "Финансы"
		if (!calc.breadcrumbs) {
			calc.breadcrumbs = {};
		}
		calc.breadcrumbs.category = 'Финансы';
		
		financeData.calculators[key] = calc;
		migrated++;
		console.log(`✅ Перенесен: ${key}`);
	} else {
		notFound.push(key);
		console.log(`⚠️  Не найден в монолите: ${key}`);
	}
});

console.log(`\n📝 Сохраняю finance.json...`);
fs.writeFileSync(financePath, JSON.stringify(financeData, null, '\t'), 'utf8');

console.log(`\n✅ Перенесено калькуляторов: ${migrated}`);
if (notFound.length > 0) {
	console.log(`⚠️  Не найдено: ${notFound.join(', ')}`);
}

// Validate JSON
try {
	JSON.parse(fs.readFileSync(financePath, 'utf8'));
	console.log('✅ finance.json валиден');
} catch (e) {
	console.error('❌ finance.json невалиден:', e.message);
	process.exit(1);
}

