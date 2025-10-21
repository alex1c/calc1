'use client';

import { useTranslations } from 'next-intl';

export default function WorldTimeSEO() {
	const t = useTranslations('calculators.worldTime.seo');

	return (
		<div className='prose prose-lg max-w-none'>
			{/* Overview Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-700 mb-4'>{t('overview.content')}</p>
			</section>

			{/* Features Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<div className='bg-blue-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-blue-900 mb-2'>
							{t('features.realTime')}
						</h3>
						<p className='text-blue-800 text-sm'>
							{t('features.realTimeDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-green-900 mb-2'>
							{t('features.multipleCities')}
						</h3>
						<p className='text-green-800 text-sm'>
							{t('features.multipleCitiesDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-purple-900 mb-2'>
							{t('features.timeZones')}
						</h3>
						<p className='text-purple-800 text-sm'>
							{t('features.timeZonesDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-orange-900 mb-2'>
							{t('features.search')}
						</h3>
						<p className='text-orange-800 text-sm'>
							{t('features.searchDesc')}
						</p>
					</div>
					<div className='bg-red-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-red-900 mb-2'>
							{t('features.dst')}
						</h3>
						<p className='text-red-800 text-sm'>
							{t('features.dstDesc')}
						</p>
					</div>
					<div className='bg-indigo-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-indigo-900 mb-2'>
							{t('features.mobile')}
						</h3>
						<p className='text-indigo-800 text-sm'>
							{t('features.mobileDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* Use Cases Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('useCases.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-3'>
							{t('useCases.business')}
						</h3>
						<p className='text-blue-800 mb-3'>
							{t('useCases.businessDesc')}
						</p>
						<ul className='text-blue-700 text-sm space-y-1'>
							<li>• {t('useCases.business1')}</li>
							<li>• {t('useCases.business2')}</li>
							<li>• {t('useCases.business3')}</li>
						</ul>
					</div>

					<div className='bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-3'>
							{t('useCases.travel')}
						</h3>
						<p className='text-green-800 mb-3'>
							{t('useCases.travelDesc')}
						</p>
						<ul className='text-green-700 text-sm space-y-1'>
							<li>• {t('useCases.travel1')}</li>
							<li>• {t('useCases.travel2')}</li>
							<li>• {t('useCases.travel3')}</li>
						</ul>
					</div>

					<div className='bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-3'>
							{t('useCases.communication')}
						</h3>
						<p className='text-purple-800 mb-3'>
							{t('useCases.communicationDesc')}
						</p>
						<ul className='text-purple-700 text-sm space-y-1'>
							<li>• {t('useCases.communication1')}</li>
							<li>• {t('useCases.communication2')}</li>
							<li>• {t('useCases.communication3')}</li>
						</ul>
					</div>

					<div className='bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-3'>
							{t('useCases.events')}
						</h3>
						<p className='text-orange-800 mb-3'>
							{t('useCases.eventsDesc')}
						</p>
						<ul className='text-orange-700 text-sm space-y-1'>
							<li>• {t('useCases.events1')}</li>
							<li>• {t('useCases.events2')}</li>
							<li>• {t('useCases.events3')}</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Popular Cities Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('popularCities.title')}
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
					{[
						{
							name: 'Москва',
							country: 'Россия',
							timezone: 'UTC+3',
						},
						{
							name: 'Лондон',
							country: 'Великобритания',
							timezone: 'UTC+0',
						},
						{ name: 'Нью-Йорк', country: 'США', timezone: 'UTC-5' },
						{ name: 'Токио', country: 'Япония', timezone: 'UTC+9' },
						{
							name: 'Сидней',
							country: 'Австралия',
							timezone: 'UTC+10',
						},
						{
							name: 'Париж',
							country: 'Франция',
							timezone: 'UTC+1',
						},
						{
							name: 'Берлин',
							country: 'Германия',
							timezone: 'UTC+1',
						},
						{ name: 'Пекин', country: 'Китай', timezone: 'UTC+8' },
						{ name: 'Дубай', country: 'ОАЭ', timezone: 'UTC+4' },
						{
							name: 'Лос-Анджелес',
							country: 'США',
							timezone: 'UTC-8',
						},
						{
							name: 'Сингапур',
							country: 'Сингапур',
							timezone: 'UTC+8',
						},
						{
							name: 'Мумбаи',
							country: 'Индия',
							timezone: 'UTC+5:30',
						},
					].map((city, index) => (
						<div
							key={index}
							className='bg-white border border-gray-200 rounded-lg p-3 text-center'
						>
							<h4 className='font-semibold text-gray-900 text-sm'>
								{city.name}
							</h4>
							<p className='text-xs text-gray-600'>
								{city.country}
							</p>
							<p className='text-xs text-blue-600'>
								{city.timezone}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Tips Section */}
			<section className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('tips.title')}
				</h2>
				<div className='space-y-4'>
					<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4'>
						<p className='text-yellow-800'>
							<strong>{t('tips.tip1')}</strong>{' '}
							{t('tips.tip1Desc')}
						</p>
					</div>
					<div className='bg-blue-50 border-l-4 border-blue-400 p-4'>
						<p className='text-blue-800'>
							<strong>{t('tips.tip2')}</strong>{' '}
							{t('tips.tip2Desc')}
						</p>
					</div>
					<div className='bg-green-50 border-l-4 border-green-400 p-4'>
						<p className='text-green-800'>
							<strong>{t('tips.tip3')}</strong>{' '}
							{t('tips.tip3Desc')}
						</p>
					</div>
					<div className='bg-purple-50 border-l-4 border-purple-400 p-4'>
						<p className='text-purple-800'>
							<strong>{t('tips.tip4')}</strong>{' '}
							{t('tips.tip4Desc')}
						</p>
					</div>
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
						<p className='text-gray-700'>{t('faq.answer1')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question2')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer2')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question3')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer3')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question4')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer4')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question5')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer5')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question6')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer6')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question7')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer7')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question8')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer8')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question9')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer9')}</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question10')}
						</h3>
						<p className='text-gray-700'>{t('faq.answer10')}</p>
					</div>
				</div>
			</section>
		</div>
	);
}


