'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shirt, Info, RotateCcw, Table, Users, Globe } from 'lucide-react';
import {
	convertSize,
	validateSizeInput,
	getAvailableSizes,
	getCountryName,
	getCategoryName,
	getGenderName,
	formatSizeValue,
	SizeInput,
	SizeResult,
	SizeCategory,
	SizeGender,
	SizeCountry,
	SIZE_CATEGORIES,
	SIZE_GENDERS,
	SIZE_COUNTRIES,
} from '@/lib/calculators/size-converter';

// Import size data
import sizeData from '@/data/size-converter.json';

/**
 * Size Converter Calculator Component
 * 
 * A React component for converting clothing and shoe sizes between different country standards.
 * 
 * Features:
 * - Category selection (clothing, shoes, etc.)
 * - Gender selection (male, female, unisex)
 * - Country selection (RU, US, UK, EU, etc.)
 * - Size conversion to all countries
 * - Size chart display
 * - Real-time calculation with debouncing
 * - Responsive design
 * 
 * Uses the size converter calculation library from @/lib/calculators/size-converter
 * for all conversion operations.
 */
export default function SizeConverterCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.size-converter');
	
	// Form state management
	const [input, setInput] = useState<SizeInput>({
		category: 'clothing', // Size category (clothing, shoes, etc.)
		gender: 'male', // Gender (male, female, unisex)
		country: 'RU', // Source country (RU, US, UK, EU, etc.)
		size: '', // Size value
	});
	const [results, setResults] = useState<SizeResult[]>([]); // Conversion results for all countries
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [showChart, setShowChart] = useState(false); // Show size chart flag

	// Auto-calculate when input changes
	useEffect(() => {
		const timer = setTimeout(() => {
			if (input.size && input.category && input.gender && input.country) {
				setIsCalculating(true);
				try {
					const sizeResults = convertSize(input, sizeData.sizeData);
					setResults(sizeResults);
				} catch (error) {
					console.error('Calculation error:', error);
					setResults([]);
				} finally {
					setIsCalculating(false);
				}
			} else {
				setResults([]);
			}
		}, 300); // Debounce calculation

		return () => clearTimeout(timer);
	}, [input]);

	const handleInputChange = (
		field: keyof SizeInput,
		value: string | SizeCategory | SizeGender | SizeCountry
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCalculate = () => {
		if (input.size && input.category && input.gender && input.country) {
			setIsCalculating(true);
			try {
				const sizeResults = convertSize(input, sizeData.sizeData);
				setResults(sizeResults);
			} catch (error) {
				console.error('Calculation error:', error);
				setResults([]);
			} finally {
				setIsCalculating(false);
			}
		} else {
			setResults([]);
		}
	};

	const handleReset = () => {
		setInput({
			category: 'clothing',
			gender: 'male',
			country: 'RU',
			size: '',
		});
		setResults([]);
		setShowChart(false);
	};

	const getAvailableSizesList = () => {
		return getAvailableSizes(
			input.category,
			input.gender,
			input.country,
			sizeData.sizeData
		);
	};

	const getSizeChartData = () => {
		if (!showChart) return null;

		const categoryData = sizeData.sizeData[input.category];
		if (!categoryData || !categoryData[input.gender]) return null;

		return categoryData[input.gender];
	};

	return (
		<div className='max-w-6xl mx-auto'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-purple-100 dark:bg-purple-900 rounded-full'>
							<Shirt className='w-12 h-12 text-purple-600 dark:text-purple-400' />
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
					<div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
							{t('infographic.precise')}
						</div>
						<div className='text-sm text-purple-800 dark:text-purple-200'>
							{t('infographic.preciseDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.fast')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.fastDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
							{t('infographic.multilingual')}
						</div>
						<div className='text-sm text-blue-800 dark:text-blue-200'>
							{t('infographic.multilingualDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Converter Form */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Category Selection */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('selectCategory')}
						</label>
						<select
							value={input.category}
							onChange={(e) =>
								handleInputChange(
									'category',
									e.target.value as SizeCategory
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{SIZE_CATEGORIES.map((category) => (
								<option
									key={category}
									value={category}
								>
									{t(`categories.${category}`)}
								</option>
							))}
						</select>
					</div>

					{/* Gender Selection */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('selectGender')}
						</label>
						<select
							value={input.gender}
							onChange={(e) =>
								handleInputChange(
									'gender',
									e.target.value as SizeGender
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{SIZE_GENDERS.map((gender) => (
								<option
									key={gender}
									value={gender}
								>
									{t(`genders.${gender}`)}
								</option>
							))}
						</select>
					</div>

					{/* Country Selection */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('selectCountry')}
						</label>
						<select
							value={input.country}
							onChange={(e) =>
								handleInputChange(
									'country',
									e.target.value as SizeCountry
								)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							{SIZE_COUNTRIES.map((country) => (
								<option
									key={country}
									value={country}
								>
									{t(`countries.${country}`)}
								</option>
							))}
						</select>
					</div>

					{/* Size Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							{t('yourSize')}
						</label>
						<select
							value={input.size}
							onChange={(e) =>
								handleInputChange('size', e.target.value)
							}
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						>
							<option value=''>{t('yourSize')}</option>
							{getAvailableSizesList().map((size) => (
								<option
									key={size}
									value={size}
								>
									{formatSizeValue(size)}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={isCalculating || !input.size}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
					>
						{isCalculating ? (
							<>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								{t('calculating')}
							</>
						) : (
							<>
								<Globe className='w-4 h-4' />
								{t('showChart')}
							</>
						)}
					</button>
					<button
						onClick={() => setShowChart(!showChart)}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'
					>
						<Table className='w-4 h-4' />
						{t('sizeChart')}
					</button>
					<button
						onClick={handleReset}
						className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors'
					>
						<RotateCcw className='w-4 h-4' />
						{t('reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{results.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'
				>
					<div className='text-center mb-8'>
						<div className='flex justify-center mb-4'>
							<Users className='w-8 h-8 text-purple-600' />
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('result')}
						</h2>
					</div>

					{/* Main Result */}
					<div className='text-center mb-8'>
						<div className='inline-flex items-center gap-4 p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg'>
							<span className='text-2xl font-bold text-gray-700 dark:text-gray-300'>
								{formatSizeValue(input.size)}{' '}
								{t(`countries.${input.country}`)}
							</span>
							<span className='text-gray-500'>→</span>
							<span className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
								{t(`categories.${input.category}`)} (
								{t(`genders.${input.gender}`)})
							</span>
						</div>
					</div>

					{/* Size Conversions */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{results.map((result) => (
							<div
								key={result.country}
								className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center'
							>
								<div className='text-lg font-bold text-gray-900 dark:text-white'>
									{formatSizeValue(result.size)}
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									{t(`countries.${result.country}`)}
								</div>
							</div>
						))}
					</div>
				</motion.div>
			)}

			{/* Size Chart */}
			{showChart && getSizeChartData() && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'
				>
					<div className='text-center mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('sizeChart')}
						</h2>
						<p className='text-gray-600 dark:text-gray-400'>
							{t(`categories.${input.category}`)} -{' '}
							{t(`genders.${input.gender}`)}
						</p>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
							<thead>
								<tr className='bg-gray-50 dark:bg-gray-700'>
									{SIZE_COUNTRIES.map((country) => (
										<th
											key={country}
											className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold'
										>
											{t(`countries.${country}`)}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{Array.from({
									length: Math.max(
										...Object.values(
											getSizeChartData()!
										).map((sizes: any) => sizes.length)
									),
								}).map((_, index) => (
									<tr key={index}>
										{SIZE_COUNTRIES.map((country) => {
											const sizes =
												getSizeChartData()![country];
											const size =
												sizes && sizes[index]
													? formatSizeValue(
															sizes[index]
													  )
													: '-';
											return (
												<td
													key={country}
													className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-center'
												>
													{size}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</motion.div>
			)}

			{/* Tips */}
			<div className='bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-purple-600 dark:text-purple-400' />
					<h4 className='font-semibold text-purple-800 dark:text-purple-200'>
						{t('tips.title')}
					</h4>
				</div>
				<div className='space-y-2 text-sm text-purple-700 dark:text-purple-300'>
					<p>{t('tips.accuracy')}</p>
					<p>{t('tips.instant')}</p>
					<p>{t('tips.multilingual')}</p>
				</div>
			</div>
		</div>
	);
}
