'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	calculateFloorHeating,
	validateFloorHeatingInput,
	ROOM_TYPES,
	INSULATION_TYPES,
	type FloorHeatingInput,
	type FloorHeatingResult,
} from '@/lib/calculators/floor-heating';

export default function FloorHeatingCalculator() {
	const t = useTranslations('calculators.floorHeating');
	const [input, setInput] = useState<FloorHeatingInput>({
		area: 10,
		roomType: 'bathroom',
		insulation: 'average',
		temperature: 25,
		hoursPerDay: 8,
		electricityCost: 5.5,
	});
	const [result, setResult] = useState<FloorHeatingResult | null>(null);
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
		field: keyof FloorHeatingInput,
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
			const validation = validateFloorHeatingInput(input);
			if (!validation.isValid) {
				setErrors(validation.errors);
				setResult(null);
				return;
			}

			const calculation = calculateFloorHeating(input);
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
			area: 10,
			roomType: 'bathroom',
			insulation: 'average',
			temperature: 25,
			hoursPerDay: 8,
			electricityCost: 5.5,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header with infographic */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
					<svg
						className='w-8 h-8 text-blue-600'
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
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='10'
							min='0.1'
							step='0.1'
						/>
					</div>

					{/* Room Type */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.roomType')}
						</label>
						<select
							value={input.roomType}
							onChange={(e) =>
								handleInputChange(
									'roomType',
									e.target
										.value as FloorHeatingInput['roomType']
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							{ROOM_TYPES.map((room) => (
								<option
									key={room.id}
									value={room.id}
								>
									{t(`form.roomTypes.${room.id}`)}
								</option>
							))}
						</select>
					</div>

					{/* Insulation */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.insulation')}
						</label>
						<select
							value={input.insulation}
							onChange={(e) =>
								handleInputChange(
									'insulation',
									e.target
										.value as FloorHeatingInput['insulation']
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							{INSULATION_TYPES.map((insulation) => (
								<option
									key={insulation.id}
									value={insulation.id}
								>
									{t(`form.insulationTypes.${insulation.id}`)}
								</option>
							))}
						</select>
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
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='25'
							min='15'
							max='35'
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
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='8'
							min='0'
							max='24'
							step='0.5'
						/>
					</div>

					{/* Electricity cost */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.electricityCost')}
						</label>
						<input
							type='number'
							value={input.electricityCost}
							onChange={(e) =>
								handleInputChange(
									'electricityCost',
									parseFloat(e.target.value) || 0
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
						{/* Recommended Power */}
						<div className='bg-blue-50 p-4 rounded-lg'>
							<div className='text-sm text-blue-600 font-medium mb-1'>
								{t('results.recommendedPower')}
							</div>
							<div className='text-2xl font-bold text-blue-900'>
								{result.recommendedPower} W/m²
							</div>
							<div className='text-xs text-blue-700 mt-1'>
								{t('results.powerRange')}:{' '}
								{result.powerRange.min}–{result.powerRange.max}{' '}
								W/m²
							</div>
						</div>

						{/* Total Power */}
						<div className='bg-green-50 p-4 rounded-lg'>
							<div className='text-sm text-green-600 font-medium mb-1'>
								{t('results.totalPower')}
							</div>
							<div className='text-2xl font-bold text-green-900'>
								{result.totalPower} W
							</div>
							<div className='text-xs text-green-700 mt-1'>
								{Math.round((result.totalPower / 1000) * 100) /
									100}{' '}
								kW
							</div>
						</div>

						{/* Daily Consumption */}
						<div className='bg-yellow-50 p-4 rounded-lg'>
							<div className='text-sm text-yellow-600 font-medium mb-1'>
								{t('results.dailyConsumption')}
							</div>
							<div className='text-2xl font-bold text-yellow-900'>
								{result.dailyConsumption} kWh
							</div>
							<div className='text-xs text-yellow-700 mt-1'>
								{t('results.perDay')}
							</div>
						</div>

						{/* Monthly Consumption */}
						<div className='bg-orange-50 p-4 rounded-lg'>
							<div className='text-sm text-orange-600 font-medium mb-1'>
								{t('results.monthlyConsumption')}
							</div>
							<div className='text-2xl font-bold text-orange-900'>
								{result.monthlyConsumption} kWh
							</div>
							<div className='text-xs text-orange-700 mt-1'>
								{t('results.perMonth')}
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

						{/* Monthly Cost */}
						<div className='bg-red-50 p-4 rounded-lg'>
							<div className='text-sm text-red-600 font-medium mb-1'>
								{t('results.monthlyCost')}
							</div>
							<div className='text-2xl font-bold text-red-900'>
								{result.monthlyCost} ₽
							</div>
							<div className='text-xs text-red-700 mt-1'>
								{t('results.perMonth')}
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Room Types Table */}
			<div className='bg-white rounded-lg shadow-md p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-4'>
					{t('table.title')}
				</h3>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-gray-50'>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.roomType')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.recommendedPower')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left font-medium text-gray-700'>
									{t('table.description')}
								</th>
							</tr>
						</thead>
						<tbody>
							{ROOM_TYPES.map((room, index) => (
								<tr
									key={room.id}
									className={
										index % 2 === 0
											? 'bg-white'
											: 'bg-gray-50'
									}
								>
									<td className='border border-gray-300 px-4 py-2 font-medium'>
										{t(`form.roomTypes.${room.id}`)}
									</td>
									<td className='border border-gray-300 px-4 py-2'>
										{room.powerRange.min}–
										{room.powerRange.max} W/m²
									</td>
									<td className='border border-gray-300 px-4 py-2 text-sm text-gray-600'>
										{t(`form.roomDescriptions.${room.id}`)}
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
