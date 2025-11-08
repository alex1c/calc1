/**
 * Car Depreciation Calculator Library
 * 
 * Provides functionality for calculating car depreciation value over time.
 * 
 * Features:
 * - Two depreciation methods: linear and exponential
 * - Car segment consideration (economy, mid, premium)
 * - Mileage adjustment factor
 * - Age-based depreciation rates
 * - Current value calculation
 * - Annual depreciation rate calculation
 * 
 * Depreciation methods:
 * - Linear: Constant depreciation amount per year
 * - Exponential: Accelerated depreciation rate (compound)
 * 
 * Segment adjustments:
 * - Premium: +5% depreciation rate
 * - Economy: -2% depreciation rate
 * - Mid: No adjustment
 * 
 * Mileage adjustment:
 * - Based on average annual mileage vs. norm (15,000 km/year)
 * - Excess mileage increases depreciation rate
 */

/**
 * Depreciation calculation method type
 * - linear: Constant depreciation amount per year
 * - exponential: Accelerated depreciation rate (compound)
 */
export type DepreciationMethod = 'linear' | 'exponential';

/**
 * Car segment type
 * - economy: Economy class cars
 * - mid: Mid-range cars
 * - premium: Premium/luxury cars
 */
export type CarSegment = 'economy' | 'mid' | 'premium';

/**
 * Input interface for car depreciation calculation
 * Contains all parameters needed to calculate depreciation
 */
export interface DepreciationInput {
	purchasePrice: number; // RUB
	ageYears: number; // years
	mileageKm: number; // total km
	segment: CarSegment;
	method: DepreciationMethod;
}

/**
 * Result interface for car depreciation calculation
 * Contains calculated depreciation values and rates
 */
export interface DepreciationResult {
	purchasePrice: number; // Original purchase price (₽)
	currentValue: number; // Current car value after depreciation (₽)
	totalDepreciation: number; // Total depreciation amount (₽)
	annualRatePercent: number; // Average annual depreciation rate (%)
	ageYears: number; // Car age in years
	mileageKm: number; // Total mileage in kilometers
}

/**
 * Base annual depreciation rates by year index (1-based)
 * Rates decrease over time, stabilizing after year 7
 */
const BASE_ANNUAL_RATES = [0.18, 0.12, 0.1, 0.08, 0.07, 0.06, 0.06];

/**
 * Get annual depreciation rate for a specific year
 * 
 * Uses base rates array, defaulting to last rate for years beyond array length.
 * 
 * @param yearIndex - Year index (1-based, where 1 is first year)
 * @returns Annual depreciation rate (0-1)
 */
function getAnnualRateForYear(yearIndex: number): number {
	return BASE_ANNUAL_RATES[
		Math.min(yearIndex - 1, BASE_ANNUAL_RATES.length - 1)
	];
}

/**
 * Get segment adjustment factor for depreciation rate
 * 
 * Premium cars depreciate faster, economy cars depreciate slower.
 * 
 * @param segment - Car segment (economy, mid, premium)
 * @returns Adjustment factor to add to base rate (+0.05 for premium, -0.02 for economy, 0 for mid)
 */
function getSegmentAdjustment(segment: CarSegment): number {
	if (segment === 'premium') return 0.05; // +5% to drop
	if (segment === 'economy') return -0.02; // -2% to drop
	return 0; // mid
}

/**
 * Get mileage adjustment factor for depreciation rate
 * 
 * Calculates adjustment based on average annual mileage vs. norm (15,000 km/year).
 * Excess mileage increases depreciation rate by 5-10%.
 * 
 * @param mileageKm - Total mileage in kilometers
 * @param ageYears - Car age in years
 * @returns Adjustment factor to add to base rate (0 to +0.1)
 */
function getMileageAdjustment(mileageKm: number, ageYears: number): number {
	const normPerYear = 15000; // Normal annual mileage (km/year)
	if (ageYears <= 0) return 0;
	const avgPerYear = mileageKm / ageYears;
	if (avgPerYear <= normPerYear) return 0;
	const excessRatio = (avgPerYear - normPerYear) / normPerYear; // e.g., 0.33 for 20k vs 15k
	return Math.min(0.1, Math.max(0.0, 0.05 + 0.05 * Math.min(1, excessRatio))); // +5..10%
}

/**
 * Validate car depreciation input parameters
 * 
 * Checks that all required fields are present and valid:
 * - Purchase price must be positive
 * - Age must be non-negative
 * - Mileage must be non-negative
 * 
 * @param data - Partial depreciation input to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateDepreciationInput(
	data: Partial<DepreciationInput>
): string[] {
	const errors: string[] = [];
	if (!data.purchasePrice || data.purchasePrice <= 0)
		errors.push('Укажите корректную стоимость.');
	if (data.ageYears == null || data.ageYears < 0)
		errors.push('Возраст должен быть неотрицательным.');
	if (data.mileageKm == null || data.mileageKm < 0)
		errors.push('Пробег должен быть неотрицательным.');
	return errors;
}

/**
 * Calculate car depreciation value
 * 
 * Calculates current car value based on purchase price, age, mileage, segment, and method.
 * 
 * Algorithm:
 * 1. Calculate base depreciation rate for each year
 * 2. Apply segment and mileage adjustments
 * 3. Apply depreciation based on method (linear or exponential)
 * 4. Handle fractional years proportionally
 * 5. Calculate total depreciation and annual rate
 * 
 * @param input - Depreciation input parameters
 * @returns Depreciation result with current value, total depreciation, and rates
 */
export function calculateDepreciation(
	input: DepreciationInput
): DepreciationResult {
	const { purchasePrice, ageYears, mileageKm, segment, method } = input;
	const segAdj = getSegmentAdjustment(segment);
	const milAdj = getMileageAdjustment(mileageKm, ageYears);

	let value = purchasePrice;
	let accumulatedDrop = 0;

	for (let year = 1; year <= Math.max(0, Math.floor(ageYears)); year++) {
		const base = getAnnualRateForYear(year);
		const rate = Math.max(0, Math.min(0.95, base + segAdj + milAdj));
		if (method === 'linear') {
			const drop = purchasePrice * rate;
			accumulatedDrop += drop;
			value = Math.max(0, purchasePrice - accumulatedDrop);
		} else {
			value = Math.max(0, value * (1 - rate));
		}
	}

	// Fractional year handling (simple proportional of the last year rate)
	const fractional = ageYears - Math.floor(ageYears);
	if (fractional > 0) {
		const base = getAnnualRateForYear(Math.max(1, Math.floor(ageYears)));
		const rate = Math.max(0, Math.min(0.95, base + segAdj + milAdj));
		if (method === 'linear') {
			const drop = purchasePrice * rate * fractional;
			accumulatedDrop += drop;
			value = Math.max(0, purchasePrice - accumulatedDrop);
		} else {
			value = Math.max(0, value * (1 - rate * fractional));
		}
	}

	const totalDep = Math.max(0, purchasePrice - value);
	const annualRatePercent =
		ageYears > 0 ? ((totalDep / purchasePrice) * 100) / ageYears : 0;

	return {
		purchasePrice,
		currentValue: Math.round(value),
		totalDepreciation: Math.round(totalDep),
		annualRatePercent: Math.max(0, annualRatePercent),
		ageYears,
		mileageKm,
	};
}

// Car depreciation calculation logic and interfaces

export type DepreciationMethod = 'linear' | 'declining';

export interface CarDepreciationInput {
	initialValue: number; // Initial car value in RUB
	ownershipYears: number; // Ownership period in years
	depreciationMethod: DepreciationMethod; // Method of depreciation calculation
	depreciationRate: number; // Depreciation rate per year in %
	annualMileage?: number; // Annual mileage in km (optional for wear calculation)
}

export interface DepreciationYear {
	year: number;
	beginningValue: number;
	depreciationAmount: number;
	endingValue: number;
	depreciationPercentage: number;
}

export interface CarDepreciationResult {
	method: DepreciationMethod;
	initialValue: number;
	ownershipYears: number;
	depreciationRate: number;
	totalDepreciation: number;
	finalValue: number;
	depreciationPercentage: number;
	yearlyBreakdown: DepreciationYear[];
	averageAnnualDepreciation: number;
}

export function calculateCarDepreciation(
	input: CarDepreciationInput
): CarDepreciationResult {
	const {
		initialValue,
		ownershipYears,
		depreciationMethod,
		depreciationRate,
	} = input;

	const yearlyBreakdown: DepreciationYear[] = [];
	let currentValue = initialValue;
	let totalDepreciation = 0;

	if (depreciationMethod === 'linear') {
		// Linear depreciation: same amount each year
		const annualDepreciation = initialValue * (depreciationRate / 100);

		for (let year = 1; year <= ownershipYears; year++) {
			const beginningValue = currentValue;
			const depreciationAmount = Math.min(
				annualDepreciation,
				currentValue
			);
			const endingValue = Math.max(0, currentValue - depreciationAmount);
			const depreciationPercentage =
				beginningValue > 0
					? (depreciationAmount / beginningValue) * 100
					: 0;

			yearlyBreakdown.push({
				year,
				beginningValue: Math.round(beginningValue),
				depreciationAmount: Math.round(depreciationAmount),
				endingValue: Math.round(endingValue),
				depreciationPercentage:
					Math.round(depreciationPercentage * 100) / 100,
			});

			currentValue = endingValue;
			totalDepreciation += depreciationAmount;
		}
	} else {
		// Declining balance depreciation: percentage of remaining value each year
		for (let year = 1; year <= ownershipYears; year++) {
			const beginningValue = currentValue;
			const depreciationAmount = currentValue * (depreciationRate / 100);
			const endingValue = Math.max(0, currentValue - depreciationAmount);
			const depreciationPercentage =
				beginningValue > 0
					? (depreciationAmount / beginningValue) * 100
					: 0;

			yearlyBreakdown.push({
				year,
				beginningValue: Math.round(beginningValue),
				depreciationAmount: Math.round(depreciationAmount),
				endingValue: Math.round(endingValue),
				depreciationPercentage:
					Math.round(depreciationPercentage * 100) / 100,
			});

			currentValue = endingValue;
			totalDepreciation += depreciationAmount;
		}
	}

	const finalValue = currentValue;
	const totalDepreciationPercentage =
		initialValue > 0 ? (totalDepreciation / initialValue) * 100 : 0;
	const averageAnnualDepreciation =
		ownershipYears > 0 ? totalDepreciation / ownershipYears : 0;

	return {
		method: depreciationMethod,
		initialValue: Math.round(initialValue),
		ownershipYears,
		depreciationRate,
		totalDepreciation: Math.round(totalDepreciation),
		finalValue: Math.round(finalValue),
		depreciationPercentage:
			Math.round(totalDepreciationPercentage * 100) / 100,
		yearlyBreakdown,
		averageAnnualDepreciation: Math.round(averageAnnualDepreciation),
	};
}

export function validateCarDepreciationInput(
	input: Partial<CarDepreciationInput>
): string[] {
	const errors: string[] = [];

	if (!input.initialValue || input.initialValue <= 0) {
		errors.push('Первоначальная стоимость автомобиля должна быть больше 0');
	}

	if (!input.ownershipYears || input.ownershipYears <= 0) {
		errors.push('Срок владения должен быть больше 0');
	}

	if (input.ownershipYears && input.ownershipYears > 50) {
		errors.push('Срок владения не может быть больше 50 лет');
	}

	if (!input.depreciationRate || input.depreciationRate <= 0) {
		errors.push('Процент амортизации должен быть больше 0');
	}

	if (input.depreciationRate && input.depreciationRate > 100) {
		errors.push('Процент амортизации не может быть больше 100%');
	}

	if (input.annualMileage !== undefined && input.annualMileage < 0) {
		errors.push('Пробег в год должен быть неотрицательным');
	}

	if (input.annualMileage && input.annualMileage > 1000000) {
		errors.push('Пробег в год не может быть больше 1,000,000 км');
	}

	return errors;
}

export function formatDepreciationCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatDepreciationNumber(value: number): string {
	return new Intl.NumberFormat('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
}

export function getDepreciationMethods(): Array<{
	value: DepreciationMethod;
	label: string;
	description: string;
}> {
	return [
		{
			value: 'linear',
			label: 'Линейный',
			description: 'Равномерное снижение стоимости каждый год',
		},
		{
			value: 'declining',
			label: 'Убывающий',
			description: 'Процент от остаточной стоимости каждый год',
		},
	];
}

export function getDepreciationRates(): Array<{
	value: number;
	label: string;
	description: string;
}> {
	return [
		{
			value: 5,
			label: '5% в год',
			description: 'Новые автомобили (0-2 года)',
		},
		{
			value: 10,
			label: '10% в год',
			description: 'Средний возраст (3-5 лет)',
		},
		{
			value: 15,
			label: '15% в год',
			description: 'Старые автомобили (6+ лет)',
		},
		{ value: 20, label: '20% в год', description: 'Высокая амортизация' },
		{
			value: 25,
			label: '25% в год',
			description: 'Очень высокая амортизация',
		},
		{
			value: 30,
			label: '30% в год',
			description: 'Экстремальная амортизация',
		},
	];
}

export function calculateDepreciationComparison(
	initialValue: number,
	ownershipYears: number,
	rates: number[]
): Array<{
	rate: number;
	method: DepreciationMethod;
	finalValue: number;
	totalDepreciation: number;
	depreciationPercentage: number;
}> {
	const results: Array<{
		rate: number;
		method: DepreciationMethod;
		finalValue: number;
		totalDepreciation: number;
		depreciationPercentage: number;
	}> = [];

	for (const rate of rates) {
		for (const method of ['linear', 'declining'] as DepreciationMethod[]) {
			const result = calculateCarDepreciation({
				initialValue,
				ownershipYears,
				depreciationMethod: method,
				depreciationRate: rate,
			});

			results.push({
				rate,
				method,
				finalValue: result.finalValue,
				totalDepreciation: result.totalDepreciation,
				depreciationPercentage: result.depreciationPercentage,
			});
		}
	}

	return results;
}

export function getDepreciationInsights(result: CarDepreciationResult): {
	severity: 'low' | 'medium' | 'high';
	message: string;
	recommendations: string[];
} {
	const { depreciationPercentage, method, depreciationRate } = result;

	let severity: 'low' | 'medium' | 'high';
	let message: string;
	const recommendations: string[] = [];

	if (depreciationPercentage < 30) {
		severity = 'low';
		message = 'Низкая амортизация - автомобиль сохраняет хорошую стоимость';
		recommendations.push('Автомобиль имеет хорошую остаточную стоимость');
		recommendations.push(
			'Рассмотрите возможность продажи через несколько лет'
		);
	} else if (depreciationPercentage < 60) {
		severity = 'medium';
		message = 'Умеренная амортизация - стандартная потеря стоимости';
		recommendations.push('Планируйте замену автомобиля через 5-7 лет');
		recommendations.push(
			'Регулярное обслуживание поможет сохранить стоимость'
		);
	} else {
		severity = 'high';
		message = 'Высокая амортизация - значительная потеря стоимости';
		recommendations.push('Рассмотрите более экономичные варианты');
		recommendations.push(
			'Планируйте долгосрочное владение для окупаемости'
		);
	}

	if (method === 'declining' && depreciationRate > 20) {
		recommendations.push(
			'Убывающий метод с высокой ставкой может быть неоптимальным'
		);
	}

	return { severity, message, recommendations };
}
