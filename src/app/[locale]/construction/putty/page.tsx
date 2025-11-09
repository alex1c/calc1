import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Layers, Calculator, Package, Square } from 'lucide-react';
import Header from '@/components/header';
import PuttyCalculator from '@/components/calculators/putty-calculator';
import PuttySEO from '@/components/seo/putty-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

import { isSupportedLocale } from '@/lib/constants';
import { generateLanguageAlternates } from '@/lib/metadata-utils';
interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);
	const t = (key: string) => messages.calculators['putty'].seo[key];

	return {
		title: `${t('title')} | Calc1.ru`,
		description: t('description'),
		keywords: [
			'калькулятор шпатлёвки',
			'расчёт шпатлёвки',
			'количество шпатлёвки',
			'сколько шпатлёвки нужно',
			'расчёт шпатлёвки на м2',
			'калькулятор шпатлёвки онлайн',
			'шпатлёвка для стен',
			'шпатлёвка для потолка',
			'стартовая шпатлёвка',
			'финишная шпатлёвка',
			'универсальная шпатлёвка',
			'расход шпатлёвки',
			'запас шпатлёвки',
			'выравнивание стен',
			'шпатлёвка стен',
			'шпатлёвка гипсовая',
			'шпатлёвка цементная',
			'шпатлёвка полимерная',
			'калькулятор шпатлёвки бесплатно',
			'онлайн калькулятор шпатлёвки',
			'расчёт количества шпатлёвки',
			'шпатлёвка калькулятор',
			'калькулятор шпатлёвки на комнату',
			'шпатлёвка онлайн калькулятор',
			'расчёт шпатлёвки для спальни',
			'расчёт шпатлёвки для гостиной',
			'расчёт шпатлёвки для кухни',
			'расчёт шпатлёвки для ванной',
			'калькулятор площади шпатлёвки',
			'расчёт шпатлёвки с учётом слоёв',
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
			canonical: `https://calc1.ru/${locale}/construction/putty`,
			languages: generateLanguageAlternates('/construction/putty'),
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/construction/putty`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/putty-og.jpg',
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
			images: ['https://calc1.ru/images/putty-og.jpg'],
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

export default async function PuttyPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.putty',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);

	// Validate locale
	if (!isSupportedLocale(locale)) {
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
							<Layers className='w-12 h-12 text-white mr-4' />
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
								<Package className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									Килограммы
								</div>
								<div className='text-green-100'>
									{t('hero.format')}
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
								<Square className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									2
								</div>
								<div className='text-green-100'>
									{t('hero.layers')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<PuttyCalculator />

				{/* SEO Content */}
				<PuttySEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='construction'
				calculatorId='putty'
				namespace='calculators.putty.seo'
				featureKeys={['areaCalculation', 'puttyCalculation', 'layersCalculation', 'reserveCalculation', 'accuracy']}
				ratingValue='4.9'
				ratingCount='89'
				screenshot='https://calc1.ru/images/putty-screenshot.jpg'
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
								name: messages.breadcrumbs?.home || 'Home',
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
								item: `https://calc1.ru/${locale}/construction/putty`,
							},
						],
					}),
				}}
			/>

			{/* HowTo Structured Data */}
			{(() => {
				const howTo = messages.calculators?.putty?.seo?.howTo;
				if (!howTo || !howTo.steps) return null;
				return (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'HowTo',
								name: howTo.title,
								description: howTo.description,
								step: Object.keys(howTo.steps)
									.sort()
									.map(key => ({
										'@type': 'HowToStep',
										name: howTo.steps[key].name,
										text: howTo.steps[key].text,
									})),
							}),
						}}
					/>
				);
			})()}
		</div>
	);
}
