import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import { Calculator, Percent, Square, Pi, Circle, Box } from 'lucide-react';

// Note: Calculators array is now defined inside the component to access translations

export default function MathPage() {
	const t = useTranslations();
	const locale = useLocale();

	const calculators = [
		{
			id: 'basic',
			title: t('math_basic.title'),
			description: t('math_basic.description'),
			icon: Calculator,
			href: '/math/basic',
		},
		{
			id: 'percentage',
			title: t('math_percent.title'),
			description: t('math_percent.description'),
			icon: Percent,
			href: '/math/percent',
		},
		{
			id: 'area',
			title: t('calculators.area.title'),
			description: t('calculators.area.description'),
			icon: Circle,
			href: '/math/area',
		},
		{
			id: 'volume',
			title: t('calculators.volume.title'),
			description: t('calculators.volume.description'),
			icon: Box,
			href: '/math/volume',
		},
		{
			id: 'trigonometry',
			title: 'Trigonometry Calculator',
			description:
				'Calculate sine, cosine, tangent and other trigonometric functions',
			icon: Pi,
			href: '/math/trigonometry',
			disabled: true,
		},
	];

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
					{calculators.map((calculator) => {
						const isDisabled = calculator.disabled;
						const CardComponent = isDisabled ? 'div' : Link;

						return (
							<CardComponent
								key={calculator.id}
								{...(isDisabled
									? {}
									: { href: `/${locale}${calculator.href}` })}
								className={`rounded-lg border p-6 transition-all duration-200 ${
									isDisabled
										? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
										: 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
								}`}
							>
								<div className='flex items-center mb-4'>
									<calculator.icon
										className={`h-8 w-8 mr-3 ${
											isDisabled
												? 'text-gray-400'
												: 'text-blue-600'
										}`}
									/>
									<h3
										className={`text-xl font-semibold ${
											isDisabled
												? 'text-gray-500'
												: 'text-gray-900'
										}`}
									>
										{calculator.title}
									</h3>
								</div>
								<p
									className={`${
										isDisabled
											? 'text-gray-400'
											: 'text-gray-600'
									}`}
								>
									{calculator.description}
								</p>
								{isDisabled && (
									<div className='mt-3'>
										<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600'>
											Coming Soon
										</span>
									</div>
								)}
							</CardComponent>
						);
					})}
				</div>
			</main>
		</div>
	);
}
