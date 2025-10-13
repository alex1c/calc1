import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BMICalculator from '@/components/calculators/bmi-calculator';
import { Metadata } from 'next';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.bmi[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('seo'),
	};
}

export default function BMIPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.health.title'),
						href: `/${locale}/health`,
					},
					{ label: t('calculators.bmi.title') },
				]}
			/>
			<BMICalculator />
		</div>
	);
}
