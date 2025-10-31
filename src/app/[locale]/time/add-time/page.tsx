import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Clock, Calculator, CheckCircle } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AddTimeCalculator from '@/components/calculators/add-time-calculator';
import AddTimeSEO from '@/components/seo/add-time-seo';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const { loadMergedTimeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedTimeTranslations(locale);
	const t = (key: string) => messages.calculators.addTime.seo[key];

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
			canonical: `https://calc1.ru/${locale}/time/add-time`,
			languages: {
				ru: 'https://calc1.ru/ru/time/add-time',
				en: 'https://calc1.ru/en/time/add-time',
				es: 'https://calc1.ru/es/time/add-time',
				de: 'https://calc1.ru/de/time/add-time',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/time/add-time`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/add-time-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/add-time-calculator-og.jpg'],
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

export default async function AddTimePage({
	params: { locale },
}: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.addTime',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{ label: tCategories('time.title'), href: '/time' },
		{ label: t('title') },
	];

	// Get FAQ items for structured data
	const { loadMergedTimeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedTimeTranslations(locale);
	const faqRaw = messages.calculators?.addTime?.seo?.faq?.faqItems || [];
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
			<div className='bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-800 dark:via-emerald-800 dark:to-teal-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Clock className='w-12 h-12 text-white mr-4' />
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
								<Clock className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.time')}
								</div>
								<div className='text-green-100'>Точный расчёт</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-green-100'>{t('hero.accuracy')}</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.free')}
								</div>
								<div className='text-green-100'>Использование</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<AddTimeCalculator />

				{/* SEO Content */}
				<AddTimeSEO />
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
						url: `https://calc1.ru/${locale}/time/add-time`,
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
							ratingCount: '142',
						},
						featureList: [
							t('seo.advantages.precise'),
							t('seo.advantages.flexible'),
							t('seo.advantages.detailed'),
							t('seo.advantages.mobile'),
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
								item: `https://calc1.ru/${locale}/time/add-time`,
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
						name: 'Как прибавить время к дате',
						description:
							'Пошаговая инструкция по использованию калькулятора прибавления времени',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите начальную дату и время',
								text: 'Укажите дату и время, от которой начинается отсчёт',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите количество дней',
								text: 'Введите количество дней, которое нужно прибавить (можно оставить 0)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите количество часов',
								text: 'Введите количество часов, которое нужно прибавить (можно оставить 0)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите количество минут',
								text: 'Введите количество минут, которое нужно прибавить (можно оставить 0)',
							},
							{
								'@type': 'HowToStep',
								name: 'Нажмите рассчитать',
								text: 'Калькулятор автоматически вычислит итоговую дату и время',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Результат отобразится с итоговой датой, временем и днём недели',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
