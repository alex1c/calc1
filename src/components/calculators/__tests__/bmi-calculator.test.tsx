/**
 * Component tests for BMI Calculator
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BMICalculator from '@/components/calculators/bmi-calculator'

describe('BMICalculator Component', () => {
	it('renders calculator form', () => {
		render(<BMICalculator />)
		// Check for input fields by their labels or placeholders
		const inputs = screen.getAllByRole('textbox')
		expect(inputs.length).toBeGreaterThan(0)
	})

	it('calculates BMI when valid inputs are provided', async () => {
		const user = userEvent.setup()
		render(<BMICalculator />)

		// Find inputs by their type or role
		const inputs = screen.getAllByRole('textbox')
		const heightInput = inputs.find(
			(input) =>
				input.getAttribute('name') === 'height' ||
				input.getAttribute('placeholder')?.toLowerCase().includes('height') ||
				input.getAttribute('placeholder')?.toLowerCase().includes('рост')
		) || inputs[0]
		const weightInput = inputs.find(
			(input) =>
				input.getAttribute('name') === 'weight' ||
				input.getAttribute('placeholder')?.toLowerCase().includes('weight') ||
				input.getAttribute('placeholder')?.toLowerCase().includes('вес')
		) || inputs[1]

		if (heightInput && weightInput) {
			await user.type(heightInput, '175')
			await user.type(weightInput, '70')

			await waitFor(
				() => {
					// Look for BMI result (should be around 22.8-22.9)
					const resultText = screen.getByText(/22\.[89]/i)
					expect(resultText).toBeInTheDocument()
				},
				{ timeout: 3000 }
			)
		}
	})

	it('shows error for invalid height', async () => {
		const user = userEvent.setup()
		render(<BMICalculator />)

		const inputs = screen.getAllByRole('textbox')
		const heightInput = inputs[0]
		const weightInput = inputs[1]

		if (heightInput && weightInput) {
			await user.type(heightInput, '0')
			await user.type(weightInput, '70')

			await waitFor(
				() => {
					// Component should show error or not show result
					const errorElements = screen.queryAllByText(/error|invalid/i)
					expect(errorElements.length).toBeGreaterThan(0)
				},
				{ timeout: 2000 }
			)
		}
	})
})


