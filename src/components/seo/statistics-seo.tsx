'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function StatisticsSEO() {
	const t = useTranslations('calculators.statistics.seo');

	const faqData = [
		{
			q: t('faq.faqItems.0.q'),
			a: t('faq.faqItems.0.a'),
		},
		{
			q: t('faq.faqItems.1.q'),
			a: t('faq.faqItems.1.a'),
		},
		{
			q: t('faq.faqItems.2.q'),
			a: t('faq.faqItems.2.a'),
		},
		{
			q: t('faq.faqItems.3.q'),
			a: t('faq.faqItems.3.a'),
		},
		{
			q: t('faq.faqItems.4.q'),
			a: t('faq.faqItems.4.a'),
		},
		{
			q: t('faq.faqItems.5.q'),
			a: t('faq.faqItems.5.a'),
		},
		{
			q: t('faq.faqItems.6.q'),
			a: t('faq.faqItems.6.a'),
		},
		{
			q: t('faq.faqItems.7.q'),
			a: t('faq.faqItems.7.a'),
		},
		{
			q: t('faq.faqItems.8.q'),
			a: t('faq.faqItems.8.a'),
		},
		{
			q: t('faq.faqItems.9.q'),
			a: t('faq.faqItems.9.a'),
		},
		{
			q: t('faq.faqItems.10.q'),
			a: t('faq.faqItems.10.a'),
		},
		{
			q: t('faq.faqItems.11.q'),
			a: t('faq.faqItems.11.a'),
		},
		{
			q: t('faq.faqItems.12.q'),
			a: t('faq.faqItems.12.a'),
		},
		{
			q: t('faq.faqItems.13.q'),
			a: t('faq.faqItems.13.a'),
		},
		{
			q: t('faq.faqItems.14.q'),
			a: t('faq.faqItems.14.a'),
		},
		{
			q: t('faq.faqItems.15.q'),
			a: t('faq.faqItems.15.a'),
		},
		{
			q: t('faq.faqItems.16.q'),
			a: t('faq.faqItems.16.a'),
		},
		{
			q: t('faq.faqItems.17.q'),
			a: t('faq.faqItems.17.a'),
		},
		{
			q: t('faq.faqItems.18.q'),
			a: t('faq.faqItems.18.a'),
		},
		{
			q: t('faq.faqItems.19.q'),
			a: t('faq.faqItems.19.a'),
		},
		{
			q: t('faq.faqItems.20.q'),
			a: t('faq.faqItems.20.a'),
		},
		{
			q: t('faq.faqItems.21.q'),
			a: t('faq.faqItems.21.a'),
		},
		{
			q: t('faq.faqItems.22.q'),
			a: t('faq.faqItems.22.a'),
		},
		{
			q: t('faq.faqItems.23.q'),
			a: t('faq.faqItems.23.a'),
		},
		{
			q: t('faq.faqItems.24.q'),
			a: t('faq.faqItems.24.a'),
		},
		{
			q: t('faq.faqItems.25.q'),
			a: t('faq.faqItems.25.a'),
		},
		{
			q: t('faq.faqItems.26.q'),
			a: t('faq.faqItems.26.a'),
		},
		{
			q: t('faq.faqItems.27.q'),
			a: t('faq.faqItems.27.a'),
		},
		{
			q: t('faq.faqItems.28.q'),
			a: t('faq.faqItems.28.a'),
		},
		{
			q: t('faq.faqItems.29.q'),
			a: t('faq.faqItems.29.a'),
		},
	];

	return (
		<div className='space-y-8'>
			{/* Overview with Calculation Examples */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none mb-8'>
					<p>{t('overview.content')}</p>
				</div>

				{/* Calculation Examples */}
				<div className='bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg'>
					<h3 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('overview.calculationExamples.title')}
					</h3>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{/* Example 1 */}
						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<h4 className='text-lg font-semibold text-blue-900 mb-4'>
								{t(
									'overview.calculationExamples.example1.title'
								)}
							</h4>
							<div className='space-y-2 text-sm'>
								<p className='font-mono bg-gray-100 p-2 rounded'>
									{t(
										'overview.calculationExamples.example1.data'
									)}
								</p>
								<p>
									<strong>Среднее:</strong>{' '}
									{t(
										'overview.calculationExamples.example1.mean'
									)}
								</p>
								<p>
									<strong>Медиана:</strong>{' '}
									{t(
										'overview.calculationExamples.example1.median'
									)}
								</p>
								<p>
									<strong>Мода:</strong>{' '}
									{t(
										'overview.calculationExamples.example1.mode'
									)}
								</p>
								<p>
									<strong>Дисперсия:</strong>{' '}
									{t(
										'overview.calculationExamples.example1.variance'
									)}
								</p>
								<p>
									<strong>Ст. отклонение:</strong>{' '}
									{t(
										'overview.calculationExamples.example1.stdDev'
									)}
								</p>
							</div>
						</div>

						{/* Example 2 */}
						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<h4 className='text-lg font-semibold text-green-900 mb-4'>
								{t(
									'overview.calculationExamples.example2.title'
								)}
							</h4>
							<div className='space-y-2 text-sm'>
								<p className='font-mono bg-gray-100 p-2 rounded'>
									{t(
										'overview.calculationExamples.example2.data'
									)}
								</p>
								<p>
									<strong>Среднее:</strong>{' '}
									{t(
										'overview.calculationExamples.example2.mean'
									)}
								</p>
								<p>
									<strong>Медиана:</strong>{' '}
									{t(
										'overview.calculationExamples.example2.median'
									)}
								</p>
								<p>
									<strong>Мода:</strong>{' '}
									{t(
										'overview.calculationExamples.example2.mode'
									)}
								</p>
								<p>
									<strong>Дисперсия:</strong>{' '}
									{t(
										'overview.calculationExamples.example2.variance'
									)}
								</p>
								<p>
									<strong>Ст. отклонение:</strong>{' '}
									{t(
										'overview.calculationExamples.example2.stdDev'
									)}
								</p>
							</div>
						</div>

						{/* Example 3 */}
						<div className='bg-white p-6 rounded-lg shadow-sm'>
							<h4 className='text-lg font-semibold text-purple-900 mb-4'>
								{t(
									'overview.calculationExamples.example3.title'
								)}
							</h4>
							<div className='space-y-2 text-sm'>
								<p className='font-mono bg-gray-100 p-2 rounded'>
									{t(
										'overview.calculationExamples.example3.data'
									)}
								</p>
								<p>
									<strong>Среднее:</strong>{' '}
									{t(
										'overview.calculationExamples.example3.mean'
									)}
								</p>
								<p>
									<strong>Медиана:</strong>{' '}
									{t(
										'overview.calculationExamples.example3.median'
									)}
								</p>
								<p>
									<strong>Мода:</strong>{' '}
									{t(
										'overview.calculationExamples.example3.mode'
									)}
								</p>
								<p>
									<strong>Дисперсия:</strong>{' '}
									{t(
										'overview.calculationExamples.example3.variance'
									)}
								</p>
								<p>
									<strong>Ст. отклонение:</strong>{' '}
									{t(
										'overview.calculationExamples.example3.stdDev'
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Statistical Measures */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					Основные статистические показатели
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Mean */}
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('mean.title')}
						</h3>
						<p className='text-blue-800 mb-3'>
							{t('mean.content')}
						</p>
						<p className='font-mono bg-blue-100 p-2 rounded text-sm text-blue-900'>
							{t('mean.formula')}
						</p>
					</div>

					{/* Median */}
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('median.title')}
						</h3>
						<p className='text-green-800 mb-3'>
							{t('median.content')}
						</p>
						<p className='font-mono bg-green-100 p-2 rounded text-sm text-green-900'>
							{t('median.formula')}
						</p>
					</div>

					{/* Mode */}
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('mode.title')}
						</h3>
						<p className='text-purple-800 mb-3'>
							{t('mode.content')}
						</p>
						<p className='font-mono bg-purple-100 p-2 rounded text-sm text-purple-900'>
							{t('mode.formula')}
						</p>
					</div>

					{/* Variance */}
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('variance.title')}
						</h3>
						<p className='text-orange-800 mb-3'>
							{t('variance.content')}
						</p>
						<p className='font-mono bg-orange-100 p-2 rounded text-sm text-orange-900'>
							{t('variance.formula')}
						</p>
					</div>

					{/* Standard Deviation */}
					<div className='bg-red-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 mb-2'>
							{t('standardDeviation.title')}
						</h3>
						<p className='text-red-800 mb-3'>
							{t('standardDeviation.content')}
						</p>
						<p className='font-mono bg-red-100 p-2 rounded text-sm text-red-900'>
							{t('standardDeviation.formula')}
						</p>
					</div>

					{/* Applications */}
					<div className='bg-yellow-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 mb-2'>
							{t('applications.title')}
						</h3>
						<p className='text-yellow-800 mb-3'>
							{t('applications.content')}
						</p>
						<ul className='text-yellow-800 text-sm space-y-1'>
							{Array.isArray(t.raw('applications.items'))
								? (t.raw('applications.items') as string[]).map(
										(item: string, index: number) => (
											<li key={index}>• {item}</li>
										)
								  )
								: null}
						</ul>
					</div>
				</div>
			</motion.section>

			{/* Advantages */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6 max-w-none'>
					<p>{t('advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{Array.isArray(t.raw('advantages.items'))
						? (t.raw('advantages.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'
									>
										<svg
											className='w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
										<p className='text-gray-700'>{item}</p>
									</div>
								)
						  )
						: null}
				</div>
			</motion.section>

			{/* FAQ */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-4'>
					{faqData.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05 }}
							className='bg-gray-50 border border-gray-200 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-600'>{faq.a}</p>
						</motion.div>
					))}
				</div>
			</motion.section>

			{/* Online Calculator Info */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('onlineCalculator.title')}
				</h2>
				<p className='text-gray-700 leading-relaxed text-lg'>
					{t('onlineCalculator.content')}
				</p>
			</motion.section>

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
