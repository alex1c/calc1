/**
 * Loan calculation library for credit calculators
 * Supports both annuity and differentiated payment methods
 */

export interface LoanInput {
	loanAmount: number;
	termYears: number;
	termMonths: number;
	interestRate: number;
	downPayment?: number;
	additionalPayment?: number;
	paymentType: 'annuity' | 'differentiated';
}

export interface PaymentScheduleItem {
	month: number;
	payment: number;
	interest: number;
	principal: number;
	balance: number;
}

export interface LoanResult {
	monthlyPayment: number;
	totalPayments: number;
	totalInterest: number;
	effectiveTerm: number;
	paymentSchedule: PaymentScheduleItem[];
}

/**
 * Calculate annuity loan payments (fixed monthly payment)
 */
export function calculateAnnuityLoan(input: LoanInput): LoanResult {
	const {
		loanAmount,
		termMonths,
		interestRate,
		additionalPayment = 0,
	} = input;
	const monthlyRate = interestRate / 100 / 12;
	const effectiveLoanAmount = loanAmount - (input.downPayment || 0);

	// Calculate base monthly payment
	const baseMonthlyPayment =
		monthlyRate === 0
			? effectiveLoanAmount / termMonths
			: (effectiveLoanAmount *
					monthlyRate *
					Math.pow(1 + monthlyRate, termMonths)) /
			  (Math.pow(1 + monthlyRate, termMonths) - 1);

	const totalMonthlyPayment = baseMonthlyPayment + additionalPayment;

	// Calculate payment schedule
	const schedule: PaymentScheduleItem[] = [];
	let balance = effectiveLoanAmount;
	let totalPayments = 0;
	let totalInterest = 0;
	let effectiveTerm = 0;

	for (let month = 1; month <= termMonths; month++) {
		const interestPayment = balance * monthlyRate;
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
			balance: Math.max(0, balance),
		});

		// If balance is paid off early due to additional payments
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
 */
export function calculateDifferentiatedLoan(input: LoanInput): LoanResult {
	const {
		loanAmount,
		termMonths,
		interestRate,
		additionalPayment = 0,
	} = input;
	const monthlyRate = interestRate / 100 / 12;
	const effectiveLoanAmount = loanAmount - (input.downPayment || 0);
	const basePrincipalPayment = effectiveLoanAmount / termMonths;

	// Calculate payment schedule
	const schedule: PaymentScheduleItem[] = [];
	let balance = effectiveLoanAmount;
	let totalPayments = 0;
	let totalInterest = 0;
	let effectiveTerm = 0;

	for (let month = 1; month <= termMonths; month++) {
		const interestPayment = balance * monthlyRate;
		const principalPayment = Math.min(basePrincipalPayment, balance);
		const additionalPrincipal = Math.min(
			additionalPayment,
			balance - principalPayment
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
			balance: Math.max(0, balance),
		});

		// If balance is paid off early due to additional payments
		if (balance <= 0.01) {
			break;
		}
	}

	// First payment is the highest for differentiated loans
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
