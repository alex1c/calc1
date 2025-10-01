// Car ownership cost calculation logic and interfaces

export interface CarOwnershipInput {
	carPrice: number; // Car price in RUB
	ownershipYears: number; // Ownership period in years
	annualMileage: number; // Annual mileage in km
	fuelConsumption: number; // Fuel consumption in l/100km
	fuelPrice: number; // Fuel price in RUB per liter
	osagoCost: number; // OSAGO cost per year in RUB
	kaskoCost?: number; // KASKO cost per year in RUB (optional)
	vehicleTax: number; // Vehicle tax per year in RUB
	maintenanceCost: number; // Maintenance and repair cost per year in RUB
	depreciationRate: number; // Depreciation rate per year in %
}

export interface CarOwnershipResult {
	// Annual costs
	annualFuelCost: number;
	annualInsuranceCost: number;
	annualTaxCost: number;
	annualMaintenanceCost: number;
	annualDepreciationCost: number;
	totalAnnualCost: number;

	// Total costs over ownership period
	totalFuelCost: number;
	totalInsuranceCost: number;
	totalTaxCost: number;
	totalMaintenanceCost: number;
	totalDepreciationCost: number;
	totalOwnershipCost: number;

	// Cost per kilometer
	costPerKm: number;
	totalMileage: number;

	// Breakdown
	breakdown: {
		fuel: { annual: number; total: number; percentage: number };
		insurance: { annual: number; total: number; percentage: number };
		tax: { annual: number; total: number; percentage: number };
		maintenance: { annual: number; total: number; percentage: number };
		depreciation: { annual: number; total: number; percentage: number };
	};
}

export function calculateCarOwnership(
	input: CarOwnershipInput
): CarOwnershipResult {
	const {
		carPrice,
		ownershipYears,
		annualMileage,
		fuelConsumption,
		fuelPrice,
		osagoCost,
		kaskoCost = 0,
		vehicleTax,
		maintenanceCost,
		depreciationRate,
	} = input;

	// Annual costs
	const annualFuelCost =
		((annualMileage * fuelConsumption) / 100) * fuelPrice;
	const annualInsuranceCost = osagoCost + kaskoCost;
	const annualTaxCost = vehicleTax;
	const annualMaintenanceCost = maintenanceCost;
	const annualDepreciationCost = carPrice * (depreciationRate / 100);

	const totalAnnualCost =
		annualFuelCost +
		annualInsuranceCost +
		annualTaxCost +
		annualMaintenanceCost +
		annualDepreciationCost;

	// Total costs over ownership period
	const totalFuelCost = annualFuelCost * ownershipYears;
	const totalInsuranceCost = annualInsuranceCost * ownershipYears;
	const totalTaxCost = annualTaxCost * ownershipYears;
	const totalMaintenanceCost = annualMaintenanceCost * ownershipYears;
	const totalDepreciationCost = annualDepreciationCost * ownershipYears;

	const totalOwnershipCost =
		totalFuelCost +
		totalInsuranceCost +
		totalTaxCost +
		totalMaintenanceCost +
		totalDepreciationCost;

	// Cost per kilometer
	const totalMileage = annualMileage * ownershipYears;
	const costPerKm = totalMileage > 0 ? totalOwnershipCost / totalMileage : 0;

	// Calculate percentages for breakdown
	const calculatePercentage = (value: number, total: number) =>
		total > 0 ? (value / total) * 100 : 0;

	return {
		// Annual costs
		annualFuelCost: Math.round(annualFuelCost),
		annualInsuranceCost: Math.round(annualInsuranceCost),
		annualTaxCost: Math.round(annualTaxCost),
		annualMaintenanceCost: Math.round(annualMaintenanceCost),
		annualDepreciationCost: Math.round(annualDepreciationCost),
		totalAnnualCost: Math.round(totalAnnualCost),

		// Total costs
		totalFuelCost: Math.round(totalFuelCost),
		totalInsuranceCost: Math.round(totalInsuranceCost),
		totalTaxCost: Math.round(totalTaxCost),
		totalMaintenanceCost: Math.round(totalMaintenanceCost),
		totalDepreciationCost: Math.round(totalDepreciationCost),
		totalOwnershipCost: Math.round(totalOwnershipCost),

		// Cost per kilometer
		costPerKm: Math.round(costPerKm * 100) / 100, // Round to 2 decimal places
		totalMileage: Math.round(totalMileage),

		// Breakdown with percentages
		breakdown: {
			fuel: {
				annual: Math.round(annualFuelCost),
				total: Math.round(totalFuelCost),
				percentage: calculatePercentage(
					totalFuelCost,
					totalOwnershipCost
				),
			},
			insurance: {
				annual: Math.round(annualInsuranceCost),
				total: Math.round(totalInsuranceCost),
				percentage: calculatePercentage(
					totalInsuranceCost,
					totalOwnershipCost
				),
			},
			tax: {
				annual: Math.round(annualTaxCost),
				total: Math.round(totalTaxCost),
				percentage: calculatePercentage(
					totalTaxCost,
					totalOwnershipCost
				),
			},
			maintenance: {
				annual: Math.round(annualMaintenanceCost),
				total: Math.round(totalMaintenanceCost),
				percentage: calculatePercentage(
					totalMaintenanceCost,
					totalOwnershipCost
				),
			},
			depreciation: {
				annual: Math.round(annualDepreciationCost),
				total: Math.round(totalDepreciationCost),
				percentage: calculatePercentage(
					totalDepreciationCost,
					totalOwnershipCost
				),
			},
		},
	};
}

export function validateCarOwnershipInput(
	input: Partial<CarOwnershipInput>
): string[] {
	const errors: string[] = [];

	if (!input.carPrice || input.carPrice <= 0) {
		errors.push('Стоимость автомобиля должна быть больше 0');
	}

	if (!input.ownershipYears || input.ownershipYears <= 0) {
		errors.push('Срок владения должен быть больше 0');
	}

	if (input.ownershipYears && input.ownershipYears > 50) {
		errors.push('Срок владения не может быть больше 50 лет');
	}

	if (!input.annualMileage || input.annualMileage <= 0) {
		errors.push('Пробег в год должен быть больше 0');
	}

	if (input.annualMileage && input.annualMileage > 1000000) {
		errors.push('Пробег в год не может быть больше 1,000,000 км');
	}

	if (!input.fuelConsumption || input.fuelConsumption <= 0) {
		errors.push('Расход топлива должен быть больше 0');
	}

	if (input.fuelConsumption && input.fuelConsumption > 50) {
		errors.push('Расход топлива не может быть больше 50 л/100км');
	}

	if (!input.fuelPrice || input.fuelPrice <= 0) {
		errors.push('Цена топлива должна быть больше 0');
	}

	if (input.fuelPrice && input.fuelPrice > 1000) {
		errors.push('Цена топлива не может быть больше 1000 ₽/л');
	}

	if (!input.osagoCost || input.osagoCost < 0) {
		errors.push('Стоимость ОСАГО должна быть неотрицательной');
	}

	if (input.kaskoCost !== undefined && input.kaskoCost < 0) {
		errors.push('Стоимость КАСКО должна быть неотрицательной');
	}

	if (!input.vehicleTax || input.vehicleTax < 0) {
		errors.push('Транспортный налог должен быть неотрицательным');
	}

	if (!input.maintenanceCost || input.maintenanceCost < 0) {
		errors.push('Стоимость ТО и ремонта должна быть неотрицательной');
	}

	if (!input.depreciationRate || input.depreciationRate < 0) {
		errors.push('Амортизация должна быть неотрицательной');
	}

	if (input.depreciationRate && input.depreciationRate > 100) {
		errors.push('Амортизация не может быть больше 100% в год');
	}

	return errors;
}

export function formatCarOwnershipCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatCarOwnershipNumber(value: number): string {
	return new Intl.NumberFormat('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
}

export function getDepreciationRates(): Array<{
	value: number;
	label: string;
	description: string;
}> {
	return [
		{
			value: 5,
			label: '5% в год',
			description: 'Новые автомобили (0-2 года)',
		},
		{
			value: 10,
			label: '10% в год',
			description: 'Средний возраст (3-5 лет)',
		},
		{
			value: 15,
			label: '15% в год',
			description: 'Старые автомобили (6+ лет)',
		},
		{ value: 20, label: '20% в год', description: 'Высокая амортизация' },
		{
			value: 25,
			label: '25% в год',
			description: 'Очень высокая амортизация',
		},
	];
}

export function getFuelConsumptionRates(): Array<{
	value: number;
	label: string;
	description: string;
}> {
	return [
		{ value: 5, label: '5 л/100км', description: 'Экономичные автомобили' },
		{ value: 7, label: '7 л/100км', description: 'Компактные автомобили' },
		{ value: 10, label: '10 л/100км', description: 'Средний класс' },
		{
			value: 12,
			label: '12 л/100км',
			description: 'Полноразмерные седаны',
		},
		{
			value: 15,
			label: '15 л/100км',
			description: 'Кроссоверы и внедорожники',
		},
		{
			value: 20,
			label: '20 л/100км',
			description: 'Спортивные автомобили',
		},
	];
}
