'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Square, Package, AlertCircle } from 'lucide-react';
import {
	calculateTileLaminate,
	validateTileLaminateInput,
	getFlooringTypeOptions,
	TileLaminateInput,
	TileLaminateResult,
} from '@/lib/calculators/tile-laminate';

export default function TileLaminateCalculator() {
	const t = useTranslations('calculators.tile-laminate');
	const [input, setInput] = useState<Partial<TileLaminateInput>>({
		roomLength: 0,
		roomWidth: 0,
		flooringType: 'tile',
		elementLength: 0,
		elementWidth: 0,
		packageQuantity: 0,
		reservePercentage: 10,
		groutWidth: 2,
	});
	const [result, setResult] = useState<TileLaminateResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const flooringOptions = getFlooringTypeOptions(t);

	const handleInputChange = (
		field: keyof TileLaminateInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleCalculate = () => {
		const validationErrors = validateTileLaminateInput(input);
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateTileLaminate(
				input as TileLaminateInput
			);
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
			flooringType: 'tile',
			elementLength: 0,
			elementWidth: 0,
			packageQuantity: 0,
			reservePercentage: 10,
			groutWidth: 2,
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
						<Square className='h-5 w-5 text-blue-600 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Flooring Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.flooringType')}
							</label>
							<select
								value={input.flooringType || 'tile'}
								onChange={(e) =>
									handleInputChange(
										'flooringType',
										e.target.value as 'tile' | 'laminate'
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{flooringOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Room Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.roomDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500'>
										м
									</span>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500'>
										м
									</span>
								</div>
							</div>
						</div>

						{/* Element Dimensions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.elementDimensions')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.elementLength')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.elementLength || ''}
										onChange={(e) =>
											handleInputChange(
												'elementLength',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500'>
										см
									</span>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.elementWidth')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.elementWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'elementWidth',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
									<span className='text-xs text-gray-500'>
										см
									</span>
								</div>
							</div>
						</div>

						{/* Package Info */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.packageInfo')}
							</h3>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
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
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='0'
								/>
								<span className='text-xs text-gray-500'>
									{t('form.piecesPerPackage')}
								</span>
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
								value={input.reservePercentage || 10}
								onChange={(e) =>
									handleInputChange(
										'reservePercentage',
										parseInt(e.target.value) || 10
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='10'
							/>
							<span className='text-xs text-gray-500'>%</span>
						</div>

						{/* Grout Width (for tiles) */}
						{input.flooringType === 'tile' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.groutWidth')}
								</label>
								<input
									type='number'
									step='0.1'
									value={input.groutWidth || ''}
									onChange={(e) =>
										handleInputChange(
											'groutWidth',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='2.0'
								/>
								<span className='text-xs text-gray-500'>
									мм
								</span>
							</div>
						)}

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
							<div className='bg-green-50 border border-green-200 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 mb-2'>
									{t('results.summary')}
								</h3>
								<div className='text-2xl font-bold text-green-900'>
									{result.packagesNeeded}{' '}
									{t('results.packages')}
								</div>
								<div className='text-sm text-green-700'>
									{result.totalElements}{' '}
									{t('results.elements')}
								</div>
							</div>

							<div className='overflow-x-auto'>
								<table className='w-full text-sm'>
									<thead>
										<tr className='bg-gray-50'>
											<th className='px-4 py-2 text-left font-medium text-gray-700'>
												{t(
													'tile-laminate.results.parameter'
												)}
											</th>
											<th className='px-4 py-2 text-left font-medium text-gray-700'>
												{t(
													'tile-laminate.results.value'
												)}
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t(
													'tile-laminate.results.roomArea'
												)}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.roomArea} м²
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t(
													'tile-laminate.results.flooringType'
												)}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.flooringType}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t(
													'tile-laminate.results.elementSize'
												)}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.elementSize}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t(
													'tile-laminate.results.elementArea'
												)}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.elementArea} м²
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t(
													'tile-laminate.results.totalElements'
												)}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.totalElements}{' '}
												{result.unit}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t(
													'tile-laminate.results.reserve'
												)}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.reservePercentage}%
											</td>
										</tr>
										<tr className='bg-blue-50'>
											<td className='px-4 py-2 font-semibold text-blue-900'>
												{t(
													'tile-laminate.results.packagesNeeded'
												)}
											</td>
											<td className='px-4 py-2 font-semibold text-blue-900'>
												{result.packagesNeeded}{' '}
												{t(
													'tile-laminate.results.packages'
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* Tips */}
							<div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-yellow-800 mb-2'>
									{t('results.tips.title')}
								</h4>
								<p className='text-sm text-yellow-700'>
									{t(
										'tile-laminate.results.tips.recommendation'
									)}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
