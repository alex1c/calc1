import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BloodPressureCalculator from '@/components/calculators/blood-pressure-calculator';
import BloodPressureSEO from '@/components/seo/blood-pressure-seo';

/**
 * Generate metadata for Blood Pressure Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bloodPressure.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/health/blood-pressure`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/health/blood-pressure',
				en: 'https://calc1.ru/en/health/blood-pressure',
				es: 'https://calc1.ru/es/health/blood-pressure',
				de: 'https://calc1.ru/de/health/blood-pressure',
			},
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/og-blood-pressure.png',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['https://calc1.ru/og-blood-pressure.png'],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	};
}

/**
 * Blood Pressure Calculator Page
 * Calculates blood pressure categories and provides health recommendations
 */
export default async function BloodPressurePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bloodPressure',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.bloodPressure.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// JSON-LD structured data for Software Application
	const softwareStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: t('title'),
		applicationCategory: 'HealthApplication',
		operatingSystem: 'All',
		description: t('description'),
		url: `https://calc1.ru/${locale}/health/blood-pressure`,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		featureList: [
			'Blood pressure category calculation',
			'Age-based normal ranges',
			'Health recommendations',
			'Visual pressure indicators',
			'Risk level assessment',
		],
	};

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.whatIsBP.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whatIsBP.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.normalRange.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.normalRange.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.hypertension.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.hypertension.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.measurement.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.measurement.answer'),
				},
			},
		],
	};

	// Breadcrumbs items
	const breadcrumbItems = [
		{ label: tCategories('health.title'), href: '/health' },
		{ label: t('title') },
	];

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(softwareStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>

			<div className='min-h-screen bg-gray-50'>
				<Header />

				<div className='container mx-auto px-4 py-8'>
					{/* Breadcrumbs */}
					<Breadcrumbs items={breadcrumbItems} />

					{/* Calculator */}
					<BloodPressureCalculator />

					{/* SEO Content */}
					<div className='mt-12'>
						<BloodPressureSEO />
					</div>
				</div>
			</div>
		</>
	);
}
