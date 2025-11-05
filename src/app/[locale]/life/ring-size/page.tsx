import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Gem, Ruler, Globe, Sparkles } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import RingSizeCalculator from '@/components/calculators/ring-size-calculator';
import RingSizeSEO from '@/components/seo/ring-size-seo';
import { Metadata } from 'next';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = params;
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedLifeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedLifeTranslations(locale);
	const t = (key: string) => messages.calculators.ringSize.seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'размер кольца',
			'конвертер размеров колец',
			'таблица размеров колец',
			'размер кольца онлайн',
			'перевод размеров колец',
			'размер кольца по диаметру',
			'измерение размера кольца',
			'размер кольца RU EU US UK',
			'размер кольца калькулятор',
			'диаметр кольца мм',
			'внутренний диаметр кольца',
			'размер кольца конвертер',
			'таблица соответствия размеров колец',
			'размер кольца для помолвки',
			'размер кольца для свадьбы',
			'размер кольца JP CN',
			'как узнать размер кольца',
			'как измерить размер кольца',
			'размер кольца по окружности',
			'размер кольца онлайн калькулятор',
			'конвертер RU EU US UK JP CN',
			'размер обручального кольца',
			'размер помолвочного кольца',
			'размер кольца с бриллиантом',
			'размер кольца измеритель',
			'ring size calculator',
			'ring size converter',
			'ring size chart',
			'ring size measurement',
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
			canonical: `https://calc1.ru/${locale}/life/ring-size`,
			languages: {
				ru: 'https://calc1.ru/ru/life/ring-size',
				en: 'https://calc1.ru/en/life/ring-size',
				es: 'https://calc1.ru/es/life/ring-size',
				de: 'https://calc1.ru/de/life/ring-size',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/ring-size`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/ring-size-og.jpg',
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
			images: ['https://calc1.ru/images/ring-size-og.jpg'],
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

export default async function RingSizePage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.ringSize',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.ringSize.seo',
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
			<div className='bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Gem className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-pink-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Globe className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									6 стран
								</div>
								<div className='text-pink-100'>
									RU, EU, US, UK, JP, CN
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Ruler className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									По диаметру
								</div>
								<div className='text-pink-100'>
									Точное измерение в мм
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Sparkles className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100% точно
								</div>
								<div className='text-pink-100'>
									Международные стандарты
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<RingSizeCalculator />

				{/* SEO Content */}
				<RingSizeSEO />
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
						url: `https://calc1.ru/${locale}/life/ring-size`,
						applicationCategory: 'UtilityApplication',
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
							ratingCount: '200',
						},
						featureList: [
							'Конвертация размеров колец между 6 системами',
							'Измерение по размеру или диаметру',
							'Таблица соответствий размеров',
							'Поддержка RU, EU, US, UK, JP, CN',
							'Точные международные стандарты',
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
						mainEntity: Array.from({ length: 30 }, (_, i) => ({
							'@type': 'Question',
							name: tSeo(`faq.faqItems.${i}.q`),
							acceptedAnswer: {
								'@type': 'Answer',
								text: tSeo(`faq.faqItems.${i}.a`),
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
								item: `https://calc1.ru/${locale}/life/ring-size`,
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
						name: 'Как определить размер кольца',
						description:
							'Пошаговая инструкция по использованию конвертера размеров колец',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите тип измерения',
								text: 'Выберите тип измерения: размер кольца или внутренний диаметр в миллиметрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите систему размеров',
								text: 'Выберите исходную страну: RU (Россия), EU (Европа), US (США), UK (Великобритания), JP (Япония) или CN (Китай)',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите значение',
								text: 'Введите размер кольца или внутренний диаметр в миллиметрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически покажет эквивалентные размеры во всех доступных системах (RU, EU, US, UK, JP, CN)',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
