'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { CalculatorSearchResult } from '@/lib/search-utils';

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

				const data = await response.json();

				if (isMounted && !abortController.signal.aborted) {
					setIndex(data.index || []);
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

