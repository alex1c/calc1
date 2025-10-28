const fs = require('fs');

console.log('Simple German translation...');

// Read and parse
const content = fs.readFileSync('messages/de.json', 'utf8');
const data = JSON.parse(content);

// Simple replacements
const replacements = {
  'Калькулятор площади фигур': 'Flächenrechner',
  'Вычислите площадь круга, квадрата или треугольника онлайн. Простой и точный калькулятор с формулами.': 'Berechnen Sie die Fläche von Kreis, Quadrat oder Dreieck online. Einfacher und präziser Rechner mit Formeln.',
  'Математика': 'Mathematik',
  'Параметры расчёта': 'Berechnungsparameter',
  'Выберите фигуру': 'Wählen Sie eine Figur',
  'Круг': 'Kreis',
  'Квадрат': 'Quadrat',
  'Треугольник': 'Dreieck',
  'Радиус (r)': 'Radius (r)',
  'Сторона (a)': 'Seite (a)',
  'Высота (h)': 'Höhe (h)',
  'Ошибки в данных': 'Datenfehler',
  'Поле обязательно для заполнения': 'Feld ist erforderlich',
  'Значение должно быть положительным': 'Wert muss positiv sein',
  'Результаты расчёта': 'Berechnungsergebnisse',
  'Площадь': 'Fläche',
  'Формула': 'Formel',
  'Использованные параметры': 'Verwendete Parameter',
  'Ошибка расчёта': 'Berechnungsfehler'
};

// Replace function
function replaceText(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (/[а-яё]/i.test(value)) {
        for (const [russian, german] of Object.entries(replacements)) {
          if (value.includes(russian)) {
            obj[key] = value.replace(new RegExp(russian, 'g'), german);
          }
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      replaceText(value);
    }
  }
}

// Apply replacements
replaceText(data);

// Write file
fs.writeFileSync('messages/de.json', JSON.stringify(data, null, 2), 'utf8');

console.log('German translation completed!');

