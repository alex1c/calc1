// Ventilation calculator for rooms
// Calculates required ventilation capacity based on room type and occupancy

export interface VentilationInput {
	// Room dimensions
	roomLength: number; // meters
	roomWidth: number; // meters
	roomHeight: number; // meters

	// Room type
	roomType: string; // e.g., 'living', 'office', 'kitchen', 'bathroom'

	// Occupancy
	peopleCount?: number; // number of people

	// Air exchange rate (optional, will be set based on room type if not provided)
	airExchangeRate?: number; // air changes per hour

	// Air per person (optional, will be set based on room type if not provided)
	airPerPerson?: number; // m³/h per person
}

export interface VentilationResult {
	// Input dimensions
	roomLength: number;
	roomWidth: number;
	roomHeight: number;
	roomType: string;
	peopleCount: number;

	// Calculations
	roomVolume: number; // m³
	airExchangeRate: number; // air changes per hour
	airPerPerson: number; // m³/h per person

	// Required ventilation capacity
	capacityByVolume: number; // m³/h (volume × exchange rate)
	capacityByPeople: number; // m³/h (people × air per person)
	requiredCapacity: number; // m³/h (maximum of both)

	// Recommendations
	recommendedSupply: number; // m³/h (for supply ventilation)
	recommendedExhaust: number; // m³/h (for exhaust ventilation)
	recommendedCombined: number; // m³/h (for combined systems)
}

// Room type configurations
export const ROOM_TYPES: Record<
	string,
	{
		label: string;
		airExchangeRate: number; // air changes per hour
		airPerPerson: number; // m³/h per person
		description: string;
	}
> = {
	living: {
		label: 'Жилая комната',
		airExchangeRate: 1,
		airPerPerson: 30,
		description: 'Спальня, гостиная, кабинет',
	},
	kitchen: {
		label: 'Кухня',
		airExchangeRate: 3,
		airPerPerson: 60,
		description: 'Кухня с естественной или механической вытяжкой',
	},
	bathroom: {
		label: 'Ванная/туалет',
		airExchangeRate: 3,
		airPerPerson: 25,
		description: 'Санузел, ванная комната, туалет',
	},
	office: {
		label: 'Офис',
		airExchangeRate: 2,
		airPerPerson: 40,
		description: 'Офисное помещение, рабочий кабинет',
	},
	restaurant: {
		label: 'Ресторан/кафе',
		airExchangeRate: 5,
		airPerPerson: 60,
		description: 'Ресторан, кафе, столовая',
	},
	gym: {
		label: 'Спортзал',
		airExchangeRate: 4,
		airPerPerson: 80,
		description: 'Спортзал, фитнес-центр',
	},
	classroom: {
		label: 'Учебный класс',
		airExchangeRate: 2,
		airPerPerson: 40,
		description: 'Класс, аудитория, лекционный зал',
	},
	warehouse: {
		label: 'Склад',
		airExchangeRate: 1,
		airPerPerson: 30,
		description: 'Складское помещение',
	},
	production: {
		label: 'Производство',
		airExchangeRate: 3,
		airPerPerson: 60,
		description: 'Производственное помещение',
	},
};

/**
 * Calculate room volume
 */
function calculateRoomVolume(
	length: number,
	width: number,
	height: number
): number {
	return length * width * height;
}

/**
 * Get room type configuration
 */
function getRoomTypeConfig(roomType: string) {
	return (
		ROOM_TYPES[roomType] || {
			label: roomType,
			airExchangeRate: 2,
			airPerPerson: 40,
			description: 'Стандартное помещение',
		}
	);
}

/**
 * Main calculation function
 */
export function calculateVentilation(
	input: VentilationInput
): VentilationResult {
	const {
		roomLength,
		roomWidth,
		roomHeight,
		roomType,
		peopleCount = 1,
		airExchangeRate: customRate,
		airPerPerson: customAirPerPerson,
	} = input;

	// Calculate room volume
	const roomVolume = calculateRoomVolume(roomLength, roomWidth, roomHeight);

	// Get room type configuration
	const config = getRoomTypeConfig(roomType);

	// Use custom values or defaults from room type
	const airExchangeRate = customRate || config.airExchangeRate;
	const airPerPerson = customAirPerPerson || config.airPerPerson;

	// Calculate capacity by volume
	const capacityByVolume = roomVolume * airExchangeRate;

	// Calculate capacity by people
	const capacityByPeople = peopleCount * airPerPerson;

	// Required capacity is the maximum of both
	const requiredCapacity = Math.max(capacityByVolume, capacityByPeople);

	// Recommendations
	// For supply ventilation: 100% of required capacity
	const recommendedSupply = requiredCapacity;

	// For exhaust ventilation: typically 80-100% of supply
	const recommendedExhaust = requiredCapacity * 0.9;

	// For combined systems: split between supply and exhaust
	const recommendedCombined = requiredCapacity;

	return {
		roomLength: Math.round(roomLength * 100) / 100,
		roomWidth: Math.round(roomWidth * 100) / 100,
		roomHeight: Math.round(roomHeight * 100) / 100,
		roomType,
		peopleCount,
		roomVolume: Math.round(roomVolume * 100) / 100,
		airExchangeRate,
		airPerPerson,
		capacityByVolume: Math.round(capacityByVolume * 100) / 100,
		capacityByPeople: Math.round(capacityByPeople * 100) / 100,
		requiredCapacity: Math.round(requiredCapacity * 100) / 100,
		recommendedSupply: Math.round(recommendedSupply * 100) / 100,
		recommendedExhaust: Math.round(recommendedExhaust * 100) / 100,
		recommendedCombined: Math.round(recommendedCombined * 100) / 100,
	};
}

/**
 * Validate input data
 */
export function validateVentilationInput(
	input: Partial<VentilationInput>
): string[] {
	const errors: string[] = [];

	if (!input.roomLength || input.roomLength <= 0) {
		errors.push('Длина помещения должна быть больше 0');
	}

	if (!input.roomWidth || input.roomWidth <= 0) {
		errors.push('Ширина помещения должна быть больше 0');
	}

	if (!input.roomHeight || input.roomHeight <= 0) {
		errors.push('Высота помещения должна быть больше 0');
	}

	if (!input.roomType) {
		errors.push('Выберите тип помещения');
	}

	if (input.peopleCount !== undefined) {
		if (input.peopleCount < 0) {
			errors.push('Количество людей не может быть отрицательным');
		}
		if (input.peopleCount > 500) {
			errors.push('Количество людей слишком большое (максимум 500)');
		}
	}

	if (input.airExchangeRate !== undefined) {
		if (input.airExchangeRate <= 0 || input.airExchangeRate > 20) {
			errors.push('Кратность воздухообмена должна быть от 0.1 до 20');
		}
	}

	if (input.airPerPerson !== undefined) {
		if (input.airPerPerson <= 0 || input.airPerPerson > 200) {
			errors.push(
				'Количество воздуха на человека должно быть от 1 до 200 м³/ч'
			);
		}
	}

	return errors;
}

/**
 * Get room type options
 */
export function getRoomTypeOptions(): Array<{
	value: string;
	label: string;
	description: string;
}> {
	return Object.entries(ROOM_TYPES).map(([value, config]) => ({
		value,
		label: config.label,
		description: config.description,
	}));
}
