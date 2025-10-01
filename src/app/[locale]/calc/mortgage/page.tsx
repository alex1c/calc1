import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import { Home, Calculator, TrendingUp } from 'lucide-react';

export default function MortgagePage() {
	const t = useTranslations();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='text-center mb-12'>
					<div className='flex justify-center mb-6'>
						<Home className='h-16 w-16 text-blue-600' />
					</div>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						Mortgage Calculator
					</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						Calculate your monthly mortgage payments, total
						interest, and see how much you'll pay over the life of
						your loan.
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
						This mortgage calculator is currently under development.
						It will provide:
					</p>
					<ul className='text-left text-gray-600 space-y-2 max-w-md mx-auto'>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Monthly payment calculations
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Amortization schedule
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Interest vs principal breakdown
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Refinancing analysis
						</li>
					</ul>
				</div>

				{/* Features Section */}
				<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<Calculator className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Accurate Calculations
						</h3>
						<p className='text-gray-600'>
							Get precise monthly payment amounts based on current
							interest rates.
						</p>
					</div>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<TrendingUp className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Payment Schedule
						</h3>
						<p className='text-gray-600'>
							See exactly how much goes to principal vs interest
							each month.
						</p>
					</div>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<Home className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Home Buying Guide
						</h3>
						<p className='text-gray-600'>
							Understand the true cost of homeownership before you
							buy.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
