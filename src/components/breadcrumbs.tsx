'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
	const t = useTranslations();
	const locale = useLocale();
	const pathname = usePathname();

	// Определяем хлебные крошки на основе пути
	const getBreadcrumbs = () => {
		const segments = pathname.split('/').filter(Boolean);
		const breadcrumbs = [];

		// Если только locale или пустой путь - не показываем хлебные крошки
		if (segments.length <= 1) {
			return [];
		}

		// Обрабатываем сегменты пути (пропускаем locale)
		let currentPath = '';
		segments.forEach((segment, index) => {
			// Пропускаем locale (первый сегмент)
			if (index === 0 && ['ru', 'en', 'de', 'es'].includes(segment)) {
				return;
			}

			currentPath += `/${segment}`;

			// Определяем название для сегмента
			let label = segment;
			if (segment === 'life') {
				label = t('categories.life.title');
			} else if (segment === 'blood-alcohol') {
				label = t('calculators.bloodAlcohol.title');
			} else if (segment === 'calc') {
				label = t('categories.calculators.title');
			}

			// Последний элемент не должен быть ссылкой
			const isLast = index === segments.length - 1;
			breadcrumbs.push({
				label,
				href: isLast ? undefined : currentPath,
			});
		});

		// Добавляем главную страницу в начало
		breadcrumbs.unshift({
			label: t('breadcrumbs.home'),
			href: '/',
		});

		return breadcrumbs;
	};

	const items = getBreadcrumbs();

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
							{t('breadcrumbs.home')}
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
