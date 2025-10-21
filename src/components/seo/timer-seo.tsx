'use client';

import { useTranslations } from 'next-intl';

export default function TimerSEO() {
	const t = useTranslations('calculators.timer.seo');

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
							{t('features.countdown')}
						</h3>
						<p className='text-blue-800 text-sm'>
							{t('features.countdownDesc')}
						</p>
					</div>
					<div className='bg-green-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-green-900 mb-2'>
							{t('features.sound')}
						</h3>
						<p className='text-green-800 text-sm'>
							{t('features.soundDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-purple-900 mb-2'>
							{t('features.visual')}
						</h3>
						<p className='text-purple-800 text-sm'>
							{t('features.visualDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-orange-900 mb-2'>
							{t('features.presets')}
						</h3>
						<p className='text-orange-800 text-sm'>
							{t('features.presetsDesc')}
						</p>
					</div>
					<div className='bg-red-50 p-4 rounded-lg'>
						<h3 className='font-semibold text-red-900 mb-2'>
							{t('features.controls')}
						</h3>
						<p className='text-red-800 text-sm'>
							{t('features.controlsDesc')}
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
							{t('useCases.pomodoro')}
						</h3>
						<p className='text-blue-800 mb-3'>
							{t('useCases.pomodoroDesc')}
						</p>
						<ul className='text-blue-700 text-sm space-y-1'>
							<li>• {t('useCases.pomodoro1')}</li>
							<li>• {t('useCases.pomodoro2')}</li>
							<li>• {t('useCases.pomodoro3')}</li>
						</ul>
					</div>
					
					<div className='bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-3'>
							{t('useCases.cooking')}
						</h3>
						<p className='text-orange-800 mb-3'>
							{t('useCases.cookingDesc')}
						</p>
						<ul className='text-orange-700 text-sm space-y-1'>
							<li>• {t('useCases.cooking1')}</li>
							<li>• {t('useCases.cooking2')}</li>
							<li>• {t('useCases.cooking3')}</li>
						</ul>
					</div>
					
					<div className='bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-3'>
							{t('useCases.workout')}
						</h3>
						<p className='text-green-800 mb-3'>
							{t('useCases.workoutDesc')}
						</p>
						<ul className='text-green-700 text-sm space-y-1'>
							<li>• {t('useCases.workout1')}</li>
							<li>• {t('useCases.workout2')}</li>
							<li>• {t('useCases.workout3')}</li>
						</ul>
					</div>
					
					<div className='bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-3'>
							{t('useCases.study')}
						</h3>
						<p className='text-purple-800 mb-3'>
							{t('useCases.studyDesc')}
						</p>
						<ul className='text-purple-700 text-sm space-y-1'>
							<li>• {t('useCases.study1')}</li>
							<li>• {t('useCases.study2')}</li>
							<li>• {t('useCases.study3')}</li>
						</ul>
					</div>
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
							<strong>{t('tips.tip1')}</strong> {t('tips.tip1Desc')}
						</p>
					</div>
					<div className='bg-blue-50 border-l-4 border-blue-400 p-4'>
						<p className='text-blue-800'>
							<strong>{t('tips.tip2')}</strong> {t('tips.tip2Desc')}
						</p>
					</div>
					<div className='bg-green-50 border-l-4 border-green-400 p-4'>
						<p className='text-green-800'>
							<strong>{t('tips.tip3')}</strong> {t('tips.tip3Desc')}
						</p>
					</div>
					<div className='bg-purple-50 border-l-4 border-purple-400 p-4'>
						<p className='text-purple-800'>
							<strong>{t('tips.tip4')}</strong> {t('tips.tip4Desc')}
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
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question6')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer6')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question7')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer7')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question8')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer8')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question9')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer9')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('faq.question10')}
						</h3>
						<p className='text-gray-700'>
							{t('faq.answer10')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}


