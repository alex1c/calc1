import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import FoodRationSEO from '@/components/seo/food-ration-seo';

// Dynamic import for client component
const FoodRationCalculator = dynamic(
	() => import('@/components/calculators/food-ration-calculator'),
	{ ssr: false }
);

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = (key: string) => {
		const messages = require(`../../../../../messages/${locale}.json`);
		return messages.calculators.foodRation.seo[key];
	};

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/life/food-ration`,
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: `https://calc1.ru/${locale}/life/food-ration`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
		},
	};
}

export default async function FoodRationPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.foodRation',
	});

	const breadcrumbItems = [
		{ label: t('breadcrumbs.category'), href: '/life' },
		{ label: t('title'), href: '/life/food-ration' },
	];

	// JSON-LD structured data
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'BJU Calculator',
		applicationCategory: 'HealthApplication',
		description:
			'Online calculator for daily protein, fat, and carbohydrate needs.',
		operatingSystem: 'All',
		url: `https://calc1.ru/${locale}/life/food-ration`,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
	};

	return (
		<>
			<Header />
			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
				<div className='container mx-auto px-4 py-8'>
					<Breadcrumbs items={breadcrumbItems} />

					{/* Main Content */}
					<main className='py-8'>
						<FoodRationCalculator />
					</main>

					{/* SEO Content */}
					<FoodRationSEO />
				</div>
			</div>

			{/* JSON-LD */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
		</>
	);
}
