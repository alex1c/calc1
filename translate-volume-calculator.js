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

// Translate the "volume" calculator
console.log('Translating volume calculator...');

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

console.log('Volume calculator translated successfully!');
console.log('German title:', volumeCalculatorDe.title);
console.log('Spanish title:', volumeCalculatorEs.title);

