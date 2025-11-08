/**
 * Heating Cost Calculator Library
 *
 * Provides functionality for calculating heating costs based on system type, area, season duration, and tariffs.
 *
 * Features:
 * - Multiple heating system types (electric, gas, solid fuel, central)
 * - Power per m² calculation based on temperature
 * - Total power requirement calculation
 * - Daily and seasonal energy consumption calculation
 * - Cost calculation based on energy tariff
 * - Efficiency consideration
 * - Building type recommendations
 *
 * Heating system types:
 * - Electric: Electric radiators, convectors (100% efficiency, kWh)
 * - Gas: Gas boilers, convectors (90% efficiency, m³)
 * - Solid Fuel: Wood, coal, pellets (75% efficiency, kg)
 * - Central: Central heating system (85% efficiency, kWh)
 *
 * Building types and power ranges:
 * - Modern Insulated: 60-80 W/m²
 * - Average Insulation: 90-120 W/m²
 * - Old Uninsulated: 130-180 W/m²
 * - Apartment Building: 70-100 W/m²
 *
 * Calculation method:
 * - Base power per m² = 80 W/m² (for 20°C room temperature)
 * - Power per m² = base power × (temperature / 20)
 * - Total power = power per m² × area
 * - Adjusted power = total power / efficiency
 * - Consumption = (adjusted power × hours per day) / 1000 (convert W to kW)
 * - Costs = consumption × tariff
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
 * Validate input parameters for heating cost calculation
 *
 * Performs validation checks:
 * - Area is positive and not too large (max 10000 m²)
 * - Season days is between 1 and 365
 * - Hours per day is between 0 and 24
 * - Temperature is between 10°C and 30°C
 * - Heating type is specified
 * - Tariff is non-negative
 * - Efficiency is between 10% and 100%
 *
 * @param input - Heating cost input parameters
 * @returns Validation result with boolean status and array of error messages
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
 * Calculate heating costs based on input parameters
 *
 * Calculates:
 * - Required power per m² (based on temperature)
 * - Total required power (power per m² × area)
 * - Daily energy consumption (adjusted for efficiency, convert W to kW)
 * - Seasonal energy consumption (daily × season days)
 * - Daily and seasonal costs (consumption × tariff)
 *
 * Algorithm:
 * 1. Calculate base power per m² = 80 W/m² (for 20°C)
 * 2. Adjust for temperature: power per m² = base × (temperature / 20)
 * 3. Calculate total power = power per m² × area
 * 4. Adjust for efficiency: adjusted power = total power / (efficiency / 100)
 * 5. Calculate daily consumption = (adjusted power × hours) / 1000
 * 6. Calculate seasonal consumption = daily × season days
 * 7. Calculate costs = consumption × tariff
 *
 * @param input - Heating cost input parameters
 * @returns Heating cost result with power, consumption, and costs
 * @throws Error if validation fails or heating type is invalid
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







