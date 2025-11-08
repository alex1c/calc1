/**
 * Ovulation and Menstrual Cycle Calculator Library
 *
 * Provides functionality for calculating ovulation date, fertile days, and next period.
 *
 * Features:
 * - Ovulation date calculation (typically 14 days before next period)
 * - Fertile window calculation (2 days before + ovulation day + 1 day after)
 * - Next period date calculation
 * - Period end date calculation
 * - Cycle type determination (short, normal, long)
 * - Calendar data generation with cycle information
 * - Date formatting and validation
 *
 * Cycle types:
 * - Short: 21-24 days (ovulation day 7-10)
 * - Normal: 25-30 days (ovulation day 12-15)
 * - Long: 31-35 days (ovulation day 17-21)
 *
 * Calculation method:
 * - Ovulation day = Cycle Length - 14 days
 * - Fertile window = Ovulation day ± 2 days (4-day window)
 * - Next period = Last period + Cycle length
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
 *
 * Performs validation checks:
 * - Last period date is provided and not in the future
 * - Cycle length is between 15 and 45 days
 * - Period length is between 1 and 10 days
 *
 * @param input - Ovulation input parameters
 * @returns Validation result with boolean status and optional error message key
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
 *
 * Calculates:
 * - Ovulation date: Cycle length - 14 days from last period
 * - Fertile window: 2 days before ovulation to 1 day after (4-day window)
 * - Next period: Last period + cycle length
 * - Period end: Last period + period length - 1 day
 *
 * Algorithm:
 * 1. Calculate ovulation day = cycle length - 14
 * 2. Calculate fertile start = ovulation date - 2 days
 * 3. Calculate fertile end = ovulation date + 1 day
 * 4. Calculate next period = last period + cycle length
 * 5. Calculate period end = last period + period length - 1
 *
 * @param input - Ovulation input parameters
 * @returns Ovulation result with all calculated dates and cycle info
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
 *
 * Determines cycle type by matching cycle length to predefined ranges:
 * - Short: 21-24 days
 * - Normal: 25-30 days
 * - Long: 31-35 days
 *
 * @param cycleLength - Cycle length in days
 * @returns CycleType object if match found, null otherwise
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
 *
 * Compares date strings to determine if a date is between start and end dates (inclusive).
 *
 * @param date - Date to check
 * @param startDate - Period start date
 * @param endDate - Period end date
 * @returns True if date is within the period, false otherwise
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
 *
 * Creates an array of calendar days with cycle-related flags:
 * - isPeriod: Date falls within period dates
 * - isFertile: Date falls within fertile window
 * - isOvulation: Date is ovulation day
 * - isToday: Date is today
 *
 * Includes empty cells for days before the first day of the month to align
 * the calendar grid properly.
 *
 * @param date - Date representing the month to generate calendar for
 * @param result - Ovulation calculation result with dates
 * @returns Array of calendar day objects with cycle flags
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
