/**
 * E2E tests for homepage
 */
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
	test('should load homepage', async ({ page }) => {
		await page.goto('/')
		// Wait for page to load and handle redirects
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveTitle(/Calc1|Калькулятор/i, { timeout: 10000 })
	})

	test('should display categories', async ({ page }) => {
		await page.goto('/')
		await page.waitForLoadState('networkidle')
		// Look for category cards or heading
		await expect(
			page.locator('h2, h1').filter({ hasText: /категории|categories|разделы|sections/i })
		).toBeVisible({ timeout: 10000 })
	})

	test('should navigate to calculator category', async ({ page }) => {
		await page.goto('/')
		await page.waitForLoadState('networkidle')
		
		// Find finance link by text or href
		const financeLink = page.getByRole('link').filter({ 
			hasText: /финансы|finance/i 
		}).first()
		
		await expect(financeLink).toBeVisible({ timeout: 5000 })
		await financeLink.click()
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/\/finance/, { timeout: 5000 })
	})

	test('should have working search', async ({ page }) => {
		await page.goto('/')
		await page.waitForLoadState('networkidle')
		
		// Find search button by icon or aria-label
		const searchButton = page.locator('button').filter({
			has: page.locator('svg')
		}).first()
		
		await expect(searchButton).toBeVisible({ timeout: 5000 })
		await searchButton.click()
		
		// Wait for search modal
		await page.waitForTimeout(500)
		
		const searchInput = page.getByPlaceholder(/начните вводить|start typing|поиск|search/i).first()
		await expect(searchInput).toBeVisible({ timeout: 3000 })
		await searchInput.fill('BMI')
		await expect(searchInput).toHaveValue('BMI')
	})
})

