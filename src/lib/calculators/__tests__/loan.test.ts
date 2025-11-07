/**
 * Unit tests for Loan calculator
 */
import {
	calculateAnnuityLoan,
	calculateDifferentiatedLoan,
	calculateLoan,
	validateLoanInput,
	exportPaymentScheduleToCSV,
	type LoanInput,
	type LoanResult,
} from '@/lib/calculators/loan'

describe('Loan Calculator', () => {
	const baseLoanInput: LoanInput = {
		loanAmount: 100000,
		termYears: 5,
		termMonths: 60, // 5 years = 60 months
		interestRate: 10,
		paymentType: 'annuity',
	}

	describe('calculateAnnuityLoan', () => {
		it('should calculate annuity loan correctly', () => {
			const result = calculateAnnuityLoan(baseLoanInput)
			expect(result.monthlyPayment).toBeGreaterThan(0)
			expect(result.totalPayments).toBeGreaterThan(0)
			expect(result.totalInterest).toBeGreaterThan(0)
			expect(result.effectiveTerm).toBe(60)
			expect(result.paymentSchedule).toHaveLength(60)
		})

		it('should handle down payment correctly', () => {
			const input = { ...baseLoanInput, downPayment: 20000 }
			const result = calculateAnnuityLoan(input)
			expect(result.paymentSchedule[0].balance).toBeLessThan(100000)
		})

		it('should handle additional payment correctly', () => {
			const input = { ...baseLoanInput, additionalPayment: 100 }
			const result = calculateAnnuityLoan(input)
			expect(result.monthlyPayment).toBeGreaterThan(
				calculateAnnuityLoan(baseLoanInput).monthlyPayment
			)
		})

		it('should handle zero interest rate', () => {
			const input = { ...baseLoanInput, interestRate: 0 }
			const result = calculateAnnuityLoan(input)
			expect(result.totalInterest).toBe(0)
			expect(result.monthlyPayment).toBeCloseTo(100000 / 60, 2)
		})

		it('should pay off early with large additional payments', () => {
			const input = {
				...baseLoanInput,
				additionalPayment: 5000,
			}
			const result = calculateAnnuityLoan(input)
			expect(result.effectiveTerm).toBeLessThan(60)
		})
	})

	describe('calculateDifferentiatedLoan', () => {
		it('should calculate differentiated loan correctly', () => {
			const input = { ...baseLoanInput, paymentType: 'differentiated' }
			const result = calculateDifferentiatedLoan(input)
			expect(result.monthlyPayment).toBeGreaterThan(0)
			expect(result.totalPayments).toBeGreaterThan(0)
			expect(result.totalInterest).toBeGreaterThan(0)
			expect(result.effectiveTerm).toBe(60)
			expect(result.paymentSchedule).toHaveLength(60)
		})

		it('should have decreasing payments', () => {
			const input = { ...baseLoanInput, paymentType: 'differentiated' }
			const result = calculateDifferentiatedLoan(input)
			const firstPayment = result.paymentSchedule[0].payment
			const lastPayment =
				result.paymentSchedule[result.paymentSchedule.length - 1].payment
			expect(firstPayment).toBeGreaterThan(lastPayment)
		})

		it('should handle down payment correctly', () => {
			const input = {
				...baseLoanInput,
				paymentType: 'differentiated',
				downPayment: 20000,
			}
			const result = calculateDifferentiatedLoan(input)
			expect(result.paymentSchedule[0].balance).toBeLessThan(100000)
		})

		it('should handle additional payment correctly', () => {
			const input = {
				...baseLoanInput,
				paymentType: 'differentiated',
				additionalPayment: 100,
			}
			const result = calculateDifferentiatedLoan(input)
			const baseResult = calculateDifferentiatedLoan({
				...baseLoanInput,
				paymentType: 'differentiated',
			})
			// Additional payment should reduce total payments (pay off faster)
			expect(result.totalPayments).toBeLessThanOrEqual(baseResult.totalPayments)
		})
	})

	describe('calculateLoan', () => {
		it('should calculate annuity loan when paymentType is annuity', () => {
			const result = calculateLoan(baseLoanInput)
			expect(result.paymentSchedule).toHaveLength(60)
		})

		it('should calculate differentiated loan when paymentType is differentiated', () => {
			const input = { ...baseLoanInput, paymentType: 'differentiated' }
			const result = calculateLoan(input)
			expect(result.paymentSchedule).toHaveLength(60)
			const firstPayment = result.paymentSchedule[0].payment
			const lastPayment =
				result.paymentSchedule[result.paymentSchedule.length - 1].payment
			expect(firstPayment).toBeGreaterThan(lastPayment)
		})
	})

	describe('validateLoanInput', () => {
		it('should validate correct input', () => {
			const errors = validateLoanInput(baseLoanInput)
			expect(errors).toHaveLength(0)
		})

		it('should reject zero loan amount', () => {
			const errors = validateLoanInput({ ...baseLoanInput, loanAmount: 0 })
			expect(errors).toContain('Loan amount must be greater than 0')
		})

		it('should reject negative loan amount', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				loanAmount: -1000,
			})
			expect(errors).toContain('Loan amount must be greater than 0')
		})

		it('should reject term less than 1 month', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				termYears: 0,
				termMonths: 0,
			})
			expect(errors).toContain(
				'Loan term must be between 1 month and 30 years'
			)
		})

		it('should reject term greater than 30 years', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				termYears: 31,
				termMonths: 0,
			})
			expect(errors).toContain(
				'Loan term must be between 1 month and 30 years'
			)
		})

		it('should reject negative interest rate', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				interestRate: -1,
			})
			expect(errors).toContain('Interest rate must be between 0% and 100%')
		})

		it('should reject interest rate greater than 100%', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				interestRate: 101,
			})
			expect(errors).toContain('Interest rate must be between 0% and 100%')
		})

		it('should reject negative down payment', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				downPayment: -1000,
			})
			expect(errors).toContain('Down payment cannot be negative')
		})

		it('should reject down payment >= loan amount', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				downPayment: 100000,
			})
			expect(errors).toContain(
				'Down payment cannot be greater than or equal to loan amount'
			)
		})

		it('should reject negative additional payment', () => {
			const errors = validateLoanInput({
				...baseLoanInput,
				additionalPayment: -100,
			})
			expect(errors).toContain('Additional payment cannot be negative')
		})
	})

	describe('exportPaymentScheduleToCSV', () => {
		it('should export payment schedule to CSV format', () => {
			const result = calculateAnnuityLoan(baseLoanInput)
			const csv = exportPaymentScheduleToCSV(result.paymentSchedule)
			expect(csv).toContain('Month')
			expect(csv).toContain('Payment')
			expect(csv).toContain('Interest')
			expect(csv).toContain('Principal')
			expect(csv).toContain('Balance')
			expect(csv.split('\n').length).toBeGreaterThan(60)
		})

		it('should handle empty schedule', () => {
			const csv = exportPaymentScheduleToCSV([])
			expect(csv).toContain('Month')
			expect(csv.split('\n').length).toBe(1)
		})
	})
})

