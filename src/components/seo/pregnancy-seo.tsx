'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Heart,
	Calendar,
	Clock,
	Users,
	Calculator,
	Target,
} from 'lucide-react';

export default function PregnancySEO() {
	const t = useTranslations('calculators.pregnancy.seo');

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
							const isFirstTrimester = exampleNum <= 3;
							const isSecondTrimester = exampleNum === 4;
							const isThirdTrimester = exampleNum === 5;
							const isMultiple = exampleNum === 6;

							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className={`bg-gradient-to-br rounded-lg p-6 border-2 ${
										isFirstTrimester
											? 'from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 border-pink-200 dark:border-pink-800'
											: isSecondTrimester
											? 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
											: isThirdTrimester
											? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
											: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800'
									}`}
								>
									<div className='flex items-center mb-3'>
										{isFirstTrimester ? (
											<Heart className='w-6 h-6 text-pink-600 dark:text-pink-400 mr-2' />
										) : isSecondTrimester ? (
											<Calendar className='w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2' />
										) : isThirdTrimester ? (
											<Clock className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
										) : (
											<Users className='w-6 h-6 text-purple-600 dark:text-purple-400 mr-2' />
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
									<div className='space-y-2 mb-4'>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono'>
												{t(
													`overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2'>
										<p className='text-sm font-bold text-center text-pink-700 dark:text-pink-400'>
											{t(
												`overview.calculationExamples.example${exampleNum}.result`
											)}
										</p>
										<div className='grid grid-cols-2 gap-2 text-xs'>
											<div>
												<span className='font-semibold text-gray-600 dark:text-gray-400'>
													Срок:
												</span>
												<p className='text-gray-700 dark:text-gray-300'>
													{t(
														`overview.calculationExamples.example${exampleNum}.currentWeek`
													)}
												</p>
											</div>
											<div>
												<span className='font-semibold text-gray-600 dark:text-gray-400'>
													Триместр:
												</span>
												<p className='text-gray-700 dark:text-gray-300'>
													{t(
														`overview.calculationExamples.example${exampleNum}.trimester`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-center text-gray-600 dark:text-gray-400'>
											{t(
												`overview.calculationExamples.example${exampleNum}.daysRemaining`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.section>

			{/* Calculation Methods */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Calculator className='w-8 h-8 text-pink-600 dark:text-pink-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('methods.title')}
					</h2>
				</div>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('methods.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{/* LMP Method */}
					<div className='p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg border-2 border-pink-200 dark:border-pink-800'>
						<div className='flex items-center mb-2'>
							<Calendar className='w-5 h-5 text-pink-600 dark:text-pink-400 mr-2' />
							<div className='font-semibold text-pink-800 dark:text-pink-300'>
								{t('methods.lmp.title')}
							</div>
						</div>
						<div className='text-sm text-pink-700 dark:text-pink-400 mb-2 font-semibold'>
							{t('methods.lmp.accuracy')}
						</div>
						<div className='text-sm text-pink-600 dark:text-pink-500 leading-relaxed'>
							{t('methods.lmp.description')}
						</div>
					</div>

					{/* Conception Method */}
					<div className='p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-2 border-blue-200 dark:border-blue-800'>
						<div className='flex items-center mb-2'>
							<Heart className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2' />
							<div className='font-semibold text-blue-800 dark:text-blue-300'>
								{t('methods.conception.title')}
							</div>
						</div>
						<div className='text-sm text-blue-700 dark:text-blue-400 mb-2 font-semibold'>
							{t('methods.conception.accuracy')}
						</div>
						<div className='text-sm text-blue-600 dark:text-blue-500 leading-relaxed'>
							{t('methods.conception.description')}
						</div>
					</div>

					{/* IVF Method */}
					<div className='p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-2 border-green-200 dark:border-green-800'>
						<div className='flex items-center mb-2'>
							<Target className='w-5 h-5 text-green-600 dark:text-green-400 mr-2' />
							<div className='font-semibold text-green-800 dark:text-green-300'>
								{t('methods.ivf.title')}
							</div>
						</div>
						<div className='text-sm text-green-700 dark:text-green-400 mb-2 font-semibold'>
							{t('methods.ivf.accuracy')}
						</div>
						<div className='text-sm text-green-600 dark:text-green-500 leading-relaxed'>
							{t('methods.ivf.description')}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Pregnancy Timeline */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('timeline.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('timeline.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{/* First Trimester */}
					<div className='p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border-2 border-red-200 dark:border-red-800'>
						<div className='font-semibold text-red-800 dark:text-red-300 mb-2'>
							{t('timeline.firstTrimester.title')}
						</div>
						<div className='text-sm text-red-700 dark:text-red-400 mb-2 font-semibold'>
							{t('timeline.firstTrimester.weeks')}
						</div>
						<div className='text-sm text-red-600 dark:text-red-500 leading-relaxed'>
							{t('timeline.firstTrimester.description')}
						</div>
					</div>

					{/* Second Trimester */}
					<div className='p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800'>
						<div className='font-semibold text-yellow-800 dark:text-yellow-300 mb-2'>
							{t('timeline.secondTrimester.title')}
						</div>
						<div className='text-sm text-yellow-700 dark:text-yellow-400 mb-2 font-semibold'>
							{t('timeline.secondTrimester.weeks')}
						</div>
						<div className='text-sm text-yellow-600 dark:text-yellow-500 leading-relaxed'>
							{t('timeline.secondTrimester.description')}
						</div>
					</div>

					{/* Third Trimester */}
					<div className='p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-2 border-green-200 dark:border-green-800'>
						<div className='font-semibold text-green-800 dark:text-green-300 mb-2'>
							{t('timeline.thirdTrimester.title')}
						</div>
						<div className='text-sm text-green-700 dark:text-green-400 mb-2 font-semibold'>
							{t('timeline.thirdTrimester.weeks')}
						</div>
						<div className='text-sm text-green-600 dark:text-green-500 leading-relaxed'>
							{t('timeline.thirdTrimester.description')}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Accuracy and Limitations */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('accuracy.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('accuracy.content')}
				</p>
				{Array.isArray(t.raw('accuracy.factors')) &&
					renderList(t.raw('accuracy.factors') as string[])}
			</motion.section>

			{/* Tips */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('tips.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('tips.content')}
				</p>
			</motion.section>

			{/* Online Calculator */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-8 rounded-xl border-2 border-pink-200 dark:border-pink-800'
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
						className='w-8 h-8 text-pink-600 dark:text-pink-400 mr-3'
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
						Часто задаваемые вопросы о беременности и расчёте даты
						родов
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

			{/* Visual Timeline */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					Визуальная шкала беременности по неделям
				</h2>
				<div className='relative'>
					<div className='flex justify-between items-center mb-4'>
						<div className='text-center flex-1'>
							<div className='w-16 h-16 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold'>
								1
							</div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
								0-12 нед
							</p>
							<p className='text-xs text-gray-600 dark:text-gray-400'>
								Первый триместр
							</p>
						</div>
						<div className='flex-1 border-t-4 border-yellow-400'></div>
						<div className='text-center flex-1'>
							<div className='w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold'>
								2
							</div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
								13-26 нед
							</p>
							<p className='text-xs text-gray-600 dark:text-gray-400'>
								Второй триместр
							</p>
						</div>
						<div className='flex-1 border-t-4 border-green-400'></div>
						<div className='text-center flex-1'>
							<div className='w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold'>
								3
							</div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
								27-40 нед
							</p>
							<p className='text-xs text-gray-600 dark:text-gray-400'>
								Третий триместр
							</p>
						</div>
					</div>
				</div>
			</motion.section>
		</motion.div>
	);
}
