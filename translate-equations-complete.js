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

		// SEO content
		'Калькулятор решения уравнений онлайн - линейные и квадратные уравнения | Calc1.ru':
			'Gleichungsrechner online - lineare und quadratische Gleichungen | Calc1.ru',
		'Бесплатный онлайн калькулятор для решения линейных и квадратных уравнений с подробным пошаговым объяснением. Поддержка русского, английского, испанского и немецкого языков.':
			'Kostenloser Online-Rechner zur Lösung von linearen und quadratischen Gleichungen mit detaillierter schrittweiser Erklärung. Unterstützung für Russisch, Englisch, Spanisch und Deutsch.',
		'Онлайн калькулятор решения уравнений': 'Online-Gleichungsrechner',
		'Наш калькулятор позволяет решать линейные и квадратные уравнения онлайн с подробным пошаговым объяснением. Просто введите уравнение или коэффициенты, и калькулятор мгновенно найдет решение. Идеально подходит для студентов, школьников и всех, кто изучает математику.':
			'Unser Rechner ermöglicht es, lineare und quadratische Gleichungen online mit detaillierter schrittweiser Erklärung zu lösen. Geben Sie einfach die Gleichung oder Koeffizienten ein, und der Rechner findet sofort die Lösung. Ideal für Studenten, Schüler und alle, die Mathematik lernen.',
		'Как решать линейные уравнения': 'Wie man lineare Gleichungen löst',
		'Линейное уравнение имеет вид ax + b = 0, где a и b — известные числа, а x — неизвестная величина. Для решения необходимо выразить x.':
			'Eine lineare Gleichung hat die Form ax + b = 0, wobei a und b bekannte Zahlen sind und x die unbekannte Größe. Zur Lösung muss x ausgedrückt werden.',
		'ax + b = 0  →  x = -b/a': 'ax + b = 0  →  x = -b/a',
		'Пример: 2x + 5 = 15  →  2x = 10  →  x = 5':
			'Beispiel: 2x + 5 = 15  →  2x = 10  →  x = 5',
		'Как решать квадратные уравнения':
			'Wie man quadratische Gleichungen löst',
		'Квадратное уравнение имеет вид ax² + bx + c = 0. Решается через дискриминант: D = b² - 4ac. Количество корней зависит от значения дискриминанта.':
			'Eine quadratische Gleichung hat die Form ax² + bx + c = 0. Sie wird über die Diskriminante gelöst: D = b² - 4ac. Die Anzahl der Wurzeln hängt vom Wert der Diskriminante ab.',
		'x = (-b ± √D) / (2a)': 'x = (-b ± √D) / (2a)',
		'D = b² - 4ac': 'D = b² - 4ac',
		'Два корня': 'Zwei Wurzeln',
		'Один корень': 'Eine Wurzel',
		'Нет действительных корней': 'Keine reellen Wurzeln',
		'Преимущества калькулятора': 'Vorteile des Rechners',
		'Советы по использованию': 'Nutzungstipps',
		'Бесплатный онлайн калькулятор': 'Kostenloser Online-Rechner',
		'Поддержка русского, английского, испанского и немецкого языков':
			'Unterstützung für Russisch, Englisch, Spanisch und Deutsch',
		'Точные расчёты': 'Präzise Berechnungen',
		'Мгновенные результаты': 'Sofortige Ergebnisse',
		'Простой интерфейс': 'Einfache Benutzeroberfläche',
		'Без регистрации': 'Ohne Registrierung',
		'Работает на всех устройствах': 'Funktioniert auf allen Geräten',
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

		// SEO content
		'Калькулятор решения уравнений онлайн - линейные и квадратные уравнения | Calc1.ru':
			'Calculadora de resolución de ecuaciones online - ecuaciones lineales y cuadráticas | Calc1.ru',
		'Бесплатный онлайн калькулятор для решения линейных и квадратных уравнений с подробным пошаговым объяснением. Поддержка русского, английского, испанского и немецкого языков.':
			'Calculadora online gratuita para resolver ecuaciones lineales y cuadráticas con explicación detallada paso a paso. Soporte para ruso, inglés, español y alemán.',
		'Онлайн калькулятор решения уравнений':
			'Calculadora online de resolución de ecuaciones',
		'Наш калькулятор позволяет решать линейные и квадратные уравнения онлайн с подробным пошаговым объяснением. Просто введите уравнение или коэффициенты, и калькулятор мгновенно найдет решение. Идеально подходит для студентов, школьников и всех, кто изучает математику.':
			'Nuestra calculadora permite resolver ecuaciones lineales y cuadráticas online con explicación detallada paso a paso. Simplemente ingrese la ecuación o los coeficientes, y la calculadora encontrará la solución al instante. Ideal para estudiantes, escolares y todos los que estudian matemáticas.',
		'Как решать линейные уравнения': 'Cómo resolver ecuaciones lineales',
		'Линейное уравнение имеет вид ax + b = 0, где a и b — известные числа, а x — неизвестная величина. Для решения необходимо выразить x.':
			'Una ecuación lineal tiene la forma ax + b = 0, donde a y b son números conocidos y x es la cantidad desconocida. Para resolverla es necesario expresar x.',
		'ax + b = 0  →  x = -b/a': 'ax + b = 0  →  x = -b/a',
		'Пример: 2x + 5 = 15  →  2x = 10  →  x = 5':
			'Ejemplo: 2x + 5 = 15  →  2x = 10  →  x = 5',
		'Как решать квадратные уравнения':
			'Cómo resolver ecuaciones cuadráticas',
		'Квадратное уравнение имеет вид ax² + bx + c = 0. Решается через дискриминант: D = b² - 4ac. Количество корней зависит от значения дискриминанта.':
			'Una ecuación cuadrática tiene la forma ax² + bx + c = 0. Se resuelve a través del discriminante: D = b² - 4ac. El número de raíces depende del valor del discriminante.',
		'x = (-b ± √D) / (2a)': 'x = (-b ± √D) / (2a)',
		'D = b² - 4ac': 'D = b² - 4ac',
		'Два корня': 'Dos raíces',
		'Один корень': 'Una raíz',
		'Нет действительных корней': 'Sin raíces reales',
		'Преимущества калькулятора': 'Ventajas de la calculadora',
		'Советы по использованию': 'Consejos de uso',
		'Бесплатный онлайн калькулятор': 'Calculadora online gratuita',
		'Поддержка русского, английского, испанского и немецкого языков':
			'Soporte para ruso, inglés, español y alemán',
		'Точные расчёты': 'Cálculos precisos',
		'Мгновенные результаты': 'Resultados instantáneos',
		'Простой интерфейс': 'Interfaz simple',
		'Без регистрации': 'Sin registro',
		'Работает на всех устройствах': 'Funciona en todos los dispositivos',
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

// Translate the "equations" calculator with complete SEO blocks
console.log('Translating equations calculator with complete SEO blocks...');

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

console.log(
	'Equations calculator with complete SEO blocks translated successfully!'
);
console.log('German title:', equationsCalculatorDe.title);
console.log('Spanish title:', equationsCalculatorEs.title);
console.log('German SEO title:', equationsCalculatorDe.seo?.title);
console.log('Spanish SEO title:', equationsCalculatorEs.seo?.title);

