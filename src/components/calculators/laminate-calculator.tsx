'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Square, Package, AlertCircle } from 'lucide-react';
import {
	calculateLaminate,
	validateLaminateInput,
	LaminateInput,
	LaminateResult,
} from '@/lib/calculators/laminate';

/**
 * Laminate Calculator Component
 * 
 * A React component for calculating laminate flooring needed for a room.
 * 
 * Features:
 * - Room dimensions input
 * - Laminate board dimensions input
 * - Reserve percentage calculation
 * - Package quantity calculation
 * - Area calculation
 * - Number of boards calculation
 * - Number of packages calculation
 * - Responsive design
 * 
 * Uses the laminate calculation library from @/lib/calculators/laminate
 * for all mathematical operations.
 */
export default function LaminateCalculator() {
	// Internationalization hooks for translations
	const t = useTranslations('calculators.laminate');
	const tCommon = useTranslations('common');
	
	// Form state management
	const [input, setInput] = useState<Partial<LaminateInput>>({
		roomLength: 0, // Room length (m)
		roomWidth: 0, // Room width (m)
		laminateLength: 0, // Laminate board length (m)
		laminateWidth: 0, // Laminate board width (m)
		packageQuantity: 0, // Boards per package
		reservePercentage: 10, // Reserve percentage for waste (%)
	});
	const [result, setResult] = useState<LaminateResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors

	const handleInputChange = (
		field: keyof LaminateInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleCalculate = () => {
		const validationErrors = validateLaminateInput(input);
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateLaminate(input as LaminateInput);
			setResult(calculationResult);
			setErrors([]);
		} catch (error) {
			setErrors([tCommon('calculationError')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			roomLength: 0,
			roomWidth: 0,
			laminateLength: 0,
			laminateWidth: 0,
			packageQuantity: 0,
			reservePercentage: 10,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
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
						{/* Room Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
								{t('form.roomDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.roomLength')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.roomLength || ''}
										onChange={(e) =>
											handleInputChange(
												'roomLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500 dark:text-gray-400'>
										м
									</span>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.roomWidth')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.roomWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'roomWidth',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500 dark:text-gray-400'>
										м
									</span>
								</div>
							</div>
						</div>

						{/* Laminate Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
								{t('form.laminateDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.laminateLength')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.laminateLength || ''}
										onChange={(e) =>
											handleInputChange(
												'laminateLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500 dark:text-gray-400'>
										см
									</span>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.laminateWidth')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.laminateWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'laminateWidth',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500 dark:text-gray-400'>
										см
									</span>
								</div>
							</div>
						</div>

						{/* Package Info */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
								{t('form.packageInfo')}
							</h3>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.packageQuantity')}
								</label>
								<input
									type='number'
									value={input.packageQuantity || ''}
									onChange={(e) =>
										handleInputChange(
											'packageQuantity',
											parseInt(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='0'
								/>
								<span className='text-xs text-gray-500 dark:text-gray-400'>
									{t('form.piecesPerPackage')}
								</span>
							</div>
						</div>

						{/* Reserve */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.reservePercentage')}
							</label>
							<input
								type='number'
								step='1'
								value={input.reservePercentage || 10}
								onChange={(e) =>
									handleInputChange(
										'reservePercentage',
										parseInt(e.target.value) || 10
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='10'
							/>
							<span className='text-xs text-gray-500 dark:text-gray-400'>
								%
							</span>
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
								<h3 className='text-sm font-medium text-red-800 dark:text-red-300'>
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

					{/* Results Table */}
					{result && (
						<div className='space-y-4'>
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-300 mb-2'>
									{t('results.summary')}
								</h3>
								<div className='text-2xl font-bold text-green-900 dark:text-green-200'>
									{result.packagesNeeded}{' '}
									{t('results.packages')}
								</div>
								<div className='text-sm text-green-700 dark:text-green-400'>
									{result.totalPieces} {t('results.pieces')}
								</div>
							</div>

							<div className='overflow-x-auto'>
								<table className='w-full text-sm'>
									<thead>
										<tr className='bg-gray-50 dark:bg-gray-700'>
											<th className='px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300'>
												{t('results.parameter')}
											</th>
											<th className='px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300'>
												{t('results.value')}
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900 dark:text-white'>
												{t('results.roomArea')}
											</td>
											<td className='px-4 py-2 text-gray-700 dark:text-gray-300'>
												{result.roomArea} м²
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900 dark:text-white'>
												{t('results.laminateSize')}
											</td>
											<td className='px-4 py-2 text-gray-700 dark:text-gray-300'>
												{result.laminateSize}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900 dark:text-white'>
												{t('results.laminateArea')}
											</td>
											<td className='px-4 py-2 text-gray-700 dark:text-gray-300'>
												{result.laminateArea} м²
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900 dark:text-white'>
												{t('results.totalPieces')}
											</td>
											<td className='px-4 py-2 text-gray-700 dark:text-gray-300'>
												{result.totalPieces}{' '}
												{result.unit}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900 dark:text-white'>
												{t('results.reserve')}
											</td>
											<td className='px-4 py-2 text-gray-700 dark:text-gray-300'>
												{result.reservePercentage}%
											</td>
										</tr>
										<tr className='bg-blue-50 dark:bg-blue-900/20'>
											<td className='px-4 py-2 font-semibold text-blue-900 dark:text-blue-200'>
												{t('results.packagesNeeded')}
											</td>
											<td className='px-4 py-2 font-semibold text-blue-900 dark:text-blue-200'>
												{result.packagesNeeded}{' '}
												{t('results.packages')}
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* Tips */}
							<div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2'>
									{t('results.tips.title')}
								</h4>
								<p className='text-sm text-yellow-700 dark:text-yellow-400'>
									{t('results.tips.recommendation')}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
