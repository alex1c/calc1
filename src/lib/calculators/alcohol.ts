/**
 * Алкогольный калькулятор - расчёт промилле и времени выведения алкоголя
 * Основан на формуле Видмарка
 */

export interface AlcoholInput {
	gender: 'male' | 'female';
	weight: number; // в кг
	volume: number; // в мл
	strength: number; // в %
	startTime?: Date; // время начала употребления
}

export interface AlcoholResult {
	bac: number; // промилле
	eliminationTime: number; // время выведения в часах
	state: string; // состояние
	stateLevel: number; // уровень состояния (0-6)
	isSafeToDrive: boolean; // можно ли водить
	warning: string; // предупреждение
}

export interface BACState {
	min: number;
	max: number;
	level: number;
	ru: string;
	en: string;
	de: string;
	es: string;
	color: string;
	description: string;
}

// Таблица состояний BAC
export const BAC_STATES: BACState[] = [
	{
		min: 0.0,
		max: 0.3,
		level: 0,
		ru: 'Трезвое состояние',
		en: 'Sober',
		de: 'Nüchtern',
		es: 'Sobrio',
		color: 'green',
		description: 'Полное отсутствие алкоголя в крови',
	},
	{
		min: 0.3,
		max: 0.5,
		level: 1,
		ru: 'Лёгкое расслабление',
		en: 'Slight relaxation',
		de: 'Leichte Entspannung',
		es: 'Ligera relajación',
		color: 'light-green',
		description: 'Минимальное воздействие алкоголя',
	},
	{
		min: 0.5,
		max: 1.0,
		level: 2,
		ru: 'Лёгкое опьянение',
		en: 'Mild intoxication',
		de: 'Leichte Trunkenheit',
		es: 'Embriaguez leve',
		color: 'yellow',
		description: 'Начальные признаки опьянения',
	},
	{
		min: 1.0,
		max: 2.0,
		level: 3,
		ru: 'Среднее опьянение',
		en: 'Moderate intoxication',
		de: 'Mittlere Trunkenheit',
		es: 'Embriaguez moderada',
		color: 'orange',
		description: 'Заметное нарушение координации',
	},
	{
		min: 2.0,
		max: 3.0,
		level: 4,
		ru: 'Сильное опьянение',
		en: 'Severe intoxication',
		de: 'Starke Trunkenheit',
		es: 'Embriaguez severa',
		color: 'red',
		description: 'Серьёзное нарушение функций',
	},
	{
		min: 3.0,
		max: 4.0,
		level: 5,
		ru: 'Тяжёлое отравление алкоголем',
		en: 'Alcohol poisoning',
		de: 'Alkoholvergiftung',
		es: 'Intoxicación grave',
		color: 'dark-red',
		description: 'Опасное для здоровья состояние',
	},
	{
		min: 4.0,
		max: Infinity,
		level: 6,
		ru: 'Опасное для жизни состояние',
		en: 'Life-threatening condition',
		de: 'Lebensgefährlicher Zustand',
		es: 'Condición peligrosa',
		color: 'purple',
		description: 'Критическое состояние, требуется медицинская помощь',
	},
];

/**
 * Расчёт концентрации алкоголя в крови по формуле Видмарка
 */
export function calculateBAC(input: AlcoholInput): number {
	const { gender, weight, volume, strength, startTime } = input;

	// Количество чистого спирта в граммах
	const alcoholGrams = ((volume * strength) / 100) * 0.789;

	// Коэффициент распределения (мужчины: 0.7, женщины: 0.6)
	const distributionRatio = gender === 'male' ? 0.7 : 0.6;

	// Масса тела в граммах
	const weightGrams = weight * 1000;

	// Формула Видмарка: BAC = (A / (r × W)) × 1000
	const initialBAC =
		(alcoholGrams / (distributionRatio * weightGrams)) * 1000;

	// Рассчитываем время, прошедшее с момента употребления
	const now = new Date();
	const timeElapsed =
		(now.getTime() - startTime.getTime()) / (1000 * 60 * 60); // в часах

	// Скорость выведения алкоголя: 0.15‰ в час
	const eliminationRate = 0.15;
	const eliminatedBAC = timeElapsed * eliminationRate;

	// Текущий уровень BAC с учетом времени
	const currentBAC = initialBAC - eliminatedBAC;

	return Math.max(0, currentBAC); // Не может быть отрицательным
}

/**
 * Расчёт времени выведения алкоголя
 * Скорость выведения: 0.15‰ в час
 */
export function calculateEliminationTime(bac: number): number {
	return bac / 0.15; // часы
}

/**
 * Определение состояния по уровню BAC
 */
export function getBACState(bac: number, locale: string = 'ru'): BACState {
	const state =
		BAC_STATES.find((s) => bac >= s.min && bac < s.max) ||
		BAC_STATES[BAC_STATES.length - 1];
	return state;
}

/**
 * Получение локализованного названия состояния
 */
export function getStateName(state: BACState, locale: string = 'ru'): string {
	switch (locale) {
		case 'en':
			return state.en;
		case 'de':
			return state.de;
		case 'es':
			return state.es;
		default:
			return state.ru;
	}
}

/**
 * Получение цвета для отображения состояния
 */
export function getStateColor(state: BACState): string {
	return state.color;
}

/**
 * Проверка, можно ли водить автомобиль
 * В большинстве стран лимит 0.5‰, в некоторых 0.0‰
 */
export function isSafeToDrive(bac: number, limit: number = 0.5): boolean {
	return bac <= limit;
}

/**
 * Получение предупреждения
 */
export function getWarning(bac: number, locale: string = 'ru'): string {
	const state = getBACState(bac, locale);

	if (state.level >= 5) {
		return '⚠️ КРИТИЧЕСКОЕ СОСТОЯНИЕ! Немедленно обратитесь за медицинской помощью!';
	}

	if (state.level >= 3) {
		return '🚫 НЕ САДИТЕСЬ ЗА РУЛЬ! Уровень алкоголя превышает допустимый лимит.';
	}

	if (state.level >= 1) {
		return '⚠️ Будьте осторожны! Алкоголь влияет на реакцию и координацию.';
	}

	return '✅ Уровень алкоголя в норме.';
}

/**
 * Основная функция расчёта
 */
export function calculateAlcohol(
	input: AlcoholInput,
	locale: string = 'ru'
): AlcoholResult {
	const bac = calculateBAC(input);
	const eliminationTime = calculateEliminationTime(bac);
	const state = getBACState(bac, locale);
	const stateName = getStateName(state, locale);
	const safeToDrive = isSafeToDrive(bac);
	const warning = getWarning(bac, locale);

	return {
		bac: Math.round(bac * 1000) / 1000, // Округляем до 3 знаков
		eliminationTime: Math.round(eliminationTime * 100) / 100, // Округляем до 2 знаков
		state: stateName,
		stateLevel: state.level,
		isSafeToDrive: safeToDrive,
		warning,
	};
}

/**
 * Форматирование времени
 */
export function formatTime(hours: number, locale: string = 'ru'): string {
	const wholeHours = Math.floor(hours);
	const minutes = Math.round((hours - wholeHours) * 60);

	if (locale === 'ru') {
		if (wholeHours === 0) {
			return `${minutes} мин`;
		}
		if (minutes === 0) {
			return `${wholeHours} ч`;
		}
		return `${wholeHours} ч ${minutes} мин`;
	}

	if (locale === 'en') {
		if (wholeHours === 0) {
			return `${minutes} min`;
		}
		if (minutes === 0) {
			return `${wholeHours} h`;
		}
		return `${wholeHours} h ${minutes} min`;
	}

	if (locale === 'de') {
		if (wholeHours === 0) {
			return `${minutes} Min`;
		}
		if (minutes === 0) {
			return `${wholeHours} Std`;
		}
		return `${wholeHours} Std ${minutes} Min`;
	}

	if (locale === 'es') {
		if (wholeHours === 0) {
			return `${minutes} min`;
		}
		if (minutes === 0) {
			return `${wholeHours} h`;
		}
		return `${wholeHours} h ${minutes} min`;
	}

	return `${wholeHours}h ${minutes}m`;
}

/**
 * Валидация входных данных
 */
export function validateAlcoholInput(input: AlcoholInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.gender) {
		errors.push('Пол не выбран');
	}

	if (!input.weight || input.weight <= 0) {
		errors.push('Вес должен быть больше 0');
	}

	if (input.weight > 300) {
		errors.push('Вес не может превышать 300 кг');
	}

	if (!input.volume || input.volume <= 0) {
		errors.push('Объём напитка должен быть больше 0');
	}

	if (input.volume > 10000) {
		errors.push('Объём напитка не может превышать 10 литров');
	}

	if (!input.strength || input.strength < 0) {
		errors.push('Крепость напитка должна быть неотрицательной');
	}

	if (input.strength > 100) {
		errors.push('Крепость напитка не может превышать 100%');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}
