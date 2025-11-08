'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	getPercentOfNumber,
	getWhatPercent,
	getNumberFromPercent,
	changeByPercent,
	calculatorOperations,
	type CalculatorOperation,
	type PercentCalculationResult,
} from '@/lib/calculators/percent';

interface FormData {
	number: string;
	percentage: string;
	number1: string;
	number2: string;
	part: string;
	operation: 'increase' | 'decrease';
}

interface CalculationState {
	result: PercentCalculationResult | null;
	error: string | null;
	isCalculating: boolean;
}

/**
 * Percent Calculator Component
 * 
 * A comprehensive React component for percentage calculations with multiple modes.
 * 
 * Features:
 * - Tab-based interface for different calculation types
 * - Real-time calculation with debouncing
 * - Input validation with error handling
 * - Formula display showing calculation steps
 * - Keyboard support (Enter key to calculate)
 * - Auto-calculation when all required fields are filled
 * - Responsive design
 * 
 * Calculation modes:
 * 1. Find percentage of a number: What is X% of Y?
 * 2. Find what percentage: What percentage is X of Y?
 * 3. Find number from percentage: X is Y% of what number?
 * 4. Increase/decrease by percentage: Increase/decrease X by Y%
 * 
 * Uses the percentage calculation library from @/lib/calculators/percent
 * for all mathematical operations.
 */
export default function PercentCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.math_percent');

	// State management
	const [activeTab, setActiveTab] =
		useState<CalculatorOperation>('percent_of_number'); // Currently selected calculation mode
	const [formData, setFormData] = useState<FormData>({
		// Form input values stored as strings for controlled inputs
		number: '', // General number input
		percentage: '', // Percentage value input
		number1: '', // First number for comparison calculations
		number2: '', // Second number for comparison calculations
		part: '', // Part value for reverse percentage calculations
		operation: 'increase', // Operation type: increase or decrease
	});
	const [calculation, setCalculation] = useState<CalculationState>({
		result: null, // Calculated result with formula and description
		error: null, // Error message if calculation fails
		isCalculating: false, // Loading state during calculation
	});

	/**
	 * Handle input changes with validation
	 * 
	 * Updates form data when user types in input fields.
	 * Automatically clears previous results when inputs change
	 * to prevent showing stale data.
	 * 
	 * Uses useCallback to prevent unnecessary re-renders.
	 * 
	 * @param name - Field name to update
	 * @param value - New field value
	 */
	const handleInputChange = useCallback(
		(name: keyof FormData, value: string) => {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear previous results when inputs change
			// This ensures users see fresh calculations
			setCalculation((prev) => ({
				...prev,
				result: null,
				error: null,
			}));
		},
		[]
	);

	/**
	 * Perform calculation based on active tab
	 * 
	 * Routes to the appropriate calculation function based on the
	 * currently selected tab. Handles input parsing, validation,
	 * and error handling.
	 * 
	 * Calculation flow:
	 * 1. Set calculating state to true
	 * 2. Parse string inputs to numbers
	 * 3. Validate inputs (check for NaN)
	 * 4. Call appropriate calculation function
	 * 5. Update state with result or error
	 * 
	 * Uses useCallback with dependencies to ensure correct function
	 * reference when called from useEffect.
	 */
	const performCalculation = useCallback(() => {
		setCalculation((prev) => ({
			...prev,
			isCalculating: true,
			error: null,
		}));

		try {
			let result: PercentCalculationResult;

			switch (activeTab) {
				case 'percent_of_number': {
					const number = parseFloat(formData.number);
					const percentage = parseFloat(formData.percentage);

					if (isNaN(number) || isNaN(percentage)) {
						throw new Error(t('errors.invalid_input'));
					}

					result = getPercentOfNumber(number, percentage);
					break;
				}

				case 'what_percent': {
					const number1 = parseFloat(formData.number1);
					const number2 = parseFloat(formData.number2);

					if (isNaN(number1) || isNaN(number2)) {
						throw new Error(t('errors.invalid_input'));
					}

					result = getWhatPercent(number1, number2);
					break;
				}

				case 'number_from_percent': {
					const percentage = parseFloat(formData.percentage);
					const part = parseFloat(formData.part);

					if (isNaN(percentage) || isNaN(part)) {
						throw new Error(t('errors.invalid_input'));
					}

					result = getNumberFromPercent(percentage, part);
					break;
				}

				case 'change_by_percent': {
					const number = parseFloat(formData.number);
					const percentage = parseFloat(formData.percentage);

					if (isNaN(number) || isNaN(percentage)) {
						throw new Error(t('errors.invalid_input'));
					}

					result = changeByPercent(
						number,
						percentage,
						formData.operation
					);
					break;
				}

				default:
					throw new Error(t('errors.invalid_operation'));
			}

			setCalculation({
				result,
				error: null,
				isCalculating: false,
			});
		} catch (error) {
			setCalculation({
				result: null,
				error:
					error instanceof Error
						? error.message
						: t('errors.calculation_failed'),
				isCalculating: false,
			});
		}
	}, [activeTab, formData, t]);

	/**
	 * Handle Enter key press for calculation
	 * 
	 * Allows users to trigger calculation by pressing Enter key
	 * in any input field. Prevents default form submission behavior.
	 * 
	 * @param event - Keyboard event from input field
	 */
	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				performCalculation();
			}
		},
		[performCalculation]
	);

	/**
	 * Check if form is valid for current operation
	 * 
	 * Validates that all required fields for the current operation
	 * are filled with valid values. Used to enable/disable calculate button
	 * and trigger auto-calculation.
	 * 
	 * Validation rules:
	 * - Required fields must not be empty
	 * - Number fields must be valid numbers (not NaN)
	 * - Select fields must have a selected value
	 * 
	 * @returns True if all required fields are valid, false otherwise
	 */
	const isFormValid = useCallback(() => {
		// Find configuration for current operation
		const operation = calculatorOperations.find(
			(op) => op.id === activeTab
		);
		if (!operation) return false;

		// Check all required inputs are valid
		return operation.inputs.every((input) => {
			const value = formData[input.name as keyof FormData];
			
			// Optional fields are always valid
			if (!input.required) return true;

			// Empty required fields are invalid
			if (value === '') return false;

			// For select fields, just check if value is not empty
			if (input.type === 'select') {
				return value !== '';
			}

			// For number fields, check if it's a valid number
			return !isNaN(parseFloat(value as string));
		});
	}, [activeTab, formData]);

	/**
	 * Auto-calculate when all required fields are filled
	 * 
	 * Effect hook that automatically triggers calculation when form
	 * becomes valid. Uses debouncing (500ms delay) to avoid excessive
	 * calculations while user is typing.
	 * 
	 * Dependencies:
	 * - isFormValid: Function that checks form validity
	 * - performCalculation: Function that performs the calculation
	 * 
	 * Behavior:
	 * - Waits 500ms after form becomes valid before calculating
	 * - Clears timeout if form becomes invalid or component unmounts
	 */
	useEffect(() => {
		if (isFormValid()) {
			const timeoutId = setTimeout(performCalculation, 500); // Debounce 500ms
			return () => clearTimeout(timeoutId); // Cleanup on unmount or change
		}
	}, [isFormValid, performCalculation]);

	/**
	 * Get current operation configuration
	 * 
	 * Retrieves the configuration object for the currently selected
	 * calculation operation. Used to render appropriate form fields
	 * and labels.
	 * 
	 * @returns Operation configuration object or undefined if not found
	 */
	const currentOperation = calculatorOperations.find(
		(op) => op.id === activeTab
	);

	return (
		<div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					{t('title')}
				</h1>
				<p className='text-gray-600'>{t('description')}</p>
			</div>

			{/* Operation Tabs */}
			<div className='mb-6'>
				<div className='flex flex-wrap gap-2 border-b border-gray-200'>
					{calculatorOperations.map((operation) => (
						<button
							key={operation.id}
							onClick={() => setActiveTab(operation.id)}
							className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
								activeTab === operation.id
									? 'bg-blue-600 text-white border-b-2 border-blue-600'
									: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}
						>
							{t(operation.titleKey)}
						</button>
					))}
				</div>
			</div>

			{/* Calculator Form */}
			<div className='bg-gray-50 rounded-lg p-6 mb-6'>
				{currentOperation && (
					<>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							{t(currentOperation.titleKey)}
						</h3>
						<p className='text-gray-600 mb-6'>
							{t(currentOperation.descriptionKey)}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
							{currentOperation.inputs.map((input) => (
								<div
									key={input.name}
									className='space-y-2'
								>
									<label
										htmlFor={input.name}
										className='block text-sm font-medium text-gray-700'
									>
										{t(input.labelKey)}
										{input.required && (
											<span className='text-red-500 ml-1'>
												*
											</span>
										)}
									</label>

									{input.type === 'select' ? (
										<select
											id={input.name}
											value={
												formData[
													input.name as keyof FormData
												] as string
											}
											onChange={(e) =>
												handleInputChange(
													input.name as keyof FormData,
													e.target.value
												)
											}
											onKeyPress={handleKeyPress}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										>
											{input.options?.map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{t(option.labelKey)}
												</option>
											))}
										</select>
									) : (
										<input
											type='number'
											id={input.name}
											value={
												formData[
													input.name as keyof FormData
												] as string
											}
											onChange={(e) =>
												handleInputChange(
													input.name as keyof FormData,
													e.target.value
												)
											}
											onKeyPress={handleKeyPress}
											placeholder={input.placeholder}
											step='any'
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										/>
									)}
								</div>
							))}
						</div>

						{/* Calculate Button */}
						<button
							onClick={performCalculation}
							disabled={
								!isFormValid() || calculation.isCalculating
							}
							className='w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							{calculation.isCalculating
								? t('calculating')
								: t('calculate')}
						</button>
					</>
				)}
			</div>

			{/* Results */}
			{calculation.error && (
				<div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
					<div className='flex'>
						<div className='flex-shrink-0'>
							<svg
								className='h-5 w-5 text-red-400'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						<div className='ml-3'>
							<h3 className='text-sm font-medium text-red-800'>
								{t('errors.error_title')}
							</h3>
							<div className='mt-2 text-sm text-red-700'>
								{calculation.error}
							</div>
						</div>
					</div>
				</div>
			)}

			{calculation.result && (
				<div className='bg-green-50 border border-green-200 rounded-md p-6'>
					<div className='flex items-start'>
						<div className='flex-shrink-0'>
							<svg
								className='h-6 w-6 text-green-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<div className='ml-3 flex-1'>
							<h3 className='text-lg font-medium text-green-800 mb-2'>
								{t('result')}
							</h3>
							<div className='text-2xl font-bold text-green-900 mb-2'>
								{calculation.result.result.toFixed(2)}
								{activeTab === 'what_percent' && '%'}
							</div>
							<div className='text-sm text-green-700 mb-2'>
								{t(calculation.result.descriptionKey, {
									...calculation.result.descriptionParams,
									result: calculation.result.result.toFixed(
										2
									),
								})}
							</div>
							<div className='text-xs text-green-600 font-mono bg-green-100 px-2 py-1 rounded'>
								{calculation.result.formula}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Help Text */}
			<div className='mt-6 text-sm text-gray-500'>
				<p className='mb-2'>
					<strong>{t('tips.title')}:</strong>
				</p>
				<ul className='list-disc list-inside space-y-1'>
					<li>{t('tips.enter_key')}</li>
					<li>{t('tips.auto_calculate')}</li>
					<li>{t('tips.negative_numbers')}</li>
				</ul>
			</div>
		</div>
	);
}
