'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Wrench,
	Calculator,
	RefreshCw,
	Copy,
	Download,
	Ruler,
	BarChart3,
} from 'lucide-react';

interface RebarResult {
	totalLength: number;
	totalWeight: number;
	barCount: number;
	barsPerLayer: number;
	weightPerMeter: number;
	structureType: string;
	dimensions: {
		length: number;
		width: number;
		height: number;
	};
	grid: {
		spacing: number;
		diameter: number;
		layers: number;
	};
}

export default function RebarCalculator() {
	const t = useTranslations('calculators.rebarCalculator');
	const [structureType, setStructureType] = useState<string>('foundation');
	const [length, setLength] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	const [gridSpacing, setGridSpacing] = useState<number>(0);
	const [rebarDiameter, setRebarDiameter] = useState<number>(0);
	const [layers, setLayers] = useState<number>(1);
	const [overlap, setOverlap] = useState<number>(0);
	const [isCalculating, setIsCalculating] = useState(false);
	const [result, setResult] = useState<RebarResult | null>(null);
	const [copied, setCopied] = useState(false);

	// Rebar weight per meter by diameter (kg/m) - GOST 5781-82
	const rebarWeights: { [key: number]: number } = {
		6: 0.222,
		8: 0.395,
		10: 0.617,
		12: 0.888,
		14: 1.21,
		16: 1.58,
		18: 2.0,
		20: 2.47,
		22: 2.98,
		25: 3.85,
		28: 4.83,
		32: 6.31,
	};

	const calculateRebar = () => {
		setIsCalculating(true);
		setResult(null);
		setCopied(false);

		// Validation
		if (length <= 0) {
			alert(t('form.errors.lengthRequired'));
			setIsCalculating(false);
			return;
		}
		if (width <= 0) {
			alert(t('form.errors.widthRequired'));
			setIsCalculating(false);
			return;
		}
		if (height <= 0) {
			alert(t('form.errors.heightRequired'));
			setIsCalculating(false);
			return;
		}
		if (gridSpacing <= 0) {
			alert(t('form.errors.gridSpacingRequired'));
			setIsCalculating(false);
			return;
		}
		if (rebarDiameter <= 0) {
			alert(t('form.errors.diameterRequired'));
			setIsCalculating(false);
			return;
		}

		try {
			// Calculate bars per layer
			const barsLength = Math.ceil(length / (gridSpacing / 100)) + 1;
			const barsWidth = Math.ceil(width / (gridSpacing / 100)) + 1;
			const barsPerLayer = barsLength + barsWidth;

			// Calculate total length
			const totalLength = barsPerLayer * layers * height;

			// Get weight per meter
			const weightPerMeter = rebarWeights[rebarDiameter] || 0;
			if (weightPerMeter === 0) {
				alert(t('form.errors.diameterTooSmall'));
				setIsCalculating(false);
				return;
			}

			// Calculate total weight
			const totalWeight = totalLength * weightPerMeter;

			// Calculate bar count (assuming 12m standard length)
			const standardBarLength = 12;
			const barCount = Math.ceil(totalLength / standardBarLength);

			setResult({
				totalLength,
				totalWeight,
				barCount,
				barsPerLayer,
				weightPerMeter,
				structureType,
				dimensions: { length, width, height },
				grid: { spacing: gridSpacing, diameter: rebarDiameter, layers },
			});
		} catch (error) {
			alert(t('form.errors.invalidNumber'));
		} finally {
			setIsCalculating(false);
		}
	};

	const resetCalculator = () => {
		setStructureType('foundation');
		setLength(0);
		setWidth(0);
		setHeight(0);
		setGridSpacing(0);
		setRebarDiameter(0);
		setLayers(1);
		setOverlap(0);
		setResult(null);
		setCopied(false);
	};

	const copyResults = () => {
		if (result) {
			const textToCopy =
				`${t('results.title')}\n` +
				`${t('results.totalLength')}: ${result.totalLength.toFixed(
					2
				)} м\n` +
				`${t('results.totalWeight')}: ${result.totalWeight.toFixed(
					2
				)} кг\n` +
				`${t('results.barCount')}: ${result.barCount} шт\n` +
				`${t('results.barsPerLayer')}: ${result.barsPerLayer} шт`;

			navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<Wrench className='h-8 w-8 text-orange-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<p className='text-gray-600 mb-8'>{t('form.description')}</p>

				{/* Form */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.structureType')}
						</label>
						<select
							value={structureType}
							onChange={(e) => setStructureType(e.target.value)}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						>
							<option value='foundation'>
								{t('form.structureTypes.foundation')}
							</option>
							<option value='slab'>
								{t('form.structureTypes.slab')}
							</option>
							<option value='wall'>
								{t('form.structureTypes.wall')}
							</option>
							<option value='column'>
								{t('form.structureTypes.column')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.length')}
						</label>
						<input
							type='number'
							value={length}
							onChange={(e) => setLength(Number(e.target.value))}
							placeholder={t('form.lengthPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.width')}
						</label>
						<input
							type='number'
							value={width}
							onChange={(e) => setWidth(Number(e.target.value))}
							placeholder={t('form.widthPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.height')}
						</label>
						<input
							type='number'
							value={height}
							onChange={(e) => setHeight(Number(e.target.value))}
							placeholder={t('form.heightPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.gridSpacing')}
						</label>
						<input
							type='number'
							value={gridSpacing}
							onChange={(e) =>
								setGridSpacing(Number(e.target.value))
							}
							placeholder={t('form.gridSpacingPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.rebarDiameter')}
						</label>
						<input
							type='number'
							value={rebarDiameter}
							onChange={(e) =>
								setRebarDiameter(Number(e.target.value))
							}
							placeholder={t('form.rebarDiameterPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.layers')}
						</label>
						<input
							type='number'
							value={layers}
							onChange={(e) => setLayers(Number(e.target.value))}
							placeholder={t('form.layersPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.overlap')}
						</label>
						<input
							type='number'
							value={overlap}
							onChange={(e) => setOverlap(Number(e.target.value))}
							placeholder={t('form.overlapPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent'
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex space-x-4'>
					<button
						onClick={calculateRebar}
						disabled={isCalculating}
						className='bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 flex items-center'
					>
						{isCalculating ? (
							<>
								<RefreshCw className='mr-2 h-5 w-5 animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Calculator className='mr-2 h-5 w-5' />
								{t('form.calculate')}
							</>
						)}
					</button>
					<button
						onClick={resetCalculator}
						className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 flex items-center'
					>
						<RefreshCw className='mr-2 h-5 w-5' />
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
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						{t('results.title')}
					</h2>

					{/* Summary */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						<div className='bg-orange-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-orange-900 mb-2'>
								{t('results.totalLength')}
							</h3>
							<p className='text-2xl font-bold text-orange-600'>
								{result.totalLength.toFixed(2)} м
							</p>
						</div>

						<div className='bg-blue-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-blue-900 mb-2'>
								{t('results.totalWeight')}
							</h3>
							<p className='text-2xl font-bold text-blue-600'>
								{result.totalWeight.toFixed(2)} кг
							</p>
						</div>

						<div className='bg-green-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-green-900 mb-2'>
								{t('results.barCount')}
							</h3>
							<p className='text-2xl font-bold text-green-600'>
								{result.barCount} шт
							</p>
						</div>

						<div className='bg-purple-50 p-6 rounded-lg'>
							<h3 className='text-lg font-semibold text-purple-900 mb-2'>
								{t('results.barsPerLayer')}
							</h3>
							<p className='text-2xl font-bold text-purple-600'>
								{result.barsPerLayer} шт
							</p>
						</div>
					</div>

					{/* Detailed Results */}
					<div className='mb-8'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							{t('results.summary')}
						</h3>
						<div className='bg-gray-50 p-6 rounded-lg'>
							<p className='text-lg text-gray-700'>
								{t('results.summaryText', {
									length: result.dimensions.length,
									width: result.dimensions.width,
									height: result.dimensions.height,
									totalLength: result.totalLength.toFixed(2),
									totalWeight: result.totalWeight.toFixed(2),
								})}
							</p>
						</div>
					</div>

					{/* Actions */}
					<div className='flex space-x-4'>
						<button
							onClick={copyResults}
							className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center'
						>
							<Copy className='mr-2 h-5 w-5' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
						<button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center'>
							<Download className='mr-2 h-5 w-5' />
							{t('results.exportPdf')}
						</button>
						<button className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center'>
							<Download className='mr-2 h-5 w-5' />
							{t('results.exportExcel')}
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
}
