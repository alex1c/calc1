import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ConsumerLoanCalculator from '@/components/calculators/consumer-loan-calculator';

export default function ConsumerLoanPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Финансы', href: '/finance' },
					{ label: 'Калькулятор потребительского кредита' },
				]}
			/>
			<ConsumerLoanCalculator />
		</div>
	);
}
