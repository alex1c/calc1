'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	DollarSign,
	Percent,
	TrendingUp,
	Calculator,
	BarChart3,
	PiggyBank,
} from 'lucide-react';

export default function CompoundInterestSEO() {
	const t = useTranslations('calculators.compound-interest');
	const tSeo = useTranslations('calculators.compound-interest.seo');

	const borderColors = [
		'border-blue-500',
		'border-green-500',
		'border-purple-500',
		'border-orange-500',
		'border-red-500',
		'border-indigo-500',
	];

	// Get FAQ items dynamically
	const faqItemsRaw = tSeo.raw('faq.faqItems');
	const faqItems = Array.isArray(faqItemsRaw)
		? (faqItemsRaw as Array<{ q: string; a: string }>)
		: [];

	// Chart data for visualization - Growth comparison
	const growthComparison = [
		{
			period: '1 год',
			simple: 112000,
			compound: 112680,
			color: 'bg-green-500',
		},
		{
			period: '3 года',
			simple: 136000,
			compound: 140490,
			color: 'bg-blue-500',
		},
		{
			period: '5 лет',
			simple: 160000,
			compound: 176235,
			color: 'bg-purple-500',
		},
		{
			period: '10 лет',
			simple: 220000,
			compound: 310585,
			color: 'bg-orange-500',
		},
	];

	// Compounding frequency comparison
	const frequencyComparison = [
		{
			frequency: 'Ежегодно',
			amount: 176234,
			color: 'bg-red-500',
		},
		{
			frequency: 'Полгода',
			frequencyLabel: 'Раз в полгода',
			amount: 179587,
			color: 'bg-orange-500',
		},
		{
			frequency: 'Ежеквартально',
			amount: 181169,
			color: 'bg-yellow-500',
		},
		{
			frequency: 'Ежемесячно',
			amount: 183975,
			color: 'bg-green-500',
		},
		{
			frequency: 'Ежедневно',
			amount: 184826,
			color: 'bg-blue-500',
		},
	];

	const maxGrowth = Math.max(
		...growthComparison.map((item) => item.compound)
	);

	const maxFrequency = Math.max(
		...frequencyComparison.map((item) => item.amount)
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mt-12 space-y-10'
		>
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
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
									<motion.div
										key={i}
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: i * 0.1 }}
										className={`bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border-2 ${
											borderColors[
												i % borderColors.length
											]
										}`}
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<PiggyBank className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
											<div className='bg-green-100 dark:bg-green-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-green-800 dark:text-green-300 mb-1'>
													Итоговая сумма:
												</p>
												<p className='text-xs text-green-900 dark:text-green-200 font-bold'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Проценты:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200 font-bold'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.interest`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.note`
											)}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>

					{/* Visual Charts */}
					<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Simple vs Compound Comparison */}
						<div className='bg-gray-50 dark:bg-gray-700 p-5 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<BarChart3 className='w-5 h-5 text-blue-600 dark:text-blue-400' />
								Сравнение простых и сложных процентов (100 000
								₽, 12% годовых)
							</h4>
							<div className='space-y-4'>
								{growthComparison.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-2'>
											<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
												{item.period}
											</span>
											<div className='flex gap-4 text-sm'>
												<span className='text-red-600 dark:text-red-400'>
													Простой:{' '}
													{item.simple.toLocaleString(
														'ru-RU'
													)}{' '}
													₽
												</span>
												<span className='text-green-600 dark:text-green-400 font-semibold'>
													Сложный:{' '}
													{item.compound.toLocaleString(
														'ru-RU'
													)}{' '}
													₽
												</span>
											</div>
										</div>
										<div className='space-y-1'>
											<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3'>
												<div
													className='bg-red-500 h-3 rounded-full flex items-center justify-end pr-2'
													style={{
														width: `${
															(item.simple /
																maxGrowth) *
															100
														}%`,
													}}
												>
													<span className='text-xs text-white font-medium'>
														{item.simple.toLocaleString(
															'ru-RU'
														)}
													</span>
												</div>
											</div>
											<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3'>
												<div
													className='bg-green-500 h-3 rounded-full flex items-center justify-end pr-2'
													style={{
														width: `${
															(item.compound /
																maxGrowth) *
															100
														}%`,
													}}
												>
													<span className='text-xs text-white font-medium'>
														{item.compound.toLocaleString(
															'ru-RU'
														)}
													</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Compounding Frequency Comparison */}
						<div className='bg-gray-50 dark:bg-gray-700 p-5 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<TrendingUp className='w-5 h-5 text-purple-600 dark:text-purple-400' />
								Влияние частоты капитализации (100 000 ₽, 12%
								годовых, 5 лет)
							</h4>
							<div className='space-y-3'>
								{frequencyComparison.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm text-gray-700 dark:text-gray-300'>
												{item.frequencyLabel ||
													item.frequency}
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.amount.toLocaleString(
													'ru-RU'
												)}{' '}
												₽
											</span>
										</div>
										<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4'>
											<div
												className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
												style={{
													width: `${
														(item.amount /
															maxFrequency) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.amount.toLocaleString(
														'ru-RU'
													)}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculation Method */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<Calculator className='w-6 h-6 text-blue-600 dark:text-blue-400' />
					{tSeo('calculation.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
					{tSeo('calculation.content')}
				</p>
				<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4'>
					<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
						Основная формула сложных процентов:
					</h3>
					<div className='bg-white dark:bg-gray-600 rounded p-3 mb-3'>
						<code className='text-sm text-blue-800 dark:text-blue-300 font-mono'>
							{tSeo('calculation.formula')}
						</code>
					</div>
					<h3 className='font-semibold text-gray-900 dark:text-white mb-2 mt-4'>
						Формула с регулярными взносами:
					</h3>
					<div className='bg-white dark:bg-gray-600 rounded p-3'>
						<code className='text-sm text-green-800 dark:text-green-300 font-mono'>
							{tSeo('calculation.formulaWithContributions')}
						</code>
					</div>
					<h3 className='font-semibold text-gray-900 dark:text-white mb-2 mt-4'>
						Эффективная процентная ставка (EAR):
					</h3>
					<div className='bg-white dark:bg-gray-600 rounded p-3'>
						<code className='text-sm text-purple-800 dark:text-purple-300 font-mono'>
							{tSeo('calculation.effectiveRate')}
						</code>
					</div>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('advantages.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
					{tSeo('advantages.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{Object.entries(tSeo.raw('advantages')).map(
						([key, value]) => {
							if (key === 'title' || key === 'content')
								return null;
							const advantage = value as {
								title: string;
								description: string;
							};
							return (
								<div
									key={key}
									className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'
								>
									<h3 className='font-semibold text-blue-900 dark:text-blue-200 mb-2'>
										{advantage.title}
									</h3>
									<p className='text-sm text-blue-800 dark:text-blue-300'>
										{advantage.description}
									</p>
								</div>
							);
						}
					)}
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('tips.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
					{tSeo('tips.content')}
				</p>
				<div className='space-y-4'>
					{Object.entries(tSeo.raw('tips')).map(([key, value]) => {
						if (key === 'title' || key === 'content') return null;
						const tipSection = value as Record<string, string>;
						return (
							<div
								key={key}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'
							>
								<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
									{tSeo(`tips.${key}.title`)}
								</h3>
								<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
									{Object.entries(tipSection).map(
										([tipKey, tipValue]) => {
											if (tipKey === 'title') return null;
											return (
												<li key={tipKey}>
													{String(tipValue)}
												</li>
											);
										}
									)}
								</ul>
							</div>
						);
					})}
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					{tSeo('faq.title')}
				</h2>
				<div className='space-y-4'>
					{faqItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }}
							className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors'
						>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-start'>
								<Percent className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0' />
								<span>{item.q}</span>
							</h3>
							<p className='text-gray-700 dark:text-gray-300 ml-7'>
								{item.a}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
