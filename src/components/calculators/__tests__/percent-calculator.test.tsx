/**
 * Component tests for Percent Calculator
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PercentCalculator from '@/components/calculators/percent-calculator'

describe('PercentCalculator Component', () => {
	it('renders calculator form', () => {
		render(<PercentCalculator />)
		const numberInput = screen.getByLabelText(/number/i)
		expect(numberInput).toBeInTheDocument()
	})

	it('calculates percentage of number', async () => {
		const user = userEvent.setup()
		render(<PercentCalculator />)

		const numberInput = screen.getByLabelText(/number/i)
		const percentageInput = screen.getByLabelText(/percentage/i)

		await user.clear(numberInput)
		await user.type(numberInput, '100')
		await user.clear(percentageInput)
		await user.type(percentageInput, '25')

		await waitFor(
			() => {
			const results = screen.getAllByText(/25\.00/)
			expect(results.length).toBeGreaterThan(0)
			},
			{ timeout: 3000 }
		)
	})
})


