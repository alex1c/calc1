import Header from '@/components/header';
import ConsumerLoanCalculator from '@/components/calculators/consumer-loan-calculator';

export default function ConsumerLoanPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<ConsumerLoanCalculator />
		</div>
	);
}
