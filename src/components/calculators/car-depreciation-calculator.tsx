'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	Car,
	TrendingDown,
	BarChart3,
	Info,
	Lightbulb,
} from 'lucide-react';
import {
	calculateCarDepreciation,
	validateCarDepreciationInput,
	formatDepreciationCurrency,
	formatDepreciationNumber,
	getDepreciationMethods,
	getDepreciationRates,
	getDepreciationInsights,
	type CarDepreciationInput,
	type CarDepreciationResult,
	type DepreciationMethod,
} from '@/lib/calculators/car-depreciation';

export default function CarDepreciationCalculator() {
	const t = useTranslations('calculators.car-depreciation');

	const [formData, setFormData] = useState<Partial<CarDepreciationInput>>({
		initialValue: 0,
		ownershipYears: 0,
		depreciationMethod: 'linear',
		depreciationRate: 0,
		annualMileage: 0,
	});

	const [result, setResult] = useState<CarDepreciationResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const depreciationMethods = getDepreciationMethods();
	const depreciationRates = getDepreciationRates();

	const handleInputChange = (
		field: keyof CarDepreciationInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleMethodChange = (value: DepreciationMethod) => {
		setFormData((prev) => ({ ...prev, depreciationMethod: value }));
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateCarDepreciationInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			setResult(null);
			return;
		}

		const input: CarDepreciationInput = {
			initialValue: formData.initialValue || 0,
			ownershipYears: formData.ownershipYears || 0,
			depreciationMethod: formData.depreciationMethod || 'linear',
			depreciationRate: formData.depreciationRate || 0,
			annualMileage: formData.annualMileage || 0,
		};

		const calculationResult = calculateCarDepreciation(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	const insights = result ? getDepreciationInsights(result) : null;

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<TrendingDown className='h-16 w-16 text-orange-600' />
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
						<Calculator className='h-5 w-5 mr-2 text-orange-600' />
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
						{/* Initial Value */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.initialValue')}
							</label>
							<input
								type='number'
								value={formData.initialValue || ''}
								onChange={(e) =>
									handleInputChange(
										'initialValue',
										e.target.value
									)
								}
								placeholder='1500000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							/>
						</div>

						{/* Ownership Years */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.ownershipYears')}
							</label>
							<input
								type='number'
								value={formData.ownershipYears || ''}
								onChange={(e) =>
									handleInputChange(
										'ownershipYears',
										e.target.value
									)
								}
								placeholder='5'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							/>
						</div>

						{/* Depreciation Method */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.depreciationMethod')}
							</label>
							<div className='space-y-2'>
								{depreciationMethods.map((method) => (
									<label
										key={method.value}
										className='flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg'
									>
										<input
											type='radio'
											name='depreciationMethod'
											value={method.value}
											checked={
												formData.depreciationMethod ===
												method.value
											}
											onChange={() =>
												handleMethodChange(method.value)
											}
											className='mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300'
										/>
										<div className='flex-1'>
											<div className='text-sm font-medium text-gray-900'>
												{method.label}
											</div>
											<div className='text-sm text-gray-500'>
												{method.description}
											</div>
										</div>
									</label>
								))}
							</div>
						</div>

						{/* Depreciation Rate */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.depreciationRate')}
							</label>
							<select
								value={formData.depreciationRate || ''}
								onChange={(e) =>
									handleInputChange(
										'depreciationRate',
										e.target.value
									)
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							>
								<option value=''>{t('form.selectRate')}</option>
								{depreciationRates.map((rate) => (
									<option
										key={rate.value}
										value={rate.value}
									>
										{rate.label} - {rate.description}
									</option>
								))}
							</select>
						</div>

						{/* Annual Mileage (Optional) */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.annualMileage')} ({t('form.optional')})
							</label>
							<input
								type='number'
								value={formData.annualMileage || ''}
								onChange={(e) =>
									handleInputChange(
										'annualMileage',
										e.target.value
									)
								}
								placeholder='15000'
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
							/>
						</div>

						{/* Calculate Button */}
						<button
							type='button'
							onClick={handleCalculate}
							className='w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors'
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
							{/* Summary */}
							<div className='bg-orange-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-orange-900 mb-2'>
									{t('results.finalValue')}
								</h3>
								<div className='text-3xl font-bold text-orange-900'>
									{formatDepreciationCurrency(
										result.finalValue
									)}
								</div>
								<p className='text-orange-700 mt-2'>
									{t('results.finalValueDescription')}
								</p>
							</div>

							{/* Key Metrics */}
							<div className='grid grid-cols-2 gap-4'>
								<div className='bg-gray-50 rounded-lg p-4 text-center'>
									<div className='text-2xl font-bold text-gray-900'>
										{formatDepreciationCurrency(
											result.totalDepreciation
										)}
									</div>
									<div className='text-sm text-gray-600'>
										{t('results.totalDepreciation')}
									</div>
								</div>
								<div className='bg-gray-50 rounded-lg p-4 text-center'>
									<div className='text-2xl font-bold text-gray-900'>
										{formatDepreciationNumber(
											result.depreciationPercentage
										)}
										%
									</div>
									<div className='text-sm text-gray-600'>
										{t('results.depreciationPercentage')}
									</div>
								</div>
							</div>

							{/* Insights */}
							{insights && (
								<div
									className={`rounded-lg p-4 ${
										insights.severity === 'low'
											? 'bg-green-50 border border-green-200'
											: insights.severity === 'medium'
											? 'bg-yellow-50 border border-yellow-200'
											: 'bg-red-50 border border-red-200'
									}`}
								>
									<div className='flex items-center mb-2'>
										<Lightbulb
											className={`h-5 w-5 mr-2 ${
												insights.severity === 'low'
													? 'text-green-600'
													: insights.severity ===
													  'medium'
													? 'text-yellow-600'
													: 'text-red-600'
											}`}
										/>
										<span
											className={`font-medium ${
												insights.severity === 'low'
													? 'text-green-800'
													: insights.severity ===
													  'medium'
													? 'text-yellow-800'
													: 'text-red-800'
											}`}
										>
											{t('results.insights')}
										</span>
									</div>
									<p
										className={`text-sm mb-2 ${
											insights.severity === 'low'
												? 'text-green-700'
												: insights.severity === 'medium'
												? 'text-yellow-700'
												: 'text-red-700'
										}`}
									>
										{insights.message}
									</p>
									<ul
										className={`text-xs space-y-1 ${
											insights.severity === 'low'
												? 'text-green-600'
												: insights.severity === 'medium'
												? 'text-yellow-600'
												: 'text-red-600'
										}`}
									>
										{insights.recommendations.map(
											(rec, index) => (
												<li key={index}>• {rec}</li>
											)
										)}
									</ul>
								</div>
							)}

							{/* Yearly Breakdown Table */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900 flex items-center'>
									<BarChart3 className='h-5 w-5 mr-2 text-orange-600' />
									{t('results.yearlyBreakdown')}
								</h4>
								<div className='overflow-x-auto'>
									<table className='min-w-full divide-y divide-gray-200'>
										<thead className='bg-gray-50'>
											<tr>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t('results.year')}
												</th>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t(
														'results.beginningValue'
													)}
												</th>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t('results.depreciation')}
												</th>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t('results.endingValue')}
												</th>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t('results.percentage')}
												</th>
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-200'>
											{result.yearlyBreakdown.map(
												(year) => (
													<tr
														key={year.year}
														className='hover:bg-gray-50'
													>
														<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
															{year.year}
														</td>
														<td className='px-3 py-2 whitespace-nowrap text-sm text-gray-900'>
															{formatDepreciationCurrency(
																year.beginningValue
															)}
														</td>
														<td className='px-3 py-2 whitespace-nowrap text-sm text-red-600'>
															-
															{formatDepreciationCurrency(
																year.depreciationAmount
															)}
														</td>
														<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
															{formatDepreciationCurrency(
																year.endingValue
															)}
														</td>
														<td className='px-3 py-2 whitespace-nowrap text-sm text-gray-500'>
															{formatDepreciationNumber(
																year.depreciationPercentage
															)}
															%
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
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
								{t('seo.methods.title')}
							</h3>
							<p className='mb-4'>{t('seo.methods.content')}</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.methods.linear')}</li>
								<li>{t('seo.methods.declining')}</li>
								<li>{t('seo.methods.factors')}</li>
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
								<li>{t('seo.advantages.planning')}</li>
								<li>{t('seo.advantages.comparison')}</li>
								<li>{t('seo.advantages.insights')}</li>
								<li>{t('seo.advantages.financial')}</li>
							</ul>
						</div>

						<div className='bg-orange-50 p-6 rounded-lg border border-orange-200'>
							<h3 className='text-xl font-semibold text-orange-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-orange-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-orange-800'>
								<li>{t('seo.tips.maintenance')}</li>
								<li>{t('seo.tips.mileage')}</li>
								<li>{t('seo.tips.market')}</li>
								<li>{t('seo.tips.timing')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
