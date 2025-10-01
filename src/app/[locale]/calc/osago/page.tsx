import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import OsagoCalculator from '@/components/calculators/osago-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'OSAGO Calculator | Калькулятор #1',
	description:
		'Calculate OSAGO insurance cost based on region, engine power, driver age and experience, and other factors.',
	keywords:
		'калькулятор ОСАГО, расчёт ОСАГО, стоимость ОСАГО, страхование ОСАГО, КБМ, коэффициент бонус-малус',
};

export default function OsagoPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Авто', href: '/auto' },
					{ label: 'Калькулятор ОСАГО' },
				]}
			/>
			<OsagoCalculator />
		</div>
	);
}
