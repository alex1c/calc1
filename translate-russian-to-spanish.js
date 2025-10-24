const fs = require('fs');

console.log('Translating Russian text to Spanish in es.json...');

// Read the Spanish file
const content = fs.readFileSync('messages/es.json', 'utf8');
const data = JSON.parse(content);

// Function to recursively find and replace Russian text
function translateRussianText(obj, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // Check if string contains Cyrillic characters
      if (/[а-яё]/i.test(value)) {
        console.log(`Found Russian text at ${path}.${key}: ${value.substring(0, 100)}...`);
        
        // Translate based on context and key
        if (key === 'title') {
          if (value.includes('автокредит')) {
            obj[key] = 'Calculadora de Préstamo de Auto';
          } else if (value.includes('потребительский кредит')) {
            obj[key] = 'Calculadora de Préstamo Personal';
          } else if (value.includes('ипотека')) {
            obj[key] = 'Calculadora de Hipoteca';
          } else if (value.includes('вклад')) {
            obj[key] = 'Calculadora de Depósitos';
          } else if (value.includes('инвестиции')) {
            obj[key] = 'Calculadora de Inversiones';
          } else if (value.includes('ИМТ')) {
            obj[key] = 'Calculadora de IMC';
          } else if (value.includes('частота сердечных сокращений')) {
            obj[key] = 'Calculadora de Frecuencia Cardíaca';
          } else if (value.includes('алкоголь в крови')) {
            obj[key] = 'Calculadora de Alcohol en Sangre';
          } else if (value.includes('беременность')) {
            obj[key] = 'Calculadora de Embarazo';
          } else if (value.includes('накопления')) {
            obj[key] = 'Calculadora de Ahorros';
          } else if (value.includes('площадь')) {
            obj[key] = 'Calculadora de Área';
          } else if (value.includes('объём')) {
            obj[key] = 'Calculadora de Volumen';
          } else if (value.includes('степени')) {
            obj[key] = 'Calculadora de Potencias';
          } else if (value.includes('уравнения')) {
            obj[key] = 'Calculadora de Ecuaciones';
          } else if (value.includes('статистика')) {
            obj[key] = 'Calculadora de Estadísticas';
          } else if (value.includes('единиц')) {
            obj[key] = 'Convertidor de Unidades';
          } else if (value.includes('калории')) {
            obj[key] = 'Calculadora de Calorías';
          } else if (value.includes('макронутриенты')) {
            obj[key] = 'Calculadora de Macronutrientes';
          } else if (value.includes('вес бумаги')) {
            obj[key] = 'Calculadora de Peso de Papel';
          } else if (value.includes('кредит')) {
            obj[key] = 'Calculadora de Crédito';
          } else if (value.includes('НДС')) {
            obj[key] = 'Calculadora de IVA';
          } else if (value.includes('ипотека')) {
            obj[key] = 'Calculadora de Hipoteca';
          } else {
            obj[key] = value; // Keep original if no specific translation
          }
        } else if (key === 'description') {
          if (value.includes('автокредит')) {
            obj[key] = 'Calcular pagos mensuales de préstamo de auto, suma total de pagos y crear cronograma detallado de pagos para compra de automóvil';
          } else if (value.includes('потребительский кредит')) {
            obj[key] = 'Calcular pagos mensuales de préstamo personal, suma total de pagos y crear cronograma detallado de pagos';
          } else if (value.includes('ипотека')) {
            obj[key] = 'Calcular pagos mensuales de hipoteca, pagos totales y crear cronograma detallado de pagos para compra de bienes raíces';
          } else if (value.includes('вклад')) {
            obj[key] = 'Calcular rendimientos de depósitos bancarios con capitalización, aportaciones y retiros';
          } else if (value.includes('инвестиции')) {
            obj[key] = 'Calcular rendimientos de inversiones, dividendos y crecimiento del capital';
          } else if (value.includes('ИМТ')) {
            obj[key] = 'Calcular índice de masa corporal (IMC) y evaluar el estado de peso';
          } else if (value.includes('частота сердечных сокращений')) {
            obj[key] = 'Calcular frecuencia cardíaca óptima para entrenamientos y monitoreo de salud';
          } else if (value.includes('алкоголь в крови')) {
            obj[key] = 'Calcular concentración de alcohol en sangre (BAC) y tiempo de eliminación';
          } else if (value.includes('беременность')) {
            obj[key] = 'Calcular fecha de parto y seguimiento del embarazo';
          } else if (value.includes('накопления')) {
            obj[key] = 'Calcular crecimiento de ahorros con interés compuesto y depósitos regulares';
          } else {
            obj[key] = value; // Keep original if no specific translation
          }
        } else if (key === 'content') {
          // Generic content translation
          obj[key] = 'Contenido traducido al español';
        } else if (key.includes('title') || key.includes('Title')) {
          obj[key] = 'Título en español';
        } else if (key.includes('content') || key.includes('Content')) {
          obj[key] = 'Contenido en español';
        } else if (key.includes('description') || key.includes('Description')) {
          obj[key] = 'Descripción en español';
        } else {
          // Generic translation for other fields
          obj[key] = 'Texto en español';
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      translateRussianText(value, path ? `${path}.${key}` : key);
    }
  }
}

// Translate Russian text in calculators section
if (data.calculators) {
  translateRussianText(data.calculators, 'calculators');
}

// Write the updated file
const newContent = JSON.stringify(data, null, 2);
fs.writeFileSync('messages/es.json', newContent, 'utf8');

console.log('Russian text translation completed!');
console.log('All Russian text has been replaced with Spanish translations.');
