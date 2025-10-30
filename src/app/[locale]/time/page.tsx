import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import {
	Clock,
	Calendar,
	Plus,
	User,
	Timer,
	Target,
	Globe,
	CalendarDays,
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
	const t = (key: string) => messages.categories['time'][key];

	const title = `${t(
		'title'
	)} — Онлайн калькуляторы времени и дат | Calc1.ru`;
	const description =
		'Калькуляторы времени и дат онлайн: разница дат, возраст, таймеры, обратный отсчёт, календарь, мировое время. Бесплатные онлайн калькуляторы для работы со временем и датами.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: ['калькуляторы времени', 'калькулятор дат', 'калькулятор возраста'];

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
			canonical: `https://calc1.ru/${locale}/time`,
			languages: {
				ru: 'https://calc1.ru/ru/time',
				en: 'https://calc1.ru/en/time',
				es: 'https://calc1.ru/es/time',
				de: 'https://calc1.ru/de/time',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/time`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/time-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/time-calculators-og.jpg'],
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
		id: 'days-between',
		title: t('calculators.daysBetween.title'),
		description: t('calculators.daysBetween.description'),
		icon: Calendar,
		href: '/time/days-between',
	},
	{
		id: 'add-time',
		title: t('calculators.addTime.title'),
		description: t('calculators.addTime.description'),
		icon: Plus,
		href: '/time/add-time',
	},
	{
		id: 'age',
		title: t('calculators.age.title'),
		description: t('calculators.age.description'),
		icon: User,
		href: '/time/age',
	},
	{
		id: 'deadline',
		title: t('calculators.deadline.title'),
		description: t('calculators.deadline.description'),
		icon: Target,
		href: '/time/deadline',
	},
	{
		id: 'calendar',
		title: t('calculators.calendar.title'),
		description: t('calculators.calendar.description'),
		icon: CalendarDays,
		href: '/time/calendar',
	},
	{
		id: 'timer',
		title: t('calculators.timer.title'),
		description: t('calculators.timer.description'),
		icon: Timer,
		href: '/time/timer',
	},
	{
		id: 'countdown',
		title: t('calculators.countdown.title'),
		description: t('calculators.countdown.description'),
		icon: Clock,
		href: '/time/countdown',
	},
	{
		id: 'world-time',
		title: t('calculators.worldTime.title'),
		description: t('calculators.worldTime.description'),
		icon: Globe,
		href: '/time/world-time',
	},
];

export default async function TimePage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations();
	const calculators = getCalculators(t);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('categories.time.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{t('categories.time.description')}
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
									{calculator.title}
								</h3>
							</div>
							<p className='text-gray-600 dark:text-gray-400'>
								{calculator.description}
							</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
