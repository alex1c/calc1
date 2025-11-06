'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home, Building2, Ruler, Package, Layers } from 'lucide-react';

export default function WallpaperSEO() {
	const t = useTranslations('calculators.wallpaper');

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
											<Home className='w-5 h-5 text-purple-600 dark:text-purple-400' />
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
												{t('seo.calculation.exampleLabels.input')}
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												{t('seo.calculation.exampleLabels.calculation')}
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
													{t('seo.calculation.exampleLabels.result')}
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													{t('seo.calculation.exampleLabels.type')}
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
							{t('seo.calculation.formulasTitle')}
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200 text-sm'>
							<li>
								<strong>{t('seo.calculation.area')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.openings')}</strong>
							</li>
							<li>
								<strong>{t('seo.calculation.rolls')}</strong>
							</li>
						</ul>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
						<div className='space-y-3'>
							<div className='flex items-start'>
								<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
									1
								</span>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('seo.calculation.steps.area')}
								</p>
							</div>
							<div className='flex items-start'>
								<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
									2
								</span>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('seo.calculation.steps.openings')}
								</p>
							</div>
							<div className='flex items-start'>
								<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
									3
								</span>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('seo.calculation.steps.useful')}
								</p>
							</div>
						</div>
						<div className='space-y-3'>
							<div className='flex items-start'>
								<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
									4
								</span>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('seo.calculation.steps.rolls')}
								</p>
							</div>
							<div className='flex items-start'>
								<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
									5
								</span>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('seo.calculation.steps.reserve')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Visual Chart: Wallpaper Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.wallpaperTypes.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.wallpaperTypes.description')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						{[
							{
								key: 'vinyl',
								icon: Layers,
							},
							{
								key: 'nonWoven',
								icon: Layers,
							},
							{
								key: 'paper',
								icon: Layers,
							},
							{
								key: 'textile',
								icon: Layers,
							},
						].map((item, idx) => {
							const Icon = item.icon;
							const typeData = t.raw(`seo.wallpaperTypes.types.${item.key}`);
							return (
								<div
									key={idx}
									className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center border-2 border-purple-200 dark:border-purple-800'
								>
									<Icon className='w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{typeData.name}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										{typeData.size}
									</p>
									<div className='text-xs text-gray-600 dark:text-gray-400'>
										{typeData.description}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Visual Chart: Standard Roll Sizes */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.standardSizes.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.standardSizes.description')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
						{[
							{ key: 'standard' },
							{ key: 'wide' },
							{ key: 'veryWide' },
							{ key: 'long' },
							{ key: 'wideLong' },
						].map((item, idx) => {
							const sizeData = t.raw(`seo.standardSizes.sizes.${item.key}`);
							return (
								<div
									key={idx}
									className='bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg text-center border-2 border-pink-200 dark:border-pink-800'
								>
									<Ruler className='w-8 h-8 text-pink-600 dark:text-pink-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{sizeData.size}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										{sizeData.area}
									</p>
									<div className='text-xs text-gray-600 dark:text-gray-400'>
										{sizeData.description}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

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
					<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.accuracy')}
						</h3>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.savings')}
						</h3>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.planning')}
						</h3>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.advantages.convenience')}
						</h3>
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
					<ul className='space-y-2'>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.tips.measurement')}
							</span>
						</li>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.tips.pattern')}
							</span>
						</li>
					</ul>
					<ul className='space-y-2'>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.tips.reserve')}
							</span>
						</li>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.tips.quality')}
							</span>
						</li>
					</ul>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4'>
							{t('seo.tips.measurementDetails.title')}
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200'>
							<li>
								• {t('seo.tips.measurementDetails.accuracy')}
							</li>
							<li>
								• {t('seo.tips.measurementDetails.openings')}
							</li>
							<li>
								• {t('seo.tips.measurementDetails.recheck')}
							</li>
						</ul>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4'>
							{t('seo.tips.patternDetails.title')}
						</h3>
						<ul className='space-y-2 text-blue-800 dark:text-blue-200'>
							<li>• {t('seo.tips.patternDetails.rapport')}</li>
							<li>• {t('seo.tips.patternDetails.matching')}</li>
							<li>• {t('seo.tips.patternDetails.reserve')}</li>
						</ul>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-4'>
							{t('seo.tips.installation.title')}
						</h3>
						<ul className='space-y-2 text-green-800 dark:text-green-200'>
							<li>• {t('seo.tips.installation.preparation')}</li>
							<li>• {t('seo.tips.installation.quality')}</li>
							<li>• {t('seo.tips.installation.tools')}</li>
						</ul>
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
							} bg-gray-50 dark:bg-gray-700 p-4 rounded-r-lg`}
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
