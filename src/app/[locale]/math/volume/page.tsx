import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Shapes, Calculator, Info, Zap } from 'lucide-react';
import Header from '@/components/header';
import VolumeGeometryCalculator from '@/components/calculators/volume-geometry-calculator';
import VolumeGeometrySEO from '@/components/seo/volume-geometry-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

import { isSupportedLocale } from '@/lib/constants';
import {
	generateLanguageAlternates,
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';
interface Props {
	params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = params;
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	const { loadMergedMathTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedMathTranslations(locale);
	const t = (key: string) => messages.calculators.volume.seo[key];

	const title = getSafeTitle(t('title'), 'Калькулятор объёма геометрических тел');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн калькулятор для расчёта объёма геометрических тел: сфера, куб, цилиндр, конус, пирамида и другие. Точные формулы и быстрые расчёты.'
	);

	return {
		title,
		description,
		keywords: [
			'калькулятор объёма',
			'объём сферы',
			'объём куба',
			'объём цилиндра',
			'формула объёма',
			'геометрия',
			'стереометрия',
			'математика',
			'онлайн калькулятор',
			'расчёт объёма',
			'объём геометрических тел',
			'объём пространственных фигур',
			'объём тел вращения',
			'объём многогранников',
			'объём призмы',
			'объём пирамиды',
			'объём конуса',
			'объём шара',
			'объём параллелепипеда',
			'объём тетраэдра',
			'объём октаэдра',
			'объём додекаэдра',
			'объём икосаэдра',
			'объём эллипсоида',
			'объём тора',
			'объём усечённого конуса',
			'объём усечённой пирамиды',
			'объём цилиндрического сегмента',
			'объём сферического сегмента',
			'объём шарового слоя',
			'объём шарового пояса',
			'volume calculator',
			'sphere volume',
			'cube volume',
			'cylinder volume',
			'geometry calculator',
			'math calculator',
			'online calculator',
			'calculadora de volumen',
			'volumenrechner',
		],
		alternates: {
			canonical: `https://calc1.ru/${locale}/math/volume`,
			languages: generateLanguageAlternates('/math/volume'),
		},
		openGraph: {
			title,
			description,
			url: `https://calc1.ru/${locale}/math/volume`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/og-volume-calculator.jpg',
					width: 1200,
					height: 630,
					alt: 'Калькулятор объёма геометрических тел',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['https://calc1.ru/og-volume-calculator.jpg'],
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

export default async function VolumeGeometryPage({
	params: { locale },
}: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.volume',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.volume.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('math.title'),
			href: '/math',
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
			<div className='bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Shapes className='w-12 h-12 text-white mr-4' />
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
								<Shapes className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									3
								</div>
								<div className='text-blue-100'>
									Геометрических тела
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									99%
								</div>
								<div className='text-blue-100'>
									Точность расчётов
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									PDF
								</div>
								<div className='text-blue-100'>
									Экспорт результатов
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<VolumeGeometryCalculator />

				{/* SEO Content */}
				<VolumeGeometrySEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='math'
				calculatorId='volume'
				namespace='calculators.volume.seo'
				featureKeys={['sphereVolume', 'cubeVolume', 'cylinderVolume', 'automaticFormulas', 'highPrecision']}
				ratingValue='4.9'
				ratingCount='127'
				screenshot='https://calc1.ru/images/volume-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: [
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.0.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.0.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.1.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.1.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.2.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.2.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.3.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.3.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.4.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.4.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.5.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.5.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.6.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.6.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.7.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.7.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.8.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.8.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.9.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.9.a'),
								},
							},
						],
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
								name: tCategories('breadcrumbs.home') || 'Главная',
								item: `https://calc1.ru/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: tCategories('math.title'),
								item: `https://calc1.ru/${locale}/math`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/math/volume`,
							},
						],
					}),
				}}
			/>
		</div>
	);
}
