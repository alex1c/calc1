import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Baby, Ruler, Weight, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BabyGrowthSEO from '@/components/seo/baby-growth-seo';

// Dynamic import for calculator component
const BabyGrowthCalculator = dynamic(
	() => import('@/components/calculators/baby-growth-calculator'),
	{ ssr: false }
);

interface BabyGrowthPageProps {
	params: {
		locale: string;
	};
}

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: BabyGrowthPageProps): Promise<Metadata> {
	const t = await getTranslations({
		locale: params.locale,
		namespace: 'calculators.babyGrowth.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords:
			'калькулятор роста ребенка, вес ребенка по возрасту, нормы ВОЗ, процентили роста, развитие ребенка',
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url: `https://calc1.ru/${params.locale}/life/baby-growth`,
		},
		alternates: {
			canonical: `https://calc1.ru/${params.locale}/life/baby-growth`,
		},
	};
}

export default async function BabyGrowthPage({
	params: { locale },
}: BabyGrowthPageProps) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.babyGrowth',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.babyGrowth.seo',
	});

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Header */}
			<Header />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs />
				</div>
			</div>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-800 dark:to-blue-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Baby className='w-12 h-12 text-white mr-4' />
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
								<Ruler className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.who')}
								</div>
								<div className='text-pink-100'>
									{t('hero.whoDesc')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.accuracy')}
								</div>
								<div className='text-pink-100'>
									{t('hero.accuracyDesc')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Weight className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.ageRange')}
								</div>
								<div className='text-pink-100'>
									{t('hero.ageRangeDesc')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<BabyGrowthCalculator />

				{/* SEO Content */}
				<BabyGrowthSEO />
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
						url: `https://calc1.ru/${locale}/life/baby-growth`,
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
							t('features.whoStandards'),
							t('features.percentileCalculation'),
							t('features.growthAssessment'),
							t('features.recommendations'),
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
								name: tSeo('faq.howToUse.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.howToUse.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.whoStandards.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.whoStandards.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.percentileMeaning.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.percentileMeaning.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.ageLimit.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.ageLimit.answer'),
								},
							},
						],
					}),
				}}
			/>
		</div>
	);
}
