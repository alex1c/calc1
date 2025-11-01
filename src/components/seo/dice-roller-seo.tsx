'use client';

import { useTranslations } from 'next-intl';

export default function DiceRollerSEO() {
	const t = useTranslations('calculators.diceRoller.seo');

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
					<p className='text-gray-700 leading-relaxed mb-4'>
						{t('overview.content')}
					</p>
					{t('overview.additionalContent') && (
						<p className='text-gray-700 leading-relaxed'>
							{t('overview.additionalContent')}
						</p>
					)}
				</section>

				{/* Calculation Examples */}
				{t.raw('overview.calculationExamples') &&
					Array.isArray(t.raw('overview.calculationExamples')) &&
					t.raw('overview.calculationExamples').length > 0 && (
						<section className='bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl shadow-lg p-8'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								Примеры расчёта
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{(
									t.raw(
										'overview.calculationExamples'
									) as Array<{
										title: string;
										description: string;
										input: string;
										calculation: string;
										result: string;
										type: string;
									}>
								).map((example, index) => (
									<div
										key={index}
										className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-orange-200 dark:border-orange-800'
									>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{example.title}
										</h3>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
											{example.description}
										</p>
										<div className='bg-blue-50 dark:bg-blue-900/30 rounded p-3 mb-3'>
											<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-900 dark:text-blue-200 font-mono break-all whitespace-pre-wrap'>
												{example.input}
											</code>
										</div>
										<div className='bg-green-50 dark:bg-green-900/30 rounded p-3 mb-3'>
											<p className='text-xs font-semibold text-green-800 dark:text-green-300 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-900 dark:text-green-200 font-mono break-all whitespace-pre-wrap'>
												{example.calculation}
											</code>
										</div>
										<div className='bg-yellow-50 dark:bg-yellow-900/30 rounded p-3'>
											<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
												Результат:
											</p>
											<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
												{example.result}
											</p>
											<p className='text-xs text-yellow-700 dark:text-yellow-400 mt-1'>
												Тип: {example.type}
											</p>
										</div>
									</div>
								))}
							</div>
						</section>
					)}

				{/* How it works */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('generation.title')}
					</h2>
					<p className='text-gray-700 leading-relaxed mb-4'>
						{t('generation.content')}
					</p>
					<div className='bg-orange-50 border border-orange-200 rounded-lg p-6'>
						<h3 className='text-lg font-semibold text-orange-900 mb-3'>
							{t('generation.algorithm')}
						</h3>
						<ul className='space-y-2 text-orange-800'>
							<li>• {t('generation.step1')}</li>
							<li>• {t('generation.step2')}</li>
							<li>• {t('generation.step3')}</li>
							<li>• {t('generation.step4')}</li>
						</ul>
					</div>
				</section>

				{/* Dice types */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('diceTypes.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[0, 1, 2, 3, 4, 5, 6].map((index) => (
							<div
								key={index}
								className='bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-100'
							>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{t(`diceTypes.items.${index}.title`)}
								</h3>
								<p className='text-gray-700 text-sm mb-2'>
									{t(`diceTypes.items.${index}.description`)}
								</p>
								<div className='text-xs text-gray-600'>
									{t(`diceTypes.items.${index}.range`)}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Features */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('features.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{[0, 1, 2, 3].map((index) => (
							<div
								key={index}
								className='flex items-start gap-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-100'
							>
								<span className='text-2xl'>🎲</span>
								<p className='text-gray-700'>
									{t(`features.items.${index}`)}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Use cases */}
				<section className='prose prose-lg max-w-none'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('useCases.title')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[0, 1, 2, 3, 4, 5].map((index) => (
							<div
								key={index}
								className='bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-100'
							>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{t(`useCases.items.${index}.title`)}
								</h3>
								<p className='text-gray-700 text-sm'>
									{t(`useCases.items.${index}.description`)}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Tips */}
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
								<span className='text-orange-600 mt-1'>💡</span>
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
						{t.raw('faqItems') &&
							Array.isArray(t.raw('faqItems')) &&
							(t.raw('faqItems') as Array<{ q: string; a: string }>)
								.slice(0, 30)
								.map((item, index) => (
									<div
										key={index}
										className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow'
									>
										<h3 className='text-xl font-semibold text-gray-900 mb-3'>
											{item.q}
										</h3>
										<p className='text-gray-700'>{item.a}</p>
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
								className='bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-100'
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
