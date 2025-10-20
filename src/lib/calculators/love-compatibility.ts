/**
 * Love Compatibility Calculator Logic
 * Calculates compatibility between two people based on their birth dates
 */

export interface LoveCompatibilityResult {
	percentage: number;
	compatibility: string;
	description: string;
	zodiacSign1: string;
	zodiacSign2: string;
	ageDifference: number;
	daysDifference: number;
}

export interface ZodiacSign {
	name: string;
	startDate: string;
	endDate: string;
	element: string;
	quality: string;
}

// Zodiac signs data
export const zodiacSigns: ZodiacSign[] = [
	{
		name: 'Aries',
		startDate: '03-21',
		endDate: '04-19',
		element: 'Fire',
		quality: 'Cardinal',
	},
	{
		name: 'Taurus',
		startDate: '04-20',
		endDate: '05-20',
		element: 'Earth',
		quality: 'Fixed',
	},
	{
		name: 'Gemini',
		startDate: '05-21',
		endDate: '06-20',
		element: 'Air',
		quality: 'Mutable',
	},
	{
		name: 'Cancer',
		startDate: '06-21',
		endDate: '07-22',
		element: 'Water',
		quality: 'Cardinal',
	},
	{
		name: 'Leo',
		startDate: '07-23',
		endDate: '08-22',
		element: 'Fire',
		quality: 'Fixed',
	},
	{
		name: 'Virgo',
		startDate: '08-23',
		endDate: '09-22',
		element: 'Earth',
		quality: 'Mutable',
	},
	{
		name: 'Libra',
		startDate: '09-23',
		endDate: '10-22',
		element: 'Air',
		quality: 'Cardinal',
	},
	{
		name: 'Scorpio',
		startDate: '10-23',
		endDate: '11-21',
		element: 'Water',
		quality: 'Fixed',
	},
	{
		name: 'Sagittarius',
		startDate: '11-22',
		endDate: '12-21',
		element: 'Fire',
		quality: 'Mutable',
	},
	{
		name: 'Capricorn',
		startDate: '12-22',
		endDate: '01-19',
		element: 'Earth',
		quality: 'Cardinal',
	},
	{
		name: 'Aquarius',
		startDate: '01-20',
		endDate: '02-18',
		element: 'Air',
		quality: 'Fixed',
	},
	{
		name: 'Pisces',
		startDate: '02-19',
		endDate: '03-20',
		element: 'Water',
		quality: 'Mutable',
	},
];

/**
 * Get zodiac sign for a given date
 */
export function getZodiacSign(date: Date): ZodiacSign {
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dateStr = `${month.toString().padStart(2, '0')}-${day
		.toString()
		.padStart(2, '0')}`;

	for (const sign of zodiacSigns) {
		if (dateStr >= sign.startDate && dateStr <= sign.endDate) {
			return sign;
		}
	}

	// Handle Capricorn (spans across year)
	if (month === 12 && day >= 22) return zodiacSigns[9];
	if (month === 1 && day <= 19) return zodiacSigns[9];

	return zodiacSigns[0]; // Default to Aries
}

/**
 * Calculate numerological value
 */
export function getNumerologicalValue(date: Date): number {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	let sum = day + month + year;

	// Reduce to single digit
	while (sum > 9) {
		sum = sum
			.toString()
			.split('')
			.reduce((acc, digit) => acc + parseInt(digit), 0);
	}

	return sum;
}

/**
 * Calculate elemental compatibility
 */
export function getElementalCompatibility(
	sign1: ZodiacSign,
	sign2: ZodiacSign
): number {
	const compatibleElements = {
		Fire: ['Air'],
		Air: ['Fire'],
		Water: ['Earth'],
		Earth: ['Water'],
	};

	if (sign1.element === sign2.element) return 20; // Same element
	if (
		compatibleElements[
			sign1.element as keyof typeof compatibleElements
		]?.includes(sign2.element)
	)
		return 15;
	return 5;
}

/**
 * Calculate quality compatibility
 */
export function getQualityCompatibility(
	sign1: ZodiacSign,
	sign2: ZodiacSign
): number {
	if (sign1.quality === sign2.quality) return 15;
	return 5;
}

/**
 * Calculate age compatibility
 */
export function getAgeCompatibility(date1: Date, date2: Date): number {
	const age1 = new Date().getFullYear() - date1.getFullYear();
	const age2 = new Date().getFullYear() - date2.getFullYear();
	const ageDiff = Math.abs(age1 - age2);

	if (ageDiff <= 2) return 20;
	if (ageDiff <= 5) return 15;
	if (ageDiff <= 10) return 10;
	if (ageDiff <= 15) return 5;
	return 0;
}

/**
 * Calculate seasonal compatibility
 */
export function getSeasonalCompatibility(date1: Date, date2: Date): number {
	const getSeason = (date: Date) => {
		const month = date.getMonth();
		if (month >= 2 && month <= 4) return 'Spring';
		if (month >= 5 && month <= 7) return 'Summer';
		if (month >= 8 && month <= 10) return 'Autumn';
		return 'Winter';
	};

	const season1 = getSeason(date1);
	const season2 = getSeason(date2);

	if (season1 === season2) return 10;
	return 5;
}

/**
 * Calculate love compatibility between two birth dates
 */
export function calculateLoveCompatibility(
	date1: Date,
	date2: Date
): LoveCompatibilityResult {
	const sign1 = getZodiacSign(date1);
	const sign2 = getZodiacSign(date2);

	// Calculate various compatibility factors
	const elementalCompat = getElementalCompatibility(sign1, sign2);
	const qualityCompat = getQualityCompatibility(sign1, sign2);
	const ageCompat = getAgeCompatibility(date1, date2);
	const seasonalCompat = getSeasonalCompatibility(date1, date2);

	// Numerological compatibility
	const num1 = getNumerologicalValue(date1);
	const num2 = getNumerologicalValue(date2);
	const numerologicalCompat = Math.abs(num1 - num2) <= 2 ? 15 : 5;

	// Calculate total compatibility percentage
	let totalCompat =
		elementalCompat +
		qualityCompat +
		ageCompat +
		seasonalCompat +
		numerologicalCompat;

	// Add some randomness for fun (but keep it reasonable)
	const randomFactor = Math.random() * 10 - 5; // -5 to +5
	totalCompat += randomFactor;

	// Ensure result is between 20 and 100
	totalCompat = Math.max(20, Math.min(100, Math.round(totalCompat)));

	// Determine compatibility level
	let compatibility: string;
	let description: string;

	if (totalCompat >= 90) {
		compatibility = 'Perfect Match';
		description =
			'You two are meant to be together! Your compatibility is off the charts.';
	} else if (totalCompat >= 80) {
		compatibility = 'Excellent Match';
		description =
			'You have an amazing connection and great potential for a lasting relationship.';
	} else if (totalCompat >= 70) {
		compatibility = 'Good Match';
		description =
			'You have good compatibility and can build a strong relationship together.';
	} else if (totalCompat >= 60) {
		compatibility = 'Average Match';
		description =
			'You have moderate compatibility. With effort, you can make it work.';
	} else if (totalCompat >= 50) {
		compatibility = 'Fair Match';
		description =
			'Your compatibility is fair. You might need to work harder on your relationship.';
	} else {
		compatibility = 'Challenging Match';
		description =
			'You might face some challenges, but love can overcome anything!';
	}

	// Calculate additional metrics
	const ageDifference = Math.abs(date1.getFullYear() - date2.getFullYear());
	const daysDifference = Math.abs(
		Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))
	);

	return {
		percentage: totalCompat,
		compatibility,
		description,
		zodiacSign1: sign1.name,
		zodiacSign2: sign2.name,
		ageDifference,
		daysDifference,
	};
}
