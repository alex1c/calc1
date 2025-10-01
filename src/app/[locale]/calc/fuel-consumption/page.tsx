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
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Авто', href: '/auto' },
					{ label: 'Калькулятор расхода топлива' },
				]}
			/>
			<FuelCalculator />
		</div>
	);
}
