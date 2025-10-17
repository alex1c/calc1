import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DoseCalculator from '@/components/calculators/dose-calculator';
import DoseSEO from '@/components/seo/dose-seo';

/**
 * Generate metadata for the dose calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.dose.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Dose Calculator Page
 * Interactive calculator for weight-based medication dosing
 */
export default async function DosePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.dose',
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
		namespace: 'calculators.dose.seo',
	});

	// WebApplication structured data
	const webApplicationStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		url: `https://calc1.ru/${locale}/health/dose`,
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
			reviewCount: '180',
		},
		featureList: [
			'Weight-based dosage calculation',
			'Unit conversion (kg/lbs)',
			'Safety warnings',
			'Multiple frequency options',
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
				name: tSeo('faq.howCalculated.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.howCalculated.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.children.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.children.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.exceeded.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.exceeded.answer'),
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

					<DoseCalculator />

					<div className='mt-12'>
						<DoseSEO />
					</div>
				</div>
			</div>
		</>
	);
}
