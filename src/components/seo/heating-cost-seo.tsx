'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Flame, Calculator, Thermometer, Zap, FileText } from 'lucide-react';

export default function HeatingCostSEO() {
	const t = useTranslations('calculators.heatingCost');

	const renderList = (items: string[]) => (
		<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	);

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`seo.faqItems.${i}.q`),
		a: t(`seo.faqItems.${i}.a`),
	}));

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
											<Flame className='w-5 h-5 text-orange-600 dark:text-orange-400' />
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
											<div className='bg-orange-100 dark:bg-orange-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-orange-800 dark:text-orange-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-orange-900 dark:text-orange-200 font-bold'>
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
					<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							Формула расчёта мощности:
						</h3>
						<p className='text-orange-800 dark:text-orange-200 text-sm mb-2'>
							<strong>
								Мощность (Вт) = Площадь × Мощность на м² ×
								Коэффициент температуры
							</strong>
						</p>
						<p className='text-orange-800 dark:text-orange-200 text-sm'>
							<strong>
								Потребление (кВт⋅ч) = (Мощность × Часы × Дни) /
								(1000 × КПД)
							</strong>
						</p>
					</div>
				</div>
			</div>

			{/* Visual Chart: Heating Types Comparison */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Сравнение типов отопления
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Сравнение стоимости и характеристик различных типов
						отопления:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								type: 'Электрическое',
								efficiency: '100%',
								cost: 'Высокая',
								note: 'Удобно, не требует дымохода',
							},
							{
								type: 'Газовое',
								efficiency: '90%',
								cost: 'Низкая',
								note: 'Самое экономичное',
							},
							{
								type: 'Твердотопливное',
								efficiency: '75%',
								cost: 'Средняя',
								note: 'Требует ручной загрузки',
							},
							{
								type: 'Централизованное',
								efficiency: '85%',
								cost: 'Средняя',
								note: 'Не требует обслуживания',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center border-2 border-orange-200 dark:border-orange-800'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.type}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									КПД: {item.efficiency}
								</p>
								<p className='text-sm text-orange-700 dark:text-orange-300 mb-1'>
									Стоимость: {item.cost}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									{item.note}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Visual Chart: Power Requirements by Building Type */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Мощность отопления по типу здания
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Типичная мощность отопления на м² для различных типов
						зданий:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								type: 'Утеплённый дом',
								power: '60-80 Вт/м²',
								description: 'Современная теплоизоляция',
							},
							{
								type: 'Средняя теплоизоляция',
								power: '90-120 Вт/м²',
								description: 'Стандартное утепление',
							},
							{
								type: 'Без утепления',
								power: '130-180 Вт/м²',
								description: 'Старый дом',
							},
							{
								type: 'Квартира',
								power: '70-100 Вт/м²',
								description: 'Многоэтажный дом',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.type}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.power}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									{item.description}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.advantages.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300'>
						{t('seo.advantages.content')}
					</p>
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.tips.title')}
					</h2>
				</div>
				<div className='space-y-3'>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-orange-600 dark:text-orange-400 text-sm font-bold'>
								1
							</span>
						</div>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('seo.tips.tip1')}
						</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-orange-600 dark:text-orange-400 text-sm font-bold'>
								2
							</span>
						</div>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('seo.tips.tip2')}
						</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-orange-600 dark:text-orange-400 text-sm font-bold'>
								3
							</span>
						</div>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('seo.tips.tip3')}
						</p>
					</div>
				</div>
			</div>

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
							<p className='text-gray-700 dark:text-gray-300'>
								{item.a}
							</p>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
