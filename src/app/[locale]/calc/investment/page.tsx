import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DepositCalculator from '@/components/calculators/deposit-calculator';

export default function InvestmentPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Финансы', href: '/finance' },
					{ label: 'Калькулятор вкладов' },
				]}
			/>
			<DepositCalculator />
		</div>
	);
}
