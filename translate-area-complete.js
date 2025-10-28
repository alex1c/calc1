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
		'Калькулятор площади фигур онлайн - круг, квадрат, треугольник':
			'Rechner für Flächen von Figuren online - Kreis, Quadrat, Dreieck',
		'О калькуляторе площади фигур':
			'Über den Rechner für Flächen von Figuren',
		'Онлайн калькулятор для вычисления площади основных геометрических фигур: круга, квадрата и треугольника. Простой в использовании инструмент с автоматическим расчётом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить площадь фигуры.':
			'Online-Rechner zur Berechnung der Fläche grundlegender geometrischer Figuren: Kreis, Quadrat und Dreieck. Einfaches Tool mit automatischer Berechnung nach Formeln. Geeignet für Studenten, Ingenieure und alle, die schnell die Fläche einer Figur berechnen müssen.',
		'Наш калькулятор площади поддерживает три основные геометрические фигуры, которые широко используются в математике, инженерии и повседневных расчётах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить площадь комнаты, этот инструмент предоставляет точные результаты мгновенно.':
			'Unser Flächenrechner unterstützt drei grundlegende geometrische Figuren, die in Mathematik, Ingenieurwesen und Alltagsberechnungen weit verbreitet sind. Ob Sie Student sind, der Geometrie lernt, Ingenieur, der an Bauprojekten arbeitet, oder einfach die Raumfläche berechnen müssen - dieses Tool liefert sofort präzise Ergebnisse.',
		'Как рассчитывается площадь': 'Wie wird die Fläche berechnet',
		'Площадь круга рассчитывается по формуле S = π × r², где r - радиус. Площадь квадрата вычисляется как S = a², где a - длина стороны. Площадь треугольника рассчитывается по формуле S = ½ × a × h, где a - основание, h - высота.':
			'Die Fläche eines Kreises wird nach der Formel S = π × r² berechnet, wobei r der Radius ist. Die Fläche eines Quadrats wird als S = a² berechnet, wobei a die Seitenlänge ist. Die Fläche eines Dreiecks wird nach der Formel S = ½ × a × h berechnet, wobei a die Grundfläche und h die Höhe ist.',
		'где r - радиус круга': 'wobei r der Radius des Kreises ist',
		'где a - длина одной стороны': 'wobei a die Länge einer Seite ist',
		'где a - основание, h - высота':
			'wobei a die Grundfläche und h die Höhe ist',
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
		'Калькулятор площади фигур онлайн - круг, квадрат, треугольник':
			'Calculadora de área de figuras online - círculo, cuadrado, triángulo',
		'О калькуляторе площади фигур':
			'Sobre la calculadora de área de figuras',
		'Онлайн калькулятор для вычисления площади основных геометрических фигур: круга, квадрата и треугольника. Простой в использовании инструмент с автоматическим расчётом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить площадь фигуры.':
			'Calculadora online para calcular el área de figuras geométricas básicas: círculo, cuadrado y triángulo. Herramienta fácil de usar con cálculo automático por fórmulas. Adecuada para estudiantes, ingenieros y todos los que necesitan calcular rápidamente el área de una figura.',
		'Наш калькулятор площади поддерживает три основные геометрические фигуры, которые широко используются в математике, инженерии и повседневных расчётах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить площадь комнаты, этот инструмент предоставляет точные результаты мгновенно.':
			'Nuestra calculadora de área soporta tres figuras geométricas básicas que se usan ampliamente en matemáticas, ingeniería y cálculos cotidianos. Ya sea que seas estudiante aprendiendo geometría, ingeniero trabajando en proyectos de construcción, o simplemente necesites calcular el área de una habitación, esta herramienta proporciona resultados precisos al instante.',
		'Как рассчитывается площадь': 'Cómo se calcula el área',
		'Площадь круга рассчитывается по формуле S = π × r², где r - радиус. Площадь квадрата вычисляется как S = a², где a - длина стороны. Площадь треугольника рассчитывается по формуле S = ½ × a × h, где a - основание, h - высота.':
			'El área del círculo se calcula con la fórmula S = π × r², donde r es el radio. El área del cuadrado se calcula como S = a², donde a es la longitud del lado. El área del triángulo se calcula con la fórmula S = ½ × a × h, donde a es la base y h es la altura.',
		'где r - радиус круга': 'donde r es el radio del círculo',
		'где a - длина одной стороны': 'donde a es la longitud de un lado',
		'где a - основание, h - высота': 'donde a es la base y h es la altura',
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

// Translate the "area" calculator with complete SEO blocks
console.log('Translating area calculator with complete SEO blocks...');

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

console.log(
	'Area calculator with complete SEO blocks translated successfully!'
);
console.log('German title:', areaCalculatorDe.title);
console.log('Spanish title:', areaCalculatorEs.title);
console.log('German SEO title:', areaCalculatorDe.seo?.title);
console.log('Spanish SEO title:', areaCalculatorEs.seo?.title);

