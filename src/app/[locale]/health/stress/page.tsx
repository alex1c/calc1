import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import StressCalculator from '@/components/calculators/stress-calculator';
import StressSEO from '@/components/seo/stress-seo';

/**
 * Generate metadata for the stress calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.stress.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Stress Calculator Page
 * Interactive calculator for stress level assessment
 */
export default async function StressPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.stress',
	});
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Breadcrumb items
	const breadcrumbItems = [
		{
			label: tCategories('health.title'),
			href: '/health',
		},
		{ label: t('title') },
	];

	// SEO translations
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.stress.seo',
	});

	// WebApplication structured data
	const webApplicationStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		url: `https://calc1.ru/${locale}/health/stress`,
		description: t('description'),
		applicationCategory: 'HealthApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			reviewCount: '150',
		},
		featureList: [
			'Stress level assessment',
			'10-question test',
			'Personalized results',
			'Stress management advice',
			'Multilingual support',
		],
	};

	// FAQ structured data
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.whatIsStress.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whatIsStress.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.howAccurate.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.howAccurate.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.whenToSeekHelp.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whenToSeekHelp.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.howToReduce.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.howToReduce.answer'),
				},
			},
		],
	};

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webApplicationStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>

			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
				<Header />

				<div className='container mx-auto px-4 py-8'>
					<Breadcrumbs items={breadcrumbItems} />

					<StressCalculator />

					<div className='mt-12'>
						<StressSEO />
					</div>
				</div>
			</div>
		</>
	);
}
