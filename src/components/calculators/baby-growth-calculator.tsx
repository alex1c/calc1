'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Calculator,
	Baby,
	User,
	Calendar,
	Ruler,
	Weight,
	TrendingUp,
	AlertTriangle,
	CheckCircle,
	Info,
} from 'lucide-react';
import {
	calculateBabyGrowth,
	validateBabyGrowthInput,
	yearsToMonths,
	monthsToYears,
	type BabyGrowthInput,
	type BabyGrowthResult,
} from '@/lib/calculators/baby-growth';

/**
 * Baby Growth Calculator Component
 * 
 * A React component for calculating baby growth percentiles and development.
 * 
 * Features:
 * - Gender selection (male, female)
 * - Age input (months or years)
 * - Height and weight input
 * - Growth percentile calculation
 * - WHO growth charts comparison
 * - Development assessment
 * - Recommendations
 * - Responsive design
 * 
 * Uses the baby growth calculation library from @/lib/calculators/baby-growth
 * for all percentile calculations based on WHO growth standards.
 */
export default function BabyGrowthCalculator() {
	// Internationalization hooks for translations
	const t = useTranslations('calculators.babyGrowth');
	const tCommon = useTranslations('common');
	const locale = useLocale(); // Current locale for date formatting

	// Form state management
	const [formData, setFormData] = useState<BabyGrowthInput>({
		gender: 'male', // Baby gender (male, female)
		ageMonths: 12, // Age in months
		height: 75, // Height in cm
		weight: 9.5, // Weight in kg
	});

	const [result, setResult] = useState<BabyGrowthResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [ageInputType, setAgeInputType] = useState<'months' | 'years'>(
		'months' // Age input type (months or years)
	);

	const handleInputChange = (field: keyof BabyGrowthInput, value: any) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Автоматический пересчёт при изменении данных
		if (result) {
			handleCalculate();
		}
	};

	const handleAgeInputChange = (value: number) => {
		const ageMonths =
			ageInputType === 'years' ? yearsToMonths(value) : value;
		handleInputChange('ageMonths', ageMonths);
	};

	const handleCalculate = () => {
		setIsCalculating(true);
		setErrors([]);

		// Валидация
		const validationErrors = validateBabyGrowthInput(formData);
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setIsCalculating(false);
			return;
		}

		// Расчёт
		try {
			const calculationResult = calculateBabyGrowth(formData, locale);
			setResult(calculationResult);
		} catch (error) {
			setErrors([tCommon('calculationError')]);
		}

		setIsCalculating(false);
	};

	const handleReset = () => {
		setFormData({
			gender: 'male',
			ageMonths: 12,
			height: 75,
			weight: 9.5,
		});
		setResult(null);
		setErrors([]);
	};

	const getCategoryColor = (percentile: number) => {
		if (percentile < 5) return 'bg-red-100 border-red-300 text-red-800';
		if (percentile < 25)
			return 'bg-orange-100 border-orange-300 text-orange-800';
		if (percentile < 75)
			return 'bg-green-100 border-green-300 text-green-800';
		if (percentile < 95)
			return 'bg-yellow-100 border-yellow-300 text-yellow-800';
		return 'bg-blue-100 border-blue-300 text-blue-800';
	};

	const getCategoryIcon = (percentile: number) => {
		if (percentile < 5) return <AlertTriangle className='w-5 h-5' />;
		if (percentile < 25) return <Info className='w-5 h-5' />;
		if (percentile < 75) return <CheckCircle className='w-5 h-5' />;
		if (percentile < 95) return <TrendingUp className='w-5 h-5' />;
		return <AlertTriangle className='w-5 h-5' />;
	};

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			{/* Заголовок */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center'
			>
				<div className='flex items-center justify-center gap-3 text-4xl mb-4'>
					<Baby className='text-pink-500' />
					<Calculator className='text-blue-500' />
					<TrendingUp className='text-green-500' />
				</div>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('title')}
				</h2>
				<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</motion.div>

			{/* Форма */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'
			>
				<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<Calculator className='text-blue-600' />
					{t('form.title')}
				</h3>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Пол */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<User className='inline w-4 h-4 mr-1' />
							{t('form.gender')}
						</label>
						<div className='flex gap-4'>
							<label className='flex items-center'>
								<input
									type='radio'
									name='gender'
									value='male'
									checked={formData.gender === 'male'}
									onChange={(e) =>
										handleInputChange(
											'gender',
											e.target.value
										)
									}
									className='mr-2'
								/>
								<span className='text-gray-700 dark:text-gray-300'>
									{t('form.genderMale')}
								</span>
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='gender'
									value='female'
									checked={formData.gender === 'female'}
									onChange={(e) =>
										handleInputChange(
											'gender',
											e.target.value
										)
									}
									className='mr-2'
								/>
								<span className='text-gray-700 dark:text-gray-300'>
									{t('form.genderFemale')}
								</span>
							</label>
						</div>
					</div>

					{/* Возраст */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<Calendar className='inline w-4 h-4 mr-1' />
							{t('form.age')}
						</label>
						<div className='flex gap-2'>
							<input
								type='number'
								value={
									ageInputType === 'years'
										? monthsToYears(formData.ageMonths)
										: formData.ageMonths
								}
								onChange={(e) =>
									handleAgeInputChange(Number(e.target.value))
								}
								min={ageInputType === 'years' ? 0 : 0}
								max={ageInputType === 'years' ? 5 : 60}
								step={ageInputType === 'years' ? 0.1 : 1}
								className='flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							/>
							<select
								value={ageInputType}
								onChange={(e) =>
									setAgeInputType(
										e.target.value as 'months' | 'years'
									)
								}
								className='px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							>
								<option value='months'>
									{t('form.ageMonths')}
								</option>
								<option value='years'>
									{t('form.ageYears')}
								</option>
							</select>
						</div>
					</div>

					{/* Рост */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<Ruler className='inline w-4 h-4 mr-1' />
							{t('form.height')}
						</label>
						<input
							type='number'
							value={formData.height}
							onChange={(e) =>
								handleInputChange(
									'height',
									Number(e.target.value)
								)
							}
							min={30}
							max={150}
							step={0.1}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						/>
					</div>

					{/* Вес */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<Weight className='inline w-4 h-4 mr-1' />
							{t('form.weight')}
						</label>
						<input
							type='number'
							value={formData.weight}
							onChange={(e) =>
								handleInputChange(
									'weight',
									Number(e.target.value)
								)
							}
							min={1}
							max={50}
							step={0.1}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						/>
					</div>
				</div>

				{/* Ошибки */}
				{errors.length > 0 && (
					<div className='mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
						<div className='flex items-start gap-2'>
							<AlertTriangle className='text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0' />
							<div>
								<h4 className='font-semibold text-red-800 dark:text-red-200 mb-2'>
									{t('form.errors.title')}
								</h4>
								<ul className='text-red-700 dark:text-red-300 text-sm space-y-1'>
									{errors.map((error, index) => (
										<li key={index}>• {error}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)}

				{/* Кнопки */}
				<div className='flex gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating}
						className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
					>
						{isCalculating ? (
							<>
								<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calculator className='w-4 h-4' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
					>
						{t('form.reset')}
					</button>
				</div>
			</motion.div>

			{/* Результаты */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='space-y-6'
				>
					{/* Общая оценка */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<Baby className='text-pink-600' />
							{t('result.overallTitle')}
						</h3>
						<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
							<p className='text-blue-800 dark:text-blue-200 font-medium'>
								{result.overallAssessment}
							</p>
						</div>
					</div>

					{/* Результаты по росту и весу */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Рост */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<Ruler className='text-green-600' />
								{t('result.height')}
							</h4>
							<div className='space-y-3'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600 dark:text-gray-400'>
										{t('result.percentile')}:
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{result.heightPercentile}%
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600 dark:text-gray-400'>
										{t('result.category')}:
									</span>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
											result.heightPercentile
										)} flex items-center gap-1`}
									>
										{getCategoryIcon(
											result.heightPercentile
										)}
										{result.heightCategory}
									</span>
								</div>
								<div className='mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
									<p className='text-sm text-gray-600 dark:text-gray-300'>
										{result.heightComment}
									</p>
								</div>
							</div>
						</div>

						{/* Вес */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<Weight className='text-orange-600' />
								{t('result.weight')}
							</h4>
							<div className='space-y-3'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600 dark:text-gray-400'>
										{t('result.percentile')}:
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{result.weightPercentile}%
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600 dark:text-gray-400'>
										{t('result.category')}:
									</span>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
											result.weightPercentile
										)} flex items-center gap-1`}
									>
										{getCategoryIcon(
											result.weightPercentile
										)}
										{result.weightCategory}
									</span>
								</div>
								<div className='mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
									<p className='text-sm text-gray-600 dark:text-gray-300'>
										{result.weightComment}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Рекомендации */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
						<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<Info className='text-blue-600' />
							{t('result.recommendations')}
						</h4>
						<ul className='space-y-2'>
							{result.recommendations.map(
								(recommendation, index) => (
									<li
										key={index}
										className='flex items-start gap-2'
									>
										<CheckCircle className='text-green-500 mt-0.5 flex-shrink-0 w-4 h-4' />
										<span className='text-gray-600 dark:text-gray-300'>
											{recommendation}
										</span>
									</li>
								)
							)}
						</ul>
					</div>
				</motion.div>
			)}

			{/* Информация о калькуляторе */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'
			>
				<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2'>
					<Info className='text-blue-600' />
					{t('info.title')}
				</h3>
				<p className='text-blue-800 dark:text-blue-200 text-sm leading-relaxed'>
					{t('info.content')}
				</p>
			</motion.div>
		</div>
	);
}
