'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	calculateCalorieNeeds,
	calculateFoodCalories,
	searchFoods,
	getPopularFoods,
	validateBMRInput,
	validateFoodInput,
	formatCalorieNumber,
	getLocalizedFoodName,
	type Gender,
	type ActivityLevel,
	type BMRResult,
	type FoodResult,
} from '@/lib/calculators/calories';
import {
	Calculator,
	Search,
	RotateCcw,
	TrendingUp,
	TrendingDown,
	Minus,
	Plus,
	Apple,
	Utensils,
} from 'lucide-react';

/**
 * Calories Calculator Component
 * Calculates daily calorie needs and food calories
 */
export default function CaloriesCalculator() {
	const t = useTranslations('calculators.calories');
	const locale = useLocale();

	// Tab state
	const [activeTab, setActiveTab] = useState<'bmr' | 'food'>('bmr');

	// BMR form state
	const [gender, setGender] = useState<Gender>('male');
	const [age, setAge] = useState<string>('');
	const [weight, setWeight] = useState<string>('');
	const [height, setHeight] = useState<string>('');
	const [activityLevel, setActivityLevel] =
		useState<ActivityLevel>('moderate');
	const [bmrResult, setBmrResult] = useState<BMRResult | null>(null);
	const [bmrError, setBmrError] = useState<string | null>(null);

	// Food form state
	const [foodSearch, setFoodSearch] = useState<string>('');
	const [selectedFood, setSelectedFood] = useState<string>('');
	const [selectedFoodData, setSelectedFoodData] = useState<any>(null);
	const [foodWeight, setFoodWeight] = useState<string>('');
	const [foodResult, setFoodResult] = useState<FoodResult | null>(null);
	const [foodError, setFoodError] = useState<string | null>(null);
	const [searchResults, setSearchResults] = useState<
		Array<{ key: string; data: any }>
	>([]);

	/**
	 * Handle BMR calculation
	 */
	const handleBMRCalculation = () => {
		const numAge = parseFloat(age);
		const numWeight = parseFloat(weight);
		const numHeight = parseFloat(height);

		const validation = validateBMRInput(
			gender,
			numAge,
			numWeight,
			numHeight,
			activityLevel
		);

		if (!validation.isValid) {
			setBmrError(validation.error || 'Invalid input');
			setBmrResult(null);
			return;
		}

		try {
			const result = calculateCalorieNeeds(
				gender,
				numAge,
				numWeight,
				numHeight,
				activityLevel
			);
			setBmrResult(result);
			setBmrError(null);
		} catch (err) {
			setBmrError('Calculation failed');
			setBmrResult(null);
		}
	};

	/**
	 * Handle food calculation
	 */
	const handleFoodCalculation = () => {
		const numWeight = parseFloat(foodWeight);

		const validation = validateFoodInput(selectedFood, numWeight);

		if (!validation.isValid) {
			setFoodError(validation.error || 'Invalid input');
			setFoodResult(null);
			return;
		}

		try {
			const result = calculateFoodCalories(selectedFood, numWeight);
			setFoodResult(result);
			setFoodError(null);
		} catch (err) {
			setFoodError('Calculation failed');
			setFoodResult(null);
		}
	};

	/**
	 * Handle food search
	 */
	const handleFoodSearch = (query: string) => {
		setFoodSearch(query);
		if (query.trim()) {
			const results = searchFoods(query, locale);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	/**
	 * Handle food selection
	 */
	const handleFoodSelection = (foodKey: string, foodData: any) => {
		setSelectedFood(foodKey);
		setSelectedFoodData(foodData);
		setFoodSearch('');
		setSearchResults([]);
	};

	/**
	 * Handle reset BMR form
	 */
	const handleResetBMR = () => {
		setAge('');
		setWeight('');
		setHeight('');
		setActivityLevel('moderate');
		setBmrResult(null);
		setBmrError(null);
	};

	/**
	 * Handle reset food form
	 */
	const handleResetFood = () => {
		setSelectedFood('');
		setSelectedFoodData(null);
		setFoodWeight('');
		setFoodSearch('');
		setSearchResults([]);
		setFoodResult(null);
		setFoodError(null);
	};

	/**
	 * Auto-calculate BMR when inputs change
	 */
	useEffect(() => {
		if (age && weight && height) {
			handleBMRCalculation();
		} else {
			setBmrResult(null);
		}
	}, [gender, age, weight, height, activityLevel]);

	/**
	 * Auto-calculate food when inputs change
	 */
	useEffect(() => {
		if (selectedFood && foodWeight) {
			handleFoodCalculation();
		} else {
			setFoodResult(null);
		}
	}, [selectedFood, foodWeight]);

	/**
	 * Animation variants
	 */
	const tabVariants = {
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
			{/* Tab Navigation */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<div className='flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
					<button
						onClick={() => setActiveTab('bmr')}
						className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200 ${
							activeTab === 'bmr'
								? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
								: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
						}`}
					>
						<Calculator className='h-5 w-5' />
						<span className='font-medium'>
							{t('tabs.dailyNeeds')}
						</span>
					</button>
					<button
						onClick={() => setActiveTab('food')}
						className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200 ${
							activeTab === 'food'
								? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
								: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
						}`}
					>
						<Apple className='h-5 w-5' />
						<span className='font-medium'>
							{t('tabs.foodCalories')}
						</span>
					</button>
				</div>
			</div>

			{/* BMR Calculator Tab */}
			<AnimatePresence mode='wait'>
				{activeTab === 'bmr' && (
					<motion.div
						key='bmr'
						variants={tabVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='space-y-6'
					>
						{/* BMR Form */}
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
							<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
								<Calculator className='h-6 w-6 text-blue-600' />
								{t('bmr.title')}
							</h2>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{/* Gender */}
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('bmr.gender')}
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
											{t('bmr.male')}
										</button>
										<button
											onClick={() => setGender('female')}
											className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
												gender === 'female'
													? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
													: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
											}`}
										>
											{t('bmr.female')}
										</button>
									</div>
								</div>

								{/* Age */}
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('bmr.age')}
									</label>
									<input
										type='number'
										value={age}
										onChange={(e) => setAge(e.target.value)}
										placeholder='25'
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>

								{/* Weight */}
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('bmr.weight')}
									</label>
									<input
										type='number'
										step='0.1'
										value={weight}
										onChange={(e) =>
											setWeight(e.target.value)
										}
										placeholder='70'
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>

								{/* Height */}
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('bmr.height')}
									</label>
									<input
										type='number'
										value={height}
										onChange={(e) =>
											setHeight(e.target.value)
										}
										placeholder='175'
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>

								{/* Activity Level */}
								<div className='md:col-span-2 lg:col-span-1'>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('bmr.activity')}
									</label>
									<select
										value={activityLevel}
										onChange={(e) =>
											setActivityLevel(
												e.target.value as ActivityLevel
											)
										}
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									>
										<option value='minimal'>
											{t('bmr.activityLevels.minimal')}
										</option>
										<option value='light'>
											{t('bmr.activityLevels.light')}
										</option>
										<option value='moderate'>
											{t('bmr.activityLevels.moderate')}
										</option>
										<option value='high'>
											{t('bmr.activityLevels.high')}
										</option>
										<option value='extreme'>
											{t('bmr.activityLevels.extreme')}
										</option>
									</select>
								</div>
							</div>

							{/* Error Message */}
							{bmrError && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
								>
									<p className='text-red-700 dark:text-red-300 text-sm'>
										{bmrError}
									</p>
								</motion.div>
							)}

							{/* Reset Button */}
							<div className='flex justify-end mt-6'>
								<button
									onClick={handleResetBMR}
									className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2'
								>
									<RotateCcw className='h-4 w-4' />
									{t('bmr.reset')}
								</button>
							</div>
						</div>

						{/* BMR Results */}
						<AnimatePresence>
							{bmrResult && (
								<motion.div
									variants={resultVariants}
									initial='hidden'
									animate='visible'
									exit='exit'
									className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'
								>
									<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
										<TrendingUp className='h-6 w-6 text-green-600' />
										{t('bmr.results.title')}
									</h2>

									<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
										{/* Weight Loss */}
										<div className='bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-lg'>
											<div className='flex items-center gap-3 mb-3'>
												<TrendingDown className='h-6 w-6 text-red-600' />
												<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
													{t(
														'bmr.results.weightLoss'
													)}
												</h3>
											</div>
											<div className='text-3xl font-bold text-red-600 dark:text-red-400 mb-2'>
												{bmrResult.weightLoss}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t(
													'bmr.results.caloriesPerDay'
												)}
											</div>
										</div>

										{/* Weight Maintenance */}
										<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg'>
											<div className='flex items-center gap-3 mb-3'>
												<Minus className='h-6 w-6 text-green-600' />
												<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
													{t(
														'bmr.results.weightMaintenance'
													)}
												</h3>
											</div>
											<div className='text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>
												{bmrResult.weightMaintenance}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t(
													'bmr.results.caloriesPerDay'
												)}
											</div>
										</div>

										{/* Weight Gain */}
										<div className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg'>
											<div className='flex items-center gap-3 mb-3'>
												<Plus className='h-6 w-6 text-blue-600' />
												<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
													{t(
														'bmr.results.weightGain'
													)}
												</h3>
											</div>
											<div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
												{bmrResult.weightGain}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t(
													'bmr.results.caloriesPerDay'
												)}
											</div>
										</div>
									</div>

									{/* BMR Info */}
									<div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
										<div className='text-sm text-blue-800 dark:text-blue-300'>
											<strong>
												{t('bmr.results.bmr')}:
											</strong>{' '}
											{bmrResult.bmr}{' '}
											{t('bmr.results.caloriesPerDay')}
										</div>
										<div className='text-sm text-blue-700 dark:text-blue-400 mt-1'>
											<strong>
												{t('bmr.results.tdee')}:
											</strong>{' '}
											{bmrResult.tdee}{' '}
											{t('bmr.results.caloriesPerDay')}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Food Calculator Tab */}
			<AnimatePresence mode='wait'>
				{activeTab === 'food' && (
					<motion.div
						key='food'
						variants={tabVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='space-y-6'
					>
						{/* Food Form */}
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
							<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
								<Utensils className='h-6 w-6 text-orange-600' />
								{t('food.title')}
							</h2>

							<div className='space-y-6'>
								{/* Food Search */}
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('food.search')}
									</label>
									<div className='relative'>
										<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
										<input
											type='text'
											value={foodSearch}
											onChange={(e) =>
												handleFoodSearch(e.target.value)
											}
											placeholder={t(
												'food.searchPlaceholder'
											)}
											className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										/>
									</div>

									{/* Search Results */}
									{searchResults.length > 0 && (
										<div className='mt-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 max-h-48 overflow-y-auto'>
											{searchResults.map(
												({ key, data }) => (
													<button
														key={key}
														onClick={() =>
															handleFoodSelection(
																key,
																data
															)
														}
														className='w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-100 dark:border-gray-600 last:border-b-0'
													>
														<div className='font-medium text-gray-900 dark:text-white'>
															{getLocalizedFoodName(
																data,
																locale
															)}
														</div>
														<div className='text-sm text-gray-500 dark:text-gray-400'>
															{data.kcal}{' '}
															{t(
																'food.kcalPer100g'
															)}
														</div>
													</button>
												)
											)}
										</div>
									)}
								</div>

								{/* Selected Food */}
								{selectedFood && selectedFoodData && (
									<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
										<div className='text-sm text-green-800 dark:text-green-300'>
											<strong>
												{t('food.selected')}:
											</strong>{' '}
											{getLocalizedFoodName(
												selectedFoodData,
												locale
											)}
										</div>
									</div>
								)}

								{/* Weight Input */}
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('food.weight')}
									</label>
									<input
										type='number'
										step='1'
										value={foodWeight}
										onChange={(e) =>
											setFoodWeight(e.target.value)
										}
										placeholder='100'
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
							</div>

							{/* Error Message */}
							{foodError && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
								>
									<p className='text-red-700 dark:text-red-300 text-sm'>
										{foodError}
									</p>
								</motion.div>
							)}

							{/* Reset Button */}
							<div className='flex justify-end mt-6'>
								<button
									onClick={handleResetFood}
									className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2'
								>
									<RotateCcw className='h-4 w-4' />
									{t('food.reset')}
								</button>
							</div>
						</div>

						{/* Food Results */}
						<AnimatePresence>
							{foodResult && (
								<motion.div
									variants={resultVariants}
									initial='hidden'
									animate='visible'
									exit='exit'
									className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'
								>
									<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2'>
										<Apple className='h-6 w-6 text-orange-600' />
										{t('food.results.title')}
									</h2>

									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{/* Calories */}
										<div className='bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg'>
											<div className='text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1'>
												{formatCalorieNumber(
													foodResult.calories
												)}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t('food.results.calories')}
											</div>
										</div>

										{/* Protein */}
										<div className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg'>
											<div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1'>
												{formatCalorieNumber(
													foodResult.protein
												)}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t('food.results.protein')} (г)
											</div>
										</div>

										{/* Fat */}
										<div className='bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg'>
											<div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1'>
												{formatCalorieNumber(
													foodResult.fat
												)}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t('food.results.fat')} (г)
											</div>
										</div>

										{/* Carbs */}
										<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg'>
											<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-1'>
												{formatCalorieNumber(
													foodResult.carbs
												)}
											</div>
											<div className='text-sm text-gray-600 dark:text-gray-400'>
												{t('food.results.carbs')} (г)
											</div>
										</div>
									</div>

									{/* Food Info */}
									<div className='mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
										<div className='text-sm text-gray-700 dark:text-gray-300'>
											<strong>
												{getLocalizedFoodName(
													foodResult.food,
													locale
												)}
											</strong>{' '}
											- {foodResult.weight}г
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
											{t('food.results.per100g')}:{' '}
											{foodResult.food.kcal}{' '}
											{t('food.kcalPer100g')}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
