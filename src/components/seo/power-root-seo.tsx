'use client';

import { useTranslations } from 'next-intl';

/**
 * FAQ Structured Data for Power and Root Calculator
 * Provides JSON-LD structured data for search engines
 */
const generateFAQStructuredData = (t: any) => {
	const faqData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'How to calculate power online?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'How to calculate root online?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'What is the difference between power and root?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
		],
	};

	return JSON.stringify(faqData);
};

/**
 * Calculator Structured Data
 * Provides JSON-LD structured data for the calculator application
 */
const generateCalculatorStructuredData = (t: any) => {
	const calculatorData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		description: t('description'),
		url: 'https://calc1.ru/math/power-root',
		applicationCategory: 'CalculatorApplication',
		operatingSystem: 'Web Browser',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		featureList: [
			t('calculation.content'),
			'Multiple language support',
			'Mobile responsive design',
		],
	};

	return JSON.stringify(calculatorData);
};

/**
 * Power and Root Calculator SEO Component
 * Displays comprehensive SEO content with structured data
 */
export default function PowerRootSEO() {
	const t = useTranslations('calculators.powerRoot.seo');

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: generateFAQStructuredData(t),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: generateCalculatorStructuredData(t),
				}}
			/>

			<div className='prose prose-lg max-w-none'>
				{/* Overview Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('overview.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-4'>{t('overview.content')}</p>
						<p className='mb-4'>
							{t('overview.additionalContent')}
						</p>
					</div>
				</section>

				{/* What is Power Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('powerSection.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('powerSection.content')}</p>

						{/* Power Examples */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-blue-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z' />
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('powerSection.example1.title')}
									</h3>
									<div className='text-2xl font-mono text-blue-600 mb-2'>
										2³ = 8
									</div>
									<p className='text-sm text-gray-600'>
										{t('powerSection.example1.description')}
									</p>
								</div>
							</div>

							<div className='bg-green-50 border border-green-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-green-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z' />
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('powerSection.example2.title')}
									</h3>
									<div className='text-2xl font-mono text-green-600 mb-2'>
										5² = 25
									</div>
									<p className='text-sm text-gray-600'>
										{t('powerSection.example2.description')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* What is Root Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('rootSection.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('rootSection.content')}</p>

						{/* Root Examples */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
							<div className='bg-purple-50 border border-purple-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-purple-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M3 13H5V21H3V13M7 3H9V21H7V3M11 8H13V21H11V8M15 3H17V21H15V3M19 8H21V21H19V8Z' />
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('rootSection.example1.title')}
									</h3>
									<div className='text-2xl font-mono text-purple-600 mb-2'>
										√9 = 3
									</div>
									<p className='text-sm text-gray-600'>
										{t('rootSection.example1.description')}
									</p>
								</div>
							</div>

							<div className='bg-orange-50 border border-orange-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-orange-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M3 13H5V21H3V13M7 3H9V21H7V3M11 8H13V21H11V8M15 3H17V21H15V3M19 8H21V21H19V8Z' />
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('rootSection.example2.title')}
									</h3>
									<div className='text-2xl font-mono text-orange-600 mb-2'>
										∛8 = 2
									</div>
									<p className='text-sm text-gray-600'>
										{t('rootSection.example2.description')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* How to Use Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('howToUse.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('howToUse.content')}</p>

						{/* Usage Examples */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* Power Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('howToUse.powerExample.title')}
								</h3>
								<p className='mb-3'>
									<strong>{t('howToUse.given')}:</strong> 2³
								</p>
								<p className='mb-3'>
									<strong>
										{t('howToUse.calculation')}:
									</strong>{' '}
									2 × 2 × 2 = 8
								</p>
								<p className='text-sm text-gray-600'>
									{t('howToUse.powerExample.description')}
								</p>
							</div>

							{/* Root Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('howToUse.rootExample.title')}
								</h3>
								<p className='mb-3'>
									<strong>{t('howToUse.given')}:</strong> ∛8
								</p>
								<p className='mb-3'>
									<strong>
										{t('howToUse.calculation')}:
									</strong>{' '}
									2³ = 8, поэтому ∛8 = 2
								</p>
								<p className='text-sm text-gray-600'>
									{t('howToUse.rootExample.description')}
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Advantages Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('advantages.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('advantages.content')}</p>
						<ul className='list-disc list-inside space-y-2 mb-6'>
							{t
								.raw('advantages.items')
								.map((item: string, index: number) => (
									<li key={index}>{item}</li>
								))}
						</ul>
					</div>
				</section>

				{/* Tips Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('tips.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('tips.content')}</p>
						<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
							<h3 className='text-lg font-semibold text-yellow-800 mb-3'>
								{t('tips.importantNotes')}
							</h3>
							<ul className='list-disc list-inside space-y-2 text-yellow-700'>
								{t
									.raw('tips.notes')
									.map((note: string, index: number) => (
										<li key={index}>{note}</li>
									))}
							</ul>
						</div>
					</div>
				</section>

				{/* Common Applications */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('applications.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<h3 className='text-xl font-semibold text-gray-900 mb-3'>
									{t('applications.mathematics')}
								</h3>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									{t
										.raw('applications.mathematicsItems')
										.map((item: string, index: number) => (
											<li key={index}>{item}</li>
										))}
								</ul>
							</div>
							<div>
								<h3 className='text-xl font-semibold text-gray-900 mb-3'>
									{t('applications.science')}
								</h3>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									{t
										.raw('applications.scienceItems')
										.map((item: string, index: number) => (
											<li key={index}>{item}</li>
										))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Online Calculator */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('onlineCalculator.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-4'>{t('onlineCalculator.content')}</p>
						<p className='mb-4'>
							{t('onlineCalculator.multilingual')}
						</p>
					</div>
				</section>
			</div>
		</>
	);
}
