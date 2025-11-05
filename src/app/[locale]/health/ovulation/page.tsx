import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Heart, Calendar, Clock } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import OvulationCalculator from '@/components/calculators/ovulation-calculator';
import OvulationSEO from '@/components/seo/ovulation-seo';
import { loadMergedHealthTranslations } from '@/lib/i18n-utils';

/**
 * Generate metadata for the ovulation calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const messages = await loadMergedHealthTranslations(locale);
	const t = (key: string) => messages.calculators['ovulation'].seo[key];

	const title = t('title');
	const description = t('description');
	const keywordsString = t('keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [];
	const canonicalUrl = `https://calc1.ru/${locale}/health/ovulation`;

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
				ru: 'https://calc1.ru/ru/health/ovulation',
				en: 'https://calc1.ru/en/health/ovulation',
				es: 'https://calc1.ru/es/health/ovulation',
				de: 'https://calc1.ru/de/health/ovulation',
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
					url: 'https://calc1.ru/images/ovulation-og.jpg',
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
			images: ['https://calc1.ru/images/ovulation-og.jpg'],
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
 * Ovulation Calculator Page
 * Interactive calculator for menstrual cycle and ovulation tracking
 */
export default async function OvulationPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.ovulation',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.ovulation.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Get FAQ items for structured data
	const messages = await loadMergedHealthTranslations(locale);
	const seoData = messages.calculators['ovulation'].seo;
	const faqItems = seoData?.faq?.faqItems || [];

	// Breadcrumb items
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
		url: `https://calc1.ru/${locale}/health/ovulation`,
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
			reviewCount: '150',
		},
	};

	// FAQ structured data
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item: { q: string; a: string }) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.a,
			},
		})),
	};

	// BreadcrumbList structured data
	const breadcrumbListData = {
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
				item: `https://calc1.ru/${locale}/health/ovulation`,
			},
		],
	};

	// HowTo structured data
	const howToData = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: `Как рассчитать овуляцию: ${t('title')}`,
		description: tSeo('overview.content'),
		step: [
			{
				'@type': 'HowToStep',
				position: 1,
				name: 'Введите дату последней менструации',
				text: 'Укажите первый день последней менструации',
			},
			{
				'@type': 'HowToStep',
				position: 2,
				name: 'Укажите длину цикла',
				text: 'Введите продолжительность вашего менструального цикла (обычно 21-35 дней)',
			},
			{
				'@type': 'HowToStep',
				position: 3,
				name: 'Получите результат',
				text: 'Калькулятор покажет дату овуляции, фертильные дни и дату следующей менструации',
			},
		],
	};

	return (
		<>
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

				<div className='container mx-auto px-4 py-8'>
					<Breadcrumbs items={breadcrumbItems} />

					{/* Hero Section */}
					<div className='bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 text-white'>
						<div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
							<div className='p-4 bg-white/20 rounded-xl backdrop-blur-sm'>
								<Heart className='w-12 h-12 text-white' />
							</div>
							<div className='flex-1'>
								<h1 className='text-3xl md:text-4xl font-bold mb-4'>
									{t('title')}
								</h1>
								<p className='text-lg md:text-xl text-pink-100 mb-6'>
									{t('description')}
								</p>
								<div className='flex flex-wrap gap-4'>
									<div className='flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm'>
										<Calendar className='w-5 h-5' />
										<span className='font-semibold'>Точно</span>
									</div>
									<div className='flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm'>
										<Clock className='w-5 h-5' />
										<span className='font-semibold'>Быстро</span>
									</div>
									<div className='flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm'>
										<Heart className='w-5 h-5' />
										<span className='font-semibold'>Бесплатно</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<OvulationCalculator />

					<div className='mt-12'>
						<OvulationSEO />
					</div>
				</div>
			</div>
		</>
	);
}
