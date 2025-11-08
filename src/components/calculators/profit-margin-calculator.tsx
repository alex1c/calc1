'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	TrendingUp,
	Percent,
	DollarSign,
	BarChart3,
} from 'lucide-react';

interface ProfitMarginInput {
	calculationType: string;
	revenue: number;
	cost: number;
	profit: number;
	margin: number;
	markup: number;
}

interface ProfitMarginResult {
	grossMargin: number;
	profitMargin: number;
	markup: number;
	revenue: number;
	cost: number;
	profit: number;
	roi: number;
}

/**
 * Profit Margin Calculator Component
 * 
 * A React component for calculating profit margins, markups, and ROI.
 * 
 * Features:
 * - Multiple calculation types (margin, markup, revenue)
 * - Gross margin calculation
 * - Profit margin calculation
 * - Markup calculation
 * - ROI calculation
 * - Revenue and cost calculations
 * - Responsive design
 * 
 * Calculation types:
 * - Margin: Calculate margin from revenue and cost
 * - Markup: Calculate revenue from cost and markup percentage
 * - Revenue: Calculate revenue from cost and margin percentage
 * 
 * Uses inline calculation logic for business profitability analysis.
 */
export default function ProfitMarginCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.profit-margin');
	
	// Form state management
	const [input, setInput] = useState<ProfitMarginInput>({
		calculationType: 'margin', // Calculation type (margin, markup, revenue)
		revenue: 1000, // Revenue (₽)
		cost: 600, // Cost (₽)
		profit: 0, // Profit (₽)
		margin: 0, // Margin (%)
		markup: 0, // Markup (%)
	});
	const [result, setResult] = useState<ProfitMarginResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors

	const calculationTypes = t.raw('options.calculationTypes');

	/**
	 * Handle input field changes
	 * 
	 * Updates form input values when user changes values.
	 * Clears validation errors on change.
	 * 
	 * @param field - Field name to update
	 * @param value - New value (string or number)
	 */
	const handleInputChange = (
		field: keyof ProfitMarginInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value, // Update field value
		}));
		setErrors([]); // Clear errors on input change
	};

	/**
	 * Validate form inputs
	 * 
	 * Validates all form inputs based on calculation type.
	 * 
	 * @returns Array of validation error messages
	 */
	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (input.calculationType === 'margin') {
			if (!input.revenue || input.revenue <= 0) {
				validationErrors.push(t('form.errors.invalidRevenue'));
			}
			if (!input.cost || input.cost <= 0) {
				validationErrors.push(t('form.errors.invalidCost'));
			}
			if (input.cost >= input.revenue) {
				validationErrors.push(t('form.errors.invalidCost'));
			}
		} else if (input.calculationType === 'markup') {
			if (!input.cost || input.cost <= 0) {
				validationErrors.push(t('form.errors.invalidCost'));
			}
			if (!input.markup || input.markup < 0 || input.markup > 1000) {
				validationErrors.push(t('form.errors.marginRequired'));
			}
		} else if (input.calculationType === 'revenue') {
			if (!input.cost || input.cost <= 0) {
				validationErrors.push(t('form.errors.invalidCost'));
			}
			if (!input.margin || input.margin < 0 || input.margin >= 100) {
				validationErrors.push(t('form.errors.invalidMargin'));
			}
		}

		return validationErrors;
	};

	const calculateProfitMargin = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			let revenue = input.revenue;
			let cost = input.cost;
			let profit = 0;
			let grossMargin = 0;
			let markup = 0;

			if (input.calculationType === 'margin') {
				// Calculate from revenue and cost
				revenue = input.revenue;
				cost = input.cost;
				profit = revenue - cost;
				grossMargin = (profit / revenue) * 100;
				markup = cost > 0 ? (profit / cost) * 100 : 0;
			} else if (input.calculationType === 'markup') {
				// Calculate from cost and markup
				cost = input.cost;
				markup = input.markup;
				profit = (cost * markup) / 100;
				revenue = cost + profit;
				grossMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
			} else if (input.calculationType === 'revenue') {
				// Calculate from cost and margin
				cost = input.cost;
				grossMargin = input.margin;
				revenue = cost / (1 - grossMargin / 100);
				profit = revenue - cost;
				markup = cost > 0 ? (profit / cost) * 100 : 0;
			}

			const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
			const roi = revenue > 0 ? (profit / revenue) * 100 : 0;

			setResult({
				grossMargin,
				profitMargin,
				markup,
				revenue,
				cost,
				profit,
				roi,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			calculationType: 'margin',
			revenue: 1000,
			cost: 600,
			profit: 0,
			margin: 0,
			markup: 0,
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
						{/* Calculation Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.calculationType')}
							</label>
							<select
								value={input.calculationType}
								onChange={(e) =>
									handleInputChange('calculationType', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(calculationTypes).map(
									([key, value]: [string, any]) => (
										<option key={key} value={key}>
											{value.label} - {value.description}
										</option>
									)
								)}
							</select>
						</div>

						{/* Revenue Input (for margin calculation) */}
						{input.calculationType === 'margin' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.revenue')}
								</label>
								<input
									type='number'
									step='1'
									value={input.revenue || ''}
									onChange={(e) =>
										handleInputChange(
											'revenue',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='1000'
								/>
							</div>
						)}

						{/* Cost Input */}
						{input.calculationType !== 'revenue' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.cost')}
								</label>
								<input
									type='number'
									step='1'
									value={input.cost || ''}
									onChange={(e) =>
										handleInputChange(
											'cost',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='600'
								/>
							</div>
						)}

						{/* Cost Input (for revenue calculation) */}
						{input.calculationType === 'revenue' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.cost')}
								</label>
								<input
									type='number'
									step='1'
									value={input.cost || ''}
									onChange={(e) =>
										handleInputChange(
											'cost',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='500'
								/>
							</div>
						)}

						{/* Margin Input (for revenue calculation) */}
						{input.calculationType === 'revenue' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.margin')}
								</label>
								<input
									type='number'
									step='0.1'
									min='0'
									max='99.9'
									value={input.margin || ''}
									onChange={(e) =>
										handleInputChange(
											'margin',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='30'
								/>
								<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
									Желаемая маржа в процентах
								</p>
							</div>
						)}

						{/* Markup Input (for markup calculation) */}
						{input.calculationType === 'markup' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.markup')}
								</label>
								<input
									type='number'
									step='0.1'
									min='0'
									max='1000'
									value={input.markup || ''}
									onChange={(e) =>
										handleInputChange(
											'markup',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='66.67'
								/>
								<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
									Наценка в процентах от себестоимости
								</p>
							</div>
						)}

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculateProfitMargin}
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
							{/* Gross Margin */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
									<Percent className='w-5 h-5 mr-2' />
									{t('results.grossMargin')}
								</h3>
								<div className='text-3xl font-bold text-green-900 dark:text-green-100'>
									{result.grossMargin.toFixed(2)}%
								</div>
							</div>

							{/* Revenue */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center'>
									<DollarSign className='w-5 h-5 mr-2' />
									{t('results.revenue')}
								</h3>
								<div className='text-2xl font-bold text-blue-900 dark:text-blue-100'>
									{result.revenue.toLocaleString('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0,
									})}
								</div>
							</div>

							{/* Cost */}
							<div className='bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center'>
									<Square className='w-5 h-5 mr-2' />
									{t('results.cost')}
								</h3>
								<div className='text-2xl font-bold text-orange-900 dark:text-orange-100'>
									{result.cost.toLocaleString('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0,
									})}
								</div>
							</div>

							{/* Profit */}
							<div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center'>
									<TrendingUp className='w-5 h-5 mr-2' />
									{t('results.profit')}
								</h3>
								<div className='text-2xl font-bold text-purple-900 dark:text-purple-100'>
									{result.profit.toLocaleString('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0,
									})}
								</div>
							</div>

							{/* Markup */}
							<div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center'>
									<BarChart3 className='w-5 h-5 mr-2' />
									{t('results.markup')}
								</h3>
								<div className='text-2xl font-bold text-yellow-900 dark:text-yellow-100'>
									{result.markup.toFixed(2)}%
								</div>
							</div>

							{/* ROI */}
							<div className='bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2 flex items-center'>
									<Percent className='w-5 h-5 mr-2' />
									{t('results.roi')}
								</h3>
								<div className='text-2xl font-bold text-indigo-900 dark:text-indigo-100'>
									{result.roi.toFixed(2)}%
								</div>
							</div>
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

