'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	calculateHeatingCost,
	validateHeatingCostInput,
	HEATING_TYPES,
	BUILDING_TYPES,
	type HeatingCostInput,
	type HeatingCostResult,
} from '@/lib/calculators/heating-cost';

export default function HeatingCostCalculator() {
	const t = useTranslations('calculators.heatingCost');
	const [input, setInput] = useState<HeatingCostInput>({
		area: 50,
		seasonDays: 180,
		hoursPerDay: 12,
		temperature: 22,
		heatingType: 'electric',
		tariff: 5.5,
		efficiency: 100,
	});
	const [result, setResult] = useState<HeatingCostResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	// Auto-calculate when input changes
	useEffect(() => {
		const timer = setTimeout(() => {
			handleCalculate();
		}, 500);

		return () => clearTimeout(timer);
	}, [input]);

	const handleInputChange = (
		field: keyof HeatingCostInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleCalculate = () => {
		setIsCalculating(true);
		setErrors([]);

		try {
			const validation = validateHeatingCostInput(input);
			if (!validation.isValid) {
				setErrors(validation.errors);
				setResult(null);
				return;
			}

			const calculation = calculateHeatingCost(input);
			setResult(calculation);
		} catch (error) {
			setErrors([
				error instanceof Error ? error.message : 'Calculation error',
			]);
			setResult(null);
		} finally {
			setIsCalculating(false);
		}
	};

	const handleReset = () => {
		setInput({
			area: 50,
			seasonDays: 180,
			hoursPerDay: 12,
			temperature: 22,
			heatingType: 'electric',
			tariff: 5.5,
			efficiency: 100,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header with infographic */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4'>
					<svg
						className='w-8 h-8 text-orange-600'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
						/>
					</svg>
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('form.title')}
				</h2>
				<p className='text-gray-600'>{t('form.description')}</p>
			</div>

			{/* Input Form */}
			<div className='bg-white rounded-lg shadow-md p-6 mb-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Area */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.area')}
						</label>
						<input
							type='number'
							value={input.area}
							onChange={(e) =>
								handleInputChange(
									'area',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
							placeholder='50'
							min='1'
							step='1'
						/>
					</div>

					{/* Season Days */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.seasonDays')}
						</label>
						<input
							type='number'
							value={input.seasonDays}
							onChange={(e) =>
								handleInputChange(
									'seasonDays',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
							placeholder='180'
							min='1'
							max='365'
							step='1'
						/>
					</div>

					{/* Hours per day */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.hoursPerDay')}
						</label>
						<input
							type='number'
							value={input.hoursPerDay}
							onChange={(e) =>
								handleInputChange(
									'hoursPerDay',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
							placeholder='12'
							min='0'
							max='24'
							step='0.5'
						/>
					</div>

					{/* Temperature */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.temperature')}
						</label>
						<input
							type='number'
							value={input.temperature}
							onChange={(e) =>
								handleInputChange(
									'temperature',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
							placeholder='22'
							min='10'
							max='30'
							step='1'
						/>
					</div>

					{/* Heating Type */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.heatingType')}
						</label>
						<select
							value={input.heatingType}
							onChange={(e) =>
								handleInputChange(
									'heatingType',
									e.target
										.value as HeatingCostInput['heatingType']
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
						>
							{HEATING_TYPES.map((heating) => (
								<option
									key={heating.id}
									value={heating.id}
								>
									{t(`form.heatingTypes.${heating.id}`)}
								</option>
							))}
						</select>
					</div>

					{/* Efficiency */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.efficiency')}
						</label>
						<input
							type='number'
							value={input.efficiency}
							onChange={(e) =>
								handleInputChange(
									'efficiency',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
							placeholder='100'
							min='10'
							max='100'
							step='1'
						/>
					</div>

					{/* Tariff */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.tariff')} ({t('form.tariffUnit')})
						</label>
						<input
							type='number'
							value={input.tariff}
							onChange={(e) =>
								handleInputChange(
									'tariff',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
							placeholder='5.5'
							min='0'
							step='0.1'
						/>
					</div>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating}
						className='flex-1 bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
					>
						{isCalculating
							? t('form.calculating')
							: t('form.calculate')}
					</button>
					<button
						onClick={handleReset}
						className='flex-1 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors'
					>
						{t('form.reset')}
					</button>
				</div>

				{/* Errors */}
				{errors.length > 0 && (
					<div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-md'>
						<h4 className='text-red-800 font-medium mb-2'>
							{t('form.errors.title')}
						</h4>
						<ul className='text-red-700 text-sm space-y-1'>
							{errors.map((error, index) => (
								<li key={index}>• {error}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white rounded-lg shadow-md p-6 mb-8'
				>
					<h3 className='text-xl font-bold text-gray-900 mb-6'>
						{t('results.title')}
					</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{/* Required Power */}
						<div className='bg-orange-50 p-4 rounded-lg'>
							<div className='text-sm text-orange-600 font-medium mb-1'>
								{t('results.requiredPower')}
							</div>
							<div className='text-2xl font-bold text-orange-900'>
								{result.requiredPower} W
							</div>
							<div className='text-xs text-orange-700 mt-1'>
								{result.powerPerSquareMeter} W/m²
							</div>
						</div>

						{/* Daily Consumption */}
						<div className='bg-blue-50 p-4 rounded-lg'>
							<div className='text-sm text-blue-600 font-medium mb-1'>
								{t('results.dailyConsumption')}
							</div>
							<div className='text-2xl font-bold text-blue-900'>
								{result.dailyConsumption} kWh
							</div>
							<div className='text-xs text-blue-700 mt-1'>
								{t('results.perDay')}
							</div>
						</div>

						{/* Seasonal Consumption */}
						<div className='bg-green-50 p-4 rounded-lg'>
							<div className='text-sm text-green-600 font-medium mb-1'>
								{t('results.seasonalConsumption')}
							</div>
							<div className='text-2xl font-bold text-green-900'>
								{result.seasonalConsumption} kWh
							</div>
							<div className='text-xs text-green-700 mt-1'>
								{t('results.perSeason')}
							</div>
						</div>

						{/* Daily Cost */}
						<div className='bg-purple-50 p-4 rounded-lg'>
							<div className='text-sm text-purple-600 font-medium mb-1'>
								{t('results.dailyCost')}
							</div>
							<div className='text-2xl font-bold text-purple-900'>
								{result.dailyCost} ₽
							</div>
							<div className='text-xs text-purple-700 mt-1'>
								{t('results.perDay')}
							</div>
						</div>

						{/* Seasonal Cost */}
						<div className='bg-red-50 p-4 rounded-lg'>
							<div className='text-sm text-red-600 font-medium mb-1'>
								{t('results.seasonalCost')}
							</div>
							<div className='text-2xl font-bold text-red-900'>
								{result.seasonalCost} ₽
							</div>
							<div className='text-xs text-red-700 mt-1'>
								{t('results.perSeason')}
							</div>
						</div>

						{/* Heating Type Info */}
						<div className='bg-yellow-50 p-4 rounded-lg'>
							<div className='text-sm text-yellow-600 font-medium mb-1'>
								{t('results.heatingType')}
							</div>
							<div className='text-lg font-bold text-yellow-900'>
								{t(
									`form.heatingTypes.${result.heatingTypeInfo.id}`
								)}
							</div>
							<div className='text-xs text-yellow-700 mt-1'>
								{t('results.efficiency')}: {input.efficiency}%
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Building Types Table */}
			<div className='bg-white rounded-lg shadow-md p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-4'>
					{t('table.title')}
				</h3>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-gray-50'>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.buildingType')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.powerRange')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.description')}
								</th>
							</tr>
						</thead>
						<tbody>
							{BUILDING_TYPES.map((building, index) => (
								<tr
									key={building.id}
									className={
										index % 2 === 0
											? 'bg-white'
											: 'bg-gray-50'
									}
								>
									<td className='border border-gray-300 px-4 py-2 font-medium'>
										{t(`form.buildingTypes.${building.id}`)}
									</td>
									<td className='border border-gray-300 px-4 py-2'>
										{building.powerRange.min}–
										{building.powerRange.max} W/m²
									</td>
									<td className='border border-gray-300 px-4 py-2 text-sm text-gray-600'>
										{t(
											`form.buildingDescriptions.${building.id}`
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}







