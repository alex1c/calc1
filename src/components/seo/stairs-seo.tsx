'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	TrendingUp,
	Calculator,
	Shield,
	Ruler,
	CheckCircle,
	AlertCircle,
} from 'lucide-react';

export default function StairsSEO() {
	const t = useTranslations('calculators.stairsCalculator');
	const tSeo = useTranslations('calculators.stairsCalculator.seo');

	// Get FAQ items dynamically
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
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
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
								const isOptimal =
									exampleNum === 1 || exampleNum === 3;
								const isAcceptable =
									exampleNum === 2 || exampleNum === 5;

								return (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										className={`bg-gradient-to-br rounded-lg p-6 border-2 ${
											isOptimal
												? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
												: isAcceptable
												? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
												: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800'
										}`}
									>
										<div className='flex items-center mb-3'>
											{isOptimal ? (
												<CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
											) : isAcceptable ? (
												<AlertCircle className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
											) : (
												<AlertCircle className='w-6 h-6 text-orange-600 dark:text-orange-400 mr-2' />
											)}
											<h4 className='font-semibold text-gray-900 dark:text-white'>
												{tSeo(
													`overview.calculationExamples.example${exampleNum}.title`
												)}
											</h4>
										</div>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='space-y-2 mb-4'>
											<div className='bg-white dark:bg-gray-700 rounded p-2'>
												<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
													Входные данные:
												</p>
												<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.input`
													)}
												</code>
											</div>
											<div className='bg-white dark:bg-gray-700 rounded p-2'>
												<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
													Расчёт:
												</p>
												<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.calculation`
													)}
												</code>
											</div>
											<div className='grid grid-cols-2 gap-2'>
												<div className='bg-white dark:bg-gray-700 rounded p-2'>
													<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
														Результат:
													</p>
													<p className='text-xs font-bold text-purple-800 dark:text-purple-300'>
														{tSeo(
															`overview.calculationExamples.example${exampleNum}.result`
														)}
													</p>
												</div>
												<div className='bg-white dark:bg-gray-700 rounded p-2'>
													<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
														Тип:
													</p>
													<p className='text-xs font-bold text-indigo-800 dark:text-indigo-300'>
														{tSeo(
															`overview.calculationExamples.example${exampleNum}.type`
														)}
													</p>
												</div>
											</div>
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.note`
											) && (
												<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded p-2 border border-yellow-200 dark:border-yellow-800'>
													<p className='text-xs text-yellow-800 dark:text-yellow-300'>
														💡{' '}
														{tSeo(
															`overview.calculationExamples.example${exampleNum}.note`
														)}
													</p>
												</div>
											)}
										</div>

										{/* Visual Chart */}
										<div className='mt-4 bg-white dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600'>
											<div className='flex items-center justify-between mb-2'>
												<span className='text-xs text-gray-600 dark:text-gray-400'>
													Высота ступени
												</span>
												<span className='text-xs font-semibold text-gray-900 dark:text-white'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.stepHeight`
													)}
												</span>
											</div>
											<div className='h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden'>
												<div
													className={`h-full rounded-full ${
														isOptimal
															? 'bg-green-500'
															: isAcceptable
															? 'bg-blue-500'
															: 'bg-orange-500'
													}`}
													style={{
														width: `${Math.min(
															(parseInt(
																tSeo(
																	`overview.calculationExamples.example${exampleNum}.stepHeightPercent`
																) || '0'
															) /
																200) *
																100,
															100
														)}%`,
													}}
												/>
											</div>
											<div className='flex items-center justify-between mt-2'>
												<span className='text-xs text-gray-600 dark:text-gray-400'>
													Глубина ступени
												</span>
												<span className='text-xs font-semibold text-gray-900 dark:text-white'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.stepDepth`
													)}
												</span>
											</div>
											<div className='h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mt-1'>
												<div
													className={`h-full rounded-full ${
														isOptimal
															? 'bg-green-500'
															: isAcceptable
															? 'bg-blue-500'
															: 'bg-orange-500'
													}`}
													style={{
														width: `${Math.min(
															(parseInt(
																tSeo(
																	`overview.calculationExamples.example${exampleNum}.stepDepthPercent`
																) || '0'
															) /
																350) *
																100,
															100
														)}%`,
													}}
												/>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Calculation Methods */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('calculation.title')}
				</h2>
				<div className='prose prose-lg text-gray-700 dark:text-gray-300 mb-6'>
					<p>{tSeo('calculation.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2'>
							<Calculator className='w-5 h-5' />
							{tSeo('calculation.steps')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200 text-sm'>
							{tSeo('calculation.stepsDesc')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2'>
							<TrendingUp className='w-5 h-5' />
							{tSeo('calculation.angle')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200 text-sm'>
							{tSeo('calculation.angleDesc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2'>
							<Shield className='w-5 h-5' />
							{tSeo('calculation.comfort')}
						</h3>
						<p className='text-green-800 dark:text-green-200 text-sm'>
							{tSeo('calculation.comfortDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2 flex items-center gap-2'>
							<Ruler className='w-5 h-5' />
							{tSeo('calculation.length')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200 text-sm'>
							{tSeo('calculation.lengthDesc')}
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
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-700 dark:text-gray-300 mb-6'>
					<p>{tSeo('advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-300 mb-2'>
							{tSeo('advantages.accuracy.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{tSeo('advantages.accuracy.description')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2'>
							{tSeo('advantages.savings.title')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{tSeo('advantages.savings.description')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2'>
							{tSeo('advantages.planning.title')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{tSeo('advantages.planning.description')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2'>
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
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-700 dark:text-gray-300 mb-6'>
					<p>{tSeo('tips.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2'>
							{tSeo('tips.design.title')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200 text-sm mb-2'>
							{tSeo('tips.design.measurements')}
						</p>
						<p className='text-purple-800 dark:text-purple-200 text-sm mb-2'>
							{tSeo('tips.design.formula')}
						</p>
						<p className='text-purple-800 dark:text-purple-200 text-sm'>
							{tSeo('tips.design.materials')}
						</p>
					</div>
					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-300 mb-2'>
							{tSeo('tips.safety.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200 text-sm mb-2'>
							{tSeo('tips.safety.railings')}
						</p>
						<p className='text-green-800 dark:text-green-200 text-sm mb-2'>
							{tSeo('tips.safety.lighting')}
						</p>
						<p className='text-green-800 dark:text-green-200 text-sm'>
							{tSeo('tips.safety.surface')}
						</p>
					</div>
					<div className='bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2'>
							{tSeo('tips.optimization.title')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200 text-sm mb-2'>
							{tSeo('tips.optimization.space')}
						</p>
						<p className='text-orange-800 dark:text-orange-200 text-sm mb-2'>
							{tSeo('tips.optimization.angle')}
						</p>
						<p className='text-orange-800 dark:text-orange-200 text-sm'>
							{tSeo('tips.optimization.comfort')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* FAQ */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{tSeo('faq.title')}
				</h2>
				<div className='space-y-4'>
					{faqItems.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05 }}
							className='bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-start gap-2'>
								<span className='text-purple-600 dark:text-purple-400 font-bold'>
									{index + 1}.
								</span>
								{faq.q}
							</h3>
							<p className='text-gray-600 dark:text-gray-400 ml-6'>
								{faq.a}
							</p>
						</motion.div>
					))}
				</div>
			</motion.section>
		</motion.div>
	);
}
