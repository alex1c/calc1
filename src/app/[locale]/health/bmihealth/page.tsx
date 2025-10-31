import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Scale, Calculator, Target, Heart } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BMIHealthCalculator from '@/components/calculators/bmi-health-calculator';
import BMIHealthSEO from '@/components/seo/bmi-health-seo';
import { loadMergedHealthTranslations } from '@/lib/i18n-utils';

/**
 * Generate metadata for BMI Health Calculator page
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
	const t = (key: string) => messages.calculators['bmiHealth'].seo[key];

	const title = t('title');
	const description = t('description');
	const keywordsString = t('keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [];
	const canonicalUrl = `https://calc1.ru/${locale}/health/bmihealth`;

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
				ru: 'https://calc1.ru/ru/health/bmihealth',
				en: 'https://calc1.ru/en/health/bmihealth',
				es: 'https://calc1.ru/es/health/bmihealth',
				de: 'https://calc1.ru/de/health/bmihealth',
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
					url: 'https://calc1.ru/images/bmi-health-og.jpg',
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
			images: ['https://calc1.ru/images/bmi-health-og.jpg'],
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
 * BMI Health Calculator Page
 * Calculates Body Mass Index and provides health recommendations
 */
export default async function BMIHealthPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bmiHealth',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.bmiHealth.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Get FAQ items for structured data
	const messages = await loadMergedHealthTranslations(locale);
	const seoData = messages.calculators['bmiHealth'].seo;
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
		url: `https://calc1.ru/${locale}/health/bmihealth`,
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
			ratingCount: '156',
		},
		featureList: [
			'Расчёт индекса массы тела',
			'Определение категории веса',
			'Расчёт нормального диапазона веса',
			'Визуальная шкала BMI',
			'Рекомендации по здоровью',
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
				item: `https://calc1.ru/${locale}/health/bmihealth`,
			},
		],
	};

	// JSON-LD structured data for HowTo
	const howToData = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'Как рассчитать индекс массы тела (BMI)',
		description: 'Пошаговая инструкция по использованию калькулятора BMI',
		step: [
			{
				'@type': 'HowToStep',
				name: 'Измерьте вес',
				text: 'Измерьте свой вес в килограммах утром натощак для наиболее точного результата',
			},
			{
				'@type': 'HowToStep',
				name: 'Измерьте рост',
				text: 'Измерьте свой рост в сантиметрах',
			},
			{
				'@type': 'HowToStep',
				name: 'Введите данные',
				text: 'Введите вес и рост в калькулятор BMI',
			},
			{
				'@type': 'HowToStep',
				name: 'Получите результат',
				text: 'Калькулятор автоматически рассчитает ваш индекс массы тела и покажет категорию веса с рекомендациями',
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
			<div className='bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Scale className='w-12 h-12 text-white mr-4' />
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
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Быстро
								</div>
								<div className='text-blue-100'>
									Расчёт за секунды
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Target className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Точно
								</div>
								<div className='text-blue-100'>
									По формуле ВОЗ
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Heart className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Бесплатно
								</div>
								<div className='text-blue-100'>
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
				<BMIHealthCalculator />

				{/* SEO Content */}
				<div className='mt-12'>
					<BMIHealthSEO />
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
