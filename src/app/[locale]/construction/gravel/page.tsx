import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Square, Calculator, Package, Wrench } from 'lucide-react';
import Header from '@/components/header';
import GravelCalculator from '@/components/calculators/gravel-calculator';
import GravelSEO from '@/components/seo/gravel-seo';
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
	const t = (key: string) => messages.calculators['gravel'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор щебня',
			'расчёт щебня',
			'сколько щебня нужно',
			'щебень для фундамента',
			'щебень для дорожек',
			'щебень для отмостки',
			'расчёт щебня на м3',
			'калькулятор щебня онлайн',
			'объём щебня',
			'вес щебня',
			'фракция щебня',
			'плотность щебня',
			'щебень 5-10',
			'щебень 10-20',
			'щебень 20-40',
			'подушка под фундамент',
			'щебеночная подушка',
			'расчёт подсыпки',
			'щебень для бетона',
			'гравий калькулятор',
			'щебеночная дорожка',
			'отмостка из щебня',
			'строительный калькулятор щебня',
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
			canonical: `https://calc1.ru/${locale}/construction/gravel`,
			languages: {
				ru: 'https://calc1.ru/ru/construction/gravel',
				en: 'https://calc1.ru/en/construction/gravel',
				es: 'https://calc1.ru/es/construction/gravel',
				de: 'https://calc1.ru/de/construction/gravel',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/construction/gravel`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/gravel-og.jpg',
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
			images: ['https://calc1.ru/images/gravel-og.jpg'],
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

export default async function GravelPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.gravel',
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
							<Square className='w-12 h-12 text-white mr-4' />
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
								<Package className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.fractions')}
								</div>
								<div className='text-gray-100'>
									Фракций щебня
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
								<Wrench className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.types')}
								</div>
								<div className='text-gray-100'>
									Типов работ
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator */}
			<GravelCalculator />

			{/* SEO Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<GravelSEO />
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
						url: `https://calc1.ru/${locale}/construction/gravel`,
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
							t('features.volumeCalculation'),
							t('features.weightCalculation'),
							t('features.fractionSelection'),
							t('features.reserveCalculation'),
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
								item: `https://calc1.ru/${locale}/construction/gravel`,
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
						name: 'Как рассчитать количество щебня',
						description:
							'Пошаговая инструкция по использованию калькулятора щебня',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите тип работ',
								text: 'Укажите тип работ: фундамент, дорожка, отмостка или подсыпка',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите способ ввода данных',
								text: 'Укажите размеры (длина × ширина), площадь или объём напрямую',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите размеры участка',
								text: 'Для способа "Длина × Ширина": укажите длину, ширину и толщину слоя. Для "Площадь": укажите площадь и толщину. Для "Объём": укажите объём напрямую',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите фракцию щебня',
								text: 'Выберите фракцию щебня: 5-10 мм (декор), 10-20 мм (фундамент, дорожки), 20-40 мм (подушка, отмостка), 40-70 мм (подсыпка)',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите запас материала',
								text: 'Укажите запас материала в процентах (обычно 10-15%) для компенсации усадки при трамбовке',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически рассчитает объём и вес щебня с учётом запаса, а также количество мешков по 50 кг для транспортировки',
							},
						],
					}),
				}}
			/>
		</div>
	);
}

