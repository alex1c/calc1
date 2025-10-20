'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	calculateAllPlanetsWeight,
	validateWeight,
	type WeightUnit,
	type PlanetWeightResult,
} from '@/lib/calculators/planet-weight';

export default function PlanetWeightCalculator() {
	const t = useTranslations('calculators.planetWeight');

	const [earthWeight, setEarthWeight] = useState<string>('70');
	const [unit, setUnit] = useState<WeightUnit>('kg');
	const [results, setResults] = useState<PlanetWeightResult[] | null>(null);
	const [error, setError] = useState<string>('');

	const handleCalculate = () => {
		const weight = parseFloat(earthWeight);
		const validation = validateWeight(weight);

		if (!validation.isValid) {
			setError(
				t(
					`form.errors.${
						validation.error === 'Weight must be a positive number'
							? 'positive'
							: 'tooHigh'
					}`
				)
			);
			setResults(null);
			return;
		}

		setError('');
		const planetResults = calculateAllPlanetsWeight(weight, unit);
		setResults(planetResults);
	};

	const getPlanetEmoji = (planet: string): string => {
		const emojis: Record<string, string> = {
			mercury: '☿️',
			venus: '♀️',
			moon: '🌙',
			mars: '♂️',
			jupiter: '♃',
			saturn: '♄',
			uranus: '♅',
			neptune: '♆',
			pluto: '♇',
		};
		return emojis[planet] || '🪐';
	};

	return (
		<div className='w-full'>
			{/* Форма ввода */}
			<div className='bg-white rounded-2xl shadow-lg p-8 mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					{t('form.title')}
				</h2>

				<div className='space-y-6'>
					{/* Вес на Земле */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.earthWeight')}
						</label>
						<input
							type='number'
							value={earthWeight}
							onChange={(e) => setEarthWeight(e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
							placeholder='70'
							min='0'
							step='0.1'
						/>
					</div>

					{/* Выбор единиц измерения */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.unit')}
						</label>
						<div className='flex gap-4'>
							<button
								type='button'
								onClick={() => setUnit('kg')}
								className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
									unit === 'kg'
										? 'bg-indigo-600 text-white shadow-lg'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{t('form.unitTypes.kg')}
							</button>
							<button
								type='button'
								onClick={() => setUnit('lb')}
								className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
									unit === 'lb'
										? 'bg-indigo-600 text-white shadow-lg'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{t('form.unitTypes.lb')}
							</button>
						</div>
					</div>

					{/* Ошибка */}
					{error && (
						<div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
							<p className='text-sm text-red-600'>{error}</p>
						</div>
					)}

					{/* Кнопка расчёта */}
					<button
						type='button'
						onClick={handleCalculate}
						className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1'
					>
						{t('form.calculate')}
					</button>
				</div>
			</div>

			{/* Результаты */}
			{results && (
				<div className='bg-white rounded-2xl shadow-lg p-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('results.title')}
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{results.map((result) => (
							<div
								key={result.planet}
								className='relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 hover:shadow-lg transition-all transform hover:-translate-y-1'
							>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-lg font-bold text-gray-900'>
										{t(`results.planets.${result.planet}`)}
									</h3>
									<span className='text-3xl'>
										{getPlanetEmoji(result.planet)}
									</span>
								</div>

								<div className='space-y-2'>
									<div className='flex justify-between items-baseline'>
										<span className='text-sm text-gray-600'>
											{t('results.weight')}
										</span>
										<span className='text-2xl font-bold text-indigo-600'>
											{result.weight.toFixed(2)} {unit}
										</span>
									</div>

									<div className='flex justify-between items-baseline'>
										<span className='text-sm text-gray-600'>
											{t('results.gravity')}
										</span>
										<span className='text-sm font-medium text-gray-700'>
											{(result.gravity * 100).toFixed(1)}%
										</span>
									</div>
								</div>

								{/* Индикатор гравитации */}
								<div className='mt-4'>
									<div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
										<div
											className='h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500'
											style={{
												width: `${Math.min(
													result.gravity * 100,
													100
												)}%`,
											}}
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Информационное сообщение */}
					<div className='mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg'>
						<div className='flex items-start gap-4'>
							<span className='text-2xl'>ℹ️</span>
							<div>
								<h3 className='font-semibold text-gray-900 mb-2'>
									{t('results.info.title')}
								</h3>
								<p className='text-sm text-gray-700'>
									{t('results.info.content')}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
