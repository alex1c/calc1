import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Heart,
	Activity,
	Pill,
	Thermometer,
	Calendar,
	Brain,
	Scale,
} from 'lucide-react';

const calculators = [
	{
		id: 'bmihealth',
		title: 'calculators.bmiHealth.title',
		description: 'calculators.bmiHealth.description',
		icon: Heart,
		href: '/health/bmihealth',
	},
	{
		id: 'heart-rate',
		title: 'calculators.heartRate.title',
		description: 'calculators.heartRate.description',
		icon: Activity,
		href: '/health/heart-rate',
	},
	{
		id: 'blood-pressure',
		title: 'calculators.bloodPressure.title',
		description: 'calculators.bloodPressure.description',
		icon: Thermometer,
		href: '/health/blood-pressure',
	},
	{
		id: 'ovulation',
		title: 'calculators.ovulation.title',
		description: 'calculators.ovulation.description',
		icon: Calendar,
		href: '/health/ovulation',
	},
	{
		id: 'vitamins',
		title: 'calculators.vitamins.title',
		description: 'calculators.vitamins.description',
		icon: Pill,
		href: '/health/vitamins',
	},
	{
		id: 'stress',
		title: 'calculators.stress.title',
		description: 'calculators.stress.description',
		icon: Brain,
		href: '/health/stress',
	},
	{
		id: 'dose',
		title: 'calculators.dose.title',
		description: 'calculators.dose.description',
		icon: Scale,
		href: '/health/dose',
	},
];

export default function HealthPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.health.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.health.description')}
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
									{typeof calculator.title === 'string' &&
									calculator.title.startsWith('calculators.')
										? t(calculator.title)
										: calculator.title}
								</h3>
							</div>
							<p className='text-gray-600'>
								{typeof calculator.description === 'string' &&
								calculator.description.startsWith(
									'calculators.'
								)
									? t(calculator.description)
									: calculator.description}
							</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
