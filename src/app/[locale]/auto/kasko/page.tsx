import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Shield, Calculator, BarChart3, TrendingUp } from 'lucide-react';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import KaskoCalculator from '@/components/calculators/kasko-calculator';
import KaskoSEO from '@/components/seo/kasko-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}
	const { loadMergedAutoTranslations } = await import(
		'@/lib/i18n-utils'
	);
	const messages = await loadMergedAutoTranslations(locale);
	const t = (key: string) => messages.calculators.kasko.seo[key];

	const keywordsString = t('keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
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
			canonical: `https://calc1.ru/${locale}/auto/kasko`,
			languages: {
				ru: 'https://calc1.ru/ru/auto/kasko',
				en: 'https://calc1.ru/en/auto/kasko',
				es: 'https://calc1.ru/es/auto/kasko',
				de: 'https://calc1.ru/de/auto/kasko',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/auto/kasko`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/kasko-calculator-og.jpg',
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
			images: ['https://calc1.ru/images/kasko-calculator-og.jpg'],
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

export default async function KaskoPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.kasko',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.kasko.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedAutoTranslations } = await import(
		'@/lib/i18n-utils'
	);
	const messages = await loadMergedAutoTranslations(locale);

	// Validate locale
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('auto.title'),
			href: '/auto',
		},
		{
			label: t('title'),
		},
	];

	// Get FAQ items for structured data
	const faqRaw = tSeo.raw('faq.faqItems');
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
			<div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Shield className='w-12 h-12 text-white mr-4' />
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
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.accuracy')}
								</div>
								<div className='text-blue-100'>100%</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<BarChart3 className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.coverage')}
								</div>
								<div className='text-blue-100'>Полное</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.calculation')}
								</div>
								<div className='text-blue-100'>Мгновенно</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<KaskoCalculator />

				{/* SEO Content */}
				<KaskoSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='auto'
				calculatorId='kasko'
				namespace='calculators.kasko.seo'
				featureKeys={['accuracy', 'coverage', 'calculation']}
				featureNamespace='calculators.kasko.hero'
				ratingValue='4.8'
				ratingCount='156'
				screenshot='https://calc1.ru/images/kasko-screenshot.jpg'
			/>

			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faq.map((item) => ({
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
								name: tCategories('auto.title'),
								item: `https://calc1.ru/${locale}/auto`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/auto/kasko`,
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
						name: tSeo('title'),
						description: tSeo('description'),
						step: [
							{
								'@type': 'HowToStep',
								name: 'Введите стоимость автомобиля',
								text: 'Укажите стоимость автомобиля в рублях',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите год выпуска',
								text: 'Укажите год выпуска автомобиля',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите возраст и стаж водителя',
								text: 'Введите возраст водителя и стаж вождения в годах',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите регион',
								text: 'Укажите регион регистрации автомобиля',
							},
							{
								'@type': 'HowToStep',
								name: 'Укажите наличие сигнализации',
								text: 'Отметьте, есть ли противоугонная система',
							},
							{
								'@type': 'HowToStep',
								name: 'Выберите размер франшизы',
								text: 'Укажите размер франшизы или выберите без франшизы',
							},
							{
								'@type': 'HowToStep',
								name: 'Нажмите рассчитать',
								text: 'Получите точную стоимость полиса КАСКО с разбивкой по коэффициентам',
							},
						],
					}),
				}}
			/>
		</div>
	);
}
