'use client';

import { useTranslations } from 'next-intl';

export default function ConsumerLoanSEO() {
	const t = useTranslations('calculators.consumer-loan.seo');

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-12'>
			{/* Overview Section */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('overview.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed'>
					{t('overview.content')}
				</p>

				{/* Examples Section */}
				{t.raw('overview.examples') && (
					<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>
							{t('overview.examples.title')}
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{t.raw('overview.examples.example1') && (
								<div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
									<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{t('overview.examples.example1.title')}
									</h4>
									<p className='text-gray-600 dark:text-gray-400 mb-3'>
										{t(
											'overview.examples.example1.description'
										)}
									</p>
									<p className='text-green-600 dark:text-green-400 font-semibold'>
										{t(
											'overview.examples.example1.calculation'
										)}
									</p>
								</div>
							)}
							{t.raw('overview.examples.example2') && (
								<div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
									<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{t('overview.examples.example2.title')}
									</h4>
									<p className='text-gray-600 dark:text-gray-400 mb-3'>
										{t(
											'overview.examples.example2.description'
										)}
									</p>
									<p className='text-green-600 dark:text-green-400 font-semibold'>
										{t(
											'overview.examples.example2.calculation'
										)}
									</p>
								</div>
							)}
							{t.raw('overview.examples.example3') && (
								<div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
									<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{t('overview.examples.example3.title')}
									</h4>
									<p className='text-gray-600 dark:text-gray-400 mb-3'>
										{t(
											'overview.examples.example3.description'
										)}
									</p>
									<p className='text-green-600 dark:text-green-400 font-semibold'>
										{t(
											'overview.examples.example3.calculation'
										)}
									</p>
								</div>
							)}
							{t.raw('overview.examples.example4') && (
								<div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
									<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{t('overview.examples.example4.title')}
									</h4>
									<p className='text-gray-600 dark:text-gray-400 mb-3'>
										{t(
											'overview.examples.example4.description'
										)}
									</p>
									<p className='text-green-600 dark:text-green-400 font-semibold'>
										{t(
											'overview.examples.example4.calculation'
										)}
									</p>
								</div>
							)}
							{t.raw('overview.examples.example5') && (
								<div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 md:col-span-2'>
									<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{t('overview.examples.example5.title')}
									</h4>
									<p className='text-gray-600 dark:text-gray-400 mb-3'>
										{t(
											'overview.examples.example5.description'
										)}
									</p>
									<p className='text-green-600 dark:text-green-400 font-semibold'>
										{t(
											'overview.examples.example5.calculation'
										)}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</section>

			{/* Advantages Section */}
			{t.raw('advantages') && (
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						{t('advantages.title')}
					</h2>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('advantages.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{t.raw('advantages.quickApproval') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-blue-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('advantages.quickApproval')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('advantages.noCollateral') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-blue-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('advantages.noCollateral')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('advantages.flexibleTerms') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-blue-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('advantages.flexibleTerms')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('advantages.earlyRepayment') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-blue-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('advantages.earlyRepayment')}
									</h3>
								</div>
							</div>
						)}
					</div>
				</section>
			)}

			{/* Requirements Section */}
			{t.raw('requirements') && (
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						{t('requirements.title')}
					</h2>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('requirements.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{t.raw('requirements.age') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-green-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('requirements.age')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('requirements.income') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-green-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('requirements.income')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('requirements.creditHistory') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-green-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('requirements.creditHistory')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('requirements.documents') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-green-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('requirements.documents')}
									</h3>
								</div>
							</div>
						)}
					</div>
				</section>
			)}

			{/* Types Section */}
			{t.raw('types') && (
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						{t('types.title')}
					</h2>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('types.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{t.raw('types.refinancing') && (
							<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
									{t('types.refinancing.title')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{t('types.refinancing.desc')}
								</p>
							</div>
						)}
						{t.raw('types.emergency') && (
							<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
								<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
									{t('types.emergency.title')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{t('types.emergency.desc')}
								</p>
							</div>
						)}
					</div>
				</section>
			)}

			{/* Tips Section */}
			{t.raw('tips') && (
				<section className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						{t('tips.title')}
					</h2>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('tips.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{t.raw('tips.compare') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-yellow-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('tips.compare')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('tips.creditScore') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-yellow-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('tips.creditScore')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('tips.early') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-yellow-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('tips.early')}
									</h3>
								</div>
							</div>
						)}
						{t.raw('tips.consult') && (
							<div className='flex items-start space-x-3'>
								<div className='w-2 h-2 bg-yellow-600 rounded-full mt-2'></div>
								<div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{t('tips.consult')}
									</h3>
								</div>
							</div>
						)}
					</div>
				</section>
			)}

			{/* FAQ Section */}
			{t.raw('faq') &&
				t.raw('faq.faqItems') &&
				Array.isArray(t.raw('faq.faqItems')) && (
					<section>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
							{t('faq.title')}
						</h2>
						<div className='space-y-6'>
							{t
								.raw('faq.faqItems')
								.map((item: any, index: number) => (
									<div
										key={index}
										className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'
									>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
											{item.q}
										</h3>
										<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
											{item.a}
										</p>
									</div>
								))}
						</div>
					</section>
				)}
		</div>
	);
}
