import { NextRequest, NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/search-utils';

/**
 * API endpoint to get search index for calculators
 * Supports all locales and is extensible for future locales
 */
export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const locale = searchParams.get('locale') || 'ru';

		// Validate locale
		const validLocales = ['ru', 'en', 'es', 'de'];
		if (!validLocales.includes(locale)) {
			return NextResponse.json(
				{ error: 'Invalid locale' },
				{ status: 400 }
			);
		}

		// Build search index for the requested locale
		const index = await buildSearchIndex(locale);

		return NextResponse.json(
			{
				locale,
				index,
				count: index.length,
			},
			{
				headers: {
					'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
				},
			}
		);
	} catch (error) {
		console.error('Error building search index:', error);
		return NextResponse.json(
			{ error: 'Failed to build search index' },
			{ status: 500 }
		);
	}
}

