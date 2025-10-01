import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AutoLoanCalculator from '@/components/calculators/auto-loan-calculator';

export default function AutoLoanPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Финансы', href: '/finance' },
					{ label: 'Калькулятор автокредита' },
				]}
			/>
			<AutoLoanCalculator />
		</div>
	);
}
