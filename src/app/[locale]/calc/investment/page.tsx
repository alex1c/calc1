import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import { TrendingUp, Calculator, DollarSign } from 'lucide-react';

export default function InvestmentPage() {
	const t = useTranslations();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='text-center mb-12'>
					<div className='flex justify-center mb-6'>
						<TrendingUp className='h-16 w-16 text-blue-600' />
					</div>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						Investment Calculator
					</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						Calculate the future value of your investments with
						compound interest and see how your money can grow over
						time.
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
						This investment calculator is currently under
						development. It will help you:
					</p>
					<ul className='text-left text-gray-600 space-y-2 max-w-md mx-auto'>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Calculate compound interest
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Project future investment value
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Compare different investment scenarios
						</li>
						<li className='flex items-center'>
							<TrendingUp className='h-5 w-5 text-green-500 mr-2' />
							Plan for retirement savings
						</li>
					</ul>
				</div>

				{/* Features Section */}
				<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<Calculator className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Compound Interest
						</h3>
						<p className='text-gray-600'>
							See how your investments grow with compound interest
							over time.
						</p>
					</div>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<DollarSign className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Future Value
						</h3>
						<p className='text-gray-600'>
							Calculate the future value of your investments with
							different scenarios.
						</p>
					</div>
					<div className='bg-white rounded-lg border border-gray-200 p-6 text-center'>
						<TrendingUp className='h-8 w-8 text-blue-600 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							Investment Planning
						</h3>
						<p className='text-gray-600'>
							Plan your investment strategy with detailed
							calculations and projections.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
