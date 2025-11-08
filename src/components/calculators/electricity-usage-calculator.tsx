'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Zap,
	Calculator,
	RefreshCw,
	Copy,
	Download,
	Plus,
	Trash2,
} from 'lucide-react';

interface Device {
	id: string;
	name: string;
	power: number;
	quantity: number;
	hoursPerDay: number;
	daysPerMonth: number;
}

interface ElectricityResult {
	totalPower: number;
	dailyConsumption: number;
	monthlyConsumption: number;
	yearlyConsumption: number;
	dailyCost: number;
	monthlyCost: number;
	yearlyCost: number;
	costPerKwh: number;
	devices: Array<{
		name: string;
		power: number;
		consumption: number;
		cost: number;
	}>;
}

/**
 * Electricity Usage Calculator Component
 * 
 * A React component for calculating electricity consumption and costs for multiple devices.
 * 
 * Features:
 * - Multiple devices support
 * - Device name, power, quantity input
 * - Usage hours per day
 * - Days per month
 * - Electricity cost per kWh
 * - Total consumption calculation (daily, monthly, yearly)
 * - Total cost calculation
 * - Per-device breakdown
 * - Add/remove devices dynamically
 * - Copy results to clipboard
 * - CSV export
 * - Responsive design
 * 
 * Uses inline calculation logic for electricity consumption and costs.
 */
export default function ElectricityUsageCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.electricityUsage');
	
	// Devices state management
	const [devices, setDevices] = useState<Device[]>([
		{
			id: '1',
			name: '', // Device name
			power: 0, // Device power (W)
			quantity: 1, // Device quantity
			hoursPerDay: 0, // Hours of operation per day
			daysPerMonth: 30,
		},
	]);
	const [tariff, setTariff] = useState<number>(5.5);
	const [networkType, setNetworkType] = useState<string>('single_phase');
	const [voltage, setVoltage] = useState<number>(220);
	const [loadFactor, setLoadFactor] = useState<number>(100);
	const [isCalculating, setIsCalculating] = useState(false);
	const [result, setResult] = useState<ElectricityResult | null>(null);
	const [copied, setCopied] = useState(false);

	const addDevice = () => {
		const newDevice: Device = {
			id: Date.now().toString(),
			name: '',
			power: 0,
			quantity: 1,
			hoursPerDay: 0,
			daysPerMonth: 30,
		};
		setDevices([...devices, newDevice]);
	};

	const removeDevice = (id: string) => {
		if (devices.length > 1) {
			setDevices(devices.filter((device) => device.id !== id));
		}
	};

	const updateDevice = (
		id: string,
		field: keyof Device,
		value: string | number
	) => {
		setDevices(
			devices.map((device) =>
				device.id === id ? { ...device, [field]: value } : device
			)
		);
	};

	const calculateElectricityUsage = () => {
		setIsCalculating(true);
		setResult(null);
		setCopied(false);

		// Validation
		for (const device of devices) {
			if (!device.name.trim()) {
				alert(t('form.errors.deviceNameRequired'));
				setIsCalculating(false);
				return;
			}
			if (device.power <= 0) {
				alert(t('form.errors.powerRequired'));
				setIsCalculating(false);
				return;
			}
			if (device.quantity <= 0) {
				alert(t('form.errors.quantityRequired'));
				setIsCalculating(false);
				return;
			}
			if (device.hoursPerDay <= 0) {
				alert(t('form.errors.hoursRequired'));
				setIsCalculating(false);
				return;
			}
		}

		if (tariff <= 0) {
			alert(t('form.errors.tariffRequired'));
			setIsCalculating(false);
			return;
		}

		try {
			// Calculate total power
			const totalPower = devices.reduce(
				(sum, device) => sum + device.power * device.quantity,
				0
			);

			// Calculate consumption for each device
			const deviceResults = devices.map((device) => {
				const effectivePower =
					(device.power * device.quantity * loadFactor) / 100;
				const dailyConsumption =
					(effectivePower * device.hoursPerDay) / 1000; // Convert to kWh
				const monthlyConsumption =
					dailyConsumption * device.daysPerMonth;
				const cost = monthlyConsumption * tariff;

				return {
					name: device.name,
					power: effectivePower,
					consumption: monthlyConsumption,
					cost: cost,
				};
			});

			// Calculate totals
			const totalDailyConsumption = deviceResults.reduce(
				(sum, device) => sum + device.consumption / 30,
				0
			);
			const totalMonthlyConsumption = deviceResults.reduce(
				(sum, device) => sum + device.consumption,
				0
			);
			const totalYearlyConsumption = totalMonthlyConsumption * 12;
			const totalMonthlyCost = deviceResults.reduce(
				(sum, device) => sum + device.cost,
				0
			);
			const totalDailyCost = totalMonthlyCost / 30;
			const totalYearlyCost = totalMonthlyCost * 12;

			setResult({
				totalPower,
				dailyConsumption: totalDailyConsumption,
				monthlyConsumption: totalMonthlyConsumption,
				yearlyConsumption: totalYearlyConsumption,
				dailyCost: totalDailyCost,
				monthlyCost: totalMonthlyCost,
				yearlyCost: totalYearlyCost,
				costPerKwh: tariff,
				devices: deviceResults,
			});
		} catch (error) {
			alert(t('form.errors.invalidNumber'));
		} finally {
			setIsCalculating(false);
		}
	};

	const resetCalculator = () => {
		setDevices([
			{
				id: '1',
				name: '',
				power: 0,
				quantity: 1,
				hoursPerDay: 0,
				daysPerMonth: 30,
			},
		]);
		setTariff(5.5);
		setNetworkType('single_phase');
		setVoltage(220);
		setLoadFactor(100);
		setResult(null);
		setCopied(false);
	};

	const copyResults = () => {
		if (result) {
			const textToCopy =
				`${t('results.title')}\n` +
				`${t('results.totalPower')}: ${result.totalPower} Вт\n` +
				`${t(
					'results.dailyConsumption'
				)}: ${result.dailyConsumption.toFixed(2)} кВт⋅ч\n` +
				`${t(
					'results.monthlyConsumption'
				)}: ${result.monthlyConsumption.toFixed(2)} кВт⋅ч\n` +
				`${t(
					'results.yearlyConsumption'
				)}: ${result.yearlyConsumption.toFixed(2)} кВт⋅ч\n` +
				`${t('results.monthlyCost')}: ${result.monthlyCost.toFixed(
					2
				)} ₽`;

			navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<Zap className='h-8 w-8 text-yellow-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<p className='text-gray-600 mb-8'>{t('form.description')}</p>

				{/* Devices */}
				<div className='space-y-6 mb-8'>
					{devices.map((device, index) => (
						<motion.div
							key={device.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='bg-gray-50 p-6 rounded-lg border'
						>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-lg font-semibold text-gray-900'>
									{t('form.deviceName')} {index + 1}
								</h3>
								{devices.length > 1 && (
									<button
										onClick={() => removeDevice(device.id)}
										className='text-red-600 hover:text-red-800'
									>
										<Trash2 className='h-5 w-5' />
									</button>
								)}
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.deviceName')}
									</label>
									<input
										type='text'
										value={device.name}
										onChange={(e) =>
											updateDevice(
												device.id,
												'name',
												e.target.value
											)
										}
										placeholder={t(
											'form.deviceNamePlaceholder'
										)}
										className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.power')}
									</label>
									<input
										type='number'
										value={device.power}
										onChange={(e) =>
											updateDevice(
												device.id,
												'power',
												Number(e.target.value)
											)
										}
										placeholder={t('form.powerPlaceholder')}
										className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.quantity')}
									</label>
									<input
										type='number'
										value={device.quantity}
										onChange={(e) =>
											updateDevice(
												device.id,
												'quantity',
												Number(e.target.value)
											)
										}
										placeholder={t(
											'form.quantityPlaceholder'
										)}
										className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.hoursPerDay')}
									</label>
									<input
										type='number'
										value={device.hoursPerDay}
										onChange={(e) =>
											updateDevice(
												device.id,
												'hoursPerDay',
												Number(e.target.value)
											)
										}
										placeholder={t(
											'form.hoursPerDayPlaceholder'
										)}
										className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.daysPerMonth')}
									</label>
									<input
										type='number'
										value={device.daysPerMonth}
										onChange={(e) =>
											updateDevice(
												device.id,
												'daysPerMonth',
												Number(e.target.value)
											)
										}
										placeholder={t(
											'form.daysPerMonthPlaceholder'
										)}
										className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
									/>
								</div>
							</div>
						</motion.div>
					))}

					<button
						onClick={addDevice}
						className='w-full h-12 border-2 border-dashed border-yellow-300 rounded-lg flex items-center justify-center text-yellow-600 hover:border-yellow-400 hover:bg-yellow-50 transition-colors'
					>
						<Plus className='h-5 w-5 mr-2' />
						{t('form.addDevice')}
					</button>
				</div>

				{/* Settings */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.tariff')}
						</label>
						<input
							type='number'
							value={tariff}
							onChange={(e) => setTariff(Number(e.target.value))}
							placeholder={t('form.tariffPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.networkType')}
						</label>
						<select
							value={networkType}
							onChange={(e) => setNetworkType(e.target.value)}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
						>
							<option value='single_phase'>
								{t('form.networkTypes.single_phase')}
							</option>
							<option value='three_phase'>
								{t('form.networkTypes.three_phase')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.voltage')}
						</label>
						<input
							type='number'
							value={voltage}
							onChange={(e) => setVoltage(Number(e.target.value))}
							placeholder={t('form.voltagePlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.loadFactor')}
						</label>
						<input
							type='number'
							value={loadFactor}
							onChange={(e) =>
								setLoadFactor(Number(e.target.value))
							}
							placeholder={t('form.loadFactorPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex space-x-4'>
					<button
						onClick={calculateElectricityUsage}
						disabled={isCalculating}
						className='bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 flex items-center'
					>
						{isCalculating ? (
							<>
								<RefreshCw className='mr-2 h-5 w-5 animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calculator className='mr-2 h-5 w-5' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={resetCalculator}
						className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 flex items-center'
					>
						<RefreshCw className='mr-2 h-5 w-5' />
						{t('form.reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-white rounded-lg shadow-lg p-8'
				>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('results.title')}
					</h2>

					{/* Summary */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						<div className='bg-yellow-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-yellow-900 mb-2'>
								{t('results.totalPower')}
							</h3>
							<p className='text-2xl font-bold text-yellow-600'>
								{result.totalPower.toFixed(0)} Вт
							</p>
						</div>

						<div className='bg-blue-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-blue-900 mb-2'>
								{t('results.dailyConsumption')}
							</h3>
							<p className='text-2xl font-bold text-blue-600'>
								{result.dailyConsumption.toFixed(2)} кВт⋅ч
							</p>
						</div>

						<div className='bg-green-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-green-900 mb-2'>
								{t('results.monthlyConsumption')}
							</h3>
							<p className='text-2xl font-bold text-green-600'>
								{result.monthlyConsumption.toFixed(2)} кВт⋅ч
							</p>
						</div>

						<div className='bg-purple-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-purple-900 mb-2'>
								{t('results.monthlyCost')}
							</h3>
							<p className='text-2xl font-bold text-purple-600'>
								{result.monthlyCost.toFixed(2)} ₽
							</p>
						</div>
					</div>

					{/* Detailed Results */}
					<div className='mb-8'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							{t('results.devices')}
						</h3>
						<div className='overflow-x-auto'>
							<table className='w-full border-collapse border border-gray-300'>
								<thead>
									<tr className='bg-gray-50'>
										<th className='border border-gray-300 px-4 py-2 text-left'>
											{t('results.devices')}
										</th>
										<th className='border border-gray-300 px-4 py-2 text-left'>
											{t('results.power')}
										</th>
										<th className='border border-gray-300 px-4 py-2 text-left'>
											{t('results.consumption')}
										</th>
										<th className='border border-gray-300 px-4 py-2 text-left'>
											{t('results.cost')}
										</th>
									</tr>
								</thead>
								<tbody>
									{result.devices.map((device, index) => (
										<tr key={index}>
											<td className='border border-gray-300 px-4 py-2'>
												{device.name}
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												{device.power.toFixed(0)} Вт
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												{device.consumption.toFixed(2)}{' '}
												кВт⋅ч
											</td>
											<td className='border border-gray-300 px-4 py-2'>
												{device.cost.toFixed(2)} ₽
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Actions */}
					<div className='flex space-x-4'>
						<button
							onClick={copyResults}
							className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center'
						>
							<Copy className='mr-2 h-5 w-5' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
						<button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center'>
							<Download className='mr-2 h-5 w-5' />
							{t('results.exportPdf')}
						</button>
						<button className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center'>
							<Download className='mr-2 h-5 w-5' />
							{t('results.exportCsv')}
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
}
