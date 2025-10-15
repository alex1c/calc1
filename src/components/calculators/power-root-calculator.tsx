'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	calculatePowerRoot,
	validatePowerRootInput,
	type PowerRootInput,
	type PowerRootResult,
	type CalculationMode,
} from '@/lib/calculators/power-root';

// Icons for modes
const PowerIcon = () => (
	<svg
		className='w-8 h-8 text-blue-600'
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<path d='M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z' />
	</svg>
);

const RootIcon = () => (
	<svg
		className='w-8 h-8 text-green-600'
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<path d='M3 13H5V21H3V13M7 3H9V21H7V3M11 8H13V21H11V8M15 3H17V21H15V3M19 8H21V21H19V8Z' />
	</svg>
);

const getModeIcon = (mode: CalculationMode) => {
	switch (mode) {
		case 'power':
			return <PowerIcon />;
		case 'root':
			return <RootIcon />;
		default:
			return null;
	}
};

export default function PowerRootCalculator() {
	const t = useTranslations();
	const [input, setInput] = useState<PowerRootInput>({
		mode: 'power',
		base: 2,
		exponent: 3,
	});
	const [result, setResult] = useState<PowerRootResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const handleModeChange = (mode: CalculationMode) => {
		setInput((prev) => ({
			...prev,
			mode,
		}));
		setResult(null);
		setErrors([]);
	};

	const handleInputChange = (field: keyof PowerRootInput, value: string) => {
		const numValue = parseFloat(value) || 0;
		setInput((prev) => ({
			...prev,
			[field]: numValue,
		}));
		setResult(null);
		setErrors([]);
	};

	const handleCalculate = () => {
		const validation = validatePowerRootInput(input);
		if (!validation.isValid) {
			setErrors(validation.errors);
			setResult(null);
			return;
		}

		try {
			const calculation = calculatePowerRoot(input);
			setResult(calculation);
			setErrors([]);
		} catch (error) {
			setErrors([
				error instanceof Error
					? error.message
					: t('calculators.powerRoot.results.calculationError'),
			]);
			setResult(null);
		}
	};

	const handleClear = () => {
		setInput({
			mode: 'power',
			base: 2,
			exponent: 3,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg'>
				<div className='text-center p-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						{t('calculators.powerRoot.title')}
					</h1>
					<p className='text-gray-600'>
						{t('calculators.powerRoot.description')}
					</p>
				</div>

				<div className='p-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Input Form */}
						<div className='space-y-6'>
							<div className='bg-gray-50 rounded-lg p-6'>
								<div className='mb-6'>
									<h2 className='text-xl font-semibold text-gray-900'>
										{t('calculators.powerRoot.form.title')}
									</h2>
								</div>
								<div className='space-y-6'>
									{/* Mode Selection */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-3'>
											{t(
												'calculators.powerRoot.form.mode'
											)}
										</label>
										<div className='grid grid-cols-2 gap-3'>
											{(
												[
													'power',
													'root',
												] as CalculationMode[]
											).map((mode) => (
												<button
													key={mode}
													onClick={() =>
														handleModeChange(mode)
													}
													className={`flex flex-col items-center p-4 h-auto rounded-lg border transition-colors ${
														input.mode === mode
															? 'bg-blue-600 text-white border-blue-600'
															: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
													}`}
												>
													<div className='mb-2'>
														{getModeIcon(mode)}
													</div>
													<span className='text-sm font-medium'>
														{t(
															`calculators.powerRoot.form.modes.${mode}`
														)}
													</span>
												</button>
											))}
										</div>
									</div>

									{/* Dynamic Input Fields */}
									<div className='space-y-4'>
										{input.mode === 'power' && (
											<>
												<div>
													<label className='block text-sm font-medium text-gray-700 mb-2'>
														{t(
															'calculators.powerRoot.form.base'
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
														step='0.01'
														placeholder='0.00'
														className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
													/>
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700 mb-2'>
														{t(
															'calculators.powerRoot.form.exponent'
														)}
													</label>
													<input
														type='number'
														value={
															input.exponent || ''
														}
														onChange={(e) =>
															handleInputChange(
																'exponent',
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

										{input.mode === 'root' && (
											<>
												<div>
													<label className='block text-sm font-medium text-gray-700 mb-2'>
														{t(
															'calculators.powerRoot.form.number'
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
														step='0.01'
														placeholder='0.00'
														className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
													/>
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700 mb-2'>
														{t(
															'calculators.powerRoot.form.rootDegree'
														)}
													</label>
													<input
														type='number'
														value={
															input.exponent || ''
														}
														onChange={(e) =>
															handleInputChange(
																'exponent',
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
														'calculators.powerRoot.form.errors.title'
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
										{t(
											'calculators.powerRoot.results.title'
										)}
									</h3>

									<div className='space-y-4'>
										{/* Result */}
										<div className='text-center bg-white rounded-lg p-6 shadow-sm'>
											<div className='text-4xl font-bold text-blue-600 mb-2'>
												{result.result}
											</div>
											<div className='text-sm text-gray-600 mb-2'>
												{t(
													'calculators.powerRoot.results.result'
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
													'calculators.powerRoot.results.formula'
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
													'calculators.powerRoot.results.parametersUsed'
												)}
												:
											</div>
											<div className='space-y-1'>
												{result.mode === 'power' && (
													<>
														<div className='text-sm text-gray-800'>
															{t(
																'calculators.powerRoot.results.base'
															)}
															: {result.base}
														</div>
														<div className='text-sm text-gray-800'>
															{t(
																'calculators.powerRoot.results.exponent'
															)}
															: {result.exponent}
														</div>
													</>
												)}
												{result.mode === 'root' && (
													<>
														<div className='text-sm text-gray-800'>
															{t(
																'calculators.powerRoot.results.number'
															)}
															: {result.base}
														</div>
														<div className='text-sm text-gray-800'>
															{t(
																'calculators.powerRoot.results.rootDegree'
															)}
															: {result.exponent}
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
