'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	Car,
	Fuel,
	Shield,
	Wrench,
	TrendingDown,
	BarChart3,
} from 'lucide-react';
import {
	calculateCarOwnership,
	validateCarOwnershipInput,
	formatCarOwnershipCurrency,
	formatCarOwnershipNumber,
	getDepreciationRates,
	getFuelConsumptionRates,
	type CarOwnershipInput,
	type CarOwnershipResult,
} from '@/lib/calculators/car-ownership';

export default function CarOwnershipCalculator() {
	const t = useTranslations('calculators.car-ownership');

	const [formData, setFormData] = useState<Partial<CarOwnershipInput>>({
		carPrice: 0,
		ownershipYears: 0,
		annualMileage: 0,
		fuelConsumption: 0,
		fuelPrice: 0,
		osagoCost: 0,
		kaskoCost: 0,
		vehicleTax: 0,
		maintenanceCost: 0,
		depreciationRate: 0,
	});

	const [result, setResult] = useState<CarOwnershipResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const depreciationRates = getDepreciationRates();
	const fuelConsumptionRates = getFuelConsumptionRates();

	const handleInputChange = (
		field: keyof CarOwnershipInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateCarOwnershipInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			setResult(null);
			return;
		}

		const input: CarOwnershipInput = {
			carPrice: formData.carPrice || 0,
			ownershipYears: formData.ownershipYears || 0,
			annualMileage: formData.annualMileage || 0,
			fuelConsumption: formData.fuelConsumption || 0,
			fuelPrice: formData.fuelPrice || 0,
			osagoCost: formData.osagoCost || 0,
			kaskoCost: formData.kaskoCost || 0,
			vehicleTax: formData.vehicleTax || 0,
			maintenanceCost: formData.maintenanceCost || 0,
			depreciationRate: formData.depreciationRate || 0,
		};

		const calculationResult = calculateCarOwnership(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
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
						{/* Car Price */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.carPrice')}
							</label>
							<input
								type='number'
								value={formData.carPrice || ''}
								onChange={(e) =>
									handleInputChange(
										'carPrice',
										e.target.value
									)
								}
								placeholder='1500000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Ownership Years */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.ownershipYears')}
							</label>
							<input
								type='number'
								value={formData.ownershipYears || ''}
								onChange={(e) =>
									handleInputChange(
										'ownershipYears',
										e.target.value
									)
								}
								placeholder='5'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Annual Mileage */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.annualMileage')}
							</label>
							<input
								type='number'
								value={formData.annualMileage || ''}
								onChange={(e) =>
									handleInputChange(
										'annualMileage',
										e.target.value
									)
								}
								placeholder='15000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Fuel Consumption */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.fuelConsumption')}
							</label>
							<select
								value={formData.fuelConsumption || ''}
								onChange={(e) =>
									handleInputChange(
										'fuelConsumption',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectConsumption')}
								</option>
								{fuelConsumptionRates.map((rate) => (
									<option
										key={rate.value}
										value={rate.value}
									>
										{rate.label} - {rate.description}
									</option>
								))}
							</select>
						</div>

						{/* Fuel Price */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.fuelPrice')}
							</label>
							<input
								type='number'
								step='0.01'
								value={formData.fuelPrice || ''}
								onChange={(e) =>
									handleInputChange(
										'fuelPrice',
										e.target.value
									)
								}
								placeholder='55.50'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* OSAGO Cost */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.osagoCost')}
							</label>
							<input
								type='number'
								value={formData.osagoCost || ''}
								onChange={(e) =>
									handleInputChange(
										'osagoCost',
										e.target.value
									)
								}
								placeholder='5000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* KASKO Cost */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.kaskoCost')} ({t('form.optional')})
							</label>
							<input
								type='number'
								value={formData.kaskoCost || ''}
								onChange={(e) =>
									handleInputChange(
										'kaskoCost',
										e.target.value
									)
								}
								placeholder='30000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Vehicle Tax */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.vehicleTax')}
							</label>
							<input
								type='number'
								value={formData.vehicleTax || ''}
								onChange={(e) =>
									handleInputChange(
										'vehicleTax',
										e.target.value
									)
								}
								placeholder='2500'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Maintenance Cost */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.maintenanceCost')}
							</label>
							<input
								type='number'
								value={formData.maintenanceCost || ''}
								onChange={(e) =>
									handleInputChange(
										'maintenanceCost',
										e.target.value
									)
								}
								placeholder='20000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Depreciation Rate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.depreciationRate')}
							</label>
							<select
								value={formData.depreciationRate || ''}
								onChange={(e) =>
									handleInputChange(
										'depreciationRate',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectDepreciation')}
								</option>
								{depreciationRates.map((rate) => (
									<option
										key={rate.value}
										value={rate.value}
									>
										{rate.label} - {rate.description}
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
							{/* Total Ownership Cost */}
							<div className='bg-blue-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.totalOwnershipCost')}
								</h3>
								<div className='text-3xl font-bold text-blue-900'>
									{formatCarOwnershipCurrency(
										result.totalOwnershipCost
									)}
								</div>
								<p className='text-blue-700 mt-2'>
									{t('results.totalOwnershipDescription')}
								</p>
							</div>

							{/* Cost per Kilometer */}
							<div className='bg-green-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.costPerKm')}
								</h3>
								<div className='text-2xl font-bold text-green-900'>
									{formatCarOwnershipCurrency(
										result.costPerKm
									)}
								</div>
								<p className='text-green-700 mt-2'>
									{t('results.costPerKmDescription')}
								</p>
							</div>

							{/* Annual Costs */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900 flex items-center'>
									<BarChart3 className='h-5 w-5 mr-2 text-blue-600' />
									{t('results.annualCosts')}
								</h4>
								<div className='space-y-3'>
									<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
										<div className='flex items-center'>
											<Fuel className='h-4 w-4 text-orange-600 mr-2' />
											<span className='text-sm text-gray-700'>
												{t('results.fuel')}:
											</span>
										</div>
										<span className='font-medium text-gray-900'>
											{formatCarOwnershipCurrency(
												result.annualFuelCost
											)}
										</span>
									</div>
									<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
										<div className='flex items-center'>
											<Shield className='h-4 w-4 text-blue-600 mr-2' />
											<span className='text-sm text-gray-700'>
												{t('results.insurance')}:
											</span>
										</div>
										<span className='font-medium text-gray-900'>
											{formatCarOwnershipCurrency(
												result.annualInsuranceCost
											)}
										</span>
									</div>
									<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
										<div className='flex items-center'>
											<Car className='h-4 w-4 text-purple-600 mr-2' />
											<span className='text-sm text-gray-700'>
												{t('results.tax')}:
											</span>
										</div>
										<span className='font-medium text-gray-900'>
											{formatCarOwnershipCurrency(
												result.annualTaxCost
											)}
										</span>
									</div>
									<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
										<div className='flex items-center'>
											<Wrench className='h-4 w-4 text-green-600 mr-2' />
											<span className='text-sm text-gray-700'>
												{t('results.maintenance')}:
											</span>
										</div>
										<span className='font-medium text-gray-900'>
											{formatCarOwnershipCurrency(
												result.annualMaintenanceCost
											)}
										</span>
									</div>
									<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
										<div className='flex items-center'>
											<TrendingDown className='h-4 w-4 text-red-600 mr-2' />
											<span className='text-sm text-gray-700'>
												{t('results.depreciation')}:
											</span>
										</div>
										<span className='font-medium text-gray-900'>
											{formatCarOwnershipCurrency(
												result.annualDepreciationCost
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Cost Breakdown */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('results.costBreakdown')}
								</h4>
								<div className='space-y-2'>
									{Object.entries(result.breakdown).map(
										([key, data]) => (
											<div
												key={key}
												className='flex justify-between items-center'
											>
												<span className='text-sm text-gray-600'>
													{t(`results.${key}`)}:
												</span>
												<div className='text-right'>
													<div className='font-medium text-gray-900'>
														{formatCarOwnershipCurrency(
															data.total
														)}
													</div>
													<div className='text-xs text-gray-500'>
														{formatCarOwnershipNumber(
															data.percentage
														)}
														%
													</div>
												</div>
											</div>
										)
									)}
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
								<li>{t('seo.calculation.fuel')}</li>
								<li>{t('seo.calculation.insurance')}</li>
								<li>{t('seo.calculation.tax')}</li>
								<li>{t('seo.calculation.maintenance')}</li>
								<li>{t('seo.calculation.depreciation')}</li>
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
								<li>{t('seo.advantages.comprehensive')}</li>
								<li>{t('seo.advantages.accurate')}</li>
								<li>{t('seo.advantages.planning')}</li>
								<li>{t('seo.advantages.comparison')}</li>
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
								<li>{t('seo.tips.fuel')}</li>
								<li>{t('seo.tips.insurance')}</li>
								<li>{t('seo.tips.maintenance')}</li>
								<li>{t('seo.tips.depreciation')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
