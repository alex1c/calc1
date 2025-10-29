'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Lightbulb, Home, Building2, Wrench } from 'lucide-react';

export default function ElectricityUsageSEO() {
	const t = useTranslations('calculators.electricityUsage');

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
								<strong>
									{t('seo.calculation.single_phase')}
								</strong>
							</li>
							<li>
								<strong>
									{t('seo.calculation.three_phase')}
								</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.tariff')}</strong>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Visual Chart: Consumption by Type */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типовое потребление электроэнергии
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Среднее потребление электроэнергии для различных типов
						помещений и использования:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						{[
							{
								type: 'Квартира',
								icon: Home,
								consumption: '200-400 кВт⋅ч/мес',
								description: 'Бытовая техника и освещение',
							},
							{
								type: 'Частный дом',
								icon: Home,
								consumption: '500-1500 кВт⋅ч/мес',
								description: 'С отоплением и насосами',
							},
							{
								type: 'Офис',
								icon: Building2,
								consumption: '800-2000 кВт⋅ч/мес',
								description: 'Компьютеры и кондиционеры',
							},
							{
								type: 'Стройка',
								icon: Wrench,
								consumption: '500-2000 кВт⋅ч/мес',
								description: 'Строительные инструменты',
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center border-2 border-yellow-200 dark:border-yellow-800'
								>
									<Icon className='w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.type}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										{item.consumption}
									</p>
									<div className='text-xs text-gray-600 dark:text-gray-400'>
										{item.description}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Visual Chart: Typical Appliance Consumption */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типовое потребление бытовых приборов
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Среднее потребление электроэнергии основных бытовых
						приборов:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								appliance: 'Холодильник',
								consumption: '30-150 кВт⋅ч/мес',
								power: '100-200 Вт',
							},
							{
								appliance: 'Кондиционер',
								consumption: '200-500 кВт⋅ч/мес',
								power: '1500-3000 Вт',
							},
							{
								appliance: 'Стиральная машина',
								consumption: '30-60 кВт⋅ч/мес',
								power: '2000-2500 Вт',
							},
							{
								appliance: 'Компьютер',
								consumption: '40-100 кВт⋅ч/мес',
								power: '150-300 Вт',
							},
							{
								appliance: 'LED-лампа',
								consumption: '1-3 кВт⋅ч/мес',
								power: '5-15 Вт',
							},
							{
								appliance: 'Телевизор',
								consumption: '10-30 кВт⋅ч/мес',
								power: '80-200 Вт',
							},
							{
								appliance: 'Обогреватель',
								consumption: '300-800 кВт⋅ч/мес',
								power: '1500-2500 Вт',
							},
							{
								appliance: 'Электрический котёл',
								consumption: '2000-5000 кВт⋅ч/мес',
								power: '8-15 кВт',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.appliance}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.consumption}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									Мощность: {item.power}
								</div>
							</div>
						))}
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
					{t('seo.features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							{t('seo.features.power')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							{t('seo.features.powerDesc')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.features.network')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.features.networkDesc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.features.time')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.features.timeDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.features.tariff')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.features.tariffDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.features.chart')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.features.chartDesc')}
						</p>
					</div>
					<div className='bg-red-50 dark:bg-red-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2'>
							{t('seo.features.export')}
						</h3>
						<p className='text-red-800 dark:text-red-200'>
							{t('seo.features.exportDesc')}
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
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							{t('seo.advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.export')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
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
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{t('tips.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4'>
							{t('tips.equipment.title')}
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200'>
							<li>• {t('tips.equipment.led')}</li>
							<li>• {t('tips.equipment.efficient')}</li>
							<li>• {t('tips.equipment.smart')}</li>
							<li>• {t('tips.equipment.maintenance')}</li>
						</ul>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4'>
							{t('tips.habits.title')}
						</h3>
						<ul className='space-y-2 text-blue-800 dark:text-blue-200'>
							<li>• {t('tips.habits.turn_off')}</li>
							<li>• {t('tips.habits.temperature')}</li>
							<li>• {t('tips.habits.timing')}</li>
							<li>• {t('tips.habits.unplug')}</li>
						</ul>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-4'>
							{t('tips.construction.title')}
						</h3>
						<ul className='space-y-2 text-green-800 dark:text-green-200'>
							<li>• {t('tips.construction.planning')}</li>
							<li>• {t('tips.construction.monitoring')}</li>
							<li>• {t('tips.construction.efficient')}</li>
						</ul>
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
