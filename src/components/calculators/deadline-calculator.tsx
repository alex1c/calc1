'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calendar,
	Clock,
	Copy,
	RefreshCw,
	Calculator,
	Target,
	CalendarDays,
	Briefcase,
} from 'lucide-react';
import {
	calculateDeadline,
	getTodayDate,
	isValidDate,
} from '@/lib/calculators/deadline';

interface DeadlineResult {
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

export default function DeadlineCalculator() {
	const t = useTranslations('calculators.deadline');
	const [startDate, setStartDate] = useState('');
	const [duration, setDuration] = useState(0);
	const [isWorkDays, setIsWorkDays] = useState(true);
	const [result, setResult] = useState<DeadlineResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [copied, setCopied] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// Set today as default start date only after component mounts
	useEffect(() => {
		setIsMounted(true);
		if (!startDate) {
			setStartDate(getTodayDate());
		}
	}, []);

	const handleCalculate = async () => {
		if (!startDate || !duration) return;

		if (!isValidDate(startDate)) {
			alert('Пожалуйста, введите корректную дату');
			return;
		}

		if (duration <= 0) {
			alert('Количество дней должно быть больше 0');
			return;
		}

		setIsCalculating(true);

		try {
			const calculation = calculateDeadline(startDate, duration, isWorkDays);
			setResult(calculation);
		} catch (error) {
			console.error('Calculation error:', error);
			alert('Ошибка при расчёте. Проверьте введённые данные.');
		} finally {
			setIsCalculating(false);
		}
	};

	const handleReset = () => {
		setStartDate(getTodayDate());
		setDuration(0);
		setIsWorkDays(true);
		setResult(null);
		setCopied(false);
	};

	const handleSetToday = () => {
		setStartDate(getTodayDate());
	};

	const handleCopyResult = async () => {
		if (!result) return;

		const resultText = `Расчёт срока выполнения:
Стартовая дата: ${result.startDate}
Длительность: ${result.duration} ${result.isWorkDays ? 'рабочих' : 'календарных'} дней
Конечная дата: ${result.formattedEndDate} (${result.dayOfWeek})
Всего дней: ${result.totalDays}
Рабочих дней: ${result.workDays}
Выходных: ${result.weekends}`;

		try {
			await navigator.clipboard.writeText(resultText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error('Copy failed:', error);
		}
	};

	// Show loading state during hydration
	if (!isMounted) {
		return (
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4'>
						<Target className='h-8 w-8 text-orange-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						{t('form.title')}
					</h2>
					<p className='text-gray-600'>
						{t('form.description')}
					</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<RefreshCw className='h-8 w-8 animate-spin text-orange-600' />
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow-lg p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4'>
					<Target className='h-8 w-8 text-orange-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('form.title')}
				</h2>
				<p className='text-gray-600'>
					{t('form.description')}
				</p>
			</div>

			{/* Form */}
			<div className='space-y-6'>
				{/* Start Date */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.startDate')}
					</label>
					<div className='relative'>
						<input
							type='date'
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
						<button
							onClick={handleSetToday}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-orange-600 hover:text-orange-800'
						>
							{t('form.today')}
						</button>
					</div>
				</div>

				{/* Duration */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.duration')}
					</label>
					<input
						type='number'
						value={duration}
						onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
						min='1'
						className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
					/>
				</div>

				{/* Day Type Selection */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-3'>
						{t('form.dayType')}
					</label>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<button
							onClick={() => setIsWorkDays(true)}
							className={`p-4 rounded-lg border-2 transition-colors ${
								isWorkDays
									? 'border-orange-500 bg-orange-50 text-orange-700'
									: 'border-gray-200 hover:border-gray-300'
							}`}
						>
							<div className='flex items-center mb-2'>
								<Briefcase className='h-5 w-5 mr-2' />
								<span className='font-medium'>{t('form.workDays')}</span>
							</div>
							<p className='text-sm text-gray-600'>
								{t('form.workDaysDesc')}
							</p>
						</button>
						<button
							onClick={() => setIsWorkDays(false)}
							className={`p-4 rounded-lg border-2 transition-colors ${
								!isWorkDays
									? 'border-orange-500 bg-orange-50 text-orange-700'
									: 'border-gray-200 hover:border-gray-300'
							}`}
						>
							<div className='flex items-center mb-2'>
								<CalendarDays className='h-5 w-5 mr-2' />
								<span className='font-medium'>{t('form.calendarDays')}</span>
							</div>
							<p className='text-sm text-gray-600'>
								{t('form.calendarDaysDesc')}
							</p>
						</button>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						onClick={handleCalculate}
						disabled={!startDate || !duration || isCalculating}
						className='flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
					>
						{isCalculating ? (
							<>
								<RefreshCw className='h-4 w-4 mr-2 animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calculator className='h-4 w-4 mr-2' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
					>
						<RefreshCw className='h-4 w-4 mr-2 inline' />
						{t('form.reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<div className='mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200'>
					<div className='text-center mb-6'>
						<h3 className='text-xl font-bold text-gray-900 mb-2'>
							{t('results.title')}
						</h3>
						<p className='text-gray-600'>
							Длительность: {result.duration} {result.isWorkDays ? 'рабочих' : 'календарных'} дней
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div className='bg-white p-6 rounded-lg text-center'>
							<div className='text-2xl font-bold text-orange-600 mb-2'>
								{result.formattedEndDate}
							</div>
							<div className='text-sm text-gray-600 mb-1'>
								{t('results.endDate')}
							</div>
							<div className='text-lg font-semibold text-gray-800'>
								{result.dayOfWeek}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.dayOfWeek')}
							</div>
						</div>
						<div className='bg-white p-6 rounded-lg text-center'>
							<div className='text-2xl font-bold text-blue-600 mb-2'>
								{result.totalDays}
							</div>
							<div className='text-sm text-gray-600 mb-1'>
								{t('results.totalDays')}
							</div>
							<div className='text-lg font-semibold text-gray-800'>
								{result.workDays} {t('results.workDays')}
							</div>
							<div className='text-sm text-gray-600'>
								{result.weekends} {t('results.weekends')}
							</div>
						</div>
					</div>

					<div className='text-center'>
						<button
							onClick={handleCopyResult}
							className='bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center mx-auto'
						>
							<Copy className='h-4 w-4 mr-2' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
					</div>
				</div>
			)}

			{/* Placeholder */}
			{!result && (
				<div className='mt-8 text-center py-12 text-gray-500'>
					<Calendar className='h-12 w-12 mx-auto mb-4 text-gray-300' />
					<p>{t('results.placeholder')}</p>
				</div>
			)}
		</div>
	);
}


