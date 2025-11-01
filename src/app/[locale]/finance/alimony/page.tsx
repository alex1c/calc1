import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calculator, Users, Percent, Shield } from 'lucide-react';
import Header from '@/components/header';
import AlimonyCalculator from '@/components/calculators/alimony-calculator';
import AlimonySEO from '@/components/seo/alimony-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const { loadMergedFinanceTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFinanceTranslations(locale);
	const t = (key: string) => messages.calculators['alimony'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор алиментов',
			'расчёт алиментов',
			'алименты на детей',
			'сколько алиментов платить',
			'алименты в процентах',
			'фиксированные алименты',
			'алименты на одного ребёнка',
			'алименты на двоих детей',
			'алименты на троих детей',
			'расчёт алиментов от зарплаты',
			'минимальные алименты',
			'максимальные алименты',
			'калькулятор алиментов онлайн',
			'ст 81 СК РФ',
			'ст 83 СК РФ',
			'семейный кодекс алименты',
			'размер алиментов',
			'как рассчитать алименты',
			'алименты 2024',
			'индексация алиментов',
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
			canonical: `https://calc1.ru/${locale}/finance/alimony`,
			languages: {
				ru: 'https://calc1.ru/ru/finance/alimony',
				en: 'https://calc1.ru/en/finance/alimony',
				es: 'https://calc1.ru/es/finance/alimony',
				de: 'https://calc1.ru/de/finance/alimony',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/finance/alimony`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/alimony-og.jpg',
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
			images: ['https://calc1.ru/images/alimony-og.jpg'],
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

export default async function AlimonyPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.alimony',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
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
			<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Users className='w-12 h-12 text-white mr-4' />
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
								<Percent className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.methods')}
								</div>
								<div className='text-blue-100'>
									Расчёта
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
								<Shield className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.legal')}
								</div>
								<div className='text-blue-100'>
									Соответствие
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator */}
			<AlimonyCalculator />

			{/* SEO Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<AlimonySEO />
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
						url: `https://calc1.ru/${locale}/finance/alimony`,
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
							t('features.percentageCalculation'),
							t('features.fixedAmountCalculation'),
							t('features.mixedCalculation'),
							t('features.legalCompliance'),
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
								name: 'Главная',
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
								item: `https://calc1.ru/${locale}/finance/alimony`,
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
						name: 'Как рассчитать алименты на детей',
						description:
							'Пошаговая инструкция по использованию калькулятора алиментов',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите способ расчёта',
								text: 'Выберите способ расчёта алиментов: в процентах от дохода, фиксированной сумме или смешанном варианте',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите количество детей',
								text: 'Введите количество детей (от 1 до 10). От количества зависит процент: 25% на одного, 33% на двоих, 50% на троих и более',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите данные о доходах',
								text: 'Если расчёт в процентах - укажите ежемесячный доход после удержания НДФЛ (13%). Если фиксированная сумма - укажите прожиточный минимум и кратность',
							},
							{
								'@type': 'HowToStep',
								name: 'Настройте дополнительные параметры',
								text: 'Для фиксированной суммы укажите прожиточный минимум и кратность. Для смешанного варианта укажите процент и фиксированную часть',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает ежемесячную и годовую сумму алиментов, процент от дохода, сумму на одного ребёнка и остаток дохода',
							},
						],
					}),
				}}
			/>
		</div>
	);
}

