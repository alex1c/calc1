/**
 * Compound Interest Calculator Library
 * Handles various compound interest calculations with different compounding frequencies
 */

export interface CompoundInterestInput {
	principal: number; // Initial amount
	monthlyContribution?: number; // Regular monthly contributions
	annualContribution?: number; // Regular annual contributions
	interestRate: number; // Annual interest rate in percentage
	termYears?: number; // Term in years
	termMonths?: number; // Term in months
	compoundingFrequency:
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'quarterly'
		| 'semi-annually'
		| 'annually'; // Compounding frequency
}

export interface CompoundInterestScheduleItem {
	period: number;
	startBalance: number;
	contribution: number;
	interestEarned: number;
	endBalance: number;
	periodLabel: string; // "Year 1", "Month 3", etc.
}

export interface CompoundInterestResult {
	finalAmount: number;
	totalContributions: number;
	totalInterest: number;
	effectiveAnnualRate: number; // EAR with compounding
	simpleInterest: number; // Simple interest for comparison
	growthMultiplier: number; // Final amount / principal
	schedule: CompoundInterestScheduleItem[];
}

/**
 * Validate compound interest input
 */
export function validateCompoundInterestInput(
	input: Partial<CompoundInterestInput>
): string[] {
	const errors: string[] = [];

	if (!input.principal || input.principal <= 0) {
		errors.push('Principal amount must be greater than 0');
	}

	if (input.interestRate === undefined || input.interestRate < 0) {
		errors.push('Interest rate must be 0 or greater');
	}

	if (input.interestRate > 100) {
		errors.push('Interest rate cannot exceed 100%');
	}

	const totalTerm = (input.termYears || 0) * 12 + (input.termMonths || 0);
	if (totalTerm <= 0) {
		errors.push('Term must be greater than 0');
	}

	if (totalTerm > 600) {
		errors.push('Term cannot exceed 600 months (50 years)');
	}

	if (
		input.monthlyContribution !== undefined &&
		input.monthlyContribution < 0
	) {
		errors.push('Monthly contribution cannot be negative');
	}

	if (
		input.annualContribution !== undefined &&
		input.annualContribution < 0
	) {
		errors.push('Annual contribution cannot be negative');
	}

	return errors;
}

/**
 * Calculate compounding periods per year based on frequency
 */
function getCompoundingPeriodsPerYear(
	frequency: CompoundInterestInput['compoundingFrequency']
): number {
	switch (frequency) {
		case 'daily':
			return 365;
		case 'weekly':
			return 52;
		case 'monthly':
			return 12;
		case 'quarterly':
			return 4;
		case 'semi-annually':
			return 2;
		case 'annually':
			return 1;
		default:
			return 12;
	}
}

/**
 * Calculate Effective Annual Rate (EAR)
 */
function calculateEAR(nominalRate: number, compoundingPeriods: number): number {
	return (
		(Math.pow(
			1 + nominalRate / 100 / compoundingPeriods,
			compoundingPeriods
		) -
			1) *
		100
	);
}

/**
 * Calculate compound interest with regular contributions
 */
export function calculateCompoundInterest(
	input: CompoundInterestInput
): CompoundInterestResult {
	const {
		principal,
		monthlyContribution = 0,
		annualContribution = 0,
		interestRate,
		termYears = 0,
		termMonths = 0,
		compoundingFrequency,
	} = input;

	const totalMonths = termYears * 12 + termMonths;
	const compoundingPeriodsPerYear =
		getCompoundingPeriodsPerYear(compoundingFrequency);
	const periodsPerMonth = compoundingPeriodsPerYear / 12;
	const periodRate = interestRate / 100 / compoundingPeriodsPerYear;

	const schedule: CompoundInterestScheduleItem[] = [];
	let currentBalance = principal;
	let totalContributions = principal;
	let totalInterest = 0;

	// Determine if we should show yearly or monthly schedule
	const showYearlySchedule = totalMonths >= 24;

	if (showYearlySchedule) {
		// Show yearly schedule
		const totalYears = Math.ceil(totalMonths / 12);
		for (let year = 1; year <= totalYears; year++) {
			const yearStartBalance = currentBalance;
			let yearContributions = 0;
			let yearInterest = 0;

			// Calculate months in this year (last year might be partial)
			const monthsInYear = Math.min(12, totalMonths - (year - 1) * 12);

			for (let month = 1; month <= monthsInYear; month++) {
				// Add monthly contribution at the start of the month
				if (monthlyContribution > 0) {
					currentBalance += monthlyContribution;
					yearContributions += monthlyContribution;
					totalContributions += monthlyContribution;
				}

				// Apply compound interest for this month
				const periodsInMonth = periodsPerMonth;
				for (let p = 0; p < periodsInMonth; p++) {
					const interestThisPeriod = currentBalance * periodRate;
					currentBalance += interestThisPeriod;
					yearInterest += interestThisPeriod;
					totalInterest += interestThisPeriod;
				}
			}

			// Add annual contribution at the end of the year
			if (annualContribution > 0) {
				currentBalance += annualContribution;
				yearContributions += annualContribution;
				totalContributions += annualContribution;
			}

			schedule.push({
				period: year,
				startBalance: Math.round(yearStartBalance * 100) / 100,
				contribution: Math.round(yearContributions * 100) / 100,
				interestEarned: Math.round(yearInterest * 100) / 100,
				endBalance: Math.round(currentBalance * 100) / 100,
				periodLabel: `Год ${year}`,
			});
		}
	} else {
		// Show monthly schedule
		for (let month = 1; month <= totalMonths; month++) {
			const monthStartBalance = currentBalance;
			let monthInterest = 0;

			// Add monthly contribution at the start of the month
			if (monthlyContribution > 0) {
				currentBalance += monthlyContribution;
				totalContributions += monthlyContribution;
			}

			// Apply compound interest for this month
			const periodsInMonth = periodsPerMonth;
			for (let p = 0; p < periodsInMonth; p++) {
				const interestThisPeriod = currentBalance * periodRate;
				currentBalance += interestThisPeriod;
				monthInterest += interestThisPeriod;
				totalInterest += interestThisPeriod;
			}

			// Add annual contribution if it's the end of the year
			if (annualContribution > 0 && month % 12 === 0) {
				currentBalance += annualContribution;
				totalContributions += annualContribution;
			}

			schedule.push({
				period: month,
				startBalance: Math.round(monthStartBalance * 100) / 100,
				contribution:
					Math.round(
						(monthlyContribution +
							(month % 12 === 0 ? annualContribution : 0)) *
							100
					) / 100,
				interestEarned: Math.round(monthInterest * 100) / 100,
				endBalance: Math.round(currentBalance * 100) / 100,
				periodLabel: `Месяц ${month}`,
			});
		}
	}

	const finalAmount = Math.round(currentBalance * 100) / 100;
	const totalContributionsRounded =
		Math.round(totalContributions * 100) / 100;
	const totalInterestRounded = Math.round(totalInterest * 100) / 100;

	// Calculate simple interest for comparison
	const simpleInterest =
		principal * (interestRate / 100) * (totalMonths / 12) +
		(monthlyContribution *
			totalMonths *
			(interestRate / 100) *
			(totalMonths / 12)) /
			2;

	// Calculate Effective Annual Rate
	const ear = calculateEAR(interestRate, compoundingPeriodsPerYear);

	// Calculate growth multiplier
	const growthMultiplier = principal > 0 ? finalAmount / principal : 1;

	return {
		finalAmount: finalAmount,
		totalContributions: totalContributionsRounded,
		totalInterest: totalInterestRounded,
		effectiveAnnualRate: Math.round(ear * 100) / 100,
		simpleInterest: Math.round(simpleInterest * 100) / 100,
		growthMultiplier: Math.round(growthMultiplier * 1000) / 1000,
		schedule,
	};
}
