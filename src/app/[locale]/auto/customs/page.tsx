import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CustomsCalculator from '@/components/calculators/customs-calculator';
import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';

export default function CustomsPage() {
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
					{ label: t('calculators.customs.title') },
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
