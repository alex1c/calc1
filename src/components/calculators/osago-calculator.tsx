'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Shield } from 'lucide-react';

interface OsagoFormData {
	region: string;
	enginePower: number;
	driverAge: number;
	drivingExperience: number;
	driversCount: string;
	bonusMalusCoefficient: number;
}

interface OsagoResult {
	baseRate: number;
	territoryCoefficient: number;
	ageExperienceCoefficient: number;
	powerCoefficient: number;
	driversCoefficient: number;
	bonusMalusCoefficient: number;
	totalCost: number;
}

/**
 * OSAGO Calculator Component
 * 
 * A React component for calculating OSAGO (mandatory car insurance) costs.
 * 
 * Features:
 * - Region-based calculation
 * - Engine power coefficient
 * - Driver age and experience coefficients
 * - Multiple drivers support
 * - Bonus-Malus coefficient (KBM)
 * - Detailed cost breakdown
 * - Responsive design
 * 
 * Calculation method:
 * - Based on Russian OSAGO regulations
 * - Base rate × territory coefficient × age/experience coefficient × power coefficient × drivers coefficient × KBM
 * 
 * Uses inline calculation logic based on Russian OSAGO legislation.
 */
export default function OsagoCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.osago');

	// Form state management
	const [formData, setFormData] = useState<OsagoFormData>({
		region: '', // Region (Moscow, SPB, other)
		enginePower: 0, // Engine power (hp)
		driverAge: 0, // Driver age (years)
		drivingExperience: 0, // Driving experience (years)
		driversCount: 'one', // Number of drivers (one, several)
		bonusMalusCoefficient: 1.0, // Bonus-Malus coefficient (KBM)
	});

	const [result, setResult] = useState<OsagoResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	const regions = [
		{ value: 'moscow', label: t('form.regions.moscow') },
		{ value: 'spb', label: t('form.regions.spb') },
		{ value: 'other', label: t('form.regions.other') },
	];

	const driversCountOptions = [
		{ value: 'one', label: t('form.driversCountOptions.one') },
		{ value: 'several', label: t('form.driversCountOptions.several') },
		{ value: 'unlimited', label: t('form.driversCountOptions.unlimited') },
	];

	const bonusMalusOptions = [
		{ value: 0.5, key: 'value_0_5' },
		{ value: 0.6, key: 'value_0_6' },
		{ value: 0.65, key: 'value_0_65' },
		{ value: 0.7, key: 'value_0_7' },
		{ value: 0.8, key: 'value_0_8' },
		{ value: 0.9, key: 'value_0_9' },
		{ value: 1.0, key: 'value_1_0' },
		{ value: 1.4, key: 'value_1_4' },
		{ value: 1.5, key: 'value_1_5' },
		{ value: 1.6, key: 'value_1_6' },
		{ value: 1.7, key: 'value_1_7' },
		{ value: 2.0, key: 'value_2_0' },
		{ value: 2.45, key: 'value_2_45' },
	].map(({ value, key }) => ({
		value,
		label: t(`form.bonusMalusOptions.${key}`),
	}));

	const handleInputChange = (
		field: keyof OsagoFormData,
		value: string | number
	) => {
		// For string fields (region, driversCount), keep as string
		// For number fields, convert to number
		const processedValue =
			field === 'region' || field === 'driversCount'
				? value
				: typeof value === 'string'
				? parseFloat(value) || 0
				: value;

		setFormData((prev) => ({ ...prev, [field]: processedValue }));
		setIsCalculated(false);
	};

	const validateInput = (): string[] => {
		const errors: string[] = [];

		if (!formData.region) {
			errors.push(t('form.errors.regionRequired'));
		}

		if (formData.enginePower <= 0) {
			errors.push(t('form.errors.enginePowerGreaterThanZero'));
		}

		if (formData.driverAge < 18 || formData.driverAge > 100) {
			errors.push(t('form.errors.driverAgeInvalid'));
		}

		if (formData.drivingExperience < 0) {
			errors.push(t('form.errors.drivingExperienceNegative'));
		}

		if (formData.drivingExperience > formData.driverAge - 16) {
			errors.push(t('form.errors.drivingExperienceTooHigh'));
		}

		return errors;
	};

	const calculateOsago = (): OsagoResult => {
		const baseRate = 5000; // Базовый тариф

		// КТ (коэффициент территории)
		let territoryCoefficient = 1;
		switch (formData.region) {
			case 'moscow':
				territoryCoefficient = 2;
				break;
			case 'spb':
				territoryCoefficient = 1.8;
				break;
			case 'other':
				territoryCoefficient = 1;
				break;
		}

		// КВС (коэффициент возраст-стаж)
		let ageExperienceCoefficient = 1;
		if (formData.driverAge < 22 && formData.drivingExperience < 3) {
			ageExperienceCoefficient = 1.8;
		}

		// КМ (коэффициент мощности)
		let powerCoefficient = 1;
		if (formData.enginePower <= 70) {
			powerCoefficient = 0.6;
		} else if (formData.enginePower <= 100) {
			powerCoefficient = 1.0;
		} else if (formData.enginePower <= 120) {
			powerCoefficient = 1.1;
		} else if (formData.enginePower <= 150) {
			powerCoefficient = 1.2;
		} else {
			powerCoefficient = 1.4;
		}

		// КО (коэффициент ограничения)
		let driversCoefficient = 1;
		switch (formData.driversCount) {
			case 'one':
				driversCoefficient = 1;
				break;
			case 'several':
				driversCoefficient = 1.2;
				break;
			case 'unlimited':
				driversCoefficient = 1.8;
				break;
		}

		const totalCost =
			baseRate *
			territoryCoefficient *
			ageExperienceCoefficient *
			powerCoefficient *
			driversCoefficient *
			formData.bonusMalusCoefficient;

		return {
			baseRate,
			territoryCoefficient,
			ageExperienceCoefficient,
			powerCoefficient,
			driversCoefficient,
			bonusMalusCoefficient: formData.bonusMalusCoefficient,
			totalCost: Math.round(totalCost),
		};
	};

	const handleCalculate = () => {
		const validationErrors = validateInput();
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const calculationResult = calculateOsago();
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Shield className='h-16 w-16 text-blue-600' />
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
						<Calculator className='h-5 w-5 mr-2 text-blue-600' />
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
						{/* Region */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.region')}
							</label>
							<select
								value={formData.region}
								onChange={(e) =>
									handleInputChange('region', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>
									{t('form.selectRegion')}
								</option>
								{regions.map((region) => (
									<option
										key={region.value}
										value={region.value}
									>
										{region.label}
									</option>
								))}
							</select>
						</div>

						{/* Engine Power */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.enginePower')}
							</label>
							<input
								type='number'
								value={formData.enginePower || ''}
								onChange={(e) =>
									handleInputChange(
										'enginePower',
										e.target.value
									)
								}
								placeholder='100'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Driver Age and Experience */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.driverAge')}
								</label>
								<input
									type='number'
									value={formData.driverAge || ''}
									onChange={(e) =>
										handleInputChange(
											'driverAge',
											e.target.value
										)
									}
									placeholder='30'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.drivingExperience')}
								</label>
								<input
									type='number'
									value={formData.drivingExperience || ''}
									onChange={(e) =>
										handleInputChange(
											'drivingExperience',
											e.target.value
										)
									}
									placeholder='5'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
						</div>

						{/* Drivers Count */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.driversCount')}
							</label>
							<select
								value={formData.driversCount}
								onChange={(e) =>
									handleInputChange(
										'driversCount',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{driversCountOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Bonus-Malus Coefficient */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.bonusMalus')}
							</label>
							<select
								value={formData.bonusMalusCoefficient}
								onChange={(e) =>
									handleInputChange(
										'bonusMalusCoefficient',
										parseFloat(e.target.value)
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{bonusMalusOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
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
				<div className='bg-white rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
						<CheckCircle className='h-5 w-5 mr-2 text-green-600' />
						{t('results.title')}
					</h2>

					{isCalculated && result ? (
						<div className='space-y-6'>
							{/* Total Cost */}
							<div className='bg-blue-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.totalCost')}
								</h3>
								<div className='text-3xl font-bold text-blue-900'>
									{formatCurrency(result.totalCost)}
								</div>
							</div>

							{/* Calculation Details */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('results.details')}
								</h4>

								<div className='space-y-3 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.baseRate')}:
										</span>
										<span className='font-medium'>
											{formatCurrency(result.baseRate)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.territoryCoeff')}:
										</span>
										<span className='font-medium'>
											{result.territoryCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.ageExperienceCoeff')}:
										</span>
										<span className='font-medium'>
											{result.ageExperienceCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.powerCoeff')}:
										</span>
										<span className='font-medium'>
											{result.powerCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.driversCoeff')}:
										</span>
										<span className='font-medium'>
											{result.driversCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.bonusMalusCoeff')}:
										</span>
										<span className='font-medium'>
											{result.bonusMalusCoefficient}
										</span>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='text-center text-gray-500 py-8'>
							<Calculator className='h-12 w-12 mx-auto mb-4 text-gray-400' />
							<p>{t('results.placeholder')}</p>
						</div>
					)}
				</div>
			</div>

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
								{t('seo.coefficients.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.coefficients.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.coefficients.territory')}</li>
								<li>{t('seo.coefficients.ageExperience')}</li>
								<li>{t('seo.coefficients.power')}</li>
								<li>{t('seo.coefficients.drivers')}</li>
								<li>{t('seo.coefficients.bonusMalus')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.advantages.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.advantages.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.advantages.quick')}</li>
								<li>{t('seo.advantages.accurate')}</li>
								<li>{t('seo.advantages.comparison')}</li>
								<li>{t('seo.advantages.savings')}</li>
							</ul>
						</div>

						<div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
							<h3 className='text-xl font-semibold text-blue-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-blue-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-blue-800'>
								<li>{t('seo.tips.compare')}</li>
								<li>{t('seo.tips.bonusMalus')}</li>
								<li>{t('seo.tips.early')}</li>
								<li>{t('seo.tips.documents')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
