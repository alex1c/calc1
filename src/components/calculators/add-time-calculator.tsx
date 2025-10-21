'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calendar,
	Clock,
	Copy,
	RefreshCw,
	Calculator,
	Plus,
} from 'lucide-react';
import {
	addTimeToDate,
	getCurrentDateTime,
	isValidDate,
	isValidTime,
} from '@/lib/calculators/add-time';

interface AddTimeResult {
	resultDate: string;
	resultTime: string;
	dayOfWeek: string;
	formattedDate: string;
}

export default function AddTimeCalculator() {
	const t = useTranslations('calculators.addTime');
	const [startDate, setStartDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [addDays, setAddDays] = useState(0);
	const [addHours, setAddHours] = useState(0);
	const [addMinutes, setAddMinutes] = useState(0);
	const [result, setResult] = useState<AddTimeResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [copied, setCopied] = useState(false);

	// Set current date and time as default
	useEffect(() => {
		if (!startDate || !startTime) {
			const { date, time } = getCurrentDateTime();
			setStartDate(date);
			setStartTime(time);
		}
	}, [startDate, startTime]);

	const handleCalculate = async () => {
		if (!startDate || !startTime) return;

		if (!isValidDate(startDate) || !isValidTime(startTime)) {
			alert('Пожалуйста, введите корректные дату и время');
			return;
		}

		setIsCalculating(true);

		// Simulate calculation delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		try {
			const calculation = addTimeToDate(
				startDate,
				startTime,
				addDays,
				addHours,
				addMinutes
			);
			setResult(calculation);
		} catch (error) {
			console.error('Calculation error:', error);
			alert('Ошибка при расчёте. Проверьте введённые данные.');
		} finally {
			setIsCalculating(false);
		}
	};

	const handleReset = () => {
		const { date, time } = getCurrentDateTime();
		setStartDate(date);
		setStartTime(time);
		setAddDays(0);
		setAddHours(0);
		setAddMinutes(0);
		setResult(null);
		setCopied(false);
	};

	const handleSetNow = () => {
		const { date, time } = getCurrentDateTime();
		setStartDate(date);
		setStartTime(time);
	};

	const handleCopyResult = async () => {
		if (!result) return;

		const resultText = `Результат прибавления времени:
Начальная дата: ${startDate} ${startTime}
Добавлено: ${addDays} дней, ${addHours} часов, ${addMinutes} минут
Итоговая дата: ${result.formattedDate} ${result.resultTime}
День недели: ${result.dayOfWeek}`;

		try {
			await navigator.clipboard.writeText(resultText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error('Copy failed:', error);
		}
	};

	return (
		<div className='bg-white rounded-lg shadow-lg p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
					<Plus className='h-8 w-8 text-green-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('form.title')}
				</h2>
				<p className='text-gray-600'>
					Добавьте дни, часы и минуты к дате
				</p>
			</div>

			{/* Form */}
			<div className='space-y-6'>
				{/* Start Date and Time */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.startDate')}
						</label>
						<div className='relative'>
							<input
								type='date'
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
							<button
								onClick={handleSetNow}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-green-600 hover:text-green-800'
							>
								{t('form.today')}
							</button>
						</div>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.startTime')}
						</label>
						<div className='relative'>
							<input
								type='time'
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
							<button
								onClick={handleSetNow}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-green-600 hover:text-green-800'
							>
								{t('form.now')}
							</button>
						</div>
					</div>
				</div>

				{/* Add Time Fields */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.addDays')}
						</label>
						<input
							type='number'
							value={addDays}
							onChange={(e) =>
								setAddDays(parseInt(e.target.value) || 0)
							}
							min='0'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.addHours')}
						</label>
						<input
							type='number'
							value={addHours}
							onChange={(e) =>
								setAddHours(parseInt(e.target.value) || 0)
							}
							min='0'
							max='23'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.addMinutes')}
						</label>
						<input
							type='number'
							value={addMinutes}
							onChange={(e) =>
								setAddMinutes(parseInt(e.target.value) || 0)
							}
							min='0'
							max='59'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						onClick={handleCalculate}
						disabled={!startDate || !startTime || isCalculating}
						className='flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
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
				<div className='mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200'>
					<div className='text-center mb-6'>
						<h3 className='text-xl font-bold text-gray-900 mb-2'>
							{t('results.title')}
						</h3>
						<p className='text-gray-600'>
							Добавлено: {addDays} дней, {addHours} часов,{' '}
							{addMinutes} минут
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div className='bg-white p-6 rounded-lg text-center'>
							<div className='text-2xl font-bold text-green-600 mb-2'>
								{result.formattedDate}
							</div>
							<div className='text-sm text-gray-600 mb-1'>
								{t('results.resultDate')}
							</div>
							<div className='text-lg font-semibold text-gray-800'>
								{result.resultTime}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.resultTime')}
							</div>
						</div>
						<div className='bg-white p-6 rounded-lg text-center'>
							<div className='text-2xl font-bold text-blue-600 mb-2'>
								{result.dayOfWeek}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.dayOfWeek')}
							</div>
						</div>
					</div>

					<div className='text-center'>
						<button
							onClick={handleCopyResult}
							className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto'
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
					<Clock className='h-12 w-12 mx-auto mb-4 text-gray-300' />
					<p>{t('results.placeholder')}</p>
				</div>
			)}
		</div>
	);
}
