import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Zap, Calculator, DollarSign, Layers } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ElectricityCostSEO from '@/components/seo/electricity-cost-seo';

const ElectricityCostCalculator = dynamic(
	() => import('@/components/calculators/electricity-cost-calculator'),
	{ ssr: false }
);

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.electricityCost.seo[key];

	return {
		title: `${t('meta.title')} | Calc1.ru`,
		description: t('meta.description'),
		keywords: [
			'калькулятор электроэнергии',
			'расчет стоимости электроэнергии',
			'расход электроэнергии',
			'стоимость электроэнергии',
			'потребление электроэнергии',
			'калькулятор расхода электроэнергии',
			'расчет электроэнергии онлайн',
			'стоимость электроэнергии по мощности',
			'расчет потребления электроэнергии',
			'калькулятор стоимости электроэнергии',
			'расход электроэнергии по приборам',
			'потребление электроэнергии бытовыми приборами',
			'расчет электроэнергии по мощности',
			'стоимость электроэнергии калькулятор',
			'расчет потребления электроэнергии онлайн',
			'калькулятор расхода электроэнергии по приборам',
			'стоимость электроэнергии за месяц',
			'расчет электроэнергии бытовых приборов',
			'потребление электроэнергии калькулятор',
			'расход электроэнергии онлайн',
			'тариф электроэнергии',
			'расчет стоимости электроэнергии онлайн',
			'потребление электроэнергии по мощности',
			'калькулятор электроэнергии бесплатно',
			'расчет электроэнергии за месяц',
			'стоимость электроэнергии по тарифу',
			'потребление электроэнергии бытовыми приборами калькулятор',
			'расход электроэнергии калькулятор',
			'электроэнергия расчет',
			'electricity cost calculator',
			'electricity consumption calculator',
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
			canonical: `https://calc1.ru/${locale}/life/electricity-cost`,
			languages: {
				ru: 'https://calc1.ru/ru/life/electricity-cost',
				en: 'https://calc1.ru/en/life/electricity-cost',
				es: 'https://calc1.ru/es/life/electricity-cost',
				de: 'https://calc1.ru/de/life/electricity-cost',
			},
		},
		openGraph: {
			title: `${t('meta.title')} | Calc1.ru`,
			description: t('meta.description'),
			url: `https://calc1.ru/${locale}/life/electricity-cost`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/electricity-cost-og.jpg',
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
			images: ['https://calc1.ru/images/electricity-cost-og.jpg'],
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

export default async function Page({ params: { locale } }: Props) {
	if (!['ru', 'en', 'de', 'es'].includes(locale)) notFound();

	const t = await getTranslations({
		locale,
		namespace: 'calculators.electricityCost',
	});
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.electricityCost.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{
			label: tCategories('life.title'),
			href: '/life',
		},
		{
			label: t('title'),
		},
	];

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
								{tSeo('h1')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{tSeo('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Несколько приборов
								</div>
								<div className='text-blue-100'>
									Суммирование расхода
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<DollarSign className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Стоимость
								</div>
								<div className='text-blue-100'>
									Расчет по тарифу
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Layers className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									CSV
								</div>
								<div className='text-blue-100'>
									Экспорт данных
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<ElectricityCostCalculator />

				{/* SEO Content */}
				<ElectricityCostSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('h1'),
						description: tSeo('description'),
						url: `https://calc1.ru/${locale}/life/electricity-cost`,
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
							ratingCount: '150',
						},
						featureList: [
							'Расчет потребления электроэнергии по мощности и времени',
							'Расчет стоимости электроэнергии по тарифу',
							'Поддержка нескольких приборов одновременно',
							'Экспорт результатов в CSV',
							'Автоматическое суммирование расхода',
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
								item: `https://calc1.ru/${locale}/life/electricity-cost`,
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
						name: 'Как рассчитать стоимость электроэнергии',
						description:
							'Пошаговая инструкция по использованию калькулятора стоимости электроэнергии',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Добавьте прибор',
								text: 'Введите название прибора, его мощность в ваттах, часы работы в день и количество дней использования',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите тариф',
								text: 'Введите тариф за 1 кВт⋅ч электроэнергии в вашем регионе',
							},
							{
								'@type': 'HowToStep',
								name: 'Добавьте дополнительные приборы',
								text: 'Нажмите "Добавить прибор" для расчета нескольких устройств одновременно',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результаты',
								text: 'Калькулятор автоматически рассчитает потребление в кВт⋅ч и стоимость для каждого прибора, а также итоговые значения',
							},
							{
								'@type': 'HowToStep',
								name: 'Экспортируйте данные',
								text: 'Используйте кнопку "Экспорт CSV" для сохранения результатов в файл',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
