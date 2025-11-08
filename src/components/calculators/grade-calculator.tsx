'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	TrendingUp,
	GraduationCap,
	Plus,
	X,
	BarChart3,
} from 'lucide-react';

type GradingSystem = '5-point' | '4-point' | '100-point' | 'letter';

interface Course {
	id: string;
	name: string;
	grade: string;
	credits: number;
}

interface GradeCalculatorInput {
	gradingSystem: GradingSystem;
	courses: Course[];
}

interface GradeResult {
	gpa: number;
	totalCredits: number;
	weightedAverage: number;
	totalPoints: number;
	courses: Array<Course & { points: number }>;
}

/**
 * Grade Calculator Component
 * 
 * A React component for calculating GPA and weighted averages.
 * 
 * Features:
 * - Multiple grading systems (5-point, 4-point, 100-point, letter)
 * - Multiple courses support
 * - Credit hours/weights
 * - GPA calculation
 * - Weighted average calculation
 * - Add/remove courses dynamically
 * - Responsive design
 * 
 * Grading systems:
 * - 5-point: Russian system (2-5)
 * - 4-point: US system (0-4)
 * - 100-point: Percentage system (0-100)
 * - Letter: Letter grades (A-F)
 * 
 * Uses inline calculation logic for GPA and weighted averages.
 */
// Конвертация оценок в числовое значение для расчёта
const convertGradeToNumber = (
	grade: string,
	system: GradingSystem
): number => {
	switch (system) {
		case '5-point':
			return parseFloat(grade) || 0;
		case '4-point':
			return parseFloat(grade) || 0;
		case '100-point':
			// Берем среднее значение диапазона
			if (grade === '90-100') return 95;
			if (grade === '80-89') return 84.5;
			if (grade === '70-79') return 74.5;
			if (grade === '60-69') return 64.5;
			if (grade === '0-59') return 29.5;
			return parseFloat(grade) || 0;
		case 'letter':
			const letterMap: Record<string, number> = {
				A: 4.0,
				B: 3.0,
				C: 2.0,
				D: 1.0,
				F: 0.0,
			};
			return letterMap[grade.toUpperCase()] || 0;
		default:
			return 0;
	}
};

// Конвертация 100-балльной системы в 4-балльную для отображения
const convert100ToGPA = (percentage: number): number => {
	if (percentage >= 90) return 4.0;
	if (percentage >= 80) return 3.0 + ((percentage - 80) / 10) * 0.9;
	if (percentage >= 70) return 2.0 + ((percentage - 70) / 10) * 1.0;
	if (percentage >= 60) return 1.0 + ((percentage - 60) / 10) * 1.0;
	return 0.0;
};

export default function GradeCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.grade-calculator');
	
	// Form state management
	const [input, setInput] = useState<GradeCalculatorInput>({
		gradingSystem: '5-point', // Grading system (5-point, 4-point, 100-point, letter)
		courses: [
			// Default courses (example)
			{ id: '1', name: 'Математика', grade: '5', credits: 3 },
			{ id: '2', name: 'Физика', grade: '4', credits: 4 },
		],
	});
	const [result, setResult] = useState<GradeResult | null>(null); // Calculated result
	const [errors, setErrors] = useState<string[]>([]); // Validation errors

	const handleInputChange = (
		field: keyof GradeCalculatorInput,
		value: GradingSystem | Course[]
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const handleCourseChange = (
		courseId: string,
		field: keyof Course,
		value: string | number
	) => {
		setInput((prev) => ({
			...prev,
			courses: prev.courses.map((course) =>
				course.id === courseId ? { ...course, [field]: value } : course
			),
		}));
		setErrors([]);
	};

	const addCourse = () => {
		const newId = Date.now().toString();
		setInput((prev) => ({
			...prev,
			courses: [
				...prev.courses,
				{ id: newId, name: '', grade: '', credits: 1 },
			],
		}));
	};

	const removeCourse = (courseId: string) => {
		setInput((prev) => ({
			...prev,
			courses: prev.courses.filter((course) => course.id !== courseId),
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (input.courses.length === 0) {
			validationErrors.push(t('form.errors.atLeastOneCourse'));
		}

		input.courses.forEach((course, index) => {
			if (!course.name || course.name.trim() === '') {
				validationErrors.push(
					`${t('form.errors.courseNameRequired')} (${t('form.errors.courseNumber', { number: index + 1 })})`
				);
			}
			if (!course.grade || course.grade.trim() === '') {
				validationErrors.push(
					`${t('form.errors.gradeRequired')} (${course.name || t('form.errors.courseNumber', { number: index + 1 })})`
				);
			}
			if (!course.credits || course.credits <= 0) {
				validationErrors.push(
					`${t('form.errors.invalidCredits')} (${course.name || t('form.errors.courseNumber', { number: index + 1 })})`
				);
			}
		});

		return validationErrors;
	};

	const calculateGPA = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setResult(null);
			return;
		}

		try {
			let totalPoints = 0;
			let totalCredits = 0;

			const coursesWithPoints = input.courses.map((course) => {
				let gradeValue = convertGradeToNumber(
					course.grade,
					input.gradingSystem
				);

				// Конвертация 100-балльной в 4-балльную для расчёта
				if (input.gradingSystem === '100-point') {
					gradeValue = convert100ToGPA(gradeValue);
				}

				const points = gradeValue * course.credits;
				totalPoints += points;
				totalCredits += course.credits;

				return {
					...course,
					points,
				};
			});

			const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
			const weightedAverage = gpa;

			setResult({
				gpa,
				totalCredits,
				weightedAverage,
				totalPoints,
				courses: coursesWithPoints,
			});
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.title')]);
			setResult(null);
		}
	};

	const handleReset = () => {
		setInput({
			gradingSystem: '5-point',
			courses: [
				{ id: '1', name: 'Математика', grade: '5', credits: 3 },
				{ id: '2', name: 'Физика', grade: '4', credits: 4 },
			],
		});
		setResult(null);
		setErrors([]);
	};

	const getGradeOptions = () => {
		const options = t.raw(`form.gradeOptions.${input.gradingSystem}`) as
			| Record<string, string>
			| undefined;
		return options ? Object.entries(options) : [];
	};

	const getMaxGPA = () => {
		switch (input.gradingSystem) {
			case '5-point':
				return 5.0;
			case '4-point':
				return 4.0;
			case '100-point':
				return 4.0; // Конвертируется в GPA
			case 'letter':
				return 4.0;
			default:
				return 5.0;
		}
	};

	return (
		<div className='max-w-6xl mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-4'>
					<GraduationCap className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400'>
					{t('description')}
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Square className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Grading System */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.gradingSystem')}
							</label>
							<select
								value={input.gradingSystem}
								onChange={(e) =>
									handleInputChange(
										'gradingSystem',
										e.target.value as GradingSystem
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(
									t.raw('form.gradingSystems') as Record<string, string>
								).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						</div>

						{/* Courses */}
						<div>
							<div className='flex justify-between items-center mb-4'>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
									{t('form.courses') || 'Предметы'}
								</label>
								<button
									onClick={addCourse}
									className='flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
								>
									<Plus className='h-4 w-4 mr-1' />
									{t('form.addCourse')}
								</button>
							</div>

							<div className='space-y-4'>
								{input.courses.map((course, index) => (
									<div
										key={course.id}
										className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'
									>
										<div className='flex items-start justify-between mb-3'>
											<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
												{t('form.courseNumber', { number: index + 1 })}
											</span>
											{input.courses.length > 1 && (
												<button
													onClick={() => removeCourse(course.id)}
													className='text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
												>
													<X className='h-4 w-4' />
												</button>
											)}
										</div>

										<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
											{/* Course Name */}
											<div>
												<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
													{t('form.courseName')}
												</label>
												<input
													type='text'
													value={course.name}
													onChange={(e) =>
														handleCourseChange(
															course.id,
															'name',
															e.target.value
														)
													}
													className='w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
													placeholder={t('form.courseNamePlaceholder')}
												/>
											</div>

											{/* Grade */}
											<div>
												<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
													{t('form.grade')}
												</label>
												{input.gradingSystem === '100-point' ? (
													<select
														value={course.grade}
														onChange={(e) =>
															handleCourseChange(
																course.id,
																'grade',
																e.target.value
															)
														}
														className='w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
													>
														<option value=''>Выберите</option>
														{getGradeOptions().map(([key, value]) => (
															<option key={key} value={key}>
																{value}
															</option>
														))}
													</select>
												) : (
													<select
														value={course.grade}
														onChange={(e) =>
															handleCourseChange(
																course.id,
																'grade',
																e.target.value
															)
														}
														className='w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
													>
														<option value=''>Выберите</option>
														{getGradeOptions().map(([key, value]) => (
															<option key={key} value={key}>
																{value}
															</option>
														))}
													</select>
												)}
											</div>

											{/* Credits */}
											<div>
												<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'>
													{t('form.credits')}
												</label>
												<input
													type='number'
													step='0.5'
													min='0.5'
													max='10'
													value={course.credits || ''}
													onChange={(e) =>
														handleCourseChange(
															course.id,
															'credits',
															parseFloat(e.target.value) || 0
														)
													}
													className='w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
													placeholder='1'
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={calculateGPA}
								className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
							>
								{t('form.calculate')}
							</button>
							<button
								onClick={handleReset}
								className='flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
							>
								<RotateCcw className='h-4 w-4 inline mr-2' />
								{t('form.reset')}
							</button>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Package className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
						{t('results.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
								<h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
									{t('form.errors.title')}
								</h3>
							</div>
							<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					{/* Results Content */}
					{result ? (
						<div className='space-y-4'>
							{/* GPA */}
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center'>
									<TrendingUp className='w-5 h-5 mr-2' />
									{t('results.gpa')}
								</h3>
								<div className='text-3xl font-bold text-green-900 dark:text-green-100 mb-2'>
									{result.gpa.toFixed(2)} / {getMaxGPA().toFixed(1)}
								</div>
								<p className='text-sm text-green-700 dark:text-green-300'>
									{t('results.weightedAverage')}
								</p>
							</div>

							{/* Total Credits */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center'>
									<BarChart3 className='w-5 h-5 mr-2' />
									{t('results.totalCredits')}
								</h3>
								<div className='text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2'>
									{result.totalCredits}
								</div>
								<p className='text-sm text-blue-700 dark:text-blue-300'>
									{t('results.totalCredits')}
								</p>
							</div>

							{/* Total Points */}
							<div className='bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3'>
									{t('results.totalPoints')}
								</h3>
								<div className='text-xl font-bold text-purple-900 dark:text-purple-100'>
									{result.totalPoints.toFixed(2)}
								</div>
								<p className='text-sm text-purple-700 dark:text-purple-300'>
									{t('results.qualityScore')}
								</p>
							</div>

							{/* Courses List */}
							<div className='bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md p-4'>
								<h3 className='text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3'>
									{t('results.courses')}
								</h3>
								<div className='space-y-2 text-sm'>
									{result.courses.map((course, index) => (
										<div
											key={course.id}
											className='bg-white dark:bg-gray-600 rounded p-2 flex justify-between items-center'
										>
											<span className='text-orange-700 dark:text-orange-300 font-medium'>
												{course.name}
											</span>
											<div className='flex gap-4 text-xs'>
												<span className='text-orange-600 dark:text-orange-400'>
													{t('results.grade')}: {course.grade}
												</span>
												<span className='text-orange-600 dark:text-orange-400'>
													{t('results.credits')}: {course.credits}
												</span>
												<span className='text-orange-900 dark:text-orange-100 font-bold'>
													{t('results.points')}: {course.points.toFixed(1)}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					) : (
						<p className='text-gray-500 dark:text-gray-400'>
							{t('results.placeholder')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

