/**
 * E2E tests for calculator pages
 */
import { test, expect } from '@playwright/test'

test.describe('Calculator Pages', () => {
	test('should load BMI calculator page', async ({ page }) => {
		await page.goto('/ru/life/bmi')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveTitle(/BMI|ИМТ/i, { timeout: 10000 })
		
		// Look for input fields
		const inputs = page.locator('input[type="number"], input[type="text"]')
		await expect(inputs.first()).toBeVisible({ timeout: 5000 })
	})

	test('should calculate BMI', async ({ page }) => {
		await page.goto('/ru/life/bmi')
		await page.waitForLoadState('networkidle')
		
		// Find inputs by placeholder or label
		const inputs = page.locator('input[type="number"], input[type="text"]')
		const inputCount = await inputs.count()
		
		expect(inputCount).toBeGreaterThanOrEqual(2)
		
		await inputs.nth(0).fill('175')
		await inputs.nth(1).fill('70')
		
		// Wait for calculation result
		await page.waitForTimeout(1000)
		
		// Look for BMI result (around 22.8-22.9)
		await expect(
			page.locator('text=/22\\.[89]/')
		).toBeVisible({ timeout: 5000 })
	})

	test('should load percentage calculator page', async ({ page }) => {
		await page.goto('/ru/math/percent')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveTitle(/процент|percent/i, { timeout: 10000 })
	})

	test('should calculate percentage', async ({ page }) => {
		await page.goto('/ru/math/percent')
		await page.waitForLoadState('networkidle')
		
		const inputs = page.locator('input[type="number"], input[type="text"]')
		const inputCount = await inputs.count()
		
		expect(inputCount).toBeGreaterThanOrEqual(2)
		
		await inputs.nth(0).fill('100')
		await inputs.nth(1).fill('25')
		
		await page.waitForTimeout(1000)
		
		// Look for result containing 25
		await expect(
			page.locator('text=/25/')
		).toBeVisible({ timeout: 5000 })
	})

	test('should load auto category page', async ({ page }) => {
		await page.goto('/ru/auto')
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveTitle(/авто|auto/i, { timeout: 10000 })
		
		// Check for calculator links
		const calculatorLinks = page.getByRole('link').filter({
			hasText: /калькулятор|calculator/i
		})
		await expect(calculatorLinks.first()).toBeVisible({ timeout: 5000 })
	})

	test('should navigate between calculators', async ({ page }) => {
		await page.goto('/ru/auto')
		await page.waitForLoadState('networkidle')
		
		// Find fuel consumption calculator link
		const fuelLink = page.getByRole('link').filter({
			hasText: /расход топлива|fuel|consumption/i
		}).first()
		
		await expect(fuelLink).toBeVisible({ timeout: 5000 })
		await fuelLink.click()
		await page.waitForLoadState('networkidle')
		await expect(page).toHaveURL(/fuel|топлив/, { timeout: 5000 })
	})
})

