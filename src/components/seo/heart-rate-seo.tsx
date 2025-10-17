import { useTranslations } from 'next-intl';

/**
 * Heart Rate SEO Component
 * Provides comprehensive SEO content for heart rate calculator page
 */
export default function HeartRateSEO() {
	const t = useTranslations('calculators.heartRate.seo');

	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('overview.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('overview.content')}
					</p>
				</div>
			</section>

			{/* Calculation Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('calculation.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('calculation.content')}
					</p>
					<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('calculation.formula')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 font-mono text-lg'>
							HRmax = 220 - возраст
						</p>
					</div>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
						<li>{t('calculation.step1')}</li>
						<li>{t('calculation.step2')}</li>
						<li>{t('calculation.step3')}</li>
						<li>{t('calculation.step4')}</li>
					</ul>
				</div>
			</section>

			{/* Training Zones Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('zones.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-6'>
						{t('zones.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-4'>
							<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
								<h3 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
									{t('zones.resting.title')}
								</h3>
								<p className='text-blue-800 dark:text-blue-200 text-sm'>
									{t('zones.resting.description')}
								</p>
							</div>

							<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
								<h3 className='font-semibold text-green-900 dark:text-green-300 mb-2'>
									{t('zones.fatBurning.title')}
								</h3>
								<p className='text-green-800 dark:text-green-200 text-sm'>
									{t('zones.fatBurning.description')}
								</p>
							</div>

							<div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
								<h3 className='font-semibold text-yellow-900 dark:text-yellow-300 mb-2'>
									{t('zones.aerobic.title')}
								</h3>
								<p className='text-yellow-800 dark:text-yellow-200 text-sm'>
									{t('zones.aerobic.description')}
								</p>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg'>
								<h3 className='font-semibold text-orange-900 dark:text-orange-300 mb-2'>
									{t('zones.anaerobic.title')}
								</h3>
								<p className='text-orange-800 dark:text-orange-200 text-sm'>
									{t('zones.anaerobic.description')}
								</p>
							</div>

							<div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
								<h3 className='font-semibold text-red-900 dark:text-red-300 mb-2'>
									{t('zones.maximum.title')}
								</h3>
								<p className='text-red-800 dark:text-red-200 text-sm'>
									{t('zones.maximum.description')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('advantages.content')}
					</p>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
						<li>{t('advantages.quick')}</li>
						<li>{t('advantages.accurate')}</li>
						<li>{t('advantages.free')}</li>
						<li>{t('advantages.multilingual')}</li>
						<li>{t('advantages.mobile')}</li>
					</ul>
				</div>
			</section>

			{/* Tips Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('tips.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('tips.content')}
					</p>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
						<li>{t('tips.measurement')}</li>
						<li>{t('tips.consistency')}</li>
						<li>{t('tips.consultation')}</li>
						<li>{t('tips.training')}</li>
					</ul>
				</div>
			</section>

			{/* Safety Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('safety.title')}
				</h2>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('safety.content')}
					</p>
					<ul className='list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2'>
						<li>{t('safety.consultation')}</li>
						<li>{t('safety.gradual')}</li>
						<li>{t('safety.monitoring')}</li>
						<li>{t('safety.medical')}</li>
					</ul>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-6'>
					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.whatIsHR.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.whatIsHR.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.howToCalculate.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.howToCalculate.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.trainingZones.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.trainingZones.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-700 pb-4'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.safety.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('faq.safety.answer')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
