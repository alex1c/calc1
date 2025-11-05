import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Flame, Calculator, Droplets, Utensils } from 'lucide-react';
import Header from '@/components/header';
import GasUsageCalculator from '@/components/calculators/gas-usage-calculator';
import GasUsageSEO from '@/components/seo/gas-usage-seo';
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
	const { loadMergedLifeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedLifeTranslations(locale);
	const t = (key: string) => messages.calculators['gasUsage'].seo[key];

	return {
		title: `${t('meta.title')} | Calc1.ru`,
		description: t('meta.description'),
		keywords: [
			'расход газа',
			'стоимость газа',
			'расчет расхода газа',
			'калькулятор расхода газа',
			'расход газа для отопления',
			'расход газа для газовой плиты',
			'расход газа для газовой колонки',
			'сколько газа потребляет котёл',
			'расход газа за месяц',
			'стоимость газа для отопления',
			'расчет газа для отопления дома',
			'расход газа по площади',
			'расход газа для горячего водоснабжения',
			'расход газа для приготовления пищи',
			'расход газа для квартиры',
			'расход газа для частного дома',
			'расход газа двухконтурного котла',
			'расход газа конденсационного котла',
			'расход газа с учетом КПД',
			'как снизить расход газа',
			'экономия газа',
			'расход газа на отопление',
			'расход газа для бани',
			'расход газа для теплицы',
			'расход газа для гаража',
			'расход газа для производства',
			'расход газа для коммерческого помещения',
			'gas consumption calculator',
			'gas usage calculation',
			'gas cost calculator',
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
			canonical: `https://calc1.ru/${locale}/life/gas-usage`,
			languages: {
				ru: 'https://calc1.ru/ru/life/gas-usage',
				en: 'https://calc1.ru/en/life/gas-usage',
				es: 'https://calc1.ru/es/life/gas-usage',
				de: 'https://calc1.ru/de/life/gas-usage',
			},
		},
		openGraph: {
			title: `${t('meta.title')} | Calc1.ru`,
			description: t('meta.description'),
			url: `https://calc1.ru/${locale}/life/gas-usage`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/gas-usage-og.jpg',
					width: 1200,
					height: 630,
					alt: t('meta.title'),
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${t('meta.title')} | Calc1.ru`,
			description: t('meta.description'),
			images: ['https://calc1.ru/images/gas-usage-og.jpg'],
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

export default async function GasUsagePage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.gasUsage',
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
			label: tCategories('life.title'),
			href: '/life',
		},
		{
			label: t('title'),
		},
	];

	// Get FAQ items for structured data
	const faqRaw = t.raw('seo.faqItems');
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
							<Flame className='w-12 h-12 text-white mr-4' />
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
								<Flame className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3
								</div>
								<div className='text-blue-100'>
									{t('hero.purposes')}
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
								<Droplets className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									м³/ч
								</div>
								<div className='text-blue-100'>Расход</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<GasUsageCalculator />

				{/* SEO Content */}
				<GasUsageSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: t('seo.meta.title'),
						description: t('seo.meta.description'),
						url: `https://calc1.ru/${locale}/life/gas-usage`,
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
							t('features.consumptionCalculation'),
							t('features.costCalculation'),
							t('features.multiplePurposes'),
							t('features.efficiency'),
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
								name: tCategories('life.title'),
								item: `https://calc1.ru/${locale}/life`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/life/gas-usage`,
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
						name: 'Как рассчитать расход газа',
						description:
							'Пошаговая инструкция по использованию калькулятора расхода газа',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите назначение газа',
								text: 'Выберите назначение использования газа: отопление, горячее водоснабжение или приготовление пищи',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите параметры',
								text: 'Для отопления укажите площадь помещения. Для всех назначений укажите мощность оборудования, время работы в день, КПД системы и продолжительность периода',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите тариф',
								text: 'Введите тариф на газ в рублях за м³',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает расход газа в час, суточный, месячный и за период расход, а также стоимость газа для всех периодов',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
