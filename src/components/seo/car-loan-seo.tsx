'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Car,
	Calculator,
	CreditCard,
	BarChart3,
	TrendingDown,
	FileText,
} from 'lucide-react';

export default function CarLoanSEO() {
	const t = useTranslations('calculators.car-loan');
	const tSeo = useTranslations('calculators.car-loan.seo');

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

	// Chart data for visualization - Overpayment by loan term
	const overpaymentByTerm = [
		{
			term: '3 года',
			overpayment: 200000,
			percentage: 20,
			example: '1 000 000 ₽ под 12%',
			color: 'bg-green-500',
		},
		{
			term: '5 лет',
			overpayment: 332000,
			percentage: 33,
			example: '1 000 000 ₽ под 12%',
			color: 'bg-blue-500',
		},
		{
			term: '7 лет',
			overpayment: 462000,
			percentage: 46,
			example: '1 000 000 ₽ под 11%',
			color: 'bg-orange-500',
		},
	];

	// Payment type comparison chart
	const paymentTypeComparison = [
		{
			type: 'Аннуитетный',
			firstPayment: 26693,
			lastPayment: 26693,
			overpayment: 401580,
			overpaymentPercent: 33.5,
			color: 'bg-blue-500',
		},
		{
			type: 'Дифференцированный',
			firstPayment: 32000,
			lastPayment: 20250,
			overpayment: 375000,
			overpaymentPercent: 31.25,
			color: 'bg-purple-500',
		},
	];

	const maxOverpayment = Math.max(
		...overpaymentByTerm.map((item) => item.overpayment)
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
											<Car className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
													Результат:
												</p>
												<p className='text-xs text-green-900 dark:text-green-200 font-bold'>
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
									</motion.div>
								);
							})}
						</div>
					</div>

					{/* Visual Charts */}
					<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Overpayment by Term */}
						<div className='bg-gray-50 dark:bg-gray-700 p-5 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<BarChart3 className='w-5 h-5 text-blue-600 dark:text-blue-400' />
								Переплата в зависимости от срока (1 млн ₽, 12%
								годовых)
							</h4>
							<div className='space-y-3'>
								{overpaymentByTerm.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<div>
												<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
													{item.term}
												</span>
												<p className='text-xs text-gray-500 dark:text-gray-400'>
													{item.example}
												</p>
											</div>
											<div className='text-right'>
												<span className='text-sm font-medium text-gray-900 dark:text-white'>
													{item.overpayment.toLocaleString(
														'ru-RU'
													)}{' '}
													₽
												</span>
												<p className='text-xs text-gray-500 dark:text-gray-400'>
													{item.percentage}%
												</p>
											</div>
										</div>
										<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4'>
											<div
												className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
												style={{
													width: `${
														(item.overpayment /
															maxOverpayment) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.percentage}%
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Payment Type Comparison */}
						<div className='bg-gray-50 dark:bg-gray-700 p-5 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<CreditCard className='w-5 h-5 text-purple-600 dark:text-purple-400' />
								Сравнение типов платежей (1.2 млн ₽, 5 лет, 12%)
							</h4>
							<div className='space-y-3'>
								{paymentTypeComparison.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
												{item.type}
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.overpayment.toLocaleString(
													'ru-RU'
												)}{' '}
												₽
											</span>
										</div>
										<div className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
											Первый:{' '}
											{item.firstPayment.toLocaleString(
												'ru-RU'
											)}{' '}
											₽
											{item.lastPayment !==
												item.firstPayment &&
												`, Последний: ${item.lastPayment.toLocaleString(
													'ru-RU'
												)} ₽`}
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
													{item.overpaymentPercent.toFixed(
														1
													)}
													%
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
				<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4 space-y-4'>
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Формула аннуитетного платежа:
						</h3>
						<div className='bg-white dark:bg-gray-600 rounded p-3'>
							<code className='text-sm text-blue-800 dark:text-blue-300 font-mono'>
								{tSeo('calculation.annuityFormula')}
							</code>
						</div>
					</div>
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Формула дифференцированного платежа:
						</h3>
						<div className='bg-white dark:bg-gray-600 rounded p-3'>
							<code className='text-sm text-green-800 dark:text-green-300 font-mono'>
								{tSeo('calculation.differentiatedFormula')}
							</code>
						</div>
					</div>
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Расчёт переплаты:
						</h3>
						<div className='bg-white dark:bg-gray-600 rounded p-3'>
							<code className='text-sm text-orange-800 dark:text-orange-300 font-mono'>
								{tSeo('calculation.overpayment')}
							</code>
						</div>
					</div>
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Эффективная сумма кредита:
						</h3>
						<div className='bg-white dark:bg-gray-600 rounded p-3'>
							<code className='text-sm text-purple-800 dark:text-purple-300 font-mono'>
								{tSeo('calculation.effectiveAmount')}
							</code>
						</div>
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
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{[
						{
							key: 'quickApproval',
							text: tSeo('advantages.quickApproval'),
						},
						{ key: 'lowRates', text: tSeo('advantages.lowRates') },
						{
							key: 'flexibleTerms',
							text: tSeo('advantages.flexibleTerms'),
						},
						{
							key: 'earlyRepayment',
							text: tSeo('advantages.earlyRepayment'),
						},
					].map((advantage) => {
						return (
							<div
								key={advantage.key}
								className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'
							>
								<p className='text-sm text-blue-800 dark:text-blue-300'>
									{advantage.text}
								</p>
							</div>
						);
					})}
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
					{[
						{ key: 'compare', text: tSeo('tips.compare') },
						{
							key: 'initialPayment',
							text: tSeo('tips.initialPayment'),
						},
						{ key: 'early', text: tSeo('tips.early') },
						{ key: 'insurance', text: tSeo('tips.insurance') },
						{ key: 'paymentType', text: tSeo('tips.paymentType') },
						{ key: 'consult', text: tSeo('tips.consult') },
					].map((section) => {
						return (
							<div
								key={section.key}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'
							>
								<p className='text-gray-700 dark:text-gray-300'>
									{section.text}
								</p>
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
								<FileText className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0' />
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
