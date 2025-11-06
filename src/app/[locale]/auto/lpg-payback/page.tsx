import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Fuel, Calculator, TrendingUp, Leaf } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import LpgPaybackCalculator from '@/components/calculators/lpg-payback-calculator';
import LpgPaybackSEO from '@/components/seo/lpg-payback-seo';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedAutoTranslations } = await import(
		'@/lib/i18n-utils'
	);
	const messages = await loadMergedAutoTranslations(locale);
	const t = (key: string) =>
		messages.calculators['lpg-payback'].seo[key];

	const keywordsString = t('keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords,
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/auto/lpg-payback`,
			languages: {
				ru: 'https://calc1.ru/ru/auto/lpg-payback',
				en: 'https://calc1.ru/en/auto/lpg-payback',
				es: 'https://calc1.ru/es/auto/lpg-payback',
				de: 'https://calc1.ru/de/auto/lpg-payback',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/auto/lpg-payback`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/lpg-payback-calculator-og.jpg',
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			images: [
				'https://calc1.ru/images/lpg-payback-calculator-og.jpg',
			],
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
		verification: {
			google: 'your-google-verification-code',
			yandex: 'your-yandex-verification-code',
		},
	};
}

export default async function LpgPaybackPage({
	params: { locale },
}: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.lpg-payback',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.lpg-payback.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedAutoTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedAutoTranslations(locale);

	// Validate locale
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('auto.title'),
			href: '/auto',
		},
		{
			label: t('title'),
		},
	];

	// Get FAQ items for structured data
	const faqRaw = tSeo.raw('faq.faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	return (
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
			<div className='bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-800 dark:to-emerald-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Fuel className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-green-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-green-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.economy')}
								</div>
								<div className='text-green-100'>
									Топлива
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Leaf className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.environmental')}
								</div>
								<div className='text-green-100'>
									Чище воздух
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator */}
			<LpgPaybackCalculator />

			{/* SEO Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<LpgPaybackSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('title'),
						description: tSeo('description'),
						url: `https://calc1.ru/${locale}/auto/lpg-payback`,
						applicationCategory: 'FinanceApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'RUB',
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.9',
							ratingCount: '127',
						},
						featureList: [
							t('features.paybackCalculation'),
							t('features.economyAnalysis'),
							t('features.costComparison'),
							t('features.accuracy'),
						],
					}),
				}}
			/>

			{/* FAQ Structured Data */}
			{faq.length > 0 && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: faq.slice(0, 30).map((item) => ({
								'@type': 'Question',
								name: item.q,
								acceptedAnswer: {
									'@type': 'Answer',
									text: item.a,
								},
							})),
						}),
					}}
				/>
			)}

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
								name: messages.breadcrumbs?.home || 'Home',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('auto.title'),
								item: `https://calc1.ru/${locale}/auto`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/auto/lpg-payback`,
							},
						],
					}),
				}}
			/>

			{(() => {
		const howTo = messages.calculators?.lpg-payback?.seo?.howTo;
		if (!howTo) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'HowTo',
			name: howTo.title,
			description: howTo.description,
			step: Object.keys(howTo.steps)
				.sort()
				.map(key => ({
					'@type': 'HowToStep',
					name: howTo.steps[key].name,
					text: howTo.steps[key].text,
				})),
		};
	})()} срок окупаемости ГБО, годовую и месячную экономию, стоимость топлива за год и экономию за несколько лет',
							},
						],
					}),
				}}
			/>
		</div>
	);
}

