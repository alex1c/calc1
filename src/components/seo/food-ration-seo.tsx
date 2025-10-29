'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Apple,
	Calculator,
	TrendingUp,
	TrendingDown,
	Minus,
	Target,
} from 'lucide-react';

export default function FoodRationSEO() {
	const t = useTranslations('calculators.foodRation.seo');

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
											? 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800'
											: isWeightGain
											? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
											: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
									}`}
								>
									<div className='flex items-center mb-3'>
										{isWeightLoss ? (
											<TrendingDown className='w-6 h-6 text-orange-600 dark:text-orange-400 mr-2' />
										) : isWeightGain ? (
											<TrendingUp className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
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
									<div className='space-y-2 mb-4'>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												BMR:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.bmr`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												TDEE:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.tdee`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Калории:
											</p>
											<code className='text-xs text-purple-800 dark:text-purple-300 font-mono'>
												{t(
													`overview.calculationExamples.example${exampleNum}.calories`
												)}
											</code>
										</div>
									</div>
									<div className='grid grid-cols-3 gap-2 mb-4'>
										<div className='bg-blue-100 dark:bg-blue-900/30 rounded p-2'>
											<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
												Белки:
											</p>
											<code className='text-xs text-blue-900 dark:text-blue-200 font-mono'>
												{t(
													`overview.calculationExamples.example${exampleNum}.protein`
												)}
											</code>
										</div>
										<div className='bg-red-100 dark:bg-red-900/30 rounded p-2'>
											<p className='text-xs font-semibold text-red-800 dark:text-red-300 mb-1'>
												Жиры:
											</p>
											<code className='text-xs text-red-900 dark:text-red-200 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.fat`
												)}
											</code>
										</div>
										<div className='bg-green-100 dark:bg-green-900/30 rounded p-2'>
											<p className='text-xs font-semibold text-green-800 dark:text-green-300 mb-1'>
												Углеводы:
											</p>
											<code className='text-xs text-green-900 dark:text-green-200 font-mono break-all'>
												{t(
													`overview.calculationExamples.example${exampleNum}.carbs`
												)}
											</code>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
										<p
											className={`text-sm font-bold text-center ${
												isWeightLoss
													? 'text-orange-700 dark:text-orange-400'
													: isWeightGain
													? 'text-blue-700 dark:text-blue-400'
													: 'text-green-700 dark:text-green-400'
											}`}
										>
											{t(
												`overview.calculationExamples.example${exampleNum}.result`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.section>

			{/* BJU Calculation Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Calculator className='w-8 h-8 text-emerald-600 dark:text-emerald-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('calculation.title')}
					</h2>
				</div>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('calculation.content')}
				</p>
				<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4'>
					<code className='text-sm text-gray-800 dark:text-gray-200 font-mono'>
						{t('calculation.formula')}
					</code>
				</div>
				{Array.isArray(t.raw('calculation.steps')) &&
					renderList(t.raw('calculation.steps') as string[])}
			</motion.section>

			{/* Macronutrients Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('macronutrients.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('macronutrients.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{/* Protein */}
					<div className='p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-2 border-blue-200 dark:border-blue-800'>
						<div className='flex items-center mb-2'>
							<Apple className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
							<div className='font-semibold text-blue-800 dark:text-blue-300'>
								{t('macronutrients.protein.title')}
							</div>
						</div>
						<div className='text-sm text-blue-700 dark:text-blue-400 mb-2 font-semibold'>
							{t('macronutrients.protein.amount')}
						</div>
						<div className='text-sm text-blue-600 dark:text-blue-500 leading-relaxed'>
							{t('macronutrients.protein.description')}
						</div>
					</div>

					{/* Fat */}
					<div className='p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border-2 border-red-200 dark:border-red-800'>
						<div className='flex items-center mb-2'>
							<Target className='w-6 h-6 text-red-600 dark:text-red-400 mr-2' />
							<div className='font-semibold text-red-800 dark:text-red-300'>
								{t('macronutrients.fat.title')}
							</div>
						</div>
						<div className='text-sm text-red-700 dark:text-red-400 mb-2 font-semibold'>
							{t('macronutrients.fat.amount')}
						</div>
						<div className='text-sm text-red-600 dark:text-red-500 leading-relaxed'>
							{t('macronutrients.fat.description')}
						</div>
					</div>

					{/* Carbs */}
					<div className='p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-2 border-green-200 dark:border-green-800'>
						<div className='flex items-center mb-2'>
							<Calculator className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
							<div className='font-semibold text-green-800 dark:text-green-300'>
								{t('macronutrients.carbs.title')}
							</div>
						</div>
						<div className='text-sm text-green-700 dark:text-green-400 mb-2 font-semibold'>
							{t('macronutrients.carbs.amount')}
						</div>
						<div className='text-sm text-green-600 dark:text-green-500 leading-relaxed'>
							{t('macronutrients.carbs.description')}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Activity Levels Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('activityLevels.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('activityLevels.content')}
				</p>
				{Array.isArray(t.raw('activityLevels.levels')) &&
					renderList(t.raw('activityLevels.levels') as string[])}
			</motion.section>

			{/* Goals Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('goals.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('goals.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{/* Weight Loss */}
					<div className='p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border-2 border-orange-200 dark:border-orange-800'>
						<div className='flex items-center mb-2'>
							<TrendingDown className='w-6 h-6 text-orange-600 dark:text-orange-400 mr-2' />
							<div className='font-semibold text-orange-800 dark:text-orange-300'>
								{t('goals.lose.title')}
							</div>
						</div>
						<div className='text-sm text-orange-700 dark:text-orange-400 mb-2 font-semibold'>
							{t('goals.lose.calorieDeficit')}
						</div>
						<div className='text-sm text-orange-600 dark:text-orange-500 leading-relaxed'>
							{t('goals.lose.description')}
						</div>
					</div>

					{/* Maintenance */}
					<div className='p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-2 border-green-200 dark:border-green-800'>
						<div className='flex items-center mb-2'>
							<Minus className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
							<div className='font-semibold text-green-800 dark:text-green-300'>
								{t('goals.maintain.title')}
							</div>
						</div>
						<div className='text-sm text-green-700 dark:text-green-400 mb-2 font-semibold'>
							{t('goals.maintain.calorieBalance')}
						</div>
						<div className='text-sm text-green-600 dark:text-green-500 leading-relaxed'>
							{t('goals.maintain.description')}
						</div>
					</div>

					{/* Weight Gain */}
					<div className='p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-2 border-blue-200 dark:border-blue-800'>
						<div className='flex items-center mb-2'>
							<TrendingUp className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
							<div className='font-semibold text-blue-800 dark:text-blue-300'>
								{t('goals.gain.title')}
							</div>
						</div>
						<div className='text-sm text-blue-700 dark:text-blue-400 mb-2 font-semibold'>
							{t('goals.gain.calorieSurplus')}
						</div>
						<div className='text-sm text-blue-600 dark:text-blue-500 leading-relaxed'>
							{t('goals.gain.description')}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Health Benefits Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('healthBenefits.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('healthBenefits.content')}
				</p>
				{Array.isArray(t.raw('healthBenefits.items')) &&
					renderList(t.raw('healthBenefits.items') as string[])}
			</motion.section>

			{/* Tips Section */}
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
				{Array.isArray(t.raw('tips.items')) &&
					renderList(t.raw('tips.items') as string[])}
			</motion.section>

			{/* Online Calculator Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800'
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
						className='w-8 h-8 text-emerald-600 dark:text-emerald-400 mr-3'
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
						Часто задаваемые вопросы о БЖУ и макронутриентах
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
							className='bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-700 dark:to-emerald-900/20 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow'
						>
							<div className='flex items-start gap-3'>
								<div className='flex-shrink-0 w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
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

			{/* Visual Info Graphics Section - БЖУ Distribution */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					Типичное распределение БЖУ для разных целей
				</h2>
				<div className='grid md:grid-cols-3 gap-6'>
					{[
						{
							goal: 'Похудение',
							protein: '30-40%',
							fat: '20-30%',
							carbs: '30-50%',
							color: 'orange',
							icon: TrendingDown,
						},
						{
							goal: 'Поддержание',
							protein: '25-30%',
							fat: '25-30%',
							carbs: '40-50%',
							color: 'green',
							icon: Minus,
						},
						{
							goal: 'Набор массы',
							protein: '25-30%',
							fat: '20-25%',
							carbs: '45-55%',
							color: 'blue',
							icon: TrendingUp,
						},
					].map((goalData, idx) => {
						const Icon = goalData.icon;
						return (
							<div
								key={idx}
								className={`bg-gradient-to-br rounded-lg p-6 border-2 text-center ${
									goalData.color === 'orange'
										? 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-300 dark:border-orange-700'
										: goalData.color === 'green'
										? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-300 dark:border-green-700'
										: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-300 dark:border-blue-700'
								}`}
							>
								<Icon
									className={`w-8 h-8 mx-auto mb-3 ${
										goalData.color === 'orange'
											? 'text-orange-600 dark:text-orange-400'
											: goalData.color === 'green'
											? 'text-green-600 dark:text-green-400'
											: 'text-blue-600 dark:text-blue-400'
									}`}
								/>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
									{goalData.goal}
								</h3>
								<div className='space-y-2'>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-gray-700 dark:text-gray-300'>
											Белки:
										</span>
										<span
											className={`font-semibold ${
												goalData.color === 'orange'
													? 'text-orange-700 dark:text-orange-400'
													: goalData.color === 'green'
													? 'text-green-700 dark:text-green-400'
													: 'text-blue-700 dark:text-blue-400'
											}`}
										>
											{goalData.protein}
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-gray-700 dark:text-gray-300'>
											Жиры:
										</span>
										<span
											className={`font-semibold ${
												goalData.color === 'orange'
													? 'text-orange-700 dark:text-orange-400'
													: goalData.color === 'green'
													? 'text-green-700 dark:text-green-400'
													: 'text-blue-700 dark:text-blue-400'
											}`}
										>
											{goalData.fat}
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-gray-700 dark:text-gray-300'>
											Углеводы:
										</span>
										<span
											className={`font-semibold ${
												goalData.color === 'orange'
													? 'text-orange-700 dark:text-orange-400'
													: goalData.color === 'green'
													? 'text-green-700 dark:text-green-400'
													: 'text-blue-700 dark:text-blue-400'
											}`}
										>
											{goalData.carbs}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</motion.section>
		</motion.div>
	);
}
