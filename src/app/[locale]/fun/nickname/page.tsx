import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import NicknameGenerator from '@/components/calculators/nickname-generator';
import NicknameGeneratorSEO from '@/components/seo/nickname-generator-seo';

/**
 * Generate metadata for the nickname generator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.nicknameGenerator.seo[key];

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
 * Nickname Generator Page
 * Interactive generator for creating unique nicknames
 */
export default async function NicknameGeneratorPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.nicknameGenerator',
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
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50'>
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
					<NicknameGenerator />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<NicknameGeneratorSEO />
				</div>
			</main>
		</div>
	);
}
