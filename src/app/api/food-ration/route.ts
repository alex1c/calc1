import { NextRequest, NextResponse } from 'next/server';
import {
	calculateBJU,
	validateBJUInput,
	type BJUInput,
	type BJUResult,
} from '@/lib/calculators/food-ration';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { type, data } = body;

		if (type === 'calculate') {
			// Validate input data
			const validation = validateBJUInput(data as BJUInput);
			if (!validation.isValid) {
				return NextResponse.json(
					{ error: validation.error },
					{ status: 400 }
				);
			}

			// Calculate BJU
			const result: BJUResult = calculateBJU(data as BJUInput);

			return NextResponse.json({
				success: true,
				type: 'calculate',
				result,
			});
		} else {
			return NextResponse.json(
				{ error: 'Invalid calculation type' },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
