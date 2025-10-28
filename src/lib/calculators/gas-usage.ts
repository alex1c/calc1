/**
 * Gas Usage Calculator Logic
 * Calculates natural gas consumption and costs for heating, cooking, or water heating
 */

export interface GasUsageInput {
	purpose: 'heating' | 'water_heating' | 'cooking'; // Gas usage purpose
	area?: number; // Room area in m² (for heating)
	hoursPerDay: number; // Hours of operation per day
	power: number; // Equipment power in kW
	efficiency: number; // System efficiency in %
	tariff: number; // Gas tariff per m³
	periodDays: number; // Period duration in days
}

export interface GasUsageResult {
	dailyConsumption: number; // Daily gas consumption in m³
	monthlyConsumption: number; // Monthly gas consumption in m³
	periodConsumption: number; // Period gas consumption in m³
	totalEnergy: number; // Total energy in kWh
	dailyCost: number; // Daily gas cost in currency
	monthlyCost: number; // Monthly gas cost in currency
	periodCost: number; // Period gas cost in currency
	consumptionPerHour: number; // Gas consumption per hour in m³/h
	purposeInfo: GasPurposeInfo; // Information about gas purpose
}

export interface GasPurposeInfo {
	id: string;
	name: string;
	description: string;
	typicalPowerRange: { min: number; max: number }; // Typical power range in kW
	typicalConsumption: { min: number; max: number }; // Typical consumption in m³/h
}

export interface GasEquipmentType {
	id: string;
	name: string;
	powerRange: { min: number; max: number }; // Power range in kW
	consumptionRange: { min: number; max: number }; // Consumption range in m³/h
	description: string;
}

// Gas usage purposes with their characteristics
export const GAS_PURPOSES: GasPurposeInfo[] = [
	{
		id: 'heating',
		name: 'Heating',
		description: 'Space heating with gas boiler or heater',
		typicalPowerRange: { min: 10, max: 40 },
		typicalConsumption: { min: 1.2, max: 4.5 },
	},
	{
		id: 'water_heating',
		name: 'Water Heating',
		description: 'Hot water supply with gas water heater',
		typicalPowerRange: { min: 15, max: 30 },
		typicalConsumption: { min: 1.5, max: 2.5 },
	},
	{
		id: 'cooking',
		name: 'Cooking',
		description: 'Gas stove for cooking',
		typicalPowerRange: { min: 3, max: 8 },
		typicalConsumption: { min: 0.6, max: 1.2 },
	},
];

// Gas equipment types with typical consumption
export const GAS_EQUIPMENT_TYPES: GasEquipmentType[] = [
	{
		id: 'gas_stove',
		name: 'Gas Stove (4 burners)',
		powerRange: { min: 3, max: 8 },
		consumptionRange: { min: 0.6, max: 1.2 },
		description: '4-burner gas stove for cooking',
	},
	{
		id: 'gas_water_heater',
		name: 'Gas Water Heater',
		powerRange: { min: 15, max: 30 },
		consumptionRange: { min: 1.5, max: 2.5 },
		description: 'Gas water heater for hot water supply',
	},
	{
		id: 'gas_boiler_10_20',
		name: 'Gas Boiler 10-20 kW',
		powerRange: { min: 10, max: 20 },
		consumptionRange: { min: 1.2, max: 2.4 },
		description: 'Small gas boiler for heating',
	},
	{
		id: 'gas_boiler_30_40',
		name: 'Gas Boiler 30-40 kW',
		powerRange: { min: 30, max: 40 },
		consumptionRange: { min: 3.0, max: 4.5 },
		description: 'Large gas boiler for heating',
	},
];

/**
 * Validates input parameters for gas usage calculation
 */
export function validateGasUsageInput(input: GasUsageInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.purpose) {
		errors.push('Gas purpose is required');
	}

	if (input.purpose === 'heating' && (!input.area || input.area <= 0)) {
		errors.push('Area is required for heating calculations');
	}

	if (input.area && input.area > 10000) {
		errors.push('Area seems too large (max 10000 m²)');
	}

	if (input.hoursPerDay < 0 || input.hoursPerDay > 24) {
		errors.push('Hours per day should be between 0 and 24');
	}

	if (input.power <= 0 || input.power > 100) {
		errors.push('Power should be between 0 and 100 kW');
	}

	if (input.efficiency < 10 || input.efficiency > 100) {
		errors.push('Efficiency should be between 10% and 100%');
	}

	if (input.tariff < 0) {
		errors.push('Tariff must be positive');
	}

	if (input.periodDays < 1 || input.periodDays > 365) {
		errors.push('Period should be between 1 and 365 days');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Calculates gas usage and costs based on input parameters
 */
export function calculateGasUsage(input: GasUsageInput): GasUsageResult {
	const validation = validateGasUsageInput(input);
	if (!validation.isValid) {
		throw new Error(validation.errors.join(', '));
	}

	// Get gas purpose information
	const purposeInfo = GAS_PURPOSES.find((p) => p.id === input.purpose);
	if (!purposeInfo) {
		throw new Error('Invalid gas purpose');
	}

	// Calculate gas consumption per hour
	// Gas consumption depends on power and efficiency
	// 1 m³ of natural gas ≈ 10 kWh of energy
	const energyPerHour = input.power; // kW
	const gasConsumptionPerHour = energyPerHour / 10; // m³/h
	const adjustedConsumptionPerHour =
		gasConsumptionPerHour / (input.efficiency / 100);

	// Calculate daily consumption
	const dailyConsumption = adjustedConsumptionPerHour * input.hoursPerDay;

	// Calculate monthly consumption (30 days)
	const monthlyConsumption = dailyConsumption * 30;

	// Calculate period consumption
	const periodConsumption = dailyConsumption * input.periodDays;

	// Calculate total energy consumption
	const totalEnergy =
		(input.power * input.hoursPerDay * input.periodDays) /
		(input.efficiency / 100);

	// Calculate costs
	const dailyCost = dailyConsumption * input.tariff;
	const monthlyCost = monthlyConsumption * input.tariff;
	const periodCost = periodConsumption * input.tariff;

	return {
		dailyConsumption: Math.round(dailyConsumption * 100) / 100,
		monthlyConsumption: Math.round(monthlyConsumption * 100) / 100,
		periodConsumption: Math.round(periodConsumption * 100) / 100,
		totalEnergy: Math.round(totalEnergy * 100) / 100,
		dailyCost: Math.round(dailyCost * 100) / 100,
		monthlyCost: Math.round(monthlyCost * 100) / 100,
		periodCost: Math.round(periodCost * 100) / 100,
		consumptionPerHour: Math.round(adjustedConsumptionPerHour * 100) / 100,
		purposeInfo,
	};
}

/**
 * Gets gas purpose by ID
 */
export function getGasPurpose(id: string): GasPurposeInfo | undefined {
	return GAS_PURPOSES.find((p) => p.id === id);
}

/**
 * Gets gas equipment type by ID
 */
export function getGasEquipmentType(id: string): GasEquipmentType | undefined {
	return GAS_EQUIPMENT_TYPES.find((e) => e.id === id);
}

/**
 * Formats gas consumption with units
 */
export function formatGasConsumption(
	consumption: number,
	unit: string = 'm³'
): string {
	return `${consumption} ${unit}`;
}

/**
 * Formats energy consumption with units
 */
export function formatEnergy(energy: number, unit: string = 'kWh'): string {
	return `${energy} ${unit}`;
}

/**
 * Formats cost with currency
 */
export function formatCost(cost: number, currency: string = '₽'): string {
	return `${cost} ${currency}`;
}

/**
 * Gets consumption range description for equipment type
 */
export function getConsumptionRangeDescription(equipmentType: string): string {
	const equipment = getGasEquipmentType(equipmentType);
	if (!equipment) return '';

	return `${equipment.consumptionRange.min}–${equipment.consumptionRange.max} m³/h`;
}

/**
 * Calculates gas consumption for different scenarios
 */
export function calculateGasScenarios(
	baseInput: GasUsageInput,
	scenarios: Array<{ name: string; efficiency: number; hoursPerDay: number }>
): Array<{ name: string; dailyConsumption: number; dailyCost: number }> {
	return scenarios.map((scenario) => {
		const scenarioInput = {
			...baseInput,
			efficiency: scenario.efficiency,
			hoursPerDay: scenario.hoursPerDay,
		};

		const result = calculateGasUsage(scenarioInput);
		return {
			name: scenario.name,
			dailyConsumption: result.dailyConsumption,
			dailyCost: result.dailyCost,
		};
	});
}

/**
 * Gets typical consumption for gas purpose
 */
export function getTypicalConsumption(purpose: string): {
	min: number;
	max: number;
} {
	const purposeInfo = getGasPurpose(purpose);
	return purposeInfo ? purposeInfo.typicalConsumption : { min: 0, max: 0 };
}

/**
 * Estimates gas consumption based on area (for heating)
 */
export function estimateHeatingConsumption(
	area: number,
	efficiency: number
): number {
	// Typical heating power: 80-120 W/m²
	const powerPerM2 = 100; // W/m²
	const totalPower = (area * powerPerM2) / 1000; // kW
	const gasConsumptionPerHour = totalPower / 10; // m³/h
	return gasConsumptionPerHour / (efficiency / 100);
}







