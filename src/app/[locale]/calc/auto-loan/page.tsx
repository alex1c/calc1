import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AutoLoanCalculator from '@/components/calculators/auto-loan-calculator';

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
						href: `/${locale}/finance`,
					},
					{ label: t('calculators.auto-loan.title') },
				]}
			/>
			<AutoLoanCalculator />
		</div>
	);
}
