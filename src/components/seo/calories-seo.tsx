import React from 'react';
import { useTranslations } from 'next-intl';

interface CaloriesSeoProps {
	locale: string;
}

const CaloriesSeo: React.FC<CaloriesSeoProps> = () => {
	const t = useTranslations('calculators.calories.seo');

	return (
		<div className='mt-12 bg-card p-6 rounded-lg shadow-sm'>
			<h2 className='text-2xl font-semibold mb-4'>
				{t('overview.title')}
			</h2>
			<p className='mb-4 text-gray-700 dark:text-gray-300 leading-relaxed'>
				{t('overview.content')}
			</p>

			{/* BMR Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('bmr.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('bmr.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('bmr.features'))
						? (t.raw('bmr.features') as string[]).map(
								(feature: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<svg
											className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										<p className='text-gray-700 dark:text-gray-300'>
											{feature}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Food Calories Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('foodCalories.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('foodCalories.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('foodCalories.features'))
						? (t.raw('foodCalories.features') as string[]).map(
								(feature: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<svg
											className='w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										<p className='text-gray-700 dark:text-gray-300'>
											{feature}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Applications Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('applications.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('applications.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('applications.items'))
						? (t.raw('applications.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<svg
											className='w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										<p className='text-gray-700 dark:text-gray-300'>
											{item}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Advantages Section */}
			<section>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('advantages.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('advantages.items'))
						? (t.raw('advantages.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<svg
											className='w-6 h-6 text-green-500 flex-shrink-0 mt-0.5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										<p className='text-gray-700 dark:text-gray-300'>
											{item}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Online Calculator Info */}
			<section className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 rounded-xl mt-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('onlineCalculator.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
					{t('onlineCalculator.content')}
				</p>
			</section>
		</div>
	);
};

export default CaloriesSeo;
