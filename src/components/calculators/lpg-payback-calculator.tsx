'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	Fuel,
	TrendingUp,
	DollarSign,
	Calendar,
	BarChart3,
} from 'lucide-react';

interface LpgPaybackInput {
	installationCost: number;
	annualMileage: number;
	fuelConsumption: number;
	gasConsumption: number;
	gasolinePrice: number;
	gasPrice: number;
}

interface LpgPaybackResult {
	paybackPeriodMonths: number;
	paybackPeriodYears: number;
	annualSavings: number;
	monthlySavings: number;
	fuelCostPerKm: number;
	gasCostPerKm: number;
	fuelCostPerYear: number;
	gasCostPerYear: number;
	savingsAfterOneYear: number;
	savingsAfterTwoYears: number;
	savingsAfterThreeYears: number;
}

/**
 * LPG Payback Calculator Component
 * 
 * A React component for calculating LPG (liquefied petroleum gas) installation payback period.
 * 
 * Features:
 * - Installation cost input
 * - Annual mileage input
 * - Fuel consumption comparison (gasoline vs LPG)
 * - Price comparison (gasoline vs LPG)
 * - Payback period calculation (months/years)
 * - Annual and monthly savings calculation
 * - Cost per kilometer calculation
 * - Savings projection (1, 2, 3 years)
 * - Responsive design
 * 
 * Uses inline calculation logic for payback analysis.
 */
export default function LpgPaybackCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.lpg-payback');
	
	// Form state management
	const [input, setInput] = useState<LpgPaybackInput>({
		installationCost: 45000, // LPG installation cost (₽)
		annualMileage: 20000, // Annual mileage (km)
		fuelConsumption: 10, // Gasoline consumption (L/100km)
		gasConsumption: 12, // LPG consumption (L/100km)
		gasolinePrice: 55, // Gasoline price (₽/L)
		gasPrice: 35, // LPG price (₽/L)
	});
	const [result, setResult] = useState<LpgPaybackResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors

	const handleInputChange = (
		field: keyof LpgPaybackInput,
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

		if (!input.installationCost || input.installationCost <= 0) {
			validationErrors.push(t('form.errors.invalidInstallationCost'));
		}

		if (!input.annualMileage || input.annualMileage <= 0) {
			validationErrors.push(t('form.errors.invalidAnnualMileage'));
		}

		if (!input.fuelConsumption || input.fuelConsumption <= 0) {
			validationErrors.push(t('form.errors.invalidFuelConsumption'));
		}

		if (!input.gasConsumption || input.gasConsumption <= 0) {
			validationErrors.push(t('form.errors.invalidGasConsumption'));
		}

		if (!input.gasolinePrice || input.gasolinePrice <= 0) {
			validationErrors.push(t('form.errors.invalidGasolinePrice'));
		}

		if (!input.gasPrice || input.gasPrice <= 0) {
			validationErrors.push(t('form.errors.invalidGasPrice'));
		}

		return validationErrors;
	};

	const calculatePayback = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			// Calculate annual fuel costs
			const fuelCostPerYear =
				(input.annualMileage / 100) * input.fuelConsumption * input.gasolinePrice;
			const gasCostPerYear =
				(input.annualMileage / 100) * input.gasConsumption * input.gasPrice;

			// Calculate savings
			const annualSavings = fuelCostPerYear - gasCostPerYear;
			const monthlySavings = annualSavings / 12;

			// Calculate payback period
			const paybackPeriodMonths =
				annualSavings > 0
					? input.installationCost / monthlySavings
					: Infinity;
			const paybackPeriodYears = paybackPeriodMonths / 12;

			// Calculate cost per kilometer
			const fuelCostPerKm = (input.fuelConsumption / 100) * input.gasolinePrice;
			const gasCostPerKm = (input.gasConsumption / 100) * input.gasPrice;

			// Calculate savings over multiple years
			const savingsAfterOneYear = annualSavings - input.installationCost;
			const savingsAfterTwoYears = annualSavings * 2 - input.installationCost;
			const savingsAfterThreeYears = annualSavings * 3 - input.installationCost;

			setResult({
				paybackPeriodMonths,
				paybackPeriodYears,
				annualSavings,
				monthlySavings,
				fuelCostPerKm,
				gasCostPerKm,
				fuelCostPerYear,
				gasCostPerYear,
				savingsAfterOneYear,
				savingsAfterTwoYears,
				savingsAfterThreeYears,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			installationCost: 45000,
			annualMileage: 20000,
			fuelConsumption: 10,
			gasConsumption: 12,
			gasolinePrice: 55,
			gasPrice: 35,
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
						{/* Installation Cost */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.installationCost')}
							</label>
							<input
								type='number'
								step='1000'
								value={input.installationCost || ''}
								onChange={(e) =>
									handleInputChange(
										'installationCost',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='45000'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								ГБО 4-го поколения: 35000-50000 ₽, ГБО 5-го: 50000-80000 ₽
							</p>
						</div>

						{/* Annual Mileage */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.annualMileage')}
							</label>
							<input
								type='number'
								step='1000'
								value={input.annualMileage || ''}
								onChange={(e) =>
									handleInputChange(
										'annualMileage',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='20000'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Критически важный параметр для расчёта окупаемости
							</p>
						</div>

						{/* Fuel Consumption */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.fuelConsumption')}
							</label>
							<input
								type='number'
								step='0.1'
								value={input.fuelConsumption || ''}
								onChange={(e) =>
									handleInputChange(
										'fuelConsumption',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='10'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Расход бензина на 100 км (из паспорта автомобиля)
							</p>
						</div>

						{/* Gas Consumption */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.gasConsumption')}
							</label>
							<input
								type='number'
								step='0.1'
								value={input.gasConsumption || ''}
								onChange={(e) =>
									handleInputChange(
										'gasConsumption',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='12'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Обычно на 10-20% больше расхода бензина (например, 10 л → 11-12 л)
							</p>
						</div>

						{/* Gasoline Price */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.gasolinePrice')}
							</label>
							<input
								type='number'
								step='0.1'
								value={input.gasolinePrice || ''}
								onChange={(e) =>
									handleInputChange(
										'gasolinePrice',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='55'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Текущая цена бензина в вашем регионе
							</p>
						</div>

						{/* Gas Price */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.gasPrice')}
							</label>
							<input
								type='number'
								step='0.1'
								value={input.gasPrice || ''}
								onChange={(e) =>
									handleInputChange(
										'gasPrice',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='35'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Текущая цена газа в вашем регионе (обычно на 30-40% дешевле бензина)
							</p>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculatePayback}
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
							{/* Payback Period */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
									<Calendar className='w-5 h-5 mr-2' />
									{t('results.paybackPeriod')}
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-green-700 dark:text-green-300'>
											Срок окупаемости:
										</span>{' '}
										<strong className='text-green-900 dark:text-green-100 text-xl'>
											{result.paybackPeriodYears >= 1
												? `${result.paybackPeriodYears.toFixed(1)} года (${Math.round(result.paybackPeriodMonths)} месяцев)`
												: `${Math.round(result.paybackPeriodMonths)} месяцев`}
										</strong>
									</div>
									{result.paybackPeriodMonths === Infinity && (
										<p className='text-red-600 dark:text-red-400 text-xs'>
											⚠️ ГБО не окупится - расходы на газ выше или равны расходам на бензин
										</p>
									)}
								</div>
							</div>

							{/* Annual Savings */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center'>
									<TrendingUp className='w-5 h-5 mr-2' />
									Экономия
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-blue-700 dark:text-blue-300'>
											{t('results.annualSavings')}:
										</span>{' '}
										<strong className='text-blue-900 dark:text-blue-100 text-lg'>
											{result.annualSavings.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									<div>
										<span className='text-blue-700 dark:text-blue-300'>
											{t('results.monthlySavings')}:
										</span>{' '}
										<strong className='text-blue-900 dark:text-blue-100'>
											{result.monthlySavings.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
								</div>
							</div>

							{/* Cost Comparison */}
							<div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center'>
									<BarChart3 className='w-5 h-5 mr-2' />
									Сравнение стоимости
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-purple-700 dark:text-purple-300'>
											Бензин за год:
										</span>{' '}
										<strong className='text-purple-900 dark:text-purple-100'>
											{result.fuelCostPerYear.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									<div>
										<span className='text-purple-700 dark:text-purple-300'>
											Газ за год:
										</span>{' '}
										<strong className='text-purple-900 dark:text-purple-100'>
											{result.gasCostPerYear.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									<div className='mt-3 pt-3 border-t border-purple-200 dark:border-purple-700'>
										<span className='text-purple-700 dark:text-purple-300'>
											На 1 км (бензин):
										</span>{' '}
										<strong className='text-purple-900 dark:text-purple-100'>
											{result.fuelCostPerKm.toFixed(2)} ₽
										</strong>
									</div>
									<div>
										<span className='text-purple-700 dark:text-purple-300'>
											На 1 км (газ):
										</span>{' '}
										<strong className='text-purple-900 dark:text-purple-100'>
											{result.gasCostPerKm.toFixed(2)} ₽
										</strong>
									</div>
								</div>
							</div>

							{/* Savings Over Years */}
							<div className='bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center'>
									<DollarSign className='w-5 h-5 mr-2' />
									Экономия по годам
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-orange-700 dark:text-orange-300'>
											За 1 год:
										</span>{' '}
										<strong
											className={`text-lg ${
												result.savingsAfterOneYear >= 0
													? 'text-green-700 dark:text-green-300'
													: 'text-red-700 dark:text-red-300'
											}`}
										>
											{result.savingsAfterOneYear.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									<div>
										<span className='text-orange-700 dark:text-orange-300'>
											За 2 года:
										</span>{' '}
										<strong className='text-orange-900 dark:text-orange-100'>
											{result.savingsAfterTwoYears.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
									<div>
										<span className='text-orange-700 dark:text-orange-300'>
											За 3 года:
										</span>{' '}
										<strong className='text-orange-900 dark:text-orange-100'>
											{result.savingsAfterThreeYears.toLocaleString('ru-RU', {
												style: 'currency',
												currency: 'RUB',
												minimumFractionDigits: 0,
											})}
										</strong>
									</div>
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

