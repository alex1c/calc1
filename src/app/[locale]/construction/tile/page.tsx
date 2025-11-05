import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Square, Calculator, Package, Layers } from 'lucide-react';
import Header from '@/components/header';
import TileCalculator from '@/components/calculators/tile-calculator';
import TileSEO from '@/components/seo/tile-seo';
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
	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);
	const t = (key: string) => messages.calculators['tile'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор плитки',
			'расчёт плитки',
			'количество плитки',
			'плитка для пола',
			'керамическая плитка',
			'расчёт плитки на м2',
			'калькулятор плитки онлайн',
			'плитка для ванной',
			'плитка для кухни',
			'керамогранит',
			'мозаика',
			'калькулятор кафеля',
			'расход плитки',
			'сколько плитки нужно',
			'упаковки плитки',
			'запас плитки',
			'подрезка плитки',
			'расчёт напольной плитки',
			'расчёт настенной плитки',
			'плитка для стен',
			'плитка для пола расчёт',
			'калькулятор плитки бесплатно',
			'онлайн калькулятор плитки',
			'расчёт количества плитки',
			'плитка калькулятор',
			'калькулятор керамической плитки',
			'расчёт плитки для ванной',
			'расчёт плитки для кухни',
			'плитка онлайн калькулятор',
			'калькулятор напольной плитки',
			'калькулятор настенной плитки',
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
			canonical: `https://calc1.ru/${locale}/construction/tile`,
			languages: {
				ru: 'https://calc1.ru/ru/construction/tile',
				en: 'https://calc1.ru/en/construction/tile',
				es: 'https://calc1.ru/es/construction/tile',
				de: 'https://calc1.ru/de/construction/tile',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/construction/tile`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/tile-og.jpg',
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
			images: ['https://calc1.ru/images/tile-og.jpg'],
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

export default async function TilePage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.tile',
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
			label: tCategories('construction.title'),
			href: '/construction',
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
			<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Square className='w-12 h-12 text-white mr-4' />
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
								<Package className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Упаковки
								</div>
								<div className='text-blue-100'>
									{t('hero.format')}
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
								<Layers className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									10%
								</div>
								<div className='text-blue-100'>
									{t('hero.reserve')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<TileCalculator />

				{/* SEO Content */}
				<TileSEO />
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
						url: `https://calc1.ru/${locale}/construction/tile`,
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
							t('features.areaCalculation'),
							t('features.tileCalculation'),
							t('features.packageCalculation'),
							t('features.reserveCalculation'),
							t('features.accuracy'),
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
						mainEntity: faq.map((f) => ({
							'@type': 'Question',
							name: f.q,
							acceptedAnswer: {
								'@type': 'Answer',
								text: f.a,
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
								name: 'Главная',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('construction.title'),
								item: `https://calc1.ru/${locale}/construction`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/construction/tile`,
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
						name: 'Как рассчитать количество плитки',
						description:
							'Пошаговая инструкция по использованию калькулятора плитки',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Измерьте комнату',
								text: 'Укажите длину и ширину комнаты в метрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите размер плитки',
								text: 'Введите длину и ширину плитки в сантиметрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите количество в упаковке',
								text: 'Введите количество плиток в одной упаковке',
							},
							{
								'@type': 'HowToStep',
								name: 'Установите запас',
								text: 'Укажите процент запаса материала (рекомендуется 10%)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите ширину шва',
								text: 'Введите ширину шва между плитками в миллиметрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает необходимое количество плиток и упаковок',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
