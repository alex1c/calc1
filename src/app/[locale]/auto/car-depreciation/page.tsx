import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Car, Calculator, BarChart3, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CarDepreciationCalculator from '@/components/calculators/car-depreciation-calculator';
import CarDepreciationSEO from '@/components/seo/car-depreciation-seo';

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
	const t = (key: string) => messages.calculators['car-depreciation'].seo[key];

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
		formatDetection: { email: false, address: false, telephone: false },
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/auto/car-depreciation`,
			languages: {
				ru: 'https://calc1.ru/ru/auto/car-depreciation',
				en: 'https://calc1.ru/en/auto/car-depreciation',
				es: 'https://calc1.ru/es/auto/car-depreciation',
				de: 'https://calc1.ru/de/auto/car-depreciation',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/auto/car-depreciation`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/car-depreciation-og.jpg',
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
			images: ['https://calc1.ru/images/car-depreciation-og.jpg'],
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

export default async function CarDepreciationPage({
	params: { locale },
}: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale,
		namespace: 'calculators.car-depreciation',
	});
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.car-depreciation.seo',
	});
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{ label: tCategories('auto.title'), href: '/auto' },
		{ label: t('title') },
	];

	const faqRaw = tSeo.raw('faq.faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Hero */}
			<div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Car className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Точность
								</div>
								<div className='text-blue-100'>
									Рыночные коэффициенты
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<BarChart3 className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Графики
								</div>
								<div className='text-blue-100'>
									Наглядная динамика
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Методы
								</div>
								<div className='text-blue-100'>
									Линейный и экспоненциальный
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<CarDepreciationCalculator />
				<CarDepreciationSEO />
			</div>

			{/* Structured Data: WebApplication */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('title'),
						description: tSeo('description'),
						url: `https://calc1.ru/${locale}/auto/car-depreciation`,
						applicationCategory: 'FinanceApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'RUB',
						},
						author: {
							'@type': 'Organization',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.9',
							ratingCount: '137',
						},
						featureList: [
							'Графики',
							'Методы',
							'Рыночные коэффициенты',
						],
					}),
				}}
			/>

			{/* Structured Data: FAQ */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faq.map((item) => ({
							'@type': 'Question',
							name: item.q,
							acceptedAnswer: { '@type': 'Answer', text: item.a },
						})),
					}),
				}}
			/>

			{/* Structured Data: Breadcrumbs */}
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
								name: tCategories('auto.title'),
								item: `https://calc1.ru/${locale}/auto`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/auto/car-depreciation`,
							},
						],
					}),
				}}
			/>

			{/* Structured Data: HowTo */}
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
								name: 'Введите стоимость покупки',
								text: 'Укажите покупную стоимость автомобиля в рублях',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите возраст',
								text: 'Возраст автомобиля в годах',
							},
							{
								'@type': 'HowToStep',
								name: 'Внесите пробег',
								text: 'Фактический пробег автомобиля в километрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите класс и метод',
								text: 'Класс авто и метод амортизации: линейный или экспоненциальный',
							},
							{
								'@type': 'HowToStep',
								name: 'Нажмите рассчитать',
								text: 'Получите текущую стоимость и график снижения',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
