'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Star, Copy, RefreshCw, Sparkles } from 'lucide-react';

interface ZodiacSign {
	name: string;
	startDate: string;
	endDate: string;
	element: string;
	quality: string;
	symbol: string;
	description: string;
}

interface ZodiacResult {
	sign: ZodiacSign;
	dateRange: string;
	element: string;
	quality: string;
	description: string;
}

export default function ZodiacCalculator() {
	const t = useTranslations('calculators.zodiacCalculator');
	const [birthDate, setBirthDate] = useState('');
	const [result, setResult] = useState<ZodiacResult | null>(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [copied, setCopied] = useState(false);

	// Zodiac signs data
	const zodiacSigns: ZodiacSign[] = [
		{
			name: 'Aries',
			startDate: '03-21',
			endDate: '04-19',
			element: 'Fire',
			quality: 'Cardinal',
			symbol: '♈',
			description: 'Energetic, confident, and natural leaders',
		},
		{
			name: 'Taurus',
			startDate: '04-20',
			endDate: '05-20',
			element: 'Earth',
			quality: 'Fixed',
			symbol: '♉',
			description: 'Reliable, patient, and practical',
		},
		{
			name: 'Gemini',
			startDate: '05-21',
			endDate: '06-20',
			element: 'Air',
			quality: 'Mutable',
			symbol: '♊',
			description: 'Adaptable, versatile, and communicative',
		},
		{
			name: 'Cancer',
			startDate: '06-21',
			endDate: '07-22',
			element: 'Water',
			quality: 'Cardinal',
			symbol: '♋',
			description: 'Loyal, emotional, and intuitive',
		},
		{
			name: 'Leo',
			startDate: '07-23',
			endDate: '08-22',
			element: 'Fire',
			quality: 'Fixed',
			symbol: '♌',
			description: 'Creative, passionate, and generous',
		},
		{
			name: 'Virgo',
			startDate: '08-23',
			endDate: '09-22',
			element: 'Earth',
			quality: 'Mutable',
			symbol: '♍',
			description: 'Analytical, practical, and hardworking',
		},
		{
			name: 'Libra',
			startDate: '09-23',
			endDate: '10-22',
			element: 'Air',
			quality: 'Cardinal',
			symbol: '♎',
			description: 'Diplomatic, fair, and social',
		},
		{
			name: 'Scorpio',
			startDate: '10-23',
			endDate: '11-21',
			element: 'Water',
			quality: 'Fixed',
			symbol: '♏',
			description: 'Passionate, resourceful, and brave',
		},
		{
			name: 'Sagittarius',
			startDate: '11-22',
			endDate: '12-21',
			element: 'Fire',
			quality: 'Mutable',
			symbol: '♐',
			description: 'Adventurous, independent, and philosophical',
		},
		{
			name: 'Capricorn',
			startDate: '12-22',
			endDate: '01-19',
			element: 'Earth',
			quality: 'Cardinal',
			symbol: '♑',
			description: 'Responsible, disciplined, and practical',
		},
		{
			name: 'Aquarius',
			startDate: '01-20',
			endDate: '02-18',
			element: 'Air',
			quality: 'Fixed',
			symbol: '♒',
			description: 'Progressive, independent, and humanitarian',
		},
		{
			name: 'Pisces',
			startDate: '02-19',
			endDate: '03-20',
			element: 'Water',
			quality: 'Mutable',
			symbol: '♓',
			description: 'Compassionate, artistic, and intuitive',
		},
	];

	// Get zodiac sign for a given date
	const getZodiacSign = (date: Date): ZodiacSign => {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dateStr = `${month.toString().padStart(2, '0')}-${day
			.toString()
			.padStart(2, '0')}`;

		for (const sign of zodiacSigns) {
			if (dateStr >= sign.startDate && dateStr <= sign.endDate) {
				return sign;
			}
		}

		// Handle Capricorn (spans across year)
		if (month === 12 && day >= 22) return zodiacSigns[9];
		if (month === 1 && day <= 19) return zodiacSigns[9];

		return zodiacSigns[0]; // Default to Aries
	};

	// Calculate zodiac sign
	const calculateZodiac = async () => {
		if (!birthDate) return;

		setIsCalculating(true);

		// Add some delay for animation effect
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const date = new Date(birthDate);
		const sign = getZodiacSign(date);

		const result: ZodiacResult = {
			sign,
			dateRange: `${sign.startDate} - ${sign.endDate}`,
			element: sign.element,
			quality: sign.quality,
			description: sign.description,
		};

		setResult(result);
		setIsCalculating(false);
	};

	const handleReset = () => {
		setBirthDate('');
		setResult(null);
		setCopied(false);
	};

	const handleCopy = async () => {
		if (!result) return;

		const text = `${t('results.copyText', {
			sign: result.sign.name,
			symbol: result.sign.symbol,
			dateRange: result.dateRange,
			element: result.element,
			quality: result.quality,
			description: result.description,
		})}`;

		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const isFormValid = birthDate && new Date(birthDate) <= new Date();

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-purple-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Star className='h-8 w-8 text-purple-500' />
					{t('form.title')}
				</h2>

				<div className='space-y-4'>
					<label className='block text-sm font-medium text-gray-700'>
						{t('form.birthDate')}
					</label>
					<div className='relative'>
						<Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
						<input
							type='date'
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							max={new Date().toISOString().split('T')[0]}
							className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
							placeholder={t('form.datePlaceholder')}
						/>
					</div>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={calculateZodiac}
						disabled={!isFormValid || isCalculating}
						className='flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isCalculating ? (
							<>
								<RefreshCw className='h-5 w-5 animate-spin' />
								{t('form.calculating')}
							</>
						) : (
							<>
								<Sparkles className='h-5 w-5' />
								{t('form.calculate')}
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
			{result && (
				<div className='bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200'>
					<h3 className='text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<Star className='h-6 w-6 text-purple-500' />
						{t('results.title')}
					</h3>

					<div className='text-center mb-6'>
						<div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-4'>
							<span className='text-4xl'>
								{result.sign.symbol}
							</span>
						</div>
						<h4 className='text-2xl font-bold text-gray-900 mb-2'>
							{result.sign.name}
						</h4>
						<p className='text-gray-600 mb-4'>
							{t('results.dateRange', {
								range: result.dateRange,
							})}
						</p>
					</div>

					{/* Zodiac Details */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
						<div className='bg-white rounded-lg p-4'>
							<h5 className='font-semibold text-gray-900 mb-2'>
								{t('results.element')}
							</h5>
							<p className='text-gray-600'>{result.element}</p>
						</div>
						<div className='bg-white rounded-lg p-4'>
							<h5 className='font-semibold text-gray-900 mb-2'>
								{t('results.quality')}
							</h5>
							<p className='text-gray-600'>{result.quality}</p>
						</div>
					</div>

					{/* Description */}
					<div className='bg-white rounded-lg p-4 mb-6'>
						<h5 className='font-semibold text-gray-900 mb-2'>
							{t('results.description')}
						</h5>
						<p className='text-gray-600'>{result.description}</p>
					</div>

					{/* Action buttons */}
					<div className='flex flex-col sm:flex-row gap-3'>
						<button
							onClick={handleCopy}
							className='flex-1 bg-white border border-purple-300 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-2'
						>
							<Copy className='h-4 w-4' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
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
