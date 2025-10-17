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

export default function DoseSEO() {
	const t = useTranslations('calculators.dose.seo');

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
					<div className='p-2 bg-orange-100 dark:bg-orange-900 rounded-lg'>
						<Shield className='w-6 h-6 text-orange-600 dark:text-orange-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('safety.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
					{t('safety.content')}
				</p>
			</section>

			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-lg'>
						<CheckCircle className='w-6 h-6 text-purple-600 dark:text-purple-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('advantages.title')}
					</h2>
				</div>
				<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
					{t('advantages.content')}
				</p>
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
							{t('faq.howCalculated.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.howCalculated.answer')}
						</p>
					</div>
					<div className='border-l-4 border-green-500 pl-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.children.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.children.answer')}
						</p>
					</div>
					<div className='border-l-4 border-yellow-500 pl-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.exceeded.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('faq.exceeded.answer')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
