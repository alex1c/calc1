import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Globe, Clock, MapPin } from 'lucide-react';
import Header from '@/components/header';
import WorldTimeCalculator from '@/components/calculators/world-time-calculator';
import WorldTimeSEO from '@/components/seo/world-time-seo';
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
	const { loadMergedTimeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedTimeTranslations(locale);
	const t = (key: string) => messages.calculators.worldTime.seo[key];

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
			canonical: `https://calc1.ru/${locale}/time/world-time`,
			languages: {
				ru: 'https://calc1.ru/ru/time/world-time',
				en: 'https://calc1.ru/en/time/world-time',
				es: 'https://calc1.ru/es/time/world-time',
				de: 'https://calc1.ru/de/time/world-time',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/time/world-time`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/world-time-online-og.jpg',
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
			images: ['https://calc1.ru/images/world-time-online-og.jpg'],
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

export default async function WorldTimePage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.worldTime',
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
			label: tCategories('time.title'),
			href: '/time',
		},
		{
			label: t('title'),
		},
	];

	// Get FAQ items for structured data
	const { loadMergedTimeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedTimeTranslations(locale);
	const faqRaw = messages.calculators?.worldTime?.seo?.faq?.faqItems || [];
	const faq = Array.isArray(faqRaw) ? faqRaw : [];

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
			<div className='bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-800 dark:to-blue-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Globe className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-indigo-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Globe className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									24
								</div>
								<div className='text-indigo-100'>
									{t('hero.timeZones')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<MapPin className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									200+
								</div>
								<div className='text-indigo-100'>
									{t('hero.cities')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Clock className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									24/7
								</div>
								<div className='text-indigo-100'>
									{t('hero.accuracy')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<WorldTimeCalculator />

				{/* SEO Content */}
				<WorldTimeSEO />
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
						url: `https://calc1.ru/${locale}/time/world-time`,
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
							ratingCount: '267',
						},
						featureList: [
							t('seo.features.realTime'),
							t('seo.features.multipleCities'),
							t('seo.features.timeZones'),
							t('seo.features.search'),
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
						mainEntity: faq.map((f: any) => ({
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
								name: tCategories('time.title'),
								item: `https://calc1.ru/${locale}/time`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/time/world-time`,
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
						name: 'Как использовать калькулятор мирового времени',
						description:
							'Пошаговая инструкция по использованию калькулятора мирового времени для работы с разными часовыми поясами',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Найти нужный город',
								text: 'Используйте поиск по названию города или выберите из списка популярных городов',
							},
							{
								'@type': 'HowToStep',
								name: 'Добавить город',
								text: 'Выберите город из результатов поиска, и он автоматически добавится к списку отображаемых городов',
							},
							{
								'@type': 'HowToStep',
								name: 'Просмотреть время',
								text: 'Калькулятор автоматически покажет текущее время в добавленных городах с учётом их часовых поясов',
							},
							{
								'@type': 'HowToStep',
								name: 'Сравнить время',
								text: 'Все города отображаются одновременно, что позволяет легко сравнить время между разными часовыми поясами',
							},
							{
								'@type': 'HowToStep',
								name: 'Настроить формат',
								text: 'В настройках можно выбрать формат времени (12/24 часа), отображение секунд, даты и других параметров',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
