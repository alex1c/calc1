import { useTranslations } from 'next-intl';
import Header from '@/components/header';
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
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<CreditCalculator />
		</div>
	);
}
