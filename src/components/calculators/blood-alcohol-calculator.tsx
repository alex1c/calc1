'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Calculator,
	Wine,
	User,
	Weight,
	Droplets,
	Percent,
	Clock,
	AlertTriangle,
} from 'lucide-react';
import {
	calculateAlcohol,
	validateAlcoholInput,
	formatTime,
	type AlcoholInput,
	type AlcoholResult,
} from '@/lib/calculators/alcohol';

export default function BloodAlcoholCalculator() {
	const t = useTranslations('calculators.bloodAlcohol');
	const locale = useLocale();

	const [formData, setFormData] = useState<AlcoholInput>({
		gender: 'male',
		weight: 70,
		volume: 500,
		strength: 5,
		startTime: new Date(),
	});

	const [result, setResult] = useState<AlcoholResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculating, setIsCalculating] = useState(false);

	// Функция для форматирования даты в формат datetime-local
	const formatDateTimeLocal = (date: Date): string => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	const handleInputChange = (field: keyof AlcoholInput, value: any) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Автоматический пересчёт при изменении данных
		if (result) {
			handleCalculate();
		}
	};

	const handleCalculate = () => {
		setIsCalculating(true);
		setErrors([]);

		// Валидация
		const validation = validateAlcoholInput(formData);
		if (!validation.isValid) {
			setErrors(validation.errors);
			setIsCalculating(false);
			return;
		}

		// Расчёт
		try {
			const calculationResult = calculateAlcohol(formData, locale);
			setResult(calculationResult);
		} catch (error) {
			setErrors([t('errors.calculationError')]);
		}

		setIsCalculating(false);
	};

	const handleReset = () => {
		setFormData({
			gender: 'male',
			weight: 70,
			volume: 500,
			strength: 5,
			startTime: new Date(),
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			{/* Заголовок */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-center space-y-4'
			>
				<div className='flex items-center justify-center gap-3 text-4xl'>
					<Wine className='text-red-600' />
					<span>🍷</span>
					<Calculator className='text-blue-600' />
				</div>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
					{t('title')}
				</h1>
				<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</motion.div>

			{/* Предупреждение */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4'
			>
				<div className='flex items-start gap-3'>
					<AlertTriangle className='text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0' />
					<div>
						<h3 className='font-semibold text-amber-800 dark:text-amber-200 mb-1'>
							{t('warning.title')}
						</h3>
						<p className='text-amber-700 dark:text-amber-300 text-sm'>
							{t('warning.content')}
						</p>
					</div>
				</div>
			</motion.div>

			<div className='grid lg:grid-cols-2 gap-8'>
				{/* Форма */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className='space-y-6'
				>
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
							<User className='text-blue-600' />
							{t('form.title')}
						</h2>

						<div className='space-y-4'>
							{/* Пол */}
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.gender')}
								</label>
								<div className='grid grid-cols-2 gap-3'>
									<button
										type='button'
										onClick={() =>
											handleInputChange('gender', 'male')
										}
										className={`p-3 rounded-lg border-2 transition-all ${
											formData.gender === 'male'
												? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
												: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
										}`}
									>
										<div className='text-center'>
											<div className='text-lg mb-1'>
												👨
											</div>
											<div className='text-sm font-medium'>
												{t('form.male')}
											</div>
										</div>
									</button>
									<button
										type='button'
										onClick={() =>
											handleInputChange(
												'gender',
												'female'
											)
										}
										className={`p-3 rounded-lg border-2 transition-all ${
											formData.gender === 'female'
												? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
												: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
										}`}
									>
										<div className='text-center'>
											<div className='text-lg mb-1'>
												👩
											</div>
											<div className='text-sm font-medium'>
												{t('form.female')}
											</div>
										</div>
									</button>
								</div>
							</div>

							{/* Вес */}
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									<Weight className='inline w-4 h-4 mr-1' />
									{t('form.weight')} (кг)
								</label>
								<input
									type='number'
									value={formData.weight}
									onChange={(e) =>
										handleInputChange(
											'weight',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									min='30'
									max='300'
									step='0.1'
								/>
							</div>

							{/* Объём напитка */}
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									<Droplets className='inline w-4 h-4 mr-1' />
									{t('form.volume')} (мл)
								</label>
								<input
									type='number'
									value={formData.volume}
									onChange={(e) =>
										handleInputChange(
											'volume',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									min='1'
									max='10000'
									step='1'
								/>
							</div>

							{/* Крепость */}
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									<Percent className='inline w-4 h-4 mr-1' />
									{t('form.strength')} (%)
								</label>
								<input
									type='number'
									value={formData.strength}
									onChange={(e) =>
										handleInputChange(
											'strength',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
									min='0'
									max='100'
									step='0.1'
								/>
							</div>

							{/* Время начала */}
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									<Clock className='inline w-4 h-4 mr-1' />
									{t('form.startTime')}
								</label>
								<input
									type='datetime-local'
									value={formatDateTimeLocal(
										formData.startTime
									)}
									onChange={(e) =>
										handleInputChange(
											'startTime',
											new Date(e.target.value)
										)
									}
									className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								/>
							</div>
						</div>

						{/* Ошибки */}
						{errors.length > 0 && (
							<div className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
								<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
									{errors.map((error, index) => (
										<li key={index}>• {error}</li>
									))}
								</ul>
							</div>
						)}

						{/* Кнопки */}
						<div className='flex gap-3 mt-6'>
							<button
								onClick={handleCalculate}
								disabled={isCalculating}
								className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
							>
								{isCalculating ? (
									<>
										<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
										{t('form.calculating')}
									</>
								) : (
									<>
										<Calculator className='w-4 h-4' />
										{t('form.calculate')}
									</>
								)}
							</button>
							<button
								onClick={handleReset}
								className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors'
							>
								{t('form.reset')}
							</button>
						</div>
					</div>
				</motion.div>

				{/* Результаты */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className='space-y-6'
				>
					{result && (
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
								<Wine className='text-red-600' />
								{t('result.title')}
							</h2>

							<div className='space-y-4'>
								{/* BAC */}
								<div className='text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg'>
									<div className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
										{result.bac}‰
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400'>
										{t('result.bac')}
									</div>
								</div>

								{/* Состояние */}
								<div className='text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
									<div className='text-lg font-semibold text-gray-900 dark:text-white'>
										{result.state}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400'>
										{t('result.state')}
									</div>
								</div>

								{/* Время выведения */}
								<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
									<div className='text-xl font-semibold text-green-600 dark:text-green-400'>
										{formatTime(
											result.eliminationTime,
											locale
										)}
									</div>
									<div className='text-sm text-gray-600 dark:text-gray-400'>
										{t('result.eliminationTime')}
									</div>
								</div>

								{/* Предупреждение */}
								<div
									className={`p-4 rounded-lg ${
										result.stateLevel >= 3
											? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
											: result.stateLevel >= 1
											? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
											: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
									}`}
								>
									<div
										className={`text-sm font-medium ${
											result.stateLevel >= 3
												? 'text-red-700 dark:text-red-300'
												: result.stateLevel >= 1
												? 'text-yellow-700 dark:text-yellow-300'
												: 'text-green-700 dark:text-green-300'
										}`}
									>
										{result.warning}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Информация о калькуляторе */}
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
						<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
							{t('info.title')}
						</h3>
						<div className='text-sm text-blue-800 dark:text-blue-200 space-y-2'>
							<p>{t('info.formula')}</p>
							<p>{t('info.elimination')}</p>
							<p>{t('info.accuracy')}</p>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
