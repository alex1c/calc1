'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertCircle, CheckCircle, Fuel } from 'lucide-react';

type CalculationMode = 'distance' | 'fuel';

interface FuelFormData {
	fuelAmount: number;
	consumption: number;
	distance: number;
}

interface FuelResult {
	mode: CalculationMode;
	distance?: number;
	fuelNeeded?: number;
}

export default function FuelCalculator() {
	const t = useTranslations('calculators.fuel-consumption');

	const [mode, setMode] = useState<CalculationMode>('distance');
	const [formData, setFormData] = useState<FuelFormData>({
		fuelAmount: 0,
		consumption: 0,
		distance: 0,
	});

	const [result, setResult] = useState<FuelResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const handleModeChange = (newMode: CalculationMode) => {
		setMode(newMode);
		setIsCalculated(false);
		setResult(null);
		setErrors([]);
	};

	const handleInputChange = (field: keyof FuelFormData, value: string) => {
		const numValue = parseFloat(value) || 0;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const validateInput = (): string[] => {
		const errors: string[] = [];

		if (formData.consumption <= 0) {
			errors.push(t('form.errors.consumptionGreaterThanZero'));
		}

		if (mode === 'distance') {
			if (formData.fuelAmount <= 0) {
				errors.push(t('form.errors.fuelAmountGreaterThanZero'));
			}
		} else {
			if (formData.distance <= 0) {
				errors.push(t('form.errors.distanceGreaterThanZero'));
			}
		}

		return errors;
	};

	const calculateDistance = (): FuelResult => {
		const distance = (formData.fuelAmount / formData.consumption) * 100;
		return {
			mode: 'distance',
			distance: Math.round(distance * 100) / 100,
		};
	};

	const calculateFuel = (): FuelResult => {
		const fuelNeeded = (formData.consumption * formData.distance) / 100;
		return {
			mode: 'fuel',
			fuelNeeded: Math.round(fuelNeeded * 100) / 100,
		};
	};

	const handleCalculate = () => {
		const validationErrors = validateInput();
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const calculationResult =
			mode === 'distance' ? calculateDistance() : calculateFuel();
		setResult(calculationResult);
		setIsCalculated(true);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Fuel className='h-16 w-16 text-blue-600' />
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

					{/* Mode Selection */}
					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700 mb-3'>
							{t('form.mode')}
						</label>
						<div className='grid grid-cols-2 gap-4'>
							<button
								type='button'
								onClick={() => handleModeChange('distance')}
								className={`p-3 rounded-lg border-2 transition-all ${
									mode === 'distance'
										? 'border-blue-500 bg-blue-50 text-blue-700'
										: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
								}`}
							>
								<div className='text-sm font-medium'>
									{t('form.modes.distance')}
								</div>
								<div className='text-xs text-gray-500 mt-1'>
									{t('form.modes.distanceDesc')}
								</div>
							</button>
							<button
								type='button'
								onClick={() => handleModeChange('fuel')}
								className={`p-3 rounded-lg border-2 transition-all ${
									mode === 'fuel'
										? 'border-blue-500 bg-blue-50 text-blue-700'
										: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
								}`}
							>
								<div className='text-sm font-medium'>
									{t('form.modes.fuel')}
								</div>
								<div className='text-xs text-gray-500 mt-1'>
									{t('form.modes.fuelDesc')}
								</div>
							</button>
						</div>
					</div>

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
						{/* Fuel Consumption */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.consumption')}
							</label>
							<input
								type='number'
								step='0.1'
								value={formData.consumption || ''}
								onChange={(e) =>
									handleInputChange(
										'consumption',
										e.target.value
									)
								}
								placeholder='8.5'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Mode-specific inputs */}
						{mode === 'distance' ? (
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.fuelAmount')}
								</label>
								<input
									type='number'
									step='0.1'
									value={formData.fuelAmount || ''}
									onChange={(e) =>
										handleInputChange(
											'fuelAmount',
											e.target.value
										)
									}
									placeholder='50'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
						) : (
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.distance')}
								</label>
								<input
									type='number'
									step='0.1'
									value={formData.distance || ''}
									onChange={(e) =>
										handleInputChange(
											'distance',
											e.target.value
										)
									}
									placeholder='500'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
						)}

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
							{/* Result */}
							<div className='bg-green-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.result')}
								</h3>
								<div className='text-3xl font-bold text-green-900'>
									{result.mode === 'distance' ? (
										<>
											{result.distance} {t('results.km')}
										</>
									) : (
										<>
											{result.fuelNeeded}{' '}
											{t('results.liters')}
										</>
									)}
								</div>
								<p className='text-green-700 mt-2'>
									{result.mode === 'distance'
										? t('results.distanceResult')
										: t('results.fuelResult')}
								</p>
							</div>

							{/* Calculation Details */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('results.details')}
								</h4>

								<div className='space-y-3 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>
											{t('results.consumption')}:
										</span>
										<span className='font-medium'>
											{formData.consumption} {t('results.per100km')}
										</span>
									</div>

									{result.mode === 'distance' ? (
										<>
											<div className='flex justify-between'>
												<span className='text-gray-600'>
													{t('results.fuelAmount')}:
												</span>
												<span className='font-medium'>
													{formData.fuelAmount} {t('results.liters')}
												</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-gray-600'>
													{t(
														'results.calculatedDistance'
													)}
													:
												</span>
												<span className='font-medium'>
													{result.distance} {t('results.km')}
												</span>
											</div>
										</>
									) : (
										<>
											<div className='flex justify-between'>
												<span className='text-gray-600'>
													{t('results.distance')}:
												</span>
												<span className='font-medium'>
													{formData.distance} {t('results.km')}
												</span>
											</div>
											<div className='flex justify-between'>
												<span className='text-gray-600'>
													{t(
														'results.calculatedFuel'
													)}
													:
												</span>
												<span className='font-medium'>
													{result.fuelNeeded} {t('results.liters')}
												</span>
											</div>
										</>
									)}
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
								{t('seo.features.title')}
							</h3>
							<p className='mb-4'>{t('seo.features.content')}</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.features.distance')}</li>
								<li>{t('seo.features.fuel')}</li>
								<li>{t('seo.features.planning')}</li>
								<li>{t('seo.features.economy')}</li>
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
								<li>{t('seo.advantages.planning')}</li>
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
								<li>{t('seo.tips.measure')}</li>
								<li>{t('seo.tips.driving')}</li>
								<li>{t('seo.tips.maintenance')}</li>
								<li>{t('seo.tips.planning')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
