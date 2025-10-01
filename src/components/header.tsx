'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Calculator, Search, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
	onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);

	const languages = [
		{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
	];

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(searchQuery);
		}
		// Navigate to search results or trigger search
		router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`);
	};

	const handleLanguageChange = (newLocale: string) => {
		const currentPath = window.location.pathname;
		const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
		router.push(newPath);
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

					{/* Search Bar */}
					<div className='flex-1 max-w-lg mx-8'>
						<form
							onSubmit={handleSearch}
							className='relative'
						>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<input
									type='text'
									placeholder={t('common.search')}
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
						</form>
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
		</header>
	);
}





