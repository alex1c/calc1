'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Coins, RotateCcw, Copy, RefreshCw } from 'lucide-react';

type CoinStyle = 'classic' | 'gold' | 'emoji';
type CoinResult = 'heads' | 'tails';

interface FlipResult {
	result: CoinResult;
	style: CoinStyle;
	flipCount: number;
	headsCount: number;
	tailsCount: number;
}

/**
 * Coin Flipper Component
 * 
 * A React component for flipping coins with statistics tracking.
 * 
 * Features:
 * - Random coin flip (heads/tails)
 * - Multiple coin styles (classic, gold, emoji)
 * - Flip history tracking
 * - Statistics (total flips, heads count, tails count)
 * - Copy results to clipboard
 * - Animated flipping effect
 * - Responsive design
 * 
 * Uses Math.random() for coin flip generation.
 */
export default function CoinFlipper() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.coinFlipper');
	
	// State management
	const [isFlipping, setIsFlipping] = useState(false); // Flipping animation state
	const [result, setResult] = useState<FlipResult | null>(null); // Current flip result
	const [coinStyle, setCoinStyle] = useState<CoinStyle>('classic'); // Coin visual style
	const [flipHistory, setFlipHistory] = useState<FlipResult[]>([]); // Flip history
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	// Coin flip animation and result
	const flipCoin = async () => {
		setIsFlipping(true);
		setResult(null);

		// Generate random result immediately
		const coinResult: CoinResult = Math.random() < 0.5 ? 'heads' : 'tails';

		// Calculate statistics
		const newFlip: FlipResult = {
			result: coinResult,
			style: coinStyle,
			flipCount: flipHistory.length + 1,
			headsCount:
				flipHistory.filter((f) => f.result === 'heads').length +
				(coinResult === 'heads' ? 1 : 0),
			tailsCount:
				flipHistory.filter((f) => f.result === 'tails').length +
				(coinResult === 'tails' ? 1 : 0),
		};

		// Add a small delay for UI feedback, but not too long
		await new Promise((resolve) => setTimeout(resolve, 300));

		setResult(newFlip);
		setFlipHistory((prev) => [...prev, newFlip]);
		setIsFlipping(false);
	};

	const resetHistory = () => {
		setFlipHistory([]);
		setResult(null);
		setCopied(false);
	};

	const handleCopy = async () => {
		if (!result) return;

		const text = `${t('results.copyText', {
			result: t(`results.${result.result}`),
			style: t(`styles.${coinStyle}`),
			flipCount: result.flipCount,
			headsCount: result.headsCount,
			tailsCount: result.tailsCount,
		})}`;

		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const getCoinIcon = (style: CoinStyle, result: CoinResult) => {
		switch (style) {
			case 'emoji':
				return result === 'heads' ? '🪙' : '🪙';
			case 'gold':
				return result === 'heads' ? '🟡' : '🟡';
			default:
				return result === 'heads' ? '🪙' : '🪙';
		}
	};

	const getCoinColor = (style: CoinStyle) => {
		switch (style) {
			case 'gold':
				return 'from-yellow-400 to-yellow-600';
			case 'emoji':
				return 'from-gray-300 to-gray-500';
			default:
				return 'from-amber-400 to-amber-600';
		}
	};

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-yellow-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Coins className='h-8 w-8 text-yellow-500' />
					{t('form.title')}
				</h2>

				{/* Coin Style Selection */}
				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700 mb-3'>
						{t('form.coinStyle')}
					</label>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
						{(['classic', 'gold', 'emoji'] as CoinStyle[]).map(
							(style) => (
								<button
									key={style}
									onClick={() => setCoinStyle(style)}
									disabled={isFlipping}
									className={`p-3 rounded-lg border-2 transition-all duration-200 ${
										coinStyle === style
											? 'border-yellow-500 bg-yellow-50 text-yellow-700'
											: 'border-gray-200 hover:border-yellow-300 text-gray-700'
									} ${
										isFlipping
											? 'opacity-50 cursor-not-allowed'
											: ''
									}`}
								>
									<div className='text-2xl mb-1'>
										{getCoinIcon(style, 'heads')}
									</div>
									<div className='text-sm font-medium'>
										{t(`styles.${style}`)}
									</div>
								</button>
							)
						)}
					</div>
				</div>

				{/* Flip Button */}
				<div className='text-center'>
					<button
						key='flip-button'
						onClick={flipCoin}
						disabled={isFlipping}
						className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 mx-auto'
					>
						{isFlipping && (
							<RefreshCw key='spinner' className='h-6 w-6 animate-spin' />
						)}
						{!isFlipping && (
							<Coins key='coins-icon' className='h-6 w-6' />
						)}
						<span key='button-text'>
							{isFlipping ? t('form.flipping') : t('form.flip')}
						</span>
					</button>
				</div>
			</div>

			{/* Results */}
			<div key='results-section' className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200'>
				<h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
					<Coins className='h-6 w-6 text-yellow-500' />
					{t('results.title')}
				</h3>

				{result ? (
					<div key='coin-content'>
						{/* Coin Display */}
						<div className='text-center mb-6'>
							<div
								className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${getCoinColor(
									result.style
								)} rounded-full mb-4 shadow-lg ${
									isFlipping ? 'animate-spin' : ''
								}`}
							>
								<span className='text-4xl'>
									{getCoinIcon(result.style, result.result)}
								</span>
							</div>
							<h4 className='text-2xl font-bold text-gray-900 mb-2'>
								{t(`results.${result.result}`)}
							</h4>
							<p className='text-gray-600'>
								{t('results.description', {
									style: t(`styles.${result.style}`),
								})}
							</p>
						</div>

						{/* Statistics */}
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
							<div className='bg-white rounded-lg p-4 text-center'>
								<div className='text-2xl font-bold text-yellow-600'>
									{result.flipCount}
								</div>
								<div className='text-sm text-gray-600'>
									{t('results.totalFlips')}
								</div>
							</div>
							<div className='bg-white rounded-lg p-4 text-center'>
								<div className='text-2xl font-bold text-green-600'>
									{result.headsCount}
								</div>
								<div className='text-sm text-gray-600'>
									{t('results.headsCount')}
								</div>
							</div>
							<div className='bg-white rounded-lg p-4 text-center'>
								<div className='text-2xl font-bold text-blue-600'>
									{result.tailsCount}
								</div>
								<div className='text-sm text-gray-600'>
									{t('results.tailsCount')}
								</div>
							</div>
						</div>

						{/* Action buttons */}
						<div className='flex flex-col sm:flex-row gap-3'>
							<button
								key='copy-button'
								onClick={handleCopy}
								className='flex-1 bg-white border border-yellow-300 text-yellow-700 px-4 py-2 rounded-lg font-medium hover:bg-yellow-50 transition-colors duration-200 flex items-center justify-center gap-2'
							>
								<Copy className='h-4 w-4' />
								{copied ? t('results.copied') : t('results.copy')}
							</button>
							<button
								key='reset-button'
								onClick={resetHistory}
								className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2'
							>
								<RotateCcw className='h-4 w-4' />
								{t('results.reset')}
							</button>
						</div>
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
			{flipHistory.length > 0 && (
				<div className='mt-6'>
					<h4 className='text-lg font-semibold text-gray-900 mb-3'>
						{t('history.title')}
					</h4>
					<div className='bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto'>
						<div className='flex flex-wrap gap-2'>
							{flipHistory.map((flip, index) => (
								<div
									key={index}
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										flip.result === 'heads'
											? 'bg-green-100 text-green-800'
											: 'bg-blue-100 text-blue-800'
									}`}
								>
									#{flip.flipCount}:{' '}
									{t(`results.${flip.result}`)}
								</div>
							))}
						</div>
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
