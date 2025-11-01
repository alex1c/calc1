'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Zap,
	Coins,
	TrendingUp,
	HardDrive,
	Server,
	Cpu,
} from 'lucide-react';

export default function HashrateCalculatorSEO() {
	const t = useTranslations('calculators.hashrate');

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

	// Get FAQ items from translation
	const faqRaw = t.raw('seo.faq.faqItems');
	const faqItems = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>).slice(0, 30)
		: [];

	// Get calculation examples
	const calculationExamplesRaw = t.raw('seo.overview.calculationExamples');
	const calculationExamples = Array.isArray(calculationExamplesRaw)
		? (calculationExamplesRaw as Array<{
				title: string;
				description: string;
				input: string;
				calculation: string;
				result: string;
				type: string;
		  }>)
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
						{t('seo.overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.overview.content')}
					</p>
					{t('seo.overview.additionalContent') && (
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
							{t('seo.overview.additionalContent')}
						</p>
					)}

					{/* Calculation Examples */}
					{calculationExamples.length > 0 && (
						<div className='mt-8'>
							<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
								Примеры расчёта
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{calculationExamples.map((example, i) => (
									<div
										key={i}
										className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<Zap className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{example.title}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{example.description}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{example.input}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{example.calculation}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{example.result}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Тип:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{example.type}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
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
								<strong>{t('seo.calculation.revenue')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.blocksPerPeriod')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.electricityCost')}</strong>
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

			{/* Visual Chart: Mining Equipment Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типы майнинг-оборудования
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Основные типы оборудования для майнинга криптовалют:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[
							{
								type: 'ASIC майнеры',
								icon: HardDrive,
								hashrate: '10-200 TH/s',
								power: '1500-3500 Вт',
								description: 'Специализированное оборудование для Bitcoin',
								example: 'Antminer S19, Whatsminer',
							},
							{
								type: 'GPU майнинг',
								icon: Cpu,
								hashrate: '100-500 MH/s',
								power: '200-400 Вт',
								description: 'Видеокарты для Ethereum и других',
								example: 'NVIDIA RTX, AMD RX',
							},
							{
								type: 'Массивные фермы',
								icon: Server,
								hashrate: '1-10 PH/s',
								power: '10-50 кВт',
								description: 'Промышленные майнинг-фермы',
								example: 'Дата-центры майнинга',
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
										Хешрейт: {item.hashrate}
									</p>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										Мощность: {item.power}
									</p>
									<div className='text-xs text-gray-600 dark:text-gray-400 mb-1'>
										{item.description}
									</div>
									<div className='text-xs text-gray-500 dark:text-gray-500 mt-2 pt-2 border-t border-gray-300 dark:border-gray-600'>
										Пример: {item.example}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Visual Chart: Popular Cryptocurrencies */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Популярные криптовалюты для майнинга
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Основные криптовалюты и их параметры майнинга:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								name: 'Bitcoin (BTC)',
								algorithm: 'SHA-256',
								blockTime: '~10 мин',
								reward: '6.25 BTC',
							},
							{
								name: 'Ethereum (ETH)',
								algorithm: 'Ethash',
								blockTime: '~12 сек',
								reward: '2 ETH',
							},
							{
								name: 'Litecoin (LTC)',
								algorithm: 'Scrypt',
								blockTime: '~2.5 мин',
								reward: '12.5 LTC',
							},
							{
								name: 'Bitcoin Cash (BCH)',
								algorithm: 'SHA-256',
								blockTime: '~10 мин',
								reward: '6.25 BCH',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.name}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1'>
									Алгоритм: <strong>{item.algorithm}</strong>
								</p>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1'>
									Время блока: <strong>{item.blockTime}</strong>
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									Награда: {item.reward}
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
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.features.multipleAlgorithms')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.features.multipleAlgorithmsDesc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.features.profitability')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.features.profitabilityDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.features.roi')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.features.roiDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.features.electricity')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.features.electricityDesc')}
						</p>
					</div>
					<div className='bg-red-50 dark:bg-red-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2'>
							{t('seo.features.poolFee')}
						</h3>
						<p className='text-red-800 dark:text-red-200'>
							{t('seo.features.poolFeeDesc')}
						</p>
					</div>
					<div className='bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-teal-900 dark:text-teal-100 mb-2'>
							{t('seo.features.blockTime')}
						</h3>
						<p className='text-teal-800 dark:text-teal-200'>
							{t('seo.features.blockTimeDesc')}
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
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.advantages.accurateDesc')}
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
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.advantages.profitability')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.advantages.profitabilityDesc')}
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
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4'>
							Совет 1
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							{t('seo.tips.tip1')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4'>
							Совет 2
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.tips.tip2')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-4'>
							Совет 3
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.tips.tip3')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4'>
							Совет 4
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.tips.tip4')}
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

