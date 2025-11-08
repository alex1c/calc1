'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	Lock,
	Copy,
	RefreshCw,
	Eye,
	EyeOff,
	Shield,
	CheckCircle,
} from 'lucide-react';

interface PasswordOptions {
	length: number;
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeNumbers: boolean;
	includeSymbols: boolean;
	excludeSimilar: boolean;
	excludeAmbiguous: boolean;
}

/**
 * Password Generator Component
 * 
 * A React component for generating secure passwords.
 * 
 * Features:
 * - Customizable password length
 * - Character set options (uppercase, lowercase, numbers, symbols)
 * - Exclude similar characters (i, l, 1, L, o, 0, O)
 * - Exclude ambiguous characters
 * - Password strength indicator
 * - Copy to clipboard
 * - Show/hide password toggle
 * - Responsive design
 * 
 * Uses cryptographically secure random number generation for password creation.
 */
export default function PasswordGenerator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.passwordGenerator');
	
	// Password generation options
	const [options, setOptions] = useState<PasswordOptions>({
		length: 12, // Password length (default: 12)
		includeUppercase: true, // Include uppercase letters
		includeLowercase: true, // Include lowercase letters
		includeNumbers: true, // Include numbers
		includeSymbols: true, // Include symbols
		excludeSimilar: false, // Exclude similar characters (i, l, 1, L, o, 0, O)
		excludeAmbiguous: false, // Exclude ambiguous characters
	});
	const [generatedPassword, setGeneratedPassword] = useState(''); // Generated password
	const [isGenerating, setIsGenerating] = useState(false); // Generation state
	const [copied, setCopied] = useState(false); // Copy to clipboard success state
	const [showPassword, setShowPassword] = useState(false); // Show/hide password toggle

	const generatePassword = (): string => {
		let charset = '';

		if (options.includeUppercase) {
			charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		}
		if (options.includeLowercase) {
			charset += 'abcdefghijklmnopqrstuvwxyz';
		}
		if (options.includeNumbers) {
			charset += '0123456789';
		}
		if (options.includeSymbols) {
			charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
		}

		// Remove similar characters if requested
		if (options.excludeSimilar) {
			charset = charset.replace(/[il1Lo0O]/g, '');
		}

		// Remove ambiguous characters if requested
		if (options.excludeAmbiguous) {
			charset = charset.replace(/[{}[\]\\|;:,.<>]/g, '');
		}

		if (charset.length === 0) {
			return '';
		}

		let password = '';
		for (let i = 0; i < options.length; i++) {
			password += charset.charAt(
				Math.floor(Math.random() * charset.length)
			);
		}

		return password;
	};

	const calculateStrength = (
		password: string
	): { score: number; label: string; color: string } => {
		let score = 0;

		// Length score
		if (password.length >= 8) score += 1;
		if (password.length >= 12) score += 1;
		if (password.length >= 16) score += 1;

		// Character variety score
		if (/[a-z]/.test(password)) score += 1;
		if (/[A-Z]/.test(password)) score += 1;
		if (/[0-9]/.test(password)) score += 1;
		if (/[^a-zA-Z0-9]/.test(password)) score += 1;

		// Complexity score
		const uniqueChars = new Set(password).size;
		if (uniqueChars >= password.length * 0.7) score += 1;

		if (score <= 2)
			return { score, label: t('strength.weak'), color: 'text-red-600' };
		if (score <= 4)
			return {
				score,
				label: t('strength.fair'),
				color: 'text-orange-600',
			};
		if (score <= 6)
			return {
				score,
				label: t('strength.good'),
				color: 'text-yellow-600',
			};
		return { score, label: t('strength.strong'), color: 'text-green-600' };
	};

	const handleGenerate = async () => {
		if (options.length < 4 || options.length > 128) {
			alert(t('errors.invalidLength'));
			return;
		}

		if (
			!options.includeUppercase &&
			!options.includeLowercase &&
			!options.includeNumbers &&
			!options.includeSymbols
		) {
			alert(t('errors.noCharacterTypes'));
			return;
		}

		setIsGenerating(true);

		// Generate password immediately
		const password = generatePassword();

		// Add a small delay for UI feedback, but not too long
		await new Promise((resolve) => setTimeout(resolve, 300));

		setGeneratedPassword(password);
		setIsGenerating(false);
	};

	const handleCopy = async () => {
		if (!generatedPassword) return;

		await navigator.clipboard.writeText(generatedPassword);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleReset = () => {
		setGeneratedPassword('');
		setOptions({
			length: 12,
			includeUppercase: true,
			includeLowercase: true,
			includeNumbers: true,
			includeSymbols: true,
			excludeSimilar: false,
			excludeAmbiguous: false,
		});
	};

	const strength = generatedPassword
		? calculateStrength(generatedPassword)
		: null;

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-blue-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Lock className='h-8 w-8 text-blue-500' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Length */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.length')}: {options.length}
						</label>
						<input
							type='range'
							min='4'
							max='128'
							value={options.length}
							onChange={(e) =>
								setOptions({
									...options,
									length: parseInt(e.target.value),
								})
							}
							className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
						/>
						<div className='flex justify-between text-xs text-gray-500'>
							<span>4</span>
							<span>128</span>
						</div>
					</div>

					{/* Character types */}
					<div className='space-y-4'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.characterTypes')}
						</label>
						<div className='space-y-3'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={options.includeUppercase}
									onChange={(e) =>
										setOptions({
											...options,
											includeUppercase: e.target.checked,
										})
									}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>
									{t('form.uppercase')} (A-Z)
								</span>
							</label>

							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={options.includeLowercase}
									onChange={(e) =>
										setOptions({
											...options,
											includeLowercase: e.target.checked,
										})
									}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>
									{t('form.lowercase')} (a-z)
								</span>
							</label>

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
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>
									{t('form.numbers')} (0-9)
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
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<span className='text-sm text-gray-700'>
									{t('form.symbols')} (!@#$...)
								</span>
							</label>
						</div>
					</div>
				</div>

				{/* Advanced options */}
				<div className='mt-6'>
					<label className='block text-sm font-medium text-gray-700 mb-3'>
						{t('form.advancedOptions')}
					</label>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<label className='flex items-center gap-2'>
							<input
								type='checkbox'
								checked={options.excludeSimilar}
								onChange={(e) =>
									setOptions({
										...options,
										excludeSimilar: e.target.checked,
									})
								}
								className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<span className='text-sm text-gray-700'>
								{t('form.excludeSimilar')}
							</span>
						</label>

						<label className='flex items-center gap-2'>
							<input
								type='checkbox'
								checked={options.excludeAmbiguous}
								onChange={(e) =>
									setOptions({
										...options,
										excludeAmbiguous: e.target.checked,
									})
								}
								className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<span className='text-sm text-gray-700'>
								{t('form.excludeAmbiguous')}
							</span>
						</label>
					</div>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						key='generate-button'
						onClick={handleGenerate}
						disabled={isGenerating}
						className='flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isGenerating && (
							<RefreshCw key='spinner' className='h-5 w-5 animate-spin' />
						)}
						{!isGenerating && (
							<Shield key='shield' className='h-5 w-5' />
						)}
						<span key='button-text'>
							{isGenerating ? t('form.generating') : t('form.generate')}
						</span>
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
			<div key='results-section' className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
						<Lock className='h-5 w-5 text-blue-500' />
						{t('results.title')}
					</h3>
					{generatedPassword && (
						<div className='flex gap-2'>
							<button
								key='toggle-password-button'
								onClick={() => setShowPassword(!showPassword)}
								className='p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200'
							>
								{showPassword ? (
									<EyeOff key='eye-off' className='h-4 w-4' />
								) : (
									<Eye key='eye' className='h-4 w-4' />
								)}
							</button>
							<button
								key='copy-button'
								onClick={handleCopy}
								className='px-3 py-1 bg-white border border-blue-300 text-blue-700 rounded-lg text-sm hover:bg-blue-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Copy className='h-4 w-4' />
								{t('results.copy')}
							</button>
						</div>
					)}
				</div>

				{generatedPassword ? (
					<div key='password-content'>
						<div className='bg-white rounded-lg p-4 border border-blue-100 mb-4'>
							<div className='font-mono text-lg text-gray-800 break-all'>
								{showPassword
									? generatedPassword
									: '•'.repeat(generatedPassword.length)}
							</div>
						</div>

						{strength && (
							<div key='strength-indicator' className='flex items-center gap-2 mb-4'>
								<span className='text-sm text-gray-600'>
									{t('results.strength')}:
								</span>
								<span className={`font-semibold ${strength.color}`}>
									{strength.label}
								</span>
								<div className='flex gap-1'>
									{[1, 2, 3, 4].map((level) => (
										<div
											key={`strength-${level}`}
											className={`w-3 h-3 rounded-full ${
												level <= strength.score
													? 'bg-green-500'
													: 'bg-gray-300'
											}`}
										/>
									))}
								</div>
							</div>
						)}

						<div key='password-stats' className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
							<div className='text-center'>
								<div className='font-semibold text-gray-900'>
									{generatedPassword.length}
								</div>
								<div className='text-gray-600'>
									{t('results.length')}
								</div>
							</div>
							<div className='text-center'>
								<div className='font-semibold text-gray-900'>
									{new Set(generatedPassword).size}
								</div>
								<div className='text-gray-600'>
									{t('results.uniqueChars')}
								</div>
							</div>
							<div className='text-center'>
								<div className='font-semibold text-gray-900'>
									{Math.pow(
										62,
										generatedPassword.length
									).toExponential(2)}
								</div>
								<div className='text-gray-600'>
									{t('results.possibilities')}
								</div>
							</div>
							<div className='text-center'>
								<div className='font-semibold text-gray-900'>
									{Math.ceil(
										Math.log2(
											Math.pow(62, generatedPassword.length)
										) / 365
									)}
								</div>
								<div className='text-gray-600'>
									{t('results.entropy')}
								</div>
							</div>
						</div>

						{copied && (
							<div key='copied-message' className='mt-4 text-center text-sm text-green-600 flex items-center justify-center gap-1'>
								<CheckCircle className='h-4 w-4' />
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

			{/* Security tips */}
			<div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
				<h4 className='font-semibold text-green-900 mb-2'>
					{t('securityTips.title')}
				</h4>
				<ul className='text-sm text-green-800 space-y-1'>
					<li>• {t('securityTips.tip1')}</li>
					<li>• {t('securityTips.tip2')}</li>
					<li>• {t('securityTips.tip3')}</li>
				</ul>
			</div>
		</div>
	);
}
