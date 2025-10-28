const fs = require('fs');

// Read the files
const ruFile = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));
const deFile = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const esFile = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

// Function to translate text from Russian to German
function translateToGerman(text) {
	const translations = {
		// Equations calculator specific
		'Калькулятор решения уравнений': 'Gleichungsrechner',
		'Онлайн калькулятор для решения линейных и квадратных уравнений с пошаговым объяснением':
			'Online-Rechner zur Lösung von linearen und quadratischen Gleichungen mit schrittweiser Erklärung',
		'Выберите тип уравнения': 'Wählen Sie den Gleichungstyp',
		'Линейное уравнение': 'Lineare Gleichung',
		'Квадратное уравнение': 'Quadratische Gleichung',
		'Кубическое уравнение': 'Kubische Gleichung',
		'Коэффициент a': 'Koeffizient a',
		'Коэффициент b': 'Koeffizient b',
		'Коэффициент c': 'Koeffizient c',
		'Коэффициент d': 'Koeffizient d',
		'Свободный член': 'Konstantes Glied',
		'Решить уравнение': 'Gleichung lösen',
		'Корни уравнения': 'Gleichungswurzeln',
		Дискриминант: 'Diskriminante',
		'Нет решений': 'Keine Lösungen',
		'Одно решение': 'Eine Lösung',
		'Два решения': 'Zwei Lösungen',
		'Три решения': 'Drei Lösungen',
		'Бесконечно много решений': 'Unendlich viele Lösungen',
		Уравнение: 'Gleichung',
		Решение: 'Lösung',
		Корень: 'Wurzel',
		Корни: 'Wurzeln',
		Математика: 'Mathematik',

		// Common terms
		'Параметры расчёта': 'Berechnungsparameter',
		Выберите: 'Wählen Sie',
		'Результаты расчёта': 'Berechnungsergebnisse',
		Формула: 'Formel',
		'Использованные параметры': 'Verwendete Parameter',
		'Ошибка расчёта': 'Berechnungsfehler',
		'Ошибки в данных': 'Datenfehler',
		'Поле обязательно для заполнения': 'Feld ist erforderlich',
		'Значение должно быть положительным': 'Wert muss positiv sein',
	};

	return translations[text] || text;
}

// Function to translate text from Russian to Spanish
function translateToSpanish(text) {
	const translations = {
		// Equations calculator specific
		'Калькулятор решения уравнений':
			'Calculadora de resolución de ecuaciones',
		'Онлайн калькулятор для решения линейных и квадратных уравнений с пошаговым объяснением':
			'Calculadora online para resolver ecuaciones lineales y cuadráticas con explicación paso a paso',
		'Выберите тип уравнения': 'Seleccione el tipo de ecuación',
		'Линейное уравнение': 'Ecuación lineal',
		'Квадратное уравнение': 'Ecuación cuadrática',
		'Кубическое уравнение': 'Ecuación cúbica',
		'Коэффициент a': 'Coeficiente a',
		'Коэффициент b': 'Coeficiente b',
		'Коэффициент c': 'Coeficiente c',
		'Коэффициент d': 'Coeficiente d',
		'Свободный член': 'Término independiente',
		'Решить уравнение': 'Resolver ecuación',
		'Корни уравнения': 'Raíces de la ecuación',
		Дискриминант: 'Discriminante',
		'Нет решений': 'Sin soluciones',
		'Одно решение': 'Una solución',
		'Два решения': 'Dos soluciones',
		'Три решения': 'Tres soluciones',
		'Бесконечно много решений': 'Infinitas soluciones',
		Уравнение: 'Ecuación',
		Решение: 'Solución',
		Корень: 'Raíz',
		Корни: 'Raíces',
		Математика: 'Matemáticas',

		// Common terms
		'Параметры расчёта': 'Parámetros de cálculo',
		Выберите: 'Seleccione',
		'Результаты расчёта': 'Resultados del cálculo',
		Формула: 'Fórmula',
		'Использованные параметры': 'Parámetros utilizados',
		'Ошибка расчёта': 'Error de cálculo',
		'Ошибки в данных': 'Errores en los datos',
		'Поле обязательно для заполнения': 'El campo es obligatorio',
		'Значение должно быть положительным': 'El valor debe ser positivo',
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

// Translate the "equations" calculator
console.log('Translating equations calculator...');

// Get the equations calculator from Russian file
const equationsCalculator = ruFile.calculators.equations;

// Translate to German
const equationsCalculatorDe = translateObject(
	equationsCalculator,
	translateToGerman
);
deFile.calculators.equations = equationsCalculatorDe;

// Translate to Spanish
const equationsCalculatorEs = translateObject(
	equationsCalculator,
	translateToSpanish
);
esFile.calculators.equations = equationsCalculatorEs;

// Write the files
fs.writeFileSync('messages/de.json', JSON.stringify(deFile, null, 2), 'utf8');
fs.writeFileSync('messages/es.json', JSON.stringify(esFile, null, 2), 'utf8');

console.log('Equations calculator translated successfully!');
console.log('German title:', equationsCalculatorDe.title);
console.log('Spanish title:', equationsCalculatorEs.title);
