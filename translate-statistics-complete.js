const fs = require('fs');

// Read the files
const ruFile = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));
const deFile = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const esFile = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

// Function to translate text from Russian to German
function translateToGerman(text) {
	const translations = {
		// Statistics calculator specific
		'Калькулятор статистики': 'Statistikrechner',
		'Рассчитайте среднее, медиану, дисперсию и другие показатели онлайн':
			'Berechnen Sie Mittelwert, Median, Varianz und andere Indikatoren online',
		'Введите данные': 'Daten eingeben',
		Числа: 'Zahlen',
		'Введите числа через запятую или пробелы':
			'Geben Sie Zahlen durch Komma oder Leerzeichen getrennt ein',
		'Рассчитать статистику': 'Statistik berechnen',
		'Очистить данные': 'Daten löschen',
		'Результаты расчёта': 'Berechnungsergebnisse',
		'Среднее арифметическое': 'Arithmetisches Mittel',
		Медиана: 'Median',
		Мода: 'Modus',
		Дисперсия: 'Varianz',
		'Стандартное отклонение': 'Standardabweichung',
		'Минимальное значение': 'Mindestwert',
		'Максимальное значение': 'Maximalwert',
		'Количество элементов': 'Anzahl der Elemente',
		'Сумма всех значений': 'Summe aller Werte',
		'Среднее значение': 'Durchschnittswert',
		'Среднее арифметическое — это сумма всех значений, деленная на их количество. Это один из самых важных показателей центральной тенденции.':
			'Das arithmetische Mittel ist die Summe aller Werte geteilt durch ihre Anzahl. Es ist einer der wichtigsten Indikatoren der zentralen Tendenz.',
		'Среднее = Σx / n': 'Mittelwert = Σx / n',
		'Для чисел 1, 2, 3, 4, 5: среднее = (1+2+3+4+5)/5 = 3':
			'Für die Zahlen 1, 2, 3, 4, 5: Mittelwert = (1+2+3+4+5)/5 = 3',
		'Медиана — это значение, которое делит упорядоченный ряд пополам. Если количество элементов четное, медиана равна среднему арифметическому двух центральных значений.':
			'Der Median ist der Wert, der eine geordnete Reihe in zwei Hälften teilt. Wenn die Anzahl der Elemente gerade ist, ist der Median gleich dem arithmetischen Mittel der beiden zentralen Werte.',
		'Медиана = среднее значение упорядоченного ряда':
			'Median = Durchschnittswert der geordneten Reihe',
		'Для чисел 1, 2, 3, 4, 5: медиана = 3. Для чисел 1, 2, 3, 4: медиана = (2+3)/2 = 2.5':
			'Für die Zahlen 1, 2, 3, 4, 5: Median = 3. Für die Zahlen 1, 2, 3, 4: Median = (2+3)/2 = 2.5',
		'Мода — это наиболее часто встречающееся значение в наборе данных. Если все значения встречаются одинаково часто, моды нет.':
			'Der Modus ist der am häufigsten vorkommende Wert in einem Datensatz. Wenn alle Werte gleich häufig vorkommen, gibt es keinen Modus.',
		'Дисперсия показывает, насколько сильно значения отклоняются от среднего. Чем больше дисперсия, тем больше разброс данных.':
			'Die Varianz zeigt, wie stark die Werte vom Mittelwert abweichen. Je größer die Varianz, desto größer die Streuung der Daten.',
		'Стандартное отклонение — это квадратный корень из дисперсии. Показывает среднее отклонение значений от среднего.':
			'Die Standardabweichung ist die Quadratwurzel der Varianz. Sie zeigt die durchschnittliche Abweichung der Werte vom Mittelwert.',
		Математика: 'Mathematik',

		// Common terms
		'Параметры расчёта': 'Berechnungsparameter',
		Выберите: 'Wählen Sie',
		Формула: 'Formel',
		'Использованные параметры': 'Verwendete Parameter',
		'Ошибка расчёта': 'Berechnungsfehler',
		'Ошибки в данных': 'Datenfehler',
		'Поле обязательно для заполнения': 'Feld ist erforderlich',
		'Значение должно быть положительным': 'Wert muss positiv sein',

		// SEO content
		'Калькулятор статистики онлайн - среднее, медиана, дисперсия | Calc1.ru':
			'Statistikrechner online - Mittelwert, Median, Varianz | Calc1.ru',
		'Бесплатный онлайн калькулятор для расчета статистических показателей: среднее, медиана, мода, дисперсия, стандартное отклонение. Поддержка русского, английского, испанского и немецкого языков.':
			'Kostenloser Online-Rechner zur Berechnung statistischer Indikatoren: Mittelwert, Median, Modus, Varianz, Standardabweichung. Unterstützung für Russisch, Englisch, Spanisch und Deutsch.',
		'Онлайн калькулятор статистики': 'Online-Statistikrechner',
		'Наш калькулятор позволяет быстро рассчитать основные статистические показатели: среднее арифметическое, медиану, моду, дисперсию и стандартное отклонение. Просто введите числа через запятую или пробелы, и получите полный статистический анализ.':
			'Unser Rechner ermöglicht es, schnell grundlegende statistische Indikatoren zu berechnen: arithmetisches Mittel, Median, Modus, Varianz und Standardabweichung. Geben Sie einfach Zahlen durch Komma oder Leerzeichen getrennt ein und erhalten Sie eine vollständige statistische Analyse.',
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
		// Statistics calculator specific
		'Калькулятор статистики': 'Calculadora de estadísticas',
		'Рассчитайте среднее, медиану, дисперсию и другие показатели онлайн':
			'Calcule la media, mediana, varianza y otros indicadores en línea',
		'Введите данные': 'Ingrese datos',
		Числа: 'Números',
		'Введите числа через запятую или пробелы':
			'Ingrese números separados por comas o espacios',
		'Рассчитать статистику': 'Calcular estadísticas',
		'Очистить данные': 'Limpiar datos',
		'Результаты расчёта': 'Resultados del cálculo',
		'Среднее арифметическое': 'Media aritmética',
		Медиана: 'Mediana',
		Мода: 'Moda',
		Дисперсия: 'Varianza',
		'Стандартное отклонение': 'Desviación estándar',
		'Минимальное значение': 'Valor mínimo',
		'Максимальное значение': 'Valor máximo',
		'Количество элементов': 'Número de elementos',
		'Сумма всех значений': 'Suma de todos los valores',
		'Среднее значение': 'Valor promedio',
		'Среднее арифметическое — это сумма всех значений, деленная на их количество. Это один из самых важных показателей центральной тенденции.':
			'La media aritmética es la suma de todos los valores dividida por su cantidad. Es uno de los indicadores más importantes de tendencia central.',
		'Среднее = Σx / n': 'Media = Σx / n',
		'Для чисел 1, 2, 3, 4, 5: среднее = (1+2+3+4+5)/5 = 3':
			'Para los números 1, 2, 3, 4, 5: media = (1+2+3+4+5)/5 = 3',
		'Медиана — это значение, которое делит упорядоченный ряд пополам. Если количество элементов четное, медиана равна среднему арифметическому двух центральных значений.':
			'La mediana es el valor que divide una serie ordenada por la mitad. Si el número de elementos es par, la mediana es igual a la media aritmética de los dos valores centrales.',
		'Медиана = среднее значение упорядоченного ряда':
			'Mediana = valor promedio de la serie ordenada',
		'Для чисел 1, 2, 3, 4, 5: медиана = 3. Для чисел 1, 2, 3, 4: медиана = (2+3)/2 = 2.5':
			'Para los números 1, 2, 3, 4, 5: mediana = 3. Para los números 1, 2, 3, 4: mediana = (2+3)/2 = 2.5',
		'Мода — это наиболее часто встречающееся значение в наборе данных. Если все значения встречаются одинаково часто, моды нет.':
			'La moda es el valor que aparece con más frecuencia en un conjunto de datos. Si todos los valores aparecen con la misma frecuencia, no hay moda.',
		'Дисперсия показывает, насколько сильно значения отклоняются от среднего. Чем больше дисперсия, тем больше разброс данных.':
			'La varianza muestra qué tan fuertemente los valores se desvían de la media. Cuanto mayor es la varianza, mayor es la dispersión de los datos.',
		'Стандартное отклонение — это квадратный корень из дисперсии. Показывает среднее отклонение значений от среднего.':
			'La desviación estándar es la raíz cuadrada de la varianza. Muestra la desviación promedio de los valores de la media.',
		Математика: 'Matemáticas',

		// Common terms
		'Параметры расчёта': 'Parámetros de cálculo',
		Выберите: 'Seleccione',
		Формула: 'Fórmula',
		'Использованные параметры': 'Parámetros utilizados',
		'Ошибка расчёта': 'Error de cálculo',
		'Ошибки в данных': 'Errores en los datos',
		'Поле обязательно для заполнения': 'El campo es obligatorio',
		'Значение должно быть положительным': 'El valor debe ser positivo',

		// SEO content
		'Калькулятор статистики онлайн - среднее, медиана, дисперсия | Calc1.ru':
			'Calculadora de estadísticas online - media, mediana, varianza | Calc1.ru',
		'Бесплатный онлайн калькулятор для расчета статистических показателей: среднее, медиана, мода, дисперсия, стандартное отклонение. Поддержка русского, английского, испанского и немецкого языков.':
			'Calculadora online gratuita para calcular indicadores estadísticos: media, mediana, moda, varianza, desviación estándar. Soporte para ruso, inglés, español y alemán.',
		'Онлайн калькулятор статистики': 'Calculadora online de estadísticas',
		'Наш калькулятор позволяет быстро рассчитать основные статистические показатели: среднее арифметическое, медиану, моду, дисперсию и стандартное отклонение. Просто введите числа через запятую или пробелы, и получите полный статистический анализ.':
			'Nuestra calculadora permite calcular rápidamente indicadores estadísticos básicos: media aritmética, mediana, moda, varianza y desviación estándar. Simplemente ingrese números separados por comas o espacios y obtenga un análisis estadístico completo.',
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

// Translate the "statistics" calculator with complete SEO blocks
console.log('Translating statistics calculator with complete SEO blocks...');

// Get the statistics calculator from Russian file
const statisticsCalculator = ruFile.calculators.statistics;

// Translate to German
const statisticsCalculatorDe = translateObject(
	statisticsCalculator,
	translateToGerman
);
deFile.calculators.statistics = statisticsCalculatorDe;

// Translate to Spanish
const statisticsCalculatorEs = translateObject(
	statisticsCalculator,
	translateToSpanish
);
esFile.calculators.statistics = statisticsCalculatorEs;

// Write the files
fs.writeFileSync('messages/de.json', JSON.stringify(deFile, null, 2), 'utf8');
fs.writeFileSync('messages/es.json', JSON.stringify(esFile, null, 2), 'utf8');

console.log(
	'Statistics calculator with complete SEO blocks translated successfully!'
);
console.log('German title:', statisticsCalculatorDe.title);
console.log('Spanish title:', statisticsCalculatorEs.title);
console.log('German SEO title:', statisticsCalculatorDe.seo?.title);
console.log('Spanish SEO title:', statisticsCalculatorEs.seo?.title);

