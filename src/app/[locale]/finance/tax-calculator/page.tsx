import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Calculator, Receipt, TrendingUp, Shield } from 'lucide-react';
import Header from '@/components/header';
import TaxCalculator from '@/components/calculators/tax-calculator';
import TaxCalculatorSEO from '@/components/seo/tax-calculator-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export default async function TaxCalculatorPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.taxCalculator',
	});
	const tCategory = await getTranslations({
		locale,
		namespace: 'categories.finance',
	});

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
			<div className='bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Calculator className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-green-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Receipt className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.rates')}
								</div>
								<div className='text-green-100'>
									{t('hero.ratesDesc')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<TrendingUp className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.accuracy')}
								</div>
								<div className='text-green-100'>
									{t('hero.accuracyDesc')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Shield className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									{t('hero.security')}
								</div>
								<div className='text-green-100'>
									{t('hero.securityDesc')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<TaxCalculator />
				<TaxCalculatorSEO />
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
						url: `https://calc1.ru/${locale}/finance/tax-calculator`,
						applicationCategory: 'FinanceApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'RUB',
						},
						featureList: [
							t('seo.features.vatCalculation'),
							t('seo.features.multipleRates'),
							t('seo.features.additionalTaxes'),
							t('seo.features.currencySupport'),
							t('seo.features.localCalculation'),
							t('seo.features.exportResults'),
						],
					}),
				}}
			/>
		</div>
	);
}
