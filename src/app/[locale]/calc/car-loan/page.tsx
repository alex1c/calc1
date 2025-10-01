import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CarLoanCalculator from '@/components/calculators/car-loan-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Car Loan Calculator | Калькулятор #1',
	description:
		'Calculate monthly car loan payments, total interest, and create detailed payment schedules for vehicle financing.',
	keywords:
		'автокредит калькулятор, расчёт автокредита, ежемесячный платёж, автомобильный кредит',
};

export default function CarLoanPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Авто', href: '/auto' },
					{ label: 'Калькулятор автокредита' },
				]}
			/>
			<CarLoanCalculator />
		</div>
	);
}
