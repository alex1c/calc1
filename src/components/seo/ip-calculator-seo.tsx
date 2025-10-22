'use client';

import { useTranslations } from 'next-intl';

export default function IpCalculatorSEO() {
	const t = useTranslations('calculators.ipCalculator');

	const faqData = [
		{
			q: t('seo.faq.faqItems.0.q'),
			a: t('seo.faq.faqItems.0.a'),
		},
		{
			q: t('seo.faq.faqItems.1.q'),
			a: t('seo.faq.faqItems.1.a'),
		},
		{
			q: t('seo.faq.faqItems.2.q'),
			a: t('seo.faq.faqItems.2.a'),
		},
		{
			q: t('seo.faq.faqItems.3.q'),
			a: t('seo.faq.faqItems.3.a'),
		},
		{
			q: t('seo.faq.faqItems.4.q'),
			a: t('seo.faq.faqItems.4.a'),
		},
	];

	return (
		<div className='space-y-8'>
			{/* Overview */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.overview.title')}
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>{t('seo.overview.content')}</p>
				</div>

				{/* Examples Section */}
				<div className='mt-8'>
					<h3 className='text-xl font-bold text-gray-900 mb-6'>
						{t('seo.overview.examples.title')}
					</h3>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						{/* CIDR Example */}
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
								{t('seo.overview.examples.cidrExample.title')}
							</h4>
							<p className='text-gray-700 dark:text-gray-300 mb-3'>
								{t(
									'seo.overview.examples.cidrExample.scenario'
								)}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t(
										'seo.overview.examples.cidrExample.calculation'
									)}
								</code>
							</div>
							<p className='text-green-700 dark:text-green-300 font-medium'>
								{t('seo.overview.examples.cidrExample.result')}
							</p>
						</div>

						{/* Subnet Example */}
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
								{t('seo.overview.examples.subnetExample.title')}
							</h4>
							<p className='text-gray-700 dark:text-gray-300 mb-3'>
								{t(
									'seo.overview.examples.subnetExample.scenario'
								)}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t(
										'seo.overview.examples.subnetExample.calculation'
									)}
								</code>
							</div>
							<p className='text-green-700 dark:text-green-300 font-medium'>
								{t(
									'seo.overview.examples.subnetExample.result'
								)}
							</p>
						</div>

						{/* Range Example */}
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
								{t('seo.overview.examples.rangeExample.title')}
							</h4>
							<p className='text-gray-700 dark:text-gray-300 mb-3'>
								{t(
									'seo.overview.examples.rangeExample.scenario'
								)}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t(
										'seo.overview.examples.rangeExample.calculation'
									)}
								</code>
							</div>
							<p className='text-green-700 dark:text-green-300 font-medium'>
								{t('seo.overview.examples.rangeExample.result')}
							</p>
						</div>

						{/* IPv6 Example */}
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
								{t('seo.overview.examples.ipv6Example.title')}
							</h4>
							<p className='text-gray-700 dark:text-gray-300 mb-3'>
								{t(
									'seo.overview.examples.ipv6Example.scenario'
								)}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t(
										'seo.overview.examples.ipv6Example.calculation'
									)}
								</code>
							</div>
							<p className='text-green-700 dark:text-green-300 font-medium'>
								{t('seo.overview.examples.ipv6Example.result')}
							</p>
						</div>

						{/* Network Example */}
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 lg:col-span-2'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
								{t(
									'seo.overview.examples.networkExample.title'
								)}
							</h4>
							<p className='text-gray-700 dark:text-gray-300 mb-3'>
								{t(
									'seo.overview.examples.networkExample.scenario'
								)}
							</p>
							<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
								<code className='text-sm text-gray-800 dark:text-gray-200'>
									{t(
										'seo.overview.examples.networkExample.calculation'
									)}
								</code>
							</div>
							<p className='text-green-700 dark:text-green-300 font-medium'>
								{t(
									'seo.overview.examples.networkExample.result'
								)}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.calculation.title')}
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>{t('seo.calculation.content')}</p>
					<ul>
						<li>
							<strong>{t('seo.calculation.network')}</strong>
						</li>
						<li>
							<strong>{t('seo.calculation.hosts')}</strong>
						</li>
						<li>
							<strong>{t('seo.calculation.range')}</strong>
						</li>
					</ul>
				</div>
			</section>

			{/* Features */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.features.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6'>
					<p>{t('seo.features.title')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.features.ipv4')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.features.ipv4Desc')}
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.features.ipv6')}
						</h3>
						<p className='text-green-800'>
							{t('seo.features.ipv6Desc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.features.cidr')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.features.cidrDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.features.reverse')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.features.reverseDesc')}
						</p>
					</div>
					<div className='bg-indigo-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-indigo-900 mb-2'>
							{t('seo.features.visualization')}
						</h3>
						<p className='text-indigo-800'>
							{t('seo.features.visualizationDesc')}
						</p>
					</div>
					<div className='bg-teal-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-teal-900 mb-2'>
							{t('seo.features.export')}
						</h3>
						<p className='text-teal-800'>
							{t('seo.features.exportDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* Advantages */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.advantages.title')}
				</h2>
				<div className='prose prose-lg text-gray-600 mb-6'>
					<p>{t('seo.advantages.content')}</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-green-800'>
							{t('seo.advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-blue-800'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-purple-800'>
							{t('seo.advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							{t('seo.advantages.export')}
						</h3>
						<p className='text-orange-800'>
							{t('seo.advantages.exportDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					{t('seo.faq.title')}
				</h2>
				<div className='space-y-4'>
					{faqData.map((faq, index) => (
						<div
							key={index}
							className='bg-white border border-gray-200 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-600'>{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faqData.map((faq) => ({
							'@type': 'Question',
							name: faq.q,
							acceptedAnswer: {
								'@type': 'Answer',
								text: faq.a,
							},
						})),
					}),
				}}
			/>
		</div>
	);
}
