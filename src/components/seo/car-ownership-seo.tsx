'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Car,
	Fuel,
	Shield,
	Wrench,
	TrendingDown,
	DollarSign,
	Calculator,
	BarChart3,
	Receipt,
} from 'lucide-react';

export default function CarOwnershipSEO() {
	const t = useTranslations('calculators.car-ownership');

	// Get FAQ items dynamically
	const faqRaw = t.raw('seo.faq.faqItems');
	const faqData = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>).map((item) => ({
				q: item.q,
				a: item.a,
			}))
		: [];

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
				<div className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-8'>
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
								<Car className='w-6 h-6 text-purple-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example1.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example1.description'
								)}
							</p>
							<div className='bg-purple-50 p-3 rounded-lg'>
								<p className='text-purple-800 font-medium'>
									{t('seo.overview.examples.example1.result')}
								</p>
							</div>
						</div>

						{/* Example 2 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<BarChart3 className='w-6 h-6 text-indigo-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example2.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example2.description'
								)}
							</p>
							<div className='bg-indigo-50 p-3 rounded-lg'>
								<p className='text-indigo-800 font-medium'>
									{t('seo.overview.examples.example2.result')}
								</p>
							</div>
						</div>

						{/* Example 3 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<TrendingDown className='w-6 h-6 text-blue-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example3.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example3.description'
								)}
							</p>
							<div className='bg-blue-50 p-3 rounded-lg'>
								<p className='text-blue-800 font-medium'>
									{t('seo.overview.examples.example3.result')}
								</p>
							</div>
						</div>

						{/* Example 4 */}
						<div className='bg-white rounded-lg p-6 shadow-sm'>
							<div className='flex items-center mb-4'>
								<Fuel className='w-6 h-6 text-green-600 mr-3' />
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('seo.overview.examples.example4.title')}
								</h4>
							</div>
							<p className='text-gray-600 mb-3'>
								{t(
									'seo.overview.examples.example4.description'
								)}
							</p>
							<div className='bg-green-50 p-3 rounded-lg'>
								<p className='text-green-800 font-medium'>
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
						<div className='flex items-center mb-2'>
							<Fuel className='w-6 h-6 text-blue-600 mr-2' />
							<h3 className='text-lg font-semibold text-blue-900'>
								Топливо
							</h3>
						</div>
						<p className='text-blue-800'>{t('seo.calculation.fuel')}</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<div className='flex items-center mb-2'>
							<Shield className='w-6 h-6 text-green-600 mr-2' />
							<h3 className='text-lg font-semibold text-green-900'>
								Страховки
							</h3>
						</div>
						<p className='text-green-800'>
							{t('seo.calculation.insurance')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<div className='flex items-center mb-2'>
							<Receipt className='w-6 h-6 text-purple-600 mr-2' />
							<h3 className='text-lg font-semibold text-purple-900'>
								Налоги
							</h3>
						</div>
						<p className='text-purple-800'>{t('seo.calculation.tax')}</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<div className='flex items-center mb-2'>
							<Wrench className='w-6 h-6 text-orange-600 mr-2' />
							<h3 className='text-lg font-semibold text-orange-900'>
								ТО и ремонт
							</h3>
						</div>
						<p className='text-orange-800'>
							{t('seo.calculation.maintenance')}
						</p>
					</div>
					<div className='bg-red-50 p-6 rounded-lg'>
						<div className='flex items-center mb-2'>
							<TrendingDown className='w-6 h-6 text-red-600 mr-2' />
							<h3 className='text-lg font-semibold text-red-900'>
								Амортизация
							</h3>
						</div>
						<p className='text-red-800'>
							{t('seo.calculation.depreciation')}
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
				<div className='prose prose-lg text-gray-600 max-w-none mb-6'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-blue-800'>
							Учёт всех видов расходов для точной оценки стоимости
							владения
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-green-800'>
							Точные расчёты на основе ваших данных и актуальных
							ставок
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.advantages.planning')}
						</h3>
						<p className='text-purple-800'>
							Планирование бюджета на автомобиль и контроль
							расходов
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.advantages.comparison')}
						</h3>
						<p className='text-orange-800'>
							Сравнение разных моделей автомобилей для выбора
							оптимального варианта
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
				<div className='prose prose-lg text-gray-600 max-w-none mb-6'>
					<p>{t('seo.tips.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex items-start'>
						<Fuel className='w-6 h-6 text-blue-600 mr-3 mt-1' />
						<div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Экономичные модели
							</h3>
							<p className='text-gray-600'>
								{t('seo.tips.fuel')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<Shield className='w-6 h-6 text-green-600 mr-3 mt-1' />
						<div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Сравнение страховок
							</h3>
							<p className='text-gray-600'>
								{t('seo.tips.insurance')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<Wrench className='w-6 h-6 text-purple-600 mr-3 mt-1' />
						<div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Регулярное ТО
							</h3>
							<p className='text-gray-600'>
								{t('seo.tips.maintenance')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<TrendingDown className='w-6 h-6 text-orange-600 mr-3 mt-1' />
						<div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Низкая амортизация
							</h3>
							<p className='text-gray-600'>
								{t('seo.tips.depreciation')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* FAQ */}
			{faqData.length > 0 && (
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
						{faqData.map((item, index) => (
							<div
								key={index}
								className='border-b border-gray-200 pb-4 last:border-0'
							>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{item.q}
								</h3>
								<p className='text-gray-600'>{item.a}</p>
							</div>
						))}
					</div>
				</motion.section>
			)}
		</div>
	);
}

