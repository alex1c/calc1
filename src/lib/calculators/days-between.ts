/**
 * Days Between Calculator Library
 * 
 * Provides functionality for calculating the difference between two dates.
 * 
 * Features:
 * - Total days calculation
 * - Breakdown into years, months, weeks, and days
 * - Date validation
 * - Formatted date display
 * 
 * Calculation method:
 * - Calculates total days difference
 * - Breaks down into years, months, and remaining days
 * - Handles leap years and varying month lengths
 * - Calculates weeks from total days
 */

/**
 * Result interface for days between calculation
 * Contains total days and breakdown into different time units
 */
export interface DaysBetweenResult {
	totalDays: number;
	weeks: number;
	months: number;
	years: number;
	days: number;
	startDate: string;
	endDate: string;
}

/**
 * Calculate days between two dates
 * 
 * Calculates the difference between start and end dates, breaking it down
 * into years, months, weeks, and days.
 * 
 * Algorithm:
 * 1. Calculate total days difference
 * 2. Calculate years difference
 * 3. Adjust for months and days differences
 * 4. Handle negative days by borrowing from previous month
 * 5. Handle negative months by borrowing from previous year
 * 6. Calculate weeks from total days
 * 
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Days between result with total days and breakdown
 */
export function calculateDaysBetween(
	startDate: string,
	endDate: string
): DaysBetweenResult {
	const start = new Date(startDate);
	const end = new Date(endDate);

	// Calculate total days
	const timeDiff = end.getTime() - start.getTime();
	const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

	// Calculate years, months, and remaining days
	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();
	let days = end.getDate() - start.getDate();

	// Adjust for negative days
	if (days < 0) {
		months--;
		const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
		days += lastMonth.getDate();
	}

	// Adjust for negative months
	if (months < 0) {
		years--;
		months += 12;
	}

	// Calculate weeks
	const weeks = Math.floor(totalDays / 7);

	return {
		totalDays,
		weeks,
		months,
		years,
		days,
		startDate: start.toLocaleDateString(),
		endDate: end.toLocaleDateString(),
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
 * Get today's date formatted as YYYY-MM-DD string
 * 
 * @returns Today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
	return formatDate(new Date());
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
