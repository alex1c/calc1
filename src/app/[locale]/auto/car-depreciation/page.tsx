import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CarDepreciationCalculator from '@/components/calculators/car-depreciation-calculator';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';

export default function CarDepreciationPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.auto.title'),
						href: '/auto',
					},
					{ label: t('calculators.car-depreciation.title') },
				]}
			/>
			<CarDepreciationCalculator />
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
	const t = (key: string) =>
		messages.calculators['car-depreciation'].seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
