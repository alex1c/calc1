import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Home,
	Heart,
	Baby,
	Utensils,
	PieChart,
	Wine,
	TrendingUp,
	Shirt,
} from 'lucide-react';

const getCalculators = (t: any) => [
	{
		id: 'bmi',
		title: t('calculators.bmi.title'),
		description: t('calculators.bmi.description'),
		icon: Heart,
		href: '/life/bmi',
	},
	{
		id: 'calories',
		title: t('calculators.calories.title'),
		description: t('calculators.calories.description'),
		icon: Utensils,
		href: '/life/calories',
	},
	{
		id: 'food-ration',
		title: t('calculators.foodRation.title'),
		description: t('calculators.foodRation.description'),
		icon: PieChart,
		href: '/life/food-ration',
	},
	{
		id: 'pregnancy',
		title: t('calculators.pregnancy.title'),
		description: t('calculators.pregnancy.description'),
		icon: Baby,
		href: '/life/pregnancy',
	},
	{
		id: 'baby-growth',
		title: t('calculators.babyGrowth.title'),
		description: t('calculators.babyGrowth.description'),
		icon: TrendingUp,
		href: '/life/baby-growth',
	},
	{
		id: 'blood-alcohol',
		title: t('calculators.bloodAlcohol.title'),
		description: t('calculators.bloodAlcohol.description'),
		icon: Wine,
		href: '/life/blood-alcohol',
	},
	{
		id: 'home-budget',
		title: 'Home Budget Calculator',
		description: 'Plan and track your household expenses and savings',
		icon: Home,
		href: '/calc/home-budget',
	},
	{
		id: 'size-converter',
		title: t('calculators.size-converter.title'),
		description: t('calculators.size-converter.description'),
		icon: Shirt,
		href: '/life/size-converter',
	},
];

export default function LifePage() {
	const t = useTranslations();
	const locale = useLocale();
	const calculators = getCalculators(t);

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.life.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.life.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}${calculator.href}`}
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
