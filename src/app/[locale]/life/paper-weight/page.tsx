import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FileText, Scale, Calculator, Ruler } from 'lucide-react';
import Header from '@/components/header';
import PaperWeightCalculator from '@/components/calculators/paper-weight-calculator';
import PaperWeightSEO from '@/components/seo/paper-weight-seo';
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
	const { loadMergedLifeTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedLifeTranslations(locale);
	const t = (key: string) => messages.calculators['paper-weight'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор веса бумаги',
			'расчет веса бумаги',
			'вес бумаги онлайн',
			'калькулятор веса листа бумаги',
			'расчет веса бумаги по плотности',
			'вес бумаги A4',
			'вес пачки бумаги',
			'калькулятор веса бумаги A4',
			'расчет веса бумаги по формату',
			'вес одного листа бумаги',
			'калькулятор плотности бумаги',
			'расчет веса картона',
			'вес бумаги г/м²',
			'калькулятор веса бумаги бесплатно',
			'расчет веса бумаги для печати',
			'вес бумаги A3',
			'вес бумаги A5',
			'вес бумаги Letter',
			'калькулятор веса фотобумаги',
			'расчет веса бумаги онлайн',
			'вес бумаги по площади',
			'калькулятор веса упаковочной бумаги',
			'расчет веса бумаги для полиграфии',
			'вес книжной бумаги',
			'калькулятор веса самоклеящейся бумаги',
			'вес бумаги для архива',
			'расчет веса бумаги для почты',
			'калькулятор веса бумаги формата',
			'вес бумаги для дизайна',
			'paper weight calculator',
			'paper weight calculation',
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
			canonical: `https://calc1.ru/${locale}/life/paper-weight`,
			languages: {
				ru: 'https://calc1.ru/ru/life/paper-weight',
				en: 'https://calc1.ru/en/life/paper-weight',
				es: 'https://calc1.ru/es/life/paper-weight',
				de: 'https://calc1.ru/de/life/paper-weight',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/paper-weight`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/paper-weight-og.jpg',
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
			images: ['https://calc1.ru/images/paper-weight-og.jpg'],
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

export default async function PaperWeightPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.paper-weight',
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
			label: tCategories('life.title'),
			href: '/life',
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
			<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<FileText className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Scale className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									0.1-0.3
								</div>
								<div className='text-blue-100'>
									{t('hero.grams')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									100%
								</div>
								<div className='text-blue-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Ruler className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									A4
								</div>
								<div className='text-blue-100'>
									{t('hero.format')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<PaperWeightCalculator />

				{/* SEO Content */}
				<PaperWeightSEO />
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
						url: `https://calc1.ru/${locale}/life/paper-weight`,
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
							ratingValue: '4.7',
							ratingCount: '890',
						},
						featureList: [
							t('features.densityCalculation'),
							t('features.areaCalculation'),
							t('features.weightEstimation'),
							t('features.formatSupport'),
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
								name: tCategories('life.title'),
								item: `https://calc1.ru/${locale}/life`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/life/paper-weight`,
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
						name: 'Как рассчитать вес бумаги',
						description:
							'Пошаговая инструкция по использованию калькулятора веса бумаги',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите формат бумаги',
								text: 'Выберите формат бумаги из списка: A4, A3, A5 или Letter',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите плотность',
								text: 'Выберите или введите плотность бумаги в г/м² (обычно указана на упаковке)',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите количество листов',
								text: 'Укажите количество листов бумаги, вес которых нужно рассчитать',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает вес одного листа и общий вес всех листов в граммах и килограммах',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
