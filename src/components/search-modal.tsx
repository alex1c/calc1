'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
	Search,
	X,
	Calculator,
	Loader2,
	TrendingUp,
	ArrowUpDown,
} from 'lucide-react';
import { searchCalculators, CalculatorSearchResult } from '@/lib/search-utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	searchIndex: CalculatorSearchResult[];
}

export default function SearchModal({
	isOpen,
	onClose,
	searchIndex,
}: SearchModalProps) {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<CalculatorSearchResult[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [isOpen]);

	// Search when query changes
	useEffect(() => {
		if (query.trim().length > 0) {
			setIsSearching(true);
			const timer = setTimeout(() => {
				const searchResults = searchCalculators(query, searchIndex);
				setResults(searchResults);
				setIsSearching(false);
				setSelectedIndex(-1);
			}, 150); // Debounce search

			return () => clearTimeout(timer);
		} else {
			setResults([]);
			setIsSearching(false);
			setSelectedIndex(-1);
		}
	}, [query, searchIndex]);

	const handleSelect = useCallback(
		(result: CalculatorSearchResult) => {
			router.push(`/${locale}${result.href}`);
			onClose();
			setQuery('');
			setResults([]);
		},
		[router, locale, onClose]
	);

	const handleClose = useCallback(() => {
		onClose();
		setQuery('');
		setResults([]);
		setSelectedIndex(-1);
	}, [onClose]);

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!isOpen) return;

			if (e.key === 'Escape') {
				handleClose();
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev < results.length - 1 ? prev + 1 : prev
				);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
			} else if (e.key === 'Enter' && selectedIndex >= 0) {
				e.preventDefault();
				const selectedResult = results[selectedIndex];
				if (selectedResult) {
					handleSelect(selectedResult);
				}
			}
		},
		[isOpen, results, selectedIndex, handleSelect, handleClose]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
			return () => document.removeEventListener('keydown', handleKeyDown);
		}
	}, [isOpen, handleKeyDown]);

	// Scroll selected result into view
	useEffect(() => {
		if (selectedIndex >= 0 && resultsRef.current) {
			const selectedElement = resultsRef.current.children[
				selectedIndex
			] as HTMLElement | undefined;
			if (selectedElement) {
				selectedElement.scrollIntoView({
					block: 'nearest',
					behavior: 'smooth',
				});
			}
		}
	}, [selectedIndex, results]);

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 z-50 overflow-y-auto'
				onClick={handleClose}
			>
				{/* Backdrop */}
				<div className='fixed inset-0 bg-black/50 backdrop-blur-sm' />

				{/* Modal */}
				<div className='flex min-h-screen items-start justify-center px-4 pt-20 pb-4'>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
						className='relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl'
					>
						{/* Search Input */}
						<div className='sticky top-0 z-10 bg-white dark:bg-gray-800 rounded-t-xl border-b border-gray-200 dark:border-gray-700 p-4'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
								<input
									ref={inputRef}
									type='text'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder={
										t('common.search') ||
										'Поиск калькуляторов...'
									}
									className='w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg'
								/>
								{query && (
									<button
										onClick={() => setQuery('')}
										className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
									>
										<X className='h-5 w-5' />
									</button>
								)}
							</div>
							{query && (
								<div className='mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400'>
									<ArrowUpDown className='h-3 w-3 mr-1' />
									<span>
										Используйте стрелки для навигации
									</span>
									<span className='mx-2'>•</span>
									<span>Enter для выбора</span>
								</div>
							)}
						</div>

						{/* Results */}
						<div className='max-h-[60vh] overflow-y-auto'>
							{isSearching ? (
								<div className='flex items-center justify-center py-12'>
									<Loader2 className='h-6 w-6 animate-spin text-blue-600' />
									<span className='ml-2 text-gray-600 dark:text-gray-400'>
										Поиск...
									</span>
								</div>
							) : query.trim().length === 0 ? (
								<div className='py-12 text-center'>
									<Search className='h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4' />
									<p className='text-gray-500 dark:text-gray-400'>
										{t('common.searchPlaceholder') ||
											'Начните вводить название калькулятора...'}
									</p>
									{searchIndex.length > 0 && (
										<p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
											Доступно {searchIndex.length}{' '}
											калькуляторов
										</p>
									)}
								</div>
							) : results.length === 0 ? (
								<div className='py-12 text-center'>
									<Search className='h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4' />
									<p className='text-gray-600 dark:text-gray-400 font-medium'>
										Ничего не найдено
									</p>
									<p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
										Попробуйте другой запрос
									</p>
								</div>
							) : (
								<div
									ref={resultsRef}
									className='p-2'
								>
									<div className='mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
										Найдено: {results.length}
									</div>
									{results.map((result, index) => (
										<motion.button
											key={result.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.02 }}
											onClick={() => handleSelect(result)}
											className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
												selectedIndex === index
													? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
													: 'hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
											}`}
										>
											<div className='flex items-start space-x-3'>
												<div className='flex-shrink-0 mt-1'>
													<div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center'>
														<Calculator className='h-5 w-5 text-blue-600 dark:text-blue-400' />
													</div>
												</div>
												<div className='flex-1 min-w-0'>
													<h3 className='text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1'>
														{result.title}
													</h3>
													<p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2'>
														{result.description}
													</p>
													<div className='flex items-center space-x-2'>
														<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'>
															{result.category}
														</span>
														{result.matchScore >
															50 && (
															<span className='inline-flex items-center text-xs text-green-600 dark:text-green-400'>
																<TrendingUp className='h-3 w-3 mr-1' />
																Точное
																совпадение
															</span>
														)}
													</div>
												</div>
											</div>
										</motion.button>
									))}
								</div>
							)}
						</div>

						{/* Footer */}
						<div className='sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 rounded-b-xl flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
							<div className='flex items-center space-x-4'>
								<span className='flex items-center'>
									<kbd className='px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded'>
										Esc
									</kbd>
									<span className='ml-2'>Закрыть</span>
								</span>
							</div>
							<button
								onClick={handleClose}
								className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
							>
								<X className='h-4 w-4' />
							</button>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
