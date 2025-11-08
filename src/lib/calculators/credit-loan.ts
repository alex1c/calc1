/**
 * Credit Loan Calculator Library
 * 
 * Provides functionality for calculating loan payments using annuity and differentiated methods.
 * 
 * Features:
 * - Annuity payment calculation (fixed monthly payment)
 * - Differentiated payment calculation (decreasing monthly payment)
 * - Payment schedule generation
 * - Total interest calculation
 * - Total payment calculation
 * 
 * Payment methods:
 * - Annuity: Same payment every month, early payments have more interest
 * - Differentiated: Principal payment is constant, interest decreases over time
 * 
 * Formula for annuity payments:
 * P = [r × PV × (1 + r)^n] / [(1 + r)^n - 1]
 * where P = monthly payment, r = monthly rate, PV = principal, n = number of months
 */

/**
 * Input interface for credit loan calculation
 * Contains loan amount, interest rate, term, and payment type
 */
export interface CreditLoanInput {
	principal: number; // loan amount
	interestRate: number; // annual interest rate in %
	termMonths: number; // loan term in months
	paymentType: 'annuity' | 'differentiated';
}

export interface CreditLoanResult {
	monthlyPayment: number;
	totalPayment: number;
	totalInterest: number;
	paymentSchedule: Array<{
		month: number;
		payment: number;
		principal: number;
		interest: number;
		balance: number;
	}>;
}

/**
 * Calculate loan payments and schedule
 * 
 * Calculates monthly payments and generates payment schedule based on payment type.
 * 
 * For annuity payments:
 * - Uses standard annuity formula
 * - Generates schedule showing principal and interest breakdown
 * 
 * For differentiated payments:
 * - Principal payment is constant (principal / term)
 * - Interest decreases as balance decreases
 * - Monthly payment decreases over time
 * 
 * @param input - Credit loan input parameters
 * @returns Credit loan result with monthly payment, total payment, interest, and schedule
 */
export function calculateCreditLoan(input: CreditLoanInput): CreditLoanResult {
	const monthlyRate = input.interestRate / 100 / 12;
	const termMonths = input.termMonths;

	let monthlyPayment: number;
	let paymentSchedule: Array<{
		month: number;
		payment: number;
		principal: number;
		interest: number;
		balance: number;
	}> = [];

	if (input.paymentType === 'annuity') {
		// Annuity payment formula
		monthlyPayment =
			(input.principal *
				(monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
			(Math.pow(1 + monthlyRate, termMonths) - 1);

		// Calculate payment schedule
		let balance = input.principal;
		for (let month = 1; month <= termMonths; month++) {
			const interest = balance * monthlyRate;
			const principal = monthlyPayment - interest;
			balance -= principal;

			paymentSchedule.push({
				month,
				payment: monthlyPayment,
				principal: Math.round(principal * 100) / 100,
				interest: Math.round(interest * 100) / 100,
				balance: Math.round(Math.max(0, balance) * 100) / 100,
			});
		}
	} else {
		// Differentiated payment
		const principalPayment = input.principal / termMonths;
		let balance = input.principal;

		for (let month = 1; month <= termMonths; month++) {
			const interest = balance * monthlyRate;
			const payment = principalPayment + interest;
			balance -= principalPayment;

			paymentSchedule.push({
				month,
				payment: Math.round(payment * 100) / 100,
				principal: Math.round(principalPayment * 100) / 100,
				interest: Math.round(interest * 100) / 100,
				balance: Math.round(Math.max(0, balance) * 100) / 100,
			});
		}

		// For differentiated payments, monthly payment varies
		monthlyPayment = paymentSchedule[0].payment;
	}

	const totalPayment = paymentSchedule.reduce(
		(sum, payment) => sum + payment.payment,
		0
	);
	const totalInterest = totalPayment - input.principal;

	return {
		monthlyPayment: Math.round(monthlyPayment * 100) / 100,
		totalPayment: Math.round(totalPayment * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		paymentSchedule,
	};
}






















