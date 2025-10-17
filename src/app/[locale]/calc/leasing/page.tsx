import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import LeasingCalculator from '@/components/calculators/leasing-calculator';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';

export default function LeasingPage() {
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
					{ label: t('calculators.leasing.title') },
				]}
			/>
			<LeasingCalculator />
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
	const t = (key: string) => messages.calculators.leasing.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
