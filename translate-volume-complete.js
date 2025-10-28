const fs = require('fs');

// Read the files
const ruFile = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));
const deFile = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const esFile = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

// Function to translate text from Russian to German
function translateToGerman(text) {
	const translations = {
		// Volume calculator specific
		'Калькулятор объёма тел': 'Rechner für Körpervolumen',
		'Вычислите объём сферы, куба или цилиндра онлайн. Простой и точный калькулятор с формулами.':
			'Berechnen Sie das Volumen von Kugel, Würfel oder Zylinder online. Einfacher und präziser Rechner mit Formeln.',
		'Выберите тело': 'Wählen Sie einen Körper',
		Сфера: 'Kugel',
		Куб: 'Würfel',
		Цилиндр: 'Zylinder',
		'Радиус (r)': 'Radius (r)',
		'Сторона (a)': 'Seite (a)',
		'Высота (h)': 'Höhe (h)',
		Объём: 'Volumen',
		Радиус: 'Radius',
		Сторона: 'Seite',
		Высота: 'Höhe',
		Диаметр: 'Durchmesser',
		'Площадь поверхности': 'Oberfläche',
		'Объём тела': 'Körpervolumen',
		'Параметры тела': 'Körperparameter',
		'Формула объёма': 'Volumenformel',
		'Расчёт объёма': 'Volumenberechnung',
		'Геометрические тела': 'Geometrische Körper',
		'Объём сферы': 'Kugelvolumen',
		'Объём куба': 'Würfelvolumen',
		'Объём цилиндра': 'Zylindervolumen',
		'Площадь поверхности сферы': 'Kugeloberfläche',
		'Площадь поверхности куба': 'Würfeloberfläche',
		'Площадь поверхности цилиндра': 'Zylinderoberfläche',
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
		'Калькулятор объёма тел онлайн - сфера, куб, цилиндр':
			'Rechner für Körpervolumen online - Kugel, Würfel, Zylinder',
		'О калькуляторе объёма тел': 'Über den Rechner für Körpervolumen',
		'Онлайн калькулятор для вычисления объёма основных геометрических тел: сферы, куба и цилиндра. Простой в использовании инструмент с автоматическим расчётом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить объём тела.':
			'Online-Rechner zur Berechnung des Volumens grundlegender geometrischer Körper: Kugel, Würfel und Zylinder. Einfaches Tool mit automatischer Berechnung nach Formeln. Geeignet für Studenten, Ingenieure und alle, die schnell das Volumen eines Körpers berechnen müssen.',
		'Наш калькулятор объёма поддерживает три основные геометрические тела, которые широко используются в математике, инженерии и повседневных расчётах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить объём помещения, этот инструмент предоставляет точные результаты мгновенно.':
			'Unser Volumenrechner unterstützt drei grundlegende geometrische Körper, die in Mathematik, Ingenieurwesen und Alltagsberechnungen weit verbreitet sind. Ob Sie Student sind, der Geometrie lernt, Ingenieur, der an Bauprojekten arbeitet, oder einfach das Raumvolumen berechnen müssen - dieses Tool liefert sofort präzise Ergebnisse.',
		'Как рассчитывается объём': 'Wie wird das Volumen berechnet',
		'Объём сферы рассчитывается по формуле V = (4/3) × π × r³, где r - радиус. Объём куба вычисляется как V = a³, где a - длина стороны. Объём цилиндра рассчитывается по формуле V = π × r² × h, где r - радиус основания, h - высота.':
			'Das Volumen einer Kugel wird nach der Formel V = (4/3) × π × r³ berechnet, wobei r der Radius ist. Das Volumen eines Würfels wird als V = a³ berechnet, wobei a die Seitenlänge ist. Das Volumen eines Zylinders wird nach der Formel V = π × r² × h berechnet, wobei r der Grundradius und h die Höhe ist.',
		'где r - радиус сферы': 'wobei r der Radius der Kugel ist',
		'где a - длина одной стороны': 'wobei a die Länge einer Seite ist',
		'где r - радиус основания, h - высота':
			'wobei r der Grundradius und h die Höhe ist',
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
		// Volume calculator specific
		'Калькулятор объёма тел': 'Calculadora de volumen de cuerpos',
		'Вычислите объём сферы, куба или цилиндра онлайн. Простой и точный калькулятор с формулами.':
			'Calcule el volumen de esfera, cubo o cilindro en línea. Calculadora simple y precisa con fórmulas.',
		'Выберите тело': 'Seleccione un cuerpo',
		Сфера: 'Esfera',
		Куб: 'Cubo',
		Цилиндр: 'Cilindro',
		'Радиус (r)': 'Radio (r)',
		'Сторона (a)': 'Lado (a)',
		'Высота (h)': 'Altura (h)',
		Объём: 'Volumen',
		Радиус: 'Radio',
		Сторона: 'Lado',
		Высота: 'Altura',
		Диаметр: 'Diámetro',
		'Площадь поверхности': 'Área superficial',
		'Объём тела': 'Volumen del cuerpo',
		'Параметры тела': 'Parámetros del cuerpo',
		'Формула объёма': 'Fórmula de volumen',
		'Расчёт объёма': 'Cálculo de volumen',
		'Геометрические тела': 'Cuerpos geométricos',
		'Объём сферы': 'Volumen de esfera',
		'Объём куба': 'Volumen de cubo',
		'Объём цилиндра': 'Volumen de cilindro',
		'Площадь поверхности сферы': 'Área superficial de esfera',
		'Площадь поверхности куба': 'Área superficial de cubo',
		'Площадь поверхности цилиндра': 'Área superficial de cilindro',
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
		'Калькулятор объёма тел онлайн - сфера, куб, цилиндр':
			'Calculadora de volumen de cuerpos online - esfera, cubo, cilindro',
		'О калькуляторе объёма тел':
			'Sobre la calculadora de volumen de cuerpos',
		'Онлайн калькулятор для вычисления объёма основных геометрических тел: сферы, куба и цилиндра. Простой в использовании инструмент с автоматическим расчётом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить объём тела.':
			'Calculadora online para calcular el volumen de cuerpos geométricos básicos: esfera, cubo y cilindro. Herramienta fácil de usar con cálculo automático por fórmulas. Adecuada para estudiantes, ingenieros y todos los que necesitan calcular rápidamente el volumen de un cuerpo.',
		'Наш калькулятор объёма поддерживает три основные геометрические тела, которые широко используются в математике, инженерии и повседневных расчётах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить объём помещения, этот инструмент предоставляет точные результаты мгновенно.':
			'Nuestra calculadora de volumen soporta tres cuerpos geométricos básicos que se usan ampliamente en matemáticas, ingeniería y cálculos cotidianos. Ya sea que seas estudiante aprendiendo geometría, ingeniero trabajando en proyectos de construcción, o simplemente necesites calcular el volumen de una habitación, esta herramienta proporciona resultados precisos al instante.',
		'Как рассчитывается объём': 'Cómo se calcula el volumen',
		'Объём сферы рассчитывается по формуле V = (4/3) × π × r³, где r - радиус. Объём куба вычисляется как V = a³, где a - длина стороны. Объём цилиндра рассчитывается по формуле V = π × r² × h, где r - радиус основания, h - высота.':
			'El volumen de la esfera se calcula con la fórmula V = (4/3) × π × r³, donde r es el radio. El volumen del cubo se calcula como V = a³, donde a es la longitud del lado. El volumen del cilindro se calcula con la fórmula V = π × r² × h, donde r es el radio de la base y h es la altura.',
		'где r - радиус сферы': 'donde r es el radio de la esfera',
		'где a - длина одной стороны': 'donde a es la longitud de un lado',
		'где r - радиус основания, h - высота':
			'donde r es el radio de la base y h es la altura',
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

// Translate the "volume" calculator with complete SEO blocks
console.log('Translating volume calculator with complete SEO blocks...');

// Get the volume calculator from Russian file
const volumeCalculator = ruFile.calculators.volume;

// Translate to German
const volumeCalculatorDe = translateObject(volumeCalculator, translateToGerman);
deFile.calculators.volume = volumeCalculatorDe;

// Translate to Spanish
const volumeCalculatorEs = translateObject(
	volumeCalculator,
	translateToSpanish
);
esFile.calculators.volume = volumeCalculatorEs;

// Write the files
fs.writeFileSync('messages/de.json', JSON.stringify(deFile, null, 2), 'utf8');
fs.writeFileSync('messages/es.json', JSON.stringify(esFile, null, 2), 'utf8');

console.log(
	'Volume calculator with complete SEO blocks translated successfully!'
);
console.log('German title:', volumeCalculatorDe.title);
console.log('Spanish title:', volumeCalculatorEs.title);
console.log('German SEO title:', volumeCalculatorDe.seo?.title);
console.log('Spanish SEO title:', volumeCalculatorEs.seo?.title);

