import { NextRequest, NextResponse } from 'next/server';
import {
	parseAndSolve,
	solveLinear,
	solveQuadratic,
} from '@/lib/calculators/equations';

/**
 * API endpoint for equation solving
 * Supports both parsed equations and manual coefficient input
 */

/**
 * POST /api/equations
 * Solve equations via API
 *
 * Request body:
 * - mode: 'parse' | 'linear' | 'quadratic'
 * - equation?: string (for parse mode)
 * - a?, b?, c?: number (for manual mode)
 *
 * Example requests:
 * {
 *   "mode": "parse",
 *   "equation": "2x + 5 = 15"
 * }
 *
 * {
 *   "mode": "linear",
 *   "a": 2,
 *   "b": 5
 * }
 *
 * {
 *   "mode": "quadratic",
 *   "a": 1,
 *   "b": 2,
 *   "c": 1
 * }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { mode, equation, a, b, c } = body;

		// Validate mode
		if (!mode || !['parse', 'linear', 'quadratic'].includes(mode)) {
			return NextResponse.json(
				{
					error: 'Invalid mode. Must be one of: parse, linear, quadratic',
				},
				{ status: 400 }
			);
		}

		// Handle parse mode
		if (mode === 'parse') {
			if (!equation || typeof equation !== 'string') {
				return NextResponse.json(
					{
						error: 'Equation string is required for parse mode',
					},
					{ status: 400 }
				);
			}

			const result = parseAndSolve(equation);

			return NextResponse.json({
				success: true,
				mode: 'parse',
				input: { equation },
				result,
			});
		}

		// Handle linear mode
		if (mode === 'linear') {
			const aNum = typeof a === 'number' ? a : parseFloat(a);
			const bNum = typeof b === 'number' ? b : parseFloat(b);

			if (isNaN(aNum) || isNaN(bNum)) {
				return NextResponse.json(
					{
						error: 'Coefficients a and b must be valid numbers',
					},
					{ status: 400 }
				);
			}

			const result = solveLinear(aNum, bNum);

			return NextResponse.json({
				success: true,
				mode: 'linear',
				input: { a: aNum, b: bNum },
				result,
			});
		}

		// Handle quadratic mode
		if (mode === 'quadratic') {
			const aNum = typeof a === 'number' ? a : parseFloat(a);
			const bNum = typeof b === 'number' ? b : parseFloat(b);
			const cNum = typeof c === 'number' ? c : parseFloat(c);

			if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
				return NextResponse.json(
					{
						error: 'Coefficients a, b, and c must be valid numbers',
					},
					{ status: 400 }
				);
			}

			const result = solveQuadratic(aNum, bNum, cNum);

			return NextResponse.json({
				success: true,
				mode: 'quadratic',
				input: { a: aNum, b: bNum, c: cNum },
				result,
			});
		}

		// Should never reach here
		return NextResponse.json(
			{
				error: 'Unknown error occurred',
			},
			{ status: 500 }
		);
	} catch (error) {
		console.error('Equation API error:', error);
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
 * GET /api/equations
 * Get API documentation and examples
 */
export async function GET() {
	return NextResponse.json({
		name: 'Equations Solver API',
		version: '1.0.0',
		description: 'Solve linear and quadratic equations via API',
		endpoints: {
			POST: {
				description: 'Solve an equation',
				modes: {
					parse: {
						description: 'Parse and solve equation from string',
						parameters: {
							mode: 'parse',
							equation: 'Equation string (e.g., "2x + 5 = 15")',
						},
						example: {
							mode: 'parse',
							equation: '2x + 5 = 15',
						},
					},
					linear: {
						description: 'Solve linear equation ax + b = 0',
						parameters: {
							mode: 'linear',
							a: 'Coefficient of x',
							b: 'Constant term',
						},
						example: {
							mode: 'linear',
							a: 2,
							b: 5,
						},
					},
					quadratic: {
						description:
							'Solve quadratic equation ax² + bx + c = 0',
						parameters: {
							mode: 'quadratic',
							a: 'Coefficient of x²',
							b: 'Coefficient of x',
							c: 'Constant term',
						},
						example: {
							mode: 'quadratic',
							a: 1,
							b: 2,
							c: 1,
						},
					},
				},
			},
		},
		examples: {
			curl: {
				parse: 'curl -X POST https://calc1.ru/api/equations -H "Content-Type: application/json" -d \'{"mode":"parse","equation":"2x + 5 = 15"}\'',
				linear: 'curl -X POST https://calc1.ru/api/equations -H "Content-Type: application/json" -d \'{"mode":"linear","a":2,"b":5}\'',
				quadratic:
					'curl -X POST https://calc1.ru/api/equations -H "Content-Type: application/json" -d \'{"mode":"quadratic","a":1,"b":2,"c":1}\'',
			},
		},
	});
}
