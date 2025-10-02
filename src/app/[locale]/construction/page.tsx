import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import { Wrench, Paintbrush, Square, Home, Package } from 'lucide-react';

const getCalculators = (t: any) => [
	{
		id: 'wallpaper',
		title: t('calculators.wallpaper.title'),
		description: t('calculators.wallpaper.description'),
		icon: Paintbrush,
		href: '/calc/wallpaper',
	},
	{
		id: 'paint',
		title: t('calculators.materials.title'),
		description: t('calculators.materials.description'),
		icon: Package,
		href: '/calc/paint',
	},
	{
		id: 'concrete',
		title: 'Concrete Calculator',
		description: 'Calculate concrete volume for foundations and slabs',
		icon: Square,
		href: '/calc/concrete',
	},
	{
		id: 'roofing',
		title: 'Roofing Calculator',
		description: 'Calculate roofing materials and costs',
		icon: Home,
		href: '/calc/roofing',
	},
];

export default function ConstructionPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.construction.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.construction.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{getCalculators(t).map((calculator) => (
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
