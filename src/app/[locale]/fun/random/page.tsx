import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import RandomNumberGenerator from '@/components/calculators/random-number-generator';
import RandomNumberGeneratorSEO from '@/components/seo/random-number-generator-seo';

/**
 * Generate metadata for the random number generator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) =>
		messages.calculators.randomNumberGenerator.seo[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
		},
	};
}

/**
 * Random Number Generator Page
 * Interactive generator for random numbers
 */
export default async function RandomNumberGeneratorPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.randomNumberGenerator',
	});

	// Breadcrumbs items
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{ label: tCategories('fun.title'), href: '/fun' },
		{ label: t('title') },
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'>
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

				{/* Generator */}
				<div className='max-w-4xl mx-auto'>
					<RandomNumberGenerator />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<RandomNumberGeneratorSEO />
				</div>
			</main>
		</div>
	);
}
