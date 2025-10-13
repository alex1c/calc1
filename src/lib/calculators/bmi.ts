/**
 * BMI Calculator Logic
 * Calculates Body Mass Index and provides weight category
 */

export interface BMIInput {
	weight: number; // in kg
	height: number; // in cm
}

export interface BMIResult {
	bmi: number;
	category: string;
	idealWeightRange: {
		min: number;
		max: number;
	};
	weightToLose?: number;
	weightToGain?: number;
}

export function calculateBMI(input: BMIInput): BMIResult {
	// Convert height from cm to meters
	const heightM = input.height / 100;

	// Calculate BMI
	const bmi = input.weight / (heightM * heightM);

	// Determine category
	let category: string;
	if (bmi < 18.5) {
		category = 'Underweight';
	} else if (bmi < 25) {
		category = 'Normal weight';
	} else if (bmi < 30) {
		category = 'Overweight';
	} else {
		category = 'Obese';
	}

	// Calculate ideal weight range (BMI 18.5-24.9)
	const minIdealWeight = 18.5 * heightM * heightM;
	const maxIdealWeight = 24.9 * heightM * heightM;

	let weightToLose: number | undefined;
	let weightToGain: number | undefined;

	if (bmi > 24.9) {
		weightToLose = input.weight - maxIdealWeight;
	} else if (bmi < 18.5) {
		weightToGain = minIdealWeight - input.weight;
	}

	return {
		bmi: Math.round(bmi * 10) / 10,
		category,
		idealWeightRange: {
			min: Math.round(minIdealWeight * 10) / 10,
			max: Math.round(maxIdealWeight * 10) / 10,
		},
		weightToLose: weightToLose
			? Math.round(weightToLose * 10) / 10
			: undefined,
		weightToGain: weightToGain
			? Math.round(weightToGain * 10) / 10
			: undefined,
	};
}









