'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Gauge,
	ArrowRightLeft,
	Calculator,
	Info,
	RotateCcw,
	Zap,
} from 'lucide-react';
import {
	convertSpeed,
	validateSpeedInput,
	formatSpeedValue,
	getUnitName,
	getCommonConversions,
	SPEED_UNITS,
	SpeedInput,
	SpeedResult,
	SpeedUnit,
} from '@/lib/calculators/speed';

export default function SpeedCalculator() {
	const t = useTranslations('calculators.speed');
	const [input, setInput] = useState<SpeedInput>({
		value: 50,
		fromUnit: 'kmh',
		toUnit: 'ms',
	});
	const [result, setResult] = useState<SpeedResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);

	// Auto-calculate when input changes
	useEffect(() => {
		const timer = setTimeout(() => {
			// Only calculate if input is valid
			if (input.value !== undefined && input.fromUnit && input.toUnit) {
				setIsCalculating(true);
				try {
					const speedResult = convertSpeed(input);
					setResult(speedResult);
				} catch (error) {
					console.error('Calculation error:', error);
					setResult(null);
				} finally {
					setIsCalculating(false);
				}
			} else {
				setResult(null);
			}
		}, 300); // Debounce calculation

		return () => clearTimeout(timer);
	}, [input]);

	const handleInputChange = (
		field: keyof SpeedInput,
		value: number | SpeedUnit
	) => {
		// Validate numeric inputs
		if (typeof value === 'number') {
			if (value > 1e6) return;
		}

		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCalculate = () => {
		// Only calculate if input is valid
		if (input.value !== undefined && input.fromUnit && input.toUnit) {
			setIsCalculating(true);
			try {
				const speedResult = convertSpeed(input);
				setResult(speedResult);
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
			value: 50,
			fromUnit: 'kmh',
			toUnit: 'ms',
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
						<div className='p-4 bg-blue-100 dark:bg-blue-900 rounded-full'>
							<Gauge className='w-12 h-12 text-blue-600 dark:text-blue-400' />
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
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='50'
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
									e.target.value as SpeedUnit
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{SPEED_UNITS.map((unit) => (
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
									e.target.value as SpeedUnit
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{SPEED_UNITS.map((unit) => (
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
							<Calculator className='w-8 h-8 text-blue-600' />
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('result')}
						</h2>
					</div>

					{/* Main Result */}
					<div className='text-center mb-8'>
						<div className='inline-flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
							<span className='text-2xl font-bold text-gray-700 dark:text-gray-300'>
								{input.value} {t(`units.${input.fromUnit}`)}
							</span>
							<ArrowRightLeft className='w-6 h-6 text-gray-500' />
							<span className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
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
			<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
					<h4 className='font-semibold text-blue-800 dark:text-blue-200'>
						{t('tips.title')}
					</h4>
				</div>
				<div className='space-y-2 text-sm text-blue-700 dark:text-blue-300'>
					<p>{t('tips.accuracy')}</p>
					<p>{t('tips.instant')}</p>
					<p>{t('tips.multilingual')}</p>
				</div>
			</div>
		</div>
	);
}
