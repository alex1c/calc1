'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	Zap,
	Shield,
} from 'lucide-react';

interface ElectricalInput {
	calculationType: string;
	inputMethod: 'power' | 'current';
	power?: number;
	current?: number;
	voltage: number;
	length: number;
	material: string;
	phaseType: string;
	powerFactor: number;
	voltageDrop: number;
	circuitBreakerType: string;
	installationMethod: string;
}

interface ElectricalResult {
	cableSection: {
		recommended: number;
		standard: number;
		currentDensity: number;
		voltageDrop: number;
		voltageDropPercent: number;
		resistance: number;
	};
	circuitBreaker: {
		calculatedCurrent: number;
		selectionCurrent: number;
		recommended: number;
		type: string;
	};
}

// Material properties: resistivity (Ohm·mm²/m), density (A/mm²)
// Current density based on PUE tables for typical sections (1.5-10 mm²)
// Actual values: copper 1.5mm² = 21A (14 A/mm²), 2.5mm² = 27A (11 A/mm²), 4mm² = 38A (9.5 A/mm²)
// Using conservative average values for safety
const MATERIAL_PROPERTIES: Record<string, { resistivity: number; currentDensity: number; currentDensityHidden: number }> = {
	copper: {
		resistivity: 0.0175,
		currentDensity: 10, // Average for open installation (9-14 A/mm² range)
		currentDensityHidden: 7, // Average for closed installation (6-9 A/mm² range)
	},
	aluminum: {
		resistivity: 0.0283,
		currentDensity: 7, // Average for open installation (6-9 A/mm² range)
		currentDensityHidden: 5, // Average for closed installation (4-6 A/mm² range)
	},
};

// Standard cable sections (mm²)
const STANDARD_SECTIONS = [
	0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185,
	240, 300, 400, 500,
];

// Standard circuit breaker ratings (A)
const STANDARD_BREAKERS = [
	6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250,
];

export default function ElectricalCalculator() {
	const t = useTranslations('calculators.electrical');
	const [input, setInput] = useState<ElectricalInput>({
		calculationType: 'both',
		inputMethod: 'power',
		power: 2.5,
		current: 0,
		voltage: 220,
		length: 15,
		material: 'copper',
		phaseType: 'single',
		powerFactor: 0.9,
		voltageDrop: 3,
		circuitBreakerType: 'c',
		installationMethod: 'open',
	});
	const [result, setResult] = useState<ElectricalResult | null>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const calculationTypes = t.raw('options.calculationTypes');
	const materials = t.raw('options.materials');
	const phaseTypes = t.raw('options.phaseTypes');
	const circuitBreakerTypes = t.raw('options.circuitBreakerTypes');
	const installationMethods = t.raw('options.installationMethods');

	const handleInputChange = (
		field: keyof ElectricalInput,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (input.inputMethod === 'power') {
			if (!input.power || input.power <= 0) {
				validationErrors.push(t('form.errors.powerRequired'));
			}
		} else {
			if (!input.current || input.current <= 0) {
				validationErrors.push(t('form.errors.currentRequired'));
			}
		}

		if (!input.voltage || input.voltage < 12 || input.voltage > 1000) {
			validationErrors.push(t('form.errors.invalidVoltage'));
		}

		if (!input.length || input.length <= 0) {
			validationErrors.push(t('form.errors.lengthRequired'));
		}

		if (input.powerFactor < 0.5 || input.powerFactor > 1) {
			validationErrors.push(t('form.errors.invalidPowerFactor'));
		}

		return validationErrors;
	};

	const calculateElectrical = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			// Calculate current
			let calculatedCurrent = input.current || 0;

			if (input.inputMethod === 'power' && input.power) {
				const powerInWatts = input.power * 1000;
				if (input.phaseType === 'single') {
					calculatedCurrent = powerInWatts / (input.voltage * input.powerFactor);
				} else {
					calculatedCurrent =
						powerInWatts / (Math.sqrt(3) * input.voltage * input.powerFactor);
				}
			}

			// Get material properties
			const materialProps =
				MATERIAL_PROPERTIES[input.material] || MATERIAL_PROPERTIES.copper;
			const currentDensity =
				input.installationMethod === 'closed'
					? materialProps.currentDensityHidden
					: materialProps.currentDensity;

			// Calculate cable section by current density
			const sectionByCurrent = calculatedCurrent / currentDensity;

			// Calculate cable section by voltage drop
			// Formula: S = (2 × ρ × L × I) / (ΔU × U) for single-phase
			// Formula: S = (√3 × ρ × L × I) / (ΔU × U) for three-phase
			// where ΔU is voltage drop in volts, U is line voltage
			const maxVoltageDrop = (input.voltage * input.voltageDrop) / 100; // Convert % to volts
			const resistivityAtTemp = materialProps.resistivity;
			const sectionByVoltageDrop =
				input.phaseType === 'single'
					? (2 * resistivityAtTemp * input.length * calculatedCurrent) /
					  maxVoltageDrop
					: (Math.sqrt(3) * resistivityAtTemp * input.length * calculatedCurrent) /
					  maxVoltageDrop;

			// Choose the larger section
			const recommendedSection = Math.max(
				sectionByCurrent,
				sectionByVoltageDrop
			);

			// Find standard section
			const standardSection =
				STANDARD_SECTIONS.find((section) => section >= recommendedSection) ||
				recommendedSection;

			// Calculate actual parameters
			const actualCurrentDensity = calculatedCurrent / standardSection;
			const actualResistance =
				(resistivityAtTemp * input.length) / standardSection;
			const actualVoltageDrop =
				input.phaseType === 'single'
					? 2 * actualResistance * calculatedCurrent
					: Math.sqrt(3) * actualResistance * calculatedCurrent;
			const actualVoltageDropPercent =
				(actualVoltageDrop / input.voltage) * 100;

			// Calculate circuit breaker rating
			const selectionCurrent = calculatedCurrent * 1.25; // 25% reserve
			const recommendedBreaker =
				STANDARD_BREAKERS.find((rating) => rating >= selectionCurrent) ||
				selectionCurrent;

			setResult({
				cableSection: {
					recommended: recommendedSection,
					standard: standardSection,
					currentDensity: actualCurrentDensity,
					voltageDrop: actualVoltageDrop,
					voltageDropPercent: actualVoltageDropPercent,
					resistance: actualResistance,
				},
				circuitBreaker: {
					calculatedCurrent,
					selectionCurrent,
					recommended: recommendedBreaker,
					type: input.circuitBreakerType,
				},
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			calculationType: 'both',
			inputMethod: 'power',
			power: 2.5,
			current: 0,
			voltage: 220,
			length: 15,
			material: 'copper',
			phaseType: 'single',
			powerFactor: 0.9,
			voltageDrop: 3,
			circuitBreakerType: 'c',
			installationMethod: 'open',
		});
		setResult(null);
		setErrors([]);
	};

	return (
		<div className='max-w-6xl mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-4'>
					<Calculator className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400'>
					{t('description')}
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Square className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Calculation Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.calculationType')}
							</label>
							<select
								value={input.calculationType}
								onChange={(e) =>
									handleInputChange('calculationType', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(calculationTypes).map(
									([key, value]: [string, any]) => (
										<option key={key} value={key}>
											{value.label} - {value.description}
										</option>
									)
								)}
							</select>
						</div>

						{/* Input Method */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								Способ ввода данных
							</label>
							<select
								value={input.inputMethod}
								onChange={(e) =>
									handleInputChange(
										'inputMethod',
										e.target.value as 'power' | 'current'
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								<option value='power'>По мощности (кВт)</option>
								<option value='current'>По току (А)</option>
							</select>
						</div>

						{/* Power Input */}
						{input.inputMethod === 'power' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.power')}
								</label>
								<input
									type='number'
									step='0.1'
									value={input.power || ''}
									onChange={(e) =>
										handleInputChange(
											'power',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='2.5'
								/>
							</div>
						)}

						{/* Current Input */}
						{input.inputMethod === 'current' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.current')}
								</label>
								<input
									type='number'
									step='0.1'
									value={input.current || ''}
									onChange={(e) =>
										handleInputChange(
											'current',
											parseFloat(e.target.value) || 0
										)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder='12.6'
								/>
							</div>
						)}

						{/* Voltage */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.voltage')}
							</label>
							<select
								value={input.voltage}
								onChange={(e) =>
									handleInputChange('voltage', parseFloat(e.target.value) || 0)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								<option value='12'>12 В (низковольтное)</option>
								<option value='24'>24 В (низковольтное)</option>
								<option value='220'>220 В (однофазная сеть)</option>
								<option value='380'>380 В (трёхфазная сеть)</option>
							</select>
						</div>

						{/* Phase Type */}
						{(input.voltage === 220 || input.voltage === 380) && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.phaseType')}
								</label>
								<select
									value={input.phaseType}
									onChange={(e) =>
										handleInputChange('phaseType', e.target.value)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								>
									{Object.entries(phaseTypes).map(([key, value]: [string, any]) => (
										<option key={key} value={key}>
											{value.label} - {value.description}
										</option>
									))}
								</select>
							</div>
						)}

						{/* Length */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.length')}
							</label>
							<input
								type='number'
								step='0.1'
								value={input.length}
								onChange={(e) =>
									handleInputChange(
										'length',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='15'
							/>
						</div>

						{/* Material */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.material')}
							</label>
							<select
								value={input.material}
								onChange={(e) =>
									handleInputChange('material', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(materials).map(([key, value]: [string, any]) => (
									<option key={key} value={key}>
										{value.label} - {value.description}
									</option>
								))}
							</select>
						</div>

						{/* Installation Method */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.installationMethod')}
							</label>
							<select
								value={input.installationMethod}
								onChange={(e) =>
									handleInputChange('installationMethod', e.target.value)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(installationMethods).map(
									([key, value]: [string, any]) => (
										<option key={key} value={key}>
											{value.label} - {value.description}
										</option>
									)
								)}
							</select>
						</div>

						{/* Power Factor */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.powerFactor')}
							</label>
							<input
								type='number'
								step='0.01'
								min='0.5'
								max='1'
								value={input.powerFactor}
								onChange={(e) =>
									handleInputChange(
										'powerFactor',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='0.9'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								0.8-0.9 для бытовых нагрузок, 0.7-0.85 для двигателей
							</p>
						</div>

						{/* Voltage Drop */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.voltageDrop')}
							</label>
							<input
								type='number'
								step='0.1'
								min='1'
								max='10'
								value={input.voltageDrop}
								onChange={(e) =>
									handleInputChange(
										'voltageDrop',
										parseFloat(e.target.value) || 0
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								placeholder='3'
							/>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
								Обычно 3% для силовых сетей, до 5% для освещения
							</p>
						</div>

						{/* Circuit Breaker Type */}
						{(input.calculationType === 'breaker' ||
							input.calculationType === 'both') && (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.circuitBreakerType')}
								</label>
								<select
									value={input.circuitBreakerType}
									onChange={(e) =>
										handleInputChange('circuitBreakerType', e.target.value)
									}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
								>
									{Object.entries(circuitBreakerTypes).map(
										([key, value]: [string, any]) => (
											<option key={key} value={key}>
												{value.label} - {value.description}
											</option>
										)
									)}
								</select>
							</div>
						)}

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculateElectrical}
								className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
							>
								{t('form.calculate')}
							</button>
							<button
								onClick={handleReset}
								className='flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
							>
								<RotateCcw className='h-4 w-4 inline mr-2' />
								{t('form.reset')}
							</button>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Package className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
						{t('results.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
								<h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
									{t('form.errors.title')}
								</h3>
							</div>
							<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					{/* Results Content */}
					{result ? (
						<div className='space-y-4'>
							{/* Cable Section */}
							{(input.calculationType === 'cable' ||
								input.calculationType === 'both') && (
								<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
									<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
										<Zap className='w-5 h-5 mr-2' />
										{t('results.cableSection.title')}
									</h3>
									<div className='space-y-2 text-sm'>
										<div>
											<span className='text-green-700 dark:text-green-300'>
												{t('results.cableSection.recommended')}:
											</span>{' '}
											<strong className='text-green-900 dark:text-green-100'>
												{result.cableSection.recommended.toFixed(2)} мм²
											</strong>
										</div>
										<div>
											<span className='text-green-700 dark:text-green-300'>
												{t('results.cableSection.standard')}:
											</span>{' '}
											<strong className='text-green-900 dark:text-green-100'>
												{result.cableSection.standard} мм²
											</strong>
										</div>
										<div>
											<span className='text-green-700 dark:text-green-300'>
												{t('results.cableSection.currentDensity')}:
											</span>{' '}
											<strong className='text-green-900 dark:text-green-100'>
												{result.cableSection.currentDensity.toFixed(2)} А/мм²
											</strong>
										</div>
										<div>
											<span className='text-green-700 dark:text-green-300'>
												{t('results.cableSection.voltageDrop')}:
											</span>{' '}
											<strong className='text-green-900 dark:text-green-100'>
												{result.cableSection.voltageDrop.toFixed(2)} В (
												{result.cableSection.voltageDropPercent.toFixed(2)}%)
											</strong>
										</div>
										<div>
											<span className='text-green-700 dark:text-green-300'>
												{t('results.cableSection.resistance')}:
											</span>{' '}
											<strong className='text-green-900 dark:text-green-100'>
												{result.cableSection.resistance.toFixed(4)} Ом
											</strong>
										</div>
									</div>
								</div>
							)}

							{/* Circuit Breaker */}
							{(input.calculationType === 'breaker' ||
								input.calculationType === 'both') && (
								<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
									<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center'>
										<Shield className='w-5 h-5 mr-2' />
										{t('results.circuitBreaker.title')}
									</h3>
									<div className='space-y-2 text-sm'>
										<div>
											<span className='text-blue-700 dark:text-blue-300'>
												{t('results.circuitBreaker.calculatedCurrent')}:
											</span>{' '}
											<strong className='text-blue-900 dark:text-blue-100'>
												{result.circuitBreaker.calculatedCurrent.toFixed(2)} А
											</strong>
										</div>
										<div>
											<span className='text-blue-700 dark:text-blue-300'>
												{t('results.circuitBreaker.selectionCurrent')}:
											</span>{' '}
											<strong className='text-blue-900 dark:text-blue-100'>
												{result.circuitBreaker.selectionCurrent.toFixed(2)} А
											</strong>
										</div>
										<div>
											<span className='text-blue-700 dark:text-blue-300'>
												{t('results.circuitBreaker.recommended')}:
											</span>{' '}
											<strong className='text-blue-900 dark:text-blue-100'>
												{result.circuitBreaker.recommended} А{' '}
												{t(`options.circuitBreakerTypes.${result.circuitBreaker.type}.label`)}
											</strong>
										</div>
									</div>
								</div>
							)}
						</div>
					) : (
						<p className='text-gray-500 dark:text-gray-400'>
							{t('results.placeholder')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

