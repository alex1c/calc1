'use client';

import { useTranslations } from 'next-intl';

export default function PasswordGeneratorSEO() {
	const t = useTranslations('calculators.passwordGenerator.seo');

	// Structured data for FAQ
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
			{
				'@type': 'Question',
				name: t('faqItems.3.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.3.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.4.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.4.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.5.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.5.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.6.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.6.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.7.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.7.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.8.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.8.a'),
				},
			},
			{
				'@type': 'Question',
				name: t('faqItems.9.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faqItems.9.a'),
				},
			},
		],
	};

	return (
		<>
			{/* Structured data for FAQ */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>

			<div className='space-y-12'>
				{/* Overview */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('overview.title')}
					</h2>
					<p className='text-gray-700 leading-relaxed'>
						{t('overview.content')}
					</p>
				</section>

				{/* How it works */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('generation.title')}
					</h2>
					<p className='text-gray-700 leading-relaxed mb-4'>
						{t('generation.content')}
					</p>
					<div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
						<h3 className='text-lg font-semibold text-blue-900 mb-3'>
							{t('generation.algorithm')}
						</h3>
						<ul className='space-y-2 text-blue-800'>
							<li>• {t('generation.step1')}</li>
							<li>• {t('generation.step2')}</li>
							<li>• {t('generation.step3')}</li>
							<li>• {t('generation.step4')}</li>
						</ul>
					</div>
				</section>

				{/* Security features */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('security.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{[0, 1, 2, 3].map((index) => (
							<div
								key={index}
								className='flex items-start gap-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100'
							>
								<span className='text-2xl'>🔒</span>
								<p className='text-gray-700'>
									{t(`security.items.${index}`)}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Password strength */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('strength.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
						{[0, 1, 2, 3].map((index) => (
							<div
								key={index}
								className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 text-center'
							>
								<div
									className={`text-2xl font-bold mb-2 ${
										index === 0
											? 'text-red-600'
											: index === 1
											? 'text-orange-600'
											: index === 2
											? 'text-yellow-600'
											: 'text-green-600'
									}`}
								>
									{t(`strength.levels.${index}.title`)}
								</div>
								<p className='text-gray-700 text-sm'>
									{t(`strength.levels.${index}.description`)}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Best practices */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('bestPractices.title')}
					</h2>
					<ul className='space-y-3'>
						{[0, 1, 2, 3, 4].map((index) => (
							<li
								key={index}
								className='flex items-start gap-3'
							>
								<span className='text-blue-600 mt-1'>✓</span>
								<span className='text-gray-700'>
									{t(`bestPractices.items.${index}`)}
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
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
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

				{/* Fun facts */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('facts.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[0, 1, 2].map((index) => (
							<div
								key={index}
								className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100'
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
