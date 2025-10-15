import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Heart, Calendar, Clock, Users } from 'lucide-react';
import Header from '@/components/header';
import PregnancyCalculator from '@/components/calculators/pregnancy-calculator';
import PregnancySEO from '@/components/seo/pregnancy-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export default async function PregnancyPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.pregnancy',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.pregnancy.seo',
	});

	// Validate locale
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tSeo('breadcrumbs.life'),
			href: `/${locale}/life`,
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
			<div className='bg-gradient-to-r from-pink-600 to-pink-700 dark:from-pink-800 dark:to-pink-900'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Heart className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-pink-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calendar className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									40
								</div>
								<div className='text-pink-100'>
									{t('hero.weeks')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Clock className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									280
								</div>
								<div className='text-pink-100'>
									{t('hero.days')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Users className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3
								</div>
								<div className='text-pink-100'>
									{t('hero.trimesters')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<PregnancyCalculator />

				{/* SEO Content */}
				<PregnancySEO />
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
						url: `https://calc1.ru/${locale}/life/pregnancy`,
						applicationCategory: 'HealthApplication',
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
							ratingValue: '4.8',
							ratingCount: '1250',
						},
						featureList: [
							t('features.lmpCalculation'),
							t('features.conceptionCalculation'),
							t('features.ivfCalculation'),
							t('features.trimesterInfo'),
							t('features.dueDateRange'),
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
								name: tSeo('faq.howToCalculate.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.howToCalculate.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.accuracy.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.accuracy.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.factors.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.factors.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.ivf.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.ivf.answer'),
								},
							},
						],
					}),
				}}
			/>
		</div>
	);
}
