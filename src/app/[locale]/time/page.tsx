import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import Breadcrumbs from '@/components/breadcrumbs';
import {
	Clock,
	Calendar,
	Plus,
	User,
	Timer,
	Target,
	Globe,
	CalendarDays,
	CheckCircle,
	Zap,
	TrendingUp,
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
	const t = (key: string) => messages.categories.time.seo[key];

	const keywordsString = t('keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [];

	return {
		title: t('title'),
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
			canonical: `https://calc1.ru/${locale}/time`,
			languages: {
				ru: 'https://calc1.ru/ru/time',
				en: 'https://calc1.ru/en/time',
				es: 'https://calc1.ru/es/time',
				de: 'https://calc1.ru/de/time',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/time`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/time-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/time-calculators-og.jpg'],
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

const getCalculators = (t: any) => [
	{
		id: 'days-between',
		title: t('calculators.daysBetween.title'),
		description: t('calculators.daysBetween.description'),
		icon: Calendar,
		href: '/time/days-between',
	},
	{
		id: 'add-time',
		title: t('calculators.addTime.title'),
		description: t('calculators.addTime.description'),
		icon: Plus,
		href: '/time/add-time',
	},
	{
		id: 'age',
		title: t('calculators.agecalc.title'),
		description: t('calculators.agecalc.description'),
		icon: User,
		href: '/time/age',
	},
	{
		id: 'deadline',
		title: t('calculators.deadline.title'),
		description: t('calculators.deadline.description'),
		icon: Target,
		href: '/time/deadline',
	},
	{
		id: 'calendar',
		title: t('calculators.calendar.title'),
		description: t('calculators.calendar.description'),
		icon: CalendarDays,
		href: '/time/calendar',
	},
	{
		id: 'timer',
		title: t('calculators.timer.title'),
		description: t('calculators.timer.description'),
		icon: Timer,
		href: '/time/timer',
	},
	{
		id: 'countdown',
		title: t('calculators.countdown.title'),
		description: t('calculators.countdown.description'),
		icon: Clock,
		href: '/time/countdown',
	},
	{
		id: 'world-time',
		title: t('calculators.worldTime.title'),
		description: t('calculators.worldTime.description'),
		icon: Globe,
		href: '/time/world-time',
	},
];

export default async function TimePage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const tCategories = (key: string) => messages.categories.time[key];
	const t = await getTranslations();

	// Get calculators with proper translations
	const { loadMergedTimeTranslations } = await import('@/lib/i18n-utils');
	const timeMessages = await loadMergedTimeTranslations(locale);
	const calculators = [
		{
			id: 'days-between',
			title:
				timeMessages.calculators?.daysBetween?.title ||
				t('calculators.daysBetween.title'),
			description:
				timeMessages.calculators?.daysBetween?.description ||
				t('calculators.daysBetween.description'),
			icon: Calendar,
			href: '/time/days-between',
		},
		{
			id: 'add-time',
			title:
				timeMessages.calculators?.addTime?.title ||
				t('calculators.addTime.title'),
			description:
				timeMessages.calculators?.addTime?.description ||
				t('calculators.addTime.description'),
			icon: Plus,
			href: '/time/add-time',
		},
		{
			id: 'age',
			title:
				timeMessages.calculators?.agecalc?.title ||
				t('calculators.agecalc.title'),
			description:
				timeMessages.calculators?.agecalc?.description ||
				t('calculators.agecalc.description'),
			icon: User,
			href: '/time/age',
		},
		{
			id: 'deadline',
			title:
				timeMessages.calculators?.deadline?.title ||
				t('calculators.deadline.title'),
			description:
				timeMessages.calculators?.deadline?.description ||
				t('calculators.deadline.description'),
			icon: Target,
			href: '/time/deadline',
		},
		{
			id: 'calendar',
			title:
				timeMessages.calculators?.calendar?.title ||
				t('calculators.calendar.title'),
			description:
				timeMessages.calculators?.calendar?.description ||
				t('calculators.calendar.description'),
			icon: CalendarDays,
			href: '/time/calendar',
		},
		{
			id: 'timer',
			title:
				timeMessages.calculators?.timer?.title ||
				t('calculators.timer.title'),
			description:
				timeMessages.calculators?.timer?.description ||
				t('calculators.timer.description'),
			icon: Timer,
			href: '/time/timer',
		},
		{
			id: 'countdown',
			title:
				timeMessages.calculators?.countdown?.title ||
				t('calculators.countdown.title'),
			description:
				timeMessages.calculators?.countdown?.description ||
				t('calculators.countdown.description'),
			icon: Clock,
			href: '/time/countdown',
		},
		{
			id: 'world-time',
			title:
				timeMessages.calculators?.worldTime?.title ||
				t('calculators.worldTime.title'),
			description:
				timeMessages.calculators?.worldTime?.description ||
				t('calculators.worldTime.description'),
			icon: Globe,
			href: '/time/world-time',
		},
	];

	// Get SEO data
	const seoData = messages.categories.time.seo;
	const faqItems = seoData?.faq?.faqItems || [];

	const breadcrumbItems = [
		{
			label: tCategories('title'),
		},
	];

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
			<div className='bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Clock className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('title')}
							</h1>
						</div>
						<p className='text-xl text-purple-100 max-w-3xl mx-auto mb-8'>
							{tCategories('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calendar className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-purple-100'>
									калькуляторов
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-purple-100'>точность</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Мгновенно
								</div>
								<div className='text-purple-100'>скорость</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Бесплатно
								</div>
								<div className='text-purple-100'>использование</div>
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
								className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200'
							>
								<div className='flex items-center mb-4'>
									<calculator.icon className='h-8 w-8 text-purple-600 dark:text-purple-400 mr-3' />
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
							<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
									{seoData.advantages.comprehensive}
								</h3>
							</div>
							<div className='bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2'>
									{seoData.advantages.accurate}
								</h3>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{seoData.advantages.fast}
								</h3>
							</div>
							<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
									{seoData.advantages.free}
								</h3>
							</div>
							<div className='bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
									{seoData.advantages.accessible}
								</h3>
							</div>
							<div className='bg-red-50 dark:bg-red-900/20 p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2'>
									{seoData.advantages.detailed}
								</h3>
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
									{seoData.tips.accurate}
								</h3>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-400'>
								<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{seoData.tips.planning}
								</h3>
							</div>
							<div className='bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-400'>
								<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
									{seoData.tips.regular}
								</h3>
							</div>
							<div className='bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-400'>
								<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
									{seoData.tips.comparison}
								</h3>
							</div>
						</div>
					</div>
				)}

				{/* FAQ Section */}
				{seoData?.faq && faqItems.length > 0 && (
					<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{seoData.faq.title}
						</h2>
						<div className='space-y-4'>
							{faqItems.slice(0, 10).map((item: any, idx: number) => (
								<div
									key={idx}
									className='border-l-4 border-purple-500 pl-4'
								>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.q}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{item.a}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</main>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: seoData?.title || tCategories('title'),
						description: seoData?.description || tCategories('description'),
						url: `https://calc1.ru/${locale}/time`,
						inLanguage: locale,
						isPartOf: {
							'@type': 'WebSite',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
						},
						about: {
							'@type': 'Thing',
							name: 'Калькуляторы времени и дат',
							description:
								'Онлайн-калькуляторы для работы со временем и датами',
						},
						mainEntity: {
							'@type': 'ItemList',
							name: 'Калькуляторы времени и дат',
							numberOfItems: calculators.length,
							itemListElement: calculators.map((calc, idx) => ({
								'@type': 'ListItem',
								position: idx + 1,
								name: calc.title,
								url: `https://calc1.ru/${locale}${calc.href}`,
							})),
						},
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
						name: seoData?.title || tCategories('title'),
						description: seoData?.description || tCategories('description'),
						url: `https://calc1.ru/${locale}/time`,
						mainEntity: {
							'@type': 'ItemList',
							numberOfItems: calculators.length,
							itemListElement: calculators.map((calc, idx) => ({
								'@type': 'ListItem',
								position: idx + 1,
								name: calc.title,
								url: `https://calc1.ru/${locale}${calc.href}`,
							})),
						},
					}),
				}}
			/>

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
								name: 'Главная',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('title'),
								item: `https://calc1.ru/${locale}/time`,
							},
						],
					}),
				}}
			/>

			{/* FAQPage Structured Data */}
			{seoData?.faq && faqItems.length > 0 && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: faqItems.map((item: any) => ({
								'@type': 'Question',
								name: item.q,
								acceptedAnswer: {
									'@type': 'Answer',
									text: item.a,
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
							'https://calc1.ru',
						],
					}),
				}}
			/>
		</div>
	);
}
