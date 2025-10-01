/**
 * Deposit calculation library
 * Handles various types of deposit calculations including simple, capitalized, and compound interest
 */

export interface DepositInput {
	amount: number;
	termMonths: number;
	interestRate: number;
	depositType: 'simple' | 'capitalized' | 'compound';
	capitalizationPeriod?: 'monthly' | 'quarterly' | 'yearly';
	monthlyAddition?: number;
	monthlyWithdrawal?: number;
	currency: 'RUB' | 'USD' | 'EUR';
}

export interface DepositScheduleItem {
	month: number;
	startAmount: number;
	interestEarned: number;
	addition: number;
	withdrawal: number;
	endAmount: number;
}

export interface DepositResult {
	finalAmount: number;
	totalInterest: number;
	effectiveRate: number;
	depositSchedule: DepositScheduleItem[];
}

/**
 * Calculate simple deposit (no capitalization)
 */
export function calculateSimpleDeposit(input: DepositInput): DepositResult {
	const {
		amount,
		termMonths,
		interestRate,
		monthlyAddition = 0,
		monthlyWithdrawal = 0,
	} = input;

	const monthlyRate = interestRate / 12 / 100;
	const totalInterest = amount * monthlyRate * termMonths;
	const totalAdditions = monthlyAddition * termMonths;
	const totalWithdrawals = monthlyWithdrawal * termMonths;
	const finalAmount =
		amount + totalInterest + totalAdditions - totalWithdrawals;

	const schedule: DepositScheduleItem[] = [];
	let currentAmount = amount;

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
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
		effectiveRate: interestRate,
		depositSchedule: schedule,
	};
}

/**
 * Calculate capitalized deposit (interest added to principal at specified intervals)
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

	// Determine capitalization frequency
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

	const totalInterest = schedule.reduce(
		(sum, item) => sum + item.interestEarned,
		0
	);
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
	const monthlyRate = interestRate / 12 / 100;

	for (let month = 1; month <= termMonths; month++) {
		const startAmount = currentAmount;
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

	const totalInterest = schedule.reduce(
		(sum, item) => sum + item.interestEarned,
		0
	);
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
 */
export function generateDepositSchedule(
	input: DepositInput
): DepositScheduleItem[] {
	const result = calculateDeposit(input);
	return result.depositSchedule;
}

/**
 * Export deposit schedule to CSV format
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
