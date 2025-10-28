'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	AlertTriangle,
	Calculator,
	DollarSign,
	Clock,
	Car,
	Shield,
	FileText,
	CreditCard,
} from 'lucide-react';

export default function TrafficFinesSEO() {
	const t = useTranslations('calculators.traffic-fines');

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
	];

	return (
		<div className='space-y-8'>
			{/* Overview with Examples */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewpoint={{ once: true }}
				className='bg-white rounded-lg shadow-md p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 mb-6'>
					{t('seo.overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none mb-8'>
					<p>{t('seo.overview.content')}</p>
				</div>

				{/* Examples Section */}
				<div className='bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 mb-8'>
					<h3 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('seo.overview.examples.title')}
					</h3>
					<p className='text-gray-700 mb-6'>
						{t('seo.overview.examples.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Example 1 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<Car className='w-6 h-6 text-red-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example1.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example1.description'
								)}
							</p>
							<div className='bg-red-50 p-3 rounded-lg'>
								<p className='text-red-800 font-medium'>
									{t('seo.overview.examples.example1.result')}
								</p>
							</div>
						</div>

						{/* Example 2 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<AlertTriangle className='w-6 h-6 text-orange-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example2.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example2.description'
								)}
							</p>
							<div className='bg-orange-50 p-3 rounded-lg'>
								<p className='text-orange-800 font-medium'>
									{t('seo.overview.examples.example2.result')}
								</p>
							</div>
						</div>

						{/* Example 3 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<Clock className='w-6 h-6 text-yellow-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example3.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example3.description'
								)}
							</p>
							<div className='bg-yellow-50 p-3 rounded-lg'>
								<p className='text-yellow-800 font-medium'>
									{t('seo.overview.examples.example3.result')}
								</p>
							</div>
						</div>

						{/* Example 4 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<Shield className='w-6 h-6 text-purple-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example4.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example4.description'
								)}
							</p>
							<div className='bg-purple-50 p-3 rounded-lg'>
								<p className='text-purple-800 font-medium'>
									{t('seo.overview.examples.example4.result')}
								</p>
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
					{t('seo.calculation.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 max-w-none mb-6'>
					<p>{t('seo.calculation.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-red-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 mb-2'>
							Превышение скорости
						</h3>
						<p className='text-red-800'>
							{t('seo.calculation.speed')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Нарушения безопасности
						</h3>
						<p className='text-orange-800'>
							{t('seo.calculation.safety')}
						</p>
					</div>
					<div className='bg-yellow-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 mb-2'>
							Нарушения ПДД
						</h3>
						<p className='text-yellow-800'>
							{t('seo.calculation.traffic')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							Нарушения парковки
						</h3>
						<p className='text-green-800'>
							{t('seo.calculation.parking')}
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
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							Быстрый расчёт
						</h3>
						<p className='text-green-800'>
							{t('seo.advantages.quick')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							Точность расчётов
						</h3>
						<p className='text-blue-800'>
							{t('seo.advantages.accurate')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							Учёт скидки
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.discount')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Полный список нарушений
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.comprehensive')}
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-4'>
							Досрочная оплата
						</h3>
						<p className='text-green-800'>
							{t('seo.tips.payment')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-4'>
							Соблюдение ПДД
						</h3>
						<p className='text-blue-800'>
							{t('seo.tips.avoidance')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-4'>
							Сохранение документов
						</h3>
						<p className='text-purple-800'>
							{t('seo.tips.documentation')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-4'>
							Юридическая консультация
						</h3>
						<p className='text-orange-800'>
							{t('seo.tips.consultation')}
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
