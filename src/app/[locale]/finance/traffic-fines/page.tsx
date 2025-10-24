import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import TrafficFinesCalculator from '@/components/calculators/traffic-fines-calculator';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';

export default function TrafficFinesPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.finance.title'),
						href: '/finance',
					},
					{ label: t('calculators.traffic-fines.title') },
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
	const calc = messages.calculators['traffic-fines'];

	return {
		title: calc.seo.title,
		description: calc.seo.overview.content,
		keywords: calc.seo.seo,
	};
}
