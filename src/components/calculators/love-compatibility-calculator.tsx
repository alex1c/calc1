'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Heart, Calendar, Sparkles, Copy, RefreshCw } from 'lucide-react';

interface CompatibilityResult {
	percentage: number;
	description: string;
	compatibility: string;
}

export default function LoveCompatibilityCalculator() {
	const t = useTranslations('calculators.loveCompatibility');
	const [date1, setDate1] = useState('');
	const [date2, setDate2] = useState('');
	const [result, setResult] = useState<CompatibilityResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [copied, setCopied] = useState(false);

	// Love compatibility calculation algorithm
	const calculateCompatibility = (
		date1: string,
		date2: string
	): CompatibilityResult => {
		const d1 = new Date(date1);
		const d2 = new Date(date2);

		// Calculate days difference
		const timeDiff = Math.abs(d2.getTime() - d1.getTime());
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

		// Calculate compatibility based on various factors
		const day1 = d1.getDate();
		const day2 = d2.getDate();
		const month1 = d1.getMonth() + 1;
		const month2 = d2.getMonth() + 1;

		// Numerological calculation
		const sum1 = day1 + month1;
		const sum2 = day2 + month2;
		const numerologicalDiff = Math.abs(sum1 - sum2);

		// Base compatibility calculation
		let compatibility = 100;

		// Reduce compatibility based on age difference (more realistic)
		const ageDiff = Math.abs(d1.getFullYear() - d2.getFullYear());
		if (ageDiff > 10) compatibility -= ageDiff * 2;
		if (ageDiff > 20) compatibility -= ageDiff;

		// Numerological compatibility
		compatibility -= numerologicalDiff * 2;

		// Days difference factor
		compatibility -= Math.min(daysDiff / 100, 20);

		// Ensure result is between 20 and 100
		compatibility = Math.max(20, Math.min(100, Math.round(compatibility)));

		// Determine compatibility level and description
		let compatibilityLevel: string;
		let description: string;

		if (compatibility >= 90) {
			compatibilityLevel = t('results.levels.perfect');
			description = t('results.descriptions.perfect');
		} else if (compatibility >= 80) {
			compatibilityLevel = t('results.levels.excellent');
			description = t('results.descriptions.excellent');
		} else if (compatibility >= 70) {
			compatibilityLevel = t('results.levels.good');
			description = t('results.descriptions.good');
		} else if (compatibility >= 60) {
			compatibilityLevel = t('results.levels.average');
			description = t('results.descriptions.average');
		} else if (compatibility >= 50) {
			compatibilityLevel = t('results.levels.fair');
			description = t('results.descriptions.fair');
		} else {
			compatibilityLevel = t('results.levels.challenging');
			description = t('results.descriptions.challenging');
		}

		return {
			percentage: compatibility,
			description,
			compatibility: compatibilityLevel,
		};
	};

	const handleCalculate = async () => {
		if (!date1 || !date2) return;

		setIsCalculating(true);

		// Add some delay for animation effect
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const compatibility = calculateCompatibility(date1, date2);
		setResult(compatibility);
		setIsCalculating(false);
	};

	const handleReset = () => {
		setDate1('');
		setDate2('');
		setResult(null);
		setCopied(false);
	};

	const handleCopy = async () => {
		if (!result) return;

		const text = `${t('results.copyText', {
			percentage: result.percentage,
			compatibility: result.compatibility,
			description: result.description,
		})}`;

		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const isFormValid =
		date1 &&
		date2 &&
		new Date(date1) <= new Date() &&
		new Date(date2) <= new Date();

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-pink-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Heart className='h-8 w-8 text-pink-500' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* First person */}
					<div className='space-y-4'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.person1')}
						</label>
						<div className='relative'>
							<Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
							<input
								type='date'
								value={date1}
								onChange={(e) => setDate1(e.target.value)}
								max={new Date().toISOString().split('T')[0]}
								className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
								placeholder={t('form.datePlaceholder')}
							/>
						</div>
					</div>

					{/* Second person */}
					<div className='space-y-4'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.person2')}
						</label>
						<div className='relative'>
							<Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
							<input
								type='date'
								value={date2}
								onChange={(e) => setDate2(e.target.value)}
								max={new Date().toISOString().split('T')[0]}
								className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
								placeholder={t('form.datePlaceholder')}
							/>
						</div>
					</div>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleCalculate}
						disabled={!isFormValid || isCalculating}
						className='flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isCalculating ? (
							<>
								<RefreshCw className='h-5 w-5 animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Sparkles className='h-5 w-5' />
								{t('form.calculate')}
							</>
						)}
					</button>

					<button
						onClick={handleReset}
						className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200'
					>
						{t('form.reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<div className='bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 border border-pink-200'>
					<h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<Heart className='h-6 w-6 text-pink-500' />
						{t('results.title')}
					</h3>

					<div className='text-center mb-6'>
						<div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-4'>
							<span className='text-2xl font-bold text-white'>
								{result.percentage}%
							</span>
						</div>
						<h4 className='text-xl font-semibold text-gray-900 mb-2'>
							{result.compatibility}
						</h4>
						<p className='text-gray-600'>{result.description}</p>
					</div>

					{/* Action buttons */}
					<div className='flex flex-col sm:flex-row gap-3'>
						<button
							onClick={handleCopy}
							className='flex-1 bg-white border border-pink-300 text-pink-700 px-4 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors duration-200 flex items-center justify-center gap-2'
						>
							<Copy className='h-4 w-4' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
					</div>
				</div>
			)}

			{/* Disclaimer */}
			<div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
				<p className='text-sm text-yellow-800'>{t('disclaimer')}</p>
			</div>
		</div>
	);
}
