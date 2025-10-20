import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import LotteryGenerator from '@/components/calculators/lottery-generator';
import LotteryGeneratorSEO from '@/components/seo/lottery-generator-seo';

/**
 * Generate metadata for the lottery generator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.lotteryGenerator.seo[key];

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
 * Lottery Generator Page
 * Interactive generator for lottery tickets
 */
export default async function LotteryGeneratorPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.lotteryGenerator',
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: t('breadcrumbs.home'), href: `/${locale}` },
					{ label: t('breadcrumbs.fun'), href: `/${locale}/fun` },
					{
						label: t('breadcrumbs.lotteryGenerator'),
						href: `/${locale}/fun/lottery`,
					},
				]}
			/>

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
					<LotteryGenerator />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<LotteryGeneratorSEO />
				</div>
			</main>
		</div>
	);
}
