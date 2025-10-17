'use client';

import { useTranslations } from 'next-intl';

/**
 * Blood Pressure SEO Component
 * Provides comprehensive SEO content for blood pressure calculator page
 */
export default function BloodPressureSEO() {
	const t = useTranslations('calculators.bloodPressure.seo');

	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('overview.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('overview.content')}
					</p>
				</div>
			</section>

			{/* Categories Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('categories.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-6'>
						{t('categories.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-4'>
							<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
								<h3 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
									{t('categories.hypotension.title')}
								</h3>
								<p className='text-blue-800 dark:text-blue-200 text-sm'>
									{t('categories.hypotension.description')}
								</p>
							</div>

							<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
								<h3 className='font-semibold text-green-900 dark:text-green-300 mb-2'>
									{t('categories.normal.title')}
								</h3>
								<p className='text-green-800 dark:text-green-200 text-sm'>
									{t('categories.normal.description')}
								</p>
							</div>

							<div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
								<h3 className='font-semibold text-yellow-900 dark:text-yellow-300 mb-2'>
									{t('categories.prehypertension.title')}
								</h3>
								<p className='text-yellow-800 dark:text-yellow-200 text-sm'>
									{t(
										'categories.prehypertension.description'
									)}
								</p>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg'>
								<h3 className='font-semibold text-orange-900 dark:text-orange-300 mb-2'>
									{t('categories.hypertension1.title')}
								</h3>
								<p className='text-orange-800 dark:text-orange-200 text-sm'>
									{t('categories.hypertension1.description')}
								</p>
							</div>

							<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
								<h3 className='font-semibold text-red-900 dark:text-red-300 mb-2'>
									{t('categories.hypertension2.title')}
								</h3>
								<p className='text-red-800 dark:text-red-200 text-sm'>
									{t('categories.hypertension2.description')}
								</p>
							</div>

							<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
								<h3 className='font-semibold text-red-900 dark:text-red-300 mb-2'>
									{t('categories.hypertension3.title')}
								</h3>
								<p className='text-red-800 dark:text-red-200 text-sm'>
									{t('categories.hypertension3.description')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Measurement Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('measurement.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('measurement.content')}
					</p>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
						<li>{t('measurement.step1')}</li>
						<li>{t('measurement.step2')}</li>
						<li>{t('measurement.step3')}</li>
						<li>{t('measurement.step4')}</li>
					</ul>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('advantages.content')}
					</p>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
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
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('tips.content')}
					</p>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
						<li>{t('tips.measurement')}</li>
						<li>{t('tips.consistency')}</li>
						<li>{t('tips.consultation')}</li>
						<li>{t('tips.lifestyle')}</li>
					</ul>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-6'>
					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.whatIsBP.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.whatIsBP.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.normalRange.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.normalRange.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.hypertension.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.hypertension.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.measurement.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.measurement.answer')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
