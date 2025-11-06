'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, Copy, RefreshCw, Calculator } from 'lucide-react';
import {
	calculateDaysBetween,
	getTodayDate,
	isValidDate,
} from '@/lib/calculators/days-between';

interface DaysBetweenResult {
	totalDays: number;
	weeks: number;
	months: number;
	years: number;
	days: number;
	startDate: string;
	endDate: string;
}

export default function DaysBetweenCalculator() {
	const t = useTranslations('calculators.daysBetween');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [result, setResult] = useState<DaysBetweenResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [copied, setCopied] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// Set today as default end date only after component mounts
	useEffect(() => {
		setIsMounted(true);
		if (!endDate) {
			setEndDate(getTodayDate());
		}
	}, []);

	const handleCalculate = async () => {
		if (!startDate || !endDate) return;

		if (!isValidDate(startDate) || !isValidDate(endDate)) {
			alert('Пожалуйста, введите корректные даты');
			return;
		}

		setIsCalculating(true);

		try {
			const calculation = calculateDaysBetween(startDate, endDate);
			setResult(calculation);
		} catch (error) {
			console.error('Calculation error:', error);
			alert('Ошибка при расчёте. Проверьте введённые даты.');
		} finally {
			setIsCalculating(false);
		}
	};

	const handleReset = () => {
		setStartDate('');
		setEndDate(getTodayDate());
		setResult(null);
		setCopied(false);
	};

	const handleSetToday = () => {
		setEndDate(getTodayDate());
	};

	const handleCopyResult = async () => {
		if (!result) return;

		const resultText = `${t('results.copyText.title')}
${t('results.copyText.startDate')} ${result.startDate}
${t('results.copyText.endDate')} ${result.endDate}
${t('results.copyText.totalDays')} ${result.totalDays}
${t('results.copyText.thisIs')} ${result.weeks} ${t('results.copyText.weeks')} ${result.days} ${t('results.copyText.days')}
${t('results.copyText.inCalculation')} ${result.years} ${t('results.copyText.years')} ${result.months} ${t('results.copyText.months')} ${result.days} ${t('results.copyText.days2')}`;

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
					<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
						<Calendar className='h-8 w-8 text-blue-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						{t('form.title')}
					</h2>
					<p className='text-gray-600'>
						{t('form.description')}
					</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<RefreshCw className='h-8 w-8 animate-spin text-blue-600' />
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow-lg p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
					<Calendar className='h-8 w-8 text-blue-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('form.title')}
				</h2>
				<p className='text-gray-600'>
					Введите две даты для расчёта разницы
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
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder={t('form.startDatePlaceholder')}
						/>
					</div>
				</div>

				{/* End Date */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.endDate')}
					</label>
					<div className='relative'>
						<input
							type='date'
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder={t('form.endDatePlaceholder')}
						/>
						<button
							onClick={handleSetToday}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800'
						>
							{t('form.today')}
						</button>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						onClick={handleCalculate}
						disabled={!startDate || !endDate || isCalculating}
						className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
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
				<div className='mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200'>
					<div className='text-center mb-6'>
						<h3 className='text-xl font-bold text-gray-900 mb-2'>
							{t('results.title')}
						</h3>
						<p className='text-gray-600'>
							С {result.startDate} по {result.endDate}
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-blue-600'>
								{result.totalDays}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.totalDays')}
							</div>
						</div>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-green-600'>
								{result.weeks}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.weeks')}
							</div>
						</div>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-purple-600'>
								{result.months}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.months')}
							</div>
						</div>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-orange-600'>
								{result.years}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.years')}
							</div>
						</div>
					</div>

					<div className='text-center'>
						<button
							onClick={handleCopyResult}
							className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto'
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
