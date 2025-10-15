import { NextRequest, NextResponse } from 'next/server';
import {
	calculatePregnancy,
	validatePregnancyInput,
	type PregnancyInput,
	type PregnancyResult,
} from '@/lib/calculators/pregnancy';

/**
 * API endpoint for pregnancy calculations
 * POST /api/pregnancy
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate request body
		if (!body.method || !body.date) {
			return NextResponse.json(
				{ error: 'Missing required fields: method and date' },
				{ status: 400 }
			);
		}

		// Parse and validate input
		const input: PregnancyInput = {
			method: body.method,
			date: new Date(body.date),
		};

		// Validate input
		const validation = validatePregnancyInput(input);
		if (!validation.isValid) {
			return NextResponse.json(
				{ error: validation.error },
				{ status: 400 }
			);
		}

		// Calculate pregnancy
		const result: PregnancyResult = calculatePregnancy(input);

		// Return result
		return NextResponse.json({
			success: true,
			result: {
				dueDate: result.dueDate.toISOString(),
				currentWeek: result.currentWeek,
				currentDay: result.currentDay,
				daysRemaining: result.daysRemaining,
				trimester: result.trimester,
				dueDateRange: {
					earliest: result.dueDateRange.earliest.toISOString(),
					latest: result.dueDateRange.latest.toISOString(),
				},
				conceptionDate: result.conceptionDate?.toISOString(),
				ivfDate: result.ivfDate?.toISOString(),
			},
		});
	} catch (error) {
		console.error('Pregnancy calculation error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

/**
 * GET endpoint for API information
 * GET /api/pregnancy
 */
export async function GET() {
	return NextResponse.json({
		name: 'Pregnancy Calculator API',
		version: '1.0.0',
		description: 'API for calculating pregnancy duration and due dates',
		endpoints: {
			POST: {
				path: '/api/pregnancy',
				description: 'Calculate pregnancy information',
				body: {
					method: 'lmp | conception | ivf',
					date: 'ISO date string',
				},
				response: {
					success: 'boolean',
					result: {
						dueDate: 'ISO date string',
						currentWeek: 'number',
						currentDay: 'number',
						daysRemaining: 'number',
						trimester: 'number',
						dueDateRange: {
							earliest: 'ISO date string',
							latest: 'ISO date string',
						},
						conceptionDate: 'ISO date string (optional)',
						ivfDate: 'ISO date string (optional)',
					},
				},
			},
		},
		examples: {
			lmp: {
				method: 'lmp',
				date: '2024-01-01',
			},
			conception: {
				method: 'conception',
				date: '2024-01-15',
			},
			ivf: {
				method: 'ivf',
				date: '2024-01-10',
			},
		},
	});
}
