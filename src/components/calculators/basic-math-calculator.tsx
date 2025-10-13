'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	calculateBasicMath,
	formatResult,
	getOperationSymbol,
	createExpressionString,
	type MathOperation,
	type BasicMathInput,
	type BasicMathResult,
} from '@/lib/calculators/basic-math';

/**
 * BasicMathCalculator Component
 *
 * A React component that provides a user interface for performing basic arithmetic
 * operations including addition, subtraction, multiplication, and division.
 * Features keyboard support, input validation, and result formatting.
 */
export default function BasicMathCalculator() {
	const t = useTranslations('math_basic');

	// State for input values
	const [number1, setNumber1] = useState<string>('');
	const [number2, setNumber2] = useState<string>('');
	const [operation, setOperation] = useState<MathOperation>('add');

	// State for calculation results
	const [result, setResult] = useState<BasicMathResult | null>(null);
	const [isCalculated, setIsCalculated] = useState<boolean>(false);

	/**
	 * Handles the calculation when the calculate button is clicked or Enter is pressed
	 */
	const handleCalculate = useCallback(() => {
		// Convert string inputs to numbers
		const num1 = parseFloat(number1);
		const num2 = parseFloat(number2);

		// Check if both inputs are provided
		if (number1.trim() === '' || number2.trim() === '') {
			setResult({
				result: null,
				error: 'Please enter both numbers',
				formattedResult: '',
			});
			setIsCalculated(true);
			return;
		}

		// Perform calculation
		const calculationResult = calculateBasicMath({
			number1: num1,
			number2: num2,
			operation,
		});

		setResult(calculationResult);
		setIsCalculated(true);
	}, [number1, number2, operation]);

	/**
	 * Handles input changes for number fields
	 */
	const handleNumberChange = useCallback(
		(value: string, field: 'number1' | 'number2') => {
			// Allow empty string, numbers, and decimal point
			if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
				if (field === 'number1') {
					setNumber1(value);
				} else {
					setNumber2(value);
				}
				// Reset calculation state when inputs change
				setIsCalculated(false);
				setResult(null);
			}
		},
		[]
	);

	/**
	 * Handles operation selection
	 */
	const handleOperationChange = useCallback((newOperation: MathOperation) => {
		setOperation(newOperation);
		// Reset calculation state when operation changes
		setIsCalculated(false);
		setResult(null);
	}, []);

	/**
	 * Handles keyboard events for Enter key
	 */
	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === 'Enter') {
				handleCalculate();
			}
		},
		[handleCalculate]
	);

	/**
	 * Clears all inputs and results
	 */
	const handleClear = useCallback(() => {
		setNumber1('');
		setNumber2('');
		setOperation('add');
		setResult(null);
		setIsCalculated(false);
	}, []);

	// Available operations with their symbols and labels
	const operations = [
		{
			value: 'add' as MathOperation,
			symbol: '+',
			label: t('operations.add'),
		},
		{
			value: 'subtract' as MathOperation,
			symbol: '−',
			label: t('operations.subtract'),
		},
		{
			value: 'multiply' as MathOperation,
			symbol: '×',
			label: t('operations.multiply'),
		},
		{
			value: 'divide' as MathOperation,
			symbol: '÷',
			label: t('operations.divide'),
		},
	];

	return (
		<div className='max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg'>
			{/* Header */}
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					{t('title')}
				</h1>
				<p className='text-gray-600'>{t('description')}</p>
			</div>

			{/* Calculator Form */}
			<div className='space-y-6'>
				{/* Number Inputs */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label
							htmlFor='number1'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							{t('number1')}
						</label>
						<input
							id='number1'
							type='text'
							value={number1}
							onChange={(e) =>
								handleNumberChange(e.target.value, 'number1')
							}
							onKeyPress={handleKeyPress}
							placeholder='0'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
						/>
					</div>
					<div>
						<label
							htmlFor='number2'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							{t('number2')}
						</label>
						<input
							id='number2'
							type='text'
							value={number2}
							onChange={(e) =>
								handleNumberChange(e.target.value, 'number2')
							}
							onKeyPress={handleKeyPress}
							placeholder='0'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
						/>
					</div>
				</div>

				{/* Operation Selection */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-3'>
						{t('operation')}
					</label>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
						{operations.map((op) => (
							<button
								key={op.value}
								onClick={() => handleOperationChange(op.value)}
								className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
									operation === op.value
										? 'bg-blue-600 text-white shadow-md transform scale-105'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
								}`}
							>
								<div className='text-lg font-bold'>
									{op.symbol}
								</div>
								<div className='text-xs mt-1'>{op.label}</div>
							</button>
						))}
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex gap-3'>
					<button
						onClick={handleCalculate}
						disabled={!number1.trim() || !number2.trim()}
						className='flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
					>
						{t('calculate')}
					</button>
					<button
						onClick={handleClear}
						className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors'
					>
						Clear
					</button>
				</div>

				{/* Results Display */}
				{isCalculated && result && (
					<div className='mt-6 p-6 bg-gray-50 rounded-lg'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							{t('result')}
						</h3>

						{result.error ? (
							<div className='text-red-600 font-medium'>
								{result.error}
							</div>
						) : (
							<div className='space-y-3'>
								{/* Expression */}
								<div className='text-gray-600'>
									{createExpressionString(
										parseFloat(number1),
										parseFloat(number2),
										operation
									)}{' '}
									=
								</div>

								{/* Result */}
								<div className='text-3xl font-bold text-blue-600'>
									{result.formattedResult}
								</div>

								{/* Additional Info */}
								<div className='text-sm text-gray-500'>
									Result rounded to 4 decimal places
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
