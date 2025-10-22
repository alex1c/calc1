'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
	Play,
	Pause,
	Square,
	RotateCcw,
	Volume2,
	VolumeX,
	Clock,
	Zap,
	Utensils,
	Dumbbell,
	Settings,
} from 'lucide-react';
import {
	createTimer,
	startTimer,
	pauseTimer,
	resumeTimer,
	resetTimer,
	updateTimer,
	formatTime,
	getProgressPercentage,
	playNotificationSound,
	playBeepSound,
	validateTimeInput,
	getPomodoroPresets,
	getCookingPresets,
	getWorkoutPresets,
	TimerState,
	TimerSettings,
} from '@/lib/calculators/timer';

export default function TimerCalculator() {
	const t = useTranslations('calculators.timer');
	const [timer, setTimer] = useState<TimerState>(createTimer(0, 25, 0));
	const [settings, setSettings] = useState<TimerSettings>({
		hours: 0,
		minutes: 25,
		seconds: 0,
		soundEnabled: true,
		visualStyle: 'circular',
		color: '#3B82F6',
	});
	const [isMounted, setIsMounted] = useState(false);
	const [showPresets, setShowPresets] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (timer.isRunning && !timer.isPaused) {
			intervalRef.current = setInterval(() => {
				setTimer((prevTimer) => {
					const updatedTimer = updateTimer(prevTimer);

					// Check if timer finished
					if (updatedTimer.timeLeft === 0 && prevTimer.timeLeft > 0) {
						if (settings.soundEnabled) {
							playNotificationSound();
						}
					}

					return updatedTimer;
				});
			}, 100);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [timer.isRunning, timer.isPaused, settings.soundEnabled]);

	const handleStart = () => {
		if (timer.isPaused) {
			setTimer(resumeTimer(timer));
		} else {
			setTimer(startTimer(timer));
		}
	};

	const handlePause = () => {
		setTimer(pauseTimer(timer));
	};

	const handleReset = () => {
		setTimer(resetTimer(timer));
	};

	const handleTimeChange = (
		field: 'hours' | 'minutes' | 'seconds',
		value: number
	) => {
		const newSettings = { ...settings, [field]: value };
		setSettings(newSettings);

		if (!timer.isRunning) {
			const newTimer = createTimer(
				newSettings.hours,
				newSettings.minutes,
				newSettings.seconds
			);
			setTimer(newTimer);
		}
	};

	const handlePresetSelect = (
		hours: number,
		minutes: number,
		seconds: number
	) => {
		const newSettings = { ...settings, hours, minutes, seconds };
		setSettings(newSettings);
		setTimer(createTimer(hours, minutes, seconds));
		setShowPresets(false);
	};

	const handleSoundToggle = () => {
		setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
	};

	const handleVisualStyleChange = (
		style: 'circular' | 'linear' | 'digital'
	) => {
		setSettings((prev) => ({ ...prev, visualStyle: style }));
	};

	const handleColorChange = (color: string) => {
		setSettings((prev) => ({ ...prev, color }));
	};

	const progress = getProgressPercentage(timer);
	const isFinished = timer.timeLeft === 0 && timer.totalTime > 0;

	// Show loading state during hydration
	if (!isMounted) {
		return (
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
						<Clock className='h-8 w-8 text-blue-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						{t('title')}
					</h2>
					<p className='text-gray-600'>
						Обратный отсчёт для любых задач
					</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow-lg p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
					<Clock className='h-8 w-8 text-blue-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('title')}
				</h2>
				<p className='text-gray-600'>Обратный отсчёт для любых задач</p>
			</div>

			{/* Timer Display */}
			<div className='text-center mb-8'>
				{settings.visualStyle === 'circular' && (
					<div className='relative w-64 h-64 mx-auto mb-6'>
						<svg
							className='w-full h-full transform -rotate-90'
							viewBox='0 0 100 100'
						>
							{/* Background circle */}
							<circle
								cx='50'
								cy='50'
								r='45'
								fill='none'
								stroke='#E5E7EB'
								strokeWidth='8'
							/>
							{/* Progress circle */}
							<circle
								cx='50'
								cy='50'
								r='45'
								fill='none'
								stroke={settings.color}
								strokeWidth='8'
								strokeLinecap='round'
								strokeDasharray={`${2 * Math.PI * 45}`}
								strokeDashoffset={`${
									2 * Math.PI * 45 * (1 - progress / 100)
								}`}
								className='transition-all duration-100'
							/>
						</svg>
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='text-center'>
								<div
									className={`text-4xl font-bold ${
										isFinished
											? 'text-red-600'
											: 'text-gray-900'
									}`}
								>
									{formatTime(timer.timeLeft)}
								</div>
								<div className='text-sm text-gray-500 mt-1'>
									{Math.round(progress)}% завершено
								</div>
							</div>
						</div>
					</div>
				)}

				{settings.visualStyle === 'linear' && (
					<div className='w-full max-w-md mx-auto mb-6'>
						<div className='bg-gray-200 rounded-full h-4 mb-4'>
							<div
								className='h-4 rounded-full transition-all duration-100'
								style={{
									width: `${progress}%`,
									backgroundColor: settings.color,
								}}
							/>
						</div>
						<div
							className={`text-4xl font-bold ${
								isFinished ? 'text-red-600' : 'text-gray-900'
							}`}
						>
							{formatTime(timer.timeLeft)}
						</div>
					</div>
				)}

				{settings.visualStyle === 'digital' && (
					<div className='bg-gray-900 text-green-400 font-mono text-6xl font-bold p-8 rounded-lg mb-6 max-w-md mx-auto'>
						{formatTime(timer.timeLeft)}
					</div>
				)}
			</div>

			{/* Time Input */}
			{!timer.isRunning && (
				<div className='flex justify-center items-center space-x-4 mb-8'>
					<div className='flex items-center space-x-2'>
						<label className='text-sm font-medium text-gray-700'>
							Часы
						</label>
						<input
							type='number'
							min='0'
							max='23'
							value={settings.hours}
							onChange={(e) =>
								handleTimeChange(
									'hours',
									parseInt(e.target.value) || 0
								)
							}
							className='w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<span className='text-2xl font-bold text-gray-400'>:</span>
					<div className='flex items-center space-x-2'>
						<label className='text-sm font-medium text-gray-700'>
							Минуты
						</label>
						<input
							type='number'
							min='0'
							max='59'
							value={settings.minutes}
							onChange={(e) =>
								handleTimeChange(
									'minutes',
									parseInt(e.target.value) || 0
								)
							}
							className='w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<span className='text-2xl font-bold text-gray-400'>:</span>
					<div className='flex items-center space-x-2'>
						<label className='text-sm font-medium text-gray-700'>
							Секунды
						</label>
						<input
							type='number'
							min='0'
							max='59'
							value={settings.seconds}
							onChange={(e) =>
								handleTimeChange(
									'seconds',
									parseInt(e.target.value) || 0
								)
							}
							className='w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
				</div>
			)}

			{/* Control Buttons */}
			<div className='flex justify-center space-x-4 mb-8'>
				{!timer.isRunning ? (
					<button
						onClick={handleStart}
						disabled={timer.totalTime === 0}
						className='flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
					>
						<Play className='h-5 w-5 mr-2' />
						{t('form.start')}
					</button>
				) : timer.isPaused ? (
					<button
						onClick={handleStart}
						className='flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
					>
						<Play className='h-5 w-5 mr-2' />
						{t('form.resume')}
					</button>
				) : (
					<button
						onClick={handlePause}
						className='flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors'
					>
						<Pause className='h-5 w-5 mr-2' />
						{t('form.pause')}
					</button>
				)}

				<button
					onClick={handleReset}
					className='flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
				>
					<Square className='h-5 w-5 mr-2' />
					{t('form.reset')}
				</button>
			</div>

			{/* Presets and Settings */}
			<div className='flex flex-wrap justify-center gap-4 mb-8'>
				<button
					onClick={() => setShowPresets(!showPresets)}
					className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
				>
					<Zap className='h-4 w-4 mr-2' />
					{t('form.presets')}
				</button>
				<button
					onClick={() => setShowSettings(!showSettings)}
					className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
				>
					<Settings className='h-4 w-4 mr-2' />
					{t('form.settings')}
				</button>
				<button
					onClick={handleSoundToggle}
					className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
						settings.soundEnabled
							? 'bg-green-600 text-white hover:bg-green-700'
							: 'bg-gray-400 text-white hover:bg-gray-500'
					}`}
				>
					{settings.soundEnabled ? (
						<Volume2 className='h-4 w-4 mr-2' />
					) : (
						<VolumeX className='h-4 w-4 mr-2' />
					)}
					{t('form.sound')}
				</button>
			</div>

			{/* Presets */}
			{showPresets && (
				<div className='bg-gray-50 rounded-lg p-6 mb-6'>
					<h3 className='text-lg font-semibold mb-4 text-center'>
						{t('form.presets')}
					</h3>

					{/* Pomodoro Presets */}
					<div className='mb-4'>
						<h4 className='font-medium text-gray-700 mb-2 flex items-center'>
							<Zap className='h-4 w-4 mr-2' />
							{t('form.pomodoro')}
						</h4>
						<div className='flex flex-wrap gap-2'>
							{getPomodoroPresets().map((preset, index) => (
								<button
									key={index}
									onClick={() =>
										handlePresetSelect(
											preset.hours,
											preset.minutes,
											preset.seconds
										)
									}
									className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors'
								>
									{preset.name}
								</button>
							))}
						</div>
					</div>

					{/* Cooking Presets */}
					<div className='mb-4'>
						<h4 className='font-medium text-gray-700 mb-2 flex items-center'>
							<Utensils className='h-4 w-4 mr-2' />
							{t('form.cooking')}
						</h4>
						<div className='flex flex-wrap gap-2'>
							{getCookingPresets().map((preset, index) => (
								<button
									key={index}
									onClick={() =>
										handlePresetSelect(
											preset.hours,
											preset.minutes,
											preset.seconds
										)
									}
									className='px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200 transition-colors'
								>
									{preset.name}
								</button>
							))}
						</div>
					</div>

					{/* Workout Presets */}
					<div>
						<h4 className='font-medium text-gray-700 mb-2 flex items-center'>
							<Dumbbell className='h-4 w-4 mr-2' />
							{t('form.workout')}
						</h4>
						<div className='flex flex-wrap gap-2'>
							{getWorkoutPresets().map((preset, index) => (
								<button
									key={index}
									onClick={() =>
										handlePresetSelect(
											preset.hours,
											preset.minutes,
											preset.seconds
										)
									}
									className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors'
								>
									{preset.name}
								</button>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Settings */}
			{showSettings && (
				<div className='bg-gray-50 rounded-lg p-6'>
					<h3 className='text-lg font-semibold mb-4 text-center'>
						{t('form.settings')}
					</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.visualStyle')}
							</label>
							<select
								value={settings.visualStyle}
								onChange={(e) =>
									handleVisualStyleChange(
										e.target.value as
											| 'circular'
											| 'linear'
											| 'digital'
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value='circular'>
									{t('form.circular')}
								</option>
								<option value='linear'>
									{t('form.linear')}
								</option>
								<option value='digital'>
									{t('form.digital')}
								</option>
							</select>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.color')}
							</label>
							<input
								type='color'
								value={settings.color}
								onChange={(e) =>
									handleColorChange(e.target.value)
								}
								className='w-full h-10 border border-gray-300 rounded-lg'
							/>
						</div>
					</div>
				</div>
			)}

			{/* Status */}
			{isFinished && (
				<div className='text-center'>
					<div className='inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full'>
						<Clock className='h-4 w-4 mr-2' />
						{t('results.finished')}
					</div>
				</div>
			)}
		</div>
	);
}
