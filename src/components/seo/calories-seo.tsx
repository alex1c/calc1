'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Flame,
	Calculator,
	TrendingUp,
	TrendingDown,
	Minus,
} from 'lucide-react';

export default function CaloriesSEO() {
	const t = useTranslations('calculators.calories.seo');

	const renderList = (items: string[]) => (
		<ul className='list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300'>
			{items.map((item, index) => (
				<li
					key={index}
					className='leading-relaxed'
				>
					{item}
				</li>
			))}
		</ul>
	);

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`faq.faqItems.${i}.q`),
		a: t(`faq.faqItems.${i}.a`),
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
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
					{t('overview.content')}
				</p>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('overview.additionalContent')}
				</p>

				{/* Calculation Examples */}
				<div className='mt-8'>
					<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
						{t('overview.calculationExamples.title')}
					</h3>
					<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
						{t('overview.calculationExamples.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 6 }, (_, i) => {
							const exampleNum = i + 1;
							const isWeightLoss =
								exampleNum === 1 || exampleNum === 4;
							const isWeightGain =
								exampleNum === 3 || exampleNum === 6;

							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className={`bg-gradient-to-br rounded-lg p-6 border-2 ${
										isWeightLoss
											? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
											: isWeightGain
											? 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800'
											: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
									}`}
								>
									<div className='flex items-center mb-3'>
										{isWeightLoss ? (
											<TrendingDown className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
										) : isWeightGain ? (
											<TrendingUp className='w-6 h-6 text-orange-600 dark:text-orange-400 mr-2' />
										) : (
											<Minus className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
										)}
										<h4 className='font-semibold text-gray-900 dark:text-white'>
											{t(
												`overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
										{t(
											`overview.calculationExamples.example${exampleNum}.description`
										)}
									</p>
									<div className='space-y-2'>
										<div className='bg-white dark:bg-gray-700 rounded p-3'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												BMR:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.bmr`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded p-3'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												TDEE:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.tdee`
												)}
											</code>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
										<p
											className={`text-sm font-semibold mb-1 ${
												isWeightLoss
													? 'text-blue-700 dark:text-blue-400'
													: isWeightGain
													? 'text-orange-700 dark:text-orange-400'
													: 'text-green-700 dark:text-green-400'
											}`}
										>
											{t(
												`overview.calculationExamples.example${exampleNum}.result`
											)}
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400'>
											{t(
												`overview.calculationExamples.example${exampleNum}.category`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.section>

			{/* BMR Calculation Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Calculator className='w-8 h-8 text-orange-600 dark:text-orange-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('bmr.title')}
					</h2>
				</div>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('bmr.content')}
				</p>

				{/* Formula Visualization */}
				<div className='grid md:grid-cols-2 gap-6 mb-6'>
					<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800'>
						<h3 className='font-semibold text-blue-900 dark:text-blue-300 mb-3'>
							Формула для мужчин:
						</h3>
						<div className='bg-white dark:bg-gray-700 rounded p-4'>
							<code className='text-sm text-gray-800 dark:text-gray-200 font-mono'>
								BMR = 88.36 + (13.4 × вес) + (4.8 × рост) − (5.7
								× возраст)
							</code>
						</div>
					</div>
					<div className='bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-6 border border-pink-200 dark:border-pink-800'>
						<h3 className='font-semibold text-pink-900 dark:text-pink-300 mb-3'>
							Формула для женщин:
						</h3>
						<div className='bg-white dark:bg-gray-700 rounded p-4'>
							<code className='text-sm text-gray-800 dark:text-gray-200 font-mono'>
								BMR = 447.6 + (9.2 × вес) + (3.1 × рост) − (4.3
								× возраст)
							</code>
						</div>
					</div>
				</div>

				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('bmr.features')) &&
						(t.raw('bmr.features') as string[]).map(
							(feature: string, index: number) => (
								<div
									key={index}
									className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'
								>
									<Flame className='w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5' />
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{feature}
									</p>
								</div>
							)
						)}
				</div>
			</motion.section>

			{/* Food Calories Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('foodCalories.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('foodCalories.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('foodCalories.features')) &&
						(t.raw('foodCalories.features') as string[]).map(
							(feature: string, index: number) => (
								<div
									key={index}
									className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'
								>
									<svg
										className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{feature}
									</p>
								</div>
							)
						)}
				</div>
			</motion.section>

			{/* Applications Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('applications.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('applications.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('applications.items')) &&
						(t.raw('applications.items') as string[]).map(
							(item: string, index: number) => (
								<div
									key={index}
									className='flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800'
								>
									<svg
										className='w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{item}
									</p>
								</div>
							)
						)}
				</div>
			</motion.section>

			{/* Advantages Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('advantages.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('advantages.items')) &&
						(t.raw('advantages.items') as string[]).map(
							(item: string, index: number) => (
								<div
									key={index}
									className='flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800'
								>
									<svg
										className='w-6 h-6 text-green-500 flex-shrink-0 mt-0.5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{item}
									</p>
								</div>
							)
						)}
				</div>
			</motion.section>

			{/* Online Calculator Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 rounded-xl border-2 border-orange-200 dark:border-orange-800'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('onlineCalculator.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
					{t('onlineCalculator.content')}
				</p>
			</motion.section>

			{/* FAQ Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-6'>
					<svg
						className='w-8 h-8 text-blue-600 dark:text-blue-400 mr-3'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						Часто задаваемые вопросы о калориях и питании
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

			{/* Visual Info Graphics Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					Коэффициенты активности для расчёта TDEE
				</h2>
				<div className='grid md:grid-cols-5 gap-4'>
					{[
						{
							level: 'Минимальная',
							coefficient: '1.2',
							desc: 'Сидячий образ жизни',
							color: 'gray',
						},
						{
							level: 'Лёгкая',
							coefficient: '1.375',
							desc: '1-3 тренировки/неделя',
							color: 'blue',
						},
						{
							level: 'Средняя',
							coefficient: '1.55',
							desc: '3-5 тренировок/неделя',
							color: 'green',
						},
						{
							level: 'Высокая',
							coefficient: '1.725',
							desc: '6-7 тренировок/неделя',
							color: 'orange',
						},
						{
							level: 'Экстремальная',
							coefficient: '1.9',
							desc: 'Профессиональный спорт',
							color: 'red',
						},
					].map((activity, idx) => (
						<div
							key={idx}
							className={`bg-gradient-to-br rounded-lg p-4 border-2 text-center ${
								activity.color === 'gray'
									? 'from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-gray-300 dark:border-gray-600'
									: activity.color === 'blue'
									? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-300 dark:border-blue-700'
									: activity.color === 'green'
									? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-300 dark:border-green-700'
									: activity.color === 'orange'
									? 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-300 dark:border-orange-700'
									: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-300 dark:border-red-700'
							}`}
						>
							<div className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
								{activity.coefficient}
							</div>
							<div className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1'>
								{activity.level}
							</div>
							<div className='text-xs text-gray-600 dark:text-gray-400'>
								{activity.desc}
							</div>
						</div>
					))}
				</div>
			</motion.section>
		</motion.div>
	);
}
