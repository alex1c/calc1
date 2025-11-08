'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Download,
	AlertCircle,
	CheckCircle,
	TrendingUp,
	DollarSign,
	Euro,
	Banknote,
} from 'lucide-react';
import {
	calculateDeposit,
	validateDepositInput,
	exportDepositScheduleToCSV,
	formatDepositCurrency,
	type DepositInput,
	type DepositResult,
} from '@/lib/calculators/deposit';

/**
 * Deposit Calculator Component
 * 
 * A React component for calculating deposit growth and returns.
 * 
 * Features:
 * - Supports three deposit types: simple, capitalized, and compound
 * - Monthly additions and withdrawals support
 * - Detailed deposit schedule generation
 * - CSV export functionality
 * - Multi-currency support (RUB, USD, EUR)
 * - Effective interest rate calculation
 * - Input validation with error messages
 * - Responsive design
 * 
 * Uses the deposit calculation library from @/lib/calculators/deposit
 * for all mathematical operations.
 */
export default function DepositCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.investment');

	// Form state management
	const [formData, setFormData] = useState<Partial<DepositInput>>({
		amount: 0, // Initial deposit amount
		termMonths: 0, // Deposit term in months
		interestRate: 0, // Annual interest rate (%)
		depositType: 'simple', // Deposit calculation type
		capitalizationPeriod: 'monthly', // Capitalization frequency (for capitalized deposits)
		monthlyAddition: 0, // Optional monthly additions
		monthlyWithdrawal: 0, // Optional monthly withdrawals
		currency: 'RUB', // Currency for formatting
	});

	const [result, setResult] = useState<DepositResult | null>(null); // Calculated deposit result
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
		field: keyof DepositInput,
		value: string | number
	) => {
		// Convert string to number, default to 0 if invalid
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false); // Reset calculation flag when inputs change
	};

	/**
	 * Handle deposit type change
	 * 
	 * Updates deposit type (simple, capitalized, or compound) and resets calculation.
	 * 
	 * @param value - Deposit type string
	 */
	const handleDepositTypeChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			depositType: value as 'simple' | 'capitalized' | 'compound',
		}));
		setIsCalculated(false); // Reset calculation flag
	};

	/**
	 * Handle capitalization period change
	 * 
	 * Updates capitalization frequency (monthly, quarterly, or yearly)
	 * for capitalized deposits. Resets calculation flag.
	 * 
	 * @param value - Capitalization period string
	 */
	const handleCapitalizationPeriodChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			capitalizationPeriod: value as 'monthly' | 'quarterly' | 'yearly',
		}));
		setIsCalculated(false); // Reset calculation flag
	};

	/**
	 * Handle calculation
	 * 
	 * Validates inputs and calculates deposit growth and schedule.
	 * 
	 * Process:
	 * 1. Validate inputs using validateDepositInput
	 * 2. Build complete DepositInput object with defaults
	 * 3. Call calculateDeposit with complete input
	 * 4. Update result state or error state
	 */
	const handleCalculate = () => {
		const validationErrors = validateDepositInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: DepositInput = {
			amount: formData.amount || 0,
			termMonths: formData.termMonths || 0,
			interestRate: formData.interestRate || 0,
			depositType: formData.depositType || 'simple',
			capitalizationPeriod: formData.capitalizationPeriod || 'monthly',
			monthlyAddition: formData.monthlyAddition || 0,
			monthlyWithdrawal: formData.monthlyWithdrawal || 0,
			currency: formData.currency || 'RUB',
		};

		const calculationResult = calculateDeposit(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const handleDownloadCSV = () => {
		if (!result) return;

		const csv = exportDepositScheduleToCSV(
			result.depositSchedule,
			formData.currency
		);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'deposit-schedule.csv';
		link.click();
		window.URL.revokeObjectURL(url);
	};

	const getCurrencyIcon = (currency: string) => {
		switch (currency) {
			case 'USD':
				return <DollarSign className='h-4 w-4' />;
			case 'EUR':
				return <Euro className='h-4 w-4' />;
			default:
				return <Banknote className='h-4 w-4' />;
		}
	};

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<TrendingUp className='h-16 w-16 text-green-600' />
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
						{/* Currency Selection */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.currency')}
							</label>
							<select
								value={formData.currency || 'RUB'}
								onChange={(e) =>
									handleInputChange(
										'currency',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							>
								<option value='RUB'>
									₽ RUB (Russian Ruble)
								</option>
								<option value='USD'>$ USD (US Dollar)</option>
								<option value='EUR'>€ EUR (Euro)</option>
							</select>
						</div>

						{/* Deposit Amount */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.amount')}
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									{getCurrencyIcon(
										formData.currency || 'RUB'
									)}
								</div>
								<input
									type='number'
									value={formData.amount || ''}
									onChange={(e) =>
										handleInputChange(
											'amount',
											e.target.value
										)
									}
									placeholder='100000'
									className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
							</div>
						</div>

						{/* Term */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.termYears')}
								</label>
								<input
									type='number'
									value={Math.floor(
										(formData.termMonths || 0) / 12
									)}
									onChange={(e) =>
										handleInputChange(
											'termMonths',
											parseInt(e.target.value) * 12
										)
									}
									placeholder='1'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.termMonths')}
								</label>
								<input
									type='number'
									value={(formData.termMonths || 0) % 12}
									onChange={(e) => {
										const years = Math.floor(
											(formData.termMonths || 0) / 12
										);
										handleInputChange(
											'termMonths',
											years * 12 +
												parseInt(e.target.value)
										);
									}}
									placeholder='0'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
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
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>

						{/* Deposit Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-4'>
								{t('form.depositType')}
							</label>
							<div className='space-y-3'>
								<label className='flex items-center'>
									<input
										type='radio'
										name='depositType'
										value='simple'
										checked={
											formData.depositType === 'simple'
										}
										onChange={(e) =>
											handleDepositTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-green-600 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.depositTypes.simple')}
									</span>
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='depositType'
										value='capitalized'
										checked={
											formData.depositType ===
											'capitalized'
										}
										onChange={(e) =>
											handleDepositTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-green-600 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.depositTypes.capitalized')}
									</span>
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='depositType'
										value='compound'
										checked={
											formData.depositType === 'compound'
										}
										onChange={(e) =>
											handleDepositTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-green-600 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.depositTypes.compound')}
									</span>
								</label>
							</div>
						</div>

						{/* Capitalization Period (only for capitalized deposits) */}
						{formData.depositType === 'capitalized' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.capitalizationPeriod')}
								</label>
								<select
									value={
										formData.capitalizationPeriod ||
										'monthly'
									}
									onChange={(e) =>
										handleCapitalizationPeriodChange(
											e.target.value
										)
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								>
									<option value='monthly'>
										{t(
											'form.capitalizationPeriods.monthly'
										)}
									</option>
									<option value='quarterly'>
										{t(
											'form.capitalizationPeriods.quarterly'
										)}
									</option>
									<option value='yearly'>
										{t('form.capitalizationPeriods.yearly')}
									</option>
								</select>
							</div>
						)}

						{/* Monthly Addition */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.monthlyAddition')} (
								{t('form.optional')})
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									{getCurrencyIcon(
										formData.currency || 'RUB'
									)}
								</div>
								<input
									type='number'
									value={formData.monthlyAddition || ''}
									onChange={(e) =>
										handleInputChange(
											'monthlyAddition',
											e.target.value
										)
									}
									placeholder='5000'
									className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
							</div>
						</div>

						{/* Monthly Withdrawal */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.monthlyWithdrawal')} (
								{t('form.optional')})
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									{getCurrencyIcon(
										formData.currency || 'RUB'
									)}
								</div>
								<input
									type='number'
									value={formData.monthlyWithdrawal || ''}
									onChange={(e) =>
										handleInputChange(
											'monthlyWithdrawal',
											e.target.value
										)
									}
									placeholder='1000'
									className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
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
							{/* Summary */}
							<div className='bg-green-50 rounded-lg p-4'>
								<h3 className='text-lg font-semibold text-green-900 mb-4'>
									{t('results.summary')}
								</h3>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.finalAmount')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{formatDepositCurrency(
												result.finalAmount,
												formData.currency || 'RUB'
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.totalInterest')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{formatDepositCurrency(
												result.totalInterest,
												formData.currency || 'RUB'
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.effectiveRate')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{result.effectiveRate.toFixed(2)}%
										</div>
									</div>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.term')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{formData.termMonths}{' '}
											{t('results.months')}
										</div>
									</div>
								</div>
							</div>

							{/* Download Button */}
							<button
								onClick={handleDownloadCSV}
								className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center'
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

			{/* Deposit Schedule Table */}
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
										{t('results.table.startAmount')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.interestEarned')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.addition')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.withdrawal')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.endAmount')}
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{result.depositSchedule
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
												{formatDepositCurrency(
													item.startAmount,
													formData.currency || 'RUB'
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatDepositCurrency(
													item.interestEarned,
													formData.currency || 'RUB'
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatDepositCurrency(
													item.addition,
													formData.currency || 'RUB'
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatDepositCurrency(
													item.withdrawal,
													formData.currency || 'RUB'
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatDepositCurrency(
													item.endAmount,
													formData.currency || 'RUB'
												)}
											</td>
										</tr>
									))}
								{result.depositSchedule.length > 12 && (
									<tr className='bg-gray-50'>
										<td
											colSpan={6}
											className='px-6 py-4 text-center text-sm text-gray-500'
										>
											...{' '}
											{result.depositSchedule.length - 12}{' '}
											{t('results.table.moreMonths')}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* SEO Content - only show if seo.title exists */}
			{(() => {
				try {
					t('seo.title');
					return (
						<div className='mt-12 bg-gray-50 rounded-lg p-8'>
							<div className='max-w-4xl mx-auto'>
								<h2 className='text-2xl font-bold text-gray-900 mb-6'>
									{t('seo.title')}
								</h2>

								<div className='prose prose-lg max-w-none text-gray-700 space-y-6'>
									{(() => {
										try {
											t('seo.overview.title');
											return (
												<div>
													<h3 className='text-xl font-semibold text-gray-900 mb-3'>
														{t(
															'seo.overview.title'
														)}
													</h3>
													<p className='mb-4'>
														{t(
															'seo.overview.content'
														)}
													</p>
												</div>
											);
										} catch {
											return null;
										}
									})()}

									{(() => {
										try {
											t('seo.types.title');
											return (
												<div>
													<h3 className='text-xl font-semibold text-gray-900 mb-3'>
														{t('seo.types.title')}
													</h3>
													<p className='mb-4'>
														{t('seo.types.content')}
													</p>
													<ul className='list-disc list-inside space-y-2 ml-4'>
														<li>
															{t(
																'seo.types.simple'
															)}
														</li>
														<li>
															{t(
																'seo.types.capitalized'
															)}
														</li>
														<li>
															{t(
																'seo.types.compound'
															)}
														</li>
													</ul>
												</div>
											);
										} catch {
											return null;
										}
									})()}

									{(() => {
										try {
											t('seo.advantages.title');
											return (
												<div>
													<h3 className='text-xl font-semibold text-gray-900 mb-3'>
														{t(
															'seo.advantages.title'
														)}
													</h3>
													<p className='mb-4'>
														{t(
															'seo.advantages.content'
														)}
													</p>
													<ul className='list-disc list-inside space-y-2 ml-4'>
														<li>
															{t(
																'seo.advantages.safety'
															)}
														</li>
														<li>
															{t(
																'seo.advantages.guaranteed'
															)}
														</li>
														<li>
															{t(
																'seo.advantages.liquidity'
															)}
														</li>
														<li>
															{t(
																'seo.advantages.tax'
															)}
														</li>
													</ul>
												</div>
											);
										} catch {
											return null;
										}
									})()}

									{(() => {
										try {
											t('seo.tips.title');
											return (
												<div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
													<h3 className='text-xl font-semibold text-blue-900 mb-3'>
														{t('seo.tips.title')}
													</h3>
													<p className='text-blue-800 mb-4'>
														{t('seo.tips.content')}
													</p>
													<ul className='list-disc list-inside space-y-2 ml-4 text-blue-800'>
														<li>
															{t(
																'seo.tips.compare'
															)}
														</li>
														<li>
															{t('seo.tips.term')}
														</li>
														<li>
															{t(
																'seo.tips.capitalization'
															)}
														</li>
														<li>
															{t(
																'seo.tips.early'
															)}
														</li>
													</ul>
												</div>
											);
										} catch {
											return null;
										}
									})()}
								</div>
							</div>
						</div>
					);
				} catch {
					return null;
				}
			})()}
		</div>
	);
}
