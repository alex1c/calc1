import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Equal, Calculator, Zap, BookOpen } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import EquationsSEO from '@/components/seo/equations-seo';

// Dynamic import for calculator component
const EquationsCalculator = dynamic(
	() => import('@/components/calculators/equations-calculator'),
	{ ssr: false }
);

interface Props {
	params: { locale: string };
}

/**
 * Generate metadata for Equations Calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.equations.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/math/equations`;

	return {
		title,
		description,
		keywords: [
			'калькулятор уравнений',
			'решение уравнений онлайн',
			'линейные уравнения',
			'квадратные уравнения',
			'дискриминант',
			'корни уравнения',
			'математический калькулятор',
			'решение уравнений бесплатно',
			'онлайн калькулятор математики',
			'формула Виета',
			'пошаговое решение уравнений',
			'математика онлайн',
			'алгебра калькулятор',
			'решение уравнений с объяснением',
			'калькулятор для школьников',
			'ЕГЭ математика',
			'подготовка к экзаменам',
			'математические расчеты',
			'онлайн решатель уравнений',
			'бесплатный калькулятор',
		],
		authors: [{ name: 'Calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		category: 'Mathematics',
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/math/equations',
				en: 'https://calc1.ru/en/math/equations',
				es: 'https://calc1.ru/es/math/equations',
				de: 'https://calc1.ru/de/math/equations',
			},
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
					url: 'https://calc1.ru/og-equations.png',
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
			images: ['https://calc1.ru/og-equations.png'],
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
		},
	};
}

/**
 * Equations Calculator Page
 * Solves linear and quadratic equations with step-by-step explanations
 */
export default async function EquationsPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.equations',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.equations.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const canonicalUrl = `https://calc1.ru/${locale}/math/equations`;

	// JSON-LD structured data for FAQ with all 30 questions
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: Array.from({ length: 30 }, (_, i) => i + 1).map((num) => ({
			'@type': 'Question',
			name: tSeo(`faq.question${num}`),
			acceptedAnswer: {
				'@type': 'Answer',
				text: tSeo(`faq.answer${num}`),
			},
		})),
	};

	// JSON-LD structured data for Software Application
	const softwareStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: t('title'),
		description: t('description'),
		applicationCategory: 'CalculatorApplication',
		operatingSystem: 'Web',
		url: canonicalUrl,
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
		author: {
			'@type': 'Organization',
			name: 'Calc1.ru',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Calc1.ru',
		},
	};

	// JSON-LD structured data for WebPage
	const webPageStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: t('title'),
		description: t('description'),
		url: canonicalUrl,
		mainEntity: {
			'@type': 'SoftwareApplication',
			name: t('title'),
			description: t('description'),
		},
		author: {
			'@type': 'Organization',
			name: 'Calc1.ru',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Calc1.ru',
		},
		dateModified: new Date().toISOString(),
		inLanguage: locale,
	};

	// JSON-LD structured data for BreadcrumbList
	const breadcrumbStructuredData = {
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
				name: 'Математика',
				item: `https://calc1.ru/${locale}/math`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: t('title'),
				item: canonicalUrl,
			},
		],
	};

	// Breadcrumbs items
	const breadcrumbItems = [
		{
			label: tCategories('math.title'),
			href: '/math',
		},
		{
			label: t('title'),
		},
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
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbStructuredData),
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
				<div className='bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-800 dark:to-teal-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Equal className='w-12 h-12 text-white mr-4' />
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
									<Equal className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										2
									</div>
									<div className='text-green-100'>
										{t('hero.types')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										99%
									</div>
									<div className='text-green-100'>
										{t('hero.accuracy')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<BookOpen className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										PDF
									</div>
									<div className='text-green-100'>
										{t('hero.format')}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<EquationsCalculator />

					{/* SEO Content */}
					<EquationsSEO />
				</div>
			</div>
		</>
	);
}
