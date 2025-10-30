'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	DollarSign,
	Percent,
	TrendingDown,
	Calculator,
	BarChart3,
} from 'lucide-react';

export default function LoanOverpaymentSEO() {
	const t = useTranslations('calculators.loan-overpayment');
	const tSeo = useTranslations('calculators.loan-overpayment.seo');

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

	// Get FAQ items dynamically
	const faqItemsRaw = tSeo.raw('faq.faqItems');
	const faqItems = Array.isArray(faqItemsRaw)
		? (faqItemsRaw as Array<{ q: string; a: string }>)
		: [];

	// Chart data for visualization
	const paymentTypeComparison = [
		{
			type: 'Аннуитетный',
			overpayment: 340000,
			color: 'bg-blue-500',
		},
		{
			type: 'Дифференцированный',
			overpayment: 312500,
			color: 'bg-green-500',
		},
	];

	const termComparison = [
		{ term: '1 год', overpayment: 65000, color: 'bg-green-500' },
		{ term: '3 года', overpayment: 194000, color: 'bg-yellow-500' },
		{ term: '5 лет', overpayment: 340000, color: 'bg-orange-500' },
		{ term: '10 лет', overpayment: 720000, color: 'bg-red-500' },
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
											<DollarSign className='w-5 h-5 text-green-600 dark:text-green-400' />
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
													Переплата:
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

					{/* Visual Charts */}
					<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Payment Type Comparison */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								Сравнение переплаты по типам платежей (1 млн ₽,
								12% годовых, 5 лет)
							</h4>
							<div className='space-y-3'>
								{paymentTypeComparison.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm text-gray-700 dark:text-gray-300'>
												{item.type}
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.overpayment.toLocaleString(
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
														(item.overpayment /
															paymentTypeComparison[0]
																.overpayment) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.overpayment.toLocaleString(
														'ru-RU'
													)}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Term Comparison */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								Переплата в зависимости от срока (1 млн ₽, 12%
								годовых, аннуитетный)
							</h4>
							<div className='space-y-3'>
								{termComparison.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm text-gray-700 dark:text-gray-300'>
												{item.term}
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.overpayment.toLocaleString(
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
														(item.overpayment /
															termComparison[
																termComparison.length -
																	1
															].overpayment) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.overpayment.toLocaleString(
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
								<strong>Переплата:</strong>{' '}
								{tSeo('calculation.overpayment')}
							</li>
							<li>
								<strong>Переплата в процентах:</strong>{' '}
								{tSeo('calculation.overpaymentPercentage')}
							</li>
							<li>
								<strong>Общая стоимость кредита:</strong>{' '}
								{tSeo('calculation.totalCost')}
							</li>
							<li>
								<strong>Ежемесячный платёж (аннуитет):</strong>{' '}
								{tSeo('calculation.monthlyPayment')}
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{tSeo('advantages.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{[
						{
							title: tSeo('advantages.planning.title'),
							description: tSeo(
								'advantages.planning.description'
							),
							icon: Calculator,
						},
						{
							title: tSeo('advantages.comparison.title'),
							description: tSeo(
								'advantages.comparison.description'
							),
							icon: BarChart3,
						},
						{
							title: tSeo('advantages.savings.title'),
							description: tSeo('advantages.savings.description'),
							icon: TrendingDown,
						},
					].map((advantage, idx) => {
						const Icon = advantage.icon;
						return (
							<div
								key={idx}
								className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'
							>
								<Icon className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{advantage.title}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm'>
									{advantage.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{tSeo('tips.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{tSeo('tips.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								Снижение переплаты
							</h3>
							<ul className='text-sm text-green-800 dark:text-green-200 space-y-1'>
								<li>• {tSeo('tips.reduce.shorter')}</li>
								<li>• {tSeo('tips.reduce.lowerRate')}</li>
								<li>• {tSeo('tips.reduce.earlyPayments')}</li>
							</ul>
						</div>
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-orange-900 dark:text-orange-100 mb-2'>
								Выбор типа платежа
							</h3>
							<ul className='text-sm text-orange-800 dark:text-orange-200 space-y-1'>
								<li>• {tSeo('tips.paymentType.annuity')}</li>
								<li>
									• {tSeo('tips.paymentType.differentiated')}
								</li>
								<li>• {tSeo('tips.paymentType.compare')}</li>
							</ul>
						</div>
						<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-purple-900 dark:text-purple-100 mb-2'>
								Дополнительные платежи
							</h3>
							<ul className='text-sm text-purple-800 dark:text-purple-200 space-y-1'>
								<li>• {tSeo('tips.additional.early')}</li>
								<li>• {tSeo('tips.additional.regular')}</li>
								<li>• {tSeo('tips.additional.amount')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{tSeo('faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, index) => (
						<div
							key={index}
							className={`border-l-4 ${
								borderColors[index % borderColors.length]
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
