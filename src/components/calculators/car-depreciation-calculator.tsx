'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Car } from 'lucide-react';
import {
	calculateDepreciation,
	validateDepreciationInput,
	type DepreciationInput,
	type DepreciationResult,
} from '@/lib/calculators/car-depreciation';

/**
 * Car Depreciation Calculator Component
 * 
 * A React component for calculating car depreciation value.
 * 
 * Features:
 * - Purchase price input
 * - Age and mileage input
 * - Car segment selection (economy, mid, premium)
 * - Depreciation method selection (linear, exponential)
 * - Current value calculation
 * - Depreciation amount calculation
 * - Responsive design
 * 
 * Depreciation methods:
 * - Linear: Constant depreciation rate
 * - Exponential: Accelerated depreciation rate
 * 
 * Uses the car depreciation calculation library from @/lib/calculators/car-depreciation
 * for all mathematical operations.
 */
export default function CarDepreciationCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.car-depreciation');

	// Form state management
	const [formData, setFormData] = useState<Partial<DepreciationInput>>({
		purchasePrice: 0, // Car purchase price (₽)
		ageYears: 0, // Car age in years
		mileageKm: 0, // Car mileage in kilometers
		segment: 'mid', // Car segment (economy, mid, premium)
		method: 'exponential', // Depreciation method (linear, exponential)
	});

	const [result, setResult] = useState<DepreciationResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	const segmentOptions = [
		{ value: 'economy', label: t('form.segmentTypes.economy') },
		{ value: 'mid', label: t('form.segmentTypes.mid') },
		{ value: 'premium', label: t('form.segmentTypes.premium') },
	];

	const methodOptions = [
		{ value: 'linear', label: t('form.methodTypes.linear') },
		{ value: 'exponential', label: t('form.methodTypes.exponential') },
	];

	const handleInputChange = (
		field: keyof DepreciationInput,
		value: string | number
	) => {
		const num = typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: num }));
		setIsCalculated(false);
	};

	const handleSelectChange = (
		field: keyof DepreciationInput,
		value: string
	) => {
		setFormData((prev) => ({ ...prev, [field]: value } as any));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateDepreciationInput(formData);
		setErrors(validationErrors);
		if (validationErrors.length > 0) return;

		const input: DepreciationInput = {
			purchasePrice: formData.purchasePrice || 0,
			ageYears: formData.ageYears || 0,
			mileageKm: formData.mileageKm || 0,
			segment: (formData.segment as any) || 'mid',
			method: (formData.method as any) || 'exponential',
		};

		const r = calculateDepreciation(input);
		setResult(r);
		setIsCalculated(true);
	};

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Car className='h-16 w-16 text-blue-600' />
				</div>
				<h1 className='text-3xl font-bold text-gray-900 mb-4'>
					{t('title')}
				</h1>
				<p className='text-lg text-gray-600'>{t('description')}</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<div className='bg-white rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<Calculator className='h-5 w-5 mr-2 text-blue-600' />
						{t('form.title')}
					</h2>

					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 mr-2' />
								<span className='text-red-800 font-medium'>
									{t('form.errors.title')}
								</span>
							</div>
							<ul className='text-red-700 text-sm space-y-1'>
								{errors.map((e, i) => (
									<li key={i}>• {e}</li>
								))}
							</ul>
						</div>
					)}

					<form className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.purchasePrice')}
							</label>
							<input
								type='number'
								value={formData.purchasePrice || ''}
								onChange={(e) =>
									handleInputChange(
										'purchasePrice',
										e.target.value
									)
								}
								placeholder='1200000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.ageYears')}
							</label>
							<input
								type='number'
								value={formData.ageYears || ''}
								onChange={(e) =>
									handleInputChange(
										'ageYears',
										e.target.value
									)
								}
								placeholder='3'
								min='0'
								max='30'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.mileageKm')}
							</label>
							<input
								type='number'
								value={formData.mileageKm || ''}
								onChange={(e) =>
									handleInputChange(
										'mileageKm',
										e.target.value
									)
								}
								placeholder='60000'
								min='0'
								step='100'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.segment')}
							</label>
							<select
								value={(formData.segment as any) || 'mid'}
								onChange={(e) =>
									handleSelectChange(
										'segment',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{segmentOptions.map((o) => (
									<option
										key={o.value}
										value={o.value}
									>
										{o.label}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.method')}
							</label>
							<select
								value={
									(formData.method as any) || 'exponential'
								}
								onChange={(e) =>
									handleSelectChange('method', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{methodOptions.map((o) => (
									<option
										key={o.value}
										value={o.value}
									>
										{o.label}
									</option>
								))}
							</select>
						</div>
						<button
							type='button'
							onClick={handleCalculate}
							className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
						>
							{t('form.calculate')}
						</button>
					</form>
				</div>

				<div className='bg-white rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<CheckCircle className='h-5 w-5 mr-2 text-green-600' />
						{t('results.title')}
					</h2>

					{isCalculated && result ? (
						<div className='space-y-6'>
							<div className='bg-blue-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.currentValue')}
								</h3>
								<div className='text-3xl font-bold text-blue-900'>
									{formatCurrency(result.currentValue)}
								</div>
								<p className='text-blue-700 mt-2'>
									{t('results.totalDepreciation')}:
									{formatCurrency(result.totalDepreciation)}
								</p>
								<p className='text-blue-700'>
									{t('results.annualDepreciation')}:
									{result.annualRatePercent.toFixed(1)}%
								</p>
							</div>

							<div className='space-y-3 text-sm'>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										{t('results.purchasePrice')}:
									</span>
									<span className='font-medium'>
										{formatCurrency(result.purchasePrice)}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										{t('results.ageYears')}:
									</span>
									<span className='font-medium'>
										{result.ageYears}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>
										{t('results.mileageKm')}:
									</span>
									<span className='font-medium'>
										{result.mileageKm.toLocaleString(
											'ru-RU'
										)}
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className='text-center text-gray-500 py-8'>
							<Calculator className='h-12 w-12 mx-auto mb-4 text-gray-400' />
							<p>{t('results.placeholder')}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
