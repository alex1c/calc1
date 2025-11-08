'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Scale,
	Ruler,
	TrendingUp,
	AlertCircle,
	CheckCircle,
} from 'lucide-react';
import {
	calculateBMIHealth,
	validateBMIInput,
	BMIInput,
	BMIResult,
} from '@/lib/calculators/bmi-health';

/**
 * BMI Health Calculator Component
 * 
 * A React component for calculating Body Mass Index (BMI) with WHO health categories.
 * 
 * Features:
 * - Weight and height input
 * - BMI calculation
 * - WHO category classification (underweight, normal, overweight, obese)
 * - Normal weight range calculation
 * - Health recommendations
 * - Visual indicators
 * - Responsive design
 * 
 * Uses the BMI health calculation library from @/lib/calculators/bmi-health
 * for all mathematical operations based on WHO standards.
 */
export default function BMIHealthCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.bmiHealth');

	// Form state management
	const [weight, setWeight] = useState<string>(''); // Weight in kg (as string for controlled input)
	const [height, setHeight] = useState<string>(''); // Height in cm (as string for controlled input)
	const [result, setResult] = useState<BMIResult | null>(null); // Calculated BMI result
	const [error, setError] = useState<string>(''); // Validation error message
	const [isCalculating, setIsCalculating] = useState<boolean>(false); // Loading state during calculation

	/**
	 * Handle form submission and BMI calculation
	 */
	const handleCalculate = async () => {
		setError('');
		setIsCalculating(true);

		try {
			const weightNum = parseFloat(weight);
			const heightNum = parseFloat(height);

			// Validate input
			const validation = validateBMIInput(weightNum, heightNum);
			if (!validation.isValid) {
				setError(t(`form.errors.${validation.error}`));
				return;
			}

			// Calculate BMI
			const bmiResult = calculateBMIHealth({
				weight: weightNum,
				height: heightNum,
			});

			setResult(bmiResult);
		} catch (err) {
			setError(t('form.errors.calculationError'));
		} finally {
			setIsCalculating(false);
		}
	};

	/**
	 * Reset form and clear results
	 */
	const handleReset = () => {
		setWeight('');
		setHeight('');
		setResult(null);
		setError('');
	};

	/**
	 * Get color classes for BMI category
	 */
	const getCategoryColor = (color: string) => {
		const colorMap = {
			blue: 'bg-blue-100 text-blue-800 border-blue-200',
			green: 'bg-green-100 text-green-800 border-green-200',
			yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
			orange: 'bg-orange-100 text-orange-800 border-orange-200',
			red: 'bg-red-100 text-red-800 border-red-200',
		};
		return (
			colorMap[color as keyof typeof colorMap] ||
			'bg-gray-100 text-gray-800 border-gray-200'
		);
	};

	/**
	 * Get progress bar color for BMI scale
	 */
	const getProgressColor = (bmi: number) => {
		if (bmi < 18.5) return 'bg-blue-500';
		if (bmi <= 24.9) return 'bg-green-500';
		if (bmi <= 29.9) return 'bg-yellow-500';
		if (bmi <= 34.9) return 'bg-orange-500';
		return 'bg-red-500';
	};

	/**
	 * Calculate progress percentage for BMI scale (0-50 range)
	 */
	const getProgressPercentage = (bmi: number) => {
		// Scale from 0 to 50 for visual representation
		return Math.min((bmi / 50) * 100, 100);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Calculator Card */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
						<Calculator className='w-6 h-6 text-blue-600 dark:text-blue-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('form.title')}
					</h2>
				</div>

				{/* Input Form */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					{/* Weight Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Scale className='w-4 h-4' />
							{t('form.weight')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								placeholder={t('form.weightPlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='20'
								max='300'
								step='0.1'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								кг
							</span>
						</div>
					</div>

					{/* Height Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Ruler className='w-4 h-4' />
							{t('form.height')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={height}
								onChange={(e) => setHeight(e.target.value)}
								placeholder={t('form.heightPlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='100'
								max='250'
								step='0.1'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								см
							</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 mb-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating || (!weight && !height)}
						className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<TrendingUp className='w-4 h-4' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors'
					>
						{t('form.reset')}
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className='flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6'>
						<AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
						<span className='text-red-700 dark:text-red-300'>
							{error}
						</span>
					</div>
				)}

				{/* Results */}
				{result && (
					<div className='space-y-6'>
						{/* BMI Value and Category */}
						<div className='text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
							<div className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
								{result.bmi}
							</div>
							<div className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
								{t('results.bmiUnit')}
							</div>
							<div
								className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getCategoryColor(
									result.color
								)}`}
							>
								<CheckCircle className='w-4 h-4' />
								<span className='font-medium'>
									{t(`categories.${result.category}`)}
								</span>
							</div>
						</div>

						{/* BMI Scale */}
						<div className='space-y-3'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								{t('results.scale')}
							</h3>
							<div className='relative'>
								<div className='w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden'>
									<div
										className={`h-full ${getProgressColor(
											result.bmi
										)} transition-all duration-500`}
										style={{
											width: `${getProgressPercentage(
												result.bmi
											)}%`,
										}}
									/>
								</div>
								<div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2'>
									<span>0</span>
									<span>18.5</span>
									<span>25</span>
									<span>30</span>
									<span>40+</span>
								</div>
							</div>
						</div>

						{/* Recommendations */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
									{t('results.recommendation')}
								</h4>
								<p className='text-blue-800 dark:text-blue-200'>
									{t(
										`recommendations.${result.recommendation}`
									)}
								</p>
							</div>
							<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
								<h4 className='font-semibold text-green-900 dark:text-green-300 mb-2'>
									{t('results.normalRange')}
								</h4>
								<p className='text-green-800 dark:text-green-200'>
									{t('results.normalRangeText', {
										min: result.normalWeightRange.min,
										max: result.normalWeightRange.max,
									})}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* BMI Categories Table */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('table.title')}
				</h3>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-gray-200 dark:border-gray-700'>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.category')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.bmiRange')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.interpretation')}
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
							{Object.entries({
								underweight: { min: '< 18.5', color: 'blue' },
								normal: { min: '18.5 – 24.9', color: 'green' },
								overweight: {
									min: '25.0 – 29.9',
									color: 'yellow',
								},
								obese1: { min: '30.0 – 34.9', color: 'orange' },
								obese2: { min: '35.0 – 39.9', color: 'red' },
								obese3: { min: '≥ 40.0', color: 'red' },
							}).map(([key, { min, color }]) => (
								<tr
									key={key}
									className='hover:bg-gray-50 dark:hover:bg-gray-700'
								>
									<td className='py-3 px-4'>
										<span
											className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
												color
											)}`}
										>
											{t(`categories.${key}`)}
										</span>
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{min}
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{t(`interpretations.${key}`)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
