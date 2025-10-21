'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Copy, Download, RefreshCw } from 'lucide-react';
import { generateNames } from '@/lib/calculators/name-generator';

export default function NameGeneratorCalculator() {
	const t = useTranslations('calculators.nameGenerator');
	const [nameType, setNameType] = useState('baby');
	const [gender, setGender] = useState('any');
	const [nameCount, setNameCount] = useState(5);
	const [nameLength, setNameLength] = useState('medium');
	const [generatedNames, setGeneratedNames] = useState<string[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [copied, setCopied] = useState(false);

	// Debug logging
	useEffect(() => {
		console.log('🔍 DEBUG: Component render - state:', {
			nameType,
			gender,
			nameCount,
			nameLength,
			generatedNames: generatedNames.length,
			isGenerating,
			copied,
		});
	});

	useEffect(() => {
		console.log('🔍 DEBUG: Generated names changed:', generatedNames);
	}, [generatedNames]);

	useEffect(() => {
		console.log('🔍 DEBUG: Is generating changed:', isGenerating);
	}, [isGenerating]);

	useEffect(() => {
		console.log('🔍 DEBUG: Copied changed:', copied);
	}, [copied]);

	const handleGenerate = async () => {
		console.log('🔍 DEBUG: Generate button clicked');
		console.log('🔍 DEBUG: handleGenerate started');
		console.log('🔍 DEBUG: nameType =', nameType, 'gender =', gender, 'nameCount =', nameCount, 'nameLength =', nameLength);

		setIsGenerating(true);
		console.log('🔍 DEBUG: Setting isGenerating to true');

		// Add delay for animation
		console.log('🔍 DEBUG: Starting delay...');
		await new Promise(resolve => setTimeout(resolve, 300));

		console.log('🔍 DEBUG: Delay completed');
		console.log('🔍 DEBUG: Starting name generation...');

		try {
			const names = generateNames(nameType, gender, nameCount, nameLength);
			console.log('🔍 DEBUG: Names generated:', names);
			setGeneratedNames(names);
			console.log('🔍 DEBUG: Setting generated names');
		} catch (error) {
			console.error('🔍 DEBUG: Error generating names:', error);
		}

		setIsGenerating(false);
		console.log('🔍 DEBUG: Setting isGenerating to false');
		console.log('🔍 DEBUG: handleGenerate completed');
	};

	const handleCopy = async () => {
		console.log('🔍 DEBUG: Copy button clicked');
		console.log('🔍 DEBUG: handleCopy started');
		
		const text = generatedNames.join('\n');
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
		
		const text = generatedNames.join('\n');
		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `generated-names-${Date.now()}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		
		console.log('🔍 DEBUG: handleDownload completed');
	};

	const handleReset = () => {
		console.log('🔍 DEBUG: Reset button clicked');
		console.log('🔍 DEBUG: handleReset started');
		
		setGeneratedNames([]);
		setNameType('baby');
		setGender('any');
		setNameCount(5);
		setNameLength('medium');
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
			window.removeEventListener('unhandledrejection', handleUnhandledRejection);
		};
	}, []);

	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">
					{t('title')}
				</h1>
				<p className="text-gray-600 mb-8">
					{t('description')}
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t('form.nameType')}
						</label>
						<select
							value={nameType}
							onChange={(e) => setNameType(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="baby">{t('form.nameTypes.baby')}</option>
							<option value="character">{t('form.nameTypes.character')}</option>
							<option value="project">{t('form.nameTypes.project')}</option>
							<option value="book">{t('form.nameTypes.book')}</option>
							<option value="fantasy">{t('form.nameTypes.fantasy')}</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t('form.gender')}
						</label>
						<select
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="any">{t('form.genders.any')}</option>
							<option value="male">{t('form.genders.male')}</option>
							<option value="female">{t('form.genders.female')}</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t('form.nameCount')}
						</label>
						<select
							value={nameCount}
							onChange={(e) => setNameCount(Number(e.target.value))}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value={1}>1</option>
							<option value={3}>3</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							{t('form.nameLength')}
						</label>
						<select
							value={nameLength}
							onChange={(e) => setNameLength(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="short">{t('form.lengths.short')}</option>
							<option value="medium">{t('form.lengths.medium')}</option>
							<option value="long">{t('form.lengths.long')}</option>
						</select>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 mb-6">
					<button
						key="generate-button"
						onClick={handleGenerate}
						disabled={isGenerating}
						className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
					>
						{isGenerating && (
							<RefreshCw key="spinner" className="w-5 h-5 animate-spin" />
						)}
						{!isGenerating && (
							<Sparkles key="sparkles" className="w-5 h-5" />
						)}
						<span key="button-text">
							{isGenerating ? t('form.generating') : t('form.generate')}
						</span>
					</button>

					{generatedNames.length > 0 && (
						<button
							key="reset-button"
							onClick={handleReset}
							className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
						>
							{t('form.reset')}
						</button>
					)}
				</div>

				{/* Results Section - Always rendered */}
				<div key="results-section" className="mt-8">
					{generatedNames.length > 0 ? (
						<div key="names-content" className="space-y-4">
							<div className="flex flex-col sm:flex-row gap-4 mb-6">
								<button
									key="copy-button"
									onClick={handleCopy}
									className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
								>
									<Copy className="w-4 h-4" />
									{copied ? t('results.copied') : t('results.copy')}
								</button>

								<button
									key="download-button"
									onClick={handleDownload}
									className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									<Download className="w-4 h-4" />
									{t('results.download')}
								</button>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{generatedNames.map((name, index) => (
									<div
										key={`name-${index}`}
										className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
									>
										<div className="text-lg font-medium text-gray-800 mb-1">
											{name}
										</div>
										<div className="text-sm text-gray-500">
											{t('results.nameType')}: {t(`form.nameTypes.${nameType}`)}
										</div>
									</div>
								))}
							</div>

							{copied && (
								<div key="copied-message" className="text-center text-green-600 font-medium">
									{t('results.copiedMessage')}
								</div>
							)}
						</div>
					) : (
						<div key="placeholder-content" className="text-center py-12 text-gray-500">
							<Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
							<p className="text-lg">{t('results.placeholder')}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
