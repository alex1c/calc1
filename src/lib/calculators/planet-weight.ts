/**
 * Planet Weight Calculator Library
 *
 * Provides functionality for calculating weight on different planets based on their gravity.
 *
 * Features:
 * - Multiple planets and celestial bodies (Mercury, Venus, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
 * - Gravity coefficients relative to Earth
 * - Weight conversion between kg and lb
 * - Weight calculation for all planets
 * - Input validation
 *
 * Gravity coefficients (relative to Earth):
 * - Mercury: 0.378
 * - Venus: 0.907
 * - Moon: 0.166
 * - Mars: 0.377
 * - Jupiter: 2.364
 * - Saturn: 0.916
 * - Uranus: 0.889
 * - Neptune: 1.125
 * - Pluto: 0.071
 *
 * Calculation method:
 * - Weight on planet = Earth weight × Planet gravity coefficient
 * - All calculations use kg as base unit, then convert to lb if needed
 */
export const PLANET_GRAVITY = {
	mercury: 0.378, // Меркурий
	venus: 0.907, // Венера
	moon: 0.166, // Луна
	mars: 0.377, // Марс
	jupiter: 2.364, // Юпитер
	saturn: 0.916, // Сатурн
	uranus: 0.889, // Уран
	neptune: 1.125, // Нептун
	pluto: 0.071, // Плутон
} as const;

/**
 * Типы планет
 */
export type PlanetType = keyof typeof PLANET_GRAVITY;

/**
 * Единицы измерения веса
 */
export type WeightUnit = 'kg' | 'lb';

/**
 * Результат расчёта веса на планете
 */
export interface PlanetWeightResult {
	planet: PlanetType;
	weight: number;
	gravity: number;
}

/**
 * Convert pounds to kilograms
 *
 * Conversion factor: 1 lb = 0.453592 kg
 *
 * @param lb - Weight in pounds
 * @returns Weight in kilograms
 */
export function lbToKg(lb: number): number {
	return lb * 0.453592;
}

/**
 * Convert kilograms to pounds
 *
 * Conversion factor: 1 kg = 2.20462 lb
 *
 * @param kg - Weight in kilograms
 * @returns Weight in pounds
 */
export function kgToLb(kg: number): number {
	return kg * 2.20462;
}

/**
 * Calculate weight on a specific planet
 *
 * Calculates weight by multiplying Earth weight by the planet's gravity coefficient.
 *
 * Formula: Weight on planet = Earth weight × Planet gravity coefficient
 *
 * @param earthWeight - Weight on Earth in kilograms
 * @param planet - Planet type identifier
 * @returns Weight on the specified planet in kilograms
 */
export function calculatePlanetWeight(
	earthWeight: number,
	planet: PlanetType
): number {
	const gravity = PLANET_GRAVITY[planet];
	return earthWeight * gravity;
}

/**
 * Calculate weight on all planets
 *
 * Calculates weight for all available planets and celestial bodies.
 * Converts units if needed (lb to kg for calculation, then back to lb for results).
 *
 * @param earthWeight - Weight on Earth
 * @param unit - Weight unit ('kg' or 'lb', default 'kg')
 * @returns Array of PlanetWeightResult objects with weight and gravity for each planet
 */
export function calculateAllPlanetsWeight(
	earthWeight: number,
	unit: WeightUnit = 'kg'
): PlanetWeightResult[] {
	// Если вес в фунтах, конвертируем в кг для расчёта
	const weightInKg = unit === 'lb' ? lbToKg(earthWeight) : earthWeight;

	const results: PlanetWeightResult[] = Object.entries(PLANET_GRAVITY).map(
		([planet, gravity]) => ({
			planet: planet as PlanetType,
			weight: weightInKg * gravity,
			gravity,
		})
	);

	// Если нужны фунты, конвертируем результаты
	if (unit === 'lb') {
		return results.map((result) => ({
			...result,
			weight: kgToLb(result.weight),
		}));
	}

	return results;
}

/**
 * Validate weight input
 *
 * Performs validation checks:
 * - Weight is a positive number
 * - Weight is not too large (max 1000 kg)
 *
 * @param weight - Weight value to validate
 * @returns Validation result with boolean status and optional error message
 */
export function validateWeight(weight: number): {
	isValid: boolean;
	error?: string;
} {
	if (isNaN(weight) || weight <= 0) {
		return {
			isValid: false,
			error: 'Weight must be a positive number',
		};
	}

	if (weight > 1000) {
		return {
			isValid: false,
			error: 'Weight seems too high. Please check your input',
		};
	}

	return { isValid: true };
}
