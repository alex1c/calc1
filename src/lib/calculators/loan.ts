/**
 * Loan Calculation Library
 * 
 * Provides comprehensive loan calculation functionality for credit calculators.
 * Supports two payment methods:
 * 
 * 1. Annuity Payments (Fixed Monthly Payment):
 *    - Same payment amount every month
 *    - Early payments: more interest, less principal
 *    - Later payments: less interest, more principal
 *    - Formula: P = [r × PV × (1 + r)^n] / [(1 + r)^n - 1]
 * 
 * 2. Differentiated Payments (Decreasing Monthly Payment):
 *    - Principal payment is constant
 *    - Interest decreases as balance decreases
 *    - Monthly payment decreases over time
 *    - First payment is highest, last payment is lowest
 * 
 * Features:
 * - Down payment support
 * - Additional monthly payments (early payoff)
 * - Detailed payment schedule generation
 * - Early payoff detection
 * - CSV export functionality
 */

/**
 * Input interface for loan calculation
 * Contains all parameters needed to calculate loan payments
 */
export interface LoanInput {
	loanAmount: number; // Total loan amount
	termYears: number; // Loan term in years
	termMonths: number; // Loan term in months (added to years)
	interestRate: number; // Annual interest rate (as percentage, e.g., 5 for 5%)
	downPayment?: number; // Optional down payment (reduces loan amount)
	additionalPayment?: number; // Optional additional monthly payment (for early payoff)
	paymentType: 'annuity' | 'differentiated'; // Payment calculation method
}

/**
 * Schedule item interface for monthly payment breakdown
 * Represents one month in the payment schedule
 */
export interface PaymentScheduleItem {
	month: number; // Month number (1, 2, 3, ...)
	payment: number; // Total payment for this month
	interest: number; // Interest portion of payment
	principal: number; // Principal portion of payment
	balance: number; // Remaining loan balance after payment
}

/**
 * Result interface for loan calculation
 * Contains payment amounts and detailed schedule
 */
export interface LoanResult {
	monthlyPayment: number; // Monthly payment amount (first payment for differentiated)
	totalPayments: number; // Total amount paid over loan term
	totalInterest: number; // Total interest paid over loan term
	effectiveTerm: number; // Actual term in months (may be shorter with additional payments)
	paymentSchedule: PaymentScheduleItem[]; // Month-by-month payment breakdown
}

/**
 * Calculate annuity loan payments (fixed monthly payment)
 * 
 * Annuity loans have a fixed monthly payment throughout the loan term.
 * The payment amount is calculated using the annuity formula, which ensures
 * that the loan is fully paid off by the end of the term.
 * 
 * Payment structure:
 * - Early months: Higher interest portion, lower principal portion
 * - Later months: Lower interest portion, higher principal portion
 * - Total payment remains constant (excluding additional payments)
 * 
 * Formula: P = [r × PV × (1 + r)^n] / [(1 + r)^n - 1]
 * Where:
 * - P = monthly payment
 * - r = monthly interest rate
 * - PV = present value (loan amount)
 * - n = number of payments
 * 
 * @param input - Loan input parameters
 * @returns Loan result with fixed monthly payment and schedule
 */
export function calculateAnnuityLoan(input: LoanInput): LoanResult {
	const {
		loanAmount,
		termMonths,
		interestRate,
		additionalPayment = 0,
	} = input;
	const monthlyRate = interestRate / 100 / 12; // Convert annual % to monthly decimal
	const effectiveLoanAmount = loanAmount - (input.downPayment || 0); // Subtract down payment

	// Calculate base monthly payment using annuity formula
	// Special case: if rate is 0, simply divide loan by term
	const baseMonthlyPayment =
		monthlyRate === 0
			? effectiveLoanAmount / termMonths
			: (effectiveLoanAmount *
					monthlyRate *
					Math.pow(1 + monthlyRate, termMonths)) /
			  (Math.pow(1 + monthlyRate, termMonths) - 1);

	// Add additional payment if specified (for early payoff)
	const totalMonthlyPayment = baseMonthlyPayment + additionalPayment;

	// Generate month-by-month payment schedule
	const schedule: PaymentScheduleItem[] = [];
	let balance = effectiveLoanAmount;
	let totalPayments = 0;
	let totalInterest = 0;
	let effectiveTerm = 0;

	for (let month = 1; month <= termMonths; month++) {
		// Calculate interest portion (on remaining balance)
		const interestPayment = balance * monthlyRate;
		
		// Calculate principal portion (remaining payment after interest)
		// Ensure we don't pay more than remaining balance
		const principalPayment = Math.min(
			totalMonthlyPayment - interestPayment,
			balance
		);
		const actualPayment = principalPayment + interestPayment;

		balance -= principalPayment;
		totalPayments += actualPayment;
		totalInterest += interestPayment;
		effectiveTerm = month;

		schedule.push({
			month,
			payment: actualPayment,
			interest: interestPayment,
			principal: principalPayment,
			balance: Math.max(0, balance), // Ensure balance doesn't go negative
		});

		// Early payoff detection: if balance is essentially zero, stop
		if (balance <= 0.01) {
			break;
		}
	}

	return {
		monthlyPayment: totalMonthlyPayment,
		totalPayments,
		totalInterest,
		effectiveTerm,
		paymentSchedule: schedule,
	};
}

/**
 * Calculate differentiated loan payments (decreasing monthly payment)
 * 
 * Differentiated loans have a constant principal payment with decreasing interest.
 * The monthly payment decreases over time as the interest portion shrinks.
 * 
 * Payment structure:
 * - Principal payment: Constant (loan amount / number of months)
 * - Interest payment: Decreasing (calculated on remaining balance)
 * - Total payment: Decreasing (principal + interest)
 * - First payment: Highest (includes interest on full loan amount)
 * - Last payment: Lowest (includes interest on small remaining balance)
 * 
 * Advantages:
 * - Lower total interest paid compared to annuity loans
 * - Faster principal reduction
 * - Payment decreases over time
 * 
 * Disadvantages:
 * - Higher initial payments
 * - More complex budgeting
 * 
 * @param input - Loan input parameters
 * @returns Loan result with first payment amount and decreasing schedule
 */
export function calculateDifferentiatedLoan(input: LoanInput): LoanResult {
	const {
		loanAmount,
		termMonths,
		interestRate,
		additionalPayment = 0,
	} = input;
	const monthlyRate = interestRate / 100 / 12; // Convert annual % to monthly decimal
	const effectiveLoanAmount = loanAmount - (input.downPayment || 0); // Subtract down payment
	
	// Principal payment is constant: divide loan amount by number of months
	const basePrincipalPayment = effectiveLoanAmount / termMonths;

	// Generate month-by-month payment schedule
	const schedule: PaymentScheduleItem[] = [];
	let balance = effectiveLoanAmount;
	let totalPayments = 0;
	let totalInterest = 0;
	let effectiveTerm = 0;

	for (let month = 1; month <= termMonths; month++) {
		// Interest calculated on remaining balance (decreases each month)
		const interestPayment = balance * monthlyRate;
		
		// Principal payment is constant (base amount)
		const principalPayment = Math.min(basePrincipalPayment, balance);
		
		// Additional payment goes directly to principal (if specified)
		const additionalPrincipal = Math.min(
			additionalPayment,
			balance - principalPayment // Don't exceed remaining balance
		);
		const totalPrincipalPayment = principalPayment + additionalPrincipal;
		const totalPayment = totalPrincipalPayment + interestPayment;

		balance -= totalPrincipalPayment;
		totalPayments += totalPayment;
		totalInterest += interestPayment;
		effectiveTerm = month;

		schedule.push({
			month,
			payment: totalPayment,
			interest: interestPayment,
			principal: totalPrincipalPayment,
			balance: Math.max(0, balance), // Ensure balance doesn't go negative
		});

		// Early payoff detection: if balance is essentially zero, stop
		if (balance <= 0.01) {
			break;
		}
	}

	// For differentiated loans, return first payment as monthlyPayment
	// (since payments decrease over time)
	const firstPayment = schedule[0]?.payment || 0;

	return {
		monthlyPayment: firstPayment,
		totalPayments,
		totalInterest,
		effectiveTerm,
		paymentSchedule: schedule,
	};
}

/**
 * Generate payment schedule for both loan types
 * 
 * Convenience function that returns only the payment schedule
 * without calculating other result fields. Routes to the appropriate
 * calculation function based on payment type.
 * 
 * @param input - Loan input parameters
 * @returns Array of payment schedule items
 */
export function generatePaymentSchedule(
	input: LoanInput
): PaymentScheduleItem[] {
	if (input.paymentType === 'annuity') {
		return calculateAnnuityLoan(input).paymentSchedule;
	} else {
		return calculateDifferentiatedLoan(input).paymentSchedule;
	}
}

/**
 * Calculate loan with specified payment type
 * 
 * Main entry point for loan calculations. Routes to the appropriate
 * calculation function based on payment type (annuity or differentiated).
 * 
 * @param input - Loan input parameters
 * @returns Complete loan result with payment amounts and schedule
 */
export function calculateLoan(input: LoanInput): LoanResult {
	if (input.paymentType === 'annuity') {
		return calculateAnnuityLoan(input);
	} else {
		return calculateDifferentiatedLoan(input);
	}
}

/**
 * Export payment schedule as CSV
 * 
 * Converts the payment schedule into CSV format for download or export.
 * Useful for users who want to analyze the schedule in spreadsheet software.
 * 
 * CSV format:
 * - Header row: Month, Payment, Interest, Principal, Balance
 * - Data rows with comma-separated values
 * - All monetary values formatted to 2 decimal places
 * 
 * @param schedule - Array of payment schedule items
 * @returns CSV string ready for download
 */
export function exportPaymentScheduleToCSV(
	schedule: PaymentScheduleItem[]
): string {
	const headers = ['Month', 'Payment', 'Interest', 'Principal', 'Balance'];
	const rows = schedule.map((item) => [
		item.month,
		item.payment.toFixed(2),
		item.interest.toFixed(2),
		item.principal.toFixed(2),
		item.balance.toFixed(2),
	]);

	return [headers, ...rows].map((row) => row.join(',')).join('\n');
}

/**
 * Validate loan input parameters
 * 
 * Performs comprehensive validation of loan input parameters:
 * - Loan amount must be positive
 * - Term must be between 1 month and 30 years (360 months)
 * - Interest rate must be between 0% and 100%
 * - Down payment cannot be negative or exceed loan amount
 * - Additional payment cannot be negative
 * 
 * Returns array of error messages for invalid inputs.
 * Empty array indicates all inputs are valid.
 * 
 * @param input - Partial loan input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateLoanInput(input: Partial<LoanInput>): string[] {
	const errors: string[] = [];

	if (!input.loanAmount || input.loanAmount <= 0) {
		errors.push('Loan amount must be greater than 0');
	}

	// Calculate total term in months from years and months
	const totalTermMonths =
		(input.termYears || 0) * 12 + (input.termMonths || 0);

	if (totalTermMonths < 1 || totalTermMonths > 360) {
		errors.push('Loan term must be between 1 month and 30 years');
	}

	if (
		input.interestRate === undefined ||
		input.interestRate < 0 ||
		input.interestRate > 100
	) {
		errors.push('Interest rate must be between 0% and 100%');
	}

	if (input.downPayment && input.downPayment < 0) {
		errors.push('Down payment cannot be negative');
	}

	if (input.downPayment && input.downPayment >= input.loanAmount) {
		errors.push(
			'Down payment cannot be greater than or equal to loan amount'
		);
	}

	if (input.additionalPayment && input.additionalPayment < 0) {
		errors.push('Additional payment cannot be negative');
	}

	return errors;
}
