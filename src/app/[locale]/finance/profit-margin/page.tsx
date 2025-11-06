import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calculator, TrendingUp, Percent, BarChart3 } from 'lucide-react';
import Header from '@/components/header';
import ProfitMarginCalculator from '@/components/calculators/profit-margin-calculator';
import ProfitMarginSEO from '@/components/seo/profit-margin-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedFinanceTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFinanceTranslations(locale);
	const t = (key: string) => messages.calculators['profit-margin'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор маржинальности',
			'расчёт маржи',
			'маржа прибыли',
			'валовая маржа',
			'наценка',
			'рентабельность',
			'ROI',
			'маржинальность бизнеса',
			'расчёт наценки',
			'маржа от выручки',
			'маржа от себестоимости',
			'калькулятор маржи онлайн',
			'калькулятор наценки',
			'расчёт рентабельности',
			'финансовая маржа',
			'операционная маржа',
			'чистая маржа',
			'маржа в процентах',
			'как рассчитать маржу',
			'калькулятор рентабельности',
		],
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
			canonical: `https://calc1.ru/${locale}/finance/profit-margin`,
			languages: {
				ru: 'https://calc1.ru/ru/finance/profit-margin',
				en: 'https://calc1.ru/en/finance/profit-margin',
				es: 'https://calc1.ru/es/finance/profit-margin',
				de: 'https://calc1.ru/de/finance/profit-margin',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/finance/profit-margin`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/profit-margin-og.jpg',
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
			images: ['https://calc1.ru/images/profit-margin-og.jpg'],
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

export default async function ProfitMarginPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.profit-margin',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedFinanceTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFinanceTranslations(locale);

	// Validate locale
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('finance.title'),
			href: '/finance',
		},
		{
			label: t('title'),
		},
	];

	// Get FAQ items for structured data
	const faqRaw = t.raw('seo.faq.faqItems');
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
							<TrendingUp className='w-12 h-12 text-white mr-4' />
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
									{t('hero.types')}
								</div>
								<div className='text-green-100'>
									Расчёта
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Percent className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-green-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<BarChart3 className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.business')}
								</div>
								<div className='text-green-100'>
									Анализ
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator */}
			<ProfitMarginCalculator />

			{/* SEO Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<ProfitMarginSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: t('seo.title'),
						description: t('seo.description'),
						url: `https://calc1.ru/${locale}/finance/profit-margin`,
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
							t('features.marginCalculation'),
							t('features.markupCalculation'),
							t('features.profitAnalysis'),
							t('features.roiCalculation'),
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
								name: tCategories('finance.title'),
								item: `https://calc1.ru/${locale}/finance`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/finance/profit-margin`,
							},
						],
					}),
				}}
			/>{(() => {
		const howTo = messages.calculators?.profit-margin?.seo?.howTo;
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
	})()}те полученные показатели: валовую маржу, маржу прибыли, наценку, прибыль и ROI для принятия финансовых решений',
							},
						],
					}),
				}}
			/>
		</div>
	);
}

