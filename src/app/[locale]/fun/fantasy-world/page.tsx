import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Globe, Sparkles, Calculator, Zap } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import FantasyWorldCalculator from '@/components/calculators/fantasy-world-calculator';
import FantasyWorldSEO from '@/components/seo/fantasy-world-seo';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedFunTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFunTranslations(locale);
	const t = (key: string) => messages.calculators.fantasyWorld.seo[key];

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
			canonical: `https://calc1.ru/${locale}/fun/fantasy-world`,
			languages: {
				ru: 'https://calc1.ru/ru/fun/fantasy-world',
				en: 'https://calc1.ru/en/fun/fantasy-world',
				es: 'https://calc1.ru/es/fun/fantasy-world',
				de: 'https://calc1.ru/de/fun/fantasy-world',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/fun/fantasy-world`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/fantasy-world-og.jpg',
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
			images: ['https://calc1.ru/images/fantasy-world-og.jpg'],
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

export default async function FantasyWorldPage({
	params: { locale },
}: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale,
		namespace: 'calculators.fantasyWorld',
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
		url: `https://calc1.ru/${locale}/fun/fantasy-world`,
		description: t('description'),
		applicationCategory: 'CreativeApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '5.0',
			reviewCount: '750',
		},
		featureList: [
			'4 типа миров',
			'7 элементов описания',
			'Генерация 1-3 миров',
			'Копирование и скачивание',
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
				item: `https://calc1.ru/${locale}/fun/fantasy-world`,
			},
		],
	};

	const howToData = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'Как создать уникальный вымышленный мир онлайн',
		description: 'Пошаговая инструкция по использованию генератора вымышленных миров',
		step: [
			{
				'@type': 'HowToStep',
				position: 1,
				name: 'Выберите тип мира',
				text: 'Выберите один из четырёх типов: Фэнтези (магия и мифические существа), Sci-Fi (технологии и космос), Стимпанк (пар и механизмы) или Постапокалипсис (выживание и разрушение).',
			},
			{
				'@type': 'HowToStep',
				position: 2,
				name: 'Выберите количество миров',
				text: 'Выберите количество миров для генерации (от 1 до 3). Вы можете генерировать несколько миров одновременно.',
			},
			{
				'@type': 'HowToStep',
				position: 3,
				name: 'Сгенерируйте миры',
				text: 'Нажмите кнопку "Сгенерировать" для создания миров с полным набором характеристик: название, климат, культура, правительство, ресурсы, конфликты и легенды.',
			},
			{
				'@type': 'HowToStep',
				position: 4,
				name: 'Используйте результаты',
				text: 'Просмотрите сгенерированные миры, скопируйте описания в буфер обмена или скачайте их в текстовом файле для дальнейшего использования в вашем проекте.',
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
				<div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800'>
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
									<Sparkles className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										4
									</div>
									<div className='text-indigo-100'>Типа миров</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										3
									</div>
									<div className='text-indigo-100'>Миров за раз</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Zap className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Бесплатно
									</div>
									<div className='text-indigo-100'>Использование</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Calculator */}
					<div className='mb-12'>
						<FantasyWorldCalculator />
					</div>

					{/* SEO Content */}
					<div className='max-w-4xl mx-auto'>
						<FantasyWorldSEO />
					</div>
				</main>
			</div>
		</>
	);
}
