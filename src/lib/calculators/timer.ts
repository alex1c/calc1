// Timer utility functions

export interface TimerState {
	isRunning: boolean;
	isPaused: boolean;
	timeLeft: number; // in seconds
	totalTime: number; // in seconds
	startTime?: number; // timestamp when started
	pausedTime?: number; // timestamp when paused
}

export interface TimerSettings {
	hours: number;
	minutes: number;
	seconds: number;
	soundEnabled: boolean;
	visualStyle: 'circular' | 'linear' | 'digital';
	color: string;
}

export function createTimer(hours: number, minutes: number, seconds: number): TimerState {
	const totalTime = hours * 3600 + minutes * 60 + seconds;
	return {
		isRunning: false,
		isPaused: false,
		timeLeft: totalTime,
		totalTime,
	};
}

export function startTimer(timer: TimerState): TimerState {
	if (timer.isRunning) return timer;
	
	return {
		...timer,
		isRunning: true,
		isPaused: false,
		startTime: Date.now(),
		pausedTime: undefined,
	};
}

export function pauseTimer(timer: TimerState): TimerState {
	if (!timer.isRunning || timer.isPaused) return timer;
	
	return {
		...timer,
		isPaused: true,
		pausedTime: Date.now(),
	};
}

export function resumeTimer(timer: TimerState): TimerState {
	if (!timer.isRunning || !timer.isPaused) return timer;
	
	const pausedDuration = Date.now() - (timer.pausedTime || 0);
	const newStartTime = (timer.startTime || 0) + pausedDuration;
	
	return {
		...timer,
		isPaused: false,
		startTime: newStartTime,
		pausedTime: undefined,
	};
}

export function resetTimer(timer: TimerState): TimerState {
	return {
		...timer,
		isRunning: false,
		isPaused: false,
		timeLeft: timer.totalTime,
		startTime: undefined,
		pausedTime: undefined,
	};
}

export function updateTimer(timer: TimerState): TimerState {
	if (!timer.isRunning || timer.isPaused) return timer;
	
	const now = Date.now();
	const elapsed = Math.floor((now - (timer.startTime || 0)) / 1000);
	const newTimeLeft = Math.max(0, timer.totalTime - elapsed);
	
	return {
		...timer,
		timeLeft: newTimeLeft,
		isRunning: newTimeLeft > 0,
	};
}

export function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	
	if (hours > 0) {
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}
	return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getProgressPercentage(timer: TimerState): number {
	if (timer.totalTime === 0) return 0;
	return ((timer.totalTime - timer.timeLeft) / timer.totalTime) * 100;
}

export function playNotificationSound(): void {
	// Create audio context for sound notification
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.5);
	} catch (error) {
		console.warn('Could not play notification sound:', error);
	}
}

export function playBeepSound(): void {
	// Simple beep sound
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
		gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	} catch (error) {
		console.warn('Could not play beep sound:', error);
	}
}

export function validateTimeInput(hours: number, minutes: number, seconds: number): boolean {
	return hours >= 0 && hours <= 23 && 
		   minutes >= 0 && minutes <= 59 && 
		   seconds >= 0 && seconds <= 59 &&
		   (hours > 0 || minutes > 0 || seconds > 0);
}

export function parseTimeString(timeString: string): { hours: number; minutes: number; seconds: number } {
	const parts = timeString.split(':').map(Number);
	
	if (parts.length === 2) {
		// MM:SS format
		return { hours: 0, minutes: parts[0] || 0, seconds: parts[1] || 0 };
	} else if (parts.length === 3) {
		// HH:MM:SS format
		return { hours: parts[0] || 0, minutes: parts[1] || 0, seconds: parts[2] || 0 };
	}
	
	return { hours: 0, minutes: 0, seconds: 0 };
}

export function getTimeString(hours: number, minutes: number, seconds: number): string {
	if (hours > 0) {
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function getPomodoroPresets() {
	return [
		{ name: 'Pomodoro (25 min)', hours: 0, minutes: 25, seconds: 0 },
		{ name: 'Short Break (5 min)', hours: 0, minutes: 5, seconds: 0 },
		{ name: 'Long Break (15 min)', hours: 0, minutes: 15, seconds: 0 },
		{ name: 'Focus (45 min)', hours: 0, minutes: 45, seconds: 0 },
		{ name: 'Deep Work (90 min)', hours: 1, minutes: 30, seconds: 0 },
	];
}

export function getCookingPresets() {
	return [
		{ name: 'Soft Boil (3 min)', hours: 0, minutes: 3, seconds: 0 },
		{ name: 'Medium Boil (5 min)', hours: 0, minutes: 5, seconds: 0 },
		{ name: 'Hard Boil (8 min)', hours: 0, minutes: 8, seconds: 0 },
		{ name: 'Pasta (10 min)', hours: 0, minutes: 10, seconds: 0 },
		{ name: 'Rice (20 min)', hours: 0, minutes: 20, seconds: 0 },
	];
}

export function getWorkoutPresets() {
	return [
		{ name: 'Warm-up (5 min)', hours: 0, minutes: 5, seconds: 0 },
		{ name: 'Cardio (20 min)', hours: 0, minutes: 20, seconds: 0 },
		{ name: 'HIIT (30 min)', hours: 0, minutes: 30, seconds: 0 },
		{ name: 'Strength (45 min)', hours: 0, minutes: 45, seconds: 0 },
		{ name: 'Yoga (60 min)', hours: 1, minutes: 0, seconds: 0 },
	];
}


