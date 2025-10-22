import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AutoLoanCalculator from '@/components/calculators/auto-loan-calculator';
import { Metadata } from 'next';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators['auto-loan'][key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('seo'),
	};
}

export default function AutoLoanPage() {
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
					{ label: t('calculators.auto-loan.title') },
				]}
			/>
			<AutoLoanCalculator />
		</div>
	);
}
