/**
 * Floor Heating Calculator Library
 *
 * Provides functionality for calculating power requirements and energy consumption for electric underfloor heating.
 *
 * Features:
 * - Multiple room types (bathroom, kitchen, living, bedroom, balcony)
 * - Insulation quality consideration (good, average, poor)
 * - Power per m² calculation based on room type and insulation
 * - Total system power calculation
 * - Daily and monthly energy consumption calculation
 * - Cost calculation based on electricity tariff
 * - Power range recommendations for room types
 *
 * Room types and power ranges:
 * - Bathroom: 150-180 W/m² (high humidity, higher power)
 * - Kitchen: 120-150 W/m² (medium power)
 * - Living Room: 100-130 W/m² (comfort heating)
 * - Bedroom: 100-120 W/m² (lower power for comfort)
 * - Balcony/Loggia: 160-200 W/m² (high heat loss, maximum power)
 *
 * Insulation multipliers:
 * - Good: 0.8 (well-insulated, lower power needed)
 * - Average: 1.0 (standard insulation)
 * - Poor: 1.3 (poor insulation, higher power needed)
 *
 * Calculation method:
 * - Base power = average of room type power range
 * - Recommended power = base power × insulation multiplier
 * - Total power = recommended power × area
 * - Consumption = (total power × hours per day) / 1000 (convert W to kW)
 */

export interface FloorHeatingInput {
	area: number; // Room area in m²
	roomType: 'bathroom' | 'kitchen' | 'living' | 'bedroom' | 'balcony'; // Room type
	insulation: 'good' | 'average' | 'poor'; // Floor insulation quality
	temperature: number; // Desired floor temperature in °C
	hoursPerDay: number; // Hours of operation per day
	electricityCost: number; // Cost per kWh in currency
}

export interface FloorHeatingResult {
	recommendedPower: number; // Recommended power per m² in W/m²
	totalPower: number; // Total system power in W
	dailyConsumption: number; // Daily consumption in kWh
	monthlyConsumption: number; // Monthly consumption in kWh
	dailyCost: number; // Daily cost in currency
	monthlyCost: number; // Monthly cost in currency
	powerRange: { min: number; max: number }; // Power range for room type
}

export interface RoomType {
	id: string;
	name: string;
	powerRange: { min: number; max: number };
	description: string;
}

export interface InsulationType {
	id: string;
	name: string;
	multiplier: number;
	description: string;
}

// Room types with recommended power ranges
export const ROOM_TYPES: RoomType[] = [
	{
		id: 'bathroom',
		name: 'Bathroom',
		powerRange: { min: 150, max: 180 },
		description: 'High humidity, requires higher power',
	},
	{
		id: 'kitchen',
		name: 'Kitchen',
		powerRange: { min: 120, max: 150 },
		description: 'Medium power requirements',
	},
	{
		id: 'living',
		name: 'Living Room',
		powerRange: { min: 100, max: 130 },
		description: 'Comfort heating, moderate power',
	},
	{
		id: 'bedroom',
		name: 'Bedroom',
		powerRange: { min: 100, max: 120 },
		description: 'Lower power for comfort',
	},
	{
		id: 'balcony',
		name: 'Balcony / Loggia',
		powerRange: { min: 160, max: 200 },
		description: 'High heat loss, maximum power needed',
	},
];

// Insulation types with power multipliers
export const INSULATION_TYPES: InsulationType[] = [
	{
		id: 'good',
		name: 'Good Insulation',
		multiplier: 0.8,
		description: 'Well-insulated floor, lower power needed',
	},
	{
		id: 'average',
		name: 'Average Insulation',
		multiplier: 1.0,
		description: 'Standard insulation, normal power',
	},
	{
		id: 'poor',
		name: 'Poor Insulation',
		multiplier: 1.3,
		description: 'Poor insulation, higher power needed',
	},
];

/**
 * Validate input parameters for floor heating calculation
 *
 * Performs validation checks:
 * - Area is positive and not too large (max 1000 m²)
 * - Room type is specified
 * - Insulation type is specified
 * - Temperature is between 15°C and 35°C
 * - Hours per day is between 0 and 24
 * - Electricity cost is non-negative
 *
 * @param input - Floor heating input parameters
 * @returns Validation result with boolean status and array of error messages
 */
export function validateFloorHeatingInput(input: FloorHeatingInput): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!input.area || input.area <= 0) {
		errors.push('Area must be greater than 0');
	}

	if (input.area > 1000) {
		errors.push('Area seems too large (max 1000 m²)');
	}

	if (!input.roomType) {
		errors.push('Room type is required');
	}

	if (!input.insulation) {
		errors.push('Insulation type is required');
	}

	if (input.temperature < 15 || input.temperature > 35) {
		errors.push('Temperature should be between 15°C and 35°C');
	}

	if (input.hoursPerDay < 0 || input.hoursPerDay > 24) {
		errors.push('Hours per day should be between 0 and 24');
	}

	if (input.electricityCost < 0) {
		errors.push('Electricity cost must be positive');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Calculate floor heating power and energy consumption
 *
 * Calculates:
 * - Recommended power per m² (based on room type and insulation)
 * - Total system power (power per m² × area)
 * - Daily consumption (total power × hours per day / 1000, convert W to kW)
 * - Monthly consumption (daily consumption × 30)
 * - Daily and monthly costs (consumption × electricity tariff)
 *
 * Algorithm:
 * 1. Get room type data and calculate base power (average of power range)
 * 2. Apply insulation multiplier to base power
 * 3. Calculate total power = recommended power × area
 * 4. Calculate energy consumption (convert W to kW)
 * 5. Calculate costs based on tariff
 *
 * @param input - Floor heating input parameters
 * @returns Floor heating result with power, consumption, and costs
 * @throws Error if validation fails or room/insulation type is invalid
 */
export function calculateFloorHeating(
	input: FloorHeatingInput
): FloorHeatingResult {
	const validation = validateFloorHeatingInput(input);
	if (!validation.isValid) {
		throw new Error(validation.errors.join(', '));
	}

	// Get room type data
	const roomType = ROOM_TYPES.find((rt) => rt.id === input.roomType);
	if (!roomType) {
		throw new Error('Invalid room type');
	}

	// Get insulation data
	const insulation = INSULATION_TYPES.find(
		(it) => it.id === input.insulation
	);
	if (!insulation) {
		throw new Error('Invalid insulation type');
	}

	// Calculate recommended power per m²
	// Base power from room type, adjusted by insulation
	const basePower = (roomType.powerRange.min + roomType.powerRange.max) / 2;
	const recommendedPower = Math.round(basePower * insulation.multiplier);

	// Calculate total system power
	const totalPower = Math.round(input.area * recommendedPower);

	// Calculate energy consumption
	const dailyConsumption = (totalPower * input.hoursPerDay) / 1000; // Convert W to kW
	const monthlyConsumption = dailyConsumption * 30;

	// Calculate costs
	const dailyCost = dailyConsumption * input.electricityCost;
	const monthlyCost = monthlyConsumption * input.electricityCost;

	return {
		recommendedPower,
		totalPower,
		dailyConsumption: Math.round(dailyConsumption * 100) / 100,
		monthlyConsumption: Math.round(monthlyConsumption * 100) / 100,
		dailyCost: Math.round(dailyCost * 100) / 100,
		monthlyCost: Math.round(monthlyCost * 100) / 100,
		powerRange: roomType.powerRange,
	};
}

/**
 * Gets room type by ID
 */
export function getRoomType(id: string): RoomType | undefined {
	return ROOM_TYPES.find((rt) => rt.id === id);
}

/**
 * Gets insulation type by ID
 */
export function getInsulationType(id: string): InsulationType | undefined {
	return INSULATION_TYPES.find((it) => it.id === id);
}

/**
 * Formats power value with units
 */
export function formatPower(power: number): string {
	return `${power} W/m²`;
}

/**
 * Formats energy consumption with units
 */
export function formatEnergy(
	energy: number,
	period: 'daily' | 'monthly'
): string {
	const unit = period === 'daily' ? 'kWh/day' : 'kWh/month';
	return `${energy} ${unit}`;
}

/**
 * Formats cost with currency
 */
export function formatCost(cost: number, currency: string = '₽'): string {
	return `${cost} ${currency}`;
}

/**
 * Gets power range description for room type
 */
export function getPowerRangeDescription(roomType: string): string {
	const room = getRoomType(roomType);
	if (!room) return '';

	return `${room.powerRange.min}–${room.powerRange.max} W/m²`;
}
