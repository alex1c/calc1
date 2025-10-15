'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function BMISEO() {
	const t = useTranslations('calculators.bmi.seo');

	const renderList = (items: string[]) => (
		<ul className='list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300'>
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

			{/* BMI Calculation Section */}
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
							BMI = Weight (kg) / Height² (m²)
						</code>
					</div>
					{Array.isArray(t.raw('calculation.steps')) &&
						renderList(t.raw('calculation.steps') as string[])}
				</div>
			</div>

			{/* BMI Categories Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('categories.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('categories.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Underweight */}
						<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
							<div className='font-semibold text-blue-800 dark:text-blue-300'>
								{t('categories.underweight.title')}
							</div>
							<div className='text-sm text-blue-700 dark:text-blue-400'>
								BMI &lt; 18.5
							</div>
							<div className='text-sm text-blue-600 dark:text-blue-500 mt-1'>
								{t('categories.underweight.description')}
							</div>
						</div>

						{/* Normal */}
						<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
							<div className='font-semibold text-green-800 dark:text-green-300'>
								{t('categories.normal.title')}
							</div>
							<div className='text-sm text-green-700 dark:text-green-400'>
								BMI 18.5-24.9
							</div>
							<div className='text-sm text-green-600 dark:text-green-500 mt-1'>
								{t('categories.normal.description')}
							</div>
						</div>

						{/* Overweight */}
						<div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'>
							<div className='font-semibold text-yellow-800 dark:text-yellow-300'>
								{t('categories.overweight.title')}
							</div>
							<div className='text-sm text-yellow-700 dark:text-yellow-400'>
								BMI 25-29.9
							</div>
							<div className='text-sm text-yellow-600 dark:text-yellow-500 mt-1'>
								{t('categories.overweight.description')}
							</div>
						</div>

						{/* Obesity */}
						<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
							<div className='font-semibold text-red-800 dark:text-red-300'>
								{t('categories.obesity.title')}
							</div>
							<div className='text-sm text-red-700 dark:text-red-400'>
								BMI ≥ 30
							</div>
							<div className='text-sm text-red-600 dark:text-red-500 mt-1'>
								{t('categories.obesity.description')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Health Implications Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('healthImplications.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('healthImplications.content')}
					</p>
					{Array.isArray(t.raw('healthImplications.items')) &&
						renderList(
							t.raw('healthImplications.items') as string[]
						)}
				</div>
			</div>

			{/* Limitations Section */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('limitations.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('limitations.content')}
					</p>
					{Array.isArray(t.raw('limitations.items')) &&
						renderList(t.raw('limitations.items') as string[])}
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
