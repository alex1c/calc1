import Header from '@/components/header';
import SavingsCalculator from '@/components/calculators/savings-calculator';

export default function SavingsPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<SavingsCalculator />
		</div>
	);
}
