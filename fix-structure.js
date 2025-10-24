const fs = require('fs');

// Читаем русский файл как образец
const ruData = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));

// Функция для исправления структуры файла
function fixFileStructure(filePath, langName) {
  console.log(`Исправляем структуру ${langName}...`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Проверяем, есть ли секция calculators
    if (!data.calculators) {
      console.log(`В ${langName} нет секции calculators!`);
      return;
    }
    
    // Получаем все ключи калькуляторов из русского файла
    const ruCalculatorKeys = Object.keys(ruData.calculators);
    console.log(`В русском файле ${ruCalculatorKeys.length} калькуляторов`);
    
    // Находим калькуляторы, которые находятся на уровне корня
    const rootLevelCalculators = {};
    const calculatorsToMove = [];
    
    for (const key in data) {
      if (key !== 'calculators' && key !== 'common' && key !== 'brand' && 
          key !== 'breadcrumbs' && key !== 'navigation' && key !== 'categories') {
        if (typeof data[key] === 'object' && data[key].title) {
          calculatorsToMove.push(key);
          rootLevelCalculators[key] = data[key];
        }
      }
    }
    
    console.log(`Найдено ${calculatorsToMove.length} калькуляторов на уровне корня:`, calculatorsToMove);
    
    // Перемещаем калькуляторы внутрь секции calculators
    for (const key of calculatorsToMove) {
      data.calculators[key] = data[key];
      delete data[key];
    }
    
    // Сохраняем исправленный файл
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`${langName} исправлен!`);
    
  } catch (error) {
    console.error(`Ошибка при исправлении ${langName}:`, error.message);
  }
}

// Исправляем файлы
fixFileStructure('messages/es.json', 'es.json');
fixFileStructure('messages/de.json', 'de.json');

console.log('Готово!');
