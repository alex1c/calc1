'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Shield } from 'lucide-react';

interface KaskoFormData {
	carValue: number;
	carYear: number;
	driverAge: number;
	drivingExperience: number;
	region: string;
	hasAlarmSystem: boolean;
	franchise: string;
}

interface KaskoResult {
	baseRate: number;
	regionCoefficient: number;
	ageCoefficient: number;
	experienceCoefficient: number;
	alarmCoefficient: number;
	franchiseCoefficient: number;
	totalCost: number;
}

export default function KaskoCalculator() {
	const t = useTranslations('calculators.kasko');

	const [formData, setFormData] = useState<KaskoFormData>({
		carValue: 0,
		carYear: new Date().getFullYear(),
		driverAge: 0,
		drivingExperience: 0,
		region: '',
		hasAlarmSystem: false,
		franchise: 'none',
	});

	const [result, setResult] = useState<KaskoResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const regions = [
		{ value: 'moscow', label: t('form.regions.moscow') },
		{ value: 'spb', label: t('form.regions.spb') },
		{ value: 'other', label: t('form.regions.other') },
	];

	const franchiseOptions = [
		{ value: 'none', label: t('form.franchiseOptions.none') },
		{ value: '10000', label: t('form.franchiseOptions.10000') },
		{ value: '20000', label: t('form.franchiseOptions.20000') },
	];

	const handleInputChange = (
		field: keyof KaskoFormData,
		value: string | number | boolean
	) => {
		// For string fields (region, franchise), keep as string
		// For number fields, convert to number
		// For boolean fields, keep as boolean
		const processedValue =
			field === 'region' || field === 'franchise'
				? value
				: field === 'hasAlarmSystem'
				? value
				: typeof value === 'string'
				? parseFloat(value) || 0
				: value;

		setFormData((prev) => ({ ...prev, [field]: processedValue }));
		setIsCalculated(false);
	};

	const validateInput = (): string[] => {
		const errors: string[] = [];

		if (formData.carValue <= 0) {
			errors.push(t('form.errors.carValueGreaterThanZero'));
		}

		if (
			formData.carYear < 1990 ||
			formData.carYear > new Date().getFullYear() + 1
		) {
			errors.push(t('form.errors.carYearInvalid'));
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

		if (!formData.region) {
			errors.push(t('form.errors.regionRequired'));
		}

		return errors;
	};

	const calculateKasko = (): KaskoResult => {
		const baseRate = 0.06; // 6% базовая ставка

		// Крегион (коэффициент региона)
		let regionCoefficient = 1;
		switch (formData.region) {
			case 'moscow':
				regionCoefficient = 1.2;
				break;
			case 'spb':
				regionCoefficient = 1.1;
				break;
			case 'other':
				regionCoefficient = 1;
				break;
		}

		// Квозраст (коэффициент возраста)
		let ageCoefficient = 1;
		if (formData.driverAge < 22) {
			ageCoefficient = 1.5;
		} else if (formData.driverAge <= 30) {
			ageCoefficient = 1.2;
		} else {
			ageCoefficient = 1.0;
		}

		// Кстаж (коэффициент стажа)
		let experienceCoefficient = 1;
		if (formData.drivingExperience < 3) {
			experienceCoefficient = 1.3;
		} else if (formData.drivingExperience <= 10) {
			experienceCoefficient = 1.1;
		} else {
			experienceCoefficient = 1.0;
		}

		// Ксигнализация (коэффициент сигнализации)
		const alarmCoefficient = formData.hasAlarmSystem ? 0.9 : 1.0;

		// Кфраншиза (коэффициент франшизы)
		let franchiseCoefficient = 1;
		switch (formData.franchise) {
			case 'none':
				franchiseCoefficient = 1.0;
				break;
			case '10000':
				franchiseCoefficient = 0.9;
				break;
			case '20000':
				franchiseCoefficient = 0.8;
				break;
		}

		const totalCost =
			formData.carValue *
			baseRate *
			regionCoefficient *
			ageCoefficient *
			experienceCoefficient *
			alarmCoefficient *
			franchiseCoefficient;

		return {
			baseRate,
			regionCoefficient,
			ageCoefficient,
			experienceCoefficient,
			alarmCoefficient,
			franchiseCoefficient,
			totalCost: Math.round(totalCost),
		};
	};

	const handleCalculate = () => {
		const validationErrors = validateInput();
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const calculationResult = calculateKasko();
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
						{/* Car Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.carValue')}
							</label>
							<input
								type='number'
								value={formData.carValue || ''}
								onChange={(e) =>
									handleInputChange(
										'carValue',
										e.target.value
									)
								}
								placeholder='1500000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Car Year */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.carYear')}
							</label>
							<input
								type='number'
								value={formData.carYear || ''}
								onChange={(e) =>
									handleInputChange('carYear', e.target.value)
								}
								placeholder='2020'
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

						{/* Alarm System */}
						<div>
							<label className='flex items-center'>
								<input
									type='checkbox'
									checked={formData.hasAlarmSystem}
									onChange={(e) =>
										handleInputChange(
											'hasAlarmSystem',
											e.target.checked
										)
									}
									className='mr-3 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>
									{t('form.hasAlarmSystem')}
								</span>
							</label>
						</div>

						{/* Franchise */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.franchise')}
							</label>
							<select
								value={formData.franchise}
								onChange={(e) =>
									handleInputChange(
										'franchise',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								{franchiseOptions.map((option) => (
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
											{(result.baseRate * 100).toFixed(1)}
											%
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.regionCoeff')}:
										</span>
										<span className='font-medium'>
											{result.regionCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.ageCoeff')}:
										</span>
										<span className='font-medium'>
											{result.ageCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.experienceCoeff')}:
										</span>
										<span className='font-medium'>
											{result.experienceCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.alarmCoeff')}:
										</span>
										<span className='font-medium'>
											{result.alarmCoefficient}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.franchiseCoeff')}:
										</span>
										<span className='font-medium'>
											{result.franchiseCoefficient}
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
								<li>{t('seo.coefficients.region')}</li>
								<li>{t('seo.coefficients.age')}</li>
								<li>{t('seo.coefficients.experience')}</li>
								<li>{t('seo.coefficients.alarm')}</li>
								<li>{t('seo.coefficients.franchise')}</li>
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
								<li>{t('seo.advantages.comprehensive')}</li>
								<li>{t('seo.advantages.quick')}</li>
								<li>{t('seo.advantages.accurate')}</li>
								<li>{t('seo.advantages.comparison')}</li>
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
								<li>{t('seo.tips.alarm')}</li>
								<li>{t('seo.tips.franchise')}</li>
								<li>{t('seo.tips.documents')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
