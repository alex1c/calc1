// Leasing calculation logic and interfaces

export interface LeasingInput {
	carValue: number;
	downPayment: number;
	downPaymentType: 'percent' | 'amount';
	leaseTerm: number;
	interestRate: number;
	buyoutValue: number;
	buyoutType: 'percent' | 'amount';
}

export interface LeasingResult {
	monthlyPayment: number;
	totalPayments: number;
	totalCost: number;
	overpayment: number;
	financingAmount: number;
	downPaymentAmount: number;
	buyoutAmount: number;
}

export function calculateLeasing(input: LeasingInput): LeasingResult {
	const {
		carValue,
		downPayment,
		downPaymentType,
		leaseTerm,
		interestRate,
		buyoutValue,
		buyoutType,
	} = input;

	// Calculate down payment amount
	const downPaymentAmount =
		downPaymentType === 'percent'
			? (carValue * downPayment) / 100
			: downPayment;

	// Calculate buyout amount
	const buyoutAmount =
		buyoutType === 'percent' ? (carValue * buyoutValue) / 100 : buyoutValue;

	// Calculate financing amount
	const financingAmount = carValue - downPaymentAmount - buyoutAmount;

	// Calculate monthly interest rate
	const monthlyRate = interestRate / 12 / 100;

	// Calculate monthly payment using annuity formula
	let monthlyPayment = 0;
	if (monthlyRate > 0) {
		monthlyPayment =
			(financingAmount *
				(monthlyRate * Math.pow(1 + monthlyRate, leaseTerm))) /
			(Math.pow(1 + monthlyRate, leaseTerm) - 1);
	} else {
		// If no interest rate, divide financing amount by lease term
		monthlyPayment = financingAmount / leaseTerm;
	}

	// Calculate total payments
	const totalPayments = monthlyPayment * leaseTerm;

	// Calculate total cost
	const totalCost = downPaymentAmount + totalPayments + buyoutAmount;

	// Calculate overpayment
	const overpayment = totalCost - carValue;

	return {
		monthlyPayment: Math.round(monthlyPayment),
		totalPayments: Math.round(totalPayments),
		totalCost: Math.round(totalCost),
		overpayment: Math.round(overpayment),
		financingAmount: Math.round(financingAmount),
		downPaymentAmount: Math.round(downPaymentAmount),
		buyoutAmount: Math.round(buyoutAmount),
	};
}

export function validateLeasingInput(input: Partial<LeasingInput>): string[] {
	const errors: string[] = [];

	if (!input.carValue || input.carValue <= 0) {
		errors.push('Стоимость автомобиля должна быть больше 0');
	}

	if (!input.downPayment || input.downPayment < 0) {
		errors.push('Первоначальный взнос должен быть больше или равен 0');
	}

	if (input.downPaymentType === 'percent' && input.downPayment > 100) {
		errors.push(
			'Первоначальный взнос в процентах не может быть больше 100%'
		);
	}

	if (!input.leaseTerm || input.leaseTerm <= 0) {
		errors.push('Срок лизинга должен быть больше 0');
	}

	if (input.leaseTerm > 60) {
		errors.push('Срок лизинга не может быть больше 60 месяцев');
	}

	if (input.interestRate < 0) {
		errors.push('Ставка удорожания не может быть отрицательной');
	}

	if (input.interestRate > 50) {
		errors.push('Ставка удорожания не может быть больше 50%');
	}

	if (input.buyoutValue < 0) {
		errors.push('Выкупная стоимость не может быть отрицательной');
	}

	if (input.buyoutType === 'percent' && input.buyoutValue > 100) {
		errors.push('Выкупная стоимость в процентах не может быть больше 100%');
	}

	// Check if down payment + buyout doesn't exceed car value
	if (input.carValue && input.downPayment && input.buyoutValue) {
		const downPaymentAmount =
			input.downPaymentType === 'percent'
				? (input.carValue * input.downPayment) / 100
				: input.downPayment;
		const buyoutAmount =
			input.buyoutType === 'percent'
				? (input.carValue * input.buyoutValue) / 100
				: input.buyoutValue;

		if (downPaymentAmount + buyoutAmount >= input.carValue) {
			errors.push(
				'Сумма первоначального взноса и выкупной стоимости не может превышать стоимость автомобиля'
			);
		}
	}

	return errors;
}

export function formatLeasingCurrency(amount: number): string {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}
