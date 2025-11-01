'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, RotateCcw, Calculator } from 'lucide-react';

export default function AngleSEO() {
	const t = useTranslations('calculators.angle-converter');

	const borderColors = [
		'border-blue-500',
		'border-green-500',
		'border-purple-500',
		'border-orange-500',
		'border-red-500',
		'border-indigo-500',
	];

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`seo.faqItems.${i}.q`),
		a: t(`seo.faqItems.${i}.a`),
	}));

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='space-y-10'
		>
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('seo.overview.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
					{t('seo.overview.content')}
				</p>
				<p className='text-lg text-gray-700 dark:text-gray-300'>
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
										<Target className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
											Входные данные:
										</p>
										<code className='text-xs text-blue-800 dark:text-blue-300 font-mono'>
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
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Calculation Methods */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('seo.calculation.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					{t('seo.calculation.content')}
				</p>
			</div>

			{/* Units */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('seo.units.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-4'>
					{t('seo.units.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
					{[
						{ unit: 'deg', icon: RotateCcw, color: 'blue' },
						{ unit: 'rad', icon: Calculator, color: 'green' },
						{ unit: 'rev', icon: Target, color: 'purple' },
					].map((item, idx) => {
						const Icon = item.icon;
						const colorClasses = {
							blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
							green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
							purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
						};
						return (
							<div
								key={idx}
								className={`p-4 rounded-lg text-center border-2 ${colorClasses[item.color as keyof typeof colorClasses]}`}
							>
								<Icon className='w-8 h-8 mx-auto mb-2' />
								<h3 className='text-lg font-semibold mb-2'>
									{t(`units.${item.unit}`)}
								</h3>
							</div>
						);
					})}
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('seo.advantages.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 mb-6'>
					{t('seo.advantages.content')}
				</p>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('seo.faq.title')}
				</h2>
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

