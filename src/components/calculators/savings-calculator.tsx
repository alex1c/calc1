'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Download,
	AlertCircle,
	CheckCircle,
	PiggyBank,
} from 'lucide-react';
import {
	calculateSavings,
	validateSavingsInput,
	exportSavingsScheduleToCSV,
	formatSavingsCurrency,
	type SavingsInput,
	type SavingsResult,
} from '@/lib/calculators/savings';

export default function SavingsCalculator() {
	const t = useTranslations('calculators.savings');

	const [formData, setFormData] = useState<Partial<SavingsInput>>({
		targetAmount: 0,
		initialAmount: 0,
		termMonths: 0,
		monthlyContribution: 0,
		interestRate: 0,
		interestType: 'none',
	});

	const [result, setResult] = useState<SavingsResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const handleInputChange = (
		field: keyof SavingsInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleInterestTypeChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			interestType: value as 'simple' | 'compound' | 'none',
		}));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateSavingsInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: SavingsInput = {
			targetAmount: formData.targetAmount || undefined,
			initialAmount: formData.initialAmount || 0,
			termMonths: formData.termMonths || 0,
			monthlyContribution: formData.monthlyContribution || undefined,
			interestRate:
				formData.interestType === 'none'
					? 0
					: formData.interestRate || 0,
			interestType: formData.interestType || 'none',
		};

		const calculationResult = calculateSavings(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const handleDownloadCSV = () => {
		if (!result) return;

		const csv = exportSavingsScheduleToCSV(result.savingsSchedule);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'savings-schedule.csv';
		link.click();
		window.URL.revokeObjectURL(url);
	};

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<PiggyBank className='h-16 w-16 text-green-600' />
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
						{/* Target Amount */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.targetAmount')} ({t('form.optional')})
							</label>
							<input
								type='number'
								value={formData.targetAmount || ''}
								onChange={(e) =>
									handleInputChange(
										'targetAmount',
										e.target.value
									)
								}
								placeholder='1000000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>

						{/* Initial Amount */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.initialAmount')}
							</label>
							<input
								type='number'
								value={formData.initialAmount || ''}
								onChange={(e) =>
									handleInputChange(
										'initialAmount',
										e.target.value
									)
								}
								placeholder='0'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
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
									value={Math.floor(
										(formData.termMonths || 0) / 12
									)}
									onChange={(e) =>
										handleInputChange(
											'termMonths',
											parseInt(e.target.value) * 12
										)
									}
									placeholder='5'
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

						{/* Monthly Contribution */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.monthlyContribution')} (
								{t('form.optional')})
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
								placeholder='10000'
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

						{/* Interest Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-4'>
								{t('form.interestType')}
							</label>
							<div className='space-y-3'>
								<label className='flex items-center'>
									<input
										type='radio'
										name='interestType'
										value='none'
										checked={
											formData.interestType === 'none'
										}
										onChange={(e) =>
											handleInterestTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-green-600 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.interestTypes.none')}
									</span>
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='interestType'
										value='simple'
										checked={
											formData.interestType === 'simple'
										}
										onChange={(e) =>
											handleInterestTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-green-600 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.interestTypes.simple')}
									</span>
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='interestType'
										value='compound'
										checked={
											formData.interestType === 'compound'
										}
										onChange={(e) =>
											handleInterestTypeChange(
												e.target.value
											)
										}
										className='mr-3 text-green-600 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700'>
										{t('form.interestTypes.compound')}
									</span>
								</label>
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
											{formatSavingsCurrency(
												result.finalAmount
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.totalContributions')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{formatSavingsCurrency(
												result.totalContributions
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.totalInterest')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{formatSavingsCurrency(
												result.totalInterest
											)}
										</div>
									</div>
									<div>
										<span className='text-sm text-green-700'>
											{t('results.monthlyContribution')}:
										</span>
										<div className='text-xl font-bold text-green-900'>
											{formatSavingsCurrency(
												result.monthlyContribution
											)}
										</div>
									</div>
								</div>
								{result.achievementMonth && (
									<div className='mt-4 p-3 bg-blue-50 rounded-lg'>
										<p className='text-blue-800 text-sm'>
											{t('results.achievementMessage', {
												month: result.achievementMonth,
											})}
										</p>
									</div>
								)}
								{!result.achievable &&
									formData.targetAmount && (
										<div className='mt-4 p-3 bg-yellow-50 rounded-lg'>
											<p className='text-yellow-800 text-sm'>
												{t('results.notAchievable')}
											</p>
										</div>
									)}
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

			{/* Savings Schedule Table */}
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
										{t('results.table.contribution')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.interest')}
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										{t('results.table.endAmount')}
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{result.savingsSchedule
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
												{formatSavingsCurrency(
													item.startAmount
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatSavingsCurrency(
													item.contribution
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatSavingsCurrency(
													item.interest
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
												{formatSavingsCurrency(
													item.endAmount
												)}
											</td>
										</tr>
									))}
								{result.savingsSchedule.length > 12 && (
									<tr className='bg-gray-50'>
										<td
											colSpan={5}
											className='px-6 py-4 text-center text-sm text-gray-500'
										>
											...{' '}
											{result.savingsSchedule.length - 12}{' '}
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
								<li>{t('seo.advantages.goalSetting')}</li>
								<li>{t('seo.advantages.compoundInterest')}</li>
								<li>{t('seo.advantages.flexibility')}</li>
								<li>{t('seo.advantages.discipline')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.strategies.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.strategies.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.strategies.automation')}</li>
								<li>{t('seo.strategies.investment')}</li>
								<li>{t('seo.strategies.budgeting')}</li>
								<li>{t('seo.strategies.emergency')}</li>
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
								<li>{t('seo.tips.start')}</li>
								<li>{t('seo.tips.consistency')}</li>
								<li>{t('seo.tips.review')}</li>
								<li>{t('seo.tips.patience')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
