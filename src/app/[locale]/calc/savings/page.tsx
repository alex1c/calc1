import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import SavingsCalculator from '@/components/calculators/savings-calculator';

export default function SavingsPage() {
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
					{ label: t('calculators.savings.title') },
				]}
			/>
			<SavingsCalculator />
		</div>
	);
}
