'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Wind,
	Users,
	Home,
	AlertCircle,
	RotateCcw,
	BarChart3,
} from 'lucide-react';
import {
	calculateVentilation,
	validateVentilationInput,
	VentilationInput,
	VentilationResult,
	getRoomTypeOptions,
} from '@/lib/calculators/ventilation';

export default function VentilationCalculator() {
	const t = useTranslations('calculators.ventilation');
	const tCommon = useTranslations('common');

	const [result, setResult] = useState<VentilationResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	// Form state
	const [formData, setFormData] = useState<
		Partial<
			VentilationInput & {
				roomLength?: number | '';
				roomWidth?: number | '';
				roomHeight?: number | '';
				peopleCount?: number | '';
				airExchangeRate?: number | '';
				airPerPerson?: number | '';
			}
		>
	>({
		roomLength: '',
		roomWidth: '',
		roomHeight: 2.7,
		roomType: 'living',
		peopleCount: 1,
		airExchangeRate: '',
		airPerPerson: '',
	});

	// Handle number input changes
	const handleNumberInputChange = (
		field: keyof VentilationInput,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputValue = e.target.value.trim();

		if (inputValue === '') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
			return;
		}

		if (inputValue === '.') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
			return;
		}

		const numValue = parseFloat(inputValue);

		if (!isNaN(numValue) && numValue >= 0) {
			setFormData((prev) => ({
				...prev,
				[field]: numValue,
			}));
		} else if (inputValue === '' || inputValue === '-') {
			setFormData((prev) => ({
				...prev,
				[field]: '',
			}));
		}
	};

	// Handle input changes
	const handleInputChange = (
		field: keyof VentilationInput,
		value: number | string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Calculate ventilation
	const handleCalculate = () => {
		const cleanedFormData: Partial<VentilationInput> = {
			roomLength:
				formData.roomLength === ''
					? undefined
					: formData.roomLength || 0,
			roomWidth:
				formData.roomWidth === '' ? undefined : formData.roomWidth || 0,
			roomHeight:
				formData.roomHeight === ''
					? undefined
					: formData.roomHeight || 0,
			roomType: formData.roomType || 'living',
			peopleCount:
				formData.peopleCount === ''
					? undefined
					: formData.peopleCount || 1,
			airExchangeRate:
				formData.airExchangeRate === ''
					? undefined
					: formData.airExchangeRate,
			airPerPerson:
				formData.airPerPerson === ''
					? undefined
					: formData.airPerPerson,
		};

		const validationErrors = validateVentilationInput(cleanedFormData);

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const calculationResult = calculateVentilation(
				cleanedFormData as VentilationInput
			);

			setResult(calculationResult);
			setErrors([]);
			setIsCalculated(true);
		} catch (error) {
			setErrors([tCommon('calculationError')]);
			setResult(null);
		}
	};

	// Reset form
	const handleReset = () => {
		setFormData({
			roomLength: '',
			roomWidth: '',
			roomHeight: 2.7,
			roomType: 'living',
			peopleCount: 1,
			airExchangeRate: '',
			airPerPerson: '',
		});
		setResult(null);
		setErrors([]);
		setIsCalculated(false);
	};

	const roomTypeOptions = getRoomTypeOptions();

	return (
		<div className='max-w-4xl mx-auto p-6'>
			{/* Calculator Form */}
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Form Fields */}
					<div className='space-y-6'>
						{/* Room Dimensions */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.roomLength')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={
											formData.roomLength !== undefined &&
											formData.roomLength !== null
												? formData.roomLength
												: ''
										}
										onChange={(e) =>
											handleNumberInputChange(
												'roomLength',
												e
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										step='0.01'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
										м
									</span>
								</div>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									{t('form.roomWidth')}
								</label>
								<div className='relative'>
									<input
										type='number'
										value={
											formData.roomWidth !== undefined &&
											formData.roomWidth !== null
												? formData.roomWidth
												: ''
										}
										onChange={(e) =>
											handleNumberInputChange(
												'roomWidth',
												e
											)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
										placeholder='0'
										step='0.01'
										min='0'
									/>
									<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
										м
									</span>
								</div>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.roomHeight')}
							</label>
							<div className='relative'>
								<input
									type='number'
									value={
										formData.roomHeight !== undefined &&
										formData.roomHeight !== null
											? formData.roomHeight
											: ''
									}
									onChange={(e) =>
										handleNumberInputChange('roomHeight', e)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
									placeholder='2.7'
									step='0.01'
									min='0.01'
								/>
								<span className='absolute right-3 top-2 text-gray-500 dark:text-gray-400 text-sm'>
									м
								</span>
							</div>
						</div>

						{/* Room Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.roomType')}
							</label>
							<select
								value={formData.roomType || 'living'}
								onChange={(e) =>
									handleInputChange(
										'roomType',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
							>
								{roomTypeOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* People Count */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.peopleCount')}
							</label>
							<input
								type='number'
								value={formData.peopleCount || ''}
								onChange={(e) =>
									handleInputChange(
										'peopleCount',
										parseInt(e.target.value) || 1
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder='1'
								min='1'
								max='500'
							/>
						</div>

						{/* Optional: Custom Air Exchange Rate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								{t('form.airExchangeRate')} (
								{t('form.optional')})
							</label>
							<input
								type='number'
								value={formData.airExchangeRate || ''}
								onChange={(e) =>
									handleInputChange(
										'airExchangeRate',
										parseFloat(e.target.value) || undefined
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
								placeholder={t('form.autoFromRoomType')}
								step='0.1'
								min='0.1'
								max='20'
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col justify-center space-y-4'>
						<button
							onClick={handleCalculate}
							className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center'
						>
							<Calculator className='h-5 w-5 mr-2' />
							{t('form.calculate')}
						</button>

						<button
							onClick={handleReset}
							className='w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center'
						>
							<RotateCcw className='h-5 w-5 mr-2' />
							{t('form.reset')}
						</button>
					</div>
				</div>

				{/* Error Messages */}
				{errors.length > 0 && (
					<div className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
						<div className='flex items-center mb-2'>
							<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
							<h3 className='text-sm font-medium text-red-800 dark:text-red-400'>
								{t('errors.title')}
							</h3>
						</div>
						<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
							{errors.map((error, index) => (
								<li key={index}>• {error}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Results */}
			{result && (
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
					<div className='flex items-center mb-6'>
						<Wind className='h-6 w-6 text-green-600 dark:text-green-400 mr-3' />
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
							{t('results.title')}
						</h2>
					</div>

					{/* Results Table */}
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
							<thead>
								<tr className='bg-gray-50 dark:bg-gray-700'>
									<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300'>
										{t('results.parameter')}
									</th>
									<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300'>
										{t('results.value')}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.roomVolume')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.roomVolume} м³
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.airExchangeRate')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.airExchangeRate}{' '}
										{t('results.perHour')}
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.airPerPerson')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.airPerPerson} м³/ч
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.capacityByVolume')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.capacityByVolume} м³/ч
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.capacityByPeople')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.capacityByPeople} м³/ч
									</td>
								</tr>
								<tr className='bg-blue-50 dark:bg-blue-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.requiredCapacity')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-blue-700 dark:text-blue-400'>
										{result.requiredCapacity} м³/ч
									</td>
								</tr>
								<tr className='bg-green-50 dark:bg-green-900/20'>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium'>
										{t('results.recommendedSupply')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-bold text-green-700 dark:text-green-400'>
										{result.recommendedSupply} м³/ч
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.recommendedExhaust')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.recommendedExhaust} м³/ч
									</td>
								</tr>
								<tr>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
										{t('results.recommendedCombined')}
									</td>
									<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium'>
										{result.recommendedCombined} м³/ч
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Tips */}
					<div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
						<div className='flex items-start'>
							<AlertCircle className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5' />
							<div>
								<h3 className='text-sm font-medium text-blue-800 dark:text-blue-400 mb-2'>
									{t('results.tips.title')}
								</h3>
								<ul className='text-sm text-blue-700 dark:text-blue-300 space-y-1'>
									<li>• {t('results.tips.supply')}</li>
									<li>• {t('results.tips.exhaust')}</li>
									<li>• {t('results.tips.balance')}</li>
									<li>• {t('results.tips.consult')}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
