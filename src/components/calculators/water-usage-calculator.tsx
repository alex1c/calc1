'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Droplets, Calculator, RefreshCw, Copy, Download } from 'lucide-react';

interface WaterUsageResult {
	dailyUsage: number;
	monthlyUsage: number;
	yearlyUsage: number;
	hotWaterUsage: number;
	coldWaterUsage: number;
	costPerDay: number;
	costPerMonth: number;
	costPerYear: number;
	hotWaterCost: number;
	coldWaterCost: number;
	totalCost: number;
	scenario: string;
}

/**
 * Water Usage Calculator Component
 * 
 * A React component for calculating water consumption and costs.
 * 
 * Features:
 * - Scenario selection (residential, apartment, office, construction, commercial)
 * - Number of residents input
 * - Water price input (unified, hot, cold)
 * - Losses percentage input
 * - Consumption calculation (daily, monthly, yearly)
 * - Cost calculation (daily, monthly, yearly)
 * - Hot and cold water breakdown
 * - Copy results to clipboard
 * - PDF export
 * - Responsive design
 * 
 * Uses predefined water consumption norms based on scenario type.
 * Uses inline calculation logic for water consumption and costs.
 */
export default function WaterUsageCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.waterUsage');
	
	// Form state management
	const [scenario, setScenario] = useState<string>('residential'); // Usage scenario (residential, apartment, office, etc.)
	const [residents, setResidents] = useState<number>(1); // Number of residents
	const [waterPrice, setWaterPrice] = useState<number>(50); // Unified water price (₽/m³)
	const [hotWaterPrice, setHotWaterPrice] = useState<number>(80); // Hot water price (₽/m³)
	const [coldWaterPrice, setColdWaterPrice] = useState<number>(30); // Cold water price (₽/m³)
	const [losses, setLosses] = useState<number>(5); // Water losses percentage (%)
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [result, setResult] = useState<WaterUsageResult | null>(null); // Calculated result
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	const calculateWaterUsage = () => {
		setIsCalculating(true);

		// Нормы потребления воды в зависимости от сценария (литры на человека в день)
		const norms = {
			residential: 250, // Жилой дом
			apartment: 200, // Квартира
			office: 80, // Офис
			construction: 500, // Строительство
			commercial: 150, // Коммерческое помещение
		};

		const dailyPerPerson = norms[scenario as keyof typeof norms] || 200;
		const dailyUsage = residents * dailyPerPerson;
		const monthlyUsage = dailyUsage * 30;
		const yearlyUsage = dailyUsage * 365;

		// Учитываем потери и протечки
		const lossFactor = 1 + losses / 100;
		const adjustedDailyUsage = dailyUsage * lossFactor;
		const adjustedMonthlyUsage = monthlyUsage * lossFactor;
		const adjustedYearlyUsage = yearlyUsage * lossFactor;

		// Распределение между горячей и холодной водой
		const hotWaterRatio = scenario === 'construction' ? 0.3 : 0.4; // 30-40% горячей воды
		const coldWaterRatio = 1 - hotWaterRatio;

		const hotWaterUsage = adjustedDailyUsage * hotWaterRatio;
		const coldWaterUsage = adjustedDailyUsage * coldWaterRatio;

		// Расчёт стоимости
		const costPerDay = (adjustedDailyUsage / 1000) * waterPrice;
		const costPerMonth = (adjustedMonthlyUsage / 1000) * waterPrice;
		const costPerYear = (adjustedYearlyUsage / 1000) * waterPrice;

		const hotWaterCost = (hotWaterUsage / 1000) * hotWaterPrice;
		const coldWaterCost = (coldWaterUsage / 1000) * coldWaterPrice;
		const totalCost = hotWaterCost + coldWaterCost;

		setResult({
			dailyUsage: Math.round(adjustedDailyUsage),
			monthlyUsage: Math.round(adjustedMonthlyUsage),
			yearlyUsage: Math.round(adjustedYearlyUsage),
			hotWaterUsage: Math.round(hotWaterUsage),
			coldWaterUsage: Math.round(coldWaterUsage),
			costPerDay: Math.round(costPerDay * 100) / 100,
			costPerMonth: Math.round(costPerMonth * 100) / 100,
			costPerYear: Math.round(costPerYear * 100) / 100,
			hotWaterCost: Math.round(hotWaterCost * 100) / 100,
			coldWaterCost: Math.round(coldWaterCost * 100) / 100,
			totalCost: Math.round(totalCost * 100) / 100,
			scenario: t(`scenarios.${scenario}`),
		});

		setIsCalculating(false);
	};

	const resetCalculator = () => {
		setScenario('residential');
		setResidents(1);
		setWaterPrice(50);
		setHotWaterPrice(80);
		setColdWaterPrice(30);
		setLosses(5);
		setResult(null);
		setCopied(false);
	};

	const copyResults = () => {
		if (result) {
			const textToCopy =
				`${t('results.title')}\n` +
				`${t('results.dailyUsage')}: ${result.dailyUsage} л\n` +
				`${t('results.monthlyUsage')}: ${result.monthlyUsage} л\n` +
				`${t('results.yearlyUsage')}: ${result.yearlyUsage} л\n` +
				`${t('results.totalCost')}: ${result.totalCost} ₽\n` +
				`${t('results.scenario')}: ${result.scenario}`;

			navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<Droplets className='h-6 w-6 text-blue-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					<div>
						<label
							htmlFor='scenario'
							className='block text-base font-medium text-gray-700 mb-2'
						>
							{t('form.scenario')}
						</label>
						<select
							id='scenario'
							value={scenario}
							onChange={(e) => setScenario(e.target.value)}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
						>
							<option value='residential'>
								{t('scenarios.residential')}
							</option>
							<option value='apartment'>
								{t('scenarios.apartment')}
							</option>
							<option value='office'>
								{t('scenarios.office')}
							</option>
							<option value='construction'>
								{t('scenarios.construction')}
							</option>
							<option value='commercial'>
								{t('scenarios.commercial')}
							</option>
						</select>
					</div>

					<div>
						<label
							htmlFor='residents'
							className='block text-base font-medium text-gray-700 mb-2'
						>
							{t('form.residents')}
						</label>
						<input
							id='residents'
							type='number'
							value={residents}
							onChange={(e) =>
								setResidents(Number(e.target.value))
							}
							placeholder={t('form.residentsPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
					<div>
						<label
							htmlFor='hotWaterPrice'
							className='block text-base font-medium text-gray-700 mb-2'
						>
							{t('form.hotWaterPrice')}
						</label>
						<input
							id='hotWaterPrice'
							type='number'
							value={hotWaterPrice}
							onChange={(e) =>
								setHotWaterPrice(Number(e.target.value))
							}
							placeholder={t('form.hotWaterPricePlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
						/>
					</div>

					<div>
						<label
							htmlFor='coldWaterPrice'
							className='block text-base font-medium text-gray-700 mb-2'
						>
							{t('form.coldWaterPrice')}
						</label>
						<input
							id='coldWaterPrice'
							type='number'
							value={coldWaterPrice}
							onChange={(e) =>
								setColdWaterPrice(Number(e.target.value))
							}
							placeholder={t('form.coldWaterPricePlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
						/>
					</div>

					<div>
						<label
							htmlFor='losses'
							className='block text-base font-medium text-gray-700 mb-2'
						>
							{t('form.losses')}
						</label>
						<input
							id='losses'
							type='number'
							value={losses}
							onChange={(e) => setLosses(Number(e.target.value))}
							placeholder={t('form.lossesPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
						/>
					</div>
				</div>

				<div className='flex gap-4'>
					<button
						onClick={calculateWaterUsage}
						disabled={isCalculating}
						className='bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-base font-medium flex items-center gap-2 transition-colors'
					>
						{isCalculating ? (
							<>
								<RefreshCw className='h-4 w-4 animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calculator className='h-4 w-4' />
								{t('form.calculate')}
							</>
						)}
					</button>

					<button
						onClick={resetCalculator}
						className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-base font-medium flex items-center gap-2 transition-colors'
					>
						<RefreshCw className='h-4 w-4' />
						{t('form.reset')}
					</button>
				</div>
			</div>

			{result && (
				<div className='bg-white rounded-lg shadow-lg p-8'>
					<div className='flex items-center gap-2 mb-6'>
						<Droplets className='h-6 w-6 text-green-600' />
						<h2 className='text-2xl font-bold text-gray-900'>
							{t('results.title')}
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
						<div className='bg-blue-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-blue-900 mb-2'>
								{t('results.dailyUsage')}
							</h3>
							<p className='text-2xl font-bold text-blue-700'>
								{result.dailyUsage.toLocaleString()} л
							</p>
							<p className='text-sm text-blue-600 mt-1'>
								{t('results.costPerDay')}:{' '}
								{result.costPerDay.toFixed(2)} ₽
							</p>
						</div>

						<div className='bg-green-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-green-900 mb-2'>
								{t('results.monthlyUsage')}
							</h3>
							<p className='text-2xl font-bold text-green-700'>
								{result.monthlyUsage.toLocaleString()} л
							</p>
							<p className='text-sm text-green-600 mt-1'>
								{t('results.costPerMonth')}:{' '}
								{result.costPerMonth.toFixed(2)} ₽
							</p>
						</div>

						<div className='bg-purple-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-purple-900 mb-2'>
								{t('results.yearlyUsage')}
							</h3>
							<p className='text-2xl font-bold text-purple-700'>
								{result.yearlyUsage.toLocaleString()} л
							</p>
							<p className='text-sm text-purple-600 mt-1'>
								{t('results.costPerYear')}:{' '}
								{result.costPerYear.toFixed(2)} ₽
							</p>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div className='bg-orange-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-orange-900 mb-2'>
								{t('results.hotWater')}
							</h3>
							<p className='text-xl font-bold text-orange-700'>
								{result.hotWaterUsage.toLocaleString()} л
							</p>
							<p className='text-sm text-orange-600 mt-1'>
								{t('results.cost')}:{' '}
								{result.hotWaterCost.toFixed(2)} ₽
							</p>
						</div>

						<div className='bg-cyan-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-cyan-900 mb-2'>
								{t('results.coldWater')}
							</h3>
							<p className='text-xl font-bold text-cyan-700'>
								{result.coldWaterUsage.toLocaleString()} л
							</p>
							<p className='text-sm text-cyan-600 mt-1'>
								{t('results.cost')}:{' '}
								{result.coldWaterCost.toFixed(2)} ₽
							</p>
						</div>
					</div>

					<div className='mt-6 p-4 bg-gray-50 rounded-lg'>
						<h4 className='font-semibold text-gray-900 mb-2'>
							{t('results.summary')}
						</h4>
						<p className='text-gray-700 mb-4'>
							{t('results.summaryText', {
								residents,
								dailyUsage: result.dailyUsage,
								monthlyCost: result.costPerMonth.toFixed(2),
							})}
						</p>
						<div className='flex gap-4'>
							<button
								onClick={copyResults}
								className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors'
							>
								<Copy className='h-4 w-4' />
								{copied
									? t('results.copied')
									: t('results.copy')}
							</button>
							<button
								onClick={() => window.print()}
								className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors'
							>
								<Download className='h-4 w-4' />
								Печать
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
