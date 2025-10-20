/**
 * Коэффициенты гравитации планет относительно Земли
 * Данные основаны на реальных научных измерениях
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
 * Конвертация фунтов в килограммы
 */
export function lbToKg(lb: number): number {
	return lb * 0.453592;
}

/**
 * Конвертация килограмм в фунты
 */
export function kgToLb(kg: number): number {
	return kg * 2.20462;
}

/**
 * Расчёт веса на другой планете
 */
export function calculatePlanetWeight(
	earthWeight: number,
	planet: PlanetType
): number {
	const gravity = PLANET_GRAVITY[planet];
	return earthWeight * gravity;
}

/**
 * Расчёт веса на всех планетах
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
 * Валидация веса
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
