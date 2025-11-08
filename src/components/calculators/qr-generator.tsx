'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calculator,
	Square,
	Package,
	AlertCircle,
	RotateCcw,
	Download,
	QrCode,
	Copy,
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import QRCode to avoid SSR issues
const QRCodeSVG = dynamic(
	() => import('qrcode.react').then((mod) => mod.QRCodeSVG),
	{ ssr: false }
);

type DataType =
	| 'text'
	| 'url'
	| 'email'
	| 'phone'
	| 'sms'
	| 'wifi'
	| 'vcard';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * QR Code Generator Component
 * 
 * A React component for generating QR codes with various data types.
 * 
 * Features:
 * - Multiple data types (text, URL, email, phone, SMS, WiFi, vCard)
 * - Customizable size and colors
 * - Error correction levels (L, M, Q, H)
 * - WiFi network QR code generation
 * - vCard QR code generation
 * - Download QR code as SVG/PNG
 * - Copy QR code data
 * - Responsive design
 * 
 * Uses qrcode.react library for QR code generation.
 */
interface QRGeneratorInput {
	dataType: DataType;
	data: string;
	size: number;
	errorCorrectionLevel: ErrorCorrectionLevel;
	foregroundColor: string;
	backgroundColor: string;
	// Wi-Fi specific fields
	wifiSSID?: string;
	wifiPassword?: string;
	wifiSecurity?: string;
	// vCard specific fields
	vCardName?: string;
	vCardPhone?: string;
	vCardEmail?: string;
	vCardAddress?: string;
}

export default function QRGenerator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.qr-generator');
	
	// Form state management
	const [input, setInput] = useState<QRGeneratorInput>({
		dataType: 'text', // QR code data type
		data: '', // QR code data content
		size: 256, // QR code size in pixels
		errorCorrectionLevel: 'M', // Error correction level (L, M, Q, H)
		foregroundColor: '#000000', // Foreground color (black)
		backgroundColor: '#FFFFFF', // Background color (white)
		wifiSSID: '', // WiFi network name (for WiFi type)
		wifiPassword: '', // WiFi password (for WiFi type)
		wifiSecurity: 'WPA', // WiFi security type (for WiFi type)
		vCardName: '', // vCard name (for vCard type)
		vCardPhone: '', // vCard phone (for vCard type)
		vCardEmail: '', // vCard email (for vCard type)
		vCardAddress: '', // vCard address (for vCard type)
	});
	const [errors, setErrors] = useState<string[]>([]); // Validation errors
	const [qrData, setQrData] = useState<string>('');
	const qrCodeRef = useRef<HTMLDivElement>(null);

	const handleInputChange = (
		field: keyof QRGeneratorInput,
		value: string | number | DataType | ErrorCorrectionLevel
	) => {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors([]);
	};

	const validateInput = (): string[] => {
		const validationErrors: string[] = [];

		if (input.dataType === 'wifi') {
			if (!input.wifiSSID || input.wifiSSID.trim() === '') {
				validationErrors.push(t('form.errors.dataRequired'));
			}
		} else if (input.dataType === 'vcard') {
			if (
				!input.vCardName ||
				input.vCardName.trim() === '' ||
				(!input.vCardPhone && !input.vCardEmail)
			) {
				validationErrors.push(t('form.errors.dataRequired'));
			}
		} else {
			if (!input.data || input.data.trim() === '') {
				validationErrors.push(t('form.errors.dataRequired'));
			}
		}

		if (input.dataType === 'url') {
			try {
				new URL(input.data);
			} catch {
				validationErrors.push(t('form.errors.invalidUrl'));
			}
		}

		if (input.dataType === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(input.data)) {
				validationErrors.push(t('form.errors.invalidEmail'));
			}
		}

		if (input.dataType === 'phone' || input.dataType === 'sms') {
			const phoneRegex = /^[\d\s\-\+\(\)]+$/;
			if (!phoneRegex.test(input.data)) {
				validationErrors.push(t('form.errors.invalidPhone'));
			}
		}

		return validationErrors;
	};

	const formatQRData = (): string => {
		switch (input.dataType) {
			case 'url':
				return input.data;
			case 'email':
				return `mailto:${input.data}`;
			case 'phone':
				return `tel:${input.data.replace(/\s/g, '')}`;
			case 'sms':
				return `sms:${input.data.replace(/\s/g, '')}`;
			case 'wifi':
				return `WIFI:T:${input.wifiSecurity};S:${input.wifiSSID};P:${input.wifiPassword};;`;
			case 'vcard':
				let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
				if (input.vCardName) vcard += `FN:${input.vCardName}\n`;
				if (input.vCardPhone) vcard += `TEL:${input.vCardPhone}\n`;
				if (input.vCardEmail) vcard += `EMAIL:${input.vCardEmail}\n`;
				if (input.vCardAddress) vcard += `ADR:;;${input.vCardAddress};;\n`;
				vcard += 'END:VCARD';
				return vcard;
			case 'text':
			default:
				return input.data;
		}
	};

	const generateQRCode = () => {
		const validationErrors = validateInput();
		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setQrData('');
			return;
		}

		try {
			const formattedData = formatQRData();
			setQrData(formattedData);
			setErrors([]);
		} catch (error) {
			setErrors([t('form.errors.dataRequired')]);
			setQrData('');
		}
	};

	const handleReset = () => {
		setInput({
			dataType: 'text',
			data: '',
			size: 256,
			errorCorrectionLevel: 'M',
			foregroundColor: '#000000',
			backgroundColor: '#FFFFFF',
			wifiSSID: '',
			wifiPassword: '',
			wifiSecurity: 'WPA',
			vCardName: '',
			vCardPhone: '',
			vCardEmail: '',
			vCardAddress: '',
		});
		setQrData('');
		setErrors([]);
	};

	const downloadQRCode = async (format: 'png' | 'svg') => {
		if (!qrData) return;

		try {
			if (format === 'png') {
				// For PNG, create a hidden canvas and download it
				const canvas = document.createElement('canvas');
				canvas.width = input.size;
				canvas.height = input.size;
				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				// Fill background
				ctx.fillStyle = input.backgroundColor;
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				// Import qrcode library for canvas rendering
				const QRCodeLib = await import('qrcode');
				await QRCodeLib.toCanvas(canvas, qrData, {
					width: input.size,
					margin: 2,
					color: {
						dark: input.foregroundColor,
						light: input.backgroundColor,
					},
					errorCorrectionLevel: input.errorCorrectionLevel,
				});

				const link = document.createElement('a');
				link.download = 'qrcode.png';
				link.href = canvas.toDataURL('image/png');
				link.click();
			} else {
				// For SVG, get the SVG element from the ref and download it
				if (qrCodeRef.current) {
					const svgElement = qrCodeRef.current.querySelector('svg');
					if (svgElement) {
						const svgContent = new XMLSerializer().serializeToString(svgElement);
						const blob = new Blob([svgContent], { type: 'image/svg+xml' });
						const link = document.createElement('a');
						link.download = 'qrcode.svg';
						link.href = URL.createObjectURL(blob);
						link.click();
						URL.revokeObjectURL(link.href);
					}
				}
			}
		} catch (error) {
			console.error('Error downloading QR code:', error);
			alert(t('form.downloadError'));
		}
	};

	const copyToClipboard = () => {
		if (!qrData) return;
		navigator.clipboard.writeText(qrData);
	};

	return (
		<div className='max-w-6xl mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-4'>
					<QrCode className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{t('title')}
					</h1>
				</div>
				<p className='text-lg text-gray-600 dark:text-gray-400'>
					{t('description')}
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Input Form */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Square className='h-5 w-5 text-blue-600 dark:text-blue-400 mr-2' />
						{t('form.title')}
					</h2>

					<div className='space-y-6'>
						{/* Data Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.dataType')}
							</label>
							<select
								value={input.dataType}
								onChange={(e) =>
									handleInputChange('dataType', e.target.value as DataType)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(
									t.raw('form.dataTypes') as Record<string, string>
								).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						</div>

						{/* Data Input - Conditional based on type */}
						{input.dataType === 'wifi' ? (
							<>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.wifi.ssid')}
									</label>
									<input
										type='text'
										value={input.wifiSSID || ''}
										onChange={(e) =>
											handleInputChange('wifiSSID', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='MyNetwork'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.wifi.password')}
									</label>
									<input
										type='text'
										value={input.wifiPassword || ''}
										onChange={(e) =>
											handleInputChange('wifiPassword', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='mypassword123'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.wifi.security')}
									</label>
									<select
										value={input.wifiSecurity || 'WPA'}
										onChange={(e) =>
											handleInputChange('wifiSecurity', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									>
										<option value='WPA'>{t('form.wifi.securityTypes.WPA')}</option>
										<option value='WPA2'>{t('form.wifi.securityTypes.WPA2')}</option>
										<option value='nopass'>{t('form.wifi.securityTypes.nopass')}</option>
									</select>
								</div>
							</>
						) : input.dataType === 'vcard' ? (
							<>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.vcard.name')}
									</label>
									<input
										type='text'
										value={input.vCardName || ''}
										onChange={(e) =>
											handleInputChange('vCardName', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder={t('form.vcard.namePlaceholder')}
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.vcard.phone')}
									</label>
									<input
										type='text'
										value={input.vCardPhone || ''}
										onChange={(e) =>
											handleInputChange('vCardPhone', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='+7 (999) 123-45-67'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										Email
									</label>
									<input
										type='email'
										value={input.vCardEmail || ''}
										onChange={(e) =>
											handleInputChange('vCardEmail', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder='ivan@example.com'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										{t('form.vcard.address')}
									</label>
									<input
										type='text'
										value={input.vCardAddress || ''}
										onChange={(e) =>
											handleInputChange('vCardAddress', e.target.value)
										}
										className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
										placeholder={t('form.vcard.addressPlaceholder')}
									/>
								</div>
							</>
						) : (
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.data')}
								</label>
								<input
									type='text'
									value={input.data}
									onChange={(e) => handleInputChange('data', e.target.value)}
									className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
									placeholder={t('form.dataPlaceholder')}
								/>
							</div>
						)}

						{/* Size */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.size')}
							</label>
							<input
								type='range'
								min='100'
								max='1000'
								step='10'
								value={input.size}
								onChange={(e) =>
									handleInputChange('size', parseInt(e.target.value))
								}
								className='w-full'
							/>
							<div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1'>
								<span>100px</span>
								<span>{input.size}px</span>
								<span>1000px</span>
							</div>
						</div>

						{/* Error Correction Level */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								{t('form.errorCorrection')}
							</label>
							<select
								value={input.errorCorrectionLevel}
								onChange={(e) =>
									handleInputChange(
										'errorCorrectionLevel',
										e.target.value as ErrorCorrectionLevel
									)
								}
								className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
							>
								{Object.entries(
									t.raw('form.errorLevels') as Record<string, string>
								).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						</div>

						{/* Colors */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.foregroundColor')}
								</label>
								<input
									type='color'
									value={input.foregroundColor}
									onChange={(e) =>
										handleInputChange('foregroundColor', e.target.value)
									}
									className='w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('form.backgroundColor')}
								</label>
								<input
									type='color'
									value={input.backgroundColor}
									onChange={(e) =>
										handleInputChange('backgroundColor', e.target.value)
									}
									className='w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md'
								/>
							</div>
						</div>

						{/* Buttons */}
						<div className='flex gap-4'>
							<button
								onClick={generateQRCode}
								className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
							>
								{t('form.generate')}
							</button>
							<button
								onClick={handleReset}
								className='flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
							>
								<RotateCcw className='h-4 w-4 inline mr-2' />
								{t('form.reset')}
							</button>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center'>
						<Package className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
						{t('results.title')}
					</h2>

					{/* Errors */}
					{errors.length > 0 && (
						<div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md'>
							<div className='flex items-center mb-2'>
								<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 mr-2' />
								<h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
									{t('form.errors.title')}
								</h3>
							</div>
							<ul className='text-sm text-red-700 dark:text-red-300 space-y-1'>
								{errors.map((error, index) => (
									<li key={index}>• {error}</li>
								))}
							</ul>
						</div>
					)}

					{/* QR Code Display */}
					{qrData ? (
						<div className='space-y-4' ref={qrCodeRef}>
							<div className='flex justify-center bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'>
								<QRCodeSVG
									value={qrData}
									size={input.size}
									level={input.errorCorrectionLevel}
									fgColor={input.foregroundColor}
									bgColor={input.backgroundColor}
								/>
							</div>

							{/* Data Preview */}
							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
								<h3 className='text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2'>
									{t('results.dataPreview')}
								</h3>
								<p className='text-xs text-blue-700 dark:text-blue-300 break-all'>
									{qrData}
								</p>
								<button
									onClick={copyToClipboard}
									className='mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center'
								>
									<Copy className='h-3 w-3 mr-1' />
									{t('results.copy')}
								</button>
							</div>

							{/* Download Buttons */}
							<div className='flex gap-4'>
								<button
									onClick={() => downloadQRCode('png')}
									className='flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center'
								>
									<Download className='h-4 w-4 mr-2' />
									{t('results.downloadPng')}
								</button>
								<button
									onClick={() => downloadQRCode('svg')}
									className='flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center justify-center'
								>
									<Download className='h-4 w-4 mr-2' />
									{t('results.downloadSvg')}
								</button>
							</div>
						</div>
					) : (
						<p className='text-gray-500 dark:text-gray-400'>
							{t('results.placeholder')}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

