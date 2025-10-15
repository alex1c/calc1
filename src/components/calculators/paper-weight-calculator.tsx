'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	calculatePaperWeight,
	PAPER_DENSITIES,
	type PaperWeightInput,
} from '@/lib/calculators/paper-weight';

export default function PaperWeightCalculator() {
	const t = useTranslations();
	const [input, setInput] = useState<PaperWeightInput>({
		sheets: 1,
		density: 80,
		format: 'A4',
	});
	const [result, setResult] = useState<any>(null);

	const handleCalculate = () => {
		const calculation = calculatePaperWeight(input);
		setResult(calculation);
	};

	const handleInputChange = (
		field: keyof PaperWeightInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					{t('calculators.paper-weight.title')}
				</h1>
				<p className='text-gray-600 mb-8'>
					{t('calculators.paper-weight.description')}
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Input Form */}
					<div className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Number of Sheets
							</label>
							<input
								type='number'
								value={input.sheets}
								onChange={(e) =>
									handleInputChange(
										'sheets',
										parseInt(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								min='1'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Paper Density (g/m²)
							</label>
							<select
								value={input.density}
								onChange={(e) =>
									handleInputChange(
										'density',
										parseInt(e.target.value)
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{Object.entries(PAPER_DENSITIES).map(
									([label, value]) => (
										<option
											key={value}
											value={value}
										>
											{label} ({value} g/m²)
										</option>
									)
								)}
							</select>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Paper Format
							</label>
							<select
								value={input.format}
								onChange={(e) =>
									handleInputChange(
										'format',
										e.target.value as any
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value='A4'>A4 (210 × 297 mm)</option>
								<option value='A3'>A3 (297 × 420 mm)</option>
								<option value='A5'>A5 (148 × 210 mm)</option>
								<option value='Letter'>
									Letter (216 × 279 mm)
								</option>
							</select>
						</div>

						<button
							onClick={handleCalculate}
							className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
						>
							{t('common.calculate')}
						</button>
					</div>

					{/* Results */}
					{result && (
						<div className='bg-gray-50 rounded-lg p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4'>
								{t('common.result')}
							</h3>
							<div className='space-y-3'>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										Weight per sheet:
									</span>
									<span className='font-semibold'>
										{result.weightPerSheet} g
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										Total weight:
									</span>
									<span className='font-semibold'>
										{result.totalWeight} g
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										Total weight (kg):
									</span>
									<span className='font-semibold'>
										{result.totalWeightKg} kg
									</span>
								</div>
								<div className='border-t pt-3'>
									<div className='text-sm text-gray-600'>
										<p>Format: {result.format}</p>
										<p>
											Dimensions:{' '}
											{result.dimensions.width} ×{' '}
											{result.dimensions.height} mm
										</p>
										<p>Area: {result.dimensions.area} m²</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* SEO Text */}
				<div className='mt-8 p-4 bg-blue-50 rounded-lg'>
					<p className='text-sm text-blue-800'>
						{t('calculators.paper-weight.seo')}
					</p>
				</div>
			</div>
		</div>
	);
}












