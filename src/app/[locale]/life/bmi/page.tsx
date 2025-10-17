import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BMISEO from '@/components/seo/bmi-seo';

// Dynamic import for calculator component
const BMICalculator = dynamic(
	() => import('@/components/calculators/bmi-calculator'),
	{ ssr: false }
);

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bmi.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		alternates: {
			canonical: `/${locale}/life/bmi`,
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: `/${locale}/life/bmi`,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
		},
	};
}

export default async function BMIPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bmi',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.bmi.seo',
	});

	// JSON-LD structured data for Software Application
	const softwareStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: t('title'),
		applicationCategory: 'HealthApplication',
		operatingSystem: 'All',
		description: t('description'),
		url: `https://calc1.ru/${locale}/life/bmi`,
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
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{ label: tCategories('life.title'), href: '/life' },
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
					<BMICalculator />

					{/* SEO Content */}
					<BMISEO />
				</div>
			</div>
		</>
	);
}
