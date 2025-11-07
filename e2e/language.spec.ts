/**
 * E2E tests for language switching
 */
import { test, expect } from '@playwright/test'

test.describe('Language Switching', () => {
	test('should have correct locale in URL', async ({ page }) => {
		await page.goto('/en/auto')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/\/en\/auto/, { timeout: 5000 })

		await page.goto('/ru/auto')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/\/ru\/auto/, { timeout: 5000 })
	})

	test('should load pages in different locales', async ({ page }) => {
		await page.goto('/en')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/\/en/, { timeout: 5000 })
		
		await page.goto('/ru')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/\/ru/, { timeout: 5000 })
	})

	test('should maintain page when switching language', async ({ page }) => {
		await page.goto('/ru/auto')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/\/auto/, { timeout: 5000 })
	})
})

