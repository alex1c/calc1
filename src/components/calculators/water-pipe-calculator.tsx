'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Droplets, Calculator, RotateCcw, Copy, Check } from 'lucide-react';

export default function WaterPipeCalculator() {
	const tCommon = useTranslations('common');
	const t = useTranslations('calculators.waterPipeCalculator');

	// State for calculation inputs
	const [calculationType, setCalculationType] = useState<
		'diameter' | 'flow' | 'pressure'
	>('diameter');
	const [flowRate, setFlowRate] = useState<string>('');
	const [diameter, setDiameter] = useState<string>('');
	const [length, setLength] = useState<string>('');
	const [pressure, setPressure] = useState<string>('');
	const [velocity, setVelocity] = useState<string>('');
	const [material, setMaterial] = useState<
		'steel' | 'copper' | 'plastic' | 'cast_iron'
	>('steel');
	const [roughness, setRoughness] = useState<string>('');
	const [temperature, setTemperature] = useState<string>('');
	const [viscosity, setViscosity] = useState<string>('');
	const [density, setDensity] = useState<string>('');
	const [isCalculating, setIsCalculating] = useState(false);
	const [result, setResult] = useState<any>(null);
	const [copied, setCopied] = useState(false);

	// Validation function
	const validateInputs = () => {
		const errors: string[] = [];

		if (calculationType === 'diameter') {
			if (!flowRate || parseFloat(flowRate) <= 0) {
				errors.push(t('form.errors.flowRate'));
			}
			if (!velocity || parseFloat(velocity) <= 0) {
				errors.push(t('form.errors.velocity'));
			}
		} else if (calculationType === 'flow') {
			if (!diameter || parseFloat(diameter) <= 0) {
				errors.push(t('form.errors.diameter'));
			}
			if (!velocity || parseFloat(velocity) <= 0) {
				errors.push(t('form.errors.velocity'));
			}
		} else if (calculationType === 'pressure') {
			if (!flowRate || parseFloat(flowRate) <= 0) {
				errors.push(t('form.errors.flowRate'));
			}
			if (!diameter || parseFloat(diameter) <= 0) {
				errors.push(t('form.errors.diameter'));
			}
			if (!length || parseFloat(length) <= 0) {
				errors.push(t('form.errors.length'));
			}
		}

		return errors;
	};

	// Calculate water pipe parameters
	const calculateWaterPipe = () => {
		const errors = validateInputs();
		if (errors.length > 0) {
			alert(errors.join('\n'));
			return;
		}

		setIsCalculating(true);

		try {
			let calculatedResult: any = {};

			// Material properties
			const materialProperties = {
				steel: {
					roughness: 0.045,
					density: 7850,
					thermalConductivity: 50,
				},
				copper: {
					roughness: 0.0015,
					density: 8960,
					thermalConductivity: 400,
				},
				plastic: {
					roughness: 0.0015,
					density: 950,
					thermalConductivity: 0.2,
				},
				cast_iron: {
					roughness: 0.26,
					density: 7200,
					thermalConductivity: 50,
				},
			};

			const materialProps = materialProperties[material];

			if (calculationType === 'diameter') {
				// Calculate diameter from flow rate and velocity
				const Q = parseFloat(flowRate);
				const V = parseFloat(velocity);
				const A = Q / V;
				const D = Math.sqrt((4 * A) / Math.PI);
				const area = Math.PI * Math.pow(D / 2, 2);

				calculatedResult = {
					diameter: D,
					area: area,
					flowRate: Q,
					velocity: V,
					reynoldsNumber: (V * D * 1000) / 0.001, // Assuming water viscosity
					material: material,
					roughness: materialProps.roughness,
				};
			} else if (calculationType === 'flow') {
				// Calculate flow rate from diameter and velocity
				const D = parseFloat(diameter);
				const V = parseFloat(velocity);
				const A = Math.PI * Math.pow(D / 2, 2);
				const Q = A * V;

				calculatedResult = {
					flowRate: Q,
					area: A,
					diameter: D,
					velocity: V,
					reynoldsNumber: (V * D * 1000) / 0.001,
					material: material,
					roughness: materialProps.roughness,
				};
			} else if (calculationType === 'pressure') {
				// Calculate pressure drop
				const Q = parseFloat(flowRate);
				const D = parseFloat(diameter);
				const L = parseFloat(length);
				const V = (4 * Q) / (Math.PI * Math.pow(D, 2));
				const Re = (V * D * 1000) / 0.001; // Reynolds number
				const f = 0.316 / Math.pow(Re, 0.25); // Friction factor (Blasius)
				const hf = (f * L * Math.pow(V, 2)) / (2 * 9.81 * D); // Head loss
				const pressureDrop = hf * 1000 * 9.81; // Pressure drop in Pa

				calculatedResult = {
					pressureDrop: pressureDrop,
					headLoss: hf,
					velocity: V,
					reynoldsNumber: Re,
					frictionFactor: f,
					flowRate: Q,
					diameter: D,
					length: L,
					material: material,
					roughness: materialProps.roughness,
				};
			}

			// Add additional calculations
			calculatedResult.flowRatePerSecond = calculatedResult.flowRate;
			calculatedResult.flowRatePerMinute = calculatedResult.flowRate * 60;
			calculatedResult.flowRatePerHour = calculatedResult.flowRate * 3600;

			setResult(calculatedResult);
		} catch (error) {
			console.error('Calculation error:', error);
			alert(t('form.errors.calculationFailed'));
		} finally {
			setIsCalculating(false);
		}
	};

	// Reset calculator
	const resetCalculator = () => {
		setFlowRate('');
		setDiameter('');
		setLength('');
		setPressure('');
		setVelocity('');
		setRoughness('');
		setTemperature('');
		setViscosity('');
		setDensity('');
		setResult(null);
		setCopied(false);
	};

	// Copy results to clipboard
	const copyResults = async () => {
		if (!result) return;

		const resultText =
			`${t('results.title')}\n\n` +
			`${t('results.calculationType')}: ${t(
				`form.calculationTypes.${calculationType}`
			)}\n` +
			`${t('results.material')}: ${t(`form.materials.${material}`)}\n\n` +
			Object.entries(result)
				.map(([key, value]) => {
					const label = t(`results.${key}`);
					return `${label}: ${
						typeof value === 'number' ? value.toFixed(2) : value
					}`;
				})
				.join('\n');

		try {
			await navigator.clipboard.writeText(resultText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error('Failed to copy results:', error);
		}
	};

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
			{/* Header */}
			<div className='flex items-center mb-6'>
				<Droplets className='w-8 h-8 text-cyan-600 mr-3' />
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{t('form.title')}
				</h2>
			</div>

			{/* Calculation Type Selection */}
			<div className='mb-6'>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
					{t('form.calculationType')}
				</label>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{['diameter', 'flow', 'pressure'].map((type) => (
						<button
							key={type}
							onClick={() => setCalculationType(type as any)}
							className={`p-4 rounded-lg border-2 transition-all ${
								calculationType === type
									? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
									: 'border-gray-200 dark:border-gray-600 hover:border-cyan-300'
							}`}
						>
							<div className='text-center'>
								<Calculator className='w-6 h-6 mx-auto mb-2 text-cyan-600' />
								<div className='font-medium text-gray-900 dark:text-white'>
									{t(`form.calculationTypes.${type}`)}
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Input Fields */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				{calculationType === 'diameter' && (
					<>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.flowRate')} ({tCommon('units.cubicMetersPerSecond')})
							</label>
							<input
								type='number'
								value={flowRate}
								onChange={(e) => setFlowRate(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='0.1'
								step='0.001'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.velocity')} ({tCommon('units.metersPerSecond')})
							</label>
							<input
								type='number'
								value={velocity}
								onChange={(e) => setVelocity(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='2.0'
								step='0.1'
							/>
						</div>
					</>
				)}

				{calculationType === 'flow' && (
					<>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.diameter')} ({tCommon('units.meters')})
							</label>
							<input
								type='number'
								value={diameter}
								onChange={(e) => setDiameter(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='0.1'
								step='0.001'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.velocity')} ({tCommon('units.metersPerSecond')})
							</label>
							<input
								type='number'
								value={velocity}
								onChange={(e) => setVelocity(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='2.0'
								step='0.1'
							/>
						</div>
					</>
				)}

				{calculationType === 'pressure' && (
					<>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.flowRate')} ({tCommon('units.cubicMetersPerSecond')})
							</label>
							<input
								type='number'
								value={flowRate}
								onChange={(e) => setFlowRate(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='0.1'
								step='0.001'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.diameter')} ({tCommon('units.meters')})
							</label>
							<input
								type='number'
								value={diameter}
								onChange={(e) => setDiameter(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='0.1'
								step='0.001'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.length')} ({tCommon('units.meters')})
							</label>
							<input
								type='number'
								value={length}
								onChange={(e) => setLength(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
								placeholder='100'
								step='0.1'
							/>
						</div>
					</>
				)}

				{/* Material Selection */}
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
						{t('form.material')}
					</label>
					<select
						value={material}
						onChange={(e) => setMaterial(e.target.value as any)}
						className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white'
					>
					{Object.entries({
						steel: t('form.materials.steel'),
						copper: t('form.materials.copper'),
						plastic: t('form.materials.plastic'),
						cast_iron: t('form.materials.castIron'),
					}).map(([key, value]) => (
							<option
								key={key}
								value={key}
							>
								{value}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex flex-col sm:flex-row gap-4 mb-6'>
				<button
					onClick={calculateWaterPipe}
					disabled={isCalculating}
					className='flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center'
				>
					{isCalculating ? (
						<>
							<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
							{t('form.calculating')}
						</>
					) : (
						<>
							<Calculator className='w-5 h-5 mr-2' />
							{t('form.calculate')}
						</>
					)}
				</button>
				<button
					onClick={resetCalculator}
					className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center'
				>
					<RotateCcw className='w-5 h-5 mr-2' />
					{t('form.reset')}
				</button>
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'
				>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
							{t('results.title')}
						</h3>
						<button
							onClick={copyResults}
							className='flex items-center text-cyan-600 hover:text-cyan-700 font-medium'
						>
							{copied ? (
								<>
									<Check className='w-4 h-4 mr-1' />
									{t('results.copied')}
								</>
							) : (
								<>
									<Copy className='w-4 h-4 mr-1' />
									{t('results.copy')}
								</>
							)}
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{Object.entries(result).map(([key, value]) => (
							<div
								key={key}
								className='bg-white dark:bg-gray-800 rounded-lg p-4'
							>
								<div className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
									{t(`results.${key}`)}
								</div>
								<div className='text-lg font-bold text-gray-900 dark:text-white'>
									{typeof value === 'number'
										? value.toFixed(2)
										: value}
								</div>
							</div>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
}
