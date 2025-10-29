'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Info,
	AlertTriangle,
	Clock,
	TrendingUp,
	Shield,
	HelpCircle,
	Droplet,
	Calculator,
} from 'lucide-react';

export default function BloodAlcoholSEO() {
	const t = useTranslations('calculators.bloodAlcohol');

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
							const isLow = exampleNum === 1 || exampleNum === 3;
							const isMedium =
								exampleNum === 2 ||
								exampleNum === 4 ||
								exampleNum === 6;
							const isHigh = exampleNum === 5;

							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className={`bg-gradient-to-br rounded-lg p-6 border-2 ${
										isLow
											? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
											: isMedium
											? 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
											: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
									}`}
								>
									<div className='flex items-center mb-3'>
										{isLow ? (
											<Shield className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
										) : isMedium ? (
											<AlertTriangle className='w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2' />
										) : (
											<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 mr-2' />
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
												BAC:
											</p>
											<p className='text-xs text-blue-900 dark:text-blue-200 font-bold'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.result`
												)}
											</p>
										</div>
										<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
											<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
												Состояние:
											</p>
											<p className='text-xs text-purple-900 dark:text-purple-200'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.state`
												)}
											</p>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
										<p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
											Время выведения:
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.elimination`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.section>

			{/* BAC Table */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<TrendingUp className='text-blue-600 dark:text-blue-400' />
					{t('seo.bacTable.title')}
				</h2>

				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-gray-50 dark:bg-gray-700'>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{t('seo.bacTable.level')}
								</th>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{t('seo.bacTable.state')}
								</th>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{t('seo.bacTable.description')}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'>
										0.0‰ - 0.3‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Трезвое состояние
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Полное отсутствие алкоголя в крови
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'>
										0.3‰ - 0.5‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Лёгкое расслабление
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Минимальное воздействие алкоголя
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'>
										0.5‰ - 1.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Лёгкое опьянение
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Начальные признаки опьянения
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'>
										1.0‰ - 2.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Среднее опьянение
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Заметное нарушение координации
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'>
										2.0‰ - 3.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Сильное опьянение
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Серьёзное нарушение функций
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'>
										3.0‰ - 4.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Тяжёлое отравление алкоголем
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Опасное для здоровья состояние
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'>
										4.0‰ - ∞
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Опасное для жизни состояние
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Критическое состояние, требуется медицинская
									помощь
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</motion.section>

			{/* Calculation */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Calculator className='w-8 h-8 text-green-600 dark:text-green-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.calculation.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.calculation.content')}
					</p>
					<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('seo.calculation.formula')}
						</h3>
						<code className='text-sm text-gray-800 dark:text-gray-200 font-mono block mb-3'>
							BAC = (A / (r × W)) × 1000
						</code>
						<div className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
							<p>
								<strong>A</strong> —{' '}
								{t('seo.calculation.variables.alcohol')}
							</p>
							<p>
								<strong>r</strong> —{' '}
								{t('seo.calculation.variables.ratio')}
							</p>
							<p>
								<strong>W</strong> —{' '}
								{t('seo.calculation.variables.weight')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Elimination */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Clock className='w-8 h-8 text-orange-600 dark:text-orange-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.elimination.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.elimination.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('seo.elimination.rate')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm leading-relaxed'>
								{t('seo.elimination.rateDescription')}
							</p>
						</div>
						<div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('seo.elimination.factors')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm leading-relaxed'>
								{t('seo.elimination.factorsDescription')}
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Safety */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Shield className='w-8 h-8 text-red-600 dark:text-red-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.safety.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('seo.safety.content')}
					</p>
					<div className='bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0' />
							<div>
								<h3 className='font-semibold text-red-800 dark:text-red-200 mb-2'>
									{t('seo.safety.warning')}
								</h3>
								<p className='text-red-700 dark:text-red-300 text-sm leading-relaxed'>
									{t('seo.safety.warningContent')}
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
					<HelpCircle className='w-8 h-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						Часто задаваемые вопросы о промилле и алкоголе в крови
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
							className='bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow'
						>
							<div className='flex items-start gap-3'>
								<div className='flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
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

			{/* Visual Graph: Speed of Elimination */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					Визуальная таблица времени выведения алкоголя
				</h2>
				<div className='space-y-3'>
					{[
						{ bac: '0.5‰', time: '~3.5 ч', color: 'green' },
						{ bac: '1.0‰', time: '~7 ч', color: 'yellow' },
						{ bac: '1.5‰', time: '~10 ч', color: 'orange' },
						{ bac: '2.0‰', time: '~13 ч', color: 'red' },
						{ bac: '2.5‰', time: '~17 ч', color: 'red' },
						{ bac: '3.0‰', time: '~20 ч', color: 'purple' },
					].map((item, idx) => (
						<div
							key={idx}
							className={`flex items-center justify-between p-4 rounded-lg border-2 ${
								item.color === 'green'
									? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
									: item.color === 'yellow'
									? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
									: item.color === 'orange'
									? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700'
									: item.color === 'red'
									? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
									: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700'
							}`}
						>
							<div className='flex items-center gap-3'>
								<Droplet
									className={`w-6 h-6 ${
										item.color === 'green'
											? 'text-green-600 dark:text-green-400'
											: item.color === 'yellow'
											? 'text-yellow-600 dark:text-yellow-400'
											: item.color === 'orange'
											? 'text-orange-600 dark:text-orange-400'
											: item.color === 'red'
											? 'text-red-600 dark:text-red-400'
											: 'text-purple-600 dark:text-purple-400'
									}`}
								/>
								<span className='font-bold text-gray-900 dark:text-white'>
									BAC: {item.bac}
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<Clock className='w-5 h-5 text-gray-600 dark:text-gray-400' />
								<span className='font-semibold text-gray-700 dark:text-gray-300'>
									{item.time}
								</span>
							</div>
						</div>
					))}
				</div>
				<p className='text-sm text-gray-600 dark:text-gray-400 mt-4'>
					*Время выведения при скорости 0.15‰/час до полного выведения
					(0‰)
				</p>
			</motion.section>
		</motion.div>
	);
}
