'use client';

import { useTranslations } from 'next-intl';

/**
 * BMI Health SEO Component
 * Provides comprehensive SEO content for BMI calculator page
 */
export default function BMIHealthSEO() {
	const t = useTranslations('calculators.bmiHealth.seo');

	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('overview.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('overview.content')}
					</p>
				</div>
			</section>

			{/* How to Calculate Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('calculation.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
						{t('calculation.content')}
					</p>
					<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4'>
						<code className='text-lg font-mono text-blue-600 dark:text-blue-400'>
							BMI = вес (кг) / (рост (м))²
						</code>
					</div>
					<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
						<li>{t('calculation.step1')}</li>
						<li>{t('calculation.step2')}</li>
						<li>{t('calculation.step3')}</li>
						<li>{t('calculation.step4')}</li>
					</ul>
				</div>
			</section>

			{/* WHO Categories Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('categories.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
						{t('categories.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-green-900 dark:text-green-300 mb-2'>
								{t('categories.normal.title')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								{t('categories.normal.description')}
							</p>
						</div>
						<div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-yellow-900 dark:text-yellow-300 mb-2'>
								{t('categories.overweight.title')}
							</h3>
							<p className='text-yellow-800 dark:text-yellow-200 text-sm'>
								{t('categories.overweight.description')}
							</p>
						</div>
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-orange-900 dark:text-orange-300 mb-2'>
								{t('categories.obesity.title')}
							</h3>
							<p className='text-orange-800 dark:text-orange-200 text-sm'>
								{t('categories.obesity.description')}
							</p>
						</div>
						<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
								{t('categories.underweight.title')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								{t('categories.underweight.description')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
						{t('advantages.content')}
					</p>
					<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
						<li>{t('advantages.quick')}</li>
						<li>{t('advantages.accurate')}</li>
						<li>{t('advantages.free')}</li>
						<li>{t('advantages.multilingual')}</li>
						<li>{t('advantages.mobile')}</li>
					</ul>
				</div>
			</section>

			{/* Tips Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('tips.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
						{t('tips.content')}
					</p>
					<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
						<li>{t('tips.measurement')}</li>
						<li>{t('tips.consistency')}</li>
						<li>{t('tips.consultation')}</li>
						<li>{t('tips.lifestyle')}</li>
					</ul>
				</div>
			</section>

			{/* Limitations Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('limitations.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
						{t('limitations.content')}
					</p>
					<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
						<li>{t('limitations.muscle')}</li>
						<li>{t('limitations.age')}</li>
						<li>{t('limitations.gender')}</li>
						<li>{t('limitations.ethnicity')}</li>
					</ul>
				</div>
			</section>
		</div>
	);
}
