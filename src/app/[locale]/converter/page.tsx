import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
import {
	Shuffle,
	Ruler,
	Weight,
	Thermometer,
	Activity,
	Droplets,
	Battery,
	HardDrive,
	CheckCircle,
	Zap,
	TrendingUp,
	Globe,
	Target,
} from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;

	const seoTitle =
		messages.categories?.converter?.seo?.title ||
		`${messages.categories?.converter?.title || 'Convertitori'} — Calc1.ru`;
	const seoDescription =
		messages.categories?.converter?.seo?.description ||
		messages.categories?.converter?.description ||
		'Convertitori online di unità di misura';

	const keywordsString =
		messages.categories?.converter?.seo?.keywords || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'конвертеры единиц',
				'конвертер длины',
				'конвертер веса',
				'конвертер температуры',
		  ];

	return {
		title: seoTitle,
		description: seoDescription,
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
			canonical: `https://calc1.ru/${locale}/converter`,
			languages: generateLanguageAlternates('/converter'),
		},
		openGraph: {
			title: seoTitle,
			description: seoDescription,
			url: `https://calc1.ru/${locale}/converter`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/converter-calculators-og.jpg',
					width: 1200,
					height: 630,
					alt: seoTitle,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: seoTitle,
			description: seoDescription,
			images: ['https://calc1.ru/images/converter-calculators-og.jpg'],
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

const getCalculators = (t: any) => [
	{
		id: 'length',
		title: t('calculators.length.title'),
		description: t('calculators.length.description'),
		icon: Ruler,
		href: '/converter/length',
	},
	{
		id: 'weight',
		title: t('calculators.weight.title'),
		description: t('calculators.weight.description'),
		icon: Weight,
		href: '/converter/weight',
	},
	{
		id: 'temperature',
		title: t('calculators.temperature.title'),
		description: t('calculators.temperature.description'),
		icon: Thermometer,
		href: '/converter/temperature',
	},
	{
		id: 'speed',
		title: t('calculators.speed.title'),
		description: t('calculators.speed.description'),
		icon: Shuffle,
		href: '/converter/speed',
	},
	{
		id: 'pressure',
		title: t('calculators.pressure.title'),
		description: t('calculators.pressure.description'),
		icon: Activity,
		href: '/converter/pressure',
	},
	{
		id: 'volume-converter',
		title: t('calculators.volume-converter.title'),
		description: t('calculators.volume-converter.description'),
		icon: Droplets,
		href: '/converter/volume',
	},
	{
		id: 'energy-converter',
		title: t('calculators.energy-converter.title'),
		description: t('calculators.energy-converter.description'),
		icon: Battery,
		href: '/converter/energy',
	},
	{
		id: 'data-converter',
		title: t('calculators.data-converter.title'),
		description: t('calculators.data-converter.description'),
		icon: HardDrive,
		href: '/converter/data',
	},
	{
		id: 'angle-converter',
		title: t('calculators.angle-converter.title'),
		description: t('calculators.angle-converter.description'),
		icon: Target,
		href: '/converter/angle',
	},
];

export default async function ConverterPage({ params: { locale } }: Props) {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	// Load merged translations including converter calculators
	const { loadMergedConverterTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConverterTranslations(locale);

	// Create translation function that accesses merged messages
	const t = (key: string) => {
		const parts = key.split('.');
		let value: any = messages;
		for (const part of parts) {
			value = value?.[part];
		}
		return value || key;
	};

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});
	const currentLocale = await getLocale();

	const calculators = getCalculators(t);

	// Get SEO content (use loaded messages)
	const seoData = messages.categories?.converter?.seo || {};
	const faqItems = seoData?.faq?.faqItems || [];

	const breadcrumbItems = [
		{
			label: tCategories('converter.title'),
		},
	];

	// Prepare structured data for calculators
	const calculatorItems = calculators.map((calc, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: calc.title,
		description: calc.description,
		item: `https://calc1.ru/${locale}${calc.href}`,
	}));

	// Structured Data
	const webPageData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: seoData?.title || tCategories('converter.title'),
		description: seoData?.description || '',
		url: `https://calc1.ru/${locale}/converter`,
		inLanguage: locale,
		isPartOf: {
			'@type': 'WebSite',
			name: 'Calc1.ru',
			url: 'https://calc1.ru',
		},
		about: {
			'@type': 'Thing',
			name: tCategories('converter.title'),
			description: tCategories('converter.description'),
		},
	};

	const collectionPageData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: seoData?.title || tCategories('converter.title'),
		description: seoData?.description || '',
		url: `https://calc1.ru/${locale}/converter`,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: calculators.length,
			itemListElement: calculatorItems,
		},
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
				name: tCategories('converter.title'),
				item: `https://calc1.ru/${locale}/converter`,
			},
		],
	};

	const faqPageData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: (faqItems.slice(0, 30) || []).map(
			(item: { q: string; a: string }) => ({
				'@type': 'Question',
				name: item.q,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.a,
				},
			})
		),
	};

	const organizationData = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Calc1.ru',
		url: 'https://calc1.ru',
		logo: 'https://calc1.ru/images/logo.png',
		sameAs: [
			'https://www.facebook.com/calc1ru',
			'https://twitter.com/calc1ru',
			'https://www.instagram.com/calc1ru',
		],
	};

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(collectionPageData),
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
					__html: JSON.stringify(faqPageData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationData),
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
				<div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Shuffle className='w-12 h-12 text-white mr-4' />
								<h1 className='text-4xl md:text-5xl font-bold text-white'>
									{tCategories('converter.title')}
								</h1>
							</div>
							<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
								{tCategories('converter.description')}
							</p>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Shuffle className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										{calculators.length}
									</div>
									<div className='text-blue-100'>{t('common.converters')}</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										100%
									</div>
									<div className='text-blue-100'>{t('common.accuracy')}</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Zap className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										{t('common.instant')}
									</div>
									<div className='text-blue-100'>{t('common.conversion')}</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										{t('common.free')}
									</div>
									<div className='text-blue-100'>{t('common.usage')}</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Overview Section */}
					{seoData.overview && (
						<div className='mb-12'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
								<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
									{seoData.overview.title || tCategories('converter.title')}
								</h2>
								<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
									{seoData.overview.content}
								</p>
								{seoData.overview.additionalContent && (
									<p className='text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
										{seoData.overview.additionalContent}
									</p>
								)}
							</div>
						</div>
					)}

					{/* Advantages Section */}
					{seoData.advantages && (
						<div className='mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.advantages.title || tCategories('converter.title')}
							</h2>
							<p className='text-lg text-gray-600 dark:text-gray-400 mb-6'>
								{seoData.advantages.content}
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{seoData.advantages.precise && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<CheckCircle className='w-8 h-8 text-green-600 dark:text-green-400 mb-3' />
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.advantages.precise.title || t('common.accuracy')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.advantages.precise.content}
										</p>
									</div>
								)}
								{seoData.advantages.instant && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<Zap className='w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-3' />
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.advantages.instant.title || t('common.instant')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.advantages.instant.content}
										</p>
									</div>
								)}
								{seoData.advantages.comprehensive && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<Globe className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-3' />
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.advantages.comprehensive.title || tCategories('converter.title')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.advantages.comprehensive.content}
										</p>
									</div>
								)}
								{seoData.advantages.multilingual && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<Globe className='w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3' />
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.advantages.multilingual.title || tCategories('converter.title')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.advantages.multilingual.content}
										</p>
									</div>
								)}
								{seoData.advantages.mobile && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<Target className='w-8 h-8 text-purple-600 dark:text-purple-400 mb-3' />
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.advantages.mobile.title || tCategories('converter.title')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.advantages.mobile.content}
										</p>
									</div>
								)}
								{seoData.advantages.free && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<TrendingUp className='w-8 h-8 text-green-600 dark:text-green-400 mb-3' />
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.advantages.free.title || t('common.free')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.advantages.free.content}
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Tips Section */}
					{seoData.tips && (
						<div className='mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.tips.title || tCategories('converter.title')}
							</h2>
							<p className='text-lg text-gray-600 dark:text-gray-400 mb-6'>
								{seoData.tips.content}
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{seoData.tips.tip1 && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.tips.tip1.title || tCategories('converter.title')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.tips.tip1.content}
										</p>
									</div>
								)}
								{seoData.tips.tip2 && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.tips.tip2.title || tCategories('converter.title')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.tips.tip2.content}
										</p>
									</div>
								)}
								{seoData.tips.tip3 && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.tips.tip3.title || tCategories('converter.title')}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.tips.tip3.content}
										</p>
									</div>
								)}
								{seoData.tips.tip4 && (
									<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{seoData.tips.tip4.title || 'Проверяйте результаты'}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{seoData.tips.tip4.content}
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Calculators Grid */}
					<div className='mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{t('common.availableCalculators')}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{calculators.map((calculator) => (
								<Link
									key={calculator.id}
									href={`/${locale}${calculator.href}`}
									className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200'
								>
									<div className='flex items-center mb-4'>
										<calculator.icon className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
										<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
											{calculator.title}
										</h3>
									</div>
									<p className='text-gray-600 dark:text-gray-400'>
										{calculator.description}
									</p>
								</Link>
							))}
						</div>
					</div>

					{/* FAQ Section */}
					{seoData.faq && faqItems.length > 0 && (
						<div className='mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.faq.title || tCategories('converter.title')}
							</h2>
							<div className='space-y-4'>
								{faqItems.slice(0, 10).map(
									(
										item: { q: string; a: string },
										index: number
									) => (
										<div
											key={index}
											className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'
										>
											<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
												{item.q}
											</h3>
											<p className='text-gray-600 dark:text-gray-400'>
												{item.a}
											</p>
										</div>
									)
								)}
							</div>
						</div>
					)}
				</main>
			</div>
		</>
	);
}
