import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import CategoryCard from '@/components/category-card';
import Link from 'next/link';
import {
	Calculator,
	CreditCard,
	Home,
	Car,
	Clock,
	Heart,
	BookOpen,
	Shuffle,
	Smile,
	Wrench,
	Monitor,
} from 'lucide-react';

const categories = [
	{
		id: 'finance',
		icon: CreditCard,
		href: '/finance',
		calculatorCount: 8,
	},
	{
		id: 'math',
		icon: Calculator,
		href: '/math',
		calculatorCount: 9,
	},
	{
		id: 'life',
		icon: Home,
		href: '/life',
		calculatorCount: 8,
	},
	{
		id: 'construction',
		icon: Wrench,
		href: '/construction',
		calculatorCount: 8,
	},
	{
		id: 'auto',
		icon: Car,
		href: '/auto',
		calculatorCount: 8,
	},
	{
		id: 'time',
		icon: Clock,
		href: '/time',
		calculatorCount: 8,
	},
	{
		id: 'health',
		icon: Heart,
		href: '/health',
		calculatorCount: 8,
	},
	{
		id: 'science',
		icon: BookOpen,
		href: '/science',
		calculatorCount: 8,
	},
	{
		id: 'converter',
		icon: Shuffle,
		href: '/converter',
		calculatorCount: 8,
	},
	{
		id: 'fun',
		icon: Smile,
		href: '/fun',
		calculatorCount: 8,
	},
	{
		id: 'it',
		icon: Monitor,
		href: '/it',
		calculatorCount: 6,
	},
];

export default function HomePage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Hero Section */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						{t('brand.name')}
					</h1>
					<p className='text-xl text-gray-600 mb-8'>
						{t('brand.slogan')}
					</p>
					<div className='bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto'>
						<h2 className='text-lg font-semibold text-blue-900 mb-2'>
							More than 100 calculators
						</h2>
						<p className='text-blue-800'>
							Financial, mathematical, construction, health, and
							many other calculators to help you with daily
							calculations and complex problems.
						</p>
					</div>
				</div>

				{/* Categories Grid */}
				<div className='mb-12'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
						{t('common.categories')}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{categories.map((category) => (
							<CategoryCard
								key={category.id}
								category={category.id}
								icon={category.icon}
								href={category.href}
								calculatorCount={category.calculatorCount}
							/>
						))}
					</div>
				</div>

				{/* Featured Calculators */}
				<div className='bg-white rounded-lg border border-gray-200 p-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						Popular Calculators
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<Link
							href={`/${locale}/life/paper-weight`}
							className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer'
						>
							<h3 className='font-semibold text-gray-900 hover:text-blue-600'>
								Paper Weight Calculator
							</h3>
							<p className='text-sm text-gray-600'>
								Calculate paper weight by density
							</p>
						</Link>
						<Link
							href={`/${locale}/health/bmihealth`}
							className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer'
						>
							<h3 className='font-semibold text-gray-900 hover:text-blue-600'>
								BMI Calculator
							</h3>
							<p className='text-sm text-gray-600'>
								Body Mass Index calculation
							</p>
						</Link>
						<Link
							href={`/${locale}/finance`}
							className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer'
						>
							<h3 className='font-semibold text-gray-900 hover:text-blue-600'>
								Credit Calculator
							</h3>
							<p className='text-sm text-gray-600'>
								Loan payment calculations
							</p>
						</Link>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-8 mt-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<p className='text-gray-400'>
							© 2024 Калькулятор #1. All calculators in one place.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
