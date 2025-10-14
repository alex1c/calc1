'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
} from 'lucide-react';
import {
	calculateConcrete,
	validateConcreteInput,
	getConcreteGradeOptions,
	getDefaultProportions,
	ConcreteInput,
	ConcreteResult,
} from '@/lib/calculators/concrete';

export default function ConcreteCalculator() {
	const t = useTranslations('calculators.concrete');
	const [input, setInput] = useState<Partial<ConcreteInput>>({
		volume: 0,
		volumeUnit: 'm3',
		grade: '',
		cementProportion: 1,
		sandProportion: 3,
		gravelProportion: 5,
		waterCementRatio: 0.5,
		outputUnits: {
			cement: 'kg',
			sand: 'kg',
			gravel: 'kg',
			water: 'liters',
		},
	});
	const [result, setResult] = useState<ConcreteResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const gradeOptions = getConcreteGradeOptions(t);

	// Update proportions when grade changes
	useEffect(() => {
		if (input.grade) {
			const defaultProps = getDefaultProportions(input.grade);
			setInput((prev) => ({
				...prev,
				cementProportion: defaultProps.cement,
				sandProportion: defaultProps.sand,
				gravelProportion: defaultProps.gravel,
				waterCementRatio: defaultProps.waterCementRatio,
			}));
		}
	}, [input.grade]);

	const handleInputChange = (
		field: keyof ConcreteInput,
		value: string | number | object
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleOutputUnitChange = (
		component: 'cement' | 'sand' | 'gravel' | 'water',
		unit: string
	) => {
		setInput((prev) => ({
			...prev,
			outputUnits: {
				...prev.outputUnits!,
				[component]: unit,
			},
		}));
		setErrors([]);
	};

	const handleCalculate = () => {
		const validationErrors = validateConcreteInput(input);
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateConcrete(input as ConcreteInput);
			setResult(calculationResult);
			setErrors([]);
		} catch (error) {
			setErrors([t('errors.calculation')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			volume: 0,
			volumeUnit: 'm3',
			grade: '',
			cementProportion: 1,
			sandProportion: 3,
			gravelProportion: 5,
			waterCementRatio: 0.5,
			outputUnits: {
				cement: 'kg',
				sand: 'kg',
				gravel: 'kg',
				water: 'liters',
			},
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
						<Square className='h-5 w-5 text-blue-600 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Volume Input */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.volume')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.volumeAmount')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.volume || ''}
										onChange={(e) =>
											handleInputChange(
												'volume',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='0.0'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.volumeUnit')}
									</label>
									<select
										value={input.volumeUnit || 'm3'}
										onChange={(e) =>
											handleInputChange(
												'volumeUnit',
												e.target.value as
													| 'm3'
													| 'liters'
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									>
										<option value='m3'>
											{t('form.units.m3')}
										</option>
										<option value='liters'>
											{t('form.units.liters')}
										</option>
									</select>
								</div>
							</div>
						</div>

						{/* Concrete Grade */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.grade')}
							</label>
							<select
								value={input.grade || ''}
								onChange={(e) =>
									handleInputChange('grade', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectGrade')}
								</option>
								{gradeOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label} - {option.description}
									</option>
								))}
							</select>
						</div>

						{/* Proportions */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.proportions')}
							</h3>
							<div className='grid grid-cols-3 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.cement')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.cementProportion || ''}
										onChange={(e) =>
											handleInputChange(
												'cementProportion',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='1'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.sand')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.sandProportion || ''}
										onChange={(e) =>
											handleInputChange(
												'sandProportion',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='3'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.gravel')}
									</label>
									<input
										type='number'
										step='0.1'
										value={input.gravelProportion || ''}
										onChange={(e) =>
											handleInputChange(
												'gravelProportion',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='5'
									/>
								</div>
							</div>
							<p className='text-sm text-gray-500 mt-2'>
								{t('form.proportionsNote')}
							</p>
						</div>

						{/* Water-Cement Ratio */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.waterCementRatio')}
							</label>
							<input
								type='number'
								step='0.01'
								value={input.waterCementRatio || ''}
								onChange={(e) =>
									handleInputChange(
										'waterCementRatio',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='0.5'
							/>
							<p className='text-sm text-gray-500 mt-1'>
								{t('form.waterCementRatioNote')}
							</p>
						</div>

						{/* Output Units */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								{t('form.outputUnits')}
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.cement')}
									</label>
									<select
										value={
											input.outputUnits?.cement || 'kg'
										}
										onChange={(e) =>
											handleOutputUnitChange(
												'cement',
												e.target.value
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									>
										<option value='kg'>
											{t('form.units.kg')}
										</option>
										<option value='tons'>
											{t('form.units.tons')}
										</option>
									</select>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.sand')}
									</label>
									<select
										value={input.outputUnits?.sand || 'kg'}
										onChange={(e) =>
											handleOutputUnitChange(
												'sand',
												e.target.value
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									>
										<option value='kg'>
											{t('form.units.kg')}
										</option>
										<option value='tons'>
											{t('form.units.tons')}
										</option>
									</select>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.gravel')}
									</label>
									<select
										value={
											input.outputUnits?.gravel || 'kg'
										}
										onChange={(e) =>
											handleOutputUnitChange(
												'gravel',
												e.target.value
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									>
										<option value='kg'>
											{t('form.units.kg')}
										</option>
										<option value='tons'>
											{t('form.units.tons')}
										</option>
									</select>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.water')}
									</label>
									<select
										value={
											input.outputUnits?.water || 'liters'
										}
										onChange={(e) =>
											handleOutputUnitChange(
												'water',
												e.target.value
											)
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									>
										<option value='liters'>
											{t('form.units.liters')}
										</option>
										<option value='m3'>
											{t('form.units.m3')}
										</option>
									</select>
								</div>
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
								<div className='text-sm text-green-700'>
									{t('results.volume')}: {result.volume}{' '}
									{result.volumeUnit}
								</div>
								<div className='text-sm text-green-700'>
									{t('results.grade')}: {result.grade}
								</div>
							</div>

							{/* Materials Table */}
							<div className='overflow-x-auto'>
								<table className='w-full text-sm'>
									<thead>
										<tr className='bg-gray-50'>
											<th className='px-4 py-2 text-left font-medium text-gray-700'>
												{t('results.material')}
											</th>
											<th className='px-4 py-2 text-left font-medium text-gray-700'>
												{t('results.amount')}
											</th>
											<th className='px-4 py-2 text-left font-medium text-gray-700'>
												{t('results.unit')}
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t('results.cement')}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.cement.amount}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.cement.unit}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t('results.sand')}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.sand.amount}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.sand.unit}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t('results.gravel')}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.gravel.amount}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.gravel.unit}
											</td>
										</tr>
										<tr>
											<td className='px-4 py-2 font-medium text-gray-900'>
												{t('results.water')}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.water.amount}
											</td>
											<td className='px-4 py-2 text-gray-700'>
												{result.water.unit}
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* Cement Bags */}
							{result.cement.bags > 0 && (
								<div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
									<h4 className='text-sm font-semibold text-blue-800 mb-2'>
										{t('results.cementBags')}
									</h4>
									<p className='text-sm text-blue-700'>
										{result.cement.bags}{' '}
										{t('results.bags50kg')}
									</p>
								</div>
							)}

							{/* Proportions */}
							<div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
								<h4 className='text-sm font-semibold text-yellow-800 mb-2'>
									{t('results.proportions')}
								</h4>
								<p className='text-sm text-yellow-700'>
									{t('results.proportionsText', {
										cement: result.proportions.cement,
										sand: result.proportions.sand,
										gravel: result.proportions.gravel,
									})}
								</p>
								<p className='text-sm text-yellow-700'>
									{t('results.waterCementRatio')}:{' '}
									{result.waterCementRatio}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
