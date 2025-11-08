'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Package, Layers, Ruler, AlertCircle } from 'lucide-react';
import {
	calculateMaterial,
	validateMaterialInput,
	getMaterialOptions,
	formatMaterialAmount,
	MaterialInput,
	MaterialResult,
	MATERIALS,
} from '@/lib/calculators/materials';

/**
 * Materials Calculator Component
 * 
 * A React component for calculating construction materials needed for various projects.
 * 
 * Features:
 * - Multiple material types (paint, plaster, primer, putty, tile glue)
 * - Room dimensions input
 * - Floor area input (for floor materials)
 * - Doors and windows area deduction
 * - Multiple layers support
 * - Consumption rate calculation
 * - Reserve percentage calculation
 * - Package size calculation
 * - Tile size and grout width consideration (for tile glue)
 * - Responsive design
 * 
 * Uses the materials calculation library from @/lib/calculators/materials
 * for all mathematical operations.
 */
export default function MaterialsCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.materials');
	
	// Material type and state management
	const [materialType, setMaterialType] = useState('paint'); // Selected material type
	const [result, setResult] = useState<MaterialResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	// Form state management
	const [formData, setFormData] = useState<Partial<MaterialInput>>({
		roomLength: 0, // Room length (m)
		roomWidth: 0, // Room width (m)
		wallHeight: 0, // Wall height (m)
		floorArea: 0, // Floor area (m², for floor materials)
		doorsWindowsArea: 0, // Total area of doors and windows (m²)
		layers: 2, // Number of layers
		consumptionRate: MATERIALS[materialType]?.defaultConsumption || 0.12, // Consumption rate (L/m² or kg/m²)
		reservePercentage: 10, // Reserve percentage for waste (%)
		packageSize: MATERIALS[materialType]?.defaultPackageSize || 2.5, // Package size (L or kg)
		tileSize: 0, // Tile size (m², for tile glue)
		groutWidth: 2, // Grout width (mm, for tile glue)
	});

	// Update form data when material type changes
	const handleMaterialChange = (newMaterialType: string) => {
		setMaterialType(newMaterialType);
		const material = MATERIALS[newMaterialType];
		if (material) {
			setFormData((prev) => ({
				...prev,
				consumptionRate: material.defaultConsumption,
				packageSize: material.defaultPackageSize,
				layers:
					newMaterialType === 'primer' ||
					newMaterialType === 'tileGlue'
						? 1
						: 2,
			}));
		}
		setResult(null);
		setIsCalculated(false);
	};

	// Handle input changes
	const handleInputChange = (field: keyof MaterialInput, value: number) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Calculate materials
	const handleCalculate = () => {
		const validationErrors = validateMaterialInput(formData, materialType);

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		const calculationResult = calculateMaterial(
			materialType,
			formData as MaterialInput
		);

		if (calculationResult) {
			setResult(calculationResult);
			setErrors([]);
			setIsCalculated(true);
		}
	};

	// Reset form
	const handleReset = () => {
		setFormData({
			roomLength: 0,
			roomWidth: 0,
			wallHeight: 0,
			floorArea: 0,
			doorsWindowsArea: 0,
			layers: 2,
			consumptionRate:
				MATERIALS[materialType]?.defaultConsumption || 0.12,
			reservePercentage: 10,
			packageSize: MATERIALS[materialType]?.defaultPackageSize || 2.5,
			tileSize: 0,
			groutWidth: 2,
		});
		setResult(null);
		setErrors([]);
		setIsCalculated(false);
	};

	// Get material options
	const materialOptions = getMaterialOptions(t);
	const currentMaterial = MATERIALS[materialType];

	return (
		<div className='max-w-4xl mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-4'>
					<Calculator className='h-8 w-8 text-blue-600 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</div>

			{/* Calculator Form */}
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Material Selection */}
					<div className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.materialType')}
							</label>
							<select
								value={materialType}
								onChange={(e) =>
									handleMaterialChange(e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								{materialOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
							<p className='text-sm text-gray-500 mt-1'>
								{currentMaterial?.description}
							</p>
						</div>

						{/* Dynamic Form Fields */}
						<div className='space-y-4'>
							{/* Room dimensions (for paint, putty, primer) */}
							{materialType !== 'tileGlue' && (
								<>
									<div className='grid grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												{t('form.roomLength')}
											</label>
											<div className='relative'>
												<input
													type='number'
													value={
														formData.roomLength ||
														''
													}
													onChange={(e) =>
														handleInputChange(
															'roomLength',
															parseFloat(
																e.target.value
															) || 0
														)
													}
													className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
													placeholder='0'
													step='0.1'
													min='0'
												/>
												<span className='absolute right-3 top-2 text-gray-500 text-sm'>
													м
												</span>
											</div>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												{t('form.roomWidth')}
											</label>
											<div className='relative'>
												<input
													type='number'
													value={
														formData.roomWidth || ''
													}
													onChange={(e) =>
														handleInputChange(
															'roomWidth',
															parseFloat(
																e.target.value
															) || 0
														)
													}
													className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
													placeholder='0'
													step='0.1'
													min='0'
												/>
												<span className='absolute right-3 top-2 text-gray-500 text-sm'>
													м
												</span>
											</div>
										</div>
									</div>

									<div>
										<label className='block text-sm font-medium text-gray-700 mb-1'>
											{t('form.wallHeight')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.wallHeight || ''
												}
												onChange={(e) =>
													handleInputChange(
														'wallHeight',
														parseFloat(
															e.target.value
														) || 0
													)
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
												placeholder='0'
												step='0.1'
												min='0'
											/>
											<span className='absolute right-3 top-2 text-gray-500 text-sm'>
												м
											</span>
										</div>
									</div>
								</>
							)}

							{/* Floor area (for tile glue) */}
							{materialType === 'tileGlue' && (
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										{t('form.floorArea')}
									</label>
									<div className='relative'>
										<input
											type='number'
											value={formData.floorArea || ''}
											onChange={(e) =>
												handleInputChange(
													'floorArea',
													parseFloat(
														e.target.value
													) || 0
												)
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
											placeholder='0'
											step='0.1'
											min='0'
										/>
										<span className='absolute right-3 top-2 text-gray-500 text-sm'>
											м²
										</span>
									</div>
								</div>
							)}

							{/* Doors and windows area */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									{t('form.doorsWindowsArea')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={formData.doorsWindowsArea || ''}
										onChange={(e) =>
											handleInputChange(
												'doorsWindowsArea',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
										placeholder='0'
										step='0.1'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 text-sm'>
										м²
									</span>
								</div>
							</div>

							{/* Layers (not for primer and tile glue) */}
							{materialType !== 'primer' &&
								materialType !== 'tileGlue' && (
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-1'>
											{t('form.layers')}
										</label>
										<input
											type='number'
											value={formData.layers || ''}
											onChange={(e) =>
												handleInputChange(
													'layers',
													parseInt(e.target.value) ||
														1
												)
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
											placeholder='2'
											min='1'
										/>
									</div>
								)}

							{/* Consumption rate */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									{t('form.consumptionRate')} (
									{currentMaterial?.unit}/м²)
								</label>
								<input
									type='number'
									value={formData.consumptionRate || ''}
									onChange={(e) =>
										handleInputChange(
											'consumptionRate',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='0.12'
									step='0.01'
									min='0'
								/>
							</div>

							{/* Reserve percentage */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
										placeholder='10'
										step='1'
										min='0'
										max='100'
									/>
									<span className='absolute right-3 top-2 text-gray-500 text-sm'>
										%
									</span>
								</div>
							</div>

							{/* Package size */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									{t('form.packageSize')} (
									{currentMaterial?.unit})
								</label>
								<input
									type='number'
									value={formData.packageSize || ''}
									onChange={(e) =>
										handleInputChange(
											'packageSize',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='2.5'
									step='0.1'
									min='0'
								/>
							</div>

							{/* Tile specific fields */}
							{materialType === 'tileGlue' && (
								<>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-1'>
											{t('form.tileSize')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={formData.tileSize || ''}
												onChange={(e) =>
													handleInputChange(
														'tileSize',
														parseFloat(
															e.target.value
														) || 0
													)
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
												placeholder='0'
												step='0.01'
												min='0'
											/>
											<span className='absolute right-3 top-2 text-gray-500 text-sm'>
												м²
											</span>
										</div>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-1'>
											{t('form.groutWidth')}
										</label>
										<div className='relative'>
											<input
												type='number'
												value={
													formData.groutWidth || ''
												}
												onChange={(e) =>
													handleInputChange(
														'groutWidth',
														parseFloat(
															e.target.value
														) || 0
													)
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
												placeholder='2'
												step='0.1'
												min='0'
											/>
											<span className='absolute right-3 top-2 text-gray-500 text-sm'>
												мм
											</span>
										</div>
									</div>
								</>
							)}
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
							className='w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200'
						>
							{t('form.reset')}
						</button>
					</div>
				</div>

				{/* Error Messages */}
				{errors.length > 0 && (
					<div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
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
			</div>

			{/* Results */}
			{result && (
				<div className='bg-white rounded-lg shadow-lg p-6'>
					<div className='flex items-center mb-6'>
						<Package className='h-6 w-6 text-green-600 mr-3' />
						<h2 className='text-2xl font-bold text-gray-900'>
							{t('results.title')}
						</h2>
					</div>

					{/* Results Table */}
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse border border-gray-300'>
							<thead>
								<tr className='bg-gray-50'>
									<th className='border border-gray-300 px-4 py-3 text-left font-medium text-gray-700'>
										{t('results.parameter')}
									</th>
									<th className='border border-gray-300 px-4 py-3 text-left font-medium text-gray-700'>
										{t('results.value')}
									</th>
								</tr>
							</thead>
							<tbody>
								{result.totalWallArea > 0 && (
									<tr>
										<td className='border border-gray-300 px-4 py-3 text-gray-700'>
											{t('results.totalWallArea')}
										</td>
										<td className='border border-gray-300 px-4 py-3 font-medium'>
											{result.totalWallArea} м²
										</td>
									</tr>
								)}
								{result.floorArea && result.floorArea > 0 && (
									<tr>
										<td className='border border-gray-300 px-4 py-3 text-gray-700'>
											{t('results.floorArea')}
										</td>
										<td className='border border-gray-300 px-4 py-3 font-medium'>
											{result.floorArea} м²
										</td>
									</tr>
								)}
								<tr>
									<td className='border border-gray-300 px-4 py-3 text-gray-700'>
										{t('results.doorsWindowsArea')}
									</td>
									<td className='border border-gray-300 px-4 py-3 font-medium'>
										{result.doorsWindowsArea} м²
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 px-4 py-3 text-gray-700'>
										{t('results.usefulArea')}
									</td>
									<td className='border border-gray-300 px-4 py-3 font-medium'>
										{result.usefulArea} м²
									</td>
								</tr>
								{result.layers > 1 && (
									<tr>
										<td className='border border-gray-300 px-4 py-3 text-gray-700'>
											{t('results.layers')}
										</td>
										<td className='border border-gray-300 px-4 py-3 font-medium'>
											{result.layers}
										</td>
									</tr>
								)}
								<tr>
									<td className='border border-gray-300 px-4 py-3 text-gray-700'>
										{t('results.consumptionPerLayer')}
									</td>
									<td className='border border-gray-300 px-4 py-3 font-medium'>
										{formatMaterialAmount(
											result.consumptionPerLayer,
											result.unit
										)}
									</td>
								</tr>
								<tr className='bg-green-50'>
									<td className='border border-gray-300 px-4 py-3 text-gray-700 font-medium'>
										{t('results.totalMaterial')}
									</td>
									<td className='border border-gray-300 px-4 py-3 font-bold text-green-700'>
										{formatMaterialAmount(
											result.totalMaterial,
											result.unit
										)}
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 px-4 py-3 text-gray-700'>
										{t('results.packageSize')}
									</td>
									<td className='border border-gray-300 px-4 py-3 font-medium'>
										{result.packageSize} {result.unit}
									</td>
								</tr>
								<tr className='bg-blue-50'>
									<td className='border border-gray-300 px-4 py-3 text-gray-700 font-medium'>
										{t('results.packagesNeeded')}
									</td>
									<td className='border border-gray-300 px-4 py-3 font-bold text-blue-700'>
										{result.packagesNeeded}{' '}
										{t('results.pieces')}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Tips */}
					<div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
						<div className='flex items-start'>
							<AlertCircle className='h-5 w-5 text-blue-600 mr-3 mt-0.5' />
							<div>
								<h3 className='text-sm font-medium text-blue-800 mb-2'>
									{t('results.tips.title')}
								</h3>
								<ul className='text-sm text-blue-700 space-y-1'>
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
