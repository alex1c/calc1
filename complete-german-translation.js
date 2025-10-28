const fs = require('fs');

console.log('Complete German translation...');

// Read file
const content = fs.readFileSync('messages/de.json', 'utf8');
const data = JSON.parse(content);

// Comprehensive German translations
const translations = {
  // Common Russian words
  'радиус': 'Radius',
  'сторона': 'Seite', 
  'основание': 'Basis',
  'высота': 'Höhe',
  'площадь': 'Fläche',
  'объём': 'Volumen',
  'расчёт': 'Berechnung',
  'расчёта': 'Berechnung',
  'расчёты': 'Berechnungen',
  'калькулятор': 'Rechner',
  'онлайн': 'Online',
  'простой': 'einfach',
  'точный': 'präzise',
  'формулы': 'Formeln',
  'математика': 'Mathematik',
  'инженерия': 'Ingenieurwesen',
  'студенты': 'Studenten',
  'инженеры': 'Ingenieure',
  'геометрия': 'Geometrie',
  'круг': 'Kreis',
  'квадрат': 'Quadrat',
  'треугольник': 'Dreieck',
  'сфера': 'Kugel',
  'куб': 'Würfel',
  'цилиндр': 'Zylinder',
  'степень': 'Potenz',
  'корень': 'Wurzel',
  'уравнения': 'Gleichungen',
  'линейные': 'lineare',
  'квадратные': 'quadratische',
  'статистика': 'Statistik',
  'единицы': 'Einheiten',
  'измерения': 'Messungen',
  'конвертер': 'Umrechner',
  'калории': 'Kalorien',
  'макронутриенты': 'Makronährstoffe',
  'бумага': 'Papier',
  'вес': 'Gewicht',
  'НДС': 'MwSt',
  'возраст': 'Alter',
  'водопроводные': 'Wasserleitungs-',
  'трубы': 'Rohre',
  'автокредит': 'Autokredit',
  'потребительский': 'Verbraucher-',
  'кредит': 'Kredit',
  'ипотека': 'Hypothek',
  'вклады': 'Einlagen',
  'инвестиции': 'Investitionen',
  'ИМТ': 'BMI',
  'частота': 'Frequenz',
  'сердечных': 'Herz-',
  'сокращений': 'schläge',
  'алкоголь': 'Alkohol',
  'крови': 'Blut',
  'беременность': 'Schwangerschaft',
  'накопления': 'Ersparnisse',
  'фигуры': 'Figuren',
  'тела': 'Körper',
  'степени': 'Potenzen',
  'корни': 'Wurzeln',
  'решения': 'Lösung',
  'статистики': 'Statistik',
  'единиц': 'Einheiten',
  'измерения': 'Messung',
  'калорий': 'Kalorien',
  'макронутриентов': 'Makronährstoffe',
  'бумаги': 'Papier',
  'водопроводных': 'Wasserleitungs-',
  'труб': 'Rohre',
  
  // Phrases
  'Выберите режим расчёта: возведение в степень или извлечение корня. Введите необходимые значения и нажмите кнопку \'Berechnen\'. Калькулятор автоматически применит соответствующую формулу и покажет результат.': 'Wählen Sie den Berechnungsmodus: Potenzierung oder Wurzelziehen. Geben Sie die erforderlichen Werte ein und klicken Sie auf \'Berechnen\'. Der Rechner wendet automatisch die entsprechende Formel an und zeigt das Ergebnis.',
  'Онлайн калькулятор для вычисления площади основных геометрических фигур: круга, квадрата и треугольника. Простой в использовании инструмент с автоматическим расчётом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить площадь фигуры.': 'Online-Rechner zur Berechnung der Fläche grundlegender geometrischer Figuren: Kreis, Quadrat und Dreieck. Einfaches Werkzeug mit automatischer Berechnung nach Formeln. Geeignet für Studenten, Ingenieure und alle, die schnell die Fläche einer Figur berechnen müssen.',
  'Наш калькулятор площади поддерживает три основные геометрические фигуры, которые широко используются в математике, инженерии и повседневных расчётах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить площадь комнаты, этот инструмент предоставляет точные результаты мгновенно.': 'Unser Flächenrechner unterstützt drei grundlegende geometrische Figuren, die in Mathematik, Ingenieurwesen und alltäglichen Berechnungen weit verbreitet sind. Egal, ob Sie Student sind, der Geometrie studiert, Ingenieur, der an Bauprojekten arbeitet, oder einfach die Fläche eines Raums berechnen müssen, dieses Werkzeug liefert sofort präzise Ergebnisse.',
  'Fläche круга рассчитывается по формуле S = π × r², где r - радиус. Fläche квадрата вычисляется как S = a², где a - длина стороны. Fläche треугольника рассчитывается по формуле S = ½ × a × h, где a - основание, h - высота.': 'Die Fläche eines Kreises wird nach der Formel S = π × r² berechnet, wobei r der Radius ist. Die Fläche eines Quadrats wird als S = a² berechnet, wobei a die Seitenlänge ist. Die Fläche eines Dreiecks wird nach der Formel S = ½ × a × h berechnet, wobei a die Basis und h die Höhe ist.',
  'где r - радиус круга': 'wobei r der Radius des Kreises ist',
  'где a - длина одной стороны': 'wobei a die Länge einer Seite ist',
  'где a - основание, h - высота': 'wobei a die Basis und h die Höhe ist',
  'Schnelle und präzise Berechnungen, поддержка основных геометрических фигур, понятный интерфейс, автоматическое применение математических формул, результаты с точностью до 2 знаков после запятой.': 'Schnelle und präzise Berechnungen, Unterstützung grundlegender geometrischer Figuren, benutzerfreundliche Oberfläche, automatische Anwendung mathematischer Formeln, Ergebnisse mit einer Genauigkeit von 2 Dezimalstellen.',
  'Sofortige Berechnungen с высокой точностью': 'Sofortige Berechnungen mit hoher Genauigkeit',
  'Поддержка множества геометрических фигур': 'Unterstützung vieler geometrischer Figuren',
  'Benutzerfreundliche Oberfläche с визуальной обратной связью': 'Benutzerfreundliche Oberfläche mit visueller Rückmeldung',
  'Responsives Design для всех устройств': 'Responsives Design für alle Geräte',
  'Mehrsprachige Unterstützung (русский, английский, испанский, немецкий)': 'Mehrsprachige Unterstützung (Russisch, Englisch, Spanisch, Deutsch)',
  'Keine Registrierung erforderlich или установки программ': 'Keine Registrierung oder Installation von Programmen erforderlich',
  'Kostenlose Nutzung без ограничений': 'Kostenlose Nutzung ohne Einschränkungen',
  'Tipps по использованию': 'Tipps zur Verwendung',
  'Убедитесь, что все значения положительные. Для круга введите радиус, для квадрата - длину стороны, для треугольника - основание и высоту. Ergebnis отображается в квадратных единицах измерения.': 'Stellen Sie sicher, dass alle Werte positiv sind. Für einen Kreis geben Sie den Radius ein, für ein Quadrat die Seitenlänge, für ein Dreieck die Basis und Höhe. Das Ergebnis wird in quadratischen Maßeinheiten angezeigt.',
  'Важные замечания:': 'Wichtige Hinweise:',
  'Всегда используйте одинаковые единицы измерения для всех параметров': 'Verwenden Sie immer die gleichen Maßeinheiten für alle Parameter',
  'Для круга измеряйте от центра до края для радиуса': 'Für einen Kreis messen Sie vom Zentrum bis zum Rand für den Radius',
  'Для треугольника высота должна быть перпендикулярна основанию': 'Für ein Dreieck muss die Höhe senkrecht zur Basis stehen',
  'Ergebnisы отображаются в квадратных единицах вашего ввода': 'Ergebnisse werden in quadratischen Einheiten Ihrer Eingabe angezeigt',
  'Используйте десятичную нотацию для точных расчётов': 'Verwenden Sie Dezimalnotation für präzise Berechnungen',
  'Beispiele расчётов': 'Berechnungsbeispiele',
  'Пример круга': 'Kreisbeispiel',
  'Пример квадрата': 'Quadratbeispiel',
  'Пример треугольника': 'Dreiecksbeispiel',
  'Дано': 'Gegeben',
  'Расчёт': 'Berechnung',
  'Fläche круга с радиусом 5 единиц составляет приблизительно 78.54 квадратных единиц.': 'Die Fläche eines Kreises mit einem Radius von 5 Einheiten beträgt etwa 78.54 Quadrateinheiten.',
  'Fläche квадрата со стороной 7 единиц составляет 49 квадратных единиц.': 'Die Fläche eines Quadrats mit einer Seite von 7 Einheiten beträgt 49 Quadrateinheiten.',
  'Fläche треугольника с основанием 8 единиц и высотой 6 единиц составляет 24 квадратных единицы.': 'Die Fläche eines Dreiecks mit einer Basis von 8 Einheiten und einer Höhe von 6 Einheiten beträgt 24 Quadrateinheiten.',
  'Области применения': 'Anwendungsbereiche',
  'Bauwesen и архитектура': 'Bauwesen und Architektur',
  'Образование и обучение': 'Bildung und Ausbildung',
  'Расчёт площади пола для напольных материалов': 'Berechnung der Bodenfläche für Bodenbeläge',
  'Определение покрытия краской для стен': 'Bestimmung der Wandfarbe',
  'Планирование садовых и ландшафтных зон': 'Planung von Garten- und Landschaftsbereichen',
  'Оценка количества материалов': 'Schätzung der Materialmenge',
  'Домашние задания по геометрии': 'Geometrie-Hausaufgaben',
  'Понимание математических концепций': 'Verständnis mathematischer Konzepte',
  'Проверка ручных расчётов': 'Überprüfung manueller Berechnungen'
};

// Function to replace Russian text with German
function replaceRussianText(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (/[а-яё]/i.test(value)) {
        let translated = value;
        for (const [russian, german] of Object.entries(translations)) {
          translated = translated.replace(new RegExp(russian, 'gi'), german);
        }
        obj[key] = translated;
      }
    } else if (typeof value === 'object' && value !== null) {
      replaceRussianText(value);
    }
  }
}

// Apply translations
replaceRussianText(data);

// Write file
fs.writeFileSync('messages/de.json', JSON.stringify(data, null, 2), 'utf8');

console.log('Complete German translation finished!');

