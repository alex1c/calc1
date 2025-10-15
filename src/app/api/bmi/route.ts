import { NextRequest, NextResponse } from 'next/server';
import {
	calculateBMIResult,
	validateBMIInput,
	type Gender,
} from '@/lib/calculators/bmi';

/**
 * API endpoint for BMI calculations
 * Supports BMI calculation with validation
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { weight, height, gender = 'male' } = body;

		// Validate input
		if (!weight || !height) {
			return NextResponse.json(
				{ error: 'Weight and height are required' },
				{ status: 400 }
			);
		}

		const numWeight = parseFloat(weight);
		const numHeight = parseFloat(height);

		const validation = validateBMIInput(numWeight, numHeight);

		if (!validation.isValid) {
			return NextResponse.json(
				{ error: validation.error },
				{ status: 400 }
			);
		}

		// Calculate BMI result
		const result = calculateBMIResult(
			numWeight,
			numHeight,
			gender as Gender
		);

		return NextResponse.json({
			success: true,
			result,
		});
	} catch (error) {
		console.error('BMI API Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

/**
 * GET endpoint for API information
 */
export async function GET() {
	return NextResponse.json({
		name: 'BMI Calculator API',
		version: '1.0.0',
		description: 'API for calculating Body Mass Index (BMI)',
		endpoints: {
			POST: {
				description: 'Calculate BMI',
				parameters: {
					weight: 'Weight in kg (required)',
					height: 'Height in cm (required)',
					gender: 'Gender: male or female (optional, default: male)',
				},
				example: {
					weight: 70,
					height: 175,
					gender: 'male',
				},
			},
		},
	});
}
