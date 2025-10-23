'use client';

import { useTranslations } from 'next-intl';
import {
	Calculator,
	CreditCard,
	TrendingUp,
	Shield,
	CheckCircle,
} from 'lucide-react';

export default function CreditLoanSEO() {
	const t = useTranslations('calculators.credit-loan.seo');

	return (
		<div className='space-y-12'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-8 h-8 text-blue-600 mr-3' />
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
					<CreditCard className='w-8 h-8 text-blue-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('calculation.title')}
					</h2>
				</div>
				<div className='prose dark:prose-invert max-w-none'>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('calculation.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
							<h3 className='text-xl font-bold text-blue-900 dark:text-blue-100 mb-4'>
								{t('calculation.formulas.annuity')}
							</h3>
							<div className='bg-white dark:bg-gray-800 rounded p-4'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t('calculation.formulas.annuity')}
								</code>
							</div>
						</div>

						<div className='bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6'>
							<h3 className='text-xl font-bold text-purple-900 dark:text-purple-100 mb-4'>
								{t('calculation.formulas.differentiated')}
							</h3>
							<div className='bg-white dark:bg-gray-800 rounded p-4'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t('calculation.formulas.differentiated')}
								</code>
							</div>
						</div>
					</div>

					{/* Examples Section */}
					<div className='mt-8'>
						<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
							{t('calculation.examples.title')}
						</h3>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{/* Annuity Example */}
							<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-6'>
								<h4 className='text-lg font-bold text-green-900 dark:text-green-100 mb-4'>
									{t(
										'calculation.examples.annuityExample.title'
									)}
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									{t(
										'calculation.examples.annuityExample.description'
									)}
								</p>
								<div className='space-y-2'>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-green-800 dark:text-green-200'>
											{t(
												'calculation.examples.annuityExample.calculation'
											)}
										</span>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-green-800 dark:text-green-200'>
											{t(
												'calculation.examples.annuityExample.totalAmount'
											)}
										</span>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-green-800 dark:text-green-200'>
											{t(
												'calculation.examples.annuityExample.overpayment'
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Differentiated Example */}
							<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6'>
								<h4 className='text-lg font-bold text-orange-900 dark:text-orange-100 mb-4'>
									{t(
										'calculation.examples.differentiatedExample.title'
									)}
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									{t(
										'calculation.examples.differentiatedExample.description'
									)}
								</p>
								<div className='space-y-2'>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-orange-800 dark:text-orange-200'>
											{t(
												'calculation.examples.differentiatedExample.firstPayment'
											)}
										</span>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-orange-800 dark:text-orange-200'>
											{t(
												'calculation.examples.differentiatedExample.lastPayment'
											)}
										</span>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-orange-800 dark:text-orange-200'>
											{t(
												'calculation.examples.differentiatedExample.totalAmount'
											)}
										</span>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-orange-800 dark:text-orange-200'>
											{t(
												'calculation.examples.differentiatedExample.overpayment'
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Early Repayment Example */}
							<div className='bg-red-50 dark:bg-red-900/20 rounded-lg p-6'>
								<h4 className='text-lg font-bold text-red-900 dark:text-red-100 mb-4'>
									{t(
										'calculation.examples.earlyRepaymentExample.title'
									)}
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									{t(
										'calculation.examples.earlyRepaymentExample.description'
									)}
								</p>
								<div className='space-y-2'>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-red-800 dark:text-red-200'>
											{t(
												'calculation.examples.earlyRepaymentExample.savings'
											)}
										</span>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-3'>
										<span className='font-semibold text-red-800 dark:text-red-200'>
											{t(
												'calculation.examples.earlyRepaymentExample.newTerm'
											)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<TrendingUp className='w-8 h-8 text-blue-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('features.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{t.raw('features.items').map((item: any, index: number) => (
						<div
							key={index}
							className='flex items-start'
						>
							<CheckCircle className='w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0' />
							<div>
								<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
									{item}
								</h3>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Shield className='w-8 h-8 text-blue-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('advantages.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{t
						.raw('advantages.items')
						.map((item: any, index: number) => (
							<div
								key={index}
								className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6'
							>
								<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
									{item}
								</h3>
							</div>
						))}
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-8 h-8 text-blue-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('faq.title')}
					</h2>
				</div>
				<div className='space-y-6'>
					{t.raw('faq.faqItems').map((item: any, index: number) => (
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
