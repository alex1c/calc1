import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import FuelCalculator from '@/components/calculators/fuel-calculator';
import { Metadata } from 'next';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators['fuel-consumption'][key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('seo'),
	};
}

export default function FuelConsumptionPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('breadcrumbs.categories.calculators'),
						href: '/calc',
					},
					{ label: t('calculators.fuel-consumption.title') },
				]}
			/>
			<FuelCalculator />
		</div>
	);
}
