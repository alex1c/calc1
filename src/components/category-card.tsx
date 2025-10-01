import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
	category: string;
	icon: LucideIcon;
	href: string;
	calculatorCount: number;
}

export default function CategoryCard({
	category,
	icon: Icon,
	href,
	calculatorCount,
}: CategoryCardProps) {
	const t = useTranslations(`categories.${category}`);
	const locale = useLocale();

	return (
		<Link
			href={`/${locale}${href}`}
			className='group'
		>
			<div className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group-hover:scale-105'>
				<div className='flex items-center space-x-4'>
					<div className='flex-shrink-0'>
						<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors'>
							<Icon className='h-6 w-6 text-blue-600' />
						</div>
					</div>
					<div className='flex-1 min-w-0'>
						<h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
							{t('title')}
						</h3>
						<p className='text-sm text-gray-600 mt-1'>
							{t('description')}
						</p>
						<div className='mt-2'>
							<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
								{calculatorCount}{' '}
								{calculatorCount === 1
									? 'calculator'
									: 'calculators'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
