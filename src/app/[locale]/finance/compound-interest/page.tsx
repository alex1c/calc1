import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TrendingUp, Calculator, DollarSign, Percent } from 'lucide-react';
import Header from '@/components/header';
import CompoundInterestCalculator from '@/components/calculators/compound-interest-calculator';
import CompoundInterestSEO from '@/components/seo/compound-interest-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedFinanceTranslations } = await import(
		'@/lib/i18n-utils'
	);
	const messages = await loadMergedFinanceTranslations(locale);
	const t = (key: string) =>
		messages.calculators['compound-interest'].seo[key];

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
			canonical: `https://calc1.ru/${locale}/finance/compound-interest`,
			languages: {
				ru: 'https://calc1.ru/ru/finance/compound-interest',
				en: 'https://calc1.ru/en/finance/compound-interest',
				es: 'https://calc1.ru/es/finance/compound-interest',
				de: 'https://calc1.ru/de/finance/compound-interest',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/finance/compound-interest`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/compound-interest-calculator-og.jpg',
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
				'https://calc1.ru/images/compound-interest-calculator-og.jpg',
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
			yandex: 'ae0a3b638a5ae1ab',
		},
	};
}

export default async function CompoundInterestPage({
	params: { locale },
}: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.compound-interest',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.compound-interest.seo',
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
			<div className='bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-800 dark:via-emerald-800 dark:to-teal-800'>
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
								<DollarSign className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.format')}
								</div>
								<div className='text-green-100'>₽</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Percent className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.accuracy')}
								</div>
								<div className='text-green-100'>100%</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.frequencies')}
								</div>
								<div className='text-green-100'>
									{t('features.multipleFrequencies')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<CompoundInterestCalculator />

				{/* SEO Content */}
				<CompoundInterestSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='finance'
				calculatorId='compound-interest'
				namespace='calculators.compound-interest.seo'
				featureKeys={['format', 'accuracy', 'frequencies']}
				featureNamespace='calculators.compound-interest.hero'
				ratingValue='4.9'
				ratingCount='127'
				screenshot='https://calc1.ru/images/compound-interest-screenshot.jpg'
			/>

			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faq.slice(0, 10).map((item) => ({
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
								item: `https://calc1.ru/${locale}/finance/compound-interest`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			{(() => {
				const howToRaw = tSeo.raw('howTo');
				const howTo = howToRaw as {
					title: string;
					description: string;
					step1: { name: string; text: string };
					step2: { name: string; text: string };
					step3: { name: string; text: string };
					step4: { name: string; text: string };
				};
				return (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'HowTo',
								name: tSeo('title'),
								description: tSeo('description'),
								step: [
									{
										'@type': 'HowToStep',
										name: howTo?.step1?.name || 'Введите начальный капитал',
										text: howTo?.step1?.text || 'Введите сумму начального капитала в рублях',
									},
									{
										'@type': 'HowToStep',
										name: howTo?.step2?.name || 'Укажите процентную ставку',
										text: howTo?.step2?.text || 'Введите годовую процентную ставку',
									},
									{
										'@type': 'HowToStep',
										name: howTo?.step3?.name || 'Выберите срок',
										text: howTo?.step3?.text || 'Укажите срок накопления в годах и месяцах',
									},
									{
										'@type': 'HowToStep',
										name: howTo?.step4?.name || 'Нажмите рассчитать',
										text: howTo?.step4?.text || 'Получите результат с графиком роста',
									},
								],
							}),
						}}
					/>
				);
			})()}
		</div>
	);
}
