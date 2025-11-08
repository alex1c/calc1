/**
 * Savings Calculator Library
 *
 * Provides functionality for calculating savings with different interest types.
 *
 * Features:
 * - Simple interest calculation
 * - Compound interest calculation
 * - No interest calculation
 * - Target amount calculation
 * - Monthly contribution calculation
 * - Savings schedule generation
 * - CSV export functionality
 * - Achievement month detection
 *
 * Interest types:
 * - None: No interest, simple accumulation
 * - Simple: Interest calculated only on initial amount
 * - Compound: Interest calculated on accumulated amount (including previous interest)
 *
 * Calculation methods:
 * - Compound: Uses future value of annuity formula
 * - Simple: Interest = Initial Amount × Rate × Time
 * - None: Final Amount = Initial Amount + (Monthly Contribution × Months)
 */

export interface SavingsInput {
	targetAmount?: number;
	initialAmount: number;
	termMonths: number;
	monthlyContribution?: number;
	interestRate: number;
	interestType: 'simple' | 'compound' | 'none';
}

export interface SavingsScheduleItem {
	month: number;
	startAmount: number;
	contribution: number;
	interest: number;
	endAmount: number;
}

export interface SavingsResult {
	finalAmount: number;
	totalContributions: number;
	totalInterest: number;
	monthlyContribution: number;
	achievable: boolean;
	achievementMonth?: number;
	savingsSchedule: SavingsScheduleItem[];
}

/**
 * Calculate savings with compound interest
 *
 * Calculates savings using compound interest where interest is calculated
 * on the accumulated amount (including previous interest).
 *
 * Algorithm:
 * 1. Calculates monthly interest rate
 * 2. If target amount specified without monthly contribution, calculates required contribution
 * 3. For each month:
 *    - Calculates interest on current amount
 *    - Adds monthly contribution
 *    - Updates total amount
 * 4. Tracks achievement month if target is reached
 *
 * Formula for required monthly contribution (if target specified):
 * PMT = (Target - Initial × (1+r)^n) / (((1+r)^n - 1) / r)
 *
 * @param input - Savings input parameters
 * @returns Savings result with final amount, contributions, interest, and schedule
 */
export function calculateCompoundSavings(input: SavingsInput): SavingsResult {
	const {
		targetAmount,
		initialAmount,
		termMonths,
		monthlyContribution = 0,
		interestRate,
	} = input;

	const monthlyRate = interestRate / 12 / 100;
	const schedule: SavingsScheduleItem[] = [];
	let currentAmount = initialAmount;
	let totalContributions = initialAmount;
	let totalInterest = 0;

	// If target amount is specified, calculate required monthly contribution
	let actualMonthlyContribution = monthlyContribution;
	if (targetAmount && !monthlyContribution) {
		// Calculate required monthly contribution to reach target
		if (interestRate === 0) {
			actualMonthlyContribution =
				(targetAmount - initialAmount) / termMonths;
		} else {
			// Use future value of annuity formula to solve for payment
			const futureValueFactor = Math.pow(1 + monthlyRate, termMonths);
			actualMonthlyContribution =
				(targetAmount - initialAmount * futureValueFactor) /
				((futureValueFactor - 1) / monthlyRate);
		}
	}

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
		const contribution = actualMonthlyContribution;
		const interest = currentAmount * monthlyRate;
		const endAmount = startAmount + contribution + interest;

		schedule.push({
			month,
			startAmount: Math.round(startAmount * 100) / 100,
			contribution,
			interest: Math.round(interest * 100) / 100,
			endAmount: Math.round(endAmount * 100) / 100,
		});

		currentAmount = endAmount;
		totalContributions += contribution;
		totalInterest += interest;

		// Check if target is achieved
		if (
			targetAmount &&
			currentAmount >= targetAmount &&
			!schedule.find((s) => s.month === month)?.achievementMonth
		) {
			schedule[schedule.length - 1].achievementMonth = month;
		}
	}

	const achievementMonth =
		targetAmount && currentAmount >= targetAmount
			? schedule.find((s) => s.endAmount >= targetAmount)?.month
			: undefined;

	return {
		finalAmount: Math.round(currentAmount * 100) / 100,
		totalContributions: Math.round(totalContributions * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		monthlyContribution: Math.round(actualMonthlyContribution * 100) / 100,
		achievable: !targetAmount || currentAmount >= targetAmount,
		achievementMonth,
		savingsSchedule: schedule,
	};
}

/**
 * Calculate savings without interest
 *
 * Calculates simple savings accumulation without any interest.
 * Final amount is simply initial amount plus all monthly contributions.
 *
 * Algorithm:
 * 1. If target specified without monthly contribution, calculates required contribution
 * 2. For each month: adds monthly contribution to current amount
 * 3. No interest is applied
 *
 * Formula: Final Amount = Initial Amount + (Monthly Contribution × Months)
 *
 * @param input - Savings input parameters
 * @returns Savings result with final amount, contributions, and schedule (no interest)
 */
export function calculateNoInterestSavings(input: SavingsInput): SavingsResult {
	const {
		targetAmount,
		initialAmount,
		termMonths,
		monthlyContribution = 0,
	} = input;

	const schedule: SavingsScheduleItem[] = [];
	let currentAmount = initialAmount;
	let totalContributions = initialAmount;
	let totalInterest = 0;

	// If target amount is specified, calculate required monthly contribution
	let actualMonthlyContribution = monthlyContribution;
	if (targetAmount && !monthlyContribution) {
		// For no interest: target = initial + (monthly * months)
		actualMonthlyContribution = (targetAmount - initialAmount) / termMonths;
	}

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
		const contribution = actualMonthlyContribution;
		const interest = 0; // No interest
		const endAmount = startAmount + contribution + interest;

		schedule.push({
			month,
			startAmount: Math.round(startAmount * 100) / 100,
			contribution,
			interest: Math.round(interest * 100) / 100,
			endAmount: Math.round(endAmount * 100) / 100,
		});

		currentAmount = endAmount;
		totalContributions += contribution;
		totalInterest += interest;
	}

	return {
		finalAmount: Math.round(currentAmount * 100) / 100,
		totalContributions: Math.round(totalContributions * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		monthlyContribution: Math.round(actualMonthlyContribution * 100) / 100,
		achievable: !targetAmount || currentAmount >= targetAmount,
		achievementMonth: undefined,
		savingsSchedule: schedule,
	};
}

/**
 * Calculate savings with simple interest
 *
 * Calculates savings with simple interest where interest is calculated
 * only on the initial amount, not on accumulated interest.
 *
 * Algorithm:
 * 1. Calculates monthly interest rate
 * 2. If target specified without monthly contribution, calculates required contribution
 * 3. For each month:
 *    - Calculates interest on initial amount only
 *    - Adds monthly contribution
 *    - Updates total amount
 *
 * Formula: Interest per month = Initial Amount × Monthly Rate
 *
 * @param input - Savings input parameters
 * @returns Savings result with final amount, contributions, interest, and schedule
 */
export function calculateSimpleSavings(input: SavingsInput): SavingsResult {
	const {
		targetAmount,
		initialAmount,
		termMonths,
		monthlyContribution = 0,
		interestRate,
	} = input;

	const monthlyRate = interestRate / 12 / 100;
	const schedule: SavingsScheduleItem[] = [];
	let currentAmount = initialAmount;
	let totalContributions = initialAmount;
	let totalInterest = 0;

	// If target amount is specified, calculate required monthly contribution
	let actualMonthlyContribution = monthlyContribution;
	if (targetAmount && !monthlyContribution) {
		// For simple interest: target = initial + (monthly * months) + (initial * rate * months / 12)
		actualMonthlyContribution =
			(targetAmount -
				initialAmount * (1 + (interestRate * termMonths) / 12 / 100)) /
			termMonths;
	}

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
		const contribution = actualMonthlyContribution;
		const interest = initialAmount * monthlyRate; // Simple interest on initial amount only
		const endAmount = startAmount + contribution + interest;

		schedule.push({
			month,
			startAmount: Math.round(startAmount * 100) / 100,
			contribution,
			interest: Math.round(interest * 100) / 100,
			endAmount: Math.round(endAmount * 100) / 100,
		});

		currentAmount = endAmount;
		totalContributions += contribution;
		totalInterest += interest;
	}

	return {
		finalAmount: Math.round(currentAmount * 100) / 100,
		totalContributions: Math.round(totalContributions * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		monthlyContribution: Math.round(actualMonthlyContribution * 100) / 100,
		achievable: !targetAmount || currentAmount >= targetAmount,
		achievementMonth: undefined,
		savingsSchedule: schedule,
	};
}

/**
 * Main calculation function that routes to appropriate calculation method
 *
 * Routes to the appropriate calculation function based on interest type:
 * - 'none': calculateNoInterestSavings()
 * - 'simple': calculateSimpleSavings()
 * - 'compound': calculateCompoundSavings()
 *
 * @param input - Savings input parameters
 * @returns Savings result with calculations based on interest type
 * @throws Error if interest type is invalid
 */
export function calculateSavings(input: SavingsInput): SavingsResult {
	switch (input.interestType) {
		case 'none':
			return calculateNoInterestSavings(input);
		case 'simple':
			return calculateSimpleSavings(input);
		case 'compound':
			return calculateCompoundSavings(input);
		default:
			throw new Error('Invalid interest type');
	}
}

/**
 * Generate savings schedule for display
 *
 * Generates a month-by-month schedule showing:
 * - Start amount
 * - Monthly contribution
 * - Interest earned
 * - End amount
 *
 * @param input - Savings input parameters
 * @returns Array of savings schedule items for each month
 */
export function generateSavingsSchedule(
	input: SavingsInput
): SavingsScheduleItem[] {
	const result = calculateSavings(input);
	return result.savingsSchedule;
}

/**
 * Export savings schedule to CSV format
 *
 * Converts savings schedule array to CSV string format.
 * Headers: Month, Start Amount, Contribution, Interest, End Amount
 *
 * @param schedule - Array of savings schedule items
 * @returns CSV string with headers and data rows
 */
export function exportSavingsScheduleToCSV(
	schedule: SavingsScheduleItem[]
): string {
	const headers = [
		'Month',
		'Start Amount',
		'Contribution',
		'Interest',
		'End Amount',
	];
	const rows = schedule.map((item) => [
		item.month.toString(),
		item.startAmount.toFixed(2),
		item.contribution.toFixed(2),
		item.interest.toFixed(2),
		item.endAmount.toFixed(2),
	]);

	return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

/**
 * Validate savings input parameters
 *
 * Performs validation checks:
 * - Target amount (if specified) is positive
 * - Initial amount is non-negative
 * - Term is positive and not too long (max 50 years)
 * - Monthly contribution (if specified) is non-negative
 * - Interest rate (if interest type not 'none') is between 0 and 100%
 * - Either target amount or monthly contribution must be specified
 *
 * @param input - Partial savings input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateSavingsInput(input: Partial<SavingsInput>): string[] {
	const errors: string[] = [];

	if (input.targetAmount && input.targetAmount <= 0) {
		errors.push('Target amount must be greater than 0');
	}

	if (!input.initialAmount || input.initialAmount < 0) {
		errors.push('Initial amount must be 0 or greater');
	}

	if (!input.termMonths || input.termMonths <= 0) {
		errors.push('Term must be greater than 0');
	}

	if (input.termMonths && input.termMonths > 600) {
		errors.push('Term cannot exceed 50 years (600 months)');
	}

	if (input.monthlyContribution && input.monthlyContribution < 0) {
		errors.push('Monthly contribution cannot be negative');
	}

	if (input.interestType !== 'none') {
		if (!input.interestRate || input.interestRate < 0) {
			errors.push('Interest rate must be 0 or greater');
		}

		if (input.interestRate && input.interestRate > 100) {
			errors.push('Interest rate cannot exceed 100%');
		}
	}

	// Check if either target amount or monthly contribution is provided
	if (!input.targetAmount && !input.monthlyContribution) {
		errors.push(
			'Either target amount or monthly contribution must be specified'
		);
	}

	return errors;
}

/**
 * Format currency for display
 *
 * Formats amount as Russian Ruble currency using Intl.NumberFormat.
 *
 * @param amount - Amount to format
 * @returns Formatted currency string (e.g., "1 234 ₽")
 */
export function formatSavingsCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}
