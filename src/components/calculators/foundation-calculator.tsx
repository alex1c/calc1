'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Package,
	BarChart3,
	AlertCircle,
	RotateCcw,
	Building2,
} from 'lucide-react';
import {
	calculateFoundation,
	validateFoundationInput,
	FoundationInput,
	FoundationResult,
	FoundationType,
	getFoundationTypeOptions,
	getFoundationConcreteGrades,
	getRebarDiameterOptions,
} from '@/lib/calculators/foundation';

export default function FoundationCalculator() {
	const tCommon = useTranslations('common');
	const t = useTranslations('calculators.foundation');

	const [foundationType, setFoundationType] =
		useState<FoundationType>('strip');
	const [result, setResult] = useState<FoundationResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	// Form state - allow empty strings for number inputs
	const [formData, setFormData] = useState<
		Partial<
			FoundationInput & {
				length?: number | '';
				width?: number | '';
				height?: number | '';
				wallThickness?: number | '';
				slabLength?: number | '';
				slabWidth?: number | '';
				slabThickness?: number | '';
				columnCount?: number | '';
				columnLength?: number | '';
				columnWidth?: number | '';
				columnHeight?: number | '';
			}
		>
	>({
		foundationType: 'strip',
		length: '',
		width: '',
		height: '',
		wallThickness: 0.3,
		slabLength: '',
		slabWidth: '',
		slabThickness: 0.2,
		columnCount: '',
		columnLength: '',
		columnWidth: '',
		columnHeight: '',
		concreteGrade: 'M200',
		rebarDiameter: 12,
		rebarSpacing: 20,
		rebarLayers: 2,
		reservePercentage: 10,
	});

	// Handle foundation type change
	const handleFoundationTypeChange = (type: FoundationType) => {
		setFoundationType(type);
		setFormData((prev) => ({
			...prev,
			foundationType: type,
		}));
		setResult(null);
		setErrors([]);
		setIsCalculated(false);
	};

	// Handle input changes
	const handleInputChange = (
		field: keyof FoundationInput,
		value: number | string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Handle number input changes with proper decimal handling
	const handleNumberInputChange = (
		field: keyof FoundationInput,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputValue = e.target.value.trim();

		// Allow empty string for clearing the field
		if (inputValue === '') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
			return;
		}

		// Allow typing decimal point alone (e.g., ".")
		if (inputValue === '.') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
			return;
		}

		// Parse the number value
		const numValue = parseFloat(inputValue);

		// Only update if it's a valid non-negative number
		if (!isNaN(numValue) && numValue >= 0) {
			setFormData((prev) => ({
				...prev,
				[field]: numValue,
			}));
		}
		// If invalid, allow empty string for user to correct
		else if (inputValue === '' || inputValue === '-') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
		}
	};

	// Calculate foundation
	const handleCalculate = () => {
		// Clean up form data - convert empty strings to 0 or undefined
		const cleanedFormData: Partial<FoundationInput> = {
			...formData,
			length: formData.length === '' ? undefined : formData.length || 0,
			width: formData.width === '' ? undefined : formData.width || 0,
			height: formData.height === '' ? undefined : formData.height || 0,
			wallThickness:
				formData.wallThickness === ''
					? undefined
					: formData.wallThickness || 0,
			slabLength:
				formData.slabLength === ''
					? undefined
					: formData.slabLength || 0,
			slabWidth:
				formData.slabWidth === '' ? undefined : formData.slabWidth || 0,
			slabThickness:
				formData.slabThickness === ''
					? undefined
					: formData.slabThickness || 0,
			columnCount:
				formData.columnCount === ''
					? undefined
					: formData.columnCount || 0,
			columnLength:
				formData.columnLength === ''
					? undefined
					: formData.columnLength || 0,
			columnWidth:
				formData.columnWidth === ''
					? undefined
					: formData.columnWidth || 0,
			columnHeight:
				formData.columnHeight === ''
					? undefined
					: formData.columnHeight || 0,
		};

		const validationErrors = validateFoundationInput({
			...cleanedFormData,
			foundationType,
		});

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateFoundation({
				...cleanedFormData,
				foundationType,
			} as FoundationInput);

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
			foundationType: 'strip',
			length: '',
			width: '',
			height: '',
			wallThickness: 0.3,
			slabLength: '',
			slabWidth: '',
			slabThickness: 0.2,
			columnCount: '',
			columnLength: '',
			columnWidth: '',
			columnHeight: '',
			concreteGrade: 'M200',
			rebarDiameter: 12,
			rebarSpacing: 20,
			rebarLayers: 2,
			reservePercentage: 10,
		});
		setFoundationType('strip');
		setResult(null);
		setErrors([]);
		setIsCalculated(false);
	};

	const foundationTypes = getFoundationTypeOptions();
	const concreteGrades = getFoundationConcreteGrades();
	const rebarDiameters = getRebarDiameterOptions();

	return (
		<div className='max-w-4xl mx-auto p-6'>
			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Form Fields */}
					<div className='space-y-6'>
						{/* Foundation Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.foundationType')}
							</label>
							<select
								value={foundationType}
								onChange={(e) =>
									handleFoundationTypeChange(
										e.target.value as FoundationType
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
							>
								{foundationTypes.map((type) => (
									<option
										key={type.value}
										value={type.value}
									>
										{type.label}
									</option>
								))}
							</select>
						</div>

						{/* Strip Foundation Fields */}
						{foundationType === 'strip' && (
							<>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.length')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.length !==
														undefined &&
													formData.length !== null
														? formData.length
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'length',
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
											{t('form.width')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.width !==
														undefined &&
													formData.width !== null
														? formData.width
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'width',
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
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.height')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.height !==
														undefined &&
													formData.height !== null
														? formData.height
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'height',
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
											{t('form.wallThickness')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.wallThickness !==
														undefined &&
													formData.wallThickness !==
														null
														? formData.wallThickness
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'wallThickness',
														e
													)
												}
												className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
												placeholder='0.3'
												step='0.01'
												min='0.01'
											/>
											<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
												м
											</span>
										</div>
									</div>
								</div>
							</>
						)}

						{/* Slab Foundation Fields */}
						{foundationType === 'slab' && (
							<>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.slabLength')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.slabLength !==
														undefined &&
													formData.slabLength !== null
														? formData.slabLength
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'slabLength',
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
											{t('form.slabWidth')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.slabWidth !==
														undefined &&
													formData.slabWidth !== null
														? formData.slabWidth
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'slabWidth',
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
										{t('form.slabThickness')}
									</label>
									<div className='relative'>
										<input
											type='number'
											value={
												formData.slabThickness !==
													undefined &&
												formData.slabThickness !== null
													? formData.slabThickness
													: ''
											}
											onChange={(e) =>
												handleNumberInputChange(
													'slabThickness',
													e
												)
											}
											className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
											placeholder='0.2'
											step='0.01'
											min='0.01'
										/>
										<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
											{tCommon('units.meters')}
										</span>
									</div>
								</div>
							</>
						)}

						{/* Columnar Foundation Fields */}
						{foundationType === 'columnar' && (
							<>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
										{t('form.columnCount')}
									</label>
									<input
										type='number'
										value={formData.columnCount || ''}
										onChange={(e) =>
											handleInputChange(
												'columnCount',
												parseInt(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										min='1'
									/>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.columnLength')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.columnLength !==
														undefined &&
													formData.columnLength !==
														null
														? formData.columnLength
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'columnLength',
														e
													)
												}
												className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
												placeholder='0.3'
												step='0.01'
												min='0.01'
											/>
											<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
												м
											</span>
										</div>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
											{t('form.columnWidth')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.columnWidth !==
														undefined &&
													formData.columnWidth !==
														null
														? formData.columnWidth
														: ''
												}
												onChange={(e) =>
													handleNumberInputChange(
														'columnWidth',
														e
													)
												}
												className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
												placeholder='0.3'
												step='0.01'
												min='0.01'
											/>
											<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
												м
											</span>
										</div>
									</div>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
										{t('form.columnHeight')}
									</label>
									<div className='relative'>
										<input
											type='number'
											value={
												formData.columnHeight !==
													undefined &&
												formData.columnHeight !== null
													? formData.columnHeight
													: ''
											}
											onChange={(e) =>
												handleNumberInputChange(
													'columnHeight',
													e
												)
											}
											className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
											placeholder='0.8'
											step='0.01'
											min='0.01'
										/>
										<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
											{tCommon('units.meters')}
										</span>
									</div>
								</div>
							</>
						)}

						{/* Common Fields */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.concreteGrade')}
							</label>
							<select
								value={formData.concreteGrade || 'M200'}
								onChange={(e) =>
									handleInputChange(
										'concreteGrade',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
							>
								{concreteGrades.map((grade) => (
									<option
										key={grade.value}
										value={grade.value}
									>
										{grade.label}
									</option>
								))}
							</select>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.rebarDiameter')}
								</label>
								<select
									value={formData.rebarDiameter || 12}
									onChange={(e) =>
										handleInputChange(
											'rebarDiameter',
											parseInt(e.target.value)
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								>
									{rebarDiameters.map((diameter) => (
										<option
											key={diameter.value}
											value={diameter.value}
										>
											{diameter.label}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.rebarSpacing')} (см)
								</label>
								<input
									type='number'
									value={formData.rebarSpacing || ''}
									onChange={(e) =>
										handleInputChange(
											'rebarSpacing',
											parseInt(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='20'
									min='10'
									max='50'
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.rebarLayers')}
							</label>
							<input
								type='number'
								value={formData.rebarLayers || ''}
								onChange={(e) =>
									handleInputChange(
										'rebarLayers',
										parseInt(e.target.value) || 1
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='2'
								min='1'
								max='4'
							/>
						</div>

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
						<Building2 className='h-6 w-6 text-green-600 dark:text-green-400 mr-3' />
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
										{t('results.totalVolume')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.totalVolume} м³
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.concreteVolume')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.concreteVolumeWithReserve} м³
									</td>
								</tr>
								<tr className='bg-green-50 dark:bg-green-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.cement')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-green-700 dark:text-green-400'>
										{result.cement.amount} кг (
										{result.cement.bags} {t('results.bags')}
										)
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.sand')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.sand.amount} кг
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.gravel')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.gravel.amount} кг
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.water')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.water.amount} л
									</td>
								</tr>
								<tr className='bg-blue-50 dark:bg-blue-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.rebarWeight')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-blue-700 dark:text-blue-400'>
										{result.rebarWeightWithReserve} кг (
										{result.rebarCount}{' '}
										{t('results.pieces')})
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.rebarLength')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.rebarLength} м
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.formworkArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.formworkArea} м²
									</td>
								</tr>
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
									<li>• {t('results.tips.surface')}</li>
									<li>• {t('results.tips.weather')}</li>
									<li>• {t('results.tips.technique')}</li>
									<li>• {t('results.tips.waste')}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
