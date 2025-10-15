'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function PregnancySEO() {
	const t = useTranslations('calculators.pregnancy.seo');

	const renderList = (items: string[]) => (
		<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	);

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
						{t('overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300'>
						{t('overview.content')}
					</p>
				</div>
			</div>

			{/* Calculation Methods */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('methods.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('methods.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* LMP Method */}
						<div className='p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800'>
							<div className='font-semibold text-pink-800 dark:text-pink-300 mb-2'>
								{t('methods.lmp.title')}
							</div>
							<div className='text-sm text-pink-700 dark:text-pink-400 mb-2'>
								{t('methods.lmp.accuracy')}
							</div>
							<div className='text-sm text-pink-600 dark:text-pink-500'>
								{t('methods.lmp.description')}
							</div>
						</div>

						{/* Conception Method */}
						<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
							<div className='font-semibold text-blue-800 dark:text-blue-300 mb-2'>
								{t('methods.conception.title')}
							</div>
							<div className='text-sm text-blue-700 dark:text-blue-400 mb-2'>
								{t('methods.conception.accuracy')}
							</div>
							<div className='text-sm text-blue-600 dark:text-blue-500'>
								{t('methods.conception.description')}
							</div>
						</div>

						{/* IVF Method */}
						<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
							<div className='font-semibold text-green-800 dark:text-green-300 mb-2'>
								{t('methods.ivf.title')}
							</div>
							<div className='text-sm text-green-700 dark:text-green-400 mb-2'>
								{t('methods.ivf.accuracy')}
							</div>
							<div className='text-sm text-green-600 dark:text-green-500'>
								{t('methods.ivf.description')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Pregnancy Timeline */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('timeline.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('timeline.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* First Trimester */}
						<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
							<div className='font-semibold text-red-800 dark:text-red-300 mb-2'>
								{t('timeline.firstTrimester.title')}
							</div>
							<div className='text-sm text-red-700 dark:text-red-400 mb-2'>
								{t('timeline.firstTrimester.weeks')}
							</div>
							<div className='text-sm text-red-600 dark:text-red-500'>
								{t('timeline.firstTrimester.description')}
							</div>
						</div>

						{/* Second Trimester */}
						<div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'>
							<div className='font-semibold text-yellow-800 dark:text-yellow-300 mb-2'>
								{t('timeline.secondTrimester.title')}
							</div>
							<div className='text-sm text-yellow-700 dark:text-yellow-400 mb-2'>
								{t('timeline.secondTrimester.weeks')}
							</div>
							<div className='text-sm text-yellow-600 dark:text-yellow-500'>
								{t('timeline.secondTrimester.description')}
							</div>
						</div>

						{/* Third Trimester */}
						<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
							<div className='font-semibold text-green-800 dark:text-green-300 mb-2'>
								{t('timeline.thirdTrimester.title')}
							</div>
							<div className='text-sm text-green-700 dark:text-green-400 mb-2'>
								{t('timeline.thirdTrimester.weeks')}
							</div>
							<div className='text-sm text-green-600 dark:text-green-500'>
								{t('timeline.thirdTrimester.description')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Accuracy and Limitations */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('accuracy.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('accuracy.content')}
					</p>
					{Array.isArray(t.raw('accuracy.factors')) &&
						renderList(t.raw('accuracy.factors') as string[])}
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('tips.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('tips.content')}
					</p>
					{Array.isArray(t.raw('tips.items')) &&
						renderList(t.raw('tips.items') as string[])}
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{/* FAQ Item 1 */}
					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.howToCalculate.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.howToCalculate.answer')}
						</p>
					</div>

					{/* FAQ Item 2 */}
					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.accuracy.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.accuracy.answer')}
						</p>
					</div>

					{/* FAQ Item 3 */}
					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.factors.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.factors.answer')}
						</p>
					</div>

					{/* FAQ Item 4 */}
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.ivf.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.ivf.answer')}
						</p>
					</div>
				</div>
			</div>

			{/* Online Calculator */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('onlineCalculator.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300'>
						{t('onlineCalculator.content')}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
