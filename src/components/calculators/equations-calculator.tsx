'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	parseAndSolve,
	solveLinear,
	solveQuadratic,
	type EquationSolution,
} from '@/lib/calculators/equations';

/**
 * Equation Calculator Component
 * 
 * A React component for solving linear and quadratic equations.
 * 
 * Features:
 * - Two input modes: parse equation string or manual coefficient entry
 * - Linear equation solving: ax + b = 0
 * - Quadratic equation solving: ax² + bx + c = 0
 * - Step-by-step solution display
 * - Input validation
 * - Responsive design
 * 
 * Equation types supported:
 * - Linear: ax + b = 0 (solution: x = -b/a)
 * - Quadratic: ax² + bx + c = 0 (solutions using quadratic formula)
 * 
 * Uses the equations calculation library from @/lib/calculators/equations
 * for all mathematical operations.
 */
export default function EquationsCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.equations');

	// State for equation input (parse mode)
	const [equation, setEquation] = useState(''); // Equation string to parse
	const [mode, setMode] = useState<'parse' | 'manual'>('parse'); // Input mode selection

	// State for manual input mode
	const [equationType, setEquationType] = useState<'linear' | 'quadratic'>(
		'linear' // Selected equation type
	);
	const [linearA, setLinearA] = useState(''); // Coefficient a for linear equation
	const [linearB, setLinearB] = useState(''); // Coefficient b for linear equation
	const [quadA, setQuadA] = useState(''); // Coefficient a for quadratic equation
	const [quadB, setQuadB] = useState(''); // Coefficient b for quadratic equation
	const [quadC, setQuadC] = useState(''); // Coefficient c for quadratic equation

	// State for results
	const [result, setResult] = useState<EquationSolution | null>(null); // Calculated solution

	/**
	 * Handle solve button click for parsed equation
	 * 
	 * Parses equation string and solves it automatically.
	 * The parser detects equation type (linear or quadratic) and extracts coefficients.
	 * 
	 * Process:
	 * 1. Check that equation string is not empty
	 * 2. Parse equation string using parseAndSolve
	 * 3. Update result state with solution
	 */
	const handleSolve = () => {
		if (!equation.trim()) return; // Don't solve empty equation

		// Parse and solve equation automatically
		const solution = parseAndSolve(equation);
		setResult(solution);
	};

	/**
	 * Handle solve button click for manual coefficients
	 * 
	 * Solves equation using manually entered coefficients.
	 * Routes to appropriate solver based on equation type.
	 * 
	 * Process:
	 * 1. Parse coefficient strings to numbers
	 * 2. Route to linear or quadratic solver based on equationType
	 * 3. Update result state with solution
	 */
	const handleManualSolve = () => {
		let solution: EquationSolution;

		if (equationType === 'linear') {
			// Linear equation: ax + b = 0
			const a = parseFloat(linearA) || 0; // Parse coefficient a
			const b = parseFloat(linearB) || 0; // Parse coefficient b
			solution = solveLinear(a, b); // Solve linear equation
		} else {
			// Quadratic equation: ax² + bx + c = 0
			const a = parseFloat(quadA) || 0; // Parse coefficient a
			const b = parseFloat(quadB) || 0; // Parse coefficient b
			const c = parseFloat(quadC) || 0; // Parse coefficient c
			solution = solveQuadratic(a, b, c); // Solve quadratic equation
		}

		setResult(solution);
	};

	/**
	 * Reset calculator
	 * 
	 * Clears all form inputs and resets result state.
	 * Called when user clicks the reset button.
	 */
	const handleReset = () => {
		setEquation(''); // Clear parsed equation
		setLinearA(''); // Clear linear coefficient a
		setLinearB(''); // Clear linear coefficient b
		setQuadA(''); // Clear quadratic coefficient a
		setQuadB(''); // Clear quadratic coefficient b
		setQuadC(''); // Clear quadratic coefficient c
		setResult(null); // Clear result
	};

	return (
		<div className='space-y-6'>
			{/* Mode Selection */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
					{t('form.title')}
				</h2>

				<div className='mb-4'>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						{t('form.mode')}
					</label>
					<div className='flex gap-4'>
						<button
							onClick={() => setMode('parse')}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								mode === 'parse'
									? 'bg-blue-600 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
							}`}
						>
							{t('form.modes.parse')}
						</button>
						<button
							onClick={() => setMode('manual')}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								mode === 'manual'
									? 'bg-blue-600 text-white'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
							}`}
						>
							{t('form.modes.manual')}
						</button>
					</div>
				</div>

				{/* Parse Mode */}
				{mode === 'parse' && (
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.enterEquation')}
							</label>
							<input
								type='text'
								value={equation}
								onChange={(e) => setEquation(e.target.value)}
								placeholder='2x + 5 = 15'
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
							<p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
								{t('form.examples')}: 2x + 5 = 15, x² + 2x + 1 =
								0, x^2 - 4 = 0
							</p>
						</div>

						<button
							onClick={handleSolve}
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors'
						>
							{t('form.calculate')}
						</button>
					</div>
				)}

				{/* Manual Mode */}
				{mode === 'manual' && (
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.equationType')}
							</label>
							<select
								value={equationType}
								onChange={(e) =>
									setEquationType(
										e.target.value as 'linear' | 'quadratic'
									)
								}
								className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value='linear'>
									{t('form.equationTypes.linear')}
								</option>
								<option value='quadratic'>
									{t('form.equationTypes.quadratic')}
								</option>
							</select>
						</div>

						{equationType === 'linear' ? (
							<div className='space-y-3'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{t('form.linearFormat')}: ax + b = 0
								</p>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.coefficientA')} (a)
										</label>
										<input
											type='number'
											step='any'
											value={linearA}
											onChange={(e) =>
												setLinearA(e.target.value)
											}
											className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
											placeholder='2'
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.coefficientB')} (b)
										</label>
										<input
											type='number'
											step='any'
											value={linearB}
											onChange={(e) =>
												setLinearB(e.target.value)
											}
											className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
											placeholder='5'
										/>
									</div>
								</div>
							</div>
						) : (
							<div className='space-y-3'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{t('form.quadraticFormat')}: ax² + bx + c =
									0
								</p>
								<div className='grid grid-cols-3 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.coefficientA')} (a)
										</label>
										<input
											type='number'
											step='any'
											value={quadA}
											onChange={(e) =>
												setQuadA(e.target.value)
											}
											className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
											placeholder='1'
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.coefficientB')} (b)
										</label>
										<input
											type='number'
											step='any'
											value={quadB}
											onChange={(e) =>
												setQuadB(e.target.value)
											}
											className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
											placeholder='2'
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.coefficientC')} (c)
										</label>
										<input
											type='number'
											step='any'
											value={quadC}
											onChange={(e) =>
												setQuadC(e.target.value)
											}
											className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
											placeholder='1'
										/>
									</div>
								</div>
							</div>
						)}

						<div className='flex gap-4'>
							<button
								onClick={handleManualSolve}
								className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors'
							>
								{t('form.calculate')}
							</button>
							<button
								onClick={handleReset}
								className='px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
							>
								{t('form.reset')}
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Results */}
			{result && (
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
						{t('results.title')}
					</h2>

					{/* Equation Type */}
					<div className='mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<p className='text-sm font-medium text-blue-800 dark:text-blue-300'>
							{result.type === 'linear' &&
								t('results.types.linear')}
							{result.type === 'quadratic' &&
								t('results.types.quadratic')}
							{result.type === 'unsupported' &&
								t('results.types.unsupported')}
						</p>
					</div>

					{/* Solutions */}
					{result.solutions.length > 0 && (
						<div className='mb-6'>
							<h3 className='text-lg font-semibold mb-3 text-gray-900 dark:text-white'>
								{result.solutions.length === 1
									? t('results.oneSolution')
									: t('results.twoSolutions')}
							</h3>
							<div className='space-y-2'>
								{result.solutions.map((solution, index) => (
									<div
										key={index}
										className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'
									>
										<p className='text-2xl font-bold text-green-700 dark:text-green-400'>
											x
											{result.solutions.length > 1
												? `₍${index + 1}₎`
												: ''}{' '}
											= {solution.toFixed(2)}
										</p>
									</div>
								))}
							</div>
						</div>
					)}

					{/* No Solutions */}
					{result.solutions.length === 0 &&
						!result.hasComplexRoots && (
							<div className='mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
								<p className='text-yellow-800 dark:text-yellow-300'>
									{t('results.noSolution')}
								</p>
							</div>
						)}

					{/* Complex Roots */}
					{result.hasComplexRoots && (
						<div className='mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
							<p className='text-purple-800 dark:text-purple-300'>
								{t('results.complexRoots')}
							</p>
						</div>
					)}

					{/* Steps */}
					{result.steps.length > 0 && (
						<div>
							<h3 className='text-lg font-semibold mb-3 text-gray-900 dark:text-white'>
								{t('results.steps')}
							</h3>
							<div className='space-y-2'>
								{result.steps.map((step, index) => (
									<div
										key={index}
										className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500'
									>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											{index + 1}. {step}
										</p>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Discriminant for Quadratic */}
					{result.type === 'quadratic' &&
						result.discriminant !== undefined && (
							<div className='mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg'>
								<p className='text-sm text-indigo-800 dark:text-indigo-300'>
									<strong>
										{t('results.discriminant')}:
									</strong>{' '}
									D = {result.discriminant.toFixed(2)}
								</p>
							</div>
						)}
				</div>
			)}
		</div>
	);
}
