/**
 * Add Time Calculator Library
 * 
 * Provides functionality for adding time (days, hours, minutes) to a date and time.
 * 
 * Features:
 * - Add days, hours, and minutes to a date/time
 * - Day of week calculation
 * - Date and time formatting
 * - Current date/time retrieval
 * - Date validation
 * 
 * All date operations use JavaScript Date object and handle timezone conversions.
 */

/**
 * Result interface for add time calculation
 * Contains the resulting date, time, day of week, and formatted date string
 */
export interface AddTimeResult {
	resultDate: string;
	resultTime: string;
	dayOfWeek: string;
	formattedDate: string;
}

/**
 * Add time (days, hours, minutes) to a date and time
 * 
 * Parses the start date and time, adds the specified time intervals,
 * and returns the resulting date/time with day of week and formatted date.
 * 
 * @param startDate - Start date in YYYY-MM-DD format
 * @param startTime - Start time in HH:MM format
 * @param addDays - Number of days to add
 * @param addHours - Number of hours to add
 * @param addMinutes - Number of minutes to add
 * @returns Result object containing result date, time, day of week, and formatted date
 */
export function addTimeToDate(
	startDate: string,
	startTime: string,
	addDays: number,
	addHours: number,
	addMinutes: number
): AddTimeResult {
	// Parse start date and time
	const [year, month, day] = startDate.split('-').map(Number);
	const [hours, minutes] = startTime.split(':').map(Number);

	// Create date object
	const date = new Date(year, month - 1, day, hours, minutes);

	// Add time
	date.setDate(date.getDate() + addDays);
	date.setHours(date.getHours() + addHours);
	date.setMinutes(date.getMinutes() + addMinutes);

	// Format result
	const resultDate = date.toISOString().split('T')[0];
	const resultTime = date.toTimeString().split(' ')[0].substring(0, 5);

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
	const dayOfWeek = daysOfWeek[date.getDay()];

	// Format for display
	const formattedDate = date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	return {
		resultDate,
		resultTime,
		dayOfWeek,
		formattedDate,
	};
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
 * Format a Date object to HH:MM string format
 * 
 * @param date - Date object to format
 * @returns Formatted time string in HH:MM format
 */
export function formatTime(date: Date): string {
	return date.toTimeString().split(' ')[0].substring(0, 5);
}

/**
 * Get current date and time formatted as strings
 * 
 * @returns Object containing current date (YYYY-MM-DD) and time (HH:MM)
 */
export function getCurrentDateTime(): { date: string; time: string } {
	const now = new Date();
	return {
		date: formatDate(now),
		time: formatTime(now),
	};
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

export function isValidTime(timeString: string): boolean {
	const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
	return timeRegex.test(timeString);
}
