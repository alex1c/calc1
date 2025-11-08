'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Ruler,
	Home,
	AlertCircle,
	RotateCcw,
	Square,
} from 'lucide-react';
import {
	calculateWallArea,
	validateWallAreaInput,
	WallAreaInput,
	WallAreaResult,
	getWallsCountOptions,
} from '@/lib/calculators/wall-area';

/**
 * Wall Area Calculator Component
 * 
 * A React component for calculating wall area for painting or finishing.
 * 
 * Features:
 * - Room dimensions input
 * - Multiple walls support
 * - Doors and windows area deduction
 * - Reserve percentage calculation
 * - Total area calculation
 * - Responsive design
 * 
 * Uses the wall area calculation library from @/lib/calculators/wall-area
 * for all mathematical operations.
 */
export default function WallAreaCalculator() {
	// Internationalization hooks for translations
	const t = useTranslations('calculators.wallArea');
	const tCommon = useTranslations('common');

	// State management
	const [result, setResult] = useState<WallAreaResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	// Form state
	const [formData, setFormData] = useState<
		Partial<
			WallAreaInput & {
				roomLength?: number | '';
				roomWidth?: number | '';
				wallHeight?: number | '';
				windowsArea?: number | '';
				doorsArea?: number | '';
			}
		>
	>({
		roomLength: '',
		roomWidth: '',
		wallHeight: 2.7,
		windowsArea: '',
		doorsArea: '',
		wallsCount: 4,
		reservePercentage: 10,
	});

	// Handle number input changes
	const handleNumberInputChange = (
		field: keyof WallAreaInput,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputValue = e.target.value.trim();

		if (inputValue === '') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
			return;
		}

		if (inputValue === '.') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
			return;
		}

		const numValue = parseFloat(inputValue);

		if (!isNaN(numValue) && numValue >= 0) {
			setFormData((prev) => ({
				...prev,
				[field]: numValue,
			}));
		} else if (inputValue === '' || inputValue === '-') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
		}
	};

	// Handle input changes for select and other fields
	const handleInputChange = (
		field: keyof WallAreaInput,
		value: number | string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Calculate wall area
	const handleCalculate = () => {
		const cleanedFormData: Partial<WallAreaInput> = {
			roomLength:
				formData.roomLength === ''
					? undefined
					: formData.roomLength || 0,
			roomWidth:
				formData.roomWidth === '' ? undefined : formData.roomWidth || 0,
			wallHeight:
				formData.wallHeight === ''
					? undefined
					: formData.wallHeight || 0,
			windowsArea:
				formData.windowsArea === ''
					? undefined
					: formData.windowsArea || 0,
			doorsArea:
				formData.doorsArea === '' ? undefined : formData.doorsArea || 0,
			wallsCount: formData.wallsCount || 4,
			reservePercentage: formData.reservePercentage || 10,
		};

		const validationErrors = validateWallAreaInput(cleanedFormData);

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateWallArea(
				cleanedFormData as WallAreaInput
			);

			setResult(calculationResult);
			setErrors([]);
			setIsCalculated(true);
		} catch (error) {
			setErrors([tCommon('calculationError')]);
			setResult(null);
		}
	};

	// Reset form
	const handleReset = () => {
		setFormData({
			roomLength: '',
			roomWidth: '',
			wallHeight: 2.7,
			windowsArea: '',
			doorsArea: '',
			wallsCount: 4,
			reservePercentage: 10,
		});
		setResult(null);
		setErrors([]);
		setIsCalculated(false);
	};

	const wallsCountOptions = getWallsCountOptions();

	return (
		<div className='max-w-4xl mx-auto p-6'>
			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Form Fields */}
					<div className='space-y-6'>
						{/* Room Dimensions */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.roomLength')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={
											formData.roomLength !== undefined &&
											formData.roomLength !== null
												? formData.roomLength
												: ''
										}
										onChange={(e) =>
											handleNumberInputChange(
												'roomLength',
												e
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										step='0.01'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
										м
									</span>
								</div>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.roomWidth')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={
											formData.roomWidth !== undefined &&
											formData.roomWidth !== null
												? formData.roomWidth
												: ''
										}
										onChange={(e) =>
											handleNumberInputChange(
												'roomWidth',
												e
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										step='0.01'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
										м
									</span>
								</div>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.wallHeight')}
							</label>
							<div className='relative'>
								<input
									type='number'
									value={
										formData.wallHeight !== undefined &&
										formData.wallHeight !== null
											? formData.wallHeight
											: ''
									}
									onChange={(e) =>
										handleNumberInputChange('wallHeight', e)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='2.7'
									step='0.01'
									min='0.01'
								/>
								<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
									м
								</span>
							</div>
						</div>

						{/* Openings */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.windowsArea')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={
											formData.windowsArea !==
												undefined &&
											formData.windowsArea !== null
												? formData.windowsArea
												: ''
										}
										onChange={(e) =>
											handleNumberInputChange(
												'windowsArea',
												e
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										step='0.01'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
										м²
									</span>
								</div>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.doorsArea')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={
											formData.doorsArea !== undefined &&
											formData.doorsArea !== null
												? formData.doorsArea
												: ''
										}
										onChange={(e) =>
											handleNumberInputChange(
												'doorsArea',
												e
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										step='0.01'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
										м²
									</span>
								</div>
							</div>
						</div>

						{/* Walls Count */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.wallsCount')}
							</label>
							<select
								value={formData.wallsCount || 4}
								onChange={(e) =>
									handleInputChange(
										'wallsCount',
										parseInt(e.target.value)
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
							>
								{wallsCountOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Reserve */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.reservePercentage')}
							</label>
							<div className='relative'>
								<input
									type='number'
									value={formData.reservePercentage || ''}
									onChange={(e) =>
										handleInputChange(
											'reservePercentage',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='10'
									step='1'
									min='0'
									max='100'
								/>
								<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
									%
								</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col justify-center space-y-4'>
						<button
							onClick={handleCalculate}
							className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center'
						>
							<Calculator className='h-5 w-5 mr-2' />
							{t('form.calculate')}
						</button>

						<button
							onClick={handleReset}
							className='w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center'
						>
							<RotateCcw className='h-5 w-5 mr-2' />
							{t('form.reset')}
						</button>
					</div>
				</div>

				{/* Error Messages */}
				{errors.length > 0 && (
					<div className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
						<div className='flex items-center mb-2'>
							<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
							<h3 className='text-sm font-medium text-red-800 dark:text-red-400'>
								{t('errors.title')}
							</h3>
						</div>
						<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
							{errors.map((error, index) => (
								<li key={index}>• {error}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Results */}
			{result && (
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
					<div className='flex items-center mb-6'>
						<Square className='h-6 w-6 text-green-600 dark:text-green-400 mr-3' />
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
							{t('results.title')}
						</h2>
					</div>

					{/* Results Table */}
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
							<thead>
								<tr className='bg-gray-50 dark:bg-gray-700'>
									<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300'>
										{t('results.parameter')}
									</th>
									<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300'>
										{t('results.value')}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.perimeter')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.perimeter} м
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.totalWallsArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.totalWallsArea} м²
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.windowsArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.windowsArea} м²
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.doorsArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.doorsArea} м²
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.totalOpeningsArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.totalOpeningsArea} м²
									</td>
								</tr>
								<tr className='bg-blue-50 dark:bg-blue-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.usefulArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-blue-700 dark:text-blue-400'>
										{result.usefulArea} м²
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.reserveArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.reserveArea} м² (
										{result.reservePercentage}%)
									</td>
								</tr>
								<tr className='bg-green-50 dark:bg-green-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.usefulAreaWithReserve')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-green-700 dark:text-green-400'>
										{result.usefulAreaWithReserve} м²
									</td>
								</tr>
								{result.wall1Area !== undefined && (
									<>
										<tr>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
												{t('results.wall1Area')}
											</td>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
												{result.wall1Area} м²
											</td>
										</tr>
										<tr>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
												{t('results.wall2Area')}
											</td>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
												{result.wall2Area} м²
											</td>
										</tr>
										<tr>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
												{t('results.wall3Area')}
											</td>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
												{result.wall3Area} м²
											</td>
										</tr>
										<tr>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
												{t('results.wall4Area')}
											</td>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
												{result.wall4Area} м²
											</td>
										</tr>
									</>
								)}
							</tbody>
						</table>
					</div>

					{/* Tips */}
					<div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
						<div className='flex items-start'>
							<AlertCircle className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5' />
							<div>
								<h3 className='text-sm font-medium text-blue-800 dark:text-blue-400 mb-2'>
									{t('results.tips.title')}
								</h3>
								<ul className='text-sm text-blue-700 dark:text-blue-300 space-y-1'>
									<li>• {t('results.tips.measurements')}</li>
									<li>• {t('results.tips.openings')}</li>
									<li>• {t('results.tips.reserve')}</li>
									<li>• {t('results.tips.complex')}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
