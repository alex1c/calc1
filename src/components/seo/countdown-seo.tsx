'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, Target, Calendar } from 'lucide-react';

export default function CountdownSEO() {
	const t = useTranslations('calculators.countdown');

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
											<Calendar className='w-5 h-5 text-green-600 dark:text-green-400' />
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
												Данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
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
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Тип:
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

			{/* Features */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('seo.features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.features.countdown')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.features.countdownDesc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.features.visual')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.features.visualDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.features.sound')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.features.soundDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.features.presets')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200'>
							{t('seo.features.presetsDesc')}
						</p>
					</div>
					<div className='bg-red-50 dark:bg-red-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2'>
							{t('seo.features.mobile')}
						</h3>
						<p className='text-red-800 dark:text-red-200'>
							{t('seo.features.mobileDesc')}
						</p>
					</div>
					<div className='bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2'>
							{t('seo.features.export')}
						</h3>
						<p className='text-indigo-800 dark:text-indigo-200'>
							{t('seo.features.exportDesc')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* Use Cases */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('seo.useCases.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3'>
							{t('seo.useCases.events')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200 mb-3'>
							{t('seo.useCases.eventsDesc')}
						</p>
						<ul className='text-blue-700 dark:text-blue-300 text-sm space-y-1'>
							<li>• {t('seo.useCases.events1')}</li>
							<li>• {t('seo.useCases.events2')}</li>
							<li>• {t('seo.useCases.events3')}</li>
						</ul>
					</div>

					<div className='bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-3'>
							{t('seo.useCases.deadlines')}
						</h3>
						<p className='text-green-800 dark:text-green-200 mb-3'>
							{t('seo.useCases.deadlinesDesc')}
						</p>
						<ul className='text-green-700 dark:text-green-300 text-sm space-y-1'>
							<li>• {t('seo.useCases.deadlines1')}</li>
							<li>• {t('seo.useCases.deadlines2')}</li>
							<li>• {t('seo.useCases.deadlines3')}</li>
						</ul>
					</div>

					<div className='bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3'>
							{t('seo.useCases.personal')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200 mb-3'>
							{t('seo.useCases.personalDesc')}
						</p>
						<ul className='text-purple-700 dark:text-purple-300 text-sm space-y-1'>
							<li>• {t('seo.useCases.personal1')}</li>
							<li>• {t('seo.useCases.personal2')}</li>
							<li>• {t('seo.useCases.personal3')}</li>
						</ul>
					</div>

					<div className='bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3'>
							{t('seo.useCases.business')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200 mb-3'>
							{t('seo.useCases.businessDesc')}
						</p>
						<ul className='text-orange-700 dark:text-orange-300 text-sm space-y-1'>
							<li>• {t('seo.useCases.business1')}</li>
							<li>• {t('seo.useCases.business2')}</li>
							<li>• {t('seo.useCases.business3')}</li>
						</ul>
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
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							{t('seo.tips.tip1')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200'>
							{t('seo.tips.tip1Desc')}
						</p>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.tips.tip2')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200'>
							{t('seo.tips.tip2Desc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.tips.tip3')}
						</h3>
						<p className='text-green-800 dark:text-green-200'>
							{t('seo.tips.tip3Desc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.tips.tip4')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200'>
							{t('seo.tips.tip4Desc')}
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
							className='border-l-4 border-green-500 pl-4'
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
