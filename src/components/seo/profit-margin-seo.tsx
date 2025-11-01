'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	TrendingUp,
	Percent,
	Calculator,
	DollarSign,
	BarChart3,
	Target,
	PieChart,
} from 'lucide-react';

export default function ProfitMarginSEO() {
	const t = useTranslations('calculators.profit-margin');

	const borderColors = [
		'border-blue-500',
		'border-green-500',
		'border-purple-500',
		'border-orange-500',
		'border-red-500',
		'border-indigo-500',
		'border-pink-500',
		'border-teal-500',
		'border-yellow-500',
		'border-cyan-500',
	];

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`seo.faq.faqItems.${i}.q`),
		a: t(`seo.faq.faqItems.${i}.a`),
	}));

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mt-12 space-y-10'
		>
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('seo.overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.overview.content')}
					</p>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('seo.overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
							{t('seo.overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{t('seo.overview.calculationExamples.content')}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{Array.from({ length: 6 }, (_, i) => {
								const exampleNum = i + 1;
								return (
									<div
										key={i}
										className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<TrendingUp className='w-5 h-5 text-green-600 dark:text-green-400' />
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Тип:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.note`
											)}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Calculation Methods */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.calculation.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.calculation.content')}
					</p>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							Формулы расчёта:
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200 text-sm'>
							<li>
								<strong>{t('seo.calculation.grossMargin')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.profitMargin')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.markup')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.revenue')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.profit')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.roi')}</strong>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Visual Chart: Margin Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Виды маржи
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Различные виды маржи для анализа рентабельности бизнеса:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[
							{
								type: 'Валовая маржа',
								icon: PieChart,
								formula: '(Выручка - Себестоимость) / Выручка',
								description: 'Показывает прибыльность без учёта операционных расходов',
							},
							{
								type: 'Операционная маржа',
								icon: BarChart3,
								formula: '(Выручка - Все расходы) / Выручка',
								description: 'Учитывает все операционные расходы',
							},
							{
								type: 'Чистая маржа',
								icon: Target,
								formula: '(Чистая прибыль / Выручка) × 100%',
								description: 'Показывает реальную прибыльность после всех расходов и налогов',
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center border-2 border-green-200 dark:border-green-800'
								>
									<Icon className='w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.type}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										{item.formula}
									</p>
									<div className='text-xs text-green-700 dark:text-green-300 font-semibold'>
										{item.description}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Visual Chart: Typical Margins by Industry */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типичная маржа по отраслям
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Нормальные значения маржи для различных отраслей:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						{[
							{ industry: 'Розничная торговля', margin: '20-40%', icon: DollarSign },
							{ industry: 'Услуги', margin: '50-80%', icon: Calculator },
							{ industry: 'Производство', margin: '10-30%', icon: Target },
							{ industry: 'IT и софт', margin: '70-90%', icon: BarChart3 },
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center'
								>
									<Icon className='w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.industry}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										{item.margin}
									</p>
									<div className='text-xs text-orange-700 dark:text-orange-300'>
										Нормальная маржа
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Features */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Возможности калькулятора
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('features.marginCalculation')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							Расчёт валовой маржи, маржи прибыли и других финансовых показателей для оценки рентабельности бизнеса
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('features.markupCalculation')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							Расчёт наценки от себестоимости для определения оптимальной цены продажи товаров и услуг
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('features.profitAnalysis')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							Анализ прибыли и убытков для принятия обоснованных финансовых решений и оптимизации бизнес-процессов
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('features.roiCalculation')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							Расчёт рентабельности (ROI) для оценки эффективности инвестиций и бизнес-операций
						</p>
					</div>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							{t('features.accuracy')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							Высокая точность расчётов на основе актуальных финансовых формул и методов анализа
						</p>
					</div>
				</div>
			</motion.section>

			{/* Advantages */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.accuracy')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							Точный расчёт маржи и наценки по проверенным финансовым формулам с учётом всех особенностей бизнеса
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.pricing')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							Помогает установить оптимальные цены на основе желаемой маржи, учитывая себестоимость и рыночные условия
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.analysis')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							Комплексный анализ рентабельности бизнеса для выявления проблем и возможностей оптимизации
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.advantages.convenience')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							Удобный и быстрый расчёт без необходимости изучения сложных финансовых формул и методов
						</p>
					</div>
				</div>
			</motion.section>

			{/* Tips */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('seo.tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{t('seo.tips.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							Затраты
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.tips.costs')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							Маржа
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.tips.margin')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							Ценообразование
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.tips.pricing')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							Мониторинг
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.tips.monitoring')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, idx) => (
						<div
							key={idx}
							className={`border-l-4 ${
								borderColors[idx % borderColors.length]
							} pl-4`}
						>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{item.q}
							</h3>
							<p className='text-gray-700 dark:text-gray-300'>{item.a}</p>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}

