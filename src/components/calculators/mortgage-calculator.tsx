'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Download,
	AlertCircle,
	CheckCircle,
	Home,
} from 'lucide-react';
import {
	calculateLoan,
	validateLoanInput,
	exportPaymentScheduleToCSV,
	type LoanInput,
	type LoanResult,
} from '@/lib/calculators/loan';
import PDFExport from '@/components/common/pdf-export';

/**
 * Mortgage Calculator Component
 * 
 * A React component specifically designed for mortgage loan calculations.
 * Similar to credit calculator but tailored for home mortgage scenarios.
 * 
 * Features:
 * - Supports both annuity and differentiated payment methods
 * - Down payment and additional payment support
 * - Detailed payment schedule generation
 * - CSV export functionality
 * - PDF export functionality
 * - Input validation with error messages
 * - Currency formatting
 * - Responsive design
 * 
 * Uses the loan calculation library from @/lib/calculators/loan
 * for all mathematical operations.
 */
export default function MortgageCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.mortgage');

	// Form state management
	const [formData, setFormData] = useState<Partial<LoanInput>>({
		loanAmount: 0, // Total mortgage amount
		termYears: 0, // Mortgage term in years
		termMonths: 0, // Additional months (added to years)
		interestRate: 0, // Annual interest rate (%)
		downPayment: 0, // Optional down payment
		additionalPayment: 0, // Optional additional monthly payment
		paymentType: 'annuity', // Payment calculation method
	});

	const [result, setResult] = useState<LoanResult | null>(null); // Calculated mortgage result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors array
	const [isCalculated, setIsCalculated] = useState(false); // Flag indicating if calculation was performed

	/**
	 * Handle input field changes
	 * 
	 * Updates form data when user changes input values.
	 * Converts string inputs to numbers and resets calculation flag.
	 * 
	 * @param field - Field name to update
	 * @param value - New value (string or number)
	 */
	const handleInputChange = (
		field: keyof LoanInput,
		value: string | number
	) => {
		// Convert string to number, default to 0 if invalid
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false); // Reset calculation flag when inputs change
	};

	/**
	 * Handle payment type change
	 * 
	 * Updates payment type (annuity or differentiated) and resets calculation.
	 * 
	 * @param value - Payment type string ('annuity' or 'differentiated')
	 */
	const handlePaymentTypeChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			paymentType: value as 'annuity' | 'differentiated',
		}));
		setIsCalculated(false); // Reset calculation flag
	};

	/**
	 * Handle calculation
	 * 
	 * Validates inputs and calculates mortgage payments and schedule.
	 * 
	 * Process:
	 * 1. Validate inputs using validateLoanInput
	 * 2. Combine termYears and termMonths into total months
	 * 3. Call calculateLoan with complete input
	 * 4. Update result state or error state
	 */
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

	/**
	 * Handle CSV download
	 * 
	 * Exports the mortgage payment schedule to CSV format and triggers browser download.
	 * Creates a blob with CSV data, generates download link, and triggers click.
	 * 
	 * File format:
	 * - Headers: Month, Payment, Interest, Principal, Balance
	 * - Data rows with comma-separated values
	 * - All monetary values formatted to 2 decimal places
	 * - Filename: mortgage-schedule.csv
	 */
	const handleDownloadCSV = () => {
		if (!result) return;

		// Generate CSV string from payment schedule
		const csv = exportPaymentScheduleToCSV(result.paymentSchedule);
		
		// Create blob and download link
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'mortgage-schedule.csv';
		link.click();
		
		// Clean up object URL
		window.URL.revokeObjectURL(url);
	};

	const generatePDFContent = () => {
		if (!result) return '';

		// Get currency symbol based on locale
		const getCurrencySymbol = () => {
			const locale =
				typeof window !== 'undefined'
					? window.location.pathname.split('/')[1]
					: 'ru';
			switch (locale) {
				case 'en':
					return '$';
				case 'es':
					return '€';
				case 'de':
					return '€';
				default:
					return '₽';
			}
		};

		const currencySymbol = getCurrencySymbol();

		let content = `${t('results.summary')}\n\n`;
		content += `${t(
			'results.monthlyPayment'
		)}: ${currencySymbol}${result.monthlyPayment.toFixed(2)}\n`;
		content += `${t(
			'results.totalPayments'
		)}: ${currencySymbol}${result.totalPayments.toFixed(2)}\n`;
		content += `${t(
			'results.totalInterest'
		)}: ${currencySymbol}${result.totalInterest.toFixed(2)}\n`;
		content += `${t('results.effectiveTerm')}: ${result.effectiveTerm} ${t(
			'results.months'
		)}\n\n`;

		content += `${t('results.scheduleTitle')}\n`;
		content += `${t('results.table.month')} | ${t(
			'results.table.payment'
		)} | ${t('results.table.interest')} | ${t(
			'results.table.principal'
		)} | ${t('results.table.balance')}\n`;
		content += `${'-'.repeat(80)}\n`;

		// Add first 12 months of payment schedule
		result.paymentSchedule.slice(0, 12).forEach((item) => {
			content += `${item.month} | ${currencySymbol}${item.payment.toFixed(
				2
			)} | ${currencySymbol}${item.interest.toFixed(
				2
			)} | ${currencySymbol}${item.principal.toFixed(
				2
			)} | ${currencySymbol}${item.balance.toFixed(2)}\n`;
		});

		if (result.paymentSchedule.length > 12) {
			content += `\n... ${result.paymentSchedule.length - 12} ${t(
				'results.table.moreMonths'
			)}\n`;
		}

		return content;
	};

	const formatCurrency = (amount: number) => {
		// Get locale and currency based on current language
		const getLocaleAndCurrency = () => {
			const locale =
				typeof window !== 'undefined'
					? window.location.pathname.split('/')[1]
					: 'ru';
			switch (locale) {
				case 'en':
					return { locale: 'en-US', currency: 'USD' };
				case 'es':
					return { locale: 'es-ES', currency: 'EUR' };
				case 'de':
					return { locale: 'de-DE', currency: 'EUR' };
				default:
					return { locale: 'ru-RU', currency: 'RUB' };
			}
		};

		const { locale, currency } = getLocaleAndCurrency();

		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Home className='h-16 w-16 text-blue-600' />
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
						{/* Property Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.propertyValue')}
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
								placeholder='5000000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Down Payment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.downPayment')}
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
								placeholder='1000000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
									placeholder='20'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
								placeholder='8.5'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
								placeholder='10000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
										className='mr-3 text-blue-600 focus:ring-blue-500'
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
										className='mr-3 text-blue-600 focus:ring-blue-500'
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
							{/* Summary */}
							<div className='bg-blue-50 rounded-lg p-4'>
								<h3 className='text-lg font-semibold text-blue-900 mb-4'>
									{t('results.summary')}
								</h3>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<span className='text-sm text-blue-700'>
											{t('results.monthlyPayment')}:
										</span>
										<div className='text-xl font-bold text-blue-900'>
											{formatCurrency(
												result.monthlyPayment
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-blue-700'>
											{t('results.totalPayments')}:
										</span>
										<div className='text-xl font-bold text-blue-900'>
											{formatCurrency(
												result.totalPayments
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-blue-700'>
											{t('results.totalInterest')}:
										</span>
										<div className='text-xl font-bold text-blue-900'>
											{formatCurrency(
												result.totalInterest
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-blue-700'>
											{t('results.effectiveTerm')}:
										</span>
										<div className='text-xl font-bold text-blue-900'>
											{result.effectiveTerm}{' '}
											{t('results.months')}
										</div>
									</div>
								</div>
							</div>

							{/* Download Buttons */}
							<div className='space-y-3'>
								<button
									onClick={handleDownloadCSV}
									className='w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center'
								>
									<Download className='h-4 w-4 mr-2' />
									{t('results.downloadSchedule')}
								</button>

								<PDFExport
									title={t('results.title')}
									content={generatePDFContent()}
									fileName='mortgage-calculation'
									className='w-full'
								/>
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
								<li>{t('seo.advantages.longTerm')}</li>
								<li>{t('seo.advantages.lowRate')}</li>
								<li>{t('seo.advantages.taxBenefits')}</li>
								<li>{t('seo.advantages.propertyOwnership')}</li>
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
								<li>{t('seo.requirements.income')}</li>
								<li>{t('seo.requirements.creditHistory')}</li>
								<li>{t('seo.requirements.downPayment')}</li>
								<li>{t('seo.requirements.insurance')}</li>
								<li>{t('seo.requirements.documents')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.programs.title')}
							</h3>
							<p className='mb-4'>{t('seo.programs.content')}</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-white p-4 rounded-lg border'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										{t('seo.programs.government.title')}
									</h4>
									<p className='text-sm text-gray-600'>
										{t('seo.programs.government.desc')}
									</p>
								</div>
								<div className='bg-white p-4 rounded-lg border'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										{t('seo.programs.commercial.title')}
									</h4>
									<p className='text-sm text-gray-600'>
										{t('seo.programs.commercial.desc')}
									</p>
								</div>
							</div>
						</div>

						<div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
							<h3 className='text-xl font-semibold text-blue-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-blue-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-blue-800'>
								<li>{t('seo.tips.compare')}</li>
								<li>{t('seo.tips.early')}</li>
								<li>{t('seo.tips.insurance')}</li>
								<li>{t('seo.tips.consult')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
