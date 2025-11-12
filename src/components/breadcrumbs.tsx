'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { SUPPORTED_LOCALES } from '@/lib/constants';

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	const t = useTranslations();
	const tBreadcrumbs = useTranslations('breadcrumbs');
	const tCalculators = useTranslations('calculators');
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
			if (index === 0 && SUPPORTED_LOCALES.includes(segment as any)) {
				return;
			}

			currentPath += `/${segment}`;

			// Определяем название для сегмента
			let label = segment;

			// Обрабатываем категории
			if (segment === 'life') {
				label = tBreadcrumbs('categories.life');
			} else if (segment === 'math') {
				label = tBreadcrumbs('categories.math');
			} else if (segment === 'auto') {
				label = tBreadcrumbs('categories.auto');
			} else if (segment === 'construction') {
				label = tBreadcrumbs('categories.construction');
			} else if (segment === 'finance') {
				label = tBreadcrumbs('categories.finance');
			} else if (segment === 'calc') {
				label = tBreadcrumbs('categories.calculators');
			}
			// Обрабатываем калькуляторы
			else if (segment === 'credit-loan') {
				label = tCalculators('credit-loan.title');
			} else if (segment === 'blood-alcohol') {
				label = tCalculators('bloodAlcohol.title');
			} else if (segment === 'baby-growth') {
				label = tCalculators('babyGrowth.title');
			} else if (segment === 'math_percent') {
				label = tCalculators('math_percent.title');
			} else if (segment === 'leasing') {
				label = tCalculators('leasing.title');
			} else if (segment === 'bmi') {
				label = tCalculators('bmi.title');
			} else if (segment === 'pregnancy') {
				label = tCalculators('pregnancy.title');
			} else if (segment === 'calories') {
				label = tCalculators('calories.title');
			} else if (segment === 'foodRation') {
				label = tCalculators('foodRation.title');
			} else if (segment === 'customs') {
				label = tCalculators('customs.title');
			} else if (segment === 'traffic-fines') {
				label = tCalculators('traffic-fines.title');
			} else if (segment === 'car-ownership') {
				label = tCalculators('car-ownership.title');
			} else if (segment === 'car-depreciation') {
				label = tCalculators('car-depreciation.title');
			} else if (segment === 'fuel-consumption') {
				label = tCalculators('fuel-consumption.title');
			} else if (segment === 'vehicle-tax') {
				label = tCalculators('vehicle-tax.title');
			} else if (segment === 'osago') {
				label = tCalculators('osago.title');
			} else if (segment === 'kasko') {
				label = tCalculators('kasko.title');
			} else if (segment === 'car-loan') {
				label = tCalculators('car-loan.title');
			} else if (segment === 'wallpaper') {
				label = tCalculators('wallpaper.title');
			} else if (segment === 'materials') {
				label = tCalculators('materials.title');
			} else if (segment === 'tile-laminate') {
				label = t('calculators.tile-laminate.title');
			} else if (segment === 'concrete') {
				label = tCalculators('concrete.title');
			} else if (segment === 'roof') {
				label = tCalculators('roof.title');
			} else if (segment === 'roofing') {
				label = tCalculators('roof.title');
			} else if (segment === 'wall') {
				label = tCalculators('wall.title');
			}

			// Последний элемент не должен быть ссылкой
			const isLast = index === segments.length - 1;
			breadcrumbs.push({
				label,
				href: isLast ? undefined : currentPath,
			});
		});

		// Добавляем категорию для авто калькуляторов, если она отсутствует
		const autoCalculators = [
			'leasing',
			'customs',
			'traffic-fines',
			'car-ownership',
			'car-depreciation',
			'fuel-consumption',
			'vehicle-tax',
			'osago',
			'kasko',
			'car-loan',
		];
		const lifeCalculators = [
			'calories',
			'bmi',
			'foodRation',
			'bloodAlcohol',
			'pregnancy',
			'babyGrowth',
		];
		const mathCalculators = [
			'area',
			'volume',
			'powerRoot',
			'equations',
			'statistics',
			'converter',
			'math_percent',
		];
		const constructionCalculators = [
			'wallpaper',
			'materials',
			'tile-laminate',
			'concrete',
			'roof',
			'roofing',
			'wall',
		];
		const financeCalculators = [
			'credit-loan',
			'mortgage',
			'deposit',
			'consumer-loan',
			'auto-loan',
			'investment',
			'savings',
		];

		// Проверяем, есть ли реальная категория в пути (не calc)
		const hasRealCategory = segments.some((seg) =>
			['life', 'math', 'auto', 'construction', 'finance'].includes(seg)
		);

		// Если нет реальной категории, но есть калькулятор, добавляем соответствующую категорию
		if (!hasRealCategory && segments.length > 1) {
			const calculatorSegment = segments[segments.length - 1];

			if (autoCalculators.includes(calculatorSegment)) {
				breadcrumbs.splice(-1, 0, {
					label: tBreadcrumbs('categories.auto'),
					href: '/auto',
				});
			} else if (lifeCalculators.includes(calculatorSegment)) {
				breadcrumbs.splice(-1, 0, {
					label: tBreadcrumbs('categories.life'),
					href: '/life',
				});
			} else if (mathCalculators.includes(calculatorSegment)) {
				breadcrumbs.splice(-1, 0, {
					label: tBreadcrumbs('categories.math'),
					href: '/math',
				});
			} else if (constructionCalculators.includes(calculatorSegment)) {
				breadcrumbs.splice(-1, 0, {
					label: tBreadcrumbs('categories.construction'),
					href: '/construction',
				});
			} else if (financeCalculators.includes(calculatorSegment)) {
				breadcrumbs.splice(-1, 0, {
					label: tBreadcrumbs('categories.finance'),
					href: '/finance',
				});
			}
		}

		return breadcrumbs;
	};

	const autoItems = getBreadcrumbs();
	const finalItems = items || autoItems;

	// Проверяем, есть ли в finalItems элемент с главной страницей
	const hasHomeInItems = finalItems.some(
		(item) =>
			item.href === '/' ||
			item.href === `/${locale}` ||
			item.href === ''
	);

	return (
		<nav className='bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto py-3'>
				<ol className='flex items-center space-x-2 text-sm'>
					{/* Home link - добавляем только если его нет в items */}
					{!hasHomeInItems && (
						<li>
							<Link
								href={`/${locale}`}
								className='text-gray-500 hover:text-gray-700 transition-colors flex items-center'
							>
								<Home className='h-4 w-4 mr-1' />
								{t('breadcrumbs.home')}
							</Link>
						</li>
					)}

					{/* Breadcrumb items */}
					{finalItems.map((item, index) => {
						// Проверяем, является ли элемент главной страницей
						const isHomeItem =
							item.href === '/' ||
							item.href === `/${locale}` ||
							item.href === '';

						return (
							<li
								key={index}
								className='flex items-center space-x-2'
							>
								<ChevronRight className='h-4 w-4 text-gray-400' />
								{item.href ? (
									<Link
										href={
											item.href.startsWith('/')
												? `/${locale}${item.href}`
												: item.href
										}
										className='text-gray-500 hover:text-gray-700 transition-colors flex items-center'
									>
										{isHomeItem && (
											<Home className='h-4 w-4 mr-1' />
										)}
										{item.label}
									</Link>
								) : (
									<span className='text-gray-900 font-medium'>
										{item.label}
									</span>
								)}
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}
