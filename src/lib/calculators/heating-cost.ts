/**
 * Heating Cost Calculator Logic
 * Calculates heating costs based on system type, area, season duration and tariffs
 */

export interface HeatingCostInput {
	area: number; // Room area in m²
	seasonDays: number; // Heating season duration in days
	hoursPerDay: number; // Hours of operation per day
	temperature: number; // Room temperature in °C
	heatingType: 'electric' | 'gas' | 'solid_fuel' | 'central'; // Heating system type
	tariff: number; // Energy tariff per unit
	efficiency: number; // System efficiency in %
}

export interface HeatingCostResult {
	requiredPower: number; // Required heating power in W
	dailyConsumption: number; // Daily energy consumption in kWh
	seasonalConsumption: number; // Seasonal energy consumption in kWh
	dailyCost: number; // Daily heating cost in currency
	seasonalCost: number; // Seasonal heating cost in currency
	powerPerSquareMeter: number; // Power per m² in W/m²
	heatingTypeInfo: HeatingTypeInfo; // Information about heating type
}

export interface HeatingTypeInfo {
	id: string;
	name: string;
	unit: string; // Energy unit (kWh, m³, kg)
	description: string;
	typicalEfficiency: number; // Typical efficiency for this type
}

export interface BuildingType {
	id: string;
	name: string;
	powerRange: { min: number; max: number };
	description: string;
}

// Heating system types with their characteristics
export const HEATING_TYPES: HeatingTypeInfo[] = [
	{
		id: 'electric',
		name: 'Electric Heating',
		unit: 'kWh',
		description: 'Electric radiators, convectors, infrared heaters',
		typicalEfficiency: 100,
	},
	{
		id: 'gas',
		name: 'Gas Heating',
		unit: 'm³',
		description: 'Gas boilers, gas convectors',
		typicalEfficiency: 90,
	},
	{
		id: 'solid_fuel',
		name: 'Solid Fuel Heating',
		unit: 'kg',
		description: 'Wood, coal, pellets stoves and boilers',
		typicalEfficiency: 75,
	},
	{
		id: 'central',
		name: 'Central Heating',
		unit: 'kWh',
		description: 'Central heating system (district heating)',
		typicalEfficiency: 85,
	},
];

// Building types with typical heating power requirements
export const BUILDING_TYPES: BuildingType[] = [
	{
		id: 'modern_insulated',
		name: 'Modern Insulated House',
		powerRange: { min: 60, max: 80 },
		description: 'Well-insulated modern house',
	},
	{
		id: 'average_insulation',
		name: 'Average Insulation House',
		powerRange: { min: 90, max: 120 },
		description: 'House with medium insulation',
	},
	{
		id: 'old_uninsulated',
		name: 'Old Uninsulated House',
		powerRange: { min: 130, max: 180 },
		description: 'Old house without proper insulation',
	},
	{
		id: 'apartment',
		name: 'Apartment Building',
		powerRange: { min: 70, max: 100 },
		description: 'Apartment in multi-story building',
	},
];

/**
 * Validates input parameters for heating cost calculation
 */
export function validateHeatingCostInput(input: HeatingCostInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.area || input.area <= 0) {
		errors.push('Area must be greater than 0');
	}

	if (input.area > 10000) {
		errors.push('Area seems too large (max 10000 m²)');
	}

	if (input.seasonDays < 1 || input.seasonDays > 365) {
		errors.push('Season duration should be between 1 and 365 days');
	}

	if (input.hoursPerDay < 0 || input.hoursPerDay > 24) {
		errors.push('Hours per day should be between 0 and 24');
	}

	if (input.temperature < 10 || input.temperature > 30) {
		errors.push('Temperature should be between 10°C and 30°C');
	}

	if (!input.heatingType) {
		errors.push('Heating type is required');
	}

	if (input.tariff < 0) {
		errors.push('Tariff must be positive');
	}

	if (input.efficiency < 10 || input.efficiency > 100) {
		errors.push('Efficiency should be between 10% and 100%');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Calculates heating costs based on input parameters
 */
export function calculateHeatingCost(
	input: HeatingCostInput
): HeatingCostResult {
	const validation = validateHeatingCostInput(input);
	if (!validation.isValid) {
		throw new Error(validation.errors.join(', '));
	}

	// Get heating type information
	const heatingType = HEATING_TYPES.find((ht) => ht.id === input.heatingType);
	if (!heatingType) {
		throw new Error('Invalid heating type');
	}

	// Calculate required power per m² based on temperature
	// Base power calculation: higher temperature difference requires more power
	const basePowerPerM2 = 80; // Base power for 20°C room temperature
	const temperatureFactor = Math.max(0.5, input.temperature / 20); // Temperature adjustment factor
	const powerPerSquareMeter = Math.round(basePowerPerM2 * temperatureFactor);

	// Calculate total required power
	const requiredPower = Math.round(input.area * powerPerSquareMeter);

	// Calculate energy consumption
	// Adjust for system efficiency
	const efficiencyFactor = input.efficiency / 100;
	const adjustedPower = requiredPower / efficiencyFactor;

	// Calculate daily consumption in kWh
	const dailyConsumption = (adjustedPower * input.hoursPerDay) / 1000;
	const seasonalConsumption = dailyConsumption * input.seasonDays;

	// Calculate costs
	const dailyCost = dailyConsumption * input.tariff;
	const seasonalCost = seasonalConsumption * input.tariff;

	return {
		requiredPower,
		dailyConsumption: Math.round(dailyConsumption * 100) / 100,
		seasonalConsumption: Math.round(seasonalConsumption * 100) / 100,
		dailyCost: Math.round(dailyCost * 100) / 100,
		seasonalCost: Math.round(seasonalCost * 100) / 100,
		powerPerSquareMeter,
		heatingTypeInfo: heatingType,
	};
}

/**
 * Gets heating type by ID
 */
export function getHeatingType(id: string): HeatingTypeInfo | undefined {
	return HEATING_TYPES.find((ht) => ht.id === id);
}

/**
 * Gets building type by ID
 */
export function getBuildingType(id: string): BuildingType | undefined {
	return BUILDING_TYPES.find((bt) => bt.id === id);
}

/**
 * Formats power value with units
 */
export function formatPower(power: number): string {
	return `${power} W`;
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
 * Gets power range description for building type
 */
export function getPowerRangeDescription(buildingType: string): string {
	const building = getBuildingType(buildingType);
	if (!building) return '';

	return `${building.powerRange.min}–${building.powerRange.max} W/m²`;
}

/**
 * Calculates energy conversion for different heating types
 */
export function convertEnergyToUnits(
	energyKWh: number,
	heatingType: string
): number {
	const heatingTypeInfo = getHeatingType(heatingType);
	if (!heatingTypeInfo) return energyKWh;

	// Conversion factors (approximate)
	switch (heatingType) {
		case 'gas':
			// 1 m³ of natural gas ≈ 10 kWh
			return energyKWh / 10;
		case 'solid_fuel':
			// 1 kg of wood ≈ 4 kWh
			return energyKWh / 4;
		default:
			return energyKWh;
	}
}

/**
 * Gets tariff unit for heating type
 */
export function getTariffUnit(heatingType: string): string {
	const heatingTypeInfo = getHeatingType(heatingType);
	return heatingTypeInfo ? heatingTypeInfo.unit : 'kWh';
}






