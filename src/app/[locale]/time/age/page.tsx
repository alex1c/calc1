import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AgeCalculator from '@/components/calculators/age-calculator';
import AgeSEO from '@/components/seo/age-seo';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.agecalc.seo',
	});

	const title = t('title');
	const description = t('description');
	const canonicalUrl = `https://calc1.ru/${locale}/time/age`;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				ru: 'https://calc1.ru/ru/time/age',
				en: 'https://calc1.ru/en/time/age',
				es: 'https://calc1.ru/es/time/age',
				de: 'https://calc1.ru/de/time/age',
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
					url: 'https://calc1.ru/og-age.png',
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
			images: ['https://calc1.ru/og-age.png'],
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

export default async function AgePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.agecalc',
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
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50'>
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
					<AgeCalculator />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<AgeSEO />
				</div>
			</main>
		</div>
	);
}
