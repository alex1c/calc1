import { NextRequest, NextResponse } from 'next/server';
import {
	calculateCreditLoan,
	type CreditLoanInput,
} from '@/lib/calculators/credit-loan';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const input: CreditLoanInput = body;

		// Validate input
		if (
			!input.principal ||
			!input.interestRate ||
			!input.termMonths ||
			!input.paymentType
		) {
			return NextResponse.json(
				{
					error: 'Missing required fields: principal, interestRate, termMonths, paymentType',
				},
				{ status: 400 }
			);
		}

		if (
			input.principal < 1 ||
			input.interestRate < 0 ||
			input.termMonths < 1
		) {
			return NextResponse.json(
				{
					error: 'Principal and termMonths must be positive, interestRate must be non-negative',
				},
				{ status: 400 }
			);
		}

		if (!['annuity', 'differentiated'].includes(input.paymentType)) {
			return NextResponse.json(
				{ error: 'Payment type must be "annuity" or "differentiated"' },
				{ status: 400 }
			);
		}

		const result = calculateCreditLoan(input);

		return NextResponse.json({
			success: true,
			result,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({
		message: 'Credit Loan Calculator API',
		usage: 'POST with { principal: number, interestRate: number, termMonths: number, paymentType: string }',
		paymentTypes: ['annuity', 'differentiated'],
	});
}





