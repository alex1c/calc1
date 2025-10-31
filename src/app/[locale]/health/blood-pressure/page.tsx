import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Heart, Calculator, Target, Activity } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BloodPressureCalculator from '@/components/calculators/blood-pressure-calculator';
import BloodPressureSEO from '@/components/seo/blood-pressure-seo';
import { loadMergedHealthTranslations } from '@/lib/i18n-utils';

/**
 * Generate metadata for Blood Pressure Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const messages = await loadMergedHealthTranslations(locale);
	const t = (key: string) => messages.calculators['bloodPressure'].seo[key];

	const title = t('title');
	const description = t('description');
	const keywordsString = t('keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [];
	const canonicalUrl = `https://calc1.ru/${locale}/health/blood-pressure`;

	return {
		title: `${title} | Calc1.ru`,
		description,
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
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/health/blood-pressure',
				en: 'https://calc1.ru/en/health/blood-pressure',
				es: 'https://calc1.ru/es/health/blood-pressure',
				de: 'https://calc1.ru/de/health/blood-pressure',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: canonicalUrl,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/blood-pressure-og.jpg',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${title} | Calc1.ru`,
			description,
			images: ['https://calc1.ru/images/blood-pressure-og.jpg'],
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

/**
 * Blood Pressure Calculator Page
 * Calculates blood pressure categories and provides health recommendations
 */
export default async function BloodPressurePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bloodPressure',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.bloodPressure.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Get FAQ items for structured data
	const messages = await loadMergedHealthTranslations(locale);
	const seoData = messages.calculators['bloodPressure'].seo;
	const faqItems = seoData?.faq?.faqItems || [];

	// Breadcrumbs items
	const breadcrumbItems = [
		{ label: tCategories('health.title'), href: '/health' },
		{ label: t('title') },
	];

	// JSON-LD structured data for WebApplication
	const webApplicationData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		description: tSeo('description'),
		url: `https://calc1.ru/${locale}/health/blood-pressure`,
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
			ratingCount: '178',
		},
		featureList: [
			'Расчёт категории давления',
			'Нормы по возрасту',
			'Рекомендации по здоровью',
			'Визуальные индикаторы',
			'Оценка уровня риска',
		],
	};

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((f: { q: string; a: string }) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: f.a,
			},
		})),
	};

	// JSON-LD structured data for BreadcrumbList
	const breadcrumbData = {
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
				name: tCategories('health.title'),
				item: `https://calc1.ru/${locale}/health`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: t('title'),
				item: `https://calc1.ru/${locale}/health/blood-pressure`,
			},
		],
	};

	// JSON-LD structured data for HowTo
	const howToData = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'Как проверить артериальное давление',
		description: 'Пошаговая инструкция по использованию калькулятора давления',
		step: [
			{
				'@type': 'HowToStep',
				name: 'Введите возраст',
				text: 'Введите ваш возраст в годах для определения нормальных значений давления',
			},
			{
				'@type': 'HowToStep',
				name: 'Введите давление',
				text: 'Введите систолическое (верхнее) и диастолическое (нижнее) давление в мм рт. ст.',
			},
			{
				'@type': 'HowToStep',
				name: 'Получите результат',
				text: 'Калькулятор автоматически классифицирует ваше давление и покажет рекомендации по здоровью',
			},
		],
	};

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-800 dark:to-orange-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Heart className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-red-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Быстро
								</div>
								<div className='text-red-100'>
									Расчёт за секунды
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Target className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									6 категорий
								</div>
								<div className='text-red-100'>
									Классификация АД
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Activity className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Бесплатно
								</div>
								<div className='text-red-100'>
									Без регистрации
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<BloodPressureCalculator />

				{/* SEO Content */}
				<div className='mt-12'>
					<BloodPressureSEO />
				</div>
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webApplicationData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(howToData),
				}}
			/>
		</div>
	);
}
