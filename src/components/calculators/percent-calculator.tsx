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
 * PercentCalculator Component
 *
 * A comprehensive percentage calculator with multiple calculation modes:
 * - Find percentage of a number
 * - Find what percentage one number is of another
 * - Find number from percentage
 * - Increase/decrease number by percentage
 */
export default function PercentCalculator() {
	const t = useTranslations('calculators.math_percent');

	// State management
	const [activeTab, setActiveTab] =
		useState<CalculatorOperation>('percent_of_number');
	const [formData, setFormData] = useState<FormData>({
		number: '',
		percentage: '',
		number1: '',
		number2: '',
		part: '',
		operation: 'increase',
	});
	const [calculation, setCalculation] = useState<CalculationState>({
		result: null,
		error: null,
		isCalculating: false,
	});

	/**
	 * Handle input changes with validation
	 */
	const handleInputChange = useCallback(
		(name: keyof FormData, value: string) => {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear previous results when inputs change
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
	 */
	const isFormValid = useCallback(() => {
		const operation = calculatorOperations.find(
			(op) => op.id === activeTab
		);
		if (!operation) return false;

		return operation.inputs.every((input) => {
			const value = formData[input.name as keyof FormData];
			if (!input.required) return true;

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
	 */
	useEffect(() => {
		if (isFormValid()) {
			const timeoutId = setTimeout(performCalculation, 500); // Debounce
			return () => clearTimeout(timeoutId);
		}
	}, [isFormValid, performCalculation]);

	/**
	 * Get current operation configuration
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
