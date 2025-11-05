import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Home, Calculator, Package, Triangle } from 'lucide-react';
import Header from '@/components/header';
import RoofCalculator from '@/components/calculators/roof-calculator';
import RoofingSEO from '@/components/seo/roofing-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);
	const t = (key: string) => messages.calculators['roof'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор кровли',
			'расчёт кровли',
			'площадь крыши',
			'расчёт площади крыши',
			'калькулятор крыши онлайн',
			'кровельные материалы',
			'металлочерепица',
			'профнастил',
			'мягкая кровля',
			'ондулин',
			'шифер',
			'расчёт кровли онлайн',
			'калькулятор кровли бесплатно',
			'двускатная крыша',
			'односкатная крыша',
			'вальмовая крыша',
			'мансардная крыша',
			'расчёт угла наклона крыши',
			'расчёт свеса крыши',
			'расчёт количества листов',
			'калькулятор металлочерепицы',
			'калькулятор профнастила',
			'расчёт кровли для дома',
			'расчёт кровли для дачи',
			'расчёт кровли для гаража',
			'калькулятор площади крыши',
			'расчёт кровли с учётом угла',
		],
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
			canonical: `https://calc1.ru/${locale}/construction/roofing`,
			languages: {
				ru: 'https://calc1.ru/ru/construction/roofing',
				en: 'https://calc1.ru/en/construction/roofing',
				es: 'https://calc1.ru/es/construction/roofing',
				de: 'https://calc1.ru/de/construction/roofing',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/construction/roofing`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/roofing-og.jpg',
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
			images: ['https://calc1.ru/images/roofing-og.jpg'],
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

export default async function RoofingPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.roof',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('construction.title'),
			href: '/construction',
		},
		{
			label: t('title'),
		},
	];

	// Get FAQ items for structured data
	const faqRaw = t.raw('seo.faq.faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Header */}
			<Header />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-800 dark:to-orange-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Home className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-red-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Triangle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									м²
								</div>
								<div className='text-red-100'>
									{t('hero.format')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-red-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Package className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									10%
								</div>
								<div className='text-red-100'>
									{t('hero.reserve')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<RoofCalculator />

				{/* SEO Content */}
				<RoofingSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: t('seo.title'),
						description: t('seo.description'),
						url: `https://calc1.ru/${locale}/construction/roofing`,
						applicationCategory: 'BusinessApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						author: {
							'@type': 'Organization',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.9',
							ratingCount: '89',
						},
						featureList: [
							t('features.areaCalculation'),
							t('features.roofCalculation'),
							t('features.materialsCalculation'),
							t('features.reserveCalculation'),
							t('features.accuracy'),
						],
					}),
				}}
			/>

			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faq.map((f) => ({
							'@type': 'Question',
							name: f.q,
							acceptedAnswer: {
								'@type': 'Answer',
								text: f.a,
							},
						})),
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
								name: tCategories('construction.title'),
								item: `https://calc1.ru/${locale}/construction`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/construction/roofing`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'HowTo',
						name: 'Как рассчитать площадь крыши',
						description:
							'Пошаговая инструкция по использованию калькулятора кровли',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Измерьте дом',
								text: 'Укажите длину и ширину дома в метрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите тип крыши',
								text: 'Выберите тип крыши (односкатная, двускатная, вальмовая, мансардная)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите угол наклона',
								text: 'Укажите угол наклона крыши в градусах (обычно 15-45°)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите свес',
								text: 'Укажите длину свеса крыши по периметру в метрах',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите материал',
								text: 'Выберите кровельный материал (металлочерепица, профнастил, мягкая кровля и т.д.)',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает площадь крыши и необходимое количество материалов',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
