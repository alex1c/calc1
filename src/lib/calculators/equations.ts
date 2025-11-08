/**
 * Equation Solver Library
 *
 * Provides functionality for solving linear and quadratic equations with step-by-step solutions.
 *
 * Features:
 * - Equation type detection (linear, quadratic, unsupported)
 * - Linear equation solving (ax + b = 0)
 * - Quadratic equation solving (ax² + bx + c = 0)
 * - Discriminant calculation for quadratic equations
 * - Step-by-step solution display
 * - Complex roots detection
 * - Equation parsing from string input
 *
 * Equation types:
 * - Linear: Equations with x but no x² (e.g., "2x + 5 = 15")
 * - Quadratic: Equations with x² (e.g., "x² + 2x + 1 = 0")
 * - Unsupported: Other equation types
 *
 * Solution methods:
 * - Linear: x = -b/a
 * - Quadratic: x = (-b ± √D) / (2a) where D = b² - 4ac
 */

/**
 * Represents the type of equation
 */
export type EquationType = 'linear' | 'quadratic' | 'unsupported';

/**
 * Represents the solution result for an equation
 */
export interface EquationSolution {
	type: EquationType;
	solutions: number[];
	steps: string[];
	discriminant?: number;
	hasComplexRoots?: boolean;
}

/**
 * Parse equation string and determine its type
 * @param equation - The equation string (e.g., "2x + 5 = 15" or "x^2 + 2x + 1 = 0")
 * @returns The type of equation
 */
export function detectEquationType(equation: string): EquationType {
	// Remove spaces
	const normalized = equation.replace(/\s/g, '');

	// Check for quadratic (x^2 or x²)
	if (normalized.includes('x^2') || normalized.includes('x²')) {
		return 'quadratic';
	}

	// Check for linear (only x, no powers)
	if (normalized.includes('x')) {
		return 'linear';
	}

	return 'unsupported';
}

/**
 * Solve linear equation of form: ax + b = 0
 * @param a - Coefficient of x
 * @param b - Constant term
 * @returns Solution result with steps
 */
export function solveLinear(a: number, b: number): EquationSolution {
	const steps: string[] = [];

	// Handle special cases
	if (a === 0) {
		if (b === 0) {
			steps.push('0x + 0 = 0');
			steps.push('Any value of x is a solution (infinite solutions)');
			return {
				type: 'linear',
				solutions: [],
				steps,
			};
		} else {
			steps.push(`0x + ${b} = 0`);
			steps.push(`${b} = 0 (contradiction)`);
			steps.push('No solution exists');
			return {
				type: 'linear',
				solutions: [],
				steps,
			};
		}
	}

	// Normal case: ax + b = 0
	steps.push(`${a}x + ${b} = 0`);
	steps.push(`${a}x = ${-b}`);
	const solution = -b / a;
	steps.push(`x = ${-b} / ${a}`);
	steps.push(`x = ${solution.toFixed(2)}`);

	return {
		type: 'linear',
		solutions: [solution],
		steps,
	};
}

/**
 * Solve quadratic equation of form: ax² + bx + c = 0
 * @param a - Coefficient of x²
 * @param b - Coefficient of x
 * @param c - Constant term
 * @returns Solution result with steps
 */
export function solveQuadratic(
	a: number,
	b: number,
	c: number
): EquationSolution {
	const steps: string[] = [];

	// Handle special case where a = 0 (becomes linear)
	if (a === 0) {
		steps.push('Coefficient of x² is 0, this is a linear equation');
		return solveLinear(b, c);
	}

	// Display original equation
	steps.push(`${a}x² + ${b}x + ${c} = 0`);

	// Calculate discriminant: D = b² - 4ac
	const discriminant = b * b - 4 * a * c;
	steps.push(
		`Discriminant: D = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`
	);

	// Check discriminant to determine number of solutions
	if (discriminant < 0) {
		steps.push('D < 0: No real solutions (complex roots)');
		return {
			type: 'quadratic',
			solutions: [],
			steps,
			discriminant,
			hasComplexRoots: true,
		};
	} else if (discriminant === 0) {
		// One solution: x = -b / (2a)
		const solution = -b / (2 * a);
		steps.push('D = 0: One solution (repeated root)');
		steps.push(`x = -b / (2a) = ${-b} / ${2 * a} = ${solution.toFixed(2)}`);
		return {
			type: 'quadratic',
			solutions: [solution],
			steps,
			discriminant,
		};
	} else {
		// Two solutions: x = (-b ± √D) / (2a)
		const sqrtD = Math.sqrt(discriminant);
		const solution1 = (-b + sqrtD) / (2 * a);
		const solution2 = (-b - sqrtD) / (2 * a);

		steps.push('D > 0: Two solutions');
		steps.push(
			`x₁ = (-b + √D) / (2a) = (${-b} + ${sqrtD.toFixed(2)}) / ${
				2 * a
			} = ${solution1.toFixed(2)}`
		);
		steps.push(
			`x₂ = (-b - √D) / (2a) = (${-b} - ${sqrtD.toFixed(2)}) / ${
				2 * a
			} = ${solution2.toFixed(2)}`
		);

		return {
			type: 'quadratic',
			solutions: [solution1, solution2],
			steps,
			discriminant,
		};
	}
}

/**
 * Parse and solve equation from string input
 * @param equation - The equation string
 * @returns Solution result
 */
export function parseAndSolve(equation: string): EquationSolution {
	try {
		// Detect equation type
		const type = detectEquationType(equation);

		if (type === 'unsupported') {
			return {
				type: 'unsupported',
				solutions: [],
				steps: [
					'Unsupported equation type. Please enter a linear or quadratic equation.',
				],
			};
		}

		// Remove spaces and convert to lowercase
		let normalized = equation.toLowerCase().replace(/\s/g, '');

		// Split by equals sign
		const parts = normalized.split('=');
		if (parts.length !== 2) {
			throw new Error('Invalid equation format');
		}

		// Move everything to left side (subtract right side from left)
		normalized = `(${parts[0]})-(${parts[1]})`;

		// Replace x² with x^2 for consistency
		normalized = normalized.replace(/x²/g, 'x^2');

		if (type === 'linear') {
			// Extract coefficients for ax + b = 0
			let a = 0;
			let b = 0;

			// Simple regex to extract coefficients
			const xMatch = normalized.match(/([+-]?\d*\.?\d*)x/);
			if (xMatch) {
				const coef = xMatch[1];
				a =
					coef === '' || coef === '+'
						? 1
						: coef === '-'
						? -1
						: parseFloat(coef);
			}

			// Extract constant
			const withoutX = normalized.replace(/[+-]?\d*\.?\d*x/g, '');
			const numbers = withoutX.match(/[+-]?\d+\.?\d*/g);
			if (numbers) {
				b = numbers.reduce((sum, num) => sum + parseFloat(num), 0);
			}

			return solveLinear(a, b);
		} else if (type === 'quadratic') {
			// Extract coefficients for ax² + bx + c = 0
			let a = 0;
			let b = 0;
			let c = 0;

			// Extract coefficient of x^2
			const x2Match = normalized.match(/([+-]?\d*\.?\d*)x\^2/);
			if (x2Match) {
				const coef = x2Match[1];
				a =
					coef === '' || coef === '+'
						? 1
						: coef === '-'
						? -1
						: parseFloat(coef);
			}

			// Extract coefficient of x (but not x^2)
			const withoutX2 = normalized.replace(/[+-]?\d*\.?\d*x\^2/g, '');
			const xMatch = withoutX2.match(/([+-]?\d*\.?\d*)x/);
			if (xMatch) {
				const coef = xMatch[1];
				b =
					coef === '' || coef === '+'
						? 1
						: coef === '-'
						? -1
						: parseFloat(coef);
			}

			// Extract constant
			const withoutX = withoutX2.replace(/[+-]?\d*\.?\d*x/g, '');
			const numbers = withoutX.match(/[+-]?\d+\.?\d*/g);
			if (numbers) {
				c = numbers.reduce((sum, num) => sum + parseFloat(num), 0);
			}

			return solveQuadratic(a, b, c);
		}

		return {
			type: 'unsupported',
			solutions: [],
			steps: ['Unable to parse equation'],
		};
	} catch (error) {
		return {
			type: 'unsupported',
			solutions: [],
			steps: ['Error parsing equation: ' + (error as Error).message],
		};
	}
}
