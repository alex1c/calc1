'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function RebarCalculatorSEO() {
	const t = useTranslations('calculators.rebarCalculator');

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
					<p>{t('seo.overview.content')}</p>
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
					{t('seo.calculation.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none'>
					<p>{t('seo.calculation.content')}</p>
					<div className='bg-gray-50 p-6 rounded-lg mt-6'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							{t('seo.calculation.title')}
						</h3>
						<ul className='space-y-2'>
							<li>
								<strong>{t('seo.calculation.length')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.weight')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.count')}</strong>
							</li>
						</ul>
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
					{t('seo.features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.features.quantity')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.features.quantityDesc')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.features.grid')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.features.gridDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.features.weight')}
						</h3>
						<p className='text-green-800'>
							{t('seo.features.weightDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.features.visualization')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.features.visualizationDesc')}
						</p>
					</div>
					<div className='bg-yellow-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 mb-2'>
							{t('seo.features.structures')}
						</h3>
						<p className='text-yellow-800'>
							{t('seo.features.structuresDesc')}
						</p>
					</div>
					<div className='bg-red-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 mb-2'>
							{t('seo.features.export')}
						</h3>
						<p className='text-red-800'>
							{t('seo.features.exportDesc')}
						</p>
					</div>
					<div className='bg-indigo-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-indigo-900 mb-2'>
							{t('seo.features.chart')}
						</h3>
						<p className='text-indigo-800'>
							{t('seo.features.chartDesc')}
						</p>
					</div>
					<div className='bg-pink-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-pink-900 mb-2'>
							{t('seo.features.units')}
						</h3>
						<p className='text-pink-800'>
							{t('seo.features.unitsDesc')}
						</p>
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
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6 max-w-none'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-green-800'>
							{t('seo.advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.advantages.export')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.exportDesc')}
						</p>
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
						<div
							key={index}
							className='bg-gray-50 border border-gray-200 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-600'>{faq.a}</p>
						</div>
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
