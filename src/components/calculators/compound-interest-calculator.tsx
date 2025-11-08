'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	TrendingUp,
	DollarSign,
	Percent,
	Calendar,
} from 'lucide-react';
import {
	calculateCompoundInterest,
	validateCompoundInterestInput,
	type CompoundInterestInput,
	type CompoundInterestResult,
} from '@/lib/calculators/compound-interest';

/**
 * Compound Interest Calculator Component
 * 
 * A React component for calculating compound interest with regular contributions.
 * 
 * Features:
 * - Principal amount input
 * - Monthly and annual contributions
 * - Variable interest rates
 * - Multiple compounding frequencies (daily, monthly, quarterly, annually)
 * - Term in years and months
 * - Detailed breakdown (total contributions, interest earned, final amount)
 * - Growth visualization
 * - Responsive design
 * 
 * Calculation:
 * - Compound interest formula: A = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
 * - Supports multiple compounding frequencies
 * - Accounts for regular contributions
 * 
 * Uses the compound interest calculation library from @/lib/calculators/compound-interest
 * for all mathematical operations.
 */
export default function CompoundInterestCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.compound-interest');

	// Form state management
	const [formData, setFormData] = useState<Partial<CompoundInterestInput>>({
		principal: 100000, // Initial principal amount (₽)
		monthlyContribution: 5000, // Monthly contribution (₽)
		annualContribution: 0, // Annual contribution (₽)
		interestRate: 12, // Annual interest rate (%)
		termYears: 5, // Term in years
		termMonths: 0, // Additional months
		compoundingFrequency: 'monthly', // Compounding frequency (daily, monthly, quarterly, annually)
	});

	const [result, setResult] = useState<CompoundInterestResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	/**
	 * Handle input field changes
	 * 
	 * Updates form input values when user changes values.
	 * Converts string values to numbers.
	 * Resets calculation status.
	 * 
	 * @param field - Field name to update
	 * @param value - New value (string or number)
	 */
	const handleInputChange = (
		field: keyof CompoundInterestInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value; // Convert to number
		setFormData((prev) => ({ ...prev, [field]: numValue })); // Update field value
		setIsCalculated(false); // Reset calculation status
	};

	/**
	 * Handle compounding frequency change
	 * 
	 * Updates compounding frequency setting.
	 * Resets calculation status.
	 * 
	 * @param value - Compounding frequency value
	 */
	const handleFrequencyChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			compoundingFrequency:
				value as CompoundInterestInput['compoundingFrequency'], // Update frequency
		}));
		setIsCalculated(false); // Reset calculation status
	};

	/**
	 * Handle calculation
	 * 
	 * Validates inputs and calculates compound interest.
	 * 
	 * Process:
	 * 1. Validate inputs using validateCompoundInterestInput
	 * 2. Build complete input object
	 * 3. Calculate compound interest using calculateCompoundInterest
	 * 4. Update result state
	 */
	const handleCalculate = () => {
		const validationErrors = validateCompoundInterestInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			setResult(null);
			setIsCalculated(false);
			return;
		}

		const input: CompoundInterestInput = {
			principal: formData.principal || 0,
			monthlyContribution: formData.monthlyContribution || 0,
			annualContribution: formData.annualContribution || 0,
			interestRate: formData.interestRate || 0,
			termYears: formData.termYears || 0,
			termMonths: formData.termMonths || 0,
			compoundingFrequency: formData.compoundingFrequency || 'monthly',
		};

		const calculationResult = calculateCompoundInterest(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	const formatNumber = (num: number) => {
		return new Intl.NumberFormat('ru-RU', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(num);
	};

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mb-8'>
			{/* Form Section */}
			<div className='mb-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-6 h-6 text-blue-600 dark:text-blue-400 mr-2' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('form.title')}
					</h2>
				</div>

				{/* Input Fields */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Principal */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<DollarSign className='inline w-4 h-4 mr-1' />
							{t('form.principal')}
						</label>
						<input
							type='number'
							value={formData.principal || ''}
							onChange={(e) =>
								handleInputChange('principal', e.target.value)
							}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='100000'
							min='0'
							step='1000'
						/>
					</div>

					{/* Interest Rate */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<Percent className='inline w-4 h-4 mr-1' />
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
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='12'
							min='0'
							max='100'
							step='0.1'
						/>
					</div>

					{/* Monthly Contribution */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.monthlyContribution')}
							<span className='text-xs text-gray-500 dark:text-gray-400 ml-2'>
								({t('form.optional')})
							</span>
						</label>
						<input
							type='number'
							value={formData.monthlyContribution || ''}
							onChange={(e) =>
								handleInputChange(
									'monthlyContribution',
									e.target.value
								)
							}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='5000'
							min='0'
							step='100'
						/>
					</div>

					{/* Annual Contribution */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.annualContribution')}
							<span className='text-xs text-gray-500 dark:text-gray-400 ml-2'>
								({t('form.optional')})
							</span>
						</label>
						<input
							type='number'
							value={formData.annualContribution || ''}
							onChange={(e) =>
								handleInputChange(
									'annualContribution',
									e.target.value
								)
							}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='0'
							min='0'
							step='1000'
						/>
					</div>

					{/* Term Years */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							<Calendar className='inline w-4 h-4 mr-1' />
							{t('form.termYears')}
						</label>
						<input
							type='number'
							value={formData.termYears || ''}
							onChange={(e) =>
								handleInputChange('termYears', e.target.value)
							}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='5'
							min='0'
							max='50'
						/>
					</div>

					{/* Term Months */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.termMonths')}
						</label>
						<input
							type='number'
							value={formData.termMonths || ''}
							onChange={(e) =>
								handleInputChange('termMonths', e.target.value)
							}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='0'
							min='0'
							max='11'
						/>
					</div>

					{/* Compounding Frequency */}
					<div className='md:col-span-2'>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('form.compoundingFrequency')}
						</label>
						<select
							value={formData.compoundingFrequency || 'monthly'}
							onChange={(e) =>
								handleFrequencyChange(e.target.value)
							}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{Object.entries(
								t.raw('form.compoundingFrequencies')
							).map(([key, value]) => (
								<option
									key={key}
									value={key}
								>
									{String(value)}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Calculate Button */}
				<button
					onClick={handleCalculate}
					className='mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center'
				>
					<Calculator className='w-5 h-5 mr-2' />
					{t('form.calculate')}
				</button>
			</div>

			{/* Errors */}
			{errors.length > 0 && (
				<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
					<div className='flex items-center mb-2'>
						<AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mr-2' />
						<h3 className='text-lg font-semibold text-red-800 dark:text-red-300'>
							{t('errors.title')}
						</h3>
					</div>
					<ul className='list-disc list-inside text-red-700 dark:text-red-400 space-y-1'>
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}

			{/* Results Section */}
			{result && isCalculated && (
				<div className='mt-8 space-y-6'>
					<div className='flex items-center mb-6'>
						<CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400 mr-2' />
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
							{t('results.title')}
						</h2>
					</div>

					{/* Summary Cards */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						<div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg'>
							<div className='text-sm opacity-90 mb-1'>
								{t('results.finalAmount')}
							</div>
							<div className='text-2xl font-bold'>
								{formatCurrency(result.finalAmount)}
							</div>
						</div>

						<div className='bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg'>
							<div className='text-sm opacity-90 mb-1'>
								{t('results.totalInterest')}
							</div>
							<div className='text-2xl font-bold'>
								{formatCurrency(result.totalInterest)}
							</div>
						</div>

						<div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg'>
							<div className='text-sm opacity-90 mb-1'>
								{t('results.totalContributions')}
							</div>
							<div className='text-2xl font-bold'>
								{formatCurrency(result.totalContributions)}
							</div>
						</div>

						<div className='bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg'>
							<div className='text-sm opacity-90 mb-1'>
								{t('results.effectiveAnnualRate')}
							</div>
							<div className='text-2xl font-bold'>
								{formatNumber(result.effectiveAnnualRate)}%
							</div>
						</div>
					</div>

					{/* Additional Info */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
							<div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
								{t('results.growthMultiplier')}
							</div>
							<div className='text-xl font-semibold text-gray-900 dark:text-white'>
								{formatNumber(result.growthMultiplier)}x
							</div>
						</div>

						<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
							<div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
								{t('results.simpleInterest')}
							</div>
							<div className='text-xl font-semibold text-gray-900 dark:text-white'>
								{formatCurrency(result.simpleInterest)}
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								{t('results.simpleInterestNote')}
							</div>
						</div>
					</div>

					{/* Schedule Table */}
					{result.schedule.length > 0 && (
						<div className='overflow-x-auto'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								{t('results.scheduleTitle')}
							</h3>
							<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
								<thead className='bg-gray-50 dark:bg-gray-700'>
									<tr>
										<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
											{t('results.schedule.period')}
										</th>
										<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
											{t('results.schedule.startBalance')}
										</th>
										<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
											{t('results.schedule.contribution')}
										</th>
										<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
											{t(
												'results.schedule.interestEarned'
											)}
										</th>
										<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
											{t('results.schedule.endBalance')}
										</th>
									</tr>
								</thead>
								<tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
									{result.schedule.map((item, index) => (
										<tr
											key={index}
											className='hover:bg-gray-50 dark:hover:bg-gray-700'
										>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
												{item.periodLabel}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white'>
												{formatCurrency(
													item.startBalance
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white'>
												{formatCurrency(
													item.contribution
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400'>
												+
												{formatCurrency(
													item.interestEarned
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-blue-600 dark:text-blue-400'>
												{formatCurrency(
													item.endBalance
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
