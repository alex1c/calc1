const fs = require('fs');
const path = require('path');

// Read the Russian file as the source of truth
const ruFile = JSON.parse(fs.readFileSync('messages/ru.json', 'utf8'));

// Function to translate text from Russian to German
function translateToGerman(text) {
    const translations = {
        // Common translations
        'Поиск': 'Suchen',
        'Язык': 'Sprache',
        'Категории': 'Kategorien',
        'Калькуляторы': 'Rechner',
        'Рассчитать': 'Berechnen',
        'Результат': 'Ergebnis',
        'Очистить': 'Löschen',
        'Избранное': 'Favoriten',
        
        // PDF section
        'calc1.ru калькулятор #1 в мире': 'calc1.ru Rechner #1 in der Welt',
        'Сохранить в PDF': 'Als PDF speichern',
        'Сгенерировано': 'Generiert',
        'Страница': 'Seite',
        'из': 'von',
        
        // Brand
        'Калькулятор #1': 'Rechner #1',
        'Один сайт. Все калькуляторы.': 'Eine Seite. Alle Rechner.',
        
        // Breadcrumbs
        'Главная': 'Startseite',
        'Все калькуляторы': 'Alle Rechner',
        
        // Navigation
        'Финансы': 'Finanzen',
        'Авто': 'Auto',
        'Строительство': 'Bauwesen',
        'Здоровье': 'Gesundheit',
        'Жизнь': 'Leben',
        'Время': 'Zeit',
        'Наука': 'Wissenschaft',
        'IT': 'IT',
        'Конвертер': 'Konverter',
        'Развлечения': 'Unterhaltung',
        'Математика': 'Mathematik',
        
        // Math basic
        'Калькулятор простых операций': 'Rechner für Grundoperationen',
        'Онлайн калькулятор для сложения, вычитания, умножения и деления.': 'Online-Rechner für Addition, Subtraktion, Multiplikation und Division.',
        'Первое число': 'Erste Zahl',
        'Второе число': 'Zweite Zahl',
        'Операция': 'Operation',
        'Деление на ноль невозможно': 'Division durch Null ist nicht möglich',
        'Онлайн калькулятор простых математических операций': 'Online-Rechner für einfache mathematische Operationen',
        'Быстрый калькулятор для базовых вычислений: сложение, вычитание, умножение и деление. Поддержка 4 языков.': 'Schneller Rechner für Grundrechnungen: Addition, Subtraktion, Multiplikation und Division. Unterstützung für 4 Sprachen.',
        'Сложение (+)': 'Addition (+)',
        'Вычитание (−)': 'Subtraktion (−)',
        'Умножение (×)': 'Multiplikation (×)',
        'Деление (÷)': 'Division (÷)',
        'О калькуляторе простых операций': 'Über den Rechner für Grundoperationen',
        'Онлайн калькулятор простых математических операций поможет быстро выполнить базовые вычисления: сложение, вычитание, умножение и деление. Удобен для студентов, бухгалтеров и всех, кому нужно посчитать прямо в браузере. Доступен на английском, немецком, испанском и русском языках.': 'Der Online-Rechner für einfache mathematische Operationen hilft dabei, Grundrechnungen schnell durchzuführen: Addition, Subtraktion, Multiplikation und Division. Nützlich für Studenten, Buchhalter und alle, die direkt im Browser rechnen müssen. Verfügbar auf Englisch, Deutsch, Spanisch und Russisch.',
        'Возможности калькулятора': 'Funktionen des Rechners',
        'Поддержка ввода с клавиатуры': 'Tastatureingabe-Unterstützung',
        'Клавиша Enter для быстрого расчета': 'Enter-Taste für schnelle Berechnung',
        'Автоматическое форматирование результата': 'Automatische Ergebnisformatierung',
        'Защита от деления на ноль': 'Schutz vor Division durch Null',
        'Многоязычный интерфейс': 'Mehrsprachige Benutzeroberfläche',
        'Адаптивный дизайн для мобильных устройств': 'Responsive Design für mobile Geräte'
    };
    
    return translations[text] || text;
}

// Function to translate text from Russian to Spanish
function translateToSpanish(text) {
    const translations = {
        // Common translations
        'Поиск': 'Buscar',
        'Язык': 'Idioma',
        'Категории': 'Categorías',
        'Калькуляторы': 'Calculadoras',
        'Рассчитать': 'Calcular',
        'Результат': 'Resultado',
        'Очистить': 'Limpiar',
        'Избранное': 'Favoritos',
        
        // PDF section
        'calc1.ru калькулятор #1 в мире': 'calc1.ru calculadora #1 en el mundo',
        'Сохранить в PDF': 'Guardar como PDF',
        'Сгенерировано': 'Generado',
        'Страница': 'Página',
        'из': 'de',
        
        // Brand
        'Калькулятор #1': 'Calculadora #1',
        'Один сайт. Все калькуляторы.': 'Un sitio. Todas las calculadoras.',
        
        // Breadcrumbs
        'Главная': 'Inicio',
        'Все калькуляторы': 'Todas las calculadoras',
        
        // Navigation
        'Финансы': 'Finanzas',
        'Авто': 'Auto',
        'Строительство': 'Construcción',
        'Здоровье': 'Salud',
        'Жизнь': 'Vida',
        'Время': 'Tiempo',
        'Наука': 'Ciencia',
        'IT': 'IT',
        'Конвертер': 'Convertidor',
        'Развлечения': 'Entretenimiento',
        'Математика': 'Matemáticas',
        
        // Math basic
        'Калькулятор простых операций': 'Calculadora de operaciones básicas',
        'Онлайн калькулятор для сложения, вычитания, умножения и деления.': 'Calculadora online para suma, resta, multiplicación y división.',
        'Первое число': 'Primer número',
        'Второе число': 'Segundo número',
        'Операция': 'Operación',
        'Деление на ноль невозможно': 'La división por cero no es posible',
        'Онлайн калькулятор простых математических операций': 'Calculadora online de operaciones matemáticas simples',
        'Быстрый калькулятор для базовых вычислений: сложение, вычитание, умножение и деление. Поддержка 4 языков.': 'Calculadora rápida para cálculos básicos: suma, resta, multiplicación y división. Soporte para 4 idiomas.',
        'Сложение (+)': 'Suma (+)',
        'Вычитание (−)': 'Resta (−)',
        'Умножение (×)': 'Multiplicación (×)',
        'Деление (÷)': 'División (÷)',
        'О калькуляторе простых операций': 'Sobre la calculadora de operaciones básicas',
        'Онлайн калькулятор простых математических операций поможет быстро выполнить базовые вычисления: сложение, вычитание, умножение и деление. Удобен для студентов, бухгалтеров и всех, кому нужно посчитать прямо в браузере. Доступен на английском, немецком, испанском и русском языках.': 'La calculadora online de operaciones matemáticas simples te ayudará a realizar cálculos básicos rápidamente: suma, resta, multiplicación y división. Útil para estudiantes, contadores y todos los que necesitan calcular directamente en el navegador. Disponible en inglés, alemán, español y ruso.',
        'Возможности калькулятора': 'Características de la calculadora',
        'Поддержка ввода с клавиатуры': 'Soporte de entrada por teclado',
        'Клавиша Enter для быстрого расчета': 'Tecla Enter para cálculo rápido',
        'Автоматическое форматирование результата': 'Formateo automático del resultado',
        'Защита от деления на ноль': 'Protección contra división por cero',
        'Многоязычный интерфейс': 'Interfaz multilingüe',
        'Адаптивный дизайн для мобильных устройств': 'Diseño responsivo para dispositivos móviles'
    };
    
    return translations[text] || text;
}

// Function to translate text from Russian to English (for reference)
function translateToEnglish(text) {
    const translations = {
        'Поиск': 'Search',
        'Язык': 'Language',
        'Категории': 'Categories',
        'Калькуляторы': 'Calculators',
        'Рассчитать': 'Calculate',
        'Результат': 'Result',
        'Очистить': 'Clear',
        'Избранное': 'Favorites',
        'calc1.ru калькулятор #1 в мире': 'calc1.ru calculator #1 in the world',
        'Сохранить в PDF': 'Save as PDF',
        'Сгенерировано': 'Generated',
        'Страница': 'Page',
        'из': 'of',
        'Калькулятор #1': 'Calculator #1',
        'Один сайт. Все калькуляторы.': 'One site. All calculators.',
        'Главная': 'Home',
        'Все калькуляторы': 'All calculators',
        'Финансы': 'Finance',
        'Авто': 'Auto',
        'Строительство': 'Construction',
        'Здоровье': 'Health',
        'Жизнь': 'Life',
        'Время': 'Time',
        'Наука': 'Science',
        'IT': 'IT',
        'Конвертер': 'Converter',
        'Развлечения': 'Entertainment',
        'Математика': 'Mathematics'
    };
    
    return translations[text] || text;
}

// Function to recursively translate an object
function translateObject(obj, translateFunction) {
    if (typeof obj === 'string') {
        return translateFunction(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(item => translateObject(item, translateFunction));
    } else if (obj && typeof obj === 'object') {
        const translated = {};
        for (const [key, value] of Object.entries(obj)) {
            translated[key] = translateObject(value, translateFunction);
        }
        return translated;
    }
    return obj;
}

// Function to completely rebuild a translation file based on Russian structure
function rebuildTranslationFile(source, translateFunction) {
    return translateObject(source, translateFunction);
}

// Function to check if JSON is valid
function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

// Function to safely write JSON file
function writeJSONFile(filename, data) {
    const jsonString = JSON.stringify(data, null, 2);
    
    // Validate JSON before writing
    if (!isValidJSON(jsonString)) {
        console.error(`Invalid JSON generated for ${filename}`);
        return false;
    }
    
    try {
        fs.writeFileSync(filename, jsonString, 'utf8');
        console.log(`Successfully wrote ${filename}`);
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error.message);
        return false;
    }
}

// Main restoration process
console.log('Starting translation restoration process...');

// Get all sections from Russian file
const ruSections = Object.keys(ruFile);
console.log('Russian file sections:', ruSections);

// Restore German translations
console.log('\nRestoring German translations...');
const deFile = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const restoredDe = rebuildTranslationFile(ruFile, translateToGerman);

if (writeJSONFile('messages/de.json', restoredDe)) {
    console.log('German translations restored successfully!');
} else {
    console.error('Failed to restore German translations');
}

// Restore Spanish translations
console.log('\nRestoring Spanish translations...');
const esFile = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));
const restoredEs = rebuildTranslationFile(ruFile, translateToSpanish);

if (writeJSONFile('messages/es.json', restoredEs)) {
    console.log('Spanish translations restored successfully!');
} else {
    console.error('Failed to restore Spanish translations');
}

// Verify the restored files
console.log('\nVerifying restored files...');

// Check German file
try {
    const deCheck = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
    const deSections = Object.keys(deCheck);
    console.log('German file sections:', deSections);
    
    if (deSections.length === ruSections.length) {
        console.log('✅ German file has all required sections');
    } else {
        console.log('❌ German file is missing sections');
    }
} catch (error) {
    console.error('❌ German file is corrupted:', error.message);
}

// Check Spanish file
try {
    const esCheck = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));
    const esSections = Object.keys(esCheck);
    console.log('Spanish file sections:', esSections);
    
    if (esSections.length === ruSections.length) {
        console.log('✅ Spanish file has all required sections');
    } else {
        console.log('❌ Spanish file is missing sections');
    }
} catch (error) {
    console.error('❌ Spanish file is corrupted:', error.message);
}

console.log('\nTranslation restoration process completed!');

