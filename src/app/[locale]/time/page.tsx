import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import { Clock, Calendar, Timer, Birthday } from 'lucide-react';

const calculators = [
	{
		id: 'age',
		title: 'Age Calculator',
		description: 'Calculate your exact age in years, months, and days',
		icon: Birthday,
		href: '/calc/age',
	},
	{
		id: 'date-difference',
		title: 'Date Difference Calculator',
		description: 'Calculate the difference between two dates',
		icon: Calendar,
		href: '/calc/date-difference',
	},
	{
		id: 'time-zone',
		title: 'Time Zone Converter',
		description: 'Convert time between different time zones',
		icon: Clock,
		href: '/calc/time-zone',
	},
	{
		id: 'timer',
		title: 'Timer & Stopwatch',
		description: 'Set timers and use stopwatch functionality',
		icon: Timer,
		href: '/calc/timer',
	},
];

export default function TimePage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.time.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.time.description')}
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
