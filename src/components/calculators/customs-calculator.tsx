'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Truck } from 'lucide-react';
import {
	calculateCustoms,
	validateCustomsInput,
	formatCustomsCurrency,
	getFuelTypeOptions,
	type CustomsInput,
	type CustomsResult,
} from '@/lib/calculators/customs';

export default function CustomsCalculator() {
	const t = useTranslations('calculators.customs');

	const [formData, setFormData] = useState<Partial<CustomsInput>>({
		carValue: 0,
		engineVolume: 0,
		fuelType: 'gasoline',
		carAge: 0,
		enginePower: 0,
	});

	const [result, setResult] = useState<CustomsResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const fuelTypeOptions = getFuelTypeOptions();

	const handleInputChange = (
		field: keyof CustomsInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleFuelTypeChange = (
		value: 'gasoline' | 'diesel' | 'electric'
	) => {
		setFormData((prev) => ({ ...prev, fuelType: value }));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateCustomsInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: CustomsInput = {
			carValue: formData.carValue || 0,
			engineVolume: formData.engineVolume || 0,
			fuelType: formData.fuelType || 'gasoline',
			carAge: formData.carAge || 0,
			enginePower: formData.enginePower || 0,
		};

		const calculationResult = calculateCustoms(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Truck className='h-16 w-16 text-blue-600' />
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
						{/* Car Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.carValue')}
							</label>
							<input
								type='number'
								value={formData.carValue || ''}
								onChange={(e) =>
									handleInputChange(
										'carValue',
										e.target.value
									)
								}
								placeholder='25000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Engine Volume */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.engineVolume')}
							</label>
							<input
								type='number'
								value={formData.engineVolume || ''}
								onChange={(e) =>
									handleInputChange(
										'engineVolume',
										e.target.value
									)
								}
								placeholder='2000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Fuel Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.fuelType')}
							</label>
							<select
								value={formData.fuelType || 'gasoline'}
								onChange={(e) =>
									handleFuelTypeChange(
										e.target.value as
											| 'gasoline'
											| 'diesel'
											| 'electric'
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{fuelTypeOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Car Age */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.carAge')}
							</label>
							<input
								type='number'
								value={formData.carAge || ''}
								onChange={(e) =>
									handleInputChange('carAge', e.target.value)
								}
								placeholder='3'
								min='0'
								max='50'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

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
							{/* Total Amount */}
							<div className='bg-blue-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.total')}
								</h3>
								<div className='text-3xl font-bold text-blue-900'>
									{formatCustomsCurrency(result.total)}
								</div>
								<p className='text-blue-700 mt-2'>
									{t('results.totalDescription')}
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
											{t('results.carValue')}:
										</span>
										<span className='font-medium'>
											{formatCustomsCurrency(
												result.carValueRub
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.duty')}:
										</span>
										<span className='font-medium'>
											{formatCustomsCurrency(result.duty)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.excise')}:
										</span>
										<span className='font-medium'>
											{formatCustomsCurrency(
												result.excise
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.vat')}:
										</span>
										<span className='font-medium'>
											{formatCustomsCurrency(result.vat)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.recyclingFee')}:
										</span>
										<span className='font-medium'>
											{formatCustomsCurrency(
												result.recyclingFee
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
								<li>{t('seo.calculation.duty')}</li>
								<li>{t('seo.calculation.excise')}</li>
								<li>{t('seo.calculation.vat')}</li>
								<li>{t('seo.calculation.recycling')}</li>
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
								<li>{t('seo.tips.age')}</li>
								<li>{t('seo.tips.volume')}</li>
								<li>{t('seo.tips.documentation')}</li>
								<li>{t('seo.tips.consultation')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
