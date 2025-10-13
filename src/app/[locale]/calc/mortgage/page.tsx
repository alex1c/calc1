import { useTranslations, useLocale } from 'next-intl';
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
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.finance.title'),
						href: `/${locale}/finance`,
					},
					{ label: t('calculators.mortgage.title') },
				]}
			/>
			<MortgageCalculator />
		</div>
	);
}
