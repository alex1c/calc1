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

	// Generate FAQ items array
	const faqRaw = t.raw('faq.faqItems');
	const faqItems = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	return (
		<div className='max-w-4xl mx-auto space-y-8'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
						<Pill className='w-6 h-6 text-blue-600 dark:text-blue-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('overview.title')}
					</h2>
				</div>
				<div className='prose prose-gray dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-400 leading-relaxed mb-4'>
						{t('overview.content')}
					</p>
					{t('overview.additionalContent') && (
						<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
							{t('overview.additionalContent')}
						</p>
					)}
				</div>

				{/* Calculation Examples */}
				{t('overview.calculationExamples.title') && (
					<div className='mt-8'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							{t('overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{t('overview.calculationExamples.content')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{Array.from({ length: 6 }, (_, i) => {
								const exampleNum = i + 1;
								return (
									<div
										key={i}
										className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<Pill className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{t(
												`overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{t(
												`overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
													{t(
														`overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Дозировка:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
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

			{/* FAQ Section */}
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
					{faqItems.map((item, index) => (
						<div
							key={index}
							className={`border-l-4 ${
								index % 4 === 0
									? 'border-blue-500'
									: index % 4 === 1
									? 'border-green-500'
									: index % 4 === 2
									? 'border-purple-500'
									: 'border-yellow-500'
							} pl-4`}
						>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{item.q}
							</h3>
							<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
								{item.a}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
