'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Shuffle, Copy, RefreshCw, Download, Dice1 } from 'lucide-react';

interface GeneratorOptions {
	min: number;
	max: number;
	count: number;
	allowDuplicates: boolean;
	sort: boolean;
}

export default function RandomNumberGenerator() {
	const t = useTranslations('calculators.randomNumberGenerator');
	const [options, setOptions] = useState<GeneratorOptions>({
		min: 1,
		max: 100,
		count: 1,
		allowDuplicates: true,
		sort: false,
	});
	const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [copied, setCopied] = useState(false);

	const generateRandomNumbers = (): number[] => {
		const numbers: number[] = [];
		const range = options.max - options.min + 1;

		if (options.allowDuplicates) {
			// Allow duplicates
			for (let i = 0; i < options.count; i++) {
				const randomNum =
					Math.floor(Math.random() * range) + options.min;
				numbers.push(randomNum);
			}
		} else {
			// No duplicates allowed
			if (options.count > range) {
				// If count is greater than range, fill with all possible numbers
				for (let i = options.min; i <= options.max; i++) {
					numbers.push(i);
				}
			} else {
				// Generate unique numbers
				const availableNumbers: number[] = [];
				for (let i = options.min; i <= options.max; i++) {
					availableNumbers.push(i);
				}

				for (let i = 0; i < Math.min(options.count, range); i++) {
					const randomIndex = Math.floor(
						Math.random() * availableNumbers.length
					);
					numbers.push(availableNumbers.splice(randomIndex, 1)[0]);
				}
			}
		}

		// Sort if requested
		if (options.sort) {
			numbers.sort((a, b) => a - b);
		}

		return numbers;
	};

	const handleGenerate = async () => {
		if (options.min > options.max) {
			alert(t('errors.minGreaterThanMax'));
			return;
		}

		if (options.count < 1) {
			alert(t('errors.countTooSmall'));
			return;
		}

		if (
			!options.allowDuplicates &&
			options.count > options.max - options.min + 1
		) {
			alert(t('errors.countTooLarge'));
			return;
		}

		setIsGenerating(true);

		// Add some delay for animation effect
		await new Promise((resolve) => setTimeout(resolve, 800));

		const numbers = generateRandomNumbers();
		setGeneratedNumbers(numbers);
		setIsGenerating(false);
	};

	const handleCopy = async () => {
		const text = generatedNumbers.join(', ');
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const content = generatedNumbers.join('\n');
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'random-numbers.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleReset = () => {
		setGeneratedNumbers([]);
		setOptions({
			min: 1,
			max: 100,
			count: 1,
			allowDuplicates: true,
			sort: false,
		});
	};

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-green-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Shuffle className='h-8 w-8 text-green-500' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{/* Min value */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.minValue')}
						</label>
						<input
							type='number'
							value={options.min}
							onChange={(e) =>
								setOptions({
									...options,
									min: parseInt(e.target.value) || 0,
								})
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
							placeholder='1'
						/>
					</div>

					{/* Max value */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.maxValue')}
						</label>
						<input
							type='number'
							value={options.max}
							onChange={(e) =>
								setOptions({
									...options,
									max: parseInt(e.target.value) || 0,
								})
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
							placeholder='100'
						/>
					</div>

					{/* Count */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.count')}
						</label>
						<input
							type='number'
							value={options.count}
							onChange={(e) =>
								setOptions({
									...options,
									count: parseInt(e.target.value) || 1,
								})
							}
							min='1'
							max={
								options.allowDuplicates
									? '1000'
									: options.max - options.min + 1
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
							placeholder='1'
						/>
					</div>
				</div>

				{/* Options */}
				<div className='flex flex-wrap gap-6 mt-6'>
					<label className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={options.allowDuplicates}
							onChange={(e) =>
								setOptions({
									...options,
									allowDuplicates: e.target.checked,
								})
							}
							className='rounded border-gray-300 text-green-600 focus:ring-green-500'
						/>
						<span className='text-sm text-gray-700'>
							{t('form.allowDuplicates')}
						</span>
					</label>

					<label className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={options.sort}
							onChange={(e) =>
								setOptions({
									...options,
									sort: e.target.checked,
								})
							}
							className='rounded border-gray-300 text-green-600 focus:ring-green-500'
						/>
						<span className='text-sm text-gray-700'>
							{t('form.sort')}
						</span>
					</label>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleGenerate}
						disabled={isGenerating}
						className='flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isGenerating ? (
							<>
								<RefreshCw className='h-5 w-5 animate-spin' />
								{t('form.generating')}
							</>
						) : (
							<>
								<Shuffle className='h-5 w-5' />
								{t('form.generate')}
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
			{generatedNumbers.length > 0 && (
				<div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
							<Dice1 className='h-5 w-5 text-green-500' />
							{t('results.title')}
						</h3>
						<div className='flex gap-2'>
							<button
								onClick={handleCopy}
								className='px-3 py-1 bg-white border border-green-300 text-green-700 rounded-lg text-sm hover:bg-green-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Copy className='h-4 w-4' />
								{t('results.copy')}
							</button>
							<button
								onClick={handleDownload}
								className='px-3 py-1 bg-white border border-green-300 text-green-700 rounded-lg text-sm hover:bg-green-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Download className='h-4 w-4' />
								{t('results.download')}
							</button>
						</div>
					</div>

					<div className='bg-white rounded-lg p-4 border border-green-100'>
						<div className='grid grid-cols-5 md:grid-cols-10 gap-2'>
							{generatedNumbers.map((number, index) => (
								<div
									key={index}
									className='bg-green-100 text-green-800 text-center py-2 px-3 rounded-lg font-mono text-sm'
								>
									{number}
								</div>
							))}
						</div>
					</div>

					<div className='mt-4 text-sm text-gray-600'>
						{t('results.summary', {
							count: generatedNumbers.length,
							min: Math.min(...generatedNumbers),
							max: Math.max(...generatedNumbers),
							sum: generatedNumbers.reduce((a, b) => a + b, 0),
						})}
					</div>

					{copied && (
						<div className='mt-4 text-center text-sm text-green-600'>
							{t('results.copied')}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
