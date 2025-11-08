/**
 * Customs Calculator Library
 * 
 * Provides functionality for calculating customs duties for imported cars.
 * 
 * Features:
 * - Customs duty calculation (based on car value or engine volume)
 * - Excise tax calculation (based on car age and engine volume)
 * - VAT calculation (20% on car value + duty + excise)
 * - Recycling fee (fixed amount)
 * - Total customs cost calculation
 * 
 * Calculation method:
 * - Duty: Maximum of (10% of car value) or (engine volume × rate per cm³)
 * - Excise: Engine volume × rate per cm³ (higher for cars older than 3 years)
 * - VAT: 20% of (car value + duty + excise)
 * - Recycling fee: Fixed 3,400 RUB
 * 
 * Rates vary by engine volume:
 * - Under 1000 cm³: Lower rates
 * - 1001-2000 cm³: Medium rates
 * - 2001-3000 cm³: Higher rates
 * - Above 3000 cm³: Highest rates
 */

/**
 * Input interface for customs calculation
 * Contains car value, engine specifications, and age
 */
export interface CustomsInput {
	carValue: number; // in EUR
	engineVolume: number; // in cm³
	fuelType: 'gasoline' | 'diesel' | 'electric';
	carAge: number; // in years
	enginePower: number; // in HP
}

export interface CustomsResult {
	duty: number;
	excise: number;
	vat: number;
	recyclingFee: number;
	total: number;
	carValueRub: number;
}

// Tariffs for customs clearance
export const tariffs = {
	duty: {
		// Fixed duties by engine volume (EUR per cm³)
		under_1000: 1.5,
		from_1001_2000: 1.7,
		from_2001_3000: 2.5,
		above_3000: 3.6,
	},
	excise: {
		under_3_years: {
			under_1000: 1.5, // EUR per cm³
			from_1001_2000: 1.7,
			from_2001_3000: 2.5,
			above_3000: 3.6,
		},
		above_3_years: {
			under_1000: 3.0, // EUR per cm³
			from_1001_2000: 3.5,
			from_2001_3000: 5.0,
			above_3000: 5.7,
		},
	},
	recyclingFee: 3400, // RUB
	vatRate: 0.2, // 20%
	dutyRate: 0.1, // 10%
};

// EUR to RUB exchange rate (approximate)
const EUR_TO_RUB_RATE = 100;

/**
 * Calculate customs duties and fees for imported car
 * 
 * Calculates all customs costs including duty, excise, VAT, and recycling fee.
 * 
 * Algorithm:
 * 1. Convert car value from EUR to RUB
 * 2. Calculate duty (maximum of percentage or volume-based)
 * 3. Calculate excise (based on age and engine volume)
 * 4. Calculate VAT (20% of car value + duty + excise)
 * 5. Add recycling fee (fixed)
 * 6. Sum all costs for total
 * 
 * @param input - Customs input parameters
 * @returns Customs result with all cost breakdowns
 */
export function calculateCustoms(input: CustomsInput): CustomsResult {
	const { carValue, engineVolume, fuelType, carAge, enginePower } = input;

	// Convert EUR to RUB
	const carValueRub = carValue * EUR_TO_RUB_RATE;

	// Get duty rate based on engine volume
	const dutyRatePerCm3 = getDutyRate(engineVolume);
	const dutyByVolume = engineVolume * dutyRatePerCm3 * EUR_TO_RUB_RATE;
	const dutyByPercentage = carValueRub * tariffs.dutyRate;
	const duty = Math.max(dutyByVolume, dutyByPercentage);

	// Get excise rate based on age and engine volume
	const exciseRatePerCm3 = getExciseRate(carAge, engineVolume);
	const excise = engineVolume * exciseRatePerCm3 * EUR_TO_RUB_RATE;

	// Calculate VAT (20%)
	const vat = (carValueRub + duty + excise) * tariffs.vatRate;

	// Recycling fee (fixed)
	const recyclingFee = tariffs.recyclingFee;

	// Total amount
	const total = duty + excise + vat + recyclingFee;

	return {
		duty: Math.round(duty),
		excise: Math.round(excise),
		vat: Math.round(vat),
		recyclingFee: Math.round(recyclingFee),
		total: Math.round(total),
		carValueRub: Math.round(carValueRub),
	};
}

function getDutyRate(engineVolume: number): number {
	if (engineVolume <= 1000) return tariffs.duty.under_1000;
	if (engineVolume <= 2000) return tariffs.duty.from_1001_2000;
	if (engineVolume <= 3000) return tariffs.duty.from_2001_3000;
	return tariffs.duty.above_3000;
}

function getExciseRate(carAge: number, engineVolume: number): number {
	const ageCategory = carAge < 3 ? 'under_3_years' : 'above_3_years';
	const exciseRates = tariffs.excise[ageCategory];

	if (engineVolume <= 1000) return exciseRates.under_1000;
	if (engineVolume <= 2000) return exciseRates.from_1001_2000;
	if (engineVolume <= 3000) return exciseRates.from_2001_3000;
	return exciseRates.above_3000;
}

export function validateCustomsInput(input: Partial<CustomsInput>): string[] {
	const errors: string[] = [];

	if (!input.carValue || input.carValue <= 0) {
		errors.push('Стоимость автомобиля должна быть больше 0');
	}

	if (!input.engineVolume || input.engineVolume <= 0) {
		errors.push('Объём двигателя должен быть больше 0');
	}

	if (input.engineVolume && input.engineVolume > 10000) {
		errors.push('Объём двигателя не может быть больше 10000 см³');
	}

	if (!input.carAge || input.carAge < 0) {
		errors.push('Возраст автомобиля должен быть больше или равен 0');
	}

	if (input.carAge && input.carAge > 50) {
		errors.push('Возраст автомобиля не может быть больше 50 лет');
	}

	if (!input.enginePower || input.enginePower <= 0) {
		errors.push('Мощность двигателя должна быть больше 0');
	}

	if (input.enginePower && input.enginePower > 2000) {
		errors.push('Мощность двигателя не может быть больше 2000 л.с.');
	}

	if (!input.fuelType) {
		errors.push('Выберите тип топлива');
	}

	return errors;
}

export function formatCustomsCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function getFuelTypeOptions(): Array<{
	value: 'gasoline' | 'diesel' | 'electric';
	label: string;
}> {
	return [
		{ value: 'gasoline', label: 'Бензин' },
		{ value: 'diesel', label: 'Дизель' },
		{ value: 'electric', label: 'Электрический' },
	];
}
