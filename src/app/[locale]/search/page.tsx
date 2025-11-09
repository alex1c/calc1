'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/header';
import { Search, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useSearchIndex } from '@/hooks/use-search-index';
import { searchCalculators } from '@/lib/search-utils';
import { useState, useEffect } from 'react';
import { CalculatorSearchResult } from '@/lib/search-utils';

export default function SearchPage() {
	const t = useTranslations();
	const locale = useLocale();
	const searchParams = useSearchParams();
	const query = searchParams.get('q') || '';
	const { index: searchIndex, isLoading } = useSearchIndex();
	const [results, setResults] = useState<CalculatorSearchResult[]>([]);

	useEffect(() => {
		if (query && searchIndex.length > 0) {
			const searchResults = searchCalculators(query, searchIndex);
			setResults(searchResults);
		} else {
			setResults([]);
		}
	}, [query, searchIndex]);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('common.searchResults') || 'Результаты поиска'}
					</h1>
					{query && (
						<p className='text-lg text-gray-600 dark:text-gray-400'>
							{t('common.resultsFor') || 'Результаты для:'}{' '}
							<span className='font-semibold text-gray-900 dark:text-white'>
								&ldquo;{query}&rdquo;
							</span>
						</p>
					)}
				</div>

				{isLoading ? (
					<div className='text-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' />
						<p className='text-gray-600 dark:text-gray-400'>
							{t('common.loading') || 'Загрузка...'}
						</p>
					</div>
				) : query ? (
					results.length > 0 ? (
						<div className='space-y-4'>
							<div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
								{t('common.found') || 'Найдено'}: {results.length}{' '}
								{t('common.results') || 'результатов'}
							</div>
							{results.map((result) => (
								<Link
									key={result.id}
									href={`/${locale}${result.href}`}
									className='block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all'
								>
									<div className='flex items-start space-x-4'>
										<div className='flex-shrink-0'>
											<div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center'>
												<Calculator className='h-5 w-5 text-blue-600 dark:text-blue-400' />
											</div>
										</div>
										<div className='flex-1 min-w-0'>
											<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
												{result.title}
											</h3>
											<p className='text-gray-600 dark:text-gray-400 mb-2 line-clamp-2'>
												{result.description}
											</p>
											<div className='flex items-center space-x-4'>
												<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'>
													{result.category}
												</span>
												<span className='text-blue-600 dark:text-blue-400 text-sm font-medium'>
													{t('common.useCalculator') || 'Использовать калькулятор'} →
												</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className='text-center py-12'>
							<Search className='mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4' />
							<h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
								{t('common.noResults') || 'Ничего не найдено'}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('common.tryAnotherQuery') ||
									'Попробуйте другой запрос или проверьте правописание'}
							</p>
						</div>
					)
				) : (
					<div className='text-center py-12'>
						<Search className='mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4' />
						<h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
							{t('common.noQuery') || 'Нет запроса для поиска'}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('common.enterSearchTerm') ||
								'Введите поисковый запрос, чтобы найти калькуляторы'}
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
