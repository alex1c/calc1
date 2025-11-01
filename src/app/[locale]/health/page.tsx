import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	Heart,
	Activity,
	Pill,
	Thermometer,
	Calendar,
	Brain,
	Scale,
	CheckCircle,
	Zap,
	TrendingUp,
	Shield,
	Target,
} from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.categories['health'][key];

	const seoTitle =
		messages.categories?.health?.seo?.title ||
		`${t('title')} — Онлайн медицинские калькуляторы | Calc1.ru`;
	const seoDescription =
		messages.categories?.health?.seo?.description ||
		'Медицинские калькуляторы онлайн: расчёт ИМТ, пульса, артериального давления, овуляции, витаминов, стресса, дозировки лекарств. Бесплатные онлайн калькуляторы для контроля здоровья и медицинских расчётов.';

	const keywordsString =
		messages.categories?.health?.seo?.keywords || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'медицинские калькуляторы',
				'калькулятор здоровья',
				'калькулятор ИМТ',
				'калькулятор пульса',
				'калькулятор давления',
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
			canonical: `https://calc1.ru/${locale}/health`,
			languages: {
				ru: 'https://calc1.ru/ru/health',
				en: 'https://calc1.ru/en/health',
				es: 'https://calc1.ru/es/health',
				de: 'https://calc1.ru/de/health',
			},
		},
		openGraph: {
			title: seoTitle,
			description: seoDescription,
			url: `https://calc1.ru/${locale}/health`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/health-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/health-calculators-og.jpg'],
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

const getCalculators = (t: any, healthMessages: any) => [
	{
		id: 'bmihealth',
		title:
			healthMessages?.calculators?.bmiHealth?.title ||
			t('calculators.bmiHealth.title'),
		description:
			healthMessages?.calculators?.bmiHealth?.description ||
			t('calculators.bmiHealth.description'),
		icon: Heart,
		href: '/health/bmihealth',
	},
	{
		id: 'heart-rate',
		title:
			healthMessages?.calculators?.heartRate?.title ||
			t('calculators.heartRate.title'),
		description:
			healthMessages?.calculators?.heartRate?.description ||
			t('calculators.heartRate.description'),
		icon: Activity,
		href: '/health/heart-rate',
	},
	{
		id: 'blood-pressure',
		title:
			healthMessages?.calculators?.bloodPressure?.title ||
			t('calculators.bloodPressure.title'),
		description:
			healthMessages?.calculators?.bloodPressure?.description ||
			t('calculators.bloodPressure.description'),
		icon: Thermometer,
		href: '/health/blood-pressure',
	},
	{
		id: 'ovulation',
		title:
			healthMessages?.calculators?.ovulation?.title ||
			t('calculators.ovulation.title'),
		description:
			healthMessages?.calculators?.ovulation?.description ||
			t('calculators.ovulation.description'),
		icon: Calendar,
		href: '/health/ovulation',
	},
	{
		id: 'vitamins',
		title:
			healthMessages?.calculators?.vitamins?.title ||
			t('calculators.vitamins.title'),
		description:
			healthMessages?.calculators?.vitamins?.description ||
			t('calculators.vitamins.description'),
		icon: Pill,
		href: '/health/vitamins',
	},
	{
		id: 'stress',
		title:
			healthMessages?.calculators?.stress?.title ||
			t('calculators.stress.title'),
		description:
			healthMessages?.calculators?.stress?.description ||
			t('calculators.stress.description'),
		icon: Brain,
		href: '/health/stress',
	},
	{
		id: 'dose',
		title:
			healthMessages?.calculators?.dose?.title ||
			t('calculators.dose.title'),
		description:
			healthMessages?.calculators?.dose?.description ||
			t('calculators.dose.description'),
		icon: Scale,
		href: '/health/dose',
	},
	{
		id: 'ideal-weight',
		title:
			healthMessages?.calculators?.['ideal-weight']?.title ||
			t('calculators.ideal-weight.title'),
		description:
			healthMessages?.calculators?.['ideal-weight']?.description ||
			t('calculators.ideal-weight.description'),
		icon: Target,
		href: '/health/ideal-weight',
	},
];

export default async function HealthPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({ locale });
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});
	const currentLocale = await getLocale();

	// Load health messages
	const healthMessages = (await import(
		`../../../../messages/${locale}/calculators/health.json`
	)).default;
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;

	const calculators = getCalculators(t, healthMessages);

	// Get SEO data
	const seoData = messages.categories?.health?.seo || {};
	const faqItems = seoData?.faq?.faqItems || [];

	const breadcrumbItems = [
		{
			label: tCategories('health.title'),
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
		name: seoData?.title || tCategories('health.title'),
		description: seoData?.description || '',
		url: `https://calc1.ru/${locale}/health`,
		inLanguage: locale,
		isPartOf: {
			'@type': 'WebSite',
			name: 'Calc1.ru',
			url: 'https://calc1.ru',
		},
		about: {
			'@type': 'Thing',
			name: 'Медицинские калькуляторы',
			description:
				'Онлайн калькуляторы для медицинских расчётов и контроля здоровья',
		},
	};

	const collectionPageData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: seoData?.title || tCategories('health.title'),
		description: seoData?.description || '',
		url: `https://calc1.ru/${locale}/health`,
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
				name: 'Главная',
				item: `https://calc1.ru/${locale}`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: tCategories('health.title'),
				item: `https://calc1.ru/${locale}/health`,
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
		logo: 'https://calc1.ru/logo.png',
		sameAs: [
			'https://www.facebook.com/calc1ru',
			'https://twitter.com/calc1ru',
			'https://www.instagram.com/calc1ru',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Service',
			availableLanguage: ['ru', 'en', 'es', 'de'],
		},
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
				<div className='bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 dark:from-red-800 dark:via-pink-800 dark:to-rose-800'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-6'>
								<Heart className='w-12 h-12 text-white mr-4' />
								<h1 className='text-4xl md:text-5xl font-bold text-white'>
									{tCategories('health.title')}
								</h1>
							</div>
							<p className='text-xl text-pink-100 max-w-3xl mx-auto mb-8'>
								{seoData?.description ||
									tCategories('health.description')}
							</p>

							{/* Quick Stats */}
							<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Heart className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										{calculators.length}
									</div>
									<div className='text-pink-100'>
										калькуляторов
									</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										100%
									</div>
									<div className='text-pink-100'>точность</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<Zap className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Мгновенно
									</div>
									<div className='text-pink-100'>скорость</div>
								</div>
								<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
									<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
									<div className='text-2xl font-bold text-white mb-1'>
										Бесплатно
									</div>
									<div className='text-pink-100'>
										использование
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					{/* Overview Section */}
					{seoData?.overview && (
						<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
								{seoData.overview.title}
							</h2>
							<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
								{seoData.overview.content}
							</p>
							{seoData.overview.additionalContent && (
								<p className='text-lg text-gray-700 dark:text-gray-300'>
									{seoData.overview.additionalContent}
								</p>
							)}
						</div>
					)}

					{/* Calculators Grid */}
					<div className='mb-12'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
							Доступные калькуляторы
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{calculators.map((calculator) => (
								<Link
									key={calculator.id}
									href={`/${locale}${calculator.href}`}
									className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-red-300 dark:hover:border-red-600 hover:shadow-md transition-all duration-200'
								>
									<div className='flex items-center mb-4'>
										<calculator.icon className='h-8 w-8 text-red-600 dark:text-red-400 mr-3' />
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

					{/* Advantages Section */}
					{seoData?.advantages && (
						<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.advantages.title}
							</h2>
							<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
								{seoData.advantages.content}
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								<div className='bg-red-50 dark:bg-red-900/20 p-6 rounded-lg'>
									<div className='flex items-center mb-3'>
										<CheckCircle className='w-6 h-6 text-red-600 dark:text-red-400 mr-2' />
										<h3 className='text-lg font-semibold text-red-900 dark:text-red-100'>
											{seoData.advantages.accurate?.title}
										</h3>
									</div>
									<p className='text-red-700 dark:text-red-300'>
										{seoData.advantages.accurate?.description}
									</p>
								</div>
								<div className='bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg'>
									<div className='flex items-center mb-3'>
										<Target className='w-6 h-6 text-pink-600 dark:text-pink-400 mr-2' />
										<h3 className='text-lg font-semibold text-pink-900 dark:text-pink-100'>
											{seoData.advantages.personalized?.title}
										</h3>
									</div>
									<p className='text-pink-700 dark:text-pink-300'>
										{
											seoData.advantages.personalized
												?.description
										}
									</p>
								</div>
								<div className='bg-rose-50 dark:bg-rose-900/20 p-6 rounded-lg'>
									<div className='flex items-center mb-3'>
										<Shield className='w-6 h-6 text-rose-600 dark:text-rose-400 mr-2' />
										<h3 className='text-lg font-semibold text-rose-900 dark:text-rose-100'>
											{seoData.advantages.comprehensive?.title}
										</h3>
									</div>
									<p className='text-rose-700 dark:text-rose-300'>
										{
											seoData.advantages.comprehensive
												?.description
										}
									</p>
								</div>
								<div className='bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg'>
									<div className='flex items-center mb-3'>
										<Zap className='w-6 h-6 text-orange-600 dark:text-orange-400 mr-2' />
										<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100'>
											{seoData.advantages.free?.title}
										</h3>
									</div>
									<p className='text-orange-700 dark:text-orange-300'>
										{seoData.advantages.free?.description}
									</p>
								</div>
								<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
									<div className='flex items-center mb-3'>
										<Activity className='w-6 h-6 text-purple-600 dark:text-purple-400 mr-2' />
										<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100'>
											{seoData.advantages.mobile?.title}
										</h3>
									</div>
									<p className='text-purple-700 dark:text-purple-300'>
										{seoData.advantages.mobile?.description}
									</p>
								</div>
								<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
									<div className='flex items-center mb-3'>
										<Heart className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
										<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
											{seoData.advantages.professional?.title}
										</h3>
									</div>
									<p className='text-blue-700 dark:text-blue-300'>
										{
											seoData.advantages.professional
												?.description
										}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Tips Section */}
					{seoData?.tips && (
						<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.tips.title}
							</h2>
							<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
								{seoData.tips.content}
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
								<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-400'>
									<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
										{seoData.tips.regular?.title}
									</h3>
									<p className='text-yellow-700 dark:text-yellow-300'>
										{seoData.tips.regular?.description}
									</p>
								</div>
								<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-400'>
									<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
										{seoData.tips.consultation?.title}
									</h3>
									<p className='text-blue-700 dark:text-blue-300'>
										{seoData.tips.consultation?.description}
									</p>
								</div>
								<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-400'>
									<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
										{seoData.tips.accuracy?.title}
									</h3>
									<p className='text-green-700 dark:text-green-300'>
										{seoData.tips.accuracy?.description}
									</p>
								</div>
								<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-400'>
									<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
										{seoData.tips.comprehensive?.title}
									</h3>
									<p className='text-purple-700 dark:text-purple-300'>
										{seoData.tips.comprehensive?.description}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* FAQ Section */}
					{seoData?.faq && faqItems.length > 0 && (
						<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{seoData.faq.title}
							</h2>
							<div className='space-y-6'>
								{faqItems.slice(0, 10).map(
									(
										item: { q: string; a: string },
										index: number
									) => (
										<div
											key={index}
											className={`border-l-4 ${
												index % 4 === 0
													? 'border-red-500'
													: index % 4 === 1
													? 'border-pink-500'
													: index % 4 === 2
													? 'border-rose-500'
													: 'border-orange-500'
											} pl-6`}
										>
											<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
												{item.q}
											</h3>
											<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
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
