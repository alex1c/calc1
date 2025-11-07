/**
 * Unit tests for BMI calculator
 */
import {
	calculateBMI,
	getBMICategory,
	getNormalWeightRange,
	calculateBMIResult,
	validateBMIInput,
	getBMICategoryColor,
	getBMICategoryColorDark,
	getBMIScale,
	getBMIInterpretation,
	formatBMI,
	getBMICategoryDescription,
	type BMIResult,
	type BMICategory,
} from '@/lib/calculators/bmi'

describe('BMI Calculator', () => {
	describe('calculateBMI', () => {
		it('should calculate BMI correctly for normal weight', () => {
			const bmi = calculateBMI(70, 175)
			expect(bmi).toBeCloseTo(22.86, 1)
		})

		it('should calculate BMI correctly for overweight', () => {
			const bmi = calculateBMI(90, 175)
			expect(bmi).toBeCloseTo(29.39, 1)
		})

		it('should calculate BMI correctly for underweight', () => {
			const bmi = calculateBMI(50, 175)
			expect(bmi).toBeCloseTo(16.33, 1)
		})

		it('should throw error for zero height', () => {
			expect(() => calculateBMI(70, 0)).toThrow(
				'Height and weight must be positive numbers'
			)
		})

		it('should throw error for zero weight', () => {
			expect(() => calculateBMI(0, 175)).toThrow(
				'Height and weight must be positive numbers'
			)
		})

		it('should throw error for negative height', () => {
			expect(() => calculateBMI(70, -175)).toThrow(
				'Height and weight must be positive numbers'
			)
		})

		it('should throw error for negative weight', () => {
			expect(() => calculateBMI(-70, 175)).toThrow(
				'Height and weight must be positive numbers'
			)
		})
	})

	describe('getBMICategory', () => {
		it('should return underweight for BMI < 18.5', () => {
			expect(getBMICategory(17)).toBe('underweight')
			expect(getBMICategory(18.4)).toBe('underweight')
		})

		it('should return normal for BMI 18.5-24.9', () => {
			expect(getBMICategory(18.5)).toBe('normal')
			expect(getBMICategory(22)).toBe('normal')
			expect(getBMICategory(24.9)).toBe('normal')
		})

		it('should return overweight for BMI 25-29.9', () => {
			expect(getBMICategory(25)).toBe('overweight')
			expect(getBMICategory(27)).toBe('overweight')
			expect(getBMICategory(29.9)).toBe('overweight')
		})

		it('should return obese1 for BMI 30-34.9', () => {
			expect(getBMICategory(30)).toBe('obese1')
			expect(getBMICategory(32)).toBe('obese1')
			expect(getBMICategory(34.9)).toBe('obese1')
		})

		it('should return obese2 for BMI 35-39.9', () => {
			expect(getBMICategory(35)).toBe('obese2')
			expect(getBMICategory(37)).toBe('obese2')
			expect(getBMICategory(39.9)).toBe('obese2')
		})

		it('should return obese3 for BMI >= 40', () => {
			expect(getBMICategory(40)).toBe('obese3')
			expect(getBMICategory(45)).toBe('obese3')
			expect(getBMICategory(50)).toBe('obese3')
		})
	})

	describe('getNormalWeightRange', () => {
		it('should calculate normal weight range correctly', () => {
			const range = getNormalWeightRange(175)
			expect(range.min).toBeCloseTo(56.7, 1)
			expect(range.max).toBeCloseTo(76.3, 1)
		})

		it('should throw error for zero height', () => {
			expect(() => getNormalWeightRange(0)).toThrow(
				'Height must be a positive number'
			)
		})

		it('should throw error for negative height', () => {
			expect(() => getNormalWeightRange(-175)).toThrow(
				'Height must be a positive number'
			)
		})
	})

	describe('calculateBMIResult', () => {
		it('should return complete BMI result', () => {
			const result = calculateBMIResult(70, 175)
			expect(result.bmi).toBeCloseTo(22.86, 1)
			expect(result.category).toBe('normal')
			expect(result.normalWeightRange.min).toBeCloseTo(56.7, 1)
			expect(result.normalWeightRange.max).toBeCloseTo(76.3, 1)
			expect(result.color).toBe('green')
		})

		it('should work with gender parameter', () => {
			const resultMale = calculateBMIResult(70, 175, 'male')
			const resultFemale = calculateBMIResult(70, 175, 'female')
			expect(resultMale.bmi).toBe(resultFemale.bmi)
		})
	})

	describe('validateBMIInput', () => {
		it('should validate correct input', () => {
			const result = validateBMIInput(70, 175)
			expect(result.isValid).toBe(true)
			expect(result.error).toBeUndefined()
		})

		it('should reject invalid weight', () => {
			const result = validateBMIInput(NaN, 175)
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('Weight must be a valid number')
		})

		it('should reject invalid height', () => {
			const result = validateBMIInput(70, NaN)
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('Height must be a valid number')
		})

		it('should reject zero weight', () => {
			const result = validateBMIInput(0, 175)
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('Weight must be greater than 0')
		})

		it('should reject zero height', () => {
			const result = validateBMIInput(70, 0)
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('Height must be greater than 0')
		})

		it('should reject weight > 300 kg', () => {
			const result = validateBMIInput(301, 175)
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('Weight must be less than 300 kg')
		})

		it('should reject height > 250 cm', () => {
			const result = validateBMIInput(70, 251)
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('Height must be less than 250 cm')
		})
	})

	describe('getBMICategoryColor', () => {
		it('should return correct color for each category', () => {
			expect(getBMICategoryColor('underweight')).toContain('blue')
			expect(getBMICategoryColor('normal')).toContain('green')
			expect(getBMICategoryColor('overweight')).toContain('yellow')
			expect(getBMICategoryColor('obese1')).toContain('orange')
			expect(getBMICategoryColor('obese2')).toContain('red')
			expect(getBMICategoryColor('obese3')).toContain('red')
		})
	})

	describe('getBMICategoryColorDark', () => {
		it('should return correct dark mode color for each category', () => {
			expect(getBMICategoryColorDark('underweight')).toContain('blue')
			expect(getBMICategoryColorDark('normal')).toContain('green')
			expect(getBMICategoryColorDark('overweight')).toContain('yellow')
			expect(getBMICategoryColorDark('obese1')).toContain('orange')
			expect(getBMICategoryColorDark('obese2')).toContain('red')
			expect(getBMICategoryColorDark('obese3')).toContain('red')
		})
	})

	describe('getBMIScale', () => {
		it('should return scale with correct segments', () => {
			const scale = getBMIScale()
			expect(scale).toHaveLength(6)
			expect(scale[0].label).toBe('< 18.5')
			expect(scale[1].label).toBe('18.5-24.9')
			expect(scale[2].label).toBe('25-29.9')
		})
	})

	describe('getBMIInterpretation', () => {
		it('should return interpretation for each category', () => {
			const interpretation = getBMIInterpretation('normal', 22.5)
			expect(interpretation).toContain('22.5')
			expect(interpretation).toContain('normal')
		})
	})

	describe('formatBMI', () => {
		it('should format BMI to 1 decimal place', () => {
			expect(formatBMI(22.86)).toBe('22.9')
			expect(formatBMI(25.123)).toBe('25.1')
		})
	})

	describe('getBMICategoryDescription', () => {
		it('should return description for each category', () => {
			expect(getBMICategoryDescription('underweight')).toBe('Underweight')
			expect(getBMICategoryDescription('normal')).toBe('Normal weight')
			expect(getBMICategoryDescription('overweight')).toBe('Overweight')
		})
	})
})

