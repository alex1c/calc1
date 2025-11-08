'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	TrendingUp,
	Scale,
	BarChart3,
} from 'lucide-react';

type Gender = 'male' | 'female';
type Formula =
	| 'broca'
	| 'lorentz'
	| 'devine'
	| 'hamwi'
	| 'robinson'
	| 'miller';

interface IdealWeightInput {
	gender: Gender;
	height: number;
	age: number;
	formula: Formula;
}

interface IdealWeightResult {
	idealWeight: number;
	weightRange: {
		min: number;
		max: number;
	};
	formulaName: string;
	allFormulas: Array<{
		name: string;
		weight: number;
	}>;
}

/**
 * Ideal Weight Calculator Component
 * 
 * A React component for calculating ideal body weight using multiple formulas.
 * 
 * Features:
 * - Multiple calculation formulas (Broca, Lorentz, Devine, Hamwi, Robinson, Miller)
 * - Gender-specific calculations
 * - Age and height input
 * - Weight range calculation
 * - Comparison of all formulas
 * - Visual indicators
 * - Responsive design
 * 
 * Formulas supported:
 * - Broca: Simple height-based formula
 * - Lorentz: Gender-specific formula
 * - Devine: Height and gender-based formula
 * - Hamwi: Height and frame size-based formula
 * - Robinson: Refined height-based formula
 * - Miller: Modern height-based formula
 * 
 * Uses inline calculation logic for ideal weight formulas.
 */
export default function IdealWeightCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.ideal-weight');
	
	// Form state management
	const [input, setInput] = useState<IdealWeightInput>({
		gender: 'male', // Gender (male, female)
		height: 175, // Height in cm
		age: 30, // Age in years
		formula: 'broca', // Selected formula (broca, lorentz, devine, hamwi, robinson, miller)
	});
	const [result, setResult] = useState<IdealWeightResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors

	// Convert cm to inches
	const cmToInches = (cm: number): number => {
		return cm / 2.54;
	};

	// Calculate ideal weight using different formulas
	const calculateIdealWeight = (
		height: number,
		gender: Gender,
		formula: Formula
	): number => {
		const heightInches = cmToInches(height);

		switch (formula) {
			case 'broca':
				return gender === 'male' ? height - 100 : height - 110;
			case 'lorentz':
				if (gender === 'male') {
					return height - 100 - (height - 150) / 4;
				} else {
					return height - 100 - (height - 150) / 2;
				}
			case 'devine':
				if (gender === 'male') {
					return 50 + 2.3 * (heightInches - 60);
				} else {
					return 45.5 + 2.3 * (heightInches - 60);
				}
			case 'hamwi':
				if (gender === 'male') {
					return 48 + 2.7 * (heightInches - 60);
				} else {
					return 45.5 + 2.2 * (heightInches - 60);
				}
			case 'robinson':
				if (gender === 'male') {
					return 52 + 1.9 * (heightInches - 60);
				} else {
					return 49 + 1.7 * (heightInches - 60);
				}
			case 'miller':
				if (gender === 'male') {
					return 56.2 + 1.41 * (heightInches - 60);
				} else {
					return 53.1 + 1.36 * (heightInches - 60);
				}
			default:
				return height - 100;
		}
	};

	const handleInputChange = (
		field: keyof IdealWeightInput,
		value: string | number | Gender | Formula
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (!input.height || input.height < 100 || input.height > 250) {
			validationErrors.push(t('form.errors.invalidHeight'));
		}

		if (!input.age || input.age < 1 || input.age > 120) {
			validationErrors.push(t('form.errors.invalidAge'));
		}

		return validationErrors;
	};

	const calculateIdealWeightResult = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const { height, gender, formula } = input;

			// Calculate ideal weight for selected formula
			const idealWeight = calculateIdealWeight(height, gender, formula);

			// Calculate weight range (±10%)
			const weightRange = {
				min: idealWeight * 0.9,
				max: idealWeight * 1.1,
			};

			// Calculate for all formulas for comparison
			const formulas: Formula[] = [
				'broca',
				'lorentz',
				'devine',
				'hamwi',
				'robinson',
				'miller',
			];
			const allFormulas = formulas.map((f) => ({
				name: t(`form.formulas.${f}`),
				weight: calculateIdealWeight(height, gender, f),
			}));

			setResult({
				idealWeight,
				weightRange,
				formulaName: t(`form.formulas.${formula}`),
				allFormulas,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			gender: 'male',
			height: 175,
			age: 30,
			formula: 'broca',
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
						{/* Gender */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.gender')}
							</label>
							<select
								value={input.gender}
								onChange={(e) =>
									handleInputChange('gender', e.target.value as Gender)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								<option value='male'>{t('form.genders.male')}</option>
								<option value='female'>{t('form.genders.female')}</option>
							</select>
						</div>

						{/* Height */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.height')}
							</label>
							<input
								type='number'
								step='1'
								min='100'
								max='250'
								value={input.height || ''}
								onChange={(e) =>
									handleInputChange('height', parseInt(e.target.value) || 0)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='175'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Укажите рост без обуви в сантиметрах
							</p>
						</div>

						{/* Age */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.age')}
							</label>
							<input
								type='number'
								step='1'
								min='1'
								max='120'
								value={input.age || ''}
								onChange={(e) =>
									handleInputChange('age', parseInt(e.target.value) || 0)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='30'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Возраст в годах
							</p>
						</div>

						{/* Formula */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.formula')}
							</label>
							<select
								value={input.formula}
								onChange={(e) =>
									handleInputChange('formula', e.target.value as Formula)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								<option value='broca'>{t('form.formulas.broca')}</option>
								<option value='lorentz'>{t('form.formulas.lorentz')}</option>
								<option value='devine'>{t('form.formulas.devine')}</option>
								<option value='hamwi'>{t('form.formulas.hamwi')}</option>
								<option value='robinson'>{t('form.formulas.robinson')}</option>
								<option value='miller'>{t('form.formulas.miller')}</option>
							</select>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Выберите формулу для расчёта
							</p>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculateIdealWeightResult}
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
							{/* Ideal Weight */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
									<TrendingUp className='w-5 h-5 mr-2' />
									{t('results.idealWeight')}
								</h3>
								<div className='text-3xl font-bold text-green-900 dark:text-green-100 mb-2'>
									{result.idealWeight.toFixed(1)} кг
								</div>
								<p className='text-sm text-green-700 dark:text-green-300'>
									{t('results.formulaUsed')}: {result.formulaName}
								</p>
							</div>

							{/* Weight Range */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center'>
									<BarChart3 className='w-5 h-5 mr-2' />
									{t('results.weightRange')}
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-blue-700 dark:text-blue-300'>
											Минимум:
										</span>{' '}
										<strong className='text-blue-900 dark:text-blue-100'>
											{result.weightRange.min.toFixed(1)} кг
										</strong>
									</div>
									<div>
										<span className='text-blue-700 dark:text-blue-300'>
											Максимум:
										</span>{' '}
										<strong className='text-blue-900 dark:text-blue-100'>
											{result.weightRange.max.toFixed(1)} кг
										</strong>
									</div>
									<p className='text-xs text-blue-600 dark:text-blue-400 mt-2'>
										Нормальный вес составляет ±10% от идеального
									</p>
								</div>
							</div>

							{/* All Formulas Comparison */}
							<div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center'>
									<Scale className='w-5 h-5 mr-2' />
									Сравнение всех формул
								</h3>
								<div className='space-y-2 text-sm'>
									{result.allFormulas.map((formula, index) => (
										<div
											key={index}
											className='flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded'
										>
											<span className='text-purple-700 dark:text-purple-300'>
												{formula.name}:
											</span>
											<strong className='text-purple-900 dark:text-purple-100'>
												{formula.weight.toFixed(1)} кг
											</strong>
										</div>
									))}
								</div>
								<p className='text-xs text-purple-600 dark:text-purple-400 mt-2'>
									Сравните результаты разных формул
								</p>
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

