import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CarOwnershipCalculator from '@/components/calculators/car-ownership-calculator';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';

export default function CarOwnershipPage() {
	const t = useTranslations('calculators.car-ownership');
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: t('breadcrumbs.auto'), href: `/${locale}/auto` },
					{ label: t('title') },
				]}
			/>
			<CarOwnershipCalculator />
		</div>
	);
}

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators['car-ownership'].seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
