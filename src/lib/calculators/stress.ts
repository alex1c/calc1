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

export function getStressLevelInfo(
	level: 'low' | 'moderate' | 'high'
): StressLevel {
	const stressLevel = STRESS_LEVELS.find((l) => l.level === level);
	if (!stressLevel) {
		throw new Error('Invalid stress level');
	}
	return stressLevel;
}

export function getProgressPercentage(
	currentStep: number,
	totalSteps: number
): number {
	return Math.round((currentStep / totalSteps) * 100);
}

export function getScoreColor(score: number): string {
	if (score <= 10) return 'text-green-600';
	if (score <= 20) return 'text-yellow-600';
	return 'text-red-600';
}

export function getScoreBgColor(score: number): string {
	if (score <= 10) return 'bg-green-100';
	if (score <= 20) return 'bg-yellow-100';
	return 'bg-red-100';
}

export function getScoreBorderColor(score: number): string {
	if (score <= 10) return 'border-green-200';
	if (score <= 20) return 'border-yellow-200';
	return 'border-red-200';
}
