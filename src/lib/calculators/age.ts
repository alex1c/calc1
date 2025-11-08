/**
 * Age Calculator Library
 * 
 * Provides functionality for calculating age from birth date to a specified date.
 * 
 * Features:
 * - Calculate age in years, months, and days
 * - Total days calculation
 * - Date validation
 * - Future date detection
 * - Birth date validation
 * 
 * Age calculation accounts for leap years and varying month lengths.
 */

/**
 * Result interface for age calculation
 * Contains detailed age breakdown including years, months, days, and total days
 */
export interface AgeResult {
	years: number;
	months: number;
	days: number;
	totalDays: number;
	birthDate: string;
	calculateDate: string;
}

/**
 * Calculate age from birth date to calculation date
 * 
 * Calculates precise age including years, months, days, and total days.
 * Handles edge cases like leap years and varying month lengths.
 * 
 * Algorithm:
 * 1. Calculate total days difference
 * 2. Calculate years difference
 * 3. Adjust for months and days differences
 * 4. Handle negative days by borrowing from previous month
 * 5. Handle negative months by borrowing from previous year
 * 
 * @param birthDate - Birth date in YYYY-MM-DD format
 * @param calculateDate - Calculation date in YYYY-MM-DD format
 * @returns Age result with years, months, days, total days, and formatted dates
 */
export function calculateAge(
	birthDate: string,
	calculateDate: string
): AgeResult {
	const birth = new Date(birthDate);
	const calc = new Date(calculateDate);

	// Calculate total days
	const timeDiff = calc.getTime() - birth.getTime();
	const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

	// Calculate years, months, and remaining days
	let years = calc.getFullYear() - birth.getFullYear();
	let months = calc.getMonth() - birth.getMonth();
	let days = calc.getDate() - birth.getDate();

	// Adjust for negative days
	if (days < 0) {
		months--;
		const lastMonth = new Date(calc.getFullYear(), calc.getMonth(), 0);
		days += lastMonth.getDate();
	}

	// Adjust for negative months
	if (months < 0) {
		years--;
		months += 12;
	}

	return {
		years,
		months,
		days,
		totalDays,
		birthDate: birth.toLocaleDateString(),
		calculateDate: calc.toLocaleDateString(),
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

/**
 * Check if a date is in the future
 * 
 * @param dateString - Date string to check (YYYY-MM-DD format)
 * @returns True if date is in the future, false otherwise
 */
export function isFutureDate(dateString: string): boolean {
	const date = new Date(dateString);
	const today = new Date();
	return date > today;
}

/**
 * Validate if birth date is before or equal to calculation date
 * 
 * @param birthDate - Birth date in YYYY-MM-DD format
 * @param calculateDate - Calculation date in YYYY-MM-DD format
 * @returns True if birth date is valid (before or equal to calculation date), false otherwise
 */
export function isBirthDateValid(
	birthDate: string,
	calculateDate: string
): boolean {
	const birth = new Date(birthDate);
	const calc = new Date(calculateDate);
	return birth <= calc;
}
