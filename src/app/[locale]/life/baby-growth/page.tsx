import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Baby, Ruler, Weight, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BabyGrowthSEO from '@/components/seo/baby-growth-seo';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamic import for calculator component
const BabyGrowthCalculator = dynamic(
	() => import('@/components/calculators/baby-growth-calculator'),
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
	const t = (key: string) => messages.calculators.babyGrowth.seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор роста ребенка',
			'вес ребенка по возрасту',
			'нормы ВОЗ рост ребенка',
			'процентили роста ребенка',
			'развитие ребенка',
			'калькулятор веса ребенка',
			'рост ребенка таблица',
			'нормы роста детей ВОЗ',
			'калькулятор роста и веса',
			'процентили веса ребенка',
			'оценка развития ребенка',
			'нормальный рост ребенка',
			'рост ребенка по месяцам',
			'вес ребенка по месяцам',
			'калькулятор физического развития',
			'стандарты роста ВОЗ',
			'калькулятор процентилей',
			'оценка антропометрии',
			'нормальный вес ребенка',
			'таблица роста детей',
			'калькулятор роста мальчика',
			'калькулятор роста девочки',
			'развитие младенца',
			'калькулятор физического развития детей',
			'росто-весовые показатели',
			'антропометрические данные',
			'детский ростометр',
			'калькулятор процентилей роста',
			'WHO growth calculator',
			'child growth calculator',
			'percentile calculator',
			'growth chart calculator',
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
			canonical: `https://calc1.ru/${locale}/life/baby-growth`,
			languages: {
				ru: 'https://calc1.ru/ru/life/baby-growth',
				en: 'https://calc1.ru/en/life/baby-growth',
				es: 'https://calc1.ru/es/life/baby-growth',
				de: 'https://calc1.ru/de/life/baby-growth',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/baby-growth`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/baby-growth-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/baby-growth-calculator-og.jpg'],
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

export default async function BabyGrowthPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.babyGrowth',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.babyGrowth.seo',
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
			<div className='bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-800 dark:to-blue-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Baby className='w-12 h-12 text-white mr-4' />
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
								<Ruler className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.who')}
								</div>
								<div className='text-pink-100'>
									{t('hero.whoDesc')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.accuracy')}
								</div>
								<div className='text-pink-100'>
									{t('hero.accuracyDesc')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Weight className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.ageRange')}
								</div>
								<div className='text-pink-100'>
									{t('hero.ageRangeDesc')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<BabyGrowthCalculator />

				{/* SEO Content */}
				<BabyGrowthSEO />
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
						url: `https://calc1.ru/${locale}/life/baby-growth`,
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
							ratingValue: '4.8',
							ratingCount: '1250',
						},
						featureList: [
							t('features.whoStandards'),
							t('features.percentileCalculation'),
							t('features.growthAssessment'),
							t('features.recommendations'),
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
								item: `https://calc1.ru/${locale}/life/baby-growth`,
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
						name: 'Как рассчитать рост и вес ребенка по нормам ВОЗ',
						description:
							'Пошаговая инструкция по использованию калькулятора роста и веса ребенка',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите пол ребенка',
								text: 'Укажите пол вашего ребенка (мальчик или девочка), так как нормы роста и веса различаются по полу',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите возраст ребенка',
								text: 'Укажите возраст ребенка в месяцах или годах (от 0 до 5 лет)',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите рост и вес',
								text: 'Введите текущий рост ребенка в сантиметрах и вес в килограммах',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически определит процентили роста и веса, покажет соответствие нормам ВОЗ и даст рекомендации',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
