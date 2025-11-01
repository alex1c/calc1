import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Star, Calendar, Calculator, Zap } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ZodiacCalculator from '@/components/calculators/zodiac-calculator';
import ZodiacCalculatorSEO from '@/components/seo/zodiac-calculator-seo';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const { loadMergedFunTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFunTranslations(locale);
	const t = (key: string) => messages.calculators.zodiacCalculator.seo[key];

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
			canonical: `https://calc1.ru/${locale}/fun/zodiac`,
			languages: {
				ru: 'https://calc1.ru/ru/fun/zodiac',
				en: 'https://calc1.ru/en/fun/zodiac',
				es: 'https://calc1.ru/es/fun/zodiac',
				de: 'https://calc1.ru/de/fun/zodiac',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/fun/zodiac`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/zodiac-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/zodiac-calculator-og.jpg'],
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

export default async function ZodiacCalculatorPage({
	params: { locale },
}: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale,
		namespace: 'calculators.zodiacCalculator',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

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
	const webApplicationData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		url: `https://calc1.ru/${locale}/fun/zodiac`,
		description: t('description'),
		applicationCategory: 'EntertainmentApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.7',
			reviewCount: '350',
		},
		featureList: [
			'Определение знака по дате рождения',
			'12 знаков зодиака',
			'Стихии и качества',
			'Описание характера',
		],
	};

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
				name: 'Главная',
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
				item: `https://calc1.ru/${locale}/fun/zodiac`,
			},
		],
	};

	const howToData = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'Как определить знак зодиака онлайн',
		description: 'Пошаговая инструкция по использованию калькулятора знака зодиака',
		step: [
			{
				'@type': 'HowToStep',
				position: 1,
				name: 'Введите дату рождения',
				text: 'Выберите дату рождения в календаре или введите её вручную в формате ДД.ММ.ГГГГ.',
			},
			{
				'@type': 'HowToStep',
				position: 2,
				name: 'Нажмите кнопку "Определить знак"',
				text: 'После ввода даты нажмите кнопку для расчёта знака зодиака.',
			},
			{
				'@type': 'HowToStep',
				position: 3,
				name: 'Просмотрите результаты',
				text: 'Калькулятор покажет ваш знак зодиака, символ, период, стихию, качество и описание характера.',
			},
			{
				'@type': 'HowToStep',
				position: 4,
				name: 'Используйте результаты',
				text: 'Скопируйте информацию о знаке зодиака или используйте её для изучения астрологии.',
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
				<div className='bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-800 dark:via-indigo-800 dark:to-blue-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Star className='w-12 h-12 text-white mr-4' />
								<h1 className='text-4xl md:text-5xl font-bold text-white'>
									{t('title')}
								</h1>
							</div>
							<p className='text-xl text-purple-100 max-w-3xl mx-auto mb-8'>
								{t('description')}
							</p>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Star className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										12
									</div>
									<div className='text-purple-100'>Знаков зодиака</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Calendar className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Быстро
									</div>
									<div className='text-purple-100'>Определение</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Zap className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Бесплатно
									</div>
									<div className='text-purple-100'>Использование</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<div className='mb-12'>
						<ZodiacCalculator />
					</div>

					{/* SEO Content */}
					<div className='max-w-4xl mx-auto'>
						<ZodiacCalculatorSEO />
					</div>
				</main>
			</div>
		</>
	);
}
