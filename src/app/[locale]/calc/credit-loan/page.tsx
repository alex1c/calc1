import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CreditCalculator from '@/components/calculators/credit-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Credit Loan Calculator | Калькулятор #1',
	description:
		'Calculate monthly loan payments, total interest, and create detailed payment schedules for mortgages, auto loans, and personal loans.',
	keywords:
		'кредитный калькулятор, ипотечный калькулятор, автокредит калькулятор, расчёт кредита',
};

export default function CreditLoanPage() {
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
					{ label: t('calculators.credit-loan.title') },
				]}
			/>
			<CreditCalculator />
		</div>
	);
}
