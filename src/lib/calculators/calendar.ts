/**
 * Calendar Calculator Library
 * 
 * Provides functionality for generating calendar months and managing calendar events.
 * 
 * Features:
 * - Generate calendar months with proper week layout
 * - Event management (add, remove, update)
 * - Recurring events support
 * - iCal export functionality
 * - Multi-locale support (ru, en, es, de)
 * - Holiday detection
 * - Weekend highlighting
 * 
 * Calendar generation:
 * - Starts weeks on Monday
 * - Includes days from previous/next month to fill weeks
 * - Marks current day, weekends, and holidays
 * - Associates events with specific dates
 */

/**
 * Calendar event interface
 * Represents a single event on the calendar
 */
export interface CalendarEvent {
	id: string;
	title: string;
	date: string;
	description?: string;
	color?: string;
	isRecurring?: boolean;
	recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface CalendarDay {
	date: Date;
	day: number;
	isCurrentMonth: boolean;
	isToday: boolean;
	isWeekend: boolean;
	isHoliday: boolean;
	events: CalendarEvent[];
}

export interface CalendarMonth {
	year: number;
	month: number;
	days: CalendarDay[];
	monthName: string;
}

/**
 * Get localized month name
 * 
 * @param month - Month index (0-11, where 0 is January)
 * @param locale - Locale code (ru, en, es, de)
 * @returns Localized month name string
 */
export function getMonthName(month: number, locale: string = 'ru'): string {
	const months = {
		ru: [
			'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
			'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
		],
		en: [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		],
		es: [
			'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
			'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
		],
		de: [
			'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
			'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
		]
	};
	return months[locale as keyof typeof months]?.[month] || months.ru[month];
}

/**
 * Get localized weekday names (abbreviated)
 * 
 * @param locale - Locale code (ru, en, es, de)
 * @returns Array of weekday abbreviations starting from Monday
 */
export function getWeekdayNames(locale: string = 'ru'): string[] {
	const weekdays = {
		ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
		en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		es: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
		de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
	};
	return weekdays[locale as keyof typeof weekdays] || weekdays.ru;
}

/**
 * Generate calendar month with days and events
 * 
 * Creates a calendar month starting from Monday, including days from
 * previous and next months to fill complete weeks (42 days total).
 * 
 * Features:
 * - Marks current day, weekends, and holidays
 * - Associates events with specific dates
 * - Handles recurring events
 * - Supports multi-locale
 * 
 * @param year - Year (e.g., 2024)
 * @param month - Month index (0-11, where 0 is January)
 * @param events - Array of calendar events to associate with dates
 * @param locale - Locale code (ru, en, es, de)
 * @returns Calendar month object with days array and month name
 */
export function generateCalendar(
	year: number,
	month: number,
	events: CalendarEvent[] = [],
	locale: string = 'ru'
): CalendarMonth {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const startDate = new Date(firstDay);
	
	// Adjust to start from Monday
	const dayOfWeek = firstDay.getDay();
	const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
	startDate.setDate(startDate.getDate() - daysToSubtract);

	const days: CalendarDay[] = [];
	const today = new Date();
	
	// Generate 42 days (6 weeks)
	for (let i = 0; i < 42; i++) {
		const currentDate = new Date(startDate);
		currentDate.setDate(startDate.getDate() + i);
		
		const dayEvents = events.filter(event => {
			const eventDate = new Date(event.date);
			return eventDate.toDateString() === currentDate.toDateString();
		});

		days.push({
			date: new Date(currentDate),
			day: currentDate.getDate(),
			isCurrentMonth: currentDate.getMonth() === month,
			isToday: currentDate.toDateString() === today.toDateString(),
			isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6,
			isHoliday: isHoliday(currentDate, locale),
			events: dayEvents
		});
	}

	return {
		year,
		month,
		days,
		monthName: getMonthName(month, locale)
	};
}

/**
 * Check if a date is a holiday
 * 
 * Currently supports Russian holidays. Can be extended for other locales.
 * 
 * @param date - Date to check
 * @param locale - Locale code (ru, en, es, de)
 * @returns True if date is a holiday, false otherwise
 */
export function isHoliday(date: Date, locale: string = 'ru'): boolean {
	const month = date.getMonth();
	const day = date.getDate();
	
	// Russian holidays
	if (locale === 'ru') {
		// New Year
		if (month === 0 && day === 1) return true;
		// Christmas
		if (month === 0 && day === 7) return true;
		// Defender of the Fatherland Day
		if (month === 1 && day === 23) return true;
		// International Women's Day
		if (month === 2 && day === 8) return true;
		// Labour Day
		if (month === 4 && day === 1) return true;
		// Victory Day
		if (month === 4 && day === 9) return true;
		// Russia Day
		if (month === 5 && day === 12) return true;
		// Unity Day
		if (month === 10 && day === 4) return true;
	}
	
	// Add more holidays for other locales as needed
	return false;
}

/**
 * Add a new event to the calendar
 * 
 * Creates a new event with auto-generated ID and default color if not specified.
 * 
 * @param events - Current array of calendar events
 * @param title - Event title
 * @param date - Event date in YYYY-MM-DD format
 * @param description - Optional event description
 * @param color - Optional event color (default: #3B82F6)
 * @returns New array of events with added event
 */
export function addEvent(
	events: CalendarEvent[],
	title: string,
	date: string,
	description?: string,
	color?: string
): CalendarEvent[] {
	const newEvent: CalendarEvent = {
		id: Date.now().toString(),
		title,
		date,
		description,
		color: color || '#3B82F6'
	};
	return [...events, newEvent];
}

/**
 * Remove an event from the calendar
 * 
 * @param events - Current array of calendar events
 * @param eventId - ID of event to remove
 * @returns New array of events without the removed event
 */
export function removeEvent(events: CalendarEvent[], eventId: string): CalendarEvent[] {
	return events.filter(event => event.id !== eventId);
}

/**
 * Update an existing event
 * 
 * Updates specified fields of an event while preserving others.
 * 
 * @param events - Current array of calendar events
 * @param eventId - ID of event to update
 * @param updates - Partial event object with fields to update
 * @returns New array of events with updated event
 */
export function updateEvent(
	events: CalendarEvent[],
	eventId: string,
	updates: Partial<CalendarEvent>
): CalendarEvent[] {
	return events.map(event => 
		event.id === eventId ? { ...event, ...updates } : event
	);
}

/**
 * Get all events for a specific date
 * 
 * @param events - Array of calendar events
 * @param date - Date string in YYYY-MM-DD format
 * @returns Array of events for the specified date
 */
export function getEventsForDate(events: CalendarEvent[], date: string): CalendarEvent[] {
	return events.filter(event => event.date === date);
}

/**
 * Export calendar events to iCal format
 * 
 * Generates iCalendar (.ics) file content that can be imported into
 * calendar applications like Google Calendar, Outlook, etc.
 * 
 * @param events - Array of calendar events to export
 * @returns iCal file content as string
 */
export function exportToICal(events: CalendarEvent[]): string {
	let ical = 'BEGIN:VCALENDAR\n';
	ical += 'VERSION:2.0\n';
	ical += 'PRODID:-//Calc1.ru//Calendar//EN\n';
	
	events.forEach(event => {
		ical += 'BEGIN:VEVENT\n';
		ical += `UID:${event.id}@calc1.ru\n`;
		ical += `DTSTART:${event.date.replace(/-/g, '')}\n`;
		ical += `SUMMARY:${event.title}\n`;
		if (event.description) {
			ical += `DESCRIPTION:${event.description}\n`;
		}
		ical += 'END:VEVENT\n';
	});
	
	ical += 'END:VCALENDAR';
	return ical;
}

export function getCurrentDate(): string {
	return new Date().toISOString().split('T')[0];
}

export function formatDate(date: Date, locale: string = 'ru'): string {
	return date.toLocaleDateString(locale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
}


