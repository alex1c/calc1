import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { TrendingUp, Calculator, Ruler, Shield } from 'lucide-react';
import Header from '@/components/header';
import StairsCalculator from '@/components/calculators/stairs-calculator';
import StairsSEO from '@/components/seo/stairs-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export default async function StairsPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.stairsCalculator',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.stairsCalculator.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('construction.title'),
			href: '/construction',
		},
		{
			label: t('title'),
		},
	];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Header */}
			<Header />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<TrendingUp className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-purple-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									20+
								</div>
								<div className='text-purple-100'>
									{t('hero.steps')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-purple-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Shield className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									PDF
								</div>
								<div className='text-purple-100'>
									{t('hero.format')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<StairsCalculator />

				{/* SEO Content */}
				<StairsSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('title'),
						description: tSeo('description'),
						url: `https://calc1.ru/${locale}/construction/stairs`,
						applicationCategory: 'BusinessApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						author: {
							'@type': 'Organization',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.9',
							ratingCount: '89',
						},
						featureList: [
							t('features.angleCalculation'),
							t('features.stepsCalculation'),
							t('features.comfortFormula'),
							t('features.visualization'),
							t('features.accuracy'),
						],
					}),
				}}
			/>

			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: [
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.0.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.0.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.1.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.1.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.2.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.2.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.3.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.3.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.4.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.4.a'),
								},
							},
						],
					}),
				}}
			/>
		</div>
	);
}
