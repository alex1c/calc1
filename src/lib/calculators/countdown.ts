/**
 * Countdown Calculator Library
 * 
 * Provides functionality for countdown timers to specific events.
 * 
 * Features:
 * - Countdown timer creation and management
 * - Time left calculation (days, hours, minutes, seconds)
 * - Event name and description support
 * - Sound notifications
 * - Progress tracking
 * - Popular event presets
 * - LocalStorage persistence
 * 
 * Countdown calculation:
 * - Calculates time difference between now and target date
 * - Breaks down into days, hours, minutes, seconds
 * - Handles past dates (returns zero)
 * - Updates in real-time
 */

/**
 * Countdown state interface
 * Represents an active countdown timer with all settings
 */
export interface CountdownState {
	targetDate: Date;
	isActive: boolean;
	timeLeft: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
		total: number; // total seconds
	};
	eventName: string;
	eventDescription?: string;
	color: string;
	soundEnabled: boolean;
}

export interface CountdownSettings {
	eventName: string;
	eventDescription?: string;
	targetDate: string; // ISO date string
	targetTime: string; // HH:MM format
	color: string;
	soundEnabled: boolean;
	showWeeks: boolean;
	showHours: boolean;
	showMinutes: boolean;
	showSeconds: boolean;
}

/**
 * Create a new countdown timer
 * 
 * Initializes a countdown state with target date and event information.
 * Calculates initial time left and sets up timer state.
 * 
 * @param eventName - Name of the event to countdown to
 * @param targetDate - Target date and time for the countdown
 * @param eventDescription - Optional event description
 * @param color - Color theme for the countdown (default: #3B82F6)
 * @param soundEnabled - Whether sound notifications are enabled (default: true)
 * @returns Countdown state object with initial time left calculation
 */
export function createCountdown(
	eventName: string,
	targetDate: Date,
	eventDescription?: string,
	color: string = '#3B82F6',
	soundEnabled: boolean = true
): CountdownState {
	return {
		targetDate,
		isActive: true,
		timeLeft: calculateTimeLeft(targetDate),
		eventName,
		eventDescription,
		color,
		soundEnabled,
	};
}

/**
 * Calculate time left until target date
 * 
 * Calculates the time difference between now and target date,
 * breaking it down into days, hours, minutes, and seconds.
 * 
 * Returns zero values if target date has passed.
 * 
 * @param targetDate - Target date and time
 * @returns Time left object with days, hours, minutes, seconds, and total seconds
 */
export function calculateTimeLeft(targetDate: Date): {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	total: number;
} {
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();
	
	if (diff <= 0) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			total: 0,
		};
	}
	
	const totalSeconds = Math.floor(diff / 1000);
	const days = Math.floor(totalSeconds / (24 * 60 * 60));
	const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
	const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
	const seconds = totalSeconds % 60;
	
	return {
		days,
		hours,
		minutes,
		seconds,
		total: totalSeconds,
	};
}

/**
 * Update countdown timer state
 * 
 * Recalculates time left and updates active status based on whether
 * target date has been reached.
 * 
 * @param countdown - Current countdown state
 * @returns Updated countdown state with new time left and active status
 */
export function updateCountdown(countdown: CountdownState): CountdownState {
	const timeLeft = calculateTimeLeft(countdown.targetDate);
	const isFinished = timeLeft.total <= 0;
	
	return {
		...countdown,
		timeLeft,
		isActive: !isFinished,
	};
}

/**
 * Format time left as human-readable string
 * 
 * Formats time left with appropriate units based on remaining duration.
 * Shows weeks if enabled and days >= 7, otherwise shows days/hours/minutes/seconds.
 * 
 * @param timeLeft - Time left object with days, hours, minutes, seconds
 * @param showWeeks - Whether to show weeks for long durations (default: false)
 * @returns Formatted time string (e.g., "5 дней, 3 ч, 15 мин")
 */
export function formatTimeLeft(timeLeft: {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}, showWeeks: boolean = false): string {
	if (showWeeks && timeLeft.days >= 7) {
		const weeks = Math.floor(timeLeft.days / 7);
		const remainingDays = timeLeft.days % 7;
		return `${weeks} недель${weeks !== 1 ? '' : 'а'}, ${remainingDays} дн${remainingDays !== 1 ? 'ей' : 'ь'}`;
	}
	
	if (timeLeft.days > 0) {
		return `${timeLeft.days} дн${timeLeft.days !== 1 ? 'ей' : 'ь'}, ${timeLeft.hours} ч, ${timeLeft.minutes} мин`;
	}
	
	if (timeLeft.hours > 0) {
		return `${timeLeft.hours} ч, ${timeLeft.minutes} мин, ${timeLeft.seconds} сек`;
	}
	
	if (timeLeft.minutes > 0) {
		return `${timeLeft.minutes} мин, ${timeLeft.seconds} сек`;
	}
	
	return `${timeLeft.seconds} сек`;
}

export function getProgressPercentage(countdown: CountdownState): number {
	// This is a simplified progress calculation
	// In a real scenario, you'd need to know the total duration
	const now = new Date();
	const diff = countdown.targetDate.getTime() - now.getTime();
	
	if (diff <= 0) return 100;
	
	// For demo purposes, assume a 1-year countdown
	const oneYear = 365 * 24 * 60 * 60 * 1000;
	const progress = Math.max(0, Math.min(100, ((oneYear - diff) / oneYear) * 100));
	
	return progress;
}

export function playCountdownSound(): void {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		// Play a celebratory sound
		oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
		oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
		oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
		
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.5);
	} catch (error) {
		console.warn('Could not play countdown sound:', error);
	}
}

export function validateTargetDate(date: Date): boolean {
	const now = new Date();
	return date.getTime() > now.getTime();
}

export function getDefaultTargetDate(): Date {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(12, 0, 0, 0); // Set to noon tomorrow
	return tomorrow;
}

export function getPopularEvents(): Array<{
	name: string;
	date: Date;
	description: string;
	color: string;
}> {
	const now = new Date();
	const currentYear = now.getFullYear();
	
	return [
		{
			name: 'Новый год',
			date: new Date(currentYear + 1, 0, 1),
			description: 'Празднование Нового года',
			color: '#EF4444',
		},
		{
			name: 'День рождения',
			date: new Date(currentYear, now.getMonth(), now.getDate() + 30),
			description: 'День рождения',
			color: '#3B82F6',
		},
		{
			name: 'Рождество',
			date: new Date(currentYear, 11, 25),
			description: 'Рождество Христово',
			color: '#10B981',
		},
		{
			name: 'Летние каникулы',
			date: new Date(currentYear, 5, 1),
			description: 'Начало летних каникул',
			color: '#F59E0B',
		},
		{
			name: 'День святого Валентина',
			date: new Date(currentYear, 1, 14),
			description: 'День всех влюблённых',
			color: '#EC4899',
		},
	];
}

export function getCountdownPresets(): Array<{
	name: string;
	description: string;
	days: number;
	color: string;
}> {
	return [
		{
			name: 'Через неделю',
			description: 'Событие через 7 дней',
			days: 7,
			color: '#3B82F6',
		},
		{
			name: 'Через месяц',
			description: 'Событие через 30 дней',
			days: 30,
			color: '#10B981',
		},
		{
			name: 'Через 3 месяца',
			description: 'Событие через 90 дней',
			days: 90,
			color: '#F59E0B',
		},
		{
			name: 'Через полгода',
			description: 'Событие через 180 дней',
			days: 180,
			color: '#EF4444',
		},
		{
			name: 'Через год',
			description: 'Событие через 365 дней',
			days: 365,
			color: '#8B5CF6',
		},
	];
}

export function formatCountdownDisplay(timeLeft: {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}, options: {
	showWeeks?: boolean;
	showDays?: boolean;
	showHours?: boolean;
	showMinutes?: boolean;
	showSeconds?: boolean;
} = {}): {
	weeks?: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
} {
	const { showWeeks = false, showDays = true, showHours = true, showMinutes = true, showSeconds = true } = options;
	
	const result: any = {};
	
	if (showWeeks && timeLeft.days >= 7) {
		result.weeks = Math.floor(timeLeft.days / 7);
		result.days = timeLeft.days % 7;
	} else if (showDays) {
		result.days = timeLeft.days;
	}
	
	if (showHours) result.hours = timeLeft.hours;
	if (showMinutes) result.minutes = timeLeft.minutes;
	if (showSeconds) result.seconds = timeLeft.seconds;
	
	return result;
}

export function getTimeUntilEvent(targetDate: Date): string {
	const timeLeft = calculateTimeLeft(targetDate);
	
	if (timeLeft.total <= 0) {
		return 'Событие уже произошло';
	}
	
	if (timeLeft.days > 0) {
		return `Осталось ${timeLeft.days} дн${timeLeft.days !== 1 ? 'ей' : 'ь'}, ${timeLeft.hours} ч, ${timeLeft.minutes} мин`;
	}
	
	if (timeLeft.hours > 0) {
		return `Осталось ${timeLeft.hours} ч, ${timeLeft.minutes} мин, ${timeLeft.seconds} сек`;
	}
	
	if (timeLeft.minutes > 0) {
		return `Осталось ${timeLeft.minutes} мин, ${timeLeft.seconds} сек`;
	}
	
	return `Осталось ${timeLeft.seconds} сек`;
}


