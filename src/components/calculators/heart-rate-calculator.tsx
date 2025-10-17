'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Heart,
	Activity,
	TrendingUp,
	AlertCircle,
	CheckCircle,
	Target,
	Zap,
} from 'lucide-react';
import {
	calculateHeartRate,
	validateHeartRateInput,
	HeartRateInput,
	HeartRateResult,
	getTrainingRecommendation,
} from '@/lib/calculators/heart-rate';

/**
 * Heart Rate Calculator Component
 * Interactive calculator for heart rate zones and training recommendations
 */
export default function HeartRateCalculator() {
	const t = useTranslations('calculators.heartRate');

	// State for input values
	const [age, setAge] = useState<string>('');
	const [currentHR, setCurrentHR] = useState<string>('');
	const [result, setResult] = useState<HeartRateResult | null>(null);
	const [error, setError] = useState<string>('');
	const [isCalculating, setIsCalculating] = useState<boolean>(false);

	/**
	 * Handle form submission and heart rate calculation
	 */
	const handleCalculate = async () => {
		setError('');
		setIsCalculating(true);

		try {
			const ageNum = parseInt(age);
			const currentHRNum = currentHR ? parseInt(currentHR) : undefined;

			// Validate input
			const validation = validateHeartRateInput(ageNum, currentHRNum);
			if (!validation.isValid) {
				setError(t(`form.errors.${validation.error}`));
				return;
			}

			// Calculate heart rate zones
			const heartRateResult = calculateHeartRate({
				age: ageNum,
				currentHR: currentHRNum,
			});

			setResult(heartRateResult);
		} catch (err) {
			setError(t('form.errors.calculationError'));
		} finally {
			setIsCalculating(false);
		}
	};

	/**
	 * Reset form and clear results
	 */
	const handleReset = () => {
		setAge('');
		setCurrentHR('');
		setResult(null);
		setError('');
	};

	/**
	 * Get color classes for heart rate zone
	 */
	const getZoneColor = (color: string) => {
		const colorMap = {
			blue: 'bg-blue-100 text-blue-800 border-blue-200',
			green: 'bg-green-100 text-green-800 border-green-200',
			yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
			orange: 'bg-orange-100 text-orange-800 border-orange-200',
			red: 'bg-red-100 text-red-800 border-red-200',
		};
		return (
			colorMap[color as keyof typeof colorMap] ||
			'bg-gray-100 text-gray-800 border-gray-200'
		);
	};

	/**
	 * Get progress bar color for heart rate zone
	 */
	const getProgressColor = (zoneIndex: number) => {
		const colors = [
			'bg-blue-500',
			'bg-green-500',
			'bg-yellow-500',
			'bg-orange-500',
			'bg-red-500',
		];
		return colors[zoneIndex] || 'bg-gray-500';
	};

	/**
	 * Get current zone if heart rate is provided
	 */
	const getCurrentZone = () => {
		if (!result || !currentHR) return null;

		const currentHRNum = parseInt(currentHR);
		const percentage = (currentHRNum / result.maxHR) * 100;

		if (percentage < 50) return { zone: 'below', percentage };
		if (percentage <= 60) return { zone: 'resting', percentage };
		if (percentage <= 70) return { zone: 'fatBurning', percentage };
		if (percentage <= 80) return { zone: 'aerobic', percentage };
		if (percentage <= 90) return { zone: 'anaerobic', percentage };
		if (percentage <= 100) return { zone: 'maximum', percentage };
		return { zone: 'above', percentage };
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Page Header with Infographic */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-red-100 dark:bg-red-900 rounded-full'>
							<Heart className='w-12 h-12 text-red-600 dark:text-red-400' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Infographic */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
							{t('infographic.formula')}
						</div>
						<div className='text-sm text-blue-800 dark:text-blue-200'>
							{t('infographic.formulaDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.zones')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.zonesDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2'>
							{t('infographic.range')}
						</div>
						<div className='text-sm text-yellow-800 dark:text-yellow-200'>
							{t('infographic.rangeDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Card */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
						<Calculator className='w-6 h-6 text-red-600 dark:text-red-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('form.title')}
					</h2>
				</div>

				{/* Input Form */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					{/* Age Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Activity className='w-4 h-4' />
							{t('form.age')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={age}
								onChange={(e) => setAge(e.target.value)}
								placeholder={t('form.agePlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='1'
								max='120'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.years')}
							</span>
						</div>
					</div>

					{/* Current Heart Rate Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Heart className='w-4 h-4' />
							{t('form.currentHR')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={currentHR}
								onChange={(e) => setCurrentHR(e.target.value)}
								placeholder={t('form.currentHRPlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='30'
								max='250'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.bpm')}
							</span>
						</div>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							{t('form.currentHRHint')}
						</p>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 mb-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating || !age}
						className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<TrendingUp className='w-4 h-4' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={handleReset}
						className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors'
					>
						{t('form.reset')}
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className='flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6'>
						<AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
						<span className='text-red-700 dark:text-red-300'>
							{error}
						</span>
					</div>
				)}

				{/* Results */}
				{result && (
					<div className='space-y-6'>
						{/* Maximum Heart Rate */}
						<div className='text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
							<div className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
								{result.maxHR}
							</div>
							<div className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
								{t('results.maxHR')}
							</div>
							<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-red-100 text-red-800 border-red-200'>
								<CheckCircle className='w-4 h-4' />
								<span className='font-medium'>
									{t('results.maxHRFormula')}
								</span>
							</div>
						</div>

						{/* Current Zone (if heart rate provided) */}
						{currentHR && getCurrentZone() && (
							<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
									{t('results.currentZone')}
								</h4>
								<div className='flex items-center gap-3'>
									<span className='text-2xl font-bold text-blue-800 dark:text-blue-200'>
										{currentHR} {t('results.bpm')}
									</span>
									<span className='text-blue-700 dark:text-blue-300'>
										(
										{getCurrentZone()?.percentage.toFixed(
											1
										)}
										% от максимума)
									</span>
								</div>
								<p className='text-blue-800 dark:text-blue-200 mt-2'>
									{t(
										`zones.${
											getCurrentZone()?.zone
										}.description`
									)}
								</p>
							</div>
						)}

						{/* Heart Rate Zones */}
						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								{t('results.zones')}
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{result.zones.map((zone, index) => (
									<div
										key={zone.name}
										className='p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow'
									>
										<div className='flex items-center justify-between mb-3'>
											<h4 className='font-semibold text-gray-900 dark:text-white'>
												{t(`zones.${zone.name}.title`)}
											</h4>
											<span
												className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getZoneColor(
													zone.color
												)}`}
											>
												{zone.percentage}
											</span>
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
											{zone.min} - {zone.max}{' '}
											{t('results.bpm')}
										</div>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
											{t(
												`zones.${zone.name}.description`
											)}
										</p>
										<p className='text-xs text-gray-500 dark:text-gray-500'>
											{t(`zones.${zone.name}.benefits`)}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Visual Heart Rate Scale */}
						<div className='space-y-3'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								{t('results.scale')}
							</h3>
							<div className='relative'>
								<div className='w-full h-6 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full overflow-hidden'>
									{currentHR && getCurrentZone() && (
										<div
											className='absolute top-0 w-1 h-full bg-white shadow-lg'
											style={{
												left: `${
													getCurrentZone()?.percentage
												}%`,
												transform: 'translateX(-50%)',
											}}
										/>
									)}
								</div>
								<div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2'>
									<span>50%</span>
									<span>60%</span>
									<span>70%</span>
									<span>80%</span>
									<span>90%</span>
									<span>100%</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Heart Rate Zones Table */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('table.title')}
				</h3>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-gray-200 dark:border-gray-700'>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.zone')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.percentage')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.characteristics')}
								</th>
								<th className='text-left py-3 px-4 font-semibold text-gray-900 dark:text-white'>
									{t('table.benefits')}
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
							{result?.zones.map((zone) => (
								<tr
									key={zone.name}
									className='hover:bg-gray-50 dark:hover:bg-gray-700'
								>
									<td className='py-3 px-4'>
										<span
											className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getZoneColor(
												zone.color
											)}`}
										>
											{t(`zones.${zone.name}.title`)}
										</span>
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{zone.percentage}
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{t(`zones.${zone.name}.description`)}
									</td>
									<td className='py-3 px-4 text-gray-700 dark:text-gray-300'>
										{t(`zones.${zone.name}.benefits`)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
