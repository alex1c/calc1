'use client';

import { useTranslations } from 'next-intl';

export default function FantasyWorldSEO() {
	const t = useTranslations('calculators.fantasyWorld.seo');

	return (
		<div className='max-w-4xl mx-auto mt-12'>
			<div className='prose prose-lg max-w-none'>
				<h1 className='text-3xl font-bold text-gray-800 mb-6'>
					{t('title')}
				</h1>

				<div className='bg-blue-50 p-6 rounded-lg mb-8'>
					<h2 className='text-xl font-semibold text-blue-800 mb-4'>
						{t('overview.title')}
					</h2>
					<p className='text-blue-700'>{t('overview.content')}</p>
				</div>

				<div className='bg-green-50 p-6 rounded-lg mb-8'>
					<h2 className='text-xl font-semibold text-green-800 mb-4'>
						{t('calculation.title')}
					</h2>
					<p className='text-green-700'>{t('calculation.content')}</p>
				</div>

				<div className='bg-yellow-50 p-6 rounded-lg mb-8'>
					<h2 className='text-xl font-semibold text-yellow-800 mb-4'>
						{t('advantages.title')}
					</h2>
					<ul className='text-yellow-700 space-y-2'>
						{t
							.raw('advantages.items')
							.map((item: string, index: number) => (
								<li
									key={index}
									className='flex items-start'
								>
									<span className='text-yellow-600 mr-2'>
										💡
									</span>
									<span>{item}</span>
								</li>
							))}
					</ul>
				</div>

				<div className='bg-purple-50 p-6 rounded-lg mb-8'>
					<h2 className='text-xl font-semibold text-purple-800 mb-4'>
						{t('tips.title')}
					</h2>
					<ul className='text-purple-700 space-y-2'>
						{t
							.raw('tips.items')
							.map((item: string, index: number) => (
								<li
									key={index}
									className='flex items-start'
								>
									<span className='text-purple-600 mr-2'>
										💡
									</span>
									<span>{item}</span>
								</li>
							))}
					</ul>
				</div>

				<div className='bg-gray-50 p-6 rounded-lg mb-8'>
					<h2 className='text-xl font-semibold text-gray-800 mb-4'>
						{t('facts.title')}
					</h2>
					<div className='space-y-4'>
						{t
							.raw('facts.items')
							.map((fact: any, index: number) => (
								<div
									key={index}
									className='border-l-4 border-gray-400 pl-4'
								>
									<h3 className='font-semibold text-gray-800'>
										{fact.title}
									</h3>
									<p className='text-gray-600'>
										{fact.content}
									</p>
								</div>
							))}
					</div>
				</div>

				<div className='bg-white border border-gray-200 rounded-lg p-6'>
					<h2 className='text-2xl font-bold text-gray-800 mb-6'>
						{t('faq.title')}
					</h2>
					<div className='space-y-6'>
						{t.raw('faqItems').map((faq: any, index: number) => (
							<div
								key={index}
								className='border-b border-gray-200 pb-4 last:border-b-0'
							>
								<h3 className='text-lg font-semibold text-gray-800 mb-2'>
									{faq.q}
								</h3>
								<p className='text-gray-600'>{faq.a}</p>
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
							mainEntity: t.raw('faqItems').map((faq: any) => ({
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
		</div>
	);
}
