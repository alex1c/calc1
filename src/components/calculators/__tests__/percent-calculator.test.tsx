/**
 * Component tests for Percent Calculator
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PercentCalculator from '@/components/calculators/percent-calculator'

describe('PercentCalculator Component', () => {
	it('renders calculator form', () => {
		render(<PercentCalculator />)
		const inputs = screen.getAllByRole('textbox')
		expect(inputs.length).toBeGreaterThan(0)
	})

	it('calculates percentage of number', async () => {
		const user = userEvent.setup()
		render(<PercentCalculator />)

		const inputs = screen.getAllByRole('textbox')
		if (inputs.length >= 2) {
			await user.type(inputs[0], '100')
			await user.type(inputs[1], '25')

			await waitFor(
				() => {
					// Look for result containing 25
					const result = screen.queryByText(/25/)
					expect(result).toBeInTheDocument()
				},
				{ timeout: 3000 }
			)
		}
	})
})


