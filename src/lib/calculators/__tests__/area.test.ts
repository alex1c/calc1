/**
 * Unit tests for Area calculator
 */
import {
	calculateArea,
	validateAreaInput,
	type AreaInput,
	type AreaResult,
} from '@/lib/calculators/area'

describe('Area Calculator', () => {
	describe('calculateArea - Circle', () => {
		it('should calculate circle area correctly', () => {
			const result = calculateArea({
				figureType: 'circle',
				radius: 5,
			})
			expect(result.area).toBeCloseTo(78.54, 2)
			expect(result.formula).toBe('S = π × r²')
			expect(result.figureType).toBe('circle')
			expect(result.parameters.radius).toBe(5)
		})

		it('should throw error for zero radius', () => {
			expect(() =>
				calculateArea({
					figureType: 'circle',
					radius: 0,
				})
			).toThrow('Radius must be positive')
		})

		it('should throw error for negative radius', () => {
			expect(() =>
				calculateArea({
					figureType: 'circle',
					radius: -5,
				})
			).toThrow('Radius must be positive')
		})
	})

	describe('calculateArea - Square', () => {
		it('should calculate square area correctly', () => {
			const result = calculateArea({
				figureType: 'square',
				side: 5,
			})
			expect(result.area).toBe(25)
			expect(result.formula).toBe('S = a²')
			expect(result.figureType).toBe('square')
			expect(result.parameters.side).toBe(5)
		})

		it('should throw error for zero side', () => {
			expect(() =>
				calculateArea({
					figureType: 'square',
					side: 0,
				})
			).toThrow('Side must be positive')
		})

		it('should throw error for negative side', () => {
			expect(() =>
				calculateArea({
					figureType: 'square',
					side: -5,
				})
			).toThrow('Side must be positive')
		})
	})

	describe('calculateArea - Triangle', () => {
		it('should calculate triangle area correctly', () => {
			const result = calculateArea({
				figureType: 'triangle',
				base: 10,
				height: 5,
			})
			expect(result.area).toBe(25)
			expect(result.formula).toBe('S = ½ × a × h')
			expect(result.figureType).toBe('triangle')
			expect(result.parameters.base).toBe(10)
			expect(result.parameters.height).toBe(5)
		})

		it('should throw error for zero base', () => {
			expect(() =>
				calculateArea({
					figureType: 'triangle',
					base: 0,
					height: 5,
				})
			).toThrow('Base and height must be positive')
		})

		it('should throw error for zero height', () => {
			expect(() =>
				calculateArea({
					figureType: 'triangle',
					base: 10,
					height: 0,
				})
			).toThrow('Base and height must be positive')
		})

		it('should throw error for negative base', () => {
			expect(() =>
				calculateArea({
					figureType: 'triangle',
					base: -10,
					height: 5,
				})
			).toThrow('Base and height must be positive')
		})

		it('should throw error for negative height', () => {
			expect(() =>
				calculateArea({
					figureType: 'triangle',
					base: 10,
					height: -5,
				})
			).toThrow('Base and height must be positive')
		})
	})

	describe('calculateArea - Invalid type', () => {
		it('should throw error for invalid figure type', () => {
			expect(() =>
				calculateArea({
					figureType: 'invalid' as any,
				})
			).toThrow('Invalid figure type')
		})
	})

	describe('validateAreaInput', () => {
		it('should validate correct circle input', () => {
			const result = validateAreaInput({
				figureType: 'circle',
				radius: 5,
			})
			expect(result.isValid).toBe(true)
			expect(result.errors).toHaveLength(0)
		})

		it('should validate correct square input', () => {
			const result = validateAreaInput({
				figureType: 'square',
				side: 5,
			})
			expect(result.isValid).toBe(true)
			expect(result.errors).toHaveLength(0)
		})

		it('should validate correct triangle input', () => {
			const result = validateAreaInput({
				figureType: 'triangle',
				base: 10,
				height: 5,
			})
			expect(result.isValid).toBe(true)
			expect(result.errors).toHaveLength(0)
		})

		it('should reject missing figure type', () => {
			const result = validateAreaInput({} as AreaInput)
			expect(result.isValid).toBe(false)
			expect(result.errors).toContain('Figure type is required')
		})

		it('should reject circle without radius', () => {
			const result = validateAreaInput({
				figureType: 'circle',
			})
			expect(result.isValid).toBe(false)
			expect(result.errors).toContain('Radius must be positive')
		})

		it('should reject square without side', () => {
			const result = validateAreaInput({
				figureType: 'square',
			})
			expect(result.isValid).toBe(false)
			expect(result.errors).toContain('Side must be positive')
		})

		it('should reject triangle without base', () => {
			const result = validateAreaInput({
				figureType: 'triangle',
				height: 5,
			})
			expect(result.isValid).toBe(false)
			expect(result.errors).toContain('Base must be positive')
		})

		it('should reject triangle without height', () => {
			const result = validateAreaInput({
				figureType: 'triangle',
				base: 10,
			})
			expect(result.isValid).toBe(false)
			expect(result.errors).toContain('Height must be positive')
		})
	})
})

