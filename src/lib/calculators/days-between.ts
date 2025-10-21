// Days between dates calculation logic

export interface DaysBetweenResult {
	totalDays: number;
	weeks: number;
	months: number;
	years: number;
	days: number;
	startDate: string;
	endDate: string;
}

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

export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

export function getTodayDate(): string {
	return formatDate(new Date());
}

export function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
}
