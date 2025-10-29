'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Thermometer, Zap, Home, Settings } from 'lucide-react';

export default function FloorHeatingSEO() {
	const t = useTranslations('calculators.floorHeating');
	const tSeo = useTranslations('calculators.floorHeating.seo');

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

	// Get FAQ items
	const faqItemsRaw = tSeo.raw('faq.faqItems');
	const faqItems = Array.isArray(faqItemsRaw)
		? (faqItemsRaw as Array<{ q: string; a: string }>)
		: [];

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
						{tSeo('overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{tSeo('overview.content')}
					</p>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{tSeo('overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
							{tSeo('overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{tSeo('overview.calculationExamples.content')}
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
											<Thermometer className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{tSeo(
													`overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{tSeo(
													`overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Тип:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{tSeo(
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
						{tSeo('calculation.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{tSeo('calculation.content')}
					</p>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							Формулы расчёта:
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200 text-sm'>
							<li>
								<strong>{tSeo('calculation.power')}</strong>
							</li>
							<li>
								<strong>
									{tSeo('calculation.consumption')}
								</strong>
							</li>
							<li>
								<strong>{tSeo('calculation.cost')}</strong>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Visual Chart: Room Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Рекомендуемая мощность по типам помещений
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Мощность тёплого пола зависит от типа помещения и его
						назначения:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
						{[
							{
								room: 'Ванная',
								icon: Home,
								power: '150-180 Вт/м²',
								description: 'Высокая влажность',
							},
							{
								room: 'Кухня',
								icon: Home,
								power: '120-150 Вт/м²',
								description: 'Средние требования',
							},
							{
								room: 'Гостиная',
								icon: Home,
								power: '100-120 Вт/м²',
								description: 'Комфортный обогрев',
							},
							{
								room: 'Спальня',
								icon: Home,
								power: '80-100 Вт/м²',
								description: 'Пониженная мощность',
							},
							{
								room: 'Балкон',
								icon: Home,
								power: '180-200 Вт/м²',
								description: 'Максимальная мощность',
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border-2 border-blue-200 dark:border-blue-800'
								>
									<Icon className='w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.room}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										{item.power}
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

			{/* Visual Chart: Insulation Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Коэффициенты утепления
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Коэффициент утепления влияет на необходимую мощность
						тёплого пола:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[
							{
								insulation: 'Хорошее утепление',
								icon: Settings,
								coefficient: '0.8-0.9',
								description: 'Минимальные теплопотери',
							},
							{
								insulation: 'Среднее утепление',
								icon: Settings,
								coefficient: '1.0',
								description: 'Стандартные условия',
							},
							{
								insulation: 'Слабое утепление',
								icon: Settings,
								coefficient: '1.2-1.5',
								description: 'Повышенные теплопотери',
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg text-center border-2 border-cyan-200 dark:border-cyan-800'
								>
									<Icon className='w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.insulation}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										Коэфф: {item.coefficient}
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

			{/* Advantages */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{tSeo('advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{tSeo('advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{tSeo('advantages.accuracy.title')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{tSeo('advantages.accuracy.description')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{tSeo('advantages.savings.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{tSeo('advantages.savings.description')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{tSeo('advantages.planning.title')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{tSeo('advantages.planning.description')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{tSeo('advantages.convenience.title')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{tSeo('advantages.convenience.description')}
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
					{tSeo('tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{tSeo('tips.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4'>
							{tSeo('tips.installation.title')}
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200'>
							<li>• {tSeo('tips.installation.preparation')}</li>
							<li>• {tSeo('tips.installation.insulation')}</li>
							<li>• {tSeo('tips.installation.materials')}</li>
						</ul>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4'>
							{tSeo('tips.economy.title')}
						</h3>
						<ul className='space-y-2 text-blue-800 dark:text-blue-200'>
							<li>• {tSeo('tips.economy.thermostat')}</li>
							<li>• {tSeo('tips.economy.schedule')}</li>
							<li>• {tSeo('tips.economy.insulation')}</li>
						</ul>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-4'>
							{tSeo('tips.operation.title')}
						</h3>
						<ul className='space-y-2 text-green-800 dark:text-green-200'>
							<li>• {tSeo('tips.operation.temperature')}</li>
							<li>• {tSeo('tips.operation.maintenance')}</li>
							<li>• {tSeo('tips.operation.safety')}</li>
						</ul>
					</div>
				</div>
			</motion.section>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{tSeo('faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, idx) => (
						<div
							key={idx}
							className={`border-l-4 ${
								borderColors[idx % borderColors.length]
							} bg-gray-50 dark:bg-gray-700 p-4 rounded-r-lg`}
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
