'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Download,
	AlertCircle,
	CheckCircle,
	CreditCard,
} from 'lucide-react';
import {
	calculateLoan,
	validateLoanInput,
	exportPaymentScheduleToCSV,
	type LoanInput,
	type LoanResult,
} from '@/lib/calculators/loan';

export default function ConsumerLoanCalculator() {
	const t = useTranslations('calculators.consumer-loan');

	const [formData, setFormData] = useState<Partial<LoanInput>>({
		loanAmount: 0,
		termYears: 0,
		termMonths: 0,
		interestRate: 0,
		downPayment: 0,
		additionalPayment: 0,
		paymentType: 'annuity',
	});

	const [result, setResult] = useState<LoanResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const handleInputChange = (
		field: keyof LoanInput,
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
		const validationErrors = validateLoanInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: LoanInput = {
			loanAmount: formData.loanAmount || 0,
			termMonths:
				(formData.termYears || 0) * 12 + (formData.termMonths || 0),
			interestRate: formData.interestRate || 0,
			downPayment: formData.downPayment || 0,
			additionalPayment: formData.additionalPayment || 0,
			paymentType: formData.paymentType || 'annuity',
		};

		const calculationResult = calculateLoan(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const handleDownloadCSV = () => {
		if (!result) return;

		const csv = exportPaymentScheduleToCSV(result.paymentSchedule);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'consumer-loan-schedule.csv';
		link.click();
		window.URL.revokeObjectURL(url);
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
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<CreditCard className='h-16 w-16 text-purple-600' />
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
						<Calculator className='h-5 w-5 mr-2 text-purple-600' />
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
						{/* Loan Amount */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
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
								placeholder='500000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
							/>
						</div>

						{/* Down Payment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
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
								placeholder='50000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
							/>
						</div>

						{/* Term */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
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
									placeholder='3'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
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
									placeholder='0'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
								/>
							</div>
						</div>

						{/* Interest Rate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.interestRate')}
							</label>
							<input
								type='number'
								step='0.01'
								value={formData.interestRate || ''}
								onChange={(e) =>
									handleInputChange(
										'interestRate',
										e.target.value
									)
								}
								placeholder='15.5'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
							/>
						</div>

						{/* Additional Payment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
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
								placeholder='5000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
							/>
						</div>

						{/* Payment Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-4'>
								{t('form.paymentType')}
							</label>
							<div className='space-y-3'>
								<label className='flex items-center'>
									<input
										type='radio'
										name='paymentType'
										value='annuity'
										checked={
											formData.paymentType === 'annuity'
										}
										onChange={(e) =>
											handlePaymentTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-purple-600 focus:ring-purple-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.paymentTypes.annuity')}
									</span>
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='paymentType'
										value='differentiated'
										checked={
											formData.paymentType ===
											'differentiated'
										}
										onChange={(e) =>
											handlePaymentTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-purple-600 focus:ring-purple-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.paymentTypes.differentiated')}
									</span>
								</label>
							</div>
						</div>

						{/* Calculate Button */}
						<button
							type='button'
							onClick={handleCalculate}
							className='w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors'
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
							{/* Summary */}
							<div className='bg-purple-50 rounded-lg p-4'>
								<h3 className='text-lg font-semibold text-purple-900 mb-4'>
									{t('results.summary')}
								</h3>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<span className='text-sm text-purple-700'>
											{t('results.monthlyPayment')}:
										</span>
										<div className='text-xl font-bold text-purple-900'>
											{formatCurrency(
												result.monthlyPayment
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-purple-700'>
											{t('results.totalPayments')}:
										</span>
										<div className='text-xl font-bold text-purple-900'>
											{formatCurrency(
												result.totalPayments
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-purple-700'>
											{t('results.totalInterest')}:
										</span>
										<div className='text-xl font-bold text-purple-900'>
											{formatCurrency(
												result.totalInterest
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-purple-700'>
											{t('results.effectiveTerm')}:
										</span>
										<div className='text-xl font-bold text-purple-900'>
											{result.effectiveTerm}{' '}
											{t('results.months')}
										</div>
									</div>
								</div>
							</div>

							{/* Download Button */}
							<button
								onClick={handleDownloadCSV}
								className='w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center'
							>
								<Download className='h-4 w-4 mr-2' />
								{t('results.downloadSchedule')}
							</button>
						</div>
					) : (
						<div className='text-center text-gray-500 py-8'>
							<Calculator className='h-12 w-12 mx-auto mb-4 text-gray-400' />
							<p>{t('results.placeholder')}</p>
						</div>
					)}
				</div>
			</div>

			{/* Payment Schedule Table */}
			{isCalculated && result && (
				<div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
					<h3 className='text-xl font-semibold text-gray-900 mb-6'>
						{t('results.scheduleTitle')}
					</h3>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.month')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.payment')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.interest')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.principal')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.balance')}
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{result.paymentSchedule
									.slice(0, 12)
									.map((item) => (
										<tr
											key={item.month}
											className='hover:bg-gray-50'
										>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{item.month}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatCurrency(item.payment)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatCurrency(item.interest)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatCurrency(item.principal)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatCurrency(item.balance)}
											</td>
										</tr>
									))}
								{result.paymentSchedule.length > 12 && (
									<tr className='bg-gray-50'>
										<td
											colSpan={5}
											className='px-6 py-4 text-center text-sm text-gray-500'
										>
											...{' '}
											{result.paymentSchedule.length - 12}{' '}
											{t('results.table.moreMonths')}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

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
								{t('seo.advantages.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.advantages.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.advantages.quickApproval')}</li>
								<li>{t('seo.advantages.noCollateral')}</li>
								<li>{t('seo.advantages.flexibleTerms')}</li>
								<li>{t('seo.advantages.earlyRepayment')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.requirements.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.requirements.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.requirements.age')}</li>
								<li>{t('seo.requirements.income')}</li>
								<li>{t('seo.requirements.creditHistory')}</li>
								<li>{t('seo.requirements.documents')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.types.title')}
							</h3>
							<p className='mb-4'>{t('seo.types.content')}</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-white p-4 rounded-lg border'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										{t('seo.types.refinancing.title')}
									</h4>
									<p className='text-sm text-gray-600'>
										{t('seo.types.refinancing.desc')}
									</p>
								</div>
								<div className='bg-white p-4 rounded-lg border'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										{t('seo.types.emergency.title')}
									</h4>
									<p className='text-sm text-gray-600'>
										{t('seo.types.emergency.desc')}
									</p>
								</div>
							</div>
						</div>

						<div className='bg-purple-50 p-6 rounded-lg border border-purple-200'>
							<h3 className='text-xl font-semibold text-purple-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-purple-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-purple-800'>
								<li>{t('seo.tips.compare')}</li>
								<li>{t('seo.tips.creditScore')}</li>
								<li>{t('seo.tips.early')}</li>
								<li>{t('seo.tips.consult')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
