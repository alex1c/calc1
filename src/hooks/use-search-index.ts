'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { CalculatorSearchResult } from '@/lib/search-utils';

const CACHE_KEY = 'search-index-cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

export function useSearchIndex() {
	const locale = useLocale();
	const [index, setIndex] = useState<CalculatorSearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;
		let abortController: AbortController | null = null;

		async function loadIndex() {
			try {
				// Проверяем кэш localStorage
				const cacheKey = `${CACHE_KEY}-${locale}`;
				if (typeof window !== 'undefined') {
					const cached = localStorage.getItem(cacheKey);
					
					if (cached) {
						try {
							const { data, timestamp } = JSON.parse(cached);
							const now = Date.now();
							
							if (now - timestamp < CACHE_DURATION && data && Array.isArray(data)) {
								if (isMounted) {
									setIndex(data);
									setIsLoading(false);
									return;
								}
							}
						} catch (e) {
							// Если кэш поврежден, игнорируем его
							console.warn('Failed to parse cached search index', e);
						}
					}
				}

				setIsLoading(true);
				setError(null);

				// Create abort controller for cleanup
				abortController = new AbortController();

				// Fetch search index from API
				const response = await fetch(
					`/api/search-index?locale=${locale}`,
					{
						signal: abortController.signal,
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Failed to load search index: ${response.statusText}`);
				}

				const result = await response.json();
				const data = result.index || [];

				// Сохраняем в кэш
				if (typeof window !== 'undefined' && data.length > 0) {
					try {
						localStorage.setItem(cacheKey, JSON.stringify({
							data,
							timestamp: Date.now()
						}));
					} catch (e) {
						// Если localStorage переполнен, игнорируем ошибку
						console.warn('Failed to cache search index', e);
					}
				}

				if (isMounted && !abortController.signal.aborted) {
					setIndex(data);
					setError(null);
				}
			} catch (err) {
				if (err instanceof Error && err.name === 'AbortError') {
					// Request was aborted, ignore
					return;
				}

				if (isMounted) {
					setError(
						err instanceof Error
							? err
							: new Error('Failed to load search index')
					);
					setIndex([]);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadIndex();

		return () => {
			isMounted = false;
			if (abortController) {
				abortController.abort();
			}
		};
	}, [locale]);

	return { index, isLoading, error };
}

