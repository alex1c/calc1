// Deadline calculation logic

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

export function getTodayDate(): string {
	const today = new Date();
	return today.toISOString().split('T')[0];
}

export function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
}

export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

export function isWorkDay(date: Date): boolean {
	const dayOfWeek = date.getDay();
	return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
}

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


