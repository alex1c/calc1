import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import CarLoanCalculator from '@/components/calculators/car-loan-calculator';
import { Metadata } from 'next';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators['car-loan'][key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('seo'),
	};
}

export default function CarLoanPage() {
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
					{ label: t('calculators.car-loan.title') },
				]}
			/>
			<CarLoanCalculator />
		</div>
	);
}
