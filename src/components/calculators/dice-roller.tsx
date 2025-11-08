'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Dice1, RefreshCw, Copy, Download, RotateCcw } from 'lucide-react';

interface DiceResult {
	value: number;
	id: string;
}

interface RollHistory {
	rolls: DiceResult[];
	total: number;
	timestamp: Date;
}

/**
 * Dice Roller Component
 * 
 * A React component for rolling dice with customizable options.
 * 
 * Features:
 * - Multiple dice support (1-10 dice)
 * - Customizable dice types (d4, d6, d8, d10, d12, d20, d100)
 * - Roll history tracking
 * - Copy results to clipboard
 * - Download history as CSV
 * - Animated rolling effect
 * - Responsive design
 * 
 * Uses inline random number generation for dice rolling.
 */
export default function DiceRoller() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.diceRoller');
	
	// State management
	const [diceCount, setDiceCount] = useState(1); // Number of dice to roll (1-10)
	const [diceType, setDiceType] = useState(6); // Dice type (4, 6, 8, 10, 12, 20, 100)
	const [results, setResults] = useState<DiceResult[]>([]); // Current roll results
	const [isRolling, setIsRolling] = useState(false); // Rolling animation state
	const [history, setHistory] = useState<RollHistory[]>([]); // Roll history
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	const rollDice = (): DiceResult[] => {
		const newResults: DiceResult[] = [];
		for (let i = 0; i < diceCount; i++) {
			const value = Math.floor(Math.random() * diceType) + 1;
			newResults.push({
				value,
				id: `${Date.now()}-${i}`,
			});
		}
		return newResults;
	};

	const handleRoll = async () => {
		if (diceCount < 1 || diceCount > 10) {
			alert(t('errors.invalidDiceCount'));
			return;
		}

		setIsRolling(true);

		// Roll dice immediately
		const newResults = rollDice();

		// Add a small delay for UI feedback, but not too long
		await new Promise((resolve) => setTimeout(resolve, 300));

		setResults(newResults);

		// Add to history
		const total = newResults.reduce((sum, dice) => sum + dice.value, 0);
		const newHistory = {
			rolls: newResults,
			total,
			timestamp: new Date(),
		};
		setHistory((prev) => [newHistory, ...prev.slice(0, 9)]); // Keep last 10 rolls

		setIsRolling(false);
	};

	const handleCopy = async () => {
		if (results.length === 0) return;

		const total = results.reduce((sum, dice) => sum + dice.value, 0);
		const text = `${t('results.rollResult')}: ${results
			.map((d) => d.value)
			.join(', ')} = ${total}`;

		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		if (history.length === 0) return;

		const content = history
			.map((roll, index) => {
				const diceValues = roll.rolls.map((d) => d.value).join(', ');
				return `${t('results.roll')} ${index + 1}: ${diceValues} = ${
					roll.total
				}`;
			})
			.join('\n');

		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'dice-rolls.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleClearHistory = () => {
		setHistory([]);
		setResults([]);
	};

	const getDiceEmoji = (value: number) => {
		const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
		return diceEmojis[value - 1] || '🎲';
	};

	const getDiceColor = (value: number) => {
		const colors = [
			'bg-red-100 text-red-800',
			'bg-orange-100 text-orange-800',
			'bg-yellow-100 text-yellow-800',
			'bg-green-100 text-green-800',
			'bg-blue-100 text-blue-800',
			'bg-purple-100 text-purple-800',
		];
		return colors[(value - 1) % colors.length];
	};

	const total = results.reduce((sum, dice) => sum + dice.value, 0);

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-orange-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Dice1 className='h-8 w-8 text-orange-500' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Dice count */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.diceCount')}: {diceCount}
						</label>
						<input
							type='range'
							min='1'
							max='10'
							value={diceCount}
							onChange={(e) =>
								setDiceCount(parseInt(e.target.value))
							}
							className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
						/>
						<div className='flex justify-between text-xs text-gray-500'>
							<span>1</span>
							<span>10</span>
						</div>
					</div>

					{/* Dice type */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.diceType')}
						</label>
						<select
							value={diceType}
							onChange={(e) =>
								setDiceType(parseInt(e.target.value))
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
						>
							<option value={4}>D4 (1-4)</option>
							<option value={6}>D6 (1-6)</option>
							<option value={8}>D8 (1-8)</option>
							<option value={10}>D10 (1-10)</option>
							<option value={12}>D12 (1-12)</option>
							<option value={20}>D20 (1-20)</option>
							<option value={100}>D100 (1-100)</option>
						</select>
					</div>
				</div>

				{/* Roll button */}
				<div className='mt-6'>
					<button
						key='roll-button'
						onClick={handleRoll}
						disabled={isRolling}
						className='w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isRolling && (
							<RefreshCw key='spinner' className='h-5 w-5 animate-spin' />
						)}
						{!isRolling && (
							<Dice1 key='dice-icon' className='h-5 w-5' />
						)}
						<span key='button-text'>
							{isRolling ? t('form.rolling') : t('form.roll')}
						</span>
					</button>
				</div>
			</div>

			{/* Results */}
			<div key='results-section' className='bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 mb-6'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
						<Dice1 className='h-5 w-5 text-orange-500' />
						{t('results.title')}
					</h3>
					{results.length > 0 && (
						<div className='flex gap-2'>
							<button
								key='copy-button'
								onClick={handleCopy}
								className='px-3 py-1 bg-white border border-orange-300 text-orange-700 rounded-lg text-sm hover:bg-orange-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Copy className='h-4 w-4' />
								{t('results.copy')}
							</button>
						</div>
					)}
				</div>

				{results.length > 0 ? (
					<div key='dice-content'>
						<div className='flex flex-wrap justify-center gap-4 mb-4'>
							{results.map((dice, index) => (
								<div
									key={dice.id}
									className={`w-16 h-16 rounded-lg border-2 border-orange-200 flex items-center justify-center text-2xl font-bold ${getDiceColor(
										dice.value
									)}`}
								>
									{diceType <= 6
										? getDiceEmoji(dice.value)
										: dice.value}
								</div>
							))}
						</div>

						<div className='text-center'>
							<div className='text-2xl font-bold text-gray-900 mb-2'>
								{t('results.total')}: {total}
							</div>
							<div className='text-sm text-gray-600'>
								{t('results.average')}:{' '}
								{(total / results.length).toFixed(1)}
							</div>
						</div>

						{copied && (
							<div key='copied-message' className='mt-4 text-center text-sm text-green-600'>
								{t('results.copied')}
							</div>
						)}
					</div>
				) : (
					<div key='placeholder-content' className='text-center py-8'>
						<p className='text-gray-500 text-lg'>
							{t('results.placeholder')}
						</p>
					</div>
				)}
			</div>

			{/* History */}
			{history.length > 0 && (
				<div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
							<RotateCcw className='h-5 w-5 text-gray-500' />
							{t('history.title')}
						</h3>
						<div className='flex gap-2'>
							<button
								onClick={handleDownload}
								className='px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Download className='h-4 w-4' />
								{t('history.download')}
							</button>
							<button
								onClick={handleClearHistory}
								className='px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200'
							>
								{t('history.clear')}
							</button>
						</div>
					</div>

					<div className='space-y-2 max-h-60 overflow-y-auto'>
						{history.map((roll, index) => (
							<div
								key={index}
								className='bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between'
							>
								<div className='flex items-center gap-2'>
									<span className='text-sm text-gray-500'>
										#{index + 1}
									</span>
									<div className='flex gap-1'>
										{roll.rolls.map((dice, diceIndex) => (
											<span
												key={diceIndex}
												className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${getDiceColor(
													dice.value
												)}`}
											>
												{diceType <= 6
													? getDiceEmoji(dice.value)
													: dice.value}
											</span>
										))}
									</div>
								</div>
								<div className='text-sm font-semibold text-gray-900'>
									= {roll.total}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
