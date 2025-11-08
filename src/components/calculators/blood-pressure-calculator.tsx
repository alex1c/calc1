'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Heart,
	Activity,
	TrendingUp,
	AlertCircle,
	CheckCircle,
	Thermometer,
	Zap,
} from 'lucide-react';
import {
	calculateBloodPressure,
	validateBloodPressureInput,
	BloodPressureInput,
	BloodPressureResult,
	AGE_RANGES,
	getAgeRangeInfo,
} from '@/lib/calculators/blood-pressure';

/**
 * Blood Pressure Calculator Component
 * 
 * A React component for calculating blood pressure categories and health recommendations.
 * 
 * Features:
 * - Blood pressure category classification (normal, elevated, hypertension stages)
 * - Age-specific normal ranges
 * - Health recommendations based on category
 * - Visual category indicators with color coding
 * - Risk assessment
 * - Responsive design
 * 
 * Blood pressure categories (based on AHA guidelines):
 * - Normal: <120/<80 mmHg
 * - Elevated: 120-129/<80 mmHg
 * - Hypertension Stage 1: 130-139/80-89 mmHg
 * - Hypertension Stage 2: ≥140/≥90 mmHg
 * - Hypertensive Crisis: >180/>120 mmHg
 * 
 * Uses the blood pressure calculation library from @/lib/calculators/blood-pressure
 * for all mathematical operations.
 */
export default function BloodPressureCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.bloodPressure');

	// State for input values (stored as strings for controlled inputs)
	const [age, setAge] = useState<string>(''); // Age in years
	const [systolic, setSystolic] = useState<string>(''); // Systolic pressure (top number)
	const [diastolic, setDiastolic] = useState<string>(''); // Diastolic pressure (bottom number)
	const [result, setResult] = useState<BloodPressureResult | null>(null); // Calculated blood pressure category
	const [error, setError] = useState<string>(''); // Validation error message
	const [isCalculating, setIsCalculating] = useState<boolean>(false); // Loading state during calculation

	/**
	 * Handle form submission and blood pressure calculation
	 * 
	 * Validates inputs and calculates blood pressure category.
	 * 
	 * Process:
	 * 1. Parse string inputs to numbers
	 * 2. Validate inputs using validateBloodPressureInput
	 * 3. Calculate blood pressure category using calculateBloodPressure
	 * 4. Update result state or error state
	 */
	const handleCalculate = async () => {
		setError(''); // Clear previous errors
		setIsCalculating(true);

		try {
			const ageNum = parseInt(age); // Parse age to number
			const systolicNum = parseInt(systolic); // Parse systolic pressure
			const diastolicNum = parseInt(diastolic); // Parse diastolic pressure

			// Validate input
			const validation = validateBloodPressureInput(
				ageNum,
				systolicNum,
				diastolicNum
			);
			if (!validation.isValid) {
				setError(t(`form.errors.${validation.error}`));
				return;
			}

			// Calculate blood pressure category
			const bloodPressureResult = calculateBloodPressure({
				age: ageNum,
				systolic: systolicNum,
				diastolic: diastolicNum,
			});

			setResult(bloodPressureResult);
		} catch (err) {
			setError(t('form.errors.calculationError'));
		} finally {
			setIsCalculating(false);
		}
	};

	/**
	 * Reset form and clear results
	 * 
	 * Clears all form inputs and resets result and error states.
	 * Called when user clicks the reset button.
	 */
	const handleReset = () => {
		setAge(''); // Clear age input
		setSystolic(''); // Clear systolic input
		setDiastolic(''); // Clear diastolic input
		setResult(null); // Clear result
		setError(''); // Clear errors
	};

	/**
	 * Get color classes for blood pressure category
	 * 
	 * Returns Tailwind CSS classes for category display based on category color.
	 * Used for visual differentiation of blood pressure categories.
	 * 
	 * @param color - Category color identifier (blue, green, yellow, orange, red)
	 * @returns Tailwind CSS classes for category styling
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
	 * Get risk level color
	 */
	const getRiskColor = (riskLevel: string) => {
		const riskMap = {
			low: 'text-green-600',
			moderate: 'text-yellow-600',
			high: 'text-orange-600',
			veryHigh: 'text-red-600',
			critical: 'text-red-700',
		};
		return riskMap[riskLevel as keyof typeof riskMap] || 'text-gray-600';
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Page Header with Infographic */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-red-100 dark:bg-red-900 rounded-full'>
							<Heart className='w-12 h-12 text-red-600 dark:text-red-400' />
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
							{t('infographic.measurement')}
						</div>
						<div className='text-sm text-blue-800 dark:text-blue-200'>
							{t('infographic.measurementDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.categories')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.categoriesDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2'>
							{t('infographic.age')}
						</div>
						<div className='text-sm text-yellow-800 dark:text-yellow-200'>
							{t('infographic.ageDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Card */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
						<Calculator className='w-6 h-6 text-red-600 dark:text-red-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('form.title')}
					</h2>
				</div>

				{/* Input Form */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
					{/* Age Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Activity className='w-4 h-4' />
							{t('form.age')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={age}
								onChange={(e) => setAge(e.target.value)}
								placeholder={t('form.agePlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='1'
								max='120'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.years')}
							</span>
						</div>
					</div>

					{/* Systolic Pressure Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Thermometer className='w-4 h-4' />
							{t('form.systolic')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={systolic}
								onChange={(e) => setSystolic(e.target.value)}
								placeholder={t('form.systolicPlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='50'
								max='300'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.mmhg')}
							</span>
						</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							{t('form.systolicHint')}
						</p>
					</div>

					{/* Diastolic Pressure Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Heart className='w-4 h-4' />
							{t('form.diastolic')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={diastolic}
								onChange={(e) => setDiastolic(e.target.value)}
								placeholder={t('form.diastolicPlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='30'
								max='200'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.mmhg')}
							</span>
						</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							{t('form.diastolicHint')}
						</p>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 mb-6'>
					<button
						onClick={handleCalculate}
						disabled={
							isCalculating || !age || !systolic || !diastolic
						}
						className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
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
						{/* Blood Pressure Result */}
						<div className='text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
							<div className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
								{systolic} / {diastolic}
							</div>
							<div className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
								{t('results.mmhg')}
							</div>
							<div
								className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getCategoryColor(
									result.color
								)}`}
							>
								<CheckCircle className='w-4 h-4' />
								<span className='font-medium'>
									{t(`categories.${result.category}.title`)}
								</span>
							</div>
						</div>

						{/* Category Description and Recommendation */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
									{t('results.description')}
								</h4>
								<p className='text-blue-800 dark:text-blue-200'>
									{t(
										`categories.${result.category}.description`
									)}
								</p>
							</div>
							<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
								<h4 className='font-semibold text-green-900 dark:text-green-300 mb-2'>
									{t('results.recommendation')}
								</h4>
								<p className='text-green-800 dark:text-green-200'>
									{t(
										`recommendations.${result.recommendation}`
									)}
								</p>
							</div>
						</div>

						{/* Risk Level */}
						<div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
							<h4 className='font-semibold text-yellow-900 dark:text-yellow-300 mb-2'>
								{t('results.riskLevel')}
							</h4>
							<p
								className={`font-medium ${getRiskColor(
									result.riskLevel
								)}`}
							>
								{t(`riskLevels.${result.riskLevel}`)}
							</p>
						</div>

						{/* Normal Range for Age */}
						{age && (
							<div className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
								<h4 className='font-semibold text-purple-900 dark:text-purple-300 mb-2'>
									{t('results.normalRange')}
								</h4>
								<p className='text-purple-800 dark:text-purple-200'>
									{t('results.normalRangeText', {
										min: result.normalRange.systolic.min,
										max: result.normalRange.systolic.max,
										minD: result.normalRange.diastolic.min,
										maxD: result.normalRange.diastolic.max,
									})}
								</p>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Blood Pressure Norms Table */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('table.title')}
				</h3>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-gray-200 dark:border-gray-700'>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.age')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.normal')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.comment')}
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
							{AGE_RANGES.map((range, index) => (
								<tr
									key={index}
									className='hover:bg-gray-50 dark:hover:bg-gray-700'
								>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{range.min}–{range.max}{' '}
										{t('table.years')}
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{range.normalSystolic.min}–
										{range.normalSystolic.max} /{' '}
										{range.normalDiastolic.min}–
										{range.normalDiastolic.max}
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{t(`table.comments.${range.comment}`)}
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
