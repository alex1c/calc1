'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	calculateArea,
	validateAreaInput,
	type AreaInput,
	type AreaResult,
	type FigureType,
} from '@/lib/calculators/area';

// Icons for different shapes
const CircleIcon = () => (
	<svg
		className='w-6 h-6'
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<circle
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth='2'
			fill='none'
		/>
	</svg>
);

const SquareIcon = () => (
	<svg
		className='w-6 h-6'
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<rect
			x='3'
			y='3'
			width='18'
			height='18'
			stroke='currentColor'
			strokeWidth='2'
			fill='none'
		/>
	</svg>
);

const TriangleIcon = () => (
	<svg
		className='w-6 h-6'
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<path
			d='M12 2L22 20H2L12 2Z'
			stroke='currentColor'
			strokeWidth='2'
			fill='none'
		/>
	</svg>
);

const getFigureIcon = (figureType: FigureType) => {
	switch (figureType) {
		case 'circle':
			return <CircleIcon />;
		case 'square':
			return <SquareIcon />;
		case 'triangle':
			return <TriangleIcon />;
		default:
			return null;
	}
};

/**
 * Area Calculator Component
 * 
 * A React component for calculating the area of geometric shapes.
 * 
 * Features:
 * - Supports three shapes: circle, square, and triangle
 * - Dynamic form fields based on selected shape
 * - Real-time calculation and validation
 * - Visual shape icons
 * - Formula display
 * - Responsive design
 * 
 * Uses the area calculation library from @/lib/calculators/area
 * for all mathematical operations.
 */
export default function AreaCalculator() {
	// Internationalization hook for translations
	const t = useTranslations();
	
	// Form state management
	const [input, setInput] = useState<AreaInput>({
		figureType: 'circle', // Selected geometric shape
		radius: 5, // Circle radius (default value)
		side: 0, // Square side length
		base: 0, // Triangle base length
		height: 0, // Triangle height
	});
	const [result, setResult] = useState<AreaResult | null>(null); // Calculated area result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors array

	/**
	 * Handle figure type change and reset related fields
	 * 
	 * When user changes the selected shape type, resets all parameters
	 * and sets default values for the new shape type.
	 * 
	 * @param figureType - New figure type to select
	 */
	const handleFigureTypeChange = (figureType: FigureType) => {
		setInput((prev) => ({
			...prev,
			figureType,
			// Reset all parameters
			radius: figureType === 'circle' ? 5 : 0,
			side: figureType === 'square' ? 5 : 0,
			base: figureType === 'triangle' ? 5 : 0,
			height: figureType === 'triangle' ? 5 : 0,
		}));
		setResult(null);
		setErrors([]);
	};

	/**
	 * Handle input field changes
	 */
	const handleInputChange = (field: keyof AreaInput, value: string) => {
		const numValue = parseFloat(value) || 0;
		setInput((prev) => ({
			...prev,
			[field]: numValue,
		}));
		setResult(null);
		setErrors([]);
	};

	/**
	 * Calculate area and handle validation
	 */
	const handleCalculate = () => {
		// Validate input
		const validation = validateAreaInput(input);
		if (!validation.isValid) {
			setErrors(validation.errors);
			setResult(null);
			return;
		}

		try {
			const calculation = calculateArea(input);
			setResult(calculation);
			setErrors([]);
		} catch (error) {
			setErrors([
				error instanceof Error
					? error.message
					: t('calculators.area.results.calculationError'),
			]);
			setResult(null);
		}
	};

	/**
	 * Clear all inputs and results
	 */
	const handleClear = () => {
		setInput({
			figureType: 'circle',
			radius: 0,
			side: 0,
			base: 0,
			height: 0,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8'>
				{/* Header */}
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						{t('calculators.area.title')}
					</h1>
					<p className='text-gray-600'>
						{t('calculators.area.description')}
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Input Form */}
					<div className='space-y-6'>
						<div className='bg-gray-50 rounded-lg p-6'>
							<h2 className='text-xl font-semibold text-gray-900 mb-4'>
								{t('calculators.area.form.title')}
							</h2>

							{/* Figure Type Selection */}
							<div className='mb-6'>
								<label className='block text-sm font-medium text-gray-700 mb-3'>
									{t('calculators.area.form.selectFigure')}
								</label>
								<div className='grid grid-cols-3 gap-3'>
									{(
										[
											'circle',
											'square',
											'triangle',
										] as FigureType[]
									).map((figureType) => (
										<button
											key={figureType}
											onClick={() =>
												handleFigureTypeChange(
													figureType
												)
											}
											className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
												input.figureType === figureType
													? 'border-blue-500 bg-blue-50 text-blue-700'
													: 'border-gray-200 hover:border-gray-300 text-gray-600'
											}`}
										>
											<div className='mb-2'>
												{getFigureIcon(figureType)}
											</div>
											<span className='text-sm font-medium'>
												{t(
													`calculators.area.form.figureTypes.${figureType}`
												)}
											</span>
										</button>
									))}
								</div>
							</div>

							{/* Dynamic Input Fields */}
							<div className='space-y-4'>
								{input.figureType === 'circle' && (
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											{t('calculators.area.form.radius')}
										</label>
										<input
											type='number'
											value={input.radius || ''}
											onChange={(e) =>
												handleInputChange(
													'radius',
													e.target.value
												)
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											min='0.01'
											step='0.01'
											placeholder='0.00'
										/>
									</div>
								)}

								{input.figureType === 'square' && (
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											{t('calculators.area.form.side')}
										</label>
										<input
											type='number'
											value={input.side || ''}
											onChange={(e) =>
												handleInputChange(
													'side',
													e.target.value
												)
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											min='0.01'
											step='0.01'
											placeholder='0.00'
										/>
									</div>
								)}

								{input.figureType === 'triangle' && (
									<>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												{t(
													'calculators.area.form.base'
												)}
											</label>
											<input
												type='number'
												value={input.base || ''}
												onChange={(e) =>
													handleInputChange(
														'base',
														e.target.value
													)
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
												min='0.01'
												step='0.01'
												placeholder='0.00'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												{t(
													'calculators.area.form.height'
												)}
											</label>
											<input
												type='number'
												value={input.height || ''}
												onChange={(e) =>
													handleInputChange(
														'height',
														e.target.value
													)
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
												min='0.01'
												step='0.01'
												placeholder='0.00'
											/>
										</div>
									</>
								)}
							</div>

							{/* Error Messages */}
							<AnimatePresence>
								{errors.length > 0 && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'
									>
										<div className='text-sm text-red-800'>
											{errors.map((error, index) => (
												<div key={index}>{error}</div>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Action Buttons */}
							<div className='flex gap-3 mt-6'>
								<button
									onClick={handleCalculate}
									className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium'
								>
									{t('common.calculate')}
								</button>
								<button
									onClick={handleClear}
									className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
								>
									{t('common.clear')}
								</button>
							</div>
						</div>
					</div>

					{/* Results */}
					<AnimatePresence>
						{result && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200'
							>
								<h3 className='text-xl font-semibold text-gray-900 mb-4'>
									{t('calculators.area.results.title')}
								</h3>

								<div className='space-y-4'>
									{/* Area Result */}
									<div className='text-center bg-white rounded-lg p-6 shadow-sm'>
										<div className='text-4xl font-bold text-blue-600 mb-2'>
											{result.area}
										</div>
										<div className='text-sm text-gray-600 mb-2'>
											{t('calculators.area.results.area')}
										</div>
										<div className='text-lg font-mono text-gray-800'>
											{result.formula}
										</div>
									</div>

									{/* Formula Explanation */}
									<div className='bg-white rounded-lg p-4 shadow-sm'>
										<div className='text-sm text-gray-600 mb-2'>
											{t(
												'calculators.area.results.formula'
											)}
											:
										</div>
										<div className='font-mono text-lg text-gray-800'>
											{result.formula}
										</div>
									</div>

									{/* Parameters Used */}
									<div className='bg-white rounded-lg p-4 shadow-sm'>
										<div className='text-sm text-gray-600 mb-2'>
											{t(
												'calculators.area.results.parametersUsed'
											)}
											:
										</div>
										<div className='space-y-1'>
											{result.figureType === 'circle' && (
												<div className='text-sm text-gray-800'>
													{t(
														'calculators.area.results.radius'
													)}
													: {result.parameters.radius}
												</div>
											)}
											{result.figureType === 'square' && (
												<div className='text-sm text-gray-800'>
													{t(
														'calculators.area.results.side'
													)}
													: {result.parameters.side}
												</div>
											)}
											{result.figureType ===
												'triangle' && (
												<>
													<div className='text-sm text-gray-800'>
														{t(
															'calculators.area.results.base'
														)}
														:{' '}
														{result.parameters.base}
													</div>
													<div className='text-sm text-gray-800'>
														{t(
															'calculators.area.results.height'
														)}
														:{' '}
														{
															result.parameters
																.height
														}
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
