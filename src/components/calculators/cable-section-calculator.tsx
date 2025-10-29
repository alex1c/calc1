'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Cable,
	Calculator,
	RefreshCw,
	Copy,
	Download,
	Zap,
	Shield,
} from 'lucide-react';

interface CableResult {
	recommendedSection: number;
	standardSection: number;
	currentDensity: number;
	voltageDrop: number;
	voltageDropPercent: number;
	resistance: number;
	weight: number;
	cost: number;
}

export default function CableSectionCalculator() {
	const t = useTranslations('calculators.cableSectionCalculator');
	const [calculationType, setCalculationType] = useState<string>('power');
	const [power, setPower] = useState<number>(0);
	const [current, setCurrent] = useState<number>(0);
	const [voltage, setVoltage] = useState<number>(220);
	const [length, setLength] = useState<number>(0);
	const [material, setMaterial] = useState<string>('copper');
	const [phaseType, setPhaseType] = useState<string>('single');
	const [powerFactor, setPowerFactor] = useState<number>(0.8);
	const [voltageDrop, setVoltageDrop] = useState<number>(3);
	const [temperature, setTemperature] = useState<number>(25);
	const [installationMethod, setInstallationMethod] =
		useState<string>('open');
	const [isCalculating, setIsCalculating] = useState(false);
	const [result, setResult] = useState<CableResult | null>(null);
	const [copied, setCopied] = useState(false);

	const calculateCableSection = () => {
		setIsCalculating(true);
		setResult(null);
		setCopied(false);

		// Validation
		if (calculationType === 'power' && power <= 0) {
			alert(t('form.errors.powerRequired'));
			setIsCalculating(false);
			return;
		}
		if (calculationType === 'current' && current <= 0) {
			alert(t('form.errors.currentRequired'));
			setIsCalculating(false);
			return;
		}
		if (length <= 0) {
			alert(t('form.errors.lengthRequired'));
			setIsCalculating(false);
			return;
		}
		if (voltage <= 0) {
			alert(t('form.errors.voltageRequired'));
			setIsCalculating(false);
			return;
		}

		try {
			let calculatedCurrent = current;

			// Calculate current from power if needed
			// Power is in kW, convert to W for calculation
			if (calculationType === 'power') {
				const powerInWatts = power * 1000; // Convert kW to W
				if (phaseType === 'single') {
					calculatedCurrent = powerInWatts / (voltage * powerFactor);
				} else {
					calculatedCurrent =
						powerInWatts / (Math.sqrt(3) * voltage * powerFactor);
				}
			}

			// Material resistivity (Ohm·mm²/m)
			const resistivity = material === 'copper' ? 0.0175 : 0.0283;

			// Temperature coefficient
			const tempCoeff = material === 'copper' ? 0.004 : 0.004;
			const resistivityAtTemp =
				resistivity * (1 + tempCoeff * (temperature - 20));

			// Calculate minimum section based on current density
			const maxCurrentDensity = material === 'copper' ? 4 : 3; // A/mm²
			const minSectionByCurrent = calculatedCurrent / maxCurrentDensity;

			// Calculate section based on voltage drop
			const maxVoltageDrop = (voltage * voltageDrop) / 100;
			const sectionByVoltageDrop =
				(2 * resistivityAtTemp * length * calculatedCurrent) /
				maxVoltageDrop;

			// Choose the larger section
			const recommendedSection = Math.max(
				minSectionByCurrent,
				sectionByVoltageDrop
			);

			// Find standard section
			const standardSections = [
				1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185,
				240, 300, 400, 500,
			];
			const standardSection =
				standardSections.find(
					(section) => section >= recommendedSection
				) || recommendedSection;

			// Calculate actual parameters
			const actualCurrentDensity = calculatedCurrent / standardSection;
			const actualResistance =
				(resistivityAtTemp * length) / standardSection;
			const actualVoltageDrop = 2 * actualResistance * calculatedCurrent;
			const actualVoltageDropPercent =
				(actualVoltageDrop / voltage) * 100;

			// Calculate weight and cost (approximate)
			const density = material === 'copper' ? 8.9 : 2.7; // g/cm³
			const weight = (standardSection * length * density) / 1000; // kg
			const pricePerKg = material === 'copper' ? 8 : 3; // USD/kg
			const cost = weight * pricePerKg;

			setResult({
				recommendedSection,
				standardSection,
				currentDensity: actualCurrentDensity,
				voltageDrop: actualVoltageDrop,
				voltageDropPercent: actualVoltageDropPercent,
				resistance: actualResistance,
				weight,
				cost,
			});
		} catch (error) {
			alert(t('form.errors.invalidNumber'));
		} finally {
			setIsCalculating(false);
		}
	};

	const resetCalculator = () => {
		setPower(0);
		setCurrent(0);
		setVoltage(220);
		setLength(0);
		setMaterial('copper');
		setPhaseType('single');
		setPowerFactor(0.8);
		setVoltageDrop(3);
		setTemperature(25);
		setInstallationMethod('open');
		setResult(null);
		setCopied(false);
	};

	const copyResults = () => {
		if (result) {
			const textToCopy =
				`${t('results.title')}\n` +
				`${t(
					'results.recommendedSection'
				)}: ${result.recommendedSection.toFixed(2)} mm²\n` +
				`${t('results.standardSection')}: ${
					result.standardSection
				} mm²\n` +
				`${t(
					'results.currentDensity'
				)}: ${result.currentDensity.toFixed(2)} A/mm²\n` +
				`${t('results.voltageDrop')}: ${result.voltageDrop.toFixed(
					2
				)} V (${result.voltageDropPercent.toFixed(2)}%)\n` +
				`${t('results.resistance')}: ${result.resistance.toFixed(
					4
				)} Ω\n` +
				`${t('results.weight')}: ${result.weight.toFixed(2)} kg\n` +
				`${t('results.cost')}: $${result.cost.toFixed(2)}`;

			navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<Cable className='h-8 w-8 text-green-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<p className='text-gray-600 mb-8'>{t('form.description')}</p>

				{/* Calculation Type */}
				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.calculationType')}
					</label>
					<select
						value={calculationType}
						onChange={(e) => setCalculationType(e.target.value)}
						className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
					>
						<option value='power'>
							{t('form.calculationTypes.power')}
						</option>
						<option value='current'>
							{t('form.calculationTypes.current')}
						</option>
					</select>
				</div>

				{/* Input Fields */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
					{calculationType === 'power' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.power')}
							</label>
							<input
								type='number'
								value={power}
								onChange={(e) =>
									setPower(Number(e.target.value))
								}
								placeholder={t('form.powerPlaceholder')}
								className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>
					)}

					{calculationType === 'current' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.current')}
							</label>
							<input
								type='number'
								value={current}
								onChange={(e) =>
									setCurrent(Number(e.target.value))
								}
								placeholder={t('form.currentPlaceholder')}
								className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>
					)}

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.voltage')}
						</label>
						<input
							type='number'
							value={voltage}
							onChange={(e) => setVoltage(Number(e.target.value))}
							placeholder={t('form.voltagePlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
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
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.material')}
						</label>
						<select
							value={material}
							onChange={(e) => setMaterial(e.target.value)}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						>
							<option value='copper'>
								{t('form.materials.copper')}
							</option>
							<option value='aluminum'>
								{t('form.materials.aluminum')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.phaseType')}
						</label>
						<select
							value={phaseType}
							onChange={(e) => setPhaseType(e.target.value)}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						>
							<option value='single'>
								{t('form.phaseTypes.single')}
							</option>
							<option value='three'>
								{t('form.phaseTypes.three')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.powerFactor')}
						</label>
						<input
							type='number'
							step='0.1'
							min='0'
							max='1'
							value={powerFactor}
							onChange={(e) =>
								setPowerFactor(Number(e.target.value))
							}
							placeholder={t('form.powerFactorPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.voltageDrop')}
						</label>
						<input
							type='number'
							value={voltageDrop}
							onChange={(e) =>
								setVoltageDrop(Number(e.target.value))
							}
							placeholder={t('form.voltageDropPlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.temperature')}
						</label>
						<input
							type='number'
							value={temperature}
							onChange={(e) =>
								setTemperature(Number(e.target.value))
							}
							placeholder={t('form.temperaturePlaceholder')}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.installationMethod')}
						</label>
						<select
							value={installationMethod}
							onChange={(e) =>
								setInstallationMethod(e.target.value)
							}
							className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						>
							<option value='open'>
								{t('form.installationMethods.open')}
							</option>
							<option value='closed'>
								{t('form.installationMethods.closed')}
							</option>
							<option value='underground'>
								{t('form.installationMethods.underground')}
							</option>
						</select>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex space-x-4'>
					<button
						onClick={calculateCableSection}
						disabled={isCalculating}
						className='bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 disabled:opacity-50'
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
							className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300'
						>
							<Copy className='inline-block w-4 h-4 mr-2' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-4'>
							<div className='bg-green-50 p-4 rounded-lg'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.cable')}
								</h3>
								<p className='text-green-800'>
									<strong>
										{t('results.recommendedSection')}:
									</strong>{' '}
									{result.recommendedSection.toFixed(2)} mm²
								</p>
								<p className='text-green-800'>
									<strong>
										{t('results.standardSection')}:
									</strong>{' '}
									{result.standardSection} mm²
								</p>
								<p className='text-green-800'>
									<strong>
										{t('results.currentDensity')}:
									</strong>{' '}
									{result.currentDensity.toFixed(2)} A/mm²
								</p>
							</div>

							<div className='bg-blue-50 p-4 rounded-lg'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.specifications')}
								</h3>
								<p className='text-blue-800'>
									<strong>{t('results.voltageDrop')}:</strong>{' '}
									{result.voltageDrop.toFixed(2)} V (
									{result.voltageDropPercent.toFixed(2)}%)
								</p>
								<p className='text-blue-800'>
									<strong>{t('results.resistance')}:</strong>{' '}
									{result.resistance.toFixed(4)} Ω
								</p>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{t('results.summary')}
							</h3>
							<p className='text-gray-700 mb-4'>
								<strong>{t('results.weight')}:</strong>{' '}
								{result.weight.toFixed(2)} kg
							</p>
							<p className='text-gray-700'>
								<strong>{t('results.cost')}:</strong> $
								{result.cost.toFixed(2)}
							</p>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
