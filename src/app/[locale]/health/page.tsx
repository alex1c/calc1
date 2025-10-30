import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Heart,
	Activity,
	Pill,
	Thermometer,
	Calendar,
	Brain,
	Scale,
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
	const t = (key: string) => messages.categories['health'][key];

	const title = `${t('title')} — Онлайн медицинские калькуляторы | Calc1.ru`;
	const description =
		'Медицинские калькуляторы онлайн: расчёт ИМТ, пульса, артериального давления, овуляции, витаминов, стресса, дозировки лекарств. Бесплатные онлайн калькуляторы для контроля здоровья и медицинских расчётов.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'медицинские калькуляторы',
				'калькулятор здоровья',
				'калькулятор ИМТ',
		  ];

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
			canonical: `https://calc1.ru/${locale}/health`,
			languages: {
				ru: 'https://calc1.ru/ru/health',
				en: 'https://calc1.ru/en/health',
				es: 'https://calc1.ru/es/health',
				de: 'https://calc1.ru/de/health',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/health`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/health-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/health-calculators-og.jpg'],
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
		id: 'bmihealth',
		title: 'calculators.bmiHealth.title',
		description: 'calculators.bmiHealth.description',
		icon: Heart,
		href: '/health/bmihealth',
	},
	{
		id: 'heart-rate',
		title: 'calculators.heartRate.title',
		description: 'calculators.heartRate.description',
		icon: Activity,
		href: '/health/heart-rate',
	},
	{
		id: 'blood-pressure',
		title: 'calculators.bloodPressure.title',
		description: 'calculators.bloodPressure.description',
		icon: Thermometer,
		href: '/health/blood-pressure',
	},
	{
		id: 'ovulation',
		title: 'calculators.ovulation.title',
		description: 'calculators.ovulation.description',
		icon: Calendar,
		href: '/health/ovulation',
	},
	{
		id: 'vitamins',
		title: 'calculators.vitamins.title',
		description: 'calculators.vitamins.description',
		icon: Pill,
		href: '/health/vitamins',
	},
	{
		id: 'stress',
		title: 'calculators.stress.title',
		description: 'calculators.stress.description',
		icon: Brain,
		href: '/health/stress',
	},
	{
		id: 'dose',
		title: 'calculators.dose.title',
		description: 'calculators.dose.description',
		icon: Scale,
		href: '/health/dose',
	},
];

export default async function HealthPage({ params: { locale } }: Props) {
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
						{t('categories.health.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{t('categories.health.description')}
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
