import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import { Network, Hash, Shield, Globe, Database, Code } from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.categories['it'][key];

	const title = `${t('title')} — Онлайн IT-калькуляторы | Calc1.ru`;
	const description =
		'IT-калькуляторы онлайн: расчёт IP-адресов и подсетей, хеширование (MD5, SHA-1, SHA-256), кодирование и декодирование (Base64, URL), форматирование JSON, сетевые расчёты. Бесплатные онлайн калькуляторы для разработчиков и IT-специалистов.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: ['IT калькуляторы', 'калькулятор IP адресов', 'хеш калькулятор'];

	return {
		title,
		description,
		keywords,
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/it`,
			languages: {
				ru: 'https://calc1.ru/ru/it',
				en: 'https://calc1.ru/en/it',
				es: 'https://calc1.ru/es/it',
				de: 'https://calc1.ru/de/it',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/it`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/it-calculators-og.jpg',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${title} | Calc1.ru`,
			description,
			images: ['https://calc1.ru/images/it-calculators-og.jpg'],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		verification: {
			google: 'your-google-verification-code',
			yandex: 'your-yandex-verification-code',
		},
	};
}

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

export default async function ItPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations();

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('categories.it.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
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
								className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200'
							>
								<div className='flex items-center mb-4'>
									<IconComponent className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
										{calculator.title}
									</h3>
								</div>
								<p className='text-gray-600 dark:text-gray-400'>
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
