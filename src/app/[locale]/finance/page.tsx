import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	CreditCard,
	Calculator,
	TrendingUp,
	PiggyBank,
	Car,
	Home,
	Receipt,
	Users,
	Sparkles,
	Zap,
	DollarSign,
	Percent,
	BarChart3,
} from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.categories['finance'][key];

	const title = `${t('title')} — Онлайн финансовые калькуляторы | Calc1.ru`;
	const description =
		'Финансовые калькуляторы онлайн: расчёт кредитов, ипотеки, автокредитов, инвестиций, вкладов, налогов и штрафов. Бесплатные финансовые калькуляторы для планирования бюджета и принятия финансовых решений.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'финансовые калькуляторы',
				'калькулятор кредита',
				'калькулятор ипотеки',
		  ];

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
			canonical: `https://calc1.ru/${locale}/finance`,
			languages: {
				ru: 'https://calc1.ru/ru/finance',
				en: 'https://calc1.ru/en/finance',
				es: 'https://calc1.ru/es/finance',
				de: 'https://calc1.ru/de/finance',
			},
		},
		openGraph: {
			title,
			description,
			url: `https://calc1.ru/${locale}/finance`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/finance-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/finance-calculators-og.jpg'],
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
		id: 'credit-loan',
		title: t('calculators.credit-loan.title'),
		description: t('calculators.credit-loan.description'),
		icon: CreditCard,
		href: '/finance/credit-loan',
		category: t('categories.finance.subcategories.loans'),
	},
	{
		id: 'mortgage',
		title: t('calculators.mortgage.title'),
		description: t('calculators.mortgage.description'),
		icon: Home,
		href: '/finance/mortgage',
		category: t('categories.finance.subcategories.loans'),
	},
	{
		id: 'auto-loan',
		title: t('calculators.auto-loan.title'),
		description: t('calculators.auto-loan.description'),
		icon: Car,
		href: '/finance/auto-loan',
		category: t('categories.finance.subcategories.loans'),
	},
	{
		id: 'consumer-loan',
		title: t('calculators.consumer-loan.title'),
		description: t('calculators.consumer-loan.description'),
		icon: Calculator,
		href: '/finance/consumer-loan',
		category: t('categories.finance.subcategories.loans'),
	},
	{
		id: 'loan-overpayment',
		title: t('calculators.loan-overpayment.title'),
		description: t('calculators.loan-overpayment.description'),
		icon: Percent,
		href: '/finance/loan-overpayment',
		category: t('categories.finance.subcategories.loans'),
	},
	{
		id: 'investment',
		title: t('calculators.investment.title'),
		description: t('calculators.investment.description'),
		icon: TrendingUp,
		href: '/finance/investment',
		category: t('categories.finance.subcategories.investments'),
	},
	{
		id: 'savings',
		title: t('calculators.savings.title'),
		description: t('calculators.savings.description'),
		icon: PiggyBank,
		href: '/finance/savings',
		category: t('categories.finance.subcategories.investments'),
	},
	{
		id: 'compound-interest',
		title: t('calculators.compound-interest.title'),
		description: t('calculators.compound-interest.description'),
		icon: TrendingUp,
		href: '/finance/compound-interest',
		category: t('categories.finance.subcategories.investments'),
	},
	{
		id: 'tax-calculator',
		title: t('calculators.tax-calculator.title'),
		description: t('calculators.tax-calculator.description'),
		icon: Receipt,
		href: '/finance/tax-calculator',
		category: t('categories.finance.subcategories.taxes'),
	},
	{
		id: 'alimony',
		title: t('calculators.alimony.title'),
		description: t('calculators.alimony.description'),
		icon: Users,
		href: '/finance/alimony',
		category: t('categories.finance.subcategories.taxes'),
	},
	{
		id: 'profit-margin',
		title: t('calculators.profit-margin.title'),
		description: t('calculators.profit-margin.description'),
		icon: TrendingUp,
		href: '/finance/profit-margin',
		category: t('categories.finance.subcategories.business'),
	},
	{
		id: 'pension',
		title: t('calculators.pension.title'),
		description: t('calculators.pension.description'),
		icon: Users,
		href: '/finance/pension',
		category: t('categories.finance.subcategories.investments'),
	},
];

export default async function FinancePage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	// Load merged translations including finance calculators
	const { loadMergedFinanceTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFinanceTranslations(locale);

	// Create translation function that accesses merged messages
	const t = (key: string) => {
		const parts = key.split('.');
		let value: any = messages;
		for (const part of parts) {
			value = value?.[part];
		}
		return value || key;
	};

	const tCategories = await getTranslations({ namespace: 'categories' });

	const calculators = getCalculators(t);
	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('finance.title') },
	];

	// Group calculators by category
	const calculatorsByCategory = calculators.reduce((acc, calc) => {
		if (!acc[calc.category]) {
			acc[calc.category] = [];
		}
		acc[calc.category].push(calc);
		return acc;
	}, {} as Record<string, typeof calculators>);

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
			<div className='bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-800 dark:via-emerald-800 dark:to-teal-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<DollarSign className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('finance.title')}
							</h1>
						</div>
						<p className='text-xl text-green-100 max-w-3xl mx-auto mb-8'>
							{tCategories('finance.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-green-100'>
									{t('common.calculatorsCount')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Sparkles className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-green-100'>{t('common.free')}</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Percent className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3
								</div>
								<div className='text-green-100'>{t('common.sections')}</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('common.online')}
								</div>
								<div className='text-green-100'>24/7</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* SEO Content Section */}
				{messages.categories?.finance?.seo?.overview && (
					<div className='mb-12'>
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
								{typeof messages.categories.finance.seo.overview === 'object'
									? messages.categories.finance.seo.overview.title || tCategories('finance.title')
									: tCategories('finance.title')}
							</h2>
							{typeof messages.categories.finance.seo.overview === 'object' ? (
								<>
									<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
										{messages.categories.finance.seo.overview.content}
									</p>
									{messages.categories.finance.seo.overview.additionalContent && (
										<p className='text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
											{messages.categories.finance.seo.overview.additionalContent}
										</p>
									)}
								</>
							) : (
								<p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
									{messages.categories.finance.seo.overview}
								</p>
							)}
						</div>
					</div>
				)}

				{/* Calculators by Category */}
				{Object.entries(calculatorsByCategory).map(
					([category, calcs]) => (
						<div
							key={category}
							className='mb-12'
						>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
								{category}
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{calcs.map((calculator) => (
									<Link
										key={calculator.id}
										href={`/${locale}${calculator.href}`}
										className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all duration-200 group'
									>
										<div className='flex items-center mb-4'>
											<div className='p-2 bg-green-50 dark:bg-green-900/20 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors'>
												<calculator.icon className='h-6 w-6 text-green-600 dark:text-green-400' />
											</div>
											<h3 className='text-xl font-semibold text-gray-900 dark:text-white ml-3'>
												{calculator.title}
											</h3>
										</div>
										<p className='text-gray-600 dark:text-gray-300'>
											{calculator.description}
										</p>
									</Link>
								))}
							</div>
						</div>
					)
				)}

				{/* Features Section */}
				{messages.categories?.finance?.seo?.advantages && (
					<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{messages.categories.finance.seo.advantages.title || tCategories('finance.title')}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							<div className='text-center'>
								<div className='bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
									<Calculator className='w-8 h-8 text-green-600 dark:text-green-400' />
								</div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.finance.seo.advantages.accurate || 'Точные расчёты'}
								</h3>
								<p className='text-gray-600 dark:text-gray-300 text-sm'>
									{messages.categories.finance.seo.advantages.accurateDesc || 'Все калькуляторы используют актуальные финансовые формулы'}
								</p>
							</div>
							<div className='text-center'>
								<div className='bg-blue-100 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
									<Sparkles className='w-8 h-8 text-blue-600 dark:text-blue-400' />
								</div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.finance.seo.advantages.free || 'Бесплатно'}
								</h3>
								<p className='text-gray-600 dark:text-gray-300 text-sm'>
									{messages.categories.finance.seo.advantages.freeDesc || 'Полностью бесплатный доступ ко всем калькуляторам'}
								</p>
							</div>
							<div className='text-center'>
								<div className='bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
									<BarChart3 className='w-8 h-8 text-purple-600 dark:text-purple-400' />
								</div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.finance.seo.advantages.charts || 'Графики и визуализация'}
								</h3>
								<p className='text-gray-600 dark:text-gray-300 text-sm'>
									{messages.categories.finance.seo.advantages.chartsDesc || 'Наглядные графики для лучшего понимания результатов'}
								</p>
							</div>
							<div className='text-center'>
								<div className='bg-orange-100 dark:bg-orange-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
									<Users className='w-8 h-8 text-orange-600 dark:text-orange-400' />
								</div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.finance.seo.advantages.forAll || 'Для всех'}
								</h3>
								<p className='text-gray-600 dark:text-gray-300 text-sm'>
									{messages.categories.finance.seo.advantages.forAllDesc || 'От частных лиц до бизнеса'}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Financial Topics Section */}
				{messages.categories?.finance?.seo?.sections && (
					<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{messages.categories.finance.seo.sections.title || 'Разделы финансов'}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{[
								{
									name: messages.categories.finance.seo.sections.loans?.name || t('categories.finance.subcategories.loans'),
									icon: CreditCard,
									description: messages.categories.finance.seo.sections.loans?.description || 'Ипотека, автокредит, потребительский кредит, лизинг',
									color: 'green',
								},
								{
									name: messages.categories.finance.seo.sections.investments?.name || t('categories.finance.subcategories.investments'),
									icon: TrendingUp,
									description: messages.categories.finance.seo.sections.investments?.description || 'Инвестиции, вклады, накопительные счета',
									color: 'blue',
								},
								{
									name: messages.categories.finance.seo.sections.taxes?.name || t('categories.finance.subcategories.taxes'),
									icon: Receipt,
									description: messages.categories.finance.seo.sections.taxes?.description || 'НДФЛ, транспортный налог, штрафы ГИБДД',
									color: 'orange',
								},
							].map((topic) => {
							const Icon = topic.icon;
							const colorClasses = {
								green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
								blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
								orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
							};
							return (
								<div
									key={topic.name}
									className='border border-gray-200 dark:border-gray-700 rounded-lg p-6'
								>
									<div
										className={`w-12 h-12 ${
											colorClasses[
												topic.color as keyof typeof colorClasses
											]
										} rounded-lg flex items-center justify-center mb-4`}
									>
										<Icon className='w-6 h-6' />
									</div>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{topic.name}
									</h3>
									<p className='text-gray-600 dark:text-gray-300 text-sm'>
										{topic.description}
									</p>
								</div>
							);
						})}
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
						'@type': 'CollectionPage',
						name: tCategories('finance.title'),
						description: tCategories('finance.description'),
						url: `https://calc1.ru/${locale}/finance`,
						mainEntity: {
							'@type': 'ItemList',
							numberOfItems: calculators.length,
							itemListElement: calculators.map((calc, index) => ({
								'@type': 'ListItem',
								position: index + 1,
								name: calc.title,
								description: calc.description,
								url: `https://calc1.ru/${locale}${calc.href}`,
							})),
						},
					}),
				}}
			/>

			{/* WebPage Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: tCategories('finance.title'),
						description: tCategories('finance.description'),
						url: `https://calc1.ru/${locale}/finance`,
						inLanguage: locale,
						isPartOf: {
							'@type': 'WebSite',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
						},
						breadcrumb: {
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
									name: tCategories('finance.title'),
									item: `https://calc1.ru/${locale}/finance`,
								},
							],
						},
					}),
				}}
			/>

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
