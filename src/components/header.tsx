'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Calculator, Search, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useSearchIndex } from '@/hooks/use-search-index';

// Ленивая загрузка SearchModal только при необходимости
const SearchModal = dynamic(
	() => import('./search-modal'),
	{
		ssr: false,
		loading: () => null, // Не показываем индикатор загрузки для модального окна
	}
);

interface HeaderProps {
	onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);
	const { index: searchIndex, isLoading: isIndexLoading } = useSearchIndex();

	const languages = [
		{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
		{ code: 'pl', name: 'Polski', flag: '🇵🇱' },
		{ code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
		{ code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
	];

	const handleSearchClick = () => {
		setShowSearchModal(true);
	};

	// Keyboard shortcut: Ctrl/Cmd + K to open search
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				setShowSearchModal(true);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	const handleLanguageChange = async (newLocale: string) => {
		// Save locale preference to cookie
		document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;

		// Get current path without locale
		const currentPath = window.location.pathname;
		let pathWithoutLocale = currentPath;

		// Remove locale prefix if present
		for (const loc of ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR']) {
			if (currentPath.startsWith(`/${loc}/`) || currentPath === `/${loc}`) {
				pathWithoutLocale = currentPath.replace(`/${loc}`, '') || '/';
				break;
			}
		}

		// Build new path with locale prefix (all locales now have prefix)
		const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

		// Use router.replace for smoother transition (no history entry)
		router.replace(newPath);
		setShowLanguageMenu(false);
	};

	return (
		<header className='bg-white shadow-sm border-b'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo and Brand */}
					<Link
						href={`/${locale}`}
						className='flex items-center space-x-2'
					>
						<div className='relative'>
							<Calculator className='h-8 w-8 text-blue-600' />
							<div className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
								1
							</div>
						</div>
						<div>
							<h1 className='text-xl font-bold text-gray-900'>
								{t('brand.name')}
							</h1>
							<p className='text-xs text-gray-600'>
								{t('brand.slogan')}
							</p>
						</div>
					</Link>

					{/* Search Button */}
					<div className='flex-1 max-w-lg mx-8'>
						<button
							onClick={handleSearchClick}
							className='w-full flex items-center pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-left'
						>
							<Search className='h-4 w-4 mr-3 flex-shrink-0' />
							<span className='flex-1 text-sm'>
								{t('common.search') || 'Поиск калькуляторов...'}
							</span>
							<kbd className='hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded'>
								Ctrl K
							</kbd>
						</button>
					</div>

					{/* Language Switcher */}
					<div className='relative'>
						<button
							onClick={() =>
								setShowLanguageMenu(!showLanguageMenu)
							}
							className='flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
						>
							<Globe className='h-4 w-4' />
							<span className='text-sm font-medium'>
								{
									languages.find(
										(lang) => lang.code === locale
									)?.flag
								}
							</span>
						</button>

						{showLanguageMenu && (
							<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
								{languages.map((language) => (
									<button
										key={language.code}
										onClick={() =>
											handleLanguageChange(language.code)
										}
										className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
											locale === language.code
												? 'bg-blue-50 text-blue-600'
												: 'text-gray-700'
										}`}
									>
										<span className='text-lg'>
											{language.flag}
										</span>
										<span className='text-sm font-medium'>
											{language.name}
										</span>
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Search Modal - загружается только при открытии */}
			{showSearchModal && !isIndexLoading && (
				<SearchModal
					isOpen={showSearchModal}
					onClose={() => setShowSearchModal(false)}
					searchIndex={searchIndex}
				/>
			)}
		</header>
	);
}





