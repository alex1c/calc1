'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	ArrowRightLeft,
	Calculator,
	Info,
	RotateCcw,
	Zap,
	Battery,
} from 'lucide-react';
import {
	convertEnergy,
	validateEnergyInput,
	formatEnergyValue,
	getUnitName,
	getCommonConversions,
	ENERGY_UNITS,
	EnergyInput,
	EnergyResult,
	EnergyUnit,
} from '@/lib/calculators/energy';

/**
 * Energy Calculator Component
 * 
 * A React component for converting between different energy units.
 * 
 * Features:
 * - Supports multiple energy units: J, kJ, cal, kcal, kWh, BTU, eV
 * - Real-time conversion with debouncing
 * - Bidirectional conversion (from/to units)
 * - Common conversions display
 * - Input validation
 * - Responsive design
 * 
 * Uses the energy conversion library from @/lib/calculators/energy
 * for all conversion operations.
 */
export default function EnergyCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.energy-converter');
	
	// Form state management
	const [input, setInput] = useState<EnergyInput>({
		value: 1000, // Energy value to convert (default: 1000 J)
		fromUnit: 'J', // Source unit (default: Joules)
		toUnit: 'cal', // Target unit (default: calories)
	});
	const [result, setResult] = useState<EnergyResult | null>(null); // Conversion result
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation

	/**
	 * Auto-calculate when input changes
	 * 
	 * Effect hook that automatically triggers conversion when input changes.
	 * Uses debouncing (300ms delay) to avoid excessive calculations while user is typing.
	 * 
	 * Dependencies:
	 * - input: Form input values (value, fromUnit, toUnit)
	 * 
	 * Behavior:
	 * - Waits 300ms after input changes before converting
	 * - Only converts if value is defined and both units are selected
	 * - Clears timeout if component unmounts or input changes again
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			// Only calculate if input is valid
			if (input.value !== undefined && input.fromUnit && input.toUnit) {
				setIsCalculating(true);
				try {
					// Perform energy conversion
					const energyResult = convertEnergy(input);
					setResult(energyResult);
				} catch (error) {
					console.error('Calculation error:', error);
					setResult(null);
				} finally {
					setIsCalculating(false);
				}
			} else {
				setResult(null);
			}
		}, 300); // Debounce calculation by 300ms

		return () => clearTimeout(timer); // Cleanup on unmount or change
	}, [input]);

	/**
	 * Handle input field changes
	 * 
	 * Updates form input values when user changes value or units.
	 * Validates numeric inputs to prevent invalid values.
	 * 
	 * @param field - Field name to update (value, fromUnit, or toUnit)
	 * @param value - New value (number for value field, EnergyUnit for unit fields)
	 */
	const handleInputChange = (
		field: keyof EnergyInput,
		value: number | EnergyUnit
	) => {
		// Validate numeric inputs
		if (typeof value === 'number') {
			// Prevent extremely large values
			if (value > 1e12) return;
		}

		setInput((prev) => ({
			...prev,
			[field]: value, // Update field value
		}));
	};

	const handleCalculate = () => {
		// Only calculate if input is valid
		if (input.value !== undefined && input.fromUnit && input.toUnit) {
			setIsCalculating(true);
			try {
				const energyResult = convertEnergy(input);
				setResult(energyResult);
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
			value: 1000,
			fromUnit: 'J',
			toUnit: 'cal',
		});
		setResult(null);
	};

	const handleSwapUnits = () => {
		setInput((prev) => ({
			...prev,
			fromUnit: prev.toUnit,
			toUnit: prev.fromUnit,
		}));
	};

	const getCommonConversionsList = () => {
		if (!result || input.value === undefined) return [];
		return getCommonConversions(input.value, input.fromUnit);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full'>
							<Battery className='w-12 h-12 text-yellow-600 dark:text-yellow-400' />
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
					<div className='text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2'>
							{t('infographic.precise')}
						</div>
						<div className='text-sm text-yellow-800 dark:text-yellow-200'>
							{t('infographic.preciseDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.fast')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.fastDescription')}
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

			{/* Converter Form */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Value Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('value')}
						</label>
						<input
							type='number'
							value={input.value}
							onChange={(e) =>
								handleInputChange(
									'value',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='1000'
							step='0.01'
						/>
					</div>

					{/* From Unit */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('fromUnit')}
						</label>
						<select
							value={input.fromUnit}
							onChange={(e) =>
								handleInputChange(
									'fromUnit',
									e.target.value as EnergyUnit
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{ENERGY_UNITS.map((unit) => (
								<option
									key={unit}
									value={unit}
								>
									{t(`units.${unit}`)}
								</option>
							))}
						</select>
					</div>

					{/* Swap Button */}
					<div className='flex items-end'>
						<button
							onClick={handleSwapUnits}
							className='w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center'
						>
							<ArrowRightLeft className='w-5 h-5' />
						</button>
					</div>

					{/* To Unit */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('toUnit')}
						</label>
						<select
							value={input.toUnit}
							onChange={(e) =>
								handleInputChange(
									'toUnit',
									e.target.value as EnergyUnit
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{ENERGY_UNITS.map((unit) => (
								<option
									key={unit}
									value={unit}
								>
									{t(`units.${unit}`)}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('calculating')}
							</>
						) : (
							<>
								<Zap className='w-4 h-4' />
								{t('button')}
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
							<Calculator className='w-8 h-8 text-yellow-600' />
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('result')}
						</h2>
					</div>

					{/* Main Result */}
					<div className='text-center mb-8'>
						<div className='inline-flex items-center gap-4 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg'>
							<span className='text-2xl font-bold text-gray-700 dark:text-gray-300'>
								{input.value} {t(`units.${input.fromUnit}`)}
							</span>
							<ArrowRightLeft className='w-6 h-6 text-gray-500' />
							<span className='text-3xl font-bold text-yellow-600 dark:text-yellow-400'>
								{result.formattedValue}{' '}
								{t(`units.${result.unit}`)}
							</span>
						</div>
					</div>

					{/* Common Conversions */}
					{getCommonConversionsList().length > 0 && (
						<div className='mb-8'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								{t('commonConversions')}
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{getCommonConversionsList().map(
									(conversion) => (
										<div
											key={conversion.unit}
											className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center'
										>
											<div className='text-lg font-bold text-gray-900 dark:text-white'>
												{conversion.formatted}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t(`units.${conversion.unit}`)}
											</div>
										</div>
									)
								)}
							</div>
						</div>
					)}
				</motion.div>
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
					<p>{t('tips.accuracy')}</p>
					<p>{t('tips.instant')}</p>
					<p>{t('tips.multilingual')}</p>
				</div>
			</div>
		</div>
	);
}
