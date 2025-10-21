'use client';

import { useTranslations } from 'next-intl';

export default function CalendarSEO() {
	const t = useTranslations('calculators.calendar.seo');

	return (
		<div className='prose prose-lg max-w-none'>
			{/* Overview Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-700 mb-4'>
					{t('overview.content')}
				</p>
			</section>

			{/* Features Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<div className='bg-blue-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-blue-900 mb-2'>
							{t('features.events')}
						</h3>
						<p className='text-blue-800 text-sm'>
							{t('features.eventsDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-green-900 mb-2'>
							{t('features.export')}
						</h3>
						<p className='text-green-800 text-sm'>
							{t('features.exportDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-purple-900 mb-2'>
							{t('features.mobile')}
						</h3>
						<p className='text-purple-800 text-sm'>
							{t('features.mobileDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-orange-900 mb-2'>
							{t('features.holidays')}
						</h3>
						<p className='text-orange-800 text-sm'>
							{t('features.holidaysDesc')}
						</p>
					</div>
					<div className='bg-red-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-red-900 mb-2'>
							{t('features.notes')}
						</h3>
						<p className='text-red-800 text-sm'>
							{t('features.notesDesc')}
						</p>
					</div>
					<div className='bg-indigo-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-indigo-900 mb-2'>
							{t('features.navigation')}
						</h3>
						<p className='text-indigo-800 text-sm'>
							{t('features.navigationDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* Tips Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('tips.title')}
				</h2>
				<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4'>
					<p className='text-yellow-800'>
						<strong>{t('tips.tip1')}</strong> {t('tips.tip1Desc')}
					</p>
				</div>
				<div className='bg-blue-50 border-l-4 border-blue-400 p-4 mb-4'>
					<p className='text-blue-800'>
						<strong>{t('tips.tip2')}</strong> {t('tips.tip2Desc')}
					</p>
				</div>
				<div className='bg-green-50 border-l-4 border-green-400 p-4'>
					<p className='text-green-800'>
						<strong>{t('tips.tip3')}</strong> {t('tips.tip3Desc')}
					</p>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('faq.title')}
				</h2>
				<div className='space-y-4'>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question1')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer1')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question2')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer2')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question3')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer3')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question4')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer4')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question5')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer5')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}


