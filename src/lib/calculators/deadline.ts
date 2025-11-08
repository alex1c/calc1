/**
 * Deadline Calculator Library
 * 
 * Provides functionality for calculating project deadlines based on duration.
 * 
 * Features:
 * - Work days calculation (excludes weekends)
 * - Calendar days calculation (includes all days)
 * - Weekend counting
 * - Day of week calculation
 * - Formatted date display
 * 
 * Calculation modes:
 * - Work days: Only counts Monday-Friday, skips weekends
 * - Calendar days: Counts all days including weekends
 */

/**
 * Result interface for deadline calculation
 * Contains end date, day of week, and day counts
 */
export interface DeadlineResult {
	endDate: string;
	formattedEndDate: string;
	dayOfWeek: string;
	totalDays: number;
	workDays: number;
	weekends: number;
	startDate: string;
	duration: number;
	isWorkDays: boolean;
}

/**
 * Calculate deadline from start date and duration
 * 
 * Calculates the end date based on start date and duration.
 * Supports two modes:
 * - Work days: Only counts weekdays (Monday-Friday), skips weekends
 * - Calendar days: Counts all days including weekends
 * 
 * Algorithm for work days:
 * - Iterates day by day
 * - Counts only weekdays (Monday-Friday)
 * - Skips weekends (Saturday-Sunday)
 * - Stops when work days count reaches duration
 * 
 * Algorithm for calendar days:
 * - Simply adds duration days to start date
 * 
 * @param startDate - Start date in YYYY-MM-DD format
 * @param duration - Duration in days (work days or calendar days)
 * @param isWorkDays - Whether duration is in work days (default: true)
 * @returns Deadline result with end date, day of week, and day counts
 */
export function calculateDeadline(
	startDate: string,
	duration: number,
	isWorkDays: boolean = true
): DeadlineResult {
	// Parse start date
	const [year, month, day] = startDate.split('-').map(Number);
	const start = new Date(year, month - 1, day);

	let currentDate = new Date(start);
	let daysAdded = 0;
	let workDaysAdded = 0;
	let weekendsAdded = 0;

	// Add days based on type
	if (isWorkDays) {
		// Add only work days (Monday to Friday)
		while (workDaysAdded < duration) {
			currentDate.setDate(currentDate.getDate() + 1);
			daysAdded++;
			
			const dayOfWeek = currentDate.getDay();
			if (dayOfWeek >= 1 && dayOfWeek <= 5) {
				// Monday to Friday
				workDaysAdded++;
			} else {
				// Weekend
				weekendsAdded++;
			}
		}
	} else {
		// Add all days (including weekends)
		currentDate.setDate(currentDate.getDate() + duration);
		daysAdded = duration;
		workDaysAdded = duration;
		weekendsAdded = 0;
	}

	// Format result
	const endDate = currentDate.toISOString().split('T')[0];
	const formattedEndDate = currentDate.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	// Get day of week
	const daysOfWeek = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	];
	const dayOfWeek = daysOfWeek[currentDate.getDay()];

	return {
		endDate,
		formattedEndDate,
		dayOfWeek,
		totalDays: daysAdded,
		workDays: workDaysAdded,
		weekends: weekendsAdded,
		startDate,
		duration,
		isWorkDays,
	};
}

/**
 * Get today's date formatted as YYYY-MM-DD string
 * 
 * @returns Today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
	const today = new Date();
	return today.toISOString().split('T')[0];
}

/**
 * Validate if a date string is valid
 * 
 * @param dateString - Date string to validate (YYYY-MM-DD format)
 * @returns True if date is valid, false otherwise
 */
export function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Format a Date object to YYYY-MM-DD string format
 * 
 * @param date - Date object to format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

/**
 * Check if a date is a work day (Monday-Friday)
 * 
 * @param date - Date to check
 * @returns True if date is a work day (Monday-Friday), false otherwise
 */
export function isWorkDay(date: Date): boolean {
	const dayOfWeek = date.getDay();
	return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
}

/**
 * Calculate number of work days between two dates
 * 
 * Counts only weekdays (Monday-Friday) between start and end dates.
 * Iterates day by day and counts only work days.
 * 
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Number of work days between dates
 */
export function getWorkDaysBetween(startDate: string, endDate: string): number {
	const start = new Date(startDate);
	const end = new Date(endDate);
	let workDays = 0;
	
	const current = new Date(start);
	while (current <= end) {
		if (isWorkDay(current)) {
			workDays++;
		}
		current.setDate(current.getDate() + 1);
	}
	
	return workDays;
}


