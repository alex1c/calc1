import { NextRequest, NextResponse } from 'next/server';
import {
	calculateCalorieNeeds,
	calculateFoodCalories,
	searchFoods,
	validateBMRInput,
	validateFoodInput,
	getLocalizedFoodName,
	type Gender,
	type ActivityLevel,
} from '@/lib/calculators/calories';

/**
 * API endpoint for calories calculations
 * Supports both BMR and food calorie calculations
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { type, ...params } = body;

		if (type === 'bmr') {
			// BMR calculation
			const { gender, age, weight, height, activityLevel } = params;

			// Validate input
			const validation = validateBMRInput(
				gender as Gender,
				parseFloat(age),
				parseFloat(weight),
				parseFloat(height),
				activityLevel as ActivityLevel
			);

			if (!validation.isValid) {
				return NextResponse.json(
					{ error: validation.error },
					{ status: 400 }
				);
			}

			// Calculate BMR
			const result = calculateCalorieNeeds(
				gender as Gender,
				parseFloat(age),
				parseFloat(weight),
				parseFloat(height),
				activityLevel as ActivityLevel
			);

			return NextResponse.json({
				success: true,
				type: 'bmr',
				result,
			});
		} else if (type === 'food') {
			// Food calorie calculation
			const { foodKey, weight } = params;

			// Validate input
			const validation = validateFoodInput(foodKey, parseFloat(weight));

			if (!validation.isValid) {
				return NextResponse.json(
					{ error: validation.error },
					{ status: 400 }
				);
			}

			// Calculate food calories
			const result = calculateFoodCalories(foodKey, parseFloat(weight));

			if (!result) {
				return NextResponse.json(
					{ error: 'Food not found' },
					{ status: 404 }
				);
			}

			return NextResponse.json({
				success: true,
				type: 'food',
				result,
			});
		} else if (type === 'search') {
			// Food search
			const { query, locale = 'ru' } = params;

			if (!query || typeof query !== 'string') {
				return NextResponse.json(
					{ error: 'Query is required' },
					{ status: 400 }
				);
			}

			const results = searchFoods(query, locale);

			return NextResponse.json({
				success: true,
				type: 'search',
				results,
			});
		} else {
			return NextResponse.json(
				{ error: 'Invalid calculation type' },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error('Calories API error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

/**
 * GET endpoint for API information
 */
export async function GET() {
	return NextResponse.json({
		name: 'Calories Calculator API',
		version: '1.0.0',
		description:
			'API for calculating daily calorie needs and food calories',
		endpoints: {
			POST: {
				description: 'Calculate calories',
				body: {
					type: 'bmr | food | search',
					// BMR parameters
					gender: 'male | female',
					age: 'number',
					weight: 'number (kg)',
					height: 'number (cm)',
					activityLevel:
						'minimal | light | moderate | high | extreme',
					// Food parameters
					foodKey: 'string',
					weight: 'number (g)',
					// Search parameters
					query: 'string',
				},
			},
		},
		examples: {
			bmr: {
				type: 'bmr',
				gender: 'male',
				age: 30,
				weight: 75,
				height: 180,
				activityLevel: 'moderate',
			},
			food: {
				type: 'food',
				foodKey: 'apple',
				weight: 150,
			},
			search: {
				type: 'search',
				query: 'apple',
			},
		},
	});
}
