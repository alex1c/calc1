/**
 * Baby Growth Calculator
 * Based on WHO growth standards for children 0-5 years
 */

export interface BabyGrowthInput {
	gender: 'male' | 'female';
	ageMonths: number;
	height: number; // cm
	weight: number; // kg
}

export interface PercentileData {
	age: number; // months
	p5: number;
	p25: number;
	p50: number;
	p75: number;
	p95: number;
}

export interface BabyGrowthResult {
	heightPercentile: number;
	weightPercentile: number;
	heightCategory: string;
	weightCategory: string;
	heightComment: string;
	weightComment: string;
	recommendations: string[];
	overallAssessment: string;
}

// WHO Growth Standards for Boys (0-60 months)
const BOYS_HEIGHT_DATA: PercentileData[] = [
	{ age: 0, p5: 46.1, p25: 48.0, p50: 49.9, p75: 51.8, p95: 53.7 },
	{ age: 3, p5: 55.3, p25: 57.6, p50: 59.7, p75: 61.8, p95: 63.9 },
	{ age: 6, p5: 62.5, p25: 64.9, p50: 67.6, p75: 69.8, p95: 72.0 },
	{ age: 9, p5: 67.4, p25: 69.9, p50: 72.0, p75: 74.1, p95: 76.3 },
	{ age: 12, p5: 70.8, p25: 73.5, p50: 75.7, p75: 77.9, p95: 80.1 },
	{ age: 24, p5: 81.5, p25: 84.5, p50: 87.1, p75: 89.7, p95: 92.2 },
	{ age: 36, p5: 88.0, p25: 91.5, p50: 94.9, p75: 98.2, p95: 101.4 },
	{ age: 48, p5: 94.2, p25: 98.1, p50: 101.9, p75: 105.8, p95: 109.7 },
	{ age: 60, p5: 99.9, p25: 104.0, p50: 107.9, p75: 111.8, p95: 115.7 },
];

const BOYS_WEIGHT_DATA: PercentileData[] = [
	{ age: 0, p5: 2.5, p25: 2.9, p50: 3.3, p75: 3.9, p95: 4.4 },
	{ age: 3, p5: 4.8, p25: 5.5, p50: 6.2, p75: 6.9, p95: 7.7 },
	{ age: 6, p5: 6.4, p25: 7.2, p50: 7.9, p75: 8.6, p95: 9.4 },
	{ age: 9, p5: 7.4, p25: 8.2, p50: 8.9, p75: 9.7, p95: 10.6 },
	{ age: 12, p5: 8.0, p25: 8.9, p50: 9.6, p75: 10.4, p95: 11.3 },
	{ age: 24, p5: 10.0, p25: 11.2, p50: 12.2, p75: 13.4, p95: 14.6 },
	{ age: 36, p5: 11.4, p25: 12.8, p50: 14.0, p75: 15.4, p95: 16.8 },
	{ age: 48, p5: 12.7, p25: 14.3, p50: 15.6, p75: 17.0, p95: 18.6 },
	{ age: 60, p5: 13.8, p25: 15.7, p50: 17.0, p75: 18.5, p95: 20.2 },
];

// WHO Growth Standards for Girls (0-60 months)
const GIRLS_HEIGHT_DATA: PercentileData[] = [
	{ age: 0, p5: 45.4, p25: 47.3, p50: 49.1, p75: 51.0, p95: 52.9 },
	{ age: 3, p5: 54.0, p25: 56.1, p50: 58.4, p75: 60.5, p95: 62.6 },
	{ age: 6, p5: 60.5, p25: 63.0, p50: 65.7, p75: 68.0, p95: 70.3 },
	{ age: 9, p5: 65.4, p25: 67.9, p50: 70.1, p75: 72.4, p95: 74.7 },
	{ age: 12, p5: 68.9, p25: 71.6, p50: 74.0, p75: 76.4, p95: 78.8 },
	{ age: 24, p5: 80.2, p25: 83.2, p50: 85.7, p75: 88.3, p95: 90.9 },
	{ age: 36, p5: 86.9, p25: 90.3, p50: 93.9, p75: 97.3, p95: 100.6 },
	{ age: 48, p5: 93.3, p25: 97.0, p50: 100.7, p75: 104.5, p95: 108.3 },
	{ age: 60, p5: 98.9, p25: 102.8, p50: 106.7, p75: 110.7, p95: 114.6 },
];

const GIRLS_WEIGHT_DATA: PercentileData[] = [
	{ age: 0, p5: 2.4, p25: 2.8, p50: 3.2, p75: 3.7, p95: 4.2 },
	{ age: 3, p5: 4.5, p25: 5.2, p50: 5.8, p75: 6.6, p95: 7.4 },
	{ age: 6, p5: 5.9, p25: 6.7, p50: 7.4, p75: 8.2, p95: 9.0 },
	{ age: 9, p5: 6.8, p25: 7.6, p50: 8.4, p75: 9.2, p95: 10.1 },
	{ age: 12, p5: 7.4, p25: 8.3, p50: 9.0, p75: 9.9, p95: 10.8 },
	{ age: 24, p5: 9.6, p25: 10.8, p50: 11.8, p75: 12.9, p95: 14.0 },
	{ age: 36, p5: 11.1, p25: 12.5, p50: 13.7, p75: 15.1, p95: 16.5 },
	{ age: 48, p5: 12.3, p25: 13.8, p50: 15.2, p75: 16.7, p95: 18.2 },
	{ age: 60, p5: 13.3, p25: 15.0, p50: 16.4, p75: 18.0, p95: 19.7 },
];

/**
 * Interpolate percentile value for given age
 */
function interpolatePercentile(
	data: PercentileData[],
	ageMonths: number,
	percentile: 'p5' | 'p25' | 'p50' | 'p75' | 'p95'
): number {
	// Find the two closest age points
	let lowerIndex = -1;
	let upperIndex = -1;

	for (let i = 0; i < data.length; i++) {
		if (data[i].age <= ageMonths) {
			lowerIndex = i;
		}
		if (data[i].age >= ageMonths && upperIndex === -1) {
			upperIndex = i;
			break;
		}
	}

	// If exact match
	if (lowerIndex === upperIndex) {
		return data[lowerIndex][percentile];
	}

	// If age is below first data point
	if (lowerIndex === -1) {
		return data[0][percentile];
	}

	// If age is above last data point
	if (upperIndex === -1) {
		return data[data.length - 1][percentile];
	}

	// Linear interpolation
	const lowerAge = data[lowerIndex].age;
	const upperAge = data[upperIndex].age;
	const lowerValue = data[lowerIndex][percentile];
	const upperValue = data[upperIndex][percentile];

	const ratio = (ageMonths - lowerAge) / (upperAge - lowerAge);
	return lowerValue + ratio * (upperValue - lowerValue);
}

/**
 * Calculate percentile for given value
 */
function calculatePercentile(
	data: PercentileData[],
	ageMonths: number,
	value: number,
	type: 'height' | 'weight'
): number {
	const p5 = interpolatePercentile(data, ageMonths, 'p5');
	const p25 = interpolatePercentile(data, ageMonths, 'p25');
	const p50 = interpolatePercentile(data, ageMonths, 'p50');
	const p75 = interpolatePercentile(data, ageMonths, 'p75');
	const p95 = interpolatePercentile(data, ageMonths, 'p95');

	// Determine percentile based on value
	if (value < p5) return 3; // Below 5th percentile
	if (value < p25) return 15; // Between 5th and 25th percentile
	if (value < p50) return 37.5; // Between 25th and 50th percentile
	if (value < p75) return 62.5; // Between 50th and 75th percentile
	if (value < p95) return 85; // Between 75th and 95th percentile
	return 97; // Above 95th percentile
}

/**
 * Get category based on percentile
 */
function getCategory(percentile: number, locale: string = 'ru'): string {
	if (percentile < 5) {
		return locale === 'ru' ? 'Ниже нормы' : 'Below normal';
	}
	if (percentile < 25) {
		return locale === 'ru' ? 'Ниже среднего' : 'Below average';
	}
	if (percentile < 75) {
		return locale === 'ru' ? 'В пределах нормы' : 'Normal range';
	}
	if (percentile < 95) {
		return locale === 'ru' ? 'Выше среднего' : 'Above average';
	}
	return locale === 'ru' ? 'Выше нормы' : 'Above normal';
}

/**
 * Get color based on percentile
 */
function getCategoryColor(percentile: number): string {
	if (percentile < 5) return 'red';
	if (percentile < 25) return 'orange';
	if (percentile < 75) return 'green';
	if (percentile < 95) return 'yellow';
	return 'blue';
}

/**
 * Get comment based on percentile and type
 */
function getComment(
	percentile: number,
	type: 'height' | 'weight',
	locale: string = 'ru'
): string {
	if (locale === 'ru') {
		if (percentile < 5) {
			return type === 'height'
				? 'Возможное отставание в росте, рекомендуется консультация педиатра.'
				: 'Возможное отставание в весе, рекомендуется консультация педиатра.';
		}
		if (percentile < 25) {
			return type === 'height'
				? 'Незначительное отклонение в росте, рекомендуется наблюдение.'
				: 'Незначительное отклонение в весе, рекомендуется наблюдение.';
		}
		if (percentile < 75) {
			return type === 'height'
				? 'Рост соответствует возрастным нормам.'
				: 'Вес соответствует возрастным нормам.';
		}
		if (percentile < 95) {
			return type === 'height'
				? 'Ребёнок растёт быстрее сверстников.'
				: 'Ребёнок набирает вес быстрее сверстников.';
		}
		return type === 'height'
			? 'Возможен ускоренный рост, стоит наблюдать.'
			: 'Возможна избыточная масса, стоит наблюдать.';
	}

	// English translations
	if (percentile < 5) {
		return type === 'height'
			? 'Possible growth delay, pediatric consultation recommended.'
			: 'Possible weight delay, pediatric consultation recommended.';
	}
	if (percentile < 25) {
		return type === 'height'
			? 'Minor growth deviation, monitoring recommended.'
			: 'Minor weight deviation, monitoring recommended.';
	}
	if (percentile < 75) {
		return type === 'height'
			? 'Height is within age norms.'
			: 'Weight is within age norms.';
	}
	if (percentile < 95) {
		return type === 'height'
			? 'Child is growing faster than peers.'
			: 'Child is gaining weight faster than peers.';
	}
	return type === 'height'
		? 'Possible accelerated growth, monitoring recommended.'
		: 'Possible excess weight, monitoring recommended.';
}

/**
 * Get recommendations based on results
 */
function getRecommendations(
	heightPercentile: number,
	weightPercentile: number,
	locale: string = 'ru'
): string[] {
	const recommendations: string[] = [];

	if (locale === 'ru') {
		if (heightPercentile < 5 || weightPercentile < 5) {
			recommendations.push('Обязательно проконсультируйтесь с педиатром');
			recommendations.push('Следите за питанием и режимом дня');
		} else if (heightPercentile > 95 || weightPercentile > 95) {
			recommendations.push(
				'Проконсультируйтесь с педиатром для исключения патологий'
			);
			recommendations.push('Следите за сбалансированным питанием');
		} else {
			recommendations.push('Продолжайте следить за развитием ребёнка');
			recommendations.push('Поддерживайте здоровый образ жизни');
		}

		recommendations.push('Регулярно измеряйте рост и вес');
		recommendations.push('Ведите дневник развития');
	} else {
		if (heightPercentile < 5 || weightPercentile < 5) {
			recommendations.push('Consult with a pediatrician');
			recommendations.push('Monitor nutrition and daily routine');
		} else if (heightPercentile > 95 || weightPercentile > 95) {
			recommendations.push(
				'Consult with a pediatrician to rule out pathologies'
			);
			recommendations.push('Monitor balanced nutrition');
		} else {
			recommendations.push('Continue monitoring child development');
			recommendations.push('Maintain a healthy lifestyle');
		}

		recommendations.push('Regularly measure height and weight');
		recommendations.push('Keep a development diary');
	}

	return recommendations;
}

/**
 * Get overall assessment
 */
function getOverallAssessment(
	heightPercentile: number,
	weightPercentile: number,
	locale: string = 'ru'
): string {
	if (locale === 'ru') {
		if (heightPercentile < 5 || weightPercentile < 5) {
			return 'Требуется внимание специалиста';
		}
		if (heightPercentile > 95 || weightPercentile > 95) {
			return 'Рекомендуется консультация педиатра';
		}
		if (
			heightPercentile >= 25 &&
			heightPercentile <= 75 &&
			weightPercentile >= 25 &&
			weightPercentile <= 75
		) {
			return 'Развитие соответствует норме';
		}
		return 'Развитие в пределах нормы с небольшими отклонениями';
	}

	// English
	if (heightPercentile < 5 || weightPercentile < 5) {
		return 'Specialist attention required';
	}
	if (heightPercentile > 95 || weightPercentile > 95) {
		return 'Pediatric consultation recommended';
	}
	if (
		heightPercentile >= 25 &&
		heightPercentile <= 75 &&
		weightPercentile >= 25 &&
		weightPercentile <= 75
	) {
		return 'Development is normal';
	}
	return 'Development within normal range with minor deviations';
}

/**
 * Main calculation function
 */
export function calculateBabyGrowth(
	input: BabyGrowthInput,
	locale: string = 'ru'
): BabyGrowthResult {
	const { gender, ageMonths, height, weight } = input;

	// Select appropriate data based on gender
	const heightData = gender === 'male' ? BOYS_HEIGHT_DATA : GIRLS_HEIGHT_DATA;
	const weightData = gender === 'male' ? BOYS_WEIGHT_DATA : GIRLS_WEIGHT_DATA;

	// Calculate percentiles
	const heightPercentile = calculatePercentile(
		heightData,
		ageMonths,
		height,
		'height'
	);
	const weightPercentile = calculatePercentile(
		weightData,
		ageMonths,
		weight,
		'weight'
	);

	// Get categories and comments
	const heightCategory = getCategory(heightPercentile, locale);
	const weightCategory = getCategory(weightPercentile, locale);
	const heightComment = getComment(heightPercentile, 'height', locale);
	const weightComment = getComment(weightPercentile, 'weight', locale);

	// Get recommendations and overall assessment
	const recommendations = getRecommendations(
		heightPercentile,
		weightPercentile,
		locale
	);
	const overallAssessment = getOverallAssessment(
		heightPercentile,
		weightPercentile,
		locale
	);

	return {
		heightPercentile: Math.round(heightPercentile),
		weightPercentile: Math.round(weightPercentile),
		heightCategory,
		weightCategory,
		heightComment,
		weightComment,
		recommendations,
		overallAssessment,
	};
}

/**
 * Validate input data
 */
export function validateBabyGrowthInput(input: BabyGrowthInput): string[] {
	const errors: string[] = [];

	if (input.ageMonths < 0 || input.ageMonths > 60) {
		errors.push('Возраст должен быть от 0 до 60 месяцев');
	}

	if (input.height < 30 || input.height > 150) {
		errors.push('Рост должен быть от 30 до 150 см');
	}

	if (input.weight < 1 || input.weight > 50) {
		errors.push('Вес должен быть от 1 до 50 кг');
	}

	return errors;
}

/**
 * Convert age from years to months
 */
export function yearsToMonths(years: number): number {
	return Math.round(years * 12);
}

/**
 * Convert age from months to years
 */
export function monthsToYears(months: number): number {
	return Math.round((months / 12) * 10) / 10;
}
