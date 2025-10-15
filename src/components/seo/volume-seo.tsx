'use client';

import { useTranslations } from 'next-intl';

/**
 * FAQ Structured Data for Volume Calculator
 * Provides JSON-LD structured data for search engines
 */
const generateFAQStructuredData = (t: any) => {
	const faqData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'How to calculate sphere volume?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('calculation.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'How to use volume calculator?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('tips.content'),
				},
			},
			{
				'@type': 'Question',
				name: 'What are volume formulas?',
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
		url: 'https://calc1.ru/math/volume',
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
 * Volume Calculator SEO Component
 * Displays comprehensive SEO content with structured data
 */
export default function VolumeSEO() {
	const t = useTranslations('calculators.volume.seo');

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

				{/* Calculation Methods Section */}
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>
						{t('calculation.title')}
					</h2>
					<div className='text-gray-700 leading-relaxed'>
						<p className='mb-6'>{t('calculation.content')}</p>

						{/* Volume Formulas */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
							{/* Sphere Formula */}
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
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
										{t('form.shapeTypes.sphere')}
									</h3>
									<div className='text-2xl font-mono text-blue-600 mb-2'>
										V = (4/3) × π × r³
									</div>
									<p className='text-sm text-gray-600'>
										{t('calculation.sphereDescription')}
									</p>
								</div>
							</div>

							{/* Cube Formula */}
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
										{t('form.shapeTypes.cube')}
									</h3>
									<div className='text-2xl font-mono text-green-600 mb-2'>
										V = a³
									</div>
									<p className='text-sm text-gray-600'>
										{t('calculation.cubeDescription')}
									</p>
								</div>
							</div>

							{/* Cylinder Formula */}
							<div className='bg-purple-50 border border-purple-200 rounded-lg p-6'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-purple-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<ellipse
												cx='12'
												cy='6'
												rx='8'
												ry='2'
												stroke='currentColor'
												strokeWidth='2'
												fill='none'
											/>
											<ellipse
												cx='12'
												cy='18'
												rx='8'
												ry='2'
												stroke='currentColor'
												strokeWidth='2'
												fill='none'
											/>
											<line
												x1='4'
												y1='6'
												x2='4'
												y2='18'
												stroke='currentColor'
												strokeWidth='2'
											/>
											<line
												x1='20'
												y1='6'
												x2='20'
												y2='18'
												stroke='currentColor'
												strokeWidth='2'
											/>
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t('form.shapeTypes.cylinder')}
									</h3>
									<div className='text-2xl font-mono text-purple-600 mb-2'>
										V = π × r² × h
									</div>
									<p className='text-sm text-gray-600'>
										{t('calculation.cylinderDescription')}
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
							{/* Sphere Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('examples.sphereExample')}
								</h3>
								<p className='mb-3'>
									<strong>{t('examples.given')}:</strong>{' '}
									Radius = 5 units
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									V = (4/3) × π × r³
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									V = (4/3) × π × 5³ = 523.60 cubic units
								</p>
								<p className='text-sm text-gray-600'>
									{t('examples.sphereDescription')}
								</p>
							</div>

							{/* Cube Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('examples.cubeExample')}
								</h3>
								<p className='mb-3'>
									<strong>{t('examples.given')}:</strong> Side
									length = 4 units
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									V = a³
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									V = 4³ = 64 cubic units
								</p>
								<p className='text-sm text-gray-600'>
									{t('examples.cubeDescription')}
								</p>
							</div>

							{/* Cylinder Example */}
							<div className='bg-gray-50 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('examples.cylinderExample')}
								</h3>
								<p className='mb-3'>
									<strong>{t('examples.given')}:</strong>{' '}
									Radius = 3 units, Height = 8 units
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									V = π × r² × h
								</p>
								<p className='mb-3'>
									<strong>
										{t('examples.calculation')}:
									</strong>{' '}
									V = π × 3² × 8 = 226.19 cubic units
								</p>
								<p className='text-sm text-gray-600'>
									{t('examples.cylinderDescription')}
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
