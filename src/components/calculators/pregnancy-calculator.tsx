'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Calendar,
	RotateCcw,
	Copy,
	Share2,
	Heart,
	Clock,
	CalendarDays,
	Info,
} from 'lucide-react';
import {
	calculatePregnancy,
	validatePregnancyInput,
	formatDate,
	getTrimesterDescription,
	getWeekDayDisplay,
	getPregnancyStatus,
	type PregnancyInput,
	type PregnancyResult,
	type CalculationMethod,
} from '@/lib/calculators/pregnancy';

/**
 * Pregnancy Calculator Component
 * 
 * A React component for calculating pregnancy dates and milestones.
 * 
 * Features:
 * - Multiple calculation methods (LMP, conception date, due date)
 * - Pregnancy week calculation
 * - Trimester calculation
 * - Due date calculation
 * - Current pregnancy status
 * - Calendar visualization
 * - Share results
 * - Copy results to clipboard
 * - Responsive design
 * 
 * Calculation methods:
 * - LMP (Last Menstrual Period): Based on first day of last period
 * - Conception Date: Based on conception date
 * - Due Date: Based on expected due date
 * 
 * Uses the pregnancy calculation library from @/lib/calculators/pregnancy
 * for all date calculations.
 */
export default function PregnancyCalculator() {
	// Internationalization hooks for translations
	const t = useTranslations('calculators.pregnancy');
	const locale = useLocale(); // Current locale for date formatting

	// Form state management
	const [method, setMethod] = useState<CalculationMethod>('lmp'); // Calculation method (lmp, conception, dueDate)
	const [date, setDate] = useState<string>(''); // Input date (YYYY-MM-DD format)
	const [result, setResult] = useState<PregnancyResult | null>(null); // Calculated result
	const [error, setError] = useState<string | null>(null); // Validation error message
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation

	// Handle method change
	const handleMethodChange = (newMethod: CalculationMethod) => {
		setMethod(newMethod);
		setDate('');
		setResult(null);
		setError(null);
	};

	// Handle date change
	const handleDateChange = (newDate: string) => {
		setDate(newDate);
		setError(null);
	};

	// Handle calculation
	const handleCalculate = async () => {
		setIsCalculating(true);
		setError(null);

		try {
			if (!date) {
				throw new Error(t('form.errors.dateRequired'));
			}

			const inputDate = new Date(date);
			const input: PregnancyInput = {
				method,
				date: inputDate,
			};

			// Validate input
			const validation = validatePregnancyInput(input);
			if (!validation.isValid) {
				throw new Error(
					validation.error || t('form.errors.invalidDate')
				);
			}

			// Calculate pregnancy
			const pregnancyResult = calculatePregnancy(input);
			setResult(pregnancyResult);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: t('form.errors.calculationError')
			);
		} finally {
			setIsCalculating(false);
		}
	};

	// Handle reset
	const handleReset = () => {
		setMethod('lmp');
		setDate('');
		setResult(null);
		setError(null);
	};

	// Handle copy results
	const handleCopyResults = async () => {
		if (!result) return;

		const resultText = `
${t('pregnancy.result.title')}
${t('pregnancy.result.dueDate')}: ${formatDate(result.dueDate)}
${t('pregnancy.result.currentWeek')}: ${getWeekDayDisplay(
			result.currentWeek,
			result.currentDay
		)}
${t('pregnancy.result.trimester')}: ${t(
			`pregnancy.result.trimester${result.trimester}`
		)}
${t('pregnancy.result.daysRemaining')}: ${result.daysRemaining}
		`.trim();

		try {
			await navigator.clipboard.writeText(resultText);
			// You could add a toast notification here
		} catch (err) {
			console.error('Failed to copy results:', err);
		}
	};

	// Handle share
	const handleShare = async () => {
		if (!result) return;

		const shareData = {
			title: t('result.title'),
			text: `${t('result.dueDate')}: ${formatDate(result.dueDate)}`,
			url: window.location.href,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(window.location.href);
			}
		} catch (err) {
			console.error('Failed to share:', err);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center'
			>
				<div className='flex items-center justify-center mb-4'>
					<Heart className='w-8 h-8 text-pink-600 dark:text-pink-400 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</motion.div>

			{/* Method Selection */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'
			>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
					{t('form.methodTitle')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
					{/* LMP Method */}
					<button
						onClick={() => handleMethodChange('lmp')}
						className={`p-4 rounded-lg border-2 transition-all duration-200 ${
							method === 'lmp'
								? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
								: 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
						}`}
					>
						<Calendar className='w-6 h-6 mx-auto mb-2 text-pink-600 dark:text-pink-400' />
						<h3 className='font-medium text-gray-900 dark:text-white mb-1'>
							{t('form.methods.lmp.title')}
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{t('form.methods.lmp.description')}
						</p>
					</button>

					{/* Conception Method */}
					<button
						onClick={() => handleMethodChange('conception')}
						className={`p-4 rounded-lg border-2 transition-all duration-200 ${
							method === 'conception'
								? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
								: 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
						}`}
					>
						<Heart className='w-6 h-6 mx-auto mb-2 text-pink-600 dark:text-pink-400' />
						<h3 className='font-medium text-gray-900 dark:text-white mb-1'>
							{t('form.methods.conception.title')}
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{t('form.methods.conception.description')}
						</p>
					</button>

					{/* IVF Method */}
					<button
						onClick={() => handleMethodChange('ivf')}
						className={`p-4 rounded-lg border-2 transition-all duration-200 ${
							method === 'ivf'
								? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
								: 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
						}`}
					>
						<CalendarDays className='w-6 h-6 mx-auto mb-2 text-pink-600 dark:text-pink-400' />
						<h3 className='font-medium text-gray-900 dark:text-white mb-1'>
							{t('form.methods.ivf.title')}
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{t('form.methods.ivf.description')}
						</p>
					</button>
				</div>

				{/* Date Input */}
				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t(`form.dateLabels.${method}`)}
						</label>
						<input
							type='date'
							value={date}
							onChange={(e) => handleDateChange(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent'
						/>
					</div>

					{/* Method Info */}
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
						<div className='flex items-start'>
							<Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5' />
							<div>
								<h4 className='font-medium text-blue-900 dark:text-blue-300 mb-1'>
									{t('form.methodInfo.title')}
								</h4>
								<p className='text-sm text-blue-800 dark:text-blue-400'>
									{t(`form.methodInfo.${method}`)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating || !date}
						className='flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
					>
						{isCalculating ? (
							<>
								<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calendar className='w-5 h-5 mr-2' />
								{t('form.calculate')}
							</>
						)}
					</button>

					<button
						onClick={handleReset}
						className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
					>
						<RotateCcw className='w-5 h-5 mr-2' />
						{t('form.reset')}
					</button>
				</div>
			</motion.div>

			{/* Error Message */}
			<AnimatePresence>
				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'
					>
						<p className='text-red-800 dark:text-red-300'>
							{error}
						</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Results */}
			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'
					>
						<div className='text-center mb-6'>
							<Heart className='w-8 h-8 text-pink-600 dark:text-pink-400 mx-auto mb-2' />
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								{t('result.title')}
							</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
							{/* Due Date */}
							<div className='bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800'>
								<div className='flex items-center mb-2'>
									<Calendar className='w-5 h-5 text-pink-600 dark:text-pink-400 mr-2' />
									<h3 className='text-lg font-semibold text-pink-900 dark:text-pink-300'>
										{t('result.dueDate')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-pink-800 dark:text-pink-200'>
									{formatDate(result.dueDate, locale)}
								</p>
								<p className='text-sm text-pink-700 dark:text-pink-400 mt-1'>
									{t('result.dueDateRange')}:{' '}
									{formatDate(
										result.dueDateRange.earliest,
										locale
									)}{' '}
									-{' '}
									{formatDate(
										result.dueDateRange.latest,
										locale
									)}
								</p>
							</div>

							{/* Current Week */}
							<div className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
								<div className='flex items-center mb-2'>
									<Clock className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2' />
									<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-300'>
										{t('result.currentWeek')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-blue-800 dark:text-blue-200'>
									{getWeekDayDisplay(
										result.currentWeek,
										result.currentDay,
										locale
									)}
								</p>
								<p className='text-sm text-blue-700 dark:text-blue-400 mt-1'>
									{t('result.status')}:{' '}
									{getPregnancyStatus(
										result.currentWeek,
										locale
									)}
								</p>
							</div>

							{/* Trimester */}
							<div className='bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800'>
								<div className='flex items-center mb-2'>
									<Heart className='w-5 h-5 text-green-600 dark:text-green-400 mr-2' />
									<h3 className='text-lg font-semibold text-green-900 dark:text-green-300'>
										{t('result.trimester')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-green-800 dark:text-green-200'>
									{t(`result.trimester${result.trimester}`)}
								</p>
								<p className='text-sm text-green-700 dark:text-green-400 mt-1'>
									{getTrimesterDescription(
										result.trimester,
										locale
									)}
								</p>
							</div>

							{/* Days Remaining */}
							<div className='bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800'>
								<div className='flex items-center mb-2'>
									<CalendarDays className='w-5 h-5 text-purple-600 dark:text-purple-400 mr-2' />
									<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-300'>
										{t('result.daysRemaining')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-purple-800 dark:text-purple-200'>
									{result.daysRemaining} {t('result.days')}
								</p>
								<p className='text-sm text-purple-700 dark:text-purple-400 mt-1'>
									{result.daysRemaining > 0
										? t('result.untilBirth')
										: t('result.overdue')}
								</p>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-4'>
							<button
								onClick={handleCopyResults}
								className='flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
							>
								<Copy className='w-5 h-5 mr-2' />
								{t('result.copy')}
							</button>

							<button
								onClick={handleShare}
								className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
							>
								<Share2 className='w-5 h-5 mr-2' />
								{t('result.share')}
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
