import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import FantasyWorldCalculator from '@/components/calculators/fantasy-world-calculator';
import FantasyWorldSEO from '@/components/seo/fantasy-world-seo';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.fantasyWorld.seo[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			locale: locale,
		},
	};
}

export default function FantasyWorldPage() {
	return (
		<>
			<Header />
			<main className='container mx-auto px-4 py-8'>
				<Breadcrumbs />
				<FantasyWorldCalculator />
				<FantasyWorldSEO />
			</main>
		</>
	);
}
