'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calendar,
	Clock,
	Play,
	Pause,
	Square,
	Settings,
	Bell,
	BellOff,
	Target,
	Zap,
	Heart,
	Star,
	Gift,
	Plane,
} from 'lucide-react';
import {
	createCountdown,
	updateCountdown,
	calculateTimeLeft,
	formatTimeLeft,
	getProgressPercentage,
	playCountdownSound,
	validateTargetDate,
	getDefaultTargetDate,
	getPopularEvents,
	getCountdownPresets,
	formatCountdownDisplay,
	CountdownState,
	CountdownSettings,
} from '@/lib/calculators/countdown';

export default function CountdownCalculator() {
	const t = useTranslations('calculators.countdown');
	const [countdown, setCountdown] = useState<CountdownState | null>(null);
	const [settings, setSettings] = useState<CountdownSettings>({
		eventName: '',
		eventDescription: '',
		targetDate: getDefaultTargetDate().toISOString().split('T')[0],
		targetTime: '12:00',
		color: '#3B82F6',
		soundEnabled: true,
		showWeeks: false,
		showHours: true,
		showMinutes: true,
		showSeconds: true,
	});
	const [isMounted, setIsMounted] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [showPresets, setShowPresets] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setIsMounted(true);
		// Load saved countdown from localStorage
		const savedCountdown = localStorage.getItem('countdown-data');
		if (savedCountdown) {
			try {
				const data = JSON.parse(savedCountdown);
				const targetDate = new Date(data.targetDate);
				if (validateTargetDate(targetDate)) {
					setCountdown(
						createCountdown(
							data.eventName,
							targetDate,
							data.eventDescription,
							data.color,
							data.soundEnabled
						)
					);
				}
			} catch (error) {
				console.warn('Could not load saved countdown:', error);
			}
		}
	}, []);

	useEffect(() => {
		if (countdown && countdown.isActive) {
			intervalRef.current = setInterval(() => {
				setCountdown((prevCountdown) => {
					if (!prevCountdown) return null;
					const updated = updateCountdown(prevCountdown);

					// Check if countdown finished
					if (!updated.isActive && prevCountdown.isActive) {
						if (settings.soundEnabled) {
							playCountdownSound();
						}
					}

					return updated;
				});
			}, 1000);
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
	}, [countdown?.isActive, settings.soundEnabled]);

	useEffect(() => {
		// Save countdown to localStorage
		if (countdown) {
			localStorage.setItem(
				'countdown-data',
				JSON.stringify({
					eventName: countdown.eventName,
					eventDescription: countdown.eventDescription,
					targetDate: countdown.targetDate.toISOString(),
					color: countdown.color,
					soundEnabled: countdown.soundEnabled,
				})
			);
		}
	}, [countdown]);

	const handleStartCountdown = () => {
		const targetDateTime = new Date(
			`${settings.targetDate}T${settings.targetTime}:00`
		);

		if (!validateTargetDate(targetDateTime)) {
			alert(t('form.errors.invalidDate'));
			return;
		}

		if (!settings.eventName.trim()) {
			alert(t('form.errors.eventNameRequired'));
			return;
		}

		const newCountdown = createCountdown(
			settings.eventName,
			targetDateTime,
			settings.eventDescription,
			settings.color,
			settings.soundEnabled
		);

		setCountdown(newCountdown);
		setShowSettings(false);
	};

	const handleStopCountdown = () => {
		setCountdown(null);
		localStorage.removeItem('countdown-data');
	};

	const handlePresetSelect = (event: any) => {
		const targetDate = new Date();
		targetDate.setDate(targetDate.getDate() + event.days);
		targetDate.setHours(12, 0, 0, 0);

		setSettings((prev) => ({
			...prev,
			eventName: event.name,
			eventDescription: event.description,
			targetDate: targetDate.toISOString().split('T')[0],
			targetTime: '12:00',
			color: event.color,
		}));
	};

	const handlePopularEventSelect = (event: any) => {
		setSettings((prev) => ({
			...prev,
			eventName: event.name,
			eventDescription: event.description,
			targetDate: event.date.toISOString().split('T')[0],
			targetTime: '12:00',
			color: event.color,
		}));
	};

	const getEventIcon = (eventName: string) => {
		const name = eventName.toLowerCase();
		if (name.includes('день рождения') || name.includes('birthday'))
			return <Heart className='h-5 w-5' />;
		if (name.includes('новый год') || name.includes('new year'))
			return <Star className='h-5 w-5' />;
		if (name.includes('рождество') || name.includes('christmas'))
			return <Gift className='h-5 w-5' />;
		if (name.includes('отпуск') || name.includes('vacation'))
			return <Plane className='h-5 w-5' />;
		return <Target className='h-5 w-5' />;
	};

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
					<p className='text-gray-600'>{t('description')}</p>
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
				<p className='text-gray-600'>{t('description')}</p>
			</div>

			{/* Active Countdown Display */}
			{countdown && (
				<div className='text-center mb-8'>
					<div className='bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6'>
						<div className='flex items-center justify-center mb-4'>
							{getEventIcon(countdown.eventName)}
							<h3 className='text-xl font-semibold text-gray-900 ml-2'>
								{countdown.eventName}
							</h3>
						</div>

						{countdown.eventDescription && (
							<p className='text-gray-600 mb-4'>
								{countdown.eventDescription}
							</p>
						)}

						{countdown.isActive ? (
							<div className='space-y-4'>
								{/* Time Display */}
								<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
									{countdown.timeLeft.days > 0 && (
										<div className='bg-white rounded-lg p-4 shadow-sm'>
											<div className='text-3xl font-bold text-gray-900'>
												{countdown.timeLeft.days}
											</div>
											<div className='text-sm text-gray-500'>
												{t('results.days')}
											</div>
										</div>
									)}

									{countdown.timeLeft.hours > 0 && (
										<div className='bg-white rounded-lg p-4 shadow-sm'>
											<div className='text-3xl font-bold text-gray-900'>
												{countdown.timeLeft.hours}
											</div>
											<div className='text-sm text-gray-500'>
												{t('results.hours')}
											</div>
										</div>
									)}

									<div className='bg-white rounded-lg p-4 shadow-sm'>
										<div className='text-3xl font-bold text-gray-900'>
											{countdown.timeLeft.minutes}
										</div>
										<div className='text-sm text-gray-500'>
											{t('results.minutes')}
										</div>
									</div>

									<div className='bg-white rounded-lg p-4 shadow-sm'>
										<div className='text-3xl font-bold text-gray-900'>
											{countdown.timeLeft.seconds}
										</div>
										<div className='text-sm text-gray-500'>
											{t('results.seconds')}
										</div>
									</div>
								</div>

								{/* Progress Bar */}
								<div className='w-full bg-gray-200 rounded-full h-4'>
									<div
										className='h-4 rounded-full transition-all duration-1000'
										style={{
											width: `${getProgressPercentage(
												countdown
											)}%`,
											backgroundColor: countdown.color,
										}}
									/>
								</div>

								<p className='text-sm text-gray-600'>
									{formatTimeLeft(
										countdown.timeLeft,
										settings.showWeeks
									)}
								</p>
							</div>
						) : (
							<div className='text-center'>
								<div className='text-6xl mb-4'>🎉</div>
								<h3 className='text-2xl font-bold text-green-600 mb-2'>
									{t('results.finished')}
								</h3>
								<p className='text-gray-600'>
									{t('results.eventHappened', {
										eventName: countdown.eventName,
									})}
								</p>
							</div>
						)}
					</div>

					{/* Control Buttons */}
					<div className='flex justify-center space-x-4'>
						<button
							onClick={() => setShowSettings(true)}
							className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
						>
							<Settings className='h-4 w-4 mr-2' />
							{t('edit')}
						</button>
						<button
							onClick={handleStopCountdown}
							className='flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
						>
							<Square className='h-4 w-4 mr-2' />
							{t('stop')}
						</button>
					</div>
				</div>
			)}

			{/* Setup Form */}
			{!countdown && (
				<div className='space-y-6'>
					{/* Event Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.eventName')}
						</label>
						<input
							type='text'
							value={settings.eventName}
							onChange={(e) =>
								setSettings((prev) => ({
									...prev,
									eventName: e.target.value,
								}))
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder={t('form.eventNamePlaceholder')}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.eventDescription')}
						</label>
						<textarea
							value={settings.eventDescription}
							onChange={(e) =>
								setSettings((prev) => ({
									...prev,
									eventDescription: e.target.value,
								}))
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							rows={3}
							placeholder={t('form.eventDescriptionPlaceholder')}
						/>
					</div>

					{/* Date and Time */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.targetDate')}
							</label>
							<input
								type='date'
								value={settings.targetDate}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										targetDate: e.target.value,
									}))
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.targetTime')}
							</label>
							<input
								type='time'
								value={settings.targetTime}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										targetTime: e.target.value,
									}))
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					{/* Color and Sound */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.color')}
							</label>
							<input
								type='color'
								value={settings.color}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										color: e.target.value,
									}))
								}
								className='w-full h-10 border border-gray-300 rounded-lg'
							/>
						</div>

						<div className='flex items-center'>
							<button
								onClick={() =>
									setSettings((prev) => ({
										...prev,
										soundEnabled: !prev.soundEnabled,
									}))
								}
								className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
									settings.soundEnabled
										? 'bg-green-600 text-white hover:bg-green-700'
										: 'bg-gray-400 text-white hover:bg-gray-500'
								}`}
							>
								{settings.soundEnabled ? (
									<Bell className='h-4 w-4 mr-2' />
								) : (
									<BellOff className='h-4 w-4 mr-2' />
								)}
								{t('form.sound')}
							</button>
						</div>
					</div>

					{/* Start Button */}
					<button
						onClick={handleStartCountdown}
						disabled={!settings.eventName.trim()}
						className='w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
					>
						<Play className='h-5 w-5 mr-2' />
						{t('form.startCountdown')}
					</button>
				</div>
			)}

			{/* Presets */}
			<div className='mt-8'>
				<div className='flex flex-wrap justify-center gap-4 mb-6'>
					<button
						onClick={() => setShowPresets(!showPresets)}
						className='flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
					>
						<Zap className='h-4 w-4 mr-2' />
						{t('form.presets')}
					</button>
				</div>

				{showPresets && (
					<div className='bg-gray-50 rounded-lg p-6'>
						<h3 className='text-lg font-semibold mb-4 text-center'>
							{t('form.presets')}
						</h3>

						{/* Popular Events */}
						<div className='mb-6'>
							<h4 className='font-medium text-gray-700 mb-3 flex items-center'>
								<Star className='h-4 w-4 mr-2' />
								{t('form.popularEvents')}
							</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
								{getPopularEvents().map((event, index) => (
									<button
										key={index}
										onClick={() =>
											handlePopularEventSelect(event)
										}
										className='p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors'
									>
										<div className='flex items-center mb-1'>
											{getEventIcon(event.name)}
											<span className='font-medium text-gray-900 ml-2'>
												{event.name}
											</span>
										</div>
										<p className='text-sm text-gray-600'>
											{event.description}
										</p>
									</button>
								))}
							</div>
						</div>

						{/* Quick Presets */}
						<div>
							<h4 className='font-medium text-gray-700 mb-3 flex items-center'>
								<Clock className='h-4 w-4 mr-2' />
								{t('form.quickPresets')}
							</h4>
							<div className='flex flex-wrap gap-2'>
								{getCountdownPresets().map((preset, index) => (
									<button
										key={index}
										onClick={() =>
											handlePresetSelect(preset)
										}
										className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors'
									>
										{preset.name}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
