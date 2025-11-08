'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Copy, Download, RefreshCw, Globe } from 'lucide-react';
import { generateFantasyWorld } from '@/lib/calculators/fantasy-world';

interface FantasyWorld {
	name: string;
	climate: string;
	culture: string;
	government: string;
	resources: string;
	conflict: string;
	legend: string;
}

/**
 * Fantasy World Calculator Component
 * 
 * A React component for generating fantasy world descriptions and settings.
 * 
 * Features:
 * - World type selection (fantasy, sci-fi, post-apocalyptic, etc.)
 * - Multiple world generation
 * - World attributes generation (climate, culture, government, resources, conflict, legend)
 * - Copy to clipboard
 * - Download as text
 * - Responsive design
 * 
 * Uses the fantasy world generation library from @/lib/calculators/fantasy-world
 * for world generation.
 */
export default function FantasyWorldCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.fantasyWorld');
	
	// Generator options
	const [worldType, setWorldType] = useState('fantasy'); // World type (fantasy, sci-fi, etc.)
	const [worldCount, setWorldCount] = useState(1); // Number of worlds to generate
	const [generatedWorlds, setGeneratedWorlds] = useState<FantasyWorld[]>([]); // Array of generated worlds
	const [isGenerating, setIsGenerating] = useState(false); // Generation state
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	// Debug logging
	useEffect(() => {
		console.log('🔍 DEBUG: Component render - state:', {
			worldType,
			worldCount,
			generatedWorlds: generatedWorlds.length,
			isGenerating,
			copied,
		});
	});

	useEffect(() => {
		console.log('🔍 DEBUG: Generated worlds changed:', generatedWorlds);
	}, [generatedWorlds]);

	useEffect(() => {
		console.log('🔍 DEBUG: Is generating changed:', isGenerating);
	}, [isGenerating]);

	useEffect(() => {
		console.log('🔍 DEBUG: Copied changed:', copied);
	}, [copied]);

	const handleGenerate = async () => {
		console.log('🔍 DEBUG: Generate button clicked');
		console.log('🔍 DEBUG: handleGenerate started');
		console.log(
			'🔍 DEBUG: worldType =',
			worldType,
			'worldCount =',
			worldCount
		);

		setIsGenerating(true);
		console.log('🔍 DEBUG: Setting isGenerating to true');

		// Add delay for animation
		console.log('🔍 DEBUG: Starting delay...');
		await new Promise((resolve) => setTimeout(resolve, 300));

		console.log('🔍 DEBUG: Delay completed');
		console.log('🔍 DEBUG: Starting world generation...');

		try {
			const worlds: FantasyWorld[] = [];
			for (let i = 0; i < worldCount; i++) {
				const world = generateFantasyWorld(worldType);
				worlds.push(world);
			}
			console.log('🔍 DEBUG: Worlds generated:', worlds);
			setGeneratedWorlds(worlds);
			console.log('🔍 DEBUG: Setting generated worlds');
		} catch (error) {
			console.error('🔍 DEBUG: Error generating worlds:', error);
		}

		setIsGenerating(false);
		console.log('🔍 DEBUG: Setting isGenerating to false');
		console.log('🔍 DEBUG: handleGenerate completed');
	};

	const handleCopy = async () => {
		console.log('🔍 DEBUG: Copy button clicked');
		console.log('🔍 DEBUG: handleCopy started');

		const text = generatedWorlds
			.map(
				(world, index) =>
					`${t('results.world')} ${index + 1}: ${world.name}\n` +
					`${t('results.climate')}: ${world.climate}\n` +
					`${t('results.culture')}: ${world.culture}\n` +
					`${t('results.government')}: ${world.government}\n` +
					`${t('results.resources')}: ${world.resources}\n` +
					`${t('results.conflict')}: ${world.conflict}\n` +
					`${t('results.legend')}: ${world.legend}\n`
			)
			.join('\n');

		console.log('🔍 DEBUG: Text to copy:', text);

		try {
			await navigator.clipboard.writeText(text);
			console.log('🔍 DEBUG: Text copied to clipboard');
			setCopied(true);
			console.log('🔍 DEBUG: Setting copied to true');
			setTimeout(() => {
				setCopied(false);
				console.log('🔍 DEBUG: Setting copied to false');
			}, 2000);
		} catch (error) {
			console.error('🔍 DEBUG: Error copying text:', error);
		}

		console.log('🔍 DEBUG: handleCopy completed');
	};

	const handleDownload = () => {
		console.log('🔍 DEBUG: Download button clicked');
		console.log('🔍 DEBUG: handleDownload started');

		const text = generatedWorlds
			.map(
				(world, index) =>
					`${t('results.world')} ${index + 1}: ${world.name}\n` +
					`${t('results.climate')}: ${world.climate}\n` +
					`${t('results.culture')}: ${world.culture}\n` +
					`${t('results.government')}: ${world.government}\n` +
					`${t('results.resources')}: ${world.resources}\n` +
					`${t('results.conflict')}: ${world.conflict}\n` +
					`${t('results.legend')}: ${world.legend}\n`
			)
			.join('\n');

		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `fantasy-worlds-${Date.now()}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		console.log('🔍 DEBUG: handleDownload completed');
	};

	const handleReset = () => {
		console.log('🔍 DEBUG: Reset button clicked');
		console.log('🔍 DEBUG: handleReset started');

		setGeneratedWorlds([]);
		setWorldType('fantasy');
		setWorldCount(1);
		setCopied(false);

		console.log('🔍 DEBUG: handleReset completed');
	};

	// Global error handling
	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			console.log('🔍 DEBUG: Global error caught:', event);
			console.log('🔍 DEBUG: Error message:', event.message);
			console.log('🔍 DEBUG: Error stack:', event.error?.stack);
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			console.log('🔍 DEBUG: Unhandled rejection caught:', event);
			console.log('🔍 DEBUG: Rejection reason:', event.reason);
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleUnhandledRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener(
				'unhandledrejection',
				handleUnhandledRejection
			);
		};
	}, []);

	return (
		<div className='max-w-4xl mx-auto'>
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<h1 className='text-3xl font-bold text-gray-800 mb-6'>
					{t('title')}
				</h1>
				<p className='text-gray-600 mb-8'>{t('description')}</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.worldType')}
						</label>
						<select
							value={worldType}
							onChange={(e) => setWorldType(e.target.value)}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='fantasy'>
								{t('form.types.fantasy')}
							</option>
							<option value='scifi'>
								{t('form.types.scifi')}
							</option>
							<option value='steampunk'>
								{t('form.types.steampunk')}
							</option>
							<option value='postapocalyptic'>
								{t('form.types.postapocalyptic')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.worldCount')}
						</label>
						<select
							value={worldCount}
							onChange={(e) => setWorldCount(Number(e.target.value))}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 mb-6'>
					<button
						key='generate-button'
						onClick={handleGenerate}
						disabled={isGenerating}
						className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
					>
						{isGenerating && (
							<RefreshCw
								key='spinner'
								className='w-5 h-5 animate-spin'
							/>
						)}
						{!isGenerating && (
							<Sparkles
								key='sparkles'
								className='w-5 h-5'
							/>
						)}
						<span key='button-text'>
							{isGenerating
								? t('form.generating')
								: t('form.generate')}
						</span>
					</button>

					{generatedWorlds.length > 0 && (
						<button
							key='reset-button'
							onClick={handleReset}
							className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors'
						>
							{t('form.reset')}
						</button>
					)}
				</div>

				{/* Results Section - Always rendered */}
				<div key='results-section' className='mt-8'>
					{generatedWorlds.length > 0 ? (
						<div key='worlds-content' className='space-y-4'>
							<div className='flex flex-col sm:flex-row gap-4 mb-6'>
								<button
									key='copy-button'
									onClick={handleCopy}
									className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
								>
									<Copy className='w-4 h-4' />
									{copied
										? t('results.copied')
										: t('results.copy')}
								</button>

								<button
									key='download-button'
									onClick={handleDownload}
									className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
								>
									<Download className='w-4 h-4' />
									{t('results.download')}
								</button>
							</div>

							<div className='space-y-6'>
								{generatedWorlds.map((world, index) => (
									<div
										key={`world-${index}`}
										className='bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
									>
										<div className='flex items-center gap-3 mb-4'>
											<Globe className='w-6 h-6 text-blue-600' />
											<h3 className='text-xl font-semibold text-gray-800'>
												{world.name}
											</h3>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													🌦️ {t('results.climate')}
												</h4>
												<p className='text-gray-600'>
													{world.climate}
												</p>
											</div>

											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													🏛️ {t('results.culture')}
												</h4>
												<p className='text-gray-600'>
													{world.culture}
												</p>
											</div>

											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													👑 {t('results.government')}
												</h4>
												<p className='text-gray-600'>
													{world.government}
												</p>
											</div>

											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													💎 {t('results.resources')}
												</h4>
												<p className='text-gray-600'>
													{world.resources}
												</p>
											</div>

											<div className='md:col-span-2'>
												<h4 className='font-medium text-gray-700 mb-2'>
													⚔️ {t('results.conflict')}
												</h4>
												<p className='text-gray-600'>
													{world.conflict}
												</p>
											</div>

											<div className='md:col-span-2'>
												<h4 className='font-medium text-gray-700 mb-2'>
													🌠 {t('results.legend')}
												</h4>
												<p className='text-gray-600'>
													{world.legend}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

							{copied && (
								<div
									key='copied-message'
									className='text-center text-green-600 font-medium'
								>
									{t('results.copiedMessage')}
								</div>
							)}
						</div>
					) : (
						<div
							key='placeholder-content'
							className='text-center py-12 text-gray-500'
						>
							<Globe className='w-12 h-12 mx-auto mb-4 text-gray-300' />
							<p className='text-lg'>
								{t('results.placeholder')}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
