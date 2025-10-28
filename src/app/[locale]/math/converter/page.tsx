import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ConverterSEO from '@/components/seo/converter-seo';

// Dynamic import for calculator component
const ConverterCalculator = dynamic(
	() => import('@/components/calculators/converter-calculator'),
	{ ssr: false }
);

/**
 * Generate metadata for Unit Converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.converter.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/math/converter`;

	return {
		title,
		description,
		keywords: [
			'конвертер единиц',
			'онлайн конвертер',
			'конвертер длины',
			'конвертер массы',
			'конвертер времени',
			'конвертер объема',
			'перевод единиц измерения',
			'метрические единицы',
			'имперские единицы',
			'конвертация единиц',
			'калькулятор единиц',
			'переводчик единиц',
			'конвертер веса',
			'конвертер расстояния',
			'конвертер температуры',
			'конвертер скорости',
			'конвертер площади',
			'конвертер давления',
			'конвертер энергии',
			'конвертер мощности',
			'конвертер валют',
			'конвертер данных',
			'конвертер углов',
			'конвертер частоты',
			'конвертер электричества',
			'конвертер магнитного поля',
			'конвертер радиоактивности',
			'конвертер освещенности',
			'конвертер звука',
			'конвертер вязкости',
		],
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/math/converter',
				en: 'https://calc1.ru/en/math/converter',
				es: 'https://calc1.ru/es/math/converter',
				de: 'https://calc1.ru/de/math/converter',
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
					url: 'https://calc1.ru/og-converter.png',
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
			images: ['https://calc1.ru/og-converter.png'],
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
 * Unit Converter Page
 * Converts between different units of measurement
 */
export default async function ConverterPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.converter',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.converter.seo',
	});

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.0.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.0.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.1.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.1.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.2.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.2.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.3.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.3.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.4.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.4.a'),
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
		applicationCategory: 'ConverterApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'RUB',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			ratingCount: '312',
		},
	};

	// JSON-LD structured data for WebApplication
	const webApplicationStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: tSeo('title'),
		description: tSeo('description'),
		url: `https://calc1.ru/${locale}/math/converter`,
		applicationCategory: 'BusinessApplication',
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
			ratingValue: '4.9',
			ratingCount: '89',
		},
		featureList: [
			'Конвертация длины',
			'Конвертация массы',
			'Конвертация времени',
			'Конвертация объема',
			'Поддержка метрических и имперских единиц',
			'Мгновенные результаты',
			'Высокая точность расчетов',
			'Многоязычная поддержка',
		],
	};

	// Breadcrumbs items
	const breadcrumbItems = [
		{ label: tSeo('breadcrumbs.math'), href: '/math' },
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
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webApplicationStructuredData),
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
					<ConverterCalculator />

					{/* SEO Content */}
					<ConverterSEO />
				</div>
			</div>
		</>
	);
}
