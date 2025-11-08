'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
} from 'lucide-react';

interface GravelInput {
	calculationType: string;
	inputMethod: 'dimensions' | 'area' | 'volume';
	length?: number;
	width?: number;
	area?: number;
	thickness?: number;
	volume?: number;
	fraction: string;
	density: number;
	reserve: number;
}

interface GravelResult {
	volume: number;
	volumeWithReserve: number;
	weight: number;
	weightWithReserve: number;
	fraction: string;
	density: number;
}

// Density values for different fractions (kg/m³)
const FRACTION_DENSITIES: Record<string, number> = {
	'5-10': 1500,
	'10-20': 1450,
	'20-40': 1400,
	'40-70': 1350,
};

/**
 * Gravel Calculator Component
 * 
 * A React component for calculating gravel needed for construction projects.
 * 
 * Features:
 * - Multiple calculation types (foundation, road, drainage)
 * - Multiple input methods (dimensions, area, volume)
 * - Gravel fraction selection
 * - Density calculation
 * - Reserve percentage calculation
 * - Volume and weight calculation
 * - Responsive design
 * 
 * Uses predefined density values for different gravel fractions.
 * Uses inline calculation logic for gravel quantity and weight.
 */
export default function GravelCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.gravel');
	
	// Form state management
	const [input, setInput] = useState<GravelInput>({
		calculationType: 'foundation', // Calculation type (foundation, road, drainage)
		inputMethod: 'dimensions', // Input method (dimensions, area, volume)
		length: 0, // Length (m)
		width: 0, // Width (m)
		area: 0, // Area (m²)
		thickness: 0.2, // Thickness (m, default: 0.2)
		volume: 0, // Volume (m³)
		fraction: '20-40', // Gravel fraction (5-10, 10-20, 20-40, 40-70)
		density: 1400, // Density (kg/m³)
		reserve: 10, // Reserve percentage (%)
	});
	const [result, setResult] = useState<GravelResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors

	const calculationTypes = t.raw('options.calculationTypes');
	const fractions = t.raw('options.fractions');

	// Update density when fraction changes
	const handleFractionChange = (fraction: string) => {
		const density = FRACTION_DENSITIES[fraction] || 1400;
		setInput((prev) => ({
			...prev,
			fraction,
			density,
		}));
	};

	const handleInputChange = (
		field: keyof GravelInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (input.inputMethod === 'dimensions') {
			if (!input.length || input.length <= 0) {
				validationErrors.push(t('form.errors.lengthRequired'));
			}
			if (!input.width || input.width <= 0) {
				validationErrors.push(t('form.errors.widthRequired'));
			}
			if (!input.thickness || input.thickness <= 0) {
				validationErrors.push(t('form.errors.thicknessRequired'));
			}
		} else if (input.inputMethod === 'area') {
			if (!input.area || input.area <= 0) {
				validationErrors.push(t('form.errors.areaRequired'));
			}
			if (!input.thickness || input.thickness <= 0) {
				validationErrors.push(t('form.errors.thicknessRequired'));
			}
		} else if (input.inputMethod === 'volume') {
			if (!input.volume || input.volume <= 0) {
				validationErrors.push(t('form.errors.volumeRequired'));
			}
		}

		if (input.density < 1200 || input.density > 2000) {
			validationErrors.push(t('form.errors.invalidDensity'));
		}

		if (input.reserve < 0 || input.reserve > 50) {
			validationErrors.push(t('form.errors.invalidReserve'));
		}

		return validationErrors;
	};

	const calculateGravel = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			let volume = 0;

			if (input.inputMethod === 'dimensions') {
				volume = (input.length || 0) * (input.width || 0) * (input.thickness || 0);
			} else if (input.inputMethod === 'area') {
				volume = (input.area || 0) * (input.thickness || 0);
			} else {
				volume = input.volume || 0;
			}

			const volumeWithReserve = volume * (1 + input.reserve / 100);
			const weight = volume * input.density;
			const weightWithReserve = volumeWithReserve * input.density;

			setResult({
				volume,
				volumeWithReserve,
				weight,
				weightWithReserve,
				fraction: input.fraction,
				density: input.density,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			calculationType: 'foundation',
			inputMethod: 'dimensions',
			length: 0,
			width: 0,
			area: 0,
			thickness: 0.2,
			volume: 0,
			fraction: '20-40',
			density: 1400,
			reserve: 10,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-6xl mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-4'>
					<Calculator className='h-8 w-8 text-blue-600 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400'>
					{t('description')}
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Square className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Calculation Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.calculationType')}
							</label>
							<select
								value={input.calculationType}
								onChange={(e) =>
									handleInputChange('calculationType', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(calculationTypes).map(([key, value]: [string, any]) => (
									<option key={key} value={key}>
										{value.label} - {value.description}
									</option>
								))}
							</select>
						</div>

						{/* Input Method */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								Способ ввода данных
							</label>
							<select
								value={input.inputMethod}
								onChange={(e) =>
									handleInputChange(
										'inputMethod',
										e.target.value as 'dimensions' | 'area' | 'volume'
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								<option value='dimensions'>Длина × Ширина</option>
								<option value='area'>Площадь</option>
								<option value='volume'>Объём</option>
							</select>
						</div>

						{/* Dimensions Input */}
						{input.inputMethod === 'dimensions' && (
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.length')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.length || ''}
										onChange={(e) =>
											handleInputChange('length', parseFloat(e.target.value) || 0)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='0'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.width')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.width || ''}
										onChange={(e) =>
											handleInputChange('width', parseFloat(e.target.value) || 0)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='0'
									/>
								</div>
							</div>
						)}

						{/* Area Input */}
						{input.inputMethod === 'area' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.area')}
								</label>
								<input
									type='number'
									step='0.1'
									value={input.area || ''}
									onChange={(e) =>
										handleInputChange('area', parseFloat(e.target.value) || 0)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='0'
								/>
							</div>
						)}

						{/* Volume Input */}
						{input.inputMethod === 'volume' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.volume')}
								</label>
								<input
									type='number'
									step='0.1'
									value={input.volume || ''}
									onChange={(e) =>
										handleInputChange('volume', parseFloat(e.target.value) || 0)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='0'
								/>
							</div>
						)}

						{/* Thickness (for dimensions and area) */}
						{(input.inputMethod === 'dimensions' ||
							input.inputMethod === 'area') && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.thickness')}
								</label>
								<input
									type='number'
									step='0.01'
									value={input.thickness || ''}
									onChange={(e) =>
										handleInputChange(
											'thickness',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='0.2'
								/>
							</div>
						)}

						{/* Fraction */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.fraction')}
							</label>
							<select
								value={input.fraction}
								onChange={(e) => handleFractionChange(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(fractions).map(([key, value]: [string, any]) => (
									<option key={key} value={key}>
										{value.label} - {value.description}
									</option>
								))}
							</select>
						</div>

						{/* Density */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.density')}
							</label>
							<input
								type='number'
								step='10'
								value={input.density}
								onChange={(e) =>
									handleInputChange('density', parseFloat(e.target.value) || 0)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='1400'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Автоматически обновляется при выборе фракции
							</p>
						</div>

						{/* Reserve */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.reserve')}
							</label>
							<input
								type='number'
								step='1'
								value={input.reserve}
								onChange={(e) =>
									handleInputChange('reserve', parseFloat(e.target.value) || 0)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='10'
							/>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculateGravel}
								className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
							>
								{t('form.calculate')}
							</button>
							<button
								onClick={handleReset}
								className='flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
							>
								<RotateCcw className='h-4 w-4 inline mr-2' />
								{t('form.reset')}
							</button>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Package className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
						{t('results.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
								<h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
									{t('form.errors.title')}
								</h3>
							</div>
							<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					{/* Results Content */}
					{result ? (
						<div className='space-y-4'>
							{/* Summary */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-2'>
									{t('results.volume')}
								</h3>
								<div className='text-sm text-green-700 dark:text-green-300 space-y-1'>
									<div>
										{t('results.withoutReserve')}:{' '}
										<strong>{result.volume.toFixed(2)} м³</strong>
									</div>
									<div>
										{t('results.withReserve')}:{' '}
										<strong>{result.volumeWithReserve.toFixed(2)} м³</strong>
									</div>
								</div>
							</div>

							{/* Weight */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2'>
									{t('results.weight')}
								</h3>
								<div className='text-sm text-blue-700 dark:text-blue-300 space-y-1'>
									<div>
										{t('results.withoutReserve')}:{' '}
										<strong>
											{(result.weight / 1000).toFixed(2)} т ({' '}
											{result.weight.toLocaleString('ru-RU')} кг)
										</strong>
									</div>
									<div>
										{t('results.withReserve')}:{' '}
										<strong>
											{(result.weightWithReserve / 1000).toFixed(2)} т ({' '}
											{result.weightWithReserve.toLocaleString('ru-RU')} кг)
										</strong>
									</div>
								</div>
							</div>

							{/* Bags */}
							<div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2'>
									{t('results.bags')}
								</h4>
								<p className='text-sm text-yellow-700 dark:text-yellow-300'>
									{Math.ceil(result.weightWithReserve / 50)}{' '}
									{t('results.bagsDescription')}
								</p>
							</div>

							{/* Details */}
							<div className='bg-gray-50 dark:bg-gray-700 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2'>
									Детали расчёта
								</h4>
								<div className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
									<div>Фракция: {input.fraction} мм</div>
									<div>Плотность: {result.density} кг/м³</div>
									<div>Запас: {input.reserve}%</div>
								</div>
							</div>
						</div>
					) : (
						<p className='text-gray-500 dark:text-gray-400'>
							{t('results.placeholder')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

