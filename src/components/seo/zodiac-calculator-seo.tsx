'use client';

import { useTranslations } from 'next-intl';

export default function ZodiacCalculatorSEO() {
	const t = useTranslations('calculators.zodiacCalculator');

	return (
		<div className='space-y-8'>
			{/* SEO Content */}
			<div className='prose max-w-none'>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('seo.overview.title')}
				</h2>
				<p className='text-lg text-gray-600 mb-6'>
					{t('seo.overview.content')}
				</p>

				<h3 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.howItWorks.title')}
				</h3>
				<p className='text-lg text-gray-600 mb-6'>
					{t('seo.howItWorks.content')}
				</p>

				<h3 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.features.title')}
				</h3>
				<ul className='list-disc list-inside space-y-2 text-gray-600 mb-6'>
					<li>{t('seo.features.feature1')}</li>
					<li>{t('seo.features.feature2')}</li>
					<li>{t('seo.features.feature3')}</li>
					<li>{t('seo.features.feature4')}</li>
					<li>{t('seo.features.feature5')}</li>
				</ul>

				<h3 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.tips.title')}
				</h3>
				<p className='text-lg text-gray-600 mb-6'>
					{t('seo.tips.content')}
				</p>
			</div>

			{/* FAQ Section */}
			<div className='bg-gray-50 rounded-xl p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-6'>
					{Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
						<div
							key={num}
							className='border-b border-gray-200 pb-4 last:border-b-0'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{t(`faq.question${num}`)}
							</h3>
							<p className='text-gray-600'>
								{t(`faq.answer${num}`)}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: Array.from(
							{ length: 10 },
							(_, i) => i + 1
						).map((num) => ({
							'@type': 'Question',
							name: t(`faq.question${num}`),
							acceptedAnswer: {
								'@type': 'Answer',
								text: t(`faq.answer${num}`),
							},
						})),
					}),
				}}
			/>
		</div>
	);
}
