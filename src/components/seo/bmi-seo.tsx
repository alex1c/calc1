'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function BMISEO() {
	const t = useTranslations('calculators.bmi.seo');

	const renderList = (items: string[]) => (
		<ul className='list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300'>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
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
			{/* Overview */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
					{t('overview.content')}
				</p>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
					{t('overview.additionalContent')}
				</p>

				{/* Calculation Examples */}
				<div className='mt-8'>
					<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
						{t('overview.calculationExamples.title')}
					</h3>
					<p className='text-gray-700 dark:text-gray-300 mb-6'>
						{t('overview.calculationExamples.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 6 }, (_, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6'
							>
								<h4 className='font-semibold text-blue-900 dark:text-blue-200 mb-2'>
									{t(
										`overview.calculationExamples.example${
											i + 1
										}.title`
									)}
								</h4>
								<p className='text-sm text-gray-700 dark:text-gray-300 mb-3'>
									{t(
										`overview.calculationExamples.example${
											i + 1
										}.description`
									)}
								</p>
								<div className='bg-white dark:bg-gray-700 rounded p-3 mb-3'>
									<code className='text-sm text-blue-800 dark:text-blue-300 font-mono'>
										{t(
											`overview.calculationExamples.example${
												i + 1
											}.calculation`
										)}
									</code>
								</div>
								<p className='text-sm font-semibold text-green-700 dark:text-green-400 mb-1'>
									{t(
										`overview.calculationExamples.example${
											i + 1
										}.result`
									)}
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									{t(
										`overview.calculationExamples.example${
											i + 1
										}.category`
									)}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* BMI Calculation Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('calculation.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					{t('calculation.content')}
				</p>
				<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4'>
					<code className='text-sm text-gray-800 dark:text-gray-200 font-mono'>
						ИМТ = Вес (кг) / Рост² (м²)
					</code>
				</div>
				{Array.isArray(t.raw('calculation.steps')) &&
					renderList(t.raw('calculation.steps') as string[])}
			</motion.section>

			{/* BMI Categories Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('categories.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					{t('categories.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{/* Underweight */}
					<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
						<div className='font-semibold text-blue-800 dark:text-blue-300'>
							{t('categories.underweight.title')}
						</div>
						<div className='text-sm text-blue-700 dark:text-blue-400'>
							ИМТ &lt; 18.5
						</div>
						<div className='text-sm text-blue-600 dark:text-blue-500 mt-1'>
							{t('categories.underweight.description')}
						</div>
					</div>

					{/* Normal */}
					<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
						<div className='font-semibold text-green-800 dark:text-green-300'>
							{t('categories.normal.title')}
						</div>
						<div className='text-sm text-green-700 dark:text-green-400'>
							ИМТ 18.5-24.9
						</div>
						<div className='text-sm text-green-600 dark:text-green-500 mt-1'>
							{t('categories.normal.description')}
						</div>
					</div>

					{/* Overweight */}
					<div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'>
						<div className='font-semibold text-yellow-800 dark:text-yellow-300'>
							{t('categories.overweight.title')}
						</div>
						<div className='text-sm text-yellow-700 dark:text-yellow-400'>
							ИМТ 25-29.9
						</div>
						<div className='text-sm text-yellow-600 dark:text-yellow-500 mt-1'>
							{t('categories.overweight.description')}
						</div>
					</div>

					{/* Obesity */}
					<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<div className='font-semibold text-red-800 dark:text-red-300'>
							{t('categories.obesity.title')}
						</div>
						<div className='text-sm text-red-700 dark:text-red-400'>
							ИМТ ≥ 30
						</div>
						<div className='text-sm text-red-600 dark:text-red-500 mt-1'>
							{t('categories.obesity.description')}
						</div>
					</div>
				</div>
			</motion.section>

			{/* Health Implications Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('healthImplications.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					{t('healthImplications.content')}
				</p>
				{Array.isArray(t.raw('healthImplications.items')) &&
					renderList(t.raw('healthImplications.items') as string[])}
			</motion.section>

			{/* Limitations Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('limitations.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					{t('limitations.content')}
				</p>
				{Array.isArray(t.raw('limitations.items')) &&
					renderList(t.raw('limitations.items') as string[])}
			</motion.section>

			{/* Online Calculator Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('onlineCalculator.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300'>
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
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Часто задаваемые вопросы об индексе массы тела
				</h2>
				<div className='space-y-4'>
					{faqItems.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05 }}
							className='bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-700 dark:text-gray-300'>
								{faq.a}
							</p>
						</motion.div>
					))}
				</div>
			</motion.section>
		</motion.div>
	);
}
