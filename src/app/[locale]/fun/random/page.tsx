import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Shuffle, Dice1, Calculator, Zap } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import RandomNumberGenerator from '@/components/calculators/random-number-generator';
import RandomNumberGeneratorSEO from '@/components/seo/random-number-generator-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
interface Props {
	params: { locale: string };
}

/**
 * Generate metadata for the random number generator page
 */
export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	const { loadMergedFunTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFunTranslations(locale);
	const t = (key: string) =>
		messages.calculators.randomNumberGenerator.seo[key];

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
			canonical: `https://calc1.ru/${locale}/fun/random`,
			languages: generateLanguageAlternates('/fun/random'),
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/fun/random`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/random-number-generator-og.jpg',
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
			images: ['https://calc1.ru/images/random-number-generator-og.jpg'],
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

/**
 * Random Number Generator Page
 * Interactive generator for random numbers
 */
export default async function RandomNumberGeneratorPage({
	params: { locale },
}: Props) {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale,
		namespace: 'calculators.randomNumberGenerator',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedFunTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFunTranslations(locale);

	const breadcrumbItems = [
		{ label: tCategories('fun.title'), href: '/fun' },
		{ label: t('title') },
	];

	// Get FAQ items for structured data
	const faqRaw = t.raw('seo.faq.faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	// Structured Data
	const faqPageData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.slice(0, 30).map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.a,
			},
		})),
	};

	const breadcrumbListData = {
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
				name: tCategories('fun.title'),
				item: `https://calc1.ru/${locale}/fun`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: t('title'),
				item: `https://calc1.ru/${locale}/fun/random`,
			},
		],
	};

	const howTo = messages.calculators?.randomNumberGenerator?.seo?.howTo;
	const howToData = howTo && howTo.steps ? {
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
	} : null;

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='fun'
				calculatorId='random'
				namespace='calculators.randomNumberGenerator'
				featureKeys={['generation', 'rangeSettings', 'duplicateControl', 'sorting']}
				ratingValue='4.9'
				ratingCount='250'
				screenshot='https://calc1.ru/images/random-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqPageData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbListData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(howToData),
				}}
			/>

			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
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
								<Shuffle className='w-12 h-12 text-white mr-4' />
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
									<Dice1 className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										1000
									</div>
									<div className='text-green-100'>Чисел за раз</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Стойкий
									</div>
									<div className='text-green-100'>Алгоритм</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Zap className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Бесплатно
									</div>
									<div className='text-green-100'>Использование</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Generator */}
					<div className='mb-12'>
						<RandomNumberGenerator />
					</div>

					{/* SEO Content */}
					<div className='max-w-4xl mx-auto'>
						<RandomNumberGeneratorSEO />
					</div>
				</main>
			</div>
		</>
	);
}
