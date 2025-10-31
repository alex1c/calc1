const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Список страниц для обновления
const pages = [
	'wallpaper',
	'paint',
	'tile-glue',
	'putty',
	'primer',
	'plaster',
	'foundation',
	'wall-area',
	'ventilation',
	'tile',
	'laminate',
	'concrete',
	'roofing',
	'wall',
	'floor-heating',
	'rebar-calculator',
	'water-pipe',
	'stairs',
	'cable-section',
	'tile-laminate'
];

const calcKeys = {
	'wallpaper': 'wallpaper',
	'paint': 'paint',
	'tile-glue': 'tileGlue',
	'putty': 'putty',
	'primer': 'primer',
	'plaster': 'plaster',
	'foundation': 'foundation',
	'wall-area': 'wallArea',
	'ventilation': 'ventilation',
	'tile': 'tile',
	'laminate': 'laminate',
	'concrete': 'concrete',
	'roofing': 'roof',
	'wall': 'wall',
	'floor-heating': 'floorHeating',
	'rebar-calculator': 'rebarCalculator',
	'water-pipe': 'waterPipeCalculator',
	'stairs': 'stairsCalculator',
	'cable-section': 'cableSectionCalculator',
	'tile-laminate': 'tile-laminate'
};

pages.forEach(page => {
	const filePath = path.join(__dirname, '..', 'src', 'app', '[locale]', 'construction', page, 'page.tsx');
	if (fs.existsSync(filePath)) {
		let content = fs.readFileSync(filePath, 'utf8');
		const oldPattern = /const messages = \(await import\(`\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/messages\/\$\{locale\}\.json`\)\)\s*\.default;/;
		const newCode = `const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);`;
		
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

