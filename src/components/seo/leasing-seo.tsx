'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Car,
	Calculator,
	DollarSign,
	TrendingUp,
	CreditCard,
	FileText,
	Shield,
	Clock,
} from 'lucide-react';

export default function LeasingSEO() {
	const t = useTranslations('calculators.leasing');

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
				<div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8'>
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
								<Car className='w-6 h-6 text-blue-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example1.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example1.description'
								)}
							</p>
							<div className='bg-blue-50 p-3 rounded-lg'>
								<p className='text-blue-800 font-medium'>
									{t('seo.overview.examples.example1.result')}
								</p>
							</div>
						</div>

						{/* Example 2 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<CreditCard className='w-6 h-6 text-green-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example2.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example2.description'
								)}
							</p>
							<div className='bg-green-50 p-3 rounded-lg'>
								<p className='text-green-800 font-medium'>
									{t('seo.overview.examples.example2.result')}
								</p>
							</div>
						</div>

						{/* Example 3 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<DollarSign className='w-6 h-6 text-purple-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example3.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example3.description'
								)}
							</p>
							<div className='bg-purple-50 p-3 rounded-lg'>
								<p className='text-purple-800 font-medium'>
									{t('seo.overview.examples.example3.result')}
								</p>
							</div>
						</div>

						{/* Example 4 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<Clock className='w-6 h-6 text-orange-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example4.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example4.description'
								)}
							</p>
							<div className='bg-orange-50 p-3 rounded-lg'>
								<p className='text-orange-800 font-medium'>
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
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							Сумма финансирования
						</h3>
						<p className='text-blue-800'>
							{t('seo.calculation.financing')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							Ежемесячный платёж
						</h3>
						<p className='text-green-800'>
							{t('seo.calculation.payment')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							Общая сумма
						</h3>
						<p className='text-purple-800'>
							{t('seo.calculation.total')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Переплата
						</h3>
						<p className='text-orange-800'>
							{t('seo.calculation.overpayment')}
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
							Сравнение вариантов
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.comparison')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Планирование бюджета
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.planning')}
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
					<div className='bg-yellow-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 mb-4'>
							Первоначальный взнос
						</h3>
						<p className='text-yellow-800'>
							{t('seo.tips.downPayment')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-4'>
							Ставка удорожания
						</h3>
						<p className='text-blue-800'>
							{t('seo.tips.interestRate')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-4'>
							Срок договора
						</h3>
						<p className='text-green-800'>{t('seo.tips.term')}</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-4'>
							Выкупная стоимость
						</h3>
						<p className='text-purple-800'>
							{t('seo.tips.buyout')}
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
