'use client';

import { useTranslations } from 'next-intl';
import {
	Calculator,
	Receipt,
	TrendingUp,
	Shield,
	CheckCircle,
} from 'lucide-react';

export default function TaxCalculatorSEO() {
	const t = useTranslations('calculators.taxCalculator.seo');

	return (
		<div className='space-y-12'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-8 h-8 text-green-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('overview.title')}
					</h2>
				</div>
				<div className='prose dark:prose-invert max-w-none'>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('overview.content')}
					</p>
				</div>
			</section>

			{/* Calculation Method Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Receipt className='w-8 h-8 text-green-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('calculation.title')}
					</h2>
				</div>
				<div className='prose dark:prose-invert max-w-none'>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('calculation.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-6'>
							<h3 className='text-xl font-bold text-green-900 dark:text-green-100 mb-4'>
								{t('calculation.withVat.title')}
							</h3>
							<p className='text-green-800 dark:text-green-200 mb-4'>
								{t('calculation.withVat.description')}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-4'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t('calculation.withVat.formula')}
								</code>
							</div>
						</div>

						<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
							<h3 className='text-xl font-bold text-blue-900 dark:text-blue-100 mb-4'>
								{t('calculation.withoutVat.title')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 mb-4'>
								{t('calculation.withoutVat.description')}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-4'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t('calculation.withoutVat.formula')}
								</code>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<TrendingUp className='w-8 h-8 text-green-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('features.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.vatCalculation')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.vatCalculationDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.multipleRates')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.multipleRatesDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.additionalTaxes')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.additionalTaxesDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.currencySupport')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.currencySupportDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.localCalculation')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.localCalculationDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.exportResults')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.exportResultsDesc')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Shield className='w-8 h-8 text-green-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('advantages.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.accuracy')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.accuracyDesc')}
						</p>
					</div>
					<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.speed')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.speedDesc')}
						</p>
					</div>
					<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.security')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.securityDesc')}
						</p>
					</div>
					<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.flexibility')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.flexibilityDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-8 h-8 text-green-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('faq.title')}
					</h2>
				</div>
				<div className='space-y-6'>
					{t
						.raw('seo.faq.faqItems')
						.map((item: any, index: number) => (
							<div
								key={index}
								className='border-b border-gray-200 dark:border-gray-700 pb-4'
							>
								<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
									{item.q}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{item.a}
								</p>
							</div>
						))}
				</div>
			</section>
		</div>
	);
}
