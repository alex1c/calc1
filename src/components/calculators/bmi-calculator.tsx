'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateBMI, type BMIInput } from '@/lib/calculators/bmi';

export default function BMICalculator() {
	const t = useTranslations();
	const [input, setInput] = useState<BMIInput>({
		weight: 70,
		height: 175,
	});
	const [result, setResult] = useState<any>(null);

	const handleCalculate = () => {
		const calculation = calculateBMI(input);
		setResult(calculation);
	};

	const handleInputChange = (field: keyof BMIInput, value: string) => {
		setInput((prev) => ({
			...prev,
			[field]: parseFloat(value) || 0,
		}));
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					{t('calculators.bmi.title')}
				</h1>
				<p className='text-gray-600 mb-8'>
					{t('calculators.bmi.description')}
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Input Form */}
					<div className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Weight (kg)
							</label>
							<input
								type='number'
								value={input.weight}
								onChange={(e) =>
									handleInputChange('weight', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								min='1'
								step='0.1'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Height (cm)
							</label>
							<input
								type='number'
								value={input.height}
								onChange={(e) =>
									handleInputChange('height', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								min='1'
								step='0.1'
							/>
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
								<div className='text-center'>
									<div className='text-3xl font-bold text-blue-600 mb-2'>
										{result.bmi}
									</div>
									<div className='text-sm text-gray-600'>
										BMI
									</div>
								</div>

								<div className='bg-white rounded-lg p-4'>
									<div className='text-center'>
										<div className='text-lg font-semibold text-gray-900 mb-1'>
											{result.category}
										</div>
										<div className='text-sm text-gray-600'>
											Ideal weight:{' '}
											{result.idealWeightRange.min} -{' '}
											{result.idealWeightRange.max} kg
										</div>
									</div>
								</div>

								{result.weightToLose && (
									<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
										<div className='text-sm text-red-800'>
											You need to lose{' '}
											{result.weightToLose} kg to reach
											normal weight
										</div>
									</div>
								)}

								{result.weightToGain && (
									<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
										<div className='text-sm text-yellow-800'>
											You need to gain{' '}
											{result.weightToGain} kg to reach
											normal weight
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{/* SEO Text */}
				<div className='mt-8 p-4 bg-blue-50 rounded-lg'>
					<p className='text-sm text-blue-800'>
						{t('calculators.bmi.seo')}
					</p>
				</div>
			</div>
		</div>
	);
}












