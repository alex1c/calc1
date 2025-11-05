import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Calculator, CreditCard, TrendingUp, Shield } from 'lucide-react';
import { Metadata } from 'next';
import Header from '@/components/header';
import CreditCalculator from '@/components/calculators/credit-calculator';
import CreditLoanSEO from '@/components/seo/credit-loan-seo';
import Breadcrumbs from '@/components/breadcrumbs';

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

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url: `https://calc1.ru/${locale}/finance/credit-loan`,
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
		},
		alternates: {
			canonical: `https://calc1.ru/${locale}/finance/credit-loan`,
			languages: {
				ru: 'https://calc1.ru/ru/finance/credit-loan',
				en: 'https://calc1.ru/en/finance/credit-loan',
				es: 'https://calc1.ru/es/finance/credit-loan',
				de: 'https://calc1.ru/de/finance/credit-loan',
			},
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
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
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

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: t('title'),
						description: t('description'),
						url: `https://calc1.ru/${locale}/finance/credit-loan`,
						applicationCategory: 'FinanceApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						featureList: [
							t('seo.features.items.0'),
							t('seo.features.items.1'),
							t('seo.features.items.2'),
							t('seo.features.items.3'),
							t('seo.features.items.4'),
							t('seo.features.items.5'),
						],
					}),
				}}
			/>
		</div>
	);
}
