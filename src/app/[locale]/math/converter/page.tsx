import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Ruler, Calculator, Zap, Shuffle } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ConverterSEO from '@/components/seo/converter-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

import { isSupportedLocale } from '@/lib/constants';
import {
	generateLanguageAlternates,
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';
// Dynamic import for calculator component
const ConverterCalculator = dynamic(
	() => import('@/components/calculators/converter-calculator'),
	{ ssr: false }
);

interface Props {
	params: { locale: string };
}

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

	const title = getSafeTitle(t('title'), 'Конвертер единиц измерения');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн конвертер единиц измерения: длина, масса, объём, температура, скорость, давление, энергия и другие. Быстрый перевод между метрическими и имперскими единицами.'
	);
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
			languages: generateLanguageAlternates('/math/converter'),
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
}: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.converter',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.converter.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!isSupportedLocale(locale)) {
		notFound();
	}

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

	// Breadcrumbs items
	const breadcrumbItems = [
		{
			label: tCategories('math.title'),
			href: '/math',
		},
		{
			label: t('title'),
		},
	];

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='math'
				calculatorId='converter'
				namespace='calculators.converter.seo'
				featureKeys={['lengthConversion', 'massConversion', 'timeConversion', 'volumeConversion', 'metricImperialSupport', 'instantResults', 'highPrecision', 'multilingualSupport']}
				ratingValue='4.9'
				ratingCount='89'
				screenshot='https://calc1.ru/images/converter-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
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

			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
				{/* Header */}
				<Header />

				{/* Breadcrumbs */}
				<div className='bg-white dark:bg-gray-800 shadow-sm'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
						<Breadcrumbs items={breadcrumbItems} />
					</div>
				</div>

				{/* Hero Section */}
				<div className='bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Ruler className='w-12 h-12 text-white mr-4' />
								<h1 className='text-4xl md:text-5xl font-bold text-white'>
									{t('title')}
								</h1>
							</div>
							<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
								{t('description')}
							</p>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Ruler className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										50+
									</div>
									<div className='text-blue-100'>
										{t('hero.units')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										99%
									</div>
									<div className='text-blue-100'>
										{t('hero.accuracy')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Shuffle className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										PDF
									</div>
									<div className='text-blue-100'>
										{t('hero.format')}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<ConverterCalculator />

					{/* SEO Content */}
					<ConverterSEO />
				</div>
			</div>

			{/* BreadcrumbList Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{
								'@type': 'ListItem',
								position: 1,
								name: tCategories('breadcrumbs.home') || 'Главная',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('math.title'),
								item: `https://calc1.ru/${locale}/math`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/math/converter`,
							},
						],
					}),
				}}
			/>
		</>
	);
}
