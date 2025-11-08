'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Car } from 'lucide-react';
import {
	calculateLeasing,
	validateLeasingInput,
	formatLeasingCurrency,
	type LeasingInput,
	type LeasingResult,
} from '@/lib/calculators/leasing';

/**
 * Leasing Calculator Component
 * 
 * A React component for calculating car leasing payments and costs.
 * 
 * Features:
 * - Car value input
 * - Down payment input (amount or percentage)
 * - Lease term input (months)
 * - Interest rate input
 * - Buyout value input (amount or percentage)
 * - Monthly payment calculation
 * - Total cost calculation
 * - Payment schedule generation
 * - Responsive design
 * 
 * Uses the leasing calculation library from @/lib/calculators/leasing
 * for all mathematical operations.
 */
export default function LeasingCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.leasing');

	// Form state management
	const [formData, setFormData] = useState<Partial<LeasingInput>>({
		carValue: 0, // Car value (₽)
		downPayment: 0, // Down payment amount
		downPaymentType: 'percent', // Down payment type (percent, amount)
		leaseTerm: 36, // Lease term (months, default: 36)
		interestRate: 0, // Annual interest rate (%)
		buyoutValue: 0, // Buyout value amount
		buyoutType: 'percent', // Buyout value type (percent, amount)
	});

	const [result, setResult] = useState<LeasingResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	const handleInputChange = (
		field: keyof LeasingInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleTypeChange = (
		field: 'downPaymentType' | 'buyoutType',
		value: 'percent' | 'amount'
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateLeasingInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: LeasingInput = {
			carValue: formData.carValue || 0,
			downPayment: formData.downPayment || 0,
			downPaymentType: formData.downPaymentType || 'percent',
			leaseTerm: formData.leaseTerm || 36,
			interestRate: formData.interestRate || 0,
			buyoutValue: formData.buyoutValue || 0,
			buyoutType: formData.buyoutType || 'percent',
		};

		const calculationResult = calculateLeasing(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Car className='h-16 w-16 text-green-600' />
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
						<Calculator className='h-5 w-5 mr-2 text-green-600' />
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
								placeholder='2000000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>

						{/* Down Payment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.downPayment')}
							</label>
							<div className='flex space-x-2'>
								<input
									type='number'
									value={formData.downPayment || ''}
									onChange={(e) =>
										handleInputChange(
											'downPayment',
											e.target.value
										)
									}
									placeholder='20'
									className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
								<select
									value={
										formData.downPaymentType || 'percent'
									}
									onChange={(e) =>
										handleTypeChange(
											'downPaymentType',
											e.target.value as
												| 'percent'
												| 'amount'
										)
									}
									className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								>
									<option value='percent'>%</option>
									<option value='amount'>₽</option>
								</select>
							</div>
						</div>

						{/* Lease Term */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.leaseTerm')}
							</label>
							<input
								type='number'
								value={formData.leaseTerm || ''}
								onChange={(e) =>
									handleInputChange(
										'leaseTerm',
										e.target.value
									)
								}
								placeholder='36'
								min='1'
								max='60'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>

						{/* Interest Rate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.interestRate')}
							</label>
							<input
								type='number'
								value={formData.interestRate || ''}
								onChange={(e) =>
									handleInputChange(
										'interestRate',
										e.target.value
									)
								}
								placeholder='12'
								step='0.1'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>

						{/* Buyout Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.buyoutValue')}
							</label>
							<div className='flex space-x-2'>
								<input
									type='number'
									value={formData.buyoutValue || ''}
									onChange={(e) =>
										handleInputChange(
											'buyoutValue',
											e.target.value
										)
									}
									placeholder='10'
									className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
								<select
									value={formData.buyoutType || 'percent'}
									onChange={(e) =>
										handleTypeChange(
											'buyoutType',
											e.target.value as
												| 'percent'
												| 'amount'
										)
									}
									className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								>
									<option value='percent'>%</option>
									<option value='amount'>₽</option>
								</select>
							</div>
						</div>

						{/* Calculate Button */}
						<button
							type='button'
							onClick={handleCalculate}
							className='w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors'
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
							{/* Monthly Payment */}
							<div className='bg-green-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.monthlyPayment')}
								</h3>
								<div className='text-3xl font-bold text-green-900'>
									{formatLeasingCurrency(
										result.monthlyPayment
									)}
								</div>
								<p className='text-green-700 mt-2'>
									{t('results.monthlyPaymentDescription')}
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
											{t('results.totalPayments')}:
										</span>
										<span className='font-medium'>
											{formatLeasingCurrency(
												result.totalPayments
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.totalCost')}:
										</span>
										<span className='font-medium'>
											{formatLeasingCurrency(
												result.totalCost
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.overpayment')}:
										</span>
										<span className='font-medium text-red-600'>
											{formatLeasingCurrency(
												result.overpayment
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.financingAmount')}:
										</span>
										<span className='font-medium'>
											{formatLeasingCurrency(
												result.financingAmount
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.downPaymentAmount')}:
										</span>
										<span className='font-medium'>
											{formatLeasingCurrency(
												result.downPaymentAmount
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.buyoutAmount')}:
										</span>
										<span className='font-medium'>
											{formatLeasingCurrency(
												result.buyoutAmount
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
								<li>{t('seo.calculation.financing')}</li>
								<li>{t('seo.calculation.payment')}</li>
								<li>{t('seo.calculation.total')}</li>
								<li>{t('seo.calculation.overpayment')}</li>
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
								<li>{t('seo.advantages.comparison')}</li>
								<li>{t('seo.advantages.planning')}</li>
							</ul>
						</div>

						<div className='bg-green-50 p-6 rounded-lg border border-green-200'>
							<h3 className='text-xl font-semibold text-green-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-green-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-green-800'>
								<li>{t('seo.tips.downPayment')}</li>
								<li>{t('seo.tips.interestRate')}</li>
								<li>{t('seo.tips.term')}</li>
								<li>{t('seo.tips.buyout')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
