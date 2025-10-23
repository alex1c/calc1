'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
// import { motion } from 'framer-motion'; // Permanently disabled
import {
	Calculator,
	RefreshCw,
	Copy,
	Download,
	Receipt,
	TrendingUp,
	Shield,
	Percent,
	DollarSign,
} from 'lucide-react';
import PDFExport from '@/components/common/pdf-export';

export default function TaxCalculator() {
	const t = useTranslations('calculators.taxCalculator');

	const [calculationType, setCalculationType] = useState<
		'withVat' | 'withoutVat'
	>('withVat');
	const [amount, setAmount] = useState('');
	const [vatRate, setVatRate] = useState('20');
	const [customVatRate, setCustomVatRate] = useState('');
	const [additionalTaxes, setAdditionalTaxes] = useState('');
	// const [currency, setCurrency] = useState('RUB'); // Removed currency selection
	const [isCalculating, setIsCalculating] = useState(false);
	const [result, setResult] = useState<any>(null);
	const [copied, setCopied] = useState(false);

	// Debug useEffect to track state changes - temporarily disabled
	// useEffect(() => {
	// 	console.log('🔍 [DEBUG] State changed:', {
	// 		calculationType,
	// 		amount,
	// 		vatRate,
	// 		customVatRate,
	// 		additionalTaxes,
	// 		currency,
	// 		isCalculating,
	// 		result: !!result,
	// 		copied,
	// 	});
	// }, [
	// 	calculationType,
	// 	amount,
	// 	vatRate,
	// 	customVatRate,
	// 	additionalTaxes,
	// 	currency,
	// 	isCalculating,
	// 	result,
	// 	copied,
	// ]);

	const vatRates = [
		{ value: '0', label: '0%' },
		{ value: '10', label: '10%' },
		{ value: '20', label: '20%' },
		{ value: 'custom', label: t('form.customRate') },
	];

	// const currencies = []; // Removed currency selection

	const calculateTax = () => {
		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

		// Validate VAT rate
		const vatRateNum =
			vatRate === 'custom' ? Number(customVatRate) : Number(vatRate);
		if (isNaN(vatRateNum) || vatRateNum < 0 || vatRateNum > 100) return;

		// Validate additional taxes
		const additionalTaxesNum = additionalTaxes
			? Number(additionalTaxes)
			: 0;
		if (
			additionalTaxes &&
			(isNaN(additionalTaxesNum) || additionalTaxesNum < 0)
		)
			return;

		setIsCalculating(true);

		// Simulate calculation delay
		setTimeout(() => {
			const amountNum = Number(amount);

			let netAmount, vatAmount, totalAmount;

			if (calculationType === 'withVat') {
				// Amount with VAT -> calculate net amount and VAT
				totalAmount = amountNum;
				netAmount = totalAmount / (1 + vatRateNum / 100);
				vatAmount = totalAmount - netAmount;
			} else {
				// Amount without VAT -> calculate total with VAT
				netAmount = amountNum;
				vatAmount = (netAmount * vatRateNum) / 100;
				totalAmount = netAmount + vatAmount;
			}

			// Add additional taxes
			const finalTotal = totalAmount + additionalTaxesNum;

			setResult({
				netAmount,
				vatAmount,
				totalAmount,
				finalTotal,
				additionalTaxes: additionalTaxesNum,
				vatRate: vatRateNum,
			});

			setIsCalculating(false);
		}, 1000);
	};

	const resetCalculator = () => {
		setAmount('');
		setVatRate('20');
		setCustomVatRate('');
		setAdditionalTaxes('');
		setResult(null);
		setCopied(false);
	};

	const copyResults = async () => {
		if (!result) return;

		const text = `${t('results.netAmount')}: $${result.netAmount.toFixed(2)}
${t('results.vatAmount')}: $${result.vatAmount.toFixed(2)}
${t('results.totalAmount')}: $${result.finalTotal.toFixed(2)}`;

		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(text);
			} else if (typeof document !== 'undefined') {
				// Fallback for older browsers
				const textArea = document.createElement('textarea');
				textArea.value = text;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				textArea.style.top = '-999999px';
				textArea.style.opacity = '0';
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand('copy');
				// Use setTimeout to ensure DOM manipulation is complete
				setTimeout(() => {
					if (textArea.parentNode) {
						textArea.parentNode.removeChild(textArea);
					}
				}, 0);
			}
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const generatePDFContent = () => {
		if (!result) return '';

		let content = `${t('results.title')}\n\n`;
		content += `${t('results.netAmount')}: $${result.netAmount.toFixed(
			2
		)}\n`;
		content += `${t('results.vatAmount')} (${
			result.vatRate
		}%): $${result.vatAmount.toFixed(2)}\n`;
		content += `${t('results.totalAmount')}: $${result.totalAmount.toFixed(
			2
		)}\n`;

		if (result.additionalTaxes > 0) {
			content += `${t(
				'results.additionalTaxes'
			)}: $${result.additionalTaxes.toFixed(2)}\n`;
		}

		content += `\n${t('results.finalTotal')}: $${result.finalTotal.toFixed(
			2
		)}\n`;

		return content;
	};

	// Component render

	return (
		<div
			className='max-w-4xl mx-auto p-6'
			key={`tax-calculator-${isCalculating}`}
		>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<Calculator className='h-8 w-8 text-green-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<div className='space-y-6'>
					{/* Calculation Type */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.calculationType')}
						</label>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<button
								type='button'
								onClick={() => {
									setCalculationType('withVat');
									if (result) setResult(null);
								}}
								className={`p-4 rounded-lg border-2 transition-all ${
									calculationType === 'withVat'
										? 'border-green-500 bg-green-50 text-green-700'
										: 'border-gray-200 hover:border-gray-300'
								}`}
							>
								<div className='flex items-center gap-2'>
									<Receipt className='w-5 h-5' />
									<span className='font-medium'>
										{t('form.calculationTypes.withVat')}
									</span>
								</div>
								<p className='text-sm text-gray-600 mt-1'>
									{t('form.calculationTypes.withVatDesc')}
								</p>
							</button>
							<button
								type='button'
								onClick={() => {
									setCalculationType('withoutVat');
									if (result) setResult(null);
								}}
								className={`p-4 rounded-lg border-2 transition-all ${
									calculationType === 'withoutVat'
										? 'border-green-500 bg-green-50 text-green-700'
										: 'border-gray-200 hover:border-gray-300'
								}`}
							>
								<div className='flex items-center gap-2'>
									<TrendingUp className='w-5 h-5' />
									<span className='font-medium'>
										{t('form.calculationTypes.withoutVat')}
									</span>
								</div>
								<p className='text-sm text-gray-600 mt-1'>
									{t('form.calculationTypes.withoutVatDesc')}
								</p>
							</button>
						</div>
					</div>

					{/* Amount Input */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.amount')}
						</label>
						<div className='relative'>
							<DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
							<input
								type='number'
								value={amount}
								onChange={(e) => {
									setAmount(e.target.value);
									if (result) setResult(null);
								}}
								placeholder={t('form.amountPlaceholder')}
								className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							/>
						</div>
					</div>

					{/* VAT Rate */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.vatRate')}
						</label>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
							{vatRates.map((rate) => (
								<button
									key={rate.value}
									type='button'
									onClick={() => {
										setVatRate(rate.value);
										// Reset result when VAT rate changes
										if (result) {
											setResult(null);
										}
									}}
									className={`p-3 rounded-lg border-2 transition-all ${
										vatRate === rate.value
											? 'border-green-500 bg-green-50 text-green-700'
											: 'border-gray-200 hover:border-gray-300'
									}`}
								>
									<div className='flex items-center gap-2'>
										<Percent className='w-4 h-4' />
										<span className='font-medium'>
											{rate.label}
										</span>
									</div>
								</button>
							))}
						</div>
						{vatRate === 'custom' && (
							<div className='mt-3'>
								<input
									type='number'
									value={customVatRate}
									onChange={(e) => {
										setCustomVatRate(e.target.value);
										// Reset result when custom VAT rate changes
										if (result) {
											setResult(null);
										}
									}}
									placeholder={t(
										'form.customRatePlaceholder'
									)}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								/>
							</div>
						)}
					</div>

					{/* Additional Taxes */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							{t('form.additionalTaxes')}
						</label>
						<input
							type='number'
							value={additionalTaxes}
							onChange={(e) => {
								setAdditionalTaxes(e.target.value);
								// Reset result when additional taxes change
								if (result) {
									setResult(null);
								}
							}}
							placeholder={t('form.additionalTaxesPlaceholder')}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
						/>
						<p className='text-sm text-gray-500 mt-1'>
							{t('form.additionalTaxesDesc')}
						</p>
					</div>

					{/* Currency selection removed - using USD only */}

					{/* Calculate Button */}
					<div className='flex gap-4'>
						<button
							onClick={calculateTax}
							disabled={
								!amount ||
								isCalculating ||
								(vatRate === 'custom' &&
									(!customVatRate ||
										isNaN(Number(customVatRate))))
							}
							className='flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
						>
							{isCalculating ? (
								<>
									<RefreshCw className='w-5 h-5 animate-spin' />
									{t('form.calculating')}
								</>
							) : (
								<>
									<Calculator className='w-5 h-5' />
									{t('form.calculate')}
								</>
							)}
						</button>
						<button
							onClick={resetCalculator}
							className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2'
						>
							<RefreshCw className='w-5 h-5' />
							{t('form.reset')}
						</button>
					</div>
				</div>
			</div>

			{/* Results */}
			{result && !isCalculating ? (
				<div
					key={`results-${result?.finalTotal}`}
					className='bg-white rounded-lg shadow-lg p-8'
				>
					<div className='flex items-center gap-2 mb-6'>
						<Shield className='h-8 w-8 text-green-600' />
						<h2 className='text-2xl font-bold text-gray-900'>
							{t('results.title')}
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div className='bg-green-50 rounded-lg p-6'>
							<div className='flex items-center gap-2 mb-2'>
								<Receipt className='w-5 h-5 text-green-600' />
								<span className='font-medium text-green-800'>
									{t('results.netAmount')}
								</span>
							</div>
							<div className='text-2xl font-bold text-green-900'>
								${result.netAmount.toFixed(2)}
							</div>
						</div>

						<div className='bg-blue-50 rounded-lg p-6'>
							<div className='flex items-center gap-2 mb-2'>
								<Percent className='w-5 h-5 text-blue-600' />
								<span className='font-medium text-blue-800'>
									{t('results.vatAmount')} ({result.vatRate}%)
								</span>
							</div>
							<div className='text-2xl font-bold text-blue-900'>
								${result.vatAmount.toFixed(2)}
							</div>
						</div>

						{result.additionalTaxes > 0 && (
							<div className='bg-orange-50 rounded-lg p-6'>
								<div className='flex items-center gap-2 mb-2'>
									<TrendingUp className='w-5 h-5 text-orange-600' />
									<span className='font-medium text-orange-800'>
										{t('results.additionalTaxes')}
									</span>
								</div>
								<div className='text-2xl font-bold text-orange-900'>
									${result.additionalTaxes.toFixed(2)}
								</div>
							</div>
						)}

						<div className='bg-purple-50 rounded-lg p-6'>
							<div className='flex items-center gap-2 mb-2'>
								<Calculator className='w-5 h-5 text-purple-600' />
								<span className='font-medium text-purple-800'>
									{t('results.totalAmount')}
								</span>
							</div>
							<div className='text-2xl font-bold text-purple-900'>
								${result.finalTotal.toFixed(2)}
							</div>
						</div>
					</div>

					<div className='flex gap-4'>
						<button
							onClick={copyResults}
							className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
						>
							<Copy className='w-4 h-4' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>

						<PDFExport
							title={t('results.title')}
							content={generatePDFContent()}
							fileName='tax-calculator-results'
							className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}
