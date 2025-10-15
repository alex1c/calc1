'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	calculateBMIResult,
	validateBMIInput,
	formatBMI,
	getBMICategoryColor,
	getBMICategoryColorDark,
	getBMIScale,
	type Gender,
	type BMIResult,
	type BMICategory,
} from '@/lib/calculators/bmi';
import {
	Calculator,
	RotateCcw,
	TrendingUp,
	Scale,
	Ruler,
	Weight,
	Activity,
} from 'lucide-react';

/**
 * BMI Calculator Component
 * Calculates Body Mass Index and displays results with visual indicators
 */
export default function BMICalculator() {
	const t = useTranslations('calculators.bmi');
	const locale = useLocale();

	// Form state
	const [gender, setGender] = useState<Gender>('male');
	const [height, setHeight] = useState<string>('');
	const [weight, setWeight] = useState<string>('');
	const [result, setResult] = useState<BMIResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Handle BMI calculation
	 */
	const handleCalculation = () => {
		const numHeight = parseFloat(height);
		const numWeight = parseFloat(weight);

		const validation = validateBMIInput(numWeight, numHeight);

		if (!validation.isValid) {
			setError(validation.error || 'Invalid input');
			setResult(null);
			return;
		}

		try {
			const bmiResult = calculateBMIResult(numWeight, numHeight, gender);
			setResult(bmiResult);
			setError(null);
		} catch (err) {
			setError('Calculation failed');
			setResult(null);
		}
	};

	/**
	 * Handle reset
	 */
	const handleReset = () => {
		setHeight('');
		setWeight('');
		setResult(null);
		setError(null);
	};

	/**
	 * Auto-calculate when inputs change
	 */
	useEffect(() => {
		if (height && weight) {
			handleCalculation();
		} else {
			setResult(null);
		}
	}, [height, weight, gender]);

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

	/**
	 * Get BMI scale position for marker
	 */
	const getBMIScalePosition = (bmi: number): number => {
		// Scale from 0 to 50 BMI
		const maxBMI = 50;
		return Math.min((bmi / maxBMI) * 100, 100);
	};

	return (
		<div className='space-y-6'>
			{/* BMI Form */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
					<Calculator className='h-6 w-6 text-blue-600' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{/* Gender */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.gender')}
						</label>
						<div className='flex space-x-2'>
							<button
								onClick={() => setGender('male')}
								className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
									gender === 'male'
										? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
										: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
								}`}
							>
								{t('form.male')}
							</button>
							<button
								onClick={() => setGender('female')}
								className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
									gender === 'female'
										? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
										: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
								}`}
							>
								{t('form.female')}
							</button>
						</div>
					</div>

					{/* Height */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.height')}
						</label>
						<div className='relative'>
							<Ruler className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
							<input
								type='number'
								value={height}
								onChange={(e) => setHeight(e.target.value)}
								placeholder='175'
								className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>

					{/* Weight */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.weight')}
						</label>
						<div className='relative'>
							<Weight className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
							<input
								type='number'
								step='0.1'
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								placeholder='70'
								className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
					>
						<p className='text-red-700 dark:text-red-300 text-sm'>
							{error}
						</p>
					</motion.div>
				)}

				{/* Reset Button */}
				<div className='flex justify-end mt-6'>
					<button
						onClick={handleReset}
						className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2'
					>
						<RotateCcw className='h-4 w-4' />
						{t('form.reset')}
					</button>
				</div>
			</div>

			{/* BMI Results */}
			<AnimatePresence>
				{result && (
					<motion.div
						variants={resultVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'
					>
						<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
							<Scale className='h-6 w-6 text-green-600' />
							{t('results.title')}
						</h2>

						{/* BMI Value and Category */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
							{/* BMI Value */}
							<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg'>
								<div className='flex items-center gap-3 mb-3'>
									<Activity className='h-6 w-6 text-blue-600' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
										{t('results.bmiValue')}
									</h3>
								</div>
								<div className='text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
									{formatBMI(result.bmi)}
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									{t('results.bmiUnit')}
								</div>
							</div>

							{/* Category */}
							<div
								className={`p-6 rounded-lg border-2 ${
									locale === 'ru' ||
									locale === 'es' ||
									locale === 'de'
										? getBMICategoryColorDark(
												result.category
										  )
										: getBMICategoryColor(result.category)
								}`}
							>
								<div className='flex items-center gap-3 mb-3'>
									<TrendingUp className='h-6 w-6' />
									<h3 className='text-lg font-semibold'>
										{t('results.category')}
									</h3>
								</div>
								<div className='text-2xl font-bold mb-2'>
									{t(`results.categories.${result.category}`)}
								</div>
								<div className='text-sm opacity-80'>
									{t(
										`results.descriptions.${result.category}`
									)}
								</div>
							</div>
						</div>

						{/* Normal Weight Range */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6'>
							<div className='text-sm text-gray-700 dark:text-gray-300'>
								<strong>
									{t('results.normalWeightRange')}
								</strong>{' '}
								{result.normalWeightRange.min} -{' '}
								{result.normalWeightRange.max}{' '}
								{t('results.weightUnit')}
							</div>
						</div>

						{/* BMI Scale Visualization */}
						<div className='mb-6'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								{t('results.bmiScale')}
							</h3>
							<div className='relative'>
								{/* Scale Background */}
								<div className='flex h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600'>
									{getBMIScale().map((segment, index) => (
										<div
											key={index}
											className={`${segment.color} flex-1`}
											style={{
												width: `${
													(segment.width / 50) * 100
												}%`,
											}}
										/>
									))}
								</div>

								{/* BMI Marker */}
								<div
									className='absolute top-0 w-1 h-8 bg-black dark:bg-white rounded-full transform -translate-x-1/2'
									style={{
										left: `${getBMIScalePosition(
											result.bmi
										)}%`,
									}}
								>
									<div className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300'>
										{formatBMI(result.bmi)}
									</div>
								</div>

								{/* Scale Labels */}
								<div className='flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400'>
									<span>0</span>
									<span>18.5</span>
									<span>25</span>
									<span>30</span>
									<span>35</span>
									<span>40</span>
									<span>50+</span>
								</div>
							</div>
						</div>

						{/* Interpretation */}
						<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<div className='text-sm text-blue-800 dark:text-blue-300'>
								<strong>{t('results.interpretation')}:</strong>{' '}
								{t(
									`results.interpretations.${result.category}`
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
