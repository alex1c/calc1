'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ConverterSEO() {
	const t = useTranslations('calculators.converter.seo');

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
			{/* Overview */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none'>
					<p>{t('overview.content')}</p>
				</div>
			</motion.section>

			{/* Examples */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('overview.examples.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Length Examples */}
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-4'>
							{t('overview.examples.lengthExamples.title')}
						</h3>
						<ul className='space-y-2 text-blue-800'>
							<li>
								•{' '}
								{t('overview.examples.lengthExamples.example1')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.lengthExamples.example2')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.lengthExamples.example3')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.lengthExamples.example4')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.lengthExamples.example5')}
							</li>
						</ul>
					</div>
					{/* Mass Examples */}
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-4'>
							{t('overview.examples.massExamples.title')}
						</h3>
						<ul className='space-y-2 text-green-800'>
							<li>
								• {t('overview.examples.massExamples.example1')}
							</li>
							<li>
								• {t('overview.examples.massExamples.example2')}
							</li>
							<li>
								• {t('overview.examples.massExamples.example3')}
							</li>
							<li>
								• {t('overview.examples.massExamples.example4')}
							</li>
							<li>
								• {t('overview.examples.massExamples.example5')}
							</li>
						</ul>
					</div>
					{/* Time Examples */}
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-4'>
							{t('overview.examples.timeExamples.title')}
						</h3>
						<ul className='space-y-2 text-purple-800'>
							<li>
								• {t('overview.examples.timeExamples.example1')}
							</li>
							<li>
								• {t('overview.examples.timeExamples.example2')}
							</li>
							<li>
								• {t('overview.examples.timeExamples.example3')}
							</li>
							<li>
								• {t('overview.examples.timeExamples.example4')}
							</li>
							<li>
								• {t('overview.examples.timeExamples.example5')}
							</li>
						</ul>
					</div>
					{/* Volume Examples */}
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-4'>
							{t('overview.examples.volumeExamples.title')}
						</h3>
						<ul className='space-y-2 text-orange-800'>
							<li>
								•{' '}
								{t('overview.examples.volumeExamples.example1')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.volumeExamples.example2')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.volumeExamples.example3')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.volumeExamples.example4')}
							</li>
							<li>
								•{' '}
								{t('overview.examples.volumeExamples.example5')}
							</li>
						</ul>
					</div>
				</div>
			</motion.section>

			{/* Length Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('length.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('length.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('length.units'))
						? (t.raw('length.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</motion.section>

			{/* Mass Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('mass.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('mass.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('mass.units'))
						? (t.raw('mass.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-green-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</motion.section>

			{/* Time Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('time.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('time.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('time.units'))
						? (t.raw('time.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-purple-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</motion.section>

			{/* Volume Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('volume.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('volume.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('volume.units'))
						? (t.raw('volume.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-cyan-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</motion.section>

			{/* Applications Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('applications.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('applications.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('applications.items'))
						? (t.raw('applications.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<svg
											className='w-6 h-6 text-green-500 flex-shrink-0 mt-0.5'
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
										<p className='text-gray-700 dark:text-gray-300'>
											{item}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</motion.section>

			{/* Advantages Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('advantages.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('advantages.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('advantages.items'))
						? (t.raw('advantages.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
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
										<p className='text-gray-700 dark:text-gray-300'>
											{item}
										</p>
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
							transition={{ delay: index * 0.1 }}
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

			{/* Online Converter Info */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('onlineConverter.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
					{t('onlineConverter.content')}
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
