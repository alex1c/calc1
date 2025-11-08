'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import {
	Calculator,
	RotateCcw,
	TrendingUp,
	Target,
	Activity,
} from 'lucide-react';
import {
	calculateBJU,
	validateBJUInput,
	formatBJUNumber,
	getMacronutrientColor,
	type BJUInput,
	type BJUResult,
	type ActivityLevel,
	type Goal,
} from '@/lib/calculators/food-ration';

/**
 * Food Ration Calculator Component
 * 
 * A React component for calculating daily macronutrient requirements (BJU: proteins, fats, carbs).
 * 
 * Features:
 * - Gender selection (male, female)
 * - Age, weight, height input
 * - Activity level selection
 * - Goal selection (maintain, lose weight, gain weight)
 * - Daily calorie calculation
 * - Macronutrient breakdown (proteins, fats, carbohydrates)
 * - Visual pie chart
 * - Recommendations
 * - Responsive design
 * 
 * Uses the food ration calculation library from @/lib/calculators/food-ration
 * for all BJU calculations based on Harris-Benedict formula and activity multipliers.
 */
export default function FoodRationCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.foodRation');

	// Form state management
	const [formData, setFormData] = useState<BJUInput>({
		gender: 'male', // Gender (male, female)
		age: 25, // Age in years
		weight: 70, // Weight in kg
		height: 175, // Height in cm
		activityLevel: 'moderate', // Activity level (sedentary, light, moderate, active, very active)
		goal: 'maintain', // Goal (maintain, lose, gain)
	});

	// Results state
	const [result, setResult] = useState<BJUResult | null>(null); // Calculated BJU result
	const [error, setError] = useState<string | null>(null); // Validation error message
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation

	// Handle form input changes
	const handleInputChange = (
		field: keyof BJUInput,
		value: string | number
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
		setError(null);
	};

	// Handle calculation
	const handleCalculate = async () => {
		setIsCalculating(true);
		setError(null);

		try {
			// Validate input
			const validation = validateBJUInput(formData);
			if (!validation.isValid) {
				throw new Error(validation.error);
			}

			// Calculate BJU
			const bjuResult = calculateBJU(formData);
			setResult(bjuResult);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Calculation error');
		} finally {
			setIsCalculating(false);
		}
	};

	// Handle reset
	const handleReset = () => {
		setFormData({
			gender: 'male',
			age: 25,
			weight: 70,
			height: 175,
			activityLevel: 'moderate',
			goal: 'maintain',
		});
		setResult(null);
		setError(null);
	};

	// Prepare chart data
	const chartData = result
		? [
				{
					name: t('result.protein'),
					value: result.protein,
					color: getMacronutrientColor('protein'),
				},
				{
					name: t('result.fat'),
					value: result.fat,
					color: getMacronutrientColor('fat'),
				},
				{
					name: t('result.carbs'),
					value: result.carbs,
					color: getMacronutrientColor('carbs'),
				},
		  ]
		: [];

	// Custom tooltip for chart
	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0];
			return (
				<div className='bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg'>
					<p className='font-medium text-gray-900 dark:text-white'>
						{data.name}: {data.value}g
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center'
			>
				<div className='flex items-center justify-center mb-4'>
					<Calculator className='w-8 h-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</motion.div>

			{/* Form */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{/* Gender */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							{t('form.gender')}
						</label>
						<select
							value={formData.gender}
							onChange={(e) =>
								handleInputChange('gender', e.target.value)
							}
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='male'>{t('form.male')}</option>
							<option value='female'>{t('form.female')}</option>
						</select>
					</div>

					{/* Age */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							{t('form.age')}
						</label>
						<input
							type='number'
							value={formData.age}
							onChange={(e) =>
								handleInputChange(
									'age',
									parseInt(e.target.value) || 0
								)
							}
							min='1'
							max='120'
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>

					{/* Weight */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							{t('form.weight')}
						</label>
						<input
							type='number'
							value={formData.weight}
							onChange={(e) =>
								handleInputChange(
									'weight',
									parseFloat(e.target.value) || 0
								)
							}
							min='20'
							max='300'
							step='0.1'
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>

					{/* Height */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							{t('form.height')}
						</label>
						<input
							type='number'
							value={formData.height}
							onChange={(e) =>
								handleInputChange(
									'height',
									parseInt(e.target.value) || 0
								)
							}
							min='100'
							max='250'
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>

					{/* Activity Level */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Activity className='w-4 h-4 inline mr-2' />
							{t('form.activity')}
						</label>
						<select
							value={formData.activityLevel}
							onChange={(e) =>
								handleInputChange(
									'activityLevel',
									e.target.value as ActivityLevel
								)
							}
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='minimal'>
								{t('form.activityMinimal')}
							</option>
							<option value='light'>
								{t('form.activityLight')}
							</option>
							<option value='moderate'>
								{t('form.activityModerate')}
							</option>
							<option value='high'>
								{t('form.activityHigh')}
							</option>
							<option value='extreme'>
								{t('form.activityExtreme')}
							</option>
						</select>
					</div>

					{/* Goal */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Target className='w-4 h-4 inline mr-2' />
							{t('form.goal')}
						</label>
						<select
							value={formData.goal}
							onChange={(e) =>
								handleInputChange(
									'goal',
									e.target.value as Goal
								)
							}
							className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='lose'>{t('form.goalLose')}</option>
							<option value='maintain'>
								{t('form.goalMaintain')}
							</option>
							<option value='gain'>{t('form.goalGain')}</option>
						</select>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-8'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating}
						className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
					>
						{isCalculating ? (
							<>
								<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calculator className='w-5 h-5 mr-2' />
								{t('form.calculate')}
							</>
						)}
					</button>

					<button
						onClick={handleReset}
						className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center'
					>
						<RotateCcw className='w-5 h-5 mr-2' />
						{t('form.reset')}
					</button>
				</div>
			</motion.div>

			{/* Error Message */}
			<AnimatePresence>
				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'
					>
						<p className='text-red-800 dark:text-red-300'>
							{error}
						</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Results */}
			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'
					>
						<div className='text-center mb-6'>
							<TrendingUp className='w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2' />
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								{t('result.title')}
							</h2>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{/* Results Cards */}
							<div className='space-y-4'>
								{/* Calories */}
								<div className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
									<div className='flex items-center justify-between'>
										<div>
											<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-300'>
												{t('result.calories')}
											</h3>
											<p className='text-3xl font-bold text-blue-800 dark:text-blue-200'>
												{result.calories}{' '}
												{t('result.kcal')}
											</p>
										</div>
										<div className='text-right text-sm text-blue-700 dark:text-blue-400'>
											<p>
												BMR: {result.bmr}{' '}
												{t('result.kcal')}
											</p>
											<p>
												TDEE: {result.tdee}{' '}
												{t('result.kcal')}
											</p>
										</div>
									</div>
								</div>

								{/* Macronutrients */}
								<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
									{/* Protein */}
									<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
										<h4 className='text-sm font-medium text-blue-800 dark:text-blue-300 mb-1'>
											{t('result.protein')}
										</h4>
										<p className='text-2xl font-bold text-blue-900 dark:text-blue-200'>
											{formatBJUNumber(result.protein)}g
										</p>
									</div>

									{/* Fat */}
									<div className='bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800'>
										<h4 className='text-sm font-medium text-red-800 dark:text-red-300 mb-1'>
											{t('result.fat')}
										</h4>
										<p className='text-2xl font-bold text-red-900 dark:text-red-200'>
											{formatBJUNumber(result.fat)}g
										</p>
									</div>

									{/* Carbs */}
									<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800'>
										<h4 className='text-sm font-medium text-green-800 dark:text-green-300 mb-1'>
											{t('result.carbs')}
										</h4>
										<p className='text-2xl font-bold text-green-900 dark:text-green-200'>
											{formatBJUNumber(result.carbs)}g
										</p>
									</div>
								</div>
							</div>

							{/* Chart */}
							<div className='flex flex-col items-center'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
									{t('result.macroDistribution')}
								</h3>
								<div className='w-full h-64'>
									<ResponsiveContainer
										width='100%'
										height='100%'
									>
										<PieChart>
											<Pie
												data={chartData}
												cx='50%'
												cy='50%'
												innerRadius={60}
												outerRadius={100}
												paddingAngle={5}
												dataKey='value'
											>
												{chartData.map(
													(entry, index) => (
														<Cell
															key={`cell-${index}`}
															fill={entry.color}
														/>
													)
												)}
											</Pie>
											<Tooltip
												content={<CustomTooltip />}
											/>
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
