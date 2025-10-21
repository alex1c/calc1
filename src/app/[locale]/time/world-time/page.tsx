import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import WorldTimeCalculator from '@/components/calculators/world-time-calculator';
import WorldTimeSEO from '@/components/seo/world-time-seo';
import { Globe, Clock, MapPin } from 'lucide-react';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.worldTime.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/time/world-time`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/time/world-time',
				en: 'https://calc1.ru/en/time/world-time',
				es: 'https://calc1.ru/es/time/world-time',
				de: 'https://calc1.ru/de/time/world-time',
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
					url: 'https://calc1.ru/og-world-time.png',
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
			images: ['https://calc1.ru/og-world-time.png'],
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

export default async function WorldTimePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.worldTime',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.worldTime.seo',
	});

	// JSON-LD structured data for FAQ
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.question1'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.answer1'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.question2'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.answer2'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.question3'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.answer3'),
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
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'All',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'RUB',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			ratingCount: '89',
		},
	};

	// Breadcrumbs items
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{ label: tCategories('time.title'), href: '/time' },
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

			<div className='min-h-screen bg-white dark:bg-gray-900'>
				<Header />

				{/* Breadcrumbs */}
				<div className='bg-white dark:bg-gray-800 shadow-sm'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
						<Breadcrumbs items={breadcrumbItems} />
					</div>
				</div>

				{/* Hero Section */}
				<div className='bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-800 dark:to-blue-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Globe className='w-12 h-12 text-white mr-4' />
								<h1 className='text-4xl md:text-5xl font-bold text-white'>
									{t('title')}
								</h1>
							</div>
							<p className='text-xl text-indigo-100 max-w-3xl mx-auto mb-8'>
								{t('description')}
							</p>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Globe className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										24
									</div>
									<div className='text-indigo-100'>
										{t('hero.timeZones')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<MapPin className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										200+
									</div>
									<div className='text-indigo-100'>
										{t('hero.cities')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Clock className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										24/7
									</div>
									<div className='text-indigo-100'>
										{t('hero.accuracy')}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<WorldTimeCalculator />

					{/* SEO Content */}
					<WorldTimeSEO />
				</div>
			</div>
		</>
	);
}
