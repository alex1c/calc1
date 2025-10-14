'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
// Removed shadcn/ui imports - using standard HTML elements with Tailwind CSS
import {
	calculateVolume,
	validateVolumeInput,
	type VolumeInput,
	type VolumeResult,
	type ShapeType,
} from '@/lib/calculators/volume';

// Icons for shapes
const SphereIcon = () => (
	<svg
		className='w-8 h-8 text-blue-600'
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

const CubeIcon = () => (
	<svg
		className='w-8 h-8 text-green-600'
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

const CylinderIcon = () => (
	<svg
		className='w-8 h-8 text-purple-600'
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<ellipse
			cx='12'
			cy='6'
			rx='8'
			ry='2'
			stroke='currentColor'
			strokeWidth='2'
			fill='none'
		/>
		<ellipse
			cx='12'
			cy='18'
			rx='8'
			ry='2'
			stroke='currentColor'
			strokeWidth='2'
			fill='none'
		/>
		<line
			x1='4'
			y1='6'
			x2='4'
			y2='18'
			stroke='currentColor'
			strokeWidth='2'
		/>
		<line
			x1='20'
			y1='6'
			x2='20'
			y2='18'
			stroke='currentColor'
			strokeWidth='2'
		/>
	</svg>
);

const getShapeIcon = (shapeType: ShapeType) => {
	switch (shapeType) {
		case 'sphere':
			return <SphereIcon />;
		case 'cube':
			return <CubeIcon />;
		case 'cylinder':
			return <CylinderIcon />;
		default:
			return null;
	}
};

export default function VolumeCalculator() {
	const t = useTranslations();
	const [input, setInput] = useState<VolumeInput>({
		shapeType: 'sphere',
		radius: 5,
		side: 0,
		height: 0,
	});
	const [result, setResult] = useState<VolumeResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const handleShapeTypeChange = (shapeType: ShapeType) => {
		setInput({
			shapeType,
			radius: shapeType === 'sphere' || shapeType === 'cylinder' ? 5 : 0,
			side: shapeType === 'cube' ? 5 : 0,
			height: shapeType === 'cylinder' ? 5 : 0,
		});
		setResult(null);
		setErrors([]);
	};

	const handleInputChange = (field: keyof VolumeInput, value: string) => {
		const numValue = parseFloat(value) || 0;
		setInput((prev) => ({
			...prev,
			[field]: numValue,
		}));
		setResult(null);
		setErrors([]);
	};

	const handleCalculate = () => {
		const validation = validateVolumeInput(input);
		if (!validation.isValid) {
			setErrors(validation.errors);
			setResult(null);
			return;
		}

		try {
			const calculation = calculateVolume(input);
			setResult(calculation);
			setErrors([]);
		} catch (error) {
			setErrors([
				error instanceof Error
					? error.message
					: t('calculators.volume.results.calculationError'),
			]);
			setResult(null);
		}
	};

	const handleClear = () => {
		setInput({
			shapeType: 'sphere',
			radius: 5,
			side: 0,
			height: 0,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg'>
				<div className='text-center p-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						{t('calculators.volume.title')}
					</h1>
					<p className='text-gray-600'>
						{t('calculators.volume.description')}
					</p>
				</div>

				<div className='p-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Input Form */}
						<div className='space-y-6'>
							<div className='bg-gray-50 rounded-lg p-6'>
								<div className='mb-6'>
									<h2 className='text-xl font-semibold text-gray-900'>
										{t('calculators.volume.form.title')}
									</h2>
								</div>
								<div className='space-y-6'>
									{/* Shape Type Selection */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-3'>
											{t(
												'calculators.volume.form.selectShape'
											)}
										</label>
										<div className='grid grid-cols-3 gap-3'>
											{(
												[
													'sphere',
													'cube',
													'cylinder',
												] as ShapeType[]
											).map((shapeType) => (
												<button
													key={shapeType}
													onClick={() =>
														handleShapeTypeChange(
															shapeType
														)
													}
													className={`flex flex-col items-center p-4 h-auto rounded-lg border transition-colors ${
														input.shapeType ===
														shapeType
															? 'bg-blue-600 text-white border-blue-600'
															: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
													}`}
												>
													<div className='mb-2'>
														{getShapeIcon(
															shapeType
														)}
													</div>
													<span className='text-sm font-medium'>
														{t(
															`calculators.volume.form.shapeTypes.${shapeType}`
														)}
													</span>
												</button>
											))}
										</div>
									</div>

									{/* Dynamic Input Fields */}
									<div className='space-y-4'>
										{input.shapeType === 'sphere' && (
											<div>
												<label className='block text-sm font-medium text-gray-700 mb-2'>
													{t(
														'calculators.volume.form.radius'
													)}
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
													step='0.01'
													placeholder='0.00'
													className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
												/>
											</div>
										)}

										{input.shapeType === 'cube' && (
											<div>
												<label className='block text-sm font-medium text-gray-700 mb-2'>
													{t(
														'calculators.volume.form.side'
													)}
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
													step='0.01'
													placeholder='0.00'
													className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
												/>
											</div>
										)}

										{input.shapeType === 'cylinder' && (
											<>
												<div>
													<label className='block text-sm font-medium text-gray-700 mb-2'>
														{t(
															'calculators.volume.form.radius'
														)}
													</label>
													<input
														type='number'
														value={
															input.radius || ''
														}
														onChange={(e) =>
															handleInputChange(
																'radius',
																e.target.value
															)
														}
														step='0.01'
														placeholder='0.00'
														className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
													/>
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700 mb-2'>
														{t(
															'calculators.volume.form.height'
														)}
													</label>
													<input
														type='number'
														value={
															input.height || ''
														}
														onChange={(e) =>
															handleInputChange(
																'height',
																e.target.value
															)
														}
														step='0.01'
														placeholder='0.00'
														className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
													/>
												</div>
											</>
										)}
									</div>

									{/* Error Messages */}
									<AnimatePresence>
										{errors.length > 0 && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className='bg-red-50 border border-red-200 rounded-md p-4'
											>
												<h4 className='text-sm font-medium text-red-800 mb-2'>
													{t(
														'calculators.volume.form.errors.title'
													)}
												</h4>
												<ul className='text-sm text-red-700 space-y-1'>
													{errors.map(
														(error, index) => (
															<li key={index}>
																• {error}
															</li>
														)
													)}
												</ul>
											</motion.div>
										)}
									</AnimatePresence>

									{/* Action Buttons */}
									<div className='flex gap-3'>
										<button
											onClick={handleCalculate}
											className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors'
										>
											{t('common.calculate')}
										</button>
										<button
											onClick={handleClear}
											className='px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors'
										>
											{t('common.clear')}
										</button>
									</div>
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
										{t('calculators.volume.results.title')}
									</h3>

									<div className='space-y-4'>
										{/* Volume Result */}
										<div className='text-center bg-white rounded-lg p-6 shadow-sm'>
											<div className='text-4xl font-bold text-blue-600 mb-2'>
												{result.volume}
											</div>
											<div className='text-sm text-gray-600 mb-2'>
												{t(
													'calculators.volume.results.volume'
												)}
											</div>
											<div className='text-lg font-mono text-gray-800'>
												{result.formula}
											</div>
										</div>

										{/* Formula Explanation */}
										<div className='bg-white rounded-lg p-4 shadow-sm'>
											<div className='text-sm text-gray-600 mb-2'>
												{t(
													'calculators.volume.results.formula'
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
													'calculators.volume.results.parametersUsed'
												)}
												:
											</div>
											<div className='space-y-1'>
												{result.shapeType ===
													'sphere' && (
													<div className='text-sm text-gray-800'>
														{t(
															'calculators.volume.results.radius'
														)}
														:{' '}
														{
															result.parameters
																.radius
														}
													</div>
												)}
												{result.shapeType ===
													'cube' && (
													<div className='text-sm text-gray-800'>
														{t(
															'calculators.volume.results.side'
														)}
														:{' '}
														{result.parameters.side}
													</div>
												)}
												{result.shapeType ===
													'cylinder' && (
													<>
														<div className='text-sm text-gray-800'>
															{t(
																'calculators.volume.results.radius'
															)}
															:{' '}
															{
																result
																	.parameters
																	.radius
															}
														</div>
														<div className='text-sm text-gray-800'>
															{t(
																'calculators.volume.results.height'
															)}
															:{' '}
															{
																result
																	.parameters
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
		</div>
	);
}
