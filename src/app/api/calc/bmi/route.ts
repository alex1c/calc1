import { NextRequest, NextResponse } from 'next/server';
import { calculateBMI, type BMIInput } from '@/lib/calculators/bmi';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const input: BMIInput = body;

		// Validate input
		if (!input.weight || !input.height) {
			return NextResponse.json(
				{ error: 'Missing required fields: weight, height' },
				{ status: 400 }
			);
		}

		if (input.weight < 1 || input.height < 1) {
			return NextResponse.json(
				{ error: 'Weight and height must be positive numbers' },
				{ status: 400 }
			);
		}

		const result = calculateBMI(input);

		return NextResponse.json({
			success: true,
			result,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({
		message: 'BMI Calculator API',
		usage: 'POST with { weight: number, height: number }',
		note: 'Weight in kg, height in cm',
	});
}










