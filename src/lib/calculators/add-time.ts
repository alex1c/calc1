// Add time to date calculation logic

export interface AddTimeResult {
	resultDate: string;
	resultTime: string;
	dayOfWeek: string;
	formattedDate: string;
}

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

export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

export function formatTime(date: Date): string {
	return date.toTimeString().split(' ')[0].substring(0, 5);
}

export function getCurrentDateTime(): { date: string; time: string } {
	const now = new Date();
	return {
		date: formatDate(now),
		time: formatTime(now),
	};
}

export function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
}

export function isValidTime(timeString: string): boolean {
	const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
	return timeRegex.test(timeString);
}
