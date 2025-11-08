'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Car } from 'lucide-react';
import {
	calculateVehicleTax,
	validateVehicleTaxInput,
	getRegionalOptions,
	type VehicleTaxInput,
	type VehicleTaxResult,
} from '@/lib/calculators/vehicle-tax';

/**
 * Vehicle Tax Calculator Component
 * 
 * A React component for calculating vehicle tax based on engine power and region.
 * 
 * Features:
 * - Engine power input (hp)
 * - Region selection
 * - Ownership period input (months)
 * - Tax calculation based on Russian tax regulations
 * - Regional coefficient consideration
 * - Partial year calculation
 * - Responsive design
 * 
 * Uses the vehicle tax calculation library from @/lib/calculators/vehicle-tax
 * for all mathematical operations based on Russian tax code.
 */
export default function VehicleTaxCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.vehicle-tax');

	// Form state management
	const [formData, setFormData] = useState<Partial<VehicleTaxInput>>({
		enginePower: 0, // Engine power (hp)
		region: '', // Region code
		ownershipMonths: 12, // Ownership period (months, default: 12)
	});

	const [result, setResult] = useState<VehicleTaxResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	const regionalOptions = getRegionalOptions();

	const handleInputChange = (
		field: keyof VehicleTaxInput,
		value: string | number
	) => {
		// For region field, keep it as string, for others convert to number
		if (field === 'region') {
			setFormData((prev) => ({ ...prev, [field]: value as string }));
		} else {
			const numValue =
				typeof value === 'string' ? parseFloat(value) || 0 : value;
			setFormData((prev) => ({ ...prev, [field]: numValue }));
		}
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateVehicleTaxInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: VehicleTaxInput = {
			enginePower: formData.enginePower || 0,
			region: formData.region || '',
			ownershipMonths: formData.ownershipMonths || 12,
		};

		const calculationResult = calculateVehicleTax(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
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
				{/* Input Form */}
				<div className='bg-white rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<Calculator className='h-5 w-5 mr-2 text-blue-600' />
						{t('form.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 mr-2' />
								<span className='text-red-800 font-medium'>
									{t('form.errors.title')}
								</span>
							</div>
							<ul className='text-red-700 text-sm space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					<form className='space-y-6'>
						{/* Engine Power */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.enginePower')}
							</label>
							<input
								type='number'
								value={formData.enginePower || ''}
								onChange={(e) =>
									handleInputChange(
										'enginePower',
										e.target.value
									)
								}
								placeholder='150'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Region */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.region')}
							</label>
							<select
								value={formData.region || ''}
								onChange={(e) =>
									handleInputChange('region', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectRegion')}
								</option>
								{regionalOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label} ({option.rate} ₽/л.с.)
									</option>
								))}
							</select>
						</div>

						{/* Ownership Months */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.ownershipMonths')}
							</label>
							<select
								value={formData.ownershipMonths || 12}
								onChange={(e) =>
									handleInputChange(
										'ownershipMonths',
										parseInt(e.target.value)
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{Array.from(
									{ length: 12 },
									(_, i) => i + 1
								).map((month) => (
									<option
										key={month}
										value={month}
									>
										{month} {t('form.months')}
									</option>
								))}
							</select>
						</div>

						{/* Calculate Button */}
						<button
							type='button'
							onClick={handleCalculate}
							className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
						>
							{t('form.calculate')}
						</button>
					</form>
				</div>

				{/* Results */}
				<div className='bg-white rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<CheckCircle className='h-5 w-5 mr-2 text-green-600' />
						{t('results.title')}
					</h2>

					{isCalculated && result ? (
						<div className='space-y-6'>
							{/* Tax Amount */}
							<div className='bg-green-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.taxAmount')}
								</h3>
								<div className='text-3xl font-bold text-green-900'>
									{formatCurrency(result.taxAmount)}
								</div>
								<p className='text-green-700 mt-2'>
									{t('results.taxDescription')}
								</p>
							</div>

							{/* Calculation Details */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('results.details')}
								</h4>

								<div className='space-y-3 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.enginePower')}:
										</span>
										<span className='font-medium'>
											{result.enginePower}{' '}
											{t('results.hp')}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.taxRate')}:
										</span>
										<span className='font-medium'>
											{result.rate}{' '}
											{t('results.rubPerHp')}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.ownershipPeriod')}:
										</span>
										<span className='font-medium'>
											{result.ownershipMonths}{' '}
											{t('form.months')}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.ownershipCoefficient')}:
										</span>
										<span className='font-medium'>
											{result.ownershipCoefficient.toFixed(
												2
											)}
										</span>
									</div>
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

			{/* SEO Content */}
			<div className='mt-12 bg-gray-50 rounded-lg p-8'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('seo.title')}
					</h2>

					<div className='prose prose-lg max-w-none text-gray-700 space-y-6'>
						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.overview.title')}
							</h3>
							<p className='mb-4'>{t('seo.overview.content')}</p>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.calculation.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.calculation.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.calculation.enginePower')}</li>
								<li>{t('seo.calculation.region')}</li>
								<li>{t('seo.calculation.ownership')}</li>
								<li>{t('seo.calculation.formula')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.advantages.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.advantages.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.advantages.quick')}</li>
								<li>{t('seo.advantages.accurate')}</li>
								<li>{t('seo.advantages.planning')}</li>
								<li>{t('seo.advantages.regions')}</li>
							</ul>
						</div>

						<div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
							<h3 className='text-xl font-semibold text-blue-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-blue-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-blue-800'>
								<li>{t('seo.tips.deadline')}</li>
								<li>{t('seo.tips.payment')}</li>
								<li>{t('seo.tips.ownership')}</li>
								<li>{t('seo.tips.consultation')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
