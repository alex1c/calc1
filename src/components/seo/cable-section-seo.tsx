'use client';

import { useTranslations } from 'next-intl';

export default function CableSectionSEO() {
	const t = useTranslations('calculators.cableSectionCalculator');

	const faqData = [
		{
			q: t('seo.faq.faqItems.0.q'),
			a: t('seo.faq.faqItems.0.a'),
		},
		{
			q: t('seo.faq.faqItems.1.q'),
			a: t('seo.faq.faqItems.1.a'),
		},
		{
			q: t('seo.faq.faqItems.2.q'),
			a: t('seo.faq.faqItems.2.a'),
		},
		{
			q: t('seo.faq.faqItems.3.q'),
			a: t('seo.faq.faqItems.3.a'),
		},
		{
			q: t('seo.faq.faqItems.4.q'),
			a: t('seo.faq.faqItems.4.a'),
		},
	];

	return (
		<div className='space-y-8'>
			{/* Overview */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>{t('seo.overview.content')}</p>
				</div>
			</section>

			{/* How it works */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.calculation.title')}
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>{t('seo.calculation.content')}</p>
					<ul>
						<li>
							<strong>{t('seo.calculation.power')}</strong>
						</li>
						<li>
							<strong>{t('seo.calculation.section')}</strong>
						</li>
						<li>
							<strong>{t('seo.calculation.voltageDrop')}</strong>
						</li>
					</ul>
				</div>
			</section>

			{/* Features */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.features.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6'>
					<p>{t('seo.features.title')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.features.power')}
						</h3>
						<p className='text-green-800'>
							{t('seo.features.powerDesc')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.features.phase')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.features.phaseDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.features.material')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.features.materialDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.features.voltage')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.features.voltageDesc')}
						</p>
					</div>
					<div className='bg-indigo-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-indigo-900 mb-2'>
							{t('seo.features.standard')}
						</h3>
						<p className='text-indigo-800'>
							{t('seo.features.standardDesc')}
						</p>
					</div>
					<div className='bg-teal-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-teal-900 mb-2'>
							{t('seo.features.protection')}
						</h3>
						<p className='text-teal-800'>
							{t('seo.features.protectionDesc')}
						</p>
					</div>
					<div className='bg-pink-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-pink-900 mb-2'>
							{t('seo.features.chart')}
						</h3>
						<p className='text-pink-800'>
							{t('seo.features.chartDesc')}
						</p>
					</div>
					<div className='bg-yellow-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 mb-2'>
							{t('seo.features.export')}
						</h3>
						<p className='text-yellow-800'>
							{t('seo.features.exportDesc')}
						</p>
					</div>
					<div className='bg-red-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 mb-2'>
							{t('seo.features.units')}
						</h3>
						<p className='text-red-800'>
							{t('seo.features.unitsDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* Advantages */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-green-800'>
							{t('seo.advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.advantages.export')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.exportDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					{t('seo.faq.title')}
				</h2>
				<div className='space-y-4'>
					{faqData.map((faq, index) => (
						<div
							key={index}
							className='bg-white border border-gray-200 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-600'>{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faqData.map((faq) => ({
							'@type': 'Question',
							name: faq.q,
							acceptedAnswer: {
								'@type': 'Answer',
								text: faq.a,
							},
						})),
					}),
				}}
			/>
		</div>
	);
}
