import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import OvulationCalculator from '@/components/calculators/ovulation-calculator';
import OvulationSEO from '@/components/seo/ovulation-seo';

/**
 * Generate metadata for the ovulation calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.ovulation.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Ovulation Calculator Page
 * Interactive calculator for menstrual cycle and ovulation tracking
 */
export default async function OvulationPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.ovulation',
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
		namespace: 'calculators.ovulation.seo',
	});

	// WebApplication structured data
	const webApplicationStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		url: `https://calc1.ru/${locale}/health/ovulation`,
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
			'Ovulation date calculation',
			'Fertile days tracking',
			'Menstrual cycle calendar',
			'Cycle type classification',
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
				name: tSeo('faq.whatIsOvulation.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whatIsOvulation.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.fertileDays.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.fertileDays.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.cycleLength.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.cycleLength.answer'),
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

					<OvulationCalculator />

					<div className='mt-12'>
						<OvulationSEO />
					</div>
				</div>
			</div>
		</>
	);
}
