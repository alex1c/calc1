'use client';

import { useTranslations } from 'next-intl';
import {
	Car,
	Calculator,
	TrendingUp,
	Shield,
	Percent,
	Clock,
	FileText,
	Users,
	Building,
	CheckCircle,
} from 'lucide-react';

export default function AutoLoanSEO() {
	const t = useTranslations();

	return (
		<div className='mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8'>
			<div className='max-w-4xl mx-auto'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('calculators.auto-loan.seo.title')}
				</h2>

				<div className='prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-6'>
					{/* Overview Section */}
					<div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
							{t('calculators.auto-loan.seo.overview.title')}
						</h3>
						<p className='mb-4'>
							{t('calculators.auto-loan.seo.overview.content')}
						</p>

						{/* Calculation Examples */}
						<div className='bg-white dark:bg-gray-700 rounded-lg p-6 mb-6'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								{t(
									'calculators.auto-loan.seo.overview.examples.title'
								)}
							</h4>
							<div className='space-y-4'>
								<div className='border-l-4 border-green-500 pl-4'>
									<h5 className='font-medium text-gray-900 dark:text-white'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example1.title'
										)}
									</h5>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example1.description'
										)}
									</p>
									<p className='text-sm font-medium text-green-600 dark:text-green-400'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example1.calculation'
										)}
									</p>
								</div>
								<div className='border-l-4 border-blue-500 pl-4'>
									<h5 className='font-medium text-gray-900 dark:text-white'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example2.title'
										)}
									</h5>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example2.description'
										)}
									</p>
									<p className='text-sm font-medium text-blue-600 dark:text-blue-400'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example2.calculation'
										)}
									</p>
								</div>
								<div className='border-l-4 border-purple-500 pl-4'>
									<h5 className='font-medium text-gray-900 dark:text-white'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example3.title'
										)}
									</h5>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example3.description'
										)}
									</p>
									<p className='text-sm font-medium text-purple-600 dark:text-purple-400'>
										{t(
											'calculators.auto-loan.seo.overview.examples.example3.calculation'
										)}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Calculation Methods */}
					<div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
							{t('calculators.auto-loan.seo.calculation.title')}
						</h3>
						<p className='mb-4'>
							{t('calculators.auto-loan.seo.calculation.content')}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='bg-white dark:bg-gray-700 rounded-lg p-6'>
								<div className='flex items-center mb-3'>
									<Calculator className='w-5 h-5 text-green-600 mr-2' />
									<h4 className='font-semibold text-gray-900 dark:text-white'>
										{t(
											'calculators.auto-loan.seo.calculation.annuity.title'
										)}
									</h4>
								</div>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									{t(
										'calculators.auto-loan.seo.calculation.annuity.description'
									)}
								</p>
								<div className='bg-gray-100 dark:bg-gray-600 rounded p-3'>
									<code className='text-xs text-gray-800 dark:text-gray-200'>
										{t(
											'calculators.auto-loan.seo.calculation.annuity.formula'
										)}
									</code>
								</div>
							</div>

							<div className='bg-white dark:bg-gray-700 rounded-lg p-6'>
								<div className='flex items-center mb-3'>
									<TrendingUp className='w-5 h-5 text-blue-600 mr-2' />
									<h4 className='font-semibold text-gray-900 dark:text-white'>
										{t(
											'calculators.auto-loan.seo.calculation.differentiated.title'
										)}
									</h4>
								</div>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									{t(
										'calculators.auto-loan.seo.calculation.differentiated.description'
									)}
								</p>
								<div className='bg-gray-100 dark:bg-gray-600 rounded p-3'>
									<code className='text-xs text-gray-800 dark:text-gray-200'>
										{t(
											'calculators.auto-loan.seo.calculation.differentiated.formula'
										)}
									</code>
								</div>
							</div>
						</div>
					</div>

					{/* Advantages */}
					<div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
							{t('calculators.auto-loan.seo.advantages.title')}
						</h3>
						<p className='mb-4'>
							{t('calculators.auto-loan.seo.advantages.content')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-start'>
								<Clock className='w-5 h-5 text-green-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.advantages.quickApproval'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<Percent className='w-5 h-5 text-blue-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.advantages.lowRates'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<FileText className='w-5 h-5 text-purple-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.advantages.flexibleTerms'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<Car className='w-5 h-5 text-orange-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.advantages.earlyRepayment'
									)}
								</span>
							</div>
						</div>
					</div>

					{/* Requirements */}
					<div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
							{t('calculators.auto-loan.seo.requirements.title')}
						</h3>
						<p className='mb-4'>
							{t(
								'calculators.auto-loan.seo.requirements.content'
							)}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-start'>
								<Users className='w-5 h-5 text-green-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.requirements.age'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<CheckCircle className='w-5 h-5 text-blue-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.requirements.income'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<Building className='w-5 h-5 text-purple-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.requirements.creditHistory'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<FileText className='w-5 h-5 text-orange-600 mr-3 mt-1' />
								<span className='text-gray-700 dark:text-gray-300'>
									{t(
										'calculators.auto-loan.seo.requirements.documents'
									)}
								</span>
							</div>
						</div>
					</div>

					{/* Programs */}
					<div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
							{t('calculators.auto-loan.seo.programs.title')}
						</h3>
						<p className='mb-4'>
							{t('calculators.auto-loan.seo.programs.content')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='bg-white dark:bg-gray-700 p-4 rounded-lg border border-green-200 dark:border-green-800'>
								<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
									{t(
										'calculators.auto-loan.seo.programs.newCar.title'
									)}
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{t(
										'calculators.auto-loan.seo.programs.newCar.desc'
									)}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
								<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
									{t(
										'calculators.auto-loan.seo.programs.usedCar.title'
									)}
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{t(
										'calculators.auto-loan.seo.programs.usedCar.desc'
									)}
								</p>
							</div>
						</div>
					</div>

					{/* Tips */}
					<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800'>
						<h3 className='text-xl font-semibold text-green-900 dark:text-green-100 mb-3'>
							{t('calculators.auto-loan.seo.tips.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200 mb-4'>
							{t('calculators.auto-loan.seo.tips.content')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-start'>
								<CheckCircle className='w-5 h-5 text-green-600 mr-3 mt-1' />
								<span className='text-green-800 dark:text-green-200'>
									{t(
										'calculators.auto-loan.seo.tips.compare'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<CheckCircle className='w-5 h-5 text-green-600 mr-3 mt-1' />
								<span className='text-green-800 dark:text-green-200'>
									{t(
										'calculators.auto-loan.seo.tips.insurance'
									)}
								</span>
							</div>
							<div className='flex items-start'>
								<CheckCircle className='w-5 h-5 text-green-600 mr-3 mt-1' />
								<span className='text-green-800 dark:text-green-200'>
									{t('calculators.auto-loan.seo.tips.early')}
								</span>
							</div>
							<div className='flex items-start'>
								<CheckCircle className='w-5 h-5 text-green-600 mr-3 mt-1' />
								<span className='text-green-800 dark:text-green-200'>
									{t(
										'calculators.auto-loan.seo.tips.consult'
									)}
								</span>
							</div>
						</div>
					</div>

					{/* FAQ Section */}
					<div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
							{t('calculators.auto-loan.seo.faq.title')}
						</h3>
						<div className='space-y-4'>
							{Array.from({ length: 15 }, (_, index) => (
								<div
									key={index}
									className='bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600'
								>
									<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
										{t(
											`calculators.auto-loan.seo.faq.faqItems.${index}.q`
										)}
									</h4>
									<p className='text-gray-700 dark:text-gray-300'>
										{t(
											`calculators.auto-loan.seo.faq.faqItems.${index}.a`
										)}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
