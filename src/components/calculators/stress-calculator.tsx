'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Brain,
	Heart,
	Zap,
	CheckCircle,
	AlertCircle,
	Info,
	RotateCcw,
	ArrowRight,
	ArrowLeft,
} from 'lucide-react';
import {
	calculateStressLevel,
	validateStressAnswers,
	STRESS_QUESTIONS,
	STRESS_OPTIONS,
	getProgressPercentage,
	getScoreColor,
	getScoreBgColor,
	getScoreBorderColor,
	StressAnswer,
	StressResult,
} from '@/lib/calculators/stress';

export default function StressCalculator() {
	const t = useTranslations('calculators.stress');
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<StressAnswer[]>([]);
	const [result, setResult] = useState<StressResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);

	const handleAnswerChange = (questionId: number, score: number) => {
		const newAnswers = [...answers];
		const existingAnswerIndex = newAnswers.findIndex(
			(answer) => answer.questionId === questionId
		);

		if (existingAnswerIndex >= 0) {
			newAnswers[existingAnswerIndex] = { questionId, score };
		} else {
			newAnswers.push({ questionId, score });
		}

		setAnswers(newAnswers);
	};

	const handleNext = () => {
		if (currentStep < STRESS_QUESTIONS.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleCalculate = async () => {
		setIsCalculating(true);
		try {
			// Simulate calculation delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const stressResult = calculateStressLevel(answers);
			setResult(stressResult);
		} catch (error) {
			console.error('Calculation error:', error);
		} finally {
			setIsCalculating(false);
		}
	};

	const handleRestart = () => {
		setCurrentStep(0);
		setAnswers([]);
		setResult(null);
	};

	const getCurrentAnswer = (questionId: number): number => {
		const answer = answers.find((a) => a.questionId === questionId);
		return answer ? answer.score : -1;
	};

	const isStepComplete = (step: number): boolean => {
		const questionId = STRESS_QUESTIONS[step].id;
		return getCurrentAnswer(questionId) >= 0;
	};

	const isAllStepsComplete = (): boolean => {
		return STRESS_QUESTIONS.every((_, index) => isStepComplete(index));
	};

	const progressPercentage = getProgressPercentage(
		currentStep + 1,
		STRESS_QUESTIONS.length
	);

	const getLevelIcon = (level: string) => {
		switch (level) {
			case 'low':
				return <CheckCircle className='w-6 h-6 text-green-600' />;
			case 'moderate':
				return <AlertCircle className='w-6 h-6 text-yellow-600' />;
			case 'high':
				return <Info className='w-6 h-6 text-red-600' />;
			default:
				return <Brain className='w-6 h-6 text-gray-600' />;
		}
	};

	const getLevelColorClasses = (level: string) => {
		switch (level) {
			case 'low':
				return 'bg-green-50 border-green-200 text-green-800';
			case 'moderate':
				return 'bg-yellow-50 border-yellow-200 text-yellow-800';
			case 'high':
				return 'bg-red-50 border-red-200 text-red-800';
			default:
				return 'bg-gray-50 border-gray-200 text-gray-800';
		}
	};

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='p-4 bg-blue-100 dark:bg-blue-900 rounded-full'>
							<Brain className='w-12 h-12 text-blue-600 dark:text-blue-400' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Infographic */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
							{t('infographic.low')}
						</div>
						<div className='text-sm text-green-800 dark:text-green-200'>
							{t('infographic.lowDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2'>
							{t('infographic.moderate')}
						</div>
						<div className='text-sm text-yellow-800 dark:text-yellow-200'>
							{t('infographic.moderateDescription')}
						</div>
					</div>
					<div className='text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
						<div className='text-2xl font-bold text-red-600 dark:text-red-400 mb-2'>
							{t('infographic.high')}
						</div>
						<div className='text-sm text-red-800 dark:text-red-200'>
							{t('infographic.highDescription')}
						</div>
					</div>
				</div>
			</div>

			{/* Test Form */}
			{!result && (
				<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8'>
					{/* Progress Bar */}
					<div className='mb-8'>
						<div className='flex justify-between items-center mb-2'>
							<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								{t('progress.question')} {currentStep + 1}{' '}
								{t('progress.of')} {STRESS_QUESTIONS.length}
							</span>
							<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								{progressPercentage}%
							</span>
						</div>
						<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
							<motion.div
								className='bg-blue-600 h-2 rounded-full'
								initial={{ width: 0 }}
								animate={{ width: `${progressPercentage}%` }}
								transition={{ duration: 0.3 }}
							/>
						</div>
					</div>

					<AnimatePresence mode='wait'>
						<motion.div
							key={currentStep}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.3 }}
						>
							{/* Question */}
							<div className='mb-8'>
								<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
									{t(
										`questions.${STRESS_QUESTIONS[currentStep].text}`
									)}
								</h3>

								{/* Answer Options */}
								<div className='space-y-3'>
									{STRESS_OPTIONS.map((option) => (
										<label
											key={option.value}
											className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
												getCurrentAnswer(
													STRESS_QUESTIONS[
														currentStep
													].id
												) === option.value
													? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
													: 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
											}`}
										>
											<input
												type='radio'
												name={`question-${STRESS_QUESTIONS[currentStep].id}`}
												value={option.value}
												checked={
													getCurrentAnswer(
														STRESS_QUESTIONS[
															currentStep
														].id
													) === option.value
												}
												onChange={() =>
													handleAnswerChange(
														STRESS_QUESTIONS[
															currentStep
														].id,
														option.value
													)
												}
												className='sr-only'
											/>
											<div className='flex items-center w-full'>
												<div
													className={`w-4 h-4 rounded-full border-2 mr-3 ${
														getCurrentAnswer(
															STRESS_QUESTIONS[
																currentStep
															].id
														) === option.value
															? 'border-blue-500 bg-blue-500'
															: 'border-gray-300 dark:border-gray-600'
													}`}
												>
													{getCurrentAnswer(
														STRESS_QUESTIONS[
															currentStep
														].id
													) === option.value && (
														<div className='w-full h-full rounded-full bg-white scale-50' />
													)}
												</div>
												<span className='text-gray-900 dark:text-white font-medium'>
													{t(
														`options.${option.label}`
													)}
												</span>
											</div>
										</label>
									))}
								</div>
							</div>

							{/* Navigation */}
							<div className='flex justify-between items-center'>
								<button
									onClick={handlePrevious}
									disabled={currentStep === 0}
									className='flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
								>
									<ArrowLeft className='w-4 h-4' />
									{t('navigation.previous')}
								</button>

								{currentStep === STRESS_QUESTIONS.length - 1 ? (
									<button
										onClick={handleCalculate}
										disabled={
											!isAllStepsComplete() ||
											isCalculating
										}
										className='flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
									>
										{isCalculating ? (
											<>
												<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
												{t('navigation.calculating')}
											</>
										) : (
											<>
												<Zap className='w-4 h-4' />
												{t('navigation.calculate')}
											</>
										)}
									</button>
								) : (
									<button
										onClick={handleNext}
										disabled={!isStepComplete(currentStep)}
										className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors'
									>
										{t('navigation.next')}
										<ArrowRight className='w-4 h-4' />
									</button>
								)}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			)}

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'
				>
					<div className='text-center mb-8'>
						<div className='flex justify-center mb-4'>
							{getLevelIcon(result.level)}
						</div>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('results.title')}
						</h2>
					</div>

					{/* Score Display */}
					<div className='text-center mb-8'>
						<div
							className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreBgColor(
								result.totalScore
							)} ${getScoreBorderColor(result.totalScore)}`}
						>
							<span
								className={`text-3xl font-bold ${getScoreColor(
									result.totalScore
								)}`}
							>
								{result.totalScore}
							</span>
						</div>
						<p className='text-lg text-gray-600 dark:text-gray-400 mt-4'>
							{t('results.totalScore')}: {result.totalScore} / 30
						</p>
					</div>

					{/* Result Card */}
					<div
						className={`p-6 rounded-lg border-2 ${getLevelColorClasses(
							result.level
						)} mb-8`}
					>
						<div className='flex items-center gap-3 mb-4'>
							<span className='text-2xl'>
								{result.level === 'low' && '🟢'}
								{result.level === 'moderate' && '🟡'}
								{result.level === 'high' && '🔴'}
							</span>
							<h3 className='text-xl font-bold'>
								{t(`levels.${result.level}.title`)}
							</h3>
						</div>
						<p className='text-lg mb-4'>
							{t(`levels.${result.level}.description`)}
						</p>
						<div className='bg-white dark:bg-gray-100 rounded-lg p-4'>
							<h4 className='font-semibold mb-2'>
								{t('results.advice')}
							</h4>
							<p>{t(`levels.${result.level}.advice`)}</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<button
							onClick={handleRestart}
							className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors'
						>
							<RotateCcw className='w-4 h-4' />
							{t('navigation.restart')}
						</button>
					</div>
				</motion.div>
			)}

			{/* Tips */}
			<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
				<div className='flex items-center gap-2 mb-4'>
					<Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
					<h4 className='font-semibold text-blue-800 dark:text-blue-200'>
						{t('tips.title')}
					</h4>
				</div>
				<div className='space-y-2 text-sm text-blue-700 dark:text-blue-300'>
					<p>{t('tips.honest')}</p>
					<p>{t('tips.consultation')}</p>
					<p>{t('tips.regular')}</p>
				</div>
			</div>
		</div>
	);
}
