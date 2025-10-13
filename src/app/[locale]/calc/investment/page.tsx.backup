import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DepositCalculator from '@/components/calculators/deposit-calculator';
import { Metadata } from 'next';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.investment[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('seo'),
	};
}

export default function InvestmentPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.finance.title'),
						href: `/${locale}/finance`,
					},
					{ label: t('calculators.investment.title') },
				]}
			/>
			<DepositCalculator />
		</div>
	);
}
