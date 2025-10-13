import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import TrafficFinesCalculator from '@/components/calculators/traffic-fines-calculator';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';

export default function TrafficFinesPage() {
	const t = useTranslations('calculators.traffic-fines');
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
			<TrafficFinesCalculator />
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
	const t = (key: string) => messages.calculators['traffic-fines'].seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
