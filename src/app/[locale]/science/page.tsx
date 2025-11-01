import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { loadMergedScienceTranslations } from '@/lib/i18n-utils';

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

const getCalculators = (t: any) => [
	{
		id: 'grade-calculator',
		title: t('calculators.grade-calculator.title'),
		description: t('calculators.grade-calculator.description'),
		icon: GraduationCap,
		href: '/science/grade-calculator',
	},
];

export default async function SciencePage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const messages = await loadMergedScienceTranslations(locale);
	const t = await getTranslations();
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Function to get calculator translations
	const tCalc = (key: string) => {
		const parts = key.split('.');
		if (parts[0] === 'calculators' && parts.length >= 3) {
			const calcKey = parts[1];
			const restKey = parts.slice(2).join('.');
			return messages.calculators?.[calcKey]?.[restKey] || key;
		}
		return key;
	};

	const calculators = getCalculators(tCalc);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{tCategories('science.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{tCategories('science.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				{calculators.length > 0 ? (
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
				) : (
					<div className='text-center py-12'>
						<p className='text-gray-500 dark:text-gray-400'>
							Калькуляторы будут добавлены в ближайшее время.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
