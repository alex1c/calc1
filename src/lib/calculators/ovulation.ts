/**
 * Ovulation and Menstrual Cycle Calculator
 * Calculates ovulation date, fertile days, and next period
 */

export interface OvulationInput {
	lastPeriodDate: Date;
	cycleLength: number;
	periodLength: number;
}

export interface OvulationResult {
	ovulationDate: Date;
	fertileStart: Date;
	fertileEnd: Date;
	nextPeriod: Date;
	periodEnd: Date;
	cycleInfo: {
		cycleLength: number;
		periodLength: number;
		ovulationDay: number;
	};
}

export interface CycleType {
	name: string;
	minDays: number;
	maxDays: number;
	ovulationDayMin: number;
	ovulationDayMax: number;
	comment: string;
}

/**
 * Typical cycle parameters for different cycle types
 */
export const CYCLE_TYPES: CycleType[] = [
	{
		name: 'short',
		minDays: 21,
		maxDays: 24,
		ovulationDayMin: 7,
		ovulationDayMax: 10,
		comment: 'shortCycle',
	},
	{
		name: 'normal',
		minDays: 25,
		maxDays: 30,
		ovulationDayMin: 12,
		ovulationDayMax: 15,
		comment: 'normalCycle',
	},
	{
		name: 'long',
		minDays: 31,
		maxDays: 35,
		ovulationDayMin: 17,
		ovulationDayMax: 21,
		comment: 'longCycle',
	},
];

/**
 * Validate input parameters for ovulation calculation
 */
export function validateOvulationInput(input: OvulationInput): {
	isValid: boolean;
	error?: string;
} {
	const { lastPeriodDate, cycleLength, periodLength } = input;

	// Check if last period date is provided
	if (!lastPeriodDate) {
		return { isValid: false, error: 'lastPeriodRequired' };
	}

	// Check if date is not in the future
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	if (lastPeriodDate > today) {
		return { isValid: false, error: 'lastPeriodFuture' };
	}

	// Check cycle length range (15-45 days)
	if (cycleLength < 15 || cycleLength > 45) {
		return { isValid: false, error: 'cycleLengthRange' };
	}

	// Check period length range (1-10 days)
	if (periodLength < 1 || periodLength > 10) {
		return { isValid: false, error: 'periodLengthRange' };
	}

	return { isValid: true };
}

/**
 * Calculate ovulation date and related dates
 */
export function calculateOvulation(input: OvulationInput): OvulationResult {
	const { lastPeriodDate, cycleLength, periodLength } = input;

	// Calculate ovulation date (typically 14 days before next period)
	const ovulationDay = cycleLength - 14;
	const ovulationDate = new Date(lastPeriodDate);
	ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

	// Calculate fertile window (2 days before ovulation + ovulation day + 1 day after)
	const fertileStart = new Date(ovulationDate);
	fertileStart.setDate(fertileStart.getDate() - 2);

	const fertileEnd = new Date(ovulationDate);
	fertileEnd.setDate(fertileEnd.getDate() + 1);

	// Calculate next period date
	const nextPeriod = new Date(lastPeriodDate);
	nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

	// Calculate period end date
	const periodEnd = new Date(lastPeriodDate);
	periodEnd.setDate(periodEnd.getDate() + periodLength - 1);

	return {
		ovulationDate,
		fertileStart,
		fertileEnd,
		nextPeriod,
		periodEnd,
		cycleInfo: {
			cycleLength,
			periodLength,
			ovulationDay,
		},
	};
}

/**
 * Get cycle type based on cycle length
 */
export function getCycleType(cycleLength: number): CycleType | null {
	return (
		CYCLE_TYPES.find(
			(type) => cycleLength >= type.minDays && cycleLength <= type.maxDays
		) || null
	);
}

/**
 * Check if a date falls within a specific period
 */
export function isDateInPeriod(
	date: Date,
	startDate: Date,
	endDate: Date
): boolean {
	const dateStr = date.toDateString();
	const startStr = startDate.toDateString();
	const endStr = endDate.toDateString();

	return dateStr >= startStr && dateStr <= endStr;
}

/**
 * Generate calendar data for a month with cycle information
 */
export function generateCalendarData(
	date: Date,
	result: OvulationResult
): Array<{
	date: Date;
	isPeriod: boolean;
	isFertile: boolean;
	isOvulation: boolean;
	isToday: boolean;
}> {
	const year = date.getFullYear();
	const month = date.getMonth();

	// Get first day of month and number of days
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();

	// Get first day of week (0 = Sunday)
	const firstDayOfWeek = firstDay.getDay();

	const calendarData = [];
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Add empty cells for days before the first day of month
	for (let i = 0; i < firstDayOfWeek; i++) {
		calendarData.push({
			date: new Date(year, month, -firstDayOfWeek + i + 1),
			isPeriod: false,
			isFertile: false,
			isOvulation: false,
			isToday: false,
		});
	}

	// Add days of the month
	for (let day = 1; day <= daysInMonth; day++) {
		const currentDate = new Date(year, month, day);
		const isToday = currentDate.getTime() === today.getTime();

		// Check if date is in period
		const isPeriod = isDateInPeriod(
			currentDate,
			result.nextPeriod,
			result.periodEnd
		);

		// Check if date is in fertile window
		const isFertile = isDateInPeriod(
			currentDate,
			result.fertileStart,
			result.fertileEnd
		);

		// Check if date is ovulation day
		const isOvulation =
			currentDate.toDateString() === result.ovulationDate.toDateString();

		calendarData.push({
			date: currentDate,
			isPeriod,
			isFertile,
			isOvulation,
			isToday,
		});
	}

	return calendarData;
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale: string = 'ru'): string {
	return date.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

/**
 * Get day name in specified locale
 */
export function getDayName(date: Date, locale: string = 'ru'): string {
	return date.toLocaleDateString(locale, { weekday: 'short' });
}

/**
 * Get month name in specified locale
 */
export function getMonthName(date: Date, locale: string = 'ru'): string {
	return date.toLocaleDateString(locale, { month: 'long' });
}
