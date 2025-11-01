'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Zap,
	Shield,
	Home,
	Building2,
	Cable,
	Calculator,
} from 'lucide-react';

export default function ElectricalSEO() {
	const t = useTranslations('calculators.electrical');

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
											<Zap className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
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
								<strong>{t('seo.calculation.current')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.cableSection')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.breaker')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.voltageDrop')}</strong>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Visual Chart: Cable Sections */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Стандартные сечения кабеля и допустимые токи
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Допустимые токи для медного кабеля при открытой прокладке:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{ section: '1.5 мм²', current: '19 А', usage: 'Освещение' },
							{ section: '2.5 мм²', current: '27 А', usage: 'Розетки' },
							{ section: '4 мм²', current: '38 А', usage: 'Мощные розетки' },
							{ section: '6 мм²', current: '50 А', usage: 'Электроплита' },
							{ section: '10 мм²', current: '70 А', usage: 'Ввод в дом' },
							{ section: '16 мм²', current: '100 А', usage: 'Вводной кабель' },
							{ section: '25 мм²', current: '140 А', usage: 'Силовые сети' },
							{ section: '35 мм²', current: '175 А', usage: 'Промышленность' },
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center border-2 border-yellow-200 dark:border-yellow-800'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.section}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.current}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									{item.usage}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Visual Chart: Circuit Breaker Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типы автоматических выключателей
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Различные типы автоматов и их применение:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[
							{
								type: 'Тип B',
								icon: Home,
								description: 'Для слабоиндуктивных нагрузок',
								usage: 'Лампы, обогреватели',
								tripping: '3-5 × номинальный ток',
							},
							{
								type: 'Тип C',
								icon: Building2,
								description: 'Для бытовых нагрузок',
								usage: 'Розетки, освещение',
								tripping: '5-10 × номинальный ток',
							},
							{
								type: 'Тип D',
								icon: Zap,
								description: 'Для высоких пусковых токов',
								usage: 'Двигатели, компрессоры',
								tripping: '10-20 × номинальный ток',
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center'
								>
									<Icon className='w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.type}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1'>
										{item.description}
									</p>
									<div className='text-xs text-gray-600 dark:text-gray-400 mb-1'>
										{item.usage}
									</div>
									<div className='text-xs text-orange-700 dark:text-orange-300 font-semibold'>
										Срабатывание: {item.tripping}
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
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							{t('features.cableCalculation')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							Расчёт сечения кабеля по току нагрузки и падению напряжения с выбором стандартного сечения
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('features.breakerCalculation')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							Расчёт номинала автоматического выключателя с запасом 25% и выбором типа (B, C, D)
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('features.voltageDrop')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							Учёт падения напряжения при выборе сечения кабеля, проверка соответствия нормам ПУЭ
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('features.materialSelection')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							Выбор материала проводника (медь или алюминий) с автоматическим учётом плотности тока
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('features.accuracy')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							Высокая точность расчётов на основе нормативов ПУЭ и стандартов электромонтажа
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
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							{t('seo.advantages.accuracy')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							Точный расчёт сечения кабеля и номинала автомата с учётом всех параметров и нормативов
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.safety')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							Обеспечение безопасности электропроводки путём правильного выбора сечения и автомата
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.economy')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							Оптимизация затрат на материалы за счёт точного расчёта без избыточного запаса
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.convenience')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							Удобный и быстрый расчёт без необходимости сложных вычислений и таблиц
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
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							Измерения
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							{t('seo.tips.measurement')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							Материал
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.tips.material')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							Запас
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.tips.reserve')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							Падение напряжения
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.tips.voltageDrop')}
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

