import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Utensils, Calculator, Flame, Database } from 'lucide-react';
import Header from '@/components/header';
import CaloriesCalculator from '@/components/calculators/calories-calculator';
import CaloriesSEO from '@/components/seo/calories-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
interface Props {
	params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = params;
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	const { loadMergedLifeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedLifeTranslations(locale);
	const t = (key: string) => messages.calculators.calories.seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор калорий',
			'суточная норма калорий',
			'расчет калорий',
			'калорийность продуктов',
			'bmr калькулятор',
			'tdee калькулятор',
			'формула харриса-бенедикта',
			'калории для похудения',
			'калории для набора массы',
			'калорийность пищи',
			'подсчет калорий',
			'дневная норма калорий',
			'базальный метаболизм',
			'расход калорий',
			'калькулятор калорий онлайн',
			'calorie calculator',
			'daily calories',
			'bmr calculator',
			'tdee calculator',
			'calculadora de calorías',
			'kalorienrechner',
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
			canonical: `https://calc1.ru/${locale}/life/calories`,
			languages: generateLanguageAlternates('/life/calories'),
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/calories`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/calories-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/calories-calculator-og.jpg'],
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
			yandex: 'ae0a3b638a5ae1ab',
		},
	};
}

export default async function CaloriesPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.calories',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.calories.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedLifeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedLifeTranslations(locale);

	// Validate locale
	if (!isSupportedLocale(locale)) {
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
			<div className='bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-800 dark:to-red-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Utensils className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-orange-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Flame className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									2000+
								</div>
								<div className='text-orange-100'>
									{t('hero.products')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99.9%
								</div>
								<div className='text-orange-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Database className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									BMR
								</div>
								<div className='text-orange-100'>
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
				<CaloriesCalculator />

				{/* SEO Content */}
				<CaloriesSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='life'
				calculatorId='calories'
				namespace='calculators.calories.seo'
				featureKeys={['bmrCalculation', 'tdeeCalculation', 'foodDatabase', 'harrisBenedict', 'accuracy']}
				ratingValue='4.8'
				ratingCount='267'
				screenshot='https://calc1.ru/images/calories-screenshot.jpg'
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
								item: `https://calc1.ru/${locale}/life/calories`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			{(() => {
				const howTo = messages.calculators?.calories?.seo?.howTo;
				if (!howTo || !howTo.steps) return null;
				return (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'HowTo',
								name: howTo.title,
								description: howTo.description,
								step: Object.keys(howTo.steps)
									.sort()
									.map(key => ({
										'@type': 'HowToStep',
										name: howTo.steps[key].name,
										text: howTo.steps[key].text,
									})),
							}),
						}}
					/>
				);
			})()}
		</div>
	);
}
