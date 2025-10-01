import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CustomsCalculator from '@/components/calculators/customs-calculator';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function CustomsPage() {
	const t = useTranslations('calculators.customs');

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: t('breadcrumbs.auto'), href: '/auto' },
					{ label: t('title') },
				]}
			/>
			<CustomsCalculator />
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
	const t = (key: string) => messages.calculators.customs.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
