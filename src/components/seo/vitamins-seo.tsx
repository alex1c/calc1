'use client';

import { useTranslations } from 'next-intl';
import {
	Pill,
	Calculator,
	Info,
	CheckCircle,
	Heart,
	Shield,
	Zap,
} from 'lucide-react';

export default function VitaminsSEO() {
	const t = useTranslations('calculators.vitamins.seo');

	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
						<Pill className='w-6 h-6 text-blue-600 dark:text-blue-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('overview.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
					{t('overview.content')}
				</p>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
						<Calculator className='w-6 h-6 text-green-600 dark:text-green-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('calculation.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
					{t('calculation.content')}
				</p>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-lg'>
						<Heart className='w-6 h-6 text-purple-600 dark:text-purple-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('vitamins.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
					{t('vitamins.content')}
				</p>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-orange-100 dark:bg-orange-900 rounded-lg'>
						<Shield className='w-6 h-6 text-orange-600 dark:text-orange-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('minerals.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
					{t('minerals.content')}
				</p>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg'>
						<CheckCircle className='w-6 h-6 text-yellow-600 dark:text-yellow-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('advantages.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
					{t('advantages.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<h4 className='font-semibold text-green-800 dark:text-green-200 mb-2'>
							{t('advantages.personalized')}
						</h4>
						<p className='text-sm text-green-700 dark:text-green-300'>
							{t('advantages.personalizedDescription')}
						</p>
					</div>
					<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<h4 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
							{t('advantages.comprehensive')}
						</h4>
						<p className='text-sm text-blue-700 dark:text-blue-300'>
							{t('advantages.comprehensiveDescription')}
						</p>
					</div>
					<div className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
						<h4 className='font-semibold text-purple-800 dark:text-purple-200 mb-2'>
							{t('advantages.accurate')}
						</h4>
						<p className='text-sm text-purple-700 dark:text-purple-300'>
							{t('advantages.accurateDescription')}
						</p>
					</div>
					<div className='p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg'>
						<h4 className='font-semibold text-orange-800 dark:text-orange-200 mb-2'>
							{t('advantages.free')}
						</h4>
						<p className='text-sm text-orange-700 dark:text-orange-300'>
							{t('advantages.freeDescription')}
						</p>
					</div>
					<div className='p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg'>
						<h4 className='font-semibold text-pink-800 dark:text-pink-200 mb-2'>
							{t('advantages.multilingual')}
						</h4>
						<p className='text-sm text-pink-700 dark:text-pink-300'>
							{t('advantages.multilingualDescription')}
						</p>
					</div>
					<div className='p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg'>
						<h4 className='font-semibold text-indigo-800 dark:text-indigo-200 mb-2'>
							{t('advantages.mobile')}
						</h4>
						<p className='text-sm text-indigo-700 dark:text-indigo-300'>
							{t('advantages.mobileDescription')}
						</p>
					</div>
				</div>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg'>
						<Info className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('tips.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
					{t('tips.content')}
				</p>
				<div className='space-y-4'>
					<div className='flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
						<div>
							<h4 className='font-semibold text-blue-800 dark:text-blue-200 mb-1'>
								{t('tips.diet')}
							</h4>
							<p className='text-sm text-blue-700 dark:text-blue-300'>
								{t('tips.dietDescription')}
							</p>
						</div>
					</div>
					<div className='flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
						<div>
							<h4 className='font-semibold text-green-800 dark:text-green-200 mb-1'>
								{t('tips.supplements')}
							</h4>
							<p className='text-sm text-green-700 dark:text-green-300'>
								{t('tips.supplementsDescription')}
							</p>
						</div>
					</div>
					<div className='flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
						<div className='w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0'></div>
						<div>
							<h4 className='font-semibold text-yellow-800 dark:text-yellow-200 mb-1'>
								{t('tips.monitoring')}
							</h4>
							<p className='text-sm text-yellow-700 dark:text-yellow-300'>
								{t('tips.monitoringDescription')}
							</p>
						</div>
					</div>
					<div className='flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
						<div className='w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0'></div>
						<div>
							<h4 className='font-semibold text-purple-800 dark:text-purple-200 mb-1'>
								{t('tips.lifestyle')}
							</h4>
							<p className='text-sm text-purple-700 dark:text-purple-300'>
								{t('tips.lifestyleDescription')}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
						<Zap className='w-6 h-6 text-red-600 dark:text-red-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('faq.title')}
					</h2>
				</div>
				<div className='space-y-6'>
					<div className='border-l-4 border-blue-500 pl-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.dailyRequirements.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.dailyRequirements.answer')}
						</p>
					</div>
					<div className='border-l-4 border-green-500 pl-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.activityImpact.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.activityImpact.answer')}
						</p>
					</div>
					<div className='border-l-4 border-purple-500 pl-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.supplements.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.supplements.answer')}
						</p>
					</div>
					<div className='border-l-4 border-yellow-500 pl-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.accuracy.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.accuracy.answer')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
