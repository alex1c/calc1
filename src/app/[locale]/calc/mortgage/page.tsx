import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import MortgageCalculator from '@/components/calculators/mortgage-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Mortgage Calculator | Калькулятор #1',
	description:
		'Calculate monthly mortgage payments, total interest, and create detailed payment schedules for home loans and real estate financing.',
	keywords:
		'ипотечный калькулятор, расчёт ипотеки, ежемесячный платёж по ипотеке, ипотечный кредит',
};

export default function MortgagePage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Финансы', href: '/finance' },
					{ label: 'Ипотечный калькулятор' },
				]}
			/>
			<MortgageCalculator />
		</div>
	);
}
