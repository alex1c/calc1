import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Calculator, BarChart3, TrendingUp, Brain } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import StatisticsSEO from '@/components/seo/statistics-seo';

import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
// Dynamic import for calculator component
const StatisticsCalculator = dynamic(
	() => import('@/components/calculators/statistics-calculator'),
	{ ssr: false }
);

interface Props {
	params: { locale: string };
}

/**
 * Generate metadata for Statistics Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.statistics.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/math/statistics`;

	return {
		title,
		description,
		keywords: [
			'статистический калькулятор',
			'среднее арифметическое',
			'медиана',
			'мода',
			'дисперсия',
			'стандартное отклонение',
			'статистика онлайн',
			'анализ данных',
			'описательная статистика',
			'центральная тенденция',
			'разброс данных',
			'статистические показатели',
			'калькулятор статистики',
			'онлайн статистика',
			'расчет статистики',
			'статистический анализ',
			'математическая статистика',
			'выборочная статистика',
			'генеральная совокупность',
			'квантили',
			'перцентили',
			'коэффициент вариации',
			'асимметрия',
			'эксцесс',
			'нормальное распределение',
			'доверительные интервалы',
			'корреляция',
			'ковариация',
			'регрессионный анализ',
			'байесовская статистика',
		],
		alternates: {
			canonical: canonicalUrl,
			languages: generateLanguageAlternates('/math/statistics'),
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/og-statistics.png',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['https://calc1.ru/og-statistics.png'],
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
	};
}

/**
 * Statistics Calculator Page
 * Calculates various statistical measures from a dataset
 */
export default async function StatisticsPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.statistics',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.statistics.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.0.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.0.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.1.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.1.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.2.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.2.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.3.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.3.a'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.faqItems.4.q'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.faqItems.4.a'),
				},
			},
		],
	};

	// JSON-LD structured data for Software Application
	const softwareStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: t('title'),
		description: t('description'),
		applicationCategory: 'CalculatorApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'RUB',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '256',
		},
		featureList: [
			'Расчет среднего арифметического',
			'Определение медианы',
			'Поиск моды',
			'Вычисление дисперсии',
			'Стандартное отклонение',
			'Статистический анализ данных',
			'Поддержка больших массивов данных',
			'Экспорт результатов',
		],
	};

	// Breadcrumbs items
	const breadcrumbItems = [
		{ label: tCategories('math.title'), href: '/math' },
		{ label: t('title') },
	];

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(softwareStructuredData),
				}}
			/>

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
				<div className='bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<BarChart3 className='w-12 h-12 text-white mr-4' />
								<h1 className='text-4xl md:text-5xl font-bold text-white'>
									{t('title')}
								</h1>
							</div>
							<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
								{t('description')}
							</p>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										5
									</div>
									<div className='text-blue-100'>
										Основных показателей
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										100%
									</div>
									<div className='text-blue-100'>
										Точность расчетов
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Brain className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										∞
									</div>
									<div className='text-blue-100'>
										Размер данных
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<BarChart3 className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										PDF
									</div>
									<div className='text-blue-100'>
										Экспорт результатов
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<StatisticsCalculator />

					{/* SEO Content */}
					<StatisticsSEO />
				</div>
			</div>
		</>
	);
}
