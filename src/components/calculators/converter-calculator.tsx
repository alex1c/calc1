'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	convertUnit,
	getUnitsForType,
	formatConversionResult,
	getConversionExample,
	validateConversionInput,
	type UnitType,
	type ConversionResult,
} from '@/lib/calculators/unitConversions';
import {
	Ruler,
	Weight,
	Clock,
	Droplets,
	RotateCcw,
	Info,
	ArrowRight,
} from 'lucide-react';

/**
 * Unit Converter Calculator Component
 * Converts between different units of measurement
 */
export default function ConverterCalculator() {
	const t = useTranslations('calculators.converter');

	// State for form inputs
	const [unitType, setUnitType] = useState<UnitType>('length');
	const [fromUnit, setFromUnit] = useState<string>('');
	const [toUnit, setToUnit] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [result, setResult] = useState<ConversionResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Get available units for current type
	const availableUnits = getUnitsForType(unitType);

	/**
	 * Handle unit type change
	 */
	const handleUnitTypeChange = (newType: UnitType) => {
		setUnitType(newType);
		setFromUnit('');
		setToUnit('');
		setValue('');
		setResult(null);
		setError(null);
	};

	/**
	 * Handle value change
	 */
	const handleValueChange = (newValue: string) => {
		setValue(newValue);
		setError(null);
	};

	/**
	 * Handle unit change
	 */
	const handleUnitChange = (unit: string, type: 'from' | 'to') => {
		if (type === 'from') {
			setFromUnit(unit);
		} else {
			setToUnit(unit);
		}
		setError(null);
	};

	/**
	 * Handle reset
	 */
	const handleReset = () => {
		setFromUnit('');
		setToUnit('');
		setValue('');
		setResult(null);
		setError(null);
	};

	/**
	 * Perform conversion
	 */
	const performConversion = () => {
		if (!value || !fromUnit || !toUnit) {
			return;
		}

		const numValue = parseFloat(value);

		const validation = validateConversionInput(
			numValue,
			fromUnit,
			toUnit,
			unitType
		);

		if (!validation.isValid) {
			setError(validation.error || 'Invalid input');
			setResult(null);
			return;
		}

		try {
			const conversionResult = convertUnit(
				numValue,
				fromUnit,
				toUnit,
				unitType
			);
			setResult(conversionResult);
			setError(null);
		} catch (err) {
			setError('Conversion failed');
			setResult(null);
		}
	};

	/**
	 * Auto-convert when inputs change
	 */
	useEffect(() => {
		if (value && fromUnit && toUnit) {
			performConversion();
		} else {
			setResult(null);
		}
	}, [value, fromUnit, toUnit, unitType]);

	/**
	 * Get icon for unit type
	 */
	const getUnitTypeIcon = (type: UnitType) => {
		switch (type) {
			case 'length':
				return Ruler;
			case 'mass':
				return Weight;
			case 'time':
				return Clock;
			case 'volume':
				return Droplets;
			default:
				return Ruler;
		}
	};

	/**
	 * Animation variants
	 */
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	const resultVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	return (
		<div className='space-y-6'>
			{/* Unit Type Selection */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2'>
					<Ruler className='h-6 w-6 text-blue-600' />
					{t('form.title')}
				</h2>

				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
						{t('form.selectCategory')}
					</label>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
						{(
							['length', 'mass', 'time', 'volume'] as UnitType[]
						).map((type) => {
							const Icon = getUnitTypeIcon(type);
							return (
								<button
									key={type}
									onClick={() => handleUnitTypeChange(type)}
									className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
										unitType === type
											? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
											: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
									}`}
								>
									<Icon className='h-6 w-6' />
									<span className='text-sm font-medium'>
										{t(`form.categories.${type}`)}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* Conversion Form */}
				<motion.div
					key={unitType}
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					exit='exit'
					className='space-y-4'
				>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* From Unit */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.fromUnit')}
							</label>
							<select
								value={fromUnit}
								onChange={(e) =>
									handleUnitChange(e.target.value, 'from')
								}
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>{t('form.selectUnit')}</option>
								{availableUnits.map((unit) => (
									<option
										key={unit}
										value={unit}
									>
										{t(`units.${unitType}.${unit}`)}
									</option>
								))}
							</select>
						</div>

						{/* Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.value')}
							</label>
							<input
								type='number'
								step='any'
								value={value}
								onChange={(e) =>
									handleValueChange(e.target.value)
								}
								placeholder='0'
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* To Unit */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.toUnit')}
							</label>
							<select
								value={toUnit}
								onChange={(e) =>
									handleUnitChange(e.target.value, 'to')
								}
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>{t('form.selectUnit')}</option>
								{availableUnits.map((unit) => (
									<option
										key={unit}
										value={unit}
									>
										{t(`units.${unitType}.${unit}`)}
									</option>
								))}
							</select>
						</div>
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

					{/* Reset Button */}
					<div className='flex justify-end'>
						<button
							onClick={handleReset}
							className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2'
						>
							<RotateCcw className='h-4 w-4' />
							{t('form.reset')}
						</button>
					</div>
				</motion.div>
			</div>

			{/* Result Display */}
			<AnimatePresence>
				{result && (
					<motion.div
						variants={resultVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'
					>
						<h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2'>
							<ArrowRight className='h-6 w-6 text-green-600' />
							{t('results.title')}
						</h2>

						<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg'>
							<div className='text-center'>
								<div className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
									{formatConversionResult(result.toValue)}
								</div>
								<div className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
									{t(
										`units.${result.unitType}.${result.toUnit}`
									)}
								</div>
								<div className='text-sm text-gray-500 dark:text-gray-500'>
									{result.fromValue}{' '}
									{t(
										`units.${result.unitType}.${result.fromUnit}`
									)}{' '}
									= {formatConversionResult(result.toValue)}{' '}
									{t(
										`units.${result.unitType}.${result.toUnit}`
									)}
								</div>
							</div>
						</div>

						{/* Conversion Info */}
						<div className='mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
							<div className='flex items-start gap-3'>
								<Info className='h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<div>
									<p className='text-sm text-blue-800 dark:text-blue-300 font-medium mb-1'>
										{t('results.conversionInfo')}
									</p>
									<p className='text-sm text-blue-700 dark:text-blue-400'>
										{getConversionExample(
											result.fromUnit,
											result.toUnit,
											result.unitType
										)}
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
