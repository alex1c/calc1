import { getTranslations, getLocale } from 'next-intl/server';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Wrench,
	Paintbrush,
	Square,
	Home,
	Package,
	Thermometer,
	BarChart3,
	Cable,
	TrendingUp,
	Droplets,
	Layers,
	Sparkles,
} from 'lucide-react';

interface Props {
	params: { locale: string };
}

const getCalculators = (t: any) => [
	{
		id: 'wallpaper',
		title: t('categories.construction.calculators.wallpaper.title'),
		description: t(
			'categories.construction.calculators.wallpaper.description'
		),
		icon: Paintbrush,
		href: '/construction/wallpaper',
	},
	{
		id: 'paint',
		title: t('calculators.paint.title'),
		description: t('calculators.paint.description'),
		icon: Paintbrush,
		href: '/construction/paint',
	},
	{
		id: 'tile-glue',
		title: t('calculators.tileGlue.title'),
		description: t('calculators.tileGlue.description'),
		icon: Square,
		href: '/construction/tile-glue',
	},
	{
		id: 'putty',
		title: t('calculators.putty.title'),
		description: t('calculators.putty.description'),
		icon: Layers,
		href: '/construction/putty',
	},
	{
		id: 'primer',
		title: t('calculators.primer.title'),
		description: t('calculators.primer.description'),
		icon: Sparkles,
		href: '/construction/primer',
	},
	{
		id: 'tile',
		title: t('calculators.tile.title'),
		description: t('calculators.tile.description'),
		icon: Square,
		href: '/construction/tile',
	},
	{
		id: 'laminate',
		title: t('calculators.laminate.title'),
		description: t('calculators.laminate.description'),
		icon: Square,
		href: '/construction/laminate',
	},
	{
		id: 'concrete',
		title: t('categories.construction.calculators.concrete.title'),
		description: t(
			'categories.construction.calculators.concrete.description'
		),
		icon: Wrench,
		href: '/construction/concrete',
	},
	{
		id: 'roofing',
		title: t('categories.construction.calculators.roof.title'),
		description: t('categories.construction.calculators.roof.description'),
		icon: Home,
		href: '/construction/roofing',
	},
	{
		id: 'wall',
		title: t('categories.construction.calculators.wall.title'),
		description: t('categories.construction.calculators.wall.description'),
		icon: Package,
		href: '/construction/wall',
	},
	{
		id: 'floor-heating',
		title: t('calculators.floorHeating.title'),
		description: t('calculators.floorHeating.description'),
		icon: Thermometer,
		href: '/construction/floor-heating',
	},
	{
		id: 'rebar-calculator',
		title: t('calculators.rebarCalculator.title'),
		description: t('calculators.rebarCalculator.description'),
		icon: BarChart3,
		href: '/construction/rebar-calculator',
	},
	{
		id: 'cable-section',
		title: t('calculators.cableSectionCalculator.title'),
		description: t('calculators.cableSectionCalculator.description'),
		icon: Cable,
		href: '/construction/cable-section',
	},
	{
		id: 'stairs',
		title: t('calculators.stairsCalculator.title'),
		description: t('calculators.stairsCalculator.description'),
		icon: TrendingUp,
		href: '/construction/stairs',
	},
	{
		id: 'water-pipe',
		title: t('calculators.waterPipeCalculator.title'),
		description: t('calculators.waterPipeCalculator.description'),
		icon: Droplets,
		href: '/construction/water-pipe',
	},
];

export default async function ConstructionPage({ params: { locale } }: Props) {
	const t = await getTranslations({ locale });
	const currentLocale = await getLocale();
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
					{getCalculators(t).map((calculator) => {
						const IconComponent = calculator.icon;
						return (
							<Link
								key={calculator.id}
								href={`/${currentLocale}${calculator.href}`}
								className='bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200'
							>
								<div className='flex items-center mb-4'>
									<IconComponent className='h-8 w-8 text-blue-600 mr-3' />
									<h3 className='text-xl font-semibold text-gray-900'>
										{calculator.title}
									</h3>
								</div>
								<p className='text-gray-600'>
									{calculator.description}
								</p>
							</Link>
						);
					})}
				</div>
			</main>
		</div>
	);
}
