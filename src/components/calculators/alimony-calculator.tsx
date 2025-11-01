'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	Users,
	Percent,
	DollarSign,
} from 'lucide-react';

interface AlimonyInput {
	calculationMethod: string;
	childrenCount: number;
	monthlyIncome: number;
	fixedAmount: number;
	livingWage: number;
	livingWageMultiplier: number;
	customPercentage?: number;
}

interface AlimonyResult {
	monthlyPayment: number;
	yearlyPayment: number;
	percentage: number;
	remainingIncome: number;
	perChild: number;
	total: number;
	method: string;
}

// Percentage rates by children count (according to Article 81 of Family Code)
const ALIMONY_PERCENTAGES: Record<number, number> = {
	1: 0.25, // 25% - 1/4
	2: 0.3333, // 33.33% - 1/3
	3: 0.5, // 50% - 1/2 (for 3 or more)
};

export default function AlimonyCalculator() {
	const t = useTranslations('calculators.alimony');
	const [input, setInput] = useState<AlimonyInput>({
		calculationMethod: 'percentage',
		childrenCount: 1,
		monthlyIncome: 50000,
		fixedAmount: 0,
		livingWage: 12000,
		livingWageMultiplier: 1.5,
		customPercentage: 25,
	});
	const [result, setResult] = useState<AlimonyResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const calculationMethods = t.raw('options.calculationMethods');

	const handleInputChange = (
		field: keyof AlimonyInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (!input.childrenCount || input.childrenCount < 1 || input.childrenCount > 10) {
			validationErrors.push(t('form.errors.invalidChildrenCount'));
		}

		if (input.calculationMethod === 'percentage' || input.calculationMethod === 'mixed') {
			if (!input.monthlyIncome || input.monthlyIncome <= 0) {
				validationErrors.push(t('form.errors.invalidIncome'));
			}
		}

		if (input.calculationMethod === 'fixed' || input.calculationMethod === 'mixed') {
			if (input.calculationMethod === 'fixed') {
				if (!input.fixedAmount || input.fixedAmount <= 0) {
					validationErrors.push(t('form.errors.invalidFixedAmount'));
				}
			} else {
				// Mixed - check living wage multiplier
				if (!input.livingWage || input.livingWage <= 0) {
					validationErrors.push(t('form.errors.invalidLivingWage'));
				}
			}
		}

		return validationErrors;
	};

	const calculateAlimony = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			let monthlyPayment = 0;
			let percentage = 0;
			let method = '';

			// Get percentage based on children count
			const standardPercentage =
				input.childrenCount >= 3
					? ALIMONY_PERCENTAGES[3]
					: ALIMONY_PERCENTAGES[input.childrenCount] || 0.25;

			if (input.calculationMethod === 'percentage') {
				// Percentage from income
				percentage = standardPercentage;
				monthlyPayment = input.monthlyIncome * percentage;
				method = 'percentage';
			} else if (input.calculationMethod === 'fixed') {
				// Fixed amount (from living wage or direct amount)
				if (input.fixedAmount > 0) {
					monthlyPayment = input.fixedAmount;
				} else {
					monthlyPayment = input.livingWage * input.livingWageMultiplier;
				}
				percentage = 0;
				method = 'fixed';
			} else if (input.calculationMethod === 'mixed') {
				// Mixed: percentage + fixed
				const percentagePart = input.monthlyIncome * (input.customPercentage || standardPercentage * 100) / 100;
				const fixedPart = input.livingWage * input.livingWageMultiplier;
				monthlyPayment = percentagePart + fixedPart;
				percentage = (input.customPercentage || standardPercentage * 100) / 100;
				method = 'mixed';
			}

			const yearlyPayment = monthlyPayment * 12;
			const perChild = monthlyPayment / input.childrenCount;
			const remainingIncome =
				input.monthlyIncome - (input.calculationMethod === 'fixed' ? 0 : monthlyPayment);

			setResult({
				monthlyPayment,
				yearlyPayment,
				percentage: percentage * 100,
				remainingIncome: Math.max(0, remainingIncome),
				perChild,
				total: monthlyPayment,
				method,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			calculationMethod: 'percentage',
			childrenCount: 1,
			monthlyIncome: 50000,
			fixedAmount: 0,
			livingWage: 12000,
			livingWageMultiplier: 1.5,
			customPercentage: 25,
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-6xl mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-4'>
					<Calculator className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400'>
					{t('description')}
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Square className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Calculation Method */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.calculationMethod')}
							</label>
							<select
								value={input.calculationMethod}
								onChange={(e) =>
									handleInputChange('calculationMethod', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(calculationMethods).map(
									([key, value]: [string, any]) => (
										<option key={key} value={key}>
											{value.label} - {value.description}
										</option>
									)
								)}
							</select>
						</div>

						{/* Children Count */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.childrenCount')}
							</label>
							<input
								type='number'
								min='1'
								max='10'
								value={input.childrenCount}
								onChange={(e) =>
									handleInputChange(
										'childrenCount',
										parseInt(e.target.value) || 1
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='1'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								{input.childrenCount === 1 && '25% от дохода (1/4)'}
								{input.childrenCount === 2 && '33% от дохода (1/3)'}
								{input.childrenCount >= 3 &&
									'50% от дохода (1/2) - максимум'}
							</p>
						</div>

						{/* Monthly Income */}
						{(input.calculationMethod === 'percentage' ||
							input.calculationMethod === 'mixed') && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.monthlyIncome')}
								</label>
								<input
									type='number'
									step='100'
									value={input.monthlyIncome || ''}
									onChange={(e) =>
										handleInputChange(
											'monthlyIncome',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='50000'
								/>
								<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
									Доход после удержания НДФЛ (13%)
								</p>
							</div>
						)}

						{/* Fixed Amount (direct) */}
						{input.calculationMethod === 'fixed' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.fixedAmount')}
								</label>
								<input
									type='number'
									step='100'
									value={input.fixedAmount || ''}
									onChange={(e) =>
										handleInputChange(
											'fixedAmount',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='18000'
								/>
								<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
									Или используйте прожиточный минимум ниже
								</p>
							</div>
						)}

						{/* Living Wage (for fixed amount) */}
						{(input.calculationMethod === 'fixed' ||
							input.calculationMethod === 'mixed') && (
							<>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.livingWage')}
									</label>
									<input
										type='number'
										step='100'
										value={input.livingWage}
										onChange={(e) =>
											handleInputChange(
												'livingWage',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='12000'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.livingWageMultiplier')}
									</label>
									<input
										type='number'
										step='0.1'
										min='0.1'
										max='10'
										value={input.livingWageMultiplier}
										onChange={(e) =>
											handleInputChange(
												'livingWageMultiplier',
												parseFloat(e.target.value) || 0
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='1.5'
									/>
									<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
										Результат: {(
											input.livingWage * input.livingWageMultiplier
										).toLocaleString('ru-RU')} ₽/мес
									</p>
								</div>
							</>
						)}

						{/* Custom Percentage (for mixed) */}
						{input.calculationMethod === 'mixed' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									Процент от дохода (для смешанного варианта)
								</label>
								<input
									type='number'
									step='1'
									min='0'
									max='50'
									value={input.customPercentage || 25}
									onChange={(e) =>
										handleInputChange(
											'customPercentage',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='25'
								/>
								<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
									Стандартный: {(
										(input.childrenCount >= 3
											? ALIMONY_PERCENTAGES[3]
											: ALIMONY_PERCENTAGES[input.childrenCount] || 0.25) *
										100
									).toFixed(1)}%
								</p>
							</div>
						)}

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculateAlimony}
								className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
							>
								{t('form.calculate')}
							</button>
							<button
								onClick={handleReset}
								className='flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
							>
								<RotateCcw className='h-4 w-4 inline mr-2' />
								{t('form.reset')}
							</button>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Package className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
						{t('results.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
								<h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
									{t('form.errors.title')}
								</h3>
							</div>
							<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					{/* Results Content */}
					{result ? (
						<div className='space-y-4'>
							{/* Total Payment */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
									<DollarSign className='w-5 h-5 mr-2' />
									{t('results.total')}
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-green-700 dark:text-green-300'>
											{t('results.monthlyPayment')}:
										</span>{' '}
										<strong className='text-green-900 dark:text-green-100 text-lg'>
											{result.monthlyPayment.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									<div>
										<span className='text-green-700 dark:text-green-300'>
											{t('results.yearlyPayment')}:
										</span>{' '}
										<strong className='text-green-900 dark:text-green-100'>
											{result.yearlyPayment.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									{result.percentage > 0 && (
										<div>
											<span className='text-green-700 dark:text-green-300'>
												{t('results.percentage')}:
											</span>{' '}
											<strong className='text-green-900 dark:text-green-100'>
												{result.percentage.toFixed(2)}%
											</strong>
										</div>
									)}
								</div>
							</div>

							{/* Per Child */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center'>
									<Users className='w-5 h-5 mr-2' />
									{t('results.perChild')}
								</h3>
								<div className='text-sm'>
									<span className='text-blue-700 dark:text-blue-300'>
										На одного ребёнка:
									</span>{' '}
									<strong className='text-blue-900 dark:text-blue-100 text-lg'>
										{result.perChild.toLocaleString('ru-RU', {
											style: 'currency',
											currency: 'RUB',
											minimumFractionDigits: 0,
										})}
									</strong>
								</div>
							</div>

							{/* Remaining Income */}
							{input.calculationMethod !== 'fixed' && result.remainingIncome > 0 && (
								<div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4'>
									<h3 className='text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center'>
										<Percent className='w-5 h-5 mr-2' />
										{t('results.remainingIncome')}
									</h3>
									<div className='text-sm'>
										<strong className='text-purple-900 dark:text-purple-100 text-lg'>
											{result.remainingIncome.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
								</div>
							)}
						</div>
					) : (
						<p className='text-gray-500 dark:text-gray-400'>
							{t('results.placeholder')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

