'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	Car,
	Clock,
	Percent,
} from 'lucide-react';
import {
	calculateTrafficFines,
	validateTrafficFinesInput,
	formatTrafficFinesCurrency,
	getTrafficFinesOptions,
	type TrafficFinesInput,
	type TrafficFinesResult,
} from '@/lib/calculators/traffic-fines';

/**
 * Traffic Fines Calculator Component
 * 
 * A React component for calculating total traffic fines costs.
 * 
 * Features:
 * - Multiple fine selection
 * - Fine amount display
 * - Total fines calculation
 * - Fine details breakdown
 * - Responsive design
 * 
 * Uses the traffic fines calculation library from @/lib/calculators/traffic-fines
 * for all mathematical operations based on Russian traffic regulations.
 */
export default function TrafficFinesCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.traffic-fines');

	// Form state management
	const [formData, setFormData] = useState<Partial<TrafficFinesInput>>({
		selectedFines: [], // Array of selected fine IDs
	});

	const [result, setResult] = useState<TrafficFinesResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [isCalculated, setIsCalculated] = useState(false); // Calculation status flag

	const finesOptions = getTrafficFinesOptions();

	const handleFineToggle = (fineId: number) => {
		setFormData((prev) => {
			const currentFines = prev.selectedFines || [];
			const newFines = currentFines.includes(fineId)
				? currentFines.filter((id) => id !== fineId)
				: [...currentFines, fineId];

			return { ...prev, selectedFines: newFines };
		});
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateTrafficFinesInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		const input: TrafficFinesInput = {
			selectedFines: formData.selectedFines || [],
		};

		const calculationResult = calculateTrafficFines(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Car className='h-16 w-16 text-red-600' />
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
						<Calculator className='h-5 w-5 mr-2 text-red-600' />
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
						{/* Fines Selection */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-4'>
								{t('form.selectViolations')}
							</label>
							<div className='space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4'>
								{finesOptions.map((fine) => (
									<label
										key={fine.value}
										className='flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg'
									>
										<input
											type='checkbox'
											checked={
												formData.selectedFines?.includes(
													fine.value
												) || false
											}
											onChange={() =>
												handleFineToggle(fine.value)
											}
											className='mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded'
										/>
										<div className='flex-1'>
											<div className='text-sm font-medium text-gray-900'>
												{fine.label}
											</div>
											<div className='text-sm text-gray-500'>
												{formatTrafficFinesCurrency(
													fine.amount
												)}
											</div>
										</div>
									</label>
								))}
							</div>
						</div>

						{/* Calculate Button */}
						<button
							type='button'
							onClick={handleCalculate}
							className='w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
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
							{/* Total Fine */}
							<div className='bg-red-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-red-900 mb-2'>
									{t('results.totalFine')}
								</h3>
								<div className='text-3xl font-bold text-red-900'>
									{formatTrafficFinesCurrency(
										result.totalFine
									)}
								</div>
								<p className='text-red-700 mt-2'>
									{t('results.totalFineDescription')}
								</p>
							</div>

							{/* Discount Information */}
							<div className='bg-green-50 rounded-lg p-6'>
								<div className='flex items-center mb-3'>
									<Clock className='h-5 w-5 text-green-600 mr-2' />
									<h4 className='text-lg font-semibold text-green-900'>
										{t('results.discountTitle')}
									</h4>
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between'>
										<span className='text-green-700'>
											{t('results.discountAmount')}:
										</span>
										<span className='font-bold text-green-900'>
											{formatTrafficFinesCurrency(
												result.discountAmount
											)}
										</span>
									</div>
									<div className='flex justify-between text-lg'>
										<span className='text-green-700'>
											{t('results.discountedFine')}:
										</span>
										<span className='font-bold text-green-900'>
											{formatTrafficFinesCurrency(
												result.discountedFine
											)}
										</span>
									</div>
									<div className='text-sm text-green-600 mt-3'>
										{t('results.discountNote')}
									</div>
								</div>
							</div>

							{/* Selected Violations */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900'>
									{t('results.selectedViolations')}
								</h4>
								<div className='space-y-2'>
									{result.selectedFinesDetails.map((fine) => (
										<div
											key={fine.id}
											className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'
										>
											<span className='text-sm text-gray-700'>
												{fine.name}
											</span>
											<span className='font-medium text-gray-900'>
												{formatTrafficFinesCurrency(
													fine.amount
												)}
											</span>
										</div>
									))}
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
								{t('seo.calculation.title')}
							</h3>
							<p className='mb-4'>
								{t('seo.calculation.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.calculation.speed')}</li>
								<li>{t('seo.calculation.safety')}</li>
								<li>{t('seo.calculation.traffic')}</li>
								<li>{t('seo.calculation.parking')}</li>
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
								<li>{t('seo.advantages.discount')}</li>
								<li>{t('seo.advantages.comprehensive')}</li>
							</ul>
						</div>

						<div className='bg-red-50 p-6 rounded-lg border border-red-200'>
							<h3 className='text-xl font-semibold text-red-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='text-red-800 mb-4'>
								{t('seo.tips.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-red-800'>
								<li>{t('seo.tips.payment')}</li>
								<li>{t('seo.tips.avoidance')}</li>
								<li>{t('seo.tips.documentation')}</li>
								<li>{t('seo.tips.consultation')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
