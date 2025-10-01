// Car depreciation calculation logic and interfaces

export type DepreciationMethod = 'linear' | 'declining';

export interface CarDepreciationInput {
	initialValue: number; // Initial car value in RUB
	ownershipYears: number; // Ownership period in years
	depreciationMethod: DepreciationMethod; // Method of depreciation calculation
	depreciationRate: number; // Depreciation rate per year in %
	annualMileage?: number; // Annual mileage in km (optional for wear calculation)
}

export interface DepreciationYear {
	year: number;
	beginningValue: number;
	depreciationAmount: number;
	endingValue: number;
	depreciationPercentage: number;
}

export interface CarDepreciationResult {
	method: DepreciationMethod;
	initialValue: number;
	ownershipYears: number;
	depreciationRate: number;
	totalDepreciation: number;
	finalValue: number;
	depreciationPercentage: number;
	yearlyBreakdown: DepreciationYear[];
	averageAnnualDepreciation: number;
}

export function calculateCarDepreciation(
	input: CarDepreciationInput
): CarDepreciationResult {
	const {
		initialValue,
		ownershipYears,
		depreciationMethod,
		depreciationRate,
	} = input;

	const yearlyBreakdown: DepreciationYear[] = [];
	let currentValue = initialValue;
	let totalDepreciation = 0;

	if (depreciationMethod === 'linear') {
		// Linear depreciation: same amount each year
		const annualDepreciation = initialValue * (depreciationRate / 100);

		for (let year = 1; year <= ownershipYears; year++) {
			const beginningValue = currentValue;
			const depreciationAmount = Math.min(
				annualDepreciation,
				currentValue
			);
			const endingValue = Math.max(0, currentValue - depreciationAmount);
			const depreciationPercentage =
				beginningValue > 0
					? (depreciationAmount / beginningValue) * 100
					: 0;

			yearlyBreakdown.push({
				year,
				beginningValue: Math.round(beginningValue),
				depreciationAmount: Math.round(depreciationAmount),
				endingValue: Math.round(endingValue),
				depreciationPercentage:
					Math.round(depreciationPercentage * 100) / 100,
			});

			currentValue = endingValue;
			totalDepreciation += depreciationAmount;
		}
	} else {
		// Declining balance depreciation: percentage of remaining value each year
		for (let year = 1; year <= ownershipYears; year++) {
			const beginningValue = currentValue;
			const depreciationAmount = currentValue * (depreciationRate / 100);
			const endingValue = Math.max(0, currentValue - depreciationAmount);
			const depreciationPercentage =
				beginningValue > 0
					? (depreciationAmount / beginningValue) * 100
					: 0;

			yearlyBreakdown.push({
				year,
				beginningValue: Math.round(beginningValue),
				depreciationAmount: Math.round(depreciationAmount),
				endingValue: Math.round(endingValue),
				depreciationPercentage:
					Math.round(depreciationPercentage * 100) / 100,
			});

			currentValue = endingValue;
			totalDepreciation += depreciationAmount;
		}
	}

	const finalValue = currentValue;
	const totalDepreciationPercentage =
		initialValue > 0 ? (totalDepreciation / initialValue) * 100 : 0;
	const averageAnnualDepreciation =
		ownershipYears > 0 ? totalDepreciation / ownershipYears : 0;

	return {
		method: depreciationMethod,
		initialValue: Math.round(initialValue),
		ownershipYears,
		depreciationRate,
		totalDepreciation: Math.round(totalDepreciation),
		finalValue: Math.round(finalValue),
		depreciationPercentage:
			Math.round(totalDepreciationPercentage * 100) / 100,
		yearlyBreakdown,
		averageAnnualDepreciation: Math.round(averageAnnualDepreciation),
	};
}

export function validateCarDepreciationInput(
	input: Partial<CarDepreciationInput>
): string[] {
	const errors: string[] = [];

	if (!input.initialValue || input.initialValue <= 0) {
		errors.push('Первоначальная стоимость автомобиля должна быть больше 0');
	}

	if (!input.ownershipYears || input.ownershipYears <= 0) {
		errors.push('Срок владения должен быть больше 0');
	}

	if (input.ownershipYears && input.ownershipYears > 50) {
		errors.push('Срок владения не может быть больше 50 лет');
	}

	if (!input.depreciationRate || input.depreciationRate <= 0) {
		errors.push('Процент амортизации должен быть больше 0');
	}

	if (input.depreciationRate && input.depreciationRate > 100) {
		errors.push('Процент амортизации не может быть больше 100%');
	}

	if (input.annualMileage !== undefined && input.annualMileage < 0) {
		errors.push('Пробег в год должен быть неотрицательным');
	}

	if (input.annualMileage && input.annualMileage > 1000000) {
		errors.push('Пробег в год не может быть больше 1,000,000 км');
	}

	return errors;
}

export function formatDepreciationCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatDepreciationNumber(value: number): string {
	return new Intl.NumberFormat('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
}

export function getDepreciationMethods(): Array<{
	value: DepreciationMethod;
	label: string;
	description: string;
}> {
	return [
		{
			value: 'linear',
			label: 'Линейный',
			description: 'Равномерное снижение стоимости каждый год',
		},
		{
			value: 'declining',
			label: 'Убывающий',
			description: 'Процент от остаточной стоимости каждый год',
		},
	];
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
		{
			value: 30,
			label: '30% в год',
			description: 'Экстремальная амортизация',
		},
	];
}

export function calculateDepreciationComparison(
	initialValue: number,
	ownershipYears: number,
	rates: number[]
): Array<{
	rate: number;
	method: DepreciationMethod;
	finalValue: number;
	totalDepreciation: number;
	depreciationPercentage: number;
}> {
	const results: Array<{
		rate: number;
		method: DepreciationMethod;
		finalValue: number;
		totalDepreciation: number;
		depreciationPercentage: number;
	}> = [];

	for (const rate of rates) {
		for (const method of ['linear', 'declining'] as DepreciationMethod[]) {
			const result = calculateCarDepreciation({
				initialValue,
				ownershipYears,
				depreciationMethod: method,
				depreciationRate: rate,
			});

			results.push({
				rate,
				method,
				finalValue: result.finalValue,
				totalDepreciation: result.totalDepreciation,
				depreciationPercentage: result.depreciationPercentage,
			});
		}
	}

	return results;
}

export function getDepreciationInsights(result: CarDepreciationResult): {
	severity: 'low' | 'medium' | 'high';
	message: string;
	recommendations: string[];
} {
	const { depreciationPercentage, method, depreciationRate } = result;

	let severity: 'low' | 'medium' | 'high';
	let message: string;
	const recommendations: string[] = [];

	if (depreciationPercentage < 30) {
		severity = 'low';
		message = 'Низкая амортизация - автомобиль сохраняет хорошую стоимость';
		recommendations.push('Автомобиль имеет хорошую остаточную стоимость');
		recommendations.push(
			'Рассмотрите возможность продажи через несколько лет'
		);
	} else if (depreciationPercentage < 60) {
		severity = 'medium';
		message = 'Умеренная амортизация - стандартная потеря стоимости';
		recommendations.push('Планируйте замену автомобиля через 5-7 лет');
		recommendations.push(
			'Регулярное обслуживание поможет сохранить стоимость'
		);
	} else {
		severity = 'high';
		message = 'Высокая амортизация - значительная потеря стоимости';
		recommendations.push('Рассмотрите более экономичные варианты');
		recommendations.push(
			'Планируйте долгосрочное владение для окупаемости'
		);
	}

	if (method === 'declining' && depreciationRate > 20) {
		recommendations.push(
			'Убывающий метод с высокой ставкой может быть неоптимальным'
		);
	}

	return { severity, message, recommendations };
}
