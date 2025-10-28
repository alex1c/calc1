'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Circle,
	Square,
	Triangle,
	Calculator,
	Ruler,
	Target,
	BarChart3,
	CheckCircle,
	Lightbulb,
	HelpCircle,
} from 'lucide-react';

export default function AreaSEO() {
	const t = useTranslations('calculators.area');

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
			{/* Overview with Examples */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none mb-8'>
					<p>{t('seo.overview.content')}</p>
				</div>

				{/* Examples Section */}
				<div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8'>
					<h3 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('seo.overview.examples.title')}
					</h3>
					<p className='text-gray-700 mb-6'>
						{t('seo.overview.examples.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Example 1 - Circle */}
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<h4 className='font-semibold text-gray-900 mb-2'>
								{t('seo.overview.examples.example1.title')}
							</h4>
							<p className='text-gray-600 text-sm mb-2'>
								{t(
									'seo.overview.examples.example1.description'
								)}
							</p>
							<div className='bg-indigo-50 p-3 rounded text-sm font-mono text-indigo-800 mb-2'>
								{t(
									'seo.overview.examples.example1.calculation'
								)}
							</div>
							<p className='text-indigo-600 font-medium'>
								{t('seo.overview.examples.example1.result')}
							</p>
						</div>

						{/* Example 2 - Square */}
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<h4 className='font-semibold text-gray-900 mb-2'>
								{t('seo.overview.examples.example2.title')}
							</h4>
							<p className='text-gray-600 text-sm mb-2'>
								{t(
									'seo.overview.examples.example2.description'
								)}
							</p>
							<div className='bg-purple-50 p-3 rounded text-sm font-mono text-purple-800 mb-2'>
								{t(
									'seo.overview.examples.example2.calculation'
								)}
							</div>
							<p className='text-purple-600 font-medium'>
								{t('seo.overview.examples.example2.result')}
							</p>
						</div>

						{/* Example 3 - Triangle */}
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<h4 className='font-semibold text-gray-900 mb-2'>
								{t('seo.overview.examples.example3.title')}
							</h4>
							<p className='text-gray-600 text-sm mb-2'>
								{t(
									'seo.overview.examples.example3.description'
								)}
							</p>
							<div className='bg-green-50 p-3 rounded text-sm font-mono text-green-800 mb-2'>
								{t(
									'seo.overview.examples.example3.calculation'
								)}
							</div>
							<p className='text-green-600 font-medium'>
								{t('seo.overview.examples.example3.result')}
							</p>
						</div>

						{/* Example 4 - Large Circle */}
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<h4 className='font-semibold text-gray-900 mb-2'>
								{t('seo.overview.examples.example4.title')}
							</h4>
							<p className='text-gray-600 text-sm mb-2'>
								{t(
									'seo.overview.examples.example4.description'
								)}
							</p>
							<div className='bg-blue-50 p-3 rounded text-sm font-mono text-blue-800 mb-2'>
								{t(
									'seo.overview.examples.example4.calculation'
								)}
							</div>
							<p className='text-blue-600 font-medium'>
								{t('seo.overview.examples.example4.result')}
							</p>
						</div>

						{/* Example 5 - Large Square */}
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<h4 className='font-semibold text-gray-900 mb-2'>
								{t('seo.overview.examples.example5.title')}
							</h4>
							<p className='text-gray-600 text-sm mb-2'>
								{t(
									'seo.overview.examples.example5.description'
								)}
							</p>
							<div className='bg-orange-50 p-3 rounded text-sm font-mono text-orange-800 mb-2'>
								{t(
									'seo.overview.examples.example5.calculation'
								)}
							</div>
							<p className='text-orange-600 font-medium'>
								{t('seo.overview.examples.example5.result')}
							</p>
						</div>

						{/* Example 6 - Large Triangle */}
						<div className='bg-white rounded-lg p-4 shadow-sm'>
							<h4 className='font-semibold text-gray-900 mb-2'>
								{t('seo.overview.examples.example6.title')}
							</h4>
							<p className='text-gray-600 text-sm mb-2'>
								{t(
									'seo.overview.examples.example6.description'
								)}
							</p>
							<div className='bg-red-50 p-3 rounded text-sm font-mono text-red-800 mb-2'>
								{t(
									'seo.overview.examples.example6.calculation'
								)}
							</div>
							<p className='text-red-600 font-medium'>
								{t('seo.overview.examples.example6.result')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Calculation Section */}
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
				</div>
			</motion.section>

			{/* Features Section */}
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
					<div className='bg-indigo-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-indigo-900 mb-2'>
							{t('seo.features.precision')}
						</h3>
						<p className='text-indigo-800'>
							{t('seo.features.precisionDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.features.instant')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.features.instantDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.features.formulas')}
						</h3>
						<p className='text-green-800'>
							{t('seo.features.formulasDesc')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.features.mobile')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.features.mobileDesc')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* Advantages Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none'>
					<p>{t('seo.advantages.content')}</p>
				</div>
			</motion.section>

			{/* Tips Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none'>
					<p>{t('seo.tips.content')}</p>
				</div>
			</motion.section>

			{/* FAQ Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.faq.title')}
				</h2>
				<div className='space-y-6'>
					{faqData.map((item, index) => (
						<div
							key={index}
							className='border-b border-gray-200 pb-4'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{item.q}
							</h3>
							<p className='text-gray-600'>{item.a}</p>
						</div>
					))}
				</div>
			</motion.section>
		</div>
	);
}
