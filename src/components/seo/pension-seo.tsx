'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Calculator,
	TrendingUp,
	Calendar,
	Percent,
	BarChart3,
	Target,
} from 'lucide-react';

export default function PensionSEO() {
	const t = useTranslations('calculators.pension');
	const tSeo = useTranslations('calculators.pension.seo');

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
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('seo.overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.overview.content')}
					</p>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('seo.overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
							{t('seo.overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{t('seo.overview.calculationExamples.content')}
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
											<Calculator className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												{tSeo('calculation.exampleLabels.input')}
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												{tSeo('calculation.exampleLabels.calculation')}
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													{tSeo('calculation.exampleLabels.result')}
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													{tSeo('calculation.exampleLabels.type')}
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.note`
											)}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Calculation Methods */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.calculation.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.calculation.content')}
					</p>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							{tSeo('calculation.formulasTitle')}
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200 text-sm'>
							<li>
								<strong>{t('seo.calculation.formula')}</strong>
							</li>
							<li>{t('seo.calculation.ipk')}</li>
							<li>{t('seo.calculation.fixedPayment')}</li>
							<li>{t('seo.calculation.pointValue')}</li>
							<li>{t('seo.calculation.minimumRequirements')}</li>
						</ul>
					</div>
					<div className='mt-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{tSeo('calculation.stepsTitle')}
						</h3>
						<ul className='space-y-2 text-gray-700 dark:text-gray-300 text-sm'>
							<li>1. {t('seo.calculation.steps.experience')}</li>
							<li>2. {t('seo.calculation.steps.points')}</li>
							<li>3. {t('seo.calculation.steps.pension')}</li>
							<li>4. {t('seo.calculation.steps.analysis')}</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Features */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('features.pensionCalculation')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('features.pensionCalculationDesc')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('features.pointsAnalysis')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('features.pointsAnalysisDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('features.experiencePlanning')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('features.experiencePlanningDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('features.accuracy')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('features.accuracyDesc')}
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
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.accuracy')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.advantages.accuracyDesc')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.planning')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.advantages.planningDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.analysis')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.advantages.analysisDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.advantages.convenience')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.advantages.convenienceDesc')}
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
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('seo.tips.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 dark:text-gray-300 mb-6 max-w-none'>
					<p>{t('seo.tips.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.tips.sections.experience.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.tips.experience')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.tips.sections.salary.title')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.tips.salary')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.tips.sections.points.title')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.tips.points')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.tips.sections.indexation.title')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.tips.indexation')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, idx) => (
						<div
							key={idx}
							className={`border-l-4 ${
								borderColors[idx % borderColors.length]
							} pl-4`}
						>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{item.q}
							</h3>
							<p className='text-gray-700 dark:text-gray-300'>{item.a}</p>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}

