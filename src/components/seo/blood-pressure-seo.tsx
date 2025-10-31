'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

/**
 * Blood Pressure SEO Component
 * Provides comprehensive SEO content for blood pressure calculator page
 */
export default function BloodPressureSEO() {
	const t = useTranslations('calculators.bloodPressure.seo');

	// Generate FAQ items array
	const faqRaw = t.raw('faq.faqItems');
	const faqItems = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

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
					{t('overview.additionalContent') && (
						<p className='text-gray-600 dark:text-gray-400'>
							{t('overview.additionalContent')}
						</p>
					)}
				</div>

				{/* Calculation Examples */}
				{t('overview.calculationExamples.title') && (
					<div className='mt-8'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							{t('overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 mb-6'>
							{t('overview.calculationExamples.content')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{Array.from({ length: 6 }, (_, i) => {
								const exampleNum = i + 1;
								return (
									<div
										key={i}
										className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<Heart className='w-5 h-5 text-red-600 dark:text-red-400' />
											{t(
												`overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{t(
												`overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{t(
														`overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Рекомендация:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
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
			{faqItems.length > 0 && (
				<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
						{t('faq.title')}
					</h2>
					<div className='space-y-4'>
						{faqItems.map((item, idx) => (
							<div
								key={idx}
								className='border-l-4 border-red-500 pl-4 py-2'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.q}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{item.a}
								</p>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
