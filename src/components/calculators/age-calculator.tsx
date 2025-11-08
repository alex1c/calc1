'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Copy, RefreshCw, Calculator, User } from 'lucide-react';
import {
	calculateAge,
	getTodayDate,
	isValidDate,
	isBirthDateValid,
} from '@/lib/calculators/age';

/**
 * Age Calculator Component
 * 
 * A React component for calculating age from birth date to a specified date.
 * 
 * Features:
 * - Calculate age in years, months, and days
 * - Total days calculation
 * - Date validation
 * - Copy result to clipboard
 * - Set today's date button
 * - Responsive design
 * 
 * Uses the age calculation library from @/lib/calculators/age
 * for all date calculations.
 */

/**
 * Age calculation result interface
 * Contains detailed age breakdown
 */
interface AgeResult {
	years: number; // Age in years
	months: number; // Additional months beyond years
	days: number; // Additional days beyond months
	totalDays: number; // Total age in days
	birthDate: string; // Birth date string
	calculateDate: string; // Calculation date string
}

/**
 * Age Calculator Component
 * 
 * Provides interface for calculating age between two dates.
 * Calculates precise age including years, months, days, and total days.
 */
export default function AgeCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.agecalc');
	
	// Form state management
	const [birthDate, setBirthDate] = useState(''); // Birth date input (YYYY-MM-DD format)
	const [calculateDate, setCalculateDate] = useState(''); // Calculation date input (YYYY-MM-DD format)
	const [result, setResult] = useState<AgeResult | null>(null); // Calculated age result
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [copied, setCopied] = useState(false); // Flag indicating if result was copied to clipboard
	const [isMounted, setIsMounted] = useState(false); // Flag to prevent hydration mismatch

	/**
	 * Set today as default calculate date only after component mounts
	 * 
	 * Effect hook that sets today's date as default calculation date.
	 * Only runs after component mounts to prevent hydration mismatch
	 * between server and client rendering.
	 */
	useEffect(() => {
		setIsMounted(true);
		if (!calculateDate) {
			setCalculateDate(getTodayDate()); // Set today's date as default
		}
	}, []);

	/**
	 * Handle calculation
	 * 
	 * Validates dates and calculates age between birth date and calculation date.
	 * 
	 * Process:
	 * 1. Check that both dates are provided
	 * 2. Validate date formats using isValidDate
	 * 3. Validate that birth date is before calculation date
	 * 4. Calculate age using calculateAge
	 * 5. Update result state
	 */
	const handleCalculate = async () => {
		if (!birthDate || !calculateDate) return; // Don't calculate if dates are missing

		// Validate date formats
		if (!isValidDate(birthDate) || !isValidDate(calculateDate)) {
			alert(t('form.errors.invalidDate'));
			return;
		}

		// Validate that birth date is before calculation date
		if (!isBirthDateValid(birthDate, calculateDate)) {
			alert(t('form.errors.birthDateAfterCalculate'));
			return;
		}

		setIsCalculating(true);

		try {
			// Calculate age between dates
			const calculation = calculateAge(birthDate, calculateDate);
			setResult(calculation);
		} catch (error) {
			console.error('Calculation error:', error);
			alert(t('form.errors.calculationError'));
		} finally {
			setIsCalculating(false);
		}
	};

	/**
	 * Handle reset action
	 * 
	 * Clears all form inputs and resets result state.
	 * Sets calculation date back to today's date.
	 */
	const handleReset = () => {
		setBirthDate(''); // Clear birth date
		setCalculateDate(getTodayDate()); // Reset to today's date
		setResult(null); // Clear result
		setCopied(false); // Reset copy flag
	};

	/**
	 * Handle set today button click
	 * 
	 * Sets calculation date to today's date.
	 * Useful for quickly calculating current age.
	 */
	const handleSetToday = () => {
		setCalculateDate(getTodayDate()); // Set to today's date
	};

	/**
	 * Handle copy result to clipboard
	 * 
	 * Copies formatted age result to clipboard.
	 * Shows temporary feedback when copy succeeds.
	 */
	const handleCopyResult = async () => {
		if (!result) return; // Don't copy if no result

		// Format result text for clipboard
		const resultText = `${t('results.calculationTitle')}:
${t('results.birthDate')}: ${result.birthDate}
${t('results.calculateDate')}: ${result.calculateDate}
${t('results.age')}: ${result.years} ${t('results.years')}, ${
			result.months
		} ${t('results.months')}, ${result.days} ${t('results.days')}
${t('results.totalDays')}: ${result.totalDays}`;

		try {
			// Copy to clipboard
			await navigator.clipboard.writeText(resultText);
			setCopied(true); // Show success feedback
			setTimeout(() => setCopied(false), 2000); // Hide feedback after 2 seconds
		} catch (error) {
			console.error('Copy failed:', error);
		}
	};

	// Show loading state during hydration
	if (!isMounted) {
		return (
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4'>
						<User className='h-8 w-8 text-purple-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						{t('form.title')}
					</h2>
					<p className='text-gray-600'>{t('form.description')}</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<RefreshCw className='h-8 w-8 animate-spin text-purple-600' />
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow-lg p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4'>
					<User className='h-8 w-8 text-purple-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('form.title')}
				</h2>
				<p className='text-gray-600'>{t('form.description')}</p>
			</div>

			{/* Form */}
			<div className='space-y-6'>
				{/* Birth Date */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.birthDate')}
					</label>
					<div className='relative'>
						<input
							type='date'
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
							placeholder={t('form.birthDatePlaceholder')}
						/>
					</div>
				</div>

				{/* Calculate Date */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.calculateDate')}
					</label>
					<div className='relative'>
						<input
							type='date'
							value={calculateDate}
							onChange={(e) => setCalculateDate(e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
							placeholder={t('form.calculateDatePlaceholder')}
						/>
						<button
							onClick={handleSetToday}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 hover:text-purple-800'
						>
							{t('form.today')}
						</button>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						onClick={handleCalculate}
						disabled={!birthDate || !calculateDate || isCalculating}
						className='flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
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
				<div className='mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200'>
					<div className='text-center mb-6'>
						<h3 className='text-xl font-bold text-gray-900 mb-2'>
							{t('results.title')}
						</h3>
						<p className='text-gray-600'>
							{t('results.period', {
								from: result.birthDate,
								to: result.calculateDate,
							})}
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-purple-600'>
								{result.years}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.years')}
							</div>
						</div>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-blue-600'>
								{result.months}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.months')}
							</div>
						</div>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-green-600'>
								{result.days}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.days')}
							</div>
						</div>
						<div className='bg-white p-4 rounded-lg text-center'>
							<div className='text-2xl font-bold text-orange-600'>
								{result.totalDays}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.totalDays')}
							</div>
						</div>
					</div>

					<div className='text-center'>
						<button
							onClick={handleCopyResult}
							className='bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto'
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
