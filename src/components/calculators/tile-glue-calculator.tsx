'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Package, AlertCircle } from 'lucide-react';
import {
	calculateMaterial,
	validateMaterialInput,
	formatMaterialAmount,
	MaterialInput,
	MaterialResult,
	MATERIALS,
} from '@/lib/calculators/materials';

/**
 * Tile Glue Calculator Component
 * 
 * A React component for calculating tile adhesive needed for floor tiling.
 * 
 * Features:
 * - Floor area input
 * - Tile size input
 * - Grout width consideration
 * - Consumption rate calculation
 * - Reserve percentage calculation
 * - Package size calculation
 * - Responsive design
 * 
 * Uses the materials calculation library from @/lib/calculators/materials
 * for all mathematical operations.
 */
export default function TileGlueCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.tileGlue');
	const materialType = 'tileGlue'; // Material type identifier
	const [result, setResult] = useState<MaterialResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	const material = MATERIALS[materialType]; // Get material configuration

	// Form state management
	const [formData, setFormData] = useState<Partial<MaterialInput>>({
		floorArea: 0, // Floor area (m²)
		doorsWindowsArea: 0, // Area to exclude (m²)
		consumptionRate: material?.defaultConsumption || 4, // Consumption rate (kg/m²)
		reservePercentage: 10, // Reserve percentage for waste (%)
		packageSize: material?.defaultPackageSize || 25, // Package size (kg)
		tileSize: 0, // Tile size (m²)
		groutWidth: 2, // Grout width (mm)
	});

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
			floorArea: 0,
			doorsWindowsArea: 0,
			consumptionRate: material?.defaultConsumption || 4,
			reservePercentage: 10,
			packageSize: material?.defaultPackageSize || 25,
			tileSize: 0,
			groutWidth: 2,
		});
		setResult(null);
		setErrors([]);
		setIsCalculated(false);
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Form Fields */}
					<div className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.floorArea')}
							</label>
							<div className='relative'>
								<input
									type='number'
									value={formData.floorArea || ''}
									onChange={(e) =>
										handleInputChange(
											'floorArea',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='0'
									step='0.1'
									min='0'
								/>
								<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
									м²
								</span>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
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
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='0'
									step='0.1'
									min='0'
								/>
								<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
									м²
								</span>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.tileSize')} (м²)
							</label>
							<input
								type='number'
								value={formData.tileSize || ''}
								onChange={(e) =>
									handleInputChange(
										'tileSize',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='0.04'
								step='0.01'
								min='0'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.groutWidth')} (мм)
							</label>
							<input
								type='number'
								value={formData.groutWidth || ''}
								onChange={(e) =>
									handleInputChange(
										'groutWidth',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='2'
								step='0.5'
								min='0'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.consumptionRate')} (кг/м²)
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
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='4'
								step='0.1'
								min='0'
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

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.packageSize')} (кг)
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
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='25'
								step='0.1'
								min='0'
							/>
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
						<Package className='h-6 w-6 text-green-600 dark:text-green-400 mr-3' />
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
								{result.floorArea !== undefined && (
									<tr>
										<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
											{t('results.floorArea')}
										</td>
										<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
											{result.floorArea} м²
										</td>
									</tr>
								)}
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.usefulArea')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.usefulArea} м²
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.consumptionPerLayer')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{formatMaterialAmount(
											result.consumptionPerLayer,
											result.unit
										)}
									</td>
								</tr>
								<tr className='bg-green-50 dark:bg-green-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.totalMaterial')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-green-700 dark:text-green-400'>
										{formatMaterialAmount(
											result.totalMaterial,
											result.unit
										)}
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.packageSize')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.packageSize} {result.unit}
									</td>
								</tr>
								<tr className='bg-blue-50 dark:bg-blue-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.packagesNeeded')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-blue-700 dark:text-blue-400'>
										{result.packagesNeeded}{' '}
										{t('results.pieces')}
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
									<li>• {t('results.tips.tileSize')}</li>
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
