import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BMIHealthCalculator from '@/components/calculators/bmi-health-calculator';
import BMIHealthSEO from '@/components/seo/bmi-health-seo';

/**
 * Generate metadata for BMI Health Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bmiHealth.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/health/bmihealth`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/health/bmihealth',
				en: 'https://calc1.ru/en/health/bmihealth',
				es: 'https://calc1.ru/es/health/bmihealth',
				de: 'https://calc1.ru/de/health/bmihealth',
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
					url: 'https://calc1.ru/og-bmi-health.png',
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
			images: ['https://calc1.ru/og-bmi-health.png'],
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
 * BMI Health Calculator Page
 * Calculates Body Mass Index and provides health recommendations
 */
export default async function BMIHealthPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bmiHealth',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.bmiHealth.seo',
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
		url: `https://calc1.ru/${locale}/health/bmihealth`,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		featureList: [
			'BMI calculation',
			'Weight category determination',
			'Normal weight range calculation',
			'Visual BMI scale',
			'Health recommendations',
		],
	};

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.whatIsBMI.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whatIsBMI.answer'),
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
				name: tSeo('faq.normalRange.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.normalRange.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.limitations.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.limitations.answer'),
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

					{/* Page Header */}
					<header className='mb-8'>
						<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('title')}
						</h1>
						<p className='text-xl text-gray-600 dark:text-gray-400'>
							{t('description')}
						</p>
					</header>

					{/* Calculator */}
					<BMIHealthCalculator />

					{/* SEO Content */}
					<div className='mt-12'>
						<BMIHealthSEO />
					</div>
				</div>
			</div>
		</>
	);
}
