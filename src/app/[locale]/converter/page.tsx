import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Shuffle,
	Ruler,
	Weight,
	Thermometer,
	Activity,
	Droplets,
	Battery,
	HardDrive,
} from 'lucide-react';

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
	const t = (key: string) => messages.categories['converter'][key];

	const title = `${t(
		'title'
	)} — Онлайн конвертеры единиц измерения | Calc1.ru`;
	const description =
		'Онлайн-конвертеры единиц измерения: длина, вес, температура, скорость, давление, объём, энергия, данные. Бесплатные конвертеры для быстрого перевода единиц измерения.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: ['конвертеры единиц', 'конвертер длины', 'конвертер веса'];

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
			canonical: `https://calc1.ru/${locale}/converter`,
			languages: {
				ru: 'https://calc1.ru/ru/converter',
				en: 'https://calc1.ru/en/converter',
				es: 'https://calc1.ru/es/converter',
				de: 'https://calc1.ru/de/converter',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/converter`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/converter-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/converter-calculators-og.jpg'],
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

const calculators = [
	{
		id: 'length',
		title: 'calculators.length.title',
		description: 'calculators.length.description',
		icon: Ruler,
		href: '/converter/length',
	},
	{
		id: 'weight',
		title: 'calculators.weight.title',
		description: 'calculators.weight.description',
		icon: Weight,
		href: '/converter/weight',
	},
	{
		id: 'temperature',
		title: 'calculators.temperature.title',
		description: 'calculators.temperature.description',
		icon: Thermometer,
		href: '/converter/temperature',
	},
	{
		id: 'speed',
		title: 'calculators.speed.title',
		description: 'calculators.speed.description',
		icon: Shuffle,
		href: '/converter/speed',
	},
	{
		id: 'pressure',
		title: 'calculators.pressure.title',
		description: 'calculators.pressure.description',
		icon: Activity,
		href: '/converter/pressure',
	},
	{
		id: 'volume-converter',
		title: 'calculators.volume-converter.title',
		description: 'calculators.volume-converter.description',
		icon: Droplets,
		href: '/converter/volume',
	},
	{
		id: 'energy-converter',
		title: 'calculators.energy-converter.title',
		description: 'calculators.energy-converter.description',
		icon: Battery,
		href: '/converter/energy',
	},
	{
		id: 'data-converter',
		title: 'calculators.data-converter.title',
		description: 'calculators.data-converter.description',
		icon: HardDrive,
		href: '/converter/data',
	},
];

export default async function ConverterPage({ params: { locale } }: Props) {
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
						{t('categories.converter.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{t('categories.converter.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}${calculator.href}`}
							className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200'
						>
							<div className='flex items-center mb-4'>
								<calculator.icon className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
								<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
									{typeof calculator.title === 'string' &&
									calculator.title.startsWith('calculators.')
										? t(calculator.title)
										: calculator.title}
								</h3>
							</div>
							<p className='text-gray-600 dark:text-gray-400'>
								{typeof calculator.description === 'string' &&
								calculator.description.startsWith(
									'calculators.'
								)
									? t(calculator.description)
									: calculator.description}
							</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
