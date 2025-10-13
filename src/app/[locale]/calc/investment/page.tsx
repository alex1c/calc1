import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DepositCalculator from '@/components/calculators/deposit-calculator';

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
					{ label: t('calculators.deposit.title') },
				]}
			/>
			<DepositCalculator />
		</div>
	);
}
