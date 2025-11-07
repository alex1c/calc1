/**
 * Unit tests for Percentage calculator
 */
import {
	getPercentOfNumber,
	getWhatPercent,
	getNumberFromPercent,
	changeByPercent,
	type PercentCalculationResult,
} from '@/lib/calculators/percent'

describe('Percentage Calculator', () => {
	describe('getPercentOfNumber', () => {
		it('should calculate percentage of number correctly', () => {
			const result = getPercentOfNumber(100, 25)
			expect(result.result).toBe(25)
			expect(result.formula).toContain('100')
			expect(result.formula).toContain('25')
		})

		it('should handle decimal percentages', () => {
			const result = getPercentOfNumber(100, 12.5)
			expect(result.result).toBe(12.5)
		})

		it('should throw error for negative number', () => {
			expect(() => getPercentOfNumber(-100, 25)).toThrow(
				'Numbers and percentages must be non-negative'
			)
		})

		it('should throw error for negative percentage', () => {
			expect(() => getPercentOfNumber(100, -25)).toThrow(
				'Numbers and percentages must be non-negative'
			)
		})

		it('should handle zero correctly', () => {
			const result = getPercentOfNumber(0, 25)
			expect(result.result).toBe(0)
		})
	})

	describe('getWhatPercent', () => {
		it('should calculate what percent one number is of another', () => {
			const result = getWhatPercent(25, 100)
			expect(result.result).toBe(25)
			expect(result.formula).toContain('25')
			expect(result.formula).toContain('100')
		})

		it('should handle decimal results', () => {
			const result = getWhatPercent(33, 100)
			expect(result.result).toBe(33)
		})

		it('should throw error when second number is zero', () => {
			expect(() => getWhatPercent(25, 0)).toThrow(
				'Second number cannot be zero'
			)
		})

		it('should throw error for negative numbers', () => {
			expect(() => getWhatPercent(-25, 100)).toThrow(
				'Numbers must be non-negative'
			)
		})

		it('should handle 100% correctly', () => {
			const result = getWhatPercent(100, 100)
			expect(result.result).toBe(100)
		})
	})

	describe('getNumberFromPercent', () => {
		it('should calculate number from percentage correctly', () => {
			const result = getNumberFromPercent(25, 25)
			expect(result.result).toBe(100)
			expect(result.formula).toContain('25')
		})

		it('should throw error for zero percentage', () => {
			expect(() => getNumberFromPercent(0, 25)).toThrow(
				'Percentage must be greater than zero'
			)
		})

		it('should throw error for negative percentage', () => {
			expect(() => getNumberFromPercent(-25, 25)).toThrow(
				'Percentage must be greater than zero'
			)
		})

		it('should throw error for negative part value', () => {
			expect(() => getNumberFromPercent(25, -25)).toThrow(
				'Part value must be non-negative'
			)
		})

		it('should handle zero part value', () => {
			const result = getNumberFromPercent(25, 0)
			expect(result.result).toBe(0)
		})
	})

	describe('changeByPercent', () => {
		it('should increase number by percentage correctly', () => {
			const result = changeByPercent(100, 10, 'increase')
			expect(result.result).toBeCloseTo(110, 10)
			expect(result.formula).toContain('+')
		})

		it('should decrease number by percentage correctly', () => {
			const result = changeByPercent(100, 10, 'decrease')
			expect(result.result).toBeCloseTo(90, 10)
			expect(result.formula).toContain('-')
		})

		it('should handle decimal percentages', () => {
			const result = changeByPercent(100, 12.5, 'increase')
			expect(result.result).toBeCloseTo(112.5, 10)
		})

		it('should throw error for negative number', () => {
			expect(() => changeByPercent(-100, 10, 'increase')).toThrow(
				'Numbers and percentages must be non-negative'
			)
		})

		it('should throw error for negative percentage', () => {
			expect(() => changeByPercent(100, -10, 'increase')).toThrow(
				'Numbers and percentages must be non-negative'
			)
		})

		it('should handle zero correctly', () => {
			const result = changeByPercent(0, 10, 'increase')
			expect(result.result).toBe(0)
		})

		it('should handle 100% increase correctly', () => {
			const result = changeByPercent(100, 100, 'increase')
			expect(result.result).toBe(200)
		})

		it('should handle 100% decrease correctly', () => {
			const result = changeByPercent(100, 100, 'decrease')
			expect(result.result).toBe(0)
		})
	})
})

