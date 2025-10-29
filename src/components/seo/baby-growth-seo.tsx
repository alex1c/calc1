'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Info,
	AlertTriangle,
	TrendingUp,
	Shield,
	HelpCircle,
	Baby,
	Ruler,
	Weight,
	Target,
} from 'lucide-react';

export default function BabyGrowthSEO() {
	const t = useTranslations('calculators.babyGrowth');

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
			{/* Overview Section with Examples */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<Info className='text-blue-600 dark:text-blue-400' />
					{t('seo.overview.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
					{t('seo.overview.content')}
				</p>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('seo.overview.additionalContent')}
				</p>

				{/* Calculation Examples */}
				<div className='mt-8'>
					<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
						{t('seo.overview.calculationExamples.title')}
					</h3>
					<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
						{t('seo.overview.calculationExamples.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 6 }, (_, i) => {
							const exampleNum = i + 1;
							const isNormal =
								exampleNum === 2 ||
								exampleNum === 3 ||
								exampleNum === 5;
							const isAboveAverage =
								exampleNum === 4 || exampleNum === 6;
							const isBelowAverage = exampleNum === 1;

							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className={`bg-gradient-to-br rounded-lg p-6 border-2 ${
										isNormal
											? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
											: isAboveAverage
											? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
											: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800'
									}`}
								>
									<div className='flex items-center mb-3'>
										{isNormal ? (
											<Shield className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
										) : isAboveAverage ? (
											<TrendingUp className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
										) : (
											<AlertTriangle className='w-6 h-6 text-orange-600 dark:text-orange-400 mr-2' />
										)}
										<h4 className='font-semibold text-gray-900 dark:text-white'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
										{t(
											`seo.overview.calculationExamples.example${exampleNum}.description`
										)}
									</p>
									<div className='space-y-2 mb-4'>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
									</div>
									<div className='grid grid-cols-2 gap-2 mb-4'>
										<div className='bg-blue-100 dark:bg-blue-900/30 rounded p-2'>
											<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
												Результат:
											</p>
											<p className='text-xs text-blue-900 dark:text-blue-200'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.result`
												)}
											</p>
										</div>
										<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
											<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
												Категория:
											</p>
											<p className='text-xs text-purple-900 dark:text-purple-200'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.category`
												)}
											</p>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
										<p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
											Рекомендация:
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.recommendation`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.section>

			{/* WHO Standards */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<Shield className='text-green-600 dark:text-green-400' />
					{t('seo.whoStandards.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.whoStandards.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('seo.whoStandards.benefits')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm leading-relaxed'>
								{t('seo.whoStandards.benefitsDescription')}
							</p>
						</div>
						<div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('seo.whoStandards.reliability')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm leading-relaxed'>
								{t('seo.whoStandards.reliabilityDescription')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Percentiles */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<TrendingUp className='text-purple-600 dark:text-purple-400' />
					{t('seo.percentiles.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.percentiles.content')}
					</p>
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='bg-gray-50 dark:bg-gray-700'>
									<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
										{t('seo.percentiles.table.percentile')}
									</th>
									<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
										{t('seo.percentiles.table.category')}
									</th>
									<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
										{t('seo.percentiles.table.description')}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'>
											&lt; 5%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('seo.percentiles.table.belowNormal')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t(
											'seo.percentiles.table.belowNormalDesc'
										)}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'>
											5-25%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t(
											'seo.percentiles.table.belowAverage'
										)}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t(
											'seo.percentiles.table.belowAverageDesc'
										)}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'>
											25-75%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('seo.percentiles.table.normal')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t('seo.percentiles.table.normalDesc')}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'>
											75-95%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t(
											'seo.percentiles.table.aboveAverage'
										)}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t(
											'seo.percentiles.table.aboveAverageDesc'
										)}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'>
											&gt; 95%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('seo.percentiles.table.aboveNormal')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t(
											'seo.percentiles.table.aboveNormalDesc'
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</motion.section>

			{/* How to Use */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<Baby className='text-pink-600 dark:text-pink-400' />
					{t('seo.howToUse.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.howToUse.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg p-4 border-2 border-pink-200 dark:border-pink-800'>
							<h3 className='font-semibold text-pink-900 dark:text-pink-100 mb-2 flex items-center gap-2'>
								<Ruler className='w-4 h-4' />
								{t('seo.howToUse.measurements')}
							</h3>
							<p className='text-pink-800 dark:text-pink-200 text-sm leading-relaxed'>
								{t('seo.howToUse.measurementsDescription')}
							</p>
						</div>
						<div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2'>
								<Weight className='w-4 h-4' />
								{t('seo.howToUse.accuracy')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm leading-relaxed'>
								{t('seo.howToUse.accuracyDescription')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Important Notes */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<AlertTriangle className='text-orange-600 dark:text-orange-400' />
					{t('seo.importantNotes.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.importantNotes.content')}
					</p>
					<div className='bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-4'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0' />
							<div>
								<h3 className='font-semibold text-orange-800 dark:text-orange-200 mb-2'>
									{t('seo.importantNotes.warning')}
								</h3>
								<p className='text-orange-700 dark:text-orange-300 text-sm leading-relaxed'>
									{t('seo.importantNotes.warningContent')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* FAQ Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-6'>
					<HelpCircle className='w-8 h-8 text-pink-600 dark:text-pink-400 mr-3' />
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						Часто задаваемые вопросы о росте и весе ребёнка
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.03 }}
							className='bg-gradient-to-r from-gray-50 to-pink-50 dark:from-gray-700 dark:to-pink-900/20 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow'
						>
							<div className='flex items-start gap-3'>
								<div className='flex-shrink-0 w-8 h-8 bg-pink-600 dark:bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
									{index + 1}
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{faq.q}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{faq.a}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>
		</motion.div>
	);
}
