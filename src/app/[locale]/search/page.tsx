import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import { Search } from 'lucide-react';

interface SearchPageProps {
	searchParams: {
		q?: string;
	};
}

export default function SearchPage({ searchParams }: SearchPageProps) {
	const t = useTranslations();
	const query = searchParams.q || '';

	// Mock search results - in a real app, this would come from a search API
	const searchResults = [
		{
			id: 'paper-weight',
			title: 'Paper Weight Calculator',
			description:
				'Calculate paper weight by density and number of sheets',
			category: 'Life',
			href: '/calc/paper-weight',
		},
		{
			id: 'bmi',
			title: 'BMI Calculator',
			description: 'Calculate Body Mass Index for weight assessment',
			category: 'Health',
			href: '/calc/bmi',
		},
		{
			id: 'credit-loan',
			title: 'Credit Loan Calculator',
			description: 'Calculate loan payments and interest rates',
			category: 'Finance',
			href: '/calc/credit-loan',
		},
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						Search Results
					</h1>
					{query && (
						<p className='text-lg text-gray-600'>
							Results for:{' '}
							<span className='font-semibold'>"{query}"</span>
						</p>
					)}
				</div>

				{query ? (
					<div className='space-y-4'>
						{searchResults.map((result) => (
							<div
								key={result.id}
								className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow'
							>
								<div className='flex items-start space-x-4'>
									<div className='flex-shrink-0'>
										<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
											<Search className='h-5 w-5 text-blue-600' />
										</div>
									</div>
									<div className='flex-1'>
										<h3 className='text-lg font-semibold text-gray-900 mb-1'>
											{result.title}
										</h3>
										<p className='text-gray-600 mb-2'>
											{result.description}
										</p>
										<div className='flex items-center space-x-4'>
											<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
												{result.category}
											</span>
											<a
												href={result.href}
												className='text-blue-600 hover:text-blue-800 text-sm font-medium'
											>
												Use Calculator →
											</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='text-center py-12'>
						<Search className='mx-auto h-12 w-12 text-gray-400 mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							No search query provided
						</h3>
						<p className='text-gray-600'>
							Enter a search term to find calculators
						</p>
					</div>
				)}
			</main>
		</div>
	);
}














