'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function PaperWeightSEO() {
	const t = useTranslations('calculators.paper-weight.seo');

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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Density Method */}
						<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('methods.density.title')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								{t('methods.density.description')}
							</p>
						</div>
						{/* Area Method */}
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('methods.area.title')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								{t('methods.area.description')}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Paper Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('paperTypes.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('paperTypes.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Office Paper */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('paperTypes.office.title')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
								{t('paperTypes.office.description')}
							</p>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{t('paperTypes.office.weight')}
							</div>
						</div>
						{/* Cardstock */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('paperTypes.cardstock.title')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
								{t('paperTypes.cardstock.description')}
							</p>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{t('paperTypes.cardstock.weight')}
							</div>
						</div>
						{/* Photo Paper */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('paperTypes.photo.title')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
								{t('paperTypes.photo.description')}
							</p>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{t('paperTypes.photo.weight')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Applications */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('applications.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('applications.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Professional Use */}
						<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
								{t('applications.professional.title')}
							</h3>
							{renderList([
								t('applications.professional.printing'),
								t('applications.professional.packaging'),
								t('applications.professional.publishing'),
								t('applications.professional.manufacturing'),
							])}
						</div>
						{/* Personal Use */}
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
								{t('applications.personal.title')}
							</h3>
							{renderList([
								t('applications.personal.crafts'),
								t('applications.personal.art'),
								t('applications.personal.education'),
								t('applications.personal.hobbies'),
							])}
						</div>
					</div>
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
					{renderList([
						t('tips.measurement'),
						t('tips.accuracy'),
						t('tips.calculation'),
						t('tips.verification'),
					])}
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
					<div className='border-l-4 border-blue-500 pl-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.howToCalculate.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.howToCalculate.answer')}
						</p>
					</div>
					{/* FAQ Item 2 */}
					<div className='border-l-4 border-green-500 pl-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.accuracy.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.accuracy.answer')}
						</p>
					</div>
					{/* FAQ Item 3 */}
					<div className='border-l-4 border-purple-500 pl-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.formats.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.formats.answer')}
						</p>
					</div>
					{/* FAQ Item 4 */}
					<div className='border-l-4 border-orange-500 pl-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.applications.question')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('faq.applications.answer')}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
