'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	AlertCircle,
	CheckCircle,
	Home,
	Ruler,
	Plus,
	Minus,
	Info,
	Table,
} from 'lucide-react';
import {
	calculateWallpaper,
	validateWallpaperInput,
	formatWallpaperArea,
	formatWallpaperNumber,
	getStandardRollSizes,
	getStandardReservePercentages,
	addDoor,
	addWindow,
	removeDoor,
	removeWindow,
	updateDoor,
	updateWindow,
	type WallpaperInput,
	type WallpaperResult,
	type DoorWindow,
} from '@/lib/calculators/wallpaper';

export default function WallpaperCalculator() {
	const t = useTranslations('calculators.wallpaper');

	const [formData, setFormData] = useState<Partial<WallpaperInput>>({
		roomLength: 0,
		roomWidth: 0,
		wallHeight: 0,
		rollWidth: 0.53,
		rollLength: 10.05,
		doors: [],
		windows: [],
		reservePercentage: 10,
	});

	const [result, setResult] = useState<WallpaperResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);
	const [isCalculated, setIsCalculated] = useState(false);

	const standardRollSizes = getStandardRollSizes(t);
	const standardReservePercentages = getStandardReservePercentages(t);

	const handleInputChange = (
		field: keyof WallpaperInput,
		value: string | number
	) => {
		const numValue =
			typeof value === 'string' ? parseFloat(value) || 0 : value;
		setFormData((prev) => ({ ...prev, [field]: numValue }));
		setIsCalculated(false);
	};

	const handleRollSizeChange = (width: number, length: number) => {
		setFormData((prev) => ({
			...prev,
			rollWidth: width,
			rollLength: length,
		}));
		setIsCalculated(false);
	};

	const handleReserveChange = (percentage: number) => {
		setFormData((prev) => ({ ...prev, reservePercentage: percentage }));
		setIsCalculated(false);
	};

	const handleAddDoor = () => {
		const newFormData = addDoor(formData as WallpaperInput);
		setFormData(newFormData);
		setIsCalculated(false);
	};

	const handleAddWindow = () => {
		const newFormData = addWindow(formData as WallpaperInput);
		setFormData(newFormData);
		setIsCalculated(false);
	};

	const handleRemoveDoor = (index: number) => {
		const newFormData = removeDoor(formData as WallpaperInput, index);
		setFormData(newFormData);
		setIsCalculated(false);
	};

	const handleRemoveWindow = (index: number) => {
		const newFormData = removeWindow(formData as WallpaperInput, index);
		setFormData(newFormData);
		setIsCalculated(false);
	};

	const handleDoorChange = (
		index: number,
		field: 'width' | 'height',
		value: string
	) => {
		const numValue = parseFloat(value) || 0;
		const door = { ...formData.doors![index], [field]: numValue };
		const newFormData = updateDoor(formData as WallpaperInput, index, door);
		setFormData(newFormData);
		setIsCalculated(false);
	};

	const handleWindowChange = (
		index: number,
		field: 'width' | 'height',
		value: string
	) => {
		const numValue = parseFloat(value) || 0;
		const window = { ...formData.windows![index], [field]: numValue };
		const newFormData = updateWindow(
			formData as WallpaperInput,
			index,
			window
		);
		setFormData(newFormData);
		setIsCalculated(false);
	};

	const handleCalculate = () => {
		const validationErrors = validateWallpaperInput(formData);
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			setResult(null);
			return;
		}

		const input: WallpaperInput = {
			roomLength: formData.roomLength || 0,
			roomWidth: formData.roomWidth || 0,
			wallHeight: formData.wallHeight || 0,
			rollWidth: formData.rollWidth || 0.53,
			rollLength: formData.rollLength || 10.05,
			doors: formData.doors || [],
			windows: formData.windows || [],
			reservePercentage: formData.reservePercentage || 10,
		};

		const calculationResult = calculateWallpaper(input);
		setResult(calculationResult);
		setIsCalculated(true);
	};

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-6'>
					<Home className='h-16 w-16 text-blue-600' />
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
						{/* Room Dimensions */}
						<div className='space-y-4'>
							<h3 className='text-lg font-medium text-gray-900 flex items-center'>
								<Ruler className='h-5 w-5 mr-2 text-blue-600' />
								{t('form.roomDimensions')}
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.roomLength')}
									</label>
									<input
										type='number'
										step='0.01'
										value={formData.roomLength || ''}
										onChange={(e) =>
											handleInputChange(
												'roomLength',
												e.target.value
											)
										}
										placeholder='4.5'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.roomWidth')}
									</label>
									<input
										type='number'
										step='0.01'
										value={formData.roomWidth || ''}
										onChange={(e) =>
											handleInputChange(
												'roomWidth',
												e.target.value
											)
										}
										placeholder='3.2'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{t('form.wallHeight')}
									</label>
									<input
										type='number'
										step='0.01'
										value={formData.wallHeight || ''}
										onChange={(e) =>
											handleInputChange(
												'wallHeight',
												e.target.value
											)
										}
										placeholder='2.7'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
							</div>
						</div>

						{/* Roll Dimensions */}
						<div className='space-y-4'>
							<h3 className='text-lg font-medium text-gray-900'>
								{t('form.rollDimensions')}
							</h3>
							<div className='space-y-3'>
								{standardRollSizes.map((size) => (
									<label
										key={`${size.width}-${size.length}`}
										className='flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg'
									>
										<input
											type='radio'
											name='rollSize'
											checked={
												formData.rollWidth ===
													size.width &&
												formData.rollLength ===
													size.length
											}
											onChange={() =>
												handleRollSizeChange(
													size.width,
													size.length
												)
											}
											className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
										/>
										<div className='flex-1'>
											<div className='text-sm font-medium text-gray-900'>
												{size.label}
											</div>
											<div className='text-sm text-gray-500'>
												{size.description}
											</div>
										</div>
									</label>
								))}
							</div>
						</div>

						{/* Doors */}
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-medium text-gray-900'>
									{t('form.doors')} (
									{formData.doors?.length || 0})
								</h3>
								<button
									type='button'
									onClick={handleAddDoor}
									className='flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors'
								>
									<Plus className='h-4 w-4 mr-1' />
									{t('form.addDoor')}
								</button>
							</div>
							{formData.doors?.map((door, index) => (
								<div
									key={index}
									className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'
								>
									<div className='flex-1 grid grid-cols-2 gap-3'>
										<div>
											<label className='block text-xs font-medium text-gray-600 mb-1'>
												{t('form.width')}
											</label>
											<input
												type='number'
												step='0.01'
												value={door.width}
												onChange={(e) =>
													handleDoorChange(
														index,
														'width',
														e.target.value
													)
												}
												className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500'
											/>
										</div>
										<div>
											<label className='block text-xs font-medium text-gray-600 mb-1'>
												{t('form.height')}
											</label>
											<input
												type='number'
												step='0.01'
												value={door.height}
												onChange={(e) =>
													handleDoorChange(
														index,
														'height',
														e.target.value
													)
												}
												className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500'
											/>
										</div>
									</div>
									<button
										type='button'
										onClick={() => handleRemoveDoor(index)}
										className='p-1 text-red-600 hover:bg-red-100 rounded'
									>
										<Minus className='h-4 w-4' />
									</button>
								</div>
							))}
						</div>

						{/* Windows */}
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-medium text-gray-900'>
									{t('form.windows')} (
									{formData.windows?.length || 0})
								</h3>
								<button
									type='button'
									onClick={handleAddWindow}
									className='flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors'
								>
									<Plus className='h-4 w-4 mr-1' />
									{t('form.addWindow')}
								</button>
							</div>
							{formData.windows?.map((window, index) => (
								<div
									key={index}
									className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'
								>
									<div className='flex-1 grid grid-cols-2 gap-3'>
										<div>
											<label className='block text-xs font-medium text-gray-600 mb-1'>
												{t('form.width')}
											</label>
											<input
												type='number'
												step='0.01'
												value={window.width}
												onChange={(e) =>
													handleWindowChange(
														index,
														'width',
														e.target.value
													)
												}
												className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500'
											/>
										</div>
										<div>
											<label className='block text-xs font-medium text-gray-600 mb-1'>
												{t('form.height')}
											</label>
											<input
												type='number'
												step='0.01'
												value={window.height}
												onChange={(e) =>
													handleWindowChange(
														index,
														'height',
														e.target.value
													)
												}
												className='w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500'
											/>
										</div>
									</div>
									<button
										type='button'
										onClick={() =>
											handleRemoveWindow(index)
										}
										className='p-1 text-red-600 hover:bg-red-100 rounded'
									>
										<Minus className='h-4 w-4' />
									</button>
								</div>
							))}
						</div>

						{/* Reserve Percentage */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.reservePercentage')}
							</label>
							<div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
								{standardReservePercentages.map((reserve) => (
									<label
										key={reserve.value}
										className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded'
									>
										<input
											type='radio'
											name='reserve'
											value={reserve.value}
											checked={
												formData.reservePercentage ===
												reserve.value
											}
											onChange={() =>
												handleReserveChange(
													reserve.value
												)
											}
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
										/>
										<div>
											<div className='text-sm font-medium text-gray-900'>
												{reserve.label}
											</div>
											<div className='text-xs text-gray-500'>
												{reserve.description}
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
							{/* Summary */}
							<div className='bg-blue-50 rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.rollsNeeded')}
								</h3>
								<div className='text-3xl font-bold text-blue-900'>
									{result.rollsNeeded} {t('results.rolls')}
								</div>
								<p className='text-blue-700 mt-2'>
									{t('results.rollsDescription')}
								</p>
							</div>

							{/* Results Table */}
							<div className='space-y-4'>
								<h4 className='text-lg font-semibold text-gray-900 flex items-center'>
									<Table className='h-5 w-5 mr-2 text-blue-600' />
									{t('results.detailedResults')}
								</h4>
								<div className='overflow-x-auto'>
									<table className='min-w-full divide-y divide-gray-200'>
										<thead className='bg-gray-50'>
											<tr>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t('results.parameter')}
												</th>
												<th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													{t('results.value')}
												</th>
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-200'>
											<tr>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
													{t('results.totalWallArea')}
												</td>
												<td className='px-3 py-2 whitespace-nowrap text-sm text-gray-900'>
													{formatWallpaperArea(
														result.totalWallArea
													)}
												</td>
											</tr>
											<tr>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
													{t('results.openingsArea')}
												</td>
												<td className='px-3 py-2 whitespace-nowrap text-sm text-gray-900'>
													{formatWallpaperArea(
														result.openingsArea
													)}
												</td>
											</tr>
											<tr>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
													{t(
														'results.usefulWallArea'
													)}
												</td>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
													{formatWallpaperArea(
														result.usefulWallArea
													)}
												</td>
											</tr>
											<tr>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
													{t('results.rollArea')}
												</td>
												<td className='px-3 py-2 whitespace-nowrap text-sm text-gray-900'>
													{formatWallpaperArea(
														result.rollArea
													)}
												</td>
											</tr>
											<tr>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
													{t('results.reserve')}
												</td>
												<td className='px-3 py-2 whitespace-nowrap text-sm text-gray-900'>
													{formatWallpaperNumber(
														result.reservePercentage
													)}
													%
												</td>
											</tr>
											<tr className='bg-blue-50'>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-bold text-blue-900'>
													{t('results.rollsNeeded')}
												</td>
												<td className='px-3 py-2 whitespace-nowrap text-sm font-bold text-blue-900'>
													{result.rollsNeeded}{' '}
													{t('results.rolls')}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							{/* Recommendation */}
							<div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
								<div className='flex items-center mb-2'>
									<Info className='h-5 w-5 text-yellow-600 mr-2' />
									<span className='font-medium text-yellow-800'>
										{t('results.recommendation')}
									</span>
								</div>
								<p className='text-yellow-700 text-sm'>
									{t('results.recommendationText', {
										recommended: result.recommendedRolls,
									})}
								</p>
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
								<li>{t('seo.calculation.steps.area')}</li>
								<li>{t('seo.calculation.steps.openings')}</li>
								<li>{t('seo.calculation.steps.useful')}</li>
								<li>{t('seo.calculation.steps.rolls')}</li>
								<li>{t('seo.calculation.steps.reserve')}</li>
							</ul>
						</div>

						<div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								{t('seo.tips.title')}
							</h3>
							<p className='mb-4'>{t('seo.tips.content')}</p>
							<ul className='list-disc list-inside space-y-2 ml-4'>
								<li>{t('seo.tips.measurement')}</li>
								<li>{t('seo.tips.pattern')}</li>
								<li>{t('seo.tips.reserve')}</li>
								<li>{t('seo.tips.quality')}</li>
							</ul>
						</div>

						<div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
							<h3 className='text-xl font-semibold text-blue-900 mb-3'>
								{t('seo.advantages.title')}
							</h3>
							<p className='text-blue-800 mb-4'>
								{t('seo.advantages.content')}
							</p>
							<ul className='list-disc list-inside space-y-2 ml-4 text-blue-800'>
								<li>{t('seo.advantages.accuracy')}</li>
								<li>{t('seo.advantages.savings')}</li>
								<li>{t('seo.advantages.planning')}</li>
								<li>{t('seo.advantages.convenience')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
