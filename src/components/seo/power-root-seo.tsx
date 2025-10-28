'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function PowerRootSEO() {
	const t = useTranslations('calculators.powerRoot');

	const faqData = [
		{
			q: t('seo.faq.faqItems.0.q'),
			a: t('seo.faq.faqItems.0.a'),
		},
		{
			q: t('seo.faq.faqItems.1.q'),
			a: t('seo.faq.faqItems.1.a'),
		},
		{
			q: t('seo.faq.faqItems.2.q'),
			a: t('seo.faq.faqItems.2.a'),
		},
		{
			q: t('seo.faq.faqItems.3.q'),
			a: t('seo.faq.faqItems.3.a'),
		},
		{
			q: t('seo.faq.faqItems.4.q'),
			a: t('seo.faq.faqItems.4.a'),
		},
		{
			q: t('seo.faq.faqItems.5.q'),
			a: t('seo.faq.faqItems.5.a'),
		},
		{
			q: t('seo.faq.faqItems.6.q'),
			a: t('seo.faq.faqItems.6.a'),
		},
		{
			q: t('seo.faq.faqItems.7.q'),
			a: t('seo.faq.faqItems.7.a'),
		},
		{
			q: t('seo.faq.faqItems.8.q'),
			a: t('seo.faq.faqItems.8.a'),
		},
		{
			q: t('seo.faq.faqItems.9.q'),
			a: t('seo.faq.faqItems.9.a'),
		},
		{
			q: t('seo.faq.faqItems.10.q'),
			a: t('seo.faq.faqItems.10.a'),
		},
		{
			q: t('seo.faq.faqItems.11.q'),
			a: t('seo.faq.faqItems.11.a'),
		},
		{
			q: t('seo.faq.faqItems.12.q'),
			a: t('seo.faq.faqItems.12.a'),
		},
		{
			q: t('seo.faq.faqItems.13.q'),
			a: t('seo.faq.faqItems.13.a'),
		},
		{
			q: t('seo.faq.faqItems.14.q'),
			a: t('seo.faq.faqItems.14.a'),
		},
		{
			q: t('seo.faq.faqItems.15.q'),
			a: t('seo.faq.faqItems.15.a'),
		},
		{
			q: t('seo.faq.faqItems.16.q'),
			a: t('seo.faq.faqItems.16.a'),
		},
		{
			q: t('seo.faq.faqItems.17.q'),
			a: t('seo.faq.faqItems.17.a'),
		},
		{
			q: t('seo.faq.faqItems.18.q'),
			a: t('seo.faq.faqItems.18.a'),
		},
		{
			q: t('seo.faq.faqItems.19.q'),
			a: t('seo.faq.faqItems.19.a'),
		},
		{
			q: t('seo.faq.faqItems.20.q'),
			a: t('seo.faq.faqItems.20.a'),
		},
		{
			q: t('seo.faq.faqItems.21.q'),
			a: t('seo.faq.faqItems.21.a'),
		},
		{
			q: t('seo.faq.faqItems.22.q'),
			a: t('seo.faq.faqItems.22.a'),
		},
		{
			q: t('seo.faq.faqItems.23.q'),
			a: t('seo.faq.faqItems.23.a'),
		},
		{
			q: t('seo.faq.faqItems.24.q'),
			a: t('seo.faq.faqItems.24.a'),
		},
		{
			q: t('seo.faq.faqItems.25.q'),
			a: t('seo.faq.faqItems.25.a'),
		},
		{
			q: t('seo.faq.faqItems.26.q'),
			a: t('seo.faq.faqItems.26.a'),
		},
		{
			q: t('seo.faq.faqItems.27.q'),
			a: t('seo.faq.faqItems.27.a'),
		},
		{
			q: t('seo.faq.faqItems.28.q'),
			a: t('seo.faq.faqItems.28.a'),
		},
		{
			q: t('seo.faq.faqItems.29.q'),
			a: t('seo.faq.faqItems.29.a'),
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
					{t('seo.overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none'>
					<p className='mb-4'>{t('seo.overview.content')}</p>
					<p className='mb-6'>
						{t('seo.overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='bg-gray-50 p-6 rounded-lg mt-6'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							{t('seo.overview.calculationExamples.title')}
						</h3>
						<p className='mb-4'>
							{t('seo.overview.calculationExamples.content')}
						</p>

						{/* Power Examples */}
						<div className='mb-6'>
							<h4 className='text-lg font-semibold text-gray-900 mb-3'>
								{t(
									'seo.overview.calculationExamples.powerExamples.title'
								)}
							</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{Array.from({ length: 5 }, (_, i) => (
									<div
										key={i}
										className='bg-blue-50 border border-blue-200 rounded-lg p-4'
									>
										<h5 className='font-semibold text-blue-900 mb-2'>
											{t(
												`seo.overview.calculationExamples.powerExamples.example${
													i + 1
												}.title`
											)}
										</h5>
										<div className='text-lg font-mono text-blue-600 mb-2'>
											{t(
												`seo.overview.calculationExamples.powerExamples.example${
													i + 1
												}.calculation`
											)}
										</div>
										<p className='text-sm text-blue-800'>
											{t(
												`seo.overview.calculationExamples.powerExamples.example${
													i + 1
												}.description`
											)}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Root Examples */}
						<div>
							<h4 className='text-lg font-semibold text-gray-900 mb-3'>
								{t(
									'seo.overview.calculationExamples.rootExamples.title'
								)}
							</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{Array.from({ length: 5 }, (_, i) => (
									<div
										key={i}
										className='bg-green-50 border border-green-200 rounded-lg p-4'
									>
										<h5 className='font-semibold text-green-900 mb-2'>
											{t(
												`seo.overview.calculationExamples.rootExamples.example${
													i + 1
												}.title`
											)}
										</h5>
										<div className='text-lg font-mono text-green-600 mb-2'>
											{t(
												`seo.overview.calculationExamples.rootExamples.example${
													i + 1
												}.calculation`
											)}
										</div>
										<p className='text-sm text-green-800'>
											{t(
												`seo.overview.calculationExamples.rootExamples.example${
													i + 1
												}.description`
											)}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* How it works */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.howToUse.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none'>
					<p className='mb-6'>{t('seo.howToUse.content')}</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-blue-50 p-6 rounded-lg'>
							<h3 className='text-xl font-semibold text-blue-900 mb-4'>
								{t('seo.howToUse.powerExample.title')}
							</h3>
							<p className='mb-3'>
								<strong>{t('seo.howToUse.given')}:</strong> 2³
							</p>
							<p className='mb-3'>
								<strong>
									{t('seo.howToUse.calculation')}:
								</strong>{' '}
								2 × 2 × 2 = 8
							</p>
							<p className='text-sm text-blue-800'>
								{t('seo.howToUse.powerExample.description')}
							</p>
						</div>

						<div className='bg-green-50 p-6 rounded-lg'>
							<h3 className='text-xl font-semibold text-green-900 mb-4'>
								{t('seo.howToUse.rootExample.title')}
							</h3>
							<p className='mb-3'>
								<strong>{t('seo.howToUse.given')}:</strong> ∛8
							</p>
							<p className='mb-3'>
								<strong>
									{t('seo.howToUse.calculation')}:
								</strong>{' '}
								2³ = 8, поэтому ∛8 = 2
							</p>
							<p className='text-sm text-green-800'>
								{t('seo.howToUse.rootExample.description')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Features */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6 max-w-none'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-green-800'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.advantages.export')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.exportDesc')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* Tips */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6 max-w-none'>
					<p>{t('seo.tips.content')}</p>
				</div>
				<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
					<h3 className='text-lg font-semibold text-yellow-800 mb-3'>
						{t('seo.tips.importantNotes')}
					</h3>
					<ul className='list-disc list-inside space-y-2 text-yellow-700'>
						{t
							.raw('seo.tips.notes')
							.map((note: string, index: number) => (
								<li key={index}>{note}</li>
							))}
					</ul>
				</div>
			</motion.section>

			{/* Applications */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.applications.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<h3 className='text-xl font-semibold text-gray-900 mb-3'>
							{t('seo.applications.mathematics')}
						</h3>
						<ul className='list-disc list-inside space-y-1 text-gray-600'>
							{t
								.raw('seo.applications.mathematicsItems')
								.map((item: string, index: number) => (
									<li key={index}>{item}</li>
								))}
						</ul>
					</div>
					<div>
						<h3 className='text-xl font-semibold text-gray-900 mb-3'>
							{t('seo.applications.science')}
						</h3>
						<ul className='list-disc list-inside space-y-1 text-gray-600'>
							{t
								.raw('seo.applications.scienceItems')
								.map((item: string, index: number) => (
									<li key={index}>{item}</li>
								))}
						</ul>
					</div>
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
					{t('seo.faq.title')}
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
