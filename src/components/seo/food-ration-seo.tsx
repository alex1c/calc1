'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function FoodRationSEO() {
	const t = useTranslations('calculators.foodRation.seo');

	const renderList = (items: string[]) => (
		<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mt-12 space-y-10'
		>
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300'>
						{t('overview.content')}
					</p>
				</div>
			</div>

			{/* BJU Calculation Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('calculation.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('calculation.content')}
					</p>
					<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4'>
						<code className='text-sm text-gray-800 dark:text-gray-200'>
							{t('calculation.formula')}
						</code>
					</div>
					{Array.isArray(t.raw('calculation.steps')) &&
						renderList(t.raw('calculation.steps') as string[])}
				</div>
			</div>

			{/* Macronutrients Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('macronutrients.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('macronutrients.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Protein */}
						<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
							<div className='font-semibold text-blue-800 dark:text-blue-300 mb-2'>
								{t('macronutrients.protein.title')}
							</div>
							<div className='text-sm text-blue-700 dark:text-blue-400 mb-2'>
								{t('macronutrients.protein.amount')}
							</div>
							<div className='text-sm text-blue-600 dark:text-blue-500'>
								{t('macronutrients.protein.description')}
							</div>
						</div>

						{/* Fat */}
						<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
							<div className='font-semibold text-red-800 dark:text-red-300 mb-2'>
								{t('macronutrients.fat.title')}
							</div>
							<div className='text-sm text-red-700 dark:text-red-400 mb-2'>
								{t('macronutrients.fat.amount')}
							</div>
							<div className='text-sm text-red-600 dark:text-red-500'>
								{t('macronutrients.fat.description')}
							</div>
						</div>

						{/* Carbs */}
						<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
							<div className='font-semibold text-green-800 dark:text-green-300 mb-2'>
								{t('macronutrients.carbs.title')}
							</div>
							<div className='text-sm text-green-700 dark:text-green-400 mb-2'>
								{t('macronutrients.carbs.amount')}
							</div>
							<div className='text-sm text-green-600 dark:text-green-500'>
								{t('macronutrients.carbs.description')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Activity Levels Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('activityLevels.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('activityLevels.content')}
					</p>
					{Array.isArray(t.raw('activityLevels.levels')) &&
						renderList(t.raw('activityLevels.levels') as string[])}
				</div>
			</div>

			{/* Goals Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('goals.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('goals.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Weight Loss */}
						<div className='p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800'>
							<div className='font-semibold text-orange-800 dark:text-orange-300 mb-2'>
								{t('goals.lose.title')}
							</div>
							<div className='text-sm text-orange-700 dark:text-orange-400 mb-2'>
								{t('goals.lose.calorieDeficit')}
							</div>
							<div className='text-sm text-orange-600 dark:text-orange-500'>
								{t('goals.lose.description')}
							</div>
						</div>

						{/* Maintenance */}
						<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
							<div className='font-semibold text-green-800 dark:text-green-300 mb-2'>
								{t('goals.maintain.title')}
							</div>
							<div className='text-sm text-green-700 dark:text-green-400 mb-2'>
								{t('goals.maintain.calorieBalance')}
							</div>
							<div className='text-sm text-green-600 dark:text-green-500'>
								{t('goals.maintain.description')}
							</div>
						</div>

						{/* Weight Gain */}
						<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
							<div className='font-semibold text-blue-800 dark:text-blue-300 mb-2'>
								{t('goals.gain.title')}
							</div>
							<div className='text-sm text-blue-700 dark:text-blue-400 mb-2'>
								{t('goals.gain.calorieSurplus')}
							</div>
							<div className='text-sm text-blue-600 dark:text-blue-500'>
								{t('goals.gain.description')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Health Benefits Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('healthBenefits.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('healthBenefits.content')}
					</p>
					{Array.isArray(t.raw('healthBenefits.items')) &&
						renderList(t.raw('healthBenefits.items') as string[])}
				</div>
			</div>

			{/* Tips Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('tips.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('tips.content')}
					</p>
					{Array.isArray(t.raw('tips.items')) &&
						renderList(t.raw('tips.items') as string[])}
				</div>
			</div>

			{/* Online Calculator Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('onlineCalculator.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300'>
						{t('onlineCalculator.content')}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
