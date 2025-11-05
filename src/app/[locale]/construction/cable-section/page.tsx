import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Cable, Calculator, Zap, Shield } from 'lucide-react';
import Header from '@/components/header';
import CableSectionCalculator from '@/components/calculators/cable-section-calculator';
import CableSectionSEO from '@/components/seo/cable-section-seo';
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
	const t = (key: string) =>
		messages.calculators['cableSectionCalculator'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор сечения кабеля',
			'расчёт сечения кабеля',
			'сечение кабеля по мощности',
			'сечение кабеля по току',
			'калькулятор кабеля онлайн',
			'расчёт кабеля для электропроводки',
			'сечение провода',
			'расчёт провода',
			'калькулятор сечения провода',
			'выбор кабеля по мощности',
			'сечение кабеля для розеток',
			'сечение кабеля для освещения',
			'калькулятор кабеля бесплатно',
			'онлайн калькулятор кабеля',
			'расчёт сечения кабеля',
			'кабель калькулятор',
			'калькулятор сечения кабеля онлайн',
			'расчёт кабеля для дома',
			'расчёт кабеля для квартиры',
			'сечение кабеля ВВГ',
			'сечение кабеля ПВС',
			'калькулятор падения напряжения',
			'расчёт кабеля с учётом длины',
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
			canonical: `https://calc1.ru/${locale}/construction/cable-section`,
			languages: {
				ru: 'https://calc1.ru/ru/construction/cable-section',
				en: 'https://calc1.ru/en/construction/cable-section',
				es: 'https://calc1.ru/es/construction/cable-section',
				de: 'https://calc1.ru/de/construction/cable-section',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/construction/cable-section`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/cable-section-og.jpg',
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
			images: ['https://calc1.ru/images/cable-section-og.jpg'],
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

export default async function CableSectionPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.cableSectionCalculator',
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
			<div className='bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-800 dark:to-teal-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Cable className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-green-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Cable className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									1000+
								</div>
								<div className='text-green-100'>
									{t('hero.cables')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-green-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Shield className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									PDF
								</div>
								<div className='text-green-100'>
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
				<CableSectionCalculator />

				{/* SEO Content */}
				<CableSectionSEO />
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
						url: `https://calc1.ru/${locale}/construction/cable-section`,
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
							t('features.powerCalculation'),
							t('features.currentCalculation'),
							t('features.voltageDrop'),
							t('features.materialSupport'),
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
								item: `https://calc1.ru/${locale}/construction/cable-section`,
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
						name: 'Как рассчитать сечение кабеля',
						description:
							'Пошаговая инструкция по использованию калькулятора сечения кабеля',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Укажите мощность',
								text: 'Введите мощность нагрузки в кВт или ток в амперах',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите напряжение',
								text: 'Выберите напряжение сети (220В для однофазной, 380В для трёхфазной)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите длину кабеля',
								text: 'Введите длину кабеля в метрах для расчёта падения напряжения',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите материал',
								text: 'Выберите материал проводника (медь или алюминий)',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите тип прокладки',
								text: 'Укажите способ прокладки кабеля (открытая, закрытая)',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает необходимое сечение кабеля и падение напряжения',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
