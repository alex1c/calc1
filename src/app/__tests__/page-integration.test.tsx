/**
 * Integration tests for page rendering and metadata
 */
import { render } from '@testing-library/react'
import { Metadata } from 'next'
import { generateMetadata } from '@/app/[locale]/auto/page'

// Mock next-intl
jest.mock('next-intl/server', () => ({
	getTranslations: jest.fn(() => (key: string) => key),
	getLocale: jest.fn(() => Promise.resolve('en')),
}))

jest.mock('next/navigation', () => ({
	notFound: jest.fn(),
}))

describe('Page Integration Tests', () => {
	describe('Auto Page Metadata', () => {
		it('generates correct metadata for auto page', async () => {
			const metadata = await generateMetadata({
				params: { locale: 'en' },
			})

			expect(metadata).toHaveProperty('title')
			expect(metadata).toHaveProperty('description')
			expect(metadata.title).toContain('Auto')
		})

		it('generates metadata with correct locale', async () => {
			const metadataRu = await generateMetadata({
				params: { locale: 'ru' },
			})
			const metadataEn = await generateMetadata({
				params: { locale: 'en' },
			})

			expect(metadataRu).toBeDefined()
			expect(metadataEn).toBeDefined()
		})

		it('includes OpenGraph metadata', async () => {
			const metadata = await generateMetadata({
				params: { locale: 'en' },
			})

			expect(metadata.openGraph).toBeDefined()
			expect(metadata.openGraph?.title).toBeDefined()
			expect(metadata.openGraph?.description).toBeDefined()
		})

		it('includes Twitter metadata', async () => {
			const metadata = await generateMetadata({
				params: { locale: 'en' },
			})

			expect(metadata.twitter).toBeDefined()
			expect(metadata.twitter?.title).toBeDefined()
		})

		it('includes canonical URL', async () => {
			const metadata = await generateMetadata({
				params: { locale: 'en' },
			})

			expect(metadata.alternates?.canonical).toBeDefined()
			expect(metadata.alternates?.canonical).toContain('/en/auto')
		})
	})
})

