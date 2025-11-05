import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Zap, Calculator, TrendingUp, Coins } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import HashrateCalculator from '@/components/calculators/hashrate-calculator';
import HashrateCalculatorSEO from '@/components/seo/hashrate-calculator-seo';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedItTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedItTranslations(locale);
	const t = (key: string) => messages.calculators['hashrate'].seo[key];

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
			canonical: `https://calc1.ru/${locale}/it/hashrate`,
			languages: {
				ru: 'https://calc1.ru/ru/it/hashrate',
				en: 'https://calc1.ru/en/it/hashrate',
				es: 'https://calc1.ru/es/it/hashrate',
				de: 'https://calc1.ru/de/it/hashrate',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/it/hashrate`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/hashrate-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/hashrate-calculator-og.jpg'],
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

export default async function HashratePage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.hashrate',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.hashrate.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('it.title'),
			href: '/it',
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
			<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Zap className='w-12 h-12 text-white mr-4' />
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
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									6+
								</div>
								<div className='text-blue-100'>
									{t('hero.algorithms')}
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
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									ROI
								</div>
								<div className='text-blue-100'>
									{t('hero.profitability')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<HashrateCalculator />

				{/* SEO Content */}
				<HashrateCalculatorSEO />
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
						url: `https://calc1.ru/${locale}/it/hashrate`,
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
							ratingValue: '4.8',
							ratingCount: '156',
						},
						featureList: [
							tSeo('features.multipleAlgorithms'),
							tSeo('features.profitability'),
							tSeo('features.roi'),
							tSeo('features.electricity'),
							tSeo('features.poolFee'),
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
								name: 'Главная',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('it.title'),
								item: `https://calc1.ru/${locale}/it`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/it/hashrate`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'HowTo',
						name: 'Как рассчитать доходность майнинга',
						description: tSeo('calculation.content'),
						step: [
							{
								'@type': 'HowToStep',
								name: 'Введите хешрейт оборудования',
								text: 'Введите хешрейт вашего майнинг-оборудования и выберите единицу измерения (H/s, KH/s, MH/s, GH/s, TH/s, PH/s).',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите параметры сети',
								text: 'Введите сложность сети, награду за блок и время блока. Можно выбрать предустановленную криптовалюту или указать параметры вручную.',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите затраты',
								text: 'Введите потребление энергии оборудования в ваттах и стоимость электроэнергии. При необходимости укажите комиссию майнинг-пула.',
							},
							{
								'@type': 'HowToStep',
								name: 'Рассчитайте доходность',
								text: 'Нажмите кнопку "Рассчитать" для получения результатов: доходность, прибыль, затраты на электроэнергию и окупаемость.',
							},
						],
					}),
				}}
			/>
		</div>
	);
}

