const fs = require('fs');

// Read the files
const ruFile = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));
const deFile = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const esFile = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

// Function to translate text from Russian to German
function translateToGerman(text) {
	const translations = {
		// Common calculator terms
		Калькулятор: 'Rechner',
		калькулятор: 'Rechner',
		'Параметры расчёта': 'Berechnungsparameter',
		Выберите: 'Wählen Sie',
		'Результаты расчёта': 'Berechnungsergebnisse',
		Площадь: 'Fläche',
		Формула: 'Formel',
		'Использованные параметры': 'Verwendete Parameter',
		'Ошибка расчёта': 'Berechnungsfehler',
		'Ошибки в данных': 'Datenfehler',
		'Поле обязательно для заполнения': 'Feld ist erforderlich',
		'Значение должно быть положительным': 'Wert muss positiv sein',

		// Area calculator specific
		'Калькулятор площади фигур': 'Rechner für Flächen von Figuren',
		'Вычислите площадь круга, квадрата или треугольника онлайн. Простой и точный калькулятор с формулами.':
			'Berechnen Sie die Fläche von Kreis, Quadrat oder Dreieck online. Einfacher und präziser Rechner mit Formeln.',
		'Выберите фигуру': 'Wählen Sie eine Figur',
		Круг: 'Kreis',
		Квадрат: 'Quadrat',
		Треугольник: 'Dreieck',
		'Радиус (r)': 'Radius (r)',
		'Сторона (a)': 'Seite (a)',
		'Основание (a)': 'Grundfläche (a)',
		'Высота (h)': 'Höhe (h)',
		Радиус: 'Radius',
		Сторона: 'Seite',
		Основание: 'Grundfläche',
		Высота: 'Höhe',
		Математика: 'Mathematik',

		// SEO content
		'О калькуляторе площади фигур':
			'Über den Rechner für Flächen von Figuren',
		'Как рассчитывается площадь': 'Wie wird die Fläche berechnet',
		'Преимущества калькулятора': 'Vorteile des Rechners',
		'Советы по использованию': 'Nutzungstipps',
	};

	return translations[text] || text;
}

// Function to translate text from Russian to Spanish
function translateToSpanish(text) {
	const translations = {
		// Common calculator terms
		Калькулятор: 'Calculadora',
		калькулятор: 'calculadora',
		'Параметры расчёта': 'Parámetros de cálculo',
		Выберите: 'Seleccione',
		'Результаты расчёта': 'Resultados del cálculo',
		Площадь: 'Área',
		Формула: 'Fórmula',
		'Использованные параметры': 'Parámetros utilizados',
		'Ошибка расчёта': 'Error de cálculo',
		'Ошибки в данных': 'Errores en los datos',
		'Поле обязательно для заполнения': 'El campo es obligatorio',
		'Значение должно быть положительным': 'El valor debe ser positivo',

		// Area calculator specific
		'Калькулятор площади фигур': 'Calculadora de área de figuras',
		'Вычислите площадь круга, квадрата или треугольника онлайн. Простой и точный калькулятор с формулами.':
			'Calcule el área de círculo, cuadrado o triángulo en línea. Calculadora simple y precisa con fórmulas.',
		'Выберите фигуру': 'Seleccione una figura',
		Круг: 'Círculo',
		Квадрат: 'Cuadrado',
		Треугольник: 'Triángulo',
		'Радиус (r)': 'Radio (r)',
		'Сторона (a)': 'Lado (a)',
		'Основание (a)': 'Base (a)',
		'Высота (h)': 'Altura (h)',
		Радиус: 'Radio',
		Сторона: 'Lado',
		Основание: 'Base',
		Высота: 'Altura',
		Математика: 'Matemáticas',

		// SEO content
		'О калькуляторе площади фигур':
			'Sobre la calculadora de área de figuras',
		'Как рассчитывается площадь': 'Cómo se calcula el área',
		'Преимущества калькулятора': 'Ventajas de la calculadora',
		'Советы по использованию': 'Consejos de uso',
	};

	return translations[text] || text;
}

// Function to recursively translate an object
function translateObject(obj, translateFunction) {
	if (typeof obj === 'string') {
		return translateFunction(obj);
	} else if (Array.isArray(obj)) {
		return obj.map((item) => translateObject(item, translateFunction));
	} else if (obj && typeof obj === 'object') {
		const translated = {};
		for (const [key, value] of Object.entries(obj)) {
			translated[key] = translateObject(value, translateFunction);
		}
		return translated;
	}
	return obj;
}

// Translate the "area" calculator
console.log('Translating area calculator...');

// Get the area calculator from Russian file
const areaCalculator = ruFile.calculators.area;

// Translate to German
const areaCalculatorDe = translateObject(areaCalculator, translateToGerman);
deFile.calculators.area = areaCalculatorDe;

// Translate to Spanish
const areaCalculatorEs = translateObject(areaCalculator, translateToSpanish);
esFile.calculators.area = areaCalculatorEs;

// Write the files
fs.writeFileSync('messages/de.json', JSON.stringify(deFile, null, 2), 'utf8');
fs.writeFileSync('messages/es.json', JSON.stringify(esFile, null, 2), 'utf8');

console.log('Area calculator translated successfully!');
console.log('German title:', areaCalculatorDe.title);
console.log('Spanish title:', areaCalculatorEs.title);

