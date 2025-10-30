/**
 * Loan overpayment calculator
 * Calculates overpayment amount and percentage for loans
 */

import { LoanInput, calculateLoan, LoanResult } from './loan';

export interface LoanOverpaymentInput {
	loanAmount: number;
	termYears: number;
	termMonths: number;
	interestRate: number;
	downPayment?: number;
	additionalPayment?: number;
	paymentType: 'annuity' | 'differentiated';
}

export interface LoanOverpaymentResult {
	// Input values
	loanAmount: number;
	effectiveLoanAmount: number;
	termMonths: number;
	interestRate: number;
	downPayment: number;

	// Loan calculation results
	monthlyPayment: number;
	totalPayments: number;
	totalInterest: number;
	effectiveTerm: number;

	// Overpayment calculations
	overpaymentAmount: number; // Total overpayment (totalInterest)
	overpaymentPercentage: number; // Overpayment as percentage of loan amount
	totalCost: number; // loanAmount + overpaymentAmount

	// Breakdown
	principalPaid: number; // Total principal paid
	interestPaid: number; // Same as overpaymentAmount
}

/**
 * Validate loan overpayment input
 */
export function validateLoanOverpaymentInput(
	input: Partial<LoanOverpaymentInput>
): string[] {
	const errors: string[] = [];

	if (!input.loanAmount || input.loanAmount <= 0) {
		errors.push('Сумма кредита должна быть больше 0');
	}

	if (
		(!input.termYears || input.termYears <= 0) &&
		(!input.termMonths || input.termMonths <= 0)
	) {
		errors.push('Срок кредита должен быть больше 0');
	}

	const totalMonths = (input.termYears || 0) * 12 + (input.termMonths || 0);
	if (totalMonths <= 0) {
		errors.push('Общий срок кредита должен быть больше 0 месяцев');
	}
	if (totalMonths > 600) {
		errors.push('Срок кредита не может превышать 50 лет');
	}

	if (!input.interestRate || input.interestRate < 0) {
		errors.push('Процентная ставка должна быть больше или равна 0');
	}
	if (input.interestRate && input.interestRate > 1000) {
		errors.push('Процентная ставка не может превышать 1000%');
	}

	if (input.downPayment && input.downPayment < 0) {
		errors.push('Первоначальный взнос не может быть отрицательным');
	}
	if (
		input.downPayment &&
		input.loanAmount &&
		input.downPayment >= input.loanAmount
	) {
		errors.push(
			'Первоначальный взнос не может быть больше или равен сумме кредита'
		);
	}

	if (input.additionalPayment && input.additionalPayment < 0) {
		errors.push('Дополнительный платёж не может быть отрицательным');
	}

	return errors;
}

/**
 * Calculate loan overpayment
 */
export function calculateLoanOverpayment(
	input: LoanOverpaymentInput
): LoanOverpaymentResult {
	const {
		loanAmount,
		termYears,
		termMonths,
		interestRate,
		downPayment = 0,
		additionalPayment = 0,
		paymentType,
	} = input;

	const effectiveLoanAmount = loanAmount - downPayment;
	const totalTermMonths = termYears * 12 + termMonths;

	// Calculate loan using existing loan calculator
	const loanInput = {
		loanAmount,
		termYears: 0,
		termMonths: totalTermMonths,
		interestRate,
		downPayment,
		additionalPayment,
		paymentType,
	};

	const loanResult: LoanResult = calculateLoan(loanInput);

	// Calculate principal paid (should equal effectiveLoanAmount)
	const principalPaid = effectiveLoanAmount;

	// Overpayment is the total interest paid
	const overpaymentAmount = loanResult.totalInterest;

	// Calculate overpayment as percentage
	const overpaymentPercentage =
		effectiveLoanAmount > 0
			? (overpaymentAmount / effectiveLoanAmount) * 100
			: 0;

	// Total cost is loan amount plus overpayment
	const totalCost = loanAmount + overpaymentAmount;

	return {
		loanAmount,
		effectiveLoanAmount,
		termMonths: totalTermMonths,
		interestRate,
		downPayment,
		monthlyPayment: loanResult.monthlyPayment,
		totalPayments: loanResult.totalPayments,
		totalInterest: loanResult.totalInterest,
		effectiveTerm: loanResult.effectiveTerm,
		overpaymentAmount,
		overpaymentPercentage,
		totalCost,
		principalPaid,
		interestPaid: overpaymentAmount,
	};
}
