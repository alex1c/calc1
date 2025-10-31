import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Car,
	Fuel,
	Shield,
	CreditCard,
	FileText,
	Truck,
	AlertTriangle,
	Calculator,
	TrendingDown,
	Wrench,
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
	const t = (key: string) => messages.categories['auto'][key];

	const title = `${t(
		'title'
	)} — Онлайн автомобильные калькуляторы | Calc1.ru`;
	const description =
		'Автомобильные калькуляторы онлайн: расчёт расхода топлива, автокредита, страховки (ОСАГО, КАСКО), транспортного налога, лизинга, таможенных платежей и штрафов ГИБДД. Бесплатные авто калькуляторы для водителей и автовладельцев.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'авто калькуляторы',
				'автомобильные калькуляторы',
				'калькулятор расхода топлива',
				'калькулятор автокредита',
				'калькулятор ОСАГО',
				'калькулятор КАСКО',
				'калькулятор транспортного налога',
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
			canonical: `https://calc1.ru/${locale}/auto`,
			languages: {
				ru: 'https://calc1.ru/ru/auto',
				en: 'https://calc1.ru/en/auto',
				es: 'https://calc1.ru/es/auto',
				de: 'https://calc1.ru/de/auto',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/auto`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/auto-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/auto-calculators-og.jpg'],
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
		id: 'fuel-consumption',
		title: t('calculators.fuel-consumption.title'),
		description: t('calculators.fuel-consumption.description'),
		icon: Fuel,
		href: '/auto/fuel-consumption',
	},
	{
		id: 'car-loan',
		title: t('calculators.car-loan.title'),
		description: t('calculators.car-loan.description'),
		icon: CreditCard,
		href: '/auto/car-loan',
	},
	{
		id: 'osago',
		title: t('calculators.osago.title'),
		description: t('calculators.osago.description'),
		icon: Shield,
		href: '/auto/osago',
	},
	{
		id: 'kasko',
		title: t('calculators.kasko.title'),
		description: t('calculators.kasko.description'),
		icon: Shield,
		href: '/auto/kasko',
	},
	{
		id: 'vehicle-tax',
		title: t('calculators.vehicle-tax.title'),
		description: t('calculators.vehicle-tax.description'),
		icon: Car,
		href: '/auto/vehicle-tax',
	},
	{
		id: 'leasing',
		title: t('calculators.leasing.title'),
		description: t('calculators.leasing.description'),
		icon: FileText,
		href: '/auto/leasing',
	},
	{
		id: 'customs',
		title: t('calculators.customs.title'),
		description: t('calculators.customs.description'),
		icon: Truck,
		href: '/auto/customs',
	},
	{
		id: 'traffic-fines',
		title: t('calculators.traffic-fines.title'),
		description: t('calculators.traffic-fines.description'),
		icon: AlertTriangle,
		href: '/auto/traffic-fines',
	},
	{
		id: 'car-ownership',
		title: t('calculators.car-ownership.title'),
		description: t('calculators.car-ownership.description'),
		icon: Calculator,
		href: '/auto/car-ownership',
	},
	{
		id: 'car-depreciation',
		title: t('calculators.car-depreciation.title'),
		description: t('calculators.car-depreciation.description'),
		icon: TrendingDown,
		href: '/auto/car-depreciation',
	},
];

export default async function AutoPage({ params: { locale } }: Props) {
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
						{t('categories.auto.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{t('categories.auto.description')}
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
