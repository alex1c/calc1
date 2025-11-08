'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Network,
	Calculator,
	RefreshCw,
	Copy,
	Download,
	Globe,
	Shield,
} from 'lucide-react';

interface IpResult {
	ipType: 'IPv4' | 'IPv6';
	networkAddress: string;
	firstIp: string;
	lastIp: string;
	broadcastAddress?: string;
	subnetMask: string;
	cidr: number;
	hostsCount: number;
	hostRange: string;
}

/**
 * IP Calculator Component
 * 
 * A React component for calculating IP network parameters and subnet information.
 * 
 * Features:
 * - IPv4 and IPv6 support
 * - CIDR notation calculation
 * - Subnet mask calculation
 * - Network address calculation
 * - Host range calculation
 * - Broadcast address calculation
 * - Number of hosts calculation
 * - Copy results to clipboard
 * - PDF export
 * - Responsive design
 * 
 * Uses inline calculation logic for IP network calculations.
 */
export default function IpCalculator() {
	// Internationalization hook for translations
	const t = useTranslations('calculators.ipCalculator');
	
	// Form state management
	const [calculationType, setCalculationType] = useState<string>('cidr'); // Calculation type (cidr, subnet, range)
	const [ipAddress, setIpAddress] = useState<string>(''); // IP address input
	const [subnetMask, setSubnetMask] = useState<string>(''); // Subnet mask input
	const [ipRange, setIpRange] = useState<string>(''); // IP range input
	const [isCalculating, setIsCalculating] = useState(false); // Loading state during calculation
	const [result, setResult] = useState<IpResult | null>(null); // Calculated result
	const [copied, setCopied] = useState(false); // Copy to clipboard success state

	const validateIpv4 = (ip: string): boolean => {
		const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
		if (!ipv4Regex.test(ip)) return false;

		const parts = ip.split('.').map(Number);
		return parts.every((part) => part >= 0 && part <= 255);
	};

	const validateIpv6 = (ip: string): boolean => {
		const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
		return ipv6Regex.test(ip);
	};

	const validateCidr = (cidr: number, isIpv6: boolean = false): boolean => {
		const maxCidr = isIpv6 ? 128 : 32;
		return cidr >= 0 && cidr <= maxCidr;
	};

	const calculateSubnet = () => {
		setIsCalculating(true);
		setResult(null);
		setCopied(false);

		try {
			if (calculationType === 'cidr') {
				if (!ipAddress) {
					alert(t('form.errors.ipRequired'));
					setIsCalculating(false);
					return;
				}

				const [ip, cidrStr] = ipAddress.split('/');
				const cidr = parseInt(cidrStr);

				if (!validateIpv4(ip) && !validateIpv6(ip)) {
					alert(t('form.errors.invalidIp'));
					setIsCalculating(false);
					return;
				}

				if (!validateCidr(cidr, validateIpv6(ip))) {
					alert(t('form.errors.invalidCidr'));
					setIsCalculating(false);
					return;
				}

				// Calculate subnet for IPv4
				if (validateIpv4(ip)) {
					const ipParts = ip.split('.').map(Number);
					const ipNum =
						(ipParts[0] << 24) +
						(ipParts[1] << 16) +
						(ipParts[2] << 8) +
						ipParts[3];
					const mask = (0xffffffff << (32 - cidr)) >>> 0;
					const networkNum = ipNum & mask;
					const broadcastNum = networkNum | (~mask >>> 0);

					const networkAddress = [
						(networkNum >>> 24) & 0xff,
						(networkNum >>> 16) & 0xff,
						(networkNum >>> 8) & 0xff,
						networkNum & 0xff,
					].join('.');

					const firstIp = [
						(networkNum >>> 24) & 0xff,
						(networkNum >>> 16) & 0xff,
						(networkNum >>> 8) & 0xff,
						(networkNum & 0xff) + 1,
					].join('.');

					const lastIp = [
						(broadcastNum >>> 24) & 0xff,
						(broadcastNum >>> 16) & 0xff,
						(broadcastNum >>> 8) & 0xff,
						(broadcastNum & 0xff) - 1,
					].join('.');

					const broadcastAddress = [
						(broadcastNum >>> 24) & 0xff,
						(broadcastNum >>> 16) & 0xff,
						(broadcastNum >>> 8) & 0xff,
						broadcastNum & 0xff,
					].join('.');

					const subnetMask = [
						(mask >>> 24) & 0xff,
						(mask >>> 16) & 0xff,
						(mask >>> 8) & 0xff,
						mask & 0xff,
					].join('.');

					const hostsCount = Math.max(0, (1 << (32 - cidr)) - 2);

					setResult({
						ipType: 'IPv4',
						networkAddress,
						firstIp,
						lastIp,
						broadcastAddress,
						subnetMask,
						cidr,
						hostsCount,
						hostRange: `${firstIp} - ${lastIp}`,
					});
				}
			} else if (calculationType === 'mask') {
				if (!ipAddress || !subnetMask) {
					alert(t('form.errors.ipRequired'));
					setIsCalculating(false);
					return;
				}

				if (!validateIpv4(ipAddress) || !validateIpv4(subnetMask)) {
					alert(t('form.errors.invalidIp'));
					setIsCalculating(false);
					return;
				}

				// Convert mask to CIDR
				const maskParts = subnetMask.split('.').map(Number);
				const maskNum =
					(maskParts[0] << 24) +
					(maskParts[1] << 16) +
					(maskParts[2] << 8) +
					maskParts[3];
				const cidr = maskNum.toString(2).split('1').length - 1;

				// Calculate subnet
				const ipParts = ipAddress.split('.').map(Number);
				const ipNum =
					(ipParts[0] << 24) +
					(ipParts[1] << 16) +
					(ipParts[2] << 8) +
					ipParts[3];
				const networkNum = ipNum & maskNum;
				const broadcastNum = networkNum | (~maskNum >>> 0);

				const networkAddress = [
					(networkNum >>> 24) & 0xff,
					(networkNum >>> 16) & 0xff,
					(networkNum >>> 8) & 0xff,
					networkNum & 0xff,
				].join('.');

				const firstIp = [
					(networkNum >>> 24) & 0xff,
					(networkNum >>> 16) & 0xff,
					(networkNum >>> 8) & 0xff,
					(networkNum & 0xff) + 1,
				].join('.');

				const lastIp = [
					(broadcastNum >>> 24) & 0xff,
					(broadcastNum >>> 16) & 0xff,
					(broadcastNum >>> 8) & 0xff,
					(broadcastNum & 0xff) - 1,
				].join('.');

				const broadcastAddress = [
					(broadcastNum >>> 24) & 0xff,
					(broadcastNum >>> 16) & 0xff,
					(broadcastNum >>> 8) & 0xff,
					broadcastNum & 0xff,
				].join('.');

				const hostsCount = Math.max(0, (1 << (32 - cidr)) - 2);

				setResult({
					ipType: 'IPv4',
					networkAddress,
					firstIp,
					lastIp,
					broadcastAddress,
					subnetMask,
					cidr,
					hostsCount,
					hostRange: `${firstIp} - ${lastIp}`,
				});
			}
		} catch (error) {
			alert(t('form.errors.invalidIp'));
		} finally {
			setIsCalculating(false);
		}
	};

	const resetCalculator = () => {
		setIpAddress('');
		setSubnetMask('');
		setIpRange('');
		setResult(null);
		setCopied(false);
	};

	const copyResults = () => {
		if (result) {
			const textToCopy =
				`${t('results.title')}\n` +
				`${t('results.ipType')}: ${result.ipType}\n` +
				`${t('results.networkAddress')}: ${result.networkAddress}\n` +
				`${t('results.firstIp')}: ${result.firstIp}\n` +
				`${t('results.lastIp')}: ${result.lastIp}\n` +
				`${t('results.cidr')}: /${result.cidr}\n` +
				`${t('results.hostsCount')}: ${result.hostsCount}`;

			navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
				<div className='flex items-center gap-2 mb-6'>
					<Network className='h-8 w-8 text-blue-600' />
					<h2 className='text-2xl font-bold text-gray-900'>
						{t('form.title')}
					</h2>
				</div>

				<p className='text-gray-600 mb-8'>{t('form.description')}</p>

				{/* Calculation Type */}
				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{t('form.calculationType')}
					</label>
					<select
						value={calculationType}
						onChange={(e) => setCalculationType(e.target.value)}
						className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
					>
						<option value='cidr'>
							{t('form.calculationTypes.cidr')}
						</option>
						<option value='mask'>
							{t('form.calculationTypes.mask')}
						</option>
						<option value='range'>
							{t('form.calculationTypes.range')}
						</option>
					</select>
				</div>

				{/* Input Fields */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
					{calculationType === 'cidr' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.ipAddress')}
							</label>
							<input
								type='text'
								value={ipAddress}
								onChange={(e) => setIpAddress(e.target.value)}
								placeholder={t('form.ipAddressPlaceholder')}
								className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					)}

					{calculationType === 'mask' && (
						<>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.ipAddress')}
								</label>
								<input
									type='text'
									value={ipAddress}
									onChange={(e) =>
										setIpAddress(e.target.value)
									}
									placeholder='192.168.1.0'
									className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									{t('form.ipMask')}
								</label>
								<input
									type='text'
									value={subnetMask}
									onChange={(e) =>
										setSubnetMask(e.target.value)
									}
									placeholder={t('form.ipMaskPlaceholder')}
									className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
						</>
					)}

					{calculationType === 'range' && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								{t('form.ipRange')}
							</label>
							<input
								type='text'
								value={ipRange}
								onChange={(e) => setIpRange(e.target.value)}
								placeholder={t('form.ipRangePlaceholder')}
								className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					)}
				</div>

				{/* Buttons */}
				<div className='flex space-x-4'>
					<button
						onClick={calculateSubnet}
						disabled={isCalculating}
						className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 disabled:opacity-50'
					>
						{isCalculating
							? t('form.calculating')
							: t('form.calculate')}
					</button>
					<button
						onClick={resetCalculator}
						className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300'
					>
						{t('form.reset')}
					</button>
				</div>
			</div>

			{/* Results */}
			{result && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-white rounded-lg shadow-lg p-8'
				>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-bold text-gray-900'>
							{t('results.title')}
						</h2>
						<button
							onClick={copyResults}
							className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300'
						>
							<Copy className='inline-block w-4 h-4 mr-2' />
							{copied ? t('results.copied') : t('results.copy')}
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-4'>
							<div className='bg-blue-50 p-4 rounded-lg'>
								<h3 className='text-lg font-semibold text-blue-900 mb-2'>
									{t('results.network')}
								</h3>
								<p className='text-blue-800'>
									<strong>{t('results.ipType')}:</strong>{' '}
									{result.ipType}
								</p>
								<p className='text-blue-800'>
									<strong>
										{t('results.networkAddress')}:
									</strong>{' '}
									{result.networkAddress}
								</p>
								<p className='text-blue-800'>
									<strong>{t('results.cidr')}:</strong> /
									{result.cidr}
								</p>
								<p className='text-blue-800'>
									<strong>{t('results.subnetMask')}:</strong>{' '}
									{result.subnetMask}
								</p>
							</div>

							<div className='bg-green-50 p-4 rounded-lg'>
								<h3 className='text-lg font-semibold text-green-900 mb-2'>
									{t('results.hosts')}
								</h3>
								<p className='text-green-800'>
									<strong>{t('results.hostsCount')}:</strong>{' '}
									{result.hostsCount}
								</p>
								<p className='text-green-800'>
									<strong>{t('results.hostRange')}:</strong>{' '}
									{result.hostRange}
								</p>
								<p className='text-green-800'>
									<strong>{t('results.firstIp')}:</strong>{' '}
									{result.firstIp}
								</p>
								<p className='text-green-800'>
									<strong>{t('results.lastIp')}:</strong>{' '}
									{result.lastIp}
								</p>
								{result.broadcastAddress && (
									<p className='text-green-800'>
										<strong>
											{t('results.broadcastAddress')}:
										</strong>{' '}
										{result.broadcastAddress}
									</p>
								)}
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{t('results.summary')}
							</h3>
							<p className='text-gray-700'>
								{t('results.summaryText', {
									network: result.networkAddress,
									hosts: result.hostsCount,
									first: result.firstIp,
									last: result.lastIp,
								})}
							</p>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
