const fs = require('fs');
const path = require('path');

// Категории калькуляторов
const CALCULATOR_CATEGORIES = {
	math: [
		'area',
		'volume',
		'powerRoot',
		'equations',
		'statistics',
		'converter',
	],
	finance: [
		'investment',
		'savings',
		'creditLoan',
		'consumerLoan',
		'mortgage',
	],
	auto: [
		'customs',
		'fuelConsumption',
		'carDepreciation',
		'carLoan',
		'carOwnership',
		'kasko',
		'osago',
		'trafficFines',
		'vehicleTax',
	],
	life: [
		'calories',
		'bmi',
		'bloodAlcohol',
		'foodRation',
		'pregnancy',
		'babyGrowth',
	],
	construction: [
		'concrete',
		'wall',
		'wallpaper',
		'roofing',
		'tileLaminate',
		'flooring',
		'paint',
		'paperWeight',
	],
};

// Отдельные секции, которые нужно добавить в соответствующие категории
const STANDALONE_SECTIONS = {
	math: ['math_basic', 'math_percent'],
	auto: ['leasing', 'fuel'],
	// Остальные секции остаются в common
	common: ['categories'],
};

function restructureTranslations(locale) {
	console.log(`🔄 Restructuring ${locale} translations...`);

	const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);

	if (!fs.existsSync(filePath)) {
		console.error(`❌ File ${filePath} not found`);
		return;
	}

	const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	// Создаем папку для локали
	const localeDir = path.join(__dirname, '..', 'messages', locale);
	if (!fs.existsSync(localeDir)) {
		fs.mkdirSync(localeDir, { recursive: true });
	}

	// 1. common.json - общие секции
	const commonData = {
		common: content.common,
		brand: content.brand,
		breadcrumbs: content.breadcrumbs,
		navigation: content.navigation,
	};

	// Добавляем categories если есть
	if (content.categories) {
		commonData.categories = content.categories;
	}

	fs.writeFileSync(
		path.join(localeDir, 'common.json'),
		JSON.stringify(commonData, null, 2)
	);
	console.log(`✅ Created ${locale}/common.json`);

	// 2. Разделяем калькуляторы по категориям
	Object.keys(CALCULATOR_CATEGORIES).forEach((category) => {
		const categoryData = {};

		// Добавляем калькуляторы из секции calculators
		CALCULATOR_CATEGORIES[category].forEach((calcKey) => {
			if (content.calculators && content.calculators[calcKey]) {
				categoryData[calcKey] = content.calculators[calcKey];
				console.log(`  📦 Added ${calcKey} to ${category}`);
			}
		});

		// Добавляем отдельные секции
		if (STANDALONE_SECTIONS[category]) {
			STANDALONE_SECTIONS[category].forEach((sectionKey) => {
				if (content[sectionKey]) {
					categoryData[sectionKey] = content[sectionKey];
					console.log(`  📦 Added ${sectionKey} to ${category}`);
				}
			});
		}

		if (Object.keys(categoryData).length > 0) {
			fs.writeFileSync(
				path.join(localeDir, `${category}.json`),
				JSON.stringify(categoryData, null, 2)
			);
			console.log(`✅ Created ${locale}/${category}.json`);
		}
	});

	// 3. index.json (главный файл)
	const indexData = {
		common: './common.json',
		math: './math.json',
		finance: './finance.json',
		auto: './auto.json',
		life: './life.json',
		construction: './construction.json',
	};

	fs.writeFileSync(
		path.join(localeDir, 'index.json'),
		JSON.stringify(indexData, null, 2)
	);
	console.log(`✅ Created ${locale}/index.json`);

	console.log(`🎉 Successfully restructured ${locale} translations`);
}

// Функция для создания нового i18n.ts
function updateI18nConfig() {
	const i18nContent = `import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'en', 'de', 'es'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as any)) {
    locale = 'ru';
  }

  try {
    // Загружаем главный файл
    const indexData = (await import(\`../messages/\${locale}/index.json\`)).default;
    
    // Загружаем все секции
    const messages = {};
    
    for (const [key, filePath] of Object.entries(indexData)) {
      try {
        const module = await import(\`../messages/\${locale}/\${filePath}\`);
        messages[key] = module.default;
      } catch (error) {
        console.warn(\`Failed to load \${filePath}:\`, error);
      }
    }
    
    return { locale, messages };
  } catch (error) {
    console.error(\`Failed to load messages for locale \${locale}:\`, error);
    // Fallback to Russian if locale fails to load
    try {
      const fallbackIndex = (await import(\`../messages/ru/index.json\`)).default;
      const fallbackMessages = {};
      
      for (const [key, filePath] of Object.entries(fallbackIndex)) {
        try {
          const module = await import(\`../messages/ru/\${filePath}\`);
          fallbackMessages[key] = module.default;
        } catch (fallbackError) {
          console.warn(\`Failed to load fallback \${filePath}:\`, fallbackError);
        }
      }
      
      return { locale: 'ru', messages: fallbackMessages };
    } catch (fallbackError) {
      console.error('Failed to load fallback messages:', fallbackError);
      return { locale: 'ru', messages: {} };
    }
  }
});`;

	fs.writeFileSync(path.join(__dirname, '..', 'src', 'i18n.ts'), i18nContent);
	console.log('✅ Updated src/i18n.ts');
}

// Основная функция
function main() {
	console.log('🚀 Starting translation restructuring...');

	const locales = ['ru', 'en', 'de', 'es'];

	// Переделываем каждый язык
	locales.forEach(restructureTranslations);

	// Обновляем i18n.ts
	updateI18nConfig();

	console.log('🎉 Translation restructuring completed!');
	console.log('\n📁 New structure:');
	console.log('messages/');
	locales.forEach((locale) => {
		console.log(`├── ${locale}/`);
		console.log('│   ├── common.json');
		console.log('│   ├── math.json');
		console.log('│   ├── finance.json');
		console.log('│   ├── auto.json');
		console.log('│   ├── life.json');
		console.log('│   ├── construction.json');
		console.log('│   └── index.json');
	});
}

// Запускаем скрипт
if (require.main === module) {
	main();
}

module.exports = { restructureTranslations, updateI18nConfig };
