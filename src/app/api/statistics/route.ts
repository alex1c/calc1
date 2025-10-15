import { NextRequest, NextResponse } from 'next/server';
import {
	calculateStatistics,
	parseNumbers,
	validateInput,
} from '@/lib/calculators/statistics';

/**
 * API endpoint for statistics calculations
 * Supports calculation of various statistical measures
 */

/**
 * POST /api/statistics
 * Calculate statistics via API
 *
 * Request body:
 * - numbers: number[] (array of numbers)
 * - input?: string (alternative input as string)
 *
 * Example requests:
 * {
 *   "numbers": [1, 2, 3, 4, 5]
 * }
 *
 * {
 *   "input": "1, 2, 3, 4, 5"
 * }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { numbers, input } = body;

		let parsedNumbers: number[] = [];

		// Handle direct numbers array
		if (numbers && Array.isArray(numbers)) {
			parsedNumbers = numbers.filter(
				(num) => typeof num === 'number' && !isNaN(num) && isFinite(num)
			);
		}
		// Handle string input
		else if (input && typeof input === 'string') {
			const validation = validateInput(input);
			if (!validation.isValid) {
				return NextResponse.json(
					{
						error: validation.error || 'Invalid input',
					},
					{ status: 400 }
				);
			}
			parsedNumbers = parseNumbers(input);
		}
		// No valid input provided
		else {
			return NextResponse.json(
				{
					error: 'Either "numbers" array or "input" string is required',
				},
				{ status: 400 }
			);
		}

		// Validate parsed numbers
		if (parsedNumbers.length === 0) {
			return NextResponse.json(
				{
					error: 'No valid numbers found in input',
				},
				{ status: 400 }
			);
		}

		if (parsedNumbers.length < 2) {
			return NextResponse.json(
				{
					error: 'At least 2 numbers are required for meaningful statistics',
				},
				{ status: 400 }
			);
		}

		// Calculate statistics
		const result = calculateStatistics(parsedNumbers);

		return NextResponse.json({
			success: true,
			input: {
				numbers: parsedNumbers,
				count: parsedNumbers.length,
			},
			result,
		});
	} catch (error) {
		console.error('Statistics API error:', error);
		return NextResponse.json(
			{
				error: 'Internal server error',
				message:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

/**
 * GET /api/statistics
 * Get API documentation and examples
 */
export async function GET() {
	return NextResponse.json({
		name: 'Statistics Calculator API',
		version: '1.0.0',
		description: 'Calculate statistical measures via API',
		endpoints: {
			POST: {
				description: 'Calculate statistics for a dataset',
				parameters: {
					numbers: 'Array of numbers (optional)',
					input: 'String with numbers separated by commas or spaces (optional)',
				},
				examples: {
					numbers: {
						description: 'Calculate statistics from numbers array',
						request: {
							numbers: [1, 2, 3, 4, 5],
						},
						response: {
							success: true,
							input: {
								numbers: [1, 2, 3, 4, 5],
								count: 5,
							},
							result: {
								mean: 3,
								median: 3,
								mode: [],
								variance: 2,
								standardDeviation: 1.4142135623730951,
								min: 1,
								max: 5,
								count: 5,
								sum: 15,
							},
						},
					},
					input: {
						description: 'Calculate statistics from string input',
						request: {
							input: '1, 2, 3, 4, 5',
						},
						response: {
							success: true,
							input: {
								numbers: [1, 2, 3, 4, 5],
								count: 5,
							},
							result: {
								mean: 3,
								median: 3,
								mode: [],
								variance: 2,
								standardDeviation: 1.4142135623730951,
								min: 1,
								max: 5,
								count: 5,
								sum: 15,
							},
						},
					},
				},
			},
		},
		statisticalMeasures: {
			mean: 'Arithmetic mean (average)',
			median: 'Middle value of sorted data',
			mode: 'Most frequent value(s)',
			variance: 'Measure of data spread',
			standardDeviation: 'Square root of variance',
			min: 'Minimum value',
			max: 'Maximum value',
			count: 'Number of data points',
			sum: 'Sum of all values',
		},
		examples: {
			curl: {
				numbers:
					'curl -X POST https://calc1.ru/api/statistics -H "Content-Type: application/json" -d \'{"numbers":[1,2,3,4,5]}\'',
				input: 'curl -X POST https://calc1.ru/api/statistics -H "Content-Type: application/json" -d \'{"input":"1, 2, 3, 4, 5"}\'',
			},
		},
	});
}
