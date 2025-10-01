// Traffic fines calculation logic and interfaces

export interface TrafficFine {
	id: number;
	name: string;
	amount: number;
}

export interface TrafficFinesInput {
	selectedFines: number[]; // Array of fine IDs
}

export interface TrafficFinesResult {
	totalFine: number;
	discountedFine: number;
	discount: number;
	discountAmount: number;
	selectedFinesDetails: TrafficFine[];
}

// Traffic fines database
export const trafficFines: TrafficFine[] = [
	{ id: 1, name: 'Превышение скорости на 20–40 км/ч', amount: 500 },
	{ id: 2, name: 'Превышение скорости на 40–60 км/ч', amount: 1000 },
	{ id: 3, name: 'Превышение скорости на 60–80 км/ч', amount: 2000 },
	{ id: 4, name: 'Превышение скорости более чем на 80 км/ч', amount: 5000 },
	{ id: 5, name: 'Непристёгнутый ремень безопасности', amount: 1000 },
	{ id: 6, name: 'Разговор по телефону без гарнитуры', amount: 1500 },
	{ id: 7, name: 'Проезд на красный сигнал светофора', amount: 1000 },
	{ id: 8, name: 'Нарушение правил парковки', amount: 1500 },
	{ id: 9, name: 'Остановка на пешеходном переходе', amount: 1000 },
	{
		id: 10,
		name: 'Невключение ближнего света вне населённых пунктов',
		amount: 500,
	},
	{ id: 11, name: 'Выезд на встречную полосу', amount: 5000 },
	{ id: 12, name: 'Остановка/стоянка на месте для инвалидов', amount: 5000 },
];

// Discount settings
export const DISCOUNT_RATE = 0.25; // 25% discount
export const DISCOUNT_DAYS = 20; // Within 20 days

export function calculateTrafficFines(
	input: TrafficFinesInput
): TrafficFinesResult {
	const { selectedFines } = input;

	// Get details of selected fines
	const selectedFinesDetails = trafficFines.filter((fine) =>
		selectedFines.includes(fine.id)
	);

	// Calculate total fine amount
	const totalFine = selectedFinesDetails.reduce(
		(sum, fine) => sum + fine.amount,
		0
	);

	// Calculate discount
	const discountAmount = totalFine * DISCOUNT_RATE;
	const discountedFine = totalFine - discountAmount;

	return {
		totalFine: Math.round(totalFine),
		discountedFine: Math.round(discountedFine),
		discount: DISCOUNT_RATE,
		discountAmount: Math.round(discountAmount),
		selectedFinesDetails,
	};
}

export function validateTrafficFinesInput(
	input: Partial<TrafficFinesInput>
): string[] {
	const errors: string[] = [];

	if (!input.selectedFines || input.selectedFines.length === 0) {
		errors.push('Выберите хотя бы одно нарушение');
	}

	if (input.selectedFines && input.selectedFines.length > 10) {
		errors.push('Можно выбрать не более 10 нарушений одновременно');
	}

	// Validate that all selected fine IDs exist
	if (input.selectedFines) {
		const validIds = trafficFines.map((fine) => fine.id);
		const invalidIds = input.selectedFines.filter(
			(id) => !validIds.includes(id)
		);

		if (invalidIds.length > 0) {
			errors.push('Выбраны недопустимые нарушения');
		}
	}

	return errors;
}

export function formatTrafficFinesCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function getTrafficFinesOptions(): Array<{
	value: number;
	label: string;
	amount: number;
}> {
	return trafficFines.map((fine) => ({
		value: fine.id,
		label: fine.name,
		amount: fine.amount,
	}));
}

export function getFineById(id: number): TrafficFine | undefined {
	return trafficFines.find((fine) => fine.id === id);
}

export function getTotalFinesCount(): number {
	return trafficFines.length;
}

export function getFinesByCategory(): Record<string, TrafficFine[]> {
	return {
		speed: trafficFines.filter((fine) => fine.name.includes('скорости')),
		safety: trafficFines.filter(
			(fine) =>
				fine.name.includes('ремень') ||
				fine.name.includes('телефон') ||
				fine.name.includes('свет')
		),
		traffic: trafficFines.filter(
			(fine) =>
				fine.name.includes('светофор') ||
				fine.name.includes('встречную')
		),
		parking: trafficFines.filter(
			(fine) =>
				fine.name.includes('парковк') ||
				fine.name.includes('остановк') ||
				fine.name.includes('инвалид')
		),
	};
}
