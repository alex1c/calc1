import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	Calculator,
	Percent,
	Circle,
	Box,
	Zap,
	Equal,
	BarChart3,
	Ruler,
	Pi,
	Square,
	Code2,
	Users,
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
	const t = (key: string) => messages.categories['math'][key];

	const title = `${t(
		'title'
	)} — Онлайн математические калькуляторы | Calc1.ru`;
	const description =
		'Математические калькуляторы онлайн: основные операции, проценты, площадь, объём, степени и корни, уравнения, статистика, конвертер единиц. Бесплатные математические калькуляторы для студентов, школьников и профессионалов.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'математические калькуляторы',
				'калькулятор математика',
				'онлайн калькулятор математика',
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
			canonical: `https://calc1.ru/${locale}/math`,
			languages: {
				ru: 'https://calc1.ru/ru/math',
				en: 'https://calc1.ru/en/math',
				es: 'https://calc1.ru/es/math',
				de: 'https://calc1.ru/de/math',
			},
		},
		openGraph: {
			title,
			description,
			url: `https://calc1.ru/${locale}/math`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/math-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/math-calculators-og.jpg'],
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

const getCalculators = (t: any) => {
	const calculators = [
		{
			id: 'basic',
			title: t('calculators.basic.title'),
			description: t('calculators.basic.description'),
			icon: Calculator,
			href: '/math/basic',
			category: 'Арифметика',
		},
		{
			id: 'percentage',
			title: t('calculators.math_percent.title'),
			description: t('calculators.math_percent.description'),
			icon: Percent,
			href: '/math/percent',
			category: 'Арифметика',
		},
		{
			id: 'area',
			title: t('calculators.area.title'),
			description: t('calculators.area.description'),
			icon: Circle,
			href: '/math/area',
			category: 'Геометрия',
		},
		{
			id: 'volume',
			title: t('calculators.volume.title'),
			description: t('calculators.volume.description'),
			icon: Box,
			href: '/math/volume',
			category: 'Геометрия',
		},
		{
			id: 'powerRoot',
			title: t('calculators.powerRoot.title'),
			description: t('calculators.powerRoot.description'),
			icon: Zap,
			href: '/math/power-root',
			category: 'Алгебра',
		},
		{
			id: 'equations',
			title: t('calculators.equations.title'),
			description: t('calculators.equations.description'),
			icon: Equal,
			href: '/math/equations',
			category: 'Алгебра',
		},
		{
			id: 'statistics',
			title: t('calculators.statistics.title'),
			description: t('calculators.statistics.description'),
			icon: BarChart3,
			href: '/math/statistics',
			category: 'Статистика',
		},
		{
			id: 'converter',
			title: t('calculators.converter.title'),
			description: t('calculators.converter.description'),
			icon: Ruler,
			href: '/math/converter',
			category: 'Конвертация',
		},
	];

	return calculators;
};

export default async function MathPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations();
	const tCategories = await getTranslations({ namespace: 'categories' });
	const calculators = getCalculators(t);

	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('math.title') },
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
			<div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Calculator className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('math.title')}
							</h1>
						</div>
						<p className='text-xl text-indigo-100 max-w-3xl mx-auto mb-8'>
							{tCategories('math.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-indigo-100'>
									Калькуляторов
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Sparkles className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-indigo-100'>Бесплатно</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Code2 className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									4
								</div>
								<div className='text-indigo-100'>Разделов</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Онлайн
								</div>
								<div className='text-indigo-100'>24/7</div>
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
							Математические калькуляторы для обучения и работы
						</h2>
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
							Наша коллекция математических калькуляторов
							охватывает все основные разделы математики: от
							простых арифметических операций до сложных
							геометрических и алгебраических расчётов. Все
							калькуляторы полностью бесплатные, работают онлайн
							без регистрации и доступны 24/7.
						</p>
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
							Используйте калькуляторы для расчёта процентов,
							площади геометрических фигур, объёма тел, степеней и
							корней чисел, решения уравнений, статистических
							расчётов и конвертации единиц измерения. Каждый
							калькулятор содержит подробные инструкции, примеры
							расчётов и пошаговые решения для лучшего понимания
							математических операций.
						</p>
						<p className='text-lg text-gray-700 dark:text-gray-300'>
							Наши калькуляторы подходят для школьников,
							студентов, учителей и профессионалов, которым нужны
							быстрые и точные математические расчёты. Все формулы
							проверены и соответствуют стандартам математики.
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
										className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg transition-all duration-200 group'
									>
										<div className='flex items-center mb-4'>
											<div className='p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors'>
												<calculator.icon className='h-6 w-6 text-indigo-600 dark:text-indigo-400' />
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
						Преимущества наших математических калькуляторов
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<div className='text-center'>
							<div className='bg-indigo-100 dark:bg-indigo-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
								<Calculator className='w-8 h-8 text-indigo-600 dark:text-indigo-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Точные расчёты
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Все калькуляторы используют проверенные
								математические формулы
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
								<Code2 className='w-8 h-8 text-purple-600 dark:text-purple-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Пошаговые решения
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Подробные объяснения и примеры для обучения
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
								От школьников до профессионалов
							</p>
						</div>
					</div>
				</div>

				{/* Mathematical Topics Section */}
				<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-12'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						Разделы математики
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{[
							{
								name: 'Арифметика',
								icon: Calculator,
								description:
									'Основные операции, проценты, дроби',
								color: 'blue',
							},
							{
								name: 'Геометрия',
								icon: Circle,
								description: 'Площадь фигур, объём тел, углы',
								color: 'green',
							},
							{
								name: 'Алгебра',
								icon: Zap,
								description: 'Степени, корни, уравнения',
								color: 'purple',
							},
							{
								name: 'Статистика',
								icon: BarChart3,
								description: 'Средние значения, дисперсия',
								color: 'orange',
							},
						].map((topic) => {
							const Icon = topic.icon;
							const colorClasses = {
								blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
								green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
								purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
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
			</main>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: tCategories('math.title'),
						description: tCategories('math.description'),
						url: `https://calc1.ru/${locale}/math`,
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
						name: tCategories('math.title'),
						description: tCategories('math.description'),
						url: `https://calc1.ru/${locale}/math`,
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
									name: tCategories('math.title'),
									item: `https://calc1.ru/${locale}/math`,
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
