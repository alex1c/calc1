import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import NameGeneratorCalculator from '@/components/calculators/name-generator-calculator';
import NameGeneratorSEO from '@/components/seo/name-generator-seo';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const { loadMergedFunTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedFunTranslations(locale);
	const t = (key: string) => messages.calculators.nameGenerator.seo[key];

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

export default function NameGeneratorPage() {
	return (
		<>
			<Header />
			<main className="container mx-auto px-4 py-8">
				<Breadcrumbs />
				<NameGeneratorCalculator />
				<NameGeneratorSEO />
			</main>
		</>
	);
}
