import React from 'react';
import { useTranslations } from 'next-intl';

interface StatisticsSeoProps {
	locale: string;
}

const StatisticsSeo: React.FC<StatisticsSeoProps> = () => {
	const t = useTranslations('calculators.statistics.seo');

	return (
		<div className='mt-12 bg-card p-6 rounded-lg shadow-sm'>
			<h2 className='text-2xl font-semibold mb-4'>
				{t('overview.title')}
			</h2>
			<p className='mb-4 text-gray-700 dark:text-gray-300 leading-relaxed'>
				{t('overview.content')}
			</p>

			{/* Mean Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('mean.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('mean.content')}
				</p>
				<p className='font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-lg text-gray-800 dark:text-gray-200 mb-4'>
					{t('mean.formula')}
				</p>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					<strong>{t('mean.exampleTitle')}:</strong>{' '}
					{t('mean.example')}
				</p>
			</section>

			{/* Median Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('median.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('median.content')}
				</p>
				<p className='font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-lg text-gray-800 dark:text-gray-200 mb-4'>
					{t('median.formula')}
				</p>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					<strong>{t('median.exampleTitle')}:</strong>{' '}
					{t('median.example')}
				</p>
			</section>

			{/* Mode Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('mode.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('mode.content')}
				</p>
				<p className='font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-lg text-gray-800 dark:text-gray-200 mb-4'>
					{t('mode.formula')}
				</p>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					<strong>{t('mode.exampleTitle')}:</strong>{' '}
					{t('mode.example')}
				</p>
			</section>

			{/* Variance Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('variance.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('variance.content')}
				</p>
				<p className='font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-lg text-gray-800 dark:text-gray-200 mb-4'>
					{t('variance.formula')}
				</p>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					<strong>{t('variance.exampleTitle')}:</strong>{' '}
					{t('variance.example')}
				</p>
			</section>

			{/* Standard Deviation Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('standardDeviation.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('standardDeviation.content')}
				</p>
				<p className='font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-lg text-gray-800 dark:text-gray-200 mb-4'>
					{t('standardDeviation.formula')}
				</p>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					<strong>{t('standardDeviation.exampleTitle')}:</strong>{' '}
					{t('standardDeviation.example')}
				</p>
			</section>

			{/* Applications Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('applications.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('applications.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('applications.items'))
						? (t.raw('applications.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
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
										<p className='text-gray-700 dark:text-gray-300'>
											{item}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Advantages Section */}
			<section>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('advantages.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('advantages.items'))
						? (t.raw('advantages.items') as string[]).map(
								(item: string, index: number) => (
									<div
										key={index}
										className='flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
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
										<p className='text-gray-700 dark:text-gray-300'>
											{item}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Online Calculator Info */}
			<section className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl mt-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('onlineCalculator.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
					{t('onlineCalculator.content')}
				</p>
			</section>
		</div>
	);
};

export default StatisticsSeo;
