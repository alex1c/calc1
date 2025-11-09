import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
import {
	Network,
	Zap,
	Calculator,
	CheckCircle,
	TrendingUp,
	Monitor,
	Sparkles,
	QrCode,
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
	const seoData = messages.categories?.it?.seo || {};
	const t = (key: string) => messages.categories['it'][key];

	const title =
		seoData.title ||
		`${messages.categories?.it?.title || 'Calcolatori IT'} — Calc1.ru`;
	const description =
		seoData.description ||
		messages.categories?.it?.description ||
		'Calcolatori IT online per sviluppatori e specialisti IT';

	const keywordsString = seoData.keywords || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: ['IT калькуляторы', 'калькулятор IP адресов', 'хеш калькулятор'];

	return {
		title,
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
			canonical: `https://calc1.ru/${locale}/it`,
			languages: generateLanguageAlternates('/it'),
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/it`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/it-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/it-calculators-og.jpg'],
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
		id: 'ip-calculator',
		title: t('calculators.ipCalculator.title'),
		description: t('calculators.ipCalculator.description'),
		icon: Network,
		href: '/it/ip-calculator',
	},
	{
		id: 'hashrate',
		title: t('calculators.hashrate.title'),
		description: t('calculators.hashrate.description'),
		icon: Zap,
		href: '/it/hashrate',
	},
	{
		id: 'qr-generator',
		title: t('calculators.qr-generator.title'),
		description: t('calculators.qr-generator.description'),
		icon: QrCode,
		href: '/it/qr-generator',
	},
];

export default async function ItPage({ params: { locale } }: Props) {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const t = await getTranslations({ locale });
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});
	const currentLocale = await getLocale();

	// Load merged translations including IT calculators
	const { loadMergedItTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedItTranslations(locale);

	// Create translation function that accesses merged messages
	const tCalc = (key: string) => {
		const parts = key.split('.');
		let value: any = messages;
		for (const part of parts) {
			value = value?.[part];
		}
		return value || key;
	};

	const calculators = getCalculators(tCalc);
	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('it.title') },
	];

	// Get SEO content (use loaded messages)
	const seoData = messages.categories?.it?.seo || {};
	const faqItems = seoData.faq?.faqItems || [];

	// Prepare structured data for calculators
	const calculatorItems = calculators.map((calc, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: calc.title,
		description: calc.description,
		item: `https://calc1.ru/${locale}${calc.href}`,
	}));

	return (
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
							<Monitor className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('it.title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{tCategories('it.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-blue-100'>{t('common.calculatorsCount')}</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-blue-100'>{t('common.accuracy')}</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('common.instant')}
								</div>
								<div className='text-blue-100'>{t('common.calculation')}</div>
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
								{seoData.overview.title || tCategories('it.title')}
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
							{seoData.advantages.title || tCategories('it.title')}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Calculator className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.accurate || t('common.accuracy')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{seoData.advantages.accurateDesc || tCategories('it.description')}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<CheckCircle className='w-8 h-8 text-green-600 dark:text-green-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.professional || tCategories('it.title')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{seoData.advantages.professionalDesc || tCategories('it.description')}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Sparkles className='w-8 h-8 text-purple-600 dark:text-purple-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.comprehensive || tCategories('it.title')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{seoData.advantages.comprehensiveDesc || tCategories('it.description')}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Zap className='w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.fast || t('common.instant')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{seoData.advantages.fastDesc || t('common.calculation')}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<TrendingUp className='w-8 h-8 text-green-600 dark:text-green-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.free || t('common.free')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{seoData.advantages.freeDesc || t('common.usage')}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Monitor className='w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.accessible || tCategories('it.title')}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{seoData.advantages.accessibleDesc || tCategories('it.description')}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Tips Section */}
				{seoData.tips && (
					<div className='mb-12'>
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-lg p-8'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
								{seoData.tips.title || tCategories('it.title')}
							</h2>
							<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
								{seoData.tips.content}
							</p>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<CheckCircle className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.data}
									</span>
								</li>
								<li className='flex items-start'>
									<CheckCircle className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.verification}
									</span>
								</li>
								<li className='flex items-start'>
									<CheckCircle className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.regular}
									</span>
								</li>
								<li className='flex items-start'>
									<CheckCircle className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.planning}
									</span>
								</li>
							</ul>
						</div>
					</div>
				)}

				{/* Calculators Grid */}
				<div className='mb-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
						{t('common.availableCalculators')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{calculators.map((calculator) => {
							const IconComponent = calculator.icon;
							return (
								<Link
									key={calculator.id}
									href={`/${currentLocale}${calculator.href}`}
									className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200'
								>
									<div className='flex items-center mb-4'>
										<IconComponent className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
										<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
											{calculator.title}
										</h3>
									</div>
									<p className='text-gray-600 dark:text-gray-400'>
										{calculator.description}
									</p>
								</Link>
							);
						})}
					</div>
				</div>

				{/* FAQ Section */}
				{faqItems.length > 0 && (
					<div className='mb-12'>
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.faq?.title || tCategories('it.title')}
							</h2>
							<div className='space-y-6'>
								{faqItems.slice(0, 10).map((faq: any, index: number) => (
									<div
										key={index}
										className='border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0'
									>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
											{faq.q}
										</h3>
										<p className='text-gray-600 dark:text-gray-400'>
											{faq.a}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</main>

			{/* Structured Data */}
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
								name: t('breadcrumbs.home'),
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('it.title'),
								item: `https://calc1.ru/${locale}/it`,
							},
						],
					}),
				}}
			/>

			{/* CollectionPage Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: tCategories('it.title'),
						description: seoData.description || tCategories('it.description'),
						url: `https://calc1.ru/${locale}/it`,
						mainEntity: {
							'@type': 'ItemList',
							numberOfItems: calculators.length,
							itemListElement: calculatorItems,
						},
					}),
				}}
			/>

			{/* FAQ Structured Data */}
			{faqItems.length > 0 && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: faqItems
								.slice(0, 30)
								.map((faq: any) => ({
									'@type': 'Question',
									name: faq.q,
									acceptedAnswer: {
										'@type': 'Answer',
										text: faq.a,
									},
								})),
						}),
					}}
				/>
			)}

			{/* Organization Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Organization',
						name: 'Calc1.ru',
						url: 'https://calc1.ru',
						logo: 'https://calc1.ru/logo.png',
						sameAs: [
							'https://www.facebook.com/calc1ru',
							'https://twitter.com/calc1ru',
							'https://vk.com/calc1ru',
						],
					}),
				}}
			/>
		</div>
	);
}
