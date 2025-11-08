'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, RotateCcw, Ruler, Info } from 'lucide-react';
import ringSizeData from '@/data/ring-size.json';
import {
	convertRingSize,
	validateRingInput,
	getAvailableSizes,
	getCountryName,
	getMeasurementTypeName,
	formatRingSize,
	formatDiameter,
	getRingSizeDescription,
	getRingSizeRange,
	getDiameterRange,
	getRingSizeChartData,
	calculateCircumference,
	type RingInput,
	type RingResult,
	type RingCountry,
} from '@/lib/calculators/ring-size';

/**
 * Ring Size Calculator Component
 * 
 * A React component for converting ring sizes between different country standards.
 * 
 * Features:
 * - Measurement type selection (size, diameter, circumference)
 * - Country selection (RU, US, UK, EU, etc.)
 * - Ring size conversion to all countries
 * - Size chart display
 * - Diameter and circumference calculation
 * - Real-time calculation with debouncing
 * - Responsive design
 * 
 * Uses the ring size calculation library from @/lib/calculators/ring-size
 * for all conversion operations.
 */
export default function RingSizeCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.ringSize');
	
	// Form state management
	const [input, setInput] = useState<RingInput>({
		measurementType: 'size', // Measurement type (size, diameter, circumference)
		country: 'RU', // Source country (RU, US, UK, EU, etc.)
		value: 16, // Ring size value
	});
	const [results, setResults] = useState<RingResult[]>([]); // Conversion results for all countries
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [showChart, setShowChart] = useState(false); // Show size chart flag
	const [error, setError] = useState<string | null>(null); // Validation error message

	// Auto-calculate when input changes
	useEffect(() => {
		const timer = setTimeout(() => {
			if (input.value && input.value > 0) {
				handleCalculate();
			}
		}, 300); // Debounce for 300ms

		return () => clearTimeout(timer);
	}, [input]);

	const handleInputChange = (field: keyof RingInput, value: any) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setError(null);
	};

	const handleCalculate = () => {
		if (!input.value || input.value <= 0) {
			setError('invalidValue');
			return;
		}

		setIsCalculating(true);
		setError(null);

		try {
			const validation = validateRingInput(input);
			if (!validation.isValid) {
				setError(validation.error || 'validationError');
				return;
			}

			const convertedResults = convertRingSize(
				input,
				ringSizeData.ringData
			);
			setResults(convertedResults);
		} catch (err) {
			setError('calculationError');
			console.error('Ring size conversion error:', err);
		} finally {
			setIsCalculating(false);
		}
	};

	const handleReset = () => {
		setInput({
			measurementType: 'size',
			country: 'RU',
			value: 16,
		});
		setResults([]);
		setError(null);
		setShowChart(false);
	};

	const availableSizes = getAvailableSizes(
		input.country,
		ringSizeData.ringData
	);
	const sizeRange = getRingSizeRange(input.country, ringSizeData.ringData);
	const diameterRange = getDiameterRange();

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			{/* Infographic */}
			<div className='text-center space-y-4'>
				{/* Infographic */}
				<div className='flex justify-center space-x-8 py-4'>
					<div className='text-center'>
						<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<Ruler className='h-6 w-6 text-green-600' />
						</div>
						<div className='text-sm font-medium text-gray-700'>
							{t('infographic.precise')}
						</div>
						<div className='text-xs text-gray-500'>
							{t('infographic.preciseDescription')}
						</div>
					</div>
					<div className='text-center'>
						<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<Calculator className='h-6 w-6 text-blue-600' />
						</div>
						<div className='text-sm font-medium text-gray-700'>
							{t('infographic.fast')}
						</div>
						<div className='text-xs text-gray-500'>
							{t('infographic.fastDescription')}
						</div>
					</div>
					<div className='text-center'>
						<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
							<Info className='h-6 w-6 text-purple-600' />
						</div>
						<div className='text-sm font-medium text-gray-700'>
							{t('infographic.multilingual')}
						</div>
						<div className='text-xs text-gray-500'>
							{t('infographic.multilingualDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Input Form */}
			<div className='bg-white rounded-lg shadow-md p-6 space-y-6'>
				<h3 className='text-lg font-semibold text-gray-800'>
					{t('form.title')}
				</h3>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{/* Measurement Type */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('measurementType')}
						</label>
						<select
							value={input.measurementType}
							onChange={(e) =>
								handleInputChange(
									'measurementType',
									e.target.value
								)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value='size'>
								{t('measurementTypes.size')}
							</option>
							<option value='diameter'>
								{t('measurementTypes.diameter')}
							</option>
						</select>
					</div>

					{/* Country */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('selectCountry')}
						</label>
						<select
							value={input.country}
							onChange={(e) =>
								handleInputChange('country', e.target.value)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							{ringSizeData.labels.ru.countries &&
								Object.entries(
									ringSizeData.labels.ru.countries
								).map(([key, value]) => (
									<option
										key={key}
										value={key}
									>
										{value}
									</option>
								))}
						</select>
					</div>

					{/* Value Input */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{input.measurementType === 'size'
								? t('ringSize')
								: t('innerDiameter')}
						</label>
						{input.measurementType === 'size' ? (
							<select
								value={input.value}
								onChange={(e) =>
									handleInputChange(
										'value',
										parseFloat(e.target.value)
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								{availableSizes.map((ring) => (
									<option
										key={ring.size}
										value={ring.diameter}
									>
										{formatRingSize(ring.size)}
									</option>
								))}
							</select>
						) : (
							<input
								type='number'
								value={input.value}
								onChange={(e) =>
									handleInputChange(
										'value',
										parseFloat(e.target.value) || 0
									)
								}
								min={diameterRange.min}
								max={diameterRange.max}
								step='0.1'
								placeholder={`${diameterRange.min}-${diameterRange.max} мм`}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						)}
						{input.measurementType === 'size' && (
							<p className='text-xs text-gray-500'>
								{getRingSizeDescription(input.country, 'ru')}
							</p>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-wrap gap-3'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating || !input.value}
						className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						<Calculator className='h-4 w-4' />
						<span>
							{isCalculating ? t('calculating') : t('calculate')}
						</span>
					</button>

					<button
						onClick={() => setShowChart(!showChart)}
						className='flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
					>
						<Info className='h-4 w-4' />
						<span>{t('sizeChart')}</span>
					</button>

					<button
						onClick={handleReset}
						className='flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
					>
						<RotateCcw className='h-4 w-4' />
						<span>{t('reset')}</span>
					</button>
				</div>

				{/* Error Display */}
				{error && (
					<div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded-md'>
						{t(`errors.${error}`)}
					</div>
				)}
			</div>

			{/* Results */}
			{results.length > 0 && (
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						{t('result')}
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{results.map((result) => (
							<div
								key={result.country}
								className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
							>
								<div className='text-center'>
									<div className='text-lg font-semibold text-gray-800'>
										{getCountryName(result.country, 'ru')}
									</div>
									<div className='text-2xl font-bold text-blue-600 mt-2'>
										{formatRingSize(result.size)}
									</div>
									<div className='text-sm text-gray-500 mt-1'>
										Ø {formatDiameter(result.diameter)} мм
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Size Chart */}
			{showChart && (
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						{t('sizeChart')}
					</h3>
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse border border-gray-300'>
							<thead>
								<tr className='bg-gray-50'>
									<th className='border border-gray-300 px-3 py-2 text-left'>
										{t('table.country')}
									</th>
									<th className='border border-gray-300 px-3 py-2 text-left'>
										{t('table.size')}
									</th>
									<th className='border border-gray-300 px-3 py-2 text-left'>
										{t('table.diameter')}
									</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(
									getRingSizeChartData(ringSizeData.ringData)
								).map(([country, rings]) =>
									rings.slice(0, 10).map((ring, index) => (
										<tr
											key={`${country}-${index}`}
											className='hover:bg-gray-50'
										>
											<td className='border border-gray-300 px-3 py-2'>
												{getCountryName(
													country as RingCountry,
													'ru'
												)}
											</td>
											<td className='border border-gray-300 px-3 py-2 font-medium'>
												{formatRingSize(ring.size)}
											</td>
											<td className='border border-gray-300 px-3 py-2'>
												{formatDiameter(ring.diameter)}{' '}
												мм
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Tips */}
			<div className='bg-blue-50 rounded-lg p-6'>
				<h3 className='text-lg font-semibold text-blue-800 mb-3'>
					{t('tips.title')}
				</h3>
				<div className='space-y-2 text-blue-700'>
					<p>• {t('tips.measurement')}</p>
					<p>• {t('tips.finger')}</p>
					<p>• {t('tips.accuracy')}</p>
				</div>
			</div>
		</div>
	);
}
