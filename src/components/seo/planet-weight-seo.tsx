'use client';

import { useTranslations } from 'next-intl';

export default function PlanetWeightSeo() {
	const t = useTranslations('calculators.planetWeight.seo');

	// Структурированные данные для FAQ
	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: t('faqItems.0.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.0.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.1.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.1.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.2.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.2.a'),
				},
			},
		],
	};

	return (
		<>
			{/* Структурированные данные FAQ */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>

			<div className='space-y-12'>
				{/* Обзор */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('overview.title')}
					</h2>
					<p className='text-gray-700 leading-relaxed'>
						{t('overview.content')}
					</p>
				</section>

				{/* Как рассчитывается */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('calculation.title')}
					</h2>
					<p className='text-gray-700 leading-relaxed mb-4'>
						{t('calculation.content')}
					</p>
					<div className='bg-indigo-50 border border-indigo-200 rounded-lg p-6'>
						<p className='text-lg font-mono text-indigo-900'>
							{t('calculation.formula')}
						</p>
					</div>
					<p className='text-gray-700 mt-4'>
						{t('calculation.example')}
					</p>
				</section>

				{/* Преимущества */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('advantages.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{[0, 1, 2, 3].map((index) => (
							<div
								key={index}
								className='flex items-start gap-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100'
							>
								<span className='text-2xl'>✨</span>
								<p className='text-gray-700'>
									{t(`advantages.items.${index}`)}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Советы */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('tips.title')}
					</h2>
					<ul className='space-y-3'>
						{[0, 1, 2].map((index) => (
							<li
								key={index}
								className='flex items-start gap-3'
							>
								<span className='text-indigo-600 mt-1'>💡</span>
								<span className='text-gray-700'>
									{t(`tips.items.${index}`)}
								</span>
							</li>
						))}
					</ul>
				</section>

				{/* FAQ */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('faq.title')}
					</h2>
					<div className='space-y-6'>
						{[0, 1, 2].map((index) => (
							<div
								key={index}
								className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow'
							>
								<h3 className='text-xl font-semibold text-gray-900 mb-3'>
									{t(`faqItems.${index}.q`)}
								</h3>
								<p className='text-gray-700'>
									{t(`faqItems.${index}.a`)}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Интересные факты */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('facts.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[0, 1, 2].map((index) => (
							<div
								key={index}
								className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100'
							>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{t(`facts.items.${index}.title`)}
								</h3>
								<p className='text-gray-700 text-sm'>
									{t(`facts.items.${index}.content`)}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</>
	);
}
