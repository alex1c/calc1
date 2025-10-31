const fs = require('fs');
const path = require('path');

// Список страниц для обновления
const pages = [
	'zodiac',
	'random',
	'lottery',
	'password',
	'dice',
	'coin',
	'nickname',
	'love',
	'planet-weight',
	'fantasy-world',
	'character-traits',
	'name-generator'
];

pages.forEach(page => {
	const filePath = path.join(__dirname, '..', 'src', 'app', '[locale]', 'fun', page, 'page.tsx');
	if (fs.existsSync(filePath)) {
		let content = fs.readFileSync(filePath, 'utf8');
		const oldPattern = /const messages = \(await import\(`\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/messages\/\$\{locale\}\.json`\)\)\s*\.default;/;
		const newCode = `const { loadMergedFunTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFunTranslations(locale);`;
		
		if (oldPattern.test(content)) {
			content = content.replace(oldPattern, newCode);
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`✅ Обновлен: ${page}`);
		} else {
			console.log(`⚠️  Паттерн не найден: ${page}`);
		}
	} else {
		console.log(`❌ Файл не найден: ${filePath}`);
	}
});

console.log('\n✅ Все страницы обновлены');

