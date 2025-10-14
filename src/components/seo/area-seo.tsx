'use client';

import { useTranslations } from 'next-intl';

/**
 * FAQ Structured Data for Area Calculator
 * Provides JSON-LD structured data for search engines
 */
const generateFAQStructuredData = (t: any) => {
	const faqData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'How to calculate circle area?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'How to calculate square area?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'How to calculate triangle area?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'What are the area formulas?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'How to use area calculator?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('tips.content'),
				},
			},
		],
	};

	return JSON.stringify(faqData);
};

/**
 * Calculator Structured Data
 * Provides JSON-LD structured data for the calculator tool
 */
const generateCalculatorStructuredData = (t: any) => {
	const calculatorData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		description: t('overview.content'),
		url: 'https://calc1.ru/math/area',
		applicationCategory: 'MathApplication',
		operatingSystem: 'Any',
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
 * Area Calculator SEO Component
 * Displays comprehensive SEO content with structured data
 */
export default function AreaSEO() {
	const t = useTranslations('calculators.area.seo');

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

			{/* SEO Content */}
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

				{/* Calculation Methods Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('calculation.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('calculation.content')}</p>

						{/* Formula Cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
							{/* Circle Formula */}
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-blue-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<circle
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='2'
												fill='none'
											/>
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('form.figureTypes.circle')}
									</h3>
									<div className='text-2xl font-mono text-blue-600 mb-2'>
										S = π × r²
									</div>
									<p className='text-sm text-gray-600'>
										{t('calculation.circleDescription')}
									</p>
								</div>
							</div>

							{/* Square Formula */}
							<div className='bg-green-50 border border-green-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-green-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<rect
												x='3'
												y='3'
												width='18'
												height='18'
												stroke='currentColor'
												strokeWidth='2'
												fill='none'
											/>
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('form.figureTypes.square')}
									</h3>
									<div className='text-2xl font-mono text-green-600 mb-2'>
										S = a²
									</div>
									<p className='text-sm text-gray-600'>
										{t('calculation.squareDescription')}
									</p>
								</div>
							</div>

							{/* Triangle Formula */}
							<div className='bg-purple-50 border border-purple-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-purple-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												d='M12 2L22 20H2L12 2Z'
												stroke='currentColor'
												strokeWidth='2'
												fill='none'
											/>
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('form.figureTypes.triangle')}
									</h3>
									<div className='text-2xl font-mono text-purple-600 mb-2'>
										S = ½ × a × h
									</div>
									<p className='text-sm text-gray-600'>
										{t('calculation.triangleDescription')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Examples Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('examples.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* Circle Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('examples.circleExample')}
								</h3>
								<p className='mb-3'>
									<strong>{t('examples.given')}:</strong>{' '}
									Radius = 5 units
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									S = π × r²
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									S = π × 5² = π × 25 = 78.54 square units
								</p>
								<p className='text-sm text-gray-600'>
									{t('examples.circleDescription')}
								</p>
							</div>

							{/* Square Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('examples.squareExample')}
								</h3>
								<p className='mb-3'>
									<strong>{t('examples.given')}:</strong> Side
									length = 7 units
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									S = a²
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									S = 7² = 49 square units
								</p>
								<p className='text-sm text-gray-600'>
									{t('examples.squareDescription')}
								</p>
							</div>

							{/* Triangle Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('examples.triangleExample')}
								</h3>
								<p className='mb-3'>
									<strong>{t('examples.given')}:</strong> Base
									= 8 units, Height = 6 units
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									S = ½ × a × h
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									S = ½ × 8 × 6 = ½ × 48 = 24 square units
								</p>
								<p className='text-sm text-gray-600'>
									{t('examples.triangleDescription')}
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
									{t('applications.construction')}
								</h3>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									{t
										.raw('applications.constructionItems')
										.map((item: string, index: number) => (
											<li key={index}>{item}</li>
										))}
								</ul>
							</div>
							<div>
								<h3 className='text-xl font-semibold text-gray-900 mb-3'>
									{t('applications.education')}
								</h3>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									{t
										.raw('applications.educationItems')
										.map((item: string, index: number) => (
											<li key={index}>{item}</li>
										))}
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
