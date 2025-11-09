import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AlertTriangle, Calculator, DollarSign, Clock } from 'lucide-react';
import Header from '@/components/header';
import TrafficFinesCalculator from '@/components/calculators/traffic-fines-calculator';
import TrafficFinesSEO from '@/components/seo/traffic-fines-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props) {
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	const { loadMergedAutoTranslations } = await import(
		'@/lib/i18n-utils'
	);
	const messages = await loadMergedAutoTranslations(locale);
	const t = (key: string) =>
		messages.calculators['traffic-fines'].seo[key];

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
			canonical: `https://calc1.ru/${locale}/auto/traffic-fines`,
			languages: generateLanguageAlternates('/auto/traffic-fines'),
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/auto/traffic-fines`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/traffic-fines-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/traffic-fines-calculator-og.jpg'],
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
			yandex: 'ae0a3b638a5ae1ab',
		},
	};
}

export default async function TrafficFinesPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.traffic-fines',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.traffic-fines.seo',
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
	if (!isSupportedLocale(locale)) {
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
			<div className='bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-800 dark:to-orange-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<AlertTriangle className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-red-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<DollarSign className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.discountPercent')}
								</div>
								<div className='text-red-100'>
									{t('hero.discount')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-red-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Clock className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.discountPeriodDays')}
								</div>
								<div className='text-red-100'>{t('hero.discountPeriod')}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<TrafficFinesCalculator />

				{/* SEO Content */}
				<TrafficFinesSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='auto'
				calculatorId='traffic-fines'
				namespace='calculators.traffic-fines.seo'
				featureKeys={['calculation', 'violations', 'discount', 'speedExceed', 'parking']}
				ratingValue='4.8'
				ratingCount='234'
				screenshot='https://calc1.ru/images/traffic-fines-screenshot.jpg'
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
								item: `https://calc1.ru/${locale}/auto/traffic-fines`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			{(() => {
				const howTo = messages.calculators?.traffic-fines?.seo?.howTo;
				if (!howTo || !howTo.steps) return null;
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

