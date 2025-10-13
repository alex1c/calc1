'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Home,
	Package,
	AlertCircle,
	RotateCcw,
	Ruler,
} from 'lucide-react';
import {
	calculateRoof,
	validateRoofInput,
	getRoofTypeOptions,
	getRoofMaterialOptions,
	getDefaultMaterialDimensions,
	RoofInput,
	RoofResult,
} from '@/lib/calculators/roof';

export default function RoofCalculator() {
	const t = useTranslations('calculators.roof');
	const [input, setInput] = useState<Partial<RoofInput>>({
		houseLength: 0,
		houseWidth: 0,
		roofType: '',
		roofAngle: 30,
		overhang: 0.5,
		material: '',
		materialLength: 0,
		materialWidth: 0,
		reservePercentage: 10,
		units: 'meters',
	});
	const [result, setResult] = useState<RoofResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const roofTypeOptions = getRoofTypeOptions();
	const materialOptions = getRoofMaterialOptions();

	// Update material dimensions when material or units change
	useEffect(() => {
		if (input.material) {
			const defaultDims = getDefaultMaterialDimensions(
				input.material,
				input.units
			);
			setInput((prev) => ({
				...prev,
				materialLength: defaultDims.length,
				materialWidth: defaultDims.width,
			}));
		}
	}, [input.material, input.units]);

	const handleInputChange = (
		field: keyof RoofInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleCalculate = () => {
		const validationErrors = validateRoofInput(input);
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateRoof(input as RoofInput);
			setResult(calculationResult);
			setErrors([]);
		} catch (error) {
			setErrors(['Ошибка при расчёте. Проверьте введённые данные.']);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			houseLength: 0,
			houseWidth: 0,
			roofType: '',
			roofAngle: 30,
			overhang: 0.5,
			material: '',
			materialLength: 0,
			materialWidth: 0,
			reservePercentage: 10,
			units: 'meters',
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
					<h1 className='text-3xl font-bold text-gray-900'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600'>{t('description')}</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<Home className='h-5 w-5 text-blue-600 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Units */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.units')}
							</label>
							<select
								value={input.units || 'meters'}
								onChange={(e) =>
									handleInputChange(
										'units',
										e.target.value as
											| 'meters'
											| 'centimeters'
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value='meters'>м</option>
								<option value='centimeters'>см</option>
							</select>
						</div>

						{/* House Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.houseDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.houseLength')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.houseLength || ''}
										onChange={(e) =>
											handleInputChange(
												'houseLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.houseWidth')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.houseWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'houseWidth',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
								</div>
							</div>
						</div>

						{/* Roof Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.roofType')}
							</label>
							<select
								value={input.roofType || ''}
								onChange={(e) =>
									handleInputChange(
										'roofType',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectRoofType')}
								</option>
								{roofTypeOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label} - {option.description}
									</option>
								))}
							</select>
						</div>

						{/* Roof Parameters */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.roofParameters')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.roofAngle')}
									</label>
									<input
										type='number'
										step='1'
										value={input.roofAngle || ''}
										onChange={(e) =>
											handleInputChange(
												'roofAngle',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='30'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										°
									</p>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.overhang')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.overhang || ''}
										onChange={(e) =>
											handleInputChange(
												'overhang',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.5'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										{t('form.overhangNote')}
									</p>
								</div>
							</div>
						</div>

						{/* Material Selection */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.material')}
							</label>
							<select
								value={input.material || ''}
								onChange={(e) =>
									handleInputChange(
										'material',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectMaterial')}
								</option>
								{materialOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label} - {option.description}
									</option>
								))}
							</select>
						</div>

						{/* Material Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.materialDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.materialLength')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.materialLength || ''}
										onChange={(e) =>
											handleInputChange(
												'materialLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										{input.units === 'centimeters'
											? 'см'
											: 'м'}
									</p>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.materialWidth')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.materialWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'materialWidth',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										{input.units === 'centimeters'
											? 'см'
											: 'м'}
									</p>
								</div>
							</div>
						</div>

						{/* Reserve */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.reservePercentage')}
							</label>
							<input
								type='number'
								step='1'
								value={input.reservePercentage || ''}
								onChange={(e) =>
									handleInputChange(
										'reservePercentage',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='10'
							/>
							<p className='text-sm text-gray-500 mt-1'>%</p>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={handleCalculate}
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
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<Package className='h-5 w-5 text-green-600 mr-2' />
						{t('results.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-md'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 mr-2' />
								<h3 className='text-sm font-medium text-red-800'>
									{t('errors.title')}
								</h3>
							</div>
							<ul className='text-sm text-red-700 space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					{/* Results Table */}
					{result && (
						<div className='space-y-4'>
							{/* Summary */}
							<div className='bg-green-50 border border-green-200 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 mb-2'>
									{t('results.summary')}
								</h3>
								<div className='text-sm text-green-700 space-y-1'>
									<div>
										{t('results.roofType')}:{' '}
										{result.roofType}
									</div>
									<div>
										{t('results.material')}:{' '}
										{result.material}
									</div>
									<div>
										{t('results.houseDimensions')}:{' '}
										{result.houseLength} ×{' '}
										{result.houseWidth} {result.lengthUnit}
									</div>
									<div>
										{t('results.roofAngle')}:{' '}
										{result.roofAngle}°
									</div>
								</div>
							</div>

							{/* Areas */}
							<div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-blue-800 mb-2'>
									{t('results.areas')}
								</h4>
								<div className='text-sm text-blue-700 space-y-1'>
									<div>
										{t('results.roofArea')}:{' '}
										{result.roofArea} {result.areaUnit}
									</div>
									<div>
										{t('results.effectiveArea')}:{' '}
										{result.effectiveArea} {result.areaUnit}
									</div>
									<div>
										{t('results.overhangArea')}:{' '}
										{result.overhangArea} {result.areaUnit}
									</div>
								</div>
							</div>

							{/* Material Requirements */}
							<div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-yellow-800 mb-2'>
									{t('results.materialRequirements')}
								</h4>
								<div className='text-sm text-yellow-700 space-y-1'>
									<div>
										{t('results.materialCount')}:{' '}
										{result.materialCount}{' '}
										{t('results.sheets')}
									</div>
									<div>
										{t('results.materialArea')}:{' '}
										{result.materialArea} {result.areaUnit}
									</div>
									<div>
										{t('results.totalMaterialArea')}:{' '}
										{result.totalMaterialArea}{' '}
										{result.areaUnit}
									</div>
									<div>
										{t('results.reserveArea')}:{' '}
										{result.reserveArea} {result.areaUnit} (
										{result.reservePercentage}%)
									</div>
								</div>
							</div>

							{/* Weight */}
							<div className='bg-purple-50 border border-purple-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-purple-800 mb-2'>
									{t('results.weight')}
								</h4>
								<div className='text-sm text-purple-700 space-y-1'>
									<div>
										{t('results.materialWeight')}:{' '}
										{result.materialWeight}{' '}
										{result.weightUnit}/{result.areaUnit}
									</div>
									<div>
										{t('results.totalWeight')}:{' '}
										{result.totalWeight} {result.weightUnit}
									</div>
								</div>
							</div>

							{/* Recommendations */}
							<div className='bg-orange-50 border border-orange-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-orange-800 mb-2'>
									{t('results.recommendations')}
								</h4>
								<div className='text-sm text-orange-700'>
									{t('results.recommendedCount')}:{' '}
									{result.recommendedCount}{' '}
									{t('results.sheets')}
								</div>
								<p className='text-sm text-orange-600 mt-2'>
									{t('results.recommendationNote')}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
