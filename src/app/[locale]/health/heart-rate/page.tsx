import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import HeartRateCalculator from '@/components/calculators/heart-rate-calculator';
import HeartRateSEO from '@/components/seo/heart-rate-seo';

/**
 * Generate metadata for Heart Rate Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.heartRate.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/health/heart-rate`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/health/heart-rate',
				en: 'https://calc1.ru/en/health/heart-rate',
				es: 'https://calc1.ru/es/health/heart-rate',
				de: 'https://calc1.ru/de/health/heart-rate',
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
					url: 'https://calc1.ru/og-heart-rate.png',
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
			images: ['https://calc1.ru/og-heart-rate.png'],
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
 * Heart Rate Calculator Page
 * Calculates heart rate zones and training recommendations
 */
export default async function HeartRatePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.heartRate',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.heartRate.seo',
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
		url: `https://calc1.ru/${locale}/health/heart-rate`,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		featureList: [
			'Heart rate zone calculation',
			'Training intensity zones',
			'Maximum heart rate calculation',
			'Visual heart rate zones',
			'Training recommendations',
		],
	};

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.whatIsHR.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whatIsHR.answer'),
				},
			},
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
				name: tSeo('faq.trainingZones.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.trainingZones.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.safety.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.safety.answer'),
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
					<HeartRateCalculator />

					{/* SEO Content */}
					<div className='mt-12'>
						<HeartRateSEO />
					</div>
				</div>
			</div>
		</>
	);
}
