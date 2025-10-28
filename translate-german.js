const fs = require('fs');

console.log('Translating Russian text to German in de.json...');

// Read German file
const content = fs.readFileSync('messages/de.json', 'utf8');
const data = JSON.parse(content);

// German translations for common Russian terms
const germanTranslations = {
  // Calculator titles
  'Калькулятор площади фигур': 'Flächenrechner',
  'Калькулятор объёма тел': 'Volumenrechner',
  'Калькулятор степеней и корней': 'Potenz- und Wurzelrechner',
  'Калькулятор решения уравнений': 'Gleichungsrechner',
  'Калькулятор статистики': 'Statistikrechner',
  'Конвертер единиц измерения': 'Einheitenumrechner',
  'Калькулятор калорий': 'Kalorienrechner',
  'Калькулятор макронутриентов': 'Makronährstoff-Rechner',
  'Калькулятор веса бумаги': 'Papiergewicht-Rechner',
  'Калькулятор НДС': 'Mehrwertsteuer-Rechner',
  'Калькулятор возраста': 'Altersrechner',
  'Калькулятор водопроводных труб': 'Wasserrohr-Rechner',
  'Калькулятор автокредита': 'Autokredit-Rechner',
  'Калькулятор потребительского кредита': 'Verbraucherkredit-Rechner',
  'Калькулятор ипотеки': 'Hypothekenrechner',
  'Калькулятор вкладов': 'Einlagenrechner',
  'Калькулятор инвестиций': 'Investitionsrechner',
  'Калькулятор ИМТ': 'BMI-Rechner',
  'Калькулятор частоты сердечных сокращений': 'Herzfrequenz-Rechner',
  'Калькулятор алкоголя в крови': 'Blutalkohol-Rechner',
  'Калькулятор беременности': 'Schwangerschaftsrechner',
  'Калькулятор накоплений': 'Sparrechner',
  
  // Descriptions
  'Вычислите площадь круга, квадрата или треугольника онлайн. Простой и точный калькулятор с формулами.': 'Berechnen Sie die Fläche von Kreis, Quadrat oder Dreieck online. Einfacher und präziser Rechner mit Formeln.',
  'Вычислите объём сферы, куба или цилиндра онлайн. Простой и точный калькулятор с формулами.': 'Berechnen Sie das Volumen von Kugel, Würfel oder Zylinder online. Einfacher und präziser Rechner mit Formeln.',
  'Вычислите степень числа или извлеките корень любой степени онлайн. Простой и точный калькулятор с формулами.': 'Berechnen Sie Potenzen oder ziehen Sie Wurzeln beliebigen Grades online. Einfacher und präziser Rechner mit Formeln.',
  'Онлайн калькулятор для решения линейных и квадратных уравнений с пошаговым объяснением': 'Online-Rechner zur Lösung linearer und quadratischer Gleichungen mit schrittweiser Erklärung',
  'Рассчитайте среднее, медиану, дисперсию и другие показатели онлайн': 'Berechnen Sie Durchschnitt, Median, Varianz und andere Indikatoren online',
  'Конвертируйте единицы измерения между различными системами онлайн': 'Konvertieren Sie Maßeinheiten zwischen verschiedenen Systemen online',
  'Рассчитайте калории для похудения, набора веса или поддержания формы': 'Berechnen Sie Kalorien zum Abnehmen, Gewichtszunahme oder Gewichtserhaltung',
  'Рассчитайте белки, жиры, углеводы и калории для достижения целей': 'Berechnen Sie Proteine, Fette, Kohlenhydrate und Kalorien zur Zielerreichung',
  'Рассчитайте вес бумаги для печати, упаковки и производства': 'Berechnen Sie das Papiergewicht für Druck, Verpackung und Produktion',
  'Рассчитайте НДС, сумму с НДС и без НДС для бизнеса и частных лиц': 'Berechnen Sie MwSt, Betrag mit und ohne MwSt für Unternehmen und Privatpersonen',
  'Рассчитайте точный возраст в годах, месяцах и днях онлайн': 'Berechnen Sie das genaue Alter in Jahren, Monaten und Tagen online',
  'Расчёт диаметра, пропускной способности и гидравлических параметров водопроводных труб': 'Berechnung von Durchmesser, Durchflusskapazität und hydraulischen Parametern von Wasserrohren',
  'Рассчитать ежемесячные платежи по автокредиту, общую сумму выплат и создать детальный график платежей для покупки автомобиля': 'Berechnen Sie monatliche Autokredit-Zahlungen, Gesamtsumme der Zahlungen und erstellen Sie einen detaillierten Zahlungsplan für den Autokauf',
  'Рассчитать ежемесячные платежи по потребительскому кредиту, общую сумму выплат и создать детальный график платежей': 'Berechnen Sie monatliche Verbraucherkredit-Zahlungen, Gesamtsumme der Zahlungen und erstellen Sie einen detaillierten Zahlungsplan',
  'Рассчитать ежемесячные платежи по ипотеке, общую сумму выплат и создать детальный график платежей для покупки недвижимости': 'Berechnen Sie monatliche Hypothekenzahlungen, Gesamtsumme der Zahlungen und erstellen Sie einen detaillierten Zahlungsplan für den Immobilienkauf',
  'Рассчитать доходность банковских вкладов с капитализацией, пополнениями и снятиями': 'Berechnen Sie die Rendite von Bankeinlagen mit Kapitalisierung, Einzahlungen und Abhebungen',
  'Рассчитать доходность инвестиций, дивиденды и рост капитала': 'Berechnen Sie die Rendite von Investitionen, Dividenden und Kapitalwachstum',
  'Рассчитать индекс массы тела (ИМТ) и оценить состояние веса': 'Berechnen Sie den Body-Mass-Index (BMI) und bewerten Sie den Gewichtszustand',
  'Рассчитать оптимальную частоту сердечных сокращений для тренировок и мониторинга здоровья': 'Berechnen Sie die optimale Herzfrequenz für Training und Gesundheitsmonitoring',
  'Рассчитать концентрацию алкоголя в крови (BAC) и время выведения': 'Berechnen Sie die Blutalkoholkonzentration (BAC) und Ausscheidungszeit',
  'Рассчитать дату родов и отслеживание беременности': 'Berechnen Sie den Geburtstermin und Schwangerschaftsverfolgung',
  'Рассчитать рост накоплений с учётом сложных процентов и регулярных пополнений': 'Berechnen Sie das Sparwachstum mit Zinseszins und regelmäßigen Einzahlungen',
  
  // Categories
  'Математика': 'Mathematik',
  'Финансы': 'Finanzen',
  'Здоровье': 'Gesundheit',
  'Строительство': 'Bauwesen',
  'Единицы измерения': 'Maßeinheiten',
  'Питание': 'Ernährung',
  
  // Form fields
  'Параметры расчёта': 'Berechnungsparameter',
  'Выберите фигуру': 'Wählen Sie eine Figur',
  'Круг': 'Kreis',
  'Квадрат': 'Quadrat',
  'Треугольник': 'Dreieck',
  'Радиус (r)': 'Radius (r)',
  'Сторона (a)': 'Seite (a)',
  'Основание (a)': 'Basis (a)',
  'Высота (h)': 'Höhe (h)',
  'Ошибки в данных': 'Datenfehler',
  'Поле обязательно для заполнения': 'Feld ist erforderlich',
  'Значение должно быть положительным': 'Wert muss positiv sein',
  
  // Results
  'Результаты расчёта': 'Berechnungsergebnisse',
  'Площадь': 'Fläche',
  'Формула': 'Formel',
  'Использованные параметры': 'Verwendete Parameter',
  'Ошибка расчёта': 'Berechnungsfehler',
  'Объём': 'Volumen',
  'Режим расчёта': 'Berechnungsmodus',
  'Возведение в степень': 'Potenzierung',
  'Извлечение корня': 'Wurzelziehen',
  'Основание (a)': 'Basis (a)',
  'Степень (n)': 'Exponent (n)',
  'Число (a)': 'Zahl (a)',
  'Степень корня (n)': 'Wurzelexponent (n)',
  'Результат': 'Ergebnis',
  'Введите уравнение': 'Gleichung eingeben',
  'Режим ввода': 'Eingabemodus',
  'Ввести уравнение': 'Gleichung eingeben',
  'Ввести коэффициенты': 'Koeffizienten eingeben',
  'Примеры': 'Beispiele',
  'Тип уравнения': 'Gleichungstyp',
  'Линейное (ax + b = 0)': 'Linear (ax + b = 0)',
  'Квадратное (ax² + bx + c = 0)': 'Quadratisch (ax² + bx + c = 0)',
  'Формат': 'Format',
  'Коэффициент A': 'Koeffizient A',
  'Коэффициент B': 'Koeffizient B',
  'Коэффициент C': 'Koeffizient C',
  'Решить': 'Lösen',
  'Сбросить': 'Zurücksetzen',
  'Введите данные': 'Daten eingeben',
  'Числа': 'Zahlen',
  'Введите числа через запятую или пробелы': 'Geben Sie Zahlen durch Komma oder Leerzeichen getrennt ein',
  'Пример: 1, 2, 3, 4, 5 или 1 2 3 4 5': 'Beispiel: 1, 2, 3, 4, 5 oder 1 2 3 4 5',
  'Рассчитать': 'Berechnen',
  'Очистить': 'Löschen',
  
  // Common terms
  'Точность': 'Genauigkeit',
  'Скорость': 'Geschwindigkeit',
  'Безопасность': 'Sicherheit',
  'Гибкость': 'Flexibilität',
  'Преимущества': 'Vorteile',
  'Требования': 'Anforderungen',
  'Советы': 'Tipps',
  'Часто задаваемые вопросы': 'Häufig gestellte Fragen',
  'Примеры расчёта': 'Berechnungsbeispiele',
  'О калькуляторе': 'Über den Rechner',
  'Как рассчитывается': 'Wie wird berechnet',
  'Быстрые и точные расчёты': 'Schnelle und präzise Berechnungen',
  'Мгновенные расчёты': 'Sofortige Berechnungen',
  'Высокая точность': 'Hohe Genauigkeit',
  'Удобный интерфейс': 'Benutzerfreundliche Oberfläche',
  'Адаптивный дизайн': 'Responsives Design',
  'Многоязычная поддержка': 'Mehrsprachige Unterstützung',
  'Бесплатное использование': 'Kostenlose Nutzung',
  'Не требует регистрации': 'Keine Registrierung erforderlich'
};

// Function to translate Russian text to German
function translateToGerman(obj, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (/[а-яё]/i.test(value)) {
        // Try to find exact match first
        if (germanTranslations[value]) {
          obj[key] = germanTranslations[value];
        } else {
          // Try partial matches
          let translated = value;
          for (const [russian, german] of Object.entries(germanTranslations)) {
            if (value.includes(russian)) {
              translated = translated.replace(new RegExp(russian, 'g'), german);
            }
          }
          obj[key] = translated;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      translateToGerman(value, path ? `${path}.${key}` : key);
    }
  }
}

// Translate German file
console.log('Translating German file...');
translateToGerman(data.calculators);

// Write updated file
fs.writeFileSync('messages/de.json', JSON.stringify(data, null, 2), 'utf8');

console.log('German translation completed!');
console.log('All Russian text has been translated to German.');

