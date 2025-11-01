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
	Calendar,
	Percent,
	BarChart3,
} from 'lucide-react';

interface PensionInput {
	currentAge: number;
	workExperience: number;
	averageSalary: number;
	retirementAge: number;
	pensionPoints?: number;
}

interface PensionResult {
	estimatedPension: number;
	fixedPayment: number;
	totalPoints: number;
	pointsValue: number;
	yearsToRetirement: number;
	totalExperience: number;
	minimumExperience: number;
	requiredPoints: number;
}

// Константы для расчёта пенсии (2024 год)
const FIXED_PAYMENT = 8134; // Фиксированная выплата в 2024 году
const POINT_VALUE = 133.05; // Стоимость пенсионного балла в 2024 году
const MINIMUM_EXPERIENCE = 15; // Минимальный стаж в годах
const MINIMUM_POINTS = 30; // Минимальное количество баллов
const MAX_ANNUAL_POINTS = 10; // Максимальное количество баллов за год
const MAX_SALARY_FOR_CONTRIBUTIONS = 112000; // Максимальная зарплата для начисления баллов

export default function PensionCalculator() {
	const t = useTranslations('calculators.pension');
	const [input, setInput] = useState<PensionInput>({
		currentAge: 45,
		workExperience: 25,
		averageSalary: 50000,
		retirementAge: 60,
	});
	const [result, setResult] = useState<PensionResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const handleInputChange = (
		field: keyof PensionInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (!input.currentAge || input.currentAge < 18 || input.currentAge > 100) {
			validationErrors.push(t('form.errors.invalidCurrentAge'));
		}

		if (
			!input.workExperience ||
			input.workExperience <= 0 ||
			input.workExperience >= input.currentAge
		) {
			validationErrors.push(t('form.errors.invalidWorkExperience'));
		}

		if (!input.averageSalary || input.averageSalary <= 0) {
			validationErrors.push(t('form.errors.invalidAverageSalary'));
		}

		if (
			!input.retirementAge ||
			input.retirementAge < 55 ||
			input.retirementAge > 70
		) {
			validationErrors.push(t('form.errors.invalidRetirementAge'));
		}

		if (input.currentAge >= input.retirementAge) {
			validationErrors.push(
				'Текущий возраст не может быть больше или равен пенсионному возрасту'
			);
		}

		return validationErrors;
	};

	// Расчёт пенсионных баллов за год на основе зарплаты
	const calculateAnnualPoints = (salary: number): number => {
		// Используем упрощённую формулу: примерно 1 балл за каждые 10000 ₽/мес
		// С учётом максимального лимита
		const cappedSalary = Math.min(salary, MAX_SALARY_FOR_CONTRIBUTIONS);
		const annualPoints = (cappedSalary / 10000) * 1.06; // Примерный коэффициент
		return Math.min(annualPoints, MAX_ANNUAL_POINTS);
	};

	const calculatePension = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			const { currentAge, workExperience, averageSalary, retirementAge } =
				input;

			// Расчёт лет до выхода на пенсию
			const yearsToRetirement = Math.max(0, retirementAge - currentAge);

			// Расчёт общего стажа к моменту выхода на пенсию
			const totalExperience = workExperience + yearsToRetirement;

			// Расчёт пенсионных баллов за текущий стаж
			const annualPoints = calculateAnnualPoints(averageSalary);
			const currentPoints = annualPoints * workExperience;

			// Расчёт дополнительных баллов за оставшиеся годы работы
			const futurePoints = annualPoints * yearsToRetirement;

			// Общее количество пенсионных баллов
			const totalPoints = currentPoints + futurePoints;

			// Расчёт размера пенсии
			const insurancePart = totalPoints * POINT_VALUE;
			const estimatedPension = FIXED_PAYMENT + insurancePart;

			setResult({
				estimatedPension: Math.max(estimatedPension, 0),
				fixedPayment: FIXED_PAYMENT,
				totalPoints,
				pointsValue: POINT_VALUE,
				yearsToRetirement,
				totalExperience,
				minimumExperience: MINIMUM_EXPERIENCE,
				requiredPoints: MINIMUM_POINTS,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			currentAge: 45,
			workExperience: 25,
			averageSalary: 50000,
			retirementAge: 60,
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
						{/* Current Age */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.currentAge')}
							</label>
							<input
								type='number'
								step='1'
								min='18'
								max='100'
								value={input.currentAge || ''}
								onChange={(e) =>
									handleInputChange(
										'currentAge',
										parseInt(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='45'
							/>
						</div>

						{/* Work Experience */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.workExperience')}
							</label>
							<input
								type='number'
								step='1'
								min='0'
								value={input.workExperience || ''}
								onChange={(e) =>
									handleInputChange(
										'workExperience',
										parseInt(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='25'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Минимальный стаж: {MINIMUM_EXPERIENCE} лет
							</p>
						</div>

						{/* Average Salary */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.averageSalary')}
							</label>
							<input
								type='number'
								step='1000'
								min='0'
								value={input.averageSalary || ''}
								onChange={(e) =>
									handleInputChange(
										'averageSalary',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='50000'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Используйте среднюю зарплату за весь период работы
							</p>
						</div>

						{/* Retirement Age */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.retirementAge')}
							</label>
							<input
								type='number'
								step='1'
								min='55'
								max='70'
								value={input.retirementAge || ''}
								onChange={(e) =>
									handleInputChange(
										'retirementAge',
										parseInt(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='60'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Мужчины: 60-65 лет, Женщины: 55-60 лет (с переходным периодом)
							</p>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculatePension}
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
							{/* Estimated Pension */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
									<TrendingUp className='w-5 h-5 mr-2' />
									{t('results.estimatedPension')}
								</h3>
								<div className='text-3xl font-bold text-green-900 dark:text-green-100 mb-2'>
									{result.estimatedPension.toLocaleString('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0,
									})}
								</div>
								<p className='text-sm text-green-700 dark:text-green-300'>
									в месяц
								</p>
							</div>

							{/* Fixed Payment */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center'>
									<Percent className='w-5 h-5 mr-2' />
									{t('results.fixedPayment')}
								</h3>
								<div className='text-xl font-bold text-blue-900 dark:text-blue-100'>
									{result.fixedPayment.toLocaleString('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0,
									})}
								</div>
								<p className='text-sm text-blue-700 dark:text-blue-300'>
									Фиксированная часть пенсии (2024)
								</p>
							</div>

							{/* Pension Points */}
							<div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center'>
									<BarChart3 className='w-5 h-5 mr-2' />
									{t('results.pensionPoints')}
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-purple-700 dark:text-purple-300'>
											Всего баллов:
										</span>{' '}
										<strong className='text-purple-900 dark:text-purple-100 text-xl'>
											{result.totalPoints.toFixed(1)}
										</strong>
									</div>
									<div>
										<span className='text-purple-700 dark:text-purple-300'>
											{t('results.requiredPoints')}:
										</span>{' '}
										<strong className='text-purple-900 dark:text-purple-100'>
											{result.requiredPoints}
										</strong>
									</div>
									{result.totalPoints < result.requiredPoints && (
										<p className='text-red-600 dark:text-red-400 text-xs'>
											⚠️ Недостаточно баллов для получения пенсии
										</p>
									)}
								</div>
							</div>

							{/* Experience and Time */}
							<div className='bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center'>
									<Calendar className='w-5 h-5 mr-2' />
									Информация о стаже
								</h3>
								<div className='space-y-2 text-sm'>
									<div>
										<span className='text-orange-700 dark:text-orange-300'>
											{t('results.yearsToRetirement')}:
										</span>{' '}
										<strong className='text-orange-900 dark:text-orange-100'>
											{result.yearsToRetirement} лет
										</strong>
									</div>
									<div>
										<span className='text-orange-700 dark:text-orange-300'>
											{t('results.totalExperience')}:
										</span>{' '}
										<strong className='text-orange-900 dark:text-orange-100'>
											{result.totalExperience.toFixed(1)} лет
										</strong>
									</div>
									<div>
										<span className='text-orange-700 dark:text-orange-300'>
											{t('results.minimumExperience')}:
										</span>{' '}
										<strong className='text-orange-900 dark:text-orange-100'>
											{result.minimumExperience} лет
										</strong>
									</div>
									{result.totalExperience < result.minimumExperience && (
										<p className='text-red-600 dark:text-red-400 text-xs'>
											⚠️ Недостаточно стажа для получения пенсии
										</p>
									)}
								</div>
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

