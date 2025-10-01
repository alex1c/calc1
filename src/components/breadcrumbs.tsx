'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	const locale = useLocale();

	return (
		<nav className='bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto py-3'>
				<ol className='flex items-center space-x-2 text-sm'>
					{/* Home link */}
					<li>
						<Link
							href={`/${locale}`}
							className='text-gray-500 hover:text-gray-700 transition-colors flex items-center'
						>
							<Home className='h-4 w-4 mr-1' />
							Home
						</Link>
					</li>

					{/* Breadcrumb items */}
					{items.map((item, index) => (
						<li
							key={index}
							className='flex items-center space-x-2'
						>
							<ChevronRight className='h-4 w-4 text-gray-400' />
							{item.href ? (
								<Link
									href={`/${locale}${item.href}`}
									className='text-gray-500 hover:text-gray-700 transition-colors'
								>
									{item.label}
								</Link>
							) : (
								<span className='text-gray-900 font-medium'>
									{item.label}
								</span>
							)}
						</li>
					))}
				</ol>
			</div>
		</nav>
	);
}
