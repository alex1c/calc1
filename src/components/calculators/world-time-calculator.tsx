'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
	Globe,
	Clock,
	Search,
	Plus,
	X,
	MapPin,
	Sun,
	Moon,
	Settings,
	RefreshCw,
	Copy,
	Check,
} from 'lucide-react';
import {
	getPopularCities,
	getAllCities,
	getCurrentTimeInCity,
	getCurrentTimeInMultipleCities,
	searchCities,
	compareTimes,
	WorldTimeCity,
	WorldTimeDisplay,
	WorldTimeSettings,
} from '@/lib/calculators/world-time';

/**
 * World Time Calculator Component
 * 
 * A React component for displaying current time in multiple cities worldwide.
 * 
 * Features:
 * - Multiple city selection
 * - Real-time clock updates
 * - City search functionality
 * - Popular cities quick selection
 * - Time zone information
 * - Daylight saving time (DST) support
 * - Customizable display format (12h/24h)
 * - Date format customization
 * - Add/remove cities dynamically
 * - Copy time to clipboard
 * - Responsive design
 * 
 * Uses the world time calculation library from @/lib/calculators/world-time
 * for all time zone calculations.
 */
export default function WorldTimeCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.worldTime');
	
	// Cities and time state management
	const [selectedCities, setSelectedCities] = useState<WorldTimeCity[]>(
		getPopularCities().slice(0, 4) // Default: first 4 popular cities
	);
	const [worldTimes, setWorldTimes] = useState<WorldTimeDisplay[]>([]); // Current times for selected cities
	const [searchQuery, setSearchQuery] = useState(''); // City search query
	const [searchResults, setSearchResults] = useState<WorldTimeCity[]>([]); // Search results
	const [showSearch, setShowSearch] = useState(false); // Show search panel flag
	const [showSettings, setShowSettings] = useState(false); // Show settings panel flag
	
	// Display settings
	const [settings, setSettings] = useState<WorldTimeSettings>({
		selectedCities: [], // Selected cities for settings
		showSeconds: true, // Show seconds in time display
		showDate: true, // Show date in time display
		showDayOfWeek: true, // Show day of week
		showDST: true, // Show daylight saving time indicator
		timeFormat: '24h', // Time format (12h, 24h)
		dateFormat: 'DD/MM/YYYY', // Date format
	});
	const [isMounted, setIsMounted] = useState(false); // Component mount state
	const [copiedCity, setCopiedCity] = useState<string | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setIsMounted(true);
		// Load saved cities from localStorage
		const savedCities = localStorage.getItem('world-time-cities');
		if (savedCities) {
			try {
				const cities = JSON.parse(savedCities);
				setSelectedCities(cities);
			} catch (error) {
				console.warn('Could not load saved cities:', error);
			}
		}
	}, []);

	useEffect(() => {
		// Update times every second
		intervalRef.current = setInterval(() => {
			updateWorldTimes();
		}, 1000);

		// Initial update
		updateWorldTimes();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [selectedCities]);

	useEffect(() => {
		// Save cities to localStorage
		localStorage.setItem(
			'world-time-cities',
			JSON.stringify(selectedCities)
		);
	}, [selectedCities]);

	const updateWorldTimes = () => {
		const times = getCurrentTimeInMultipleCities(selectedCities);
		setWorldTimes(times);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim()) {
			const results = searchCities(query, getAllCities());
			setSearchResults(results.slice(0, 10)); // Limit to 10 results
		} else {
			setSearchResults([]);
		}
	};

	const handleAddCity = (city: WorldTimeCity) => {
		if (!selectedCities.find((c) => c.id === city.id)) {
			setSelectedCities((prev) => [...prev, city]);
		}
		setSearchQuery('');
		setSearchResults([]);
		setShowSearch(false);
	};

	const handleRemoveCity = (cityId: string) => {
		setSelectedCities((prev) => prev.filter((city) => city.id !== cityId));
	};

	const handleCopyTime = async (city: WorldTimeDisplay) => {
		const timeString = `${city.city.name}: ${city.formattedTime} (${city.utcOffset})`;
		try {
			await navigator.clipboard.writeText(timeString);
			setCopiedCity(city.city.id);
			setTimeout(() => setCopiedCity(null), 2000);
		} catch (error) {
			console.warn('Could not copy to clipboard:', error);
		}
	};

	const getTimeIcon = (time: WorldTimeDisplay) => {
		const hour = time.currentTime.getHours();
		if (hour >= 6 && hour < 12)
			return <Sun className='h-4 w-4 text-yellow-500' />;
		if (hour >= 12 && hour < 18)
			return <Sun className='h-4 w-4 text-orange-500' />;
		if (hour >= 18 && hour < 22)
			return <Sun className='h-4 w-4 text-red-500' />;
		return <Moon className='h-4 w-4 text-blue-500' />;
	};

	const getTimeColor = (time: WorldTimeDisplay) => {
		const hour = time.currentTime.getHours();
		if (hour >= 6 && hour < 12) return 'bg-yellow-50 border-yellow-200';
		if (hour >= 12 && hour < 18) return 'bg-orange-50 border-orange-200';
		if (hour >= 18 && hour < 22) return 'bg-red-50 border-red-200';
		return 'bg-blue-50 border-blue-200';
	};

	// Show loading state during hydration
	if (!isMounted) {
		return (
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
						<Globe className='h-8 w-8 text-blue-600' />
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
					<Globe className='h-8 w-8 text-blue-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('title')}
				</h2>
				<p className='text-gray-600'>{t('description')}</p>
			</div>

			{/* Search and Controls */}
			<div className='flex flex-wrap justify-center gap-4 mb-8'>
				<button
					onClick={() => setShowSearch(!showSearch)}
					className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
				>
					<Search className='h-4 w-4 mr-2' />
					{t('form.addCity')}
				</button>
				<button
					onClick={() => setShowSettings(!showSettings)}
					className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
				>
					<Settings className='h-4 w-4 mr-2' />
					{t('form.settings')}
				</button>
				<button
					onClick={updateWorldTimes}
					className='flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
				>
					<RefreshCw className='h-4 w-4 mr-2' />
					{t('form.refresh')}
				</button>
			</div>

			{/* Search Modal */}
			{showSearch && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg font-semibold'>
								{t('form.searchCities')}
							</h3>
							<button
								onClick={() => setShowSearch(false)}
								className='text-gray-400 hover:text-gray-600'
							>
								<X className='h-5 w-5' />
							</button>
						</div>

						<div className='mb-4'>
							<input
								type='text'
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder={t('form.searchPlaceholder')}
							/>
						</div>

						<div className='max-h-60 overflow-y-auto'>
							{searchResults.map((city) => (
								<button
									key={city.id}
									onClick={() => handleAddCity(city)}
									className='w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors'
								>
									<div className='flex items-center justify-between'>
										<div>
											<div className='font-medium text-gray-900'>
												{city.name}
											</div>
											<div className='text-sm text-gray-500'>
												{city.country}
											</div>
										</div>
										<Plus className='h-4 w-4 text-gray-400' />
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Settings */}
			{showSettings && (
				<div className='bg-gray-50 rounded-lg p-6 mb-6'>
					<h3 className='text-lg font-semibold mb-4 text-center'>
						{t('form.settings')}
					</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.timeFormat')}
							</label>
							<select
								value={settings.timeFormat}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										timeFormat: e.target.value as
											| '12h'
											| '24h',
									}))
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value='24h'>
									{t('form.format24h')}
								</option>
								<option value='12h'>
									{t('form.format12h')}
								</option>
							</select>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.dateFormat')}
							</label>
							<select
								value={settings.dateFormat}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										dateFormat: e.target.value as any,
									}))
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value='DD/MM/YYYY'>DD/MM/YYYY</option>
								<option value='MM/DD/YYYY'>MM/DD/YYYY</option>
								<option value='YYYY-MM-DD'>YYYY-MM-DD</option>
							</select>
						</div>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={settings.showSeconds}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										showSeconds: e.target.checked,
									}))
								}
								className='mr-2'
							/>
							<span className='text-sm text-gray-700'>
								{t('form.showSeconds')}
							</span>
						</label>

						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={settings.showDate}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										showDate: e.target.checked,
									}))
								}
								className='mr-2'
							/>
							<span className='text-sm text-gray-700'>
								{t('form.showDate')}
							</span>
						</label>

						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={settings.showDayOfWeek}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										showDayOfWeek: e.target.checked,
									}))
								}
								className='mr-2'
							/>
							<span className='text-sm text-gray-700'>
								{t('form.showDayOfWeek')}
							</span>
						</label>

						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={settings.showDST}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										showDST: e.target.checked,
									}))
								}
								className='mr-2'
							/>
							<span className='text-sm text-gray-700'>
								{t('form.showDST')}
							</span>
						</label>
					</div>
				</div>
			)}

			{/* World Time Display */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
				{worldTimes.map((time) => (
					<div
						key={time.city.id}
						className={`rounded-lg border-2 p-4 transition-all duration-300 ${getTimeColor(
							time
						)}`}
					>
						<div className='flex items-center justify-between mb-3'>
							<div className='flex items-center'>
								{getTimeIcon(time)}
								<div className='ml-2'>
									<h3 className='font-semibold text-gray-900'>
										{time.city.name}
									</h3>
									<p className='text-sm text-gray-600'>
										{time.city.country}
									</p>
								</div>
							</div>
							<button
								onClick={() => handleRemoveCity(time.city.id)}
								className='text-gray-400 hover:text-red-500 transition-colors'
							>
								<X className='h-4 w-4' />
							</button>
						</div>

						<div className='text-center mb-3'>
							<div className='text-2xl font-bold text-gray-900 mb-1'>
								{time.formattedTime}
							</div>
							{settings.showDate && (
								<div className='text-sm text-gray-600 mb-1'>
									{time.formattedDate}
								</div>
							)}
							{settings.showDayOfWeek && (
								<div className='text-sm text-gray-500 mb-1'>
									{time.dayOfWeek}
								</div>
							)}
							<div className='text-xs text-gray-500'>
								{time.utcOffset}
								{settings.showDST && time.isDST && (
									<span className='ml-1 text-orange-600'>
										DST
									</span>
								)}
							</div>
						</div>

						<button
							onClick={() => handleCopyTime(time)}
							className='w-full flex items-center justify-center px-3 py-2 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-75 transition-colors'
						>
							{copiedCity === time.city.id ? (
								<Check className='h-4 w-4 text-green-600' />
							) : (
								<Copy className='h-4 w-4 text-gray-600' />
							)}
							<span className='ml-2 text-sm'>
								{copiedCity === time.city.id
									? t('form.copied')
									: t('form.copy')}
							</span>
						</button>
					</div>
				))}
			</div>

			{/* Empty State */}
			{selectedCities.length === 0 && (
				<div className='text-center py-12'>
					<Globe className='h-16 w-16 text-gray-300 mx-auto mb-4' />
					<h3 className='text-lg font-semibold text-gray-900 mb-2'>
						{t('form.noCities')}
					</h3>
					<p className='text-gray-600 mb-4'>
						{t('form.noCitiesDesc')}
					</p>
					<button
						onClick={() => setShowSearch(true)}
						className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto'
					>
						<Plus className='h-4 w-4 mr-2' />
						{t('form.addFirstCity')}
					</button>
				</div>
			)}
		</div>
	);
}
