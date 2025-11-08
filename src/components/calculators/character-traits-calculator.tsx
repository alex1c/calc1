'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Sparkles, Copy, Download, RefreshCw, User } from 'lucide-react';
import { generateCharacter } from '@/lib/calculators/character-traits';

interface Character {
	name: string;
	age: string;
	personality: string;
	strengths: string[];
	weaknesses: string[];
	profession: string;
	backstory: string;
}

/**
 * Character Traits Calculator Component
 * 
 * A React component for generating fictional character traits and descriptions.
 * 
 * Features:
 * - Gender selection (male, female, any)
 * - Character type selection (realistic, fantasy, sci-fi)
 * - Age group selection (child, teen, adult, elder)
 * - Multiple character generation
 * - Character traits generation (personality, strengths, weaknesses)
 * - Profession and backstory generation
 * - Copy to clipboard
 * - Download as text
 * - Responsive design
 * 
 * Uses the character traits generation library from @/lib/calculators/character-traits
 * for character generation.
 */
export default function CharacterTraitsCalculator() {
	// Internationalization hooks for translations
	const t = useTranslations('calculators.characterTraits');
	const locale = useLocale(); // Current locale for character name generation
	
	// Generator options
	const [gender, setGender] = useState('any'); // Character gender (male, female, any)
	const [characterType, setCharacterType] = useState('realistic'); // Character type (realistic, fantasy, sci-fi)
	const [ageGroup, setAgeGroup] = useState('adult'); // Age group (child, teen, adult, elder)
	const [characterCount, setCharacterCount] = useState(1); // Number of characters to generate
	const [generatedCharacters, setGeneratedCharacters] = useState<Character[]>(
		[] // Array of generated characters
	);
	const [isGenerating, setIsGenerating] = useState(false); // Generation state
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	const handleGenerate = async () => {
		setIsGenerating(true);

		// Add delay for animation
		await new Promise((resolve) => setTimeout(resolve, 300));

		try {
			const characters: Character[] = [];
			for (let i = 0; i < characterCount; i++) {
				const character = generateCharacter(
					gender,
					characterType,
					ageGroup,
					locale
				);
				characters.push(character);
			}
			setGeneratedCharacters(characters);
		} catch (error) {
			console.error('Error generating characters:', error);
		}

		setIsGenerating(false);
	};

	const handleCopy = async () => {
		const text = generatedCharacters
			.map(
				(char, index) =>
					`${t('results.character')} ${index + 1}:\n` +
					`${t('results.name')}: ${char.name}\n` +
					`${t('results.age')}: ${char.age}\n` +
					`${t('results.personality')}: ${char.personality}\n` +
					`${t('results.strengths')}: ${char.strengths.join(
						', '
					)}\n` +
					`${t('results.weaknesses')}: ${char.weaknesses.join(
						', '
					)}\n` +
					`${t('results.profession')}: ${char.profession}\n` +
					`${t('results.backstory')}: ${char.backstory}\n`
			)
			.join('\n');

		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (error) {
			console.error('Error copying text:', error);
		}
	};

	const handleDownload = () => {
		const text = generatedCharacters
			.map(
				(char, index) =>
					`${t('results.character')} ${index + 1}:\n` +
					`${t('results.name')}: ${char.name}\n` +
					`${t('results.age')}: ${char.age}\n` +
					`${t('results.personality')}: ${char.personality}\n` +
					`${t('results.strengths')}: ${char.strengths.join(
						', '
					)}\n` +
					`${t('results.weaknesses')}: ${char.weaknesses.join(
						', '
					)}\n` +
					`${t('results.profession')}: ${char.profession}\n` +
					`${t('results.backstory')}: ${char.backstory}\n`
			)
			.join('\n');

		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `character-traits-${Date.now()}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleReset = () => {
		setGeneratedCharacters([]);
		setGender('any');
		setCharacterType('realistic');
		setAgeGroup('adult');
		setCharacterCount(1);
		setCopied(false);
	};

	// Global error handling
	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			console.error('Global error:', event.message, event.error);
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			console.error('Unhandled rejection:', event.reason);
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
							{t('form.gender')}
						</label>
						<select
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='any'>{t('form.genders.any')}</option>
							<option value='male'>
								{t('form.genders.male')}
							</option>
							<option value='female'>
								{t('form.genders.female')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.characterType')}
						</label>
						<select
							value={characterType}
							onChange={(e) => setCharacterType(e.target.value)}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='realistic'>
								{t('form.types.realistic')}
							</option>
							<option value='fantasy'>
								{t('form.types.fantasy')}
							</option>
							<option value='scifi'>
								{t('form.types.scifi')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.ageGroup')}
						</label>
						<select
							value={ageGroup}
							onChange={(e) => setAgeGroup(e.target.value)}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value='child'>
								{t('form.ages.child')}
							</option>
							<option value='teen'>{t('form.ages.teen')}</option>
							<option value='adult'>
								{t('form.ages.adult')}
							</option>
							<option value='elderly'>
								{t('form.ages.elderly')}
							</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.characterCount')}
						</label>
						<select
							value={characterCount}
							onChange={(e) =>
								setCharacterCount(Number(e.target.value))
							}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={5}>5</option>
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

					{generatedCharacters.length > 0 && (
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
				<div
					key='results-section'
					className='mt-8'
				>
					{generatedCharacters.length > 0 ? (
						<div
							key='characters-content'
							className='space-y-4'
						>
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
								{generatedCharacters.map((character, index) => (
									<div
										key={`character-${index}`}
										className='bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
									>
										<div className='flex items-center gap-3 mb-4'>
											<User className='w-6 h-6 text-blue-600' />
											<h3 className='text-xl font-semibold text-gray-800'>
												{character.name}
											</h3>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													{t('results.age')}
												</h4>
												<p className='text-gray-600'>
													{character.age}
												</p>
											</div>

											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													{t('results.profession')}
												</h4>
												<p className='text-gray-600'>
													{character.profession}
												</p>
											</div>

											<div className='md:col-span-2'>
												<h4 className='font-medium text-gray-700 mb-2'>
													{t('results.personality')}
												</h4>
												<p className='text-gray-600'>
													{character.personality}
												</p>
											</div>

											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													{t('results.strengths')}
												</h4>
												<ul className='text-gray-600 space-y-1'>
													{character.strengths.map(
														(strength, i) => (
															<li
																key={i}
																className='flex items-center'
															>
																<span className='text-green-500 mr-2'>
																	✓
																</span>
																{strength}
															</li>
														)
													)}
												</ul>
											</div>

											<div>
												<h4 className='font-medium text-gray-700 mb-2'>
													{t('results.weaknesses')}
												</h4>
												<ul className='text-gray-600 space-y-1'>
													{character.weaknesses.map(
														(weakness, i) => (
															<li
																key={i}
																className='flex items-center'
															>
																<span className='text-red-500 mr-2'>
																	⚠
																</span>
																{weakness}
															</li>
														)
													)}
												</ul>
											</div>

											<div className='md:col-span-2'>
												<h4 className='font-medium text-gray-700 mb-2'>
													{t('results.backstory')}
												</h4>
												<p className='text-gray-600'>
													{character.backstory}
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
							<User className='w-12 h-12 mx-auto mb-4 text-gray-300' />
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
