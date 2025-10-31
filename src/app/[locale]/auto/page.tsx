import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	Car,
	Fuel,
	Shield,
	CreditCard,
	FileText,
	Truck,
	AlertTriangle,
	Calculator,
	TrendingDown,
	Wrench,
	CheckCircle,
	TrendingUp,
	Users,
	Zap,
	BarChart3,
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
	const t = (key: string) => messages.categories['auto'][key];

	const seoTitle = messages.categories?.auto?.seo?.title || `${t(
		'title'
	)} — Онлайн автомобильные калькуляторы | Calc1.ru`;
	const seoDescription =
		messages.categories?.auto?.seo?.description ||
		'Автомобильные калькуляторы онлайн: расчёт расхода топлива, автокредита, страховки (ОСАГО, КАСКО), транспортного налога, лизинга, таможенных платежей и штрафов ГИБДД. Бесплатные авто калькуляторы для водителей и автовладельцев.';

	const keywordsString = messages.categories?.auto?.seo?.keywords || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'авто калькуляторы',
				'автомобильные калькуляторы',
				'калькулятор расхода топлива',
				'калькулятор автокредита',
				'калькулятор ОСАГО',
				'калькулятор КАСКО',
				'калькулятор транспортного налога',
				'калькулятор лизинга',
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
			canonical: `https://calc1.ru/${locale}/auto`,
			languages: {
				ru: 'https://calc1.ru/ru/auto',
				en: 'https://calc1.ru/en/auto',
				es: 'https://calc1.ru/es/auto',
				de: 'https://calc1.ru/de/auto',
			},
		},
		openGraph: {
			title: seoTitle,
			description: seoDescription,
			url: `https://calc1.ru/${locale}/auto`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/auto-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/auto-calculators-og.jpg'],
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
		id: 'fuel-consumption',
		title: t('calculators.fuel-consumption.title'),
		description: t('calculators.fuel-consumption.description'),
		icon: Fuel,
		href: '/auto/fuel-consumption',
	},
	{
		id: 'car-loan',
		title: t('calculators.car-loan.title'),
		description: t('calculators.car-loan.description'),
		icon: CreditCard,
		href: '/auto/car-loan',
	},
	{
		id: 'osago',
		title: t('calculators.osago.title'),
		description: t('calculators.osago.description'),
		icon: Shield,
		href: '/auto/osago',
	},
	{
		id: 'kasko',
		title: t('calculators.kasko.title'),
		description: t('calculators.kasko.description'),
		icon: Shield,
		href: '/auto/kasko',
	},
	{
		id: 'vehicle-tax',
		title: t('calculators.vehicle-tax.title'),
		description: t('calculators.vehicle-tax.description'),
		icon: Car,
		href: '/auto/vehicle-tax',
	},
	{
		id: 'leasing',
		title: t('calculators.leasing.title'),
		description: t('calculators.leasing.description'),
		icon: FileText,
		href: '/auto/leasing',
	},
	{
		id: 'customs',
		title: t('calculators.customs.title'),
		description: t('calculators.customs.description'),
		icon: Truck,
		href: '/auto/customs',
	},
	{
		id: 'traffic-fines',
		title: t('calculators.traffic-fines.title'),
		description: t('calculators.traffic-fines.description'),
		icon: AlertTriangle,
		href: '/auto/traffic-fines',
	},
	{
		id: 'car-ownership',
		title: t('calculators.car-ownership.title'),
		description: t('calculators.car-ownership.description'),
		icon: Calculator,
		href: '/auto/car-ownership',
	},
	{
		id: 'car-depreciation',
		title: t('calculators.car-depreciation.title'),
		description: t('calculators.car-depreciation.description'),
		icon: TrendingDown,
		href: '/auto/car-depreciation',
	},
];

export default async function AutoPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({ locale });
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});
	const currentLocale = await getLocale();

	const calculators = getCalculators(t);
	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('auto.title') },
	];

	// Get SEO content
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const seoData = messages.categories?.auto?.seo || {};
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
							<Car className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('auto.title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{tCategories('auto.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-blue-100'>Калькуляторов</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-blue-100'>Точность</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Мгновенно
								</div>
								<div className='text-blue-100'>Расчёт</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Бесплатно
								</div>
								<div className='text-blue-100'>Использование</div>
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
								{seoData.overview.title || 'Автомобильные калькуляторы'}
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
							{seoData.advantages.title || 'Преимущества'}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Calculator className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.comprehensive || 'Полный набор инструментов'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									Все необходимые расчёты в одном месте для удобного
									планирования бюджета на автомобиль.
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<CheckCircle className='w-8 h-8 text-green-600 dark:text-green-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.accurate || 'Точные расчёты'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									На основе актуальных тарифов и ставок, утверждённых
									государственными органами и финансовыми учреждениями.
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Zap className='w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.fast || 'Мгновенные результаты'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									Без ожидания и очередей. Все расчёты выполняются мгновенно
									и в режиме реального времени.
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<TrendingUp className='w-8 h-8 text-purple-600 dark:text-purple-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.free || 'Полностью бесплатно'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									Без скрытых платежей, без регистрации, без ограничений по
									использованию.
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<BarChart3 className='w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.accessible || 'Доступность'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									Работает на всех устройствах: компьютерах, планшетах и
									смартфонах с адаптивным интерфейсом.
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<FileText className='w-8 h-8 text-red-600 dark:text-red-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{seoData.advantages.detailed || 'Детальные результаты'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									Разбивка по статьям расходов, графики платежей и детальная
									информация для анализа.
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
								{seoData.tips.title || 'Советы по использованию'}
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
										{seoData.tips.comparison}
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
						Доступные калькуляторы
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
								{seoData.faq?.title ||
									'Часто задаваемые вопросы об автомобильных калькуляторах'}
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
			{/* WebPage Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: tCategories('auto.title'),
						description: tCategories('auto.description'),
						url: `https://calc1.ru/${locale}/auto`,
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
									name: tCategories('auto.title'),
									item: `https://calc1.ru/${locale}/auto`,
								},
							],
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
						name: tCategories('auto.title'),
						description: tCategories('auto.description'),
						url: `https://calc1.ru/${locale}/auto`,
						mainEntity: {
							'@type': 'ItemList',
							numberOfItems: calculators.length,
							itemListElement: calculatorItems,
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
								name: tCategories('auto.title'),
								item: `https://calc1.ru/${locale}/auto`,
							},
						],
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
							mainEntity: faqItems.map((faq: any) => ({
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
