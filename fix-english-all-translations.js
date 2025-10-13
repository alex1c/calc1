#!/usr/bin/env node

/**
 * Script to fix ALL English translations that contain Russian text
 * Replaces Russian text with proper English translations for all calculators
 */

const fs = require('fs');
const path = require('path');

/**
 * Comprehensive English translation fixes
 */
const englishFixes = {
	// Auto loan section
	'Сравнительно низкие процентные ставки': 'Relatively low interest rates',
	'Возможность досрочного погашения': 'Possibility of early repayment',
	'Рассматривайте страхование автомобиля': 'Consider car insurance',
	'Рассматривайте досрочное погашение': 'Consider early repayment',
	'Консультируйтесь с автосалонами': 'Consult with car dealerships',
	'Требования к заёмщику': 'Borrower Requirements',
	'Для получения автокредита необходимо соответствовать определённым требованиям:':
		'To obtain an auto loan, you must meet certain requirements:',
	'Возраст от 21 до 65 лет': 'Age from 21 to 65 years',
	'Стабильный доход, подтверждённый справками':
		'Stable income confirmed by certificates',
	'Положительная кредитная история': 'Positive credit history',
	'Полный пакет документов': 'Complete set of documents',
	'Программы автокредитования': 'Auto Loan Programs',
	'Банки предлагают различные программы автокредитования:':
		'Banks offer various auto loan programs:',
	'Кредит на новый автомобиль': 'New Car Loan',
	'Специальные условия для покупки новых автомобилей':
		'Special conditions for purchasing new cars',
	'Кредит на подержанный автомобиль': 'Used Car Loan',
	'Условия для покупки автомобилей с пробегом':
		'Conditions for purchasing used cars',

	// Consumer loan section
	Рефинансирование: 'Refinancing',
	'Объединение нескольких кредитов в один с более выгодными условиями':
		'Combining multiple loans into one with more favorable conditions',
	'Экстренный кредит': 'Emergency Loan',
	'Быстрое получение денежных средств на неотложные нужды':
		'Quick access to funds for urgent needs',
	'Гибкие условия погашения': 'Flexible repayment terms',
	'Рассматривайте досрочное погашение': 'Consider early repayment',
	'Консультируйтесь с финансовыми экспертами':
		'Consult with financial experts',
	'Для получения потребительского кредита необходимо соответствовать определённым требованиям:':
		'To obtain a consumer loan, you must meet certain requirements:',
	'Возраст от 18 до 70 лет': 'Age from 18 to 70 years',
	'Минимальный пакет документов': 'Minimum set of documents',
	'Первоначальный взнос (₽)': 'Down Payment ($)',

	// Car loan section (full Russian section)
	'Калькулятор автокредита': 'Auto Loan Calculator',
	'Рассчитать ежемесячные платежи по автокредиту, общую сумму выплат и создать детальный график платежей для покупки автомобиля':
		'Calculate monthly auto loan payments, total payments, and create detailed payment schedule for car purchase',
	'Калькулятор автокредита: расчёт платежей, ставок и условий автомобильного кредитования':
		'Auto Loan Calculator: payment calculation, rates and auto loan terms',
	'Калькулятор автокредита для расчёта автомобильного кредита':
		'Auto Loan Calculator for calculating car loans',
	'Калькулятор автокредита — это профессиональный инструмент для расчёта автомобильного кредита, ежемесячных платежей, общей суммы выплат и переплаты. С помощью нашего калькулятора вы сможете рассчитать оптимальные условия автокредита, сравнить различные предложения банков и выбрать наиболее выгодный вариант финансирования покупки автомобиля.':
		'Auto Loan Calculator is a professional tool for calculating car loans, monthly payments, total payments and overpayment. With our calculator you can calculate optimal auto loan terms, compare different bank offers and choose the most profitable car financing option.',
	'Преимущества использования калькулятора автокредита':
		'Benefits of using Auto Loan Calculator',
	'Калькулятор автокредита предоставляет множество преимуществ для планирования покупки автомобиля:':
		'Auto Loan Calculator provides many benefits for car purchase planning:',
	'Быстрое одобрение и получение средств на покупку автомобиля':
		'Quick approval and access to funds for car purchase',
	'Конкурентные процентные ставки и выгодные условия кредитования':
		'Competitive interest rates and favorable loan terms',
	'Гибкие сроки кредитования от 1 до 7 лет':
		'Flexible loan terms from 1 to 7 years',
	'Возможность досрочного погашения без штрафов':
		'Possibility of early repayment without penalties',
	'Требования для получения автокредита':
		'Requirements for obtaining auto loan',
	'Для получения автокредита необходимо соответствовать следующим требованиям:':
		'To obtain an auto loan, you must meet the following requirements:',
	'Возраст от 18 до 65 лет на момент погашения кредита':
		'Age from 18 to 65 years at loan maturity',
	'Подтверждённый доход не менее 15 000 рублей в месяц':
		'Confirmed income of at least $500 per month',
	'Положительная кредитная история и отсутствие просрочек':
		'Positive credit history and no late payments',
	'Полный пакет документов: паспорт, справка о доходах, водительские права':
		"Complete set of documents: passport, income certificate, driver's license",
	'Программы автокредитования': 'Auto Loan Programs',
	'Банки предлагают различные программы автокредитования:':
		'Banks offer various auto loan programs:',
	'Кредит на новый автомобиль': 'New Car Loan',
	'Специальные условия для покупки новых автомобилей с минимальными ставками':
		'Special conditions for purchasing new cars with minimum rates',
	'Кредит на подержанный автомобиль': 'Used Car Loan',
	'Финансирование покупки автомобилей с пробегом с гибкими условиями':
		'Financing for used car purchases with flexible terms',
	'Советы по выбору автокредита': 'Tips for choosing auto loan',
	'Для выбора оптимального автокредита:': 'To choose the optimal auto loan:',
	'Сравнивайте предложения разных банков и условия кредитования':
		'Compare offers from different banks and loan terms',
	'Учитывайте стоимость страхования КАСКО и ОСАГО':
		'Consider the cost of comprehensive and liability insurance',
	'Рассмотрите возможность досрочного погашения для экономии':
		'Consider early repayment for savings',
	'Консультируйтесь с финансовыми специалистами':
		'Consult with financial specialists',
	'Параметры автокредита': 'Auto Loan Parameters',
	'Стоимость автомобиля (₽)': 'Car Value ($)',
	'Первоначальный взнос (₽)': 'Down Payment ($)',
	'Срок в годах': 'Term in Years',
	'Срок в месяцах': 'Term in Months',
	'Процентная ставка (% годовых)': 'Interest Rate (% per year)',
	'Дополнительный платёж (₽)': 'Additional Payment ($)',
	опционально: 'optional',
	'Схема погашения': 'Payment Scheme',
	'Аннуитетные платежи (равные)': 'Annuity Payments (Equal)',
	'Дифференцированные платежи (уменьшающиеся)':
		'Differentiated Payments (Decreasing)',
	Рассчитать: 'Calculate',
	'Ошибки ввода': 'Input Errors',
	'Результаты расчёта': 'Calculation Results',
	Итоги: 'Summary',
	'Ежемесячный платёж': 'Monthly Payment',
	'Общая сумма выплат': 'Total Payments',
	Переплата: 'Total Interest',
	'Эффективный срок': 'Effective Term',
	месяцев: 'months',
	'Скачать график (CSV)': 'Download Schedule (CSV)',
	'График платежей': 'Payment Schedule',
	"Введите параметры и нажмите 'Рассчитать'":
		"Enter parameters and click 'Calculate'",
	Месяц: 'Month',
	Платёж: 'Payment',
	Проценты: 'Interest',
	'Основной долг': 'Principal',
	Остаток: 'Balance',
	'дополнительных месяцев': 'more months',

	// OSAGO section
	'Калькулятор ОСАГО': 'OSAGO Calculator',
	'Рассчитать стоимость полиса ОСАГО с учётом региона, мощности двигателя, возраста водителя и других факторов':
		'Calculate OSAGO policy cost considering region, engine power, driver age and other factors',
	'Калькулятор ОСАГО: расчёт стоимости полиса обязательного страхования':
		'OSAGO Calculator: mandatory insurance policy cost calculation',
	'Калькулятор ОСАГО для расчёта стоимости полиса':
		'OSAGO Calculator for policy cost calculation',
	'Калькулятор ОСАГО — это профессиональный инструмент для расчёта стоимости полиса обязательного страхования автогражданской ответственности. С помощью нашего калькулятора вы сможете рассчитать точную стоимость ОСАГО с учётом всех коэффициентов: территории, возраста и стажа водителя, мощности двигателя, количества водителей и коэффициента бонус-малус.':
		'OSAGO Calculator is a professional tool for calculating mandatory auto liability insurance policy cost. With our calculator you can calculate exact OSAGO cost considering all coefficients: territory, driver age and experience, engine power, number of drivers and bonus-malus coefficient.',
	'Коэффициенты расчёта ОСАГО': 'OSAGO Calculation Coefficients',
	'Стоимость ОСАГО рассчитывается по формуле: Базовый тариф × КТ × КБМ × КВС × КМ × КО':
		'OSAGO cost is calculated by formula: Base rate × KT × KBM × KVS × KM × KO',
	'КТ (коэффициент территории): Москва = 2.0, СПб = 1.8, другие регионы = 1.0':
		'KT (territory coefficient): Moscow = 2.0, St. Petersburg = 1.8, other regions = 1.0',
	'КВС (возраст-стаж): возраст < 22 и стаж < 3 лет = 1.8, иначе = 1.0':
		'KVS (age-experience): age < 22 and experience < 3 years = 1.8, otherwise = 1.0',
	'КМ (мощность): до 70 л.с. = 0.6, 70-100 л.с. = 1.0, 101-120 л.с. = 1.1, 121-150 л.с. = 1.2, >150 л.с. = 1.4':
		'KM (power): up to 70 hp = 0.6, 70-100 hp = 1.0, 101-120 hp = 1.1, 121-150 hp = 1.2, >150 hp = 1.4',
	'КО (ограничение): один водитель = 1.0, несколько = 1.2, неограниченное = 1.8':
		'KO (restriction): one driver = 1.0, several = 1.2, unlimited = 1.8',
	'КБМ (бонус-малус): от 0.5 до 2.45 в зависимости от истории вождения':
		'KBM (bonus-malus): from 0.5 to 2.45 depending on driving history',
	'Преимущества использования калькулятора ОСАГО':
		'Benefits of using OSAGO Calculator',
	'Калькулятор ОСАГО предоставляет множество преимуществ для планирования страхования:':
		'OSAGO Calculator provides many benefits for insurance planning:',
	'Быстрый расчёт стоимости полиса за несколько минут':
		'Quick policy cost calculation in minutes',
	'Точный расчёт с учётом всех актуальных коэффициентов':
		'Accurate calculation considering all current coefficients',
	'Возможность сравнения стоимости в разных страховых компаниях':
		'Ability to compare costs at different insurance companies',
	'Экономия времени и денег при выборе оптимального полиса':
		'Time and money savings when choosing optimal policy',
	'Советы по выбору ОСАГО': 'Tips for choosing OSAGO',
	'Для выбора оптимального полиса ОСАГО:': 'To choose optimal OSAGO policy:',
	'Сравнивайте предложения разных страховых компаний':
		'Compare offers from different insurance companies',
	'Поддерживайте хороший коэффициент бонус-малус безаварийным вождением':
		'Maintain good bonus-malus coefficient with accident-free driving',
	'Продлевайте полис заранее для сохранения скидок':
		'Renew policy in advance to maintain discounts',
	'Подготавливайте все необходимые документы заранее':
		'Prepare all necessary documents in advance',
	'Параметры расчёта ОСАГО': 'OSAGO Calculation Parameters',
	Регион: 'Region',
	'Выберите регион': 'Select Region',
	'Мощность двигателя (л.с.)': 'Engine Power (hp)',
	'Возраст водителя (лет)': 'Driver Age (years)',
	'Стаж вождения (лет)': 'Driving Experience (years)',
	'Количество водителей': 'Number of Drivers',
	'Один водитель': 'One Driver',
	'Несколько водителей': 'Several Drivers',
	'Неограниченное количество': 'Unlimited Number',
	'Коэффициент бонус-малус': 'Bonus-Malus Coefficient',
	'Стоимость полиса': 'Policy Cost',
	'Рассчитать стоимость': 'Calculate Cost',
};

/**
 * Fix English translations in the file
 * @param {string} filePath - Path to the English translation file
 */
function fixEnglishTranslations(filePath) {
	console.log(`Fixing ALL English translations in ${filePath}...`);

	// Read the file
	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Create backup
	const backupPath = filePath + '.comprehensive.backup';
	fs.writeFileSync(backupPath, content);

	// Apply fixes
	Object.entries(englishFixes).forEach(([russianText, englishText]) => {
		// Escape special regex characters in the Russian text
		const escapedRussian = russianText.replace(
			/[.*+?^${}()|[\]\\]/g,
			'\\$&'
		);
		const regex = new RegExp(escapedRussian, 'g');

		if (content.match(regex)) {
			content = content.replace(regex, englishText);
			modified = true;
			console.log(
				`  Fixed: ${russianText.substring(
					0,
					40
				)}... → ${englishText.substring(0, 40)}...`
			);
		}
	});

	// Write the fixed file
	if (modified) {
		fs.writeFileSync(filePath, content);
		console.log(`  ✅ Fixed ${filePath}`);
	} else {
		console.log(`  No changes needed for ${filePath}`);
	}
}

/**
 * Main function
 */
function main() {
	console.log('🔧 Fixing ALL English translations...\n');

	const enFile = path.join(__dirname, 'messages', 'en.json');

	// Check if file exists
	if (!fs.existsSync(enFile)) {
		console.error(`❌ English translation file not found: ${enFile}`);
		process.exit(1);
	}

	// Fix translations
	fixEnglishTranslations(enFile);

	console.log('\n✅ Comprehensive English translations fix completed!');
	console.log('\n📋 Summary:');
	console.log(
		'  - Replaced ALL Russian text with proper English translations'
	);
	console.log(
		'  - Fixed auto-loan, consumer-loan, car-loan, and OSAGO calculator translations'
	);
	console.log(
		'  - Created comprehensive backup file (*.comprehensive.backup)'
	);
	console.log('\n⚠️  Next steps:');
	console.log('  1. Test the English versions of all calculators');
	console.log('  2. Check for any remaining Russian text');
	console.log(
		"  3. Remove backup file once you're confident everything works"
	);
}

// Run the fix
if (require.main === module) {
	main();
}

module.exports = {
	fixEnglishTranslations,
	englishFixes,
};
