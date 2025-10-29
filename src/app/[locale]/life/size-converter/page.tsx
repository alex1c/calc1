import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Ruler, Globe, Shirt, Users } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import SizeConverterCalculator from '@/components/calculators/size-converter-calculator';
import SizeConverterSEO from '@/components/seo/size-converter-seo';
import { Metadata } from 'next';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = params;
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators['size-converter'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'конвертер размеров',
			'перевод размеров одежды',
			'таблица размеров обуви',
			'размер одежды RU EU US UK',
			'конвертер размеров онлайн',
			'размер обуви перевод',
			'таблица размеров одежды',
			'размеры RU в US',
			'размеры EU в RU',
			'перевод размеров US UK',
			'конвертер размеров JP CN',
			'таблица размеров джинсов',
			'размеры одежды по странам',
			'конвертер мужских размеров',
			'конвертер женских размеров',
			'конвертер детских размеров',
			'размер одежды калькулятор',
			'размер обуви калькулятор',
			'соответствие размеров',
			'размеры одежды таблица',
			'размеры обуви таблица',
			'перевод размеров онлайн',
			'конвертер размеров одежды',
			'конвертер размеров обуви',
			'таблица размеров RU',
			'таблица размеров EU',
			'таблица размеров US',
			'таблица размеров UK',
			'size converter',
			'clothing size converter',
			'shoe size converter',
			'size chart',
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
			canonical: `https://calc1.ru/${locale}/life/size-converter`,
			languages: {
				ru: 'https://calc1.ru/ru/life/size-converter',
				en: 'https://calc1.ru/en/life/size-converter',
				es: 'https://calc1.ru/es/life/size-converter',
				de: 'https://calc1.ru/de/life/size-converter',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/size-converter`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/size-converter-og.jpg',
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
			images: ['https://calc1.ru/images/size-converter-og.jpg'],
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

export default async function SizeConverterPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.size-converter',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.size-converter.seo',
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
			label: tCategories('life.title'),
			href: '/life',
		},
		{
			label: t('title'),
		},
	];

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
			<div className='bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Ruler className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-purple-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Globe className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									6 стран
								</div>
								<div className='text-purple-100'>
									RU, EU, US, UK, JP, CN
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Shirt className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3 категории
								</div>
								<div className='text-purple-100'>
									Одежда, джинсы, обувь
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Users className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3 типа
								</div>
								<div className='text-purple-100'>
									Мужской, женский, детский
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<SizeConverterCalculator />

				{/* SEO Content */}
				<SizeConverterSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('title'),
						description: tSeo('description'),
						url: `https://calc1.ru/${locale}/life/size-converter`,
						applicationCategory: 'UtilityApplication',
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
							ratingCount: '150',
						},
						featureList: [
							'Конвертация размеров одежды',
							'Конвертация размеров обуви',
							'Таблица соответствий размеров',
							'Поддержка 6 систем размеров',
							'Мужские, женские и детские размеры',
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
						mainEntity: Array.from({ length: 30 }, (_, i) => ({
							'@type': 'Question',
							name: tSeo(`faq.faqItems.${i}.q`),
							acceptedAnswer: {
								'@type': 'Answer',
								text: tSeo(`faq.faqItems.${i}.a`),
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
								item: `https://calc1.ru/${locale}/life/size-converter`,
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
						name: 'Как использовать конвертер размеров',
						description:
							'Пошаговая инструкция по использованию конвертера размеров одежды и обуви',
						step: [
							{
								'@type': 'HowToStep',
								name: 'Выберите категорию',
								text: 'Выберите тип одежды или обуви: одежда, джинсы или обувь',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите пол',
								text: 'Укажите пол: мужской, женский или детский',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите систему размеров',
								text: 'Выберите исходную страну: RU (Россия), EU (Европа), US (США), UK (Великобритания), JP (Япония) или CN (Китай)',
							},
							{
								'@type': 'HowToStep',
								name: 'Введите размер',
								text: 'Введите ваш размер в исходной системе',
							},
							{
								'@type': 'HowToStep',
								name: 'Получите результат',
								text: 'Калькулятор автоматически покажет эквивалентные размеры во всех доступных системах',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
