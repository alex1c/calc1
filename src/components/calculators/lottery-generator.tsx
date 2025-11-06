'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Ticket, Copy, RefreshCw, Download, Printer } from 'lucide-react';

interface LotteryOptions {
	type: string;
	count: number;
}

interface LotteryTicket {
	numbers: number[];
	bonus?: number;
}

const lotteryTypes = {
	'6-49': { total: 49, select: 6, bonus: false },
	'5-36': { total: 36, select: 5, bonus: false },
	'7-49': { total: 49, select: 7, bonus: false },
	'6-45': { total: 45, select: 6, bonus: false },
	'5-35': { total: 35, select: 5, bonus: false },
	'6-42': { total: 42, select: 6, bonus: true },
	'7-35': { total: 35, select: 7, bonus: false },
	'6-40': { total: 40, select: 6, bonus: false },
};

export default function LotteryGenerator() {
	const t = useTranslations('calculators.lotteryGenerator');
	const [options, setOptions] = useState<LotteryOptions>({
		type: '6-49',
		count: 1,
	});
	const [generatedTickets, setGeneratedTickets] = useState<LotteryTicket[]>(
		[]
	);
	const [isGenerating, setIsGenerating] = useState(false);
	const [copied, setCopied] = useState(false);

	const generateTicket = (type: string): LotteryTicket => {
		const config = lotteryTypes[type as keyof typeof lotteryTypes];
		const numbers: number[] = [];

		// Generate main numbers
		const availableNumbers: number[] = [];
		for (let i = 1; i <= config.total; i++) {
			availableNumbers.push(i);
		}

		for (let i = 0; i < config.select; i++) {
			const randomIndex = Math.floor(
				Math.random() * availableNumbers.length
			);
			numbers.push(availableNumbers.splice(randomIndex, 1)[0]);
		}

		// Sort numbers
		numbers.sort((a, b) => a - b);

		const ticket: LotteryTicket = { numbers };

		// Add bonus number if needed
		if (config.bonus) {
			const bonusNumbers: number[] = [];
			for (let i = 1; i <= config.total; i++) {
				if (!numbers.includes(i)) {
					bonusNumbers.push(i);
				}
			}
			ticket.bonus =
				bonusNumbers[Math.floor(Math.random() * bonusNumbers.length)];
		}

		return ticket;
	};

	const handleGenerate = async () => {
		if (options.count < 1 || options.count > 20) {
			alert(t('errors.invalidCount'));
			return;
		}

		setIsGenerating(true);

		// Add some delay for animation effect
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const tickets: LotteryTicket[] = [];
		for (let i = 0; i < options.count; i++) {
			tickets.push(generateTicket(options.type));
		}

		setGeneratedTickets(tickets);
		setIsGenerating(false);
	};

	const handleCopy = async () => {
		const text = generatedTickets
			.map((ticket, index) => {
				const ticketStr = `${t('results.ticketNumber', { number: index + 1 })}: ${ticket.numbers.join(
					', '
				)}`;
				return ticket.bonus
					? `${ticketStr} + ${ticket.bonus}`
					: ticketStr;
			})
			.join('\n');

		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const content = generatedTickets
			.map((ticket, index) => {
				const ticketStr = `${t('results.ticketNumber', { number: index + 1 })}: ${ticket.numbers.join(
					', '
				)}`;
				return ticket.bonus
					? `${ticketStr} + ${ticket.bonus}`
					: ticketStr;
			})
			.join('\n');

		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'lottery-tickets.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handlePrint = () => {
		const printContent = generatedTickets
			.map((ticket, index) => {
				const ticketStr = `${t('results.ticketNumber', { number: index + 1 })}: ${ticket.numbers.join(
					', '
				)}`;
				return ticket.bonus
					? `${ticketStr} + ${ticket.bonus}`
					: ticketStr;
			})
			.join('\n');

		const printWindow = window.open('', '_blank');
		if (printWindow) {
			printWindow.document.write(`
				<html>
					<head>
						<title>${t('results.pdfTitle')}</title>
						<style>
							body { font-family: Arial, sans-serif; padding: 20px; }
							.ticket { margin: 20px 0; padding: 15px; border: 2px solid #000; }
							.numbers { font-size: 18px; font-weight: bold; }
							.bonus { color: red; }
						</style>
					</head>
					<body>
						<h1>${t('results.pdfH1')}</h1>
						${generatedTickets
							.map(
								(ticket, index) => `
							<div class="ticket">
								<h3>${t('results.ticketNumber', { number: index + 1 })}</h3>
								<div class="numbers">
									${ticket.numbers.join(' - ')}
									${ticket.bonus ? ` <span class="bonus">+ ${ticket.bonus}</span>` : ''}
								</div>
							</div>
						`
							)
							.join('')}
					</body>
				</html>
			`);
			printWindow.document.close();
			printWindow.print();
		}
	};

	const handleReset = () => {
		setGeneratedTickets([]);
		setOptions({
			type: '6-49',
			count: 1,
		});
	};

	const getTypeName = (type: string) => {
		return t(`types.${type}`);
	};

	return (
		<div className='bg-white rounded-2xl shadow-xl p-8 border border-yellow-100'>
			{/* Form */}
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
					<Ticket className='h-8 w-8 text-yellow-500' />
					{t('form.title')}
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Lottery type */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.type')}
						</label>
						<select
							value={options.type}
							onChange={(e) =>
								setOptions({ ...options, type: e.target.value })
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
						>
							{Object.keys(lotteryTypes).map((type) => (
								<option
									key={type}
									value={type}
								>
									{getTypeName(type)}
								</option>
							))}
						</select>
					</div>

					{/* Count */}
					<div className='space-y-2'>
						<label className='block text-sm font-medium text-gray-700'>
							{t('form.count')}
						</label>
						<input
							type='number'
							value={options.count}
							onChange={(e) =>
								setOptions({
									...options,
									count: parseInt(e.target.value) || 1,
								})
							}
							min='1'
							max='20'
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
						/>
					</div>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 mt-6'>
					<button
						onClick={handleGenerate}
						disabled={isGenerating}
						className='flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2'
					>
						{isGenerating ? (
							<>
								<RefreshCw className='h-5 w-5 animate-spin' />
								{t('form.generating')}
							</>
						) : (
							<>
								<Ticket className='h-5 w-5' />
								{t('form.generate')}
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
			{generatedTickets.length > 0 && (
				<div className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
							<Ticket className='h-5 w-5 text-yellow-500' />
							{t('results.title')}
						</h3>
						<div className='flex gap-2'>
							<button
								onClick={handleCopy}
								className='px-3 py-1 bg-white border border-yellow-300 text-yellow-700 rounded-lg text-sm hover:bg-yellow-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Copy className='h-4 w-4' />
								{t('results.copy')}
							</button>
							<button
								onClick={handleDownload}
								className='px-3 py-1 bg-white border border-yellow-300 text-yellow-700 rounded-lg text-sm hover:bg-yellow-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Download className='h-4 w-4' />
								{t('results.download')}
							</button>
							<button
								onClick={handlePrint}
								className='px-3 py-1 bg-white border border-yellow-300 text-yellow-700 rounded-lg text-sm hover:bg-yellow-50 transition-colors duration-200 flex items-center gap-1'
							>
								<Printer className='h-4 w-4' />
								{t('results.print')}
							</button>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{generatedTickets.map((ticket, index) => (
							<div
								key={index}
								className='bg-white rounded-lg p-4 border-2 border-yellow-200 hover:border-yellow-300 transition-colors'
							>
								<div className='text-center'>
									<h4 className='text-lg font-semibold text-gray-900 mb-3'>
										{t('results.ticket')} {index + 1}
									</h4>
									<div className='flex flex-wrap justify-center gap-2 mb-3'>
										{ticket.numbers.map(
											(number, numIndex) => (
												<span
													key={numIndex}
													className='bg-yellow-100 text-yellow-800 text-lg font-bold px-3 py-2 rounded-full'
												>
													{number}
												</span>
											)
										)}
									</div>
									{ticket.bonus && (
										<div className='text-center'>
											<span className='text-sm text-gray-600 mr-2'>
												{t('results.bonus')}:
											</span>
											<span className='bg-red-100 text-red-800 text-lg font-bold px-3 py-1 rounded-full'>
												{ticket.bonus}
											</span>
										</div>
									)}
								</div>
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

			{/* Disclaimer */}
			<div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
				<p className='text-sm text-yellow-800'>{t('disclaimer')}</p>
			</div>
		</div>
	);
}
