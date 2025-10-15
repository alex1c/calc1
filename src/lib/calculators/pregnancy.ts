/**
 * Pregnancy Calculator Library
 * Calculates pregnancy duration, due date, and trimester information
 * Based on last menstrual period, conception date, or IVF date
 */

export interface PregnancyInput {
	method: 'lmp' | 'conception' | 'ivf';
	date: Date;
}

export interface PregnancyResult {
	dueDate: Date;
	currentWeek: number;
	currentDay: number;
	daysRemaining: number;
	trimester: number;
	dueDateRange: {
		earliest: Date;
		latest: Date;
	};
	conceptionDate?: Date;
	ivfDate?: Date;
}

export type CalculationMethod = 'lmp' | 'conception' | 'ivf';

/**
 * Calculate pregnancy information based on last menstrual period
 */
export function calculateFromLMP(lmpDate: Date): PregnancyResult {
	const today = new Date();

	// Due date is 40 weeks (280 days) from LMP
	const dueDate = new Date(lmpDate);
	dueDate.setDate(dueDate.getDate() + 280);

	// Current pregnancy duration
	const daysSinceLMP = Math.floor(
		(today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)
	);
	const currentWeek = Math.floor(daysSinceLMP / 7);
	const currentDay = daysSinceLMP % 7;

	// Days remaining until due date
	const daysRemaining = Math.floor(
		(dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);

	// Determine trimester
	const trimester = getTrimester(currentWeek);

	// Due date range (±7 days)
	const dueDateRange = {
		earliest: new Date(dueDate),
		latest: new Date(dueDate),
	};
	dueDateRange.earliest.setDate(dueDateRange.earliest.getDate() - 7);
	dueDateRange.latest.setDate(dueDateRange.latest.getDate() + 7);

	return {
		dueDate,
		currentWeek: Math.max(0, currentWeek),
		currentDay: Math.max(0, currentDay),
		daysRemaining: Math.max(0, daysRemaining),
		trimester,
		dueDateRange,
	};
}

/**
 * Calculate pregnancy information based on conception date
 */
export function calculateFromConception(conceptionDate: Date): PregnancyResult {
	const today = new Date();

	// Due date is 38 weeks (266 days) from conception
	const dueDate = new Date(conceptionDate);
	dueDate.setDate(dueDate.getDate() + 266);

	// Current pregnancy duration
	const daysSinceConception = Math.floor(
		(today.getTime() - conceptionDate.getTime()) / (1000 * 60 * 60 * 24)
	);
	const currentWeek = Math.floor(daysSinceConception / 7);
	const currentDay = daysSinceConception % 7;

	// Days remaining until due date
	const daysRemaining = Math.floor(
		(dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);

	// Determine trimester
	const trimester = getTrimester(currentWeek);

	// Due date range (±7 days)
	const dueDateRange = {
		earliest: new Date(dueDate),
		latest: new Date(dueDate),
	};
	dueDateRange.earliest.setDate(dueDateRange.earliest.getDate() - 7);
	dueDateRange.latest.setDate(dueDateRange.latest.getDate() + 7);

	return {
		dueDate,
		currentWeek: Math.max(0, currentWeek),
		currentDay: Math.max(0, currentDay),
		daysRemaining: Math.max(0, daysRemaining),
		trimester,
		dueDateRange,
		conceptionDate,
	};
}

/**
 * Calculate pregnancy information based on IVF date
 */
export function calculateFromIVF(ivfDate: Date): PregnancyResult {
	const today = new Date();

	// For IVF, due date is typically 38 weeks from transfer date
	// But we add 2 weeks to account for the "pregnancy age" calculation
	const dueDate = new Date(ivfDate);
	dueDate.setDate(dueDate.getDate() + 280); // Same as LMP method

	// Current pregnancy duration (add 2 weeks for IVF)
	const daysSinceIVF = Math.floor(
		(today.getTime() - ivfDate.getTime()) / (1000 * 60 * 60 * 24)
	);
	const adjustedDays = daysSinceIVF + 14; // Add 2 weeks
	const currentWeek = Math.floor(adjustedDays / 7);
	const currentDay = adjustedDays % 7;

	// Days remaining until due date
	const daysRemaining = Math.floor(
		(dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);

	// Determine trimester
	const trimester = getTrimester(currentWeek);

	// Due date range (±7 days)
	const dueDateRange = {
		earliest: new Date(dueDate),
		latest: new Date(dueDate),
	};
	dueDateRange.earliest.setDate(dueDateRange.earliest.getDate() - 7);
	dueDateRange.latest.setDate(dueDateRange.latest.getDate() + 7);

	return {
		dueDate,
		currentWeek: Math.max(0, currentWeek),
		currentDay: Math.max(0, currentDay),
		daysRemaining: Math.max(0, daysRemaining),
		trimester,
		dueDateRange,
		ivfDate,
	};
}

/**
 * Main function to calculate pregnancy information
 */
export function calculatePregnancy(input: PregnancyInput): PregnancyResult {
	// Validate input
	const validation = validatePregnancyInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	switch (input.method) {
		case 'lmp':
			return calculateFromLMP(input.date);
		case 'conception':
			return calculateFromConception(input.date);
		case 'ivf':
			return calculateFromIVF(input.date);
		default:
			throw new Error('Invalid calculation method');
	}
}

/**
 * Determine trimester based on current week
 */
export function getTrimester(week: number): number {
	if (week < 13) {
		return 1; // First trimester (0-12 weeks)
	} else if (week < 27) {
		return 2; // Second trimester (13-26 weeks)
	} else {
		return 3; // Third trimester (27+ weeks)
	}
}

/**
 * Get trimester description
 */
export function getTrimesterDescription(
	trimester: number,
	locale: string = 'ru'
): string {
	if (locale === 'ru') {
		const descriptions = {
			1: 'Первый триместр (0-12 недель)',
			2: 'Второй триместр (13-26 недель)',
			3: 'Третий триместр (27+ недель)',
		};
		return (
			descriptions[trimester as keyof typeof descriptions] || 'Неизвестно'
		);
	} else {
		const descriptions = {
			1: 'First Trimester (0-12 weeks)',
			2: 'Second Trimester (13-26 weeks)',
			3: 'Third Trimester (27+ weeks)',
		};
		return (
			descriptions[trimester as keyof typeof descriptions] || 'Unknown'
		);
	}
}

/**
 * Validate input parameters
 */
export function validatePregnancyInput(input: PregnancyInput): {
	isValid: boolean;
	error?: string;
} {
	if (!input.method || !['lmp', 'conception', 'ivf'].includes(input.method)) {
		return { isValid: false, error: 'Invalid calculation method' };
	}

	if (
		!input.date ||
		!(input.date instanceof Date) ||
		isNaN(input.date.getTime())
	) {
		return { isValid: false, error: 'Invalid date' };
	}

	const today = new Date();
	const maxDate = new Date(today);
	maxDate.setDate(maxDate.getDate() + 7); // Allow up to 7 days in the future

	if (input.date > maxDate) {
		return {
			isValid: false,
			error: 'Date cannot be more than 7 days in the future',
		};
	}

	// Check for reasonable past dates (not more than 2 years ago)
	const minDate = new Date(today);
	minDate.setFullYear(minDate.getFullYear() - 2);

	if (input.date < minDate) {
		return {
			isValid: false,
			error: 'Date cannot be more than 2 years in the past',
		};
	}

	return { isValid: true };
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale: string = 'ru-RU'): string {
	return date.toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

/**
 * Get method description
 */
export function getMethodDescription(method: CalculationMethod): string {
	const descriptions = {
		lmp: 'Based on last menstrual period (most common method)',
		conception: 'Based on known conception date',
		ivf: 'Based on IVF/embryo transfer date',
	};
	return descriptions[method];
}

/**
 * Get week and day display text
 */
export function getWeekDayDisplay(
	week: number,
	day: number,
	locale: string = 'ru'
): string {
	if (week === 0 && day === 0) {
		return locale === 'ru'
			? 'Очень ранняя беременность'
			: 'Very early pregnancy';
	}

	const weekText =
		locale === 'ru'
			? week === 1
				? 'неделя'
				: 'недель'
			: week === 1
			? 'week'
			: 'weeks';

	const dayText =
		locale === 'ru'
			? day === 1
				? 'день'
				: 'дней'
			: day === 1
			? 'day'
			: 'days';

	if (day === 0) {
		return `${week} ${weekText}`;
	}

	const andText = locale === 'ru' ? 'и' : 'and';
	return `${week} ${weekText} ${andText} ${day} ${dayText}`;
}

/**
 * Get pregnancy status based on current week
 */
export function getPregnancyStatus(
	week: number,
	locale: string = 'ru'
): string {
	if (locale === 'ru') {
		if (week < 4) {
			return 'Очень ранняя беременность';
		} else if (week < 8) {
			return 'Ранняя беременность';
		} else if (week < 13) {
			return 'Первый триместр';
		} else if (week < 27) {
			return 'Второй триместр';
		} else if (week < 37) {
			return 'Третий триместр';
		} else if (week < 40) {
			return 'Доношенная беременность';
		} else {
			return 'Переношенная беременность';
		}
	} else {
		if (week < 4) {
			return 'Very early pregnancy';
		} else if (week < 8) {
			return 'Early pregnancy';
		} else if (week < 13) {
			return 'First trimester';
		} else if (week < 27) {
			return 'Second trimester';
		} else if (week < 37) {
			return 'Third trimester';
		} else if (week < 40) {
			return 'Full term';
		} else {
			return 'Overdue';
		}
	}
}
