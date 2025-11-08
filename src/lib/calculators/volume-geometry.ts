/**
 * Volume Geometry Calculator Library
 * Calculates volumes of basic geometric shapes: sphere, cube, cylinder
 */

export type ShapeType = 'sphere' | 'cube' | 'cylinder';

export interface VolumeGeometryInput {
	shape: ShapeType;
	radius?: number;
	side?: number;
	height?: number;
}

export interface VolumeGeometryResult {
	volume: number;
	formula: string;
	parameters: {
		radius?: number;
		side?: number;
		height?: number;
	};
	shape: ShapeType;
}

export interface VolumeGeometryValidation {
	isValid: boolean;
	error?: string;
}

/**
 * Validate volume geometry calculation input
 * 
 * Performs validation checks based on shape type:
 * - Sphere: radius is positive and not too large
 * - Cube: side is positive and not too large
 * - Cylinder: radius and height are positive and not too large
 * 
 * @param input - Volume geometry input to validate
 * @returns Validation result with boolean status and optional error message
 */
export function validateVolumeGeometryInput(
	input: VolumeGeometryInput
): VolumeGeometryValidation {
	const { shape, radius, side, height } = input;

	// Check if shape is selected
	if (!shape) {
		return { isValid: false, error: 'shapeRequired' };
	}

	// Validate based on shape type
	switch (shape) {
		case 'sphere':
			if (radius === undefined || radius === null) {
				return { isValid: false, error: 'radiusRequired' };
			}
			if (radius <= 0) {
				return { isValid: false, error: 'positiveRadius' };
			}
			if (radius > 1e6) {
				return { isValid: false, error: 'radiusTooLarge' };
			}
			break;

		case 'cube':
			if (side === undefined || side === null) {
				return { isValid: false, error: 'sideRequired' };
			}
			if (side <= 0) {
				return { isValid: false, error: 'positiveSide' };
			}
			if (side > 1e6) {
				return { isValid: false, error: 'sideTooLarge' };
			}
			break;

		case 'cylinder':
			if (radius === undefined || radius === null) {
				return { isValid: false, error: 'radiusRequired' };
			}
			if (height === undefined || height === null) {
				return { isValid: false, error: 'heightRequired' };
			}
			if (radius <= 0) {
				return { isValid: false, error: 'positiveRadius' };
			}
			if (height <= 0) {
				return { isValid: false, error: 'positiveHeight' };
			}
			if (radius > 1e6 || height > 1e6) {
				return { isValid: false, error: 'dimensionsTooLarge' };
			}
			break;

		default:
			return { isValid: false, error: 'invalidShape' };
	}

	return { isValid: true };
}

/**
 * Calculate volume of geometric shape
 * 
 * Calculates volume based on shape type:
 * - Sphere: V = (4/3) × π × r³
 * - Cube: V = a³
 * - Cylinder: V = π × r² × h
 * 
 * Also generates formula string for display.
 * 
 * @param input - Volume geometry input with shape type and dimensions
 * @returns Volume geometry result with volume, formula, parameters, and shape
 * @throws Error if input validation fails
 */
export function calculateVolumeGeometry(
	input: VolumeGeometryInput
): VolumeGeometryResult {
	const validation = validateVolumeGeometryInput(input);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const { shape, radius, side, height } = input;
	let volume: number;
	let formula: string;

	switch (shape) {
		case 'sphere':
			volume = (4 / 3) * Math.PI * Math.pow(radius!, 3);
			formula = `V = (4/3) × π × r³ = (4/3) × π × ${radius}³`;
			break;

		case 'cube':
			volume = Math.pow(side!, 3);
			formula = `V = a³ = ${side}³`;
			break;

		case 'cylinder':
			volume = Math.PI * Math.pow(radius!, 2) * height!;
			formula = `V = π × r² × h = π × ${radius}² × ${height}`;
			break;

		default:
			throw new Error('Invalid shape type');
	}

	return {
		volume,
		formula,
		parameters: {
			radius,
			side,
			height,
		},
		shape,
	};
}

/**
 * Format volume value with appropriate precision
 * 
 * Formats volume value based on magnitude:
 * - Very small (< 0.001): Scientific notation
 * - Small (< 1): 6 decimal places
 * - Medium (< 1000): 3 decimal places
 * - Large (≥ 1000): 2 decimal places
 * 
 * @param value - Volume value to format
 * @returns Formatted volume string
 */
export function formatVolumeValue(value: number): string {
	if (value === 0) return '0';

	// For very small values, show more decimal places
	if (Math.abs(value) < 0.001) {
		return value.toExponential(3);
	}

	// For small values, show more precision
	if (Math.abs(value) < 1) {
		return value.toFixed(6);
	}

	// For medium values, show moderate precision
	if (Math.abs(value) < 1000) {
		return value.toFixed(3);
	}

	// For large values, show fewer decimal places
	return value.toFixed(2);
}

/**
 * Get formula string for shape type
 * 
 * Returns mathematical formula for volume calculation of the specified shape.
 * 
 * @param shape - Shape type (sphere, cube, cylinder)
 * @returns Formula string (e.g., "V = (4/3) × π × r³")
 */
export function getShapeFormula(shape: ShapeType): string {
	const formulas = {
		sphere: 'V = (4/3) × π × r³',
		cube: 'V = a³',
		cylinder: 'V = π × r² × h',
	};

	return formulas[shape];
}

/**
 * Get parameter descriptions for shape type
 * 
 * Returns localized parameter names and descriptions for the specified shape.
 * 
 * @param shape - Shape type (sphere, cube, cylinder)
 * @returns Object with parameter descriptions (radius, side, height)
 */
export function getShapeParameters(shape: ShapeType): {
	radius?: string;
	side?: string;
	height?: string;
} {
	const parameters = {
		sphere: {
			radius: 'Радиус сферы (r)',
		},
		cube: {
			side: 'Длина стороны куба (a)',
		},
		cylinder: {
			radius: 'Радиус основания цилиндра (r)',
			height: 'Высота цилиндра (h)',
		},
	};

	return parameters[shape];
}

/**
 * Gets common examples for each shape type
 */
export function getShapeExamples(shape: ShapeType): Array<{
	name: string;
	parameters: VolumeGeometryInput;
	description: string;
}> {
	const examples = {
		sphere: [
			{
				name: 'Баскетбольный мяч',
				parameters: { shape: 'sphere', radius: 12 },
				description: 'Стандартный баскетбольный мяч с радиусом 12 см',
			},
			{
				name: 'Земля (приблизительно)',
				parameters: { shape: 'sphere', radius: 6371000 },
				description: 'Радиус Земли в метрах',
			},
			{
				name: 'Футбольный мяч',
				parameters: { shape: 'sphere', radius: 11 },
				description: 'Стандартный футбольный мяч с радиусом 11 см',
			},
		],
		cube: [
			{
				name: 'Кубик Рубика',
				parameters: { shape: 'cube', side: 5.7 },
				description: 'Стандартный кубик Рубика со стороной 5.7 см',
			},
			{
				name: 'Куб воды',
				parameters: { shape: 'cube', side: 1 },
				description: 'Куб со стороной 1 метр',
			},
			{
				name: 'Коробка',
				parameters: { shape: 'cube', side: 20 },
				description: 'Квадратная коробка со стороной 20 см',
			},
		],
		cylinder: [
			{
				name: 'Банка консервов',
				parameters: { shape: 'cylinder', radius: 3.5, height: 10 },
				description: 'Стандартная банка консервов',
			},
			{
				name: 'Стакан воды',
				parameters: { shape: 'cylinder', radius: 3, height: 12 },
				description: 'Обычный стакан для воды',
			},
			{
				name: 'Бочка',
				parameters: { shape: 'cylinder', radius: 30, height: 80 },
				description: 'Большая бочка',
			},
		],
	};

	return examples[shape];
}

/**
 * Gets shape-specific tips and information
 */
export function getShapeTips(shape: ShapeType): string[] {
	const tips = {
		sphere: [
			'Радиус - это расстояние от центра сферы до любой точки на её поверхности',
			'Объём сферы растёт пропорционально кубу радиуса',
			'Формула включает константу π (пи) ≈ 3.14159',
			'Сфера имеет максимальный объём при заданной площади поверхности',
		],
		cube: [
			'Все стороны куба равны между собой',
			'Объём куба равен длине стороны в третьей степени',
			'Куб - это частный случай прямоугольного параллелепипеда',
			'Диагональ куба равна стороне, умноженной на √3',
		],
		cylinder: [
			'Цилиндр состоит из двух одинаковых круговых оснований и боковой поверхности',
			'Высота цилиндра - это расстояние между основаниями',
			'Объём цилиндра равен площади основания, умноженной на высоту',
			'Формула включает константу π (пи) ≈ 3.14159',
		],
	};

	return tips[shape];
}

/**
 * Gets shape-specific applications and uses
 */
export function getShapeApplications(shape: ShapeType): string[] {
	const applications = {
		sphere: [
			'Расчёт объёма шаров и мячей',
			'Определение вместимости сферических резервуаров',
			'Расчёт объёма планет и небесных тел',
			'Проектирование сферических конструкций',
			'Расчёт объёма капель жидкости',
		],
		cube: [
			'Расчёт объёма кубических контейнеров',
			'Определение вместимости складских помещений',
			'Расчёт объёма строительных блоков',
			'Проектирование кубических конструкций',
			'Расчёт объёма упаковочных коробок',
		],
		cylinder: [
			'Расчёт объёма цилиндрических резервуаров',
			'Определение вместимости труб и трубопроводов',
			'Расчёт объёма банок и бутылок',
			'Проектирование цилиндрических конструкций',
			'Расчёт объёма колонн и опор',
		],
	};

	return applications[shape];
}
