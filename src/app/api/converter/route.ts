import { NextRequest, NextResponse } from 'next/server';
import {
	convertUnit,
	validateConversionInput,
	getConversionFactor,
	getConversionExample,
	type UnitType,
} from '@/lib/calculators/unitConversions';

/**
 * API endpoint for unit conversions
 * Supports conversion between different units of measurement
 */

/**
 * POST /api/converter
 * Convert units via API
 *
 * Request body:
 * - value: number (value to convert)
 * - fromUnit: string (source unit)
 * - toUnit: string (target unit)
 * - unitType: string (type of units: length, mass, time, volume)
 *
 * Example requests:
 * {
 *   "value": 100,
 *   "fromUnit": "cm",
 *   "toUnit": "m",
 *   "unitType": "length"
 * }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { value, fromUnit, toUnit, unitType } = body;

		// Validate required fields
		if (
			value === undefined ||
			fromUnit === undefined ||
			toUnit === undefined ||
			unitType === undefined
		) {
			return NextResponse.json(
				{
					error: 'Missing required fields: value, fromUnit, toUnit, unitType',
				},
				{ status: 400 }
			);
		}

		// Validate value
		if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
			return NextResponse.json(
				{
					error: 'Value must be a valid number',
				},
				{ status: 400 }
			);
		}

		// Validate unitType
		const validUnitTypes: UnitType[] = ['length', 'mass', 'time', 'volume'];
		if (!validUnitTypes.includes(unitType)) {
			return NextResponse.json(
				{
					error: `Invalid unitType. Must be one of: ${validUnitTypes.join(
						', '
					)}`,
				},
				{ status: 400 }
			);
		}

		// Validate conversion input
		const validation = validateConversionInput(
			value,
			fromUnit,
			toUnit,
			unitType
		);

		if (!validation.isValid) {
			return NextResponse.json(
				{
					error: validation.error || 'Invalid conversion parameters',
				},
				{ status: 400 }
			);
		}

		// Perform conversion
		const result = convertUnit(value, fromUnit, toUnit, unitType);
		const conversionFactor = getConversionFactor(
			fromUnit,
			toUnit,
			unitType
		);
		const example = getConversionExample(fromUnit, toUnit, unitType);

		return NextResponse.json({
			success: true,
			input: {
				value,
				fromUnit,
				toUnit,
				unitType,
			},
			result: {
				convertedValue: result.toValue,
				conversionFactor,
				example,
			},
		});
	} catch (error) {
		console.error('Converter API error:', error);
		return NextResponse.json(
			{
				error: 'Internal server error',
				message:
					error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

/**
 * GET /api/converter
 * Get API documentation and examples
 */
export async function GET() {
	return NextResponse.json({
		name: 'Unit Converter API',
		version: '1.0.0',
		description: 'Convert between different units of measurement via API',
		endpoints: {
			POST: {
				description: 'Convert units',
				parameters: {
					value: 'Number - value to convert (required)',
					fromUnit: 'String - source unit (required)',
					toUnit: 'String - target unit (required)',
					unitType:
						'String - unit type: length, mass, time, volume (required)',
				},
				examples: {
					length: {
						description: 'Convert length units',
						request: {
							value: 100,
							fromUnit: 'cm',
							toUnit: 'm',
							unitType: 'length',
						},
						response: {
							success: true,
							input: {
								value: 100,
								fromUnit: 'cm',
								toUnit: 'm',
								unitType: 'length',
							},
							result: {
								convertedValue: 1,
								conversionFactor: 0.01,
								example: '1 cm = 0.01 m',
							},
						},
					},
					mass: {
						description: 'Convert mass units',
						request: {
							value: 1000,
							fromUnit: 'g',
							toUnit: 'kg',
							unitType: 'mass',
						},
						response: {
							success: true,
							input: {
								value: 1000,
								fromUnit: 'g',
								toUnit: 'kg',
								unitType: 'mass',
							},
							result: {
								convertedValue: 1,
								conversionFactor: 0.001,
								example: '1 g = 0.001 kg',
							},
						},
					},
					time: {
						description: 'Convert time units',
						request: {
							value: 60,
							fromUnit: 'minute',
							toUnit: 'hour',
							unitType: 'time',
						},
						response: {
							success: true,
							input: {
								value: 60,
								fromUnit: 'minute',
								toUnit: 'hour',
								unitType: 'time',
							},
							result: {
								convertedValue: 1,
								conversionFactor: 0.016666666666666666,
								example: '1 minute = 0.016666666666666666 hour',
							},
						},
					},
					volume: {
						description: 'Convert volume units',
						request: {
							value: 1000,
							fromUnit: 'ml',
							toUnit: 'l',
							unitType: 'volume',
						},
						response: {
							success: true,
							input: {
								value: 1000,
								fromUnit: 'ml',
								toUnit: 'l',
								unitType: 'volume',
							},
							result: {
								convertedValue: 1,
								conversionFactor: 0.001,
								example: '1 ml = 0.001 l',
							},
						},
					},
				},
			},
		},
		supportedUnits: {
			length: ['m', 'km', 'cm', 'mm', 'inch', 'foot', 'yard', 'mile'],
			mass: ['kg', 'g', 'mg', 'tonne', 'lb', 'oz'],
			time: ['second', 'minute', 'hour', 'day', 'week'],
			volume: ['l', 'ml', 'm3', 'cm3', 'gallon', 'pint'],
		},
		examples: {
			curl: {
				length: 'curl -X POST https://calc1.ru/api/converter -H "Content-Type: application/json" -d \'{"value":100,"fromUnit":"cm","toUnit":"m","unitType":"length"}\'',
				mass: 'curl -X POST https://calc1.ru/api/converter -H "Content-Type: application/json" -d \'{"value":1000,"fromUnit":"g","toUnit":"kg","unitType":"mass"}\'',
				time: 'curl -X POST https://calc1.ru/api/converter -H "Content-Type: application/json" -d \'{"value":60,"fromUnit":"minute","toUnit":"hour","unitType":"time"}\'',
				volume: 'curl -X POST https://calc1.ru/api/converter -H "Content-Type: application/json" -d \'{"value":1000,"fromUnit":"ml","toUnit":"l","unitType":"volume"}\'',
			},
		},
	});
}
