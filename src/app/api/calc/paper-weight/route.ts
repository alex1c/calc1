import { NextRequest, NextResponse } from 'next/server';
import {
	calculatePaperWeight,
	type PaperWeightInput,
} from '@/lib/calculators/paper-weight';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const input: PaperWeightInput = body;

		// Validate input
		if (!input.sheets || !input.density || !input.format) {
			return NextResponse.json(
				{ error: 'Missing required fields: sheets, density, format' },
				{ status: 400 }
			);
		}

		if (input.sheets < 1 || input.density < 1) {
			return NextResponse.json(
				{ error: 'Sheets and density must be positive numbers' },
				{ status: 400 }
			);
		}

		const result = calculatePaperWeight(input);

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
		message: 'Paper Weight Calculator API',
		usage: 'POST with { sheets: number, density: number, format: string }',
		formats: ['A4', 'A3', 'A5', 'Letter'],
	});
}










