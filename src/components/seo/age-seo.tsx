'use client';

import { useTranslations } from 'next-intl';

export default function AgeSEO() {
	const t = useTranslations('calculators.agecalc');

	const faqData = [
		{
			q: t('seo.faq.question1'),
			a: t('seo.faq.answer1'),
		},
		{
			q: t('seo.faq.question2'),
			a: t('seo.faq.answer2'),
		},
		{
			q: t('seo.faq.question3'),
			a: t('seo.faq.answer3'),
		},
		{
			q: t('seo.faq.question4'),
			a: t('seo.faq.answer4'),
		},
		{
			q: t('seo.faq.question5'),
			a: t('seo.faq.answer5'),
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
					<p>
						<strong>{t('seo.calculation.formula')}</strong>
					</p>
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
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.advantages.precise')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.preciseDesc')}
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
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.advantages.detailed')}
						</h3>
						<p className='text-green-800'>
							{t('seo.advantages.detailedDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.advantages.mobile')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.mobileDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* Tips */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>{t('seo.tips.content')}</p>
					<ul>
						<li>
							<strong>{t('seo.tips.accurate')}</strong>
						</li>
						<li>
							<strong>{t('seo.tips.leap')}</strong>
						</li>
						<li>
							<strong>{t('seo.tips.timezone')}</strong>
						</li>
					</ul>
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
