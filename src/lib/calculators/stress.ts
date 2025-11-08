/**
 * Stress Calculator Library
 * 
 * Provides functionality for calculating stress levels based on questionnaire responses.
 * 
 * Features:
 * - Stress questionnaire with 10 questions
 * - Score-based stress level assessment (low, moderate, high)
 * - Personalized advice based on stress level
 * - Color-coded stress indicators
 * 
 * Scoring system:
 * - Each question scored 0-3 points
 * - Total score: 0-30 points
 * - Low stress: 0-10 points
 * - Moderate stress: 11-20 points
 * - High stress: 21-30 points
 */

export interface StressQuestion {
	id: number;
	text: string;
}

export interface StressAnswer {
	questionId: number;
	score: number; // 0-3
}

export interface StressResult {
	totalScore: number;
	level: 'low' | 'moderate' | 'high';
	description: string;
	advice: string;
	color: string;
}

export interface StressLevel {
	level: 'low' | 'moderate' | 'high';
	minScore: number;
	maxScore: number;
	description: string;
	advice: string;
	color: string;
	icon: string;
}

export const STRESS_LEVELS: StressLevel[] = [
	{
		level: 'low',
		minScore: 0,
		maxScore: 10,
		description: 'lowStressDescription',
		advice: 'lowStressAdvice',
		color: 'green',
		icon: '🟢',
	},
	{
		level: 'moderate',
		minScore: 11,
		maxScore: 20,
		description: 'moderateStressDescription',
		advice: 'moderateStressAdvice',
		color: 'yellow',
		icon: '🟡',
	},
	{
		level: 'high',
		minScore: 21,
		maxScore: 30,
		description: 'highStressDescription',
		advice: 'highStressAdvice',
		color: 'red',
		icon: '🔴',
	},
];

export const STRESS_QUESTIONS: StressQuestion[] = [
	{
		id: 1,
		text: 'question1',
	},
	{
		id: 2,
		text: 'question2',
	},
	{
		id: 3,
		text: 'question3',
	},
	{
		id: 4,
		text: 'question4',
	},
	{
		id: 5,
		text: 'question5',
	},
	{
		id: 6,
		text: 'question6',
	},
	{
		id: 7,
		text: 'question7',
	},
	{
		id: 8,
		text: 'question8',
	},
	{
		id: 9,
		text: 'question9',
	},
	{
		id: 10,
		text: 'question10',
	},
];

export const STRESS_OPTIONS = [
	{ value: 0, label: 'never' },
	{ value: 1, label: 'rarely' },
	{ value: 2, label: 'often' },
	{ value: 3, label: 'always' },
];

/**
 * Validate stress questionnaire answers
 * 
 * Checks that:
 * - All questions are answered (answers.length === questions.length)
 * - Each answer score is between 0 and 3
 * 
 * @param answers - Array of stress answers
 * @returns Validation result with boolean status and optional error message
 */
export function validateStressAnswers(answers: StressAnswer[]): {
	isValid: boolean;
	error?: string;
} {
	if (answers.length !== STRESS_QUESTIONS.length) {
		return { isValid: false, error: 'incompleteAnswers' };
	}

	for (const answer of answers) {
		if (answer.score < 0 || answer.score > 3) {
			return { isValid: false, error: 'invalidScore' };
		}
	}

	return { isValid: true };
}

/**
 * Calculate stress level from questionnaire answers
 * 
 * Calculates total score by summing all answer scores (0-3 each),
 * then determines stress level (low, moderate, high) based on score ranges.
 * 
 * Score ranges:
 * - Low: 0-10 points
 * - Moderate: 11-20 points
 * - High: 21-30 points
 * 
 * @param answers - Array of stress answers (one per question)
 * @returns Stress result with total score, level, description, and advice
 * @throws Error if validation fails
 */
export function calculateStressLevel(answers: StressAnswer[]): StressResult {
	const validation = validateStressAnswers(answers);
	if (!validation.isValid) {
		throw new Error(validation.error);
	}

	const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);

	const stressLevel = STRESS_LEVELS.find(
		(level) => totalScore >= level.minScore && totalScore <= level.maxScore
	);

	if (!stressLevel) {
		throw new Error('Invalid stress level calculation');
	}

	return {
		totalScore,
		level: stressLevel.level,
		description: stressLevel.description,
		advice: stressLevel.advice,
		color: stressLevel.color,
	};
}

/**
 * Get stress level information by level name
 * 
 * Retrieves detailed information about a specific stress level including
 * score ranges, description, advice, color, and icon.
 * 
 * @param level - Stress level (low, moderate, high)
 * @returns Stress level information object
 * @throws Error if level is invalid
 */
export function getStressLevelInfo(
	level: 'low' | 'moderate' | 'high'
): StressLevel {
	const stressLevel = STRESS_LEVELS.find((l) => l.level === level);
	if (!stressLevel) {
		throw new Error('Invalid stress level');
	}
	return stressLevel;
}

/**
 * Calculate progress percentage for questionnaire
 * 
 * Calculates completion percentage based on current step and total steps.
 * 
 * @param currentStep - Current question step (1-based)
 * @param totalSteps - Total number of questions
 * @returns Progress percentage (0-100)
 */
export function getProgressPercentage(
	currentStep: number,
	totalSteps: number
): number {
	return Math.round((currentStep / totalSteps) * 100);
}

/**
 * Get text color class based on stress score
 * 
 * Returns Tailwind CSS color class based on score:
 * - Green (≤10): Low stress
 * - Yellow (11-20): Moderate stress
 * - Red (>20): High stress
 * 
 * @param score - Total stress score
 * @returns Tailwind CSS text color class
 */
export function getScoreColor(score: number): string {
	if (score <= 10) return 'text-green-600';
	if (score <= 20) return 'text-yellow-600';
	return 'text-red-600';
}

/**
 * Get background color class based on stress score
 * 
 * Returns Tailwind CSS background color class based on score.
 * 
 * @param score - Total stress score
 * @returns Tailwind CSS background color class
 */
export function getScoreBgColor(score: number): string {
	if (score <= 10) return 'bg-green-100';
	if (score <= 20) return 'bg-yellow-100';
	return 'bg-red-100';
}

/**
 * Get border color class based on stress score
 * 
 * Returns Tailwind CSS border color class based on score.
 * 
 * @param score - Total stress score
 * @returns Tailwind CSS border color class
 */
export function getScoreBorderColor(score: number): string {
	if (score <= 10) return 'border-green-200';
	if (score <= 20) return 'border-yellow-200';
	return 'border-red-200';
}
