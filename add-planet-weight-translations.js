const fs = require('fs');

// Читаем переводы для planetWeight
const translations = JSON.parse(
	fs.readFileSync('planet-weight-translations.json', 'utf8')
);

// Функция для добавления переводов в файл
function addTranslations(locale) {
	const filePath = `messages/${locale}.json`;
	const content = fs.readFileSync(filePath, 'utf8');
	const data = JSON.parse(content);

	// Добавляем planetWeight в секцию calculators
	if (!data.calculators) {
		data.calculators = {};
	}

	data.calculators.planetWeight = translations[locale].planetWeight;

	// Записываем обратно
	fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'), 'utf8');
	console.log(`✅ Added planetWeight to ${locale}.json`);
}

// Добавляем переводы для всех языков
['ru', 'en'].forEach(addTranslations);

console.log('🎉 All translations added successfully!');
