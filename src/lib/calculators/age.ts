// Age calculation logic

export interface AgeResult {
	years: number;
	months: number;
	days: number;
	totalDays: number;
	birthDate: string;
	calculateDate: string;
}

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

export function isFutureDate(dateString: string): boolean {
	const date = new Date(dateString);
	const today = new Date();
	return date > today;
}

export function isBirthDateValid(
	birthDate: string,
	calculateDate: string
): boolean {
	const birth = new Date(birthDate);
	const calc = new Date(calculateDate);
	return birth <= calc;
}
