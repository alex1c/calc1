/**
 * Deposit Calculation Library
 * 
 * Provides comprehensive deposit calculation functionality for various deposit types:
 * - Simple deposits: Interest calculated on initial principal only
 * - Capitalized deposits: Interest added to principal at specified intervals
 * - Compound deposits: Interest compounded monthly with principal
 * 
 * Features:
 * - Monthly additions and withdrawals support
 * - Detailed payment schedule generation
 * - Effective interest rate calculation
 * - Multi-currency support (RUB, USD, EUR)
 * - CSV export functionality
 * 
 * All calculations use monthly compounding periods and generate
 * detailed schedules showing month-by-month balance changes.
 */

/**
 * Input interface for deposit calculation
 * Contains all parameters needed to calculate deposit growth
 */
export interface DepositInput {
	amount: number; // Initial deposit amount
	termMonths: number; // Deposit term in months
	interestRate: number; // Annual interest rate (as percentage, e.g., 5 for 5%)
	depositType: 'simple' | 'capitalized' | 'compound'; // Type of deposit calculation
	capitalizationPeriod?: 'monthly' | 'quarterly' | 'yearly'; // For capitalized deposits only
	monthlyAddition?: number; // Optional monthly additions to deposit
	monthlyWithdrawal?: number; // Optional monthly withdrawals from deposit
	currency: 'RUB' | 'USD' | 'EUR'; // Currency for formatting
}

/**
 * Schedule item interface for monthly deposit breakdown
 * Represents one month in the deposit schedule
 */
export interface DepositScheduleItem {
	month: number; // Month number (1, 2, 3, ...)
	startAmount: number; // Balance at start of month
	interestEarned: number; // Interest earned during the month
	addition: number; // Additional funds added this month
	withdrawal: number; // Funds withdrawn this month
	endAmount: number; // Balance at end of month
}

/**
 * Result interface for deposit calculation
 * Contains final amounts and detailed schedule
 */
export interface DepositResult {
	finalAmount: number; // Final deposit amount after term
	totalInterest: number; // Total interest earned over term
	effectiveRate: number; // Effective annual interest rate (%)
	depositSchedule: DepositScheduleItem[]; // Month-by-month breakdown
}

/**
 * Calculate simple deposit (no capitalization)
 * 
 * Simple interest is calculated only on the initial principal amount.
 * Interest is not added to the principal, so it doesn't compound.
 * 
 * Formula: Interest = Principal × Rate × Time
 * 
 * This method:
 * - Calculates monthly interest on current balance
 * - Applies monthly additions and withdrawals
 * - Generates detailed month-by-month schedule
 * - Effective rate equals nominal rate (no compounding effect)
 * 
 * @param input - Deposit input parameters
 * @returns Deposit result with final amount, total interest, and schedule
 */
export function calculateSimpleDeposit(input: DepositInput): DepositResult {
	const {
		amount,
		termMonths,
		interestRate,
		monthlyAddition = 0,
		monthlyWithdrawal = 0,
	} = input;

	// Convert annual rate to monthly rate (divide by 12 and convert % to decimal)
	const monthlyRate = interestRate / 12 / 100;
	
	// Calculate total interest on initial principal only (simple interest)
	const totalInterest = amount * monthlyRate * termMonths;
	const totalAdditions = monthlyAddition * termMonths;
	const totalWithdrawals = monthlyWithdrawal * termMonths;
	const finalAmount =
		amount + totalInterest + totalAdditions - totalWithdrawals;

	// Generate month-by-month schedule
	const schedule: DepositScheduleItem[] = [];
	let currentAmount = amount;

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
		// Interest calculated on current balance (includes additions)
		const interestEarned = currentAmount * monthlyRate;
		const addition = monthlyAddition;
		const withdrawal = monthlyWithdrawal;
		const endAmount = startAmount + interestEarned + addition - withdrawal;

		schedule.push({
			month,
			startAmount: Math.round(startAmount * 100) / 100,
			interestEarned: Math.round(interestEarned * 100) / 100,
			addition,
			withdrawal,
			endAmount: Math.round(endAmount * 100) / 100,
		});

		currentAmount = endAmount;
	}

	return {
		finalAmount: Math.round(finalAmount * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		effectiveRate: interestRate, // No compounding, so effective = nominal
		depositSchedule: schedule,
	};
}

/**
 * Calculate capitalized deposit (interest added to principal at specified intervals)
 * 
 * Capitalized deposits add earned interest to the principal at regular intervals
 * (monthly, quarterly, or yearly). This allows interest to earn interest,
 * but only at the capitalization frequency.
 * 
 * Key differences from compound:
 * - Interest is added to principal only at capitalization periods
 * - Between capitalization periods, interest is calculated but not added
 * - Effective rate is higher than simple but lower than monthly compound
 * 
 * @param input - Deposit input parameters including capitalization period
 * @returns Deposit result with effective rate accounting for capitalization
 */
export function calculateCapitalizedDeposit(
	input: DepositInput
): DepositResult {
	const {
		amount,
		termMonths,
		interestRate,
		capitalizationPeriod = 'monthly',
		monthlyAddition = 0,
		monthlyWithdrawal = 0,
	} = input;

	const schedule: DepositScheduleItem[] = [];
	let currentAmount = amount;

	// Determine capitalization frequency in months
	// Monthly = every 1 month, Quarterly = every 3 months, Yearly = every 12 months
	const capitalizationMonths =
		capitalizationPeriod === 'monthly'
			? 1
			: capitalizationPeriod === 'quarterly'
			? 3
			: 12;

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
		const monthlyRate = interestRate / 12 / 100;
		let interestEarned = currentAmount * monthlyRate;
		const addition = monthlyAddition;
		const withdrawal = monthlyWithdrawal;

		// Apply capitalization if it's the right month
		// Interest is added to principal, making it available for next period
		if (month % capitalizationMonths === 0) {
			currentAmount += interestEarned;
			interestEarned = 0; // Interest is capitalized, not paid out
		}

		const endAmount =
			currentAmount + interestEarned + addition - withdrawal;

		schedule.push({
			month,
			startAmount: Math.round(startAmount * 100) / 100,
			interestEarned: Math.round(interestEarned * 100) / 100,
			addition,
			withdrawal,
			endAmount: Math.round(endAmount * 100) / 100,
		});

		currentAmount = endAmount;
	}

	// Calculate total interest from schedule
	const totalInterest = schedule.reduce(
		(sum, item) => sum + item.interestEarned,
		0
	);
	
	// Calculate effective annual rate accounting for capitalization
	// Formula: ((Final/Initial)^(12/months) - 1) × 100
	const effectiveRate =
		((currentAmount / amount) ** (12 / termMonths) - 1) * 100;

	return {
		finalAmount: Math.round(currentAmount * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		effectiveRate: Math.round(effectiveRate * 100) / 100,
		depositSchedule: schedule,
	};
}

/**
 * Calculate compound deposit (interest compounded monthly)
 * 
 * Compound deposits add interest to principal every month, allowing
 * interest to earn interest continuously. This provides the highest
 * effective rate for the same nominal rate.
 * 
 * Formula: A = P(1 + r/n)^(nt)
 * Where:
 * - A = final amount
 * - P = principal
 * - r = annual rate
 * - n = compounding frequency (12 for monthly)
 * - t = time in years
 * 
 * Each month:
 * - Interest is calculated on current balance
 * - Interest is immediately added to principal
 * - Next month's interest includes previous month's interest
 * 
 * @param input - Deposit input parameters
 * @returns Deposit result with highest effective rate due to monthly compounding
 */
export function calculateCompoundDeposit(input: DepositInput): DepositResult {
	const {
		amount,
		termMonths,
		interestRate,
		monthlyAddition = 0,
		monthlyWithdrawal = 0,
	} = input;

	const schedule: DepositScheduleItem[] = [];
	let currentAmount = amount;
	const monthlyRate = interestRate / 12 / 100; // Monthly interest rate

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
		// Interest calculated on current balance (includes previous interest)
		const interestEarned = currentAmount * monthlyRate;
		const addition = monthlyAddition;
		const withdrawal = monthlyWithdrawal;
		// Interest is added to balance immediately (compounded)
		const endAmount = startAmount + interestEarned + addition - withdrawal;

		schedule.push({
			month,
			startAmount: Math.round(startAmount * 100) / 100,
			interestEarned: Math.round(interestEarned * 100) / 100,
			addition,
			withdrawal,
			endAmount: Math.round(endAmount * 100) / 100,
		});

		currentAmount = endAmount;
	}

	// Sum all interest earned over the term
	const totalInterest = schedule.reduce(
		(sum, item) => sum + item.interestEarned,
		0
	);
	
	// Calculate effective annual rate accounting for monthly compounding
	// This shows the true annual return rate
	const effectiveRate =
		((currentAmount / amount) ** (12 / termMonths) - 1) * 100;

	return {
		finalAmount: Math.round(currentAmount * 100) / 100,
		totalInterest: Math.round(totalInterest * 100) / 100,
		effectiveRate: Math.round(effectiveRate * 100) / 100,
		depositSchedule: schedule,
	};
}

/**
 * Main calculation function that routes to appropriate calculation method
 * 
 * This is the primary entry point for deposit calculations.
 * Routes to the appropriate calculation function based on deposit type.
 * 
 * @param input - Deposit input parameters
 * @returns Deposit result based on selected deposit type
 * @throws Error if deposit type is invalid
 */
export function calculateDeposit(input: DepositInput): DepositResult {
	switch (input.depositType) {
		case 'simple':
			return calculateSimpleDeposit(input);
		case 'capitalized':
			return calculateCapitalizedDeposit(input);
		case 'compound':
			return calculateCompoundDeposit(input);
		default:
			throw new Error('Invalid deposit type');
	}
}

/**
 * Generate deposit schedule for display
 * 
 * Convenience function that returns only the payment schedule
 * without calculating other result fields. Useful when only
 * the schedule is needed for display purposes.
 * 
 * @param input - Deposit input parameters
 * @returns Array of schedule items showing month-by-month breakdown
 */
export function generateDepositSchedule(
	input: DepositInput
): DepositScheduleItem[] {
	const result = calculateDeposit(input);
	return result.depositSchedule;
}

/**
 * Export deposit schedule to CSV format
 * 
 * Converts the deposit schedule into CSV format for download or export.
 * Useful for users who want to analyze the schedule in spreadsheet software.
 * 
 * CSV format:
 * - Header row with column names
 * - Data rows with comma-separated values
 * - All monetary values formatted to 2 decimal places
 * 
 * @param schedule - Array of deposit schedule items
 * @param currency - Currency code (for future localization, currently unused)
 * @returns CSV string ready for download
 */
export function exportDepositScheduleToCSV(
	schedule: DepositScheduleItem[],
	currency: string = 'RUB'
): string {
	const headers = [
		'Month',
		'Start Amount',
		'Interest Earned',
		'Addition',
		'Withdrawal',
		'End Amount',
	];
	const rows = schedule.map((item) => [
		item.month.toString(),
		item.startAmount.toFixed(2),
		item.interestEarned.toFixed(2),
		item.addition.toFixed(2),
		item.withdrawal.toFixed(2),
		item.endAmount.toFixed(2),
	]);

	return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

/**
 * Validate deposit input parameters
 * 
 * Performs comprehensive validation of deposit input parameters:
 * - Amount must be positive
 * - Term must be between 1 and 600 months (50 years)
 * - Interest rate must be between 0 and 100%
 * - Monthly additions/withdrawals cannot be negative
 * 
 * Returns array of error messages for invalid inputs.
 * Empty array indicates all inputs are valid.
 * 
 * @param input - Partial deposit input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateDepositInput(input: Partial<DepositInput>): string[] {
	const errors: string[] = [];

	if (!input.amount || input.amount <= 0) {
		errors.push('Deposit amount must be greater than 0');
	}

	if (!input.termMonths || input.termMonths <= 0) {
		errors.push('Deposit term must be greater than 0');
	}

	if (input.termMonths && input.termMonths > 600) {
		errors.push('Deposit term cannot exceed 50 years (600 months)');
	}

	if (!input.interestRate || input.interestRate <= 0) {
		errors.push('Interest rate must be greater than 0');
	}

	if (input.interestRate && input.interestRate > 100) {
		errors.push('Interest rate cannot exceed 100%');
	}

	if (input.monthlyAddition && input.monthlyAddition < 0) {
		errors.push('Monthly addition cannot be negative');
	}

	if (input.monthlyWithdrawal && input.monthlyWithdrawal < 0) {
		errors.push('Monthly withdrawal cannot be negative');
	}

	return errors;
}

/**
 * Format currency based on selected currency
 * 
 * Formats a numeric amount as currency using Intl.NumberFormat.
 * Supports RUB, USD, and EUR with appropriate locale formatting.
 * 
 * Formatting details:
 * - RUB: Russian locale (ru-RU), shows as "1 234,56 ₽"
 * - USD: US locale (en-US), shows as "$1,234.56"
 * - EUR: German locale (de-DE), shows as "1.234,56 €"
 * 
 * Falls back to RUB formatting if currency is not recognized.
 * 
 * @param amount - Numeric amount to format
 * @param currency - Currency code (RUB, USD, EUR)
 * @returns Formatted currency string with appropriate symbols and separators
 */
export function formatDepositCurrency(
	amount: number,
	currency: string
): string {
	const currencyMap = {
		RUB: { locale: 'ru-RU', currency: 'RUB' },
		USD: { locale: 'en-US', currency: 'USD' },
		EUR: { locale: 'de-DE', currency: 'EUR' },
	};

	const config =
		currencyMap[currency as keyof typeof currencyMap] || currencyMap.RUB;

	return new Intl.NumberFormat(config.locale, {
		style: 'currency',
		currency: config.currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}
