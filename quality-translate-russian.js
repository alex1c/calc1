const fs = require('fs');

console.log('Creating quality translations for Spanish and German files...');

// Read files
const ruContent = fs.readFileSync('messages/ru.json', 'utf8');
const ruData = JSON.parse(ruContent);

const esContent = fs.readFileSync('messages/es.json', 'utf8');
const esData = JSON.parse(esContent);

const deContent = fs.readFileSync('messages/de.json', 'utf8');
const deData = JSON.parse(deContent);

// Quality Spanish translations for common Russian terms
const spanishTranslations = {
  // Calculator titles
  'Калькулятор автокредита': 'Calculadora de Préstamo de Auto',
  'Калькулятор потребительского кредита': 'Calculadora de Préstamo Personal',
  'Калькулятор ипотеки': 'Calculadora de Hipoteca',
  'Калькулятор вкладов': 'Calculadora de Depósitos',
  'Калькулятор инвестиций': 'Calculadora de Inversiones',
  'Калькулятор ИМТ': 'Calculadora de IMC',
  'Калькулятор частоты сердечных сокращений': 'Calculadora de Frecuencia Cardíaca',
  'Калькулятор алкоголя в крови': 'Calculadora de Alcohol en Sangre',
  'Калькулятор беременности': 'Calculadora de Embarazo',
  'Калькулятор накоплений': 'Calculadora de Ahorros',
  'Калькулятор площади фигур': 'Calculadora de Área de Figuras',
  'Калькулятор объёма тел': 'Calculadora de Volumen de Cuerpos',
  'Калькулятор степеней и корней': 'Calculadora de Potencias y Raíces',
  'Калькулятор решения уравнений': 'Calculadora de Ecuaciones',
  'Калькулятор статистики': 'Calculadora de Estadísticas',
  'Конвертер единиц измерения': 'Convertidor de Unidades',
  'Калькулятор калорий': 'Calculadora de Calorías',
  'Калькулятор макронутриентов': 'Calculadora de Macronutrientes',
  'Калькулятор веса бумаги': 'Calculadora de Peso de Papel',
  'Калькулятор НДС': 'Calculadora de IVA',
  'Калькулятор возраста': 'Calculadora de Edad',
  'Калькулятор водопроводных труб': 'Calculadora de Tuberías de Agua',
  
  // Common descriptions
  'Рассчитать ежемесячные платежи': 'Calcular pagos mensuales',
  'общую сумму выплат': 'suma total de pagos',
  'детальный график платежей': 'cronograma detallado de pagos',
  'для покупки автомобиля': 'para compra de automóvil',
  'для любых нужд': 'para cualquier necesidad',
  'без залога': 'sin garantía',
  'с подтверждением дохода': 'con confirmación de ingresos',
  'с поручителем': 'con aval',
  'с первоначальным взносом': 'con pago inicial',
  
  // Form fields
  'Сумма кредита': 'Cantidad del préstamo',
  'Первоначальный взнос': 'Pago inicial',
  'Срок (лет)': 'Plazo (años)',
  'Срок (месяцев)': 'Plazo (meses)',
  'Процентная ставка': 'Tasa de interés',
  'Дополнительный платёж': 'Pago adicional',
  'Схема погашения': 'Esquema de pago',
  'Аннуитетные платежи': 'Pagos de anualidad',
  'Дифференцированные платежи': 'Pagos diferenciados',
  'Рассчитать': 'Calcular',
  'необязательно': 'opcional',
  
  // Results
  'Результаты расчёта': 'Resultados del cálculo',
  'Ежемесячный платёж': 'Pago mensual',
  'Общая сумма выплат': 'Suma total de pagos',
  'Переплата': 'Sobrepago',
  'Скачать график': 'Descargar cronograma',
  'График платежей': 'Cronograma de pagos',
  
  // SEO content
  'О калькуляторе': 'Sobre la calculadora',
  'Как рассчитывается': 'Cómo se calcula',
  'Преимущества': 'Ventajas',
  'Требования': 'Requisitos',
  'Советы': 'Consejos',
  'Часто задаваемые вопросы': 'Preguntas frecuentes',
  'Примеры расчёта': 'Ejemplos de cálculo',
  'Точность': 'Precisión',
  'Скорость': 'Velocidad',
  'Безопасность': 'Seguridad',
  'Гибкость': 'Flexibilidad'
};

// Quality German translations for common Russian terms
const germanTranslations = {
  // Calculator titles
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
  
  // Common descriptions
  'Рассчитать ежемесячные платежи': 'Monatliche Zahlungen berechnen',
  'общую сумму выплат': 'Gesamtsumme der Zahlungen',
  'детальный график платежей': 'detaillierter Zahlungsplan',
  'для покупки автомобиля': 'für Autokauf',
  'для любых нужд': 'für jeden Bedarf',
  'без залога': 'ohne Sicherheiten',
  'с подтверждением дохода': 'mit Einkommensnachweis',
  'с поручителем': 'mit Bürgen',
  'с первоначальным взносом': 'mit Anzahlung',
  
  // Form fields
  'Сумма кредита': 'Kreditbetrag',
  'Первоначальный взнос': 'Anzahlung',
  'Срок (лет)': 'Laufzeit (Jahre)',
  'Срок (месяцев)': 'Laufzeit (Monate)',
  'Процентная ставка': 'Zinssatz',
  'Дополнительный платёж': 'Zusätzliche Zahlung',
  'Схема погашения': 'Tilgungsschema',
  'Аннуитетные платежи': 'Annuitätenzahlungen',
  'Дифференцированные платежи': 'Differenzierte Zahlungen',
  'Рассчитать': 'Berechnen',
  'необязательно': 'optional',
  
  // Results
  'Результаты расчёта': 'Berechnungsergebnisse',
  'Ежемесячный платёж': 'Monatliche Zahlung',
  'Общая сумма выплат': 'Gesamtsumme der Zahlungen',
  'Переплата': 'Überzahlung',
  'Скачать график': 'Zahlungsplan herunterladen',
  'График платежей': 'Zahlungsplan',
  
  // SEO content
  'О калькуляторе': 'Über den Rechner',
  'Как рассчитывается': 'Wie wird berechnet',
  'Преимущества': 'Vorteile',
  'Требования': 'Anforderungen',
  'Советы': 'Tipps',
  'Часто задаваемые вопросы': 'Häufig gestellte Fragen',
  'Примеры расчёта': 'Berechnungsbeispiele',
  'Точность': 'Genauigkeit',
  'Скорость': 'Geschwindigkeit',
  'Безопасность': 'Sicherheit',
  'Гибкость': 'Flexibilität'
};

// Function to translate Russian text to Spanish
function translateToSpanish(obj, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (/[а-яё]/i.test(value)) {
        // Try to find exact match first
        if (spanishTranslations[value]) {
          obj[key] = spanishTranslations[value];
        } else {
          // Try partial matches
          let translated = value;
          for (const [russian, spanish] of Object.entries(spanishTranslations)) {
            if (value.includes(russian)) {
              translated = translated.replace(new RegExp(russian, 'g'), spanish);
            }
          }
          obj[key] = translated;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      translateToSpanish(value, path ? `${path}.${key}` : key);
    }
  }
}

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

// Translate Spanish file
console.log('Translating Spanish file...');
translateToSpanish(esData.calculators);

// Translate German file
console.log('Translating German file...');
translateToGerman(deData.calculators);

// Write updated files
fs.writeFileSync('messages/es.json', JSON.stringify(esData, null, 2), 'utf8');
fs.writeFileSync('messages/de.json', JSON.stringify(deData, null, 2), 'utf8');

console.log('Quality translation completed!');
console.log('Spanish and German files updated with quality translations.');
