'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calendar,
	Heart,
	Clock,
	CalendarDays,
	Info,
	AlertCircle,
	CheckCircle,
	Flower,
	Zap,
} from 'lucide-react';
import {
	calculateOvulation,
	validateOvulationInput,
	generateCalendarData,
	formatDate,
	getDayName,
	getMonthName,
	CYCLE_TYPES,
	getCycleType,
	OvulationInput,
	OvulationResult,
} from '@/lib/calculators/ovulation';

/**
 * Ovulation Calculator Component
 * Interactive calculator for menstrual cycle and ovulation tracking
 */
export default function OvulationCalculator() {
	const t = useTranslations('calculators.ovulation');

	// State for input values
	const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
	const [cycleLength, setCycleLength] = useState<string>('28');
	const [periodLength, setPeriodLength] = useState<string>('5');
	const [result, setResult] = useState<OvulationResult | null>(null);
	const [error, setError] = useState<string>('');
	const [isCalculating, setIsCalculating] = useState<boolean>(false);
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

	/**
	 * Handle form submission and ovulation calculation
	 */
	const handleCalculate = async () => {
		setError('');
		setIsCalculating(true);

		try {
			const lastPeriod = new Date(lastPeriodDate);
			const cycleLengthNum = parseInt(cycleLength);
			const periodLengthNum = parseInt(periodLength);

			// Validate input
			const validation = validateOvulationInput({
				lastPeriodDate: lastPeriod,
				cycleLength: cycleLengthNum,
				periodLength: periodLengthNum,
			});

			if (!validation.isValid) {
				setError(t(`form.errors.${validation.error}`));
				return;
			}

			// Calculate ovulation
			const ovulationResult = calculateOvulation({
				lastPeriodDate: lastPeriod,
				cycleLength: cycleLengthNum,
				periodLength: periodLengthNum,
			});

			setResult(ovulationResult);

			// Set calendar to show the month with ovulation
			setCurrentMonth(new Date(ovulationResult.ovulationDate));
		} catch (err) {
			setError(t('form.errors.calculationError'));
		} finally {
			setIsCalculating(false);
		}
	};

	/**
	 * Reset form and clear results
	 */
	const handleReset = () => {
		setLastPeriodDate('');
		setCycleLength('28');
		setPeriodLength('5');
		setResult(null);
		setError('');
		setCurrentMonth(new Date());
	};

	/**
	 * Navigate calendar months
	 */
	const navigateMonth = (direction: 'prev' | 'next') => {
		const newMonth = new Date(currentMonth);
		if (direction === 'prev') {
			newMonth.setMonth(newMonth.getMonth() - 1);
		} else {
			newMonth.setMonth(newMonth.getMonth() + 1);
		}
		setCurrentMonth(newMonth);
	};

	/**
	 * Get color classes for calendar day
	 */
	const getDayColorClasses = (day: {
		isPeriod: boolean;
		isFertile: boolean;
		isOvulation: boolean;
		isToday: boolean;
	}) => {
		if (day.isToday) {
			return 'bg-blue-100 border-2 border-blue-500 text-blue-900 font-bold';
		}
		if (day.isOvulation) {
			return 'bg-pink-100 text-pink-800 border-pink-200';
		}
		if (day.isFertile) {
			return 'bg-green-100 text-green-800 border-green-200';
		}
		if (day.isPeriod) {
			return 'bg-red-100 text-red-800 border-red-200';
		}
		return 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
	};

	/**
	 * Get cycle type info
	 */
	const getCycleTypeInfo = () => {
		if (!result) return null;
		return getCycleType(result.cycleInfo.cycleLength);
	};

	return (
		<div className='max-w-6xl mx-auto'>
			{/* Page Header with Infographic */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-pink-100 dark:bg-pink-900 rounded-full'>
							<Heart className='w-12 h-12 text-pink-600 dark:text-pink-400' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Infographic */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<div className='text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2'>
							{t('infographic.ovulation')}
						</div>
						<div className='text-sm text-pink-800 dark:text-pink-200'>
							{t('infographic.ovulationDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.fertile')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.fertileDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
							{t('infographic.cycle')}
						</div>
						<div className='text-sm text-blue-800 dark:text-blue-200'>
							{t('infographic.cycleDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Card */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-pink-100 dark:bg-pink-900 rounded-lg'>
						<Calendar className='w-6 h-6 text-pink-600 dark:text-pink-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('form.title')}
					</h2>
				</div>

				{/* Input Form */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
					{/* Last Period Date */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<CalendarDays className='w-4 h-4' />
							{t('form.lastPeriodDate')}
						</label>
						<input
							type='date'
							value={lastPeriodDate}
							onChange={(e) => setLastPeriodDate(e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						/>
					</div>

					{/* Cycle Length */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Clock className='w-4 h-4' />
							{t('form.cycleLength')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={cycleLength}
								onChange={(e) => setCycleLength(e.target.value)}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='15'
								max='45'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.days')}
							</span>
						</div>
					</div>

					{/* Period Length */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Flower className='w-4 h-4' />
							{t('form.periodLength')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={periodLength}
								onChange={(e) =>
									setPeriodLength(e.target.value)
								}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='1'
								max='10'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.days')}
							</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 mb-6'>
					<button
						onClick={handleCalculate}
						disabled={
							isCalculating ||
							!lastPeriodDate ||
							!cycleLength ||
							!periodLength
						}
						className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Zap className='w-4 h-4' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors'
					>
						{t('form.reset')}
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className='flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6'>
						<AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
						<span className='text-red-700 dark:text-red-300'>
							{error}
						</span>
					</div>
				)}

				{/* Results */}
				{result && (
					<div className='space-y-6'>
						{/* Key Dates */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
							<div className='p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center'>
								<div className='text-sm text-pink-600 dark:text-pink-400 mb-1'>
									{t('results.ovulation')}
								</div>
								<div className='font-bold text-pink-800 dark:text-pink-200'>
									{formatDate(result.ovulationDate)}
								</div>
							</div>
							<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center'>
								<div className='text-sm text-green-600 dark:text-green-400 mb-1'>
									{t('results.fertileStart')}
								</div>
								<div className='font-bold text-green-800 dark:text-green-200'>
									{formatDate(result.fertileStart)}
								</div>
							</div>
							<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center'>
								<div className='text-sm text-green-600 dark:text-green-400 mb-1'>
									{t('results.fertileEnd')}
								</div>
								<div className='font-bold text-green-800 dark:text-green-200'>
									{formatDate(result.fertileEnd)}
								</div>
							</div>
							<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center'>
								<div className='text-sm text-red-600 dark:text-red-400 mb-1'>
									{t('results.nextPeriod')}
								</div>
								<div className='font-bold text-red-800 dark:text-red-200'>
									{formatDate(result.nextPeriod)}
								</div>
							</div>
						</div>

						{/* Cycle Information */}
						<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
								{t('results.cycleInfo')}
							</h4>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
								<div>
									<span className='text-blue-700 dark:text-blue-300'>
										{t('results.cycleLength')}:
									</span>
									<span className='ml-2 font-medium'>
										{result.cycleInfo.cycleLength}{' '}
										{t('form.days')}
									</span>
								</div>
								<div>
									<span className='text-blue-700 dark:text-blue-300'>
										{t('results.periodLength')}:
									</span>
									<span className='ml-2 font-medium'>
										{result.cycleInfo.periodLength}{' '}
										{t('form.days')}
									</span>
								</div>
								<div>
									<span className='text-blue-700 dark:text-blue-300'>
										{t('results.ovulationDay')}:
									</span>
									<span className='ml-2 font-medium'>
										{result.cycleInfo.ovulationDay}
									</span>
								</div>
							</div>
							{getCycleTypeInfo() && (
								<div className='mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg'>
									<div className='flex items-center gap-2 mb-1'>
										<Info className='w-4 h-4 text-blue-600' />
										<span className='font-medium text-blue-800 dark:text-blue-200'>
											{t(
												`cycleTypes.${
													getCycleTypeInfo()?.name
												}.title`
											)}
										</span>
									</div>
									<p className='text-sm text-blue-700 dark:text-blue-300'>
										{t(
											`cycleTypes.${
												getCycleTypeInfo()?.name
											}.description`
										)}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Calendar */}
			{result && (
				<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
					<div className='flex items-center justify-between mb-6'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
							{t('calendar.title')}
						</h3>
						<div className='flex gap-2'>
							<button
								onClick={() => navigateMonth('prev')}
								className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
							>
								←
							</button>
							<button
								onClick={() => navigateMonth('next')}
								className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
							>
								→
							</button>
						</div>
					</div>

					<div className='mb-4'>
						<h4 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
							{getMonthName(currentMonth)}{' '}
							{currentMonth.getFullYear()}
						</h4>
					</div>

					{/* Calendar Grid */}
					<div className='grid grid-cols-7 gap-1 mb-4'>
						{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
							(day) => (
								<div
									key={day}
									className='p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400'
								>
									{day}
								</div>
							)
						)}
					</div>

					<div className='grid grid-cols-7 gap-1'>
						{generateCalendarData(currentMonth, result).map(
							(day, index) => (
								<div
									key={index}
									className={`p-2 text-center text-sm border rounded-lg ${getDayColorClasses(
										day
									)}`}
								>
									{day.date.getDate()}
								</div>
							)
						)}
					</div>

					{/* Legend */}
					<div className='mt-6 flex flex-wrap gap-4 justify-center'>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 bg-red-100 border border-red-200 rounded'></div>
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								{t('calendar.legend.period')}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 bg-green-100 border border-green-200 rounded'></div>
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								{t('calendar.legend.fertile')}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 bg-pink-100 border border-pink-200 rounded'></div>
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								{t('calendar.legend.ovulation')}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded'></div>
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								{t('calendar.legend.today')}
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Tips */}
			<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
					<h4 className='font-semibold text-yellow-800 dark:text-yellow-200'>
						{t('tips.title')}
					</h4>
				</div>
				<div className='space-y-2 text-sm text-yellow-700 dark:text-yellow-300'>
					<p>{t('tips.variation')}</p>
					<p>{t('tips.consultation')}</p>
					<p>{t('tips.tracking')}</p>
				</div>
			</div>
		</div>
	);
}
