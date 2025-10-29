'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Square, Package, Ruler, Layers } from 'lucide-react';

export default function TileGlueSEO() {
	const t = useTranslations('calculators.tileGlue');

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
											<Square className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
								<strong>{t('seo.calculation.area')}</strong>
							</li>
							<li>
								<strong>
									{t('seo.calculation.consumption')}
								</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.total')}</strong>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Visual Chart: Tile Glue Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типы плиточного клея
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Основные типы плиточного клея и их характеристики:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						{[
							{
								type: 'Цементный клей',
								icon: Package,
								consumption: '3-5 кг/м²',
								description:
									'Универсальный, для сухих помещений',
							},
							{
								type: 'Дисперсионный клей',
								icon: Package,
								consumption: '4-6 кг/м²',
								description: 'Для влажных помещений',
							},
							{
								type: 'Эпоксидный клей',
								icon: Package,
								consumption: '5-7 кг/м²',
								description: 'Для сложных условий',
							},
							{
								type: 'Полиуретановый клей',
								icon: Package,
								consumption: '3-4 кг/м²',
								description: 'Эластичный, для больших плиток',
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

			{/* Visual Chart: Standard Tile Sizes */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Стандартные размеры плитки и расход клея
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Расход клея в зависимости от размера плитки:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
						{[
							{
								size: '10×10 см',
								area: '0.01 м²',
								consumption: '3-4 кг/м²',
								description: 'Мозаика',
							},
							{
								size: '20×20 см',
								area: '0.04 м²',
								consumption: '3-4 кг/м²',
								description: 'Мелкая плитка',
							},
							{
								size: '30×30 см',
								area: '0.09 м²',
								consumption: '4-5 кг/м²',
								description: 'Стандартная',
							},
							{
								size: '60×60 см',
								area: '0.36 м²',
								consumption: '5-6 кг/м²',
								description: 'Крупная плитка',
							},
							{
								size: '120×60 см',
								area: '0.72 м²',
								consumption: '6-7 кг/м²',
								description: 'Очень крупная',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-center border-2 border-indigo-200 dark:border-indigo-800'
							>
								<Ruler className='w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.size}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.area}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400 mb-1'>
									{item.consumption}
								</div>
								<div className='text-xs text-gray-500 dark:text-gray-500'>
									{item.description}
								</div>
							</div>
						))}
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
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.accuracy.title')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.advantages.accuracy.description')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.savings.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.advantages.savings.description')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.planning.title')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.advantages.planning.description')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.advantages.convenience.title')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.advantages.convenience.description')}
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
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4'>
							{t('seo.tips.preparation.title')}
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200'>
							<li>• {t('seo.tips.preparation.surface')}</li>
							<li>• {t('seo.tips.preparation.leveling')}</li>
							<li>• {t('seo.tips.preparation.primer')}</li>
						</ul>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4'>
							{t('seo.tips.application.title')}
						</h3>
						<ul className='space-y-2 text-blue-800 dark:text-blue-200'>
							<li>• {t('seo.tips.application.thickness')}</li>
							<li>• {t('seo.tips.application.technique')}</li>
							<li>• {t('seo.tips.application.time')}</li>
						</ul>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-4'>
							{t('seo.tips.selection.title')}
						</h3>
						<ul className='space-y-2 text-green-800 dark:text-green-200'>
							<li>• {t('seo.tips.selection.type')}</li>
							<li>• {t('seo.tips.selection.quality')}</li>
							<li>• {t('seo.tips.selection.brand')}</li>
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
