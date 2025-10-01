import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import { CreditCard, Calculator, TrendingUp } from 'lucide-react';

export default function CreditLoanPage() {
	const t = useTranslations();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='text-center mb-12'>
					<div className='flex justify-center mb-6'>
						<CreditCard className='h-16 w-16 text-blue-600' />
					</div>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						Credit Loan Calculator
					</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						Calculate your monthly loan payments, total interest,
						and create a detailed payment schedule for any loan or
						credit.
					</p>
				</div>

				{/* Coming Soon Section */}
				<div className='bg-white rounded-lg border border-gray-200 p-8 text-center'>
					<div className='flex justify-center mb-6'>
						<Calculator className='h-12 w-12 text-blue-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						Coming Soon
					</h2>
					<p className='text-lg text-gray-600 mb-6'>
						This calculator is currently under development. It will
						help you:
					</p>
					<ul className='text-left text-gray-600 space-y-2 max-w-md mx-auto'>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Calculate monthly payments
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							View total interest paid
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Generate payment schedule
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Compare different loan options
						</li>
					</ul>
				</div>

				{/* Features Section */}
				<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<Calculator className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Easy Calculation
						</h3>
						<p className='text-gray-600'>
							Simply enter loan amount, interest rate, and term to
							get instant results.
						</p>
					</div>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<TrendingUp className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Detailed Analysis
						</h3>
						<p className='text-gray-600'>
							View amortization schedule and see how much you'll
							pay in interest.
						</p>
					</div>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<CreditCard className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Multiple Loan Types
						</h3>
						<p className='text-gray-600'>
							Support for personal loans, auto loans, mortgages,
							and more.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
