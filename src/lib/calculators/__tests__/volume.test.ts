/**
 * Unit tests for Volume converter
 */
import {
	convertVolume,
	validateVolumeInput,
	formatVolumeValue,
	type VolumeInput,
	type VolumeResult,
	type VolumeUnit,
} from '@/lib/calculators/volume'

describe('Volume Converter', () => {
	describe('validateVolumeInput', () => {
		it('should validate correct input', () => {
			const result = validateVolumeInput({
				value: 100,
				fromUnit: 'liters',
				toUnit: 'gallons',
			})
			expect(result.isValid).toBe(true)
			expect(result.error).toBeUndefined()
		})

		it('should reject negative value', () => {
			const result = validateVolumeInput({
				value: -100,
				fromUnit: 'liters',
				toUnit: 'gallons',
			})
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('negativeValue')
		})

		it('should reject value too large', () => {
			const result = validateVolumeInput({
				value: 1e13,
				fromUnit: 'liters',
				toUnit: 'gallons',
			})
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('valueTooLarge')
		})

		it('should reject missing units', () => {
			const result = validateVolumeInput({
				value: 100,
				fromUnit: '' as VolumeUnit,
				toUnit: 'gallons',
			})
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('unitsRequired')
		})

		it('should reject invalid units', () => {
			const result = validateVolumeInput({
				value: 100,
				fromUnit: 'invalid' as VolumeUnit,
				toUnit: 'gallons',
			})
			expect(result.isValid).toBe(false)
			expect(result.error).toBe('invalidUnits')
		})
	})

	describe('convertVolume', () => {
		it('should convert liters to gallons correctly', () => {
			const result = convertVolume({
				value: 100,
				fromUnit: 'liters',
				toUnit: 'gallons',
			})
			expect(result.value).toBeCloseTo(26.4172, 4)
			expect(result.unit).toBe('gallons')
		})

		it('should convert gallons to liters correctly', () => {
			const result = convertVolume({
				value: 10,
				fromUnit: 'gallons',
				toUnit: 'liters',
			})
			expect(result.value).toBeCloseTo(37.8541, 4)
			expect(result.unit).toBe('liters')
		})

		it('should convert liters to m3 correctly', () => {
			const result = convertVolume({
				value: 1000,
				fromUnit: 'liters',
				toUnit: 'm3',
			})
			expect(result.value).toBe(1)
			expect(result.unit).toBe('m3')
		})

		it('should convert m3 to liters correctly', () => {
			const result = convertVolume({
				value: 1,
				fromUnit: 'm3',
				toUnit: 'liters',
			})
			expect(result.value).toBe(1000)
			expect(result.unit).toBe('liters')
		})

		it('should convert gallons to m3 correctly', () => {
			const result = convertVolume({
				value: 100,
				fromUnit: 'gallons',
				toUnit: 'm3',
			})
			expect(result.value).toBeCloseTo(0.378541, 6)
			expect(result.unit).toBe('m3')
		})

		it('should convert m3 to gallons correctly', () => {
			const result = convertVolume({
				value: 1,
				fromUnit: 'm3',
				toUnit: 'gallons',
			})
			expect(result.value).toBeCloseTo(264.172, 3)
			expect(result.unit).toBe('gallons')
		})

		it('should return same value when converting to same unit', () => {
			const result = convertVolume({
				value: 100,
				fromUnit: 'liters',
				toUnit: 'liters',
			})
			expect(result.value).toBe(100)
			expect(result.unit).toBe('liters')
		})

		it('should throw error for invalid input', () => {
			expect(() =>
				convertVolume({
					value: -100,
					fromUnit: 'liters',
					toUnit: 'gallons',
				})
			).toThrow('negativeValue')
		})
	})

	describe('formatVolumeValue', () => {
		it('should format liters correctly', () => {
			// Function removes trailing zeros, so 100.00 becomes "100"
			expect(formatVolumeValue(100, 'liters')).toBe('100')
			expect(formatVolumeValue(1000, 'liters')).toBe('1000')
			expect(formatVolumeValue(0.5, 'liters')).toBe('0.5')
		})

		it('should format gallons correctly', () => {
			// Function removes trailing zeros
			expect(formatVolumeValue(100, 'gallons')).toBe('100')
			expect(formatVolumeValue(1000, 'gallons')).toBe('1000')
			expect(formatVolumeValue(0.5, 'gallons')).toBe('0.5')
		})

		it('should format m3 correctly', () => {
			// Function removes trailing zeros
			expect(formatVolumeValue(1, 'm3')).toBe('1')
			expect(formatVolumeValue(0.5, 'm3')).toBe('0.5')
		})
	})
})

