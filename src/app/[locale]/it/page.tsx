import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Link from 'next/link';
import { Network, Hash, Shield, Globe, Database, Code } from 'lucide-react';

const getCalculators = (t: any) => [
	{
		id: 'ip-calculator',
		title: t('calculators.ipCalculator.title'),
		description: t('calculators.ipCalculator.description'),
		icon: Network,
		href: '/it/ip-calculator',
	},
	{
		id: 'hash-calculator',
		title: 'Hash Calculator',
		description: 'Calculate MD5, SHA-1, SHA-256 and other hash functions',
		icon: Hash,
		href: '/it/hash',
	},
	{
		id: 'password-generator',
		title: 'Password Generator',
		description: 'Generate secure passwords with customizable parameters',
		icon: Shield,
		href: '/fun/password',
	},
	{
		id: 'url-encoder',
		title: 'URL Encoder/Decoder',
		description: 'Encode and decode URLs and special characters',
		icon: Globe,
		href: '/it/url-encoder',
	},
	{
		id: 'base64-encoder',
		title: 'Base64 Encoder/Decoder',
		description: 'Encode and decode Base64 strings',
		icon: Code,
		href: '/it/base64',
	},
	{
		id: 'json-formatter',
		title: 'JSON Formatter',
		description: 'Format and validate JSON data',
		icon: Database,
		href: '/it/json-formatter',
	},
];

export default function ItPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.it.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.it.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{getCalculators(t).map((calculator) => {
						const IconComponent = calculator.icon;
						return (
							<Link
								key={calculator.id}
								href={`/${locale}${calculator.href}`}
								className='bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200'
							>
								<div className='flex items-center mb-4'>
									<IconComponent className='h-8 w-8 text-blue-600 mr-3' />
									<h3 className='text-xl font-semibold text-gray-900'>
										{calculator.title}
									</h3>
								</div>
								<p className='text-gray-600'>
									{calculator.description}
								</p>
							</Link>
						);
					})}
				</div>
			</main>
		</div>
	);
}
