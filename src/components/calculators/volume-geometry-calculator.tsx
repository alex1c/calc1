'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Calculator,
	Info,
	RotateCcw,
	Zap,
	Shapes,
	Circle,
	Square,
	Cylinder,
} from 'lucide-react';
import {
	calculateVolumeGeometry,
	validateVolumeGeometryInput,
	formatVolumeValue,
	getShapeFormula,
	getShapeParameters,
	getShapeExamples,
	getShapeTips,
	getShapeApplications,
	VolumeGeometryInput,
	VolumeGeometryResult,
	ShapeType,
} from '@/lib/calculators/volume-geometry';

/**
 * Volume Geometry Calculator Component
 * Calculates volumes of sphere, cube, and cylinder
 */
export default function VolumeGeometryCalculator() {
	const t = useTranslations('calculators.volume');
	const [input, setInput] = useState<VolumeGeometryInput>({
		shape: 'sphere',
		radius: 5,
	});
	const [result, setResult] = useState<VolumeGeometryResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Auto-calculate when input changes
	useEffect(() => {
		const timer = setTimeout(() => {
			if (input.shape) {
				setIsCalculating(true);
				setError(null);
				try {
					const volumeResult = calculateVolumeGeometry(input);
					setResult(volumeResult);
				} catch (err) {
					console.error('Calculation error:', err);
					setError(
						err instanceof Error ? err.message : 'calculationError'
					);
					setResult(null);
				} finally {
					setIsCalculating(false);
				}
			} else {
				setResult(null);
			}
		}, 300); // Debounce calculation

		return () => clearTimeout(timer);
	}, [input]);

	const handleShapeChange = (shape: ShapeType) => {
		// Reset parameters when shape changes
		const newInput: VolumeGeometryInput = { shape };

		switch (shape) {
			case 'sphere':
				newInput.radius = 5;
				break;
			case 'cube':
				newInput.side = 5;
				break;
			case 'cylinder':
				newInput.radius = 5;
				newInput.height = 10;
				break;
		}

		setInput(newInput);
		setError(null);
	};

	const handleParameterChange = (
		field: keyof VolumeGeometryInput,
		value: number
	) => {
		// Validate numeric inputs
		if (value > 1e6) return;

		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setError(null);
	};

	const handleReset = () => {
		setInput({
			shape: 'sphere',
			radius: 5,
		});
		setResult(null);
		setError(null);
	};

	const getShapeIcon = (shape: ShapeType) => {
		switch (shape) {
			case 'sphere':
				return <Circle className='w-6 h-6' />;
			case 'cube':
				return <Square className='w-6 h-6' />;
			case 'cylinder':
				return <Cylinder className='w-6 h-6' />;
		}
	};

	const getShapeColor = (shape: ShapeType) => {
		switch (shape) {
			case 'sphere':
				return 'blue';
			case 'cube':
				return 'green';
			case 'cylinder':
				return 'purple';
		}
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-blue-100 dark:bg-blue-900 rounded-full'>
							<Shapes className='w-12 h-12 text-blue-600 dark:text-blue-400' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Shape Selection */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
					{(['sphere', 'cube', 'cylinder'] as ShapeType[]).map(
						(shape) => (
							<button
								key={shape}
								onClick={() => handleShapeChange(shape)}
								className={`p-4 rounded-lg border-2 transition-all ${
									input.shape === shape
										? `border-${getShapeColor(
												shape
										  )}-500 bg-${getShapeColor(
												shape
										  )}-50 dark:bg-${getShapeColor(
												shape
										  )}-900/20`
										: 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
								}`}
							>
								<div className='flex items-center justify-center mb-2'>
									<div
										className={`p-2 rounded-full ${
											input.shape === shape
												? `bg-${getShapeColor(
														shape
												  )}-100 dark:bg-${getShapeColor(
														shape
												  )}-800`
												: 'bg-gray-100 dark:bg-gray-700'
										}`}
									>
										{getShapeIcon(shape)}
									</div>
								</div>
								<h3
									className={`font-semibold ${
										input.shape === shape
											? `text-${getShapeColor(
													shape
											  )}-700 dark:text-${getShapeColor(
													shape
											  )}-300`
											: 'text-gray-700 dark:text-gray-300'
									}`}
								>
									{t(`form.shapeTypes.${shape}`)}
								</h3>
								<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
									{getShapeFormula(shape)}
								</p>
							</button>
						)
					)}
				</div>
			</div>

			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
					{t('form.title')}
				</h2>

				{/* Parameters Input */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					{input.shape === 'sphere' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.radius')}
							</label>
							<input
								type='number'
								value={input.radius || ''}
								onChange={(e) =>
									handleParameterChange(
										'radius',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								placeholder='5'
								step='0.1'
								min='0.1'
							/>
						</div>
					)}

					{input.shape === 'cube' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.side')}
							</label>
							<input
								type='number'
								value={input.side || ''}
								onChange={(e) =>
									handleParameterChange(
										'side',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								placeholder='5'
								step='0.1'
								min='0.1'
							/>
						</div>
					)}

					{input.shape === 'cylinder' && (
						<>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.radius')}
								</label>
								<input
									type='number'
									value={input.radius || ''}
									onChange={(e) =>
										handleParameterChange(
											'radius',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									placeholder='5'
									step='0.1'
									min='0.1'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.height')}
								</label>
								<input
									type='number'
									value={input.height || ''}
									onChange={(e) =>
										handleParameterChange(
											'height',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									placeholder='10'
									step='0.1'
									min='0.1'
								/>
							</div>
						</>
					)}
				</div>

				{/* Error Display */}
				{error && (
					<div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
						<p className='text-red-700 dark:text-red-300'>
							{t(`form.errors.${error}`)}
						</p>
					</div>
				)}

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						onClick={() => {
							if (input.shape) {
								setIsCalculating(true);
								setError(null);
								try {
									const volumeResult =
										calculateVolumeGeometry(input);
									setResult(volumeResult);
								} catch (err) {
									console.error('Calculation error:', err);
									setError(
										err instanceof Error
											? err.message
											: 'calculationError'
									);
									setResult(null);
								} finally {
									setIsCalculating(false);
								}
							}
						}}
						disabled={isCalculating}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Zap className='w-4 h-4' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors'
					>
						<RotateCcw className='w-4 h-4' />
						{t('form.clear')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'
				>
					<div className='text-center mb-8'>
						<div className='flex justify-center mb-4'>
							<Calculator className='w-8 h-8 text-blue-600' />
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('results.title')}
						</h2>
					</div>

					{/* Main Result */}
					<div className='text-center mb-8'>
						<div className='inline-flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
							<span className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
								{formatVolumeValue(result.volume)} см³
							</span>
						</div>
					</div>

					{/* Formula and Parameters */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('results.formula')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 font-mono text-sm'>
								{result.formula}
							</p>
						</div>
						<div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('results.parametersUsed')}
							</h3>
							<div className='space-y-1 text-sm text-gray-700 dark:text-gray-300'>
								{result.parameters.radius !== undefined && (
									<p>
										{t('results.radius')}:{' '}
										{result.parameters.radius}
									</p>
								)}
								{result.parameters.side !== undefined && (
									<p>
										{t('results.side')}:{' '}
										{result.parameters.side}
									</p>
								)}
								{result.parameters.height !== undefined && (
									<p>
										{t('results.height')}:{' '}
										{result.parameters.height}
									</p>
								)}
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Tips */}
			<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
					<h4 className='font-semibold text-blue-800 dark:text-blue-200'>
						Полезные советы
					</h4>
				</div>
				<div className='space-y-2 text-sm text-blue-700 dark:text-blue-300'>
					{getShapeTips(input.shape).map((tip, index) => (
						<p key={index}>• {tip}</p>
					))}
				</div>
			</div>
		</div>
	);
}
