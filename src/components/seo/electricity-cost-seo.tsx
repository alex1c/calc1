'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Calculator, Info } from 'lucide-react';

export default function ElectricityCostSEO() {
	const t = useTranslations('calculators.electricityCost.seo');

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`faq.faqItems.${i}.q`),
		a: t(`faq.faqItems.${i}.a`),
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
						{t('overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{t('overview.content')}
					</p>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
							{t('overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{t('overview.calculationExamples.content')}
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
											<Zap className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{t(
												`overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{t(
												`overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-blue-100 dark:bg-blue-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-blue-900 dark:text-blue-200 font-bold'>
													{t(
														`overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Период:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`overview.calculationExamples.example${exampleNum}.period`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{t(
												`overview.calculationExamples.example${exampleNum}.note`
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
						{t('calculation.title')}
					</h2>
				</div>
				<div>
					<div className='bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600 mb-4'>
						<pre className='text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono text-sm'>
							{t('calculation.content')}
						</pre>
					</div>
					<p className='text-gray-700 dark:text-gray-300'>
						Расчёт основан на стандартной формуле: потребление в
						кВт⋅ч получается делением произведения мощности в ваттах
						и времени работы в часах на 1000. Стоимость
						рассчитывается умножением потребления на тариф за 1
						кВт⋅ч. Калькулятор автоматически выполняет все расчёты
						для каждого прибора и суммирует итоговые значения.
					</p>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Преимущества калькулятора
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Калькулятор стоимости электроэнергии предоставляет
						множество преимуществ для точного расчёта потребления и
						затрат:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								Мгновенный расчёт
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								Автоматический расчёт потребления и стоимости
								для всех приборов одновременно
							</p>
						</div>
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
								Несколько приборов
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								Поддержка неограниченного количества устройств с
								автоматическим суммированием
							</p>
						</div>
						<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
								Экспорт CSV
							</h3>
							<p className='text-purple-800 dark:text-purple-200 text-sm'>
								Сохранение результатов в CSV для дальнейшего
								анализа и документирования
							</p>
						</div>
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
								Точность расчётов
							</h3>
							<p className='text-orange-800 dark:text-orange-200 text-sm'>
								Использование стандартных формул и актуальных
								тарифов для максимальной точности
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('tips.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Полезные советы для точного расчёта стоимости
						электроэнергии:
					</p>
					<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
						<li>{t('tips.tip1')}</li>
						<li>{t('tips.tip2')}</li>
						<li>{t('tips.tip3')}</li>
					</ul>
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('faq.title')}
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

			{/* Visual Chart: Typical Power Consumption */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типичное потребление бытовых приборов
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Примерные значения потребления электроэнергии для
						различных бытовых приборов при типичном использовании:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								device: 'Холодильник',
								power: '150 Вт',
								consumption: '108 кВт⋅ч/мес',
							},
							{
								device: 'Стиральная машина',
								power: '2000 Вт',
								consumption: '90 кВт⋅ч/мес',
							},
							{
								device: 'Телевизор LED',
								power: '100 Вт',
								consumption: '18 кВт⋅ч/мес',
							},
							{
								device: 'Электрочайник',
								power: '2000 Вт',
								consumption: '30 кВт⋅ч/мес',
							},
							{
								device: 'Кондиционер',
								power: '1500 Вт',
								consumption: '360 кВт⋅ч/мес',
							},
							{
								device: 'Компьютер',
								power: '200 Вт',
								consumption: '48 кВт⋅ч/мес',
							},
							{
								device: 'Ноутбук',
								power: '60 Вт',
								consumption: '14 кВт⋅ч/мес',
							},
							{
								device: 'Обогреватель',
								power: '2000 Вт',
								consumption: '480 кВт⋅ч/мес',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.device}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1'>
									{item.power}
								</p>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									{item.consumption}
								</div>
							</div>
						))}
					</div>
					<p className='text-sm text-gray-600 dark:text-gray-400 mt-4'>
						*Потребление указано приблизительно и зависит от режима
						использования
					</p>
				</div>
			</div>
		</motion.div>
	);
}
