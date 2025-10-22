'use client';

import { useTranslations } from 'next-intl';

export default function WaterUsageSEO() {
	const t = useTranslations('calculators.waterUsage.seo');

	return (
		<div className='mt-12 space-y-8'>
			{/* Overview */}
			<section className='bg-white p-6 rounded-lg shadow-sm'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-700 leading-relaxed'>
					{t('overview.content')}
				</p>
			</section>

			{/* Calculation Methods */}
			<section className='bg-white p-6 rounded-lg shadow-sm'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('calculation.title')}
				</h2>
				<p className='text-gray-700 mb-4'>{t('calculation.content')}</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='bg-blue-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-blue-900 mb-2'>
							{t('calculation.residential')}
						</h3>
						<p className='text-blue-800 text-sm'>
							Жилые помещения: 200-300 л/чел/день
						</p>
					</div>
					<div className='bg-green-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-green-900 mb-2'>
							{t('calculation.office')}
						</h3>
						<p className='text-green-800 text-sm'>
							Офисы: 50-100 л/чел/день
						</p>
					</div>
					<div className='bg-orange-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-orange-900 mb-2'>
							{t('calculation.construction')}
						</h3>
						<p className='text-orange-800 text-sm'>
							Строительство: 500-1000 л/день на объект
						</p>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className='bg-white p-6 rounded-lg shadow-sm'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('features.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-3'>
						<div className='flex items-start'>
							<span className='text-blue-500 mr-2'>•</span>
							<span className='text-gray-700'>
								{t('features.daily')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-blue-500 mr-2'>•</span>
							<span className='text-gray-700'>
								{t('features.scenarios')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-blue-500 mr-2'>•</span>
							<span className='text-gray-700'>
								{t('features.devices')}
							</span>
						</div>
					</div>
					<div className='space-y-3'>
						<div className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span className='text-gray-700'>
								{t('features.losses')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span className='text-gray-700'>
								{t('features.conversion')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span className='text-gray-700'>
								{t('features.visualization')}
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages */}
			<section className='bg-white p-6 rounded-lg shadow-sm'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('advantages.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-blue-900 mb-2'>
							{t('advantages.accurate')}
						</h3>
						<p className='text-blue-800 text-sm'>
							{t('advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-green-900 mb-2'>
							{t('advantages.flexible')}
						</h3>
						<p className='text-green-800 text-sm'>
							{t('advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-purple-900 mb-2'>
							{t('advantages.comprehensive')}
						</h3>
						<p className='text-purple-800 text-sm'>
							{t('advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-orange-900 mb-2'>
							{t('advantages.export')}
						</h3>
						<p className='text-orange-800 text-sm'>
							{t('advantages.exportDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* Water Saving Tips */}
			<section className='bg-white p-6 rounded-lg shadow-sm'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('tips.title')}
				</h2>
				<p className='text-gray-700 mb-4'>{t('tips.content')}</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-3'>
						<h3 className='font-semibold text-gray-900'>
							{t('tips.equipment.title')}
						</h3>
						<ul className='space-y-2 text-gray-700'>
							<li className='flex items-start'>
								<span className='text-blue-500 mr-2'>•</span>
								{t('tips.equipment.faucets')}
							</li>
							<li className='flex items-start'>
								<span className='text-blue-500 mr-2'>•</span>
								{t('tips.equipment.toilets')}
							</li>
							<li className='flex items-start'>
								<span className='text-blue-500 mr-2'>•</span>
								{t('tips.equipment.showerheads')}
							</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<h3 className='font-semibold text-gray-900'>
							{t('tips.habits.title')}
						</h3>
						<ul className='space-y-2 text-gray-700'>
							<li className='flex items-start'>
								<span className='text-green-500 mr-2'>•</span>
								{t('tips.habits.timing')}
							</li>
							<li className='flex items-start'>
								<span className='text-green-500 mr-2'>•</span>
								{t('tips.habits.repair')}
							</li>
							<li className='flex items-start'>
								<span className='text-green-500 mr-2'>•</span>
								{t('tips.habits.collection')}
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className='bg-white p-6 rounded-lg shadow-sm'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-4'>
					{t
						.raw('faq.faqItems')
						.map((faq: { q: string; a: string }, index: number) => (
							<div
								key={index}
								className='border-l-4 border-blue-500 pl-4'
							>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									{faq.q}
								</h3>
								<p className='text-gray-700'>{faq.a}</p>
							</div>
						))}
				</div>
			</section>
		</div>
	);
}
