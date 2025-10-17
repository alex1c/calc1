'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Pill,
	User,
	Calendar,
	Activity,
	Info,
	AlertCircle,
	CheckCircle,
	Zap,
	Copy,
	Download,
	Eye,
	EyeOff,
} from 'lucide-react';
import {
	calculateVitamins,
	validateVitaminInput,
	getVitaminLevelColor,
	getColorClasses,
	formatVitaminValue,
	getAgeRecommendations,
	getActivityRecommendations,
	VitaminInput,
	VitaminResult,
} from '@/lib/calculators/vitamins';

/**
 * Vitamins Calculator Component
 * Interactive calculator for daily vitamin and mineral requirements
 */
export default function VitaminsCalculator() {
	const t = useTranslations('calculators.vitamins');

	// State for input values
	const [gender, setGender] = useState<'male' | 'female'>('female');
	const [age, setAge] = useState<string>('');
	const [activityLevel, setActivityLevel] = useState<
		'low' | 'medium' | 'high'
	>('medium');
	const [result, setResult] = useState<VitaminResult | null>(null);
	const [error, setError] = useState<string>('');
	const [isCalculating, setIsCalculating] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<'vitamins' | 'minerals'>(
		'vitamins'
	);
	const [showDetails, setShowDetails] = useState<boolean>(false);

	/**
	 * Handle form submission and vitamin calculation
	 */
	const handleCalculate = async () => {
		setError('');
		setIsCalculating(true);

		try {
			const ageNum = parseInt(age);

			// Validate input
			const validation = validateVitaminInput({
				gender,
				age: ageNum,
				activityLevel,
			});

			if (!validation.isValid) {
				setError(t(`form.errors.${validation.error}`));
				return;
			}

			// Calculate vitamins
			const vitaminResult = calculateVitamins({
				gender,
				age: ageNum,
				activityLevel,
			});

			setResult(vitaminResult);
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
		setGender('female');
		setAge('');
		setActivityLevel('medium');
		setResult(null);
		setError('');
		setActiveTab('vitamins');
		setShowDetails(false);
	};

	/**
	 * Copy table to clipboard
	 */
	const handleCopyTable = async () => {
		if (!result) return;

		const activeData =
			activeTab === 'vitamins' ? result.vitamins : result.minerals;
		const tableText = activeData
			.map(
				(item) =>
					`${t(`vitamins.${item.name}.name`)}: ${formatVitaminValue(
						item.normalValue,
						item.unit
					)}`
			)
			.join('\n');

		try {
			await navigator.clipboard.writeText(tableText);
			// You could add a toast notification here
		} catch (err) {
			console.error('Failed to copy table:', err);
		}
	};

	/**
	 * Get activity level color
	 */
	const getActivityColor = (level: string) => {
		const colorMap = {
			low: 'bg-blue-100 text-blue-800 border-blue-200',
			medium: 'bg-green-100 text-green-800 border-green-200',
			high: 'bg-orange-100 text-orange-800 border-orange-200',
		};
		return (
			colorMap[level as keyof typeof colorMap] ||
			'bg-gray-100 text-gray-800 border-gray-200'
		);
	};

	return (
		<div className='max-w-6xl mx-auto'>
			{/* Page Header with Infographic */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-green-100 dark:bg-green-900 rounded-full'>
							<Pill className='w-12 h-12 text-green-600 dark:text-green-400' />
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
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.vitamins')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.vitaminsDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
							{t('infographic.minerals')}
						</div>
						<div className='text-sm text-blue-800 dark:text-blue-200'>
							{t('infographic.mineralsDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
							{t('infographic.personalized')}
						</div>
						<div className='text-sm text-purple-800 dark:text-purple-200'>
							{t('infographic.personalizedDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Calculator Card */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='flex items-center gap-3 mb-6'>
					<div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
						<Pill className='w-6 h-6 text-green-600 dark:text-green-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('form.title')}
					</h2>
				</div>

				{/* Input Form */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
					{/* Gender Selection */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<User className='w-4 h-4' />
							{t('form.gender')}
						</label>
						<div className='grid grid-cols-2 gap-2'>
							<button
								type='button'
								onClick={() => setGender('male')}
								className={`p-3 rounded-lg border transition-colors ${
									gender === 'male'
										? 'bg-blue-100 border-blue-500 text-blue-800'
										: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
								}`}
							>
								{t('form.male')}
							</button>
							<button
								type='button'
								onClick={() => setGender('female')}
								className={`p-3 rounded-lg border transition-colors ${
									gender === 'female'
										? 'bg-pink-100 border-pink-500 text-pink-800'
										: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
								}`}
							>
								{t('form.female')}
							</button>
						</div>
					</div>

					{/* Age Input */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Calendar className='w-4 h-4' />
							{t('form.age')}
						</label>
						<div className='relative'>
							<input
								type='number'
								value={age}
								onChange={(e) => setAge(e.target.value)}
								placeholder={t('form.agePlaceholder')}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
								min='1'
								max='120'
							/>
							<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400'>
								{t('form.years')}
							</span>
						</div>
					</div>

					{/* Activity Level */}
					<div className='space-y-2'>
						<label className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
							<Activity className='w-4 h-4' />
							{t('form.activityLevel')}
						</label>
						<div className='space-y-2'>
							{['low', 'medium', 'high'].map((level) => (
								<button
									key={level}
									type='button'
									onClick={() =>
										setActivityLevel(
											level as 'low' | 'medium' | 'high'
										)
									}
									className={`w-full p-2 rounded-lg border text-left transition-colors ${
										activityLevel === level
											? getActivityColor(level)
											: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
									}`}
								>
									<div className='font-medium'>
										{t(`form.activity.${level}.title`)}
									</div>
									<div className='text-xs opacity-75'>
										{t(
											`form.activity.${level}.description`
										)}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 mb-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating || !age}
						className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Zap className='w-4 h-4' />
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
						{/* Summary */}
						<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
							<h4 className='font-semibold text-green-900 dark:text-green-300 mb-2'>
								{t('results.summary')}
							</h4>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
								<div>
									<span className='text-green-700 dark:text-green-300'>
										{t('results.gender')}:
									</span>
									<span className='ml-2 font-medium'>
										{t(`form.${gender}`)}
									</span>
								</div>
								<div>
									<span className='text-green-700 dark:text-green-300'>
										{t('results.age')}:
									</span>
									<span className='ml-2 font-medium'>
										{age} {t('form.years')}
									</span>
								</div>
								<div>
									<span className='text-green-700 dark:text-green-300'>
										{t('results.activity')}:
									</span>
									<span className='ml-2 font-medium'>
										{t(
											`form.activity.${activityLevel}.title`
										)}
									</span>
								</div>
							</div>
						</div>

						{/* Tab Navigation */}
						<div className='flex border-b border-gray-200 dark:border-gray-700'>
							<button
								onClick={() => setActiveTab('vitamins')}
								className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
									activeTab === 'vitamins'
										? 'border-green-500 text-green-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
							>
								{t('results.vitamins')}
							</button>
							<button
								onClick={() => setActiveTab('minerals')}
								className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
									activeTab === 'minerals'
										? 'border-green-500 text-green-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
							>
								{t('results.minerals')}
							</button>
						</div>

						{/* Table Actions */}
						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-2'>
								<button
									onClick={() => setShowDetails(!showDetails)}
									className='flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors'
								>
									{showDetails ? (
										<EyeOff className='w-4 h-4' />
									) : (
										<Eye className='w-4 h-4' />
									)}
									{showDetails
										? t('results.hideDetails')
										: t('results.showDetails')}
								</button>
							</div>
							<div className='flex gap-2'>
								<button
									onClick={handleCopyTable}
									className='flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors'
								>
									<Copy className='w-4 h-4' />
									{t('results.copyTable')}
								</button>
								<button
									onClick={() => {
										/* PDF export functionality */
									}}
									className='flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors'
								>
									<Download className='w-4 h-4' />
									{t('results.exportPDF')}
								</button>
							</div>
						</div>

						{/* Vitamins/Minerals Table */}
						<div className='overflow-x-auto'>
							<table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
								<thead>
									<tr className='bg-gray-50 dark:bg-gray-700'>
										<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
											{t('table.name')}
										</th>
										<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
											{t('table.norm')}
										</th>
										{showDetails && (
											<>
												<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
													{t('table.role')}
												</th>
												<th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
													{t('table.increasedNeed')}
												</th>
											</>
										)}
									</tr>
								</thead>
								<tbody>
									{(activeTab === 'vitamins'
										? result.vitamins
										: result.minerals
									).map((item, index) => (
										<tr
											key={item.name}
											className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
												index % 2 === 0
													? 'bg-white dark:bg-gray-800'
													: 'bg-gray-25 dark:bg-gray-750'
											}`}
										>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
												<div className='flex items-center gap-2'>
													{t(
														`vitamins.${item.name}.name`
													)}
													<Info
														className='w-4 h-4 text-gray-400 cursor-help'
														title={t(
															`vitamins.${item.name}.description`
														)}
													/>
												</div>
											</td>
											<td className='border border-gray-300 dark:border-gray-600 px-4 py-3'>
												<span
													className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${getColorClasses(
														'normal'
													)}`}
												>
													{formatVitaminValue(
														item.normalValue,
														item.unit
													)}
												</span>
											</td>
											{showDetails && (
												<>
													<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
														{t(
															`vitamins.${item.name}.role.${item.role}`
														)}
													</td>
													<td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300'>
														{t(
															`vitamins.${item.name}.increasedNeed.${item.increasedNeed}`
														)}
													</td>
												</>
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Recommendations */}
						<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
							<h4 className='font-semibold text-blue-900 dark:text-blue-300 mb-3'>
								{t('results.recommendations')}
							</h4>
							<div className='space-y-2'>
								{result.recommendations.map(
									(recommendation, index) => (
										<div
											key={index}
											className='flex items-start gap-2'
										>
											<CheckCircle className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
											<p className='text-sm text-blue-800 dark:text-blue-200'>
												{t(
													`recommendations.${recommendation}`
												)}
											</p>
										</div>
									)
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Tips */}
			<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
					<h4 className='font-semibold text-yellow-800 dark:text-yellow-200'>
						{t('tips.title')}
					</h4>
				</div>
				<div className='space-y-2 text-sm text-yellow-700 dark:text-yellow-300'>
					<p>{t('tips.consultation')}</p>
					<p>{t('tips.balancedDiet')}</p>
					<p>{t('tips.supplements')}</p>
				</div>
			</div>
		</div>
	);
}
