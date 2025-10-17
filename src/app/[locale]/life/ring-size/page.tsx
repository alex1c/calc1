import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import RingSizeCalculator from '@/components/calculators/ring-size-calculator';
import RingSizeSEO from '@/components/seo/ring-size-seo';
import ringSizeData from '@/data/ring-size.json';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.ringSize.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		alternates: {
			canonical: 'https://calc1.ru/life/ring-size',
			languages: {
				ru: 'https://calc1.ru/ru/life/ring-size',
				en: 'https://calc1.ru/en/life/ring-size',
				de: 'https://calc1.ru/de/life/ring-size',
				es: 'https://calc1.ru/es/life/ring-size',
			},
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: 'https://calc1.ru/life/ring-size',
			siteName: 'Calc1.ru',
			images: [
				{
					url: 'https://calc1.ru/images/ring-size-og.jpg',
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
			images: ['https://calc1.ru/images/ring-size-og.jpg'],
		},
	};
}

export default async function RingSizePage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.ringSize',
	});
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.ringSize.seo',
	});

	// Validate locale
	if (!['ru', 'en', 'de', 'es'].includes(locale)) {
		notFound();
	}

	const breadcrumbs = [
		{ label: t('breadcrumbs.home'), href: `/${locale}` },
		{ label: t('breadcrumbs.life'), href: `/${locale}/life` },
		{ label: t('title') },
	];

	// FAQ structured data
	const faqData = tSeo.raw('faqItems') as Array<{ q: string; a: string }>;

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: tSeo('title'),
		description: tSeo('description'),
		url: 'https://calc1.ru/life/ring-size',
		applicationCategory: 'UtilityApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		featureList: [
			'Ring size conversion between 6 systems',
			'RU, EU, US, UK, JP, CN size standards',
			'Diameter and size measurement',
			'Multilingual support',
		],
	};

	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqData.map((faq: any) => ({
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
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
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
					<Breadcrumbs items={breadcrumbs} />

					{/* Page Header */}
					<div className='text-center mb-8'>
						<h1 className='text-4xl font-bold text-gray-900 mb-4'>
							{tSeo('h1')}
						</h1>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{tSeo('description')}
						</p>
					</div>

					{/* Calculator Component */}
					<RingSizeCalculator />

					{/* SEO Content */}
					<RingSizeSEO />
				</div>
			</div>
		</>
	);
}
