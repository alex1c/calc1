import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import EquationsSEO from '@/components/seo/equations-seo';

// Dynamic import for calculator component
const EquationsCalculator = dynamic(
	() => import('@/components/calculators/equations-calculator'),
	{ ssr: false }
);

/**
 * Generate metadata for Equations Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.equations.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/math/equations`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/math/equations',
				en: 'https://calc1.ru/en/math/equations',
				es: 'https://calc1.ru/es/math/equations',
				de: 'https://calc1.ru/de/math/equations',
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
					url: 'https://calc1.ru/og-equations.png',
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
			images: ['https://calc1.ru/og-equations.png'],
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
 * Equations Calculator Page
 * Solves linear and quadratic equations with step-by-step explanations
 */
export default async function EquationsPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.equations',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.equations.seo',
	});

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.question1'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.answer1'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.question2'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.answer2'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.question3'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.answer3'),
				},
			},
		],
	};

	// JSON-LD structured data for Software Application
	const softwareStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: t('title'),
		description: t('description'),
		applicationCategory: 'CalculatorApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'RUB',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '256',
		},
	};

	// Breadcrumbs items
	const breadcrumbItems = [
		{ label: tSeo('breadcrumbs.math'), href: `/${locale}/math` },
		{ label: t('title') },
	];

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(softwareStructuredData),
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
					<EquationsCalculator />

					{/* SEO Content */}
					<EquationsSEO />
				</div>
			</div>
		</>
	);
}
