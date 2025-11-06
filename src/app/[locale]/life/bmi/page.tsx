import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Scale, Calculator, Heart, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import BMICalculator from '@/components/calculators/bmi-calculator';
import BMISEO from '@/components/seo/bmi-seo';
import Breadcrumbs from '@/components/breadcrumbs';
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
	const t = (key: string) => messages.calculators.bmi.seo[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: [
			'калькулятор имт',
			'индекс массы тела',
			'bmi калькулятор',
			'рассчитать имт',
			'нормальный вес',
			'индекс массы тела онлайн',
			'bmi индекс',
			'калькулятор веса',
			'здоровый вес',
			'избыточный вес',
			'недостаток веса',
			'ожирение',
			'калькулятор имт онлайн',
			'bmi calculator',
			'body mass index',
			'calculate bmi',
			'normal weight',
			'calculadora imc',
			'bmi rechner',
			'calculateur imc',
		],
		alternates: {
			canonical: `https://calc1.ru/${locale}/life/bmi`,
			languages: {
				ru: 'https://calc1.ru/ru/life/bmi',
				en: 'https://calc1.ru/en/life/bmi',
				es: 'https://calc1.ru/es/life/bmi',
				de: 'https://calc1.ru/de/life/bmi',
			},
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/bmi`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
		},
	};
}

export default async function BMIPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.bmi',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.bmi.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedLifeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedLifeTranslations(locale);

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
			<div className='bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-800 dark:to-emerald-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Scale className='w-12 h-12 text-white mr-4' />
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
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									18.5-24.9
								</div>
								<div className='text-green-100'>
									{t('hero.normalRange')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Heart className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-green-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Бесплатно
								</div>
								<div className='text-green-100'>
									{t('hero.free')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<BMICalculator />

				{/* SEO Content */}
				<BMISEO />
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
						url: `https://calc1.ru/${locale}/life/bmi`,
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
							ratingCount: '234',
						},
						featureList: [
							t('features.bmiCalculation'),
							t('features.categoryDetermination'),
							t('features.normalRange'),
							t('features.healthImplications'),
							t('features.visualScale'),
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
								name: messages.breadcrumbs?.home || 'Home',
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
								item: `https://calc1.ru/${locale}/life/bmi`,
							},
						],
					}),
				}}
			/>
		</div>
	);
}
