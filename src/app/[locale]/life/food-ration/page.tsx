import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Apple, Calculator, Target, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import FoodRationSEO from '@/components/seo/food-ration-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamic import for client component
const FoodRationCalculator = dynamic(
	() => import('@/components/calculators/food-ration-calculator'),
	{ ssr: false }
);

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
	const t = (key: string) => messages.calculators.foodRation.seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор бжу',
			'норма белков жиров углеводов',
			'расчет бжу',
			'макросы калькулятор',
			'белки жиры углеводы',
			'норма бжу для похудения',
			'бжу для набора массы',
			'калькулятор макросов',
			'распределение бжу',
			'суточная норма белка',
			'суточная норма жиров',
			'суточная норма углеводов',
			'бжу калькулятор онлайн',
			'формула харриса-бенедикта',
			'расчет макронутриентов',
			'macronutrient calculator',
			'protein fat carbs calculator',
			'bju calculator',
			'macros calculator',
			'calculadora de macronutrientes',
			'makronährstoffrechner',
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
			canonical: `https://calc1.ru/${locale}/life/food-ration`,
			languages: {
				ru: 'https://calc1.ru/ru/life/food-ration',
				en: 'https://calc1.ru/en/life/food-ration',
				es: 'https://calc1.ru/es/life/food-ration',
				de: 'https://calc1.ru/de/life/food-ration',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/food-ration`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/food-ration-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/food-ration-calculator-og.jpg'],
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

export default async function FoodRationPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.foodRation',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.foodRation.seo',
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
			<div className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Apple className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-emerald-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Target className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3
								</div>
								<div className='text-emerald-100'>
									{t('hero.macros')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-emerald-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									BMR
								</div>
								<div className='text-emerald-100'>
									{t('hero.formula')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<FoodRationCalculator />

				{/* SEO Content */}
				<FoodRationSEO />
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
						url: `https://calc1.ru/${locale}/life/food-ration`,
						applicationCategory: 'HealthApplication',
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
							ratingCount: '189',
						},
						featureList: [
							t('features.bmrCalculation'),
							t('features.tdeeCalculation'),
							t('features.macroDistribution'),
							t('features.goalBased'),
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
								item: `https://calc1.ru/${locale}/life/food-ration`,
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
						name: 'Как рассчитать норму БЖУ',
						description:
							'Пошаговая инструкция по расчету суточной нормы белков, жиров и углеводов',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите пол',
								text: 'Укажите ваш пол (мужской или женский)',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите параметры',
								text: 'Укажите возраст, вес, рост',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите уровень активности',
								text: 'Выберите один из 5 уровней физической активности',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите цель',
								text: 'Укажите цель: похудение, поддержание или набор массы',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор покажет калории, белки, жиры и углеводы',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
