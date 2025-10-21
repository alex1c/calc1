import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CalendarCalculator from '@/components/calculators/calendar-calculator';
import CalendarSEO from '@/components/seo/calendar-seo';
import { Calendar, Clock, Event } from 'lucide-react';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.calendar.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/time/calendar`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/time/calendar',
				en: 'https://calc1.ru/en/time/calendar',
				es: 'https://calc1.ru/es/time/calendar',
				de: 'https://calc1.ru/de/time/calendar',
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
					url: 'https://calc1.ru/og-calendar.png',
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
			images: ['https://calc1.ru/og-calendar.png'],
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

export default async function CalendarPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.calendar',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.calendar.seo',
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
				<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Calendar className='w-12 h-12 text-white mr-4' />
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
									<Calendar className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										365
									</div>
									<div className='text-blue-100'>
										{t('hero.days')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Event className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										∞
									</div>
									<div className='text-blue-100'>
										{t('hero.events')}
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Clock className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										24/7
									</div>
									<div className='text-blue-100'>
										{t('hero.access')}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<CalendarCalculator />

					{/* SEO Content */}
					<CalendarSEO />
				</div>
			</div>
		</>
	);
}
