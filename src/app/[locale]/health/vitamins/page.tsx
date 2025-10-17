import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import VitaminsCalculator from '@/components/calculators/vitamins-calculator';
import VitaminsSEO from '@/components/seo/vitamins-seo';

/**
 * Generate metadata for the vitamins calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.vitamins.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Vitamins Calculator Page
 * Interactive calculator for daily vitamin and mineral requirements
 */
export default async function VitaminsPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.vitamins',
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
		namespace: 'calculators.vitamins.seo',
	});

	// WebApplication structured data
	const webApplicationStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		url: `https://calc1.ru/${locale}/health/vitamins`,
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
			ratingValue: '4.9',
			reviewCount: '200',
		},
		featureList: [
			'Daily vitamin requirements',
			'Mineral intake calculation',
			'Age and gender specific',
			'Activity level adjustment',
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
				name: tSeo('faq.dailyRequirements.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.dailyRequirements.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.activityImpact.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.activityImpact.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.supplements.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.supplements.answer'),
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

					<VitaminsCalculator />

					<div className='mt-12'>
						<VitaminsSEO />
					</div>
				</div>
			</div>
		</>
	);
}
