'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Download, Calculator, Zap, Layers } from 'lucide-react';
import {
	calculateConsumptionKWh,
	calculateCost,
	computeItemAggregation,
	toCSV,
	formatNumber,
} from '@/modules/calcElectricity';

interface DeviceRow {
	id: string;
	name: string;
	power: number;
	hoursPerDay: number;
	days: number;
	costPerKWh: number;
}

/**
 * Electricity Cost Calculator Component
 * 
 * A React component for calculating electricity costs for multiple devices.
 * 
 * Features:
 * - Multiple devices support
 * - Device name, power input
 * - Usage hours per day
 * - Days per period
 * - Cost per kWh input
 * - Total consumption calculation
 * - Total cost calculation
 * - Per-device breakdown
 * - Add/remove devices dynamically
 * - CSV export
 * - Responsive design
 * 
 * Uses the electricity calculation module from @/modules/calcElectricity
 * for all mathematical operations.
 */
export default function ElectricityCostCalculator() {
	// Internationalization hooks for translations
	const t = useTranslations('calculators.electricityCost');
	const locale = useLocale(); // Current locale for number formatting
	
	// Devices state management
	const [rows, setRows] = useState<DeviceRow[]>([
		{
			id: crypto.randomUUID(), // Unique device ID
			name: t('defaults.kettle'), // Device name
			power: 2000, // Device power (W)
			hoursPerDay: 0.5, // Hours of operation per day
			days: 30, // Days per period
			costPerKWh: 5.5, // Cost per kWh (₽)
		},
	]);

	const totals = useMemo(() => {
		let totalKWh = 0;
		let totalCost = 0;
		for (const r of rows) {
			const { periodKWh } = computeItemAggregation(r);
			totalKWh += periodKWh;
			totalCost += calculateCost(periodKWh, r.costPerKWh);
		}
		return { totalKWh, totalCost };
	}, [rows]);

	function updateRow(id: string, key: keyof DeviceRow, value: string) {
		setRows((prev) =>
			prev.map((r) =>
				r.id === id ? { ...r, [key]: parseFloat(value) || 0 } : r
			)
		);
	}

	function updateRowText(id: string, key: keyof DeviceRow, value: string) {
		setRows((prev) =>
			prev.map((r) =>
				r.id === id ? ({ ...r, [key]: value } as DeviceRow) : r
			)
		);
	}

	function addRow() {
		setRows((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				name: t('defaults.device'),
				power: 1000,
				hoursPerDay: 1,
				days: 30,
				costPerKWh: 5.5,
			},
		]);
	}

	function removeRow(id: string) {
		setRows((prev) => prev.filter((r) => r.id !== id));
	}

	function exportCSV() {
		const data = rows.map((r) => {
			const agg = computeItemAggregation(r);
			const consumption = agg.periodKWh;
			const cost = calculateCost(consumption, r.costPerKWh);
			return {
				[t('table.device')]: r.name,
				[t('table.powerW')]: r.power,
				[t('table.hoursPerDay')]: r.hoursPerDay,
				[t('table.days')]: r.days,
				[t('table.tariff')]: r.costPerKWh,
				[t('table.consumptionKWh')]: formatNumber(consumption, 2),
				[t('table.cost')]: formatNumber(cost, 2),
			};
		});
		const csv = toCSV(data);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'electricity-cost.csv';
		a.click();
		URL.revokeObjectURL(url);
	}

	return (
		<div className='max-w-5xl mx-auto space-y-6'>
			{/* Header */}
			<div className='flex items-center justify-center gap-2 text-2xl font-bold text-gray-800'>
				<Calculator className='h-7 w-7 text-blue-600' />
				<span>{t('title')}</span>
			</div>
			<p className='text-center text-gray-600'>{t('description')}</p>

			{/* Infographic */}
			<div className='flex justify-center gap-8 py-2'>
				<div className='text-center'>
					<div className='w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2'>
						<Zap className='h-6 w-6 text-yellow-600' />
					</div>
					<div className='text-sm font-medium text-gray-700'>
						{t('infographic.energy')}
					</div>
					<div className='text-xs text-gray-500'>
						{t('infographic.energyDescription')}
					</div>
				</div>
				<div className='text-center'>
					<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
						<Layers className='h-6 w-6 text-blue-600' />
					</div>
					<div className='text-sm font-medium text-gray-700'>
						{t('infographic.multi')}
					</div>
					<div className='text-xs text-gray-500'>
						{t('infographic.multiDescription')}
					</div>
				</div>
				<div className='text-center'>
					<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
						<Download className='h-6 w-6 text-green-600' />
					</div>
					<div className='text-sm font-medium text-gray-700'>
						{t('infographic.export')}
					</div>
					<div className='text-xs text-gray-500'>
						{t('infographic.exportDescription')}
					</div>
				</div>
			</div>

			{/* Table */}
			<div className='bg-white rounded-lg shadow p-4 overflow-x-auto'>
				<table className='w-full text-sm'>
					<thead>
						<tr className='text-left text-gray-600 border-b'>
							<th className='py-2 pr-3'>{t('table.device')}</th>
							<th className='py-2 pr-3'>{t('table.powerW')}</th>
							<th className='py-2 pr-3'>
								{t('table.hoursPerDay')}
							</th>
							<th className='py-2 pr-3'>{t('table.days')}</th>
							<th className='py-2 pr-3'>{t('table.tariff')}</th>
							<th className='py-2 pr-3'>{t('table.dayKWh')}</th>
							<th className='py-2 pr-3'>{t('table.monthKWh')}</th>
							<th className='py-2 pr-3'>
								{t('table.periodKWh')}
							</th>
							<th className='py-2 pr-3'>{t('table.cost')}</th>
							<th className='py-2'></th>
						</tr>
					</thead>
					<tbody>
						<AnimatePresence>
							{rows.map((row) => {
								const agg = computeItemAggregation(row);
								const periodCost = calculateCost(
									agg.periodKWh,
									row.costPerKWh
								);
								return (
									<motion.tr
										key={row.id}
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -8 }}
									>
										<td className='py-2 pr-3'>
											<input
												type='text'
												value={row.name}
												onChange={(e) =>
													updateRowText(
														row.id,
														'name',
														e.target.value
													)
												}
												className='w-40 md:w-48 border rounded px-2 py-1'
											/>
										</td>
										<td className='py-2 pr-3'>
											<input
												type='number'
												value={row.power}
												min={0}
												onChange={(e) =>
													updateRow(
														row.id,
														'power',
														e.target.value
													)
												}
												className='w-24 border rounded px-2 py-1'
											/>
										</td>
										<td className='py-2 pr-3'>
											<input
												type='number'
												step='0.1'
												value={row.hoursPerDay}
												min={0}
												onChange={(e) =>
													updateRow(
														row.id,
														'hoursPerDay',
														e.target.value
													)
												}
												className='w-24 border rounded px-2 py-1'
											/>
										</td>
										<td className='py-2 pr-3'>
											<input
												type='number'
												value={row.days}
												min={0}
												onChange={(e) =>
													updateRow(
														row.id,
														'days',
														e.target.value
													)
												}
												className='w-20 border rounded px-2 py-1'
											/>
										</td>
										<td className='py-2 pr-3'>
											<input
												type='number'
												step='0.01'
												value={row.costPerKWh}
												min={0}
												onChange={(e) =>
													updateRow(
														row.id,
														'costPerKWh',
														e.target.value
													)
												}
												className='w-24 border rounded px-2 py-1'
											/>
										</td>
										<td className='py-2 pr-3'>
											{formatNumber(agg.dayKWh)}
										</td>
										<td className='py-2 pr-3'>
											{formatNumber(agg.monthKWh)}
										</td>
										<td className='py-2 pr-3'>
											{formatNumber(agg.periodKWh)}
										</td>
										<td className='py-2 pr-3 font-medium'>
											{formatNumber(periodCost)}
										</td>
										<td className='py-2'>
											<button
												onClick={() =>
													removeRow(row.id)
												}
												className='p-1 rounded hover:bg-gray-100'
												aria-label={t('actions.remove')}
											>
												<Trash2 className='h-4 w-4 text-red-600' />
											</button>
										</td>
									</motion.tr>
								);
							})}
						</AnimatePresence>
					</tbody>
				</table>
				<div className='flex items-center gap-3 mt-4'>
					<button
						onClick={addRow}
						className='inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
					>
						<Plus className='h-4 w-4' />
						{t('actions.addDevice')}
					</button>
					<button
						onClick={exportCSV}
						className='inline-flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800'
					>
						<Download className='h-4 w-4' />
						{t('actions.exportCsv')}
					</button>
				</div>
			</div>

			{/* Totals */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className='bg-green-50 border border-green-200 rounded-lg p-4'
			>
				<h3 className='text-lg font-semibold text-green-900 mb-2'>
					{t('results.title')}
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div>
						<div className='text-sm text-green-800'>
							{t('results.totalConsumption')}
						</div>
						<div className='text-2xl font-bold text-green-900'>
							{formatNumber(totals.totalKWh)} kWh
						</div>
					</div>
					<div>
						<div className='text-sm text-green-800'>
							{t('results.totalCost')}
						</div>
						<div className='text-2xl font-bold text-green-900'>
							{formatNumber(totals.totalCost)}
						</div>
					</div>
					<div>
						<div className='text-sm text-green-800'>
							{t('results.note')}
						</div>
						<div className='text-sm text-green-700'>
							{t('results.noteText')}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
