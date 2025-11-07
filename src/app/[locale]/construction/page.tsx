import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	Wrench,
	Paintbrush,
	Square,
	Home,
	Package,
	Thermometer,
	BarChart3,
	Cable,
	TrendingUp,
	Droplets,
	Layers,
	Sparkles,
	Hammer,
	Building2,
	Ruler,
	Wind,
	Calculator,
	CheckCircle,
	Mountain,
	Zap,
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
	const t = (key: string) => messages.categories['construction'][key];

	const title = `${t(
		'title'
	)} — Онлайн калькуляторы для строительства | Calc1.ru`;
	const description =
		'Строительные калькуляторы: расчёт материалов (краска, обои, штукатурка, бетон, цемент), вентиляции, фундамента, площади стен, арматуры, кабеля, труб. Бесплатные онлайн калькуляторы для строительства и ремонта.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'строительные калькуляторы',
				'калькуляторы для строительства',
				'калькулятор краски',
				'калькулятор обоев',
				'калькулятор штукатурки',
				'калькулятор бетона',
				'калькулятор цемента',
				'калькулятор фундамента',
				'калькулятор вентиляции',
				'калькулятор площади стен',
				'калькулятор арматуры',
				'калькулятор кабеля',
				'калькулятор труб',
				'калькулятор кровли',
				'калькулятор плиточного клея',
				'калькулятор шпатлёвки',
				'калькулятор грунтовки',
				'строительные расчёты',
				'расчёт материалов',
				'онлайн калькулятор строительства',
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
			canonical: `https://calc1.ru/${locale}/construction`,
			languages: {
				ru: 'https://calc1.ru/ru/construction',
				en: 'https://calc1.ru/en/construction',
				es: 'https://calc1.ru/es/construction',
				de: 'https://calc1.ru/de/construction',
			},
		},
		openGraph: {
			title,
			description,
			url: `https://calc1.ru/${locale}/construction`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/construction-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/construction-calculators-og.jpg'],
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
		id: 'wallpaper',
		title: t('calculators.wallpaper.title'),
		description: t('calculators.wallpaper.description'),
		icon: Paintbrush,
		href: '/construction/wallpaper',
	},
	{
		id: 'paint',
		title: t('calculators.paint.title'),
		description: t('calculators.paint.description'),
		icon: Paintbrush,
		href: '/construction/paint',
	},
	{
		id: 'tile-glue',
		title: t('calculators.tileGlue.title'),
		description: t('calculators.tileGlue.description'),
		icon: Square,
		href: '/construction/tile-glue',
	},
	{
		id: 'putty',
		title: t('calculators.putty.title'),
		description: t('calculators.putty.description'),
		icon: Layers,
		href: '/construction/putty',
	},
	{
		id: 'primer',
		title: t('calculators.primer.title'),
		description: t('calculators.primer.description'),
		icon: Sparkles,
		href: '/construction/primer',
	},
	{
		id: 'plaster',
		title: t('calculators.plaster.title'),
		description: t('calculators.plaster.description'),
		icon: Hammer,
		href: '/construction/plaster',
	},
	{
		id: 'foundation',
		title: t('calculators.foundation.title'),
		description: t('calculators.foundation.description'),
		icon: Building2,
		href: '/construction/foundation',
	},
	{
		id: 'wall-area',
		title: t('calculators.wallArea.title'),
		description: t('calculators.wallArea.description'),
		icon: Ruler,
		href: '/construction/wall-area',
	},
	{
		id: 'ventilation',
		title: t('calculators.ventilation.title'),
		description: t('calculators.ventilation.description'),
		icon: Wind,
		href: '/construction/ventilation',
	},
	{
		id: 'tile',
		title: t('calculators.tile.title'),
		description: t('calculators.tile.description'),
		icon: Square,
		href: '/construction/tile',
	},
	{
		id: 'laminate',
		title: t('calculators.laminate.title'),
		description: t('calculators.laminate.description'),
		icon: Square,
		href: '/construction/laminate',
	},
	{
		id: 'concrete',
		title: t('calculators.concrete.title'),
		description: t('calculators.concrete.description'),
		icon: Wrench,
		href: '/construction/concrete',
	},
	{
		id: 'roofing',
		title: t('calculators.roof.title'),
		description: t('calculators.roof.description'),
		icon: Home,
		href: '/construction/roofing',
	},
	{
		id: 'wall',
		title: t('calculators.wall.title'),
		description: t('calculators.wall.description'),
		icon: Package,
		href: '/construction/wall',
	},
	{
		id: 'floor-heating',
		title: t('calculators.floorHeating.title'),
		description: t('calculators.floorHeating.description'),
		icon: Thermometer,
		href: '/construction/floor-heating',
	},
	{
		id: 'rebar-calculator',
		title: t('calculators.rebarCalculator.title'),
		description: t('calculators.rebarCalculator.description'),
		icon: BarChart3,
		href: '/construction/rebar-calculator',
	},
	{
		id: 'cable-section',
		title: t('calculators.cableSectionCalculator.title'),
		description: t('calculators.cableSectionCalculator.description'),
		icon: Cable,
		href: '/construction/cable-section',
	},
	{
		id: 'stairs',
		title: t('calculators.stairsCalculator.title'),
		description: t('calculators.stairsCalculator.description'),
		icon: TrendingUp,
		href: '/construction/stairs',
	},
	{
		id: 'water-pipe',
		title: t('calculators.waterPipeCalculator.title'),
		description: t('calculators.waterPipeCalculator.description'),
		icon: Droplets,
		href: '/construction/water-pipe',
	},
	{
		id: 'gravel',
		title: t('calculators.gravel.title'),
		description: t('calculators.gravel.description'),
		icon: Mountain,
		href: '/construction/gravel',
	},
	{
		id: 'electrical',
		title: t('calculators.electrical.title'),
		description: t('calculators.electrical.description'),
		icon: Zap,
		href: '/construction/electrical',
	},
];

export default async function ConstructionPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	// Load merged translations including construction calculators
	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);

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
	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('construction.title') },
	];

	// Get SEO content if available (use loaded messages)
	const seoKeywords = messages.categories?.construction?.seo?.keywords || '';
	const seoOverview = messages.categories?.construction?.seo?.overview || '';
	const seoAdvantages =
		messages.categories?.construction?.seo?.advantages || [];

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
			<div className='bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 dark:from-orange-800 dark:via-red-800 dark:to-amber-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Building2 className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('construction.title')}
							</h1>
						</div>
						<p className='text-xl text-orange-100 max-w-3xl mx-auto mb-8'>
							{tCategories('construction.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{calculators.length}+
								</div>
								<div className='text-orange-100'>
									{t('common.calculatorsCount')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-orange-100'>{t('common.accuracy')}</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('common.free')}
								</div>
								<div className='text-orange-100'>
									{t('common.usage')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Overview Section */}
				{messages.categories?.construction?.seo?.overview && (
					<div className='mb-12'>
						<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
								{typeof messages.categories.construction.seo.overview === 'object'
									? messages.categories.construction.seo.overview.title || tCategories('construction.title')
									: tCategories('construction.title')}
							</h2>
							{typeof messages.categories.construction.seo.overview === 'object' ? (
								<>
									<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
										{messages.categories.construction.seo.overview.content}
									</p>
									{messages.categories.construction.seo.overview.additionalContent && (
										<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
											{messages.categories.construction.seo.overview.additionalContent}
										</p>
									)}
								</>
							) : (
								<>
									<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
										{tCategories('construction.description')}
									</p>
									<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
										{messages.categories.construction.seo.overview}
									</p>
								</>
							)}
						</div>
					</div>
				)}

				{/* Advantages Section */}
				{messages.categories?.construction?.seo?.advantages && (
					<div className='mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{messages.categories.construction.seo.advantages.title || tCategories('construction.title')}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<Calculator className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.construction.seo.advantages.accurate || 'Точные расчёты'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{messages.categories.construction.seo.advantages.accurateDesc || 'Все калькуляторы используют актуальные строительные нормы и стандарты для максимальной точности расчётов материалов и работ.'}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<CheckCircle className='w-8 h-8 text-green-600 dark:text-green-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.construction.seo.advantages.savings || 'Экономия средств'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{messages.categories.construction.seo.advantages.savingsDesc || 'Правильный расчёт материалов поможет избежать переплат и нехватки материалов, оптимизировать затраты на строительство и ремонт.'}
								</p>
							</div>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
								<TrendingUp className='w-8 h-8 text-purple-600 dark:text-purple-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{messages.categories.construction.seo.advantages.simple || 'Простота использования'}
								</h3>
								<p className='text-gray-600 dark:text-gray-400'>
									{messages.categories.construction.seo.advantages.simpleDesc || 'Интуитивно понятный интерфейс и мгновенные результаты позволяют быстро рассчитать необходимое количество материалов для вашего проекта.'}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Calculators Grid */}
				<div>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
						{t('common.availableCalculators') || 'Доступные калькуляторы'}
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
			</main>

			{/* Structured Data */}
			{/* WebPage Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: tCategories('construction.title'),
						description: tCategories('construction.description'),
						url: `https://calc1.ru/${locale}/construction`,
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
									name: messages.breadcrumbs?.home || 'Home',
									item: `https://calc1.ru/${locale}`,
								},
								{
									'@type': 'ListItem',
									position: 2,
									name: tCategories('construction.title'),
									item: `https://calc1.ru/${locale}/construction`,
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
						name: tCategories('construction.title'),
						description: tCategories('construction.description'),
						url: `https://calc1.ru/${locale}/construction`,
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
								name: messages.breadcrumbs?.home || 'Home',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('construction.title'),
								item: `https://calc1.ru/${locale}/construction`,
							},
						],
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
