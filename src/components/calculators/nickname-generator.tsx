'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { User, Copy, RefreshCw, Sparkles, Download } from 'lucide-react';

interface NicknameOptions {
	theme: string;
	style: string;
	length: string;
	includeNumbers: boolean;
	includeSymbols: boolean;
}

export default function NicknameGenerator() {
	const t = useTranslations('calculators.nicknameGenerator');
	const [options, setOptions] = useState<NicknameOptions>({
		theme: 'gaming',
		style: 'cool',
		length: 'medium',
		includeNumbers: true,
		includeSymbols: false,
	});
	const [generatedNicknames, setGeneratedNicknames] = useState<string[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [copied, setCopied] = useState(false);

	// Nickname generation data
	const nicknameData = {
		themes: {
			gaming: {
				prefixes: [
					'Shadow',
					'Dark',
					'Fire',
					'Ice',
					'Storm',
					'Thunder',
					'Lightning',
					'Mystic',
					'Cyber',
					'Neon',
				],
				suffixes: [
					'Warrior',
					'Hunter',
					'Master',
					'Lord',
					'King',
					'Queen',
					'Legend',
					'Hero',
					'Ninja',
					'Samurai',
				],
				words: [
					'Dragon',
					'Phoenix',
					'Tiger',
					'Wolf',
					'Eagle',
					'Falcon',
					'Lion',
					'Bear',
					'Shark',
					'Viper',
				],
			},
			fantasy: {
				prefixes: [
					'Elven',
					'Dwarven',
					'Mystic',
					'Ancient',
					'Crystal',
					'Golden',
					'Silver',
					'Moon',
					'Star',
					'Sun',
				],
				suffixes: [
					'Mage',
					'Wizard',
					'Sorcerer',
					'Enchanter',
					'Knight',
					'Paladin',
					'Ranger',
					'Bard',
					'Druid',
					'Cleric',
				],
				words: [
					'Dragon',
					'Phoenix',
					'Unicorn',
					'Griffin',
					'Pegasus',
					'Basilisk',
					'Hydra',
					'Chimera',
					'Sphinx',
					'Golem',
				],
			},
			tech: {
				prefixes: [
					'Cyber',
					'Neo',
					'Quantum',
					'Digital',
					'Virtual',
					'Binary',
					'Code',
					'Data',
					'Pixel',
					'Matrix',
				],
				suffixes: [
					'Hacker',
					'Coder',
					'Dev',
					'Engineer',
					'Architect',
					'Builder',
					'Creator',
					'Designer',
					'Analyst',
					'Expert',
				],
				words: [
					'Byte',
					'Bit',
					'Node',
					'Core',
					'System',
					'Network',
					'Cloud',
					'Server',
					'Database',
					'Algorithm',
				],
			},
			cute: {
				prefixes: [
					'Sweet',
					'Cute',
					'Little',
					'Tiny',
					'Baby',
					'Honey',
					'Sugar',
					'Candy',
					'Fluffy',
					'Soft',
				],
				suffixes: [
					'Bunny',
					'Kitten',
					'Puppy',
					'Duckling',
					'Chick',
					'Cub',
					'Fawn',
					'Lamb',
					'Piglet',
					'Fawn',
				],
				words: [
					'Rainbow',
					'Star',
					'Heart',
					'Flower',
					'Butterfly',
					'Daisy',
					'Rose',
					'Sunshine',
					'Moonbeam',
					'Sparkle',
				],
			},
			professional: {
				prefixes: [
					'Pro',
					'Elite',
					'Prime',
					'Ultra',
					'Max',
					'Super',
					'Ultra',
					'Mega',
					'Grand',
					'Royal',
				],
				suffixes: [
					'Expert',
					'Master',
					'Specialist',
					'Professional',
					'Consultant',
					'Advisor',
					'Manager',
					'Director',
					'Executive',
					'Leader',
				],
				words: [
					'Strategy',
					'Innovation',
					'Excellence',
					'Success',
					'Achievement',
					'Performance',
					'Quality',
					'Precision',
					'Efficiency',
					'Results',
				],
			},
		},
		styles: {
			cool: ['X', 'Z', 'V', 'K', 'Q'],
			edgy: ['X', 'Z', 'V', 'K', 'Q', 'Dark', 'Shadow', 'Night', 'Storm'],
			modern: ['Pro', 'Max', 'Plus', 'Ultra', 'Elite'],
			classic: ['Mr', 'Ms', 'Sir', 'Lady', 'Master'],
			creative: ['The', 'Of', 'And', 'Or', 'With'],
		},
		numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
		symbols: ['_', '-', '.', '!', '@', '#', '$', '%', '&', '*'],
	};

	const generateNickname = (): string => {
		const theme =
			nicknameData.themes[
				options.theme as keyof typeof nicknameData.themes
			];
		const style =
			nicknameData.styles[
				options.style as keyof typeof nicknameData.styles
			];

		let nickname = '';

		// Choose generation pattern
		const patterns = [
			// Prefix + Word + Suffix
			() => {
				const prefix =
					theme.prefixes[
						Math.floor(Math.random() * theme.prefixes.length)
					];
				const word =
					theme.words[Math.floor(Math.random() * theme.words.length)];
				const suffix =
					theme.suffixes[
						Math.floor(Math.random() * theme.suffixes.length)
					];
				return `${prefix}${word}${suffix}`;
			},
			// Style + Word + Number
			() => {
				const styleWord =
					style[Math.floor(Math.random() * style.length)];
				const word =
					theme.words[Math.floor(Math.random() * theme.words.length)];
				const number = options.includeNumbers
					? nicknameData.numbers[
							Math.floor(
								Math.random() * nicknameData.numbers.length
							)
					  ]
					: '';
				return `${styleWord}${word}${number}`;
			},
			// Word + Word
			() => {
				const word1 =
					theme.words[Math.floor(Math.random() * theme.words.length)];
				const word2 =
					theme.words[Math.floor(Math.random() * theme.words.length)];
				return `${word1}${word2}`;
			},
			// Prefix + Word
			() => {
				const prefix =
					theme.prefixes[
						Math.floor(Math.random() * theme.prefixes.length)
					];
				const word =
					theme.words[Math.floor(Math.random() * theme.words.length)];
				return `${prefix}${word}`;
			},
			// Word + Suffix
			() => {
				const word =
					theme.words[Math.floor(Math.random() * theme.words.length)];
				const suffix =
					theme.suffixes[
						Math.floor(Math.random() * theme.suffixes.length)
					];
				return `${word}${suffix}`;
			},
		];

		// Select random pattern
		const pattern = patterns[Math.floor(Math.random() * patterns.length)];
		nickname = pattern();

		// Add numbers if enabled
		if (options.includeNumbers && Math.random() > 0.5) {
			const number =
				nicknameData.numbers[
					Math.floor(Math.random() * nicknameData.numbers.length)
				];
			nickname += number;
		}

		// Add symbols if enabled
		if (options.includeSymbols && Math.random() > 0.7) {
			const symbol =
				nicknameData.symbols[
					Math.floor(Math.random() * nicknameData.symbols.length)
				];
			nickname += symbol;
		}

		// Adjust length
		if (options.length === 'short' && nickname.length > 8) {
			nickname = nickname.substring(0, 8);
		} else if (options.length === 'long' && nickname.length < 12) {
			const extraWord =
				theme.words[Math.floor(Math.random() * theme.words.length)];
			nickname += extraWord;
		}

		return nickname;
	};

	const handleGenerate = async () => {
		setIsGenerating(true);

		// Add some delay for animation effect
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const newNicknames: string[] = [];
		for (let i = 0; i < 10; i++) {
			newNicknames.push(generateNickname());
		}

		setGeneratedNicknames(newNicknames);
		setIsGenerating(false);
	};

	const handleCopy = async (nickname: string) => {
		await navigator.clipboard.writeText(nickname);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleCopyAll = async () => {
		const allNicknames = generatedNicknames.join('\n');
		await navigator.clipboard.writeText(allNicknames);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const content = generatedNicknames.join('\n');
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'nicknames.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-purple-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<User className='h-8 w-8 text-purple-500' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{/* Theme */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.theme')}
						</label>
						<select
							value={options.theme}
							onChange={(e) =>
								setOptions({
									...options,
									theme: e.target.value,
								})
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						>
							<option value='gaming'>
								{t('form.themes.gaming')}
							</option>
							<option value='fantasy'>
								{t('form.themes.fantasy')}
							</option>
							<option value='tech'>
								{t('form.themes.tech')}
							</option>
							<option value='cute'>
								{t('form.themes.cute')}
							</option>
							<option value='professional'>
								{t('form.themes.professional')}
							</option>
						</select>
					</div>

					{/* Style */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.style')}
						</label>
						<select
							value={options.style}
							onChange={(e) =>
								setOptions({
									...options,
									style: e.target.value,
								})
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						>
							<option value='cool'>
								{t('form.styles.cool')}
							</option>
							<option value='edgy'>
								{t('form.styles.edgy')}
							</option>
							<option value='modern'>
								{t('form.styles.modern')}
							</option>
							<option value='classic'>
								{t('form.styles.classic')}
							</option>
							<option value='creative'>
								{t('form.styles.creative')}
							</option>
						</select>
					</div>

					{/* Length */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.length')}
						</label>
						<select
							value={options.length}
							onChange={(e) =>
								setOptions({
									...options,
									length: e.target.value,
								})
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						>
							<option value='short'>
								{t('form.lengths.short')}
							</option>
							<option value='medium'>
								{t('form.lengths.medium')}
							</option>
							<option value='long'>
								{t('form.lengths.long')}
							</option>
						</select>
					</div>
				</div>

				{/* Options */}
				<div className='flex flex-wrap gap-6 mt-6'>
					<label className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={options.includeNumbers}
							onChange={(e) =>
								setOptions({
									...options,
									includeNumbers: e.target.checked,
								})
							}
							className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
						/>
						<span className='text-sm text-gray-700'>
							{t('form.includeNumbers')}
						</span>
					</label>

					<label className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={options.includeSymbols}
							onChange={(e) =>
								setOptions({
									...options,
									includeSymbols: e.target.checked,
								})
							}
							className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
						/>
						<span className='text-sm text-gray-700'>
							{t('form.includeSymbols')}
						</span>
					</label>
				</div>

				{/* Generate button */}
				<div className='mt-6'>
					<button
						onClick={handleGenerate}
						disabled={isGenerating}
						className='w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isGenerating ? (
							<>
								<RefreshCw className='h-5 w-5 animate-spin' />
								{t('form.generating')}
							</>
						) : (
							<>
								<Sparkles className='h-5 w-5' />
								{t('form.generate')}
							</>
						)}
					</button>
				</div>
			</div>

			{/* Results */}
			{generatedNicknames.length > 0 && (
				<div className='bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
							<User className='h-5 w-5 text-purple-500' />
							{t('results.title')}
						</h3>
						<div className='flex gap-2'>
							<button
								onClick={handleCopyAll}
								className='px-3 py-1 bg-white border border-purple-300 text-purple-700 rounded-lg text-sm hover:bg-purple-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Copy className='h-4 w-4' />
								{t('results.copyAll')}
							</button>
							<button
								onClick={handleDownload}
								className='px-3 py-1 bg-white border border-purple-300 text-purple-700 rounded-lg text-sm hover:bg-purple-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Download className='h-4 w-4' />
								{t('results.download')}
							</button>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{generatedNicknames.map((nickname, index) => (
							<div
								key={index}
								className='bg-white rounded-lg p-3 border border-purple-100 flex items-center justify-between hover:shadow-md transition-shadow'
							>
								<span className='font-mono text-gray-800'>
									{nickname}
								</span>
								<button
									onClick={() => handleCopy(nickname)}
									className='p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors duration-200'
								>
									<Copy className='h-4 w-4' />
								</button>
							</div>
						))}
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
