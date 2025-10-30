import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	Home,
	Heart,
	Baby,
	Utensils,
	PieChart,
	Wine,
	TrendingUp,
	Shirt,
	Circle,
	Zap,
	FileText,
	Droplets,
	Flame,
	Thermometer,
	Users,
	Calculator,
	Sparkles,
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
	const t = (key: string) => messages.categories['life'][key];

	const title = `${t(
		'title'
	)} — Онлайн калькуляторы для быта и жизни | Calc1.ru`;
	const description =
		'Бытовые калькуляторы для жизни: расчёт ИМТ, калорий, беременности, роста ребёнка, расхода электроэнергии, воды, газа и отопления. Бесплатные онлайн калькуляторы для дома, семьи и здоровья.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: ['бытовые калькуляторы', 'калькуляторы для жизни', 'калькулятор ИМТ'];

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
			canonical: `https://calc1.ru/${locale}/life`,
			languages: {
				ru: 'https://calc1.ru/ru/life',
				en: 'https://calc1.ru/en/life',
				es: 'https://calc1.ru/es/life',
				de: 'https://calc1.ru/de/life',
			},
		},
		openGraph: {
			title,
			description,
			url: `https://calc1.ru/${locale}/life`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/life-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/life-calculators-og.jpg'],
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
		id: 'bmi',
		title: t('calculators.bmi.title'),
		description: t('calculators.bmi.description'),
		icon: Heart,
		href: '/life/bmi',
		category: 'Здоровье',
	},
	{
		id: 'calories',
		title: t('calculators.calories.title'),
		description: t('calculators.calories.description'),
		icon: Utensils,
		href: '/life/calories',
		category: 'Питание',
	},
	{
		id: 'food-ration',
		title: t('calculators.foodRation.title'),
		description: t('calculators.foodRation.description'),
		icon: PieChart,
		href: '/life/food-ration',
		category: 'Питание',
	},
	{
		id: 'pregnancy',
		title: t('calculators.pregnancy.title'),
		description: t('calculators.pregnancy.description'),
		icon: Baby,
		href: '/life/pregnancy',
		category: 'Семья',
	},
	{
		id: 'baby-growth',
		title: t('calculators.babyGrowth.title'),
		description: t('calculators.babyGrowth.description'),
		icon: TrendingUp,
		href: '/life/baby-growth',
		category: 'Семья',
	},
	{
		id: 'blood-alcohol',
		title: t('calculators.bloodAlcohol.title'),
		description: t('calculators.bloodAlcohol.description'),
		icon: Wine,
		href: '/life/blood-alcohol',
		category: 'Здоровье',
	},
	{
		id: 'size-converter',
		title: t('calculators.size-converter.title'),
		description: t('calculators.size-converter.description'),
		icon: Shirt,
		href: '/life/size-converter',
		category: 'Быт',
	},
	{
		id: 'ring-size',
		title: t('calculators.ringSize.title'),
		description: t('calculators.ringSize.description'),
		icon: Circle,
		href: '/life/ring-size',
		category: 'Быт',
	},
	{
		id: 'electricity-cost',
		title: t('calculators.electricityCost.title'),
		description: t('calculators.electricityCost.description'),
		icon: Zap,
		href: '/life/electricity-cost',
		category: 'Коммунальные услуги',
	},
	{
		id: 'paper-weight',
		title: t('calculators.paper-weight.title'),
		description: t('calculators.paper-weight.description'),
		icon: FileText,
		href: '/life/paper-weight',
		category: 'Быт',
	},
	{
		id: 'water-usage',
		title: t('calculators.waterUsage.title'),
		description: t('calculators.waterUsage.description'),
		icon: Droplets,
		href: '/life/water-usage',
		category: 'Коммунальные услуги',
	},
	{
		id: 'heating-cost',
		title: t('calculators.heatingCost.title'),
		description: t('calculators.heatingCost.description'),
		icon: Flame,
		href: '/life/heating-cost',
		category: 'Коммунальные услуги',
	},
	{
		id: 'gas-usage',
		title: t('calculators.gasUsage.title'),
		description: t('calculators.gasUsage.description'),
		icon: Thermometer,
		href: '/life/gas-usage',
		category: 'Коммунальные услуги',
	},
	{
		id: 'electricity-usage',
		title: t('calculators.electricityUsage.title'),
		description: t('calculators.electricityUsage.description'),
		icon: Zap,
		href: '/life/electricity-usage',
		category: 'Коммунальные услуги',
	},
];

export default async function LifePage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations();
	const tCategories = await getTranslations({ namespace: 'categories' });

	const calculators = getCalculators(t);
	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('life.title') },
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
			<div className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Users className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('life.title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{tCategories('life.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-blue-100'>
									Калькуляторов
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Sparkles className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-blue-100'>Бесплатно</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Users className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									4
								</div>
								<div className='text-blue-100'>Категории</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Онлайн
								</div>
								<div className='text-blue-100'>24/7</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* SEO Content Section */}
				<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12'>
					<div className='prose prose-lg max-w-none dark:prose-invert'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							Бытовые калькуляторы для повседневной жизни
						</h2>
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
							Наша коллекция бытовых калькуляторов поможет вам
							решить множество повседневных задач: от планирования
							питания и здоровья до расчёта коммунальных платежей
							и бытовых расходов. Все калькуляторы полностью
							бесплатные, работают онлайн без регистрации и
							доступны 24/7.
						</p>
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
							Используйте калькуляторы для расчёта индекса массы
							тела (ИМТ), калорийности рациона, нормы БЖУ, срока
							беременности, роста и веса ребёнка, расхода
							электроэнергии, воды, газа, стоимости отопления и
							много другого. Каждый калькулятор содержит подробные
							инструкции, примеры расчётов и советы по
							использованию.
						</p>
					</div>
				</div>

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
										className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 group'
									>
										<div className='flex items-center mb-4'>
											<div className='p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors'>
												<calculator.icon className='h-6 w-6 text-blue-600 dark:text-blue-400' />
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
				<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						Преимущества наших калькуляторов
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<div className='text-center'>
							<div className='bg-blue-100 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Calculator className='w-8 h-8 text-blue-600 dark:text-blue-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Точные расчёты
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Все калькуляторы используют проверенные формулы
								и алгоритмы
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Sparkles className='w-8 h-8 text-green-600 dark:text-green-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Бесплатно
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Полностью бесплатный доступ ко всем
								калькуляторам
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Zap className='w-8 h-8 text-purple-600 dark:text-purple-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Онлайн
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Работают в браузере без установки программ
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-orange-100 dark:bg-orange-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Users className='w-8 h-8 text-orange-600 dark:text-orange-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Для всех
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Простой и понятный интерфейс для каждого
							</p>
						</div>
					</div>
				</div>
			</main>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: tCategories('life.title'),
						description: tCategories('life.description'),
						url: `https://calc1.ru/${locale}/life`,
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
						name: tCategories('life.title'),
						description: tCategories('life.description'),
						url: `https://calc1.ru/${locale}/life`,
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
									name: tCategories('life.title'),
									item: `https://calc1.ru/${locale}/life`,
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
