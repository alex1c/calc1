import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DaysBetweenCalculator from '@/components/calculators/days-between-calculator';
import DaysBetweenSEO from '@/components/seo/days-between-seo';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.daysBetween.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/time/days-between`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/time/days-between',
				en: 'https://calc1.ru/en/time/days-between',
				es: 'https://calc1.ru/es/time/days-between',
				de: 'https://calc1.ru/de/time/days-between',
			},
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/og-days-between.png',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['https://calc1.ru/og-days-between.png'],
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
	};
}

export default async function DaysBetweenPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.daysBetween',
	});

	// Breadcrumbs items
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{ label: tCategories('time.title'), href: '/time' },
		{ label: t('title') },
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
			<Header />
			<Breadcrumbs items={breadcrumbItems} />

			<main className='container mx-auto px-4 py-8'>
				{/* Header */}
				<div className='text-center mb-8'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						{t('title')}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Calculator */}
				<div className='max-w-4xl mx-auto'>
					<DaysBetweenCalculator />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<DaysBetweenSEO />
				</div>
			</main>
		</div>
	);
}
