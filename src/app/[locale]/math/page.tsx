import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import { Calculator, Percent, Square, Pi } from 'lucide-react';

const calculators = [
	{
		id: 'basic-math',
		title: 'Basic Math Calculator',
		description:
			'Perform basic arithmetic operations with advanced functions',
		icon: Calculator,
		href: '/calc/basic-math',
	},
	{
		id: 'percentage',
		title: 'Percentage Calculator',
		description: 'Calculate percentages, discounts, and percentage changes',
		icon: Percent,
		href: '/calc/percentage',
	},
	{
		id: 'geometry',
		title: 'Geometry Calculator',
		description: 'Calculate area, perimeter, volume of various shapes',
		icon: Square,
		href: '/calc/geometry',
	},
	{
		id: 'trigonometry',
		title: 'Trigonometry Calculator',
		description:
			'Calculate sine, cosine, tangent and other trigonometric functions',
		icon: Pi,
		href: '/calc/trigonometry',
	},
];

export default function MathPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.math.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.math.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}/calc/${calculator.id}`}
							className='bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200'
						>
							<div className='flex items-center mb-4'>
								<calculator.icon className='h-8 w-8 text-blue-600 mr-3' />
								<h3 className='text-xl font-semibold text-gray-900'>
									{calculator.title}
								</h3>
							</div>
							<p className='text-gray-600'>
								{calculator.description}
							</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
