import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Calculator, CreditCard, TrendingUp, Shield } from 'lucide-react';
import { Metadata } from 'next';
import Header from '@/components/header';
import CreditCalculator from '@/components/calculators/credit-calculator';
import CreditLoanSEO from '@/components/seo/credit-loan-seo';
import Breadcrumbs from '@/components/breadcrumbs';
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

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.credit-loan.seo',
	});

	const title = getSafeTitle(t('title'), 'Калькулятор кредита');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн калькулятор для расчёта кредита: ежемесячный платёж, переплата, график платежей. Расчёт потребительского, автокредита и ипотеки.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://calc1.ru/${locale}/finance/credit-loan`,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
		alternates: {
			canonical: `https://calc1.ru/${locale}/finance/credit-loan`,
			languages: generateLanguageAlternates('/finance/credit-loan'),
		},
	};
}

export default async function CreditLoanPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.credit-loan',
	});
	const tCategory = await getTranslations({
		locale,
		namespace: 'categories.finance',
	});

	// Validate locale
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{ label: tCategory('title'), href: '/finance' },
		{ label: t('title') },
	];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />
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
							<Calculator className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CreditCard className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.features.accuracy')}
								</div>
								<div className='text-blue-100'>
									{t('hero.features.accuracy')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.features.schedule')}
								</div>
								<div className='text-blue-100'>
									{t('hero.features.schedule')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Shield className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.features.comparison')}
								</div>
								<div className='text-blue-100'>
									{t('hero.features.comparison')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<CreditCalculator />
				<CreditLoanSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='finance'
				calculatorId='credit-loan'
				namespace='calculators.credit-loan.seo'
				featureKeys={['items.0', 'items.1', 'items.2', 'items.3', 'items.4', 'items.5']}
				featureNamespace='calculators.credit-loan.seo.features'
				ratingValue='4.9'
				ratingCount='89'
				screenshot='https://calc1.ru/images/credit-loan-screenshot.jpg'
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
								name: tCategory('title'),
								item: `https://calc1.ru/${locale}/finance`,
							},
							{
								'@type': 'ListItem',
								position: 3,
								name: t('title'),
								item: `https://calc1.ru/${locale}/finance/credit-loan`,
							},
						],
					}),
				}}
			/>
		</div>
	);
}
