'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Clock,
	Calendar,
	Plus,
	User,
	Timer,
	Target,
	Globe,
	CalendarDays,
} from 'lucide-react';

const getCalculators = (t: any) => [
	{
		id: 'days-between',
		title: t('calculators.daysBetween.title'),
		description: t('calculators.daysBetween.description'),
		icon: Calendar,
		href: '/time/days-between',
	},
	{
		id: 'add-time',
		title: t('calculators.addTime.title'),
		description: t('calculators.addTime.description'),
		icon: Plus,
		href: '/time/add-time',
	},
	{
		id: 'age',
		title: t('calculators.age.title'),
		description: t('calculators.age.description'),
		icon: User,
		href: '/time/age',
	},
	{
		id: 'deadline',
		title: t('calculators.deadline.title'),
		description: t('calculators.deadline.description'),
		icon: Target,
		href: '/time/deadline',
	},
	{
		id: 'calendar',
		title: t('calculators.calendar.title'),
		description: t('calculators.calendar.description'),
		icon: CalendarDays,
		href: '/time/calendar',
	},
	{
		id: 'timer',
		title: t('calculators.timer.title'),
		description: t('calculators.timer.description'),
		icon: Timer,
		href: '/time/timer',
	},
	{
		id: 'countdown',
		title: t('calculators.countdown.title'),
		description: t('calculators.countdown.description'),
		icon: Clock,
		href: '/time/countdown',
	},
	{
		id: 'world-time',
		title: t('calculators.worldTime.title'),
		description: t('calculators.worldTime.description'),
		icon: Globe,
		href: '/time/world-time',
	},
];

export default function TimePage() {
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
