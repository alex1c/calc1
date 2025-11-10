import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import CategoryCard from '@/components/category-card';
import Link from 'next/link';
import { isSupportedLocale } from '@/lib/constants';
import {
	Calculator,
	CreditCard,
	Home,
	Car,
	Clock,
	Heart,
	BookOpen,
	Shuffle,
	Smile,
	Wrench,
	Monitor,
} from 'lucide-react';

interface Props {
	params: { locale: string };
}

// Generate comprehensive SEO metadata for homepage
export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const messages = (await import(`../../../messages/${locale}.json`)).default;
	const t = (key: string) => {
		const keys = key.split('.');
		let value: any = messages;
		for (const k of keys) {
			value = value?.[k];
		}
		return value || key;
	};

	const brandName = t('brand.name');
	const brandSlogan = t('brand.slogan');
	const siteDescription = t('footer.siteDescription');

	// SEO-optimized title and description
	const title = locale === 'ru' 
		? `${brandName} - ${siteDescription} | Calc1.ru`
		: `${brandName} - ${siteDescription} | Calc1.ru`;

	const description = locale === 'ru'
		? `${siteDescription} Более 100 бесплатных онлайн калькуляторов: финансовые, математические, строительные, медицинские, конвертеры единиц измерения и многое другое. Точные расчёты без регистрации.`
		: `${siteDescription} More than 100 free online calculators: financial, mathematical, construction, health, unit converters and much more. Accurate calculations without registration.`;

	// Get keywords from translations
	const keywordsFromTranslations = t('homepage.seo.keywords');
	const keywords = (typeof keywordsFromTranslations === 'string' && keywordsFromTranslations !== 'homepage.seo.keywords')
		? keywordsFromTranslations
		: (locale === 'ru'
			? 'калькулятор онлайн, бесплатные калькуляторы, финансовые калькуляторы, математические калькуляторы, строительные калькуляторы, медицинские калькуляторы, конвертеры единиц, калькулятор кредита, калькулятор ипотеки, калькулятор ипотеки онлайн, калькулятор ипотеки бесплатно, калькулятор ипотеки рассчитать, калькулятор ипотеки с досрочным погашением, калькулятор ипотеки калькулятор онлайн, калькулятор ипотеки расчет, калькулятор кредита онлайн, калькулятор кредита рассчитать, калькулятор кредита бесплатно, калькулятор кредита с досрочным погашением, калькулятор ипотеки, калькулятор ипотеки онлайн, калькулятор ипотеки бесплатно, калькулятор ипотеки рассчитать'
			: 'online calculator, free calculators, financial calculators, math calculators, construction calculators, health calculators, unit converters, loan calculator, mortgage calculator, credit calculator, BMI calculator, tax calculator');

	const canonicalUrl = locale === 'ru' ? 'https://calc1.ru' : `https://calc1.ru/${locale}`;

	return {
		title,
		description,
		keywords: keywords.split(', '),
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		applicationName: 'Calc1.ru',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru',
				en: 'https://calc1.ru/en',
				de: 'https://calc1.ru/de',
				es: 'https://calc1.ru/es',
				fr: 'https://calc1.ru/fr',
				it: 'https://calc1.ru/it',
				pl: 'https://calc1.ru/pl',
				tr: 'https://calc1.ru/tr',
				'pt-BR': 'https://calc1.ru/pt-BR',
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
					url: 'https://calc1.ru/images/og-home.jpg',
					width: 1200,
					height: 630,
					alt: brandName,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['https://calc1.ru/images/og-home.jpg'],
			creator: '@calc1ru',
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
		category: 'Calculator Tools',
	};
}

const categories = [
	{
		id: 'finance',
		icon: CreditCard,
		href: '/finance',
		calculatorCount: 8,
	},
	{
		id: 'math',
		icon: Calculator,
		href: '/math',
		calculatorCount: 9,
	},
	{
		id: 'life',
		icon: Home,
		href: '/life',
		calculatorCount: 8,
	},
	{
		id: 'construction',
		icon: Wrench,
		href: '/construction',
		calculatorCount: 8,
	},
	{
		id: 'auto',
		icon: Car,
		href: '/auto',
		calculatorCount: 8,
	},
	{
		id: 'time',
		icon: Clock,
		href: '/time',
		calculatorCount: 8,
	},
	{
		id: 'health',
		icon: Heart,
		href: '/health',
		calculatorCount: 8,
	},
	{
		id: 'science',
		icon: BookOpen,
		href: '/science',
		calculatorCount: 8,
	},
	{
		id: 'converter',
		icon: Shuffle,
		href: '/converter',
		calculatorCount: 8,
	},
	{
		id: 'fun',
		icon: Smile,
		href: '/fun',
		calculatorCount: 8,
	},
	{
		id: 'it',
		icon: Monitor,
		href: '/it',
		calculatorCount: 6,
	},
];

export default async function HomePage({ params: { locale } }: Props) {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const t = await getTranslations();
	const tCategories = await getTranslations('categories');

	// Prepare structured data for SEO - WebSite Schema with SearchAction
	const websiteData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: t('brand.name'),
		description: t('footer.siteDescription'),
		url: locale === 'ru' ? 'https://calc1.ru' : `https://calc1.ru/${locale}`,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `https://calc1.ru/${locale === 'ru' ? '' : locale + '/'}search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
		inLanguage: locale,
		alternateName: 'Calc1',
		keywords: (() => {
			const keywordsStr = t('homepage.seo.keywords');
			if (typeof keywordsStr === 'string' && keywordsStr !== 'homepage.seo.keywords') {
				return keywordsStr.split(', ').slice(0, 4).join(', ');
			}
			return locale === 'ru'
				? 'калькулятор онлайн, бесплатные калькуляторы, финансовые калькуляторы, математические калькуляторы'
				: 'online calculator, free calculators, financial calculators, math calculators';
		})(),
	};

	const organizationData = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Calc1.ru',
		url: 'https://calc1.ru',
		logo: 'https://calc1.ru/images/logo.png',
		description: t('footer.siteDescription'),
		sameAs: [
			'https://www.facebook.com/calc1ru',
			'https://twitter.com/calc1ru',
			'https://www.instagram.com/calc1ru',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer support',
			url: 'https://calc1.ru/contact',
		},
	};

	const collectionPageData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: t('brand.name'),
		description: t('footer.siteDescription'),
		url: locale === 'ru' ? 'https://calc1.ru' : `https://calc1.ru/${locale}`,
		mainEntity: {
			'@type': 'ItemList',
			name: t('common.calculators'),
			description: t('footer.siteDescription'),
			numberOfItems: 100,
		},
	};

	// FAQ structured data
	const faqItems = [
		{
			q: locale === 'ru'
				? 'Сколько калькуляторов доступно на сайте?'
				: 'How many calculators are available on the site?',
			a: locale === 'ru'
				? 'На Calc1.ru доступно более 100 бесплатных онлайн калькуляторов в различных категориях: финансы, математика, строительство, здоровье, время, конвертеры единиц и многое другое.'
				: 'Calc1.ru offers more than 100 free online calculators in various categories: finance, mathematics, construction, health, time, unit converters and much more.',
		},
		{
			q: locale === 'ru'
				? 'Нужна ли регистрация для использования калькуляторов?'
				: 'Do I need to register to use calculators?',
			a: locale === 'ru'
				? 'Нет, все калькуляторы на Calc1.ru доступны бесплатно без регистрации. Вы можете использовать их сразу после перехода на страницу калькулятора.'
				: 'No, all calculators on Calc1.ru are available for free without registration. You can use them immediately after visiting the calculator page.',
		},
		{
			q: locale === 'ru'
				? 'На каких языках доступен сайт?'
				: 'In what languages is the site available?',
			a: locale === 'ru'
				? 'Сайт Calc1.ru доступен на 9 языках: русский, английский, немецкий, испанский, французский, итальянский, польский, турецкий и португальский (Бразилия).'
				: 'Calc1.ru is available in 9 languages: Russian, English, German, Spanish, French, Italian, Polish, Turkish and Portuguese (Brazil).',
		},
		{
			q: locale === 'ru'
				? 'Точны ли расчеты калькуляторов?'
				: 'Are calculator calculations accurate?',
			a: locale === 'ru'
				? 'Да, все калькуляторы используют проверенные математические формулы и алгоритмы. Однако результаты носят информационный характер и не заменяют профессиональную консультацию в финансовых и медицинских вопросах.'
				: 'Yes, all calculators use proven mathematical formulas and algorithms. However, results are for informational purposes only and do not replace professional consultation in financial and medical matters.',
		},
	];

	const faqPageData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
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
				name: t('breadcrumbs.home'),
				item: locale === 'ru' ? 'https://calc1.ru' : `https://calc1.ru/${locale}`,
			},
		],
	};

	return (
		<>
			{/* Structured Data (JSON-LD) */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationData),
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
					__html: JSON.stringify(faqPageData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbListData),
				}}
			/>

			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
				<Header />

				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					{/* Hero Section */}
					<section className='text-center mb-12' aria-labelledby='main-heading'>
						<h1
							id='main-heading'
							className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'
						>
							{t('brand.name')}
						</h1>
						<p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8'>
							{t('brand.slogan')}
						</p>
						<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-3xl mx-auto'>
							<h2 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{locale === 'ru'
									? 'Более 100 калькуляторов'
									: 'More than 100 calculators'}
							</h2>
							<p className='text-blue-800 dark:text-blue-200'>
								{locale === 'ru'
									? 'Финансовые, математические, строительные, медицинские и многие другие калькуляторы для помощи в повседневных расчётах и сложных задачах. Все калькуляторы бесплатны и не требуют регистрации.'
									: 'Financial, mathematical, construction, health, and many other calculators to help you with daily calculations and complex problems. All calculators are free and require no registration.'}
							</p>
						</div>
					</section>

					{/* Categories Grid */}
					<section className='mb-12' aria-labelledby='categories-heading'>
						<h2
							id='categories-heading'
							className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'
						>
							{t('common.categories')}
						</h2>
						<div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
							role='list'
						>
							{categories.map((category) => (
								<CategoryCard
									key={category.id}
									category={category.id}
									icon={category.icon}
									href={category.href}
									calculatorCount={category.calculatorCount}
								/>
							))}
						</div>
					</section>

					{/* Featured Calculators */}
					<section
						className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-12'
						aria-labelledby='popular-heading'
					>
						<h2
							id='popular-heading'
							className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6'
						>
							{locale === 'ru'
								? 'Популярные калькуляторы'
								: 'Popular Calculators'}
						</h2>
						<div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
							role='list'
						>
							<article className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors'>
								<Link
									href={`/${locale}/life/paper-weight`}
									className='block'
									aria-label={
										locale === 'ru'
											? 'Калькулятор веса бумаги'
											: 'Paper Weight Calculator'
									}
								>
									<h3 className='font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2'>
										{locale === 'ru'
											? 'Калькулятор веса бумаги'
											: 'Paper Weight Calculator'}
									</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										{locale === 'ru'
											? 'Расчёт веса бумаги по плотности'
											: 'Calculate paper weight by density'}
									</p>
								</Link>
							</article>
							<article className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors'>
								<Link
									href={`/${locale}/health/bmihealth`}
									className='block'
									aria-label={
										locale === 'ru'
											? 'Калькулятор ИМТ'
											: 'BMI Calculator'
									}
								>
									<h3 className='font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2'>
										{locale === 'ru' ? 'Калькулятор ИМТ' : 'BMI Calculator'}
									</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										{locale === 'ru'
											? 'Расчёт индекса массы тела'
											: 'Body Mass Index calculation'}
									</p>
								</Link>
							</article>
							<article className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors'>
								<Link
									href={`/${locale}/finance/mortgage`}
									className='block'
									aria-label={
										locale === 'ru'
											? 'Калькулятор ипотеки'
											: 'Mortgage Calculator'
									}
								>
									<h3 className='font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2'>
										{locale === 'ru'
											? 'Калькулятор ипотеки'
											: 'Mortgage Calculator'}
									</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										{locale === 'ru'
											? 'Расчёт платежей по кредиту'
											: 'Loan payment calculations'}
									</p>
								</Link>
							</article>
						</div>
					</section>

					{/* SEO Content Section */}
					<section
						className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8'
						aria-labelledby='about-heading'
					>
						<h2
							id='about-heading'
							className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6'
						>
							{locale === 'ru'
								? 'О Calc1.ru'
								: 'About Calc1.ru'}
						</h2>
						<div className='prose dark:prose-invert max-w-none'>
							<p className='text-gray-700 dark:text-gray-300 mb-4'>
								{locale === 'ru'
									? 'Calc1.ru — это крупнейший портал бесплатных онлайн калькуляторов в России и мире. Мы предоставляем более 100 специализированных калькуляторов для различных сфер жизни: от финансовых расчётов до медицинских показателей.'
									: 'Calc1.ru is the largest portal of free online calculators in Russia and the world. We provide more than 100 specialized calculators for various areas of life: from financial calculations to medical indicators.'}
							</p>
							<p className='text-gray-700 dark:text-gray-300 mb-4'>
								{locale === 'ru'
									? 'Наш сайт поддерживает 9 языков и доступен пользователям из разных стран. Все калькуляторы работают онлайн, не требуют установки и регистрации, что делает их максимально удобными в использовании.'
									: 'Our site supports 9 languages and is available to users from different countries. All calculators work online, require no installation or registration, making them extremely convenient to use.'}
							</p>
							<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
								{locale === 'ru' ? (
									<>
										<li>
											Финансовые калькуляторы: кредит, ипотека, вклад,
											инвестиции, налоги
										</li>
										<li>
											Математические калькуляторы: проценты, площади, объёмы,
											уравнения, статистика
										</li>
										<li>
											Строительные калькуляторы: материалы, площади,
											объёмы, расходы
										</li>
										<li>
											Медицинские калькуляторы: ИМТ, давление, калории,
											беременность
										</li>
										<li>
											Конвертеры единиц измерения: длина, вес, температура,
											давление, скорость
										</li>
									</>
								) : (
									<>
										<li>
											Financial calculators: loan, mortgage, deposit,
											investments, taxes
										</li>
										<li>
											Mathematical calculators: percentages, areas, volumes,
											equations, statistics
										</li>
										<li>
											Construction calculators: materials, areas, volumes,
											costs
										</li>
										<li>
											Health calculators: BMI, blood pressure, calories,
											pregnancy
										</li>
										<li>
											Unit converters: length, weight, temperature, pressure,
											speed
										</li>
									</>
								)}
							</ul>
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
