'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	RotateCcw,
	ArrowRightLeft,
	Calculator,
	Info,
	Zap,
	Target,
} from 'lucide-react';
import {
	convertAngle,
	validateAngleInput,
	formatAngleValue,
	getUnitName,
	getCommonConversions,
	ANGLE_UNITS,
	AngleInput,
	AngleResult,
	AngleUnit,
} from '@/lib/calculators/angle';

/**
 * Angle Calculator Component
 * 
 * A React component for converting between different angle units.
 * 
 * Features:
 * - Supports multiple angle units: degrees, radians, gradians, turns
 * - Real-time conversion with debouncing
 * - Bidirectional conversion (from/to units)
 * - Common conversions display
 * - Input validation
 * - Responsive design
 * 
 * Uses the angle conversion library from @/lib/calculators/angle
 * for all conversion operations.
 */
export default function AngleCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.angle-converter');
	
	// Form state management
	const [input, setInput] = useState<AngleInput>({
		value: 180, // Angle value to convert (default: 180 degrees)
		fromUnit: 'deg', // Source unit (default: degrees)
		toUnit: 'rad', // Target unit (default: radians)
	});
	const [result, setResult] = useState<AngleResult | null>(null); // Conversion result
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation

	// Auto-calculate when input changes
	useEffect(() => {
		const timer = setTimeout(() => {
			// Only calculate if input is valid
			if (
				isFinite(input.value) &&
				input.value !== null &&
				input.fromUnit &&
				input.toUnit
			) {
				setIsCalculating(true);
				try {
					const angleResult = convertAngle(input);
					setResult(angleResult);
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
		field: keyof AngleInput,
		value: number | AngleUnit
	) => {
		// Validate numeric inputs
		if (typeof value === 'number') {
			if (!isFinite(value)) return;
		}

		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCalculate = () => {
		// Only calculate if input is valid
		if (
			isFinite(input.value) &&
			input.value !== null &&
			input.fromUnit &&
			input.toUnit
		) {
			setIsCalculating(true);
			try {
				const angleResult = convertAngle(input);
				setResult(angleResult);
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
			value: 180,
			fromUnit: 'deg',
			toUnit: 'rad',
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
		if (!result || !isFinite(input.value)) return [];
		return getCommonConversions(input.value, input.fromUnit, (key) =>
			t(key)
		);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-blue-100 dark:bg-blue-900 rounded-full'>
							<Target className='w-12 h-12 text-blue-600 dark:text-blue-400' />
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

				{/* Converter Form */}
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
						{/* From Unit Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('value')}
							</label>
							<input
								type='number'
								step='any'
								value={input.value ?? ''}
								onChange={(e) =>
									handleInputChange(
										'value',
										e.target.value === ''
											? 0
											: parseFloat(e.target.value)
									)
								}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg'
								placeholder='180'
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
									handleInputChange('fromUnit', e.target.value as AngleUnit)
								}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg'
							>
								{ANGLE_UNITS.map((unit) => (
									<option key={unit} value={unit}>
										{t(`units.${unit}`)}
									</option>
								))}
							</select>
						</div>

						{/* Swap Button */}
						<div className='flex items-center justify-center'>
							<button
								onClick={handleSwapUnits}
								className='p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
								aria-label='Swap units'
							>
								<ArrowRightLeft className='w-5 h-5' />
							</button>
						</div>
					</div>

					{/* To Unit */}
					<div className='mt-4'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('toUnit')}
						</label>
						<select
							value={input.toUnit}
							onChange={(e) =>
								handleInputChange('toUnit', e.target.value as AngleUnit)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg'
						>
							{ANGLE_UNITS.map((unit) => (
								<option key={unit} value={unit}>
									{t(`units.${unit}`)}
								</option>
							))}
						</select>
					</div>

					{/* Buttons */}
					<div className='flex gap-4 mt-6'>
						<button
							onClick={handleCalculate}
							disabled={isCalculating}
							className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							{isCalculating ? (
								<>
									<Calculator className='w-5 h-5 animate-spin' />
									{t('calculating')}
								</>
							) : (
								<>
									<Calculator className='w-5 h-5' />
									{t('button')}
								</>
							)}
						</button>
						<button
							onClick={handleReset}
							className='px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2'
						>
							<RotateCcw className='w-5 h-5' />
							{t('reset')}
						</button>
					</div>
				</div>

				{/* Result */}
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='mt-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6'
					>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<Zap className='w-6 h-6 text-green-600 dark:text-green-400' />
							{t('result')}
						</h3>
						<div className='text-center'>
							<div className='text-4xl font-bold text-green-700 dark:text-green-300 mb-2'>
								{result.formattedValue}
							</div>
							<div className='text-lg text-gray-600 dark:text-gray-400'>
								{t(`units.${result.unit}`)}
							</div>
						</div>
					</motion.div>
				)}

				{/* Common Conversions */}
				{getCommonConversionsList().length > 0 && (
					<div className='mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
							{t('commonConversions')}
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
							{getCommonConversionsList().map((conv) => (
								<div
									key={conv.unit}
									className='bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600'
								>
									<div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
										{t(`units.${conv.unit}`)}
									</div>
									<div className='text-xl font-semibold text-gray-900 dark:text-white'>
										{conv.formattedValue}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Tips */}
				<div className='mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800'>
					<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2'>
						<Info className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
						{t('tips.title')}
					</h3>
					<ul className='space-y-2 text-sm text-yellow-800 dark:text-yellow-200'>
						<li>• {t('tips.accuracy')}</li>
						<li>• {t('tips.instant')}</li>
						<li>• {t('tips.multilingual')}</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

