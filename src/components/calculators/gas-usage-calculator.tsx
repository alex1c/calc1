'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	calculateGasUsage,
	validateGasUsageInput,
	GAS_PURPOSES,
	GAS_EQUIPMENT_TYPES,
	type GasUsageInput,
	type GasUsageResult,
} from '@/lib/calculators/gas-usage';

export default function GasUsageCalculator() {
	const t = useTranslations('calculators.gasUsage');
	const [input, setInput] = useState<GasUsageInput>({
		purpose: 'heating',
		area: 50,
		hoursPerDay: 12,
		power: 20,
		efficiency: 90,
		tariff: 8.5,
		periodDays: 30,
	});
	const [result, setResult] = useState<GasUsageResult | null>(null);
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
		field: keyof GasUsageInput,
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
			const validation = validateGasUsageInput(input);
			if (!validation.isValid) {
				setErrors(validation.errors);
				setResult(null);
				return;
			}

			const calculation = calculateGasUsage(input);
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
			purpose: 'heating',
			area: 50,
			hoursPerDay: 12,
			power: 20,
			efficiency: 90,
			tariff: 8.5,
			periodDays: 30,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header with infographic */}
			<div className='text-center mb-12'>
				<div className='inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6'>
					<svg
						className='w-10 h-10 text-blue-600'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M13 10V3L4 14h7v7l9-11h-7z'
						/>
					</svg>
				</div>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('form.title')}
				</h2>
				<p className='text-gray-600 text-lg max-w-2xl mx-auto'>
					{t('form.description')}
				</p>

				{/* Infographic section */}
				<div className='mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						{t('form.infographic.title')}
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='text-center'>
							<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<svg
									className='w-6 h-6 text-blue-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z'
									/>
								</svg>
							</div>
							<h4 className='font-medium text-gray-800 mb-1'>
								{t('form.infographic.heating.title')}
							</h4>
							<p className='text-sm text-gray-600'>
								{t('form.infographic.heating.description')}
							</p>
						</div>

						<div className='text-center'>
							<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<svg
									className='w-6 h-6 text-green-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
									/>
								</svg>
							</div>
							<h4 className='font-medium text-gray-800 mb-1'>
								{t('form.infographic.water.title')}
							</h4>
							<p className='text-sm text-gray-600'>
								{t('form.infographic.water.description')}
							</p>
						</div>

						<div className='text-center'>
							<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<svg
									className='w-6 h-6 text-orange-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
									/>
								</svg>
							</div>
							<h4 className='font-medium text-gray-800 mb-1'>
								{t('form.infographic.cooking.title')}
							</h4>
							<p className='text-sm text-gray-600'>
								{t('form.infographic.cooking.description')}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Input Form */}
			<div className='bg-white rounded-lg shadow-md p-6 mb-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Purpose */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.purpose')}
						</label>
						<select
							value={input.purpose}
							onChange={(e) =>
								handleInputChange(
									'purpose',
									e.target.value as GasUsageInput['purpose']
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							{GAS_PURPOSES.map((purpose) => (
								<option
									key={purpose.id}
									value={purpose.id}
								>
									{t(`form.purposes.${purpose.id}`)}
								</option>
							))}
						</select>
					</div>

					{/* Area (for heating) */}
					{input.purpose === 'heating' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.area')}
							</label>
							<input
								type='number'
								value={input.area || ''}
								onChange={(e) =>
									handleInputChange(
										'area',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='50'
								min='1'
								step='1'
							/>
						</div>
					)}

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
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='12'
							min='0'
							max='24'
							step='0.5'
						/>
					</div>

					{/* Power */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.power')}
						</label>
						<input
							type='number'
							value={input.power}
							onChange={(e) =>
								handleInputChange(
									'power',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='20'
							min='0'
							max='100'
							step='1'
						/>
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
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='90'
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
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='8.5'
							min='0'
							step='0.1'
						/>
					</div>

					{/* Period Days */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.periodDays')}
						</label>
						<input
							type='number'
							value={input.periodDays}
							onChange={(e) =>
								handleInputChange(
									'periodDays',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='30'
							min='1'
							max='365'
							step='1'
						/>
					</div>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating}
						className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
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
						{/* Daily Consumption */}
						<div className='bg-blue-50 p-4 rounded-lg'>
							<div className='text-sm text-blue-600 font-medium mb-1'>
								{t('results.dailyConsumption')}
							</div>
							<div className='text-2xl font-bold text-blue-900'>
								{result.dailyConsumption} m³
							</div>
							<div className='text-xs text-blue-700 mt-1'>
								{t('results.perDay')}
							</div>
						</div>

						{/* Monthly Consumption */}
						<div className='bg-green-50 p-4 rounded-lg'>
							<div className='text-sm text-green-600 font-medium mb-1'>
								{t('results.monthlyConsumption')}
							</div>
							<div className='text-2xl font-bold text-green-900'>
								{result.monthlyConsumption} m³
							</div>
							<div className='text-xs text-green-700 mt-1'>
								{t('results.perMonth')}
							</div>
						</div>

						{/* Period Consumption */}
						<div className='bg-purple-50 p-4 rounded-lg'>
							<div className='text-sm text-purple-600 font-medium mb-1'>
								{t('results.periodConsumption')}
							</div>
							<div className='text-2xl font-bold text-purple-900'>
								{result.periodConsumption} m³
							</div>
							<div className='text-xs text-purple-700 mt-1'>
								{t('results.perPeriod')}
							</div>
						</div>

						{/* Total Energy */}
						<div className='bg-orange-50 p-4 rounded-lg'>
							<div className='text-sm text-orange-600 font-medium mb-1'>
								{t('results.totalEnergy')}
							</div>
							<div className='text-2xl font-bold text-orange-900'>
								{result.totalEnergy} kWh
							</div>
							<div className='text-xs text-orange-700 mt-1'>
								{t('results.energyConsumption')}
							</div>
						</div>

						{/* Daily Cost */}
						<div className='bg-red-50 p-4 rounded-lg'>
							<div className='text-sm text-red-600 font-medium mb-1'>
								{t('results.dailyCost')}
							</div>
							<div className='text-2xl font-bold text-red-900'>
								{result.dailyCost} ₽
							</div>
							<div className='text-xs text-red-700 mt-1'>
								{t('results.perDay')}
							</div>
						</div>

						{/* Monthly Cost */}
						<div className='bg-yellow-50 p-4 rounded-lg'>
							<div className='text-sm text-yellow-600 font-medium mb-1'>
								{t('results.monthlyCost')}
							</div>
							<div className='text-2xl font-bold text-yellow-900'>
								{result.monthlyCost} ₽
							</div>
							<div className='text-xs text-yellow-700 mt-1'>
								{t('results.perMonth')}
							</div>
						</div>
					</div>

					{/* Additional Info */}
					<div className='mt-6 p-4 bg-gray-50 rounded-lg'>
						<h4 className='font-semibold text-gray-800 mb-2'>
							{t('results.additionalInfo')}
						</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
							<div>
								<span className='text-gray-600'>
									{t('results.consumptionPerHour')}:
								</span>
								<span className='ml-2 font-medium'>
									{result.consumptionPerHour} m³/h
								</span>
							</div>
							<div>
								<span className='text-gray-600'>
									{t('results.purpose')}:
								</span>
								<span className='ml-2 font-medium'>
									{t(
										`form.purposes.${result.purposeInfo.id}`
									)}
								</span>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Equipment Types Table */}
			<div className='bg-white rounded-lg shadow-md p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-4'>
					{t('table.title')}
				</h3>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-gray-50'>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.equipmentType')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.consumptionRange')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.description')}
								</th>
							</tr>
						</thead>
						<tbody>
							{GAS_EQUIPMENT_TYPES.map((equipment, index) => (
								<tr
									key={equipment.id}
									className={
										index % 2 === 0
											? 'bg-white'
											: 'bg-gray-50'
									}
								>
									<td className='border border-gray-300 px-4 py-2 font-medium'>
										{t(
											`form.equipmentTypes.${equipment.id}`
										)}
									</td>
									<td className='border border-gray-300 px-4 py-2'>
										{equipment.consumptionRange.min}–
										{equipment.consumptionRange.max} m³/h
									</td>
									<td className='border border-gray-300 px-4 py-2 text-sm text-gray-600'>
										{t(
											`form.equipmentDescriptions.${equipment.id}`
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
