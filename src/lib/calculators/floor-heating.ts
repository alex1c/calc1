/**
 * Floor Heating Calculator Logic
 * Calculates power requirements and energy consumption for electric underfloor heating
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
 * Validates input parameters for floor heating calculation
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
 * Calculates floor heating power and energy consumption
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
