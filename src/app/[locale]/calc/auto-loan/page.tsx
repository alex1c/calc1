import Header from '@/components/header';
import AutoLoanCalculator from '@/components/calculators/auto-loan-calculator';

export default function AutoLoanPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<AutoLoanCalculator />
		</div>
	);
}
