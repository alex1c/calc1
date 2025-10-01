import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import VehicleTaxCalculator from '@/components/calculators/vehicle-tax-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Vehicle Tax Calculator | Калькулятор #1',
	description:
		'Calculate vehicle tax based on engine power, region, and ownership period in Russia.',
	keywords:
		'калькулятор транспортного налога, расчёт транспортного налога, транспортный налог, налог на автомобиль, ставки транспортного налога',
};

export default function VehicleTaxPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Авто', href: '/auto' },
					{ label: 'Калькулятор транспортного налога' },
				]}
			/>
			<VehicleTaxCalculator />
		</div>
	);
}
