const fs = require('fs');

console.log('Fixing mixed Russian-German text in de.json...');

// Read German file
const content = fs.readFileSync('messages/de.json', 'utf8');
const data = JSON.parse(content);

// Complete German translations for mixed text
const mixedTextTranslations = {
	// Mixed titles
	'Über den Rechner площади фигур': 'Über den Flächenrechner',
	'Vorteile Rechnerа': 'Vorteile des Rechners',
	'Beispiele Berechnungов': 'Berechnungsbeispiele',
	'Über den Rechner Volumenа тел': 'Über den Volumenrechner',

	// Mixed content
	'Online Rechner для вычисления площади основных геометрических фигур: Kreisа, Quadratа и Dreieckа. einfach в использовании инструмент с автоматическим Berechnungом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить Fläche Figuren.':
		'Online-Rechner zur Berechnung der Fläche grundlegender geometrischer Figuren: Kreis, Quadrat und Dreieck. Einfaches Werkzeug mit automatischer Berechnung nach Formeln. Geeignet für Studenten, Ingenieure und alle, die schnell die Fläche einer Figur berechnen müssen.',

	'Наш Rechner площади поддерживает три основные геометрические Figuren, которые широко используются в математике, инженерии и повседневных Berechnungах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить Fläche комнаты, этот инструмент предоставляет точные результаты мгновенно.':
		'Unser Flächenrechner unterstützt drei grundlegende geometrische Figuren, die in Mathematik, Ingenieurwesen und alltäglichen Berechnungen weit verbreitet sind. Egal, ob Sie Student sind, der Geometrie studiert, Ingenieur, der an Bauprojekten arbeitet, oder einfach die Fläche eines Raums berechnen müssen, dieses Werkzeug liefert sofort präzise Ergebnisse.',

	'Fläche Kreisа рассчитывается по формуле S = π × r², где r - Radius. Fläche Quadratа вычисляется как S = a², где a - длина стороны. Fläche Dreieckа рассчитывается по формуле S = ½ × a × h, где a - Basis, h - Höhe.':
		'Die Fläche eines Kreises wird nach der Formel S = π × r² berechnet, wobei r der Radius ist. Die Fläche eines Quadrats wird als S = a² berechnet, wobei a die Seitenlänge ist. Die Fläche eines Dreiecks wird nach der Formel S = ½ × a × h berechnet, wobei a die Basis und h die Höhe ist.',

	'где r - Radius Kreisа': 'wobei r der Radius des Kreises ist',
	'где a - длина одной стороны': 'wobei a die Länge einer Seite ist',
	'где a - Basis, h - Höhe': 'wobei a die Basis und h die Höhe ist',

	'Убедитесь, что все значения положительные. Для Kreisа введите Radius, для Quadratа - длину стороны, для Dreieckа - Basis и высоту. Ergebnis отображается в Quadratных Einheitenах Messung.':
		'Stellen Sie sicher, dass alle Werte positiv sind. Für einen Kreis geben Sie den Radius ein, für ein Quadrat die Seitenlänge, für ein Dreieck die Basis und Höhe. Das Ergebnis wird in quadratischen Maßeinheiten angezeigt.',

	'Всегда используйте одинаковые Einheiten Messung для всех параметров':
		'Verwenden Sie immer die gleichen Maßeinheiten für alle Parameter',
	'Для Kreisа измеряйте от центра до края для Radiusа':
		'Für einen Kreis messen Sie vom Zentrum bis zum Rand für den Radius',
	'Для Dreieckа Höhe должна быть перпендикулярна основанию':
		'Für ein Dreieck muss die Höhe senkrecht zur Basis stehen',
	'Ergebnisы отображаются в Quadratных Einheitenах вашего ввода':
		'Ergebnisse werden in quadratischen Einheiten Ihrer Eingabe angezeigt',
	'Используйте десятичную нотацию для точных Berechnungов':
		'Verwenden Sie Dezimalnotation für präzise Berechnungen',

	'Пример Kreisа': 'Kreisbeispiel',
	'Пример Quadratа': 'Quadratbeispiel',
	'Пример Dreieckа': 'Dreiecksbeispiel',

	'Fläche Kreisа с Radiusом 5 Einheiten составляет приблизительно 78.54 Quadratных Einheiten.':
		'Die Fläche eines Kreises mit einem Radius von 5 Einheiten beträgt etwa 78.54 Quadrateinheiten.',
	'Fläche Quadratа со стороной 7 Einheiten составляет 49 Quadratных Einheiten.':
		'Die Fläche eines Quadrats mit einer Seite von 7 Einheiten beträgt 49 Quadrateinheiten.',
	'Fläche Dreieckа с Basisм 8 Einheiten и высотой 6 Einheiten составляет 24 Quadratных Einheiten.':
		'Die Fläche eines Dreiecks mit einer Basis von 8 Einheiten und einer Höhe von 6 Einheiten beträgt 24 Quadrateinheiten.',

	'Berechnung площади пола для напольных материалов':
		'Berechnung der Bodenfläche für Bodenbeläge',
	'Проверка ручных Berechnungов': 'Überprüfung manueller Berechnungen',
	'Изучение формул площади': 'Studium der Flächenformeln',

	'Выберите тело': 'Wählen Sie einen Körper',

	'Online Rechner для вычисления Volumenа основных геометрических тел: сферы, Würfelа и Zylinderа. einfach в использовании инструмент с автоматическим Berechnungом по формулам. Подходит для студентов, инженеров и всех, кому нужно быстро вычислить Volumen Körper.':
		'Online-Rechner zur Berechnung des Volumens grundlegender geometrischer Körper: Kugel, Würfel und Zylinder. Einfaches Werkzeug mit automatischer Berechnung nach Formeln. Geeignet für Studenten, Ingenieure und alle, die schnell das Volumen eines Körpers berechnen müssen.',

	'Наш Rechner Volumenа поддерживает три основные геометрические Körper, которые широко используются в математике, инженерии и повседневных Berechnungах. Независимо от того, являетесь ли вы студентом, изучающим геометрию, инженером, работающим над строительными проектами, или просто нужно вычислить Volumen помещения, этот инструмент предоставляет точные результаты мгновенно.':
		'Unser Volumenrechner unterstützt drei grundlegende geometrische Körper, die in Mathematik, Ingenieurwesen und alltäglichen Berechnungen weit verbreitet sind. Egal, ob Sie Student sind, der Geometrie studiert, Ingenieur, der an Bauprojekten arbeitet, oder einfach das Volumen eines Raums berechnen müssen, dieses Werkzeug liefert sofort präzise Ergebnisse.',

	'Volumen сферы рассчитывается по формуле V = (4/3) × π × r³, где r - Radius. Volumen Würfelа вычисляется как V = a³, где a - длина стороны. Volumen Zylinderа рассчитывается по формуле V = π × r² × h, где r - Radius основания, h - Höhe.':
		'Das Volumen einer Kugel wird nach der Formel V = (4/3) × π × r³ berechnet, wobei r der Radius ist. Das Volumen eines Würfels wird als V = a³ berechnet, wobei a die Seitenlänge ist. Das Volumen eines Zylinders wird nach der Formel V = π × r² × h berechnet, wobei r der Radius der Basis und h die Höhe ist.',

	'Mehrsprachige Unterstützung (русский, английский, испанский, немецкий)':
		'Mehrsprachige Unterstützung (Russisch, Englisch, Spanisch, Deutsch)',
};

// Function to replace mixed text
function replaceMixedText(obj) {
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'string') {
			if (/[а-яё]/i.test(value)) {
				let translated = value;
				for (const [mixed, german] of Object.entries(
					mixedTextTranslations
				)) {
					if (value.includes(mixed)) {
						translated = translated.replace(
							new RegExp(
								mixed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
								'g'
							),
							german
						);
					}
				}
				obj[key] = translated;
			}
		} else if (typeof value === 'object' && value !== null) {
			replaceMixedText(value);
		}
	}
}

// Apply translations
replaceMixedText(data);

// Write file
fs.writeFileSync('messages/de.json', JSON.stringify(data, null, 2), 'utf8');

console.log('Mixed text translation completed!');

