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
	DollarSign,
} from 'lucide-react';
import {
	calculateWall,
	validateWallInput,
	getWallMaterialOptions,
	getDefaultMaterialDimensions,
	getWallThicknessOptions,
	WallInput,
	WallResult,
} from '@/lib/calculators/wall';

function WallCalculatorComponent() {
	const tCommon = useTranslations('common');
	const t = useTranslations('calculators.wall');
	const [input, setInput] = useState<Partial<WallInput>>({
		wallLength: 0,
		wallHeight: 0,
		wallThickness: 1,
		materialType: '',
		materialLength: 0,
		materialWidth: 0,
		materialHeight: 0,
		jointThickness: 10,
		reservePercentage: 5,
		pricePerUnit: undefined,
		units: 'meters',
	});
	const [result, setResult] = useState<WallResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const materialOptions = getWallMaterialOptions(t);
	const thicknessOptions = getWallThicknessOptions(t);

	// Update material dimensions when material changes
	useEffect(() => {
		if (input.materialType) {
			const defaultDims = getDefaultMaterialDimensions(
				input.materialType
			);
			setInput((prev) => ({
				...prev,
				materialLength: defaultDims.length,
				materialWidth: defaultDims.width,
				materialHeight: defaultDims.height,
			}));
		}
	}, [input.materialType]);

	const handleInputChange = (
		field: keyof WallInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleCalculate = () => {
		const validationErrors = validateWallInput(input);
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateWall(input as WallInput);
			setResult(calculationResult);
			setErrors([]);
		} catch (error) {
			setErrors([tCommon('calculationError')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			wallLength: 0,
			wallHeight: 0,
			wallThickness: 1,
			materialType: '',
			materialLength: 0,
			materialWidth: 0,
			materialHeight: 0,
			jointThickness: 10,
			reservePercentage: 5,
			pricePerUnit: undefined,
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
								<option value='meters'>{tCommon('units.meters')}</option>
								<option value='centimeters'>{tCommon('units.centimeters')}</option>
							</select>
						</div>

						{/* Wall Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.wallDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.wallLength')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.wallLength || ''}
										onChange={(e) =>
											handleInputChange(
												'wallLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.wallHeight')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.wallHeight || ''}
										onChange={(e) =>
											handleInputChange(
												'wallHeight',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
								</div>
							</div>
						</div>

						{/* Wall Thickness */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.wallThickness')}
							</label>
							<select
								value={input.wallThickness || 1}
								onChange={(e) =>
									handleInputChange(
										'wallThickness',
										parseFloat(e.target.value)
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{thicknessOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label} - {option.description}
									</option>
								))}
							</select>
						</div>

						{/* Material Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.materialType')}
							</label>
							<select
								value={input.materialType || ''}
								onChange={(e) =>
									handleInputChange(
										'materialType',
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
							<div className='grid grid-cols-3 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.materialLength')}
									</label>
									<input
										type='number'
										step='1'
										value={input.materialLength || ''}
										onChange={(e) =>
											handleInputChange(
												'materialLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										{tCommon('units.millimeters')}
									</p>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.materialWidth')}
									</label>
									<input
										type='number'
										step='1'
										value={input.materialWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'materialWidth',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										{tCommon('units.millimeters')}
									</p>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.materialHeight')}
									</label>
									<input
										type='number'
										step='1'
										value={input.materialHeight || ''}
										onChange={(e) =>
											handleInputChange(
												'materialHeight',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0'
									/>
									<p className='text-sm text-gray-500 mt-1'>
										{tCommon('units.millimeters')}
									</p>
								</div>
							</div>
						</div>

						{/* Joint Thickness */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.jointThickness')}
							</label>
							<input
								type='number'
								step='1'
								value={input.jointThickness || ''}
								onChange={(e) =>
									handleInputChange(
										'jointThickness',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='10'
							/>
							<p className='text-sm text-gray-500 mt-1'>{tCommon('units.millimeters')}</p>
						</div>

						{/* Reserve and Price */}
						<div className='grid grid-cols-2 gap-4'>
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
									placeholder='5'
								/>
								<p className='text-sm text-gray-500 mt-1'>%</p>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.pricePerUnit')} (
									{t('form.optional')})
								</label>
								<input
									type='number'
									step='0.01'
									value={input.pricePerUnit || ''}
									onChange={(e) =>
										handleInputChange(
											'pricePerUnit',
											parseFloat(e.target.value) ||
												undefined
										)
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='0.00'
								/>
								<p className='text-sm text-gray-500 mt-1'>₽</p>
							</div>
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
										{t('results.wallDimensions')}:{' '}
										{result.wallLength} ×{' '}
										{result.wallHeight} {result.lengthUnit}
									</div>
									<div>
										{t('results.wallThickness')}:{' '}
										{result.wallThickness}{' '}
										{t('results.bricks')}
									</div>
									<div>
										{t('results.material')}:{' '}
										{result.materialType}
									</div>
									<div>
										{t('results.materialDimensions')}:{' '}
										{result.materialDimensions}
									</div>
								</div>
							</div>

							{/* Areas and Volumes */}
							<div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-blue-800 mb-2'>
									{t('results.areasAndVolumes')}
								</h4>
								<div className='text-sm text-blue-700 space-y-1'>
									<div>
										{t('results.wallArea')}:{' '}
										{result.wallArea} {result.areaUnit}
									</div>
									<div>
										{t('results.wallVolume')}:{' '}
										{result.wallVolume} {result.volumeUnit}
									</div>
									<div>
										{t('results.materialVolume')}:{' '}
										{result.materialVolume}{' '}
										{result.volumeUnit}
									</div>
								</div>
							</div>

							{/* Material Quantities */}
							<div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-yellow-800 mb-2'>
									{t('results.materialQuantities')}
								</h4>
								<div className='text-sm text-yellow-700 space-y-1'>
									<div>
										{t('results.materialCount')}:{' '}
										{result.materialCount}{' '}
										{t('results.pieces')}
									</div>
									<div>
										{t('results.materialCountWithReserve')}:{' '}
										{result.materialCountWithReserve}{' '}
										{t('results.pieces')}
									</div>
									<div>
										{t('results.reserveCount')}:{' '}
										{result.reserveCount}{' '}
										{t('results.pieces')} (
										{input.reservePercentage}%)
									</div>
								</div>
							</div>

							{/* Mortar/Glue */}
							<div className='bg-purple-50 border border-purple-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-purple-800 mb-2'>
									{t('results.mortarGlue')}
								</h4>
								<div className='text-sm text-purple-700 space-y-1'>
									<div>
										{t('results.mortarVolume')}:{' '}
										{result.mortarVolume}{' '}
										{result.volumeUnit}
									</div>
									<div>
										{t('results.mortarVolumeLiters')}:{' '}
										{result.mortarVolumeLiters} л
									</div>
								</div>
							</div>

							{/* Cost */}
							{result.totalCost && (
								<div className='bg-orange-50 border border-orange-200 rounded-md p-4'>
									<h4 className='text-sm font-semibold text-orange-800 mb-2 flex items-center'>
										<DollarSign className='h-4 w-4 mr-1' />
										{t('results.cost')}
									</h4>
									<div className='text-sm text-orange-700 space-y-1'>
										<div>
											{t('results.totalCost')}:{' '}
											{result.totalCost} ₽
										</div>
										<div>
											{t('results.costPerSquareMeter')}:{' '}
											{result.costPerSquareMeter} ₽/
											{result.areaUnit}
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default WallCalculatorComponent;
