import { getTranslations } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import { Clock, Calendar, Plus, User } from 'lucide-react';

export default async function TimePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const tCalculators = await getTranslations({
		locale,
		namespace: 'calculators',
	});

	const getCalculators = () => [
		{
			id: 'days-between',
			title: tCalculators('daysBetween.title'),
			description: tCalculators('daysBetween.description'),
			icon: Calendar,
			href: '/time/days-between',
		},
		{
			id: 'add-time',
			title: tCalculators('addTime.title'),
			description: tCalculators('addTime.description'),
			icon: Plus,
			href: '/time/add-time',
		},
		{
			id: 'age',
			title: tCalculators('age.title'),
			description: tCalculators('age.description'),
			icon: User,
			href: '/time/age',
		},
	];

	const calculators = getCalculators();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('time.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('time.description')}
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
