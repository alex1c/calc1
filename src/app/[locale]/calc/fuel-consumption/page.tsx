import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import FuelCalculator from '@/components/calculators/fuel-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Fuel Consumption Calculator | Калькулятор #1',
	description:
		'Calculate fuel consumption, distance you can travel with given fuel, or fuel needed for a specific distance.',
	keywords:
		'калькулятор расхода топлива, расчёт топлива, расход топлива, сколько проехать, сколько топлива нужно, экономия топлива',
};

export default function FuelConsumptionPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.auto.title'),
						href: `/${locale}/auto`,
					},
					{ label: t('calculators.fuel.title') },
				]}
			/>
			<FuelCalculator />
		</div>
	);
}
