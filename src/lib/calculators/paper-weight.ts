/**
 * Paper Weight Calculator Logic
 * Calculates paper weight based on density and number of sheets
 */

export interface PaperWeightInput {
	sheets: number;
	density: number; // g/m²
	format: 'A4' | 'A3' | 'A5' | 'Letter';
}

export interface PaperWeightResult {
	totalWeight: number; // in grams
	totalWeightKg: number; // in kilograms
	weightPerSheet: number; // in grams
	format: string;
	dimensions: {
		width: number;
		height: number;
		area: number; // in m²
	};
}

// Standard paper formats in mm
const PAPER_FORMATS = {
	A4: { width: 210, height: 297 },
	A3: { width: 297, height: 420 },
	A5: { width: 148, height: 210 },
	Letter: { width: 216, height: 279 },
};

export function calculatePaperWeight(
	input: PaperWeightInput
): PaperWeightResult {
	const format = PAPER_FORMATS[input.format];

	// Convert mm to m and calculate area
	const widthM = format.width / 1000;
	const heightM = format.height / 1000;
	const areaM2 = widthM * heightM;

	// Calculate weight per sheet
	const weightPerSheet = areaM2 * input.density;

	// Calculate total weight
	const totalWeight = weightPerSheet * input.sheets;
	const totalWeightKg = totalWeight / 1000;

	return {
		totalWeight: Math.round(totalWeight * 100) / 100,
		totalWeightKg: Math.round(totalWeightKg * 1000) / 1000,
		weightPerSheet: Math.round(weightPerSheet * 100) / 100,
		format: input.format,
		dimensions: {
			width: format.width,
			height: format.height,
			area: Math.round(areaM2 * 1000000) / 1000000,
		},
	};
}

// Common paper densities (g/m²)
export const PAPER_DENSITIES = {
	'80gsm': 80,
	'90gsm': 90,
	'100gsm': 100,
	'120gsm': 120,
	'150gsm': 150,
	'200gsm': 200,
	'250gsm': 250,
	'300gsm': 300,
};









