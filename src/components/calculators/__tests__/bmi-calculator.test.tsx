/**
 * Component tests for BMI Calculator
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BMICalculator from '@/components/calculators/bmi-calculator'

describe('BMICalculator Component', () => {
	it('renders calculator form', () => {
		render(<BMICalculator />)
		const heightInput = screen.getByPlaceholderText('175')
		const weightInput = screen.getByPlaceholderText('70')
		expect(heightInput).toBeInTheDocument()
		expect(weightInput).toBeInTheDocument()
	})

	it('calculates BMI when valid inputs are provided', async () => {
		const user = userEvent.setup()
		render(<BMICalculator />)

		const heightInput = screen.getByPlaceholderText('175')
		const weightInput = screen.getByPlaceholderText('70')

		await user.clear(heightInput)
		await user.type(heightInput, '175')
		await user.clear(weightInput)
		await user.type(weightInput, '70')

		await waitFor(
			() => {
				const resultText = screen.getByTestId('bmi-value')
				expect(resultText).toHaveTextContent(/22\.9/)
			},
			{ timeout: 3000 }
		)
	})

	it('shows error for invalid height', async () => {
		const user = userEvent.setup()
		render(<BMICalculator />)

		const heightInput = screen.getByPlaceholderText('175')
		const weightInput = screen.getByPlaceholderText('70')

		await user.clear(heightInput)
		await user.type(heightInput, '0')
		await user.clear(weightInput)
		await user.type(weightInput, '70')

		await waitFor(
			() => {
				const errorMessage = screen.getByText('Height must be greater than 0')
				expect(errorMessage).toBeInTheDocument()
			},
			{ timeout: 2000 }
		)
	})
})


