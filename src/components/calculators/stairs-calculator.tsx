'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	TrendingUp,
	Calculator,
	RefreshCw,
	Copy,
	Download,
	Ruler,
	Shield,
} from 'lucide-react';

interface StairsResult {
	stepsCount: number;
	totalLength: number;
	angle: number;
	comfortLevel: string;
	comfortFormula: number;
	recommendations: string[];
}

/**
 * Stairs Calculator Component
 * 
 * A React component for calculating stairs dimensions and parameters.
 * 
 * Features:
 * - Total height input
 * - Step depth and height calculation
 * - Stairs type selection (straight, L-shaped, U-shaped)
 * - Comfort level calculation
 * - Angle calculation
 * - Recommendations
 * - Copy results to clipboard
 * - PDF export
 * - Responsive design
 * 
 * Uses inline calculation logic based on building standards and ergonomics.
 */
export default function StairsCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.stairsCalculator');
	
	// Form state management
	const [totalHeight, setTotalHeight] = useState<number>(0); // Total stairs height (m)
	const [stepDepth, setStepDepth] = useState<number>(0); // Step depth (m)
	const [stepHeight, setStepHeight] = useState<number>(0); // Step height (m)
	const [stairsType, setStairsType] = useState<string>('straight'); // Stairs type (straight, L-shaped, U-shaped)
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [result, setResult] = useState<StairsResult | null>(null); // Calculated result
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	const calculateStairs = () => {
		setIsCalculating(true);
		setResult(null);
		setCopied(false);

		// Validation
		if (totalHeight <= 0) {
			alert(t('form.errors.totalHeightRequired'));
			setIsCalculating(false);
			return;
		}
		if (stepDepth <= 0) {
			alert(t('form.errors.stepDepthRequired'));
			setIsCalculating(false);
			return;
		}
		if (stepHeight <= 0) {
			alert(t('form.errors.stepHeightRequired'));
			setIsCalculating(false);
			return;
		}

		try {
			// Calculate number of steps
			const stepsCount = Math.ceil(totalHeight / stepHeight);

			// Calculate total length
			const totalLength = stepsCount * stepDepth;

			// Calculate angle
			const angle = Math.atan(stepHeight / stepDepth) * (180 / Math.PI);

			// Calculate comfort formula (2R + T = 600-650 mm = 60-65 cm)
			// All values are in mm, formula result is in mm
			const comfortFormula = 2 * stepHeight + stepDepth;

			// Determine comfort level (check in mm: 600-650 mm for optimal)
			let comfortLevel = '';
			if (comfortFormula >= 600 && comfortFormula <= 650) {
				comfortLevel = t('results.comfortLevel.optimal');
			} else if (comfortFormula >= 580 && comfortFormula <= 670) {
				comfortLevel = t('results.comfortLevel.acceptable');
			} else {
				comfortLevel = t('results.comfortLevel.uncomfortable');
			}

			// Generate recommendations
			const recommendations = [];

			if (comfortFormula < 600) {
				recommendations.push(t('tips.formula.title'));
			}
			if (angle > 45) {
				recommendations.push(t('tips.angle.title'));
			}
			// stepHeight is in mm, normal range is 150-200 mm
			if (stepHeight > 200) {
				recommendations.push(t('tips.dimensions.title'));
			}
			// totalLength is in mm, check in meters (4 m = 4000 mm)
			if (stairsType === 'straight' && totalLength > 4000) {
				recommendations.push(t('tips.safety.title'));
			}

			setResult({
				stepsCount,
				totalLength,
				angle,
				comfortLevel,
				comfortFormula,
				recommendations,
			});
		} catch (error) {
			alert(t('form.errors.invalidNumber'));
		} finally {
			setIsCalculating(false);
		}
	};

	const resetCalculator = () => {
		setTotalHeight(0);
		setStepDepth(0);
		setStepHeight(0);
		setStairsType('straight');
		setResult(null);
		setCopied(false);
	};

	const copyResults = () => {
		if (result) {
			const textToCopy =
				`${t('results.title')}\n` +
				`${t('results.stepsCount')}: ${result.stepsCount}\n` +
				`${t('results.totalLength')}: ${(
					result.totalLength / 1000
				).toFixed(2)} м\n` +
				`${t('results.angle')}: ${result.angle.toFixed(1)}°\n` +
				`${t('results.comfortLevel')}: ${result.comfortLevel}\n` +
				`${t('results.comfortFormula')}: ${(
					result.comfortFormula / 10
				).toFixed(1)} см`;

			navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<TrendingUp className='h-8 w-8 text-purple-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<p className='text-gray-600 mb-8'>{t('form.description')}</p>

				{/* Input Fields */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.totalHeight')}
						</label>
						<input
							type='number'
							value={totalHeight}
							onChange={(e) =>
								setTotalHeight(Number(e.target.value))
							}
							placeholder={t('form.totalHeightPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.stepDepth')}
						</label>
						<input
							type='number'
							value={stepDepth}
							onChange={(e) =>
								setStepDepth(Number(e.target.value))
							}
							placeholder={t('form.stepDepthPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.stepHeight')}
						</label>
						<input
							type='number'
							value={stepHeight}
							onChange={(e) =>
								setStepHeight(Number(e.target.value))
							}
							placeholder={t('form.stepHeightPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.stairsType')}
						</label>
						<select
							value={stairsType}
							onChange={(e) => setStairsType(e.target.value)}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
						>
							<option value='straight'>
								{t('form.stairsTypes.straight')}
							</option>
							<option value='turn90'>
								{t('form.stairsTypes.turn90')}
							</option>
							<option value='turn180'>
								{t('form.stairsTypes.turn180')}
							</option>
						</select>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex space-x-4'>
					<button
						onClick={calculateStairs}
						disabled={isCalculating}
						className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 disabled:opacity-50'
					>
						{isCalculating
							? t('form.calculating')
							: t('form.calculate')}
					</button>
					<button
						onClick={resetCalculator}
						className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300'
					>
						{t('form.reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-white rounded-lg shadow-lg p-8'
				>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-bold text-gray-900'>
							{t('results.title')}
						</h2>
						<button
							onClick={copyResults}
							className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300'
						>
							<Copy className='inline-block w-4 h-4 mr-2' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-4'>
							<div className='bg-purple-50 p-4 rounded-lg'>
								<h3 className='text-lg font-semibold text-purple-900 mb-2'>
									{t('results.stairs')}
								</h3>
								<p className='text-purple-800'>
									<strong>{t('results.stepsCount')}:</strong>{' '}
									{result.stepsCount}
								</p>
								<p className='text-purple-800'>
									<strong>{t('results.totalLength')}:</strong>{' '}
									{(result.totalLength / 1000).toFixed(2)} м
								</p>
								<p className='text-purple-800'>
									<strong>{t('results.angle')}:</strong>{' '}
									{result.angle.toFixed(1)}°
								</p>
							</div>

							<div className='bg-green-50 p-4 rounded-lg'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.comfort')}
								</h3>
								<p className='text-green-800'>
									<strong>
										{t('results.comfortLevel')}:
									</strong>{' '}
									{result.comfortLevel}
								</p>
								<p className='text-green-800'>
									<strong>
										{t('results.comfortFormula')}:
									</strong>{' '}
									{(result.comfortFormula / 10).toFixed(1)} см
								</p>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{t('results.recommendations')}
							</h3>
							{result.recommendations.length > 0 ? (
								<ul className='space-y-2'>
									{result.recommendations.map(
										(rec, index) => (
											<li
												key={index}
												className='text-gray-700'
											>
												• {rec}
											</li>
										)
									)}
								</ul>
							) : (
								<p className='text-gray-700'>
									{t('results.summaryText')}
								</p>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
