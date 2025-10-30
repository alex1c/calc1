'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	TrendingDown,
	DollarSign,
	Percent,
} from 'lucide-react';
import {
	calculateLoanOverpayment,
	validateLoanOverpaymentInput,
	type LoanOverpaymentInput,
	type LoanOverpaymentResult,
} from '@/lib/calculators/loan-overpayment';

export default function LoanOverpaymentCalculator() {
	const t = useTranslations('calculators.loan-overpayment');

	const [formData, setFormData] = useState<Partial<LoanOverpaymentInput>>({
		loanAmount: 1000000,
		termYears: 5,
		termMonths: 0,
		interestRate: 12,
		downPayment: 0,
		additionalPayment: 0,
		paymentType: 'annuity',
	});

	const [result, setResult] = useState<LoanOverpaymentResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const handleInputChange = (
		field: keyof LoanOverpaymentInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handlePaymentTypeChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			paymentType: value as 'annuity' | 'differentiated',
		}));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateLoanOverpaymentInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			setResult(null);
			setIsCalculated(false);
			return;
		}

		const input: LoanOverpaymentInput = {
			loanAmount: formData.loanAmount || 0,
			termYears: formData.termYears || 0,
			termMonths: formData.termMonths || 0,
			interestRate: formData.interestRate || 0,
			downPayment: formData.downPayment || 0,
			additionalPayment: formData.additionalPayment || 0,
			paymentType: formData.paymentType || 'annuity',
		};

		const calculationResult = calculateLoanOverpayment(input);
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

	const formatPercent = (value: number) => {
		return `${value.toFixed(2)}%`;
	};

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Form Fields */}
					<div className='space-y-6'>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
							<Calculator className='h-5 w-5 mr-2 text-blue-600 dark:text-blue-400' />
							{t('form.title')}
						</h2>

						{/* Errors */}
						{errors.length > 0 && (
							<div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
								<div className='flex items-center mb-2'>
									<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
									<span className='text-red-800 dark:text-red-400 font-medium'>
										{t('errors.title')}
									</span>
								</div>
								<ul className='text-red-700 dark:text-red-300 text-sm space-y-1'>
									{errors.map((error, index) => (
										<li key={index}>• {error}</li>
									))}
								</ul>
							</div>
						)}

						{/* Loan Amount */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.loanAmount')}
							</label>
							<input
								type='number'
								value={formData.loanAmount || ''}
								onChange={(e) =>
									handleInputChange(
										'loanAmount',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='1000000'
								min='0'
								step='1000'
							/>
						</div>

						{/* Term */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.termYears')}
								</label>
								<input
									type='number'
									value={formData.termYears || ''}
									onChange={(e) =>
										handleInputChange(
											'termYears',
											e.target.value
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='5'
									min='0'
									max='50'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.termMonths')}
								</label>
								<input
									type='number'
									value={formData.termMonths || ''}
									onChange={(e) =>
										handleInputChange(
											'termMonths',
											e.target.value
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='0'
									min='0'
									max='11'
								/>
							</div>
						</div>

						{/* Interest Rate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
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
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='12'
								min='0'
								max='1000'
								step='0.1'
							/>
						</div>

						{/* Down Payment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.downPayment')} ({t('form.optional')})
							</label>
							<input
								type='number'
								value={formData.downPayment || ''}
								onChange={(e) =>
									handleInputChange(
										'downPayment',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='0'
								min='0'
								step='1000'
							/>
						</div>

						{/* Additional Payment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.additionalPayment')} (
								{t('form.optional')})
							</label>
							<input
								type='number'
								value={formData.additionalPayment || ''}
								onChange={(e) =>
									handleInputChange(
										'additionalPayment',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='0'
								min='0'
								step='1000'
							/>
						</div>

						{/* Payment Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.paymentType')}
							</label>
							<select
								value={formData.paymentType || 'annuity'}
								onChange={(e) =>
									handlePaymentTypeChange(e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
							>
								<option value='annuity'>
									{t('form.paymentTypes.annuity')}
								</option>
								<option value='differentiated'>
									{t('form.paymentTypes.differentiated')}
								</option>
							</select>
						</div>

						{/* Calculate Button */}
						<button
							onClick={handleCalculate}
							className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center'
						>
							<Calculator className='h-5 w-5 mr-2' />
							{t('form.calculate')}
						</button>
					</div>

					{/* Results */}
					{result && (
						<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
							<div className='flex items-center mb-6'>
								<CheckCircle className='h-6 w-6 text-green-600 dark:text-green-400 mr-3' />
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
									{t('results.title')}
								</h2>
							</div>

							{/* Overpayment Highlight */}
							<div className='bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-4 mb-6'>
								<div className='flex items-center justify-between mb-2'>
									<span className='text-sm font-medium text-red-800 dark:text-red-300'>
										{t('results.overpaymentAmount')}
									</span>
									<TrendingDown className='h-5 w-5 text-red-600 dark:text-red-400' />
								</div>
								<div className='text-3xl font-bold text-red-700 dark:text-red-300'>
									{formatCurrency(result.overpaymentAmount)}
								</div>
								<div className='text-sm text-red-600 dark:text-red-400 mt-1'>
									{formatPercent(
										result.overpaymentPercentage
									)}{' '}
									от суммы кредита
								</div>
							</div>

							{/* Results Table */}
							<div className='space-y-4'>
								<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
									<span className='text-gray-700 dark:text-gray-300'>
										{t('results.loanAmount')}
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{formatCurrency(result.loanAmount)}
									</span>
								</div>

								{result.downPayment > 0 && (
									<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
										<span className='text-gray-700 dark:text-gray-300'>
											{t('results.downPayment')}
										</span>
										<span className='font-semibold text-gray-900 dark:text-white'>
											{formatCurrency(result.downPayment)}
										</span>
									</div>
								)}

								<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
									<span className='text-gray-700 dark:text-gray-300'>
										{t('results.effectiveLoanAmount')}
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{formatCurrency(
											result.effectiveLoanAmount
										)}
									</span>
								</div>

								<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
									<span className='text-gray-700 dark:text-gray-300'>
										{t('results.monthlyPayment')}
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{formatCurrency(result.monthlyPayment)}
									</span>
								</div>

								<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
									<span className='text-gray-700 dark:text-gray-300'>
										{t('results.totalPayments')}
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{formatCurrency(result.totalPayments)}
									</span>
								</div>

								<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
									<span className='text-gray-700 dark:text-gray-300'>
										{t('results.totalInterest')}
									</span>
									<span className='font-semibold text-red-600 dark:text-red-400'>
										{formatCurrency(result.totalInterest)}
									</span>
								</div>

								<div className='flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600'>
									<span className='text-gray-700 dark:text-gray-300'>
										{t('results.totalCost')}
									</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										{formatCurrency(result.totalCost)}
									</span>
								</div>

								<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4'>
									<div className='flex items-center justify-between mb-2'>
										<span className='text-sm font-medium text-blue-800 dark:text-blue-300'>
											{t('results.overpaymentPercentage')}
										</span>
										<Percent className='h-5 w-5 text-blue-600 dark:text-blue-400' />
									</div>
									<div className='text-2xl font-bold text-blue-700 dark:text-blue-300'>
										{formatPercent(
											result.overpaymentPercentage
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
