import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import SavingsCalculator from '@/components/calculators/savings-calculator';

export default function SavingsPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Финансы', href: '/finance' },
					{ label: 'Калькулятор накоплений' },
				]}
			/>
			<SavingsCalculator />
		</div>
	);
}
