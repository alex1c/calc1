'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	calculateStatistics,
	parseNumbers,
	validateInput,
	formatNumber,
	type StatisticsResult,
} from '@/lib/calculators/statistics';
import { Calculator, BarChart3, TrendingUp, Minus, Plus } from 'lucide-react';

/**
 * Statistics Calculator Component
 * 
 * A React component for calculating various statistical measures from a dataset.
 * 
 * Features:
 * - Accepts numbers separated by commas, spaces, or newlines
 * - Calculates multiple statistics: mean, median, mode, range, variance, standard deviation
 * - Input validation with error messages
 * - Animated result cards
 * - Responsive design
 * 
 * Statistical measures calculated:
 * - Mean (average)
 * - Median (middle value)
 * - Mode (most frequent value)
 * - Range (difference between max and min)
 * - Variance (measure of spread)
 * - Standard deviation (square root of variance)
 * 
 * Uses the statistics calculation library from @/lib/calculators/statistics
 * for all mathematical operations.
 */
export default function StatisticsCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.statistics');

	// State for input and results
	const [input, setInput] = useState(''); // Raw input string (numbers separated by commas/spaces/newlines)
	const [result, setResult] = useState<StatisticsResult | null>(null); // Calculated statistics result
	const [error, setError] = useState<string | null>(null); // Validation error message

	/**
	 * Handle calculate button click
	 * 
	 * Validates input, parses numbers, and calculates statistics.
	 * 
	 * Process:
	 * 1. Clear previous errors
	 * 2. Validate input format using validateInput
	 * 3. Parse input string to array of numbers using parseNumbers
	 * 4. Calculate statistics using calculateStatistics
	 * 5. Update result state or error state
	 */
	const handleCalculate = () => {
		setError(null); // Clear previous errors

		// Validate input format
		const validation = validateInput(input);
		if (!validation.isValid) {
			setError(validation.error || 'Invalid input');
			return;
		}

		// Parse input string to numbers array
		const numbers = parseNumbers(input);
		
		// Calculate all statistics
		const statistics = calculateStatistics(numbers);
		setResult(statistics);
	};

	/**
	 * Handle clear button click
	 * 
	 * Resets all form inputs and clears results and errors.
	 * Called when user clicks the clear/reset button.
	 */
	const handleClear = () => {
		setInput(''); // Clear input
		setResult(null); // Clear result
		setError(null); // Clear errors
	};

	/**
	 * Handle input change
	 * 
	 * Updates input state when user types in textarea.
	 * Clears error state if one exists to allow user to correct input.
	 * 
	 * @param e - Change event from textarea element
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value); // Update input value
		if (error) setError(null); // Clear error when user starts typing
	};

	/**
	 * Animation variants for result cards
	 */
	const cardVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: -20, scale: 0.95 },
	};

	/**
	 * Animation variants for container
	 */
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<div className='space-y-6'>
			{/* Input Section */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2'>
					<Calculator className='h-6 w-6 text-blue-600' />
					{t('form.title')}
				</h2>

				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.inputLabel')}
						</label>
						<textarea
							value={input}
							onChange={handleInputChange}
							placeholder={t('form.placeholder')}
							rows={4}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
						/>
						<p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
							{t('form.hint')}
						</p>
					</div>

					{/* Error Message */}
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
						>
							<p className='text-red-700 dark:text-red-300 text-sm'>
								{error}
							</p>
						</motion.div>
					)}

					{/* Action Buttons */}
					<div className='flex gap-4'>
						<button
							onClick={handleCalculate}
							className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
						>
							<BarChart3 className='h-5 w-5' />
							{t('form.calculate')}
						</button>
						<button
							onClick={handleClear}
							className='px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
						>
							{t('form.clear')}
						</button>
					</div>
				</div>
			</div>

			{/* Results Section */}
			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'
					>
						<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
							<TrendingUp className='h-6 w-6 text-green-600' />
							{t('results.title')}
						</h2>

						<motion.div
							variants={containerVariants}
							initial='hidden'
							animate='visible'
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
						>
							{/* Mean */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-blue-100 dark:bg-blue-800 rounded-lg'>
										<Plus className='h-4 w-4 text-blue-600 dark:text-blue-400' />
									</div>
									<h3 className='font-semibold text-blue-900 dark:text-blue-300'>
										{t('results.mean')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-blue-700 dark:text-blue-400'>
									{formatNumber(result.mean)}
								</p>
							</motion.div>

							{/* Median */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-green-100 dark:bg-green-800 rounded-lg'>
										<BarChart3 className='h-4 w-4 text-green-600 dark:text-green-400' />
									</div>
									<h3 className='font-semibold text-green-900 dark:text-green-300'>
										{t('results.median')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-green-700 dark:text-green-400'>
									{formatNumber(result.median)}
								</p>
							</motion.div>

							{/* Mode */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-purple-100 dark:bg-purple-800 rounded-lg'>
										<TrendingUp className='h-4 w-4 text-purple-600 dark:text-purple-400' />
									</div>
									<h3 className='font-semibold text-purple-900 dark:text-purple-300'>
										{t('results.mode')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-purple-700 dark:text-purple-400'>
									{result.mode.length > 0
										? result.mode
												.map(formatNumber)
												.join(', ')
										: t('results.noMode')}
								</p>
							</motion.div>

							{/* Variance */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-orange-100 dark:bg-orange-800 rounded-lg'>
										<Calculator className='h-4 w-4 text-orange-600 dark:text-orange-400' />
									</div>
									<h3 className='font-semibold text-orange-900 dark:text-orange-300'>
										{t('results.variance')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-orange-700 dark:text-orange-400'>
									{formatNumber(result.variance)}
								</p>
							</motion.div>

							{/* Standard Deviation */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-red-100 dark:bg-red-800 rounded-lg'>
										<Minus className='h-4 w-4 text-red-600 dark:text-red-400' />
									</div>
									<h3 className='font-semibold text-red-900 dark:text-red-300'>
										{t('results.standardDeviation')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-red-700 dark:text-red-400'>
									{formatNumber(result.standardDeviation)}
								</p>
							</motion.div>

							{/* Count */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg'>
										<BarChart3 className='h-4 w-4 text-indigo-600 dark:text-indigo-400' />
									</div>
									<h3 className='font-semibold text-indigo-900 dark:text-indigo-300'>
										{t('results.count')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-indigo-700 dark:text-indigo-400'>
									{result.count}
								</p>
							</motion.div>

							{/* Min */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-teal-100 dark:bg-teal-800 rounded-lg'>
										<Minus className='h-4 w-4 text-teal-600 dark:text-teal-400' />
									</div>
									<h3 className='font-semibold text-teal-900 dark:text-teal-300'>
										{t('results.min')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-teal-700 dark:text-teal-400'>
									{formatNumber(result.min)}
								</p>
							</motion.div>

							{/* Max */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-pink-100 dark:bg-pink-800 rounded-lg'>
										<Plus className='h-4 w-4 text-pink-600 dark:text-pink-400' />
									</div>
									<h3 className='font-semibold text-pink-900 dark:text-pink-300'>
										{t('results.max')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-pink-700 dark:text-pink-400'>
									{formatNumber(result.max)}
								</p>
							</motion.div>

							{/* Sum */}
							<motion.div
								variants={cardVariants}
								className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'
							>
								<div className='flex items-center gap-2 mb-2'>
									<div className='p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg'>
										<Plus className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
									</div>
									<h3 className='font-semibold text-yellow-900 dark:text-yellow-300'>
										{t('results.sum')}
									</h3>
								</div>
								<p className='text-2xl font-bold text-yellow-700 dark:text-yellow-400'>
									{formatNumber(result.sum)}
								</p>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
