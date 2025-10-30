import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import { BookOpen, Atom, Calculator, BarChart3 } from 'lucide-react';

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
	const t = (key: string) => messages.categories['science'][key];

	const title = `${t('title')} — Онлайн научные калькуляторы | Calc1.ru`;
	const description =
		'Научные калькуляторы онлайн: физика, химия, геометрия, статистика. Расчёт скорости, ускорения, силы, энергии, молярной массы, концентрации растворов, химических уравнений. Бесплатные онлайн калькуляторы для студентов и учёных.';

	const keywordsString = t('seo.keywords') || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: ['научные калькуляторы', 'калькулятор физики', 'калькулятор химии'];

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
			canonical: `https://calc1.ru/${locale}/science`,
			languages: {
				ru: 'https://calc1.ru/ru/science',
				en: 'https://calc1.ru/en/science',
				es: 'https://calc1.ru/es/science',
				de: 'https://calc1.ru/de/science',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/science`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/science-calculators-og.jpg',
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
			images: ['https://calc1.ru/images/science-calculators-og.jpg'],
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
		id: 'physics',
		title: 'Physics Calculator',
		description: 'Calculate velocity, acceleration, force, and energy',
		icon: Atom,
		href: '/calc/physics',
	},
	{
		id: 'chemistry',
		title: 'Chemistry Calculator',
		description:
			'Calculate molar mass, concentration, and chemical equations',
		icon: BookOpen,
		href: '/calc/chemistry',
	},
	{
		id: 'statistics',
		title: 'Statistics Calculator',
		description: 'Calculate mean, median, standard deviation, and more',
		icon: BarChart3,
		href: '/calc/statistics',
	},
	{
		id: 'geometry-advanced',
		title: 'Advanced Geometry',
		description: 'Calculate complex geometric shapes and volumes',
		icon: Calculator,
		href: '/calc/geometry-advanced',
	},
];

export default async function SciencePage({ params: { locale } }: Props) {
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
						{t('categories.science.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{t('categories.science.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}/calc/${calculator.id}`}
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
