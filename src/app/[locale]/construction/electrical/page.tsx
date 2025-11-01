import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Square, Calculator, Zap, Shield } from 'lucide-react';
import Header from '@/components/header';
import ElectricalCalculator from '@/components/calculators/electrical-calculator';
import ElectricalSEO from '@/components/seo/electrical-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);
	const t = (key: string) => messages.calculators['electrical'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор электрики',
			'расчёт сечения кабеля',
			'расчёт автомата',
			'калькулятор сечения провода',
			'номинал автомата',
			'выбор кабеля',
			'сечение кабеля по мощности',
			'сечение кабеля по току',
			'автоматический выключатель',
			'расчёт автомата по мощности',
			'выбор автомата',
			'падение напряжения',
			'медный кабель',
			'алюминиевый кабель',
			'однофазная сеть',
			'трёхфазная сеть',
			'электропроводка',
			'калькулятор электрики онлайн',
			'расчёт электропроводки',
			'сечение провода для розеток',
			'сечение провода для освещения',
			'номинал автомата для дома',
			'выбор кабеля для проводки',
			'электрический калькулятор',
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
			canonical: `https://calc1.ru/${locale}/construction/electrical`,
			languages: {
				ru: 'https://calc1.ru/ru/construction/electrical',
				en: 'https://calc1.ru/en/construction/electrical',
				es: 'https://calc1.ru/es/construction/electrical',
				de: 'https://calc1.ru/de/construction/electrical',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/construction/electrical`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/electrical-og.jpg',
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
			images: ['https://calc1.ru/images/electrical-og.jpg'],
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

export default async function ElectricalPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.electrical',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
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
			<div className='bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Zap className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-gray-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Shield className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.types')}
								</div>
								<div className='text-gray-100'>
									Расчётов
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-gray-100'>
									{t('hero.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Square className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.materials')}
								</div>
								<div className='text-gray-100'>
									Материалов
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator */}
			<ElectricalCalculator />

			{/* SEO Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<ElectricalSEO />
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
						url: `https://calc1.ru/${locale}/construction/electrical`,
						applicationCategory: 'ConstructionCalculator',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'RUB',
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.9',
							ratingCount: '127',
						},
						featureList: [
							t('features.cableCalculation'),
							t('features.breakerCalculation'),
							t('features.voltageDrop'),
							t('features.materialSelection'),
							t('features.accuracy'),
						],
					}),
				}}
			/>

			{/* FAQ Structured Data */}
			{faq.length > 0 && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: faq.slice(0, 30).map((item) => ({
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
								item: `https://calc1.ru/${locale}/construction/electrical`,
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
						name: 'Как рассчитать сечение кабеля и мощность автомата',
						description:
							'Пошаговая инструкция по использованию калькулятора электрики',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите тип расчёта',
								text: 'Выберите что нужно рассчитать: только сечение кабеля, только автомат, или оба расчёта одновременно',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите данные нагрузки',
								text: 'Укажите мощность нагрузки в кВт или ток в амперах, напряжение сети, длину кабеля',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите параметры сети',
								text: 'Укажите тип сети (однофазная 220 В или трёхфазная 380 В), материал проводника (медь или алюминий), способ прокладки',
							},
							{
								'@type': 'HowToStep',
								name: 'Настройте дополнительные параметры',
								text: 'Укажите коэффициент мощности (cos φ) и допустимое падение напряжения (обычно 3%)',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите тип автомата',
								text: 'Выберите тип автоматического выключателя: B для ламп и обогревателей, C для розеток (самый распространённый), D для двигателей',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает сечение кабеля (рекомендуемое и стандартное), падение напряжения, сопротивление, и номинал автомата с запасом 25%',
							},
						],
					}),
				}}
			/>
		</div>
	);
}

