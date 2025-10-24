const fs = require('fs');
const path = require('path');

// Функция для исправления структуры файла
function fixFileStructure(filePath) {
  console.log(`Исправляю структуру файла: ${filePath}`);
  
  try {
    // Читаем файл
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let inCalculatorsSection = false;
    let calculatorsEndLine = -1;
    const fixedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Находим начало секции calculators
      if (line.trim() === '"calculators": {') {
        inCalculatorsSection = true;
        fixedLines.push(line);
        continue;
      }
      
      // Находим конец секции calculators (строка с отступом 2 пробела и закрывающая скобка)
      if (inCalculatorsSection && line.match(/^  }$/)) {
        calculatorsEndLine = i;
        inCalculatorsSection = false;
        fixedLines.push(line);
        continue;
      }
      
      // Если мы внутри секции calculators, добавляем строку как есть
      if (inCalculatorsSection) {
        fixedLines.push(line);
        continue;
      }
      
      // Если мы после секции calculators и видим калькулятор на уровне корня
      if (calculatorsEndLine > -1 && line.match(/^  "[a-z-]+": {$/)) {
        // Увеличиваем отступ с 2 до 4 пробелов
        const fixedLine = '    ' + line.substring(2);
        fixedLines.push(fixedLine);
        continue;
      }
      
      // Если мы после секции calculators и видим строки с отступом 2 пробела
      if (calculatorsEndLine > -1 && line.match(/^  [^}]/)) {
        // Увеличиваем отступ с 2 до 4 пробелов
        const fixedLine = '    ' + line.substring(2);
        fixedLines.push(fixedLine);
        continue;
      }
      
      // Все остальные строки добавляем как есть
      fixedLines.push(line);
    }
    
    // Записываем исправленный файл
    fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
    console.log(`✅ Файл ${filePath} исправлен успешно`);
    
  } catch (error) {
    console.error(`❌ Ошибка при исправлении ${filePath}:`, error.message);
  }
}

// Исправляем файлы
const filesToFix = [
  'messages/es.json',
  'messages/de.json'
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    fixFileStructure(filePath);
  } else {
    console.log(`⚠️ Файл ${filePath} не найден`);
  }
});

console.log('🎉 Исправление структуры завершено!');
