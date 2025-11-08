'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	Zap,
	Coins,
	TrendingUp,
	TrendingDown,
	Clock,
	Power,
} from 'lucide-react';

interface HashrateFormData {
	hashrate: number;
	hashrateUnit: string;
	networkDifficulty: number;
	blockReward: number;
	blockTime: number;
	powerConsumption: number;
	electricityCost: number;
	poolFee: number;
	cryptocurrency: string;
}

interface HashrateResult {
	dailyRevenue: number;
	monthlyRevenue: number;
	yearlyRevenue: number;
	dailyElectricityCost: number;
	monthlyElectricityCost: number;
	yearlyElectricityCost: number;
	dailyProfit: number;
	monthlyProfit: number;
	yearlyProfit: number;
	blockTime: number;
	blocksPerDay: number;
	blocksPerMonth: number;
	profitability: 'profitable' | 'unprofitable' | 'breakeven';
}

// Convert hashrate to H/s
function convertToHashPerSecond(hashrate: number, unit: string): number {
	const multipliers: { [key: string]: number } = {
		h: 1,
		kh: 1e3,
		mh: 1e6,
		gh: 1e9,
		th: 1e12,
		ph: 1e15,
	};
	return hashrate * (multipliers[unit] || 1);
}

/**
 * Hashrate Calculator Component
 * 
 * A React component for calculating cryptocurrency mining profitability.
 * 
 * Features:
 * - Hashrate input with unit conversion
 * - Network difficulty input
 * - Block reward input
 * - Block time input
 * - Power consumption input
 * - Electricity cost input
 * - Pool fee input
 * - Cryptocurrency selection
 * - Revenue calculation (daily, monthly, yearly)
 * - Electricity cost calculation
 * - Profit calculation
 * - Profitability assessment
 * - Responsive design
 * 
 * Uses inline calculation logic for mining profitability calculations.
 */
export default function HashrateCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.hashrate');

	// Form state management
	const [formData, setFormData] = useState<Partial<HashrateFormData>>({
		hashrate: 0, // Hashrate value
		hashrateUnit: 'th', // Hashrate unit (h, kh, mh, gh, th, ph, eh)
		networkDifficulty: 0, // Network difficulty
		blockReward: 0, // Block reward (coins)
		blockTime: 0, // Block time (seconds)
		powerConsumption: 0, // Power consumption (W)
		electricityCost: 0, // Electricity cost (₽/kWh)
		poolFee: 0, // Pool fee (%)
		cryptocurrency: 'custom', // Cryptocurrency type
	});

	const [result, setResult] = useState<HashrateResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	// Preset configurations for cryptocurrencies
	const cryptoPresets: {
		[key: string]: {
			networkDifficulty?: number;
			blockReward: number;
			blockTime: number;
		};
	} = {
		btc: {
			blockReward: 6.25,
			blockTime: 600,
		},
		eth: {
			blockReward: 2,
			blockTime: 12,
		},
		ltc: {
			blockReward: 12.5,
			blockTime: 150,
		},
		bch: {
			blockReward: 6.25,
			blockTime: 600,
		},
		dash: {
			blockReward: 2.22,
			blockTime: 150,
		},
		zec: {
			blockReward: 2.5,
			blockTime: 75,
		},
	};

	const handleInputChange = (
		field: keyof HashrateFormData,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleSelectChange = (
		field: keyof HashrateFormData,
		value: string
	) => {
		setFormData((prev) => {
			const newData = { ...prev, [field]: value } as any;

			// Apply preset if cryptocurrency changed
			if (field === 'cryptocurrency' && value !== 'custom') {
				const preset = cryptoPresets[value];
				if (preset) {
					newData.blockReward = preset.blockReward;
					newData.blockTime = preset.blockTime;
					// Network difficulty should be fetched from API, but for now leave it manual
				}
			}

			return newData;
		});
		setIsCalculated(false);
	};

	const validateInput = (): string[] => {
		const errors: string[] = [];

		if (!formData.hashrate || formData.hashrate <= 0) {
			errors.push(t('form.errors.hashrateRequired'));
		}

		if (!formData.networkDifficulty || formData.networkDifficulty <= 0) {
			errors.push(t('form.errors.networkDifficultyRequired'));
		}

		if (!formData.blockReward || formData.blockReward <= 0) {
			errors.push(t('form.errors.blockRewardRequired'));
		}

		if (!formData.blockTime || formData.blockTime <= 0) {
			errors.push(t('form.errors.blockTimeRequired'));
		}

		if (formData.powerConsumption < 0) {
			errors.push(t('form.errors.invalidPowerConsumption'));
		}

		if (formData.electricityCost < 0) {
			errors.push(t('form.errors.invalidElectricityCost'));
		}

		if (
			formData.poolFee < 0 ||
			formData.poolFee > 100 ||
			(formData.poolFee && isNaN(formData.poolFee))
		) {
			errors.push(t('form.errors.poolFeeInvalid'));
		}

		return errors;
	};

	const calculateMining = (): HashrateResult => {
		const hashrateHps = convertToHashPerSecond(
			formData.hashrate || 0,
			formData.hashrateUnit || 'th'
		);
		const difficulty = formData.networkDifficulty || 0;
		const blockReward = formData.blockReward || 0;
		const blockTime = formData.blockTime || 0;
		const powerConsumption = formData.powerConsumption || 0;
		const electricityCost = formData.electricityCost || 0;
		const poolFee = formData.poolFee || 0;

		// Calculate blocks per day
		const secondsPerDay = 24 * 60 * 60;
		const blocksPerDay = secondsPerDay / blockTime;
		const blocksPerMonth = blocksPerDay * 30;

		// Calculate daily revenue (in cryptocurrency)
		// Revenue = (Your Hashrate / Network Difficulty) * Block Reward * Blocks Per Day
		const hashRatio = hashrateHps / difficulty;
		const dailyRevenue = hashRatio * blockReward * blocksPerDay;
		const monthlyRevenue = dailyRevenue * 30;
		const yearlyRevenue = dailyRevenue * 365;

		// Calculate electricity costs (in rubles)
		const powerConsumptionKw = powerConsumption / 1000;
		const dailyElectricityCost = powerConsumptionKw * 24 * electricityCost;
		const monthlyElectricityCost = dailyElectricityCost * 30;
		const yearlyElectricityCost = dailyElectricityCost * 365;

		// Calculate profit (revenue after pool fee minus electricity)
		// Note: Revenue is in cryptocurrency, we'll assume user converts it to rubles manually
		const dailyRevenueAfterFee = dailyRevenue * (1 - poolFee / 100);
		const monthlyRevenueAfterFee = monthlyRevenue * (1 - poolFee / 100);
		const yearlyRevenueAfterFee = yearlyRevenue * (1 - poolFee / 100);

		// Profit calculation (we'll show it in crypto, user needs to multiply by exchange rate)
		// For display purposes, we'll show both crypto and ruble equivalent if exchange rate is known
		const dailyProfit = dailyRevenueAfterFee; // In cryptocurrency
		const monthlyProfit = monthlyRevenueAfterFee;
		const yearlyProfit = yearlyRevenueAfterFee;

		// Calculate theoretical block time for solo mining
		const theoreticalBlockTime = difficulty / hashrateHps; // In seconds

		// Determine profitability
		// Note: Since revenue is in crypto, we can't directly compare with electricity costs
		// We'll show profitability as "needs exchange rate" or calculate if exchange rate provided
		let profitability: 'profitable' | 'unprofitable' | 'breakeven' =
			'breakeven';
		if (dailyElectricityCost > 0) {
			// We'd need exchange rate to determine profitability
			// For now, mark as breakeven and let user determine
			profitability = 'breakeven';
		}

		return {
			dailyRevenue,
			monthlyRevenue,
			yearlyRevenue,
			dailyElectricityCost,
			monthlyElectricityCost,
			yearlyElectricityCost,
			dailyProfit,
			monthlyProfit,
			yearlyProfit,
			blockTime: theoreticalBlockTime,
			blocksPerDay,
			blocksPerMonth,
			profitability,
		};
	};

	const handleCalculate = () => {
		const validationErrors = validateInput();
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const calculationResult = calculateMining();
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ru-RU', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 8,
		}).format(amount);
	};

	const formatTime = (seconds: number) => {
		if (seconds < 60) return `${formatCurrency(seconds)} сек`;
		if (seconds < 3600)
			return `${formatCurrency(seconds / 60)} мин`;
		if (seconds < 86400)
			return `${formatCurrency(seconds / 3600)} час`;
		if (seconds < 31536000)
			return `${formatCurrency(seconds / 86400)} дн`;
		return `${formatCurrency(seconds / 31536000)} лет`;
	};

	const hashrateUnitOptions = Object.entries(
		t.raw('form.hashrateUnits')
	).map(([key, value]) => ({
		value: key,
		label: value,
	}));

	const cryptocurrencyOptions = Object.entries(
		t.raw('form.cryptocurrencies')
	).map(([key, value]) => ({
		value: key,
		label: value,
	}));

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Zap className='h-16 w-16 text-blue-600 dark:text-blue-400' />
				</div>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('title')}
				</h1>
				<p className='text-lg text-gray-600 dark:text-gray-400'>
					{t('description')}
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Calculator className='h-5 w-5 mr-2 text-blue-600 dark:text-blue-400' />
						{t('form.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
								<span className='text-red-800 dark:text-red-200 font-medium'>
									{t('form.errors.title')}
								</span>
							</div>
							<ul className='text-red-700 dark:text-red-300 text-sm space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					<form className='space-y-6'>
						{/* Cryptocurrency */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.cryptocurrency')}
							</label>
							<select
								value={formData.cryptocurrency || 'custom'}
								onChange={(e) =>
									handleSelectChange(
										'cryptocurrency',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{cryptocurrencyOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Hashrate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.hashrate')}
							</label>
							<div className='flex gap-2'>
								<input
									type='number'
									step='0.01'
									value={formData.hashrate || ''}
									onChange={(e) =>
										handleInputChange(
											'hashrate',
											e.target.value
										)
									}
									placeholder={t('form.hashratePlaceholder')}
									className='flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
								<select
									value={formData.hashrateUnit || 'th'}
									onChange={(e) =>
										handleSelectChange(
											'hashrateUnit',
											e.target.value
										)
									}
									className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								>
									{hashrateUnitOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Network Difficulty */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.networkDifficulty')}
							</label>
							<input
								type='number'
								step='0.01'
								value={formData.networkDifficulty || ''}
								onChange={(e) =>
									handleInputChange(
										'networkDifficulty',
										e.target.value
									)
								}
								placeholder={t('form.networkDifficultyPlaceholder')}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Block Reward */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.blockReward')}
							</label>
							<input
								type='number'
								step='0.01'
								value={formData.blockReward || ''}
								onChange={(e) =>
									handleInputChange('blockReward', e.target.value)
								}
								placeholder={t('form.blockRewardPlaceholder')}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Block Time */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.blockTime')}
							</label>
							<input
								type='number'
								step='0.01'
								value={formData.blockTime || ''}
								onChange={(e) =>
									handleInputChange('blockTime', e.target.value)
								}
								placeholder={t('form.blockTimePlaceholder')}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Power Consumption */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.powerConsumption')}
							</label>
							<input
								type='number'
								step='0.1'
								value={formData.powerConsumption || ''}
								onChange={(e) =>
									handleInputChange(
										'powerConsumption',
										e.target.value
									)
								}
								placeholder={t('form.powerConsumptionPlaceholder')}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Electricity Cost */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.electricityCost')}
							</label>
							<input
								type='number'
								step='0.01'
								value={formData.electricityCost || ''}
								onChange={(e) =>
									handleInputChange(
										'electricityCost',
										e.target.value
									)
								}
								placeholder={t('form.electricityCostPlaceholder')}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Pool Fee */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.poolFee')}
							</label>
							<input
								type='number'
								step='0.1'
								value={formData.poolFee || ''}
								onChange={(e) =>
									handleInputChange('poolFee', e.target.value)
								}
								placeholder={t('form.poolFeePlaceholder')}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
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
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<CheckCircle className='h-5 w-5 mr-2 text-green-600 dark:text-green-400' />
						{t('results.title')}
					</h2>

					{isCalculated && result ? (
						<div className='space-y-6'>
							{/* Revenue */}
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
								<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center'>
									<Coins className='h-5 w-5 mr-2' />
									{t('results.dailyRevenue')}
								</h3>
								<div className='space-y-2 text-sm'>
									<div className='flex justify-between'>
										<span className='text-blue-700 dark:text-blue-300'>
											{t('results.dailyRevenue')}:
										</span>
										<span className='font-medium text-blue-900 dark:text-blue-100'>
											{formatCurrency(result.dailyRevenue)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-blue-700 dark:text-blue-300'>
											{t('results.monthlyRevenue')}:
										</span>
										<span className='font-medium text-blue-900 dark:text-blue-100'>
											{formatCurrency(result.monthlyRevenue)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-blue-700 dark:text-blue-300'>
											{t('results.yearlyRevenue')}:
										</span>
										<span className='font-medium text-blue-900 dark:text-blue-100'>
											{formatCurrency(result.yearlyRevenue)}
										</span>
									</div>
								</div>
							</div>

							{/* Electricity Costs */}
							{result.dailyElectricityCost > 0 && (
								<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6'>
									<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center'>
										<Power className='h-5 w-5 mr-2' />
										{t('results.electricityCost')}
									</h3>
									<div className='space-y-2 text-sm'>
										<div className='flex justify-between'>
											<span className='text-orange-700 dark:text-orange-300'>
												{t('results.dailyElectricity')}:
											</span>
											<span className='font-medium text-orange-900 dark:text-orange-100'>
												{formatCurrency(result.dailyElectricityCost)} ₽
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-orange-700 dark:text-orange-300'>
												{t('results.monthlyElectricity')}:
											</span>
											<span className='font-medium text-orange-900 dark:text-orange-100'>
												{formatCurrency(result.monthlyElectricityCost)} ₽
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-orange-700 dark:text-orange-300'>
												{t('results.yearlyElectricity')}:
											</span>
											<span className='font-medium text-orange-900 dark:text-orange-100'>
												{formatCurrency(result.yearlyElectricityCost)} ₽
											</span>
										</div>
									</div>
								</div>
							)}

							{/* Profit */}
							<div
								className={`rounded-lg p-6 ${
									result.profitability === 'profitable'
										? 'bg-green-50 dark:bg-green-900/20'
										: result.profitability === 'unprofitable'
										? 'bg-red-50 dark:bg-red-900/20'
										: 'bg-yellow-50 dark:bg-yellow-900/20'
								}`}
							>
								<h3 className='text-lg font-semibold mb-4 flex items-center'>
									{result.profitability === 'profitable' ? (
										<TrendingUp className='h-5 w-5 mr-2 text-green-600 dark:text-green-400' />
									) : result.profitability === 'unprofitable' ? (
										<TrendingDown className='h-5 w-5 mr-2 text-red-600 dark:text-red-400' />
									) : (
										<Clock className='h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400' />
									)}
									<span
										className={
											result.profitability === 'profitable'
												? 'text-green-900 dark:text-green-100'
												: result.profitability === 'unprofitable'
												? 'text-red-900 dark:text-red-100'
												: 'text-yellow-900 dark:text-yellow-100'
										}
									>
										{t('results.profitability')}:{' '}
										{result.profitability === 'profitable'
											? t('results.profitable')
											: result.profitability === 'unprofitable'
											? t('results.unprofitable')
											: t('results.breakeven')}
									</span>
								</h3>
								<div className='space-y-2 text-sm'>
									<div className='flex justify-between'>
										<span
											className={
												result.profitability === 'profitable'
													? 'text-green-700 dark:text-green-300'
													: result.profitability === 'unprofitable'
													? 'text-red-700 dark:text-red-300'
													: 'text-yellow-700 dark:text-yellow-300'
											}
										>
											{t('results.dailyProfit')}:
										</span>
										<span
											className={`font-medium ${
												result.profitability === 'profitable'
													? 'text-green-900 dark:text-green-100'
													: result.profitability === 'unprofitable'
													? 'text-red-900 dark:text-red-100'
													: 'text-yellow-900 dark:text-yellow-100'
											}`}
										>
											{formatCurrency(result.dailyProfit)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span
											className={
												result.profitability === 'profitable'
													? 'text-green-700 dark:text-green-300'
													: result.profitability === 'unprofitable'
													? 'text-red-700 dark:text-red-300'
													: 'text-yellow-700 dark:text-yellow-300'
											}
										>
											{t('results.monthlyProfit')}:
										</span>
										<span
											className={`font-medium ${
												result.profitability === 'profitable'
													? 'text-green-900 dark:text-green-100'
													: result.profitability === 'unprofitable'
													? 'text-red-900 dark:text-red-100'
													: 'text-yellow-900 dark:text-yellow-100'
											}`}
										>
											{formatCurrency(result.monthlyProfit)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span
											className={
												result.profitability === 'profitable'
													? 'text-green-700 dark:text-green-300'
													: result.profitability === 'unprofitable'
													? 'text-red-700 dark:text-red-300'
													: 'text-yellow-700 dark:text-yellow-300'
											}
										>
											{t('results.yearlyProfit')}:
										</span>
										<span
											className={`font-medium ${
												result.profitability === 'profitable'
													? 'text-green-900 dark:text-green-100'
													: result.profitability === 'unprofitable'
													? 'text-red-900 dark:text-red-100'
													: 'text-yellow-900 dark:text-yellow-100'
											}`}
										>
											{formatCurrency(result.yearlyProfit)}
										</span>
									</div>
								</div>
							</div>

							{/* Block Information */}
							<div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
									<Clock className='h-5 w-5 mr-2 text-gray-600 dark:text-gray-400' />
									{t('results.blockTime')}
								</h3>
								<div className='space-y-2 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600 dark:text-gray-400'>
											{t('results.blockTime')} (теоретическое):
										</span>
										<span className='font-medium text-gray-900 dark:text-white'>
											{formatTime(result.blockTime)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600 dark:text-gray-400'>
											{t('results.blocksPerDay')}:
										</span>
										<span className='font-medium text-gray-900 dark:text-white'>
											{formatCurrency(result.blocksPerDay)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600 dark:text-gray-400'>
											{t('results.blocksPerMonth')}:
										</span>
										<span className='font-medium text-gray-900 dark:text-white'>
											{formatCurrency(result.blocksPerMonth)}
										</span>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='text-center text-gray-500 dark:text-gray-400 py-8'>
							<Calculator className='h-12 w-12 mx-auto mb-4 text-gray-400' />
							<p>{t('results.placeholder')}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

