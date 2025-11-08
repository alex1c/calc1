'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Pill,
	Calculator,
	AlertTriangle,
	CheckCircle,
	RotateCcw,
	Zap,
	Info,
} from 'lucide-react';
import {
	calculateDose,
	validateDoseInput,
	convertWeight,
	getDosageUnit,
	formatDose,
	getDoseColor,
	getDoseBgColor,
	getDoseBorderColor,
	getWarningIcon,
	FREQUENCY_OPTIONS,
	UNIT_CONVERSION,
	DoseInput,
	DoseResult,
} from '@/lib/calculators/dose';

/**
 * Dose Calculator Component
 * 
 * A React component for calculating medication dosages based on body weight.
 * 
 * Features:
 * - Weight-based dosage calculation
 * - Support for kg and lbs units
 * - Frequency-based daily dose calculation
 * - Maximum daily dose validation
 * - Safety warnings for overdosage
 * - Real-time calculation with debouncing
 * - Responsive design
 * 
 * Calculation formula:
 * - Single dose = (weight × dosage per kg) / frequency
 * - Daily dose = single dose × frequency
 * - Validates against maximum daily dose if provided
 * 
 * Uses the dose calculation library from @/lib/calculators/dose
 * for all mathematical operations.
 */
export default function DoseCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.dose');
	
	// Form state management
	const [input, setInput] = useState<DoseInput>({
		weight: 70, // Body weight (default: 70 kg)
		dosage: 10, // Dosage per kg (default: 10 mg/kg)
		frequency: 2, // Frequency per day (default: 2 times)
		maxDailyDose: undefined, // Optional maximum daily dose limit
		unit: 'kg', // Weight unit (kg or lbs)
	});
	const [result, setResult] = useState<DoseResult | null>(null); // Calculated dose result
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation

	/**
	 * Auto-calculate when input changes
	 * 
	 * Effect hook that automatically triggers calculation when input changes.
	 * Uses debouncing (500ms delay) to avoid excessive calculations while user is typing.
	 * 
	 * Dependencies:
	 * - input: Form input values
	 * 
	 * Behavior:
	 * - Waits 500ms after input changes before calculating
	 * - Only calculates if all required inputs are valid (weight > 0, dosage > 0, frequency > 0)
	 * - Clears timeout if component unmounts or input changes again
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			// Only calculate if input is valid
			if (input.weight > 0 && input.dosage > 0 && input.frequency > 0) {
				setIsCalculating(true);
				try {
					// Calculate medication dose
					const doseResult = calculateDose(input);
					setResult(doseResult);
				} catch (error) {
					console.error('Calculation error:', error);
					setResult(null);
				} finally {
					setIsCalculating(false);
				}
			} else {
				setResult(null);
			}
		}, 500); // Debounce calculation by 500ms

		return () => clearTimeout(timer); // Cleanup on unmount or change
	}, [input]);

	/**
	 * Handle input field changes
	 * 
	 * Updates form input values when user changes values.
	 * Validates numeric inputs to prevent invalid values.
	 * 
	 * @param field - Field name to update
	 * @param value - New value (number or string)
	 */
	const handleInputChange = (
		field: keyof DoseInput,
		value: number | string
	) => {
		// Validate numeric inputs with field-specific ranges
		if (typeof value === 'number') {
			if (field === 'weight' && (value < 0 || value > 500)) return; // Weight: 0-500
			if (field === 'dosage' && (value < 0 || value > 1000)) return; // Dosage: 0-1000 mg/kg
			if (field === 'frequency' && (value < 1 || value > 4)) return; // Frequency: 1-4 times/day
			if (
				field === 'maxDailyDose' &&
				value !== undefined &&
				(value < 0 || value > 10000)
			)
				return; // Max daily dose: 0-10000
		}

		setInput((prev) => ({
			...prev,
			[field]: value, // Update field value
		}));
	};

	/**
	 * Handle unit toggle
	 * 
	 * Switches between kg and lbs weight units.
	 * Automatically converts weight value when unit changes.
	 */
	const handleUnitToggle = () => {
		const newUnit = input.unit === 'kg' ? 'lbs' : 'kg'; // Toggle unit
		// Convert weight to new unit
		const convertedWeight = convertWeight(
			input.weight,
			input.unit,
			newUnit
		);

		setInput((prev) => ({
			...prev,
			unit: newUnit, // Update unit
			weight: convertedWeight, // Update weight with converted value
		}));
	};

	const handleCalculate = () => {
		// Only calculate if input is valid
		if (input.weight > 0 && input.dosage > 0 && input.frequency > 0) {
			setIsCalculating(true);
			try {
				const doseResult = calculateDose(input);
				setResult(doseResult);
			} catch (error) {
				console.error('Calculation error:', error);
				setResult(null);
			} finally {
				setIsCalculating(false);
			}
		} else {
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			weight: 70,
			dosage: 10,
			frequency: 2,
			maxDailyDose: undefined,
			unit: 'kg',
		});
		setResult(null);
	};

	const getWeightUnit = () => {
		return input.unit === 'kg' ? t('weightUnit') : 'lbs';
	};

	const getDosageUnitText = () => {
		return input.unit === 'kg' ? t('dosageUnit') : 'mg/lb';
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-blue-100 dark:bg-blue-900 rounded-full'>
							<Pill className='w-12 h-12 text-blue-600 dark:text-blue-400' />
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
					<div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
							{t('infographic.precise')}
						</div>
						<div className='text-sm text-blue-800 dark:text-blue-200'>
							{t('infographic.preciseDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.safe')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.safeDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
							{t('infographic.multilingual')}
						</div>
						<div className='text-sm text-purple-800 dark:text-purple-200'>
							{t('infographic.multilingualDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Weight Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('weight')} ({getWeightUnit()})
						</label>
						<div className='relative'>
							<input
								type='number'
								value={input.weight}
								onChange={(e) =>
									handleInputChange(
										'weight',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								placeholder='70'
								min='1'
								max='500'
								step='0.1'
							/>
							<button
								onClick={handleUnitToggle}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 font-medium'
							>
								{t('unitToggle')}
							</button>
						</div>
					</div>

					{/* Dosage Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('dosage')} ({getDosageUnitText()})
						</label>
						<input
							type='number'
							value={input.dosage}
							onChange={(e) =>
								handleInputChange(
									'dosage',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='10'
							min='0.1'
							step='0.1'
						/>
					</div>

					{/* Frequency Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('frequency')}
						</label>
						<select
							value={input.frequency}
							onChange={(e) =>
								handleInputChange(
									'frequency',
									parseInt(e.target.value)
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{FREQUENCY_OPTIONS.map((option) => (
								<option
									key={option.value}
									value={option.value}
								>
									{t(`frequencyOptions.${option.value}`)}
								</option>
							))}
						</select>
					</div>

					{/* Max Daily Dose Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('maxDose')}
						</label>
						<input
							type='number'
							value={input.maxDailyDose || ''}
							onChange={(e) =>
								handleInputChange(
									'maxDailyDose',
									parseFloat(e.target.value) || undefined
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='1000'
							min='1'
							step='1'
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('calculating')}
							</>
						) : (
							<>
								<Zap className='w-4 h-4' />
								{t('calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors'
					>
						<RotateCcw className='w-4 h-4' />
						{t('reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'
				>
					<div className='text-center mb-8'>
						<div className='flex justify-center mb-4'>
							{result.isExceeded ? (
								<AlertTriangle className='w-8 h-8 text-red-600' />
							) : (
								<CheckCircle className='w-8 h-8 text-green-600' />
							)}
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('results.title')}
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
						{/* Dose per Intake */}
						<div
							className={`p-6 rounded-lg border-2 ${getDoseBgColor(
								result.isExceeded
							)} ${getDoseBorderColor(result.isExceeded)}`}
						>
							<div className='flex items-center gap-3 mb-4'>
								<Calculator className='w-6 h-6 text-blue-600' />
								<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
									{t('results.perIntake')}
								</h3>
							</div>
							<div className='text-center'>
								<div
									className={`text-3xl font-bold ${getDoseColor(
										result.isExceeded
									)}`}
								>
									{formatDose(
										result.dosePerIntake,
										result.unit
									)}
								</div>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
									{t('results.perIntakeDescription')}
								</p>
							</div>
						</div>

						{/* Daily Dose */}
						<div
							className={`p-6 rounded-lg border-2 ${getDoseBgColor(
								result.isExceeded
							)} ${getDoseBorderColor(result.isExceeded)}`}
						>
							<div className='flex items-center gap-3 mb-4'>
								<Pill className='w-6 h-6 text-green-600' />
								<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
									{t('results.perDay')}
								</h3>
							</div>
							<div className='text-center'>
								<div
									className={`text-3xl font-bold ${getDoseColor(
										result.isExceeded
									)}`}
								>
									{formatDose(result.dailyDose, result.unit)}
								</div>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
									{t('results.perDayDescription')}
								</p>
							</div>
						</div>
					</div>

					{/* Warning */}
					{result.isExceeded && (
						<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6'>
							<div className='flex items-center gap-3 mb-4'>
								<AlertTriangle className='w-6 h-6 text-red-600' />
								<h3 className='text-lg font-bold text-red-800 dark:text-red-200'>
									{t('warning.title')}
								</h3>
							</div>
							<p className='text-red-700 dark:text-red-300'>
								{t('warning.exceeded', {
									maxDose: input.maxDailyDose,
								})}
							</p>
							<p className='text-sm text-red-600 dark:text-red-400 mt-2'>
								{t('warning.consultation')}
							</p>
						</div>
					)}
				</motion.div>
			)}

			{/* Tips */}
			<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
					<h4 className='font-semibold text-blue-800 dark:text-blue-200'>
						{t('tips.title')}
					</h4>
				</div>
				<div className='space-y-2 text-sm text-blue-700 dark:text-blue-300'>
					<p>{t('tips.consultation')}</p>
					<p>{t('tips.accuracy')}</p>
					<p>{t('tips.children')}</p>
				</div>
			</div>
		</div>
	);
}
