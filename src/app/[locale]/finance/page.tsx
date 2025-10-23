'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import {
	CreditCard,
	Calculator,
	TrendingUp,
	PiggyBank,
	Car,
	Home,
	Receipt,
} from 'lucide-react';

export default function FinancePage() {
	const t = useTranslations();
	const locale = useLocale();

	const calculators = [
		{
			id: 'credit-loan',
			title: t('calculators.credit-loan.title'),
			description: t('calculators.credit-loan.description'),
			icon: CreditCard,
			href: '/finance/credit-loan',
		},
		{
			id: 'mortgage',
			title: t('calculators.mortgage.title'),
			description: t('calculators.mortgage.description'),
			icon: Home,
			href: '/finance/mortgage',
		},
		{
			id: 'auto-loan',
			title: t('calculators.auto-loan.title'),
			description: t('calculators.auto-loan.description'),
			icon: Car,
			href: '/finance/auto-loan',
		},
		{
			id: 'consumer-loan',
			title: t('calculators.consumer-loan.title'),
			description: t('calculators.consumer-loan.description'),
			icon: Calculator,
			href: '/finance/consumer-loan',
		},
		{
			id: 'investment',
			title: t('calculators.investment.title'),
			description: t('calculators.investment.description'),
			icon: TrendingUp,
			href: '/finance/investment',
		},
		{
			id: 'savings',
			title: t('calculators.savings.title'),
			description: t('calculators.savings.description'),
			icon: PiggyBank,
			href: '/finance/savings',
		},
		{
			id: 'leasing',
			title: t('calculators.leasing.title'),
			description: t('calculators.leasing.description'),
			icon: Car,
			href: '/finance/leasing',
		},
		{
			id: 'traffic-fines',
			title: t('calculators.traffic-fines.title'),
			description: t('calculators.traffic-fines.description'),
			icon: Calculator,
			href: '/finance/traffic-fines',
		},
		{
			id: 'vehicle-tax',
			title: t('calculators.vehicle-tax.title'),
			description: t('calculators.vehicle-tax.description'),
			icon: Calculator,
			href: '/finance/vehicle-tax',
		},
		{
			id: 'tax-calculator',
			title: t('calculators.tax-calculator.title'),
			description: t('calculators.tax-calculator.description'),
			icon: Receipt,
			href: '/finance/tax-calculator',
		},
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.finance.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.finance.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}${calculator.href}`}
							className='bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200'
						>
							<div className='flex items-center mb-4'>
								<calculator.icon className='h-8 w-8 text-blue-600 mr-3' />
								<h3 className='text-xl font-semibold text-gray-900'>
									{calculator.title}
								</h3>
							</div>
							<p className='text-gray-600'>
								{calculator.description}
							</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
