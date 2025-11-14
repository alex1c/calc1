import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DataCalculator from '@/components/calculators/data-calculator';
import DataSEO from '@/components/seo/data-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

/**
 * Generate metadata for the data converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.data-converter.seo',
	});

	const title = getSafeTitle(t('title'), 'Конвертер данных');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн конвертер единиц данных: биты, байты, килобайты, мегабайты, гигабайты, терабайты. Быстрый перевод между единицами измерения данных.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
		alternates: {
			canonical: 'https://calc1.ru/converter/data',
			languages: {
				ru: 'https://calc1.ru/ru/converter/data',
				en: 'https://calc1.ru/en/converter/data',
				de: 'https://calc1.ru/de/converter/data',
				es: 'https://calc1.ru/es/converter/data',
			},
		},
		openGraph: {
			title,
			description,
			url: `https://calc1.ru/${locale}/converter/data`,
			siteName: 'Calc1.ru',
			images: [
				{
					url: 'https://calc1.ru/og-data-converter.png',
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['https://calc1.ru/og-data-converter.png'],
		},
	};
}

/**
 * Data Converter Page
 * Interactive converter for data units
 */
export default async function DataPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.data-converter',
	});
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Breadcrumb items
	const breadcrumbItems = [
		{
			label: tCategories('converter.title'),
			href: '/converter',
		},
		{ label: t('title') },
	];

	// SEO translations
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.data-converter.seo',
	});

	// FAQ structured data
	const faqData = tSeo.raw('faqItems');
	const faqArray = Array.isArray(faqData) ? faqData : [];
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqArray.map((faq: any) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.a,
			},
		})),
	};

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='converter'
				calculatorId='data'
				namespace='calculators.data-converter.seo'
				featureKeys={['unitConversion', 'multipleUnits', 'instantCalculation', 'multilingualInterface']}
				ratingValue='4.9'
				ratingCount='150'
				screenshot='https://calc1.ru/images/data-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
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

					<DataCalculator />

					<div className='mt-12'>
						<DataSEO />
					</div>
				</div>
			</div>
		</>
	);
}
