import Header from '@/components/header';
import DepositCalculator from '@/components/calculators/deposit-calculator';

export default function InvestmentPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<DepositCalculator />
		</div>
	);
}
