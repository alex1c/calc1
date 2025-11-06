import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Receipt, Calculator, DollarSign, MapPin } from 'lucide-react';
import Header from '@/components/header';
import VehicleTaxCalculator from '@/components/calculators/vehicle-tax-calculator';
import VehicleTaxSEO from '@/components/seo/vehicle-tax-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedAutoTranslations } = await import(
		'@/lib/i18n-utils'
	);
	const messages = await loadMergedAutoTranslations(locale);
	const t = (key: string) =>
		messages.calculators['vehicle-tax'].seo[key];

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
			canonical: `https://calc1.ru/${locale}/auto/vehicle-tax`,
			languages: {
				ru: 'https://calc1.ru/ru/auto/vehicle-tax',
				en: 'https://calc1.ru/en/auto/vehicle-tax',
				es: 'https://calc1.ru/es/auto/vehicle-tax',
				de: 'https://calc1.ru/de/auto/vehicle-tax',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/auto/vehicle-tax`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/vehicle-tax-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/vehicle-tax-calculator-og.jpg'],
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

export default async function VehicleTaxPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.vehicle-tax',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.vehicle-tax.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedAutoTranslations } = await import(
		'@/lib/i18n-utils'
	);
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
			<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Receipt className='w-12 h-12 text-white mr-4' />
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
								<MapPin className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.regionsCount')}
								</div>
								<div className='text-blue-100'>{t('hero.regions')}</div>
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
								<DollarSign className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.paymentDeadlineDate')}
								</div>
								<div className='text-blue-100'>{t('hero.paymentDeadline')}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<VehicleTaxCalculator />

				{/* SEO Content */}
				<VehicleTaxSEO />
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
						url: `https://calc1.ru/${locale}/auto/vehicle-tax`,
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
							ratingCount: '178',
						},
						featureList: [
							'Расчёт транспортного налога',
							'Региональные ставки',
							'Коэффициент владения',
							'Мощность двигателя',
							'Налоговые льготы',
						],
					}),
				}}
			/>

			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: (() => {
							const faqRaw = tSeo.raw('faq.faqItems');
							const faq = Array.isArray(faqRaw)
								? (faqRaw as Array<{ q: string; a: string }>)
								: [];
							return faq.map((item) => ({
								'@type': 'Question',
								name: item.q,
								acceptedAnswer: {
									'@type': 'Answer',
									text: item.a,
								},
							}));
						})(),
					}),
				}}
			/>

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
								item: `https://calc1.ru/${locale}/auto/vehicle-tax`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			{(() => {
				const howTo = messages.calculators?.vehicle-tax?.seo?.howTo;
				if (!howTo) return null;
				return (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
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
							}),
						}}
					/>
				);
			})()}
		</div>
	);
}

