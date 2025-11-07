#!/usr/bin/env node

/**
 * Script to translate alimony calculator from Russian to English
 * Reads Russian file as source and updates English file with translations
 */

const fs = require('fs')
const path = require('path')

// Translation map for alimony calculator
const translations = {
	// Basic fields
	'Калькулятор алиментов': 'Alimony Calculator',
	'Расчёт алиментов на детей в процентах от дохода или фиксированной сумме': 'Calculate child support as percentage of income or fixed amount',
	'Финансы': 'Finance',
	'Параметры расчёта': 'Calculation Parameters',
	'Способ расчёта': 'Calculation Method',
	'Количество детей': 'Number of Children',
	'Ежемесячный доход (₽)': 'Monthly Income ($)',
	'Фиксированная сумма (₽)': 'Fixed Amount ($)',
	'Прожиточный минимум (₽)': 'Living Wage ($)',
	'Кратность прожиточному минимуму': 'Multiplier of Living Wage',
	'Дополнительные расходы (₽)': 'Additional Expenses ($)',
	'Рассчитать': 'Calculate',
	'Сбросить': 'Reset',
	'Ошибки в данных': 'Data Errors',
	'Укажите количество детей': 'Please specify number of children',
	'Количество детей должно быть от 1 до 10': 'Number of children must be from 1 to 10',
	'Укажите доход': 'Please specify income',
	'Доход должен быть больше 0': 'Income must be greater than 0',
	'Укажите фиксированную сумму': 'Please specify fixed amount',
	'Фиксированная сумма должна быть больше 0': 'Fixed amount must be greater than 0',
	'Укажите прожиточный минимум': 'Please specify living wage',
	'Прожиточный минимум должен быть больше 0': 'Living wage must be greater than 0',
	'Результаты расчёта': 'Calculation Results',
	'Ежемесячная сумма алиментов': 'Monthly Alimony Amount',
	'Годовая сумма алиментов': 'Annual Alimony Amount',
	'Процент от дохода': 'Percentage of Income',
	'Остаток дохода': 'Remaining Income',
	'На одного ребёнка': 'Per Child',
	'Всего': 'Total',
	'Введите параметры для расчёта': 'Enter parameters for calculation',
	'В процентах от дохода': 'As Percentage of Income',
	'По ст. 81 СК РФ': 'According to Art. 81 Family Code',
	'Фиксированная сумма': 'Fixed Amount',
	'По ст. 83 СК РФ': 'According to Art. 83 Family Code',
	'Смешанный вариант': 'Mixed Option',
	'Процент + фиксированная сумма': 'Percentage + Fixed Amount',
	'3 Способа расчёта': '3 Calculation Methods',
	'Точность расчёта': 'Calculation Accuracy',
	'По СК РФ': 'According to Family Code',
	'Расчёт в процентах от дохода': 'Calculation as Percentage of Income',
	'Расчёт фиксированной суммы': 'Fixed Amount Calculation',
	'Смешанный расчёт': 'Mixed Calculation',
	'Соответствие СК РФ': 'Compliance with Family Code',
	'Высокая точность расчётов': 'High Calculation Accuracy'
}

/**
 * Translate a string using the translation map
 */
function translate(text) {
	// Check direct match first
	if (translations[text]) {
		return translations[text]
	}
	
	// For complex strings, return as-is with warning
	console.warn(`No translation for: ${text.substring(0, 50)}...`)
	return text
}

console.log('Note: This script provides basic translations.')
console.log('For full SEO content translation, manual review is recommended.\n')








