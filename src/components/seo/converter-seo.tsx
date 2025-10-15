import React from 'react';
import { useTranslations } from 'next-intl';

interface ConverterSeoProps {
	locale: string;
}

const ConverterSeo: React.FC<ConverterSeoProps> = () => {
	const t = useTranslations('calculators.converter.seo');

	return (
		<div className='mt-12 bg-card p-6 rounded-lg shadow-sm'>
			<h2 className='text-2xl font-semibold mb-4'>
				{t('overview.title')}
			</h2>
			<p className='mb-4 text-gray-700 dark:text-gray-300 leading-relaxed'>
				{t('overview.content')}
			</p>

			{/* Length Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('length.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('length.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('length.units'))
						? (t.raw('length.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Mass Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('mass.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('mass.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('mass.units'))
						? (t.raw('mass.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-green-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Time Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('time.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('time.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('time.units'))
						? (t.raw('time.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-purple-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
			</section>

			{/* Volume Section */}
			<section className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('volume.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('volume.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					{Array.isArray(t.raw('volume.units'))
						? (t.raw('volume.units') as string[]).map(
								(unit: string, index: number) => (
									<div
										key={index}
										className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
									>
										<div className='w-2 h-2 bg-cyan-500 rounded-full'></div>
										<p className='text-gray-700 dark:text-gray-300'>
											{unit}
										</p>
									</div>
								)
						  )
						: null}
				</div>
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

			{/* Online Converter Info */}
			<section className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl mt-8'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('onlineConverter.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
					{t('onlineConverter.content')}
				</p>
			</section>
		</div>
	);
};

export default ConverterSeo;
